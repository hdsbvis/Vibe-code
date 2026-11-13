// Parsed question banks, one per world. Each world's bank is split across themed files.
import { parseBank } from '../core/bank.js';
import spaceCore from './space.bank.js';
import spaceFood from './space.food.bank.js';
import spaceNature from './space.nature.bank.js';
import spaceWorld from './space.world.bank.js';
import spaceCulture from './space.culture.bank.js';
import spaceEveryday from './space.everyday.bank.js';
import oceanCore from './ocean.bank.js';
import oceanMore from './ocean.more.bank.js';

export const RAW = {
  space: [...spaceCore, ...spaceFood, ...spaceNature, ...spaceWorld, ...spaceCulture, ...spaceEveryday],
  ocean: [...oceanCore, ...oceanMore],
};

export const BANKS = {
  space: parseBank(RAW.space),
  ocean: parseBank(RAW.ocean),
};
