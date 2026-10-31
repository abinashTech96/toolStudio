// Reuse matching cells rather than replacing a live board during a status update.
const handlers=['onclick','ondblclick','oncontextmenu','onchange','oninput','onpointerdown','onpointerup','onpointercancel','onkeydown'];
function same(a,b){return a.nodeType===b.nodeType&&(a.nodeType!==1||a.tagName===b.tagName&&a.namespaceURI===b.namespaceURI&&(!a.id&&!b.id||a.id===b.id));}
export function reconcileBoard(live,draft,root=true){
 const formValue=draft.value,formChecked=draft.checked;
 if(live.nodeType!==1){if(live.nodeValue!==draft.nodeValue)live.nodeValue=draft.nodeValue;return;}
 for(const a of [...live.attributes])if(!draft.hasAttribute(a.name))live.removeAttribute(a.name);
 for(const a of [...draft.attributes])if(live.getAttribute(a.name)!==a.value)live.setAttribute(a.name,a.value);
 if(!root)for(const key of handlers)live[key]=draft[key];
 const desired=[...draft.childNodes];for(let i=0;i<desired.length;i++){const next=desired[i],old=live.childNodes[i];if(old&&same(old,next))reconcileBoard(old,next,false);else if(old)live.replaceChild(next,old);else live.append(next);}while(live.childNodes.length>desired.length)live.lastChild.remove();
 if(!root&&['INPUT','SELECT','TEXTAREA'].includes(live.tagName)){if(live.value!==formValue)live.value=formValue;if('checked'in live)live.checked=formChecked;}
}
export function winningCells(game,board){
 if(!Array.isArray(board)||!['ttt','connect4'].includes(game))return[];const width=game==='ttt'?3:7,height=game==='ttt'?3:6,length=game==='ttt'?3:4,out=new Set();
 for(let i=0;i<board.length;i++)if(board[i])for(const[dx,dy]of[[1,0],[0,1],[1,1],[-1,1]]){const x=i%width,y=Math.floor(i/width);if(x+dx*(length-1)<0||x+dx*(length-1)>=width||y+dy*(length-1)>=height)continue;const cells=Array.from({length},(_,n)=>(y+dy*n)*width+x+dx*n);if(cells.every(j=>board[j]===board[i]))cells.forEach(j=>out.add(j));}return[...out];
}
export function explainBoard(board,{game,state,thinking=false,waiting=false,finished=false}={}){
 const explanations=new Set();let i=0;for(const b of board.querySelectorAll('button')){let reason='';const index=i++;
  if(b.disabled||b.getAttribute('aria-disabled')==='true'){
   reason=finished?'This match is complete.':thinking?'Wait while the computer finishes its move.':waiting?'Wait for your turn or the shared board to synchronize.':'';
   if(!reason&&game==='ttt')reason='This square is occupied.';
   if(!reason&&game==='connect4')reason=state?.board?.[index]?'This column is full.':'Wait for the current turn.';
   if(!reason&&game==='reversi')reason=state?.board?.[index]?'This square is occupied.':'A legal move must enclose and flip an opposing disc.';
   if(!reason&&game==='memory')reason=b.classList.contains('matched')?'This pair is already matched.':'Let the revealed cards close before choosing again.';
   if(!reason&&game==='ludo'){const token=Number(b.dataset.ludoToken??b.dataset.remoteAction?.replace('token','')),position=Number.isInteger(token)?state?.tokens?.[state.turn]?.[token]:undefined;reason=state?.die===null?'Roll before choosing a token.':position===57?'This token is already home.':position===-1&&state?.die!==6?'Roll six to leave the yard.':position>=0&&position+state?.die>57?'This token needs an exact roll to reach home.':'Finish the current die before rolling again.';}
   if(!reason)reason='This action is unavailable in the current game state.';
   b.title=reason;b.setAttribute('aria-description',reason);explanations.add(reason);
  }else if(b.hasAttribute('aria-description')){b.removeAttribute('aria-description');b.removeAttribute('title');}
 }
 return [...explanations].join(' ')||'Choose a legal move on your turn. Available controls are enabled.';
}
const strategies={ttt:['Look for a line you can complete or must defend.','Compare immediate wins, blocks and future forks.'],connect4:['Look for a threat near the last disc.','Compare forced wins, blocks and double threats.'],reversi:['Compare the moves around corners and edges.','Consider mobility and safe corners before disc count.'],sudoku:['Look for a constrained row, column or box.','Check singles, pairs and box-line candidate eliminations.'],mines:['Compare the numbers around covered squares.','Use visible clue constraints and the remaining mine count; flags are assumptions.'],ludo:['Compare your movable tokens.','Consider capture risk, safe squares, home progress and possible bonus turns.'],memory:['Recall cards you have already revealed.','Compare known pairs; the coach does not reveal unseen cards.'],hangman:['Look at the letters you already know.','Choose a missing letter; repeated letters count together.'],scramble:['Check the beginning of your current word.','Compare the first incorrect position while keeping duplicate tiles distinct.'],snake:['Look for room to escape.','Compare routes with the moving tail before chasing food.'],2048:['Keep space for the next random tile.','Compare ordered rows, corner tiles and possible spawns.'],sliding:['Check tiles near the empty square.','Compare legal paths and their distance from the goal.'],lights:['Look at the pattern around the lit cells.','Use the toggle relationships to reduce the remaining lights.'],code:['Compare your previous feedback.','Choose a guess that splits the remaining possibilities into smaller groups.'],rps:['Vary your earlier choices.','Past throws may reveal a pattern; this round cannot be predicted with certainty.']};
export function hintStage(game,info,stage){if(stage>=2)return info.text;return(strategies[game]||['Look for a legal next move.','Compare the available choices.'])[stage]+(stage===0?' Choose Explain hint for the strategy.':' Choose Show move for the precise suggestion.');}

// Non-cryptographic public-state diagnostic. Pairing/recovery authentication remains separate.
export function publicViewDigest(value){const canonical=v=>v===null||typeof v!=='object'?JSON.stringify(v):Array.isArray(v)?'['+v.map(canonical).join(',')+']':'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}';let a=2166136261,b=5381;for(const c of canonical(value)){a=Math.imul(a^c.charCodeAt(0),16777619)>>>0;b=(Math.imul(b,33)^c.charCodeAt(0))>>>0;}return a.toString(16).padStart(8,'0')+b.toString(16).padStart(8,'0');}
