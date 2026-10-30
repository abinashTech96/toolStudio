import {outcome} from './engines.js';
import {dropDisc,connectWinner,memoryDeck} from './brain.js';
import {createReversi,playReversi,reversiOutcome} from './extras.js';
import {createLudo,rollLudo,moveLudo} from './ludo.js';
import {hands,rpsScores,rpsOutcome} from './arcade-rules.js';
export const remoteGameIds=['ttt','connect4','reversi','ludo','memory','rps'];
export const remoteLevels=['easy','medium','hard'];
export function randomInteger(n){const limit=2**32-(2**32%n),a=new Uint32Array(1);do{crypto.getRandomValues(a);}while(a[0]>=limit);return a[0]%n;}
const clone=s=>structuredClone(s),index=(n,max)=>Number.isInteger(n)&&n>=0&&n<max;
export function newRemoteGame(game,level='medium',random=()=>randomInteger(2**24)/2**24){
 if(!remoteGameIds.includes(game)||!remoteLevels.includes(level))throw Error('Unsupported remote game settings');
 const s={game,level,revision:0,turn:0,winner:null};
 if(game==='ttt'||game==='connect4')s.board=Array(game==='ttt'?9:42).fill('');
 if(game==='reversi')s.board=createReversi().board;
 if(game==='ludo')s.ludo=createLudo(2);
 if(game==='memory')Object.assign(s,{deck:memoryDeck({easy:6,medium:8,hard:12}[level],random),open:[],matched:[],scores:[0,0],locked:false});
 if(game==='rps')Object.assign(s,{history:[],commits:[null,null],reveals:[null,null]});
 return s;
}
export async function choiceDigest(match,round,hand,salt){if(typeof match!=='string'||match.length>64||!Number.isInteger(round)||round<0||round>99||!hands.includes(hand)||typeof salt!=='string'||!/^[a-f0-9]{64}$/.test(salt))throw Error('Invalid private choice');const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode([match,round,hand,salt].join(':')));return [...new Uint8Array(bytes)].map(n=>n.toString(16).padStart(2,'0')).join('');}
export function privateSalt(){return [...crypto.getRandomValues(new Uint8Array(32))].map(n=>n.toString(16).padStart(2,'0')).join('');}
export async function remoteAction(source,seat,action,{match,die=()=>randomInteger(6)+1}={}){
 if(![0,1].includes(seat)||!action||typeof action!=='object'||source.winner!==null)throw Error('Move unavailable');
 const s=clone(source),a=action;
 if(s.game==='rps'){
  if(a.round!==s.history.length)throw Error('This round has ended');
  if(a.type==='commit'){if(s.commits[seat]||typeof a.hash!=='string'||!/^[a-f0-9]{64}$/.test(a.hash))throw Error('Choice already locked or invalid');s.commits[seat]=a.hash;}
  else if(a.type==='reveal'){if(!s.commits.every(Boolean)||s.reveals[seat]||await choiceDigest(match,a.round,a.hand,a.salt)!==s.commits[seat])throw Error('Private choice does not match');s.reveals[seat]={hand:a.hand,salt:a.salt};if(s.reveals.every(Boolean)){s.history.push({human:s.reveals[0].hand,computer:s.reveals[1].hand});s.winner=rpsOutcome(s);s.commits=[null,null];s.reveals=[null,null];}}
  else throw Error('Unsupported choice action');
 }else{
  if(seat!==s.turn)throw Error('Wait for your turn');
  if(s.game==='ttt'){if(a.type!=='place'||!index(a.cell,9)||s.board[a.cell])throw Error('Choose an empty square');s.board[a.cell]=seat?'O':'X';s.winner=outcome(s.board);if(!s.winner)s.turn=1-seat;}
  if(s.game==='connect4'){if(a.type!=='drop'||!index(a.column,7))throw Error('Choose a column');const next=dropDisc(s.board,a.column,seat?'O':'X');if(!next)throw Error('Column is full');s.board=next;s.winner=connectWinner(s.board);if(!s.winner)s.turn=1-seat;}
  if(s.game==='reversi'){if(a.type!=='place'||!index(a.cell,64))throw Error('Choose a legal square');const next=playReversi({board:s.board,turn:seat?'O':'X'},a.cell);if(!next)throw Error('Choose a legal square');s.board=next.board;s.turn=next.turn==='X'?0:1;s.winner=reversiOutcome(s.board);}
  if(s.game==='ludo'){let next;if(a.type==='roll')next=rollLudo(s.ludo,die());else if(a.type==='token'&&index(a.token,4))next=moveLudo(s.ludo,a.token);if(!next)throw Error('Choose a legal Ludo action');s.ludo=next;s.turn=next.turn;s.winner=next.winner===null?null:next.winner===0?'X':'O';}
  if(s.game==='memory'){
   if(s.locked||a.type!=='flip'||!index(a.cell,s.deck.length)||s.open.includes(a.cell)||s.matched.includes(a.cell))throw Error('Choose a face-down card');
   s.open.push(a.cell);if(s.open.length===2){if(s.deck[s.open[0]]===s.deck[s.open[1]]){s.matched.push(...s.open);s.open=[];s.scores[seat]++;if(s.matched.length===s.deck.length)s.winner=s.scores[0]===s.scores[1]?'draw':s.scores[0]>s.scores[1]?'X':'O';}else s.locked=true;}
  }
 }
 s.revision++;return s;
}
export function closeRemoteCards(source){if(source.game!=='memory'||!source.locked)return source;return {...source,open:[],locked:false,turn:1-source.turn,revision:source.revision+1};}
export function remoteView(s){
 const base={game:s.game,level:s.level,revision:s.revision,turn:s.turn,winner:s.winner};
 if(s.board)base.board=s.board.slice();
 if(s.game==='ludo')base.ludo=clone(s.ludo);
 if(s.game==='memory')Object.assign(base,{cards:s.deck.map((v,i)=>s.open.includes(i)||s.matched.includes(i)?v:null),open:s.open.slice(),matched:s.matched.slice(),scores:s.scores.slice(),locked:s.locked});
 if(s.game==='rps')Object.assign(base,{history:clone(s.history),chosen:s.commits.map(Boolean),revealing:s.commits.every(Boolean),scores:rpsScores(s.history)});
 return base;
}
// Incoming snapshots are never used as host rules. Only fixed, bounded fields reach the view.
export function validateRemoteView(v){
 if(!v||typeof v!=='object'||!remoteGameIds.includes(v.game)||!remoteLevels.includes(v.level)||!Number.isSafeInteger(v.revision)||v.revision<0||v.revision>100000||![0,1].includes(v.turn)||![null,'X','O','draw'].includes(v.winner))throw Error('Invalid match view');
 const out={game:v.game,level:v.level,revision:v.revision,turn:v.turn,winner:v.winner};
 if(['ttt','connect4','reversi'].includes(v.game)){const size={ttt:9,connect4:42,reversi:64}[v.game];if(!Array.isArray(v.board)||v.board.length!==size||v.board.some(x=>!['','X','O'].includes(x)))throw Error('Invalid board');out.board=v.board.slice();}
 if(v.game==='ludo'){const l=v.ludo;if(!l||l.players!==2||!Array.isArray(l.tokens)||l.tokens.length!==2||l.tokens.some(a=>!Array.isArray(a)||a.length!==4||a.some(n=>!Number.isInteger(n)||n< -1||n>57))||![0,1].includes(l.turn)||![null,0,1].includes(l.winner)||!(l.die===null||index(l.die-1,6))||!index(l.streak,3)||typeof l.last!=='string'||l.last.length>256)throw Error('Invalid Ludo board');out.ludo={players:2,tokens:l.tokens.map(a=>a.slice()),turn:l.turn,die:l.die,streak:l.streak,winner:l.winner,last:l.last};}
 if(v.game==='memory'){const size={easy:12,medium:16,hard:24}[v.level],indices=a=>Array.isArray(a)&&new Set(a).size===a.length&&a.every(n=>index(n,size));if(!Array.isArray(v.cards)||v.cards.length!==size||v.cards.some(n=>n!==null&&!index(n,size/2))||!indices(v.open)||v.open.length>2||!indices(v.matched)||v.matched.length%2||v.open.some(n=>v.matched.includes(n))||!Array.isArray(v.scores)||v.scores.length!==2||v.scores.some(n=>!Number.isInteger(n)||n<0||n>size/2)||v.scores[0]+v.scores[1]!==v.matched.length/2||typeof v.locked!=='boolean'||v.cards.some((n,i)=>(v.open.includes(i)||v.matched.includes(i))?(n===null):n!==null))throw Error('Invalid Memory view');Object.assign(out,{cards:v.cards.slice(),open:v.open.slice(),matched:v.matched.slice(),scores:v.scores.slice(),locked:v.locked});}
 if(v.game==='rps'){if(!Array.isArray(v.history)||v.history.length>100||v.history.some(r=>!r||!hands.includes(r.human)||!hands.includes(r.computer))||!Array.isArray(v.chosen)||v.chosen.length!==2||v.chosen.some(b=>typeof b!=='boolean')||typeof v.revealing!=='boolean'||v.revealing!==v.chosen.every(Boolean))throw Error('Invalid RPS view');Object.assign(out,{history:v.history.map(r=>({human:r.human,computer:r.computer})),chosen:v.chosen.slice(),revealing:v.revealing,scores:rpsScores(v.history)});}
 return out;
}
