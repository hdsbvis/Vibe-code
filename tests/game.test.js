import test from 'node:test';
import assert from 'node:assert/strict';
import { parseBank } from '../src/core/bank.js';
import { Game } from '../src/core/game.js';
import { RULES, makeDeck, dayKey } from '../src/core/rules.js';
import { pointsFor, hopsFor, tierFor, pctForPoints, STREAK_BONUS } from '../src/core/scoring.js';
import { mulberry32 } from '../src/core/rng.js';
import spaceBank from '../src/data/space.bank.js';

const questions = parseBank(spaceBank);
const rarest = (q) => q.answers[q.answers.length - 1].name;
const commonest = (q) => q.answers[0].name;

test('rarer answers score more and hop further', () => {
  assert.ok(pointsFor(30) < pointsFor(2));
  assert.ok(pointsFor(2) < pointsFor(0.1));
  assert.equal(pointsFor(0.001), 100);
  assert.equal(pointsFor(99), 5);
  assert.equal(hopsFor(pointsFor(30)), 1);
  assert.equal(hopsFor(pointsFor(10)), 2);
  assert.equal(hopsFor(pointsFor(2)), 3);
  assert.equal(hopsFor(pointsFor(0.3)), 4);
  assert.equal(tierFor(72).id, 'legendary');
  assert.ok(Math.abs(pointsFor(pctForPoints(50)) - 50) <= 1);
});

test('a classic run always climbs and ends after 7 prompts', () => {
  const game = new Game({ worldId: 'space', rules: RULES.classic, questions, rnd: mulberry32(1) });
  let last = 0;
  for (let i = 0; i < 7; i++) {
    assert.equal(game.over, false);
    const out = game.answer(commonest(game.prompt));
    assert.equal(out.kind, 'hit');
    assert.ok(out.to > last, 'each right answer moves you on from where you were');
    assert.equal(out.from, last);
    last = out.to;
    assert.equal(game.advance(), i < 6);
  }
  assert.equal(game.over, true);
  assert.equal(game.summary().hits, 7);
  assert.equal(game.stops, last);
});

test('a perfect classic run reaches stop 30', () => {
  const game = new Game({ worldId: 'space', rules: RULES.classic, questions, rnd: mulberry32(2) });
  while (!game.over) {
    game.answer(rarest(game.prompt));
    game.advance();
  }
  assert.equal(game.stops, 7 * 4 + 2 * STREAK_BONUS.hops);
  assert.equal(game.score, 700 + 2 * STREAK_BONUS.points);
});

test('misses hold your position and break the streak', () => {
  const game = new Game({ worldId: 'space', rules: RULES.classic, questions, rnd: mulberry32(3) });
  game.answer(commonest(game.prompt));
  game.advance();
  const before = game.stops;
  const miss = game.answer('zzzzqqqq');
  assert.equal(miss.kind, 'miss');
  assert.equal(miss.to, before);
  assert.equal(game.streak, 0);
  game.advance();
  assert.equal(game.timeout().kind, 'timeout');
});

test('the third right answer in a row earns a boost', () => {
  const game = new Game({ worldId: 'space', rules: RULES.classic, questions, rnd: mulberry32(4) });
  const outs = [];
  for (let i = 0; i < 3; i++) {
    outs.push(game.answer(commonest(game.prompt)));
    game.advance();
  }
  assert.deepEqual(outs.map((o) => o.boost), [false, false, true]);
  assert.equal(outs[2].hops, outs[2].tier.hops + STREAK_BONUS.hops);
});

test('survival deals prompts until the third miss', () => {
  const game = new Game({ worldId: 'space', rules: RULES.survival, questions, rnd: mulberry32(5) });
  // Answer every prompt once: no misses, so the run keeps going past the whole bank.
  for (let i = 0; i < questions.length; i++) {
    assert.equal(game.answer(commonest(game.prompt)).kind, 'hit');
    assert.equal(game.advance(), true);
  }
  // The deck has recycled. Giving the same answer again counts as a miss.
  const kinds = [];
  while (!game.over) {
    kinds.push(game.answer(commonest(game.prompt)).kind);
    game.advance();
  }
  assert.deepEqual(kinds, ['repeat', 'repeat', 'repeat']);
  assert.equal(game.strikes, 3);
  assert.equal(game.advance(), false);
});

test('daily deals the same prompts to everyone on a given day', () => {
  const day = dayKey(new Date('2026-11-11T12:00:00Z'));
  const a = makeDeck(questions, RULES.daily, { worldId: 'space', day }).planned.map((q) => q.id);
  const b = makeDeck(questions, RULES.daily, { worldId: 'space', day }).planned.map((q) => q.id);
  const other = makeDeck(questions, RULES.daily, { worldId: 'space', day: '2026-11-12' }).planned.map((q) => q.id);
  assert.deepEqual(a, b);
  assert.equal(a.length, 7);
  assert.notDeepEqual(a, other);
});
