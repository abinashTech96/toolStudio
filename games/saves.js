import {words} from './word-bank.js';
import {hands,rpsOutcome,hangmanOver,hangmanWrong,scrambleText} from './arcade-rules.js';
import {ludoSeats,ludoCell,ludoMoves,safeCells} from './ludo.js';
import {libraryDefaults} from './library.js';
import {outcome,validTicTacToe} from './engines.js';
import {reversiMoves,reversiOutcome,slidingSolvable,slidePuzzle,lightSolution,codeFeedback} from './extras.js';
import{gameIds,sudokuConflicts,solveSudoku,connectWinner,mineNeighbors}from'./brain.js';
export const SAVE_KEY='toolstudio-games-v2';
const object=v=>v&&typeof v==='object'&&!Array.isArray(v),integer=(v,max=1e9)=>Number.isInteger(v)&&v>=0&&v<=max;
const board=(b,n,test)=>Array.isArray(b)&&b.length===n&&b.every(test);
const ids=(a,n)=>Array.isArray(a)&&a.length<=n&&new Set(a).size===a.length&&a.every(i=>integer(i,n-1));
const point=(p,size)=>Array.isArray(p)&&p.length===2&&p.every(n=>integer(n,size-1));
const tile=n=>integer(n,2**30)&&(n===0||Number.isInteger(Math.log2(n))&&n>=2);
export function defaults(){return{version:2,enabled:false,active:'2048',settings:{},saves:{},best:{},matches:{ttt:{X:0,O:0,draw:0},connect4:{X:0,O:0,draw:0},reversi:{X:0,O:0,draw:0},rps:{X:0,O:0,draw:0}},library:libraryDefaults()}}
export function validateGame(id,s){
 if(!object(s)||!integer(s.moves)||!integer(s.hints)||typeof s.credited!=='boolean')throw Error('Invalid game metadata');
 let valid=false;
 if(id==='2048')valid=board(s.board,16,tile)&&integer(s.score)&&(s.undo===null||object(s.undo)&&board(s.undo.board,16,tile)&&integer(s.undo.score));
 if(id==='snake')valid=Array.isArray(s.body)&&s.body.length>=3&&s.body.length<=256&&s.body.every(p=>point(p,16))&&new Set(s.body.map(p=>p.join())).size===s.body.length&&(s.food===null||point(s.food,16)&&!s.body.some(p=>p.join()===s.food.join()))&&['up','down','left','right'].includes(s.direction)&&integer(s.score,253)&&typeof s.over==='boolean'&&typeof s.won==='boolean'&&s.body.every((p,i)=>!i||Math.abs(p[0]-s.body[i-1][0])+Math.abs(p[1]-s.body[i-1][1])===1)&&s.body.length===s.score+3&&(!s.won||s.over&&s.body.length===256);
 if(id==='memory'){const n=s.deck?.length;valid=[12,16,24].includes(n)&&board(s.deck,n,v=>integer(v,n/2-1))&&Array.from({length:n/2},(_,v)=>s.deck.filter(x=>x===v).length===2).every(Boolean)&&ids(s.open,n)&&s.open.length<=2&&ids(s.matched,n)&&s.matched.length%2===0&&s.open.every(i=>!s.matched.includes(i))&&object(s.seen)&&Object.entries(s.seen).every(([i,v])=>String(Number(i))===i&&integer(Number(i),n-1)&&s.deck[Number(i)]===v)&&Array.from({length:n/2},(_,v)=>s.matched.filter(i=>s.deck[i]===v).length%2===0).every(Boolean)}
 if(id==='ttt'||id==='connect4'){const n=id==='ttt'?9:42;valid=board(s.board,n,v=>['','X','O'].includes(v));if(valid){const x=s.board.filter(v=>v==='X').length,o=s.board.filter(v=>v==='O').length;valid=x===o||x===o+1;if(id==='connect4')for(let i=0;i<35;i++)if(s.board[i]&&!s.board[i+7])valid=false}}
 if(id==='ttt'&&valid)valid=validTicTacToe(s.board);
 if(id==='connect4'&&valid){const winners=['X','O'].filter(mark=>connectWinner(s.board.map(v=>v===mark?v:''))===mark);if(winners.length>1)valid=false;else if(winners.length){const winner=winners[0],x=s.board.filter(v=>v==='X').length,o=s.board.filter(v=>v==='O').length;valid=x-o===(winner==='X'?1:0)&&Array.from({length:7},(_,col)=>{const row=Array.from({length:6},(_,r)=>r*7+col).find(i=>s.board[i]);if(row===undefined||s.board[row]!==winner)return false;const prev=s.board.slice();prev[row]='';return!connectWinner(prev)}).some(Boolean);}}
 if(id==='sudoku')valid=board(s.givens,81,v=>integer(v,9))&&s.givens.filter(Boolean).length>=17&&board(s.board,81,v=>integer(v,9))&&s.givens.every((v,i)=>!v||s.board[i]===v)&&board(s.notes,81,v=>integer(v,511))&&integer(s.selected,80)&&typeof s.noteMode==='boolean'&&typeof s.completed==='boolean'&&!sudokuConflicts(s.givens).length&&solveSudoku(s.givens,2).count===1;
 if(id==='mines'){const n=s.size*s.size;valid=[[9,10],[12,24],[16,40]].some(([size,mines])=>s.size===size&&s.mines===mines)&&ids(s.revealed,n)&&ids(s.flags,n)&&s.flags.length<=s.mines&&s.flags.every(i=>!s.revealed.includes(i))&&typeof s.over==='boolean'&&typeof s.won==='boolean'&&(s.bombs===null?s.revealed.length===0:ids(s.bombs,n)&&s.bombs.length===s.mines&&s.revealed.every(i=>!s.bombs.includes(i)))&&(!s.won||s.over&&s.revealed.length===n-s.mines)}
 if(id==='reversi')valid=board(s.board,64,v=>['','X','O'].includes(v))&&['X','O'].includes(s.turn)&&s.moves<=60&&s.board.filter(Boolean).length===s.moves+4&&[27,28,35,36].every(i=>s.board[i])&&(!!reversiOutcome(s.board)||reversiMoves(s.board,s.turn).length>0);
 if(id==='sliding'){const n=s.size*s.size;valid=[3,4].includes(s.size)&&board(s.board,n,v=>integer(v,n-1))&&new Set(s.board).size===n&&slidingSolvable(s.board,s.size)&&(s.undo===null||board(s.undo,n,v=>integer(v,n-1))&&new Set(s.undo).size===n&&slidePuzzle(s.undo,s.size,s.board.indexOf(0))?.every((v,i)=>v===s.board[i]));}
 if(id==='lights')valid=[4,5].includes(s.size)&&board(s.board,s.size*s.size,v=>v===0||v===1)&&lightSolution(s.board,s.size)!==null;
 if(id==='code'){const digits=a=>board(a,4,v=>integer(v,s.colors)&&v>=1);valid=[4,5,6].includes(s.colors)&&digits(s.secret)&&digits(s.draft)&&Array.isArray(s.history)&&s.history.length<=10&&s.moves===s.history.length&&s.history.every((r,i)=>object(r)&&Object.keys(r).length===3&&digits(r.guess)&&integer(r.exact,4)&&integer(r.misplaced,4)&&r.exact===codeFeedback(s.secret,r.guess).exact&&r.misplaced===codeFeedback(s.secret,r.guess).misplaced&&(i===s.history.length-1||r.exact!==4));}
 if(id==='rps')valid=Array.isArray(s.history)&&s.history.length<=100&&s.moves===s.history.length&&s.history.every((r,i)=>object(r)&&Object.keys(r).length===2&&hands.includes(r.human)&&hands.includes(r.computer)&&!rpsOutcome({history:s.history.slice(0,i)}));
 if(id==='hangman')valid=integer(s.wordIndex,words.length-1)&&Array.isArray(s.guessed)&&s.guessed.length<=26&&new Set(s.guessed).size===s.guessed.length&&s.guessed.every(c=>typeof c==='string'&&/^[A-Z]$/.test(c))&&[6,7,8].includes(s.limit)&&s.moves===s.guessed.length&&hangmanWrong(s)<=s.limit&&s.guessed.every((_,i)=>!hangmanOver({...s,guessed:s.guessed.slice(0,i)}));
 if(id==='scramble'){const n=words[s.wordIndex]?.word.length;valid=integer(s.wordIndex,words.length-1)&&ids(s.order,n)&&s.order.length===n&&ids(s.picked,n)&&typeof s.completed==='boolean'&&(!s.completed||s.moves>0&&scrambleText(s)===words[s.wordIndex].word);}
 if(id==='ludo'){
  valid=[2,4].includes(s.players)&&Array.isArray(s.tokens)&&s.tokens.length===s.players&&s.tokens.every(a=>board(a,4,v=>Number.isInteger(v)&&v>=-1&&v<=57))&&integer(s.turn,s.players-1)&&(s.die===null||Number.isInteger(s.die)&&s.die>=1&&s.die<=6)&&integer(s.streak,2)&&(s.winner===null||integer(s.winner,s.players-1))&&typeof s.last==='string'&&s.last.length<=200;
  if(valid){const winners=s.tokens.flatMap((a,i)=>a.every(v=>v===57)?[i]:[]);valid=s.winner===null?winners.length===0:winners.length===1&&winners[0]===s.winner&&s.turn===s.winner&&s.die===null&&s.streak===0;
   if(s.die!==null)valid=valid&&ludoMoves(s).length>0&&(s.die===6?s.streak>0:s.streak===0);
   const occupied=new Map();for(let player=0;player<s.players;player++)for(let token=0;token<4;token++)if(s.tokens[player][token]>=0&&s.tokens[player][token]<=50){const cell=ludoCell(s,player,token);if(!safeCells.includes(cell)){if(occupied.has(cell)&&occupied.get(cell)!==player)valid=false;occupied.set(cell,player)}}
  }
 }
 const allowed={2048:['board','score','undo'],snake:['body','food','direction','score','over','won'],memory:['deck','open','matched','seen'],ttt:['board'],sudoku:['givens','board','notes','selected','noteMode','completed'],mines:['size','mines','bombs','revealed','flags','over','won'],connect4:['board'],reversi:['board','turn'],sliding:['size','board','undo'],lights:['size','board'],code:['colors','secret','draft','history'],rps:['history'],hangman:['wordIndex','guessed','limit'],scramble:['wordIndex','order','picked','completed'],ludo:['players','tokens','turn','die','streak','winner','last']}[id];
 if(!allowed||Object.keys(s).some(k=>!['moves','hints','credited',...allowed].includes(k)))valid=false;
 if(id==='sudoku'&&valid)valid=s.completed===(s.board.every(Boolean)&&sudokuConflicts(s.board).length===0);
 if(id==='snake'&&valid)valid=s.food!==null||s.won;
 if(!valid)throw Error('Invalid '+id+' saved board');
 return structuredClone(s);
}
export function validateProfile(v){
 if(!object(v)||v.version!==2||typeof v.enabled!=='boolean'||!gameIds.includes(v.active)||!object(v.settings)||!object(v.saves)||!object(v.best)||!object(v.matches)||Object.keys(v).some(k=>!['version','enabled','active','settings','saves','best','matches','library'].includes(k)))throw Error('Invalid Games save');
 for(const[id,setting]of Object.entries(v.settings))if(!gameIds.includes(id)||!object(setting)||!['easy','medium','hard'].includes(setting.level)||!['solo','two'].includes(setting.mode)||Object.keys(setting).some(k=>!['level','mode',...(id==='ludo'?['players']:[])].includes(k)))throw Error('Invalid Games settings');
 for(const[id,setting]of Object.entries(v.settings))if(setting.players!==undefined&&(id!=='ludo'||![2,4].includes(setting.players)))throw Error('Invalid player count');
 for(const[id,s]of Object.entries(v.saves)){if(!gameIds.includes(id))throw Error('Unknown saved game');validateGame(id,s);if((id==='ttt'||id==='connect4')&&(v.settings[id]?.mode||'solo')==='solo'){const b=s.board,end=id==='connect4'?connectWinner(b):outcome(b);if(end&&end!=='draw'&&b.filter(x=>x==='X').length-b.filter(x=>x==='O').length!==(end==='X'?1:0))throw Error('Invalid completed match')}}
 for(const[k,n]of Object.entries(v.best))if(!/^(2048|snake|memory|ttt|sudoku|mines|connect4|reversi|sliding|lights|code|rps|hangman|scramble|ludo):(easy|medium|hard):(solo|two):(assisted|solo)(?::[24])?$/.test(k)||!integer(n)||(k.startsWith('ludo:')?k.split(':').length!==5:k.split(':').length!==4))throw Error('Invalid Games best');
 for(const id of['ttt','connect4'])if(!object(v.matches[id])||Object.keys(v.matches[id]).length!==3||!['X','O','draw'].every(k=>integer(v.matches[id][k])))throw Error('Invalid match scoreboard');
 if(v.matches.reversi!==undefined&&(!object(v.matches.reversi)||Object.keys(v.matches.reversi).length!==3||!['X','O','draw'].every(k=>integer(v.matches.reversi[k]))))throw Error('Invalid Reversi scoreboard');
 if(Object.keys(v.matches).some(k=>!['ttt','connect4','reversi','rps'].includes(k)))throw Error('Invalid match scoreboard');
 if(v.matches.rps!==undefined&&(!object(v.matches.rps)||Object.keys(v.matches.rps).length!==3||!['X','O','draw'].every(k=>integer(v.matches.rps[k]))))throw Error('Invalid RPS scoreboard');
 if(v.library!==undefined){const lib=v.library;if(!object(lib)||Object.keys(lib).some(k=>!['favorites','recent','collapsed','theme'].includes(k))||!Array.isArray(lib.favorites)||!Array.isArray(lib.recent)||lib.favorites.length>gameIds.length||lib.recent.length>6||![lib.favorites,lib.recent].every(a=>new Set(a).size===a.length&&a.every(id=>gameIds.includes(id)))||typeof lib.collapsed!=='boolean'||!['follow','forest','sky','cartoon','neon','pearl','graphite'].includes(lib.theme))throw Error('Invalid Games library');}
 const result=structuredClone(v);result.matches.reversi??={X:0,O:0,draw:0};result.matches.rps??={X:0,O:0,draw:0};result.library??=libraryDefaults();return result;
}
export function loadProfile(storage){try{const text=storage.getItem(SAVE_KEY);if(!text)return{profile:defaults(),error:null};if(text.length>100000)throw Error('Games save exceeds its limit');return{profile:validateProfile(JSON.parse(text)),error:null}}catch{return{profile:defaults(),error:'Saved Games data could not be read. It has been kept unchanged. Use Clear saved games before saving again.'}}}
export function writeProfile(storage,profile){const value=validateProfile(profile),text=JSON.stringify(value);if(text.length>100000)throw Error('Games save exceeds its limit');storage.setItem(SAVE_KEY,text)}
