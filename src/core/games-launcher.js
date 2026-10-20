/** Only the launcher runs in Tool Studio; game code loads in its own document. */
export function installGamesLauncher(c){
 const link=document.createElement('a');link.id='studioGamesButton';link.className='pill';link.textContent='Games';link.href=new URL('Calc_Studio_Games.html',location.href).href;link.target='_blank';link.rel='noopener noreferrer';link.setAttribute('aria-label','Games (opens in a new tab)');link.onclick=()=>{c.u21Options.open=false};
 c.cs32Button.after(link);
}
