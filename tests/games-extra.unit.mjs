import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as E from '../src/games/extras.js';
import {defaults, validateGame, validateProfile, loadProfile, writeProfile, SAVE_KEY} from '../src/games/saves.js';
const passed=[];
function test(name,fn){fn();passed.push(name);console.log('PASS',name)}
function rng(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/2**32}}
const meta=s=>({...s,moves:0,hints:0,credited:false});

test('Reversi starts with four legal X moves',()=>{
 const s=E.createReversi();assert.deepEqual(E.reversiMoves(s.board,'X'),[19,26,37,44]);assert.equal(s.turn,'X');
});
test('Reversi flips only bracketed discs without mutating input',()=>{
 const s=E.createReversi(),copy=structuredClone(s),n=E.playReversi(s,19);
 assert.equal(n.board[19],'X');assert.equal(n.board[27],'X');assert.equal(n.turn,'O');assert.deepEqual(s,copy);
 assert.equal(E.playReversi(s,0),null);assert.deepEqual(E.reversiFlips(s.board,28,'X'),[]);
});
test('Reversi captures all eight rays and never wraps across rows',()=>{
 const b=Array(64).fill('');for(const [dx,dy] of [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]]){b[(3+dy)*8+3+dx]='O';b[(3+2*dy)*8+3+2*dx]='X'}
 assert.equal(E.reversiFlips(b,27,'X').length,8);
 const edge=Array(64).fill('');edge[8]='O';edge[9]='X';assert.deepEqual(E.reversiFlips(edge,7,'X'),[]);
});
test('Reversi handles automatic passes and completes legal games within 60 moves',()=>{
 let passes=0;
 for(let seed=1;seed<=15;seed++){const random=rng(seed);let s=E.createReversi(),moves=0;
  while(!E.reversiOutcome(s.board)){const choices=E.reversiMoves(s.board,s.turn);assert(choices.length);const next=E.playReversi(s,choices[Math.floor(random()*choices.length)]);if(next.turn===s.turn&&!E.reversiOutcome(next.board))passes++;s=next;assert(++moves<=60)}
  assert(['X','O','draw'].includes(E.reversiOutcome(s.board)));
 }assert(passes>0);
});
test('Reversi recognizes wins and draws even when empty squares remain',()=>{
 assert.equal(E.reversiOutcome(Array(64).fill('X')),'X');
 const b=Array(64).fill('');b[27]='X';assert.equal(E.reversiOutcome(b),'X');
 assert.equal(E.reversiOutcome(Array.from({length:64},(_,i)=>i%2?'X':'O')),'draw');
});
test('Reversi computer choices are legal at every level and favor a free corner',()=>{
 const s=E.createReversi(),copy=s.board.slice();
 for(const level of ['easy','medium','hard'])assert(E.reversiMoves(s.board,'X').includes(E.reversiMove(s.board,'X',level,rng(1))));
 assert.deepEqual(s.board,copy);const b=Array(64).fill('');b[1]='O';b[2]='X';assert.equal(E.reversiMove(b,'X','hard'),0);
 assert.equal(E.reversiMove(Array(64).fill('X'),'O'),-1);
});
test('Sliding Puzzle generation stays solvable and unfinished at every level',()=>{
 for(const level of ['easy','medium','hard'])for(let seed=0;seed<30;seed++){const s=E.createSliding(level,rng(seed));assert(E.slidingSolvable(s.board,s.size));assert(!E.slidingSolved(s.board));assert.equal(new Set(s.board).size,s.size*s.size);validateGame('sliding',meta(s))}
});
test('Sliding Puzzle rejects diagonal and row-wrapping moves',()=>{
 const b=[1,2,0,4,5,3,7,8,6];assert.equal(E.slidePuzzle(b,3,3),null);assert.equal(E.slidePuzzle(b,3,4),null);
 assert.deepEqual(E.slidePuzzle(b,3,5),[1,2,3,4,5,0,7,8,6]);assert.equal(b[2],0);
});
test('Sliding parity rejects impossible 3×3 and 4×4 permutations',()=>{
 for(const size of [3,4]){const b=E.slidingGoal(size);assert(E.slidingSolvable(b,size));[b[0],b[1]]=[b[1],b[0]];assert(!E.slidingSolvable(b,size));assert.throws(()=>validateGame('sliding',meta({size,board:b,undo:null})))}
});
test('Sliding coach solves a near-complete puzzle and returns a legal bounded hint',()=>{
 const s={size:3,board:[1,2,3,4,5,6,7,0,8]},h=E.slidingHint(s);assert.deepEqual(h.cells,[8]);assert(E.slidingSolved(E.slidePuzzle(s.board,s.size,h.cells[0])));
 const hard=E.createSliding('hard',rng(7)),copy=structuredClone(hard);assert(E.slidingNeighbors(hard.board,4).includes(E.slidingHint(hard).cells[0]));assert.deepEqual(hard,copy);
});
test('Lights Out toggles only self and orthogonal neighbors, and is self-inverse',()=>{
 const b=Array(16).fill(0),n=E.toggleLights(b,4,0);assert.deepEqual(n.flatMap((v,i)=>v?[i]:[]),[0,1,4]);assert.deepEqual(E.toggleLights(n,4,0),b);assert.equal(b.filter(Boolean).length,0);
});
test('Every generated Lights Out board is solved by its algebraic coach',()=>{
 for(const level of ['easy','medium','hard'])for(let seed=0;seed<30;seed++){
  const s=E.createLights(level,rng(seed));assert(s.board.some(Boolean));let b=s.board;const solution=E.lightSolution(b,s.size);assert(solution?.length);
  for(const cell of solution)b=E.toggleLights(b,s.size,cell);assert(!b.some(Boolean));validateGame('lights',meta(s));
 }
});
test('Lights Out detects an unsolvable pattern and completed board',()=>{
 const impossible=Array(25).fill(0);impossible[0]=1;assert.equal(E.lightSolution(impossible,5),null);assert.throws(()=>validateGame('lights',meta({size:5,board:impossible})));
 assert.deepEqual(E.lightsHint({size:4,board:Array(16).fill(0)}).cells,[]);
});
test('Codebreaker duplicate scoring does not double-count digits',()=>{
 assert.deepEqual(E.codeFeedback([1,1,2,2],[1,2,1,1]),{exact:1,misplaced:2});
 assert.deepEqual(E.codeFeedback([1,1,1,1],[1,2,2,2]),{exact:1,misplaced:0});
 assert.deepEqual(E.codeFeedback([1,2,3,4],[4,3,2,1]),{exact:0,misplaced:4});
});
test('Codebreaker feedback is symmetric and bounded for every pair of 4-digit binary codes',()=>{
 const codes=E.codeCandidates(2,[]);for(const a of codes)for(const b of codes){const f=E.codeFeedback(a,b);assert.deepEqual(f,E.codeFeedback(b,a));assert(f.exact+f.misplaced<=4);assert.equal(f.exact===4,a.join()===b.join())}
});
test('Codebreaker generation, win and ten-attempt loss are enforced',()=>{
 for(const level of ['easy','medium','hard']){const s=E.createCode(level,rng(1));assert(s.secret.every(v=>v>=1&&v<=s.colors));validateGame('code',meta(s))}
 let s={...E.createCode('hard',rng(3)),secret:[2,2,2,2]};for(let i=0;i<10;i++)s=E.submitCode(s);assert(E.codeOver(s));assert(!E.codeWon(s));assert.equal(E.submitCode(s),null);
 s=E.submitCode({...E.createCode(),secret:[1,1,1,1]});assert(E.codeWon(s));assert.equal(E.submitCode(s),null);
});
test('Codebreaker candidates always retain the actual code after visible feedback',()=>{
 const secret=[1,2,2,4],history=[];for(const guess of [[1,1,1,1],[2,2,3,3],[4,3,2,1]]){history.push({guess,...E.codeFeedback(secret,guess)});assert(E.codeCandidates(4,history).some(c=>c.join()===secret.join()))}
});
test('Codebreaker coach uses only feedback, never the hidden secret or draft',()=>{
 const a=E.createCode('hard',rng(1)),b=E.createCode('hard',rng(2)),copy=structuredClone(a);
 assert.deepEqual(E.codeHint(a),E.codeHint(b));assert.deepEqual(a,copy);
 const h=[{guess:[1,2,3,4],exact:4,misplaced:0}];assert(E.codeHint({colors:4,history:h}).text.includes('1 code remains'));
});
const samples={reversi:meta(E.createReversi()),sliding:meta(E.createSliding('medium',rng(2))),lights:meta(E.createLights('easy',rng(2))),code:meta(E.createCode('easy',rng(2)))};
test('Four new saved-game types validate and round-trip with the existing profile',()=>{
 const p=defaults();p.enabled=true;p.saves=samples;assert.deepEqual(validateProfile(JSON.parse(JSON.stringify(p))),p);
 for(const [id,s]of Object.entries(samples))assert.deepEqual(validateGame(id,s),s);
});
test('Earlier v2 saves gain an empty Reversi scoreboard without losing prior data',()=>{
 const p=defaults();delete p.matches.reversi;p.best['2048:medium:solo:solo']=42;
 const n=validateProfile(p);assert.deepEqual(n.matches.reversi,{X:0,O:0,draw:0});assert.equal(n.best['2048:medium:solo:solo'],42);assert(!p.matches.reversi);
});
test('Malformed new saves, unknown properties and inconsistent feedback are rejected',()=>{
 for(const [id,mutate]of [['reversi',s=>s.turn='bad'],['reversi',s=>s.board[0]='X'],['sliding',s=>s.board[0]=s.board[1]],['sliding',s=>s.undo=E.slidingGoal(3)],['lights',s=>s.board[0]=2],['code',s=>s.secret[0]=7],['code',s=>{s.history=[{guess:[1,1,1,1],exact:4,misplaced:4}];s.moves=1}]]){const s=structuredClone(samples[id]);mutate(s);assert.throws(()=>validateGame(id,s),id)}
 for(const [id,original] of Object.entries(samples)){assert.throws(()=>validateGame(id,{...original,secretExtra:'unexpected'}))}
});
test('New game saves leave tool data untouched, preserve corrupt saves and surface quota failure',()=>{
 const map=new Map([['toolstudio-workspace','keep']]),storage={getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v)},p={...defaults(),enabled:true,saves:samples};
 writeProfile(storage,p);assert.deepEqual(loadProfile(storage).profile,p);assert.equal(map.get('toolstudio-workspace'),'keep');
 map.set(SAVE_KEY,'bad');assert(loadProfile(storage).error);assert.equal(map.get(SAVE_KEY),'bad');assert.throws(()=>writeProfile({setItem(){throw Error('quota')}},p),/quota/);
});
fs.mkdirSync('test-results',{recursive:true});fs.writeFileSync('test-results/games-extra-unit.json',JSON.stringify({checks:passed.length,passed},null,2));
