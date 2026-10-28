// Pure game rules, independent of the workspace and DOM.
export const lines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
export function outcome(board){for(const line of lines)if(board[line[0]]&&line.every(i=>board[i]===board[line[0]]))return board[line[0]];return board.every(Boolean)?'draw':null}
export function bestMove(board){
 const cache=new Map();const score=(b,turn,depth=0)=>{const end=outcome(b);if(end)return end==='O'?10-depth:end==='X'?depth-10:0;const key=turn+b.join('.');if(cache.has(key))return cache.get(key);const values=b.flatMap((v,i)=>{if(v)return[];const next=b.slice();next[i]=turn;return[score(next,turn==='O'?'X':'O',depth+1)]});const value=turn==='O'?Math.max(...values):Math.min(...values);cache.set(key,value);return value};
 if(outcome(board))return -1;let move=-1,value=-Infinity;
 for(const i of[4,0,2,6,8,1,3,5,7])if(!board[i]){const next=board.slice();next[i]='O';const n=score(next,'X');if(n>value){value=n;move=i}}return move;
}
export function slide2048(board,direction){
 if(!['left','right','up','down'].includes(direction))throw Error('Invalid direction');
 const next=board.slice();let score=0;
 for(let line=0;line<4;line++){
  const ids=Array.from({length:4},(_,i)=>direction==='left'?line*4+i:direction==='right'?line*4+3-i:direction==='up'?i*4+line:(3-i)*4+line);
  const values=ids.map(i=>board[i]).filter(Boolean),merged=[];
  for(let i=0;i<values.length;i++){if(values[i]===values[i+1]){const n=values[i]*2;merged.push(n);score+=n;i++}else merged.push(values[i])}
  ids.forEach((id,i)=>next[id]=merged[i]||0);
 }
 return{board:next,score,changed:next.some((v,i)=>v!==board[i])};
}
export function spawnTile(board,random=Math.random){const empty=board.flatMap((v,i)=>v?[]:[i]),next=board.slice();if(empty.length)next[empty[Math.floor(random()*empty.length)]]=random()<.9?2:4;return next}
export function canMove2048(board){return ['left','right','up','down'].some(d=>slide2048(board,d).changed)}
export function shuffledPairs(random=Math.random){const deck=Array.from({length:16},(_,i)=>i%8);for(let i=deck.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]]}return deck}
export const vectors={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
export function foodFor(body,size=16,random=Math.random){const empty=Array.from({length:size*size},(_,i)=>[i%size,Math.floor(i/size)]).filter(p=>!body.some(q=>q[0]===p[0]&&q[1]===p[1]));return empty.length?empty[Math.floor(random()*empty.length)]:null}
export function stepSnake(state,direction,size=16,random=Math.random){
 if(state.over)return structuredClone(state);
 const prior=vectors[state.direction],requested=vectors[direction]?direction:state.direction,asked=vectors[requested],dir=asked[0]===-prior[0]&&asked[1]===-prior[1]?state.direction:requested;
 const v=vectors[dir]||prior,head=[state.body[0][0]+v[0],state.body[0][1]+v[1]],eat=!!state.food&&head[0]===state.food[0]&&head[1]===state.food[1];
 const occupied=eat?state.body:state.body.slice(0,-1);
 if(head.some(n=>n<0||n>=size)||occupied.some(p=>p[0]===head[0]&&p[1]===head[1]))return{...state,over:true};
 const body=[head,...state.body];if(!eat)body.pop();const food=eat?foodFor(body,size,random):state.food;
 return{body,food,direction:dir,score:state.score+(eat?1:0),over:!food,won:!food};
}

let reachableTTT;
export function validTicTacToe(board){
 if(!reachableTTT){reachableTTT=new Set();const visit=(b,turn)=>{const key=b.join('.');if(reachableTTT.has(key))return;reachableTTT.add(key);if(outcome(b))return;for(let i=0;i<9;i++)if(!b[i]){const next=b.slice();next[i]=turn;visit(next,turn==='X'?'O':'X')}};visit(Array(9).fill(''),'X')}
 return reachableTTT.has(board.join('.'));
}
