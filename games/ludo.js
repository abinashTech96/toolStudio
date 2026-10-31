// Explicit local variant: six to leave yard; exact home; safe stars/start cells;
// no blockades; six/capture/home grants a bonus; third consecutive six forfeits.
export const ludoColors=['Red','Green','Yellow','Blue'];
export const safeCells=[0,8,13,21,26,34,39,47];
export const ludoFinish=57;
export const ludoSeats=players=>players===2?[0,2]:[0,1,2,3];
export const ludoCell=(s,p,t)=>(ludoSeats(s.players)[p]*13+s.tokens[p][t])%52;
export function createLudo(players=2){if(![2,4].includes(players))throw Error('Choose two or four players');return{players,tokens:Array.from({length:players},()=>Array(4).fill(-1)),turn:0,die:null,streak:0,winner:null,last:'Red starts. Roll a six to leave the yard.'}}
export function ludoMoves(s){if(s.die===null||s.winner!==null)return[];return s.tokens[s.turn].flatMap((v,i)=>v===-1?s.die===6?[i]:[]:v<ludoFinish&&v+s.die<=ludoFinish?[i]:[])}
const nextTurn=s=>({...s,turn:(s.turn+1)%s.players,die:null,streak:0});
export function rollLudo(state,die){if(state.die!==null||state.winner!==null)return null;if(!Number.isInteger(die)||die<1||die>6)throw Error('Invalid die');const name=ludoColors[ludoSeats(state.players)[state.turn]],s={...state,die,streak:die===6?state.streak+1:0,last:name+' rolled '+die+'. Choose a highlighted token.'};
 if(s.streak===3)return{...nextTurn(s),last:name+' rolled three consecutive sixes. Turn passes.'};
 if(!ludoMoves(s).length){if(die===6)return{...s,die:null,last:name+' has no legal move. Six grants another roll.'};return{...nextTurn(s),last:name+' has no legal move. Turn passes.'}}return s;
}
export function moveLudo(state,token){if(!ludoMoves(state).includes(token))return null;const s=structuredClone(state),p=s.turn,old=s.tokens[p][token],position=old===-1?0:old+s.die;s.tokens[p][token]=position;let captured=0;
 if(position<=50){const target=ludoCell(s,p,token);if(!safeCells.includes(target))for(let other=0;other<s.players;other++)if(other!==p)for(let t=0;t<4;t++)if(s.tokens[other][t]>=0&&s.tokens[other][t]<=50&&ludoCell(s,other,t)===target){s.tokens[other][t]=-1;captured++}}
 const name=ludoColors[ludoSeats(s.players)[p]],home=position===ludoFinish,bonus=s.die===6||captured>0||home;
 s.last=name+' moved token '+(token+1)+(home?' home':old===-1?' out of the yard':' by '+s.die)+(captured?' and captured '+captured+' token'+(captured===1?'':'s'):'')+'.';
 if(s.tokens[p].every(v=>v===ludoFinish)){s.winner=p;s.die=null;s.streak=0;s.last=name+' wins! All four tokens are home.';return s}
 s.die=null;if(!bonus){s.turn=(p+1)%s.players;s.streak=0}else s.last+=' Bonus roll.';return s;
}
function ludoValue(s,root){
 if(s.winner!==null)return s.winner===root?1e7:-1e7;
 let value=0;for(let p=0;p<s.players;p++){let score=0;for(let t=0;t<4;t++){const progress=s.tokens[p][t];score+=progress<0?-35:progress===57?420:progress*2+(progress>=51?110:0);if(progress>=0&&progress<=50){const cell=ludoCell(s,p,t);if(safeCells.includes(cell))score+=35;else for(let other=0;other<s.players;other++)if(other!==p)for(let i=0;i<4;i++){const from=s.tokens[other][i];if(from<0||from>50)continue;const distance=(cell-ludoCell(s,other,i)+52)%52;if(distance>0&&distance<=6&&from+distance<=50)score-=(35+progress)/6;}}}value+=(p===root?1:-1/Math.max(1,s.players-1))*score;}return value;
}
export function chooseLudo(s,level='medium',random=Math.random){
 const moves=ludoMoves(s);if(!moves.length)return -1;if(level==='easy')return moves[Math.floor(random()*moves.length)];
 const root=s.turn;let choice=moves[0],best=-Infinity;for(const token of moves){const n=moveLudo(s,token),score=ludoValue(n,root);if(score>best){best=score;choice=token;}}
 if(level!=='hard')return choice;
 let nodes=0;const stop=Symbol('budget');
 function expected(board,depth){if(++nodes>1400)throw stop;if(!depth||board.winner!==null)return ludoValue(board,root);let total=0;for(let die=1;die<=6;die++){const rolled=rollLudo(board,die),legal=ludoMoves(rolled);if(!legal.length){total+=expected(rolled,depth-1)/6;continue;}let rank=rolled.turn===root?-Infinity:Infinity;for(const token of legal){const value=expected(moveLudo(rolled,token),depth-1);rank=rolled.turn===root?Math.max(rank,value):Math.min(rank,value);}total+=rank/6;}return total;}
 for(let depth=1;depth<=2;depth++){let candidate=choice,score=-Infinity;try{for(const token of moves){const value=expected(moveLudo(s,token),depth);if(value>score){score=value;candidate=token;}}choice=candidate;}catch(e){if(e!==stop)throw e;break;}}
 return choice;
}

export function ludoHint(s){if(s.die===null)return{text:'Roll first. The coach never predicts the next die.',token:-1};const token=chooseLudo(s,'hard');return{token,text:token<0?'There is no legal token move.':'Try token '+(token+1)+'. Bounded expected-roll analysis weighs captures, safe squares, home progress and bonus turns across possible future dice. Future rolls remain random.'}}
