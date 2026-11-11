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

/**
 * A deck hands out prompts one at a time.
 * Finite rule sets draw without repeats; Survival reshuffles when it runs out.
 */
export function makeDeck(questions, rules, { worldId = '', day = dayKey(), rnd = Math.random } = {}) {
  const random = rules.seeded ? mulberry32(hashSeed(`${worldId}:${day}`)) : rnd;
  let pile = shuffle(questions, random);
  if (Number.isFinite(rules.prompts)) pile = pile.slice(0, rules.prompts);
  let cursor = 0;
  return {
    /** Every prompt this deck will deal, when that is known up front. */
    planned: Number.isFinite(rules.prompts) ? pile.slice() : null,
    draw() {
      if (cursor >= pile.length) {
        if (Number.isFinite(rules.prompts)) return null;
        const last = pile[pile.length - 1];
        pile = shuffle(questions, random);
        if (pile.length > 1 && pile[0] === last) pile.push(pile.shift());
        cursor = 0;
      }
      return pile[cursor++];
    },
  };
}
