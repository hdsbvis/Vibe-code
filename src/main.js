// Far Out: entry point. Wires up the screens and runs the frame loop.
import { go, frame, backdrop } from './ui/app.js';
import { initMenu } from './ui/menu.js';
import { initSelect } from './ui/select.js';
import { initPlay, debug } from './ui/play.js';
import { initResults } from './ui/results.js';
import { initRankings } from './ui/rankings.js';
import { board } from './services/board.js';
import { BANKS } from './data/index.js';
import { decorate } from './ui/icons.js';

initMenu();
initSelect();
initPlay();
initResults();
initRankings();
decorate();
go('menu');

let last = performance.now();
function loop(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  frame(now, dt);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

// A small hook for automated tests.
window.__farout = { ...debug, board, BANKS, backdrop };
