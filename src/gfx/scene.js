// The journey view: the vehicle waiting at a stop, travelling on, celebrating, or failing to leave.
import { View, stepParticles, easeInOut, easeOut, lerp, reduceMotion } from './canvas.js';

const TIMING = reduceMotion
  ? { ignite: 80, cruise: 260, perHop: 0, party: 500, miss: 300 }
  : { ignite: 520, cruise: 950, perHop: 420, party: 3200, miss: 1300 };

const TAU = Math.PI * 2;
function lerpAngle(a, b, k) {
  let d = (b - a) % TAU;
  if (d > Math.PI) d -= TAU;
  if (d < -Math.PI) d += TAU;
  return a + d * k;
}
const blend = (a, b, k) => ({ x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k), angle: lerpAngle(a.angle, b.angle, k) });

export class Scene {
  /** @param {HTMLCanvasElement} canvas */
  constructor(canvas, world = null) {
    this.V = new View(canvas, 3);
    this.world = world;
    this.mode = 'idle'; // idle | ignite | cruise | party | miss
    this.at = 0; // stop the vehicle is at, or left from
    this.to = 0;
    this.p = 0; // fractional position along the route
    this.t0 = 0;
    this.arrived = -Infinity;
    this.cb = {};
    this.lastFlyby = -1;
    this.boomed = false;
  }

  setWorld(world) {
    this.world = world;
    this.V.parts = [];
    this.place(0);
  }

  /** Put the vehicle at a stop with no animation. */
  place(i) {
    this.mode = 'idle';
    this.at = this.to = this.p = i;
    this.arrived = -Infinity;
    this.cb = {};
  }

  get busy() {
    return this.mode !== 'idle';
  }

  /** 0 to 1: how fast the background should streak. */
  get warp() {
    if (this.mode !== 'cruise') return 0;
    const q = (performance.now() - this.t0) / this.cruiseMs;
    return Math.pow(Math.max(0, Math.sin(Math.PI * Math.min(1, q))), 0.7);
  }

  /** Travel to a later stop. Callbacks: onFlyby(stop), onArrive(), onDone(). */
  travel(to, cb = {}) {
    this.to = to;
    this.cb = cb;
    this.mode = 'ignite';
    this.t0 = performance.now();
    this.cruiseMs = TIMING.cruise + TIMING.perHop * Math.min(6, to - this.at);
    this.lastFlyby = this.at;
  }

  /** A failed departure: the vehicle shakes, splutters and stays put. */
  miss(cb = {}) {
    this.cb = cb;
    this.mode = 'miss';
    this.t0 = performance.now();
    this.boomed = false;
  }

  /** Jump past whatever animation is playing. */
  skip() {
    const now = performance.now();
    if (this.mode === 'ignite') {
      this.mode = 'cruise';
      this.t0 = now - this.cruiseMs;
    } else if (this.mode === 'cruise') {
      this.t0 = now - this.cruiseMs;
    } else if (this.mode === 'party') {
      this.endParty();
    }
  }

  endParty() {
    this.mode = 'idle';
    const done = this.cb.onDone;
    this.cb = {};
    if (done) done();
  }

  frame(now, dt) {
    const { V, world } = this;
    if (!world || V.canvas.offsetParent === null) return;
    const t = now / 1000;
    V.resize();
    V.begin(dt);

    const span = V.H * 1.25 + 20;
    const here = world.stop(this.at);
    let pose;
    let thrust = 0;
    let jitter = 0;
    let trailPower = 0.08;
    let behind = false;

    if (this.mode === 'idle' || this.mode === 'party') {
      const parked = world.park(V, world.stop(this.to), t);
      pose = parked;
      thrust = parked.thrust;
      behind = parked.behind;
      if (this.mode === 'party') {
        const ms = now - this.arrived;
        if (world.partyFx(V, ms, world.stop(this.to)) && this.cb.onPop) this.cb.onPop();
        if (ms > TIMING.party) this.endParty();
      }
    } else if (this.mode === 'ignite') {
      const q = Math.min(1, (now - this.t0) / TIMING.ignite);
      pose = blend(world.park(V, here, t), world.cruise(V), easeInOut(q));
      thrust = 0.6 + q * 1.6;
      jitter = 1;
      trailPower = 0.6;
      V.shake = Math.max(V.shake, 1.2 * q);
      world.igniteFx(V, pose.x, pose.y);
      if (q >= 1) {
        this.mode = 'cruise';
        this.t0 = now;
      }
    } else if (this.mode === 'cruise') {
      const q = Math.min(1, (now - this.t0) / this.cruiseMs);
      this.p = lerp(this.at, this.to, easeInOut(q));
      const settle = q > 0.78 ? easeOut((q - 0.78) / 0.22) : 0;
      pose = blend(world.cruise(V), world.park(V, world.stop(this.to), t), settle);
      thrust = 2.2 - settle * 1.4;
      jitter = (1 - settle) * 0.6;
      trailPower = 1 - settle * 0.7;
      const passing = Math.round(this.p);
      if (passing !== this.lastFlyby && passing > this.at && passing < this.to) {
        this.lastFlyby = passing;
        if (this.cb.onFlyby) this.cb.onFlyby(world.stop(passing));
      }
      if (q >= 1) {
        this.at = this.p = this.to;
        this.mode = 'party';
        this.arrived = now;
        V.shake = 2.5;
        if (this.cb.onArrive) this.cb.onArrive();
      }
    } else if (this.mode === 'miss') {
      const q = Math.min(1, (now - this.t0) / TIMING.miss);
      const parked = world.park(V, here, t);
      pose = { x: parked.x, y: parked.y, angle: parked.angle + (q > 0.45 ? Math.sin(t * 20) * 0.08 * (1 - q) : 0) };
      behind = parked.behind;
      thrust = q < 0.45 && Math.floor(t * 14) % 2 ? 0.9 : 0;
      jitter = q < 0.5 ? 1 : 0;
      world.missFx(V, pose.x, pose.y, q);
      if (q > 0.45 && !this.boomed) {
        this.boomed = true;
        V.shake = 3;
        world.missBoom(V, pose.x, pose.y);
      }
      if (q >= 1) {
        this.mode = 'idle';
        const done = this.cb.onDone;
        this.cb = {};
        if (done) done();
      }
    }

    const drawVehicle = () => world.drawVehicle(V, pose.x, pose.y, { angle: pose.angle, thrust, t, jitter });
    if (behind) drawVehicle();

    // Only the stop you are at, or the two you are between, are on screen.
    for (let k = Math.floor(this.p); k <= Math.ceil(this.p); k++) {
      const oy = (k - this.p) * span * world.dir;
      // The destination's residents only come out once you arrive.
      let party = Infinity;
      if (k === this.to) party = this.mode === 'ignite' || this.mode === 'cruise' ? -1 : now - this.arrived;
      world.drawStop(V, world.stop(k), oy, t, party);
    }

    if (!behind) drawVehicle();
    world.trail(V, pose.x, pose.y, pose.angle, trailPower);
    stepParticles(V, dt);
  }
}
