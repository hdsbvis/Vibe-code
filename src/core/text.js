// Text normalising and typo tolerance for answer matching.

/** Reduce a word to a rough singular so "tomatoes" and "tomato" compare equal. */
export function stem(word) {
  if (word.length <= 3) return word;
  if (word.length > 4 && /ies$/.test(word)) return word.slice(0, -3) + 'y';
  if (word.length > 5 && /oes$/.test(word)) return word.slice(0, -2);
  if (/(ses|xes|ches|shes)$/.test(word)) return word.slice(0, -2);
  if (/s$/.test(word) && !/(ss|us|is)$/.test(word)) return word.slice(0, -1);
  return word;
}

/** Lowercase, strip accents and punctuation, drop a leading article, stem each word. */
export function norm(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/^(a|an|the|some|my)\s+/, '')
    .split(' ')
    .filter(Boolean)
    .map(stem)
    .join(' ');
}

/** Levenshtein distance, bailing out early when lengths differ by more than 2. */
export function lev(a, b) {
  if (Math.abs(a.length - b.length) > 2) return 9;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[b.length];
}

/** How many typos we forgive for a key of this length. Short words must be exact. */
export const tolerance = (len) => (len <= 4 ? 0 : len <= 7 ? 1 : 2);
