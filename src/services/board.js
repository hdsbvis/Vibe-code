// The scoreboard. Three places it can live, tried in this order:
//   cloud   the shared database of the page published on claude.ai
//   server  the small Node server in /server (npm start)
//   device  this browser only
// Every board hands back the same shape: a list of players, each with their recent runs.
import { store } from './storage.js';
import { identity } from './identity.js';

const MAX_RUNS = 300;
const WORLDS = new Set(['space', 'ocean']);
const RULESETS = new Set(['classic', 'daily', 'survival', 'endless']);

/** A run as stored: world, rules, score, stops, time, and the day for Daily runs. */
export const makeRun = ({ worldId, rulesId, score, stops, day }) => ({
  w: worldId,
  r: rulesId,
  s: score,
  st: stops,
  t: Date.now(),
  ...(rulesId === 'daily' ? { d: day } : {}),
});

/** Add a run to a player record, keeping the newest runs and the best per world + rules. */
export function addRun(doc, run) {
  const runs = [...(doc.runs || []), run].slice(-MAX_RUNS);
  const best = { ...(doc.best || {}) };
  const key = `${run.w}:${run.r}`;
  if (!best[key] || run.s > best[key].s) best[key] = { s: run.s, st: run.st, t: run.t };
  return { ...doc, runs, best };
}

// Shared data is written by other people's browsers, so never trust its shape.
const num = (v, max) => (Number.isFinite(v) ? Math.max(0, Math.min(max, Math.round(v))) : 0);
function cleanRun(run) {
  if (!run || !WORLDS.has(run.w) || !RULESETS.has(run.r)) return null;
  return { w: run.w, r: run.r, s: num(run.s, 1e6), st: num(run.st, 1e5), t: num(run.t, 4e12) };
}
export function cleanPlayer(id, raw, me = false) {
  const data = raw && typeof raw === 'object' ? raw : {};
  const best = {};
  for (const [key, value] of Object.entries(data.best && typeof data.best === 'object' ? data.best : {})) {
    const [w, r] = key.split(':');
    if (WORLDS.has(w) && RULESETS.has(r) && value) best[key] = { s: num(value.s, 1e6), st: num(value.st, 1e5), t: num(value.t, 4e12) };
  }
  return {
    id: String(id),
    name: typeof data.name === 'string' ? data.name.replace(/[^\w '-]/g, '').slice(0, 24) || 'Unknown' : 'Unknown',
    me,
    runs: (Array.isArray(data.runs) ? data.runs : []).slice(-MAX_RUNS).map(cleanRun).filter(Boolean),
    best,
  };
}

const localDoc = () => store.get('runs', { runs: [], best: {} });
const localPlayer = () => cleanPlayer(identity.id, { ...localDoc(), name: identity.name }, true);
const withTimeout = (promise, ms) =>
  Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))]);

class DeviceBoard {
  kind = 'device';
  note = 'Scores are saved on this device only.';
  async load() {
    return [localPlayer()];
  }
  async submit() {
    return true; // the local copy is already saved
  }
}

class ServerBoard {
  kind = 'server';
  note = 'Shared board: everyone playing on this server.';
  async load() {
    const res = await withTimeout(fetch(`api/board?me=${identity.id}`, { cache: 'no-store' }), 8000);
    const body = await res.json();
    const players = (body.players || []).map((p) => cleanPlayer(p.id, p, !!p.me));
    return players.some((p) => p.me) ? players : [...players, localPlayer()];
  }
  async submit(run) {
    const res = await withTimeout(
      fetch('api/runs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: identity.id, name: identity.name, run }),
      }),
      8000,
    );
    return res.ok;
  }
}

class CloudBoard {
  kind = 'cloud';
  constructor(db, uid) {
    this.db = db;
    this.uid = uid;
    this.readOnly = !uid;
  }
  get note() {
    return this.readOnly
      ? "You can see this board, but this account can't post scores to it."
      : 'Shared board: everyone who can post scores from this link.';
  }
  async load() {
    const snap = await withTimeout(this.db.collection('scores').limit(1000).get(), 10000);
    const players = snap.docs.map((d) => cleanPlayer(d.id, d.data(), d.id === this.uid));
    return players.some((p) => p.me) ? players : [...players, localPlayer()];
  }
  async submit(run) {
    if (this.readOnly) return false;
    try {
      const ref = this.db.doc(`scores/${this.uid}`);
      const snap = await withTimeout(ref.get(), 10000);
      const current = snap.exists ? cleanPlayer(this.uid, snap.data()) : { runs: [], best: {} };
      const next = addRun({ runs: current.runs, best: current.best }, run);
      await withTimeout(ref.set({ name: identity.name, runs: next.runs, best: next.best }), 10000);
      return true;
    } catch (err) {
      if (err && err.code === 'invalid_argument') this.readOnly = true; // this viewer may not write
      return false;
    }
  }
}

async function connect() {
  try {
    if (window.claude && typeof window.claude.use === 'function') {
      const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
      if (db) return new CloudBoard(db, user ? await user.id() : null);
    }
  } catch (e) {
    /* not on claude.ai */
  }
  try {
    if (location.protocol.startsWith('http')) {
      const res = await withTimeout(fetch('api/health', { cache: 'no-store' }), 3000);
      if (res.ok && (await res.json()).farOut) return new ServerBoard();
    }
  } catch (e) {
    /* no server next to the page */
  }
  return new DeviceBoard();
}

/** The live board. Starts as device-only and upgrades once a shared one answers. */
export const board = {
  impl: new DeviceBoard(),
  ready: null,
  get kind() {
    return this.impl.kind;
  },
  get note() {
    return this.impl.note;
  },
  /** Every player on the board. Falls back to this device's own runs if the board can't be reached. */
  async load() {
    await this.ready;
    try {
      return await this.impl.load();
    } catch (e) {
      return [localPlayer()];
    }
  },
  /** Save a run locally, then post it to the shared board. Resolves true if it was posted. */
  async submit(run) {
    store.set('runs', addRun(localDoc(), run));
    await this.ready;
    try {
      return await this.impl.submit(run);
    } catch (e) {
      return false;
    }
  },
};
board.ready = connect().then((impl) => {
  board.impl = impl;
});
