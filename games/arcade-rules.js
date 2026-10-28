import {words} from './word-bank.js';
export const hands=['rock','paper','scissors'];
export function rpsResult(human,computer){if(!hands.includes(human)||!hands.includes(computer))throw Error('Choose a valid hand');return human===computer?'draw':hands[(hands.indexOf(computer)+1)%3]===human?'X':'O'}
export function rpsScores(history){return history.reduce((a,r)=>{a[rpsResult(r.human,r.computer)]++;return a},{X:0,O:0,draw:0})}
export function rpsOutcome(s){const scores=rpsScores(s.history);return scores.X>=3?'X':scores.O>=3?'O':s.history.length>=100?'draw':null}
export function rpsComputer(history,level='medium',random=Math.random){
 if(level!=='hard'||history.length<3||random()<.3)return hands[Math.floor(random()*3)];
 const recent=history.slice(-8),last=recent.at(-1)?.human,following=recent.slice(0,-1).flatMap((r,i)=>r.human===last?[recent[i+1].human]:[]);
 const count=hands.map(h=>recent.filter(r=>r.human===h).length+following.filter(v=>v===h).length),highest=Math.max(...count),likely=hands.filter((_,i)=>count[i]===highest);
 return hands[(hands.indexOf(likely[Math.floor(random()*likely.length)])+1)%3];
}
export const createRPS=()=>({history:[]});
export function playRPS(s,human,level='medium',random=Math.random){if(rpsOutcome(s))return null;const computer=rpsComputer(s.history,level,random);rpsResult(human,computer);return{history:[...s.history,{human,computer}]}}
export function wordPool(level){return words.flatMap((r,i)=>(level==='easy'?r.word.length<=5:level==='hard'?r.word.length>=8:r.word.length>=6&&r.word.length<=7)?[i]:[])}
function chooseWord(level,random,exclude=-1){const pool=wordPool(level).filter(i=>i!==exclude);return pool[Math.floor(random()*pool.length)]}
export function createHangman(level='medium',random=Math.random,exclude=-1){return{wordIndex:chooseWord(level,random,exclude),guessed:[],limit:{easy:8,medium:7,hard:6}[level]}}
export const hangmanWrong=s=>s.guessed.filter(c=>!words[s.wordIndex].word.includes(c)).length;
export const hangmanWon=s=>[...words[s.wordIndex].word].every(c=>s.guessed.includes(c));
export const hangmanOver=s=>hangmanWon(s)||hangmanWrong(s)>=s.limit;
export function guessLetter(s,letter){const c=String(letter).toUpperCase();if(hangmanOver(s)||!/^[A-Z]$/.test(c)||s.guessed.includes(c))return null;return{...s,guessed:[...s.guessed,c]}}
export function hangmanHint(s){const word=words[s.wordIndex].word,missing=[...new Set(word)].filter(c=>!s.guessed.includes(c));missing.sort((a,b)=>[...word].filter(c=>c===b).length-[...word].filter(c=>c===a).length);const letter=missing[0];return{letter,text:letter?'Try the letter '+letter+'. It appears in the hidden word; using this reveal counts as assistance.':'Every letter has already been found.'}}
export function shuffleWord(word,random=Math.random){const order=Array.from({length:word.length},(_,i)=>i);for(let i=order.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[order[i],order[j]]=[order[j],order[i]]}if(order.map(i=>word[i]).join('')===word)order.push(order.shift());return order}
export function createScramble(level='medium',random=Math.random,exclude=-1){const wordIndex=chooseWord(level,random,exclude);return{wordIndex,order:shuffleWord(words[wordIndex].word,random),picked:[],completed:false}}
export const scrambleText=s=>s.picked.map(i=>words[s.wordIndex].word[i]).join('');
export function checkScramble(s){if(s.completed||s.picked.length!==words[s.wordIndex].word.length)return null;return{...s,completed:scrambleText(s)===words[s.wordIndex].word}}
export function scrambleHint(s){const word=words[s.wordIndex].word,guess=scrambleText(s);let index=0;while(index<guess.length&&guess[index]===word[index])index++;return{index,letter:word[index],text:index<word.length?'Position '+(index+1)+' should be '+word[index]+'. Place hint keeps a correct prefix and adds this letter.':'The letters are in order. Check your word to finish.'}}
