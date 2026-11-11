// How an answer's rarity turns into points and into stops along the route.

/** Decades of rarity that span the full 0-100 point range. */
export const RARITY_SPAN = 3.5;

/** share% -> points. 40% is about 11 points, 2% about 49, 0.1% about 86, 0.03% and rarer = 100. */
export function pointsFor(pct) {
  return Math.max(5, Math.min(100, Math.round((-Math.log10(pct / 100) / RARITY_SPAN) * 100)));
}

/** The share% at which an answer is worth exactly `points`. */
export function pctForPoints(points) {
  return 100 * Math.pow(10, (-RARITY_SPAN * points) / 100);
}

/** Rarity tiers. Each right answer moves you `hops` stops along the route. */
export const TIERS = [
  { id: 'common', label: 'Common', min: 0, hops: 1 },
  { id: 'uncommon', label: 'Uncommon', min: 20, hops: 2 },
  { id: 'rare', label: 'Rare', min: 45, hops: 3 },
  { id: 'legendary', label: 'Legendary', min: 70, hops: 4 },
];

export function tierFor(points) {
  let tier = TIERS[0];
  for (const t of TIERS) if (points >= t.min) tier = t;
  return tier;
}

export const hopsFor = (points) => tierFor(points).hops;

/** Every third right answer in a row earns a boost. */
export const STREAK_EVERY = 3;
export const STREAK_BONUS = { points: 25, hops: 1 };

export const RANKS = [
  [0, 'Stowaway'],
  [100, 'Cadet'],
  [200, 'Navigator'],
  [300, 'Pathfinder'],
  [400, 'Trailblazer'],
  [520, 'Ace'],
  [640, 'Legend'],
];

export function rankFor(score) {
  let name = RANKS[0][1];
  for (const [min, label] of RANKS) if (score >= min) name = label;
  return name;
}
