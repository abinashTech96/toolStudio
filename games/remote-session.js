import {TurnClock,turnLimits} from './turn-clock.js';
import {cleanPlayerName,validToken,newSeries,validateSeries,scoreSeries,seriesWinner,recoveryProof,finishRemoteMatch} from './match-support.js';
import {remoteGameIds,remoteLevels,newRemoteGame,remoteAction,remoteView,validateRemoteView,closeRemoteCards,choiceDigest,privateSalt} from './remote-rules.js';
const id=()=>privateSalt().slice(0,32),validID=x=>typeof x==='string'&&/^[a-f0-9]{32}$/.test(x);
const settingsOK=m=>m&&remoteGameIds.includes(m.game)&&remoteLevels.includes(m.level);
export class RemoteSession {
 constructor({send,onChange=()=>{},onInvite=()=>{},onStart=()=>{},onNotice=()=>{}}){Object.assign(this,{send,onChange,onInvite,onStart,onNotice,self:id(),connected:false,pair:'',peer:null,match:null,outgoing:null,incoming:null,choice:null,name:'Player',peerName:'Friend',resumeVerified:false,peerResumeReady:false,recoveryCompatible:false,recoveryFailed:false,drawOffer:null,sequence:0,lastGuestSequence:0,queue:Promise.resolve(),queued:0});}
 get ready(){return this.connected&&!!this.peer;}
 wire(message){if(!this.connected)return;const text=JSON.stringify({v:1,...message});if(new TextEncoder().encode(text).length>32768)throw Error('Match message is too large');this.send(text);}
 emit(){this.updateClock();this.maybeReveal();this.onChange(this);}
 updateClock(){const m=this.match;if(m?.role!=='host'||!m.clock)return;const running=this.canActClock();m.clockView=m.clock.update(m.engine.turn,running);}
 canActClock(){const m=this.match;return !!(this.ready&&m&&!m.closed&&!m.suspended&&!m.paused&&!m.view?.winner&&!m.engine?.locked&&!m.hidden?.some(Boolean)&&!this.drawOffer&&!this.outgoing&&!this.incoming);}
 setVisibility(hidden){this.hidden=!!hidden;const m=this.match;if(!m||!this.ready)return;if(m.role==='host'){m.hidden[m.seat]=!!hidden;this.emit();}else this.wire({k:'visibility',id:m.id,lease:m.lease,hidden:!!hidden});}
 startClock(){clearInterval(this.clockTimer);if(!this.match?.turnSeconds)return;this.clockTimer=setInterval(()=>{const m=this.match;if(m?.role!=='host'||!m.clock||m.closed||m.view?.winner)return;this.updateClock();const clock=m.clockView;if(clock.limit&&clock.remaining===0&&this.canActClock()){this.settle(m.engine.turn===0?'O':'X','timeout');return;}if(this.ready&&!m.suspended)this.wire({k:'clock',id:m.id,lease:m.lease,clock,hidden:m.hidden});this.onClock?.(this);},500);this.clockTimer.unref?.();}
 serialize(fn){if(this.queued>=32)return Promise.resolve();this.queued++;const task=this.queue.then(fn).catch(()=>this.onNotice('A match update could not be used.')).finally(()=>this.queued--);this.queue=task;return task;}
 setName(value){this.name=cleanPlayerName(value);if(this.ready)this.wire({k:'name',name:this.name});this.emit();}
 get canResume(){return !!(this.ready&&this.match?.suspended&&!this.match.closed&&this.resumeVerified&&this.peerResumeReady);}
 setConnection(approved,pair){
  if(approved&&typeof pair==='string'&&pair&&this.connected&&this.pair===pair)return;
  clearTimeout(this.helloTimer);clearTimeout(this.cardTimer);this.cardTimer=null;clearTimeout(this.actionTimer);this.clearInvitation();this.clearDraw();this.choice=null;this.resumeVerified=this.peerResumeReady=false;this.recoveryCompatible=this.recoveryFailed=false;
  const m=this.match;if(m&&!m.closed){m.suspended=true;m.paused=true;m.pending=0;m.resumeConsented=false;m.notice='Device disconnected. Reconnect via QR to continue this match.';}
  if(!approved){this.connected=false;this.peer=null;this.emit();return;}
  if(m){m.hidden=[false,false];m.hidden[m.seat]=!!this.hidden;}this.connected=true;this.pair=pair;this.peer=null;this.self=id();this.sequence=0;this.lastGuestSequence=0;
  let tries=0;const hello=()=>{if(!this.connected||this.peer||tries++>=8)return;this.wire({k:'hello',protocol:3,client:this.self,name:this.name,recover:m?.suspended&&!m.closed?m.id:null,role:m?.role||null});this.helloTimer=setTimeout(hello,500);};hello();this.emit();
 }
 async sendProof(){const m=this.match,pair=this.pair,self=this.self,peer=this.peer;if(!m?.suspended||m.closed||!m.resumeKey||!peer)return;const proof=await recoveryProof(m.resumeKey,pair,self,peer,m.id,m.role);if(this.match===m&&this.pair===pair&&this.self===self&&this.peer===peer&&this.ready)this.wire({k:'recover-proof',id:m.id,proof});}
 clearDraw(){clearTimeout(this.drawTimer);this.drawOffer=null;this.onDraw?.(null);}
 requestResume(){const m=this.match;if(!this.canResume||this.outgoing||this.incoming)return;const request={id:id(),game:m.game,level:m.level,kind:'resume',matchId:m.id};m.resumeConsented=true;m.lastResumeRequest=request.id;this.outgoing=request;this.wire({k:'resume-invite',...request});this.inviteTimer=setTimeout(()=>{if(this.outgoing?.id===request.id)this.cancelInvite();},30000);this.emit();}
 resumeHost(){const m=this.match;if(!this.canResume||m.role!=='host'||!m.resumeConsented)return;m.suspended=m.paused=false;m.pending=0;m.notice='';m.lease=id();this.sequence=this.lastGuestSequence=0;this.choice=null;if(m.game==='rps'&&!m.engine.winner){m.engine.commits=[null,null];m.engine.reveals=[null,null];m.engine.revision++;}if(m.game==='memory'&&m.engine.locked)m.engine=closeRemoteCards(m.engine);this.startClock();this.publish(0,'',true);this.onStart(m.game);}
 clearInvitation(){clearTimeout(this.inviteTimer);this.outgoing=this.incoming=null;this.onInvite(null);}
 offer(game,level,{bestOf=1,starter='you',turnSeconds=0}={}){
  if(!this.ready)throw Error('Connect both Games windows via QR first.');if(!settingsOK({game,level}))throw Error('Remote play is unavailable for this game.');if(this.outgoing||this.incoming||this.drawOffer)throw Error('Finish the current invitation first.');if(![1,3].includes(bestOf))throw Error('Choose a single match or best of three.');
  if(!['you','friend','random'].includes(starter)||!turnLimits.includes(turnSeconds)||game==='rps'&&turnSeconds)throw Error('Choose supported starting player and timer settings');const hostSeat=starter==='friend'?1:starter==='random'?crypto.getRandomValues(new Uint8Array(1))[0]%2:0;const invitation={id:id(),game,level,supersedes:this.match?.id||null,bestOf,hostSeat,turnSeconds,kind:'new'};this.outgoing=invitation;this.wire({k:'invite',...invitation});
  this.inviteTimer=setTimeout(()=>{if(this.outgoing?.id!==invitation.id)return;this.wire({k:'cancel',id:invitation.id});this.clearInvitation();this.onNotice('Game invitation expired. You can invite again.');this.emit();},30000);this.emit();return invitation.id;
 }
 accept(){const invitation=this.incoming;if(!this.ready||!invitation)return;this.clearInvitation();clearTimeout(this.cardTimer);this.cardTimer=null;this.choice=null;
  if(invitation.kind==='resume'){if(!this.canResume||this.match.id!==invitation.matchId)return;this.match.resumeConsented=true;this.match.lastResumeRequest=invitation.id;this.wire({k:'resume-accept',id:invitation.id,matchId:this.match.id});if(this.match.role==='host')this.resumeHost();this.emit();return;}
  if(invitation.kind==='next'){this.wire({k:'next-accept',id:invitation.id,matchId:this.match.id});if(this.match.role==='host')this.startNext(invitation.id);else this.match.nextId=invitation.id;this.emit();return;}
  this.match={id:invitation.id,game:invitation.game,level:invitation.level,seat:1-(invitation.hostSeat||0),role:'guest',view:null,closed:false,suspended:false,pending:0,bestOf:invitation.bestOf,turnSeconds:invitation.turnSeconds||0,hidden:[false,false]};this.wire({k:'accept',id:invitation.id});this.onStart(invitation.game);this.emit();}
 nextMatch(){const m=this.match;if(!this.ready||!m?.view?.winner||!m.series||seriesWinner(m.series)||m.series.bestOf!==3)return false;if(this.outgoing||this.incoming)return true;const request={id:id(),game:m.game,level:m.level,kind:'next',matchId:m.id};this.outgoing=request;this.wire({k:'next-invite',...request});this.inviteTimer=setTimeout(()=>{if(this.outgoing?.id===request.id)this.cancelInvite();},30000);this.emit();return true;}
 startNext(nextId){const old=this.match;if(old.role!=='host'||!old.view?.winner||seriesWinner(old.series))return;this.match={id:nextId,game:old.game,level:old.level,role:'host',seat:old.seat,engine:newRemoteGame(old.game,old.level),closed:false,suspended:false,pending:0,lease:id(),resumeKey:privateSalt(),names:old.names.slice(),turnSeconds:old.turnSeconds||0,clock:new TurnClock(old.turnSeconds||0),hidden:old.hidden?.slice()||[false,false],series:validateSeries(old.series),resultCounted:false};this.choice=null;this.sequence=this.lastGuestSequence=0;this.clearDraw();this.startClock();this.publish();this.onStart(old.game);}
 decline(){if(this.incoming)this.wire({k:'decline',id:this.incoming.id});this.clearInvitation();this.emit();}
 cancelInvite(){if(this.outgoing)this.wire({k:'cancel',id:this.outgoing.id});if(this.outgoing?.kind==='resume'&&this.match)this.match.resumeConsented=false;this.clearInvitation();this.emit();}
 leave(){if(this.match&&this.ready)this.wire({k:'leave',id:this.match.id});clearTimeout(this.cardTimer);this.cardTimer=null;clearTimeout(this.actionTimer);this.clearDraw();this.choice=null;clearInterval(this.clockTimer);if(this.match){this.match.resumeKey=null;this.match.suspended=false;this.match.closed=true;this.match.notice='You left this match.';}this.clearInvitation();this.emit();}
 canAct(){const m=this.match,v=m?.view;return !!(this.ready&&m&&!m.closed&&!m.suspended&&!m.pendingDecision&&!m.pending&&!m.paused&&!(m.turnSeconds&&m.hidden?.some(Boolean))&&!this.drawOffer&&v&&!v.winner&&!this.outgoing&&!this.incoming&&(v.game==='rps'||v.turn===m.seat));}
 act(action){
  const m=this.match;if(!this.canAct())return Promise.resolve();
  if(m.role==='host'){const pair=this.pair,lease=m.lease;return this.serialize(()=>{if(this.match===m&&this.pair===pair&&m.lease===lease)return this.applyHost(m.seat,action);});}
  const seq=++this.sequence;m.pending=seq;this.wire({k:'action',id:m.id,seq,lease:m.lease,revision:m.view.revision,action});this.emit();
  clearTimeout(this.actionTimer);this.actionTimer=setTimeout(()=>{if(this.match?.id!==m.id||!this.match.pending||!this.ready)return;this.match.paused=true;this.wire({k:'sync',id:m.id,lease:m.lease});this.emit();},5000);return Promise.resolve();
 }
 async chooseHand(hand){
  const m=this.match;if(!this.canAct()||m.game!=='rps'||m.view.chosen[m.seat]||this.choice)return;
  const c={id:m.id,round:m.view.history.length,hand,salt:privateSalt(),revealed:false};this.choice=c;
  try{const hash=await choiceDigest(c.id,c.round,c.hand,c.salt);if(this.choice!==c||this.match!==m||!this.ready||m.closed)return;c.hash=hash;await this.act({type:'commit',round:c.round,hash});}catch{if(this.choice===c)this.choice=null;this.onNotice('That choice could not be locked. Try again.');}this.emit();
 }
 maybeReveal(){const m=this.match,c=this.choice;if(c&&m?.view?.history.length>c.round){this.choice=null;return;}if(!c||!m||!this.canAct()||m.closed||!m.view?.revealing||m.pending||!c.hash||c.revealed||m.id!==c.id||m.view.history.length!==c.round)return;c.revealed=true;void this.act({type:'reveal',round:c.round,hand:c.hand,salt:c.salt});}
 publish(ack=0,note='',resumed=false){
  const m=this.match;if(!m||m.role!=='host'||m.closed||m.suspended)return;if(m.engine.winner)clearInterval(this.clockTimer);if(m.engine.winner&&!m.resultCounted){m.series=scoreSeries(m.series,m.engine.winner);m.resultCounted=true;}m.view=remoteView(m.engine);this.wire({k:'state',id:m.id,view:m.view,ack,note,lease:m.lease,resumeKey:m.resumeKey,names:m.names,series:m.series,turnSeconds:m.turnSeconds||0,finishReason:m.finishReason||'',resumed,resumeRequest:resumed?m.lastResumeRequest:null});this.emit();
  if(m.game==='memory'&&m.engine.locked&&!this.cardTimer){const matchID=m.id,lease=m.lease;this.cardTimer=setTimeout(()=>{this.cardTimer=null;void this.serialize(()=>{if(this.match?.id!==matchID||this.match.closed||this.match.suspended||this.match.lease!==lease||!this.ready)return;this.match.engine=closeRemoteCards(this.match.engine);this.publish();});},900);}
 }
 async applyHost(seat,action,ack=0){
  const m=this.match;if(!this.ready||!m||m.closed||m.suspended||m.role!=='host'||this.drawOffer)return;if(this.outgoing||this.incoming){if(ack)this.publish(ack,'Finish the game invitation first.');return;}
  this.updateClock();if(m.clockView?.limit&&m.clockView.remaining===0&&this.canActClock()){this.settle(m.engine.turn===0?'O':'X','timeout');return;}if(m.turnSeconds&&m.hidden?.some(Boolean)){if(ack)this.publish(ack,'Match paused while a game page is hidden.');return;}const before=m.engine,pair=this.pair,lease=m.lease,self=this.self;try{const next=await remoteAction(before,seat,action,{match:m.id});if(this.match!==m||m.engine!==before||this.pair!==pair||this.self!==self||m.lease!==lease||m.suspended||!this.ready||m.closed)return;m.engine=next;this.publish(ack);}catch(error){if(this.match===m){this.publish(ack,seat!==m.seat?error.message:'');if(seat===m.seat)this.onNotice(error.message);}}
 }
 resign(){const m=this.match;if(!this.ready||!m||m.closed||m.suspended||!m.view||m.view.winner)return;if(m.role==='host'){const lease=m.lease;void this.serialize(()=>{if(this.match===m&&m.lease===lease)this.settle(m.seat===0?'O':'X','resign');});}else{m.pendingDecision=true;this.wire({k:'resign',id:m.id,lease:m.lease});this.emit();}}
 settle(winner,reason){const m=this.match;if(!m||m.role!=='host'||m.closed||m.suspended||!this.ready)return;const next=finishRemoteMatch(m.engine,winner,reason);if(!next)return;this.clearDraw();m.engine=next;m.finishReason=reason;clearTimeout(this.cardTimer);this.cardTimer=null;this.publish();}
 offerDraw(){const m=this.match;if(!this.ready||!m||m.closed||m.suspended||!m.view||m.view.winner||this.drawOffer||this.outgoing||this.incoming)return;const request=id();if(m.role==='host')this.startDraw(request,m.seat);else this.wire({k:'draw-offer',id:m.id,lease:m.lease,request});}
 startDraw(request,by){const m=this.match;if(!m||m.closed||m.suspended||m.view.winner||this.drawOffer)return;this.drawOffer={request,by};this.wire({k:'draw-status',id:m.id,lease:m.lease,request,by});this.onDraw?.(this.drawOffer);this.emit();this.drawTimer=setTimeout(()=>{if(this.match===m&&this.drawOffer?.request===request){this.clearDraw();this.wire({k:'draw-status',id:m.id,lease:m.lease,request:null});this.emit();}},30000);}
 replyDraw(accepted){const m=this.match,d=this.drawOffer;if(!m||!d||d.by===m.seat||!this.ready||m.closed||m.suspended)return;if(m.role==='host'){if(accepted)this.settle('draw','draw');else{this.clearDraw();this.wire({k:'draw-status',id:m.id,lease:m.lease,request:null});this.emit();}}else this.wire({k:'draw-reply',id:m.id,lease:m.lease,request:d.request,accepted:!!accepted});}
 receive(text){
  if(!this.connected||typeof text!=='string'||new TextEncoder().encode(text).length>32768)return Promise.resolve();let p;try{p=JSON.parse(text);}catch{return Promise.resolve();}if(!p||p.v!==1||typeof p.k!=='string')return Promise.resolve();
  const pair=this.pair,self=this.self;return this.serialize(async()=>{
   if(!this.connected||this.pair!==pair||this.self!==self)return;
   if(p.k==='hello'){
    if(p.protocol!==3){this.onNotice('Update Games on both devices to v50 before playing together.');return;}
    if(!validID(p.client)||p.client===this.self)return;
    if(this.peer&&this.peer!==p.client){this.setConnection(false,'');this.onNotice('The other Games window changed. Reconnect before continuing.');return;}
    const reply=!this.peer;this.peer=p.client;this.peerName=cleanPlayerName(p.name);clearTimeout(this.helloTimer);if(reply)this.wire({k:'hello',protocol:3,client:this.self,name:this.name,recover:this.match?.suspended&&!this.match.closed?this.match.id:null,role:this.match?.role||null});
    this.recoveryCompatible=!!(this.match?.suspended&&p.recover===this.match.id&&p.role!==this.match.role&&['host','guest'].includes(p.role));if(this.recoveryCompatible)this.proofTask=this.sendProof().catch(()=>this.onNotice('Recovery could not be verified. Start a new match.'));this.emit();return;
   }
   if(p.k==='name'&&this.peer){this.peerName=cleanPlayerName(p.name);this.emit();return;}
   if(!this.peer||!validID(p.id))return;
   if(p.k==='recover-proof'){
    const m=this.match;if(!m?.suspended||m.closed||p.id!==m.id||!validToken(p.proof,64)||!m.resumeKey)return;
    const proof=await recoveryProof(m.resumeKey,pair,this.peer,self,m.id,m.role==='host'?'guest':'host');if(this.pair!==pair||this.self!==self||this.match!==m||!this.ready)return;
    if(proof===p.proof){this.recoveryFailed=false;this.resumeVerified=true;this.wire({k:'recover-ready',id:m.id});}else this.recoveryFailed=true;this.emit();return;
   }
   if(p.k==='recover-ready'&&this.match?.suspended&&p.id===this.match.id){this.peerResumeReady=true;this.emit();return;}
   if(p.k==='resume-invite'||p.k==='next-invite'){
    const m=this.match,kind=p.k==='resume-invite'?'resume':'next';if(!m||m.closed||p.matchId!==m.id||this.incoming||this.drawOffer)return;if(this.outgoing){if(this.outgoing.kind!==kind||this.outgoing.matchId!==m.id)return;if(this.self<this.peer){this.wire({k:'decline',id:p.id});return;}this.wire({k:'cancel',id:this.outgoing.id});if(kind==='resume')m.resumeConsented=false;this.clearInvitation();}
    if(kind==='resume'?!this.canResume:!m.view?.winner||!m.series||seriesWinner(m.series)||m.series.bestOf!==3)return;
    this.incoming={id:p.id,game:m.game,level:m.level,kind,matchId:m.id};this.onInvite(this.incoming);this.inviteTimer=setTimeout(()=>{if(this.incoming?.id===p.id)this.decline();},30000);this.emit();return;
   }
   if(p.k==='resume-accept'&&this.outgoing?.kind==='resume'&&this.outgoing.id===p.id&&p.matchId===this.match?.id){this.clearInvitation();if(this.match.role==='host')this.resumeHost();this.emit();return;}
   if(p.k==='next-accept'&&this.outgoing?.kind==='next'&&this.outgoing.id===p.id&&p.matchId===this.match?.id){this.clearInvitation();if(this.match.role==='host')this.startNext(p.id);else this.match.nextId=p.id;this.emit();return;}
   if(p.k==='invite'){
    if(!settingsOK(p)||![1,3].includes(p.bestOf)||![0,1].includes(p.hostSeat??0)||!turnLimits.includes(p.turnSeconds??0)||p.game==='rps'&&p.turnSeconds||!(p.supersedes===null||validID(p.supersedes)))return;
    if(this.incoming?.id===p.id)return;
    if(this.drawOffer||this.incoming||this.match&&!this.match.closed&&!this.match.view?.winner&&p.supersedes!==this.match.id){this.wire({k:'decline',id:p.id});return;}
    if(this.outgoing){if(this.self<this.peer){this.wire({k:'decline',id:p.id});return;}this.wire({k:'cancel',id:this.outgoing.id});this.clearInvitation();}
    this.incoming={id:p.id,game:p.game,level:p.level,supersedes:p.supersedes,bestOf:p.bestOf,hostSeat:p.hostSeat??0,turnSeconds:p.turnSeconds??0,kind:'new'};this.onInvite(this.incoming);this.inviteTimer=setTimeout(()=>{if(this.incoming?.id===p.id){this.decline();this.onNotice('Game invitation expired.');}},30000);this.emit();return;
   }
   if(p.k==='accept'){
    const offer=this.outgoing;if(!offer||offer.id!==p.id)return;this.clearInvitation();clearTimeout(this.cardTimer);this.cardTimer=null;this.choice=null;this.lastGuestSequence=0;this.match={id:offer.id,game:offer.game,level:offer.level,role:'host',seat:offer.hostSeat||0,engine:newRemoteGame(offer.game,offer.level),closed:false,suspended:false,pending:0,lease:id(),resumeKey:privateSalt(),names:offer.hostSeat===1?[this.peerName,this.name]:[this.name,this.peerName],turnSeconds:offer.turnSeconds||0,clock:new TurnClock(offer.turnSeconds||0),hidden:[false,false],series:newSeries(offer.bestOf,id()),resultCounted:false};this.match.hidden[this.match.seat]=!!this.hidden;this.startClock();this.publish();this.onStart(offer.game);return;
   }
   if(p.k==='decline'&&this.outgoing?.id===p.id){const recovery=this.outgoing.kind==='resume';if(recovery&&this.match)this.match.resumeConsented=false;this.clearInvitation();this.onNotice(recovery?'The other player declined to continue. The board stays paused.':'The other player declined. Your local game is still available.');this.emit();return;}
   if(p.k==='cancel'&&p.id===this.match?.lastResumeRequest){this.match.suspended=this.match.paused=true;this.match.resumeConsented=false;clearTimeout(this.cardTimer);this.cardTimer=null;this.choice=null;if(this.incoming?.id===p.id||this.outgoing?.id===p.id)this.clearInvitation();this.emit();return;}
   if(p.k==='cancel'&&this.incoming?.id===p.id){this.clearInvitation();this.onNotice('The other player cancelled the invitation.');this.emit();return;}
   let m=this.match;if(p.k==='state'&&m?.role==='guest'&&m.nextId===p.id){this.match=m={id:p.id,game:m.game,level:m.level,seat:m.seat,role:'guest',view:null,closed:false,suspended:false,pending:0,bestOf:m.series.bestOf,turnSeconds:m.turnSeconds||0,hidden:m.hidden?.slice()||[false,false]};this.choice=null;this.sequence=0;this.onStart(m.game);}
   if(!m||m.id!==p.id||m.closed)return;
   if(p.k==='visibility'&&m.role==='host'&&p.lease===m.lease&&typeof p.hidden==='boolean'){m.hidden[1-m.seat]=p.hidden;this.emit();return;}
   if(p.k==='clock'&&m.role==='guest'&&p.lease===m.lease&&!m.suspended){const c=p.clock;if(c&&c.limit===(m.turnSeconds||0)*1000&&Number.isFinite(c.remaining)&&c.remaining>=0&&c.remaining<=c.limit&&typeof c.running==='boolean'){const previousHidden=JSON.stringify(m.hidden);if(Array.isArray(p.hidden)&&p.hidden.length===2&&p.hidden.every(x=>typeof x==='boolean'))m.hidden=p.hidden.slice();m.clockView={...c};if(previousHidden!==JSON.stringify(m.hidden))this.emit();else this.onClock?.(this);}return;}
   if(p.k==='leave'){m.resumeKey=null;m.suspended=false;m.closed=true;m.notice='The other player left the match.';clearTimeout(this.cardTimer);clearTimeout(this.actionTimer);this.clearDraw();this.choice=null;this.emit();return;}
   if(p.k==='sync'&&m.role==='host'&&!m.suspended&&p.lease===m.lease){this.publish(this.lastGuestSequence);return;}
   if(['resign','draw-offer','draw-reply'].includes(p.k)&&m.role==='host'&&!m.suspended&&p.lease===m.lease){if(p.k==='resign')this.settle(m.seat===0?'X':'O','resign');else if(p.k==='draw-offer'&&validID(p.request))this.startDraw(p.request,1-m.seat);else if(p.k==='draw-reply'&&this.drawOffer?.request===p.request&&this.drawOffer.by===m.seat&&typeof p.accepted==='boolean'){if(p.accepted)this.settle('draw','draw');else{this.clearDraw();this.wire({k:'draw-status',id:m.id,lease:m.lease,request:null});this.emit();}}return;}
   if(p.k==='draw-status'&&m.role==='guest'&&!m.suspended&&p.lease===m.lease){if(p.request===null)this.clearDraw();else if(validID(p.request)&&[0,1].includes(p.by)){this.drawOffer={request:p.request,by:p.by};this.onDraw?.(this.drawOffer);}this.emit();return;}
   if(p.k==='action'&&m.role==='host'&&!m.suspended&&p.lease===m.lease){
    if(!Number.isSafeInteger(p.seq)||p.seq<=this.lastGuestSequence||p.seq>this.lastGuestSequence+1024)return;
    this.lastGuestSequence=p.seq;if(!Number.isInteger(p.revision)||p.revision>m.engine.revision||m.game!=='rps'&&p.revision!==m.engine.revision){this.publish(p.seq,'The board changed. Please choose again.');return;}
    await this.applyHost(1-m.seat,p.action,p.seq);return;
   }
   if(p.k==='state'&&m.role==='guest'){
    if(!turnLimits.includes(p.turnSeconds??0)||p.turnSeconds!==(m.turnSeconds||0)||!validID(p.lease)||!validToken(p.resumeKey,64)||!Array.isArray(p.names)||p.names.length!==2||p.names.some(n=>typeof n!=='string'||n.length>24)||m.lease&&p.lease!==m.lease&&!m.suspended)return;
    if(m.suspended&&(!m.resumeConsented||!this.canResume||p.resumed!==true||p.resumeRequest!==m.lastResumeRequest||p.lease===m.lease))return;
    let series;try{series=validateSeries(p.series);}catch{return;}if(m.bestOf&&series.bestOf!==m.bestOf)return;
    let view;try{view=validateRemoteView(p.view);}catch{return;}if(view.game!==m.game||view.level!==m.level||m.view&&view.revision<m.view.revision)return;
    if(m.view&&view.revision===m.view.revision&&JSON.stringify(m.view)!==JSON.stringify(view))return;
    m.lease=p.lease;m.resumeKey=p.resumeKey;m.names=p.names.map(cleanPlayerName);m.series=series;m.finishReason=['resign','draw','timeout'].includes(p.finishReason)?p.finishReason:'';if(m.suspended){m.suspended=m.paused=false;m.pending=0;this.sequence=0;this.choice=null;this.onStart(m.game);}m.view=view;if(view.winner){m.pendingDecision=false;this.clearDraw();}if(Number.isSafeInteger(p.ack)&&p.ack>=m.pending||view.revision>(m.lastRevision??-1)){m.pending=0;m.paused=false;clearTimeout(this.actionTimer);}m.lastRevision=view.revision;if(typeof p.note==='string'&&p.note.length<=160&&p.note)this.onNotice(p.note);this.emit();
   }
  });
 }
 dispose(){clearInterval(this.clockTimer);clearTimeout(this.helloTimer);clearTimeout(this.cardTimer);clearTimeout(this.actionTimer);this.clearInvitation();this.clearDraw();this.connected=false;this.peer=null;this.match=null;this.choice=null;}
}
