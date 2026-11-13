// Places past the end of each world's charted route, generated from the stop number.
// The same stop number always gives the same place, for every player.
import { hashSeed, mulberry32 } from '../core/rng.js';

const pickFrom = (rnd, list) => list[Math.floor(rnd() * list.length)];
const between = (rnd, lo, hi) => lo + rnd() * (hi - lo);
const chance = (rnd, p) => rnd() < p;

/** Choose a key from {key: weight}. */
function weighted(rnd, table) {
  const total = Object.values(table).reduce((a, b) => a + b, 0);
  let roll = rnd() * total;
  for (const [key, weight] of Object.entries(table)) {
    roll -= weight;
    if (roll <= 0) return key;
  }
  return Object.keys(table)[0];
}

/** HSL (0-1 each) to a #rrggbb string. */
export function hslHex(h, s, l) {
  const hue = ((h % 1) + 1) % 1;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + hue * 12) % 12;
    const c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(c * 255).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// ---------- names ----------
const ONSETS = ['K', 'Z', 'V', 'X', 'Th', 'Qu', 'S', 'R', 'M', 'N', 'L', 'D', 'T', 'Br', 'Kr', 'Vel', 'Or', 'Ae', 'Ny', 'Cy', 'Sol', 'Ix', 'Ul', 'Ze'];
const VOWELS = ['a', 'e', 'i', 'o', 'u', 'ae', 'io', 'y', 'ia', 'ou'];
const CODAS = ['r', 'n', 'x', 'th', 's', 'l', 'm', 'nd', 'rk', 'z', 'v', '', '', ''];
const ENDINGS = ['os', 'is', 'ar', 'ion', 'ax', 'ea', 'un', 'or', 'ix', 'ara', 'eth', 'yra'];

function coined(rnd) {
  let word = pickFrom(rnd, ONSETS) + pickFrom(rnd, VOWELS) + pickFrom(rnd, CODAS);
  if (chance(rnd, 0.6)) word += pickFrom(rnd, ['', 'a', 'o', 'e']) + pickFrom(rnd, ENDINGS);
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
const CATALOGUES = ['HD', 'Kepler', 'Gliese', 'TOI', 'WASP', 'HIP', 'KOI', 'LHS', 'Ross', 'Wolf', 'TYC', 'GJ'];
const catalogue = (rnd) => `${pickFrom(rnd, CATALOGUES)}-${Math.floor(between(rnd, 10, 9999))}`;
const GREEK = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Sigma', 'Tau', 'Omega'];

// ---------- space ----------
const PLANET_TYPES = {
  rocky: { label: 'Rocky world', weight: 3 },
  gas: { label: 'Gas giant', weight: 3 },
  ocean: { label: 'Ocean world', weight: 2 },
  lava: { label: 'Lava world', weight: 2 },
  ice: { label: 'Ice world', weight: 2 },
  jungle: { label: 'Jungle world', weight: 1.5 },
  crystal: { label: 'Crystal world', weight: 1 },
  toxic: { label: 'Toxic world', weight: 1 },
};

// Star colours by spectral class, hottest first.
const STAR_CLASSES = [
  { cls: 'O', label: 'Blue supergiant', color: '#8fb4ff', hot: '#ffffff', size: [1.2, 1.6] },
  { cls: 'B', label: 'Blue giant', color: '#a9c8ff', hot: '#ffffff', size: [1, 1.35] },
  { cls: 'A', label: 'White star', color: '#dfe8ff', hot: '#ffffff', size: [0.85, 1.1] },
  { cls: 'F', label: 'Yellow-white star', color: '#fff3c4', hot: '#ffffff', size: [0.8, 1] },
  { cls: 'G', label: 'Yellow star', color: '#ffd84d', hot: '#fff6c4', size: [0.75, 1] },
  { cls: 'K', label: 'Orange star', color: '#ff9a3d', hot: '#ffd29a', size: [0.65, 0.9] },
  { cls: 'M', label: 'Red dwarf', color: '#ff5f4d', hot: '#ffb89a', size: [0.5, 0.75] },
  { cls: 'M', label: 'Red supergiant', color: '#ff6a2a', hot: '#ffb36b', size: [1.4, 1.8], lumpy: true },
];

const NEBULA_STYLES = [
  { label: 'Emission nebula', hues: [0.92, 0.97, 0.02, 0.8] },
  { label: 'Reflection nebula', hues: [0.58, 0.62, 0.55, 0.66] },
  { label: 'Planetary nebula', hues: [0.45, 0.5, 0.95, 0.12] },
  { label: 'Dark nebula', hues: [0.7, 0.75, 0.65, 0.08], dim: true },
  { label: 'Supernova remnant', hues: [0.08, 0.02, 0.58, 0.14] },
];
const NEBULA_NAMES = ['Veil', 'Lantern', 'Ember', 'Wraith', 'Moth', 'Serpent', 'Hourglass', 'Jellyfish', 'Phoenix', 'Lagoon', 'Owl', 'Cocoon', 'Heart', 'Rose', 'Ghost', 'Butterfly', 'Eye', 'Spider', 'Halo', 'Wishbone'];

const SPACE_KINDS = { planet: 36, star: 13, binary: 6, nebula: 12, galaxy: 10, blackhole: 5, pulsar: 5, cluster: 5, comets: 4, belt: 4 };

/** The generated Space stop at route index `i`. `n` counts generated stops (1 = the first). */
export function spacePlace(i, n) {
  const rnd = mulberry32(hashSeed(`space:${i}`));
  const kind = n === 1 ? 'planet' : weighted(rnd, SPACE_KINDS);
  const hue = rnd();
  const base = { procedural: true, sector: n, km: null, ufos: Math.floor(between(rnd, 0, 3.6)) };

  if (kind === 'planet') {
    const type = weighted(rnd, Object.fromEntries(Object.entries(PLANET_TYPES).map(([k, v]) => [k, v.weight])));
    const moons = Math.floor(between(rnd, 0, type === 'gas' ? 4.5 : 2.6));
    const rings = type === 'gas' ? (chance(rnd, 0.55) ? (chance(rnd, 0.7) ? 'flat' : 'tall') : null) : chance(rnd, 0.15) ? 'flat' : null;
    const name = chance(rnd, 0.5) ? `${catalogue(rnd)} ${pickFrom(rnd, ['b', 'c', 'd', 'e', 'f', 'g'])}` : coined(rnd);
    const bits = [PLANET_TYPES[type].label];
    if (rings) bits.push('rings');
    if (moons) bits.push(`${moons} ${moons === 1 ? 'moon' : 'moons'}`);
    return {
      ...base,
      kind: 'planet',
      gen: { type, hue, seed: i, moons, ringHue: rnd() },
      name,
      note: bits.join(' · '),
      rings,
      halo: type === 'gas' || type === 'toxic' || type === 'lava' ? hslHex(hue, 0.7, 0.6) : null,
      size: between(rnd, type === 'gas' ? 1 : 0.65, type === 'gas' ? 1.3 : 1),
      spin: between(rnd, 0.04, 0.25),
      sun: chance(rnd, 0.35) ? pickFrom(rnd, STAR_CLASSES).color : null,
      crew: chance(rnd, 0.75) ? { kind: 'alien', color: hslHex(hue + 0.45, 0.9, 0.68), n: 1 + Math.floor(rnd() * 4) } : null,
    };
  }
  if (kind === 'star') {
    const c = pickFrom(rnd, STAR_CLASSES);
    return {
      ...base,
      kind: 'star',
      name: chance(rnd, 0.5) ? `${pickFrom(rnd, GREEK)} ${coined(rnd)}` : catalogue(rnd),
      note: `${c.label} · class ${c.cls}`,
      color: c.color,
      hot: c.hot,
      size: between(rnd, c.size[0], c.size[1]),
      lumpy: !!c.lumpy,
      rays: chance(rnd, 0.35),
      flares: chance(rnd, 0.5),
      ring: chance(rnd, 0.2) ? hslHex(hue, 0.5, 0.55) : null,
    };
  }
  if (kind === 'binary') {
    const a = pickFrom(rnd, STAR_CLASSES.slice(0, 7));
    const b = pickFrom(rnd, STAR_CLASSES.slice(0, 7));
    return { ...base, kind: 'binary', name: `${coined(rnd)} A and B`, note: 'Binary stars in orbit', stars: [a, b] };
  }
  if (kind === 'nebula') {
    const style = pickFrom(rnd, NEBULA_STYLES);
    const shift = rnd() * 0.15;
    const colors = style.hues.map((h, k) => hslHex(h + shift, style.dim ? 0.35 : 0.75, style.dim ? 0.3 + k * 0.06 : 0.55 + (k % 2) * 0.12));
    return { ...base, kind: 'nebula', name: `The ${pickFrom(rnd, NEBULA_NAMES)} Nebula`, note: style.label, colors, seed: Math.floor(rnd() * 50), pulsar: style.label === 'Supernova remnant' };
  }
  if (kind === 'galaxy') {
    const shape = weighted(rnd, { spiral: 5, cloud: 2, elliptical: 3 });
    const tint = [hslHex(hue, 0.6, 0.88), hslHex(hue + 0.08, 0.7, 0.78), hslHex(hue + 0.5, 0.65, 0.72)];
    const label = shape === 'spiral' ? 'Spiral galaxy' : shape === 'cloud' ? 'Irregular galaxy' : 'Elliptical galaxy';
    return { ...base, kind: 'galaxy', shape, tint, name: chance(rnd, 0.5) ? `NGC ${Math.floor(between(rnd, 100, 7840))}` : `The ${coined(rnd)} Galaxy`, note: label };
  }
  if (kind === 'blackhole') {
    return { ...base, kind: 'blackhole', name: `${coined(rnd)} X-${Math.floor(between(rnd, 1, 9))}`, note: 'Black hole · do not get closer' };
  }
  if (kind === 'pulsar') {
    return { ...base, kind: 'pulsar', name: `PSR J${Math.floor(between(rnd, 1000, 2399))}+${Math.floor(between(rnd, 10, 89))}`, note: 'Pulsar · spinning neutron star', color: hslHex(0.55 + rnd() * 0.15, 0.8, 0.75), rate: between(rnd, 3, 9) };
  }
  if (kind === 'cluster') {
    return { ...base, kind: 'cluster', name: `The ${coined(rnd)} Cluster`, note: 'Open star cluster', hue, seed: i };
  }
  if (kind === 'belt') {
    return { ...base, kind: 'belt', name: `${coined(rnd)} Belt`, note: 'Asteroid belt', crew: chance(rnd, 0.6) ? { kind: 'alien', color: hslHex(hue + 0.3, 0.9, 0.7), n: 2 } : null };
  }
  return { ...base, kind: 'comets', name: `${coined(rnd)} Swarm`, note: 'Comet swarm' };
}

// ---------- ocean ----------
const ZONES = {
  glowgarden: { weight: 4, label: 'Glowing coral garden', places: ['Gardens', 'Grotto', 'Meadow', 'Reef'] },
  brine: { weight: 3, label: 'Brine pool, a lake on the sea floor', places: ['Pool', 'Mirror', 'Lake', 'Basin'] },
  whalefall: { weight: 3, label: 'Whale fall, a feast for the deep', places: ['Bones', 'Rest', 'Remains', 'Ribs'] },
  crystals: { weight: 3, label: 'Crystal cavern', places: ['Caverns', 'Hollow', 'Vault', 'Geode'] },
  icecave: { weight: 2, label: 'Caves under the polar ice', places: ['Ice Caves', 'Ice Shelf', 'Frost Halls'] },
  ruins: { weight: 3, label: 'Sunken city', places: ['City', 'Citadel', 'Temple', 'Halls'] },
  vents: { weight: 3, label: 'Hydrothermal vent field', places: ['Vents', 'Chimneys', 'Forge', 'Smokers'] },
  wreck: { weight: 2, label: 'Uncharted shipwreck', places: [] },
  jellybloom: { weight: 3, label: 'Jellyfish bloom', places: ['Bloom', 'Swarm', 'Drift'] },
  leviathan: { weight: 2, label: 'Something very large lives here', places: ['Lair', 'Den', 'Deep'] },
  trench: { weight: 3, label: 'Unmapped trench', places: ['Rift', 'Chasm', 'Trench', 'Abyss'] },
};
const ADJECTIVES = ['Glimmering', 'Silent', 'Drowned', 'Hollow', 'Sunless', 'Whispering', 'Shimmering', 'Forgotten', 'Cobalt', 'Pale', 'Midnight', 'Lantern', 'Velvet', 'Sapphire', 'Ghostly', 'Starlit', 'Emerald', 'Coral', 'Obsidian', 'Moonless', 'Singing', 'Crimson', 'Opal', 'Frozen'];
const SHIP_NAMES = ['Silver Gull', 'Northern Star', 'Mary Ellen', 'Albatross', 'Lady Grace', 'Iron Duke', 'Sea Sparrow', 'Golden Fleece', 'Morning Tide', 'Wandering Heron', 'Saltwind', 'Persephone'];
const GLOWS = ['#7dfff0', '#ff8ad8', '#ffe066', '#b6ff5e', '#8fb4ff', '#ff9a5e', '#c58bff'];

/** The generated Ocean zone at route index `i`. `n` counts generated zones (1 = the first). */
export function oceanPlace(i, n) {
  const rnd = mulberry32(hashSeed(`ocean:${i}`));
  const kind = weighted(rnd, Object.fromEntries(Object.entries(ZONES).map(([k, v]) => [k, v.weight])));
  const zone = ZONES[kind];
  const glow = pickFrom(rnd, GLOWS);
  const glow2 = pickFrom(rnd, GLOWS);
  const name = kind === 'wreck' ? `Wreck of the ${pickFrom(rnd, SHIP_NAMES)}` : `The ${pickFrom(rnd, ADJECTIVES)} ${pickFrom(rnd, zone.places)}`;
  const jellyPal = { j: glow, l: '#ffffff' };
  const sparks = ['spark', 8 + Math.floor(rnd() * 10), 'spark', 0.1, 0.9, { color: glow }];
  const fauna = {
    glowgarden: [sparks, ['jelly', 2, 'drift', 0.2, 0.6, { pal: jellyPal }], ['fish', 4, 'school', 0.3, 0.5, { pal: { b: glow2, l: '#ffffff' } }]],
    brine: [['crab', 3, 'walk', 0, 0, { pal: { c: '#efeaff' } }], ['spark', 6, 'spark', 0.2, 0.7, { color: glow }]],
    whalefall: [['seapig', 3, 'walk'], ['crab', 2, 'walk', 0, 0, { pal: { c: '#ffb6c9' } }], ['fish', 3, 'swim', 0.35, 0.6, { pal: { b: '#9aa8c0', l: '#dfe6f2' } }]],
    crystals: [sparks, ['angler', 1 + Math.floor(rnd() * 2), 'lurk', 0.3, 0.6]],
    icecave: [['jelly', 2, 'drift', 0.3, 0.7, { pal: { j: '#bfe6ff', l: '#ffffff' } }], ['fish', 4, 'school', 0.4, 0.6, { pal: { b: '#dfe9f5', l: '#ffffff' } }]],
    ruins: [['fish', 6, 'school', 0.25, 0.5, { pal: { b: '#ffcf4d', l: '#fff3c4' } }], ['seahorse', 2, 'drift', 0.45, 0.65], sparks],
    vents: [['crab', 3, 'walk', 0, 0, { pal: { c: '#efeaff' } }], ['fish', 2, 'swim', 0.35, 0.55, { pal: { b: '#9aa8c0', l: '#dfe6f2' } }]],
    wreck: [['fish', 4, 'swim', 0.25, 0.55, { pal: { b: '#9aa8c0', l: '#dfe6f2' } }], ['angler', 1, 'lurk', 0.35, 0.5]],
    jellybloom: [['jelly', 7 + Math.floor(rnd() * 5), 'drift', 0.1, 0.85, { pal: jellyPal }], sparks],
    leviathan: [[chance(rnd, 0.5) ? 'squid' : 'whale', 1, 'loom', 0.42, 0.42, { scale: 3, pal: chance(rnd, 0.5) ? null : { r: glow2, d: '#3a1f4a' } }], sparks],
    trench: [sparks, [pickFrom(rnd, ['dumbo', 'vampire', 'angler', 'snailfish']), 2, 'drift', 0.3, 0.7]],
  }[kind];
  const floor = { glowgarden: 'glowgarden', brine: 'brine', whalefall: 'whalefall', crystals: 'crystals', icecave: 'icecave', ruins: 'ruins', vents: 'vents', wreck: 'wreck', jellybloom: null, leviathan: 'trenchfloor', trench: 'trench' }[kind];
  return { procedural: true, sector: n, m: null, name, note: zone.label, zone: kind, floor, fauna, glow, glow2, seed: i };
}
