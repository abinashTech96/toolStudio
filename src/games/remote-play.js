import {RemoteSession} from './remote-session.js';
import {installGameConnection} from './remote-connection.js';
import {remoteGameIds} from './remote-rules.js';
import {gameCatalog} from './catalog.js';
import {reversiMoves} from './extras.js';
import {ludoMoves} from './ludo.js';
import {drawLudo} from './ludo-view.js';
const name=id=>gameCatalog.find(g=>g.id===id)?.name||'Game';
export function installRemotePlay({getGame,onGame,onTakeover,onLocal,onOptions}){
 const $=id=>document.getElementById(id),panel=$('remoteGamePanel'),board=$('remoteBoard'),status=$('remoteGameStatus');
 let showing=false,notice='',connection;
 const session=new RemoteSession({send:text=>connection.send(text),onChange:()=>{if(!session.match&&!session.outgoing)showing=false;render();onOptions();},onInvite:showInvite,onStart:id=>{showing=true;onTakeover();void Promise.resolve(onGame(id)).then(()=>{render();onOptions();});},onNotice:text=>{notice=text;$('remoteNotice').textContent=text;}});
 connection=installGameConnection({onStatus:m=>session.setConnection(m.approved,m.pair),onPacket:text=>void session.receive(text),onNotice:text=>{notice=text;$('remoteNotice').textContent=text;}});
 function node(tag,text,cls){const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;}
 function button(text,action,key){const b=node('button',text);b.type='button';b.onclick=action;if(key)b.dataset.remoteAction=key;return b;}
 function showInvite(invitation){const d=$('remoteInvite');if(!invitation){if(d.open)d.close();return;}$('remoteInviteText').textContent='Play '+name(invitation.game)+' with the connected device? '+(invitation.game==='ludo'?'Two players: Red and Yellow.':invitation.game==='memory'?invitation.level+' board.':'You play second.')+(invitation.supersedes&&session.match?.id===invitation.supersedes?' This replaces your current match.':'');if(!d.open)d.showModal();$('declineRemoteInvite').focus();}
 $('acceptRemoteInvite').onclick=()=>session.accept();$('declineRemoteInvite').onclick=()=>session.decline();$('remoteInvite').addEventListener('cancel',e=>{e.preventDefault();session.decline();});
 function ownsView(id=getGame()){return showing&&((session.outgoing?.game||session.match?.game)===id);}
 function local(){session.leave();showing=false;render();onLocal();onOptions();}
 function offer(game,level){if(!remoteGameIds.includes(game))return;if(!session.ready){connection.open();return;}if(session.match&&!session.match.closed&&!session.match.view?.winner&&!confirm('Leave this remote round and ask both players to start a new match?'))return;notice='';showing=true;onTakeover();try{session.offer(game,level);}catch(error){notice=error.message;showing=false;$('remoteNotice').textContent=notice;}render();onOptions();}
 $('resumeRemoteMatch').onclick=()=>{if(session.match){showing=true;void Promise.resolve(onGame(session.match.game)).then(render);}};
 $('leaveRemoteGame').onclick=local;$('cancelRemoteInvitation').onclick=()=>session.cancelInvite();
 $('remoteRematch').onclick=()=>{if(session.match)offer(session.match.game,session.match.level);};$('remoteResync').onclick=()=>{if(session.match&&session.ready)session.wire({k:'sync',id:session.match.id});};
 function render(){
  const active=ownsView(),m=session.match,v=m?.view;panel.hidden=!active;document.body.classList.toggle('remote-playing',active);$('resumeRemoteMatch').hidden=!m;
  $('playersGameStatus').textContent=session.ready?'Ready for a two-device game':session.connected?'Waiting for Games on the other device…':'Connect both Games windows to play together.';
  if(!active)return;
  const old=document.activeElement?.dataset.remoteAction,hadFocus=panel.contains(document.activeElement);board.replaceChildren();board.className='remote-board';board.removeAttribute('style');
  $('remoteMatchTitle').textContent=name(session.outgoing?.game||m?.game)+' · Remote player';$('remoteRules').textContent=m?.game==='rps'?'Both choices stay hidden until both players lock their hands.':m?.game==='memory'?'A match keeps your turn. A miss passes after both cards close.':m?.game==='ludo'?'Two devices · Red starts; Yellow plays second. Roll on your turn.':'You each play from your own device. X starts.';
  $('cancelRemoteInvitation').hidden=!session.outgoing;$('remoteRematch').hidden=!m||!!session.outgoing;$('remoteRematch').disabled=!session.ready;$('remoteResync').hidden=!m?.paused;
  if(session.outgoing){status.textContent='Waiting for the other player to accept '+name(session.outgoing.game)+'…';return;}
  if(!m){status.textContent=notice||'Choose Remote player in Game settings after connecting.';return;}
  const mark=m.seat?'O':'X',own=m.game==='ludo'?m.seat?'Yellow':'Red':m.game==='memory'?'Player '+(m.seat+1):mark;
  status.textContent=m.closed?m.notice:m.paused?'Waiting for the other device to synchronize…':!v?'Preparing the shared board…':v.winner?v.winner==='draw'?'Match drawn.':v.winner===mark?'You won!':'The other player won.':v.game==='rps'?(v.chosen[m.seat]||session.choice?'Choice locked · waiting for both players.':'Choose your hand.'):m.pending?'Sending your move…':v.turn===m.seat?'Your turn · '+own:'Other player’s turn · You are '+own;
  if(!v)return;board.dataset.game=v.game;const can=session.canAct(),act=a=>void session.act(a);
  if(v.game==='ttt'||v.game==='reversi'){
   const size=v.game==='ttt'?3:8,legal=v.game==='reversi'?reversiMoves(v.board,mark):v.board.flatMap((x,i)=>x?[]:[i]);board.style.setProperty('--remote-columns',size);
   v.board.forEach((value,i)=>{const b=button(value||'·',()=>act({type:'place',cell:i}),String(i));b.className=value||'';b.setAttribute('aria-label','Row '+(Math.floor(i/size)+1)+', column '+(i%size+1)+', '+(value||'empty'));b.disabled=!can||!legal.includes(i);board.append(b);});
  }
  if(v.game==='connect4'){
   board.style.setProperty('--remote-columns',7);for(let c=0;c<7;c++){const b=button('↓',()=>act({type:'drop',column:c}),String(c));b.setAttribute('aria-label','Drop in column '+(c+1));b.disabled=!can||!!v.board[c];board.append(b);}v.board.forEach((value,i)=>{const e=node('span',value||'·','disc '+value);e.setAttribute('role','img');e.setAttribute('aria-label','Row '+(Math.floor(i/7)+1)+', column '+(i%7+1)+', '+(value||'empty'));board.append(e);});
  }
  if(v.game==='memory'){
   board.style.setProperty('--remote-columns',v.cards.length===24?6:4);const glyphs=['●','▲','■','◆','★','☂','♜','☀','♥','☾','✿','✦'];v.cards.forEach((value,i)=>{const b=button(value===null?'?':glyphs[value],()=>act({type:'flip',cell:i}),String(i));b.setAttribute('aria-label','Card '+(i+1)+', '+(value===null?'face down':'symbol '+value)+(v.matched.includes(i)?', matched':''));b.className=v.matched.includes(i)?'matched':value===null?'':'revealed';b.disabled=!can||v.locked||value!==null;board.append(b);});status.textContent+=' · You '+v.scores[m.seat]+' pairs · Other player '+v.scores[1-m.seat]+' pairs';
  }
  if(v.game==='ludo'){
   board.append(drawLudo(v.ludo));const p=node('p',v.ludo.last);board.append(p);const actions=node('div',undefined,'remote-ludo-actions');const roll=button('Roll dice',()=>act({type:'roll'}),'roll');roll.disabled=!can||v.ludo.die!==null;actions.append(roll);const legal=ludoMoves(v.ludo);for(let t=0;t<4;t++){const b=button('Move token '+(t+1),()=>act({type:'token',token:t}),'token'+t);b.disabled=!can||!legal.includes(t);actions.append(b);}board.append(actions);
  }
  if(v.game==='rps'){
   const row=node('div',undefined,'remote-hands');for(const hand of ['rock','paper','scissors']){const b=button(hand[0].toUpperCase()+hand.slice(1),()=>void session.chooseHand(hand),hand);b.disabled=!can||v.chosen[m.seat]||!!session.choice;row.append(b);}board.append(row,node('p','You '+(m.seat?v.scores.O:v.scores.X)+' · Other player '+(m.seat?v.scores.X:v.scores.O)+' · First to three wins.'));if(v.history.length){const last=v.history.at(-1);board.append(node('p','Last round: You '+(m.seat?last.computer:last.human)+' · Other player '+(m.seat?last.human:last.computer)));}
  }
  if(hadFocus){const focus=[...panel.querySelectorAll('[data-remote-action]')].find(b=>b.dataset.remoteAction===old&&!b.disabled);focus?.focus({preventScroll:true});}
 }
 return {get ready(){return session.ready;},ownsView,render,offer,local,onLocalStart:()=>{render();onOptions();},rematch:()=>{if(session.match)offer(session.match.game,session.match.level);},session};
}
