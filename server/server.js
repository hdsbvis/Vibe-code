// A small server with no dependencies: it serves the game and keeps a shared scoreboard.
//
//   npm start            then open http://localhost:8787 (or http://<this computer's IP>:8787 on a phone)
//   PORT=3000 npm start  to use another port
//
// Scores live in server/data/board.json.
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const DATA_DIR = process.env.DATA_DIR || join(ROOT, 'server', 'data');
const DATA_FILE = join(DATA_DIR, 'board.json');
const PORT = Number(process.env.PORT) || 8787;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};
const PUBLIC = ['index.html', 'src', 'styles']; // the only things the static server hands out

const WORLDS = new Set(['space', 'ocean']);
const RULESETS = new Set(['classic', 'daily', 'survival', 'endless']);
const MAX_RUNS = 300;
const MAX_PLAYERS = 5000;

/** @type {Map<string, {name: string, runs: object[], best: object}>} keyed by secret player id */
let players = new Map();
try {
  players = new Map(Object.entries(JSON.parse(await readFile(DATA_FILE, 'utf8'))));
} catch (e) {
  /* first run: no board yet */
}

let saveTimer = null;
function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(DATA_FILE, JSON.stringify(Object.fromEntries(players)));
  }, 500);
}

// Players only ever see each other's public id, so nobody can post as someone else.
const publicId = (id) => createHash('sha256').update(id).digest('hex').slice(0, 12);
const int = (v, max) => (Number.isFinite(v) ? Math.max(0, Math.min(max, Math.round(v))) : null);

function addRun(body) {
  const { id, name, run } = body || {};
  if (typeof id !== 'string' || !/^[a-z0-9]{8,40}$/i.test(id)) return 'bad id';
  if (!run || !WORLDS.has(run.w) || !RULESETS.has(run.r)) return 'bad run';
  const score = int(run.s, 1e6);
  const stops = int(run.st, 1e5);
  if (score == null || stops == null) return 'bad numbers';
  if (!players.has(id) && players.size >= MAX_PLAYERS) return 'board full';

  const player = players.get(id) || { name: 'Unknown', runs: [], best: {} };
  if (typeof name === 'string') player.name = name.replace(/[^\w '-]/g, '').slice(0, 24) || 'Unknown';
  const saved = { w: run.w, r: run.r, s: score, st: stops, t: Date.now() }; // the server's clock, not the client's
  player.runs = [...player.runs, saved].slice(-MAX_RUNS);
  const key = `${saved.w}:${saved.r}`;
  if (!player.best[key] || saved.s > player.best[key].s) player.best[key] = { s: saved.s, st: saved.st, t: saved.t };
  players.set(id, player);
  save();
  return null;
}

const lastPost = new Map(); // ip -> time, a light brake on spam
function json(res, status, body) {
  res.writeHead(status, { 'Content-Type': TYPES['.json'], 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
}

async function api(req, res, url) {
  if (url.pathname === '/api/health') return json(res, 200, { farOut: true, players: players.size });

  if (url.pathname === '/api/board' && req.method === 'GET') {
    const me = url.searchParams.get('me');
    const list = [...players].map(([id, p]) => ({ id: publicId(id), name: p.name, runs: p.runs, best: p.best, ...(id === me ? { me: true } : {}) }));
    return json(res, 200, { players: list });
  }

  if (url.pathname === '/api/runs' && req.method === 'POST') {
    const ip = req.socket.remoteAddress || '';
    if (Date.now() - (lastPost.get(ip) || 0) < 1000) return json(res, 429, { error: 'slow down' });
    lastPost.set(ip, Date.now());
    if (lastPost.size > 10000) lastPost.clear();
    let raw = '';
    for await (const chunk of req) {
      raw += chunk;
      if (raw.length > 2048) return json(res, 413, { error: 'too large' });
    }
    let body;
    try {
      body = JSON.parse(raw);
    } catch (e) {
      return json(res, 400, { error: 'bad json' });
    }
    const error = addRun(body);
    return error ? json(res, 400, { error }) : json(res, 200, { ok: true });
  }

  return json(res, 404, { error: 'not found' });
}

async function statics(res, url) {
  const rel = normalize(decodeURIComponent(url.pathname)).replace(/^[/\\]+/, '') || 'index.html';
  const top = rel.split(sep)[0];
  if (rel.includes('..') || rel.split(sep).some((part) => part.startsWith('.')) || !PUBLIC.includes(top)) {
    res.writeHead(404).end('Not found');
    return;
  }
  try {
    const body = await readFile(join(ROOT, rel));
    res.writeHead(200, { 'Content-Type': TYPES[extname(rel)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(body);
  } catch (e) {
    res.writeHead(404).end('Not found');
  }
}

const server = createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const handler = url.pathname.startsWith('/api/') ? api(req, res, url) : statics(res, url);
  handler.catch(() => {
    if (!res.headersSent) res.writeHead(500);
    res.end();
  });
});

server.listen(PORT, () => {
  console.log(`Far Out is running at http://localhost:${PORT}`);
  console.log('On a phone on the same Wi-Fi, use this computer\'s IP address instead of "localhost".');
});
