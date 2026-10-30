import {remoteGameIds,remoteLevels,newRemoteGame,remoteAction,remoteView,validateRemoteView,closeRemoteCards,choiceDigest,privateSalt} from './remote-rules.js';
const id=()=>privateSalt().slice(0,32),validID=x=>typeof x==='string'&&/^[a-f0-9]{32}$/.test(x);
const settingsOK=m=>m&&remoteGameIds.includes(m.game)&&remoteLevels.includes(m.level);
export class RemoteSession {
 constructor({send,onChange=()=>{},onInvite=()=>{},onStart=()=>{},onNotice=()=>{}}){Object.assign(this,{send,onChange,onInvite,onStart,onNotice,self:id(),connected:false,pair:'',peer:null,match:null,outgoing:null,incoming:null,choice:null,sequence:0,lastGuestSequence:0,queue:Promise.resolve(),queued:0});}
 get ready(){return this.connected&&!!this.peer;}
 wire(message){if(!this.connected)return;const text=JSON.stringify({v:1,...message});if(new TextEncoder().encode(text).length>32768)throw Error('Match message is too large');this.send(text);}
 emit(){this.maybeReveal();this.onChange(this);}
 serialize(fn){if(this.queued>=32)return Promise.resolve();this.queued++;const task=this.queue.then(fn).catch(()=>this.onNotice('A match update could not be used.')).finally(()=>this.queued--);this.queue=task;return task;}
 setConnection(approved,pair){
  if(approved&&typeof pair==='string'&&pair&&this.connected&&this.pair===pair)return;
  clearTimeout(this.helloTimer);clearTimeout(this.cardTimer);clearTimeout(this.actionTimer);this.clearInvitation();this.choice=null;
  if(!approved){this.connected=false;this.peer=null;if(this.match){this.match.closed=true;this.match.notice='Device disconnected. Reconnect and start a new match.';}this.emit();return;}
  this.connected=true;this.pair=pair;this.peer=null;this.match=null;this.self=id();this.sequence=0;this.lastGuestSequence=0;
  let tries=0;const hello=()=>{if(!this.connected||this.peer||tries++>=8)return;this.wire({k:'hello',client:this.self});this.helloTimer=setTimeout(hello,500);};hello();this.emit();
 }
 clearInvitation(){clearTimeout(this.inviteTimer);this.outgoing=this.incoming=null;this.onInvite(null);}
 offer(game,level){
  if(!this.ready)throw Error('Connect both Games windows via QR first.');if(!settingsOK({game,level}))throw Error('Remote play is unavailable for this game.');if(this.outgoing||this.incoming)throw Error('Finish the current invitation first.');
  const invitation={id:id(),game,level,supersedes:this.match?.id||null};this.outgoing=invitation;this.wire({k:'invite',...invitation});
  this.inviteTimer=setTimeout(()=>{if(this.outgoing?.id!==invitation.id)return;this.wire({k:'cancel',id:invitation.id});this.clearInvitation();this.onNotice('Game invitation expired. You can invite again.');this.emit();},30000);this.emit();return invitation.id;
 }
 accept(){const invitation=this.incoming;if(!this.ready||!invitation)return;this.clearInvitation();clearTimeout(this.cardTimer);this.choice=null;this.match={id:invitation.id,game:invitation.game,level:invitation.level,seat:1,role:'guest',view:null,closed:false,pending:0};this.wire({k:'accept',id:invitation.id});this.onStart(invitation.game);this.emit();}
 decline(){if(this.incoming)this.wire({k:'decline',id:this.incoming.id});this.clearInvitation();this.emit();}
 cancelInvite(){if(this.outgoing)this.wire({k:'cancel',id:this.outgoing.id});this.clearInvitation();this.emit();}
 leave(){if(this.match&&this.ready)this.wire({k:'leave',id:this.match.id});clearTimeout(this.cardTimer);clearTimeout(this.actionTimer);this.choice=null;if(this.match){this.match.closed=true;this.match.notice='You left this match.';}this.clearInvitation();this.emit();}
 canAct(){const m=this.match,v=m?.view;return !!(this.ready&&m&&!m.closed&&!m.pending&&!m.paused&&v&&!v.winner&&!this.outgoing&&!this.incoming&&(v.game==='rps'||v.turn===m.seat));}
 act(action){
  const m=this.match;if(!this.canAct())return Promise.resolve();
  if(m.role==='host')return this.serialize(()=>this.applyHost(0,action));
  const seq=++this.sequence;m.pending=seq;this.wire({k:'action',id:m.id,seq,revision:m.view.revision,action});this.emit();
  clearTimeout(this.actionTimer);this.actionTimer=setTimeout(()=>{if(this.match?.id!==m.id||!this.match.pending||!this.ready)return;this.match.paused=true;this.wire({k:'sync',id:m.id});this.emit();},5000);return Promise.resolve();
 }
 async chooseHand(hand){
  const m=this.match;if(!this.canAct()||m.game!=='rps'||m.view.chosen[m.seat]||this.choice)return;
  const c={id:m.id,round:m.view.history.length,hand,salt:privateSalt(),revealed:false};this.choice=c;
  try{const hash=await choiceDigest(c.id,c.round,c.hand,c.salt);if(this.choice!==c||this.match!==m||!this.ready||m.closed)return;c.hash=hash;await this.act({type:'commit',round:c.round,hash});}catch{if(this.choice===c)this.choice=null;this.onNotice('That choice could not be locked. Try again.');}this.emit();
 }
 maybeReveal(){const m=this.match,c=this.choice;if(c&&m?.view?.history.length>c.round){this.choice=null;return;}if(!c||!m||!this.canAct()||m.closed||!m.view?.revealing||m.pending||!c.hash||c.revealed||m.id!==c.id||m.view.history.length!==c.round)return;c.revealed=true;void this.act({type:'reveal',round:c.round,hand:c.hand,salt:c.salt});}
 publish(ack=0,note=''){
  const m=this.match;if(!m||m.role!=='host'||m.closed)return;m.view=remoteView(m.engine);this.wire({k:'state',id:m.id,view:m.view,ack,note});this.emit();
  if(m.game==='memory'&&m.engine.locked&&!this.cardTimer){const matchID=m.id;this.cardTimer=setTimeout(()=>{this.cardTimer=null;void this.serialize(()=>{if(this.match?.id!==matchID||this.match.closed||!this.ready)return;this.match.engine=closeRemoteCards(this.match.engine);this.publish();});},900);}
 }
 async applyHost(seat,action,ack=0){
  const m=this.match;if(!this.ready||!m||m.closed||m.role!=='host')return;if(this.outgoing||this.incoming){if(ack)this.publish(ack,'Finish the game invitation first.');return;}
  const before=m.engine;try{const next=await remoteAction(before,seat,action,{match:m.id});if(this.match!==m||m.engine!==before||!this.ready||m.closed)return;m.engine=next;this.publish(ack);}catch(error){if(this.match===m){this.publish(ack,seat===1?error.message:'');if(seat===0)this.onNotice(error.message);}}
 }
 receive(text){
  if(!this.connected||typeof text!=='string'||new TextEncoder().encode(text).length>32768)return Promise.resolve();let p;try{p=JSON.parse(text);}catch{return Promise.resolve();}if(!p||p.v!==1||typeof p.k!=='string')return Promise.resolve();
  const pair=this.pair,self=this.self;return this.serialize(async()=>{
   if(!this.connected||this.pair!==pair||this.self!==self)return;
   if(p.k==='hello'){
    if(!validID(p.client)||p.client===this.self)return;
    if(this.peer&&this.peer!==p.client){this.leave();this.peer=null;this.onNotice('The other Games window changed. Start a fresh connection.');this.emit();return;}
    const reply=!this.peer;this.peer=p.client;clearTimeout(this.helloTimer);if(reply)this.wire({k:'hello',client:this.self});this.emit();return;
   }
   if(!this.peer||!validID(p.id))return;
   if(p.k==='invite'){
    if(!settingsOK(p)||!(p.supersedes===null||validID(p.supersedes)))return;
    if(this.incoming?.id===p.id)return;
    if(this.incoming||this.match&&!this.match.closed&&!this.match.view?.winner&&p.supersedes!==this.match.id){this.wire({k:'decline',id:p.id});return;}
    if(this.outgoing){if(this.self<this.peer){this.wire({k:'decline',id:p.id});return;}this.wire({k:'cancel',id:this.outgoing.id});this.clearInvitation();}
    this.incoming={id:p.id,game:p.game,level:p.level,supersedes:p.supersedes};this.onInvite(this.incoming);this.inviteTimer=setTimeout(()=>{if(this.incoming?.id===p.id){this.decline();this.onNotice('Game invitation expired.');}},30000);this.emit();return;
   }
   if(p.k==='accept'){
    const offer=this.outgoing;if(!offer||offer.id!==p.id)return;this.clearInvitation();clearTimeout(this.cardTimer);this.cardTimer=null;this.choice=null;this.lastGuestSequence=0;this.match={id:offer.id,game:offer.game,level:offer.level,role:'host',seat:0,engine:newRemoteGame(offer.game,offer.level),closed:false,pending:0};this.publish();this.onStart(offer.game);return;
   }
   if(p.k==='decline'&&this.outgoing?.id===p.id){this.clearInvitation();this.onNotice('The other player declined. Your local game is still available.');this.emit();return;}
   if(p.k==='cancel'&&this.incoming?.id===p.id){this.clearInvitation();this.onNotice('The other player cancelled the invitation.');this.emit();return;}
   const m=this.match;if(!m||m.id!==p.id||m.closed)return;
   if(p.k==='leave'){m.closed=true;m.notice='The other player left the match.';clearTimeout(this.cardTimer);clearTimeout(this.actionTimer);this.choice=null;this.emit();return;}
   if(p.k==='sync'&&m.role==='host'){this.publish(this.lastGuestSequence);return;}
   if(p.k==='action'&&m.role==='host'){
    if(!Number.isSafeInteger(p.seq)||p.seq<=this.lastGuestSequence||p.seq>this.lastGuestSequence+1024)return;
    this.lastGuestSequence=p.seq;if(!Number.isInteger(p.revision)||p.revision>m.engine.revision||m.game!=='rps'&&p.revision!==m.engine.revision){this.publish(p.seq,'The board changed. Please choose again.');return;}
    await this.applyHost(1,p.action,p.seq);return;
   }
   if(p.k==='state'&&m.role==='guest'){
    let view;try{view=validateRemoteView(p.view);}catch{return;}if(view.game!==m.game||view.level!==m.level||m.view&&view.revision<m.view.revision)return;
    if(m.view&&view.revision===m.view.revision&&JSON.stringify(m.view)!==JSON.stringify(view))return;
    m.view=view;if(Number.isSafeInteger(p.ack)&&p.ack>=m.pending||view.revision>(m.lastRevision??-1)){m.pending=0;m.paused=false;clearTimeout(this.actionTimer);}m.lastRevision=view.revision;if(typeof p.note==='string'&&p.note.length<=160&&p.note)this.onNotice(p.note);this.emit();
   }
  });
 }
 dispose(){clearTimeout(this.helloTimer);clearTimeout(this.cardTimer);clearTimeout(this.actionTimer);this.clearInvitation();this.connected=false;this.peer=null;this.match=null;this.choice=null;}
}
