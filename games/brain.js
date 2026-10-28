import{bestMove,outcome,slide2048,stepSnake,vectors}from'./engines.js';
export const gameIds=['2048','snake','memory','ttt','sudoku','mines','connect4','reversi','sliding','lights','code','rps','hangman','scramble','ludo'];
export function shuffle(values,random=Math.random){const a=values.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
export function memoryDeck(pairs=8,random=Math.random){return shuffle(Array.from({length:pairs*2},(_,i)=>i%pairs),random)}
export function memoryHint(state){const known=Object.entries(state.seen).filter(([i])=>!state.matched.includes(Number(i)));for(const[i,v]of known){const pair=known.find(([j,w])=>j!==i&&w===v);if(pair)return{cells:[Number(i),Number(pair[0])],text:'You have seen a matching pair. Try the highlighted cards.'}}return{cells:[],text:'No remembered pair yet. Reveal an unseen card and remember its position.'}}
export function tttMove(board,level='hard',random=Math.random,player='O'){
 const b=player==='O'?board:board.map(v=>v==='X'?'O':v==='O'?'X':'');
 const empty=b.flatMap((v,i)=>v?[]:[i]);if(!empty.length||outcome(b))return -1;
 if(level==='hard')return bestMove(b);
 if(level==='medium'){for(const mark of['O','X'])for(const i of empty){const n=b.slice();n[i]=mark;if(outcome(n)===mark)return i}if(!b[4])return 4}
 return empty[Math.floor(random()*empty.length)];
}
function tileValue(b){let score=b.filter(v=>!v).length*240,max=Math.max(...b);const logs=b.map(v=>v?Math.log2(v):0);if([0,3,12,15].some(i=>b[i]===max))score+=Math.log2(max||1)*90;
 for(let r=0;r<4;r++){for(const line of[logs.slice(r*4,r*4+4),[0,1,2,3].map(c=>logs[c*4+r])]){let up=0,down=0;for(let i=0;i<3;i++){up+=Math.max(0,line[i]-line[i+1]);down+=Math.max(0,line[i+1]-line[i])}score-=Math.min(up,down)*25}}
 return score;
}
export function hint2048(board){
 let choice=null,value=-Infinity;
 for(const dir of['left','up','right','down']){const move=slide2048(board,dir);if(!move.changed)continue;const empty=move.board.flatMap((v,i)=>v?[]:[i]);let expected=0;
 for(const i of empty){for(const[t,p]of[[2,.9],[4,.1]]){const b=move.board.slice();b[i]=t;let best=-1e6;for(const d of['left','up','right','down']){const n=slide2048(b,d);if(n.changed)best=Math.max(best,tileValue(n.board)+n.score)}expected+=p*best/empty.length}}
 const rank=(empty.length?expected:tileValue(move.board))+move.score;if(rank>value){value=rank;choice=dir}}
 return{direction:choice,text:choice?'Try '+choice+'. This two-move estimate favors empty space, ordered rows and a large corner tile. Random spawns can change the result.':'No legal moves remain.'};
}
function reachable(body,size){const seen=new Set(),queue=[body[0]],walls=new Set(body.slice(1).map(p=>p.join(',')));for(let at=0;at<queue.length;at++){const[x,y]=queue[at],k=x+','+y;if(seen.has(k)||walls.has(k)||x<0||y<0||x>=size||y>=size)continue;seen.add(k);for(const[dx,dy]of Object.values(vectors))queue.push([x+dx,y+dy])}return seen.size}
export function snakeHint(state,size=16){let best=null,rank=-Infinity;for(const dir of Object.keys(vectors)){const a=vectors[state.direction],v=vectors[dir];if(v[0]===-a[0]&&v[1]===-a[1])continue;const next=stepSnake(state,dir,size,()=>0);if(next.over&&!next.won)continue;const area=reachable(next.body,size),distance=state.food?Math.abs(next.body[0][0]-state.food[0])+Math.abs(next.body[0][1]-state.food[1]):0;const exits=Object.keys(vectors).filter(d=>{const n=stepSnake(next,d,size,()=>0);return !n.over||n.won}).length;const score=area*20-distance+(next.score>state.score?10:0)+exits*12-(area<next.body.length?10000:0);if(score>rank){rank=score;best=dir}}
 return{direction:best,text:best?'Try '+best+'. It checks immediate collisions, next-step exits and whether the open area can hold your body before favoring nearby food. Future safety is not guaranteed.':'No safe next step was found.'};
}
export function sudokuCandidates(board,i){if(board[i])return[];const row=Math.floor(i/9),col=i%9,used=new Set();for(let j=0;j<81;j++)if(Math.floor(j/9)===row||j%9===col||Math.floor(j/27)===Math.floor(row/3)&&Math.floor(j%9/3)===Math.floor(col/3))used.add(board[j]);return[1,2,3,4,5,6,7,8,9].filter(v=>!used.has(v))}
export function sudokuConflicts(board){const bad=new Set();for(let i=0;i<81;i++)if(board[i])for(let j=i+1;j<81;j++)if(board[i]===board[j]&&(Math.floor(i/9)===Math.floor(j/9)||i%9===j%9||Math.floor(i/27)===Math.floor(j/27)&&Math.floor(i%9/3)===Math.floor(j%9/3))){bad.add(i);bad.add(j)}return[...bad]}
const sudokuCache=new Map();
export function solveSudoku(input,limit=1){const key=limit+':'+input.join(',');if(sudokuCache.has(key))return structuredClone(sudokuCache.get(key));const result=solveSudokuUncached(input,limit);if(!result.exhausted){sudokuCache.set(key,structuredClone(result));if(sudokuCache.size>64)sudokuCache.delete(sudokuCache.keys().next().value)}return result}
function solveSudokuUncached(input,limit=1){if(input.length!==81||sudokuConflicts(input).length)return{count:0,solution:null};const b=input.slice();let count=0,solution=null,nodes=0,exhausted=false;
 function visit(){if(++nodes>250000){exhausted=true;return;}let id=-1,choices;for(let i=0;i<81;i++)if(!b[i]){const c=sudokuCandidates(b,i);if(!c.length)return;if(!choices||c.length<choices.length){id=i;choices=c;if(c.length===1)break}}if(id<0){count++;solution??=b.slice();return}for(const v of choices){b[id]=v;visit();if(count>=limit)break}b[id]=0}visit();return{count:exhausted?limit:count,solution,exhausted};
}
export function createSudoku(level='medium',random=Math.random){const group=()=>shuffle([0,1,2],random),rows=group().flatMap(g=>group().map(r=>g*3+r)),cols=group().flatMap(g=>group().map(c=>g*3+c)),digits=shuffle([1,2,3,4,5,6,7,8,9],random);
 const solution=rows.flatMap(r=>cols.map(c=>digits[(r*3+Math.floor(r/3)+c)%9])),givens=solution.slice(),target={easy:44,medium:36,hard:30}[level]||36;
 for(const i of shuffle(Array.from({length:81},(_,i)=>i),random)){if(givens.filter(Boolean).length<=target)break;const v=givens[i];givens[i]=0;if(solveSudoku(givens,2).count!==1)givens[i]=v}
 return{givens,board:givens.slice(),notes:Array(81).fill(0),selected:givens.findIndex(v=>!v),noteMode:false,hints:0,completed:false};
}
export function sudokuHint(state){const bad=sudokuConflicts(state.board);if(bad.length)return{cell:bad[0],value:0,text:'Resolve the highlighted row, column or box conflict first.'};const solved=solveSudoku(state.givens).solution;if(!solved)return{cell:-1,text:'This puzzle has no valid solution.'};const wrong=state.board.findIndex((v,i)=>v&&v!==solved[i]);if(wrong>=0)return{cell:wrong,value:0,text:'Lookahead found an incorrect entry. Clear the highlighted cell before continuing.'};
 for(let i=0;i<81;i++)if(!state.board[i]){const c=sudokuCandidates(state.board,i);if(c.length===1)return{cell:i,value:c[0],text:'Only '+c[0]+' fits row '+(Math.floor(i/9)+1)+', column '+(i%9+1)+'.'}}
 const units=[...Array.from({length:9},(_,r)=>Array.from({length:9},(_,c)=>r*9+c)),...Array.from({length:9},(_,c)=>Array.from({length:9},(_,r)=>r*9+c)),...Array.from({length:9},(_,b)=>Array.from({length:9},(_,i)=>(Math.floor(b/3)*3+Math.floor(i/3))*9+(b%3)*3+i%3))];
 for(const unit of units)for(let value=1;value<=9;value++){if(unit.some(i=>state.board[i]===value))continue;const cells=unit.filter(i=>!state.board[i]&&sudokuCandidates(state.board,i).includes(value));if(cells.length===1)return{cell:cells[0],value,text:'Only this cell can hold '+value+' in its row, column or box (a hidden single).'}}
 const i=state.board.findIndex(v=>!v);return i<0?{cell:-1,text:'Puzzle complete.'}:{cell:i,value:solved[i],text:'Solver lookahead suggests '+solved[i]+' at row '+(Math.floor(i/9)+1)+', column '+(i%9+1)+'. Use Place hint to apply it.'};
}
export function mineNeighbors(i,size){const r=Math.floor(i/size),c=i%size,a=[];for(let y=-1;y<=1;y++)for(let x=-1;x<=1;x++)if((x||y)&&r+y>=0&&c+x>=0&&r+y<size&&c+x<size)a.push((r+y)*size+c+x);return a}
export function createMines(level='easy'){const[size,mines]={easy:[9,10],medium:[12,24],hard:[16,40]}[level]||[9,10];return{size,mines,bombs:null,revealed:[],flags:[],over:false,won:false,hints:0}}
export function revealMine(state,id,random=Math.random){const s=structuredClone(state),n=s.size*s.size;if(!Number.isInteger(id)||id<0||id>=n||s.over||s.flags.includes(id)||s.revealed.includes(id))return s;
 if(!s.bombs){const safe=new Set([id,...mineNeighbors(id,s.size)]);s.bombs=shuffle(Array.from({length:n},(_,i)=>i).filter(i=>!safe.has(i)),random).slice(0,s.mines)}
 if(s.bombs.includes(id)){s.over=true;return s}const shown=new Set(s.revealed),queue=[id];for(let at=0;at<queue.length;at++){const i=queue[at];if(shown.has(i)||s.flags.includes(i)||s.bombs.includes(i))continue;shown.add(i);if(!mineNeighbors(i,s.size).some(j=>s.bombs.includes(j)))queue.push(...mineNeighbors(i,s.size))}s.revealed=[...shown];s.won=s.revealed.length===n-s.mines;s.over=s.won;return s;
}
export function mineHint(state){
 if(!state.bombs)return{cell:-1,text:'Choose any square. Your first square and its neighbors are protected.'};
 const constraints=[];
 for(const source of state.revealed){
  const neighbors=mineNeighbors(source,state.size),count=neighbors.filter(j=>state.bombs.includes(j)).length,flags=neighbors.filter(j=>state.flags.includes(j)).length,cells=neighbors.filter(j=>!state.revealed.includes(j)&&!state.flags.includes(j)),remaining=count-flags;
  if(remaining<0||remaining>cells.length)return{cell:source,text:'The visible numbers disagree with nearby flags. Recheck your flags before asking for a deduction.'};
  if(!cells.length)continue;
  constraints.push({source,cells,remaining});
 }
 for(const {source,cells,remaining}of constraints){
  if(remaining===0)return{cell:cells[0],action:'reveal',text:'Assuming your flags are correct, every covered neighbor of this numbered square is safe.',source};
  if(remaining===cells.length)return{cell:cells[0],action:'flag',text:'The remaining mine count equals the covered neighbors. Assuming earlier flags are correct, this square is a mine.',source};
 }
 for(const a of constraints)for(const b of constraints){
  if(a.cells.length>=b.cells.length||!a.cells.every(i=>b.cells.includes(i)))continue;
  const extra=b.cells.filter(i=>!a.cells.includes(i)),remaining=b.remaining-a.remaining;
  if(remaining===0||remaining===extra.length)return{cell:extra[0],action:remaining===0?'reveal':'flag',source:b.source,text:'Comparing two overlapping visible clues (subset subtraction), this square is '+(remaining===0?'safe':'a mine')+' if your existing flags are correct.'};
 }
 return{cell:-1,text:'No forced move is visible from the current numbers and flags. The coach does not inspect hidden squares.'};
}

export function connectWinner(board){for(let i=0;i<42;i++)if(board[i])for(const[dx,dy]of[[1,0],[0,1],[1,1],[-1,1]]){const x=i%7,y=Math.floor(i/7);if(x+dx*3<0||x+dx*3>=7||y+dy*3>=6)continue;if([1,2,3].every(n=>board[(y+dy*n)*7+x+dx*n]===board[i]))return board[i]}return board.every(Boolean)?'draw':null}
export function dropDisc(board,column,player){if(!Number.isInteger(column)||column<0||column>6||connectWinner(board))return null;for(let row=5;row>=0;row--)if(!board[row*7+column]){const next=board.slice();next[row*7+column]=player;return next}return null}
function connectScore(b){let score=0;for(let r=0;r<6;r++)score+=b[r*7+3]==='O'?5:b[r*7+3]==='X'?-5:0;for(let i=0;i<42;i++)for(const[dx,dy]of[[1,0],[0,1],[1,1],[-1,1]]){const x=i%7,y=Math.floor(i/7);if(x+dx*3<0||x+dx*3>=7||y+dy*3>=6)continue;const a=[0,1,2,3].map(n=>b[(y+dy*n)*7+x+dx*n]),o=a.filter(v=>v==='O').length,p=a.filter(v=>v==='X').length;if(!p)score+=[0,1,8,70,10000][o];if(!o)score-=[0,1,10,90,10000][p]}return score}
export function connectMove(board,level='medium',random=Math.random,player='O'){
 const b=player==='O'?board:board.map(v=>v==='O'?'X':v==='X'?'O':''),order=[3,2,4,1,5,0,6],legal=order.filter(c=>dropDisc(b,c,'O'));
 if(!legal.length)return -1;
 for(const mark of ['O','X'])for(const c of legal)if(connectWinner(dropDisc(b,c,mark))===mark)return c;
 if(level==='easy')return legal[Math.floor(random()*legal.length)];
 let nodes=0,choice=legal[0];const exhausted=Symbol('budget'),cache=new Map();
 function search(position,depth,turn,alpha,beta){
  if(++nodes>35000)throw exhausted;
  const end=connectWinner(position);if(end)return end==='O'?100000+depth:end==='X'?-100000-depth:0;
  if(!depth)return connectScore(position);
  const key=turn+depth+position.join('.');if(cache.has(key))return cache.get(key);
  const initialAlpha=alpha,initialBeta=beta,max=turn==='O';let value=max?-Infinity:Infinity,cut=false;
  // Search winning continuations first; center remains the deterministic tie-break.
  const moves=order.flatMap(c=>{const next=dropDisc(position,c,turn);return next?[{c,next,win:connectWinner(next)===turn}]:[]}).sort((a,b)=>Number(b.win)-Number(a.win));
  for(const {next}of moves){const rank=search(next,depth-1,max?'X':'O',alpha,beta);value=max?Math.max(value,rank):Math.min(value,rank);if(max)alpha=Math.max(alpha,value);else beta=Math.min(beta,value);if(beta<=alpha){cut=true;break}}
  // A cutoff is a bound, not an exact transposition value.
  if(!cut&&value>initialAlpha&&value<initialBeta)cache.set(key,value);return value;
 }
 for(let depth=1;depth<=(level==='hard'?6:3);depth++){
  let value=-Infinity,next=choice;
  try{for(const c of legal){const rank=search(dropDisc(b,c,'O'),depth-1,'X',-Infinity,Infinity);if(rank>value){value=rank;next=c}}choice=next}
  catch(error){if(error!==exhausted)throw error;break}
 }
 return choice;
}

export function pruneSudokuNotes(board,notes){return notes.map((mask,i)=>board[i]?0:mask&sudokuCandidates(board,i).reduce((n,v)=>n|(1<<(v-1)),0))}
export function chordMine(state,cell){if(state.over||!state.bombs||!state.revealed.includes(cell))return structuredClone(state);const neighbors=mineNeighbors(cell,state.size),count=neighbors.filter(i=>state.bombs.includes(i)).length;if(!count||neighbors.filter(i=>state.flags.includes(i)).length!==count)return structuredClone(state);let next=state;for(const i of neighbors){if(next.over)break;if(!next.revealed.includes(i)&&!next.flags.includes(i))next=revealMine(next,i)}return structuredClone(next)}
