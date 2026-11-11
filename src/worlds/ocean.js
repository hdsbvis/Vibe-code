// The Ocean world: 28 stops from the surface to the Challenger Deep.
import {
  fl, rand, clamp, lerp, hash, noise, shade, mix, emit, disc, glow, stamp, reduceMotion,
} from '../gfx/canvas.js';
import { sprite } from '../gfx/sprites.js';
import { tone, hiss } from '../audio/synth.js';

const TAU = Math.PI * 2;
const mod = (n, m) => ((n % m) + m) % m;

const FISH = {
  blue: null,
  yellow: { b: '#ffd84d', l: '#fff3a8' },
  green: { b: '#6fd38a', l: '#c8f5d3' },
  orange: { b: '#ff8a2a', l: '#ffd0a0' },
  silver: { b: '#b8c8d8', l: '#eef4fa' },
  pale: { b: '#9aa8c0', l: '#dfe6f2' },
  gold: { b: '#ffcf4d', l: '#fff3c4' },
};

// fauna rows: [sprite, how many, behaviour, top (0-1), bottom (0-1), options]
const ROUTE = [
  { name: 'The Surface', kind: 'home', m: 0 },
  { name: 'Tide Pools', m: 1, floor: 'rocks', fauna: [['starfish', 3, 'sit'], ['crab', 2, 'walk'], ['fish', 3, 'swim', 0.3, 0.65, { pal: FISH.yellow }]] },
  { name: 'Seagrass Meadow', m: 5, floor: 'grass', fauna: [['seahorse', 3, 'drift', 0.5, 0.72], ['fish', 5, 'school', 0.25, 0.45, { pal: FISH.green }]] },
  { name: 'Coral Reef', m: 15, floor: 'reef', fauna: [['clownfish', 4, 'swim', 0.45, 0.72], ['fish', 6, 'school', 0.2, 0.4], ['fish', 3, 'swim', 0.3, 0.6, { pal: FISH.yellow }]] },
  { name: 'Kelp Forest', m: 30, floor: 'kelp', fauna: [['fish', 5, 'swim', 0.2, 0.75, { pal: FISH.orange }], ['fish', 4, 'school', 0.3, 0.5, { pal: FISH.silver }]] },
  { name: 'Scuba Limit', note: 'Holiday divers turn back here', m: 40, floor: 'sand', fauna: [['diver', 2, 'swim', 0.3, 0.55], ['fish', 4, 'school', 0.55, 0.7]] },
  { name: 'Reef Shark Patrol', m: 60, floor: 'rocks', fauna: [['shark', 3, 'patrol', 0.3, 0.6], ['fish', 5, 'school', 0.62, 0.75, { pal: FISH.silver }]] },
  { name: 'Manta Crossing', m: 120, fauna: [['manta', 3, 'glide', 0.25, 0.75], ['fish', 4, 'school', 0.15, 0.3, { pal: FISH.silver }]] },
  { name: "Sunlight's Edge", note: 'Plants cannot grow below here', m: 200, fauna: [['jelly', 5, 'drift', 0.2, 0.85]] },
  { name: 'Scuba Record', note: 'The deepest scuba dive ever made', m: 332, fauna: [['diver', 1, 'hover', 0.45, 0.5], ['jelly', 3, 'drift', 0.2, 0.8, { pal: { j: '#5ec8ff', l: '#c8f1ff' } }]] },
  { name: 'Swordfish Run', m: 550, fauna: [['swordfish', 3, 'dash', 0.25, 0.75], ['fish', 6, 'school', 0.4, 0.6, { pal: FISH.silver }]] },
  { name: 'Giant Squid', m: 700, fauna: [['squid', 1, 'loom', 0.5, 0.5, { scale: 2 }], ['fish', 4, 'school', 0.15, 0.3, { pal: FISH.silver }]] },
  { name: 'Vampire Squid', m: 900, fauna: [['vampire', 3, 'drift', 0.25, 0.75]] },
  { name: 'Midnight Zone', note: 'No sunlight ever reaches here', m: 1000, fauna: [['spark', 16, 'spark', 0.12, 0.88, { color: '#7dfff0' }], ['jelly', 2, 'drift', 0.3, 0.7, { pal: { j: '#3fd8c8', l: '#c8fff5' } }]] },
  { name: 'Anglerfish', m: 1500, fauna: [['angler', 3, 'lurk', 0.3, 0.75]] },
  { name: 'Sperm Whale Dive', m: 2000, fauna: [['whale', 1, 'loom', 0.36, 0.36, { scale: 2 }], ['squid', 1, 'drift', 0.75, 0.8]] },
  { name: 'Black Smokers', note: 'Vents hotter than 350 °C', m: 2500, floor: 'vents', fauna: [['crab', 3, 'walk', 0, 0, { pal: { c: '#efeaff' } }], ['fish', 3, 'swim', 0.35, 0.6, { pal: FISH.pale }]] },
  { name: 'Beaked Whale Record', note: 'The deepest dive by any mammal', m: 2992, fauna: [['beaked', 2, 'glide', 0.35, 0.6]] },
  { name: 'Titanic', m: 3800, floor: 'wreck', fauna: [['fish', 3, 'swim', 0.25, 0.55, { pal: FISH.pale }]] },
  { name: 'Dumbo Octopus', m: 4000, floor: 'plain', fauna: [['dumbo', 3, 'drift', 0.3, 0.7]] },
  { name: 'Abyssal Plain', m: 5000, floor: 'plain', fauna: [['seapig', 5, 'walk'], ['dumbo', 1, 'drift', 0.3, 0.5]] },
  { name: 'Hadal Zone', note: 'The trenches begin', m: 6000, floor: 'trench', fauna: [['spark', 12, 'spark', 0.2, 0.9, { color: '#efeaff' }]] },
  { name: 'Deepest Shipwreck', note: 'USS Samuel B. Roberts', m: 6895, floor: 'warship', fauna: [['spark', 8, 'spark', 0.3, 0.8, { color: '#efeaff' }]] },
  { name: 'Deepest Fish', note: 'A snailfish, filmed in 2022', m: 8336, floor: 'trench', fauna: [['snailfish', 4, 'swim', 0.35, 0.75]] },
  { name: 'Milwaukee Deep', note: "The Atlantic's deepest point", m: 8376, floor: 'trenchfloor', fauna: [['snailfish', 1, 'swim', 0.5, 0.6], ['spark', 6, 'spark', 0.2, 0.8, { color: '#efeaff' }]] },
  { name: 'Everest, Sunk', note: 'Mount Everest would be underwater', m: 8849, floor: 'everest', fauna: [['spark', 6, 'spark', 0.2, 0.8, { color: '#efeaff' }]] },
  { name: 'Kermadec Trench', m: 10047, floor: 'trench', fauna: [['spark', 10, 'spark', 0.2, 0.9, { color: '#7dfff0' }], ['jelly', 1, 'drift', 0.4, 0.6, { pal: { j: '#ff8ad8', l: '#ffe0f3' } }]] },
  { name: 'Horizon Deep', note: 'Tonga Trench', m: 10820, floor: 'trenchfloor', fauna: [['spark', 8, 'spark', 0.2, 0.8, { color: '#7dfff0' }], ['seapig', 2, 'walk']] },
  { name: 'Challenger Deep', note: 'The deepest place on Earth', m: 10935, floor: 'bottom', fauna: [['spark', 8, 'spark', 0.2, 0.8, { color: '#efeaff' }], ['seapig', 2, 'walk']] },
];
const LAST = ROUTE.length - 1;
const LEGENDS = [
  { name: 'Atlantis', note: 'Nobody has charted this', m: null, floor: 'ruins', fauna: [['fish', 6, 'school', 0.25, 0.5, { pal: FISH.gold }], ['jelly', 3, 'drift', 0.2, 0.7, { pal: { j: '#ffe066', l: '#fff8c8' } }]] },
  { name: "The Kraken's Lair", note: 'Nobody has charted this', m: null, floor: 'trenchfloor', fauna: [['squid', 1, 'loom', 0.45, 0.45, { scale: 3 }], ['spark', 10, 'spark', 0.1, 0.9, { color: '#ff8a8a' }]] },
];
const DRIFTERS = ['jelly', 'vampire', 'dumbo', 'angler'];

function stop(i) {
  if (i <= LAST) return ROUTE[i];
  const n = i - LAST;
  if (n <= LEGENDS.length) return LEGENDS[n - 1];
  const glowColor = ['#7dfff0', '#ff8ad8', '#ffe066', '#b6ff5e'][i % 4];
  return {
    name: `Uncharted Abyss ${n - LEGENDS.length}`,
    note: 'Nobody has charted this',
    m: null,
    floor: i % 2 ? 'trench' : 'trenchfloor',
    fauna: [[DRIFTERS[i % DRIFTERS.length], 2 + (i % 3), 'drift', 0.25, 0.75], ['spark', 12, 'spark', 0.1, 0.9, { color: glowColor }]],
  };
}

const commas = (n) => Math.round(n).toLocaleString('en-US');
const distance = (s) => (s.kind === 'home' ? 'At the surface' : s.m == null ? 'Off the charts' : `${commas(s.m)} m down`);
const short = (s) => (s.kind === 'home' ? '0 m' : s.m == null ? '???' : `${commas(s.m)} m`);

// ---------- water ----------
const WATER = [
  [0, '#2283bd'], [30, '#196fa8'], [120, '#125a94'], [250, '#0c4a8a'], [700, '#082f63'],
  [1500, '#051c40'], [4000, '#030f26'], [7000, '#020818'], [11000, '#01040c'],
];
function waterColor(depth) {
  const d = clamp(depth, 0, 11000);
  for (let i = 1; i < WATER.length; i++) {
    if (d <= WATER[i][0]) {
      const [d0, c0] = WATER[i - 1];
      const [d1, c1] = WATER[i];
      return mix(c0, c1, (d - d0) / (d1 - d0));
    }
  }
  return WATER[WATER.length - 1][1];
}
const depthOf = (s) => (s.m == null ? 11500 : s.m);
/** How brightly lit the sea floor is at a depth: 1 near the surface, dim in the deep. */
const lightAt = (m) => clamp(1 - Math.log10(1 + m) / 4.2, 0.3, 1);

// ---------- floors ----------
const floorY = (V) => V.H - Math.max(8, V.H * 0.13);
const floorTop = (V, x) => floorY(V) + Math.sin(x * 0.15) * 1.3 + Math.sin(x * 0.05 + 1) * 1.8;

function ground(V, oy, color, light, speck) {
  const g = V.g;
  const base = shade(color, light);
  const dark = shade(color, light * 0.75);
  for (let x = 0; x < V.W; x++) {
    const top = Math.round(floorTop(V, x) + oy);
    const bottom = Math.round(V.H + oy) + 3; // the stop's own lower edge
    if (top > V.H || bottom < 0) continue;
    g.fillStyle = base;
    g.fillRect(x, top, 1, bottom - top);
    if (speck && hash(x, 7) > 0.72) {
      g.fillStyle = dark;
      g.fillRect(x, top + 1 + fl(hash(x, 8) * 5), 1, 1);
    }
  }
}

function walls(V, oy, light) {
  const g = V.g;
  const rock = shade('#3a4452', Math.max(0.55, light * 1.6));
  const edge = shade('#5a6a7e', Math.max(0.55, light * 1.6));
  for (let y = 0; y < V.H; y++) {
    const sy = y - oy; // texture row, so the walls scroll with the stop
    if (sy < -V.H * 0.1 || sy > V.H * 1.1) continue;
    const squeeze = clamp(sy / V.H, 0, 1) * V.W * 0.05;
    const left = Math.round(V.W * 0.05 + noise(sy * 0.11, 3) * V.W * 0.13 + squeeze);
    const right = Math.round(V.W * 0.05 + noise(sy * 0.11, 9) * V.W * 0.13 + squeeze);
    g.fillStyle = rock;
    g.fillRect(0, y, left, 1);
    g.fillRect(V.W - right, y, right, 1);
    g.fillStyle = edge;
    g.fillRect(left - 1, y, 1, 1);
    g.fillRect(V.W - right, y, 1, 1);
  }
}

function drawFloor(V, s, oy, t, light) {
  const g = V.g;
  const fy = floorY(V) + oy;
  switch (s.floor) {
    case 'sand':
      ground(V, oy, '#e3cf95', light, true);
      break;

    case 'rocks':
      ground(V, oy, '#d6c38c', light, true);
      for (let i = 0; i < 6; i++) {
        const x = V.W * (0.06 + i * 0.17 + hash(i, 4) * 0.06);
        disc(V, x, fy + 2, 3 + hash(i, 5) * 4, shade('#6a7480', light));
        disc(V, x - 1, fy + 1, 2 + hash(i, 5) * 2, shade('#8b95a1', light));
      }
      break;

    case 'grass':
      ground(V, oy, '#d6c38c', light, true);
      for (let i = 0; i < V.W / 2; i++) {
        const x = i * 2 + hash(i, 2);
        const h = 4 + fl(hash(i, 3) * 7);
        g.fillStyle = shade(i % 3 ? '#4fb86a' : '#3a9a58', light);
        for (let k = 0; k < h; k++) g.fillRect(Math.round(x + Math.sin(t * 1.8 + i * 0.7) * k * 0.22), Math.round(floorTop(V, x) + oy - k), 1, 1);
      }
      break;

    case 'reef':
      ground(V, oy, '#e3cf95', light, true);
      ['coralA', 'coralB', 'coralC', 'coralB', 'coralA', 'coralC', 'coralA'].forEach((name, i) => {
        const x = V.W * (0.08 + i * 0.145);
        const c = sprite(name);
        stamp(V, c, x, floorTop(V, x) + oy - c.height / 2 + 2);
      });
      break;

    case 'kelp':
      ground(V, oy, '#c9b780', light, true);
      for (let i = 0; i < 8; i++) {
        const bx = V.W * (0.06 + i * 0.125 + hash(i, 6) * 0.04);
        const top = oy + V.H * (0.05 + hash(i, 7) * 0.25);
        for (let y = Math.round(floorTop(V, bx) + oy); y > top; y--) {
          const x = Math.round(bx + Math.sin(y * 0.12 + t * 1.3 + i) * 2.5);
          g.fillStyle = shade('#2f7f45', light * 1.2);
          g.fillRect(x, y, 2, 1);
          if (mod(y + i * 3, 6) === 0) {
            g.fillStyle = shade('#58b85a', light * 1.2);
            g.fillRect(x + (mod(y, 12) < 6 ? 2 : -2), y, 2, 1);
          }
        }
      }
      break;

    case 'vents': {
      ground(V, oy, '#3a3f48', 1, true);
      [0.5, 0.68, 0.84].forEach((fx, i) => {
        const x = Math.round(V.W * fx);
        const h = 10 + i * 4 + fl(hash(i, 2) * 5);
        const top = Math.round(floorTop(V, x) + oy - h);
        g.fillStyle = '#23272e';
        g.fillRect(x - 3, top + 3, 7, h);
        g.fillRect(x - 2, top, 5, 4);
        g.fillStyle = '#3d444f';
        g.fillRect(x - 3, top + 3, 1, h);
        g.fillStyle = fl(t * 6 + i) % 2 ? '#ff8a2a' : '#ffd84d';
        g.fillRect(x - 1, top, 3, 1);
        if (Math.random() < 0.35) {
          emit(V, 1, { x, y: top, angle: -Math.PI / 2, spread: 0.35, speed: [6, 16], life: [1, 2.2], colors: ['#4a505a', '#2c3038', '#191c22'], grow: 4, drag: 0.4 });
        }
      });
      for (let i = 0; i < 9; i++) {
        const x = Math.round(V.W * (0.42 + hash(i, 12) * 0.5));
        const y = Math.round(floorTop(V, x) + oy);
        const h = 3 + fl(hash(i, 13) * 4);
        g.fillStyle = '#efeaff';
        g.fillRect(x, y - h, 1, h);
        g.fillStyle = '#ff5f4d';
        g.fillRect(x, y - h - 1 + fl(Math.sin(t * 2 + i) * 0.6), 1, 2);
      }
      break;
    }

    case 'wreck':
    case 'warship': {
      ground(V, oy, '#4a4438', 1, true);
      const w = sprite(s.floor);
      stamp(V, w, V.W * 0.58, fy - w.height + 5, { angle: s.floor === 'wreck' ? -0.07 : 0.09, scale: 2 });
      g.fillStyle = s.floor === 'wreck' ? '#9a6a4a' : '#7d8b99';
      for (let i = 0; i < 7; i++) g.fillRect(Math.round(V.W * (0.2 + hash(i, 3) * 0.7)), Math.round(fy + 1 + hash(i, 4) * 3), 2, 1);
      break;
    }

    case 'plain':
      ground(V, oy, '#5a5244', 1, true);
      g.fillStyle = '#7a705e';
      for (let i = 0; i < 12; i++) g.fillRect(Math.round(V.W * hash(i, 5)), Math.round(fy + 2 + hash(i, 6) * 4), 2, 1);
      break;

    case 'trench':
      walls(V, oy, light);
      break;

    case 'trenchfloor':
      walls(V, oy, light);
      ground(V, oy, '#3d4654', 1, true);
      break;

    case 'everest': {
      walls(V, oy, light);
      ground(V, oy, '#3d4654', 1, true);
      const cx = V.W * 0.6;
      const h = V.H * 0.5;
      const half = V.W * 0.36;
      // a broad main peak with a shoulder, drawn column by column
      const heightAt = (x) => {
        const main = Math.max(0, 1 - Math.abs(x - cx) / half);
        const shoulder = Math.max(0, 1 - Math.abs(x - (cx + half * 0.55)) / (half * 0.5)) * 0.55;
        return h * Math.max(Math.pow(main, 0.85), shoulder) + noise(x * 0.35, 4) * 3;
      };
      for (let x = Math.round(cx - half); x <= Math.round(cx + half); x++) {
        const tall = heightAt(x);
        if (tall < 1) continue;
        const top = Math.round(fy + 2 - tall);
        const snow = Math.max(0, tall - h * 0.7 + noise(x * 0.5, 8) * 4);
        g.fillStyle = x > cx ? '#3f4a5a' : '#566375';
        g.fillRect(x, top, 1, Math.round(tall));
        if (snow > 0) {
          g.fillStyle = x > cx ? '#b9c6d6' : '#e6eef7';
          g.fillRect(x, top, 1, Math.round(snow));
        }
      }
      stamp(V, sprite('flag'), cx + 1, fy + 2 - h - 2);
      break;
    }

    case 'bottom': {
      walls(V, oy, light);
      ground(V, oy, '#4a4f5c', 1, true);
      const x = V.W * 0.62;
      const l = sprite('lander');
      stamp(V, l, x, floorTop(V, x) + oy - l.height / 2 + 1);
      stamp(V, sprite('flag', 0, { r: '#ffd23f' }), x + 9, floorTop(V, x + 9) + oy - 2);
      if (fl(t * 2) % 2) {
        g.fillStyle = '#ff5f4d';
        g.fillRect(Math.round(x), Math.round(floorTop(V, x) + oy - l.height), 1, 1);
      }
      break;
    }

    case 'ruins': {
      ground(V, oy, '#4a5a66', 1, true);
      for (let i = 0; i < 6; i++) {
        const x = Math.round(V.W * (0.3 + i * 0.12));
        const h = Math.round(V.H * (0.25 + hash(i, 4) * 0.3));
        const y = Math.round(floorTop(V, x) + oy);
        g.fillStyle = '#9fb3c2';
        g.fillRect(x - 2, y - h, 4, h);
        g.fillStyle = '#6f8494';
        g.fillRect(x + 1, y - h, 1, h);
        g.fillStyle = '#c8d8e4';
        g.fillRect(x - 3, y - h - 1, 6, 2);
        if (i % 2 === 0) {
          g.fillStyle = fl(t * 2 + i) % 2 ? '#7dfff0' : '#3fd8c8';
          g.fillRect(x - 1, y - fl(h * 0.6), 2, 2);
        }
      }
      break;
    }
  }
}

// ---------- creatures ----------
function drawFauna(V, row, oy, t, party, hasFloor) {
  const [name, count, how, y0 = 0.3, y1 = 0.7, opts = {}] = row;
  const g = V.g;
  const lively = party < 4200;
  const pace = lively ? 2.2 : 1;
  const span = V.W + 36;
  const fy = floorY(V);

  for (let i = 0; i < count; i++) {
    if (party - 250 - i * 120 < 0) continue; // creatures gather one by one when you arrive
    const hop = lively && how !== 'sit' && how !== 'walk' ? -Math.abs(Math.sin(t * 6 + i)) * 1.5 : 0;
    let x;
    let y = V.H * lerp(y0, y1, count > 1 ? hash(i, 3) : 0.5);
    let flip = false;
    let frame = 0;
    let angle = 0;

    if (how === 'spark') {
      x = V.W * hash(i, 2) + Math.sin(t * 0.6 + i) * 5;
      y += Math.cos(t * 0.5 + i * 2) * 4 + oy;
      g.globalAlpha = 0.35 + 0.65 * Math.abs(Math.sin(t * (1.5 + hash(i, 5) * 2) + i * 3));
      g.fillStyle = opts.color || '#7dfff0';
      g.fillRect(Math.round(x), Math.round(y), lively && i % 3 === 0 ? 2 : 1, 1);
      g.globalAlpha = 1;
      continue;
    }

    const art = (f = 0) => sprite(name, f, opts.pal || null);
    switch (how) {
      case 'swim':
      case 'dash':
      case 'glide': {
        const dir = i % 2 ? 1 : -1;
        const speed = (how === 'dash' ? 24 : how === 'glide' ? 5 : 8 + hash(i, 1) * 6) * pace;
        x = mod(hash(i, 2) * span + dir * speed * t, span) - 18;
        y += Math.sin(t * (how === 'glide' ? 0.6 : 1.3) + i * 2) * (how === 'glide' ? 4 : 1.5);
        flip = dir < 0;
        frame = how === 'glide' || name === 'diver' ? fl(t * 3 + i) : 0;
        break;
      }
      case 'school':
        x = mod(9 * pace * t + hash(count, 9) * span, span) - 18 - (i % 3) * 8 - hash(i, 5) * 4;
        y = V.H * lerp(y0, y1, 0.5) + ((i % 3) - 1) * 5 + hash(i, 6) * 4 + Math.sin(t * 1.5 + i);
        break;
      case 'drift':
        x = V.W * (0.2 + 0.7 * hash(i, 2)) + Math.sin(t * 0.4 * pace + i * 2) * 4;
        y += Math.sin(t * 0.7 * pace + i) * 3;
        frame = fl(t * 1.5 + i);
        break;
      case 'patrol': {
        const a = t * 0.5 * pace + i * (TAU / count);
        x = V.W * 0.55 + Math.cos(a) * V.W * 0.32;
        y = V.H * lerp(y0, y1, 0.5) + Math.sin(a) * V.H * 0.14;
        flip = Math.sin(a) > 0;
        break;
      }
      case 'lurk':
        x = V.W * (0.38 + 0.5 * hash(i, 2)) + Math.sin(t * 0.3 * pace + i * 3) * 6;
        y += Math.sin(t * 0.5 + i) * 2;
        flip = hash(i, 7) > 0.5;
        break;
      case 'loom':
        x = V.W * 0.62 + Math.sin(t * 0.25 * pace + i) * V.W * 0.1;
        y += Math.sin(t * 0.4) * 3;
        angle = name === 'squid' ? Math.sin(t * 0.5) * 0.12 : 0;
        break;
      case 'hover':
        x = V.W * 0.62;
        y += Math.sin(t) * 2;
        frame = fl(t * 2);
        break;
      case 'sit':
        x = V.W * (0.2 + 0.72 * hash(i, 2));
        y = floorTop(V, x) - art().height / 2 + 2;
        break;
      case 'walk':
        x = V.W * (0.25 + 0.6 * hash(i, 2)) + Math.sin(t * 0.5 * pace + i * 2) * 8;
        y = floorTop(V, x) - art().height / 2 + 1;
        frame = fl(t * 4 + i);
        flip = Math.cos(t * 0.5 * pace + i * 2) < 0;
        break;
      default:
        x = V.W * 0.6;
    }

    if (name === 'angler') {
      const lx = x + (flip ? -5 : 5);
      glow(V, lx, y - 3 + oy, 1.6, '#aef7ff', 0.6 + 0.4 * Math.sin(t * 3 + i));
    }
    if (hasFloor && how !== 'sit' && how !== 'walk') y = Math.min(y, fy - 5); // keep swimmers above the floor
    stamp(V, art(frame), x, y + oy + hop, { flip, angle, scale: opts.scale || 1 });
  }
}
function drawSurface(V, oy, t) {
  const g = V.g;
  // the underside of the waves, seen from below
  for (let x = 0; x < V.W; x++) {
    const y = Math.round(3 + Math.sin(x * 0.2 + t * 2) * 1.2 + Math.sin(x * 0.07 - t) * 1 + oy);
    g.fillStyle = '#eafaff';
    g.fillRect(x, y, 1, 1);
    g.fillStyle = '#9fe3ff';
    g.fillRect(x, y + 1, 1, 1);
    g.fillStyle = '#d6f6ff';
    g.fillRect(x, y - 6, 1, 6);
  }
  // the boat's hull
  const bx = Math.round(V.W / 2 + Math.sin(t * 0.8) * 1.5);
  const by = Math.round(3 + oy);
  g.fillStyle = '#8e3519';
  g.fillRect(bx - 12, by, 24, 2);
  g.fillRect(bx - 10, by + 2, 20, 2);
  g.fillRect(bx - 7, by + 4, 14, 1);
  g.fillStyle = '#c9502e';
  g.fillRect(bx - 12, by, 24, 1);
  g.fillStyle = '#8b95a1';
  for (let k = 0; k < 6; k++) g.fillRect(bx + 9 + fl(Math.sin(t + k * 0.5) * 0.8), by + 5 + k * 2, 1, 1);
}

// ---------- world API ----------
function drawStop(V, s, oy, t, party = Infinity) {
  if (Math.abs(oy) > V.H * 1.6) return;
  if (s.kind === 'home') {
    drawSurface(V, oy, t);
    return;
  }
  const light = lightAt(depthOf(s));
  const hasFloor = !!s.floor && s.floor !== 'trench';
  if (s.floor) drawFloor(V, s, oy, t, light);
  for (const row of s.fauna || []) drawFauna(V, row, oy, t, party, hasFloor);
}

function park(V, s, t) {
  if (s.kind === 'home') return { x: V.W / 2, y: Math.min(V.H * 0.5, 26) + Math.sin(t * 1.4) * 1.2, angle: 0, behind: false, thrust: 0.2 };
  return { x: V.W * 0.22, y: V.H * 0.5 + Math.sin(t * 1.4) * 1.5, angle: Math.sin(t * 0.7) * 0.04, behind: false, thrust: 0.2 };
}

const cruise = (V) => ({ x: V.W * 0.42, y: V.H * 0.42, angle: 0.6 });

let deep = false; // set by the backdrop, so the headlight comes on below the sunlit zone
function drawVehicle(V, x, y, { angle = 0, t = 0, jitter = 0 } = {}) {
  const g = V.g;
  g.save();
  g.translate(Math.round(x + (jitter ? rand(-jitter, jitter) : 0)), Math.round(y + (jitter ? rand(-jitter * 0.5, jitter * 0.5) : 0)));
  if (angle) g.rotate(angle);
  if (deep) {
    g.fillStyle = '#fff6c4';
    for (let k = 0; k < 30; k++) {
      g.globalAlpha = 0.16 * (1 - k / 30);
      const spread = 1 + k * 0.32;
      g.fillRect(8 + k, Math.round(1 - spread), 1, Math.round(spread * 2));
    }
    g.globalAlpha = 1;
  }
  const s = sprite('sub', fl(t * 10));
  g.drawImage(s, -Math.round(s.width / 2), -Math.round(s.height / 2));
  g.restore();
}

const BUBBLE = ['#eafaff', '#bfeaff', '#8fd4f5'];
function trail(V, x, y, angle, power) {
  if (Math.random() < 0.15 + power * 0.85) {
    emit(V, power > 0.7 ? 3 : 1, {
      x: x - Math.cos(angle) * 9, y: y - Math.sin(angle) * 9, angle: -Math.PI / 2, spread: 0.7,
      speed: [10, 26 + power * 40], life: [0.5, 1.2], colors: BUBBLE, size: 1, grow: 2, ring: true, drag: 0.5,
    });
  }
}
function igniteFx(V, x, y) {
  emit(V, 3, { x, y, jitter: 8, angle: -Math.PI / 2, spread: 1, speed: [14, 40], life: [0.5, 1.1], colors: BUBBLE, size: 1, grow: 3, ring: true });
}

let lastPop = 0;
function partyFx(V, ms) {
  if (ms < lastPop) lastPop = 0;
  if (ms < 3000 && ms - lastPop > 280) {
    lastPop = ms;
    const x = rand(V.W * 0.1, V.W * 0.9);
    const y = rand(V.H * 0.15, V.H * 0.8);
    const color = ['#7dfff0', '#ffe066', '#ff8ad8', '#b6ff5e'][fl(rand(0, 4))];
    emit(V, 16, { x, y, speed: [8, 26], life: [0.5, 1.1], colors: ['#ffffff', color, color], drag: 2 });
    emit(V, 8, { x, y, angle: -Math.PI / 2, spread: 1.2, speed: [10, 30], life: [0.7, 1.4], colors: BUBBLE, size: 1, grow: 3, ring: true });
    return true;
  }
  return false;
}

function missFx(V, x, y, phase) {
  if (phase < 0.5 && Math.random() < 0.6) {
    emit(V, 2, { x: x - 6, y, angle: -Math.PI / 2, spread: 1, speed: [6, 18], life: [0.5, 1.1], colors: BUBBLE, grow: 2, ring: true });
  }
}
function missBoom(V, x, y) {
  emit(V, 26, { x, y, jitter: 6, angle: -Math.PI / 2, spread: 1.4, speed: [10, 44], life: [0.6, 1.5], colors: BUBBLE, size: 1, grow: 4, ring: true, drag: 0.8 });
}

// ---------- backdrop: water that darkens with depth ----------
function initBackdrop(B) {
  B.bubbles = Array.from({ length: 28 }, () => ({ x: Math.random() * B.W, y: Math.random() * B.H, speed: rand(6, 18), size: Math.random() < 0.25 ? 2 : 1, sway: rand(0, TAU) }));
  B.snow = Array.from({ length: 50 }, () => ({ x: Math.random() * B.W, y: Math.random() * B.H, speed: rand(1.5, 5), sway: rand(0, TAU) }));
  B.glints = Array.from({ length: 20 }, () => ({ x: Math.random() * B.W, y: Math.random() * B.H, rate: rand(1, 3), phase: rand(0, TAU), hue: Math.random() }));
  B.shapes = Array.from({ length: 4 }, (_, i) => ({ x: Math.random() * B.W, y: B.H * (0.2 + 0.2 * i), speed: rand(3, 7) * (i % 2 ? 1 : -1) }));
}

function drawBackdrop(B, dt, t) {
  const g = B.g;
  const depth = B.pos;
  deep = depth > 150;
  const grad = g.createLinearGradient(0, 0, 0, B.H);
  grad.addColorStop(0, waterColor(depth * 0.8));
  grad.addColorStop(1, waterColor(depth * 1.35 + 25));
  g.globalAlpha = 1;
  g.fillStyle = grad;
  g.fillRect(0, 0, B.W, B.H);

  const rush = reduceMotion ? 0 : B.warp * 240; // diving makes everything streak upward
  const sunlight = clamp(1 - depth / 260, 0, 1);
  if (sunlight > 0) {
    g.fillStyle = '#ffffff';
    for (let i = 0; i < 5; i++) {
      g.globalAlpha = sunlight * (0.05 + 0.03 * Math.sin(t * 0.7 + i * 2));
      const x = i * (B.W / 4) + Math.sin(t * 0.2 + i) * 8;
      g.beginPath();
      g.moveTo(x, 0);
      g.lineTo(x + 12, 0);
      g.lineTo(x + 12 - B.H * 0.35, B.H);
      g.lineTo(x - 8 - B.H * 0.35, B.H);
      g.fill();
    }
  }

  const shade2 = clamp(1 - depth / 1400, 0, 1);
  if (shade2 > 0) {
    g.globalAlpha = 0.16 * shade2;
    g.fillStyle = '#021a33';
    for (const s of B.shapes) {
      s.x = mod(s.x + s.speed * dt + 20, B.W + 40) - 20;
      s.y = mod(s.y - rush * dt * 0.5, B.H);
      const dir = s.speed > 0 ? 1 : -1;
      g.fillRect(fl(s.x), fl(s.y), 6, 2);
      g.fillRect(fl(s.x + 1), fl(s.y - 1), 4, 4);
      g.fillRect(fl(s.x - dir * 2 + (dir > 0 ? 0 : 5)), fl(s.y - 1), 1, 4);
    }
  }

  g.fillStyle = '#eafaff';
  const bubbleAlpha = clamp(1 - depth / 3000, 0.12, 0.7);
  for (const b of B.bubbles) {
    b.y -= (b.speed + rush) * dt;
    b.sway += dt * 2;
    if (b.y < -4) {
      b.y = B.H + 2;
      b.x = Math.random() * B.W;
    }
    g.globalAlpha = bubbleAlpha;
    const len = 1 + fl(B.warp * 8);
    g.fillRect(fl(b.x + Math.sin(b.sway) * 1.5), fl(b.y), b.size, b.size + len - 1);
  }

  const snowAlpha = clamp((depth - 120) / 900, 0, 0.55);
  if (snowAlpha > 0) {
    g.fillStyle = '#dfe9f5';
    for (const s of B.snow) {
      s.y += (s.speed - rush) * dt;
      s.sway += dt;
      if (s.y > B.H + 2) s.y = -2;
      if (s.y < -4) {
        s.y = B.H + 2;
        s.x = Math.random() * B.W;
      }
      g.globalAlpha = snowAlpha;
      g.fillRect(fl(s.x + Math.sin(s.sway) * 2), fl(s.y), 1, 1 + fl(B.warp * 6));
    }
  }

  const glintAlpha = clamp((depth - 700) / 600, 0, 1);
  if (glintAlpha > 0) {
    for (const p of B.glints) {
      p.y = mod(p.y - rush * dt, B.H);
      g.globalAlpha = glintAlpha * Math.max(0, Math.sin(t * p.rate + p.phase));
      g.fillStyle = p.hue > 0.7 ? '#b6ff5e' : p.hue > 0.4 ? '#7dfff0' : '#5ec8ff';
      g.fillRect(fl(p.x), fl(p.y), 1, 1);
    }
  }
  g.globalAlpha = 1;
}

/** Depth in metres at a fractional position along the route, for the water colour. */
function backdropAt(p) {
  const i = Math.max(0, Math.floor(p));
  return lerp(depthOf(stop(i)), depthOf(stop(i + 1)), p - i);
}

const sfx = {
  depart() {
    hiss(1.8, 1600, 500, 0.1);
    tone(260, 1.4, 'sine', 0.05, 0, 0.4);
    for (let i = 0; i < 5; i++) tone(rand(300, 600), 0.07, 'sine', 0.03, 0.1 + i * 0.12, 2);
  },
  flyby() {
    tone(1250, 0.22, 'sine', 0.035);
    tone(1250, 0.2, 'sine', 0.012, 0.2);
  },
  arrive(level) {
    const scale = [523, 494, 440, 392, 349, 330, 294, 262];
    const start = Math.min(3, fl(level / 8));
    for (let i = 0; i <= 4; i++) tone(scale[Math.min(7, start + i)], 0.3, 'triangle', 0.05, i * 0.09);
    tone(1250, 0.4, 'sine', 0.03, 0.5);
  },
  cheer(i) {
    tone(rand(1500, 2300), 0.09, 'sine', 0.03, 0.5 + i * 0.2, 1.5);
  },
  pop() {
    tone(rand(280, 520), 0.07, 'sine', 0.04, 0, 2.2);
  },
  boost() {
    for (let i = 0; i < 6; i++) tone(330 * Math.pow(1.2, i), 0.12, 'sine', 0.05, i * 0.06);
  },
  miss() {
    tone(180, 0.18, 'square', 0.04);
    tone(180, 0.18, 'square', 0.04, 0.26);
    hiss(0.8, 900, 300, 0.08, 0.5);
  },
};

export default {
  id: 'ocean',
  name: 'Ocean',
  title: 'Deep Down',
  tagline: 'The rarer the answer, the deeper you dive',
  blurb: 'Sea, water and fish questions. Dive from the surface to the deepest trench.',
  cta: 'Dive',
  fire: 'Dive',
  metric: 'Depth',
  dir: 1, // scenery moves up as you descend
  words: {
    miss: 'Ballast stuck',
    missWhy: 'Not in the ship\'s log',
    repeat: 'Already logged this run',
    timeout: 'Out of time',
    passing: 'Passing',
    hint: 'rarer answers dive deeper',
    stays: 'The sub holds its depth.',
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
  backdropAt,
  sfx,
};
