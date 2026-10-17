// shared/workspace-actions · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
export const id="shared/workspace-actions";
export function register(__studio33){
__studio33.u25Display = __studio33.$fn((function u25Display(){return{theme:document.documentElement.dataset.theme,layout:__studio33.u19State.layout,motion:__studio33.u19State.motion,editorSize:__studio33.u19State.editorSize,wrap:__studio33.u19State.wrap}}),"function u25Display(){return{theme:document.documentElement.dataset.theme,layout:u19State.layout,motion:u19State.motion,editorSize:u19State.editorSize,wrap:u19State.wrap}}","u25Display");

__studio33.u25DisplayCheck = __studio33.$fn((function u25DisplayCheck(x){if(!x||!Object.hasOwn(__studio33.themes,x.theme))throw Error('Invalid profile theme');const checked=__studio33.u19Check({...__studio33.u19Defaults,...x,remote:{},boardViews:{}});return{theme:x.theme,layout:checked.layout,motion:checked.motion,editorSize:checked.editorSize,wrap:checked.wrap}}),"function u25DisplayCheck(x){if(!x||!Object.hasOwn(themes,x.theme))throw Error('Invalid profile theme');const checked=u19Check({...u19Defaults,...x,remote:{},boardViews:{}});return{theme:x.theme,layout:checked.layout,motion:checked.motion,editorSize:checked.editorSize,wrap:checked.wrap}}","u25DisplayCheck");

__studio33.u25Check = __studio33.$fn((function u25Check(x){if(!x||x.version!==1||!Array.isArray(x.profiles)||x.profiles.length>30||JSON.stringify(x).length>4000000)throw Error('Invalid workspace profiles');const ids=new Set();return{version:1,profiles:x.profiles.map(__studio33.$fn(p=>{if(!p||typeof p.id!=='string'||ids.has(p.id)||p.id.length>100||typeof p.name!=='string'||!p.name.trim()||p.name.length>100||!Array.isArray(p.tools)||!p.tools.length||p.tools.length>Object.keys(__studio33.views).length||new Set(p.tools).size!==p.tools.length||p.tools.some(__studio33.$fn(id=>typeof id!=='string'||!Object.hasOwn(__studio33.views,id),"id=>typeof id!=='string'||!Object.hasOwn(views,id)",""))||!p.tools.includes(p.active)||typeof p.created!=='string'||!Number.isFinite(Date.parse(p.created)))throw Error('Invalid workspace profile');ids.add(p.id);const templates=__studio33.u25InputsCheck(p.templates||{});if(Object.keys(templates).some(id=>!p.tools.includes(id)))throw Error('Template is outside selected tools');return{id:p.id,name:p.name.trim(),tools:[...p.tools],active:p.active,created:p.created,display:__studio33.u25DisplayCheck(p.display),templates}},"p=>{if(!p||typeof p.id!=='string'||ids.has(p.id)||p.id.length>100||typeof p.name!=='string'||!p.name.trim()||p.name.length>100||!Array.isArray(p.tools)||!p.tools.length||p.tools.length>Object.keys(views).length||new Set(p.tools).size!==p.tools.length||p.tools.some(id=>typeof id!=='string'||!Object.hasOwn(views,id))||!p.tools.includes(p.active)||typeof p.created!=='string'||!Number.isFinite(Date.parse(p.created)))throw Error('Invalid workspace profile');ids.add(p.id);const templates=u25InputsCheck(p.templates||{});if(Object.keys(templates).some(id=>!p.tools.includes(id)))throw Error('Template is outside selected tools');return{id:p.id,name:p.name.trim(),tools:[...p.tools],active:p.active,created:p.created,display:u25DisplayCheck(p.display),templates}}",""))}}),"function u25Check(x){if(!x||x.version!==1||!Array.isArray(x.profiles)||x.profiles.length>30||JSON.stringify(x).length>4000000)throw Error('Invalid workspace profiles');const ids=new Set();return{version:1,profiles:x.profiles.map(p=>{if(!p||typeof p.id!=='string'||ids.has(p.id)||p.id.length>100||typeof p.name!=='string'||!p.name.trim()||p.name.length>100||!Array.isArray(p.tools)||!p.tools.length||p.tools.length>Object.keys(views).length||new Set(p.tools).size!==p.tools.length||p.tools.some(id=>typeof id!=='string'||!Object.hasOwn(views,id))||!p.tools.includes(p.active)||typeof p.created!=='string'||!Number.isFinite(Date.parse(p.created)))throw Error('Invalid workspace profile');ids.add(p.id);const templates=u25InputsCheck(p.templates||{});if(Object.keys(templates).some(id=>!p.tools.includes(id)))throw Error('Template is outside selected tools');return{id:p.id,name:p.name.trim(),tools:[...p.tools],active:p.active,created:p.created,display:u25DisplayCheck(p.display),templates}})}}","u25Check");

__studio33.u25Save = __studio33.$fn((function u25Save(){__studio33.csPersist(__studio33.u25Key,__studio33.u25State)}),"function u25Save(){csPersist(u25Key,u25State)}","u25Save");

__studio33.u25Safe = (function u25Safe(fn,status){return async(...args)=>{try{await fn(...args)}catch(e){status.textContent=e.message;status.dataset.error='true'}}});

__studio33.u25Field = __studio33.$fn((function u25Field(parent,id,label,type='text'){const wrap=__studio33.csText('label','','field'),e=document.createElement(type==='textarea'?'textarea':'input');e.id=id;if(type!=='textarea')e.type=type;e.setAttribute('aria-label',label);wrap.append(__studio33.csText('span',label),e);parent.append(wrap);return e}),"function u25Field(parent,id,label,type='text'){const wrap=csText('label','','field'),e=document.createElement(type==='textarea'?'textarea':'input');e.id=id;if(type!=='textarea')e.type=type;e.setAttribute('aria-label',label);wrap.append(csText('span',label),e);parent.append(wrap);return e}","u25Field");

__studio33.u25CheckRow = __studio33.$fn((function u25CheckRow(parent,id,label,checked=false){const row=__studio33.csText('label','','u25-check'),e=document.createElement('input');e.type='checkbox';e.id=id;e.checked=checked;row.append(e,__studio33.csText('span',label));parent.append(row);return e}),"function u25CheckRow(parent,id,label,checked=false){const row=csText('label','','u25-check'),e=document.createElement('input');e.type='checkbox';e.id=id;e.checked=checked;row.append(e,csText('span',label));parent.append(row);return e}","u25CheckRow");

__studio33.u25Open = __studio33.$fn((function u25Open(d,focus){__studio33.u21Options.open=false;__studio33.themeOpen(false);if(!__studio33.$('commandOverlay').hidden)__studio33.closeCommands();__studio33.u19OpenDialog(d,__studio33.u19Layout==='tv'?d.querySelector('header button'):focus);__studio33.u21Position()}),"function u25Open(d,focus){u21Options.open=false;themeOpen(false);if(!$('commandOverlay').hidden)closeCommands();u19OpenDialog(d,u19Layout==='tv'?d.querySelector('header button'):focus);u21Position()}","u25Open");

__studio33.u25DisplayApply = __studio33.$fn((function u25DisplayApply(d){__studio33.setTheme(d.theme);__studio33.u19State={...__studio33.u19State,layout:d.layout,motion:d.motion,editorSize:d.editorSize,wrap:d.wrap};__studio33.u19Save();__studio33.u19LayoutPicker.value=d.layout;__studio33.u19MotionPicker.value=d.motion;__studio33.u19TextPicker.value=d.editorSize;__studio33.u19Apply()}),"function u25DisplayApply(d){setTheme(d.theme);u19State={...u19State,layout:d.layout,motion:d.motion,editorSize:d.editorSize,wrap:d.wrap};u19Save();u19LayoutPicker.value=d.layout;u19MotionPicker.value=d.motion;u19TextPicker.value=d.editorSize;u19Apply()}","u25DisplayApply");

__studio33.u25HubItem = __studio33.$fn((function u25HubItem(label,detail,fn,id){const card=__studio33.csText('article','','u25-card');card.append(__studio33.u19Button(label,__studio33.$fn(()=>{__studio33.u25Hub.close();fn()},"()=>{u25Hub.close();fn()}",""),id),__studio33.csText('p',detail));__studio33.u25HubCards.append(card)}),"function u25HubItem(label,detail,fn,id){const card=csText('article','','u25-card');card.append(u19Button(label,()=>{u25Hub.close();fn()},id),csText('p',detail));u25HubCards.append(card)}","u25HubItem");

__studio33.u25ShowProfiles = __studio33.$fn((function u25ShowProfiles(){__studio33.u25ProfileChosen=new Set([__studio33.activeView]);__studio33.u25ProfileTemplates.checked=false;__studio33.u25ProfileSearch.value='';__studio33.u25ProfileChoices();__studio33.u25ProfileRender();__studio33.u25Open(__studio33.u25Profiles,__studio33.u25ProfileName)}),"function u25ShowProfiles(){u25ProfileChosen=new Set([activeView]);u25ProfileTemplates.checked=false;u25ProfileSearch.value='';u25ProfileChoices();u25ProfileRender();u25Open(u25Profiles,u25ProfileName)}","u25ShowProfiles");

__studio33.u25ShowTransfer = __studio33.$fn((function u25ShowTransfer(id=__studio33.activeView){try{__studio33.u25TransferPayload=__studio33.u25Result(id);if(__studio33.u25TransferPayload.length>2097152)throw Error('Handoff limit: 2 MiB of text; use a file for larger results');__studio33.u25TransferInfo.textContent=__studio33.views[id]+' → '+__studio33.u25TransferPayload.length.toLocaleString()+' characters. Preview shows up to 6,000; the complete result will be placed in the selected input.';__studio33.u25TransferPreview.textContent=__studio33.u25TransferPayload.slice(0,6000);__studio33.u25TransferConfirm.checked=false;__studio33.u25TransferStatus.textContent='Choose a destination and review the replacement. No processing or API request runs automatically.';__studio33.u25TransferTarget.onchange();__studio33.u25Open(__studio33.u25Transfer,__studio33.u25TransferTarget)}catch(e){__studio33.toast(e.message)}}),"function u25ShowTransfer(id=activeView){try{u25TransferPayload=u25Result(id);if(u25TransferPayload.length>2097152)throw Error('Handoff limit: 2 MiB of text; use a file for larger results');u25TransferInfo.textContent=views[id]+' → '+u25TransferPayload.length.toLocaleString()+' characters. Preview shows up to 6,000; the complete result will be placed in the selected input.';u25TransferPreview.textContent=u25TransferPayload.slice(0,6000);u25TransferConfirm.checked=false;u25TransferStatus.textContent='Choose a destination and review the replacement. No processing or API request runs automatically.';u25TransferTarget.onchange();u25Open(u25Transfer,u25TransferTarget)}catch(e){toast(e.message)}}","u25ShowTransfer");

__studio33.u25SetupCheck = __studio33.$fn((function u25SetupCheck(x){if(!x||x.format!=='calc-studio-setup'||x.version!==1||!Object.hasOwn(__studio33.views,x.tool)||JSON.stringify(x).length>2097152)throw Error('Invalid tool setup');const templates=__studio33.u25InputsCheck(x.templates||{});if(Object.keys(templates).some(id=>id!==x.tool))throw Error('Only the selected tool input can be included');return{format:x.format,version:1,tool:x.tool,display:__studio33.u25DisplayCheck(x.display),templates}}),"function u25SetupCheck(x){if(!x||x.format!=='calc-studio-setup'||x.version!==1||!Object.hasOwn(views,x.tool)||JSON.stringify(x).length>2097152)throw Error('Invalid tool setup');const templates=u25InputsCheck(x.templates||{});if(Object.keys(templates).some(id=>id!==x.tool))throw Error('Only the selected tool input can be included');return{format:x.format,version:1,tool:x.tool,display:u25DisplayCheck(x.display),templates}}","u25SetupCheck");

__studio33.u25Base64 = (function u25Base64(x){const bytes=new TextEncoder().encode(JSON.stringify(x));let s='';for(let i=0;i<bytes.length;i+=8192)s+=String.fromCharCode(...bytes.subarray(i,i+8192));return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')});

__studio33.u25Decode = __studio33.$fn((function u25Decode(s){if(s.length>48000||!/^[A-Za-z0-9_-]+$/.test(s))throw Error('Invalid or oversized setup link');const raw=atob(s.replace(/-/g,'+').replace(/_/g,'/'));return __studio33.u25SetupCheck(JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Uint8Array.from(raw,c=>c.charCodeAt(0)))))}),"function u25Decode(s){if(s.length>48000||!/^[A-Za-z0-9_-]+$/.test(s))throw Error('Invalid or oversized setup link');const raw=atob(s.replace(/-/g,'+').replace(/_/g,'/'));return u25SetupCheck(JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Uint8Array.from(raw,c=>c.charCodeAt(0)))))}","u25Decode");

__studio33.u25ShareRender = __studio33.$fn((function u25ShareRender(){__studio33.u25Shared=__studio33.u25SetupCheck({format:'calc-studio-setup',version:1,tool:__studio33.u25ShareOrigin,display:__studio33.u25Display(),templates:__studio33.u25ShareInputs.checked?__studio33.u25Capture([__studio33.u25ShareOrigin]):{}});__studio33.u25SharePreview.textContent=JSON.stringify(__studio33.u25Shared,null,2).slice(0,60000);const encoded=__studio33.u25Base64(__studio33.u25Shared);__studio33.u25ShareLink.value=encoded.length<=32000?location.href.split('#')[0]+'#cs-setup='+encoded:'';__studio33.u25ShareStatus.textContent=__studio33.u25ShareLink.value?'Review the setup, then copy the link or download its file.':'Setup is too large for a link; download the setup file instead.'}),"function u25ShareRender(){u25Shared=u25SetupCheck({format:'calc-studio-setup',version:1,tool:u25ShareOrigin,display:u25Display(),templates:u25ShareInputs.checked?u25Capture([u25ShareOrigin]):{}});u25SharePreview.textContent=JSON.stringify(u25Shared,null,2).slice(0,60000);const encoded=u25Base64(u25Shared);u25ShareLink.value=encoded.length<=32000?location.href.split('#')[0]+'#cs-setup='+encoded:'';u25ShareStatus.textContent=u25ShareLink.value?'Review the setup, then copy the link or download its file.':'Setup is too large for a link; download the setup file instead.'}","u25ShareRender");

__studio33.u25ShowShare = __studio33.$fn((function u25ShowShare(){__studio33.u25ShareOrigin=__studio33.activeView;__studio33.u25ShareInputs.checked=false;__studio33.u25ShareInputs.disabled=!__studio33.u25Eligible.includes(__studio33.activeView);__studio33.u25ShareRender();__studio33.u25Open(__studio33.u25Share,__studio33.$('u25ShareClose'))}),"function u25ShowShare(){u25ShareOrigin=activeView;u25ShareInputs.checked=false;u25ShareInputs.disabled=!u25Eligible.includes(activeView);u25ShareRender();u25Open(u25Share,$('u25ShareClose'))}","u25ShowShare");

__studio33.u25SetupReview = __studio33.$fn((function u25SetupReview(x){__studio33.u25Received=__studio33.u25SetupCheck(x);__studio33.u25SetupPreview.textContent=JSON.stringify(__studio33.u25Received,null,2).slice(0,60000);__studio33.u25SetupConfirm.checked=false;__studio33.u25SetupStatus.textContent='Setup for '+__studio33.views[__studio33.u25Received.tool]+'. Preview is limited to 60,000 characters; download the received setup to review larger input templates.';__studio33.$('u25SetupApply').disabled=false}),"function u25SetupReview(x){u25Received=u25SetupCheck(x);u25SetupPreview.textContent=JSON.stringify(u25Received,null,2).slice(0,60000);u25SetupConfirm.checked=false;u25SetupStatus.textContent='Setup for '+views[u25Received.tool]+'. Preview is limited to 60,000 characters; download the received setup to review larger input templates.';$('u25SetupApply').disabled=false}","u25SetupReview");

__studio33.u25ShowSetup = __studio33.$fn((function u25ShowSetup(){__studio33.u25Open(__studio33.u25Setup,__studio33.$('u25SetupClose'))}),"function u25ShowSetup(){u25Open(u25Setup,$('u25SetupClose'))}","u25ShowSetup");

__studio33.u25ReadFragment = __studio33.$fn((function u25ReadFragment(){if(!location.hash.startsWith('#cs-setup='))return;__studio33.u25SetupTicket++;__studio33.u25Received=null;__studio33.$('u25SetupApply').disabled=true;__studio33.u25SetupPreview.textContent='';try{__studio33.u25SetupReview(__studio33.u25Decode(location.hash.slice(10)));__studio33.u25ShowSetup()}catch(e){__studio33.u25SetupStatus.textContent=e.message;__studio33.u25ShowSetup()}try{window.history.replaceState(null,'',location.href.split('#')[0])}catch{}}),"function u25ReadFragment(){if(!location.hash.startsWith('#cs-setup='))return;u25SetupTicket++;u25Received=null;$('u25SetupApply').disabled=true;u25SetupPreview.textContent='';try{u25SetupReview(u25Decode(location.hash.slice(10)));u25ShowSetup()}catch(e){u25SetupStatus.textContent=e.message;u25ShowSetup()}try{window.history.replaceState(null,'',location.href.split('#')[0])}catch{}}","u25ReadFragment");

__studio33.u25ShowRecovery = __studio33.$fn((function u25ShowRecovery(){__studio33.u25RecoveryChosen=new Set(__studio33.v12State.recovery.enabled?__studio33.v12State.recovery.tools:Object.keys(__studio33.v12State.recovery.values));__studio33.u25RecoveryData=null;__studio33.u25RecoveryPreview.textContent='Select tools and preview their saved inputs.';__studio33.$('u25RecoveryRestore').disabled=true;__studio33.u25RecoveryRender();__studio33.u25Open(__studio33.u25Recovery,__studio33.$('u25RecoveryClose'))}),"function u25ShowRecovery(){u25RecoveryChosen=new Set(v12State.recovery.enabled?v12State.recovery.tools:Object.keys(v12State.recovery.values));u25RecoveryData=null;u25RecoveryPreview.textContent='Select tools and preview their saved inputs.';$('u25RecoveryRestore').disabled=true;u25RecoveryRender();u25Open(u25Recovery,$('u25RecoveryClose'))}","u25ShowRecovery");

__studio33.u25Flush = __studio33.$fn((function u25Flush(){clearTimeout(__studio33.u25DraftTimer);if(!__studio33.v12State.recovery.enabled||!__studio33.u25Dirty.size)return;for(const id of [...__studio33.u25Dirty])if(__studio33.v12State.recovery.tools.includes(id)){try{__studio33.v12State.recovery.values[id]=__studio33.u25Capture([id])[id];__studio33.u22State.draftTimes[id]=new Date().toISOString()}catch{}}__studio33.u25Dirty.clear();__studio33.v12Save();__studio33.u22Save();__studio33.u22DraftRefresh()}),"function u25Flush(){clearTimeout(u25DraftTimer);if(!v12State.recovery.enabled||!u25Dirty.size)return;for(const id of [...u25Dirty])if(v12State.recovery.tools.includes(id)){try{v12State.recovery.values[id]=u25Capture([id])[id];u22State.draftTimes[id]=new Date().toISOString()}catch{}}u25Dirty.clear();v12Save();u22Save();u22DraftRefresh()}","u25Flush");

__studio33.u25BatchClear = __studio33.$fn((function u25BatchClear(){__studio33.u25BatchGeneration++;if(__studio33.u25BatchJob){__studio33.u25BatchJob.worker.terminate();URL.revokeObjectURL(__studio33.u25BatchJob.url);clearTimeout(__studio33.u25BatchJob.timer);__studio33.u25BatchJob=null}__studio33.u25BatchZip=null;__studio33.u25BatchReport=null;__studio33.u25BatchResults.replaceChildren();__studio33.u25BatchProgress.value=0;__studio33.$('u25BatchRun').disabled=false;__studio33.$('u25BatchCancel').disabled=true;__studio33.$('u25BatchZIP').disabled=__studio33.$('u25BatchReportDownload').disabled=true;__studio33.u25BatchFiles.disabled=__studio33.u25BatchBase.disabled=__studio33.u25BatchMode.disabled=false}),"function u25BatchClear(){u25BatchGeneration++;if(u25BatchJob){u25BatchJob.worker.terminate();URL.revokeObjectURL(u25BatchJob.url);clearTimeout(u25BatchJob.timer);u25BatchJob=null}u25BatchZip=null;u25BatchReport=null;u25BatchResults.replaceChildren();u25BatchProgress.value=0;$('u25BatchRun').disabled=false;$('u25BatchCancel').disabled=true;$('u25BatchZIP').disabled=$('u25BatchReportDownload').disabled=true;u25BatchFiles.disabled=u25BatchBase.disabled=u25BatchMode.disabled=false}","u25BatchClear");

__studio33.u25BatchSource = __studio33.$fn((function u25BatchSource(){return __studio33.v9WorkerSource(__studio33.archiveWorkerJob)+'\n'+__studio33.u22JSONSource+'\n'+__studio33.normalizedJSONNumber.toString()+'\nconst compareDeveloperJSON='+__studio33.u15BaseCompare.toString()+';\nconst batchJob='+__studio33.u25BatchWorker.toString()+';self.onmessage=async e=>{try{const r=await batchJob(e.data);self.postMessage({ok:true,result:r},[r.bytes.buffer])}catch(error){self.postMessage({ok:false,error:error.message})}}'}),"function u25BatchSource(){return v9WorkerSource(archiveWorkerJob)+'\\n'+u22JSONSource+'\\n'+normalizedJSONNumber.toString()+'\\nconst compareDeveloperJSON='+u15BaseCompare.toString()+';\\nconst batchJob='+u25BatchWorker.toString()+';self.onmessage=async e=>{try{const r=await batchJob(e.data);self.postMessage({ok:true,result:r},[r.bytes.buffer])}catch(error){self.postMessage({ok:false,error:error.message})}}'}","u25BatchSource");

__studio33.u25BatchFinish = __studio33.$fn((function u25BatchFinish(){if(!__studio33.u25BatchJob)return;__studio33.u25BatchJob.worker.terminate();URL.revokeObjectURL(__studio33.u25BatchJob.url);clearTimeout(__studio33.u25BatchJob.timer);__studio33.u25BatchJob=null;__studio33.$('u25BatchRun').disabled=false;__studio33.$('u25BatchCancel').disabled=true;__studio33.u25BatchFiles.disabled=__studio33.u25BatchBase.disabled=__studio33.u25BatchMode.disabled=false}),"function u25BatchFinish(){if(!u25BatchJob)return;u25BatchJob.worker.terminate();URL.revokeObjectURL(u25BatchJob.url);clearTimeout(u25BatchJob.timer);u25BatchJob=null;$('u25BatchRun').disabled=false;$('u25BatchCancel').disabled=true;u25BatchFiles.disabled=u25BatchBase.disabled=u25BatchMode.disabled=false}","u25BatchFinish");

__studio33.u25ShowBatch = __studio33.$fn((function u25ShowBatch(){__studio33.u25Open(__studio33.u25Batch,__studio33.u25BatchMode)}),"function u25ShowBatch(){u25Open(u25Batch,u25BatchMode)}","u25ShowBatch");
}
export const steps=[
[3097,function initialize_3097(__studio33){
__studio33.u25Key = 'calc-studio-capabilities-v22';
__studio33.u25Defaults = {version:1,profiles:[]};

}],
[3105,function initialize_3105(__studio33){
__studio33.u25State = undefined;

}],
[3114,function initialize_3114(__studio33){
__studio33.u25Hub = __studio33.u19Dialog('u25Hub','Workspace tools');
__studio33.u25HubCards = __studio33.csText('div','','u25-cards');

}],
[3117,function initialize_3117(__studio33){
__studio33.u25HubButton = __studio33.u19Button('Workspace tools…',__studio33.$fn(()=>__studio33.u25Open(__studio33.u25Hub),"()=>u25Open(u25Hub)",""),'u25HubButton');

}],
[3130,function initialize_3130(__studio33){
__studio33.u25Saved = __studio33.u19Option(__studio33.u25Profiles,'u25ProfileSaved','Saved profile',[]);
__studio33.u25ProfilePreview = __studio33.csText('pre','','u25-preview');

}],
[3153,function initialize_3153(__studio33){
__studio33.u25TransferPayload = '';

}],
[3156,function initialize_3156(__studio33){
__studio33.u25TransferConfirm = __studio33.u25CheckRow(__studio33.u25Transfer,'u25TransferConfirm','Replace the destination input with this reviewed result');

}],
[3163,function initialize_3163(__studio33){
__studio33.u25Share = __studio33.u19Dialog('u25Share','Share tool setup');
__studio33.u25ShareStatus = __studio33.u25Status('u25ShareStatus');

}],
[3165,function initialize_3165(__studio33){
__studio33.u25ShareInputs = __studio33.u25CheckRow(__studio33.u25Share,'u25ShareInputs','Include this tool’s supported input template (review for personal or confidential data)');
__studio33.u25SharePreview = __studio33.csText('pre','','u25-preview');

}],
[3167,function initialize_3167(__studio33){
__studio33.u25ShareLink = __studio33.u25Field(__studio33.u25Share,'u25ShareLink','Setup link','textarea');

}],
[3171,function initialize_3171(__studio33){
__studio33.u25Shared = null;
__studio33.u25ShareOrigin = '';

}],
[3179,function initialize_3179(__studio33){
__studio33.u25Setup = __studio33.u19Dialog('u25Setup','Review received tool setup');
__studio33.u25SetupStatus = __studio33.u25Status('u25SetupStatus');
__studio33.u25SetupPreview = __studio33.csText('pre','','u25-preview');

}],
[3182,function initialize_3182(__studio33){
__studio33.u25SetupConfirm = __studio33.u25CheckRow(__studio33.u25Setup,'u25SetupConfirm','Apply the reviewed setup');
__studio33.u25SetupFile = __studio33.u25Field(__studio33.u25Setup,'u25SetupFile','Load setup file','file');

}],
[3184,function initialize_3184(__studio33){
__studio33.u25Received = null;

}],
[3186,function initialize_3186(__studio33){
__studio33.u25SetupTicket = 0;

}],
[3212,function initialize_3212(__studio33){
__studio33.u25Dirty = new Set();

}],
[3213,function initialize_3213(__studio33){
__studio33.u25DraftTimer = 0;

}],
[3218,function initialize_3218(__studio33){
__studio33.u25Batch = __studio33.u19Dialog('u25Batch','Batch file processing');
__studio33.u25BatchStatus = __studio33.u25Status('u25BatchStatus');

}],
[3222,function initialize_3222(__studio33){
__studio33.u25BatchBase = __studio33.u25Field(__studio33.u25Batch,'u25BatchBase','Reference file (comparison only)','file');

}],
[3224,function initialize_3224(__studio33){
__studio33.u25BatchProgress = document.createElement('progress');

}],
[3229,function initialize_3229(__studio33){
__studio33.u25BatchResults = __studio33.csText('div','');

}],
[3232,function initialize_3232(__studio33){
__studio33.u25BatchJob = null;
__studio33.u25BatchZip = null;
__studio33.u25BatchReport = null;
__studio33.u25BatchGeneration = 0;

}],
[3244,function initialize_3244(__studio33){
__studio33.u25SFDetails = __studio33.csText('details','','details-box u25-transfer');

}],
[3248,function initialize_3248(__studio33){
__studio33.u25SOQLDetails = __studio33.csText('details','','details-box u25-transfer');

}],
[3250,function initialize_3250(__studio33){
__studio33.u25SOQLOrg = __studio33.u25Field(__studio33.u25SOQLDetails,'u25SOQLOrg','Org base URL (optional, for API URL handoff)');

}],
[3252,function initialize_3252(__studio33){
__studio33.u25SOQLStarter = __studio33.u19Option(__studio33.u25SOQLDetails,'u25SOQLStarter','Query starter',[['account','Account list'],['relationship','Parent with child records'],['aggregate','Opportunity totals by stage']]);

}],
[3253,function initialize_3253(__studio33){
__studio33.u25SOQLTemplates = {account:"SELECT Id, Name FROM Account ORDER BY Name LIMIT 20",relationship:"SELECT Id, Name, (SELECT Id, LastName FROM Contacts) FROM Account LIMIT 20",aggregate:"SELECT StageName, COUNT(Id) recordCount, SUM(Amount) totalAmount FROM Opportunity GROUP BY StageName"};

}],
[3256,function initialize_3256(__studio33){
__studio33.u25CompositeDetails = __studio33.csText('details','','details-box u25-transfer');

}],
[3258,function initialize_3258(__studio33){
__studio33.u25CompositeVersion = __studio33.u25Field(__studio33.u25CompositeDetails,'u25CompositeVersion','Org API version (e.g. 57.0)');

}],
[3260,function initialize_3260(__studio33){
__studio33.u25CompositeStarter = __studio33.u19Option(__studio33.u25CompositeDetails,'u25CompositeStarter','Starter',[['linked','Create Account and linked Contact'],['read','Query records then retrieve the first Account']]);
__studio33.u25CompositeStatus = __studio33.u25Status('u25CompositeStatus');
__studio33.u25CompositePreview = __studio33.csText('pre','','u25-preview');

}],
[3263,function initialize_3263(__studio33){
__studio33.u25CompositePayload = null;

}],
[3268,function initialize_3268(__studio33){
__studio33.u25Limits = __studio33.csText('details','','details-box u25-transfer');

}],
[3270,function initialize_3270(__studio33){
__studio33.u25LimitOutput = __studio33.csText('div','');

}],
[3282,function initialize_3282(__studio33){
__studio33.u25PaletteActions = [['Workspace tools','workspaces hub',__studio33.$fn(()=>__studio33.u25Open(__studio33.u25Hub),"()=>u25Open(u25Hub)","")],['Workspace profiles','save load profile templates',__studio33.u25ShowProfiles],['Batch file processing','batch format hash compare files',__studio33.u25ShowBatch],['Share current tool setup','share link setup',__studio33.u25ShowShare],['Load shared setup','import setup file',__studio33.u25ShowSetup],['Review session recovery','restore draft unfinished recovery',__studio33.u25ShowRecovery],['Send current result to tool','workflow handoff transfer result',__studio33.$fn(()=>__studio33.u25ShowTransfer(),"()=>u25ShowTransfer()","")],['Device & display settings','layout mobile tv display',__studio33.$fn(()=>__studio33.$('u19DeviceButton').click(),"()=>$('u19DeviceButton').click()","")],['Performance settings','performance animation speed',__studio33.$fn(()=>__studio33.$('u24PerformanceButton').click(),"()=>$('u24PerformanceButton').click()","")],['Storage & cleanup','storage backup cleanup',__studio33.$fn(()=>__studio33.$('u24StorageButton').click(),"()=>$('u24StorageButton').click()","")],['Manage tools','hide show tools menu',__studio33.$fn(()=>__studio33.$('u23ManageButton').click(),"()=>$('u23ManageButton').click()","")],['Return to normal view','exit fullscreen normal',__studio33.$fn(()=>__studio33.u19ExitCurrent(),"()=>u19ExitCurrent()","")],...Object.entries(__studio33.themes).map(__studio33.$fn(([id,name])=>[name+' theme','theme '+id,__studio33.$fn(()=>__studio33.setTheme(id),"()=>setTheme(id)","")],"([id,name])=>[name+' theme','theme '+id,()=>setTheme(id)]",""))];

}],
[3283,function initialize_3283(__studio33){
__studio33.u25OldCommands = __studio33.renderCommands;

}],
[3290,function initialize_3290(__studio33){
__studio33.u25OldBackup = __studio33.backupSnapshot;

}],
[3292,function initialize_3292(__studio33){
__studio33.u25OldValidate = __studio33.validateBackup;

}],
[3294,function initialize_3294(__studio33){
__studio33.u25OldRestore = __studio33.csRestoreSavedWork;

}],
[3307,function initialize_3307(__studio33){
__studio33.u25OldInvalidateLogs = __studio33.invalidateLogs;

}]
];
