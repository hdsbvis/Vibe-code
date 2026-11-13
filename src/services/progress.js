// Which prompts this player has completed, so the game doesn't deal them again until it has to.
// Kept on the device. On the claude.ai page it is also saved to the player's private cloud
// folder, so it follows them between devices and survives cleared browser storage.
import { store } from './storage.js';
import { board } from './board.js';

const KEY = 'seen';
const LIMIT = 2000;

function readAll() {
  const all = store.get(KEY, {});
  return all && typeof all === 'object' && !Array.isArray(all) ? all : {};
}
const clean = (list) => (Array.isArray(list) ? list.filter((id) => typeof id === 'string' && id.length < 80).slice(-LIMIT) : []);

let cloudDoc = null;
let saveTimer = 0;
let saving = false;
let dirty = false;

async function saveToCloud() {
  if (!cloudDoc) return;
  if (saving) {
    dirty = true; // one write at a time; go again when this one lands
    return;
  }
  saving = true;
  try {
    await cloudDoc.set(readAll());
  } catch (e) {
    /* offline or not allowed to write: the device copy still works */
  }
  saving = false;
  if (dirty) {
    dirty = false;
    saveToCloud();
  }
}
function queueSave() {
  if (!cloudDoc) return;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveToCloud, 1500);
}

export const progress = {
  /** Ids of completed prompts in a world, oldest first. */
  seen(worldId) {
    return clean(readAll()[worldId]);
  },

  /** Record that a prompt has been completed. Marking it again moves it to "most recent". */
  mark(worldId, questionId) {
    const all = readAll();
    all[worldId] = [...clean(all[worldId]).filter((id) => id !== questionId), questionId].slice(-LIMIT);
    store.set(KEY, all);
    queueSave();
  },

  /** How many of these questions the player has completed. */
  count(worldId, questions) {
    const done = new Set(this.seen(worldId));
    return questions.filter((q) => done.has(q.id)).length;
  },
};

/** Merge two "oldest first" lists: things only the other device knows about count as older. */
export function mergeSeen(local, remote) {
  const mine = new Set(local);
  return [...remote.filter((id) => !mine.has(id)), ...local];
}

// Once the board has settled, pull in progress saved from other devices.
board.ready.then(async () => {
  const impl = board.impl;
  if (impl.kind !== 'cloud' || !impl.uid) return;
  try {
    const ref = impl.db.doc(`data/users/${impl.uid}/progress`);
    const snap = await ref.get();
    const remote = snap.exists ? snap.data() || {} : {};
    const local = readAll();
    const merged = {};
    let localHasMore = false;
    for (const worldId of new Set([...Object.keys(local), ...Object.keys(remote)])) {
      const mine = clean(local[worldId]);
      const theirs = clean(remote[worldId]);
      merged[worldId] = mergeSeen(mine, theirs).slice(-LIMIT);
      if (merged[worldId].length > theirs.length) localHasMore = true;
    }
    store.set(KEY, merged);
    cloudDoc = ref;
    if (localHasMore) queueSave();
  } catch (e) {
    /* no cloud folder for this viewer: progress stays on the device */
  }
});
