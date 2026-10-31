import {installMoveConfirmation} from './move-confirmation.js';
import {reconcileBoard,explainBoard,hintStage} from './board-ui.js';
import {rateSudoku} from './reasoning.js';
import {installPlayFeedback} from './play-feedback.js';
import {localFeedback} from './feedback-state.js';
import {installRemotePlay} from './remote-play.js';
import {directGames,challengeGames,modeChoices,localDescription,memoryTurn,newChallenge,challengeResult,compareChallenge,completeChallenge} from './local-play.js';
import {installLibrary} from './library.js';
import {arcadeInfo} from './catalog.js';
import {words} from './word-bank.js';
import {hands,createRPS,playRPS,rpsScores,rpsOutcome,createHangman,guessLetter,hangmanWrong,hangmanWon,hangmanOver,hangmanHint,createScramble,shuffleWord,scrambleText,checkScramble,scrambleHint} from './arcade-rules.js';
import {createLudo,rollLudo,moveLudo,ludoMoves,ludoSeats,ludoColors,ludoCell,chooseLudo,ludoHint} from './ludo.js';
import {drawLudo} from './ludo-view.js';
import {extraInfo,createReversi,reversiMoves,reversiFlips,reversiOutcome,playReversi,createSliding,slidingSolved,slidingNeighbors,slidePuzzle,createLights,toggleLights,lightsHint,createCode,codeOver,codeWon,submitCode} from './extras.js';
import {analyse,cancelAnalysis} from './analysis.js';
import{outcome,slide2048,spawnTile,canMove2048,foodFor,stepSnake,vectors}from'./engines.js';
import{pruneSudokuNotes,chordMine,gameIds,memoryDeck,memoryHint,tttMove,hint2048,snakeHint,createSudoku,sudokuConflicts,sudokuHint,createMines,revealMine,mineNeighbors,mineHint,connectWinner,dropDisc,connectMove}from'./brain.js';
import{SAVE_KEY,defaults,loadProfile,writeProfile}from'./saves.js';
const $=id=>document.getElementById(id),status=$('gameStatus'),picker=$('gamePicker');let board=$('board');let hintStep=0;
const symbols=['●','▲','■','◆','★','☂','♜','☀','♥','☾','✿','✦'],names=['circle','triangle','square','diamond','star','umbrella','rook','sun','heart','moon','flower','sparkle'];
let remoteGames,feedback,moveConfirm;const feedbackRuns=new Map();
let loaded;try{loaded=loadProfile(localStorage)}catch{loaded={profile:defaults(),error:'Browser storage is unavailable. Games still work in this tab.'}}
let profile=loaded.profile,saveError=loaded.error,game=profile.enabled?profile.active:'2048',state,timer=null,memoryTimer=null,persistTimer=null,pending=null,running=false,origin=null,hintInfo=null,flagMode=false;
const sessions=structuredClone(profile.saves);let arcadeShell,ludoTimer=null,wordNotice='',rpsChoice=null,rpsPhase='first';
const challenge=()=>settings().mode==='challenge'?profile.challenges?.[game]:null;
const blocked=()=>!!challenge()&&challenge().phase!=='playing';
function node(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n}
function button(text,run,label){const b=node('button',text);b.type='button';b.onclick=run;if(label)b.setAttribute('aria-label',label);return b}
function settings(id=game){return profile.settings[id]||{level:id==='ttt'?'hard':id==='mines'?'easy':'medium',mode:'solo'}}
function meta(s){return{...s,moves:0,hints:0,credited:false}}
function ended(){if(!state)return true;if(game==='rps')return rpsOutcome(state);if(game==='hangman')return hangmanOver(state);if(game==='scramble')return state.completed;if(game==='ludo')return state.winner===null?null:'player'+state.winner;if(game==='2048')return!canMove2048(state.board);if(game==='ttt')return outcome(state.board);if(game==='connect4')return connectWinner(state.board);if(game==='memory')return state.matched.length===state.deck.length;if(game==='sudoku')return state.completed;if(game==='reversi')return reversiOutcome(state.board);if(game==='sliding')return slidingSolved(state.board);if(game==='lights')return !state.board.some(Boolean);if(game==='code')return codeOver(state);return state.over}
function setStatus(text){if(status.textContent!==text)status.textContent=text}
function saveNow(){clearTimeout(persistTimer);persistTimer=null;if(!profile.enabled||saveError)return;if(state)sessions[game]=structuredClone(state);if(game==='memory'&&state?.local&&state.open.length===2){sessions[game].open=[];sessions[game].local=memoryTurn(state.local,false)}profile.saves=structuredClone(sessions);profile.active=game;try{writeProfile(localStorage,profile);$('saveStatus').textContent='Progress and bests saved on this device. Snake resumes paused.'}catch{saveError='Could not save Games progress. Your current game is still playable; storage may be unavailable or full.';$('saveStatus').textContent=saveError}}
function saveSoon(){if(profile.enabled&&!persistTimer)persistTimer=setTimeout(saveNow,600)}
let analysisEpoch=0,thinking=false,analysisFailure='';
function stop(){moveConfirm?.cancel();rpsChoice=null;rpsPhase='first';clearTimeout(ludoTimer);ludoTimer=null;analysisEpoch++;thinking=false;analysisFailure='';cancelAnalysis();clearInterval(timer);clearTimeout(memoryTimer);timer=null;memoryTimer=null;running=false;pending=null}
function directions(action){const pad=node('div',undefined,'dpad');for(const[d,s]of[['up','↑'],['left','←'],['down','↓'],['right','→']])pad.append(button(s,()=>action(d),'Move '+d));return pad}
function wantRestart(){const local=challenge(),betweenRounds=local&&local.phase!=='complete'&&local.results.length>0;if(betweenRounds||state&&(state.moves||game==='scramble'&&state.picked.length||game==='ludo'&&state.die!==null)&&!ended())return confirm('Start a new game? Current progress for this game will be replaced.');return true}
function newState(id){const level=settings(id).level;
 if(id==='rps')return meta(createRPS());
 if(id==='hangman')return meta(createHangman(level,Math.random,sessions[id]?.wordIndex));
 if(id==='scramble')return meta(createScramble(level,Math.random,sessions[id]?.wordIndex));
 if(id==='ludo')return meta(createLudo(settings(id).players||2));
 if(id==='reversi')return meta(createReversi());
 if(id==='sliding')return meta(createSliding(level));
 if(id==='lights')return meta(createLights(level));
 if(id==='code')return meta(createCode(level));
 if(id==='2048')return meta({board:spawnTile(spawnTile(Array(16).fill(0))),score:0,undo:null});
 if(id==='snake'){const body=[[7,7],[6,7],[5,7]];return meta({body,food:foodFor(body),direction:'right',score:0,over:false,won:false})}
 if(id==='memory')return meta({deck:memoryDeck({easy:6,medium:8,hard:12}[level]),open:[],matched:[],seen:{},...(settings(id).mode==='two'?{local:{turn:0,scores:[0,0]}}:{})});
 if(id==='ttt'||id==='connect4')return meta({board:Array(id==='ttt'?9:42).fill('')});
 if(id==='sudoku')return meta(createSudoku(level));return meta(createMines(level));
}
function selectSetting(label,values,value,change){const wrap=node('label',label+' '),select=node('select');select.setAttribute('aria-label',label);for(const[v,t]of values){const o=node('option',t);o.value=v;select.append(o)}select.value=value;select.onchange=async()=>{if(select.value==='remote'){arcadeShell.closeSettings();remoteGames?.offer(game,settings().level);refreshRemoteOptions();return;}if(remoteGames?.ownsView(game))remoteGames.local();if(!wantRestart()){select.value=value;return}change(select.value);delete sessions[game];if(profile.challenges)delete profile.challenges[game];await start(game,false);[...$('gameOptions').querySelectorAll('select')].find(e=>e.getAttribute('aria-label')===label)?.focus()};wrap.append(select);$('gameOptions').append(wrap)}
async function start(id,resume=true){feedback?.hide();if(!resume||!feedbackRuns.has(id))feedbackRuns.set(id,crypto.randomUUID());if(state&&resume){if(game==='memory'){if(state.local&&state.open.length===2)state.local=memoryTurn(state.local,false);state.open=[]}sessions[game]=structuredClone(state)}stop();game=id;state=null;hintInfo=null;wordNotice='';flagMode=false;$('gameControls').replaceChildren();$('gameOptions').replaceChildren();const epoch=analysisEpoch;board.replaceChildren();setStatus('Preparing board…');try{const next=resume&&sessions[id]?structuredClone(sessions[id]):id==='sudoku'?meta(await analyse('createSudoku',settings(id).level)):newState(id);if(epoch!==analysisEpoch)return;state=next;if(settings(id).mode==='challenge'){profile.challenges??={};if(!resume||!profile.challenges[id])profile.challenges[id]=newChallenge()}else if(profile.challenges)delete profile.challenges[id]}catch(e){if(e.name!=='AbortError')setStatus(e.message);return}if(game==='memory')state.open=[];if(game==='sudoku'&&(state.selected<0||state.selected>80))state.selected=0;
 board.replaceChildren();$('gameControls').replaceChildren();$('gameOptions').replaceChildren();$('hintText').textContent='';$('applyHint').hidden=true;
 for(const b of picker.querySelectorAll('button'))b.setAttribute('aria-pressed',String(b.dataset.game===game));
 revealGameChoice();
 const info={...extraInfo,...arcadeInfo,2048:['2048','ONE MORE MERGE','Combine equal tiles. Coach uses adaptive bounded lookahead; Undo takes back one move.'],snake:['Snake','KEEP GROWING','Collect food without hitting a wall or yourself. Coach favors open escape space.'],memory:['Memory Match','LOOK. REMEMBER. MATCH.','Find every pair. Coach only recalls cards you have already revealed.'],ttt:['Tic-tac-toe','THREE IN A ROW','Complete a row, column or diagonal. Try the computer or a second player.'],sudoku:['Sudoku','REASON IT THROUGH','Fill each row, column and 3 × 3 box with 1–9. Use notes or ask for a logical hint.'],mines:['Minesweeper','READ THE CLUES','Reveal every safe square. Your first click and its neighbors are protected. Flag suspected mines. Tap a revealed number again to open its neighbors when your flag count matches it; wrong flags can lose the game.'],connect4:['Connect Four','THINK A FEW MOVES AHEAD','Drop discs into columns. Make four in a row horizontally, vertically or diagonally.']}[id];
 $('gameTitle').textContent=info[0];$('gameTag').textContent=info[1];$('instructions').textContent=info[2];board.setAttribute('aria-label',info[0]+' game board');
 $('keyboardHint').textContent=game==='hangman'?'Focus the board and type A–Z, or use the letter buttons.':game==='scramble'?'Type letters to select tiles · Backspace removes the last letter · Enter checks the word.':game==='ludo'?'Roll, then choose a legal token below the board. All controls support keyboard and touch.':game==='snake'?'Arrows or WASD · Space pauses · leaving this tab pauses play.':game==='2048'?'Focus the board, then use arrow keys, swipe or the direction buttons.':game==='sliding'?'Arrow keys move a numbered tile toward the arrow · touch or click an adjacent tile.':game==='sudoku'?'Arrow keys select a cell · 1–9 enter a digit · Delete clears · N toggles notes.':'Tab and Enter select squares and actions. All games support touch controls.';
 const modeLabel=['ttt','connect4','reversi','ludo'].includes(game)?'Opponent':'Play mode';
 selectSetting(modeLabel,modeChoices(game),settings().mode,v=>{profile.settings[game]={...settings(),mode:v}});
 if(game!=='2048'&&!(settings().mode==='two'&&['ttt','connect4','reversi','ludo','rps'].includes(game)))selectSetting(game==='rps'?'Opponent style':game==='sliding'?'Puzzle size':game==='lights'?'Pattern':game==='code'?'Code digits':game==='memory'?'Board size':game==='snake'?'Speed':'Difficulty',game==='rps'?[['medium','Random'],['hard','Pattern learning']]:game==='sliding'?[['easy','3 × 3 · gentle'],['medium','3 × 3 · mixed'],['hard','4 × 4 · mixed']]:game==='lights'?[['easy','4 × 4'],['medium','5 × 5 · gentle'],['hard','5 × 5 · mixed']]:game==='code'?[['easy','1–4'],['medium','1–5'],['hard','1–6']]:game==='memory'?[['easy','6 pairs'],['medium','8 pairs'],['hard','12 pairs']]:game==='snake'?[['easy','Relaxed'],['medium','Normal'],['hard','Fast']]:[['easy','Easy'],['medium','Medium'],['hard',game==='ttt'?'Unbeatable':'Hard']],settings().level,v=>{profile.settings[game]={...settings(),level:v}});
 if(game==='ludo')selectSetting('Players',[['2','2 players'],['4','4 players']],String(settings().players||2),v=>{profile.settings[game]={...settings(),players:Number(v)}});
 if(['connect4','reversi','ludo'].includes(game)){const retry=button('Continue computer turn',()=>{analysisFailure='';if(game==='connect4')void computerConnect();if(game==='reversi')void computerReversi();if(game==='ludo')computerLudo()});retry.id='retryAI';retry.hidden=true;$('gameControls').append(retry)}
 if(game==='2048'){const undo=button('Undo',()=>{if(!state.undo)return;const prev=state.undo;state={...state,...prev,undo:null,credited:false,moves:Math.max(0,state.moves-1)};clearHint();render()});undo.id='undo';$('gameControls').append(undo,directions(move2048))}
 if(game==='snake'){const b=button('Start / Resume',toggleSnake);b.id='pause';$('gameControls').append(b,directions(steer))}
 if(game==='sudoku'){const notes=button('Notes: off',()=>{state.noteMode=!state.noteMode;render()});notes.id='notes';$('gameControls').append(notes);const keypad=node('div',undefined,'keypad');for(let n=1;n<=9;n++)keypad.append(button(String(n),()=>enterSudoku(n),'Enter '+n));keypad.append(button('Clear',()=>enterSudoku(0)));$('gameControls').append(keypad)}
 if(game==='mines'){const b=button('Action: Reveal',()=>{flagMode=!flagMode;b.textContent='Action: '+(flagMode?'Flag':'Reveal');b.setAttribute('aria-pressed',String(flagMode))});b.id='flagMode';b.setAttribute('aria-pressed','false');$('gameControls').append(b)}
 if(game==='sliding'){const b=button('Undo',()=>{if(!state.undo||thinking)return;state.board=state.undo;state.undo=null;state.moves=Math.max(0,state.moves-1);state.credited=false;clearHint();render();board.focus()});b.id='slidingUndo';$('gameControls').append(b)}
 updatePlaySetup();render();remoteGames?.onLocalStart();saveSoon();if(remoteGames?.ownsView(game))return;if(game==='reversi')void computerReversi();if(game==='connect4')void computerConnect();if(game==='ludo')computerLudo();
}

function clearHint(){hintStep=0;$('hint').textContent='Coach hint';$('hintText').textContent='';$('applyHint').hidden=true;hintInfo=null;board.querySelectorAll('.suggested').forEach(e=>e.classList.remove('suggested'))}
function record(){if(remoteGames?.ownsView(game))return;if(challenge()){$('record').textContent='Local challenge · results stay separate from solo personal bests.';$('scoreboard').textContent='';return}if(game==='memory'&&settings().mode==='two'){$('record').textContent='Local match · most pairs wins.';$('scoreboard').textContent='Player 1: '+state.local.scores[0]+' pairs · Player 2: '+state.local.scores[1]+' pairs';return}if(ended()&&!state.credited){state.credited=true;const setting=settings(),key=game+':'+setting.level+':'+setting.mode+':'+(state.hints?'assisted':'solo')+(game==='ludo'?':'+state.players:'');const win=game==='mines'?state.won:game==='snake'?true:game==='sudoku'?state.completed:game==='code'?codeWon(state):game==='hangman'?hangmanWon(state):game==='rps'?ended()==='X':game==='ludo'?settings().mode==='two'||state.winner===0:true;
 if(['ttt','connect4','reversi','rps'].includes(game)){const winner=ended();profile.matches[game][winner]++}
 else if(win){const n=['2048','snake'].includes(game)?state.score:state.moves;if(['2048','snake'].includes(game))profile.best[key]=Math.max(profile.best[key]||0,n);else profile.best[key]=Math.min(profile.best[key]??Infinity,n)}
 }
 const setting=settings(),key=game+':'+setting.level+':'+setting.mode+':'+(state.hints?'assisted':'solo')+(game==='ludo'?':'+state.players:''),best=profile.best[key];
 if(game==='rps'&&settings().mode==='two'){$('record').textContent='Local match · first to three wins.';$('scoreboard').textContent='';return}
 $('record').textContent=(best===undefined?'No completed personal best yet.':'Personal best: '+best+(['2048','snake'].includes(game)?' points':' moves'))+(state.hints?' · Assisted ('+state.hints+' hints).':' · No hints used.');
 $('scoreboard').textContent=['ttt','connect4','reversi','rps'].includes(game)?'Match scoreboard · X '+profile.matches[game].X+' · O '+profile.matches[game].O+' · Draws '+profile.matches[game].draw:'';
}
function render(){if(remoteGames?.ownsView(game)){remoteGames.render();return;}const live=board,draft=live.cloneNode(false),focus=document.activeElement,focused=live.contains(focus);board=draft;try{renderInto();}finally{board=live;reconcileBoard(live,draft);if(state){$('gameMoveRules').textContent=explainBoard(live,{game,state,thinking,finished:!!ended()});if(game==='sudoku'){const rating=rateSudoku(state.givens);$('gameLogicRating').textContent='Measured logic: '+rating.level+' · '+rating.techniques.join(', ')+(rating.solved?'':' · includes solver lookahead');}else $('gameLogicRating').textContent='';}if(focused&&!focus.isConnected)live.focus({preventScroll:true});updateLocalFeedback();moveConfirm?.refresh();}}
function renderInto(){if(remoteGames?.ownsView(game)){remoteGames.render();return;}if(challenge()&&challenge().phase==='playing'&&ended())finishChallengeRound(true);renderLocalRound();if(blocked()){board.replaceChildren();board.className='local-waiting';$('gameControls').hidden=true;document.querySelector('.coach').hidden=true;setStatus(challenge().phase==='complete'?'Challenge complete.':'Player '+(challenge().round+1)+' · Ready when you are.');record();saveSoon();return}$('gameControls').hidden=false;document.querySelector('.coach').hidden=false;board.className={2048:'tiles',snake:'snake',memory:'memory',ttt:'ttt',sudoku:'sudoku',mines:'mines',connect4:'connect4',reversi:'reversi',sliding:'sliding',lights:'lights',code:'code',rps:'rps',hangman:'hangman',scramble:'scramble',ludo:'ludo'}[game];board.replaceChildren();
 if(game==='2048'){for(const v of state.board){const n=node('div',v||'',v>=128?'tile high':'tile');n.dataset.value=v;n.setAttribute('role','img');n.setAttribute('aria-label',v?String(v):'Empty');board.append(n)}$('undo').disabled=!state.undo;setStatus('Score '+state.score+(ended()?' · No moves left.':state.board.some(n=>n>=2048)?' · 2048 reached! Keep going.':' · Merge equal tiles.'))}
 if(game==='snake'){const cells=Array.from({length:256},()=>node('span'));state.body.forEach((p,i)=>cells[p[1]*16+p[0]].className=i?'body':'head');if(state.food)cells[state.food[1]*16+state.food[0]].className='food';board.append(...cells);setStatus('Score '+state.score+(state.over?state.won?' · Board complete!':' · Game over.':running?' · Playing.':' · Paused.'));$('pause').textContent=running?'Pause':state.over?'Game over':'Start / Resume';$('pause').disabled=state.over}
 if(game==='ttt'){const end=outcome(state.board),turn=state.board.filter(Boolean).length%2?'O':'X';state.board.forEach((v,i)=>{const b=button(v||'·',()=>playTTT(i),'Row '+(Math.floor(i/3)+1)+', column '+(i%3+1)+(v?', '+v:', empty'));b.disabled=!!v||!!end;board.append(b)});setStatus(end==='draw'?'A draw. Play again?':end?end+' wins!':turn+' to play'+(settings().mode==='solo'?' · You are X.':''))}
 if(game==='memory'){board.style.setProperty('--memory-cols',state.deck.length===24?6:4);state.deck.forEach((v,i)=>{const shown=state.open.includes(i)||state.matched.includes(i),b=button(shown?symbols[v]:'?',()=>flip(i),'Card '+(i+1)+', '+(shown?names[v]:'face down')+(state.matched.includes(i)?', matched':''));b.dataset.index=i;b.className=state.matched.includes(i)?'matched':shown?'revealed':'';b.setAttribute('aria-disabled',String(shown||state.open.length===2));board.append(b)});setStatus(ended()?'All '+state.deck.length/2+' pairs found in '+state.moves+' moves!':state.matched.length/2+' / '+state.deck.length/2+' pairs · '+state.moves+(state.moves===1?' move':' moves'))}
 if(game==='sudoku'){const conflicts=new Set(sudokuConflicts(state.board));state.board.forEach((v,i)=>{const text=v||Array.from({length:9},(_,n)=>state.notes[i]&(1<<n)?n+1:'').join(''),b=button(String(text||'·'),()=>{state.selected=i;render();board.children[i]?.focus()},'Row '+(Math.floor(i/9)+1)+', column '+(i%9+1)+', '+(v||'empty')+(state.givens[i]?', given':''));b.className=(state.givens[i]?'given ':'')+(i===state.selected?'selected ':'')+(conflicts.has(i)?'conflict ':'')+(!v&&state.notes[i]?'pencil':'');b.tabIndex=i===state.selected?0:-1;board.append(b)});$('notes').textContent='Notes: '+(state.noteMode?'on':'off');$('notes').setAttribute('aria-pressed',String(state.noteMode));setStatus(state.completed?'Puzzle complete!':conflicts.size?conflicts.size+' cells have conflicts.':state.board.filter(Boolean).length+' / 81 filled · '+state.hints+' hints')}
 if(game==='mines'){board.style.setProperty('--mine-size',state.size);for(let i=0;i<state.size**2;i++){const shown=state.revealed.includes(i),flag=state.flags.includes(i),bomb=state.over&&state.bombs?.includes(i),count=shown?mineNeighbors(i,state.size).filter(j=>state.bombs.includes(j)).length:0;const b=button(flag?'⚑':bomb?'✹':shown?count||'·':'',()=>playMine(i),'Row '+(Math.floor(i/state.size)+1)+', column '+(i%state.size+1)+', '+(!shown?'covered':count+' adjacent mines')+(flag?', flagged':''));b.className=shown?'revealed':bomb?'bomb':'';b.oncontextmenu=e=>{e.preventDefault();playMine(i,true)};board.append(b)}setStatus(state.over?state.won?'All safe squares found!':'Mine hit. Game over.':state.flags.length+' / '+state.mines+' flags · '+state.moves+' moves')}
 if(game==='connect4'){const end=connectWinner(state.board),turn=state.board.filter(Boolean).length%2?'O':'X';for(let c=0;c<7;c++){const b=button('↓',()=>playConnect(c),'Drop in column '+(c+1));b.disabled=!!state.board[c]||!!end||thinking||settings().mode==='solo'&&turn==='O';board.append(b)}for(let i=0;i<42;i++){const n=node('span',state.board[i]||'·','disc '+(state.board[i]||''));n.setAttribute('role','img');n.setAttribute('aria-label','Row '+(Math.floor(i/7)+1)+', column '+(i%7+1)+', '+(state.board[i]||'empty'));board.append(n)}setStatus(end==='draw'?'A draw.':end?end+' wins!':turn+' to play'+(settings().mode==='solo'?' · You are X.':''))}
 renderExtras();renderArcade();
 const retry=$('retryAI');if(retry)retry.hidden=thinking||!!ended()||settings().mode!=='solo'||(game==='connect4'?state.board.filter(Boolean).length%2!==1:game==='reversi'?state.turn!=='O':game==='ludo'?state.turn===0:true);
 if(game==='memory'&&state.local){const [a,b]=state.local.scores;setStatus(ended()?(a===b?'A draw!':(a>b?'Player 1':'Player 2')+' wins!')+' · '+a+'–'+b+' pairs':'Player '+(state.local.turn+1)+' to play · '+a+'–'+b+' pairs'+(state.open.length===2?' · Remember these cards.':''))}if(challenge())setStatus('Player '+(challenge().round+1)+' · '+status.textContent);if(analysisFailure)setStatus(analysisFailure);$('hint').disabled=!!ended()||thinking||settings().mode==='two'&&['rps','memory'].includes(game);document.querySelector('.coach').hidden=settings().mode==='two'&&['rps','memory'].includes(game);record();saveSoon();
}
function updateLocalFeedback(){if(!feedback||!state||remoteGames?.ownsView(game))return;const c=challenge();const localNames=[$('gamePlayerName').value.trim()||'Player 1',$('localPlayerTwoName').value.trim()||'Player 2'];$('localPlayersSummary').textContent=settings().mode==='two'&&directGames.includes(game)?game==='ludo'&&state.players===4?ludoSeats(4).map(i=>ludoColors[i]).join(' · '):localNames.join(' vs '):settings().mode==='solo'&&directGames.includes(game)&&game!=='memory'?'You vs computer':'';const result=localFeedback({game,state,mode:settings().mode,end:ended(),thinking,challenge:c,rpsPhase,names:[$('gamePlayerName').value.trim()||'Player 1',$('localPlayerTwoName').value.trim()||'Player 2']});feedback.update({anchor:c&&c.phase!=='playing'?$('localRound'):$('boardViewport'),run:feedbackRuns.get(game)||game,game,values:game==='ludo'?state.tokens:state.board,...result,onAgain:()=>{if(c){$('anotherChallenge')?.click();}else $('restart').click();},closeLabel:c?'View results':'View board'});}
function previewLocal(label,indices,commit,token=null){
 const current=state,id=game,epoch=analysisEpoch,snapshot=JSON.stringify(state),options=JSON.stringify(settings());
 moveConfirm.offer({label,board:()=>$('board'),valid:()=>state===current&&game===id&&epoch===analysisEpoch&&!thinking&&!ended()&&!blocked()&&!remoteGames?.ownsView(game)&&document.body.dataset.gameView==='play'&&JSON.stringify(state)===snapshot&&JSON.stringify(settings())===options,commit,targets:()=>token===null?indices.map(i=>$('board').children[i]):[$('board').querySelector('[data-ludo-player="'+state.turn+'"][data-ludo-piece50="'+token+'"]'),$('board').querySelectorAll('.ludo-tokens button')[token]]});
}
function move2048(dir){if(blocked()||game!=='2048'||!state||thinking)return;const next=slide2048(state.board,dir);if(next.changed){state.undo={board:state.board.slice(),score:state.score};state.board=spawnTile(next.board);state.score+=next.score;state.moves++;clearHint();render()}}
function playTTT(i,confirmed=false){if(blocked()||thinking||state.board[i]||ended())return;if(!confirmed){previewLocal('Place in row '+(Math.floor(i/3)+1)+', column '+(i%3+1),[i],()=>playTTT(i,true));return;}clearHint();const turn=state.board.filter(Boolean).length%2?'O':'X';state.board[i]=turn;state.moves++;if(settings().mode==='solo'&&!ended()){const choice=tttMove(state.board,settings().level);if(choice>=0)state.board[choice]='O'}render();if(!ended())board.querySelector('button:not(:disabled)')?.focus();else board.focus()}
function playConnect(c,confirmed=false){if(ended()||thinking||settings().mode==='solo'&&state.board.filter(Boolean).length%2||state.board[c])return;if(!confirmed){const cell=Array.from({length:6},(_,r)=>(5-r)*7+c).find(i=>!state.board[i]);previewLocal('Drop a disc in column '+(c+1),[c,7+cell],()=>playConnect(c,true));return;}const turn=state.board.filter(Boolean).length%2?'O':'X',next=dropDisc(state.board,c,turn);if(!next)return;clearHint();state.board=next;state.moves++;render();if(settings().mode==='solo')void computerConnect();else focusPlayable()}
async function computerConnect(){if(game!=='connect4'||thinking||ended()||settings().mode!=='solo'||state.board.filter(Boolean).length%2!==1)return;thinking=true;const epoch=analysisEpoch,snapshot=JSON.stringify(state.board);render();setStatus('Computer is thinking…');try{const choice=await analyse('connect',{board:state.board,level:settings().level,player:'O'});if(epoch!==analysisEpoch||snapshot!==JSON.stringify(state.board))return;const next=dropDisc(state.board,choice,'O');if(!next)throw Error('No legal computer move was returned.');state.board=next}catch(e){if(epoch===analysisEpoch&&e.name!=='AbortError')analysisFailure=e.message+' Continue computer turn to retry.'}finally{if(epoch===analysisEpoch){thinking=false;render();focusPlayable()}}}

function flip(i){if(blocked()||thinking||ended()||state.open.length===2||state.open.includes(i)||state.matched.includes(i))return;clearHint();state.open.push(i);state.seen[i]=state.deck[i];if(state.open.length===2){state.moves++;const[a,b]=state.open;if(state.deck[a]===state.deck[b]){state.matched.push(a,b);state.open=[];if(state.local)state.local=memoryTurn(state.local,true)}else memoryTimer=setTimeout(()=>{memoryTimer=null;state.open=[];if(state.local)state.local=memoryTurn(state.local,false);render()},850)}render();board.children[i]?.focus()}
function steer(dir){if(blocked()||game!=='snake'||pending||state.over)return;const a=vectors[state.direction],b=vectors[dir];if(a[0]===-b[0]&&a[1]===-b[1])return;pending=dir;clearHint()}
function pauseSnake(){clearInterval(timer);timer=null;running=false;if(game==='snake'){render();saveNow()}}
function toggleSnake(){if(blocked()||game!=='snake'||state.over)return;if(running){pauseSnake();return}running=true;board.focus();timer=setInterval(()=>{state={...state,...stepSnake(state,pending||state.direction)};state.moves++;pending=null;if(state.over)pauseSnake();else render()},{easy:220,medium:150,hard:90}[settings().level]);render()}
function enterSudoku(value){if(blocked()||thinking||!state)return;const i=state.selected;if(state.completed||state.givens[i]||!state.noteMode&&state.board[i]===value)return;clearHint();if(state.noteMode&&value)state.notes[i]^=1<<(value-1);else{state.board[i]=value;state.notes=pruneSudokuNotes(state.board,state.notes);state.moves++;state.completed=state.board.every(Boolean)&&!sudokuConflicts(state.board).length}render();board.children[i]?.focus()}
function playMine(i,forceFlag=false){if(blocked()||state.over||thinking)return;clearHint();if(forceFlag||flagMode){if(state.revealed.includes(i))return;if(state.flags.includes(i))state.flags=state.flags.filter(j=>j!==i);else if(state.flags.length<state.mines)state.flags.push(i);else return}else{const next=state.revealed.includes(i)?chordMine(state,i):revealMine(state,i);if(JSON.stringify(next)===JSON.stringify(state))return;state={...state,...next}};state.moves++;render();board.children[i]?.focus()}
$('hint').onclick=async()=>{if($('hintGuidance').value==='guided'&&hintInfo&&hintStep<2&&!thinking){hintStep++;showHint();return;}if(blocked()||ended()||thinking||settings().mode==='two'&&['rps','memory'].includes(game))return;const epoch=analysisEpoch,snapshot=JSON.stringify(state);thinking=true;$('hint').disabled=true;try{if(game==='snake')pauseSnake();state.hints++;clearHint();let info;
 if(game==='2048')info=await analyse('2048',state.board);
 if(game==='snake')info=await analyse('snake',state);
 if(game==='memory')info=memoryHint(state);
 if(game==='ttt'){const player=state.board.filter(Boolean).length%2?'O':'X',i=tttMove(state.board,'hard',Math.random,player);info={cells:[i],text:'Try the highlighted square. Complete-search coaching chooses a move that avoids a forced loss when one exists.'}}
 if(game==='connect4'){const player=state.board.filter(Boolean).length%2?'O':'X',col=await analyse('connect',{board:state.board,level:'hard',player});info={cells:[col],text:'Try column '+(col+1)+'. The coach checks immediate wins and threats, then extends forced threats with completed-depth search, transposition caching and a node budget.'}}
 if(game==='sudoku')info=await analyse('sudokuHint',state);
 if(game==='mines'){info=mineHint(state,false);if(info.publicKnowledge)info=await analyse('mineRisks',info.publicKnowledge);}
 if(game==='reversi'){const cell=await analyse('reversi',{board:state.board,player:state.turn,level:'hard'});info={cells:cell<0?[]:[cell],text:'Try the highlighted square. Bounded search weighs corners, mobility and vulnerable edges and requests full small-endgame analysis when its budget permits; it is not unbeatable.'}}
 if(game==='sliding')info=await analyse('sliding',{board:state.board,size:state.size});
 if(game==='lights')info=lightsHint(state);
 if(game==='code')info=await analyse('code',{colors:state.colors,history:state.history});
 if(game==='rps')info={cells:[],text:settings().level==='hard'?'The learning opponent counts your previous eight throws. Vary your choices; it cannot see this round’s choice.':'A random opponent has no reliable winning prediction. Every hand has the same chance.'};
 if(game==='hangman')info=hangmanHint(state);
 if(game==='scramble')info=scrambleHint(state);
 if(game==='ludo')info=ludoHint(state);
 if(epoch!==analysisEpoch||JSON.stringify({...state,hints:state.hints-1})!==snapshot)return;hintInfo=info;hintStep=$('hintGuidance').value==='guided'?0:2;showHint();
 record();saveSoon();}catch(e){if(epoch===analysisEpoch&&e.name!=='AbortError')$('hintText').textContent=e.message}finally{if(epoch===analysisEpoch){thinking=false;$('hint').disabled=!!ended()}}
};
function showHint(){if(!hintInfo)return;const info=hintInfo;$('hintText').textContent=hintStage(game,info,hintStep);$('hint').textContent=hintStep===0?'Explain hint':hintStep===1?'Show move':'Coach hint';$('applyHint').hidden=hintStep<2||!(game==='sudoku'&&info.value||game==='hangman'&&info.letter||game==='scramble'&&info.letter);if(hintStep<2)return;if(game==='ludo'&&info.token>=0)board.querySelector('[data-ludo-token="'+info.token+'"]')?.classList.add('suggested');for(const i of info.cells||[info.cell,info.source].filter(i=>i>=0))board.children[i]?.classList.add('suggested');}
$('hintGuidance').onchange=clearHint;
$('applyHint').onclick=()=>{if(game==='hangman'&&hintInfo?.letter){playHangman(hintInfo.letter);return}if(game==='scramble'&&hintInfo?.letter){state.picked=Array.from({length:hintInfo.index+1},(_,i)=>i);clearHint();render();board.focus();return}if(game!=='sudoku'||!hintInfo?.value)return;state.selected=hintInfo.cell;state.noteMode=false;enterSudoku(hintInfo.value)};
$('restart').onclick=async()=>{if(remoteGames?.ownsView(game)){remoteGames.rematch();return;}if(!wantRestart())return;delete sessions[game];await start(game,false);board.focus()};

board.onkeydown=e=>{if(blocked()||!state||thinking||e.ctrlKey||e.metaKey||e.altKey)return;if(game==='hangman'&&/^[a-z]$/i.test(e.key)){e.preventDefault();playHangman(e.key);return}if(game==='scramble'){if(/^[a-z]$/i.test(e.key)){e.preventDefault();const tile=state.order.find(i=>!state.picked.includes(i)&&words[state.wordIndex].word[i]===e.key.toUpperCase());if(tile!==undefined)pickScramble(tile)}else if(e.key==='Backspace'){e.preventDefault();if(!state.completed&&state.picked.length){state.picked.pop();clearHint();render();board.focus()}}else if(e.key==='Enter'&&e.target===board){e.preventDefault();submitScramble()}return}if(game==='sliding'&&['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();const blank=state.board.indexOf(0),delta={ArrowUp:state.size,ArrowDown:-state.size,ArrowLeft:1,ArrowRight:-1}[e.key];playSliding(blank+delta);return}if(game==='sudoku'){if(e.key>='1'&&e.key<='9'){e.preventDefault();enterSudoku(Number(e.key))}else if(['Backspace','Delete','0'].includes(e.key)){e.preventDefault();enterSudoku(0)}else if(e.key.toLowerCase()==='n'){state.noteMode=!state.noteMode;render()}else if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();const row=Math.floor(state.selected/9),col=state.selected%9;state.selected=e.key==='ArrowLeft'?row*9+Math.max(0,col-1):e.key==='ArrowRight'?row*9+Math.min(8,col+1):e.key==='ArrowUp'?Math.max(0,row-1)*9+col:Math.min(8,row+1)*9+col;render();board.children[state.selected].focus()}return}
 const dirs={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right'};if(dirs[e.key]&&['snake','2048'].includes(game)){e.preventDefault();if(game==='snake')steer(dirs[e.key]);else move2048(dirs[e.key])}if(game==='snake'&&e.code==='Space'){e.preventDefault();toggleSnake()}};
board.onpointerdown=e=>{origin=[e.clientX,e.clientY]};board.onpointerup=e=>{if(blocked()||!origin)return;const dx=e.clientX-origin[0],dy=e.clientY-origin[1];origin=null;if(Math.max(Math.abs(dx),Math.abs(dy))<24)return;const dir=Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy>0?'down':'up';if(game==='2048')move2048(dir);if(game==='snake')steer(dir)};board.onpointercancel=()=>origin=null;
function leave(){moveConfirm?.cancel();rpsChoice=null;rpsPhase='first';if(!state)return;if(game==='rps'&&settings().mode==='two')render();if(game==='snake')pauseSnake();if(game==='memory'&&state.open.length){if(state.open.length===2&&state.local)state.local=memoryTurn(state.local,false);state.open=[];clearTimeout(memoryTimer);render()}saveNow()}
window.addEventListener('blur',()=>{if(game==='snake')pauseSnake()});document.addEventListener('visibilitychange',()=>{if(document.hidden)leave()});window.addEventListener('pagehide',()=>{leave();stop()});
$('remember').checked=profile.enabled;$('saveStatus').textContent=saveError|| (profile.enabled?'Saved progress restored. Snake stays paused.':'Progress is kept only while this page remains open.');
$('remember').onchange=()=>{if(saveError){profile.enabled=false;$('remember').checked=false;$('saveStatus').textContent=saveError;return}profile.enabled=$('remember').checked;if(profile.enabled)saveNow();else{clearTimeout(persistTimer);persistTimer=null;try{writeProfile(localStorage,profile)}catch{}$('saveStatus').textContent='Automatic saving is off. Previous saves stay on this device until cleared.'}};
$('clearSaves').onclick=()=>{if(!confirm('Clear only saved Games progress, settings and bests on this device? Tool Studio workspaces will not be changed.'))return;const activeSetting={...settings()},activeChallenge=challenge()?structuredClone(challenge()):null;try{localStorage.removeItem(SAVE_KEY);profile=defaults();saveError=null;for(const id of Object.keys(sessions))delete sessions[id];$('remember').checked=false;$('saveStatus').textContent='Saved Games data cleared. Current game remains playable.';if(state){profile.settings[game]=activeSetting;if(activeChallenge)profile.challenges={[game]:activeChallenge};record()}arcadeShell.refresh();arcadeShell.applyTheme()}catch{$('saveStatus').textContent='Browser storage is unavailable.'}};
let fallbackFullscreen=false;
function syncFullscreen(){const on=!!document.fullscreenElement||fallbackFullscreen;$('fullscreen').hidden=on;$('exitFullscreen').hidden=!on;document.body.classList.toggle('game-fullscreen',on)}
$('fullscreen').onclick=async()=>{try{if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else fallbackFullscreen=true}catch{fallbackFullscreen=true}syncFullscreen()};
$('exitFullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen()}catch{}fallbackFullscreen=false;syncFullscreen()};
document.addEventListener('fullscreenchange',syncFullscreen);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&fallbackFullscreen){fallbackFullscreen=false;syncFullscreen()}});
if(location.protocol==='file:'){$('studioLink').href='./Calc_Studio_Offline.html';$('guideLink').hidden=true}
moveConfirm=installMoveConfirmation();
arcadeShell=installLibrary({getProfile:()=>profile,play:id=>start(id),onLeave:()=>{feedback?.hide();leave();stop()},onPause:()=>{moveConfirm.cancel();if(state&&game==='snake')pauseSnake()},persist:saveSoon});
feedback=installPlayFeedback();
$('gamePlayerName').addEventListener('change',updateLocalFeedback);$('localPlayerTwoName').addEventListener('change',updateLocalFeedback);
remoteGames=installRemotePlay({feedback,moveConfirm,getLevel:id=>settings(id).level,getGame:()=>game,onGame:id=>arcadeShell.launch(id),onTakeover:()=>{leave();stop();},onLocal:()=>{updatePlaySetup();render();},onOptions:refreshRemoteOptions});
function refreshRemoteOptions(){const select=[...$('gameOptions').querySelectorAll('select')].find(s=>['Opponent','Play mode'].includes(s.getAttribute('aria-label')));if(!select||!directGames.includes(game))return;let option=select.querySelector('option[value=remote]');if(remoteGames?.ready||remoteGames?.ownsView(game)){if(!option){option=node('option','Remote player');option.value='remote';select.append(option);}}else option?.remove();if(remoteGames?.ownsView(game))select.value='remote';else select.value=settings().mode;for(const other of $('gameOptions').querySelectorAll('select'))if(other!==select)other.disabled=!!remoteGames?.ownsView(game);remoteGames?.mountOptions($('gameOptions'),game);}
const requestedGame=location.hash.startsWith('#game=')?location.hash.slice(6):'';if(gameIds.includes(requestedGame))void arcadeShell.launch(requestedGame,true);

function focusPlayable() { board.querySelector('button:not(:disabled)')?.focus(); }
function revealGameChoice() {
 const choice=picker.querySelector('[data-game][aria-pressed=true]');if(!choice||picker.scrollWidth<=picker.clientWidth)return;
 const a=choice.getBoundingClientRect(),b=picker.getBoundingClientRect();
 if(a.left<b.left+4)picker.scrollLeft+=a.left-b.left-4;
 else if(a.right>b.right-4)picker.scrollLeft+=a.right-b.right+4;
}
window.addEventListener('resize',()=>requestAnimationFrame(revealGameChoice));
function renderExtras() {
 if(game==='reversi') {
  const legal=reversiMoves(state.board,state.turn),end=ended();
  state.board.forEach((v,i)=>{
   const allowed=legal.includes(i),b=button(v|| (allowed?'·':''),()=>takeReversi(i),
    'Row '+(Math.floor(i/8)+1)+', column '+(i%8+1)+', '+(v|| (allowed?'legal move, flips '+reversiFlips(state.board,i,state.turn).length+' discs':'empty')));
   b.className='reversi-cell '+(v||'')+(allowed?' legal':'');
   b.disabled=!!end||!allowed||thinking||settings().mode==='solo'&&state.turn==='O';board.append(b);
  });
  const counts='X '+state.board.filter(v=>v==='X').length+' · O '+state.board.filter(v=>v==='O').length;
  setStatus(counts+' · '+(end==='draw'?'A draw.':end?end+' wins!':state.turn+' to play'+(settings().mode==='solo'?' · You are X.':'')));

 }
 if(game==='sliding') {
  board.style.setProperty('--puzzle-size',state.size);const legal=slidingNeighbors(state.board,state.size);
  state.board.forEach((v,i)=>{const b=button(v?String(v):'',()=>playSliding(i),v?'Slide tile '+v:'Empty square');b.disabled=!legal.includes(i)||!!ended();b.className=v?'puzzle-tile':'empty-square';board.append(b)});
  $('slidingUndo').disabled=!state.undo||thinking;
  setStatus(ended()?'Puzzle complete in '+state.moves+(state.moves===1?' move!':' moves!'):state.moves+' moves · Arrange 1–'+(state.board.length-1)+' in order.');
 }
 if(game==='lights') {
  board.style.setProperty('--puzzle-size',state.size);
  state.board.forEach((v,i)=>{const b=button(v?'●':'○',()=>playLights(i),'Row '+(Math.floor(i/state.size)+1)+', column '+(i%state.size+1)+', '+(v?'on':'off'));b.className=v?'light-on':'light-off';b.setAttribute('aria-pressed',String(!!v));b.disabled=!!ended();board.append(b)});
  setStatus(ended()?'All lights off in '+state.moves+(state.moves===1?' move!':' moves!'):state.board.filter(Boolean).length+' lights on · '+state.moves+' moves');
 }
 if(game==='code') {
  const history=node('ol',undefined,'code-history');history.setAttribute('aria-label','Guess history');
  for(const r of state.history){const row=node('li');row.append(node('strong',r.guess.join(' ')),node('span',r.exact+' exact · '+r.misplaced+' misplaced'));history.append(row)}
  if(state.history.length)board.append(history);
  if(!ended()) {
   const draft=node('div',undefined,'code-draft');
   state.draft.forEach((v,i)=>{const label=node('label','Digit '+(i+1)),select=node('select');
    for(let digit=1;digit<=state.colors;digit++){const option=node('option',String(digit));option.value=digit;select.append(option)}
    select.setAttribute('aria-label','Digit '+(i+1));select.value=v;select.onchange=e=>{state.draft[i]=Number(e.currentTarget.value);clearHint();saveSoon()};label.append(select);draft.append(label);
   });
   const submit=button('Check guess',()=>{if(thinking)return;state={...state,...submitCode(state),moves:state.moves+1};clearHint();render();board.querySelector('.check-code')?.focus();if(ended())board.focus()});submit.className='check-code';
   board.append(draft,submit);
  } else board.append(node('p','The code was '+state.secret.join(' ')+'.','code-answer'));
  setStatus(codeWon(state)?'Code cracked in '+state.moves+(state.moves===1?' guess!':' guesses!'):ended()?'No guesses left. Try a new code.':(10-state.history.length)+' guesses left · Digits 1–'+state.colors+'; repeats allowed.');
 }
}
function takeReversi(cell,confirmed=false) {
 if(thinking||ended()||settings().mode==='solo'&&state.turn==='O')return;
 const next=playReversi(state,cell);if(!next)return;if(!confirmed){previewLocal('Place in row '+(Math.floor(cell/8)+1)+', column '+(cell%8+1),[cell],()=>takeReversi(cell,true));return;}
 clearHint();state={...state,...next,moves:state.moves+1};render();
 if(settings().mode==='solo')void computerReversi();else focusPlayable();
}
async function computerReversi() {
 if(game!=='reversi'||thinking||ended()||settings().mode!=='solo'||state.turn!=='O')return;
 const epoch=analysisEpoch;thinking=true;render();
 try {
  while(epoch===analysisEpoch&&game==='reversi'&&!ended()&&state.turn==='O') {
   setStatus('Computer is thinking…');
   const cell=await analyse('reversi',{board:state.board,player:'O',level:settings().level});
   if(epoch!==analysisEpoch)return;
   const next=playReversi(state,cell);if(!next)throw Error('No legal computer move was returned.');
   state={...state,...next,moves:state.moves+1};render();
  }
 } catch(e) {if(epoch===analysisEpoch&&e.name!=='AbortError')analysisFailure=e.message+' Retry the computer turn or choose Two players.';}
 finally {if(epoch===analysisEpoch){thinking=false;render();focusPlayable();}}
}
function playSliding(cell,confirmed=false) {
 if(blocked()||thinking||ended())return;const next=slidePuzzle(state.board,state.size,cell);if(!next)return;if(!confirmed){previewLocal('Slide tile '+state.board[cell]+' into the empty square',[cell],()=>playSliding(cell,true));return;}
 const blank=state.board.indexOf(0);state.undo=state.board;state.board=next;state.moves++;clearHint();render();board.children[blank]?.focus();
}
function playLights(cell,confirmed=false) {
 if(blocked()||thinking||ended())return;if(!confirmed){previewLocal('Toggle row '+(Math.floor(cell/state.size)+1)+', column '+(cell%state.size+1)+' and its neighbors',[cell],()=>playLights(cell,true));return;}state.board=toggleLights(state.board,state.size,cell);state.moves++;clearHint();render();
 if(ended())board.focus();else board.children[cell]?.focus();
}

function renderArcade(){
 if(game==='rps'){
  if(settings().mode==='two'){renderLocalRPS();return}
  const scores=rpsScores(state.history),score=node('div',undefined,'rps-score');score.append(node('span','You '+scores.X),node('span','Computer '+scores.O));board.append(score);
  const row=node('div',undefined,'rps-hands');for(const [hand,icon]of [['rock','✊'],['paper','✋'],['scissors','✌']]){const b=button('',()=>{if(ended()||thinking)return;state={...state,...playRPS(state,hand,settings().level),moves:state.moves+1};clearHint();render();board.focus()},'Choose '+hand);const symbol=node('span',icon);symbol.setAttribute('aria-hidden','true');b.append(symbol,node('strong',hand[0].toUpperCase()+hand.slice(1)));b.disabled=!!ended();row.append(b)}board.append(row);
  if(state.history.length){const last=state.history.at(-1);board.append(node('p','You chose '+last.human+' · Computer chose '+last.computer+'.','round-result'));const history=node('ol',undefined,'round-history');history.setAttribute('aria-label','Recent rounds');for(const r of state.history.slice(-8))history.append(node('li',r.human+' / '+r.computer));board.append(history)}
  setStatus(ended()==='X'?'You won the match!':ended()==='O'?'Computer won the match.':ended()?'A drawn match.':scores.draw+' tied rounds · First to three wins.');
 }
 if(game==='hangman'){
  const entry=words[state.wordIndex],wrong=hangmanWrong(state);board.append(node('p',entry.category+' · '+entry.clue,'word-clue'));
  const word=node('div',undefined,'word-display');word.setAttribute('aria-label','Word: '+[...entry.word].map(c=>state.guessed.includes(c)?c:'blank').join(' '));for(const c of entry.word)word.append(node('span',state.guessed.includes(c)||ended()?c:'_'));board.append(word);
  const meter=node('div',undefined,'hangman-meter');meter.setAttribute('aria-hidden','true');for(let i=0;i<state.limit;i++)meter.append(node('span',undefined,i<wrong?'used':''));board.append(meter);
  const keys=node('div',undefined,'letter-keyboard');for(const c of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'){const b=button(c,()=>playHangman(c),'Guess '+c);b.disabled=state.guessed.includes(c)||!!ended();if(state.guessed.includes(c))b.className=entry.word.includes(c)?'correct':'incorrect';keys.append(b)}board.append(keys);
  setStatus(hangmanWon(state)?'Word found: '+entry.word+'!':ended()?'The word was '+entry.word+'. Try another.':(state.limit-wrong)+' mistakes left · '+state.guessed.length+' letters tried');
 }
 if(game==='scramble'){
  const entry=words[state.wordIndex];board.append(node('p',entry.category+' · '+entry.clue,'word-clue'));const slots=node('div',undefined,'scramble-slots');slots.setAttribute('aria-label','Your answer');
  if(!state.picked.length)slots.append(node('span','Tap letters below'));state.picked.forEach((tile,index)=>{const b=button(entry.word[tile],()=>{if(state.completed||thinking)return;state.picked.splice(index,1);wordNotice='';clearHint();render();board.focus()},'Remove letter '+entry.word[tile]+' at position '+(index+1));b.disabled=state.completed;slots.append(b)});board.append(slots);
  const bank=node('div',undefined,'scramble-bank');bank.setAttribute('aria-label','Available letters');for(const tile of state.order){const b=button(entry.word[tile],()=>pickScramble(tile),'Choose letter '+entry.word[tile]+', tile '+(tile+1));b.disabled=state.completed||state.picked.includes(tile);b.dataset.wordTile=tile;bank.append(b)}board.append(bank);
  const actions=node('div',undefined,'word-actions'),check=button('Check word',submitScramble);check.disabled=state.completed||state.picked.length!==entry.word.length;check.id='checkWord';const clear=button('Clear letters',()=>{if(state.completed||thinking)return;state.picked=[];wordNotice='';clearHint();render();board.focus()});clear.disabled=state.completed||!state.picked.length;const shuffle=button('Shuffle letters',()=>{if(state.completed||thinking)return;state.order=shuffleWord(entry.word);render();board.focus()});shuffle.disabled=state.completed;actions.append(check,clear,shuffle);board.append(actions);if(wordNotice)board.append(node('p',wordNotice,'word-notice'));
  setStatus(state.completed?'Word solved: '+entry.word+'!':state.moves+' attempts · '+state.picked.length+' / '+entry.word.length+' letters placed');
 }
 if(game==='ludo'){
  const seats=ludoSeats(state.players),name=ludoColors[seats[state.turn]],computer=settings().mode==='solo'&&state.turn!==0;
  board.append(drawLudo(state));const roll=button(state.die===null?'Roll die':'Rolled '+state.die,rollHumanLudo);roll.id='rollDie';roll.className='ludo-roll';roll.disabled=state.die!==null||!!ended()||computer||thinking;board.append(roll);
  const tokens=node('div',undefined,'ludo-tokens'),legal=ludoMoves(state);for(let token=0;token<4;token++){const position=state.tokens[state.turn][token],where=position<0?'in yard':position===57?'home':position>=51?'home lane '+(position-50):'track '+(position+1),b=button(name+' '+(token+1)+' · '+where,()=>moveHumanLudo(token),name+' token '+(token+1)+', '+where+(legal.includes(token)?', legal move':''));b.dataset.ludoToken=token;b.disabled=computer||thinking||!!ended()||!legal.includes(token);b.className=legal.includes(token)?'legal':'';tokens.append(b)}board.append(tokens);
  const progress=node('div',undefined,'ludo-progress');for(let player=0;player<state.players;player++){const summary=ludoColors[seats[player]]+': '+state.tokens[player].filter(p=>p===57).length+' home, '+state.tokens[player].filter(p=>p===-1).length+' in yard';progress.append(node('span',summary,player===state.turn?'current':''))}board.append(progress);
  setStatus(ended()?state.last:name+' to play · '+state.last);
 }
}
function playHangman(letter){if(blocked()||game!=='hangman'||thinking)return;const next=guessLetter(state,letter);if(!next)return;state={...state,...next,moves:state.moves+1};clearHint();render();board.focus()}
function pickScramble(tile){if(blocked()||game!=='scramble'||state.completed||thinking||state.picked.includes(tile))return;state.picked.push(tile);wordNotice='';clearHint();render();board.focus()}
function submitScramble(){if(blocked()||game!=='scramble'||thinking)return;const next=checkScramble(state);if(!next)return;state={...state,...next,moves:state.moves+1};wordNotice=state.completed?'': 'Not quite. Rearrange the letters and try again.';clearHint();render();board.focus()}
function rollHumanLudo(){if(game!=='ludo'||thinking||settings().mode==='solo'&&state.turn!==0)return;const next=rollLudo(state,1+Math.floor(Math.random()*6));if(!next)return;state={...state,...next};clearHint();render();computerLudo()}
function moveHumanLudo(token,confirmed=false){if(game!=='ludo'||thinking||settings().mode==='solo'&&state.turn!==0)return;const next=moveLudo(state,token);if(!next)return;if(!confirmed){previewLocal('Move token '+(token+1)+' with the rolled '+state.die,[],()=>moveHumanLudo(token,true),token);return;}state={...state,...next,moves:state.moves+1};clearHint();render();computerLudo();board.focus()}
function computerLudo(){
 if(game!=='ludo'||thinking||ended()||settings().mode!=='solo'||state.turn===0)return;const epoch=analysisEpoch;let ticks=0;thinking=true;render();
 const step=()=>{ludoTimer=null;if(epoch!==analysisEpoch||game!=='ludo')return;if(ended()||state.turn===0||ticks++>=24){thinking=false;render();return}
  if(state.die===null){const next=rollLudo(state,1+Math.floor(Math.random()*6));if(next)state={...state,...next}}
  else{const next=moveLudo(state,chooseLudo(state,settings().level));if(next)state={...state,...next,moves:state.moves+1}}
  render();ludoTimer=setTimeout(step,450);
 };ludoTimer=setTimeout(step,450);
}

function updatePlaySetup(){
 const s=settings(),mode=modeChoices(game).find(([value])=>value===s.mode)?.[1]||'Solo';
 const level=[...$('gameOptions').querySelectorAll('select')].filter(e=>!['Opponent','Play mode','Players'].includes(e.getAttribute('aria-label'))).map(e=>e.selectedOptions[0]?.textContent).join(' · ');
 $('playSetup').textContent=mode+(game==='ludo'?' · '+(s.players||2)+' players':'')+(level?' · '+level:'');
 $('modeDescription').textContent=localDescription(game,s.mode);
}
function finishChallengeRound(natural=false){
 const c=challenge();if(!c||c.phase!=='playing')return;
 const won=natural&&(game==='mines'?state.won:game==='hangman'?hangmanWon(state):game==='code'?codeWon(state):true);
 profile.challenges[game]=completeChallenge(c,challengeResult(game,state,won));state.credited=true;stop();clearHint();saveSoon();
}
function renderLocalRound(){
 const c=challenge(),panel=$('localRound');panel.hidden=!c;panel.replaceChildren();if(!c)return;
 if(c.phase==='playing'){
  panel.append(node('strong','Player '+(c.round+1)+' · your attempt'));
  const finish=button(['2048','snake'].includes(game)?'Finish round':'End attempt',()=>{if(!confirm('Finish this attempt and pass the device? An unfinished puzzle does not count as completed.'))return;finishChallengeRound();render();panel.querySelector('button')?.focus()});finish.id='finishRound';panel.append(finish);return;
 }
 if(c.phase==='complete'){
  const rank=compareChallenge(game,...c.results);panel.append(node('h2',rank===0?'A draw!':(rank<0?'Player 1':'Player 2')+' wins!'));
  c.results.forEach((r,i)=>panel.append(node('p','Player '+(i+1)+' · '+(['snake','2048'].includes(game)?r.score+' points':r.won?'Completed in '+r.moves+' moves':'Unfinished')+' · '+r.hints+' hints')));
  const again=button('Play another challenge',async()=>{if(!wantRestart())return;await start(game,false);$('localRound').querySelector('button')?.focus()});again.id='anotherChallenge';panel.append(again);return;
 }
 panel.append(node('h2',c.round?'Pass to Player 2':'Player 1, ready?'),node('p',c.round?'The previous attempt is hidden. Your new board uses the same setting.':'One attempt each. You can end an attempt at any time.'));
 const begin=button('Start Player '+(c.round+1),async()=>{
  begin.disabled=true;const epoch=analysisEpoch;
  try{
   if(c.round===1){const next=game==='sudoku'?meta(await analyse('createSudoku',settings().level)):game==='hangman'?meta(createHangman(settings().level,Math.random,state.wordIndex)):game==='scramble'?meta(createScramble(settings().level,Math.random,state.wordIndex)):newState(game);if(epoch!==analysisEpoch)return;state=next;}
   c.phase='playing';clearHint();render();board.focus();
  }catch(e){if(epoch===analysisEpoch){setStatus('Could not prepare this round. Try again.');begin.disabled=false;}}
 });begin.id='beginRound';panel.append(begin);
}
function renderLocalRPS(){
 const scores=rpsScores(state.history),over=ended(),score=node('div',undefined,'rps-score');score.append(node('span','Player 1: '+scores.X),node('span','Player 2: '+scores.O));board.append(score);
 if(over){const last=state.history.at(-1);if(last)board.append(node('p','Player 1 chose '+last.human+' · Player 2 chose '+last.computer+'.','round-result'));setStatus(over==='draw'?'A drawn match.':(over==='X'?'Player 1':'Player 2')+' won the match!');return}
 if(rpsPhase==='handover'){
  setStatus('Pass the device to Player 2. Player 1’s choice is hidden.');const ready=button('Player 2 ready',()=>{rpsPhase='second';render();focusPlayable()});ready.id='rpsReady';board.append(ready);return;
 }
 if(rpsPhase==='reveal'){
  const last=state.history.at(-1);board.append(node('p','Player 1 chose '+last.human+' · Player 2 chose '+last.computer+'.','round-result'));
  setStatus('Round revealed · '+scores.draw+' tied rounds · First to three wins.');const next=button('Next round',()=>{rpsPhase='first';render();focusPlayable()});next.id='nextRPSRound';board.append(next);return;
 }
 setStatus((rpsPhase==='second'?'Player 2':'Player 1')+' · Choose privately. First to three wins.');
 const row=node('div',undefined,'rps-hands');for(const hand of hands){const b=button(hand[0].toUpperCase()+hand.slice(1),()=>{
  if(rpsPhase==='first'){rpsChoice=hand;rpsPhase='handover'}else if(rpsPhase==='second'&&rpsChoice){state.history.push({human:rpsChoice,computer:hand});state.moves++;rpsChoice=null;rpsPhase='reveal'}
  clearHint();render();board.focus();
 },'Choose '+hand);row.append(b)}board.append(row);
}
