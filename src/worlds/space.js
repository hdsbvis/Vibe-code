// The Space world: 28 stops from the launch pad to the edge of the observable universe.
import {
  fl, rand, clamp, hash, fbm, shade, hsl, emit, burst, disc, glow, sphere, stamp, cachedLayer, reduceMotion,
} from '../gfx/canvas.js';
import { sprite } from '../gfx/sprites.js';
import { tone, hiss } from '../audio/synth.js';
import { spacePlace, hslHex } from './procgen.js';

const LY = 9.461e12; // kilometres in a light-year
const TAU = Math.PI * 2;
const wrap = (lon) => ((lon % TAU) + TAU) % TAU;
const pick = (list, i) => list[clamp(fl(i), 0, list.length - 1)];

// ---------- surface painters: (tx, ty, v, lon) -> hex ----------
const PAINT = {
  earth: (tx, ty, v) =>
    Math.abs(v) > 0.86 ? '#eef4ff'
      : hash(fl(tx / 5) + 77, fl(ty / 3)) > 0.86 ? '#eef4ff'
      : hash(fl(tx / 4), fl(ty / 3)) > 0.6 ? '#3fae6a' : '#2f6fd6',
  moon: (tx, ty) =>
    hash(fl(tx / 3), fl(ty / 3)) > 0.82 ? '#8f89a8' : hash(fl(tx / 7), fl(ty / 6)) > 0.7 ? '#b3adc9' : '#d6d0ea',
  venus: (tx, ty, v) => pick(['#f3d27a', '#e2b65a', '#f7e2a0', '#d9a84e', '#f3d27a'], (v + 1) * 2.5 + Math.sin(tx * 0.12 + v * 3) * 0.6),
  mars: (tx, ty, v) =>
    Math.abs(v) > 0.84 ? '#ffe9df'
      : hash(fl(tx / 4), fl(ty / 2)) > 0.72 ? '#a83a22'
      : hash(fl(tx / 6), fl(ty / 5)) > 0.6 ? '#c94b2c' : '#e66a42',
  mercury: (tx, ty) =>
    hash(fl(tx / 3), fl(ty / 3)) > 0.8 ? '#6b6058' : hash(fl(tx / 6), fl(ty / 5)) > 0.65 ? '#8f8278' : '#a89a8d',
  ceres: (tx, ty) =>
    hash(fl(tx / 2), fl(ty / 2)) > 0.93 ? '#f4f1ea' : hash(fl(tx / 4), fl(ty / 4)) > 0.6 ? '#7d7468' : '#9a9084',
  rock: (tx, ty) =>
    hash(fl(tx / 2), fl(ty / 2)) > 0.8 ? '#6d5a48' : hash(fl(tx / 5), fl(ty / 4)) > 0.55 ? '#9a8268' : '#b89b7c',
  jupiter: (tx, ty, v, lon) => {
    if (Math.abs(wrap(lon) - 1.2) < 0.35 && Math.abs(v - 0.32) < 0.12) return '#c4553a';
    return pick(
      ['#efd8b4', '#c98d57', '#f3e1c0', '#b8784a', '#ead2ac', '#d39b62', '#f0dcb8', '#b8784a', '#e8c79c', '#c98d57'],
      (v + 1) * 5 + Math.sin(tx * 0.15) * 0.35,
    );
  },
  saturn: (tx, ty, v) =>
    pick(['#f4dc9a', '#dcbc72', '#f1d38a', '#c9a65a', '#f4dc9a', '#e1c27c'], (v + 1) * 3 + Math.sin(tx * 0.1) * 0.2),
  uranus: (tx, ty, v) =>
    Math.abs(v) > 0.85 ? '#d3faf8' : hash(fl(tx / 9), fl(ty / 2)) > 0.9 ? '#86dede' : '#a6ecec',
  neptune: (tx, ty, v, lon) => {
    if (Math.abs(wrap(lon) - 2) < 0.3 && Math.abs(v + 0.25) < 0.1) return '#26389a';
    return Math.abs(v - 0.15) < 0.08 ? '#a7bcff' : hash(fl(tx / 6), fl(ty / 2)) > 0.88 ? '#3550c8' : '#4f6cf0';
  },
  pluto: (tx, ty, v, lon) => {
    const d = Math.abs(wrap(lon) - 1.4);
    if (v > -0.25 && v < 0.5 && d + Math.max(0, v - 0.05) * 1.2 < 0.7) return '#f3e3cf';
    return hash(fl(tx / 3), fl(ty / 3)) > 0.7 ? '#8a6a55' : '#b08a6e';
  },
  proxima: (tx, ty, v) =>
    Math.abs(v) > 0.82 ? '#e7d9ff'
      : hash(fl(tx / 5), fl(ty / 4)) > 0.58 ? '#2fd4a8'
      : hash(fl(tx / 3) + 5, fl(ty / 3)) > 0.85 ? '#ff8ad8' : '#6a3fb5',
  ice: (tx, ty) => (hash(fl(tx / 2), fl(ty / 2)) > 0.7 ? '#bfe6ff' : '#eef8ff'),
};

// Painters for generated planets, one style per planet type, coloured from the planet's hue.
const genPainters = new Map();
function genPaint(gen) {
  const key = `${gen.type}:${gen.seed}`;
  let paint = genPainters.get(key);
  if (paint) return paint;
  const h = gen.hue;
  const c = (dh, s, l) => hslHex(h + dh, s, l);
  const sd = gen.seed % 97;
  switch (gen.type) {
    case 'gas': {
      const bands = [c(0, 0.55, 0.72), c(0.03, 0.6, 0.55), c(-0.02, 0.45, 0.8), c(0.05, 0.6, 0.48), c(0, 0.5, 0.66), c(0.08, 0.55, 0.6)];
      paint = (tx, ty, v, lon) => {
        if (Math.abs(wrap(lon) - 2.4) < 0.3 && Math.abs(v - 0.25) < 0.1) return c(0.5, 0.6, 0.55);
        return pick(bands, (v + 1) * 4 + Math.sin(tx * 0.13 + sd) * 0.6 + fbm(tx * 0.08, ty * 0.3) * 0.8);
      };
      break;
    }
    case 'ocean':
      paint = (tx, ty, v) => (Math.abs(v) > 0.82 ? '#f2f8ff' : fbm(tx * 0.07 + sd, ty * 0.07) > 0.62 ? c(0.3, 0.45, 0.55) : fbm(tx * 0.2, ty * 0.2 + sd) > 0.72 ? '#eef4ff' : c(0, 0.7, 0.42));
      break;
    case 'lava':
      paint = (tx, ty) => { const n = fbm(tx * 0.12 + sd, ty * 0.12); return Math.abs(n - 0.5) < 0.03 ? '#ffd84d' : Math.abs(n - 0.5) < 0.06 ? '#ff7a2a' : n > 0.6 ? '#3a2420' : '#241414'; };
      break;
    case 'ice':
      paint = (tx, ty) => { const n = fbm(tx * 0.1 + sd, ty * 0.1); return Math.abs(n - 0.5) < 0.025 ? c(0, 0.6, 0.55) : n > 0.55 ? '#eef8ff' : c(0, 0.45, 0.82); };
      break;
    case 'jungle':
      paint = (tx, ty, v) => (Math.abs(v) > 0.86 ? '#eef4ff' : fbm(tx * 0.08 + sd, ty * 0.08) > 0.55 ? c(0, 0.6, 0.35) : fbm(tx * 0.25, ty * 0.25) > 0.6 ? c(0.05, 0.6, 0.48) : c(0.25, 0.6, 0.4));
      break;
    case 'crystal':
      paint = (tx, ty) => { const k = hash(fl(tx / 4) + sd, fl(ty / 4)); return k > 0.8 ? '#ffffff' : k > 0.55 ? c(0, 0.7, 0.7) : k > 0.3 ? c(0.08, 0.6, 0.55) : c(-0.06, 0.65, 0.42); };
      break;
    case 'toxic':
      paint = (tx, ty, v) => pick([c(0, 0.75, 0.55), c(0.04, 0.7, 0.42), c(-0.03, 0.8, 0.62), c(0.08, 0.6, 0.35)], (v + 1) * 2 + fbm(tx * 0.15 + sd, ty * 0.2) * 1.8);
      break;
    default: // rocky
      paint = (tx, ty) => (hash(fl(tx / 3) + sd, fl(ty / 3)) > 0.84 ? c(0, 0.15, 0.3) : fbm(tx * 0.1, ty * 0.1 + sd) > 0.55 ? c(0, 0.25, 0.5) : c(0.02, 0.2, 0.62));
  }
  genPainters.set(key, paint);
  return paint;
}

function drawMoons(V, gen, cx, cy, r, t, front) {
  for (let k = 0; k < gen.moons; k++) {
    const a = t * (0.7 - k * 0.15) + k * 2.1;
    if ((Math.sin(a) > 0) !== front) continue;
    const mr = 1.4 + ((gen.seed + k) % 3) * 0.7;
    sphere(V, cx + Math.cos(a) * r * (1.6 + k * 0.35), cy + Math.sin(a) * r * 0.32, mr, k % 2 ? PAINT.moon : PAINT.mercury, t * 0.2);
  }
}

const beyondPainters = new Map();
function beyondPaint(seed) {
  let paint = beyondPainters.get(seed);
  if (!paint) {
    const h = hash(seed, 3);
    const land = hsl(h, 0.6, 0.55);
    const sea = hsl((h + 0.15) % 1, 0.55, 0.4);
    const cap = hsl((h + 0.5) % 1, 0.5, 0.78);
    paint = (tx, ty, v) =>
      Math.abs(v) > 0.84 ? cap : hash(fl(tx / 5) + seed, fl(ty / 4)) > 0.55 ? sea : land;
    beyondPainters.set(seed, paint);
  }
  return paint;
}

// ---------- the route ----------
const ALIEN = (color, n = 3) => ({ kind: 'alien', color, n });
const ROUTE = [
  { name: 'Earth', kind: 'home', km: 0 },
  { name: 'Low Earth Orbit', kind: 'leo', km: 400, crew: { kind: 'astro', n: 2 } },
  { name: 'The Moon', kind: 'planet', paint: 'moon', km: 384400, crew: { kind: 'astro', n: 2 }, flag: true, spin: 0.05 },
  { name: 'Venus', kind: 'planet', paint: 'venus', km: 38e6, halo: '#f5d58a', spin: 0.08 },
  { name: 'Mars', kind: 'planet', paint: 'mars', km: 55e6, crew: ALIEN('#7dff8a'), rover: true, spin: 0.09 },
  { name: 'Mercury', kind: 'planet', paint: 'mercury', km: 77e6, size: 0.8, spin: 0.04 },
  { name: 'The Sun', kind: 'star', color: '#ffb52e', hot: '#fff3a8', km: 150e6, size: 1.25, flares: true },
  { name: 'Ceres', kind: 'belt', km: 263e6, crew: ALIEN('#c58bff', 2) },
  { name: 'Jupiter', kind: 'planet', paint: 'jupiter', km: 588e6, halo: '#e8b27a', crew: ALIEN('#5ef2ff'), size: 1.15, spin: 0.22 },
  { name: 'Saturn', kind: 'planet', paint: 'saturn', km: 1.2e9, rings: 'flat', crew: ALIEN('#ff8ad8'), spin: 0.2 },
  { name: 'Uranus', kind: 'planet', paint: 'uranus', km: 2.6e9, rings: 'tall', crew: ALIEN('#ffe066', 2), spin: 0.14 },
  { name: 'Neptune', kind: 'planet', paint: 'neptune', km: 4.3e9, halo: '#6b8bff', crew: ALIEN('#b6ff5e'), spin: 0.16 },
  { name: 'Pluto', kind: 'planet', paint: 'pluto', km: 5e9, size: 0.65, crew: ALIEN('#ff8a8a', 2), spin: 0.05 },
  { name: 'Voyager 1', kind: 'probe', km: 25e9 },
  { name: 'Oort Cloud', kind: 'comets', km: 0.8 * LY },
  { name: 'Proxima b', kind: 'planet', paint: 'proxima', km: 4.2 * LY, sun: '#ff5f4d', crew: ALIEN('#ffe066', 4), spin: 0.1 },
  { name: "Barnard's Star", kind: 'star', color: '#ff6a3d', hot: '#ffc29a', km: 6 * LY, size: 0.7, ufos: 1 },
  { name: 'Sirius', kind: 'star', color: '#a9c8ff', hot: '#ffffff', km: 8.6 * LY, size: 1, ufos: 2, rays: true },
  { name: 'Vega', kind: 'star', color: '#c4d6ff', hot: '#ffffff', km: 25 * LY, size: 1.05, ufos: 2, ring: '#6f8fd6' },
  { name: 'TRAPPIST-1', kind: 'trappist', km: 40 * LY, ufos: 2 },
  { name: 'The Pleiades', kind: 'cluster', km: 444 * LY, ufos: 2 },
  { name: 'Betelgeuse', kind: 'star', color: '#ff6a2a', hot: '#ffb36b', km: 550 * LY, size: 1.6, lumpy: true, ufos: 2 },
  { name: 'Orion Nebula', kind: 'nebula', colors: ['#ff5fa2', '#b06bff', '#5ef2ff', '#ff8ad8'], km: 1344 * LY, ufos: 2 },
  { name: 'Crab Nebula', kind: 'nebula', colors: ['#ffb547', '#ff7a4d', '#5ec8ff', '#ffe066'], km: 6500 * LY, pulsar: true, ufos: 2 },
  { name: 'Sagittarius A*', kind: 'blackhole', km: 26000 * LY, ufos: 1 },
  { name: 'Large Magellanic Cloud', kind: 'galaxy', shape: 'cloud', km: 160000 * LY, ufos: 3 },
  { name: 'Andromeda Galaxy', kind: 'galaxy', shape: 'spiral', km: 2.5e6 * LY, ufos: 3 },
  { name: 'Virgo Cluster', kind: 'galaxies', km: 54e6 * LY, ufos: 3 },
  { name: 'Edge of the Universe', kind: 'edge', km: 46.5e9 * LY, ufos: 4 },
];
const LAST = ROUTE.length - 1;

// Past the edge of the universe, every stop is generated.
const generated = new Map();
function stop(i) {
  if (i <= LAST) return ROUTE[i];
  let place = generated.get(i);
  if (!place) {
    place = spacePlace(i, i - LAST);
    if (generated.size > 400) generated.clear();
    generated.set(i, place);
  }
  return place;
}

const commas = (n) => Math.round(n).toLocaleString('en-US');
function distance(s) {
  if (s.kind === 'home') return 'On the launch pad';
  if (s.procedural) return `Uncharted space · sector ${s.sector}`;
  if (s.km == null) return 'Off the charts';
  const km = s.km;
  if (km < 1e6) return `${commas(km)} km from Earth`;
  if (km < 1e9) return `${commas(km / 1e6)} million km from Earth`;
  if (km < 1e12) return `${(km / 1e9).toFixed(1)} billion km from Earth`;
  const ly = km / LY;
  if (ly < 10) return `${ly.toFixed(1)} light-years from Earth`;
  if (ly < 1e6) return `${commas(ly)} light-years from Earth`;
  if (ly < 1e9) return `${(ly / 1e6).toFixed(1)} million light-years from Earth`;
  return `${(ly / 1e9).toFixed(1)} billion light-years from Earth`;
}
function short(s) {
  if (s.kind === 'home') return '0 km';
  if (s.procedural) return `Sec ${s.sector}`;
  if (s.km == null) return '???';
  const km = s.km;
  if (km < 1e3) return `${Math.round(km)} km`;
  if (km < 1e6) return `${Math.round(km / 1e3)}K km`;
  if (km < 1e9) return `${Math.round(km / 1e6)}M km`;
  if (km < 1e12) return `${(km / 1e9).toFixed(1)}B km`;
  const ly = km / LY;
  if (ly < 10) return `${ly.toFixed(1)} ly`;
  if (ly < 1e3) return `${Math.round(ly)} ly`;
  if (ly < 1e6) return `${(ly / 1e3).toFixed(ly < 1e4 ? 1 : 0)}K ly`;
  if (ly < 1e9) return `${(ly / 1e6).toFixed(1)}M ly`;
  return `${(ly / 1e9).toFixed(1)}B ly`;
}

// ---------- layout ----------
function layout(V) {
  const br = clamp(Math.min(V.W * 0.22, V.H * 0.3), 8, 34);
  return { bx: V.W * 0.6, by: V.H * 0.47, br };
}
const horizonR = (V) => V.W * 1.5;
function horizonY(V, x, off = 0) {
  const R = horizonR(V);
  const cy = V.H + R - 12 + off;
  return cy - Math.sqrt(Math.max(0, R * R - (x - V.W / 2) ** 2));
}

// ---------- pieces ----------
function drawCrew(V, crew, cx, cy, r, t, party) {
  if (!crew) return;
  const lively = party < 4200;
  for (let i = 0; i < crew.n; i++) {
    const since = party - 300 - i * 200;
    if (since < 0) continue;
    const a = -Math.PI / 2 + (i - (crew.n - 1) / 2) * 0.44;
    const pop = Math.min(1, since / 250);
    const hop = Math.max(0, Math.sin(t * (lively ? 5 : 2) + i * 1.7)) * (lively ? 2.6 : 1);
    const frame = fl(t * 4 + i) % 2;
    const s = crew.kind === 'astro' ? sprite('astro', frame) : sprite('alien', frame, { x: crew.color });
    stamp(V, s, cx + Math.cos(a) * r, cy + Math.sin(a) * r - s.height / 2 + 1 + (1 - pop) * 5 - hop);
  }
}

function drawUfos(V, n, cx, cy, r, t, party) {
  if (!n) return;
  const speed = party < 4200 ? 1.4 : 0.5;
  for (let i = 0; i < n; i++) {
    if (party - 400 - i * 250 < 0) continue;
    const a = t * speed + i * (TAU / n);
    const x = cx + Math.cos(a) * r * 2;
    const y = cy - r * 0.9 + Math.sin(a * 1.3 + i) * r * 0.45;
    stamp(V, sprite('ufo', fl(t * 6 + i)), x, y);
  }
}

function drawRings(V, cx, cy, r, front, tall) {
  const g = V.g;
  for (let a = 0; a < TAU; a += 0.015) {
    const s = Math.sin(a);
    const c = Math.cos(a);
    if (tall ? (c > 0) !== front : (s > 0) !== front) continue;
    const bands = tall ? [[1.5, '#bfeeee'], [1.4, '#8fd0d0']] : [[1.95, '#e6d29c'], [1.8, '#cbb47e'], [1.6, '#9c8a63']];
    for (const [k, color] of bands) {
      g.fillStyle = color;
      if (tall) g.fillRect(Math.round(cx + c * r * k * 0.3), Math.round(cy + s * r * k), 1, 1);
      else g.fillRect(Math.round(cx + c * r * k), Math.round(cy + s * r * k * 0.24), 1, 1);
    }
  }
}

function drawStar(V, s, cx, cy, r, t) {
  const g = V.g;
  glow(V, cx, cy, r * 0.72, s.color, 0.9);
  if (s.ring) {
    g.fillStyle = s.ring;
    for (let a = 0; a < TAU; a += 0.03) g.fillRect(Math.round(cx + Math.cos(a) * r * 2.3), Math.round(cy + Math.sin(a) * r * 0.5), 1, 1);
  }
  if (s.lumpy) {
    for (let i = 0; i < 7; i++) {
      const a = i * 0.9 + Math.sin(t * 0.4 + i) * 0.2;
      disc(V, cx + Math.cos(a) * r * 0.55, cy + Math.sin(a) * r * 0.55, r * (0.5 + 0.08 * Math.sin(t * 0.8 + i * 2)), s.color);
    }
  }
  disc(V, cx, cy, r, s.color);
  disc(V, cx - r * 0.12, cy - r * 0.12, r * 0.7, shade(s.color, 1.15));
  disc(V, cx - r * 0.2, cy - r * 0.2, r * 0.4, s.hot);
  // granulation that drifts across the face
  for (let i = 0; i < r * 1.5; i++) {
    const a = hash(i, 9) * TAU + t * 0.1;
    const d = hash(i, 4) * r * 0.9;
    g.fillStyle = i % 2 ? s.hot : shade(s.color, 0.8);
    g.fillRect(Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d), 1, 1);
  }
  if (s.rays) {
    g.fillStyle = '#ffffff';
    const len = r * (1.5 + 0.2 * Math.sin(t * 3));
    for (let k = r; k < len; k++) {
      g.globalAlpha = 1 - (k - r) / (len - r);
      g.fillRect(Math.round(cx + k), Math.round(cy), 1, 1);
      g.fillRect(Math.round(cx - k), Math.round(cy), 1, 1);
      g.fillRect(Math.round(cx), Math.round(cy + k), 1, 1);
      g.fillRect(Math.round(cx), Math.round(cy - k), 1, 1);
    }
    g.globalAlpha = 1;
  }
  if (s.flares && Math.random() < 0.25) {
    const a = rand(0, TAU);
    emit(V, 2, {
      x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, angle: a, spread: 0.4,
      speed: [4, 12], life: [0.4, 1], colors: [s.hot, s.color, '#ff5f4d'], drag: 1,
    });
  }
}

function nebulaLayer(id, w, h, colors, seed, strength = 1) {
  return cachedLayer(`nebula:${id}`, w, h, (g, W, H) => {
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const nx = (x / W - 0.5) * 2;
        const ny = (y / H - 0.5) * 2;
        const a = fbm(x * 0.09 + seed, y * 0.09 + seed * 2) * 1.7 - Math.sqrt(nx * nx + ny * ny) * 1.05;
        if (a <= 0.08) continue;
        g.globalAlpha = (a > 0.55 ? 0.95 : a > 0.3 ? 0.65 : 0.35) * strength;
        g.fillStyle = colors[fl(fbm(x * 0.05 + seed * 3, y * 0.05) * colors.length * 1.3) % colors.length];
        g.fillRect(x, y, 1, 1);
      }
    }
  });
}

function twinkles(V, cx, cy, w, h, n, t, seed) {
  const g = V.g;
  for (let i = 0; i < n; i++) {
    g.globalAlpha = 0.5 + 0.5 * Math.sin(t * (1 + hash(i, seed)) * 3 + i);
    g.fillStyle = i % 3 ? '#ffffff' : '#ffe9b8';
    g.fillRect(Math.round(cx + (hash(i, seed + 1) - 0.5) * w), Math.round(cy + (hash(i, seed + 2) - 0.5) * h), 1, 1);
  }
  g.globalAlpha = 1;
}

const SPIRAL = Array.from({ length: 320 }, (_, i) => {
  const k = (i % 160) / 160;
  return { r: 0.08 + k * 0.95 + (hash(i, 1) - 0.5) * 0.1, a: k * 3.4 * Math.PI + (i < 160 ? 0 : Math.PI) + (hash(i, 2) - 0.5) * 0.5, b: hash(i, 3) };
});
const CLOUD = Array.from({ length: 260 }, (_, i) => ({
  x: i < 70 ? (hash(i, 1) - 0.5) * 1.3 : (hash(i, 1) + hash(i, 2) - 1) * 1.7,
  y: i < 70 ? (hash(i, 3) - 0.5) * 0.22 + (hash(i, 1) - 0.5) * 0.35 : (hash(i, 3) + hash(i, 4) - 1) * 1.05,
  b: hash(i, 5),
}));
const PLEIADES = [[-1, -0.6], [-0.3, -0.95], [0.45, -0.5], [0.95, -0.1], [0.2, 0.25], [-0.55, 0.4], [0.75, 0.75]];
const TRAPPIST_COLORS = ['#c9a37a', '#e0b98a', '#6fb7d6', '#7fd4c0', '#9a8fd0', '#b0c4de', '#dfe6ee'];

function drawGalaxy(V, shape, cx, cy, r, t, tint = null) {
  const g = V.g;
  const [core, mid, outer] = tint || ['#fff3c4', '#ffd6ea', '#9fc4ff'];
  if (shape === 'elliptical') {
    glow(V, cx, cy, r * 0.55, mid, 0.6);
    for (const [i, p] of CLOUD.entries()) {
      const d = Math.hypot(p.x, p.y / 0.6);
      g.globalAlpha = Math.max(0.15, 1 - d * 0.55);
      g.fillStyle = d < 0.5 ? core : d < 1 ? mid : outer;
      g.fillRect(Math.round(cx + p.x * r * 1.1), Math.round(cy + p.y * r * 0.75), 1, 1);
    }
    g.globalAlpha = 1;
    disc(V, cx, cy, Math.max(2, r * 0.22), core);
    return;
  }
  if (shape === 'spiral') {
    const rot = reduceMotion ? 0 : t * 0.12;
    const cosT = Math.cos(-0.45);
    const sinT = Math.sin(-0.45);
    glow(V, cx, cy, r * 0.35, core, 1);
    for (const p of SPIRAL) {
      const x = Math.cos(p.a + rot) * p.r;
      const y = Math.sin(p.a + rot) * p.r * 0.42;
      g.globalAlpha = 0.45 + p.b * 0.55;
      g.fillStyle = p.r < 0.28 ? core : p.r < 0.62 ? mid : outer;
      g.fillRect(Math.round(cx + (x * cosT - y * sinT) * r * 1.9), Math.round(cy + (x * sinT + y * cosT) * r * 1.9), 1, 1);
    }
    g.globalAlpha = 1;
    disc(V, cx, cy, Math.max(1.5, r * 0.14), core);
  } else {
    glow(V, cx, cy, r * 0.8, '#6f8fd6', 0.55);
    for (const [i, p] of CLOUD.entries()) {
      g.globalAlpha = 0.55 + p.b * 0.45;
      g.fillStyle = i < 70 ? core : p.b > 0.9 ? '#ff8ad8' : p.b > 0.5 ? mid : outer;
      const size = i < 70 || p.b > 0.8 ? 2 : 1;
      g.fillRect(Math.round(cx + p.x * r * 1.3), Math.round(cy + p.y * r * 1.3 + Math.sin(t * 0.5 + i) * 0.3), size, size);
    }
    g.globalAlpha = 1;
  }
}

function drawBlackHole(V, cx, cy, r, t) {
  const g = V.g;
  const hot = ['#fff3c4', '#ffd84d', '#ffb347', '#ff7a2a', '#c9451e'];
  const arc = (front) => {
    for (let a = 0; a < TAU; a += 0.012) {
      if ((Math.sin(a) > 0) !== front) continue;
      for (let k = 1.25; k < 2.3; k += 0.12) {
        const bright = 0.5 + 0.5 * Math.sin(a * 2 - t * 2.2 + k * 3);
        g.globalAlpha = 0.35 + bright * 0.65;
        g.fillStyle = hot[clamp(fl((k - 1.25) * 4.2 + (1 - bright) * 1.2), 0, 4)];
        g.fillRect(Math.round(cx + Math.cos(a) * r * k), Math.round(cy + Math.sin(a) * r * k * 0.2), 1, 1);
      }
    }
    g.globalAlpha = 1;
  };
  glow(V, cx, cy, r * 1.3, '#ff7a2a', 0.8);
  arc(false);
  // light bent over the top and under the bottom of the hole
  for (let a = 0; a < TAU; a += 0.02) {
    g.globalAlpha = 0.55 + 0.45 * Math.sin(a * 3 + t * 2);
    g.fillStyle = a > Math.PI ? '#ffd84d' : '#ff9a3d';
    g.fillRect(Math.round(cx + Math.cos(a) * r * 1.22), Math.round(cy + Math.sin(a) * r * 1.22), 1, 1);
    g.fillRect(Math.round(cx + Math.cos(a) * r * 1.12), Math.round(cy + Math.sin(a) * r * 1.12), 1, 1);
  }
  g.globalAlpha = 1;
  disc(V, cx, cy, r, '#000000');
  arc(true);
  if (Math.random() < 0.3) {
    const a = rand(0, TAU);
    emit(V, 1, {
      x: cx + Math.cos(a) * r * 2.6, y: cy + Math.sin(a) * r * 0.7, angle: a + Math.PI * 0.75, spread: 0.2,
      speed: [8, 16], life: [0.5, 0.9], colors: ['#fff3c4', '#ffb347', '#c9451e'],
    });
  }
}

function drawEdge(V, oy, t) {
  const w = V.W;
  const h = Math.round(V.H * 0.62);
  const layer = cachedLayer('edge', w, h, (g, W, H) => {
    const scale = ['#1b2a7a', '#2f6fd6', '#5ef2d6', '#ffe066', '#ff8a2a', '#ff5f4d'];
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const nx = (x / W - 0.5) * 2;
        const rim = H * (0.62 + 0.33 * nx * nx);
        if (y > rim) continue;
        const fade = (rim - y) / (H * 0.25);
        if (fade < 1 && hash(x, y) > fade) continue;
        const n = fbm(x * 0.13, y * 0.13);
        g.fillStyle = scale[clamp(fl((n - 0.28) * 12), 0, 5)];
        g.fillRect(x, y, 1, 1);
      }
    }
  });
  V.g.globalAlpha = 0.7 + 0.08 * Math.sin(t * 1.5);
  V.g.drawImage(layer, 0, Math.round(oy));
  V.g.globalAlpha = 1;
  twinkles(V, w / 2, oy + h * 0.3, w, h * 0.6, 14, t, 31);
}

function drawHome(V, oy, t) {
  const g = V.g;
  const R = horizonR(V);
  const cx = V.W / 2;
  const cy = V.H + R - 12 + oy;
  g.globalAlpha = 0.3;
  disc(V, cx, cy, R + 1.5, '#5ef2ff');
  g.globalAlpha = 1;
  sphere(V, cx, cy, R, PAINT.earth, t * 0.03, true);
  const x = cx + 9;
  const y = horizonY(V, x, oy);
  g.fillStyle = '#3b3388';
  g.fillRect(Math.round(x), Math.round(y - 16), 2, 16);
  for (let k = 0; k < 4; k++) g.fillRect(Math.round(x - 2), Math.round(y - 15 + k * 4), 3, 1);
  if (fl(t * 2) % 2) {
    g.fillStyle = '#ff5fa2';
    g.fillRect(Math.round(x), Math.round(y - 17), 2, 1);
  }
}

// ---------- world API ----------
/** Draw one stop. `oy` scrolls it vertically; `party` is milliseconds since the player arrived. */
function drawStop(V, s, oy, t, party = Infinity) {
  if (Math.abs(oy) > V.H * 1.6) return;
  const { bx, br } = layout(V);
  const by = layout(V).by + oy;
  const g = V.g;
  const r = br * (s.size || 1);

  switch (s.kind) {
    case 'home':
      drawHome(V, oy, t);
      break;

    case 'leo': {
      // The Earth always rises from below, whichever way you are travelling.
      const er = br * 2.7;
      const ey = by - oy + Math.abs(oy) + br * 2.9;
      g.globalAlpha = 0.3;
      disc(V, bx - br * 0.3, ey, er + 1.5, '#5ef2ff');
      g.globalAlpha = 1;
      sphere(V, bx - br * 0.3, ey, er, PAINT.earth, t * 0.06);
      const sx = bx + Math.sin(t * 0.35) * br * 0.9;
      const sy = by - br * 0.5 + Math.cos(t * 0.5) * 2;
      stamp(V, sprite('station'), sx, sy);
      for (let i = 0; i < s.crew.n; i++) {
        if (party - 300 - i * 250 < 0) continue;
        stamp(V, sprite('astro', fl(t * 3 + i)), sx - 12 + i * 24, sy + 9 + Math.sin(t * 2 + i * 2) * 3, { angle: Math.sin(t + i) * 0.4 });
      }
      break;
    }

    case 'planet': {
      if (s.sun) {
        const sx = bx - br * 2.1;
        const sy = by - br * 1.3;
        glow(V, sx, sy, br * 0.5, s.sun, 1);
        disc(V, sx, sy, br * 0.45, s.sun);
        disc(V, sx - 1, sy - 1, br * 0.22, '#ffd29a');
      }
      if (s.halo) glow(V, bx, by, r, s.halo, 0.45);
      if (s.rings) drawRings(V, bx, by, r, false, s.rings === 'tall');
      if (s.gen) drawMoons(V, s.gen, bx, by, r, t, false);
      const paint = s.gen ? genPaint(s.gen) : s.beyond ? beyondPaint(s.beyond) : PAINT[s.paint];
      sphere(V, bx, by, r, paint, reduceMotion ? 0 : t * (s.spin || 0.1));
      if (s.rings) drawRings(V, bx, by, r, true, s.rings === 'tall');
      if (s.gen) drawMoons(V, s.gen, bx, by, r, t, true);
      if (s.flag) stamp(V, sprite('flag'), bx + r * 0.55, by - r * 0.84 - 2);
      if (s.rover) stamp(V, sprite('rover'), bx - r * 0.5 + Math.sin(t * 0.6) * 2, by - r * 0.86 - 2);
      drawCrew(V, s.crew, bx, by, r, t, party);
      break;
    }

    case 'star':
      drawStar(V, s, bx, by, r, t);
      drawUfos(V, s.ufos, bx, by, r, t, party);
      break;

    case 'belt': {
      for (let i = 0; i < 16; i++) {
        const a = i * 0.83 + t * 0.12 * (i % 2 ? 1 : -1);
        const rr = br * (0.75 + (i % 5) * 0.22);
        sphere(V, bx + Math.cos(a) * rr * 1.35, by + Math.sin(a) * rr * 0.5, 1.5 + (i % 4) * 1.3, PAINT.rock, t + i);
      }
      sphere(V, bx, by, br * 0.6, PAINT.ceres, t * 0.1);
      drawCrew(V, s.crew, bx, by, br * 0.6, t, party);
      break;
    }

    case 'probe': {
      g.fillStyle = '#ffd84d';
      g.fillRect(Math.round(V.W * 0.1), Math.round(V.H * 0.86 + oy), 1, 1);
      glow(V, V.W * 0.1, V.H * 0.86 + oy, 1.5, '#ffd84d', 0.8);
      for (let k = 1; k < 12; k++) {
        g.globalAlpha = 0.5 - k * 0.04;
        g.fillStyle = '#8b84bb';
        g.fillRect(Math.round(bx - 8 - k * 5), Math.round(by + 4 + k * 3.2), 1, 1);
      }
      g.globalAlpha = 1;
      stamp(V, sprite('probe'), bx, by + Math.sin(t * 0.8) * 1.5, { angle: Math.sin(t * 0.4) * 0.12 });
      if (fl(t * 2) % 2) {
        g.fillStyle = '#fff6c4';
        g.fillRect(Math.round(bx), Math.round(by + 1 + Math.sin(t * 0.8) * 1.5), 1, 1);
      }
      break;
    }

    case 'comets': {
      g.fillStyle = '#ffd84d';
      g.fillRect(Math.round(V.W * 0.08), Math.round(V.H * 0.9 + oy), 1, 1);
      for (let i = 0; i < 8; i++) {
        const x = bx + (hash(i, 11) - 0.5) * br * 4 + Math.sin(t * 0.3 + i) * 1.5;
        const y = by + (hash(i, 12) - 0.5) * br * 2.6 + Math.cos(t * 0.25 + i * 2) * 1.5;
        const size = 1.6 + hash(i, 13) * 2.4;
        const len = 6 + fl(hash(i, 14) * 10);
        for (let k = 1; k < len; k++) {
          g.globalAlpha = (1 - k / len) * (0.5 + 0.2 * Math.sin(t * 4 + i + k));
          g.fillStyle = k % 2 ? '#bfe6ff' : '#eef8ff';
          g.fillRect(Math.round(x + k * 1.1), Math.round(y - k * 0.65), k < 3 ? 2 : 1, 1);
        }
        g.globalAlpha = 1;
        sphere(V, x, y, size, PAINT.ice, t * 0.3 + i);
      }
      break;
    }

    case 'trappist': {
      const sx = bx - br * 0.9;
      const planets = TRAPPIST_COLORS.map((color, i) => {
        const a = t * (1.5 / (i + 1.4)) + i * 1.3;
        const rr = br * (0.75 + i * 0.3);
        return { x: sx + Math.cos(a) * rr, y: by + Math.sin(a) * rr * 0.3, back: Math.sin(a) < 0, color, size: 1.3 + (i % 3) * 0.5 };
      });
      for (const p of planets) if (p.back) disc(V, p.x, p.y, p.size, p.color);
      drawStar(V, { color: '#ff5f3d', hot: '#ffb89a' }, sx, by, br * 0.45, t);
      for (const p of planets) if (!p.back) disc(V, p.x, p.y, p.size, p.color);
      drawUfos(V, s.ufos, bx, by, br, t, party);
      break;
    }

    case 'cluster': {
      const w = Math.round(br * 4.4);
      const h = Math.round(br * 3.4);
      const haze = s.procedural ? [hslHex(s.hue, 0.6, 0.45), hslHex(s.hue + 0.05, 0.7, 0.62), hslHex(s.hue - 0.05, 0.6, 0.32)] : ['#3f6fd6', '#6f9bff', '#2a4a9a'];
      g.drawImage(nebulaLayer(s.procedural ? `cluster${s.seed}` : 'pleiades', w, h, haze, s.procedural ? s.seed % 40 : 5, 0.55), Math.round(bx - w / 2), Math.round(by - h / 2));
      const layout = s.procedural ? Array.from({ length: 6 + (s.seed % 5) }, (_, k) => [hash(k, s.seed) * 2 - 1, hash(k + 9, s.seed) * 2 - 1]) : PLEIADES;
      layout.forEach(([px, py], i) => {
        const x = Math.round(bx + px * br * 1.5);
        const y = Math.round(by + py * br * 1.2);
        const tw = 0.7 + 0.3 * Math.sin(t * 2.5 + i * 1.9);
        glow(V, x, y, 2.4, s.procedural ? hslHex(s.hue, 0.7, 0.75) : '#9fc4ff', tw);
        g.fillStyle = '#ffffff';
        g.fillRect(x - 2, y, 5, 1);
        g.fillRect(x, y - 2, 1, 5);
      });
      drawUfos(V, s.ufos, bx, by, br, t, party);
      break;
    }

    case 'nebula': {
      const w = Math.round(br * 4.6);
      const h = Math.round(br * 3.4);
      g.globalAlpha = 0.85 + 0.15 * Math.sin(t * 0.9);
      g.drawImage(nebulaLayer(s.name, w, h, s.colors, s.seed ?? (s.pulsar ? 9 : 2)), Math.round(bx - w / 2), Math.round(by - h / 2));
      g.globalAlpha = 1;
      twinkles(V, bx, by, w * 0.8, h * 0.8, 16, t, s.pulsar ? 3 : 7);
      if (s.pulsar) {
        const on = fl(t * 6) % 2;
        g.fillStyle = '#ffffff';
        g.fillRect(Math.round(bx) - 1, Math.round(by) - 1, 2, 2);
        if (on) {
          g.globalAlpha = 0.7;
          for (let k = 2; k < br * 1.2; k++) {
            g.fillRect(Math.round(bx + k * 0.8), Math.round(by - k * 0.6), 1, 1);
            g.fillRect(Math.round(bx - k * 0.8), Math.round(by + k * 0.6), 1, 1);
          }
          g.globalAlpha = 1;
        }
      }
      drawUfos(V, s.ufos, bx, by, br, t, party);
      break;
    }

    case 'binary': {
      const a = reduceMotion ? 0.6 : t * 0.8;
      const pair = s.stars.map((c, k) => ({ c, x: bx + Math.cos(a + k * Math.PI) * br * 0.95, y: by + Math.sin(a + k * Math.PI) * br * 0.3, back: Math.sin(a + k * Math.PI) < 0 }));
      // a stream of gas pulled from one star to the other
      g.fillStyle = pair[1].c.color;
      for (let k = 0; k < 14; k++) {
        const q = k / 14;
        g.globalAlpha = 0.5 * (1 - q);
        g.fillRect(Math.round(pair[1].x + (pair[0].x - pair[1].x) * q), Math.round(pair[1].y + (pair[0].y - pair[1].y) * q + Math.sin(q * Math.PI) * 4), 1, 1);
      }
      g.globalAlpha = 1;
      for (const p of pair.filter((q) => q.back)) drawStar(V, { color: p.c.color, hot: p.c.hot }, p.x, p.y, br * 0.45 * p.c.size[0], t);
      for (const p of pair.filter((q) => !q.back)) drawStar(V, { color: p.c.color, hot: p.c.hot }, p.x, p.y, br * 0.45 * p.c.size[0], t);
      drawUfos(V, s.ufos, bx, by, br, t, party);
      break;
    }

    case 'pulsar': {
      const spinA = reduceMotion ? 0.5 : t * s.rate * 0.6;
      const flash = 0.5 + 0.5 * Math.sin(t * s.rate * 2);
      glow(V, bx, by, br * 0.3, s.color, 0.6 + flash * 0.6);
      g.fillStyle = s.color;
      for (const dir of [0, Math.PI]) {
        for (let k = 3; k < br * 2.2; k++) {
          g.globalAlpha = (1 - k / (br * 2.2)) * (0.5 + flash * 0.5);
          const spread = 1 + fl(k / 9);
          g.fillRect(Math.round(bx + Math.cos(spinA + dir) * k), Math.round(by + Math.sin(spinA + dir) * k * 0.6), spread, spread);
        }
      }
      g.globalAlpha = 1;
      disc(V, bx, by, 2.5, '#ffffff');
      drawUfos(V, s.ufos, bx, by, br, t, party);
      break;
    }

    case 'blackhole':
      drawBlackHole(V, bx, by, br * 0.75, t);
      drawUfos(V, s.ufos, bx, by, br * 1.2, t, party);
      break;

    case 'galaxy':
      drawGalaxy(V, s.shape, bx, by, br, t, s.tint);
      drawUfos(V, s.ufos, bx, by, br, t, party);
      break;

    case 'galaxies': {
      glow(V, bx, by, 4, '#ffe9b8', 1);
      disc(V, bx, by, 3.5, '#ffe9b8');
      g.fillStyle = '#9fd0ff';
      for (let k = 3; k < 12; k++) g.fillRect(Math.round(bx + k), Math.round(by - k * 0.7), 1, 1);
      for (let i = 0; i < 12; i++) {
        const x = Math.round(bx + (hash(i, 21) - 0.5) * br * 4.2);
        const y = Math.round(by + (hash(i, 22) - 0.5) * br * 2.8);
        const wide = 2 + fl(hash(i, 23) * 4);
        g.globalAlpha = 0.6 + 0.4 * Math.sin(t * 1.3 + i);
        g.fillStyle = i % 3 === 0 ? '#ffd6ea' : i % 3 === 1 ? '#cfe0ff' : '#fff3c4';
        g.fillRect(x - wide, y, wide * 2 + 1, 1);
        g.fillRect(x - 1, y - 1, 3, 1);
        g.fillRect(x - 1, y + 1, 3, 1);
      }
      g.globalAlpha = 1;
      drawUfos(V, s.ufos, bx, by, br, t, party);
      break;
    }

    case 'edge':
      drawEdge(V, oy, t);
      drawUfos(V, s.ufos, V.W * 0.55, V.H * 0.62 + oy, br * 0.9, t, party);
      break;
  }
}

const ORBITERS = new Set(['planet', 'star', 'belt', 'blackhole', 'binary', 'pulsar']);

/** Where the rocket waits while a prompt is open. */
function park(V, s, t) {
  if (s.kind === 'home') return { x: V.W / 2, y: horizonY(V, V.W / 2) - 6 + Math.sin(t * 2) * 0.4, angle: 0, behind: false, thrust: 0.35 };
  if (!ORBITERS.has(s.kind)) {
    return { x: V.W * 0.2, y: V.H * 0.55 + Math.sin(t * 1.6) * 1.5, angle: Math.sin(t * 0.8) * 0.08, behind: false, thrust: 0.6 };
  }
  const { bx, by, br } = layout(V);
  const r = br * (s.kind === 'blackhole' ? 1.3 : s.kind === 'belt' ? 0.75 : Math.max(0.8, s.size || 1));
  const a = Math.PI + t * 1.1;
  const vx = -Math.sin(a) * r * 1.75;
  const vy = Math.cos(a) * r * 0.55;
  return {
    x: bx + Math.cos(a) * r * 1.75,
    y: by + Math.sin(a) * r * 0.55,
    angle: Math.atan2(vy, vx) + Math.PI / 2,
    behind: Math.sin(a) < 0,
    thrust: 0.9,
  };
}

/** Where the rocket sits mid-flight. */
const cruise = (V) => ({ x: V.W / 2, y: V.H * 0.6, angle: 0 });

function drawVehicle(V, x, y, { angle = 0, thrust = 0, t = 0, jitter = 0 } = {}) {
  const g = V.g;
  g.save();
  g.translate(Math.round(x + (jitter ? rand(-jitter, jitter) : 0)), Math.round(y + (jitter ? rand(-jitter * 0.5, jitter * 0.5) : 0)));
  if (angle) g.rotate(angle);
  if (thrust > 0) {
    const len = Math.max(1, Math.round(thrust * (3 + Math.sin(t * 45) * 1.4 + Math.random() * 1.6)));
    for (let k = 0; k < len; k++) {
      g.fillStyle = k < 1 ? '#fff3c4' : k < len * 0.55 ? '#ffb547' : '#ff5fa2';
      const w = k < len * 0.45 ? 3 : 1;
      g.fillRect(w === 3 ? -1.5 : -0.5, 6 + k, w, 1);
    }
  }
  g.drawImage(sprite('rocket'), -3.5, -6);
  g.restore();
}

/** Exhaust behind the rocket. `power` is 0 to 1. */
function trail(V, x, y, angle, power) {
  const back = angle + Math.PI / 2;
  if (Math.random() < power) {
    emit(V, power > 0.7 ? 3 : 1, {
      x: x + Math.cos(back) * 8, y: y + Math.sin(back) * 8, angle: back, spread: 0.3,
      speed: [12, 36], life: [0.25, 0.65], colors: ['#fff3c4', '#ffb547', '#ff5fa2', '#5a5390'], grow: power > 0.7 ? 1 : 0,
    });
  }
}

/** Smoke rolling out sideways while the engines light. */
function igniteFx(V, x, y) {
  emit(V, 3, {
    x, y: y + 7, angle: Math.random() < 0.5 ? 0 : Math.PI, spread: 0.3,
    speed: [10, 30], life: [0.5, 1.2], colors: ['#efeaff', '#a9a1d6', '#5a5390'], drag: 2, grow: 3,
  });
}

let lastFirework = 0;
function partyFx(V, ms, s) {
  if (ms < lastFirework) lastFirework = 0;
  if (ms < 3000 && ms - lastFirework > 260) {
    lastFirework = ms;
    const color = pick(['#5ef2ff', '#ffe066', '#ff5fa2', '#7dff8a', s.halo || '#b06bff'], rand(0, 5));
    burst(V, rand(V.W * 0.1, V.W * 0.9), rand(V.H * 0.08, V.H * 0.5), ['#ffffff', color, color, '#ff5fa2']);
    return true;
  }
  if (ms >= 3000 && Math.random() < 0.01) burst(V, rand(V.W * 0.1, V.W * 0.9), rand(V.H * 0.08, V.H * 0.4), ['#ffffff', '#5ef2ff', '#b06bff'], 14);
  return false;
}

function missFx(V, x, y, phase) {
  if (phase < 0.45 && Math.random() < 0.5) {
    emit(V, 2, { x, y: y + 7, angle: Math.PI / 2, spread: 1.2, speed: [4, 14], life: [0.6, 1.4], colors: ['#8b84bb', '#5a5390', '#3b3388'], grow: 2 });
  }
}
function missBoom(V, x, y) {
  emit(V, 30, {
    x, y: y + 5, speed: [8, 30], life: [0.6, 1.6],
    colors: ['#fff3c4', '#ffb547', '#8b84bb', '#5a5390'], drag: 1.5, grow: 2,
  });
}

// ---------- backdrop: stars, warp streaks, shooting stars, a passing saucer ----------
function initBackdrop(B) {
  B.stars = Array.from({ length: Math.round((B.W * B.H) / 200) }, () => ({
    x: Math.random() * B.W, y: Math.random() * B.H, z: Math.random() * 0.9 + 0.1, tw: Math.random() * TAU,
  }));
  B.meteors = [];
  B.ufo = null;
  B.comet = null;
  B.sats = [];
  B.nextMeteor = 3;
  B.nextUfo = 14;
  B.nextShower = rand(14, 28);
  B.nextComet = rand(20, 40);
  B.nextSat = rand(4, 10);
  B.shower = null;
  // a few faraway galaxies and coloured stars that drift with the starfield
  B.far = Array.from({ length: 5 }, (_, k) => ({ x: Math.random() * B.W, y: Math.random() * B.H, kind: k % 2 ? 'galaxy' : 'giant', hue: Math.random(), size: rand(2, 4) }));
}

function spawnMeteor(B, angle, speed, bright = false) {
  const startX = angle > Math.PI / 2 ? rand(B.W * 0.3, B.W * 1.2) : rand(-B.W * 0.2, B.W * 0.7);
  B.meteors.push({ x: startX, y: rand(-B.H * 0.1, B.H * 0.35), vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 0, bright, len: bright ? 18 : 10 });
}

function drawBackdrop(B, dt, t) {
  const g = B.g;
  g.clearRect(0, 0, B.W, B.H);
  const speed = reduceMotion ? 0 : 0.6 + B.warp * 40;
  for (const s of B.stars) {
    s.y += speed * s.z * dt * 6;
    s.tw += dt * 2;
    if (s.y > B.H) {
      s.y -= B.H;
      s.x = Math.random() * B.W;
    }
    g.globalAlpha = (s.z > 0.7 ? 1 : s.z > 0.4 ? 0.7 : 0.4) * (B.warp < 0.2 ? 0.7 + 0.3 * Math.sin(s.tw) : 1);
    g.fillStyle = s.z > 0.85 ? '#ffd6ea' : s.z > 0.6 ? '#efeaff' : '#9fa3ff';
    const len = 1 + fl(B.warp * 14 * s.z);
    g.fillRect(fl(s.x), fl(s.y - len + 1), 1, len);
  }
  g.globalAlpha = 1;
  if (reduceMotion) return;

  // faraway galaxies and giant stars, drifting slowly
  for (const f of B.far) {
    f.y += speed * 0.08 * dt * 6;
    if (f.y > B.H + 6) {
      f.y = -6;
      f.x = Math.random() * B.W;
    }
    const color = hslHex(f.hue, 0.6, 0.72);
    g.globalAlpha = 0.35;
    g.fillStyle = color;
    if (f.kind === 'galaxy') {
      g.fillRect(fl(f.x - f.size), fl(f.y), fl(f.size * 2 + 1), 1);
      g.fillRect(fl(f.x - 1), fl(f.y - 1), 3, 3);
    } else {
      g.fillRect(fl(f.x - 1), fl(f.y), 3, 1);
      g.fillRect(fl(f.x), fl(f.y - 1), 1, 3);
    }
  }
  g.globalAlpha = 1;

  // single shooting stars
  B.nextMeteor -= dt;
  if (B.nextMeteor <= 0) {
    B.nextMeteor = rand(3, 8);
    spawnMeteor(B, rand(2.5, 2.8), rand(90, 140));
  }
  // meteor showers: dozens of streaks from one direction for a few seconds
  B.nextShower -= dt;
  if (B.nextShower <= 0 && !B.shower) {
    B.shower = { left: rand(3.5, 5.5), angle: Math.random() < 0.5 ? rand(2.4, 2.7) : rand(0.45, 0.75) };
    if (B.announce) B.announce('Meteor shower');
  }
  if (B.shower) {
    B.shower.left -= dt;
    if (Math.random() < dt * 14) spawnMeteor(B, B.shower.angle + rand(-0.05, 0.05), rand(130, 220), Math.random() < 0.2);
    if (B.shower.left <= 0) {
      B.shower = null;
      B.nextShower = rand(30, 55);
    }
  }
  for (let i = B.meteors.length - 1; i >= 0; i--) {
    const m = B.meteors[i];
    m.life += dt;
    m.x += m.vx * dt;
    m.y += m.vy * dt;
    if (m.life > 1.4) {
      B.meteors.splice(i, 1);
      continue;
    }
    for (let k = 0; k < m.len; k++) {
      g.globalAlpha = (1 - k / m.len) * (1 - m.life / 1.4);
      g.fillStyle = k < 2 ? '#ffffff' : m.bright ? (k < 6 ? '#ffe066' : '#ff8a5e') : '#9ffcff';
      g.fillRect(fl(m.x - m.vx * k * 0.008), fl(m.y - m.vy * k * 0.008), m.bright && k < 3 ? 2 : 1, 1);
    }
  }
  g.globalAlpha = 1;

  // a comet crossing slowly, with a long tail
  B.nextComet -= dt;
  if (!B.comet && B.nextComet <= 0) {
    const dir = Math.random() < 0.5 ? 1 : -1;
    B.comet = { x: dir > 0 ? -20 : B.W + 20, y: rand(B.H * 0.05, B.H * 0.45), vx: dir * rand(10, 18), vy: rand(1, 4), age: 0 };
    if (B.announce) B.announce('Comet sighted');
  }
  if (B.comet) {
    const c = B.comet;
    c.x += c.vx * dt;
    c.y += c.vy * dt;
    c.age += dt;
    for (let k = 40; k >= 0; k--) {
      g.globalAlpha = (1 - k / 40) * 0.7;
      g.fillStyle = k < 3 ? '#ffffff' : k < 14 ? '#bfe6ff' : '#5ef2ff';
      g.fillRect(fl(c.x - Math.sign(c.vx) * k * 1.2), fl(c.y - k * 0.35 + Math.sin(k * 0.4 + c.age * 3) * (k / 30)), k < 3 ? 2 : 1, 1);
    }
    g.globalAlpha = 1;
    if (c.x < -60 || c.x > B.W + 60) {
      B.comet = null;
      B.nextComet = rand(40, 70);
    }
  }

  // satellites: slow dots with a blinking light
  B.nextSat -= dt;
  if (B.nextSat <= 0 && B.sats.length < 2) {
    B.nextSat = rand(10, 20);
    B.sats.push({ x: -4, y: rand(B.H * 0.1, B.H * 0.7), vx: rand(6, 11), vy: rand(-1.5, 1.5), age: 0 });
  }
  for (let i = B.sats.length - 1; i >= 0; i--) {
    const sat = B.sats[i];
    sat.x += sat.vx * dt;
    sat.y += sat.vy * dt;
    sat.age += dt;
    g.fillStyle = '#c8c4e8';
    g.fillRect(fl(sat.x), fl(sat.y), 1, 1);
    if (fl(sat.age * 2) % 2) {
      g.fillStyle = '#ff5fa2';
      g.fillRect(fl(sat.x) + 1, fl(sat.y), 1, 1);
    }
    if (sat.x > B.W + 4) B.sats.splice(i, 1);
  }

  B.nextUfo -= dt;
  if (!B.ufo && B.nextUfo <= 0) {
    const dir = Math.random() < 0.5 ? 1 : -1;
    B.ufo = { x: dir > 0 ? -12 : B.W + 12, y: rand(B.H * 0.08, B.H * 0.3), dir, age: 0 };
  }
  if (B.ufo) {
    const u = B.ufo;
    u.x += u.dir * dt * 28;
    u.age += dt;
    g.drawImage(sprite('ufo', fl(u.age * 6)), fl(u.x), fl(u.y + Math.sin(u.age * 3) * 2));
    if (u.x < -20 || u.x > B.W + 20) {
      B.ufo = null;
      B.nextUfo = rand(18, 35);
    }
  }
}

const sfx = {
  depart() {
    hiss(2.4, 200, 2600, 0.14);
    tone(70, 1.2, 'sawtooth', 0.03, 0, 2.5);
  },
  flyby() {
    tone(rand(500, 700), 0.12, 'sine', 0.03, 0, 0.6);
  },
  arrive(level) {
    const scale = [262, 294, 330, 349, 392, 440, 494, 523];
    const start = Math.min(4, fl(level / 6));
    for (let i = 0; i <= 4; i++) tone(scale[Math.min(7, start + i)] * (i > 2 ? 2 : 1), 0.18, 'square', 0.04, i * 0.08);
  },
  cheer(i) {
    tone(rand(700, 1100), 0.09, 'square', 0.025, 0.5 + i * 0.22, 1.6);
    tone(rand(900, 1300), 0.07, 'square', 0.02, 0.6 + i * 0.22, 0.6);
  },
  pop() {
    hiss(0.25, 800, 3000, 0.05);
  },
  boost() {
    for (let i = 0; i < 6; i++) tone(440 * Math.pow(1.26, i), 0.1, 'square', 0.04, i * 0.05);
  },
  miss() {
    tone(160, 0.15, 'square', 0.04, 0, 0.5);
    tone(140, 0.15, 'square', 0.04, 0.2, 0.5);
    hiss(0.7, 400, 900, 0.12, 0.55);
    tone(90, 0.4, 'sawtooth', 0.05, 0.55, 0.4);
  },
};

export default {
  id: 'space',
  name: 'Space',
  title: 'Far Out',
  tagline: 'The rarer the answer, the farther you fly',
  blurb: 'General knowledge. Climb from the launch pad to the edge of the universe.',
  cta: 'Launch',
  fire: 'Fire',
  metric: 'Distance',
  dir: -1, // scenery moves down as you climb
  words: {
    miss: 'Scrubbed',
    missWhy: 'Not on our star charts',
    repeat: 'Already logged this run',
    timeout: 'Out of time',
    passing: 'Passing',
    hint: 'rarer answers fly farther',
    stays: 'The rocket holds its orbit.',
    reached: 'You reached',
  },
  routeLength: LAST,
  stop,
  distance,
  short,
  drawStop,
  park,
  cruise,
  drawVehicle,
  trail,
  igniteFx,
  partyFx,
  missFx,
  missBoom,
  initBackdrop,
  drawBackdrop,
  backdropAt: () => 0,
  sfx,
};
