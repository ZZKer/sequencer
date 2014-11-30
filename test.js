
/**
 * test
 * Currently, multiple sequence pathing is not implimented.
 * The old system does not work properly.
 * If you know how to impliment, please fork and submit
 * a pull request.
 * 
 * Also fair to note:
 * -  The Sequencer is not good for fly-by edits when using .play.
 * It is best to test a single sequence in another tab
 * then copy it over when it sounds right or to use .simpleplay.
 * Changing any code will restart the Sequencer when using .play.
 * -  The Sequencer has caused wavepot client crashes while testing.
 * If the sounds skips indefinitely, reload the page.
 * 
 * CRAP I BROKE IT AND DONT HAVE TIME TO FIX IT.
 * Currently, .simpleplay DOES NOT WORK.
 */

import { sin, saw, ramp, tri, sqr, pulse, noise } from 'opendsp/osc';
import { Sequencer, emptyfunk } from './index.js';

var examp = new Sequencer();
examp.add(first, 2);
examp.add(second, 1);
examp.add(third, 1);
examp.add(forth, 2);
examp.add(emptyfunk, 2);

examp.setintro(intro, 1);

var exemp = new Sequencer();
exemp.add(function(t){return first(t)*0.1;}, 15);
exemp.add(intro, 1);

//volume
var v = 0.1;

export function dsp(t) {
  return v * (examp.play(t) + exemp.play(t));
}

function intro(t) {
  return sin(t, 320 * t);
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