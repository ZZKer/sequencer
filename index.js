
/**
 * @name sequencer
 * @module Sequencer
 * @author ZZKer
 * @desc Ordered Auto-Sequencer
 */

export var defal = function(t){return 0;};

export default Sequencer;

export function Sequencer() {
  Sequencer.prototype.curt   = 0;//current sequence start: t=0
  Sequencer.prototype.endt   = 1;//end of current sequence
  Sequencer.prototype.addcur = 0;//address of current sequence
  Sequencer.prototype.addtab = [defal];//address table for all sequences
  Sequencer.prototype.lentab = [1];//length table for all sequences
  Sequencer.prototype.pnttab = [[0]];//pointer table for next sequences
}

Sequencer.prototype.add = function(nextseq, nextlen, nextpnt){
  if(this.addtab.length < 2){
    this.pnttab[0] = [1];
  }
  this.addtab.push(nextseq);
  this.lentab.push(nextlen);
  this.pnttab.push(nextpnt);
};

Sequencer.prototype.play = function(t){
  if(t-this.curt > this.endt){
    var l = this.pnttab[this.addcur].length;
    addcur = this.pnttab[this.addcur][(Math.random()*l)|0];
    this.curt = t;
    this.endt = this.curt + this.lentab[this.addcur];
  }
  return this.addtab[this.addcur](t);
};