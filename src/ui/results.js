// The end-of-run screen: where you got to, how you compare, and what you answered.
import { $, esc, countUp, tabs } from './dom.js';
import { go, register, session } from './app.js';
import { rankFor } from '../core/scoring.js';
import { PERIODS, periodStart, standing, simulateCrowd, percentBelow } from '../core/stats.js';
import { board, makeRun } from '../services/board.js';
import { store } from '../services/storage.js';
import { ui, unlock } from '../audio/synth.js';
import { startRun } from './play.js';

let ctx = null; // the run being shown
let period = 'week';
let token = 0;

/** Markup for a standing: a big percentage, a line of detail, and the top of the board. */
export function standingHtml(s, { periodLabel, subject }) {
  if (s.score == null) return { main: `<span class="quiet">${subject.unranked}</span>`, top: topHtml(s.board, 10) };
  if (!s.others) {
    return {
      main: `<span class="line">${subject.score(s.score)}</span><span class="quiet">No other players on the board for this period yet.</span>`,
      top: topHtml(s.board, 10),
    };
  }
  const tied = s.tied ? `, tied with ${s.tied}` : '';
  return {
    main: `<span class="pc">${s.percent}%<small> of other players beaten</small></span>
      <span class="line">${subject.score(s.score)} · rank ${s.rank} of ${s.players}${tied} · ${esc(periodLabel)}</span>
      <div class="meter"><i style="--w:${Math.max(2, s.percent)}%"></i></div>`,
    top: topHtml(s.board, 10),
  };
}

function topHtml(rows, limit) {
  return rows
    .slice(0, limit)
    .map((row) => `<li class="${row.me ? 'me' : ''}"><span class="pos">${1 + rows.filter((r) => r.score > row.score).length}</span><span class="who">${esc(row.name)}${row.me ? ' (you)' : ''}</span><span class="sc">${row.score}</span></li>`)
    .join('');
}

function paintStanding() {
  if (!ctx) return;
  const { summary, world, rules, players, crowd, counted } = ctx;
  const label = PERIODS.find((p) => p.id === period).label.toLowerCase();
  if (!players) {
    $('#resStanding').innerHTML = '<span class="quiet">Checking the board…</span>';
    $('#resTop').innerHTML = '';
  } else {
    const s = standing(players, { worldId: world.id, rulesId: rules.id, since: periodStart(period), score: summary.score });
    const html = standingHtml(s, { periodLabel: label, subject: { score: (v) => `This run: ${v} points` } });
    $('#resStanding').innerHTML = html.main;
    $('#resTop').innerHTML = topHtml(s.board, 5);
  }
  $('#resCrowd').innerHTML = crowd
    ? `Estimated crowd: better than <b>${percentBelow(crowd, summary.score)}%</b>. This is a model, not real players.`
    : '';
  const notes = [board.note];
  if (!counted) notes.unshift("Practice run: your first Daily run of the day is the one that counts.");
  $('#resNote').textContent = notes.join(' ');
}

/** Show the results of a finished run, post it to the board, then fill in the comparison. */
export async function showResults({ summary, world, rules, planned }) {
  const mine = ++token;
  const stop = world.stop(summary.stops);
  go('results');

  $('#resMode').textContent = `${world.name} · ${rules.name}`;
  $('#resReached').textContent = summary.stops ? world.words.reached : 'You stayed at';
  $('#resStop').textContent = stop.name;
  $('#resDist').textContent = world.distance(stop);
  $('#resRank').textContent = rankFor(summary.score);
  countUp($('#resScore'), 0, summary.score, undefined, 1200);
  $('#resStops').textContent = summary.stops;
  $('#resHits').textContent = `${summary.hits}/${summary.log.length}`;
  $('#resStreak').textContent = summary.bestStreak;
  $('#copied').textContent = '';
  $('#resRows').innerHTML = summary.log
    .map((e, i) => {
      const said = e.kind === 'timeout' ? 'No answer' : e.answer ? e.answer.name : e.raw;
      const got = e.kind === 'hit' ? `${world.stop(e.to).name} · +${e.points}` : e.kind === 'repeat' ? 'Repeat' : e.kind === 'timeout' ? 'Timed out' : 'Miss';
      return `<div class="log-row ${e.kind === 'hit' ? '' : 'missed'}" style="--d:${200 + Math.min(i, 10) * 70}ms"><span class="q">${esc(e.q)}</span><span class="a">${esc(said)}</span><span class="d">${esc(got)}</span></div>`;
    })
    .join('');
  ui.finish(Math.floor(summary.score / 120));

  // Daily: only the first run of the day goes on the board.
  let counted = true;
  if (rules.id === 'daily') {
    const key = `daily:${world.id}:${summary.day}`;
    if (store.get(key) != null) counted = false;
    else store.set(key, summary.score);
  }
  const best = store.get('best', {});
  const bucket = `${world.id}:${rules.id}`;
  if (!best[bucket] || summary.score > best[bucket].score) {
    best[bucket] = { score: summary.score, stops: summary.stops };
    store.set('best', best);
  }

  ctx = {
    summary, world, rules, counted, players: null,
    crowd: planned ? simulateCrowd(planned) : null,
  };
  period = rules.id === 'daily' ? 'day' : 'week';
  tabs($('#resPeriods'), PERIODS, period, (id) => {
    period = id;
    paintStanding();
  });
  paintStanding();

  if (counted) await board.submit(makeRun({ worldId: world.id, rulesId: rules.id, score: summary.score, stops: summary.stops, day: summary.day }));
  const players = await board.load();
  if (mine !== token) return; // the player has moved on to another run
  ctx.players = players;
  paintStanding();
}

function copyResult() {
  if (!ctx) return;
  const { summary, world, rules } = ctx;
  const stop = world.stop(summary.stops);
  const text =
    `FAR OUT · ${world.name} ${rules.name}\n${stop.name} (${world.distance(stop)}) · ${summary.score} points\n` +
    summary.log.map((e, i) => `${i + 1}. ${e.kind === 'hit' ? `${e.answer.name} +${e.points}` : 'miss'}`).join('\n');
  const done = () => {
    $('#copied').textContent = 'Copied. Paste it to challenge a friend.';
  };
  const fallback = () => {
    const box = $('#copyBox');
    box.value = text;
    box.select();
    try {
      document.execCommand('copy');
      done();
    } catch (e) {
      $('#copied').textContent = "Copying isn't available here.";
    }
  };
  try {
    navigator.clipboard.writeText(text).then(done, fallback);
  } catch (e) {
    fallback();
  }
}

export function initResults() {
  $('#resAgain').addEventListener('click', () => startRun(ctx ? ctx.world.id : session.worldId, ctx ? ctx.rules.id : session.rulesId));
  $('#resMenu').addEventListener('click', () => {
    unlock();
    ui.back();
    go('menu');
  });
  $('#resCopy').addEventListener('click', copyResult);
  register('results', {});
}
