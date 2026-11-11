// One run of the game. Pure logic: no timers, no screen, no storage.
import { findAnswer } from './bank.js';
import { pointsFor, tierFor, STREAK_EVERY, STREAK_BONUS } from './scoring.js';
import { makeDeck, dayKey } from './rules.js';

/**
 * @typedef {Object} Outcome
 * @property {'hit'|'miss'|'timeout'|'repeat'} kind
 * @property {import('./bank.js').Answer|null} answer
 * @property {number} points   points gained, bonus included
 * @property {number} hops     stops gained, bonus included
 * @property {object|null} tier
 * @property {boolean} boost   true when a streak bonus fired
 * @property {number} from     stop index before
 * @property {number} to       stop index after
 * @property {number} streak
 * @property {number} strikes
 * @property {boolean} over
 */

export class Game {
  constructor({ worldId, rules, questions, day = dayKey(), rnd = Math.random }) {
    this.worldId = worldId;
    this.rules = rules;
    this.day = day;
    this.deck = makeDeck(questions, rules, { worldId, day, rnd });
    this.planned = this.deck.planned;
    this.score = 0;
    this.stops = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.strikes = 0;
    this.answered = 0;
    this.over = false;
    this.log = [];
    this.used = new Map(); // question id -> names already given this run
    this.prompt = this.deck.draw();
    this.resolved = false;
  }

  get promptNumber() {
    return this.answered + (this.resolved ? 0 : 1);
  }

  /** @returns {Outcome} */
  answer(raw) {
    if (this.over || this.resolved) throw new Error('No prompt is open');
    const text = (raw || '').trim();
    const question = this.prompt;
    const found = text ? findAnswer(question, text) : null;
    const usedHere = this.used.get(question.id) || new Set();

    let kind = 'miss';
    if (!text) kind = 'timeout';
    else if (found && usedHere.has(found.name)) kind = 'repeat';
    else if (found) kind = 'hit';

    const from = this.stops;
    let points = 0;
    let hops = 0;
    let tier = null;
    let boost = false;

    if (kind === 'hit') {
      usedHere.add(found.name);
      this.used.set(question.id, usedHere);
      points = pointsFor(found.pct);
      tier = tierFor(points);
      hops = tier.hops;
      this.streak += 1;
      this.bestStreak = Math.max(this.bestStreak, this.streak);
      if (this.streak % STREAK_EVERY === 0) {
        boost = true;
        points += STREAK_BONUS.points;
        hops += STREAK_BONUS.hops;
      }
      this.score += points;
      this.stops += hops;
    } else {
      this.streak = 0;
      this.strikes += 1;
    }

    this.answered += 1;
    this.resolved = true;
    this.over = this.strikes >= this.rules.strikes || this.answered >= this.rules.prompts;

    const outcome = {
      kind,
      answer: kind === 'hit' || kind === 'repeat' ? found : null,
      points,
      hops,
      tier,
      boost,
      from,
      to: this.stops,
      streak: this.streak,
      strikes: this.strikes,
      over: this.over,
    };
    this.log.push({ qid: question.id, q: question.q, raw: text, ...outcome });
    return outcome;
  }

  timeout() {
    return this.answer('');
  }

  /** Move to the next prompt. Returns false when the run has ended. */
  advance() {
    if (this.over) return false;
    this.prompt = this.deck.draw();
    this.resolved = false;
    return true;
  }

  summary() {
    const hits = this.log.filter((e) => e.kind === 'hit').length;
    return {
      worldId: this.worldId,
      rulesId: this.rules.id,
      day: this.day,
      score: this.score,
      stops: this.stops,
      hits,
      misses: this.log.length - hits,
      bestStreak: this.bestStreak,
      log: this.log,
    };
  }
}
