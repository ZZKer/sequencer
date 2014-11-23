
/**
 * test
 */

import { sin, saw, ramp, tri, sqr, pulse, noise } from './index';
import Sequencer from 'index.js';

var examp = new Sequencer();
examp.add(first, 1, [2]);
examp.add(second, 1, [3]);
examp.add(third, 1, [4]);
examp.add(forth, 1, [0,1,2,3,4]);

export function dsp(t) {
  return examp.play(t);
}

function first(t) {
  return sin(t, 320);
}

function second(t) {
  return saw(t, 320);
}

function third(t) {
  return ramp(t, 320);
}

function forth(t) {
  return tri(t, 320);
}