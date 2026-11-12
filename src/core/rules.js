// The three ways to play, and how each one deals prompts.
import { hashSeed, mulberry32, shuffle } from './rng.js';

export const RULES = {
  classic: {
    id: 'classic',
    name: 'Classic',
    blurb: '7 prompts. Get as far as you can.',
    prompts: 7,
    seconds: 25,
    strikes: Infinity,
  },
  daily: {
    id: 'daily',
    name: 'Daily',
    blurb: "Today's 7 prompts, the same for everyone.",
    prompts: 7,
    seconds: 25,
    strikes: Infinity,
    seeded: true,
  },
  survival: {
    id: 'survival',
    name: 'Survival',
    blurb: 'No prompt limit. Three misses end the run.',
    prompts: Infinity,
    seconds: 18,
    strikes: 3,
  },
};

export const RULE_LIST = [RULES.classic, RULES.daily, RULES.survival];

/** The day a Daily run belongs to, in UTC so it is the same for every player. */
export function dayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * The Daily's prompts for one day. The bank is shuffled once per cycle and dealt out a day at a
 * time, so no prompt comes back until every prompt has had its day.
 */
function dailyPrompts(questions, perDay, worldId, day) {
  const sorted = questions.slice().sort((a, b) => (a.id < b.id ? -1 : 1));
  const dayNumber = Math.floor(Date.parse(`${day}T00:00:00Z`) / DAY_MS);
  if (!Number.isFinite(dayNumber)) return shuffle(sorted, mulberry32(hashSeed(`${worldId}:${day}`))).slice(0, perDay);
  const daysPerCycle = Math.max(1, Math.floor(sorted.length / perDay));
  const cycle = Math.floor(dayNumber / daysPerCycle);
  const order = shuffle(sorted, mulberry32(hashSeed(`${worldId}:daily:${cycle}`)));
  const start = (dayNumber % daysPerCycle) * perDay;
  return order.slice(start, start + perDay);
}

/**
 * Put prompts the player has not completed first. `seen` lists completed ids, oldest first,
 * so when the fresh ones run out the ones completed longest ago come back first.
 */
function freshFirst(questions, seen, rnd) {
  const when = new Map(seen.map((id, i) => [id, i]));
  const fresh = shuffle(questions.filter((q) => !when.has(q.id)), rnd);
  const stale = questions.filter((q) => when.has(q.id)).sort((a, b) => when.get(a.id) - when.get(b.id));
  return [...fresh, ...stale];
}

/**
 * A deck hands out prompts one at a time.
 * Classic and Survival deal prompts the player has not completed before any they have.
 * Daily deals the same prompts to everyone. Survival reshuffles when it runs out.
 */
export function makeDeck(questions, rules, { worldId = '', day = dayKey(), rnd = Math.random, seen = [] } = {}) {
  const finite = Number.isFinite(rules.prompts);
  let pile;
  if (rules.seeded) pile = dailyPrompts(questions, rules.prompts, worldId, day);
  else if (finite) pile = shuffle(freshFirst(questions, seen, rnd).slice(0, rules.prompts), rnd);
  else pile = freshFirst(questions, seen, rnd);
  let cursor = 0;
  return {
    /** Every prompt this deck will deal, when that is known up front. */
    planned: finite ? pile.slice() : null,
    draw() {
      if (cursor >= pile.length) {
        if (finite) return null;
        const last = pile[pile.length - 1];
        pile = shuffle(questions, rnd);
        if (pile.length > 1 && pile[0] === last) pile.push(pile.shift());
        cursor = 0;
      }
      return pile[cursor++];
    },
  };
}
