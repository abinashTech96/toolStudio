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
export function chooseLudo(s,level='medium',random=Math.random){const moves=ludoMoves(s);if(!moves.length)return-1;if(level==='easy')return moves[Math.floor(random()*moves.length)];let best=-Infinity,choice=moves[0];for(const token of moves){const n=moveLudo(s,token),position=n.tokens[s.turn][token],captures=n.tokens.reduce((count,a,p)=>count+(p===s.turn?0:a.filter((v,i)=>v===-1&&s.tokens[p][i]!==-1).length),0);let score=(position===57?500:position>=51?90:position)*2+captures*220+(s.tokens[s.turn][token]===-1?35:0);
 if(level==='hard'&&position>=0&&position<=50){const target=ludoCell(n,s.turn,token);if(safeCells.includes(target))score+=60;else for(let p=0;p<s.players;p++)if(p!==s.turn)for(let t=0;t<4;t++)if(n.tokens[p][t]>=0&&n.tokens[p][t]<=50){const distance=(target-ludoCell(n,p,t)+52)%52;if(distance>0&&distance<=6&&n.tokens[p][t]+distance<=50)score-=45}}
 if(score>best){best=score;choice=token}}return choice;
}
export function ludoHint(s){if(s.die===null)return{text:'Roll first. The coach never predicts the next die.',token:-1};const token=chooseLudo(s,'hard');return{token,text:token<0?'There is no legal token move.':'Try token '+(token+1)+'. The coach weighs captures, safe squares, home progress and nearby threats; future dice remain random.'}}
