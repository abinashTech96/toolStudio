// Same-device play: direct matches where the rules support them, individual
// attempts at the same setting elsewhere. No network multiplayer is implied.
export const directGames=['ttt','connect4','reversi','ludo','memory','rps'];
export const challengeGames=['2048','snake','sudoku','mines','sliding','lights','code','hangman','scramble'];
export const modeChoices=id=>directGames.includes(id)
 ? [['solo',['memory'].includes(id)?'Solo':'Vs computer'],['two',id==='ludo'?'Local friends · pass & play':'Local friends · 2 players']]
 : [['solo','Solo'],['challenge','Local friends · 2-round challenge']];
export function localDescription(id,mode){
 if(mode==='two')return id==='memory'?'Take turns finding pairs. A match scores one point and keeps your turn; a miss passes the turn after both cards close.':id==='rps'?'Choose privately, pass the device, then reveal both hands together. First to three wins.':id==='ludo'?'Pass this device to the highlighted player. Choose two or four players.':'Take turns on this device. X starts; the computer is off. Difficulty only affects the computer.';
 if(mode==='challenge')return ['snake','2048'].includes(id)?'One attempt each on this device. Fewer hints wins first, then higher score. Use Finish round when ready.':'One puzzle each at the same setting; boards or words may differ. Completion wins first, then fewer hints and moves. Two unfinished attempts draw.';
 return id==='memory'?'Find every pair in as few turns as possible.':directGames.includes(id)?'Play against the computer. Adjust its options in Settings.':'Play at your own pace.';
}
export function memoryTurn(local,matched){return{turn:matched?local.turn:1-local.turn,scores:local.scores.map((n,i)=>n+(matched&&i===local.turn?1:0))}}
export const newChallenge=()=>({round:0,phase:'ready',results:[]});
export function challengeResult(id,state,won){
 let score=0;
 if(['2048','snake'].includes(id))score=state.score;
 if(id==='mines')score=state.revealed.length;
 if(id==='sudoku')score=state.board.filter(Boolean).length;
 if(id==='lights')score=state.board.filter(v=>!v).length;
 if(id==='sliding')score=state.board.filter((v,i)=>v===(i+1)%state.board.length).length;
 if(id==='code')score=Math.max(0,...state.history.map(r=>r.exact*5+r.misplaced));
 if(id==='hangman')score=state.guessed.length; // no unfinished-puzzle winner is awarded
 if(id==='scramble')score=state.picked.length;
 return{won:!!won,score,moves:state.moves,hints:state.hints};
}
// -1: Player 1; 1: Player 2; 0: draw. Unfinished puzzle attempts draw.
export function compareChallenge(id,a,b){
 if(!['snake','2048'].includes(id)){
  if(a.won!==b.won)return a.won?-1:1;
  if(!a.won)return 0;
 }
 if(a.hints!==b.hints)return Math.sign(a.hints-b.hints);
 if(['snake','2048'].includes(id))return Math.sign(b.score-a.score);
 return Math.sign(a.moves-b.moves);
}
export function completeChallenge(c,result){if(c.phase!=='playing')return c;const results=[...c.results,result];return{round:1,phase:results.length===2?'complete':'ready',results}}
