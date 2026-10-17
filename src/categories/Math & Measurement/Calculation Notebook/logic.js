// notebook · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
export const id="notebook";
export function register(__studio33){
__studio33.renderNotebook = __studio33.$fn((function renderNotebook(){try{const text=__studio33.$('notebookInput').value,rows=__studio33.notebookEvaluate(text);__studio33.storage.set('calc-studio-notebook',text);__studio33.saveCurrentSession();__studio33.$('notebookOutput').replaceChildren();for(const item of rows){const d=document.createElement('div');d.className='notebook-line'+(item.error?' error':'');const n=document.createElement('small'),v=document.createElement('span');n.textContent=String(item.line);v.textContent=item.empty?'·':item.error?item.error:(item.name?item.name+' = ':'')+__studio33.fmt(item.value);d.append(n,v);__studio33.$('notebookOutput').append(d)}}catch(e){__studio33.$('notebookOutput').textContent=e.message}}),"function renderNotebook(){try{const text=$('notebookInput').value,rows=notebookEvaluate(text);storage.set('calc-studio-notebook',text);saveCurrentSession();$('notebookOutput').replaceChildren();for(const item of rows){const d=document.createElement('div');d.className='notebook-line'+(item.error?' error':'');const n=document.createElement('small'),v=document.createElement('span');n.textContent=String(item.line);v.textContent=item.empty?'·':item.error?item.error:(item.name?item.name+' = ':'')+fmt(item.value);d.append(n,v);$('notebookOutput').append(d)}}catch(e){$('notebookOutput').textContent=e.message}}","renderNotebook");

__studio33.renderSessionOptions = __studio33.$fn((function renderSessionOptions(){__studio33.$('sessionSelect').replaceChildren();for(const item of __studio33.sessions){const o=document.createElement('option');o.value=item.id;o.textContent=item.name;__studio33.$('sessionSelect').append(o)}__studio33.$('sessionSelect').value=__studio33.activeSessionId;const current=__studio33.sessions.find(__studio33.$fn(x=>x.id===__studio33.activeSessionId,"x=>x.id===activeSessionId",""));__studio33.$('sessionName').value=current?.name||''}),"function renderSessionOptions(){$('sessionSelect').replaceChildren();for(const item of sessions){const o=document.createElement('option');o.value=item.id;o.textContent=item.name;$('sessionSelect').append(o)}$('sessionSelect').value=activeSessionId;const current=sessions.find(x=>x.id===activeSessionId);$('sessionName').value=current?.name||''}","renderSessionOptions");

__studio33.setNotebookSplit = __studio33.$fn((function setNotebookSplit(value){const width=Number(value);if(!Number.isFinite(width)||width<25||width>75)return;__studio33.$('notebookGrid').style.gridTemplateColumns=width+'fr '+(100-width)+'fr';__studio33.$('notebookSplit').value=String(width);__studio33.storage.set('calc-studio-notebook-split',width)}),"function setNotebookSplit(value){const width=Number(value);if(!Number.isFinite(width)||width<25||width>75)return;$('notebookGrid').style.gridTemplateColumns=width+'fr '+(100-width)+'fr';$('notebookSplit').value=String(width);storage.set('calc-studio-notebook-split',width)}","setNotebookSplit");
}
export const steps=[
[135,function initialize_135(__studio33){
__studio33.$('notebookInput').value=__studio33.storage.get('calc-studio-notebook',__studio33.notebookExample);
}],
[136,function initialize_136(__studio33){
__studio33.$('notebookInput').oninput=__studio33.renderNotebook;
}],
[137,function initialize_137(__studio33){
__studio33.$('notebookExample').onclick=__studio33.$fn(()=>{__studio33.$('notebookInput').value=__studio33.notebookExample;__studio33.renderNotebook()},"()=>{$('notebookInput').value=notebookExample;renderNotebook()}","");
}],
[138,function initialize_138(__studio33){
__studio33.$('notebookExport').onclick=__studio33.$fn(()=>__studio33.downloadFile('calculation-notebook.txt',__studio33.$('notebookInput').value),"()=>downloadFile('calculation-notebook.txt',$('notebookInput').value)","");
}],
[248,function initialize_248(__studio33){
document.addEventListener('keydown',__studio33.$fn(e=>{const key=e.key.toLowerCase();if((e.ctrlKey||e.metaKey)&&(key==='z'||key==='y')&&e.target?.dataset?.undo){e.preventDefault();__studio33.lastEditor=e.target.id;__studio33.replayEdit(key==='y'||e.shiftKey)}if((e.ctrlKey||e.metaKey)&&e.altKey&&key==='h'){e.preventDefault();__studio33.toggleHistory(__studio33.$('historyPanel').hidden)}if((e.ctrlKey||e.metaKey)&&e.altKey&&key==='n'){e.preventDefault();__studio33.openTab('notebook')}if((e.ctrlKey||e.metaKey)&&e.altKey&&key==='s'){e.preventDefault();__studio33.exportBackup()}},"e=>{const key=e.key.toLowerCase();if((e.ctrlKey||e.metaKey)&&(key==='z'||key==='y')&&e.target?.dataset?.undo){e.preventDefault();lastEditor=e.target.id;replayEdit(key==='y'||e.shiftKey)}if((e.ctrlKey||e.metaKey)&&e.altKey&&key==='h'){e.preventDefault();toggleHistory($('historyPanel').hidden)}if((e.ctrlKey||e.metaKey)&&e.altKey&&key==='n'){e.preventDefault();openTab('notebook')}if((e.ctrlKey||e.metaKey)&&e.altKey&&key==='s'){e.preventDefault();exportBackup()}}",""));
}],
[259,function initialize_259(__studio33){
__studio33.$('notebookInput').value=__studio33.activeSession.notebook;
}],
[264,function initialize_264(__studio33){
__studio33.resetEdits('notebookInput');
}],
[266,function initialize_266(__studio33){
__studio33.$('sessionSelect').onchange=__studio33.$fn(()=>__studio33.switchSession(__studio33.$('sessionSelect').value),"()=>switchSession($('sessionSelect').value)","");
}],
[267,function initialize_267(__studio33){
__studio33.$('sessionNew').onclick=__studio33.$fn(()=>{if(__studio33.sessions.length>=50)return __studio33.toast('Use at most 50 sessions');__studio33.saveCurrentSession();const name=__studio33.$('sessionName').value.trim()||'New session',item={id:__studio33.newId('session'),name:name.slice(0,80),notebook:'',expression:''};__studio33.sessions.push(item);__studio33.switchSession(item.id);__studio33.toast('Session created')},"()=>{if(sessions.length>=50)return toast('Use at most 50 sessions');saveCurrentSession();const name=$('sessionName').value.trim()||'New session',item={id:newId('session'),name:name.slice(0,80),notebook:'',expression:''};sessions.push(item);switchSession(item.id);toast('Session created')}","");
}],
[268,function initialize_268(__studio33){
__studio33.$('sessionRename').onclick=__studio33.$fn(()=>{const name=__studio33.$('sessionName').value.trim();if(!name||name.length>80)return __studio33.toast('Use a session name of 1–80 characters');__studio33.sessions.find(__studio33.$fn(x=>x.id===__studio33.activeSessionId,"x=>x.id===activeSessionId","")).name=name;__studio33.saveCurrentSession();__studio33.renderSessionOptions();__studio33.toast('Session renamed')},"()=>{const name=$('sessionName').value.trim();if(!name||name.length>80)return toast('Use a session name of 1–80 characters');sessions.find(x=>x.id===activeSessionId).name=name;saveCurrentSession();renderSessionOptions();toast('Session renamed')}","");
}],
[269,function initialize_269(__studio33){
__studio33.$('sessionDelete').onclick=__studio33.$fn(()=>{if(__studio33.sessions.length===1)return __studio33.toast('Keep at least one session');const removed=__studio33.sessions.find(__studio33.$fn(x=>x.id===__studio33.activeSessionId,"x=>x.id===activeSessionId",""));__studio33.sessions=__studio33.sessions.filter(__studio33.$fn(x=>x.id!==__studio33.activeSessionId,"x=>x.id!==activeSessionId",""));__studio33.activeSessionId=null;__studio33.switchSession(__studio33.sessions[0].id);__studio33.toast('Session deleted');const undo=document.createElement('button');undo.textContent='Undo';undo.onclick=__studio33.$fn(()=>{__studio33.sessions.push(removed);__studio33.switchSession(removed.id);__studio33.toast('Session restored')},"()=>{sessions.push(removed);switchSession(removed.id);toast('Session restored')}","");__studio33.$('toast').append(undo)},"()=>{if(sessions.length===1)return toast('Keep at least one session');const removed=sessions.find(x=>x.id===activeSessionId);sessions=sessions.filter(x=>x.id!==activeSessionId);activeSessionId=null;switchSession(sessions[0].id);toast('Session deleted');const undo=document.createElement('button');undo.textContent='Undo';undo.onclick=()=>{sessions.push(removed);switchSession(removed.id);toast('Session restored')};$('toast').append(undo)}","");
}],
[271,function initialize_271(__studio33){
__studio33.$('notebookSplit').oninput=__studio33.$fn(()=>__studio33.setNotebookSplit(__studio33.$('notebookSplit').value),"()=>setNotebookSplit($('notebookSplit').value)","");
}]
];
