// Rankings: your best score against every other player's best, by world, rules and period.
import { $, tabs } from './dom.js';
import { register, session, setWorld } from './app.js';
import { WORLDS, WORLD_LIST } from '../worlds/index.js';
import { RULES, RULE_LIST } from '../core/rules.js';
import { PERIODS, periodStart, standing } from '../core/stats.js';
import { board } from '../services/board.js';
import { standingHtml } from './results.js';

const view = { worldId: 'space', rulesId: 'classic', period: 'week' };
let players = null;
let token = 0;

function paint() {
  if (!players) {
    $('#rkStanding').innerHTML = '<span class="quiet">Checking the board…</span>';
    $('#rkTop').innerHTML = '';
    return;
  }
  const world = WORLDS[view.worldId];
  const rules = RULES[view.rulesId];
  const s = standing(players, { worldId: view.worldId, rulesId: view.rulesId, since: periodStart(view.period) });
  const html = standingHtml(s, {
    periodLabel: PERIODS.find((p) => p.id === view.period).label.toLowerCase(),
    subject: {
      score: (v) => `Your best: ${v} points`,
      unranked: `Play a ${rules.name} run in ${world.name} to get ranked here.`,
    },
  });
  $('#rkStanding').innerHTML = html.main;
  $('#rkTop').innerHTML = html.top;
  $('#rkNote').textContent = board.note;
}

async function load() {
  const mine = ++token;
  players = null;
  paint();
  const loaded = await board.load();
  if (mine !== token) return;
  players = loaded;
  paint();
}

export function initRankings() {
  register('rankings', {
    enter() {
      view.worldId = session.worldId;
      view.rulesId = session.rulesId;
      setWorld(view.worldId);
      tabs($('#rkWorlds'), WORLD_LIST.map((w) => ({ id: w.id, label: w.name })), view.worldId, (id) => {
        view.worldId = id;
        setWorld(id);
        paint();
      });
      tabs($('#rkRules'), RULE_LIST.map((r) => ({ id: r.id, label: r.name })), view.rulesId, (id) => {
        view.rulesId = id;
        paint();
      });
      tabs($('#rkPeriods'), PERIODS, view.period, (id) => {
        view.period = id;
        paint();
      });
      load();
    },
  });
}
