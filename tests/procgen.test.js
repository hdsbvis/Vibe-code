import test from 'node:test';
import assert from 'node:assert/strict';
import { spacePlace, oceanPlace, hslHex } from '../src/worlds/procgen.js';
import { parseBank } from '../src/core/bank.js';
import { Game } from '../src/core/game.js';
import { RULES } from '../src/core/rules.js';
import { mulberry32 } from '../src/core/rng.js';
import spaceBank from '../src/data/space.bank.js';

test('generated places are the same every time', () => {
  assert.deepEqual(spacePlace(40, 12), spacePlace(40, 12));
  assert.deepEqual(oceanPlace(40, 9), oceanPlace(40, 9));
  assert.notEqual(spacePlace(40, 12).name, spacePlace(41, 13).name);
});

test('space generates every kind of place, with names and notes', () => {
  const kinds = new Set();
  const types = new Set();
  for (let i = 29; i < 400; i++) {
    const p = spacePlace(i, i - 28);
    kinds.add(p.kind);
    if (p.gen) types.add(p.gen.type);
    assert.ok(p.name && p.note, `stop ${i} has a name and note`);
    assert.equal(p.procedural, true);
  }
  for (const k of ['planet', 'star', 'binary', 'nebula', 'galaxy', 'blackhole', 'pulsar', 'cluster', 'comets', 'belt']) assert.ok(kinds.has(k), k);
  for (const t of ['rocky', 'gas', 'ocean', 'lava', 'ice', 'jungle', 'crystal', 'toxic']) assert.ok(types.has(t), t);
  assert.equal(spacePlace(29, 1).kind, 'planet'); // the first step off the map is always a world to land by
});

test('ocean generates every kind of zone', () => {
  const zones = new Set();
  for (let i = 31; i < 300; i++) {
    const z = oceanPlace(i, i - 30);
    zones.add(z.zone);
    assert.ok(z.name && z.note && Array.isArray(z.fauna));
  }
  for (const k of ['glowgarden', 'brine', 'whalefall', 'crystals', 'icecave', 'ruins', 'vents', 'wreck', 'jellybloom', 'leviathan', 'trench']) assert.ok(zones.has(k), k);
});

test('colours are valid hex', () => {
  for (const h of [0, 0.3, 0.99, 1.4, -0.2]) assert.match(hslHex(h, 0.6, 0.5), /^#[0-9a-f]{6}$/);
});

test('endless never ends by itself, and can be finished', () => {
  const questions = parseBank(spaceBank);
  const game = new Game({ worldId: 'space', rules: RULES.endless, questions, rnd: mulberry32(3) });
  for (let i = 0; i < 60; i++) {
    game.answer(i % 2 ? 'zzzqqq' : game.prompt.answers[0].name);
    assert.equal(game.over, false);
    assert.equal(game.advance(), true);
  }
  game.finish();
  assert.equal(game.over, true);
  assert.equal(game.advance(), false);
  assert.equal(game.summary().log.length, 60);
});
