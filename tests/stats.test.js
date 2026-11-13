import test from 'node:test';
import assert from 'node:assert/strict';
import { bestPerPlayer, standing, periodStart, simulateCrowd, percentBelow } from '../src/core/stats.js';
import { parseBank } from '../src/core/bank.js';
import { mulberry32 } from '../src/core/rng.js';
import spaceBank from '../src/data/space.bank.js';

const now = Date.UTC(2026, 10, 11, 12);
const hour = 3600e3;
const run = (s, ago, w = 'space', r = 'classic') => ({ w, r, s, st: Math.round(s / 30), t: now - ago });
const players = [
  { id: 'me', name: 'Me', me: true, runs: [run(300, hour), run(120, 100 * hour)] },
  { id: 'a', name: 'A', runs: [run(200, 2 * hour), run(450, 60 * hour)] },
  { id: 'b', name: 'B', runs: [run(350, 3 * hour)] },
  { id: 'c', name: 'C', runs: [run(100, 30 * 24 * hour + hour)] },
  { id: 'd', name: 'D', runs: [run(999, hour, 'ocean')] },
];

test('best run per player, in one world and period', () => {
  const board = bestPerPlayer(players, { worldId: 'space', rulesId: 'classic', since: now - 24 * hour });
  assert.deepEqual(board.map((r) => [r.id, r.score]), [['b', 350], ['me', 300], ['a', 200]]);
});

test('standing counts the other players you beat', () => {
  const day = standing(players, { worldId: 'space', rulesId: 'classic', since: now - 24 * hour });
  assert.equal(day.players, 3);
  assert.equal(day.beaten, 1);
  assert.equal(day.percent, 50);
  assert.equal(day.rank, 2);

  const week = standing(players, { worldId: 'space', rulesId: 'classic', since: now - 7 * 24 * hour });
  assert.equal(week.percent, 0); // A's 450 from 60 hours ago now counts
  assert.equal(week.rank, 3);

  const all = standing(players, { worldId: 'space', rulesId: 'classic', since: 0 });
  assert.equal(all.players, 4);
  assert.equal(all.percent, 33);
});

test('a given score can be ranked without being on the board', () => {
  const s = standing(players, { worldId: 'space', rulesId: 'classic', since: 0, score: 500 });
  assert.equal(s.beaten, 3);
  assert.equal(s.percent, 100);
  assert.equal(s.rank, 1);
});

test('alone on the board gives no percentage', () => {
  const s = standing(players, { worldId: 'ocean', rulesId: 'survival', since: 0, score: 50 });
  assert.equal(s.others, 0);
  assert.equal(s.percent, null);
});

test('the kept all-time best counts after old runs are trimmed', () => {
  const trimmed = [{ id: 'x', name: 'X', runs: [], best: { 'space:classic': { s: 640, st: 20, t: 5 } } }];
  assert.equal(bestPerPlayer(trimmed, { worldId: 'space', rulesId: 'classic', since: 0 })[0].score, 640);
  assert.equal(bestPerPlayer(trimmed, { worldId: 'space', rulesId: 'classic', since: now - hour }).length, 0);
});

test('period starts', () => {
  assert.equal(periodStart('all', now), 0);
  assert.equal(periodStart('week', now), now - 7 * 24 * hour);
  assert.ok(periodStart('day', now) <= now && periodStart('day', now) > now - 24 * hour);
});

test('the estimated crowd is a sorted, plausible spread', () => {
  const questions = parseBank(spaceBank).slice(0, 7);
  const crowd = simulateCrowd(questions, { n: 2000, rnd: mulberry32(7) });
  assert.equal(crowd.length, 2000);
  for (let i = 1; i < crowd.length; i++) assert.ok(crowd[i] >= crowd[i - 1]);
  assert.equal(percentBelow(crowd, 0), 0);
  assert.equal(percentBelow(crowd, 10000), 100);
  const mid = percentBelow(crowd, 250);
  assert.ok(mid > 20 && mid < 99, `250 points beats ${mid}% of the crowd`);
});
