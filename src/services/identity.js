// Who this player is on the board: a random id and a generated callsign.
// Callsigns are picked from word lists, so nobody can type something rude onto a shared board.
import { store } from './storage.js';

const FIRST = [
  'Cosmic', 'Lunar', 'Solar', 'Neon', 'Turbo', 'Quiet', 'Lucky', 'Rapid', 'Brave', 'Electric',
  'Fuzzy', 'Golden', 'Hidden', 'Jolly', 'Mighty', 'Nimble', 'Orbital', 'Polar', 'Quantum', 'Rogue',
  'Stellar', 'Tidal', 'Velvet', 'Wandering', 'Zippy', 'Abyssal', 'Coral', 'Salty', 'Briny', 'Pearly',
];
const SECOND = [
  'Otter', 'Squid', 'Falcon', 'Panda', 'Gecko', 'Narwhal', 'Manta', 'Lynx', 'Heron', 'Walrus',
  'Badger', 'Koala', 'Puffin', 'Orca', 'Marmot', 'Ibis', 'Tapir', 'Yak', 'Newt', 'Seal',
  'Penguin', 'Moth', 'Wombat', 'Quokka', 'Dingo', 'Axolotl', 'Pelican', 'Comet', 'Nebula', 'Kraken',
];

const pick = (list) => list[Math.floor(Math.random() * list.length)];
export const makeCallsign = () => `${pick(FIRST)} ${pick(SECOND)} ${10 + Math.floor(Math.random() * 90)}`;

function makeId() {
  const bytes = new Uint8Array(12);
  (globalThis.crypto || { getRandomValues: (b) => b.forEach((_, i) => (b[i] = Math.random() * 256)) }).getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export const identity = {
  id: store.get('pid') || makeId(),
  name: store.get('callsign') || makeCallsign(),
  reroll() {
    this.name = makeCallsign();
    store.set('callsign', this.name);
    return this.name;
  },
};
store.set('pid', identity.id);
store.set('callsign', identity.name);
