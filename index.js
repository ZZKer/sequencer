
/**
 * @name sequencer
 * @module Sequencer
 * @author ZZKer
 * @desc Ordered Auto-Sequencer
 */

//default sequence. Set to noise() for debugging
export var defal = function(t){return Math.random()*2-1;};
//export var defal = function(t){return 0;};

export default Sequencer;

export function Sequencer() {
  if (!(this instanceof Sequencer)) return new Sequencer();
  Sequencer.prototype.curt   = 0;//current sequence start: t=0
  Sequencer.prototype.endt   = 1;//end of current sequence
  Sequencer.prototype.addcur = 0;//address of current sequence
  Sequencer.prototype.addtab = [defal];//address table for all sequences
  Sequencer.prototype.lentab = [1];//length table for all sequences
  Sequencer.prototype.pnttab = [[0]];//pointer table for next sequences
}

Sequencer.prototype.add = function(nextseq, nextlen, nextpnt){
  var l = this.addtab.length;
  if(l < 2){//if first addition, change pointer table values
    this.pnttab[0] = [1];
  }
  this.addtab[l] = nextseq;//add sequence
  this.lentab[l] = nextlen;//add length
  this.pnttab[l] = nextpnt;//add pointers
};

Sequencer.prototype.play = function(t){
  if(t-this.curt > this.endt){//if sequence reaches length time
    var l = this.pnttab[this.addcur].length;
    //the current sequence becomes a sequence randomly chosen from the given pointers
    addcur = this.pnttab[this.addcur][Math.floor(Math.random()*l)];
    this.curt = t;//start time becomes the current time
    //end time becomes length time from current
    this.endt = this.curt + this.lentab[this.addcur];
  }
  //play the current sequence with the sequence time
  return this.addtab[this.addcur](t-this.curt);
};