// One non-modal result card follows the active board. It never changes game rules.
export function installPlayFeedback(){
 const $=id=>document.getElementById(id),dialog=document.createElement('dialog');dialog.id='gameResultPopup';dialog.className='board-result-popup';dialog.setAttribute('aria-labelledby','gameResultTitle');dialog.setAttribute('aria-describedby','gameResultDetail');
 const title=document.createElement('h2');title.id='gameResultTitle';const detail=document.createElement('p');detail.id='gameResultDetail';const actions=document.createElement('div');actions.className='board-result-actions';
 const again=document.createElement('button');again.id='resultPlayAgain';again.type='button';const close=document.createElement('button');close.id='closeGameResult';close.type='button';close.textContent='View board';actions.append(again,close);dialog.append(title,detail,actions);
 let frame=null,lastTurn='',lastRun='',seen=new Set(),current='',audio=null;
 close.onclick=()=>{dialog.close();const b=frame?.querySelector('[tabindex="0"]');(b||frame)?.focus({preventScroll:true});};
 dialog.addEventListener('cancel',e=>{e.preventDefault();close.click();});
 const audible=$('gameTurnSound'),haptic=$('gameTurnVibrate');audible.disabled=!(window.AudioContext||window.webkitAudioContext);haptic.disabled=typeof navigator.vibrate!=='function';
 audible.onchange=()=>{if(!audible.checked)return;try{audio??=new(window.AudioContext||window.webkitAudioContext)();void audio.resume().catch(()=>{});}catch{audible.checked=false;}};
 function alertTurn(){if(document.hidden)return;if(audible.checked&&audio?.state==='running'){try{const o=audio.createOscillator(),g=audio.createGain();g.gain.value=.025;o.frequency.value=660;o.connect(g);g.connect(audio.destination);o.start();o.stop(audio.currentTime+.07);}catch{}}if(haptic.checked)try{navigator.vibrate(30);}catch{}}
 function hide(){if(dialog.open)dialog.close();if(frame){frame.classList.remove('turn-frame');frame.removeAttribute('data-your-turn');frame.removeAttribute('data-turn-player');frame.querySelector(':scope>.board-turn-label')?.remove();}frame=null;current='';lastTurn='';lastRun='';}
 function update({anchor,run,active=false,player='',turnKey='',result=null,onAgain,action='Play again',closeLabel='View board'}){
  if(!anchor||!anchor.getClientRects().length){hide();return;}
  if(frame!==anchor||run!==lastRun){hide();frame=anchor;frame.tabIndex=-1;frame.classList.add('turn-frame');frame.append(dialog);lastRun=run;}
  const signature=run+':'+(turnKey||player);if(lastTurn&&signature!==lastTurn&&active&&!result)alertTurn();lastTurn=signature;
  frame.dataset.yourTurn=String(!!active&&!result);frame.dataset.turnPlayer=player;
  let label=frame.querySelector(':scope>.board-turn-label');if(!label){label=document.createElement('span');label.className='board-turn-label';label.setAttribute('aria-hidden','true');frame.prepend(label);}label.hidden=!active||!!result;label.textContent=player?player+' · your turn':'Your turn';
  if(!result){if(dialog.open)dialog.close();current='';return;}
  const key=run+':'+result.key;if(seen.has(key)||current===key)return;
  if([...document.querySelectorAll('dialog[open]')].some(d=>d!==dialog&&d.matches(':modal')))return;
  frame.scrollLeft=0;current=key;seen.add(key);if(seen.size>128)seen.delete(seen.values().next().value);
  title.textContent=result.title;detail.textContent=result.detail||'';close.textContent=closeLabel;again.textContent=action;again.hidden=!onAgain;again.onclick=()=>{if(dialog.open)dialog.close();onAgain?.();};dialog.show();
  queueMicrotask(()=>{if(dialog.open&&current===key&&!document.hidden&&anchor.getClientRects().length)close.focus({preventScroll:true});});
 }
 window.addEventListener('pagehide',()=>{hide();void audio?.close().catch(()=>{});audio=null;});
 return{update,hide};
}
