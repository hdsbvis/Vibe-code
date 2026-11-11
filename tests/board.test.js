import test from 'node:test';
import assert from 'node:assert/strict';
import { addRun, cleanPlayer, makeRun } from '../src/services/board.js';

test('a run records world, rules, score, stops and time', () => {
  const run = makeRun({ worldId: 'ocean', rulesId: 'daily', score: 321, stops: 14, day: '2026-11-11' });
  assert.deepEqual({ ...run, t: 0 }, { w: 'ocean', r: 'daily', s: 321, st: 14, t: 0, d: '2026-11-11' });
  assert.ok(Math.abs(run.t - Date.now()) < 2000);
  assert.equal('d' in makeRun({ worldId: 'space', rulesId: 'classic', score: 1, stops: 1 }), false);
});

test('adding runs keeps the newest 300 and the best per world and rules', () => {
  let doc = { runs: [], best: {} };
  for (let i = 0; i < 320; i++) doc = addRun(doc, { w: 'space', r: 'classic', s: i === 5 ? 999 : i, st: 1, t: i });
  assert.equal(doc.runs.length, 300);
  assert.equal(doc.runs[0].t, 20);
  assert.equal(doc.best['space:classic'].s, 999); // survives even though that run was trimmed
  doc = addRun(doc, { w: 'ocean', r: 'survival', s: 50, st: 3, t: 400 });
  assert.deepEqual(Object.keys(doc.best).sort(), ['ocean:survival', 'space:classic']);
});

test('records written by other browsers are cleaned before use', () => {
  const player = cleanPlayer('u_1', {
    name: '<script>alert(1)</script> and a very long name indeed',
    runs: [
      { w: 'space', r: 'classic', s: 120.6, st: 4, t: 1000 },
      { w: 'mars', r: 'classic', s: 5, st: 1, t: 1 },
      { w: 'space', r: 'classic', s: 'huge', st: -3, t: 'now' },
      null,
    ],
    best: { 'space:classic': { s: 1e12, st: 4, t: 1000 }, 'nope:nope': { s: 1 }, junk: 5 },
  });
  assert.ok(!/[<>()]/.test(player.name));
  assert.ok(player.name.length <= 24);
  assert.deepEqual(player.runs, [
    { w: 'space', r: 'classic', s: 121, st: 4, t: 1000 },
    { w: 'space', r: 'classic', s: 0, st: 0, t: 0 },
  ]);
  assert.deepEqual(Object.keys(player.best), ['space:classic']);
  assert.equal(player.best['space:classic'].s, 1e6);
  assert.deepEqual(cleanPlayer('u_2', undefined).runs, []);
  assert.equal(cleanPlayer('u_2', 'garbage').name, 'Unknown');
});
