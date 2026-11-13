// A tiny synthesiser. Browsers only allow sound after a tap, so call unlock() from one.
import { store } from '../services/storage.js';

let ctx = null;
let muted = store.get('muted', false);

/** Create or resume the audio context. Call from a click or key handler. */
export function unlock() {
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      ctx = null;
    }
  }
  if (ctx && ctx.state === 'suspended') ctx.resume();
}

export const isMuted = () => muted;
export function setMuted(value) {
  muted = value;
  store.set('muted', muted);
}

/** One oscillator note. `slide` multiplies the pitch over the note's length. */
export function tone(freq, dur, type = 'square', vol = 0.05, delay = 0, slide = 0) {
  if (muted || !ctx) return;
  const t = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq * slide), t + dur);
  gain.gain.setValueAtTime(vol, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

/** Filtered noise: a whoosh, a rumble or a splash depending on the sweep. */
export function hiss(dur = 1.2, from = 300, peak = 2400, vol = 0.12, delay = 0, type = 'lowpass') {
  if (muted || !ctx) return;
  const length = Math.floor(ctx.sampleRate * dur);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  const t = ctx.currentTime + delay;
  src.buffer = buffer;
  filter.type = type;
  filter.frequency.setValueAtTime(from, t);
  filter.frequency.exponentialRampToValueAtTime(peak, t + dur * 0.5);
  filter.frequency.exponentialRampToValueAtTime(150, t + dur);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(vol, t + 0.12);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(filter).connect(gain).connect(ctx.destination);
  src.start(t);
}

/** Interface sounds shared by every world. */
export const ui = {
  click: () => tone(523, 0.06),
  back: () => tone(392, 0.06),
  key: () => tone(1400 + Math.random() * 400, 0.015, 'square', 0.01),
  tick: () => tone(880, 0.04, 'square', 0.03),
  start() {
    tone(392, 0.08);
    tone(523, 0.1, 'square', 0.05, 0.08);
    tone(659, 0.14, 'square', 0.05, 0.16);
  },
  finish(level) {
    const notes = [262, 330, 392, 523, 659, 784];
    for (let i = 0; i <= Math.min(5, level); i++) tone(notes[i], 0.2, 'square', 0.04, i * 0.1);
  },
};
