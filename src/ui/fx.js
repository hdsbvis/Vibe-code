// Short notices for things happening in the sky or the sea, and the fact ticker on the menu.
import { icon } from './icons.js';
import { $ } from './dom.js';
import { FACTS } from '../data/facts.js';

const NOTICE_ICONS = {
  'Meteor shower': 'meteor',
  'Comet sighted': 'star',
  'Whale passing': 'wave',
  'Giant manta passing': 'wave',
  'Bubble storm': 'bubble',
  'Bioluminescent wave': 'star',
};

let lastNotice = -Infinity;
/** Show a notice pill at the top of the screen for a few seconds. */
export function notice(text, iconName = NOTICE_ICONS[text] || 'radio') {
  const now = performance.now();
  if (now - lastNotice < 4000) return; // don't stack them
  lastNotice = now;
  const el = document.createElement('div');
  el.className = 'notice';
  el.setAttribute('role', 'status');
  el.innerHTML = `${icon(iconName)}<span></span>`;
  el.querySelector('span').textContent = text;
  $('#notices').appendChild(el);
  setTimeout(() => el.remove(), 3600);
}

let factTimer = 0;
/** Rotate through facts about a world in the menu ticker. */
export function startTicker(worldId) {
  clearInterval(factTimer);
  const facts = FACTS[worldId] || [];
  if (!facts.length) return;
  let i = Math.floor(Math.random() * facts.length);
  const show = () => {
    const el = $('#tickerText');
    el.textContent = facts[i % facts.length];
    el.classList.remove('roll');
    void el.offsetWidth;
    el.classList.add('roll');
    i += 1;
  };
  show();
  factTimer = setInterval(show, 7000);
}
export const stopTicker = () => clearInterval(factTimer);
