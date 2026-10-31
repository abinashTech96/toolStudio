// A preview never changes a board. The supplied validity check is repeated at
// commit time so a changed turn, board, lease or clock can invalidate it.
export class MovePreview {
 constructor(onChange=()=>{}){this.onChange=onChange;this.pending=null;}
 offer(candidate){if(!candidate.valid())return false;this.pending=candidate;this.onChange();return true;}
 cancel(){const old=this.pending;this.pending=null;this.onChange();return old;}
 refresh(){if(this.pending&&!this.pending.valid())this.cancel();else this.onChange();}
 confirm(){const candidate=this.pending;if(!candidate)return false;const valid=candidate.valid();this.cancel();if(!valid)return false;candidate.commit();return true;}
}

export function installMoveConfirmation(){
 const $=id=>document.getElementById(id),panel=$('moveConfirmation'),toggle=$('confirmMoves');
 const clear=()=>document.querySelectorAll('.pending-move52').forEach(e=>e.classList.remove('pending-move52'));
 const preview=new MovePreview(()=>{clear();const p=preview.pending;panel.hidden=!p;if(p){$('movePreviewText').textContent=p.label;for(const el of p.targets?.()||[])el?.classList.add('pending-move52');}});
 const cancel=(restore=false)=>{const p=preview.cancel();if(restore){const target=p?.origin?.isConnected?p.origin:p?.board?.();target?.focus({preventScroll:true});}};
 $('confirmMove').onclick=()=>preview.confirm();$('cancelMove').onclick=()=>cancel(true);
 toggle.addEventListener('change',()=>cancel());
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&preview.pending){e.preventDefault();cancel(true);}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
 return {get enabled(){return toggle.checked;},offer(candidate){if(!toggle.checked){candidate.commit();return;}preview.offer({...candidate,origin:document.activeElement,valid:()=>toggle.checked&&candidate.valid()});if(preview.pending)$('confirmMove').focus({preventScroll:true});},refresh:()=>preview.refresh(),cancel};
}
