import {ludoSeats,ludoColors,ludoCell,safeCells} from './ludo.js';
const quarter=[[1,6],[2,6],[3,6],[4,6],[5,6],[6,5],[6,4],[6,3],[6,2],[6,1],[6,0],[7,0],[8,0]];
export function rotateCell([x,y],turns){for(let i=0;i<turns;i++)[x,y]=[14-y,x];return[x,y]}
export const ludoTrack=Array.from({length:4},(_,p)=>quarter.map(c=>rotateCell(c,p))).flat();
const paint=['#aa3c42','#276a4b','#8b6418','#315f9b'];
export function drawLudo(s){
 const ns='http://www.w3.org/2000/svg';function el(tag,attrs,text){const n=document.createElementNS(ns,tag);for(const[k,v]of Object.entries(attrs||{}))n.setAttribute(k,String(v));if(text!==undefined)n.textContent=text;return n}
 const svg=el('svg',{viewBox:'0 0 450 450',class:'ludo-visual','aria-hidden':'true'}),size=30;
 function rect(x,y,w,h,fill,rx=0){svg.append(el('rect',{x:x*size,y:y*size,width:w*size,height:h*size,fill,rx,stroke:'#879c8b','stroke-width':.6}))}
 for(let p=0;p<4;p++){const [x,y]=rotateCell([0,0],p),left=x===14?9:0,top=y===14?9:0;rect(left,top,6,6,paint[p],12);rect(left+.7,top+.7,4.6,4.6,'#fafbf5',10);svg.append(el('text',{x:(left+3)*size,y:(top+.35)*size,style:'fill:white;font-size:9px'},ludoColors[p]))}
 for(let i=0;i<ludoTrack.length;i++){const[x,y]=ludoTrack[i];rect(x,y,1,1,i%13===0?paint[Math.floor(i/13)]:'#fcfbf3');if(safeCells.includes(i))svg.append(el('text',{x:(x+.5)*size,y:(y+.5)*size,style:'font-size:18px;fill:'+ (i%13===0?'#fff':'#526b61')},'☆'))}
 for(let p=0;p<4;p++)for(let step=1;step<=6;step++){const[x,y]=rotateCell([step,7],p);rect(x,y,1,1,paint[p]);}
 rect(6,6,3,3,'#e2eade');svg.lastElementChild.dataset.ludoHome50='true';svg.append(el('text',{x:225,y:225,style:'font-size:13px'},s.die===null?'HOME':'⚄ '+s.die));
 const groups=new Map(),seats=ludoSeats(s.players);
 for(let player=0;player<s.players;player++)for(let token=0;token<4;token++){
  const progress=s.tokens[player][token],color=seats[player];let xy;
  if(progress===-1)xy=rotateCell([token%2?4:2,token<2?2:4],color);
  else if(progress<=50)xy=ludoTrack[ludoCell(s,player,token)];
  else if(progress<57)xy=rotateCell([progress-50,7],color);
  else continue;
  const key=xy.join(',');if(!groups.has(key))groups.set(key,[]);groups.get(key).push({player,color,token,xy});
 }
 for(const group of groups.values())for(let index=0;index<group.length;index++){
  const {xy,color,token,player}=group[index],spread=group.length>1?.2:0,x=(xy[0]+.5+(index%2?spread:-spread))*size,y=(xy[1]+.5+(index>1?spread:-spread))*size,r=group.length>1?8:11;
  svg.append(el('circle',{cx:x,cy:y,r,fill:paint[color],stroke:'#fff','stroke-width':1.8,'data-ludo-player':player,'data-ludo-token':token}));svg.append(el('text',{x,y,class:'token-text',style:'font-size:'+(group.length>1?7:10)+'px'},ludoColors[color][0]+(token+1)));
 }
 return svg;
}
