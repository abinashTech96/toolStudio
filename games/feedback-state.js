import {cleanPlayerName} from './match-support.js';
import {hangmanWon} from './arcade-rules.js';
import {codeWon} from './extras.js';
import {compareChallenge} from './local-play.js';
import {ludoSeats,ludoColors} from './ludo.js';
export function localFeedback({game,state,mode,end,thinking=false,challenge=null,rpsPhase='first',names=['Player 1','Player 2']}){
 names=names.map(cleanPlayerName);const [first,second]=names,local=mode==='two';let player=first,turnKey='0',active=!end&&!thinking,result=null;
 if(challenge){active=challenge.phase==='playing'&&!end;player=challenge.round?second:first;turnKey=String(challenge.round);if(challenge.phase==='complete'){const rank=compareChallenge(game,...challenge.results);result={key:'challenge',title:rank===0?'Challenge drawn!':(rank<0?first:second)+' wins the challenge!',detail:challenge.results.map((r,i)=>names[i]+': '+(['2048','snake'].includes(game)?r.score+' points':r.won?'completed in '+r.moves+' moves':'unfinished')+' · '+r.hints+' hints').join(' · ')};}return{active,player,turnKey,result};}
 if(['ttt','connect4'].includes(game)){const turn=state.board.filter(Boolean).length%2;turnKey=String(turn);player=turn?local?second:'Computer':first;active=active&&(local||turn===0);}
 if(game==='reversi'){turnKey=state.turn;player=state.turn==='X'?first:local?second:'Computer';active=active&&(local||state.turn==='X');}
 if(game==='memory'&&state.local){turnKey=String(state.local.turn);player=state.local.turn?second:first;active=active&&state.open.length!==2;}
 if(game==='ludo'){const seat=state.turn;turnKey=String(seat);player=local?(seat===0?first:seat===1?second:ludoColors[ludoSeats(state.players)[seat]]):seat===0?first:'Computer';active=active&&(local||seat===0);}
 if(game==='rps'&&local){turnKey=rpsPhase==='second'?'1':'0';player=rpsPhase==='second'?second:first;active=active&&['first','second'].includes(rpsPhase);}
 if(end){
  let title='Puzzle complete!',detail=state.moves+' moves · '+state.hints+' hints';
  if(['ttt','connect4','reversi','rps'].includes(game)){title=end==='draw'?'Match drawn!':(end==='X'?first:local?second:'Computer')+' wins!';detail=local?first+' vs '+second:end==='X'?'You won the match.':'The computer won this match.';}
  else if(game==='memory'&&state.local){const[a,b]=state.local.scores;title=a===b?'Match drawn!':(a>b?first:second)+' wins!';detail=first+': '+a+' pairs · '+second+': '+b+' pairs';}
  else if(game==='ludo'){title=(local?(state.winner===0?first:state.winner===1?second:ludoColors[ludoSeats(state.players)[state.winner]]):state.winner===0?first:'Computer')+' wins!';detail='All four tokens reached home.';}
  else if(game==='snake'||game==='2048'){title=game==='snake'&&state.won?'Board complete!':'Game over';detail='Score: '+state.score+' · '+state.moves+' moves';}
  else if(game==='mines'){title=state.won?'All safe squares found!':'Mine hit · Game over';}
  else if(game==='hangman'){title=hangmanWon(state)?'Word found!':'No guesses left';}
  else if(game==='code'){title=codeWon(state)?'Code cracked!':'No guesses left';}
  else if(game==='memory'){title='All pairs found!';}
  result={key:'finished',title,detail};
 }
 return{active,player,turnKey,result};
}
