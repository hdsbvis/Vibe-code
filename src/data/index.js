// Parsed question banks, one per world.
import { parseBank } from '../core/bank.js';
import spaceBank from './space.bank.js';
import oceanBank from './ocean.bank.js';

export const BANKS = {
  space: parseBank(spaceBank),
  ocean: parseBank(oceanBank),
};
