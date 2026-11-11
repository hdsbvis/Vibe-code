// Rankings maths: who played in a period, and how one score compares.
import { pointsFor, STREAK_EVERY, STREAK_BONUS } from './scoring.js';

export const PERIODS = [
  { id: 'day', label: 'Today' },
  { id: 'week', label: '7 days' },
  { id: 'month', label: '30 days' },
  { id: 'all', label: 'All time' },
];

const DAY_MS = 24 * 60 * 60 * 1000;

/** The timestamp a period starts at. "Today" starts at local midnight. */
export function periodStart(id, now = Date.now()) {
  if (id === 'day') {
    const d = new Date(now);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }
  if (id === 'week') return now - 7 * DAY_MS;
  if (id === 'month') return now - 30 * DAY_MS;
  return 0;
}

export const bucketKey = (worldId, rulesId) => `${worldId}:${rulesId}`;

/**
 * Each player's best run in one world + rule set since `since`.
 * A player record is {id, name, me?, runs: [{w, r, s, st, t}], best?: {[bucket]: {s, st, t}}}.
 * @returns {{id: string, name: string, me: boolean, score: number, stops: number, t: number}[]}
 */
export function bestPerPlayer(players, { worldId, rulesId, since = 0 }) {
  const out = [];
  for (const p of players) {
    let top = null;
    for (const run of p.runs || []) {
      if (run.w !== worldId || run.r !== rulesId || run.t < since) continue;
      if (!top || run.s > top.s) top = run;
    }
    // Old runs get trimmed from `runs`; the all-time best survives in `best`.
    const kept = p.best && p.best[bucketKey(worldId, rulesId)];
    if (kept && kept.t >= since && (!top || kept.s > top.s)) top = kept;
    if (top) out.push({ id: p.id, name: p.name || 'Unknown', me: !!p.me, score: top.s, stops: top.st || 0, t: top.t });
  }
  return out.sort((a, b) => b.score - a.score || a.t - b.t);
}

/**
 * How `score` compares with every other player's best in the period.
 * `score` defaults to the caller's own best on the board.
 */
export function standing(players, { worldId, rulesId, since = 0, score = null }) {
  const board = bestPerPlayer(players, { worldId, rulesId, since });
  const mine = board.find((row) => row.me) || null;
  const myScore = score ?? (mine ? mine.score : null);
  const others = board.filter((row) => !row.me);
  if (myScore == null) {
    return { players: board.length, others: others.length, score: null, beaten: 0, tied: 0, percent: null, rank: null, board };
  }
  const beaten = others.filter((row) => row.score < myScore).length;
  const tied = others.filter((row) => row.score === myScore).length;
  return {
    players: others.length + 1,
    others: others.length,
    score: myScore,
    beaten,
    tied,
    percent: others.length ? Math.round((beaten / others.length) * 100) : null,
    rank: others.length - beaten - tied + 1,
    board,
  };
}

/**
 * Scores of an imagined crowd that answers each prompt as often as the charts say
 * people do. Used as a labelled estimate while few real players are on the board.
 * @param {import('./bank.js').Question[]} questions the prompts of one run, in order
 * @returns {number[]} sorted ascending
 */
export function simulateCrowd(questions, { n = 3000, rnd = Math.random } = {}) {
  const tables = questions.map((q) => {
    let total = 0;
    const cumulative = q.answers.map((a) => (total += a.pct));
    return { cumulative, total, points: q.answers.map((a) => pointsFor(a.pct)) };
  });
  const scores = new Array(n);
  for (let i = 0; i < n; i++) {
    let score = 0;
    tables.forEach((table, turn) => {
      const pick = rnd() * table.total;
      let lo = 0;
      let hi = table.cumulative.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (table.cumulative[mid] < pick) lo = mid + 1;
        else hi = mid;
      }
      score += table.points[lo];
      if ((turn + 1) % STREAK_EVERY === 0) score += STREAK_BONUS.points;
    });
    scores[i] = score;
  }
  return scores.sort((a, b) => a - b);
}

/** Percent of `sorted` strictly below `score`. */
export function percentBelow(sorted, score) {
  if (!sorted.length) return null;
  let lo = 0;
  let hi = sorted.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (sorted[mid] < score) lo = mid + 1;
    else hi = mid;
  }
  return Math.round((lo / sorted.length) * 100);
}
