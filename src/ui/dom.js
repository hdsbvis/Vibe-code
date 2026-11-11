// Small DOM helpers shared by the screens.
import { easeOut } from '../gfx/canvas.js';

/** @returns {HTMLElement} */
export const $ = (selector) => document.querySelector(selector);

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
export const esc = (text) => String(text).replace(/[&<>"]/g, (ch) => ESCAPES[ch]);

/** Restart CSS animations by removing and re-adding classes. */
export function replay(el, ...classes) {
  el.classList.remove(...classes);
  void el.offsetWidth;
  el.classList.add(...classes);
}

/** Animate a number from one value to another. */
export function countUp(el, from, to, format = (v) => String(Math.round(v)), ms = 900) {
  const start = performance.now();
  replay(el, 'bump');
  const step = (now) => {
    const p = Math.min(1, (now - start) / ms);
    el.textContent = format(from + (to - from) * easeOut(p));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/** Render a row of tab buttons. `items` are {id, label}. */
export function tabs(container, items, selected, onPick) {
  container.innerHTML = items
    .map((it) => `<button class="tab" type="button" role="tab" data-id="${esc(it.id)}" aria-selected="${it.id === selected}">${esc(it.label)}</button>`)
    .join('');
  container.onclick = (event) => {
    const button = event.target.closest('.tab');
    if (!button || button.getAttribute('aria-selected') === 'true') return;
    for (const tab of container.children) tab.setAttribute('aria-selected', String(tab === button));
    onPick(button.dataset.id);
  };
}

export const pctText = (p) => (p >= 1 ? `${Math.round(p)}%` : p >= 0.1 ? `${p.toFixed(1)}%` : '<0.1%');

/** A sentence saying how common an answer is. */
export const shareSentence = (p) =>
  p >= 0.1 ? `About ${pctText(p)} of players say this.` : 'Fewer than 1 in 1,000 players say this.';
