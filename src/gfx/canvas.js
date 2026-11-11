// Low-resolution canvas toolkit: a pixel view, particles, and drawing primitives.

export const reduceMotion =
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export const fl = Math.floor;
export const rand = (a, b) => a + Math.random() * (b - a);
export const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const easeInOut = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
export const easeOut = (p) => 1 - Math.pow(1 - p, 3);

/** Repeatable pseudo-random number in [0, 1) for a pair of integers. */
export function hash(x, y = 0) {
  const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return s - Math.floor(s);
}

/** Smooth value noise in [0, 1). */
export function noise(x, y) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

export const fbm = (x, y) => noise(x, y) * 0.55 + noise(x * 2.1, y * 2.1) * 0.3 + noise(x * 4.3, y * 4.3) * 0.15;

const hexToRgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [n >> 16, (n >> 8) & 255, n & 255];
};

const shadeCache = new Map();
/** A hex colour made brighter (f > 1) or darker (f < 1). */
export function shade(hex, f) {
  const key = hex + f;
  let out = shadeCache.get(key);
  if (!out) {
    const [r, g, b] = hexToRgb(hex);
    out = `rgb(${clamp(r * f, 0, 255) | 0},${clamp(g * f, 0, 255) | 0},${clamp(b * f, 0, 255) | 0})`;
    if (shadeCache.size > 4000) shadeCache.clear();
    shadeCache.set(key, out);
  }
  return out;
}

/** Blend two hex colours. */
export function mix(a, b, t) {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  return `rgb(${lerp(r1, r2, t) | 0},${lerp(g1, g2, t) | 0},${lerp(b1, b2, t) | 0})`;
}

/** HSL -> hex, for procedurally coloured planets. */
export function hsl(h, s, l) {
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h * 12) % 12;
    const c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(c * 255).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/** A canvas drawn at 1/px resolution and scaled up with crisp pixels. */
export class View {
  constructor(canvas, px = 3) {
    this.canvas = canvas;
    this.g = canvas.getContext('2d');
    this.px = px;
    this.W = 40;
    this.H = 40;
    this.parts = [];
    this.shake = 0;
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const W = Math.max(40, Math.round(rect.width / this.px));
    const H = Math.max(30, Math.round(rect.height / this.px));
    if (W !== this.canvas.width || H !== this.canvas.height) {
      this.W = this.canvas.width = W;
      this.H = this.canvas.height = H;
    }
    this.g.imageSmoothingEnabled = false;
  }

  /** Clear the frame and apply any camera shake. */
  begin(dt) {
    const g = this.g;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.globalAlpha = 1;
    g.clearRect(0, 0, this.W, this.H);
    if (this.shake > 0 && !reduceMotion) {
      g.translate(Math.round(rand(-this.shake, this.shake)), Math.round(rand(-this.shake, this.shake)));
      this.shake = Math.max(0, this.shake - dt * 6);
    }
  }
}

/** Spawn particles. Angles are in radians; speeds in pixels per second. */
export function emit(V, count, o) {
  if (reduceMotion) count = Math.ceil(count / 3);
  if (V.parts.length > 500) return;
  for (let i = 0; i < count; i++) {
    const angle = o.angle != null ? o.angle + rand(-(o.spread || 0), o.spread || 0) : rand(0, Math.PI * 2);
    const speed = rand(o.speed[0], o.speed[1]);
    V.parts.push({
      x: o.x + rand(-(o.jitter || 0), o.jitter || 0),
      y: o.y + rand(-(o.jitterY || 0), o.jitterY || 0),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      max: rand(o.life[0], o.life[1]),
      colors: o.colors,
      size: o.size || 1,
      grow: o.grow || 0,
      grav: o.grav || 0,
      drag: o.drag || 0,
      ring: !!o.ring,
    });
  }
}

export function stepParticles(V, dt) {
  const g = V.g;
  for (let i = V.parts.length - 1; i >= 0; i--) {
    const p = V.parts[i];
    p.life += dt;
    if (p.life >= p.max) {
      V.parts.splice(i, 1);
      continue;
    }
    p.vy += p.grav * dt;
    p.vx *= 1 - p.drag * dt;
    p.vy *= 1 - p.drag * dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    const k = p.life / p.max;
    g.globalAlpha = k > 0.7 ? (1 - k) / 0.3 : 1;
    g.fillStyle = p.colors[Math.min(p.colors.length - 1, fl(k * p.colors.length))];
    const s = Math.max(1, Math.round(p.size + p.grow * k));
    const x = Math.round(p.x - s / 2);
    const y = Math.round(p.y - s / 2);
    if (p.ring && s > 2) {
      g.fillRect(x + 1, y, s - 2, 1);
      g.fillRect(x + 1, y + s - 1, s - 2, 1);
      g.fillRect(x, y + 1, 1, s - 2);
      g.fillRect(x + s - 1, y + 1, 1, s - 2);
    } else {
      g.fillRect(x, y, s, s);
    }
  }
  g.globalAlpha = 1;
}

/** A firework-style burst. */
export function burst(V, x, y, colors, count = 26) {
  emit(V, count, { x, y, speed: [10, 34], life: [0.6, 1.2], colors, grav: 14, drag: 1.2 });
}

/** Filled circle with hard pixel edges. */
export function disc(V, cx, cy, r, color) {
  const g = V.g;
  g.fillStyle = color;
  const y0 = Math.max(0, fl(cy - r));
  const y1 = Math.min(V.H - 1, Math.ceil(cy + r));
  for (let y = y0; y <= y1; y++) {
    const dy = y + 0.5 - cy;
    const half = Math.sqrt(r * r - dy * dy);
    if (!(half > 0)) continue;
    const x0 = Math.round(cx - half);
    const x1 = Math.round(cx + half);
    if (x1 > x0) g.fillRect(x0, y, x1 - x0, 1);
  }
}

/** Soft halo made of a few translucent discs. */
export function glow(V, cx, cy, r, color, alpha = 1) {
  const g = V.g;
  for (let k = 4; k >= 1; k--) {
    g.globalAlpha = alpha * 0.07 * k;
    disc(V, cx, cy, r * (1 + k * 0.3), color);
  }
  g.globalAlpha = 1;
}

/**
 * A lit, spinning sphere. `paint(tx, ty, v, lon)` returns the hex colour of a surface point:
 * tx/ty are texture coordinates that scroll with the spin, v is -1 (top) to 1 (bottom).
 * `flat` treats the sphere as a wide horizon instead of a globe.
 */
export function sphere(V, cx, cy, r, paint, spin = 0, flat = false) {
  const g = V.g;
  const x0 = Math.max(0, fl(cx - r));
  const x1 = Math.min(V.W - 1, Math.ceil(cx + r));
  const y0 = Math.max(0, fl(cy - r));
  const y1 = Math.min(V.H - 1, Math.ceil(cy + r));
  const r2 = r * r;
  for (let y = y0; y <= y1; y++) {
    const dy = y + 0.5 - cy;
    for (let x = x0; x <= x1; x++) {
      const dx = x + 0.5 - cx;
      if (dx * dx + dy * dy > r2) continue;
      const u = dx / r;
      const v = dy / r;
      const z = Math.sqrt(Math.max(0, 1 - u * u - v * v));
      const lon = Math.atan2(u, z) + spin;
      const lit = -u * 0.55 - v * 0.45 + z * 0.35;
      const f = lit > 0.55 ? 1.15 : lit < -0.35 ? 0.55 : lit < 0 ? 0.8 : 1;
      const color = flat
        ? paint(dx + spin * 40, dy, Math.sin(dy * 0.35) * 0.7, lon)
        : paint(lon * r * 0.9, v * r, v, lon);
      g.fillStyle = shade(color, f);
      g.fillRect(x, y, 1, 1);
    }
  }
}

const spriteCache = new Map();
/** Build (and cache) a small canvas from rows of palette characters. */
export function makeSprite(id, rows, pal) {
  let c = spriteCache.get(id);
  if (c) return c;
  c = document.createElement('canvas');
  c.width = Math.max(...rows.map((r) => r.length));
  c.height = rows.length;
  const g = c.getContext('2d');
  rows.forEach((row, j) => {
    for (let i = 0; i < row.length; i++) {
      const color = pal[row[i]];
      if (color) {
        g.fillStyle = color;
        g.fillRect(i, j, 1, 1);
      }
    }
  });
  spriteCache.set(id, c);
  return c;
}

/** Draw a sprite centred on (x, y), optionally mirrored, rotated, scaled or faded. */
export function stamp(V, sprite, x, y, { flip = false, angle = 0, alpha = 1, scale = 1 } = {}) {
  const g = V.g;
  if (!flip && !angle && alpha === 1 && scale === 1) {
    g.drawImage(sprite, Math.round(x - sprite.width / 2), Math.round(y - sprite.height / 2));
    return;
  }
  g.save();
  g.globalAlpha *= alpha;
  g.translate(Math.round(x), Math.round(y));
  if (angle) g.rotate(angle);
  g.scale(flip ? -scale : scale, scale);
  g.drawImage(sprite, -sprite.width / 2, -sprite.height / 2);
  g.restore();
}

/** Cache an expensive static drawing on its own canvas. */
const layerCache = new Map();
export function cachedLayer(id, w, h, draw) {
  const key = `${id}:${w}x${h}`;
  let c = layerCache.get(key);
  if (!c) {
    c = document.createElement('canvas');
    c.width = Math.max(1, w);
    c.height = Math.max(1, h);
    draw(c.getContext('2d'), c.width, c.height);
    if (layerCache.size > 40) layerCache.clear();
    layerCache.set(key, c);
  }
  return c;
}
