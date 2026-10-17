// presentationtimer · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
export const id="presentationtimer";
export function register(__studio33){
__studio33.ptRead = __studio33.$fn((function ptRead(){const rows=__studio33.$('ptSegments').value.split(/\r?\n/).filter(s=>s.trim());if(!rows.length||rows.length>50)throw Error('Add 1–50 segments');const result=rows.map(s=>{const i=s.lastIndexOf('|'),name=s.slice(0,i).trim(),minutes=Number(s.slice(i+1));if(i<0||!name||!Number.isFinite(minutes)||minutes<=0||minutes>1440)throw Error('Use Name | minutes, with minutes above 0 and at most 1440');return {name,seconds:minutes*60}});__studio33.csBound('ptWarning',0,600);return result}),"function ptRead(){const rows=$('ptSegments').value.split(/\\r?\\n/).filter(s=>s.trim());if(!rows.length||rows.length>50)throw Error('Add 1–50 segments');const result=rows.map(s=>{const i=s.lastIndexOf('|'),name=s.slice(0,i).trim(),minutes=Number(s.slice(i+1));if(i<0||!name||!Number.isFinite(minutes)||minutes<=0||minutes>1440)throw Error('Use Name | minutes, with minutes above 0 and at most 1440');return {name,seconds:minutes*60}});csBound('ptWarning',0,600);return result}","ptRead");

__studio33.ptCurrent = __studio33.$fn((function ptCurrent(){return __studio33.ptElapsed+(__studio33.ptRunning?(Date.now()-__studio33.ptAnchor)/1000:0)}),"function ptCurrent(){return ptElapsed+(ptRunning?(Date.now()-ptAnchor)/1000:0)}","ptCurrent");

__studio33.ptRender = __studio33.$fn((function ptRender(){if(!__studio33.ptSegments.length)return;const elapsed=__studio33.ptCurrent(),remaining=__studio33.ptSegments[__studio33.ptIndex].seconds-elapsed;__studio33.$('ptName').textContent=__studio33.ptSegments[__studio33.ptIndex].name+' · '+(__studio33.ptIndex+1)+' / '+__studio33.ptSegments.length;__studio33.$('ptClock').textContent=(remaining<0?'+':'')+__studio33.ptTime(remaining);__studio33.$('ptElapsed').textContent='Elapsed '+__studio33.ptTime(elapsed)+' · Total '+__studio33.ptTime(__studio33.ptTotal+elapsed)+(remaining<0?' · Overtime':'');__studio33.$('ptStage').dataset.warning=remaining<=0?'red':remaining<=Number(__studio33.$('ptWarning').value)?'amber':'';__studio33.$('ptAgenda').textContent=__studio33.ptSegments.map(__studio33.$fn((s,i)=>(i===__studio33.ptIndex?'▶ ':'')+s.name+' ('+__studio33.ptTime(s.seconds)+')',"(s,i)=>(i===ptIndex?'▶ ':'')+s.name+' ('+ptTime(s.seconds)+')'","")).join(' · ');__studio33.$('ptStagePause').textContent=__studio33.ptRunning?'Pause':'Resume';__studio33.$('ptNext').disabled=__studio33.$('ptStageNext').disabled=__studio33.ptIndex>=__studio33.ptSegments.length-1}),"function ptRender(){if(!ptSegments.length)return;const elapsed=ptCurrent(),remaining=ptSegments[ptIndex].seconds-elapsed;$('ptName').textContent=ptSegments[ptIndex].name+' · '+(ptIndex+1)+' / '+ptSegments.length;$('ptClock').textContent=(remaining<0?'+':'')+ptTime(remaining);$('ptElapsed').textContent='Elapsed '+ptTime(elapsed)+' · Total '+ptTime(ptTotal+elapsed)+(remaining<0?' · Overtime':'');$('ptStage').dataset.warning=remaining<=0?'red':remaining<=Number($('ptWarning').value)?'amber':'';$('ptAgenda').textContent=ptSegments.map((s,i)=>(i===ptIndex?'▶ ':'')+s.name+' ('+ptTime(s.seconds)+')').join(' · ');$('ptStagePause').textContent=ptRunning?'Pause':'Resume';$('ptNext').disabled=$('ptStageNext').disabled=ptIndex>=ptSegments.length-1}","ptRender");

__studio33.ptPause = __studio33.$fn((function ptPause(){if(__studio33.ptRunning){__studio33.ptElapsed=__studio33.ptCurrent();__studio33.ptRunning=false}__studio33.ptRender()}),"function ptPause(){if(ptRunning){ptElapsed=ptCurrent();ptRunning=false}ptRender()}","ptPause");

__studio33.ptStart = __studio33.$fn((function ptStart(){if(!__studio33.ptRunning){__studio33.ptAnchor=Date.now();__studio33.ptRunning=true}__studio33.ptRender()}),"function ptStart(){if(!ptRunning){ptAnchor=Date.now();ptRunning=true}ptRender()}","ptStart");

__studio33.ptLoad = __studio33.$fn((function ptLoad(){const next=__studio33.ptRead();__studio33.ptRunning=false;__studio33.ptElapsed=__studio33.ptTotal=__studio33.ptIndex=0;__studio33.ptSegments=next;__studio33.csPersist(__studio33.ptKey,{segments:__studio33.$('ptSegments').value,warning:Number(__studio33.$('ptWarning').value)});__studio33.ptRender()}),"function ptLoad(){const next=ptRead();ptRunning=false;ptElapsed=ptTotal=ptIndex=0;ptSegments=next;csPersist(ptKey,{segments:$('ptSegments').value,warning:Number($('ptWarning').value)});ptRender()}","ptLoad");

__studio33.ptNext = __studio33.$fn((function ptNext(){if(__studio33.ptIndex>=__studio33.ptSegments.length-1)return;__studio33.ptTotal+=__studio33.ptCurrent();__studio33.ptElapsed=0;__studio33.ptIndex++;__studio33.ptAnchor=Date.now();__studio33.ptRender()}),"function ptNext(){if(ptIndex>=ptSegments.length-1)return;ptTotal+=ptCurrent();ptElapsed=0;ptIndex++;ptAnchor=Date.now();ptRender()}","ptNext");

__studio33.csRestoreSavedWork = __studio33.$fn((function csRestoreSavedWork(s){if(s[__studio33.knKey])__studio33.knData=__studio33.knValidate(s[__studio33.knKey]);else{const b=__studio33.knBoardNew('My first board');__studio33.knData={version:1,active:b.id,boards:[b]}}__studio33.knUndoStack=[];__studio33.knRender();if(s[__studio33.fcKey])__studio33.fcData=__studio33.fcValidate(s[__studio33.fcKey]);else __studio33.fcData={decks:[{id:__studio33.csId('deck'),name:'My first deck',cards:[]}]};__studio33.fcActive=__studio33.fcData.decks[0].id;__studio33.fcStop();__studio33.fcRender();__studio33.fdData=s[__studio33.fdKey]?__studio33.fdValidate(s[__studio33.fdKey]):{title:'My questionnaire',fields:[]};__studio33.fdEditing=null;__studio33.$('fdTitle').value=__studio33.fdData.title;__studio33.fdRender();if(s[__studio33.ptKey]){__studio33.$('ptSegments').value=s[__studio33.ptKey].segments;__studio33.$('ptWarning').value=s[__studio33.ptKey].warning;__studio33.ptLoad()}else{__studio33.ptPause();__studio33.$('ptSegments').value='Presentation | 5';__studio33.ptLoad()}}),"function csRestoreSavedWork(s){if(s[knKey])knData=knValidate(s[knKey]);else{const b=knBoardNew('My first board');knData={version:1,active:b.id,boards:[b]}}knUndoStack=[];knRender();if(s[fcKey])fcData=fcValidate(s[fcKey]);else fcData={decks:[{id:csId('deck'),name:'My first deck',cards:[]}]};fcActive=fcData.decks[0].id;fcStop();fcRender();fdData=s[fdKey]?fdValidate(s[fdKey]):{title:'My questionnaire',fields:[]};fdEditing=null;$('fdTitle').value=fdData.title;fdRender();if(s[ptKey]){$('ptSegments').value=s[ptKey].segments;$('ptWarning').value=s[ptKey].warning;ptLoad()}else{ptPause();$('ptSegments').value='Presentation | 5';ptLoad()}}","csRestoreSavedWork");
}
export const steps=[
[1056,function initialize_1056(__studio33){
__studio33.ptKey = 'calc-studio-presentation-v11';

}],
[1057,function initialize_1057(__studio33){
__studio33.ptConfig = __studio33.storage.get(__studio33.ptKey,null);

}],
[1058,function initialize_1058(__studio33){
if(__studio33.ptConfig&&typeof __studio33.ptConfig.segments==='string')__studio33.$('ptSegments').value=__studio33.ptConfig.segments;
}],
[1059,function initialize_1059(__studio33){
if(__studio33.ptConfig&&Number.isFinite(__studio33.ptConfig.warning))__studio33.$('ptWarning').value=__studio33.ptConfig.warning;
}],
[1060,function initialize_1060(__studio33){
__studio33.ptSegments = [];
__studio33.ptIndex = 0;
__studio33.ptRunning = false;
__studio33.ptElapsed = 0;
__studio33.ptTotal = 0;
__studio33.ptAnchor = 0;

}],
[1061,function initialize_1061(__studio33){
__studio33.ptTime = s=>{s=Math.floor(Math.abs(s));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')};

}],
[1068,function initialize_1068(__studio33){
__studio33.$('ptLoad').onclick=__studio33.csSafe(__studio33.ptLoad,'presentationtimer');
}],
[1069,function initialize_1069(__studio33){
__studio33.$('ptStart').onclick=__studio33.ptStart;
}],
[1070,function initialize_1070(__studio33){
__studio33.$('ptPause').onclick=__studio33.ptPause;
}],
[1071,function initialize_1071(__studio33){
__studio33.$('ptReset').onclick=__studio33.$fn(()=>{__studio33.ptPause();__studio33.ptElapsed=0;__studio33.ptRender()},"()=>{ptPause();ptElapsed=0;ptRender()}","");
}],
[1074,function initialize_1074(__studio33){
__studio33.$('ptNext').onclick=__studio33.$('ptStageNext').onclick=__studio33.ptNext;
}],
[1075,function initialize_1075(__studio33){
__studio33.$('ptStagePause').onclick=__studio33.$fn(()=>__studio33.ptRunning?__studio33.ptPause():__studio33.ptStart(),"()=>ptRunning?ptPause():ptStart()","");
}],
[1076,function initialize_1076(__studio33){
__studio33.$('ptFull').onclick=__studio33.csSafe(__studio33.$fn(async()=>{if(!document.fullscreenElement)await __studio33.$('ptStage').requestFullscreen();else await document.exitFullscreen()},"async()=>{if(!document.fullscreenElement)await $('ptStage').requestFullscreen();else await document.exitFullscreen()}",""),'presentationtimer');
}],
[1078,function initialize_1078(__studio33){
try{__studio33.ptLoad()}catch{ __studio33.$('ptSegments').value='Presentation | 5';__studio33.ptLoad()}
}],
[2530,function initialize_2530(__studio33){
__studio33.$('ptFull').onclick=__studio33.$fn(async()=>{if(document.fullscreenElement||__studio33.$('ptStage').classList.contains('u19-stage-expanded')){await __studio33.u19ExitCurrent();return}__studio33.u19StageSnapshot=__studio33.u19Snapshot();const stage=__studio33.$('ptStage');let native=false;try{if(document.fullscreenEnabled&&stage.requestFullscreen){await stage.requestFullscreen();native=true}}catch{/* A readable CSS stage remains available when native fullscreen is unavailable. */}if(!native){stage.classList.add('u19-stage-expanded');document.body.style.overflow='hidden'}__studio33.$('ptFull').textContent='Exit full screen';__studio33.$('ptFull').setAttribute('aria-pressed','true');__studio33.u19SyncExit();__studio33.u19Exit.focus({preventScroll:true})},"async()=>{if(document.fullscreenElement||$('ptStage').classList.contains('u19-stage-expanded')){await u19ExitCurrent();return}u19StageSnapshot=u19Snapshot();const stage=$('ptStage');let native=false;try{if(document.fullscreenEnabled&&stage.requestFullscreen){await stage.requestFullscreen();native=true}}catch{/* A readable CSS stage remains available when native fullscreen is unavailable. */}if(!native){stage.classList.add('u19-stage-expanded');document.body.style.overflow='hidden'}$('ptFull').textContent='Exit full screen';$('ptFull').setAttribute('aria-pressed','true');u19SyncExit();u19Exit.focus({preventScroll:true})}","");
}],
[2545,function initialize_2545(__studio33){
window.addEventListener('keydown',__studio33.$fn(e=>{
 if(e.isComposing||e.ctrlKey||e.metaKey||e.altKey)return;
 if(typeof __studio33.u22InspectKey==='function'&&__studio33.u22InspectKey(e)){__studio33.u19Consume(e);return}
 if(__studio33.u19Settings.open&&__studio33.u19RemoteBox.open){__studio33.u19KeyStatus.textContent='Received: '+(e.key||'Unidentified')+' · '+(e.code||'no code')+' · '+(e.keyCode||0);if(__studio33.u19Learn){__studio33.u19Consume(e);if(e.key==='Escape'){__studio33.u19Learn='';__studio33.u19KeyStatus.textContent='Learning cancelled.';return}const token=__studio33.u19KeyToken(e);if(!token.key&&!token.code&&!token.keyCode)return;for(const [action,key]of Object.entries(__studio33.u19State.remote))if(JSON.stringify(key)===JSON.stringify(token))delete __studio33.u19State.remote[action];__studio33.u19State.remote[__studio33.u19Learn]=token;__studio33.u19KeyStatus.textContent=__studio33.u19RemoteLabels[__studio33.u19Learn]+' mapped to '+(token.key||token.code||token.keyCode)+'.';__studio33.u19Learn='';__studio33.u19Save();__studio33.u19MappingLabels();return}}
 const editable=__studio33.u19IsEditable(e.target),mapped=__studio33.u19Mapped(e),back=e.key==='Escape'||e.key==='BrowserBack'||e.key==='GoBack'||e.key==='Back'||[10009,461].includes(e.keyCode)||e.key==='Backspace'&&!editable;
 if(back){if(__studio33.u19Back())__studio33.u19Consume(e);return}
 if(mapped==='normal'&&!editable){if(document.fullscreenElement||__studio33.editorFullScreen||__studio33.v13Focused||__studio33.u19Reader.open||__studio33.$('ptStage').classList.contains('u19-stage-expanded')){__studio33.u19Consume(e);__studio33.u19ExitCurrent()}return}
 if(__studio33.u19Layout!=='tv'||e.target.closest('#kbStage,#typing'))return;
 let action=mapped||({ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',Enter:'activate',Accept:'activate',Select:'activate'}[e.key]);if(!action)return;
 if(action==='activate'){
  if(__studio33.u19IsEditable(e.target)){__studio33.u19Consume(e);if(__studio33.u19Editing===e.target)__studio33.u19StopEditing();else{__studio33.u19StopEditing();__studio33.u19Editing=e.target;__studio33.u19Editing.dataset.u19Editing='true';if(e.target.tagName==='TEXTAREA')e.target.focus()}return}
  if(e.target.matches('button,a,input[type=checkbox],input[type=radio],summary,[role=button]')){__studio33.u19Consume(e);e.target.click()}return;
 }
 if(!['up','down','left','right'].includes(action))return;
 if(__studio33.u19Editing===e.target){if(e.target.tagName==='SELECT'){__studio33.u19Consume(e);const sel=e.target,step=action==='up'||action==='left'?-1:1;sel.selectedIndex=Math.max(0,Math.min(sel.options.length-1,sel.selectedIndex+step));sel.dispatchEvent(new Event('change',{bubbles:true}))}return}
 __studio33.u19Consume(e);__studio33.u19Navigate(action);
},"e=>{\n if(e.isComposing||e.ctrlKey||e.metaKey||e.altKey)return;\n if(typeof u22InspectKey==='function'&&u22InspectKey(e)){u19Consume(e);return}\n if(u19Settings.open&&u19RemoteBox.open){u19KeyStatus.textContent='Received: '+(e.key||'Unidentified')+' · '+(e.code||'no code')+' · '+(e.keyCode||0);if(u19Learn){u19Consume(e);if(e.key==='Escape'){u19Learn='';u19KeyStatus.textContent='Learning cancelled.';return}const token=u19KeyToken(e);if(!token.key&&!token.code&&!token.keyCode)return;for(const [action,key]of Object.entries(u19State.remote))if(JSON.stringify(key)===JSON.stringify(token))delete u19State.remote[action];u19State.remote[u19Learn]=token;u19KeyStatus.textContent=u19RemoteLabels[u19Learn]+' mapped to '+(token.key||token.code||token.keyCode)+'.';u19Learn='';u19Save();u19MappingLabels();return}}\n const editable=u19IsEditable(e.target),mapped=u19Mapped(e),back=e.key==='Escape'||e.key==='BrowserBack'||e.key==='GoBack'||e.key==='Back'||[10009,461].includes(e.keyCode)||e.key==='Backspace'&&!editable;\n if(back){if(u19Back())u19Consume(e);return}\n if(mapped==='normal'&&!editable){if(document.fullscreenElement||editorFullScreen||v13Focused||u19Reader.open||$('ptStage').classList.contains('u19-stage-expanded')){u19Consume(e);u19ExitCurrent()}return}\n if(u19Layout!=='tv'||e.target.closest('#kbStage,#typing'))return;\n let action=mapped||({ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',Enter:'activate',Accept:'activate',Select:'activate'}[e.key]);if(!action)return;\n if(action==='activate'){\n  if(u19IsEditable(e.target)){u19Consume(e);if(u19Editing===e.target)u19StopEditing();else{u19StopEditing();u19Editing=e.target;u19Editing.dataset.u19Editing='true';if(e.target.tagName==='TEXTAREA')e.target.focus()}return}\n  if(e.target.matches('button,a,input[type=checkbox],input[type=radio],summary,[role=button]')){u19Consume(e);e.target.click()}return;\n }\n if(!['up','down','left','right'].includes(action))return;\n if(u19Editing===e.target){if(e.target.tagName==='SELECT'){u19Consume(e);const sel=e.target,step=action==='up'||action==='left'?-1:1;sel.selectedIndex=Math.max(0,Math.min(sel.options.length-1,sel.selectedIndex+step));sel.dispatchEvent(new Event('change',{bubbles:true}))}return}\n u19Consume(e);u19Navigate(action);\n}",""),true);
}]
];
