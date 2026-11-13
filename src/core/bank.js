// Turns the compact text in src/data/*.bank.js into searchable question objects.
import { norm, lev, tolerance } from './text.js';

const NUMERIC = /^\d*\.?\d+$/;

/**
 * @typedef {{name: string, pct: number, aliases: string[]}} Answer
 * @typedef {{id: string, q: string, answers: Answer[], map: Map<string, Answer>}} Question
 */

/** @returns {Question} */
export function parseQuestion({ id, q, a }) {
  const answers = [];
  const map = new Map();
  const add = (name, pct, aliases) => {
    const key = norm(name);
    if (!key || map.has(key) || !(pct > 0)) return; // first listing wins
    const answer = { name, pct, aliases };
    answers.push(answer);
    for (const label of [name, ...aliases]) {
      const n = norm(label);
      if (!n) continue;
      if (!map.has(n)) map.set(n, answer);
      const squashed = n.replace(/ /g, '');
      if (!map.has(squashed)) map.set(squashed, answer);
    }
  };

  for (const raw of a.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    const parts = line.split('|');
    if (NUMERIC.test(parts[0].trim())) {
      // share|Name/alias;Name/alias
      const pct = parseFloat(parts[0]);
      for (const item of (parts[1] || '').split(';')) {
        const [name, ...aliases] = item.split('/').map((s) => s.trim()).filter(Boolean);
        if (name) add(name, pct, aliases);
      }
    } else {
      // Name|share|alias,alias
      const aliases = (parts[2] || '').split(',').map((s) => s.trim()).filter(Boolean);
      add(parts[0].trim(), parseFloat(parts[1]), aliases);
    }
  }

  answers.sort((x, y) => y.pct - x.pct);
  return { id, q, answers, map };
}

/** @returns {Question[]} */
export const parseBank = (list) => list.map(parseQuestion);

/**
 * Find the charted answer a player meant, or null.
 * Tries an exact match, then any run of words inside the input, then small typos.
 * @param {Question} question
 * @param {string} raw
 * @returns {Answer | null}
 */
export function findAnswer(question, raw) {
  const n = norm(raw);
  if (!n) return null;
  const squashed = n.replace(/ /g, '');
  const { map } = question;
  if (map.has(n)) return map.get(n);
  if (map.has(squashed)) return map.get(squashed);

  const words = n.split(' ');
  for (let len = words.length - 1; len >= 1; len--) {
    for (let start = 0; start + len <= words.length; start++) {
      const sub = words.slice(start, start + len).join(' ');
      if (map.has(sub)) return map.get(sub);
      const subSquashed = sub.replace(/ /g, '');
      if (subSquashed.length > 3 && map.has(subSquashed)) return map.get(subSquashed);
    }
  }

  let best = null;
  let bestDistance = 9;
  for (const [key, answer] of map) {
    const allowed = tolerance(key.length);
    if (!allowed) continue;
    const distance = lev(squashed, key.replace(/ /g, ''));
    if (distance <= allowed && distance < bestDistance) {
      best = answer;
      bestDistance = distance;
    }
  }
  return best;
}
