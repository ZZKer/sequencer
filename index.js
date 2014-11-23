
/**
 * @name sequencer
 * @module Sequencer
 * @author ZZKer
 * @desc Ordered Auto-Sequencer
 */

var defal = function(t){return 0;};

export default Sequencer;

export function Sequencer() {
  if (!(this instanceof Sequencer)) return new Sequencer();
  this.curt   = 0;//current sequence start: t=0
  this.endt   = 1;//end of current sequence
  this.addcur = 0;//address of current sequence
  this.addtab = [defal];//address table for all sequences
  this.lentab = [1];//length table for all sequences
  this.pnttab = [[0]];//pointer table for next sequences
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