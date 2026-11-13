// The play screen: ask a prompt, time it, judge the answer, and run the journey animation.
import { $, esc, replay, countUp, pctText, shareSentence } from './dom.js';
import { go, register, session, setWorld, backdrop } from './app.js';
import { Scene } from '../gfx/scene.js';
import { reduceMotion } from '../gfx/canvas.js';
import { WORLDS } from '../worlds/index.js';
import { BANKS } from '../data/index.js';
import { RULES } from '../core/rules.js';
import { Game } from '../core/game.js';
import { STREAK_EVERY, STREAK_BONUS } from '../core/scoring.js';
import { shuffle } from '../core/rng.js';
import { ui, unlock } from '../audio/synth.js';
import { progress } from '../services/progress.js';
import { icon } from './icons.js';
import { notice } from './fx.js';

const TIER_ICONS = { common: 'dot', uncommon: 'diamond', rare: 'star', legendary: 'crown' };
import { toggleMute } from './menu.js';
import { showResults } from './results.js';

let scene;
let game = null;
let world;
let rules;
let deadline = 0;
let timerId = 0;
let typeId = 0;
let lastSecond = 0;

const finite = () => Number.isFinite(rules.prompts);

function stopTimers() {
  clearInterval(timerId);
  clearInterval(typeId);
}

// ---------- HUD ----------
function paintProgress() {
  const pips = [];
  if (finite()) {
    for (let i = 0; i < rules.prompts; i++) {
      const entry = game.log[i];
      pips.push(entry ? (entry.kind === 'hit' ? 'done' : 'lost') : i === game.log.length ? 'now' : '');
    }
    $('#hudProg').textContent = `Prompt ${Math.min(game.promptNumber, rules.prompts)} of ${rules.prompts}`;
  } else if (rules.endless) {
    const recent = game.log.slice(-7);
    for (const entry of recent) pips.push(entry.kind === 'hit' ? 'done' : 'lost');
    if (!game.resolved) pips.push('now');
    $('#hudProg').textContent = `Endless · prompt ${game.promptNumber}`;
  } else {
    for (let i = 0; i < rules.strikes; i++) pips.push(i < rules.strikes - game.strikes ? 'life' : 'lost');
    const left = rules.strikes - game.strikes;
    $('#hudProg').textContent = `${left} ${left === 1 ? 'life' : 'lives'} · prompt ${game.promptNumber}`;
  }
  $('#pips').innerHTML = pips.map((cls) => `<span class="pip ${cls}"></span>`).join('');

  const streak = game.streak;
  $('#hudStreak').innerHTML =
    streak < 2 ? '' : `${icon('flame')}${streak % STREAK_EVERY === STREAK_EVERY - 1 ? `Streak ×${streak} · boost next` : `Streak ×${streak}`}`;
}

function paintPosition(index) {
  const stop = world.stop(index);
  $('#hudDist').textContent = world.short(stop);
  $('#hudStop').textContent = stop.name;
  $('#railFill').style.height = `${Math.min(100, (index / world.routeLength) * 100)}%`;
}

function banner(title, sub, bad = false) {
  const el = $('#banner');
  el.classList.toggle('top', bad);
  el.classList.toggle('bad', bad);
  $('#bannerName').textContent = title;
  $('#bannerSub').textContent = sub;
  el.hidden = false;
  replay(el, 'slam');
}

function floater(text, extraClass = '') {
  const el = document.createElement('div');
  el.className = `floater ${extraClass}`;
  el.textContent = text;
  $('#sceneWrap').appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

function flyby(stop) {
  const el = $('#flyby');
  el.textContent = `${world.words.passing} ${stop.name}`;
  el.hidden = false;
  replay(el, 'flyby');
}

// ---------- asking ----------
function typeOut(el, text) {
  clearInterval(typeId);
  el.setAttribute('aria-label', text);
  if (reduceMotion) {
    el.textContent = text;
    return;
  }
  let shown = 0;
  el.textContent = '';
  typeId = setInterval(() => {
    shown += 1;
    el.textContent = text.slice(0, shown);
    if (shown % 3 === 0) ui.key();
    if (shown >= text.length) clearInterval(typeId);
  }, 20);
}

function tick() {
  const left = Math.max(0, deadline - performance.now());
  const seconds = Math.ceil(left / 1000);
  $('#timerBar').style.transform = `scaleX(${left / (rules.seconds * 1000)})`;
  $('#timerNum').textContent = `${seconds}s`;
  const low = seconds <= 5;
  $('#timer').classList.toggle('low', low);
  $('#timerNum').classList.toggle('low', low);
  if (low && seconds !== lastSecond && seconds > 0) ui.tick();
  lastSecond = seconds;
  if (left <= 0) resolve(null);
}

function ask() {
  const question = game.prompt;
  $('#game').classList.add('asking');
  paintProgress();
  $('#qLabel').textContent = finite() ? `Prompt ${game.promptNumber} of ${rules.prompts}` : `Prompt ${game.promptNumber}`;
  typeOut($('#question'), question.q);

  const card = $('#askCard');
  card.hidden = false;
  replay(card, 'enter');
  $('#resultCard').hidden = true;
  $('#banner').hidden = true;
  $('#flyby').hidden = true;
  $('#skip').hidden = true;

  // Jump straight to the answer box: top of the screen, keyboard open.
  const input = $('#guess');
  input.value = '';
  input.disabled = false;
  $('#app').scrollTop = 0;
  input.focus({ preventScroll: true });
  setTimeout(() => {
    $('#app').scrollTop = 0;
    window.scrollTo(0, 0);
  }, 60);

  deadline = performance.now() + rules.seconds * 1000;
  lastSecond = 0;
  clearInterval(timerId);
  timerId = setInterval(tick, 100);
  tick();
}

// ---------- judging ----------
function rareAnswers(question) {
  const floor = question.answers[question.answers.length - 1].pct;
  return shuffle(question.answers.filter((a) => a.pct <= floor * 3)).slice(0, 4);
}

function renderResult(question, raw, out) {
  const answer = out.answer;
  const you = $('#you');
  if (out.kind === 'hit') {
    const same = raw.trim().toLowerCase() === answer.name.toLowerCase();
    you.innerHTML = `<q>${esc(same ? answer.name : raw)}</q>${same ? '' : ` <span>→ ${esc(answer.name)}</span>`}<br><span>${shareSentence(answer.pct)}</span>`;
  } else if (out.kind === 'repeat') {
    you.innerHTML = `<q>${esc(answer.name)}</q><br><span>You already used that answer on this run, so it doesn't count again. ${esc(world.words.stays)}</span>`;
  } else if (out.kind === 'miss') {
    you.innerHTML = `<q>${esc(raw)}</q><br><span>That isn't one of the answers that count here. Check the spelling, or try a more common name for it. ${esc(world.words.stays)}</span>`;
  } else {
    you.innerHTML = `<span>The clock ran out. ${esc(world.words.stays)}</span>`;
  }

  const pts = $('#pts');
  pts.textContent = `+${out.points}`;
  pts.classList.toggle('zero', out.points === 0);

  const chips = [];
  if (out.kind === 'hit') {
    chips.push(`<span class="chip solid">${icon(TIER_ICONS[out.tier.id])}${out.tier.label}</span>`);
    chips.push(`<span class="chip">${icon('flag')}+${out.hops} ${out.hops === 1 ? 'stop' : 'stops'}</span>`);
    if (out.boost) chips.push(`<span class="chip hot">${icon('flame')}Streak boost: +${STREAK_BONUS.hops} stop, +${STREAK_BONUS.points} points</span>`);
    else if (out.streak >= 2) chips.push(`<span class="chip hot">${icon('flame')}Streak ×${out.streak}</span>`);
  } else if (!finite() && !rules.endless) {
    const left = rules.strikes - out.strikes;
    chips.push(`<span class="chip hot">${icon('heart')}${left === 0 ? 'No lives left' : `${left} ${left === 1 ? 'life' : 'lives'} left`}</span>`);
  }
  $('#gains').innerHTML = chips.map((c, i) => c.replace('class="', `style="--d:${i * 90}ms" class="`)).join('');

  const top = question.answers.slice(0, 5);
  const max = top[0].pct;
  const mine = out.kind === 'hit' ? answer : null;
  const row = (a, i, label) =>
    `<li class="${a === mine ? 'mine' : ''}" style="--d:${i * 70}ms"><div class="bar-track"><i style="--w:${Math.max(2, (a.pct / max) * 100).toFixed(1)}%"></i><span>${esc(label)}</span></div><span class="pct">${pctText(a.pct)}</span></li>`;
  const rows = top.map((a, i) => row(a, i, a.name));
  if (mine && !top.includes(mine)) rows.push(row(mine, 5, `${mine.name} (you)`));
  $('#bars').innerHTML = rows.join('');
  $('#cuts').innerHTML = rareAnswers(question).map((a, i) => `<span class="chip" style="--d:${400 + i * 80}ms">${esc(a.name)}</span>`).join('');
  $('#chartSize').textContent = `${question.answers.length} answers count`;
  $('#next').textContent = out.over ? 'See results' : 'Next prompt';
  $('#finish').hidden = !rules.endless || out.over;
}

function showResult(shake = false) {
  $('#skip').hidden = true;
  const card = $('#resultCard');
  if (!card.hidden) return;
  card.hidden = false;
  if (shake) replay(card, 'enter', 'shakeX');
  else {
    card.classList.remove('shakeX');
    replay(card, 'enter');
  }
  $('#next').focus({ preventScroll: true });
}

function arrive(out, scoreBefore) {
  if (out.from <= world.routeLength && out.to > world.routeLength) {
    // Crossing off the map: from here on every place is generated.
    setTimeout(() => notice(world.id === 'ocean' ? 'Off the charts: new zones ahead' : 'Off the charts: new worlds ahead', 'target'), 900);
  }
  const stop = world.stop(out.to);
  world.sfx.arrive(out.to);
  for (let i = 0; i < 3; i++) world.sfx.cheer(i);
  banner(stop.name, stop.note || world.distance(stop));
  floater(`+${out.points}`);
  if (out.boost) {
    floater(`Streak boost +${STREAK_BONUS.hops} stop`, 'boost');
    world.sfx.boost();
  }
  countUp($('#hudScore'), scoreBefore, game.score);
  replay($('#hudDist'), 'bump');
  paintPosition(out.to);
  paintProgress();
}

function resolve(raw) {
  if (!game || game.resolved || game.over) return;
  stopTimers();
  const input = $('#guess');
  input.blur();
  input.disabled = true;

  const question = game.prompt;
  $('#question').textContent = question.q;
  const scoreBefore = game.score;
  const out = raw == null ? game.timeout() : game.answer(raw);
  progress.mark(world.id, question.id); // completed: don't deal it again until the rest are done
  renderResult(question, raw || '', out);

  $('#game').classList.remove('asking');
  $('#askCard').hidden = true;
  $('#resultCard').hidden = true;
  $('#app').scrollTop = 0;

  if (out.kind === 'hit') {
    world.sfx.depart();
    $('#skip').hidden = false;
    scene.travel(out.to, {
      onFlyby(stop) {
        flyby(stop);
        world.sfx.flyby();
      },
      onPop: () => world.sfx.pop(),
      onArrive: () => arrive(out, scoreBefore),
      onDone: () => showResult(),
    });
  } else {
    world.sfx.miss();
    const why = out.kind === 'timeout' ? world.words.timeout : out.kind === 'repeat' ? world.words.repeat : world.words.missWhy;
    banner(world.words.miss, why, true);
    paintProgress();
    scene.miss({ onDone: () => showResult(true) });
  }
}

function next() {
  unlock();
  ui.click();
  if (!game) return;
  if (game.over) {
    const finished = game;
    game = null;
    showResults({ summary: finished.summary(), world, rules, planned: finished.planned });
    return;
  }
  game.advance();
  ask();
}

/** Start a run in the chosen world and rules. Call from a tap so the keyboard can open. */
export function startRun(worldId = session.worldId, rulesId = session.rulesId) {
  unlock();
  ui.start();
  world = setWorld(worldId);
  rules = RULES[rulesId];
  game = new Game({ worldId, rules, questions: BANKS[worldId], seen: progress.seen(worldId) });
  scene.setWorld(world);
  go('game');
  $('#hudMetric').textContent = world.metric;
  $('#fire').textContent = world.fire;
  $('#hint').textContent = `${world.dir < 0 ? '▲' : '▼'} ${world.words.hint}`;
  $('#hudScore').textContent = '0';
  paintPosition(0);
  ask();
}

export function initPlay() {
  scene = new Scene($('#scene'));
  $('#form').addEventListener('submit', (event) => {
    event.preventDefault();
    const value = $('#guess').value.trim();
    if (!value) {
      replay($('#form'), 'shakeX');
      return;
    }
    resolve(value);
  });
  $('#next').addEventListener('click', next);
  $('#finish').addEventListener('click', () => {
    if (!game) return;
    game.finish();
    next();
  });
  $('#skip').addEventListener('click', () => scene.skip());
  $('#sceneWrap').addEventListener('click', (event) => {
    if (!event.target.closest('button')) scene.skip();
  });
  $('#abort').addEventListener('click', () => {
    ui.back();
    game = null;
    go('menu');
  });
  $('#mute').addEventListener('click', toggleMute);
  $('#guess').addEventListener('input', () => ui.key());

  register('game', {
    frame(now, dt) {
      scene.frame(now, dt);
      backdrop.warpTarget = scene.warp;
      backdrop.pos = world.backdropAt(scene.p);
    },
    leave() {
      stopTimers();
      backdrop.warpTarget = 0;
    },
  });
}

/** For automated tests. */
export const debug = { game: () => game, scene: () => scene };
