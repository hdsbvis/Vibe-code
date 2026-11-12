import test from 'node:test';
import assert from 'node:assert/strict';
import { parseBank, parseQuestion, findAnswer } from '../src/core/bank.js';
import { norm, stem } from '../src/core/text.js';
import { BANKS } from '../src/data/index.js';

const { space, ocean } = BANKS;
const byId = (bank, id) => bank.find((q) => q.id === id);
const hit = (bank, id, text) => findAnswer(byId(bank, id), text)?.name ?? null;

test('norm strips case, accents, articles and plurals', () => {
  assert.equal(norm('The Tomatoes'), 'tomato');
  assert.equal(norm('  Crêpes! '), 'crepe');
  assert.equal(norm("Noah's Ark"), 'noah ark');
  assert.equal(stem('ties'), 'tie');
  assert.equal(stem('berries'), 'berry');
});

test('both line formats parse', () => {
  const q = parseQuestion({ id: 'x', q: 'x', a: 'Alpha|30|a1,a2\n0.5|Beta/b1;Gamma\n' });
  assert.deepEqual(q.answers.map((a) => a.name), ['Alpha', 'Beta', 'Gamma']);
  assert.equal(findAnswer(q, 'a2').name, 'Alpha');
  assert.equal(findAnswer(q, 'b1').pct, 0.5);
});

test('every question has an id, a prompt and a healthy chart', () => {
  const ids = new Set();
  for (const q of [...space, ...ocean]) {
    assert.ok(q.id && q.q, 'id and prompt');
    assert.ok(!ids.has(q.id), `duplicate id ${q.id}`);
    ids.add(q.id);
    assert.ok(q.answers.length >= 30, `${q.id} has only ${q.answers.length} answers`);
    assert.ok(q.answers[0].pct >= 10, `${q.id} has no common answer`);
    for (const a of q.answers) assert.ok(a.pct > 0 && a.pct <= 60, `${q.id}/${a.name} share ${a.pct}`);
  }
  assert.ok(space.length >= 91);
  assert.ok(ocean.length >= 45);
});

test('space answers match, including aliases and typos', () => {
  assert.equal(hit(space, 'red-inside', 'Tomatoes'), 'Tomato');
  assert.equal(hit(space, 'red-inside', 'a juicy blood orange'), 'Blood orange');
  assert.equal(hit(space, 'red-inside', 'strawbery'), 'Strawberry');
  assert.equal(hit(space, 'red-inside', 'apple'), null);
  assert.equal(hit(space, 'australia', 'huntsman spider'), 'Huntsman spider');
  assert.equal(hit(space, 'australia', 'bin chicken'), 'Ibis');
  assert.equal(hit(space, 'pasta', 'bow ties'), 'Farfalle');
  assert.equal(hit(space, 'moons', 'the moon'), 'The Moon');
  assert.equal(hit(space, 'moons', 'io'), 'Io');
});

test('ocean answers match', () => {
  assert.equal(hit(ocean, 'sharks', 'great white'), 'Great white shark');
  assert.equal(hit(ocean, 'sharks', 'hammerhead sharks'), 'Hammerhead shark');
  assert.equal(hit(ocean, 'cetaceans', 'killer whale'), 'Orca');
  assert.equal(hit(ocean, 'seas', 'the pacific'), 'Pacific Ocean');
  assert.equal(hit(ocean, 'rivers', 'river thames'), 'Thames');
  assert.equal(hit(ocean, 'pirates', 'Captain Jack Sparrow'), 'Jack Sparrow');
  assert.equal(hit(ocean, 'ships', 'the titanic'), 'Titanic');
  assert.equal(hit(ocean, 'scuba', 'flippers'), 'Fins');
  assert.equal(hit(ocean, 'sharks', 'goldfish'), null);
});

test('new prompts match, including names with symbols', () => {
  assert.equal(hit(space, 'programming', 'c++'), 'C++');
  assert.equal(hit(space, 'programming', 'C#'), 'C#');
  assert.equal(hit(space, 'programming', 'c'), 'C');
  assert.equal(hit(space, 'disney-pixar', 'toy story 3'), 'Toy Story');
  assert.equal(hit(space, 'disney-pixar', '101 dalmatians'), 'One Hundred and One Dalmatians');
  assert.equal(hit(space, 'video-games', '2048'), '2048');
  assert.equal(hit(space, 'elements', 'aluminum'), 'Aluminium');
  assert.equal(hit(space, 'us-states', 'new york'), 'New York');
  assert.equal(hit(ocean, 'landlocked', 'czechia'), 'Czech Republic');
  assert.equal(hit(ocean, 'sea-songs', 'row row row your boat'), 'Row, Row, Row Your Boat');
  assert.equal(hit(ocean, 'any-fish', 'whale'), null);
  assert.equal(byId(space, 'us-states').answers.length, 50);
  assert.equal(byId(space, 'elements').answers.length, 118);
  assert.equal(byId(ocean, 'landlocked').answers.length, 45);
});
