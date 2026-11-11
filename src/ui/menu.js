// Main menu: an attract-mode journey, the three menu buttons, and the player's callsign.
import { $ } from './dom.js';
import { go, register, session, setWorld, backdrop } from './app.js';
import { Scene } from '../gfx/scene.js';
import { WORLD_LIST } from '../worlds/index.js';
import { RULE_LIST } from '../core/rules.js';
import { TIERS, pctForPoints } from '../core/scoring.js';
import { identity } from '../services/identity.js';
import { store } from '../services/storage.js';
import { ui, unlock, isMuted, setMuted } from '../audio/synth.js';

let hero;
let world;
let nextHop = 0;

export function paintMute() {
  for (const id of ['#mMute', '#mute']) {
    const button = $(id);
    button.textContent = '♪';
    button.classList.toggle('off', isMuted());
    button.setAttribute('aria-label', isMuted() ? 'Sound is off' : 'Sound is on');
  }
}
export function toggleMute() {
  setMuted(!isMuted());
  unlock();
  paintMute();
  ui.click();
}

function caption(stop) {
  $('#heroCap').textContent = stop.kind === 'home' ? `${world.name}: ${world.tagline}` : `${stop.name} · ${world.short(stop)}`;
}

function paintBest() {
  const best = store.get('best', {});
  const parts = WORLD_LIST.map((w) => {
    const top = Math.max(0, ...RULE_LIST.map((r) => (best[`${w.id}:${r.id}`] || {}).score || 0));
    return top ? `${w.name} ${top}` : null;
  }).filter(Boolean);
  $('#menuBest').textContent = parts.length
    ? `Your best scores: ${parts.join(' · ')}`
    : 'On iPhone, tap Share, then Add to Home Screen, to play full screen.';
}

function fillHowTo() {
  const ranges = TIERS.map((tier, i) => {
    const hi = pctForPoints(tier.min);
    const next = TIERS[i + 1];
    const lo = next ? pctForPoints(next.min) : 0;
    const fmt = (p) => (p >= 1 ? `${Math.round(p)}%` : `${p.toFixed(1)}%`);
    const who = i === 0 ? `said by ${fmt(lo)} or more` : next ? `said by ${fmt(lo)} to ${fmt(hi)}` : `said by under ${fmt(hi)}`;
    return `<li><span class="tn">${tier.label}</span><span class="tw">${who}</span><span class="th">+${tier.hops} ${tier.hops === 1 ? 'stop' : 'stops'}</span></li>`;
  });
  $('#tierList').innerHTML = ranges.join('');
  $('#howRules').innerHTML = RULE_LIST.map((r) => `<p><b>${r.name}.</b> ${r.blurb} ${r.seconds} seconds per prompt.</p>`).join('');
}

export function initMenu() {
  hero = new Scene($('#heroScene'));
  $('#mPlay').addEventListener('click', () => {
    unlock();
    ui.click();
    go('select');
  });
  $('#mRank').addEventListener('click', () => {
    unlock();
    ui.click();
    go('rankings');
  });
  $('#mHow').addEventListener('click', () => {
    unlock();
    ui.click();
    go('howto');
  });
  $('#mMute').addEventListener('click', toggleMute);
  $('#reroll').addEventListener('click', () => {
    unlock();
    ui.click();
    $('#callsign').textContent = identity.reroll();
  });
  document.addEventListener('click', (event) => {
    const back = event.target.closest('[data-go]');
    if (back) {
      ui.back();
      go(back.dataset.go);
    }
  });
  fillHowTo();
  paintMute();

  register('menu', {
    enter() {
      world = setWorld(session.worldId);
      hero.setWorld(world);
      caption(world.stop(0));
      nextHop = performance.now() + 1400;
      $('#callsign').textContent = identity.name;
      paintBest();
    },
    frame(now, dt) {
      hero.frame(now, dt);
      backdrop.warpTarget = hero.warp;
      backdrop.pos = world.backdropAt(hero.p);
      if (!hero.busy && now > nextHop) {
        const to = hero.at + 1 + Math.floor(Math.random() * 3);
        if (to > world.routeLength) {
          hero.place(0);
          caption(world.stop(0));
          nextHop = now + 1400;
        } else {
          nextHop = Infinity;
          hero.travel(to, {
            onArrive: () => caption(world.stop(to)),
            onDone: () => {
              nextHop = performance.now() + 700;
            },
          });
        }
      }
    },
    leave() {
      backdrop.warpTarget = 0;
    },
  });
  register('howto', {});
}
