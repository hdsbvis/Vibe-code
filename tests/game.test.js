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

test('prompts already completed are dealt last', () => {
  const seen = questions.slice(0, questions.length - 7).map((q) => q.id);
  const fresh = new Set(questions.slice(-7).map((q) => q.id));
  const deck = makeDeck(questions, RULES.classic, { seen, rnd: mulberry32(9) });
  assert.deepEqual(new Set(deck.planned.map((q) => q.id)), fresh);

  // With only 3 fresh prompts left, the 4 completed longest ago fill the gap.
  const mostlySeen = questions.slice(0, questions.length - 3).map((q) => q.id);
  const mixed = makeDeck(questions, RULES.classic, { seen: mostlySeen, rnd: mulberry32(9) }).planned.map((q) => q.id);
  const expected = new Set([...questions.slice(-3).map((q) => q.id), ...mostlySeen.slice(0, 4)]);
  assert.deepEqual(new Set(mixed), expected);

  const survival = makeDeck(questions, RULES.survival, { seen: [questions[0].id], rnd: mulberry32(9) });
  const dealt = questions.map(() => survival.draw().id);
  assert.equal(dealt[dealt.length - 1], questions[0].id);
});

test('the daily does not repeat a prompt until the whole bank has been used', () => {
  const days = Math.floor(questions.length / 7);
  const start = Math.ceil(Date.UTC(2026, 10, 12) / 86400000 / days) * days; // first day of a cycle
  const used = new Set();
  for (let d = 0; d < days; d++) {
    const day = new Date((start + d) * 86400000).toISOString().slice(0, 10);
    for (const q of makeDeck(questions, RULES.daily, { worldId: 'space', day }).planned) {
      assert.ok(!used.has(q.id), `${q.id} repeated on ${day}`);
      used.add(q.id);
    }
  }
  assert.equal(used.size, days * 7);
});
