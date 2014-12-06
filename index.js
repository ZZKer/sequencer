
/**
 * @name sequencer
 * @module Sequencer
 * @author ZZKer
 * @desc Ordered Auto-Sequencer
 * @version 1.02b
 *    Last updated Dec. 6, 2014
 * 
 * TODO
 *  - Utilize a Sample "bank"
 *  - Make multiple sequence paths
 *  - Add seeded random module for paths
 *  - Make paths user friendly
 *  - Change .play to .simpleplay code after coding pathing
 */

//default sequence. Set to noise for debugging purposes
export var noise = function(t){return Math.random()*2-1;};
export var emptyfunk = function(t){return 0;};

export default Sequencer;

export function Sequencer() {
  if (!(this instanceof Sequencer)) return new Sequencer();
  this.curt   = 0;//current sequence start: t=0
  this.endt   = 1;//end of current sequence
  this.addcur = 0;//address of current sequence
  this.addtab = [emptyfunk];//address table for all sequences
  this.lentab = [1];//length table for all sequences
  this.biglen = 0;//All lengths added together
}

//For replacing the intro
Sequencer.prototype.setintro = function(seq, len){
  this.addtab[0] = seq;
  this.lentab[0] = len;
};

//For adding sequences to the end of the Sequencer
Sequencer.prototype.add = function(nextseq, nextlen){
  this.addtab[this.addtab.length] = nextseq;//add sequence
  this.lentab[this.lentab.length] = nextlen;//add length
  this.biglen += nextlen;
};

/**
 * The .play function is the old way of playing sequences.
 * Currently only here for compatibility
 */
Sequencer.prototype.play = function(t){
  if(t === 0){
    this.addcur = 0;
    this.curt = 0;
    this.endt = this.lentab[0];
  }
  if(t-this.curt > this.endt){//if sequence reaches length time
    this.addcur++;//Increase to the next sequence
    if(this.addcur >= this.addtab.length){
      if(this.addtab.length == 1){
        this.addcur = 0;//replay sequence if only intro
      }else {
        this.addcur = 1;//replay to sequence 1 if after end
      }
    }
    this.curt = t;//start time becomes the current time
    //end time becomes length of current sequence
    this.endt = this.lentab[this.addcur];
  }
  //play the current sequence with the sequence time
  return this.addtab[this.addcur](t-this.curt);
};

/**
 *  The .simpleplay function should be used over the .play
 * function when using single-path sequences.
 */
Sequencer.prototype.simpleplay = function(t){
  //for playing intro
  if(t < this.lentab[0]){
    return this.addtab[0](t);
  }else{ //for playing rest of song
    var len = ((t-this.lentab[0])%this.biglen);
    var complen = 0;
    for(var i = 1; i < this.lentab.length; i++){
      complen += this.lentab[i];
      if(len < complen){
        return this.addtab[i](len+this.lentab[i]-complen);
      }
    }
  }
  //if all else fails, repeat intro
  return this.addtab[0](t%this.lentab[0]);
};

/**
 * Version Change Log
 * V1.02
 *  - Added .simpleplay for less resource intensive playing
 * b:
 *  - Fixed: biglen doesn't use intro length
 *  - Fixed .length() to .length in .simpleplay
 *  - Changed fail return in .simpleplay to play intro
 *    This is useful for sequences with only an intro.
 *  - Added comments to .play and .simpleplay
 * 
 * V1.01
 *  - Changed .prototypes. vars to this. vars in constructor
 *    This fixes no multiple Sequencers issue
 *  - Changed .add to not use var l
 *  - Changed notes on test
 *  - Set emptyfunk to own function
 *  - Removed all code relating to broken pointer table
 *  - Added check for intro-only Sequencer in .play
 *  - Added .setintro to change sequence 0
 * b:
 *  - Changed endt= from 1 to lentab[0] in .play
 *  - Added actual anon function in test
 */