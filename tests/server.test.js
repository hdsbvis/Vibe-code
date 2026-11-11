import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const PORT = 18000 + Math.floor(Math.random() * 2000);
const base = `http://localhost:${PORT}`;
let server;
let dataDir;

test.before(async () => {
  dataDir = await mkdtemp(join(tmpdir(), 'farout-'));
  server = spawn(process.execPath, ['server/server.js'], { env: { ...process.env, PORT: String(PORT), DATA_DIR: dataDir }, stdio: 'pipe' });
  await new Promise((resolve, reject) => {
    server.stdout.on('data', (chunk) => String(chunk).includes('running') && resolve());
    server.on('error', reject);
    setTimeout(() => reject(new Error('server did not start')), 5000);
  });
});
test.after(() => server.kill());

const post = (body) => fetch(`${base}/api/runs`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test('serves the game but not the rest of the repo', async () => {
  assert.equal((await fetch(`${base}/`)).status, 200);
  assert.equal((await fetch(`${base}/src/main.js`)).status, 200);
  assert.equal((await fetch(`${base}/styles/main.css`)).status, 200);
  for (const path of ['/package.json', '/server/server.js', '/.gitignore', '/src/..%2fpackage.json', '/tests/game.test.js']) {
    assert.equal((await fetch(base + path)).status, 404, path);
  }
});

test('keeps a shared board', async () => {
  assert.deepEqual(await (await fetch(`${base}/api/health`)).json(), { farOut: true, players: 0 });

  const me = 'aaaaaaaaaaaa1111';
  assert.equal((await post({ id: me, name: 'Lunar Otter 42', run: { w: 'space', r: 'classic', s: 300, st: 14 } })).status, 200);
  await pause(1100);
  assert.equal((await post({ id: 'bbbbbbbbbbbb2222', name: '<b>Rude</b>', run: { w: 'ocean', r: 'survival', s: 120, st: 6, t: 5 } })).status, 200);

  const { players } = await (await fetch(`${base}/api/board?me=${me}`)).json();
  assert.equal(players.length, 2);
  const mine = players.find((p) => p.me);
  assert.equal(mine.name, 'Lunar Otter 42');
  assert.equal(mine.best['space:classic'].s, 300);
  const other = players.find((p) => !p.me);
  assert.equal(other.name, 'bRudeb');
  assert.ok(other.runs[0].t > 1e12, 'the server stamps the time itself');
  for (const p of players) assert.ok(!JSON.stringify(p).includes(me), 'secret ids never leave the server');
});

test('rejects bad runs and fast repeat posts', async () => {
  await pause(1100);
  assert.equal((await post({ id: 'short', run: { w: 'space', r: 'classic', s: 1, st: 1 } })).status, 400);
  await pause(1100);
  assert.equal((await post({ id: 'cccccccccccc3333', run: { w: 'moon', r: 'classic', s: 1, st: 1 } })).status, 400);
  await pause(1100);
  assert.equal((await post({ id: 'cccccccccccc3333', run: { w: 'space', r: 'classic', s: 'lots', st: 1 } })).status, 400);
  await pause(1100);
  assert.equal((await post({ id: 'cccccccccccc3333', name: 'Ok', run: { w: 'space', r: 'classic', s: 10, st: 1 } })).status, 200);
  assert.equal((await post({ id: 'cccccccccccc3333', name: 'Ok', run: { w: 'space', r: 'classic', s: 10, st: 1 } })).status, 429);
});

test('saves the board to disk', async () => {
  await pause(900);
  const saved = JSON.parse(await readFile(join(dataDir, 'board.json'), 'utf8'));
  assert.equal(Object.keys(saved).length, 3);
});
