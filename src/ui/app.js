// App shell: which screen is showing, which world is themed, and the shared backdrop.
import { Backdrop } from '../gfx/backdrop.js';
import { WORLDS } from '../worlds/index.js';
import { store } from '../services/storage.js';
import { $ } from './dom.js';

const SCREENS = ['menu', 'select', 'game', 'results', 'rankings', 'howto'];
const hooks = {};
let active = 'menu';

/** The player's current choice of world and rules, remembered between visits. */
export const session = {
  worldId: WORLDS[store.get('world')] ? store.get('world') : 'space',
  rulesId: store.get('rules', 'classic'),
};

export const backdrop = new Backdrop($('#sky'));

/** Screens register {enter, leave, frame} callbacks. */
export function register(name, hook) {
  hooks[name] = hook;
}

export const currentScreen = () => active;

export function go(name, params) {
  if (hooks[active] && hooks[active].leave) hooks[active].leave();
  active = name;
  for (const id of SCREENS) $(`#${id}`).hidden = id !== name;
  $('#app').scrollTop = 0;
  if (hooks[name] && hooks[name].enter) hooks[name].enter(params);
}

/** Switch the colour theme and backdrop to a world. */
export function setWorld(worldId) {
  const world = WORLDS[worldId];
  if (backdrop.world === world) return world;
  document.documentElement.dataset.world = worldId;
  backdrop.setWorld(world);
  backdrop.pos = world.backdropAt(0);
  const theme = document.querySelector('meta[name="theme-color"]');
  if (theme) theme.content = getComputedStyle(document.documentElement).getPropertyValue('--void').trim();
  return world;
}

export function frame(now, dt) {
  backdrop.frame(dt, now / 1000);
  const hook = hooks[active];
  if (hook && hook.frame) hook.frame(now, dt);
}

window.addEventListener('resize', () => backdrop.resize());
