// Pixel art, written as rows of palette letters. '.' is transparent.
import { makeSprite } from './canvas.js';

const ART = {
  // ---------- space ----------
  rocket: {
    pal: { N: '#ff5fa2', W: '#efeaff', G: '#a9a1d6', C: '#5ef2ff' },
    frames: [[
      '...N...',
      '..NNN..',
      '..WWW..',
      '.WWWWG.',
      '.WCCWG.',
      '.WCCWG.',
      '.WWWWG.',
      '.WWWWG.',
      '.WWWWG.',
      'NWWWWGN',
      'NNWWWNN',
      'N.GGG.N',
    ]],
  },
  alien: {
    pal: { x: '#7dff8a', e: '#0a0718' },
    frames: [[
      '.x...x.',
      '..xxx..',
      '.xxxxx.',
      '.xexex.',
      '.xxxxx.',
      '..x.x..',
    ], [
      '.x...x.',
      'x.xxx.x',
      'xxxxxxx',
      '.xexex.',
      '.xxxxx.',
      '.x...x.',
    ]],
  },
  astro: {
    pal: { w: '#efeaff', c: '#5ef2ff' },
    frames: [[
      '..www..',
      '.wcccw.',
      '.wcccw.',
      'wwwwwww',
      '.wwwww.',
      '.w...w.',
    ], [
      '..www..',
      '.wcccw.',
      'wwcccww',
      '.wwwww.',
      '.wwwww.',
      '.w...w.',
    ]],
  },
  ufo: {
    pal: { c: '#9ffcff', m: '#8b84bb', y: '#ffe066' },
    frames: [[
      '...ccc...',
      '..ccccc..',
      '.mmmmmmm.',
      'mmymmymmm',
      '.mmmmmmm.',
    ], [
      '...ccc...',
      '..ccccc..',
      '.mmmmmmm.',
      'mymmymmym',
      '.mmmmmmm.',
    ]],
  },
  station: {
    pal: { b: '#5b7dff', w: '#efeaff', g: '#a9a1d6' },
    frames: [[
      'bb.bb.....bb.bb',
      'bb.bb..w..bb.bb',
      'bbgbbgwwwgbbgbb',
      'bb.bb..w..bb.bb',
      'bb.bb.....bb.bb',
    ]],
  },
  probe: {
    pal: { w: '#efeaff', g: '#a9a1d6', y: '#ffd84d', d: '#6f68a3' },
    frames: [[
      '....www......',
      '...wwwww.....',
      '..wwwgwww....',
      '...wwwww.....',
      'd...yyy.....d',
      'dddyyyyydddd.',
      '....yyy......',
      '.....g.......',
      '....g........',
    ]],
  },
  flag: {
    pal: { p: '#efeaff', r: '#ff5fa2' },
    frames: [['prr', 'prr', 'p..', 'p..', 'p..']],
  },
  rover: {
    pal: { w: '#efeaff', g: '#a9a1d6', k: '#3b3388', c: '#5ef2ff' },
    frames: [[
      '..c......',
      '..g..ww..',
      '.wwwwwww.',
      'gwwwwwwwg',
      'k.k...k.k',
    ]],
  },

  // ---------- ocean ----------
  sub: {
    pal: { y: '#ffd23f', d: '#c9961e', w: '#9ffcff', k: '#7a5a10', p: '#d7dde6', o: '#fff6c4' },
    frames: [[
      '.......kk......',
      '.......k.......',
      '....yyyyyyy....',
      '..yyyyyyyyyyy..',
      'p.yywwyywwyyyy.',
      'pyyywwyywwyyyyo',
      'p.yyyyyyyyyyyy.',
      '..dyyyyyyyyyd..',
      '....ddddddd....',
    ], [
      '.......kk......',
      '.......k.......',
      '....yyyyyyy....',
      '..yyyyyyyyyyy..',
      '..yywwyywwyyyy.',
      'pyyywwyywwyyyyo',
      '..yyyyyyyyyyyy.',
      '..dyyyyyyyyyd..',
      '....ddddddd....',
    ]],
  },
  boat: {
    pal: { m: '#7a5a10', f: '#ff7a6b', w: '#efeaff', b: '#c9502e', d: '#8e3519' },
    frames: [[
      '.......m.......',
      '.......mff.....',
      '.......mfff....',
      '.......m.......',
      '...wwwwwwww....',
      'bbbbbbbbbbbbbbb',
      '.bbbbbbbbbbbbb.',
      '..ddddddddddd..',
    ]],
  },
  gull: {
    pal: { w: '#efeaff' },
    frames: [['w...w', '.w.w.', '..w..'], ['.....', 'ww.ww', '..w..']],
  },
  fish: {
    pal: { b: '#5ec8ff', l: '#c8f1ff', e: '#04121f' },
    frames: [[
      '...bbb..',
      'b.bbbbb.',
      'bbbbbbeb',
      'b.bllbb.',
      '...ll...',
    ]],
  },
  clownfish: {
    pal: { o: '#ff8a2a', w: '#ffffff', e: '#04121f', k: '#7a2e00' },
    frames: [[
      '...owo..',
      'k.oowoo.',
      'koowoweo',
      'k.oowoo.',
      '...owo..',
    ]],
  },
  starfish: {
    pal: { s: '#ff7a6b', d: '#d9503f' },
    frames: [[
      '...s...',
      '...s...',
      'sssdsss',
      '.ssdss.',
      '..sss..',
      '.ss.ss.',
      's.....s',
    ]],
  },
  crab: {
    pal: { c: '#ff5f4d', e: '#04121f', w: '#ffffff' },
    frames: [[
      'c.......c',
      'cc.w.w.cc',
      '.ccccccc.',
      '.ccccccc.',
      'c.c.c.c.c',
    ], [
      '.c.....c.',
      'cc.w.w.cc',
      '.ccccccc.',
      '.ccccccc.',
      '.c.c.c.c.',
    ]],
  },
  seahorse: {
    pal: { h: '#ffcf4d', e: '#04121f', d: '#d99a1e' },
    frames: [[
      '.dhh.',
      'hheh.',
      'hhhhh',
      '.hh..',
      '.hhd.',
      '.hhd.',
      '..hh.',
      '...h.',
      '.hh..',
    ]],
  },
  coralA: {
    pal: { p: '#ff6fae', d: '#c9457f' },
    frames: [[
      'p..p..p',
      'p.pp.pp',
      'pp.p.p.',
      '.ppppp.',
      '..pdp..',
      '..pdp..',
      '..ddd..',
    ]],
  },
  coralB: {
    pal: { p: '#ffb347', d: '#d9822b' },
    frames: [[
      '..ppp..',
      '.ppppp.',
      'ppdpdpp',
      'ppppppp',
      '.pdpdp.',
      '..ddd..',
    ]],
  },
  coralC: {
    pal: { p: '#8f7dff', d: '#5e4fd0' },
    frames: [[
      '.p...p.',
      '.p.p.p.',
      'pp.p.pp',
      '.ppppp.',
      '..ppp..',
      '..ddd..',
    ]],
  },
  diver: {
    pal: { b: '#22303f', y: '#ffd23f', m: '#9ffcff', s: '#f2c9a0', f: '#ff7a6b' },
    frames: [[
      '.....yy...',
      'ff.bbbbbm.',
      '.ffbbbbbs.',
      '....b..b..',
    ], [
      '.....yy...',
      '.ffbbbbbm.',
      'ff.bbbbbs.',
      '...b..b...',
    ]],
  },
  shark: {
    pal: { g: '#8fa3b8', w: '#e6f1fa', e: '#04121f', d: '#6d8196' },
    frames: [[
      'g.......g.......',
      'gg.....ggg......',
      '.ggggggggggggg..',
      '.gggggggggggegg.',
      'gg..wwwwwwwwww..',
      'g......d........',
    ]],
  },
  manta: {
    pal: { m: '#3a4f6b', w: '#c8d8e8', e: '#04121f' },
    frames: [[
      'm...........m',
      'mm.........mm',
      '.mmm.....mmm.',
      '..mmmmmmmmm..',
      '...mwmmmwm...',
      '....mmmmm....',
      '......m......',
      '......m......',
    ], [
      '.............',
      '.mm.......mm.',
      'mmmm.....mmmm',
      '..mmmmmmmmm..',
      '...mwmmmwm...',
      '....mmmmm....',
      '......m......',
      '......m......',
    ]],
  },
  swordfish: {
    pal: { b: '#4a6fa5', w: '#dbe8f5', e: '#04121f', s: '#c8d8e8' },
    frames: [[
      'b.....bb..........',
      'bb...bbbb.........',
      '.bbbbbbbbbbb......',
      '.bbbbbbbbbebbsssss',
      'bb..wwwwwww.......',
      'b.................',
    ]],
  },
  squid: {
    pal: { r: '#e0503a', d: '#a8321f', e: '#fff6c4' },
    frames: [[
      '....r....',
      '...rrr...',
      '..rrrrr..',
      '..rrrrr..',
      '.rrrrrrr.',
      '..rrrrr..',
      '..rerer..',
      '..rrrrr..',
      '.d.r.r.d.',
      '.d.r.r.d.',
      'd..r.r..d',
      'd.d...d.d',
      '..d...d..',
      '..d...d..',
    ]],
  },
  vampire: {
    pal: { v: '#8e1f3a', d: '#5e1226', b: '#7fd8ff' },
    frames: [[
      'v.......v',
      'vv.vvv.vv',
      '.vvvvvvv.',
      '.vbvvvbv.',
      'vvvvvvvvv',
      'vdvdvdvdv',
      'd.d.d.d.d',
    ]],
  },
  jelly: {
    pal: { j: '#c58bff', l: '#ecd9ff' },
    frames: [[
      '..jjj..',
      '.jlljj.',
      'jlljjjj',
      'jjjjjjj',
      'j.j.j.j',
      'j.j.j.j',
      '.j...j.',
      '.j...j.',
    ], [
      '.......',
      '.jjjjj.',
      'jlljjjj',
      'jjjjjjj',
      '.j.j.j.',
      '.j.j.j.',
      'j..j..j',
      '.......',
    ]],
  },
  angler: {
    pal: { a: '#5a4636', d: '#3a2c22', e: '#fff6c4', w: '#efeaff', y: '#aef7ff' },
    frames: [[
      '.........d.y',
      '........d...',
      '...aaaaad...',
      '..aaaaaaaa..',
      'd.aaaaeaawa.',
      'ddaaaaaawaw.',
      'd.aaaaaaww..',
      '...aaaaa....',
    ]],
  },
  whale: {
    pal: { g: '#5f6f86', d: '#465468', w: '#c8d8e8', e: '#04121f' },
    frames: [[
      '............gggggggggggg..',
      'g.........ggggggggggggggg.',
      'gg......gggggggggggggggggg',
      '.gg...gggggggggggggggggggg',
      '..ggggggggggggggggggggeggg',
      '.gg...ggggggggggggggggggg.',
      'gg......ggggggdwwwwwwwww..',
      'g.............d...........',
    ]],
  },
  beaked: {
    pal: { g: '#7d8ea3', l: '#c8d8e8', e: '#04121f' },
    frames: [[
      '...........g..........',
      'g.........ggg.........',
      'gg....ggggggggggggg...',
      '.ggggggggggggggggegggg',
      'gg....lllllllllllll...',
      'g.....................',
    ]],
  },
  dumbo: {
    pal: { p: '#ffa07a', d: '#d9744f', e: '#04121f' },
    frames: [[
      'p.......p',
      'pp.ppp.pp',
      '.ppppppp.',
      '.ppepepp.',
      '.ppppppp.',
      '..ddddd..',
      '.d.d.d.d.',
    ], [
      '.........',
      'pp.ppp.pp',
      'pppppppp.',
      '.ppepepp.',
      '.ppppppp.',
      '..ddddd..',
      '..d.d.d..',
    ]],
  },
  seapig: {
    pal: { k: '#ffb6c9', d: '#e08aa3' },
    frames: [[
      '.k.k.k...',
      '.kkkkkk..',
      'kkkkkkkk.',
      'kkkkkkkkk',
      '.d.d.d.d.',
    ]],
  },
  snailfish: {
    pal: { s: '#ffd0dc', e: '#04121f', d: '#e8a3b5' },
    frames: [[
      '.....ssss..',
      'dsssssssse.',
      '.dsssssss..',
      '.....ss....',
    ]],
  },
  wreck: {
    pal: { r: '#7a4a32', d: '#523020', o: '#1a0f0a', g: '#9a6a4a' },
    frames: [[
      '...................g....',
      '..................gg....',
      '.................rrr....',
      'g.g.g.g.g.g.g...rrrrr...',
      'rrrrrrrrrrrrrrrrrrrrrr..',
      '.rrrrrrrrrrrrrrrrrrrrrr.',
      '.rrorrorrorrorrorrrrrrrr',
      '.ddddddddddddddddddddddd',
      '..dddddddddddddddddddd..',
      '...dddddddddddddddddd...',
    ]],
  },
  warship: {
    pal: { r: '#6f7f8f', d: '#48566a', o: '#1a2430', g: '#9fb0c0' },
    frames: [[
      '..........g.............',
      '.........ggg....g.......',
      '....gg..ggggg..ggg......',
      '...rrrrrrrrrrrrrrrr.....',
      'rrrrrrrrrrrrrrrrrrrrrrr.',
      '.rrorrorrorrorrorrrrrrrr',
      '.ddddddddddddddddddddddd',
      '..dddddddddddddddddddd..',
    ]],
  },
  lander: {
    pal: { w: '#efeaff', y: '#ffd23f', g: '#8fa3b8' },
    frames: [[
      '..yyy..',
      '.wwwww.',
      '.wgwgw.',
      '.wwwww.',
      'g.g.g.g',
    ]],
  },
  bottle: {
    pal: { g: '#7dffa8', w: '#efeaff' },
    frames: [['.g.', '.g.', 'ggg', 'gwg', 'ggg']],
  },
};

/**
 * A sprite canvas. `pal` swaps colours, so one drawing serves several creatures.
 * @param {keyof typeof ART} name
 */
export function sprite(name, frame = 0, pal = null) {
  const art = ART[name];
  const index = frame % art.frames.length;
  const id = `${name}:${index}:${pal ? Object.values(pal).join('') : ''}`;
  return makeSprite(id, art.frames[index], pal ? { ...art.pal, ...pal } : art.pal);
}

export const frameCount = (name) => ART[name].frames.length;
