// Mission select: pick a world and a set of rules, then start.
import { $, esc } from './dom.js';
import { register, session, setWorld } from './app.js';
import { Scene } from '../gfx/scene.js';
import { WORLDS, WORLD_LIST } from '../worlds/index.js';
import { RULES, RULE_LIST, dayKey } from '../core/rules.js';
import { store } from '../services/storage.js';
import { ui, unlock } from '../audio/synth.js';
import { startRun } from './play.js';

const SHOWCASE = { space: 9, ocean: 3 }; // the stop each world's preview card shows
const previews = [];

function paint() {
  const world = setWorld(session.worldId);
  for (const card of $('#worldCards').children) card.setAttribute('aria-checked', String(card.dataset.world === session.worldId));
  const best = store.get('best', {});
  for (const card of $('#ruleCards').children) {
    card.setAttribute('aria-checked', String(card.dataset.rules === session.rulesId));
    const top = best[`${session.worldId}:${card.dataset.rules}`];
    card.querySelector('.rbest').textContent = top ? `Best ${top.score}` : '';
  }
  $('#go').textContent = world.cta;
  const played = session.rulesId === 'daily' && store.get(`daily:${session.worldId}:${dayKey()}`) != null;
  $('#selectNote').textContent = played
    ? "You've already played today's Daily here. Another go is practice and won't change the board."
    : '';
}

export function initSelect() {
  $('#worldCards').innerHTML = WORLD_LIST.map(
    (w) => `<button class="world-card" type="button" role="radio" data-world="${w.id}" aria-checked="false">
      <canvas aria-hidden="true"></canvas>
      <span class="wname">${esc(w.name)}</span>
      <span class="wblurb">${esc(w.blurb)}</span>
    </button>`,
  ).join('');
  $('#ruleCards').innerHTML = RULE_LIST.map(
    (r) => `<button class="rule-card" type="button" role="radio" data-rules="${r.id}" aria-checked="false">
      <span class="rname">${esc(r.name)}</span><span class="rbest"></span>
      <span class="rblurb">${esc(r.blurb)}</span>
    </button>`,
  ).join('');

  for (const card of $('#worldCards').children) {
    const world = WORLDS[card.dataset.world];
    const scene = new Scene(card.querySelector('canvas'), world);
    scene.place(SHOWCASE[world.id]);
    previews.push(scene);
    card.addEventListener('click', () => {
      unlock();
      ui.click();
      session.worldId = world.id;
      store.set('world', world.id);
      paint();
    });
  }
  for (const card of $('#ruleCards').children) {
    card.addEventListener('click', () => {
      unlock();
      ui.click();
      session.rulesId = card.dataset.rules;
      store.set('rules', session.rulesId);
      paint();
    });
  }
  $('#go').addEventListener('click', () => startRun());
  if (!RULES[session.rulesId]) session.rulesId = 'classic';

  register('select', {
    enter: paint,
    frame(now, dt) {
      for (const scene of previews) scene.frame(now, dt);
    },
  });
}
