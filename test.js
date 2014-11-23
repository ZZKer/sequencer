
/**
 * test
 * Currently, multiple sequence paths does not work.
 * There is a problem with using double arrays that
 * I need to figure out how to fix.
 * If you know how to fix, please submit a bug report on github.
 * 
 * If you want to mess around with the pointer table I made,
 * be sure NOT to hit the play button, as it can cause
 * wavepot to crash. If that happens, just reload the page and
 * don't hit the play button for this module. However, if you
 * don't mess around with that stuff, then it should work fine.
 */

import { sin, saw, ramp, tri, sqr, pulse, noise } from 'opendsp/osc';
import Sequencer from './index.js';

var examp = new Sequencer();
/**
examp.add(first, 1, [2]);
examp.add(second, 1, [3]);
examp.add(third, 1, [4]);
examp.add(forth, 1, [0,1,2,3,4]);
*/
examp.add(first, 1.75);
examp.add(second, 1);
examp.add(third, 2.25);
examp.add(forth, 3);

//volume
var v = 0.1;

export function dsp(t) {
  return v * examp.play(t);
}

function first(t) {
  return sin(t, 320);
}

function second(t) {
  return saw(t, 400);
}

function third(t) {
  return ramp(t, 320);
}

function forth(t) {
  return tri(t, 290);
}