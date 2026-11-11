// The full-screen background behind every screen. Each world paints its own.
import { fl } from './canvas.js';

export class Backdrop {
  constructor(canvas, px = 2) {
    this.canvas = canvas;
    this.g = canvas.getContext('2d');
    this.px = px;
    this.W = 1;
    this.H = 1;
    this.warp = 0; // 0 at rest, 1 at full travel speed
    this.warpTarget = 0;
    this.pos = 0; // world-specific position, such as depth in metres
    this.world = null;
  }

  setWorld(world) {
    this.world = world;
    this.warp = 0;
    this.warpTarget = 0;
    this.resize(true);
  }

  resize(force = false) {
    const W = Math.ceil(window.innerWidth / this.px);
    const H = Math.ceil(window.innerHeight / this.px);
    if (!force && W === this.W && H === this.H) return;
    this.W = this.canvas.width = W;
    this.H = this.canvas.height = H;
    this.g.imageSmoothingEnabled = false;
    if (this.world) this.world.initBackdrop(this);
  }

  frame(dt, t) {
    if (!this.world) return;
    this.warp += (this.warpTarget - this.warp) * Math.min(1, dt * 3);
    if (this.warp < 0.001) this.warp = fl(this.warpTarget);
    this.world.drawBackdrop(this, dt, t);
  }
}
