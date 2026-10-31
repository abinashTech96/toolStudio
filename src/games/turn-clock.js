// Host-owned monotonic turn clock. Display values never decide a result.
export const turnLimits=[0,30,60,120];
export class TurnClock {
 constructor(seconds=0,now=()=>performance.now()){if(!turnLimits.includes(seconds))throw Error('Invalid turn limit');this.limit=seconds*1000;this.now=now;this.remaining=this.limit;this.turn=null;this.started=null;}
 update(turn,running){const time=this.now();if(this.started!==null)this.remaining=Math.max(0,this.remaining-(time-this.started));this.started=null;if(this.turn!==turn){this.turn=turn;this.remaining=this.limit;}if(this.limit&&running&&this.remaining>0)this.started=time;return this.snapshot();}
 snapshot(){return{limit:this.limit,remaining:Math.max(0,Math.ceil(this.remaining-(this.started===null?0:this.now()-this.started))),running:this.started!==null};}
}
