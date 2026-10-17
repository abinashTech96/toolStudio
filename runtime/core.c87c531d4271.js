export const modules=[
(()=>{
// core/performance · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
const id="core/performance";
function register(__studio33){
__studio33.u24Defer = __studio33.$fn((function u24Defer(editor,kind){if(__studio33.u24Installing||!editor.closest('section')||editor.closest('#calculator'))return false;(kind==='editor'?__studio33.u24DeferredEditors:__studio33.u24DeferredGutters).set(editor.id,editor);return true}),"function u24Defer(editor,kind){if(u24Installing||!editor.closest('section')||editor.closest('#calculator'))return false;(kind==='editor'?u24DeferredEditors:u24DeferredGutters).set(editor.id,editor);return true}","u24Defer");

__studio33.u24CreateWorker = (function u24CreateWorker(url){try{return new Worker(url)}catch(e){URL.revokeObjectURL(url);throw e}});

__studio33.u24Check = (function u24Check(s){if(!s||s.version!==1||!['auto','standard','performance'].includes(s.mode)||typeof s.diagnostics!=='boolean')throw Error('Invalid performance preferences');return {version:1,mode:s.mode,diagnostics:s.diagnostics}});

__studio33.u24Record = __studio33.$fn((function u24Record(kind,id,start,outcome='complete'){if(!__studio33.u24State.diagnostics)return;const list=kind==='open'?__studio33.u24Metrics.opens:__studio33.u24Metrics.runs;list.push({tool:__studio33.views[id]||id,ms:Math.round((performance.now()-start)*10)/10,outcome});if(list.length>30)list.shift()}),"function u24Record(kind,id,start,outcome='complete'){if(!u24State.diagnostics)return;const list=kind==='open'?u24Metrics.opens:u24Metrics.runs;list.push({tool:views[id]||id,ms:Math.round((performance.now()-start)*10)/10,outcome});if(list.length>30)list.shift()}","u24Record");

__studio33.u24PolishEditor = __studio33.$fn((function u24PolishEditor(editor){const rec=__studio33.v13Editors.get(editor.id);if(!rec)return;const tools=rec.tools;if(!tools.querySelector('.u17-editor-menu')){const find=[...tools.children].find(b=>b.tagName==='BUTTON'&&b.textContent==='Find & replace'),hint=tools.querySelector('span.hint');tools.title=hint?.textContent||'Editor controls';const expand=tools.querySelector('[data-expand]');if(expand)expand.textContent='Expand';if(find)tools.append(__studio33.u17Menu('More','u17-editor-menu',[find]))}const tabs=editor.closest('.field')?.querySelector('.v12-output-tabs');if(tabs&&!tabs.querySelector('.u17-view-menu')){const extra=[...tabs.children].filter(e=>e.tagName==='BUTTON'&&/Changes|Capture/.test(e.textContent));if(extra.length)tabs.append(__studio33.u17Menu('More views','u17-view-menu',extra))}}),"function u24PolishEditor(editor){const rec=v13Editors.get(editor.id);if(!rec)return;const tools=rec.tools;if(!tools.querySelector('.u17-editor-menu')){const find=[...tools.children].find(b=>b.tagName==='BUTTON'&&b.textContent==='Find & replace'),hint=tools.querySelector('span.hint');tools.title=hint?.textContent||'Editor controls';const expand=tools.querySelector('[data-expand]');if(expand)expand.textContent='Expand';if(find)tools.append(u17Menu('More','u17-editor-menu',[find]))}const tabs=editor.closest('.field')?.querySelector('.v12-output-tabs');if(tabs&&!tabs.querySelector('.u17-view-menu')){const extra=[...tabs.children].filter(e=>e.tagName==='BUTTON'&&/Changes|Capture/.test(e.textContent));if(extra.length)tabs.append(u17Menu('More views','u17-view-menu',extra))}}","u24PolishEditor");

__studio33.u24EnsureEditors = __studio33.$fn((function u24EnsureEditors(root,includeClosed=false){if(!root)return;const focus=document.activeElement,selection=focus?.tagName==='TEXTAREA'?[focus.selectionStart,focus.selectionEnd,focus.scrollTop]:null;__studio33.u24Installing=true;try{for(const e of root.querySelectorAll('textarea[id]')){if(!includeClosed&&e.closest('details:not([open]),[hidden]'))continue;__studio33.v13InstallEditor(e);__studio33.u15InstallGutter(e);__studio33.u24DeferredEditors.delete(e.id);__studio33.u24DeferredGutters.delete(e.id);__studio33.u24PolishEditor(e)}}finally{__studio33.u24Installing=false;if(selection&&focus.isConnected&&__studio33.u19Visible(focus)&&document.activeElement!==focus){focus.focus({preventScroll:true});focus.setSelectionRange(selection[0],selection[1]);focus.scrollTop=selection[2]}}}),"function u24EnsureEditors(root,includeClosed=false){if(!root)return;const focus=document.activeElement,selection=focus?.tagName==='TEXTAREA'?[focus.selectionStart,focus.selectionEnd,focus.scrollTop]:null;u24Installing=true;try{for(const e of root.querySelectorAll('textarea[id]')){if(!includeClosed&&e.closest('details:not([open]),[hidden]'))continue;v13InstallEditor(e);u15InstallGutter(e);u24DeferredEditors.delete(e.id);u24DeferredGutters.delete(e.id);u24PolishEditor(e)}}finally{u24Installing=false;if(selection&&focus.isConnected&&u19Visible(focus)&&document.activeElement!==focus){focus.focus({preventScroll:true});focus.setSelectionRange(selection[0],selection[1]);focus.scrollTop=selection[2]}}}","u24EnsureEditors");

__studio33.u24TaskWindow = __studio33.$fn((function u24TaskWindow(tasks,key){const size=key==='list'?40:30;if(__studio33.u24Booting)return tasks.slice(0,size);const signature=__studio33.knData.active+'|'+tasks.map(t=>t.id).join(','),old=__studio33.u24KnPages.get(key),r=old?.signature===signature?old:{signature,page:0,total:tasks.length,size};r.page=Math.min(r.page,Math.max(0,Math.ceil(tasks.length/size)-1));r.total=tasks.length;r.size=size;__studio33.u24KnPages.set(key,r);return tasks.slice(r.page*size,(r.page+1)*size)}),"function u24TaskWindow(tasks,key){const size=key==='list'?40:30;if(u24Booting)return tasks.slice(0,size);const signature=knData.active+'|'+tasks.map(t=>t.id).join(','),old=u24KnPages.get(key),r=old?.signature===signature?old:{signature,page:0,total:tasks.length,size};r.page=Math.min(r.page,Math.max(0,Math.ceil(tasks.length/size)-1));r.total=tasks.length;r.size=size;u24KnPages.set(key,r);return tasks.slice(r.page*size,(r.page+1)*size)}","u24TaskWindow");

__studio33.u24TaskPager = __studio33.$fn((function u24TaskPager(host,key){const r=__studio33.u24KnPages.get(key);if(!r||r.total<=r.size)return;const nav=__studio33.csText('div','','u24-pager');nav.dataset.taskPage=key;nav.append(__studio33.u19Button('Previous tasks',__studio33.$fn(()=>{r.page--;__studio33.knRender()},"()=>{r.page--;knRender()}","")),__studio33.csText('span','Tasks '+(r.page*r.size+1)+'–'+Math.min(r.total,(r.page+1)*r.size)+' of '+r.total),__studio33.u19Button('Next tasks',__studio33.$fn(()=>{r.page++;__studio33.knRender()},"()=>{r.page++;knRender()}","")));nav.firstElementChild.disabled=r.page===0;nav.lastElementChild.disabled=(r.page+1)*r.size>=r.total;host.append(nav)}),"function u24TaskPager(host,key){const r=u24KnPages.get(key);if(!r||r.total<=r.size)return;const nav=csText('div','','u24-pager');nav.dataset.taskPage=key;nav.append(u19Button('Previous tasks',()=>{r.page--;knRender()}),csText('span','Tasks '+(r.page*r.size+1)+'–'+Math.min(r.total,(r.page+1)*r.size)+' of '+r.total),u19Button('Next tasks',()=>{r.page++;knRender()}));nav.firstElementChild.disabled=r.page===0;nav.lastElementChild.disabled=(r.page+1)*r.size>=r.total;host.append(nav)}","u24TaskPager");

__studio33.u24DiffFinish = __studio33.$fn((function u24DiffFinish(result){__studio33.diffResult=result;__studio33.diffVisible=200;__studio33.$('diffDownload').disabled=false;__studio33.$('diffResultControls').hidden=!result.changes.length;const counts={added:0,removed:0,changed:0};result.changes.forEach(r=>counts[r.type]++);__studio33.newToolStatus('diffStatus',result.changes.length?counts.added+' added · '+counts.removed+' removed · '+counts.changed+' changed'+(result.truncated?' · stopped at 5,000 differences; narrow the inputs':''):'JSON values are equal. Object key order and whitespace do not matter.');__studio33.u22DiffIndex=-1;__studio33.renderJSONDiff();__studio33.v13ReviewRender('jsondiff',true)}),"function u24DiffFinish(result){diffResult=result;diffVisible=200;$('diffDownload').disabled=false;$('diffResultControls').hidden=!result.changes.length;const counts={added:0,removed:0,changed:0};result.changes.forEach(r=>counts[r.type]++);newToolStatus('diffStatus',result.changes.length?counts.added+' added · '+counts.removed+' removed · '+counts.changed+' changed'+(result.truncated?' · stopped at 5,000 differences; narrow the inputs':''):'JSON values are equal. Object key order and whitespace do not matter.');u22DiffIndex=-1;renderJSONDiff();v13ReviewRender('jsondiff',true)}","u24DiffFinish");

__studio33.u24TaskClock = __studio33.$fn((function u24TaskClock(){if(__studio33.u24TaskTimer)return;__studio33.u24TaskTimer=setInterval(__studio33.$fn(()=>{if(!document.hidden&&[...__studio33.editionWorkers.values()].some(__studio33.$fn(e=>e.owner===__studio33.activeView,"e=>e.owner===activeView","")))__studio33.refreshTaskUI();else if(!__studio33.editionWorkers.size){clearInterval(__studio33.u24TaskTimer);__studio33.u24TaskTimer=0}},"()=>{if(!document.hidden&&[...editionWorkers.values()].some(e=>e.owner===activeView))refreshTaskUI();else if(!editionWorkers.size){clearInterval(u24TaskTimer);u24TaskTimer=0}}",""),250)}),"function u24TaskClock(){if(u24TaskTimer)return;u24TaskTimer=setInterval(()=>{if(!document.hidden&&[...editionWorkers.values()].some(e=>e.owner===activeView))refreshTaskUI();else if(!editionWorkers.size){clearInterval(u24TaskTimer);u24TaskTimer=0}},250)}","u24TaskClock");

__studio33.u24AudioClear = __studio33.$fn((function u24AudioClear(){__studio33.audTicket++;__studio33.$('audPlayer').pause();__studio33.$('audPlayer').removeAttribute('src');__studio33.$('audPlayer').load();if(__studio33.audURL)URL.revokeObjectURL(__studio33.audURL);__studio33.audURL=null;__studio33.audBuffer=null;__studio33.audDrag=null;const context=__studio33.audContext;__studio33.audContext=null;context?.close().catch(()=>{});__studio33.$('audFile').value='';__studio33.$('audPreview').disabled=__studio33.$('audDownload').disabled=true;__studio33.audWave();__studio33.csStatus('audioeditor','Audio released. Upload a file to begin.')}),"function u24AudioClear(){audTicket++;$('audPlayer').pause();$('audPlayer').removeAttribute('src');$('audPlayer').load();if(audURL)URL.revokeObjectURL(audURL);audURL=null;audBuffer=null;audDrag=null;const context=audContext;audContext=null;context?.close().catch(()=>{});$('audFile').value='';$('audPreview').disabled=$('audDownload').disabled=true;audWave();csStatus('audioeditor','Audio released. Upload a file to begin.')}","u24AudioClear");

__studio33.u24VideoClear = __studio33.$fn((function u24VideoClear(){__studio33.vidGeneration++;__studio33.$('vidPlayer').pause();__studio33.$('vidPlayer').removeAttribute('src');__studio33.$('vidPlayer').load();if(__studio33.vidURL)URL.revokeObjectURL(__studio33.vidURL);__studio33.vidURL=null;for(const f of __studio33.vidFrames)URL.revokeObjectURL(f.url);__studio33.vidFrames=[];__studio33.$('vidFile').value='';__studio33.vidRender();__studio33.vidControls();__studio33.csStatus('videoframes','Video and captured frames released.')}),"function u24VideoClear(){vidGeneration++;$('vidPlayer').pause();$('vidPlayer').removeAttribute('src');$('vidPlayer').load();if(vidURL)URL.revokeObjectURL(vidURL);vidURL=null;for(const f of vidFrames)URL.revokeObjectURL(f.url);vidFrames=[];$('vidFile').value='';vidRender();vidControls();csStatus('videoframes','Video and captured frames released.')}","u24VideoClear");

__studio33.u24Effective = __studio33.$fn((function u24Effective(){return __studio33.u24State.mode==='performance'||__studio33.u24State.mode==='auto'&&(__studio33.u19Layout==='tv'||navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=2)}),"function u24Effective(){return u24State.mode==='performance'||u24State.mode==='auto'&&(u19Layout==='tv'||navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=2)}","u24Effective");

__studio33.u24ApplyPerformance = __studio33.$fn((function u24ApplyPerformance(){__studio33.u19Root.dataset.performance=__studio33.u24Effective()?'on':'off';__studio33.u19Apply();__studio33.u24PerformanceStatus.textContent=(__studio33.u24Effective()?'Performance mode active.':'Standard effects active.')+' Deferred editor controls and bounded result rendering always apply.';__studio33.u24PerformancePicker.value=__studio33.u24State.mode;__studio33.u24DiagnosticsCheck.checked=__studio33.u24State.diagnostics}),"function u24ApplyPerformance(){u19Root.dataset.performance=u24Effective()?'on':'off';u19Apply();u24PerformanceStatus.textContent=(u24Effective()?'Performance mode active.':'Standard effects active.')+' Deferred editor controls and bounded result rendering always apply.';u24PerformancePicker.value=u24State.mode;u24DiagnosticsCheck.checked=u24State.diagnostics}","u24ApplyPerformance");

__studio33.u24Diagnostics = __studio33.$fn((function u24Diagnostics(){return {version:1,setupMs:Math.round(__studio33.u24Metrics.setupMs),readyAfterNavigationMs:Math.round(__studio33.u24Metrics.readyMs),installedEditors:__studio33.v13Editors.size,deferredEditors:__studio33.u24DeferredEditors.size,installedGutters:__studio33.u15Gutters.size,activeWorkers:__studio33.editionWorkers.size,mode:__studio33.u24State.mode,effective:__studio33.u24Effective()?'performance':'standard',measurementsEnabled:__studio33.u24State.diagnostics,toolOpens:[...__studio33.u24Metrics.opens],processing:[...__studio33.u24Metrics.runs]}}),"function u24Diagnostics(){return {version:1,setupMs:Math.round(u24Metrics.setupMs),readyAfterNavigationMs:Math.round(u24Metrics.readyMs),installedEditors:v13Editors.size,deferredEditors:u24DeferredEditors.size,installedGutters:u15Gutters.size,activeWorkers:editionWorkers.size,mode:u24State.mode,effective:u24Effective()?'performance':'standard',measurementsEnabled:u24State.diagnostics,toolOpens:[...u24Metrics.opens],processing:[...u24Metrics.runs]}}","u24Diagnostics");

__studio33.u24DiagnosticsRender = __studio33.$fn((function u24DiagnosticsRender(){const d=__studio33.u24Diagnostics();__studio33.u24DiagnosticsText.textContent='App setup: '+d.setupMs+' ms\nReady after navigation: '+d.readyAfterNavigationMs+' ms\nEditor controls: '+d.installedEditors+' installed / '+d.deferredEditors+' deferred\nActive workers: '+d.activeWorkers+'\n'+(__studio33.u24State.diagnostics?'Recent measured actions:\n'+[...d.toolOpens.map(r=>r.tool+' · open '+r.ms+' ms'),...d.processing.map(r=>r.tool+' · '+r.ms+' ms · '+r.outcome)].join('\n'):'Enable measurements to record future tool opens and background jobs. No inputs, credentials or results are recorded.')}),"function u24DiagnosticsRender(){const d=u24Diagnostics();u24DiagnosticsText.textContent='App setup: '+d.setupMs+' ms\\nReady after navigation: '+d.readyAfterNavigationMs+' ms\\nEditor controls: '+d.installedEditors+' installed / '+d.deferredEditors+' deferred\\nActive workers: '+d.activeWorkers+'\\n'+(u24State.diagnostics?'Recent measured actions:\\n'+[...d.toolOpens.map(r=>r.tool+' · open '+r.ms+' ms'),...d.processing.map(r=>r.tool+' · '+r.ms+' ms · '+r.outcome)].join('\\n'):'Enable measurements to record future tool opens and background jobs. No inputs, credentials or results are recorded.')}","u24DiagnosticsRender");

__studio33.u24EmptyRefresh = __studio33.$fn((function u24EmptyRefresh(id){if(!id)return;const c=__studio33.u24EmptyConfigs[id],bar=__studio33.u24EmptyBars.get(id);if(c&&bar)bar.hidden=!c.fields.every(__studio33.$fn(k=>!__studio33.$(k)?.value.trim(),"k=>!$(k)?.value.trim()",""))}),"function u24EmptyRefresh(id){if(!id)return;const c=u24EmptyConfigs[id],bar=u24EmptyBars.get(id);if(c&&bar)bar.hidden=!c.fields.every(k=>!$(k)?.value.trim())}","u24EmptyRefresh");

__studio33.u24TextValues = __studio33.$fn((function u24TextValues(id){const c=__studio33.u24EmptyConfigs[id];return Object.fromEntries((c?.fields||[]).map(__studio33.$fn(k=>[k,__studio33.$(k)?.value||''],"k=>[k,$(k)?.value||'']","")))}),"function u24TextValues(id){const c=u24EmptyConfigs[id];return Object.fromEntries((c?.fields||[]).map(k=>[k,$(k)?.value||'']))}","u24TextValues");

__studio33.u24TextSignature = __studio33.$fn((function u24TextSignature(id){return JSON.stringify(__studio33.u24TextValues(id))}),"function u24TextSignature(id){return JSON.stringify(u24TextValues(id))}","u24TextSignature");

__studio33.u24ForgetUndo = __studio33.$fn((function u24ForgetUndo(){clearTimeout(__studio33.u24UndoTimer);__studio33.u24Undo=null;__studio33.u24UndoBar.hidden=true;__studio33.u24UndoLabel.textContent=''}),"function u24ForgetUndo(){clearTimeout(u24UndoTimer);u24Undo=null;u24UndoBar.hidden=true;u24UndoLabel.textContent=''}","u24ForgetUndo");

__studio33.u24ClearError = __studio33.$fn((function u24ClearError(e){const rec=__studio33.u24Errors.get(e);if(!rec)return;rec.note.remove();e.classList.remove('u24-invalid');e.removeAttribute('aria-errormessage');e.removeAttribute('aria-invalid');__studio33.u24Errors.delete(e)}),"function u24ClearError(e){const rec=u24Errors.get(e);if(!rec)return;rec.note.remove();e.classList.remove('u24-invalid');e.removeAttribute('aria-errormessage');e.removeAttribute('aria-invalid');u24Errors.delete(e)}","u24ClearError");

__studio33.u24FieldError = __studio33.$fn((function u24FieldError(status,message,error){const section=status?.closest('section');if(!section)return;if(!error){for(const[e]of __studio33.u24Errors)if(section.contains(e))__studio33.u24ClearError(e);return}const candidates=[...section.querySelectorAll('textarea[id]:not([readonly]),input[id]:not([readonly]),select[id]')].filter(e=>e.closest('section')===section&&!e.closest('.u24-empty,.u22-ui,.v13-editor-tools,.v13-find')&&!['file','checkbox','range'].includes(e.type));if(!candidates.length)return;let field=candidates.find(e=>/url|endpoint/i.test(message)&&e.id==='lcURL'||/header/i.test(message)&&e.id==='lcHeaders'||/body|JSON body/i.test(message)&&e.id==='lcBody'||/regex|pattern/i.test(message)&&/pattern/i.test(e.id));if(!field){const words=message.toLowerCase();field=candidates.find(e=>{const label=e.closest('label')?.querySelector('span')?.textContent.trim().toLowerCase();return label&&label.length>3&&words.includes(label)})||candidates.find(e=>e.tagName==='TEXTAREA')||candidates[0]}if(field.id==='jwtInput'||field.id==='verifyToken')field=__studio33.u23Token;__studio33.u24ClearError(field);const note=__studio33.csText('p',message,'u24-field-error');note.id='u24Error-'+field.id;note.setAttribute('role','alert');const host=field.closest('.u15-numbered')||field;host.after(note);field.classList.add('u24-invalid');field.setAttribute('aria-invalid','true');field.setAttribute('aria-errormessage',note.id);__studio33.u24Errors.set(field,{note});if(__studio33.u24Action?.id===section.id&&performance.now()-__studio33.u24Action.at<3000&&section.id===__studio33.activeView){__studio33.u17Reveal(field);field.focus({preventScroll:true});field.scrollIntoView({block:'nearest',behavior:'auto'})}}),"function u24FieldError(status,message,error){const section=status?.closest('section');if(!section)return;if(!error){for(const[e]of u24Errors)if(section.contains(e))u24ClearError(e);return}const candidates=[...section.querySelectorAll('textarea[id]:not([readonly]),input[id]:not([readonly]),select[id]')].filter(e=>e.closest('section')===section&&!e.closest('.u24-empty,.u22-ui,.v13-editor-tools,.v13-find')&&!['file','checkbox','range'].includes(e.type));if(!candidates.length)return;let field=candidates.find(e=>/url|endpoint/i.test(message)&&e.id==='lcURL'||/header/i.test(message)&&e.id==='lcHeaders'||/body|JSON body/i.test(message)&&e.id==='lcBody'||/regex|pattern/i.test(message)&&/pattern/i.test(e.id));if(!field){const words=message.toLowerCase();field=candidates.find(e=>{const label=e.closest('label')?.querySelector('span')?.textContent.trim().toLowerCase();return label&&label.length>3&&words.includes(label)})||candidates.find(e=>e.tagName==='TEXTAREA')||candidates[0]}if(field.id==='jwtInput'||field.id==='verifyToken')field=u23Token;u24ClearError(field);const note=csText('p',message,'u24-field-error');note.id='u24Error-'+field.id;note.setAttribute('role','alert');const host=field.closest('.u15-numbered')||field;host.after(note);field.classList.add('u24-invalid');field.setAttribute('aria-invalid','true');field.setAttribute('aria-errormessage',note.id);u24Errors.set(field,{note});if(u24Action?.id===section.id&&performance.now()-u24Action.at<3000&&section.id===activeView){u17Reveal(field);field.focus({preventScroll:true});field.scrollIntoView({block:'nearest',behavior:'auto'})}}","u24FieldError");

__studio33.u24Bytes = (function u24Bytes(n){return n>=1048576?(n/1048576).toFixed(2)+' MiB':(n/1024).toFixed(1)+' KiB'});

__studio33.u24RecordsCheck = (function u24RecordsCheck(data){if(!data||data.format!=='calc-studio-saved-records'||data.version!==1||!data.records||typeof data.records!=='object'||Array.isArray(data.records))throw Error('Choose a Calc Studio saved-record export');const entries=Object.entries(data.records);if(entries.length>500||JSON.stringify(data.records).length>12000000)throw Error('Saved-record export exceeds the supported size');for(const[k,v]of entries)if(!/^(calc-studio-|advanced-calculator-)/.test(k)||k.length>200||typeof v!=='string')throw Error('Saved-record export contains an invalid or unrelated browser key');return Object.fromEntries(entries)});
}
const steps=[
[0,function initialize_0(__studio33){
__studio33.u24SetupStart = performance.now();
__studio33.u24DeferredEditors = new Map();
__studio33.u24DeferredGutters = new Map();

}],
[1,function initialize_1(__studio33){
__studio33.u24Installing = false;
__studio33.u24Booting = true;
__studio33.u24GraphPending = false;
__studio33.u26Booting = true;

}],
[2915,function initialize_2915(__studio33){
__studio33.u24Key = 'calc-studio-performance-v21';
__studio33.u24KnPages = new Map();

}],
[2917,function initialize_2917(__studio33){
__studio33.u24State = undefined;

}],
[2919,function initialize_2919(__studio33){
__studio33.u24Metrics = {setupMs:0,readyMs:0,runs:[],opens:[]};

}],
[2923,function initialize_2923(__studio33){
__studio33.u24EditorVisibility = new MutationObserver(__studio33.$fn(entries=>{for(const entry of entries)if(!entry.target.hidden)__studio33.u24EnsureEditors(entry.target)},"entries=>{for(const entry of entries)if(!entry.target.hidden)u24EnsureEditors(entry.target)}",""));

}],
[2927,function initialize_2927(__studio33){
__studio33.u24OriginalTable = __studio33.u15Table;

}],
[2931,function initialize_2931(__studio33){
__studio33.u24Opening = false;
__studio33.u24KnPending = false;
__studio33.u24DWPending = false;

}],
[2932,function initialize_2932(__studio33){
__studio33.u24TimelinePaging = false;

}],
[2933,function initialize_2933(__studio33){
__studio33.u24OldTaskList = __studio33.knTaskList;

}],
[2935,function initialize_2935(__studio33){
__studio33.u24OldTimeline = __studio33.knTimelineRender;

}],
[2937,function initialize_2937(__studio33){
__studio33.u24OldKnRender = __studio33.knRender;

}],
[2940,function initialize_2940(__studio33){
__studio33.u24OldDWRender = __studio33.dwRender;

}],
[2942,function initialize_2942(__studio33){
__studio33.u24DiffSource = __studio33.u22JSONSource+'\n'+[__studio33.normalizedJSONNumber,__studio33.pointerParts,__studio33.u15PointerParts,__studio33.nodeAtJSONPointer,__studio33.u15CompareJSON].map(f=>f.toString()).join('\n')+'\nconst compareDeveloperJSON='+__studio33.u15BaseCompare.toString()+';';

}],
[2943,function initialize_2943(__studio33){
__studio33.u24DiffOldRun = __studio33.$('diffCompare').onclick;

}],
[2947,function initialize_2947(__studio33){
__studio33.u24DiffPage = 0;
__studio33.u24DiffSignature = '';

}],
[2948,function initialize_2948(__studio33){
__studio33.u24DiffPager = __studio33.csText('div','','u24-pager');

}],
[2950,function initialize_2950(__studio33){
__studio33.u24DiffPageText = __studio33.csText('span','');

}],
[2952,function initialize_2952(__studio33){
__studio33.u24DiffPrev = __studio33.u19Button('Previous page',__studio33.$fn(()=>{__studio33.u22DiffIndex=-1;__studio33.u24DiffPage--;__studio33.renderJSONDiff()},"()=>{u22DiffIndex=-1;u24DiffPage--;renderJSONDiff()}",""),'u24DiffPrev');
__studio33.u24DiffNext = __studio33.u19Button('Next page',__studio33.$fn(()=>{__studio33.u22DiffIndex=-1;__studio33.u24DiffPage++;__studio33.renderJSONDiff()},"()=>{u22DiffIndex=-1;u24DiffPage++;renderJSONDiff()}",""),'u24DiffNext');

}],
[2957,function initialize_2957(__studio33){
__studio33.u24WorkerOld = __studio33.runStudioWorker;

}],
[2959,function initialize_2959(__studio33){
__studio33.u24OldTaskUI = __studio33.refreshTaskUI;

}],
[2961,function initialize_2961(__studio33){
__studio33.u24TaskTimer = 0;

}],
[2963,function initialize_2963(__studio33){
__studio33.u24WorkerClock = __studio33.runStudioWorker;

}],
[2973,function initialize_2973(__studio33){
__studio33.u24OldMotion = __studio33.u19Motion;

}],
[2976,function initialize_2976(__studio33){
__studio33.u24Performance = __studio33.u19Dialog('u24Performance','Performance & diagnostics');

}],
[2978,function initialize_2978(__studio33){
__studio33.u24PerformancePicker = __studio33.u19Option(__studio33.u24Performance,'u24PerformanceMode','Performance mode',[['auto','Auto · adapt to device'],['standard','Standard · use display motion settings'],['performance','Performance · reduce effects']]);

}],
[2979,function initialize_2979(__studio33){
__studio33.u24PerformanceStatus = __studio33.csText('p','','hint');

}],
[2983,function initialize_2983(__studio33){
__studio33.u24DiagnosticsLabel = __studio33.csText('label','','u24-storage-row');
__studio33.u24DiagnosticsCheck = document.createElement('input');

}],
[2988,function initialize_2988(__studio33){
__studio33.u24DiagnosticsText = __studio33.csText('pre','');

}],
[2996,function initialize_2996(__studio33){
__studio33.u24ScreenObserver = new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('u24-offscreen',!entry.isIntersecting)),{rootMargin:'100px'});

}],
[2999,function initialize_2999(__studio33){
__studio33.u24Actions = [['jsondiff',['compare json','json compare','compare records']],['textdiff',['compare text','text compare']],['tools',['calculate emi','emi calculator','loan emi']],['hash',['hash file','hash text','sha256','checksum']],['fileinspect',['inspect file','file hash']],['csvjson',['csv to json','convert csv']],['jsoncsv',['json to csv','export json csv']],['jwtverify',['verify jwt','verify token']],['jwt',['decode jwt','inspect jwt']],['statistics',['calculate average','mean median']],['converter',['convert units','convert currency']],['logs',['analyze logs','analyse logs']],['jsonformatter',['format json','pretty json']],['kanban',['plan tasks','manage tasks']]];

}],
[3000,function initialize_3000(__studio33){
__studio33.u24OldCommands = __studio33.renderCommands;

}],
[3002,function initialize_3002(__studio33){
__studio33.u24EmptyConfigs = {jsonformatter:{fields:['jsonInput'],upload:'jsonUpload',example:['{"message":"Hello","count":3}']},jsondiff:{fields:['diffLeft','diffRight'],example:['{"status":"New","amount":100}','{"status":"Approved","amount":120}']},textdiff:{fields:['textDiffLeft','textDiffRight'],example:['First line\nOriginal text','First line\nUpdated text']},csvjson:{fields:['csvJsonInput'],upload:'csvJsonUpload',example:['id,name\n001,Alice\n002,Bob']},jsoncsv:{fields:['csvInput'],upload:'csvUpload',example:['[{"id":"001","name":"Alice"},{"id":"002","name":"Bob"}]']},hash:{fields:['hashInput'],example:['Hello, Calc Studio']},statistics:{fields:['u23StatsInput'],example:['12,18,25,25,30']},encoding:{fields:['encodingInput'],example:['Hello, Calc Studio']},textutils:{fields:['textUtilInput'],example:['One useful studio.\nTools for everyday work.']},logs:{fields:['logInput'],upload:'logUpload',example:['12:00:00.0 (1)|USER_DEBUG|[1]|DEBUG|Hello, Calc Studio']}};

}],
[3003,function initialize_3003(__studio33){
__studio33.u24EmptyBars = new Map();

}],
[3006,function initialize_3006(__studio33){
__studio33.u24Undo = null;
__studio33.u24UndoTimer = 0;

}],
[3007,function initialize_3007(__studio33){
__studio33.u24UndoBar = __studio33.csText('div','','u24-undo');

}],
[3010,function initialize_3010(__studio33){
__studio33.u24UndoLabel = __studio33.csText('span','');

}],
[3018,function initialize_3018(__studio33){
__studio33.u24Errors = new Map();

}],
[3019,function initialize_3019(__studio33){
__studio33.u24Action = null;

}],
[3023,function initialize_3023(__studio33){
__studio33.u24OldNewStatus = __studio33.newToolStatus;

}],
[3025,function initialize_3025(__studio33){
__studio33.u24OldCSStatus = __studio33.csStatus;

}],
[3027,function initialize_3027(__studio33){
__studio33.u24OldJSONState = __studio33.jsonState;

}],
[3049,function initialize_3049(__studio33){
__studio33.u24RecordsExport = __studio33.u19Button('Download all saved records',__studio33.$fn(()=>{const records=Object.fromEntries(__studio33.u22OwnedKeys().filter(k=>localStorage.getItem(k)!==null).map(k=>[k,localStorage.getItem(k)]));__studio33.downloadFile('calc-studio-saved-records.json',JSON.stringify({format:'calc-studio-saved-records',version:1,records},null,2),'application/json')},"()=>{const records=Object.fromEntries(u22OwnedKeys().filter(k=>localStorage.getItem(k)!==null).map(k=>[k,localStorage.getItem(k)]));downloadFile('calc-studio-saved-records.json',JSON.stringify({format:'calc-studio-saved-records',version:1,records},null,2),'application/json')}",""),'u24RecordsExport');

}],
[3051,function initialize_3051(__studio33){
__studio33.u24RecordsHelp = __studio33.csText('p','All saved records includes every Calc Studio browser record, including saved credentials. Restore it here. App backup uses the existing Settings backup format. Neither export includes uploaded media or unsaved results.','hint');

}],
[3053,function initialize_3053(__studio33){
__studio33.u24RecordsRestore = __studio33.csText('details','','details-box');

}],
[3055,function initialize_3055(__studio33){
__studio33.u24RecordsFile = document.createElement('input');

}],
[3060,function initialize_3060(__studio33){
__studio33.u24RecordsStatus = __studio33.csText('p','','hint');

}],
[3063,function initialize_3063(__studio33){
__studio33.u24RecordsConfirmRow = __studio33.csText('label','','u24-storage-row');
__studio33.u24RecordsConfirm = document.createElement('input');

}],
[3067,function initialize_3067(__studio33){
__studio33.u24RecordsPending = null;

}],
[3069,function initialize_3069(__studio33){
__studio33.u24RecordsApply = __studio33.u19Button('Apply reviewed saved records',__studio33.$fn(()=>{if(!__studio33.u24RecordsPending)return;if(!__studio33.u24RecordsConfirm.checked){__studio33.u24RecordsStatus.textContent='Check the confirmation before restoring the reviewed records.';__studio33.u24RecordsConfirm.focus();return}const keys=Object.keys(__studio33.u24RecordsPending),before=new Map(keys.map(k=>[k,localStorage.getItem(k)]));try{clearTimeout(__studio33.wsTimer);clearTimeout(__studio33.jsonDebounce);for(const [k,v]of Object.entries(__studio33.u24RecordsPending))localStorage.setItem(k,v);location.reload()}catch(e){for(const[k,v]of before)try{if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,v)}catch{}__studio33.u24RecordsStatus.textContent='Could not restore saved records: '+e.message+'. Some records may need restoration from your prior export.'}},"()=>{if(!u24RecordsPending)return;if(!u24RecordsConfirm.checked){u24RecordsStatus.textContent='Check the confirmation before restoring the reviewed records.';u24RecordsConfirm.focus();return}const keys=Object.keys(u24RecordsPending),before=new Map(keys.map(k=>[k,localStorage.getItem(k)]));try{clearTimeout(wsTimer);clearTimeout(jsonDebounce);for(const [k,v]of Object.entries(u24RecordsPending))localStorage.setItem(k,v);location.reload()}catch(e){for(const[k,v]of before)try{if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,v)}catch{}u24RecordsStatus.textContent='Could not restore saved records: '+e.message+'. Some records may need restoration from your prior export.'}}",""),'u24RecordsApply');

}],
[3075,function initialize_3075(__studio33){
__studio33.u24RunningButtons = new Set();

}],
[3079,function initialize_3079(__studio33){
__studio33.u24OldBackup = __studio33.backupSnapshot;

}],
[3081,function initialize_3081(__studio33){
__studio33.u24OldValidate = __studio33.validateBackup;

}],
[3083,function initialize_3083(__studio33){
__studio33.u24OldRestore = __studio33.csRestoreSavedWork;

}]
];

return {id,register,steps};
})(),
(()=>{
// core/navigation · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
const id="core/navigation";
function register(__studio33){
__studio33.u21ViewportRect = (function u21ViewportRect(){const v=window.visualViewport;return {x:v?.offsetLeft||0,y:v?.offsetTop||0,width:v?.width||innerWidth,height:v?.height||innerHeight}});

__studio33.u21PlaceMenu = __studio33.$fn((function u21PlaceMenu(panel,anchor,requested){const v=__studio33.u21ViewportRect(),gap=12,width=Math.min(requested,Math.max(120,v.width-gap*2));panel.style.setProperty('--u21-menu-width',width+'px');panel.style.setProperty('--u21-menu-height',Math.max(80,v.height-gap*2)+'px');const r=anchor.getBoundingClientRect(),h=Math.min(panel.scrollHeight,Math.max(80,v.height-gap*2)),x=Math.max(v.x+gap,Math.min(r.right-width,v.x+v.width-width-gap)),y=Math.max(v.y+gap,Math.min(r.bottom+8,v.y+v.height-h-gap));panel.style.setProperty('--u21-menu-x',x+'px');panel.style.setProperty('--u21-menu-y',y+'px')}),"function u21PlaceMenu(panel,anchor,requested){const v=u21ViewportRect(),gap=12,width=Math.min(requested,Math.max(120,v.width-gap*2));panel.style.setProperty('--u21-menu-width',width+'px');panel.style.setProperty('--u21-menu-height',Math.max(80,v.height-gap*2)+'px');const r=anchor.getBoundingClientRect(),h=Math.min(panel.scrollHeight,Math.max(80,v.height-gap*2)),x=Math.max(v.x+gap,Math.min(r.right-width,v.x+v.width-width-gap)),y=Math.max(v.y+gap,Math.min(r.bottom+8,v.y+v.height-h-gap));panel.style.setProperty('--u21-menu-x',x+'px');panel.style.setProperty('--u21-menu-y',y+'px')}","u21PlaceMenu");

__studio33.u21Position = __studio33.$fn((function u21Position(){const v=__studio33.u21ViewportRect();__studio33.u19Root.style.setProperty('--u21-vtop',v.y+'px');__studio33.u19Root.style.setProperty('--u21-vleft',v.x+'px');__studio33.u19Root.style.setProperty('--u21-vwidth',v.width+'px');const theme=!__studio33.$('themeMenu').hidden;__studio33.u19Root.classList.toggle('u21-menu-open',__studio33.u21Options.open||theme);if(__studio33.u21Options.open)__studio33.u21PlaceMenu(__studio33.u21OptionsPanel,__studio33.u21Options.querySelector('summary'),__studio33.u19Layout==='tv'?320:240);if(theme)__studio33.u21PlaceMenu(__studio33.$('themeMenu'),__studio33.$('themeToggle'),__studio33.u19Layout==='tv'?540:360)}),"function u21Position(){const v=u21ViewportRect();u19Root.style.setProperty('--u21-vtop',v.y+'px');u19Root.style.setProperty('--u21-vleft',v.x+'px');u19Root.style.setProperty('--u21-vwidth',v.width+'px');const theme=!$('themeMenu').hidden;u19Root.classList.toggle('u21-menu-open',u21Options.open||theme);if(u21Options.open)u21PlaceMenu(u21OptionsPanel,u21Options.querySelector('summary'),u19Layout==='tv'?320:240);if(theme)u21PlaceMenu($('themeMenu'),$('themeToggle'),u19Layout==='tv'?540:360)}","u21Position");

__studio33.u23Canonical = __studio33.$fn((function u23Canonical(id){return __studio33.u23Aliases[id]||id}),"function u23Canonical(id){return u23Aliases[id]||id}","u23Canonical");

__studio33.u23Statistics = __studio33.$fn((function u23Statistics(){if(__studio33.u26Booting&&__studio33.$("statistics").closest("[hidden]"))return;try{const text=__studio33.$('u23StatsInput').value.trim();if(!text)throw Error('Enter at least one number');const raw=text.split(/[\s,;]+/);if(raw.length>10000)throw Error('Use at most 10,000 numbers');const values=raw.map(__studio33.$fn(x=>{if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(x))throw Error('Use numeric values separated by commas or spaces');return __studio33.finite(Number(x))},"x=>{if(!/^[+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[eE][+-]?\\d+)?$/.test(x))throw Error('Use numeric values separated by commas or spaces');return finite(Number(x))}",""));const stats=__studio33.u26Stats(values),mean=stats.mean,sum=stats.sum,n=values.length,median=stats.median;__studio33.metricList('u23StatsResults',[['Mean',mean],['Median',median],['Sum',sum],['Count',n],['Minimum',stats.min],['Maximum',stats.max],['Population std. deviation',stats.population],['Sample std. deviation',stats.sample]]);__studio33.csStatus('statistics','Population deviation divides by n; sample deviation divides by n − 1.')}catch(e){__studio33.errorMetric('u23StatsResults',e);__studio33.csStatus('statistics',e.message,true)}}),"function u23Statistics(){if(u26Booting&&$(\"statistics\").closest(\"[hidden]\"))return;try{const text=$('u23StatsInput').value.trim();if(!text)throw Error('Enter at least one number');const raw=text.split(/[\\s,;]+/);if(raw.length>10000)throw Error('Use at most 10,000 numbers');const values=raw.map(x=>{if(!/^[+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[eE][+-]?\\d+)?$/.test(x))throw Error('Use numeric values separated by commas or spaces');return finite(Number(x))});const stats=u26Stats(values),mean=stats.mean,sum=stats.sum,n=values.length,median=stats.median;metricList('u23StatsResults',[['Mean',mean],['Median',median],['Sum',sum],['Count',n],['Minimum',stats.min],['Maximum',stats.max],['Population std. deviation',stats.population],['Sample std. deviation',stats.sample]]);csStatus('statistics','Population deviation divides by n; sample deviation divides by n − 1.')}catch(e){errorMetric('u23StatsResults',e);csStatus('statistics',e.message,true)}}","u23Statistics");

__studio33.u23Check = __studio33.$fn((function u23Check(x){if(!x||x.version!==1||!Array.isArray(x.hidden)||x.hidden.length>__studio33.u23Homes.size||new Set(x.hidden).size!==x.hidden.length||x.hidden.some(__studio33.$fn(id=>typeof id!=='string'||!__studio33.u23Homes.has(id)||id==='settings',"id=>typeof id!=='string'||!u23Homes.has(id)||id==='settings'",""))||!['posix','powershell'].includes(x.shell))throw Error('Invalid tool menu preferences');return{version:1,hidden:[...x.hidden],shell:x.shell}}),"function u23Check(x){if(!x||x.version!==1||!Array.isArray(x.hidden)||x.hidden.length>u23Homes.size||new Set(x.hidden).size!==x.hidden.length||x.hidden.some(id=>typeof id!=='string'||!u23Homes.has(id)||id==='settings')||!['posix','powershell'].includes(x.shell))throw Error('Invalid tool menu preferences');return{version:1,hidden:[...x.hidden],shell:x.shell}}","u23Check");

__studio33.u23Save = __studio33.$fn((function u23Save(){__studio33.csPersist(__studio33.u23Key,__studio33.u23State)}),"function u23Save(){csPersist(u23Key,u23State)}","u23Save");

__studio33.u23Home = __studio33.$fn((function u23Home(id){return __studio33.v12Home[__studio33.u23Canonical(id)]||__studio33.u23Canonical(id)}),"function u23Home(id){return v12Home[u23Canonical(id)]||u23Canonical(id)}","u23Home");

__studio33.u23IsExtra = __studio33.$fn((function u23IsExtra(id){return __studio33.u23State.hidden.includes(__studio33.u23Home(id))}),"function u23IsExtra(id){return u23State.hidden.includes(u23Home(id))}","u23IsExtra");

__studio33.u23Category = __studio33.$fn((function u23Category(id){const home=__studio33.u23Home(id);if(__studio33.u23IsExtra(home))return 'extra';return Object.keys(__studio33.u23Catalog).find(__studio33.$fn(key=>__studio33.u23Catalog[key].tools.includes(home),"key=>u23Catalog[key].tools.includes(home)",""))||'math'}),"function u23Category(id){const home=u23Home(id);if(u23IsExtra(home))return 'extra';return Object.keys(u23Catalog).find(key=>u23Catalog[key].tools.includes(home))||'math'}","u23Category");

__studio33.u23MenuApply = __studio33.$fn((function u23MenuApply(){for(const key of Object.keys(__studio33.toolCategories))delete __studio33.toolCategories[key];for(const[key,cat]of Object.entries(__studio33.u23Catalog))__studio33.toolCategories[key]={label:cat.label,tools:cat.tools.filter(__studio33.$fn(id=>!__studio33.u23State.hidden.includes(id),"id=>!u23State.hidden.includes(id)",""))};if(__studio33.u23State.hidden.length)__studio33.toolCategories.extra={label:'Extra utilities',tools:[...__studio33.u23State.hidden]};__studio33.$('categoryPicker').replaceChildren(...Object.entries(__studio33.toolCategories).filter(([,cat])=>cat.tools.length).map(([key,cat])=>new Option(cat.label,key)));__studio33.u23CurlShell.value=__studio33.u23State.shell;__studio33.syncToolNavigation(__studio33.activeView);__studio33.renderFavorites();__studio33.renderRecents();if(!__studio33.$('commandOverlay').hidden)__studio33.renderCommands()}),"function u23MenuApply(){for(const key of Object.keys(toolCategories))delete toolCategories[key];for(const[key,cat]of Object.entries(u23Catalog))toolCategories[key]={label:cat.label,tools:cat.tools.filter(id=>!u23State.hidden.includes(id))};if(u23State.hidden.length)toolCategories.extra={label:'Extra utilities',tools:[...u23State.hidden]};$('categoryPicker').replaceChildren(...Object.entries(toolCategories).filter(([,cat])=>cat.tools.length).map(([key,cat])=>new Option(cat.label,key)));u23CurlShell.value=u23State.shell;syncToolNavigation(activeView);renderFavorites();renderRecents();if(!$('commandOverlay').hidden)renderCommands()}","u23MenuApply");

__studio33.u23ManageRender = __studio33.$fn((function u23ManageRender(){const q=__studio33.u23ManageSearch.value.trim().toLowerCase();__studio33.u23ManageList.replaceChildren();for(const[key,cat]of Object.entries(__studio33.u23Catalog))for(const id of cat.tools){if(!(__studio33.views[id]+' '+cat.label+' '+(__studio33.u23SearchAliases[id]||'')).toLowerCase().includes(q))continue;const row=__studio33.csText('label',''),check=document.createElement('input');check.type='checkbox';check.id='u23Show-'+id;check.checked=!__studio33.u23ManageDraft.has(id);check.disabled=id==='settings';check.setAttribute('aria-label','Show '+__studio33.views[id]+' in main categories');const label=__studio33.csText('span',__studio33.views[id]);label.append(__studio33.csText('small',cat.label+(id==='settings'?' · always available':'')));row.append(check,label);check.onchange=__studio33.$fn(()=>{if(check.checked)__studio33.u23ManageDraft.delete(id);else __studio33.u23ManageDraft.add(id);__studio33.u23ManageCount.textContent=(__studio33.u23Homes.size-__studio33.u23ManageDraft.size)+' main workspaces · '+__studio33.u23ManageDraft.size+' in Extra utilities'},"()=>{if(check.checked)u23ManageDraft.delete(id);else u23ManageDraft.add(id);u23ManageCount.textContent=(u23Homes.size-u23ManageDraft.size)+' main workspaces · '+u23ManageDraft.size+' in Extra utilities'}","");__studio33.u23ManageList.append(row)}__studio33.u23ManageCount.textContent=(__studio33.u23Homes.size-__studio33.u23ManageDraft.size)+' main workspaces · '+__studio33.u23ManageDraft.size+' in Extra utilities'+(!__studio33.u23ManageList.children.length?' · no search matches':'')}),"function u23ManageRender(){const q=u23ManageSearch.value.trim().toLowerCase();u23ManageList.replaceChildren();for(const[key,cat]of Object.entries(u23Catalog))for(const id of cat.tools){if(!(views[id]+' '+cat.label+' '+(u23SearchAliases[id]||'')).toLowerCase().includes(q))continue;const row=csText('label',''),check=document.createElement('input');check.type='checkbox';check.id='u23Show-'+id;check.checked=!u23ManageDraft.has(id);check.disabled=id==='settings';check.setAttribute('aria-label','Show '+views[id]+' in main categories');const label=csText('span',views[id]);label.append(csText('small',cat.label+(id==='settings'?' · always available':'')));row.append(check,label);check.onchange=()=>{if(check.checked)u23ManageDraft.delete(id);else u23ManageDraft.add(id);u23ManageCount.textContent=(u23Homes.size-u23ManageDraft.size)+' main workspaces · '+u23ManageDraft.size+' in Extra utilities'};u23ManageList.append(row)}u23ManageCount.textContent=(u23Homes.size-u23ManageDraft.size)+' main workspaces · '+u23ManageDraft.size+' in Extra utilities'+(!u23ManageList.children.length?' · no search matches':'')}","u23ManageRender");

__studio33.n28Check = __studio33.$fn((function n28Check(value){
 if(!value||value.version!==1||!value.last||typeof value.last!=='object'||Array.isArray(value.last)||Object.keys(value.last).length>32)throw Error('Invalid navigation preferences');
 const last={};for(const[home,id]of Object.entries(value.last)){if(!__studio33.u23Homes.has(home)||!Object.hasOwn(__studio33.views,id)||__studio33.u23Home(id)!==home||__studio33.u23Aliases[id]||__studio33.v12Suites[home]&&!__studio33.v12Suites[home].includes(id)&&!(home==='dataworkbench'&&id===home))throw Error('Invalid remembered feature');last[home]=id;}
 const camera=value.camera||{mode:'edit',operation:'crop'};
 if(!['edit','extract','qr','pdf','batch'].includes(camera.mode)||!['crop','document','annotate','adjust','compress'].includes(camera.operation))throw Error('Invalid remembered image feature');
 return{version:1,last,camera:{mode:camera.mode,operation:camera.operation}};
}),"function n28Check(value){\n if(!value||value.version!==1||!value.last||typeof value.last!=='object'||Array.isArray(value.last)||Object.keys(value.last).length>32)throw Error('Invalid navigation preferences');\n const last={};for(const[home,id]of Object.entries(value.last)){if(!u23Homes.has(home)||!Object.hasOwn(views,id)||u23Home(id)!==home||u23Aliases[id]||v12Suites[home]&&!v12Suites[home].includes(id)&&!(home==='dataworkbench'&&id===home))throw Error('Invalid remembered feature');last[home]=id;}\n const camera=value.camera||{mode:'edit',operation:'crop'};\n if(!['edit','extract','qr','pdf','batch'].includes(camera.mode)||!['crop','document','annotate','adjust','compress'].includes(camera.operation))throw Error('Invalid remembered image feature');\n return{version:1,last,camera:{mode:camera.mode,operation:camera.operation}};\n}","n28Check");

__studio33.n28Defaults = (function n28Defaults(){return{version:1,last:{},camera:{mode:'edit',operation:'crop'}}});

__studio33.n28Save = __studio33.$fn((function n28Save(){if(__studio33.n28SuppressSave)return;__studio33.n28Dirty=true;clearTimeout(__studio33.n28PersistTimer);__studio33.n28PersistTimer=setTimeout(__studio33.n28Flush,180)}),"function n28Save(){if(n28SuppressSave)return;n28Dirty=true;clearTimeout(n28PersistTimer);n28PersistTimer=setTimeout(n28Flush,180)}","n28Save");

__studio33.n28Flush = __studio33.$fn((function n28Flush(){clearTimeout(__studio33.n28PersistTimer);if(__studio33.n28Dirty&&!__studio33.n28SuppressSave&&__studio33.csPersist(__studio33.n28Key,__studio33.n28State))__studio33.n28Dirty=false;}),"function n28Flush(){clearTimeout(n28PersistTimer);if(n28Dirty&&!n28SuppressSave&&csPersist(n28Key,n28State))n28Dirty=false;}","n28Flush");

__studio33.n28StopSave = __studio33.$fn((function n28StopSave(){clearTimeout(__studio33.n28PersistTimer);__studio33.n28Dirty=false;__studio33.n28SuppressSave=true;}),"function n28StopSave(){clearTimeout(n28PersistTimer);n28Dirty=false;n28SuppressSave=true;}","n28StopSave");

__studio33.n28Go = __studio33.$fn((function n28Go(id){__studio33.n28Work.close();__studio33.openTab(id)}),"function n28Go(id){n28Work.close();openTab(id)}","n28Go");

__studio33.n28WorkGroup = __studio33.$fn((function n28WorkGroup(label,ids){const section=__studio33.csText('section','','n28-work-group');section.append(__studio33.csText('h3',label));const list=__studio33.csText('div','','n28-work-list');for(const id of [...new Set(ids)].filter(__studio33.$fn(id=>Object.hasOwn(__studio33.views,id),"id=>Object.hasOwn(views,id)","")).slice(0,30))list.append(__studio33.u19Button(__studio33.views[id],__studio33.$fn(()=>__studio33.n28Go(id),"()=>n28Go(id)","")));if(!list.childElementCount)list.append(__studio33.csText('p','No items yet.','hint'));section.append(list);__studio33.n28WorkBody.append(section)}),"function n28WorkGroup(label,ids){const section=csText('section','','n28-work-group');section.append(csText('h3',label));const list=csText('div','','n28-work-list');for(const id of [...new Set(ids)].filter(id=>Object.hasOwn(views,id)).slice(0,30))list.append(u19Button(views[id],()=>n28Go(id)));if(!list.childElementCount)list.append(csText('p','No items yet.','hint'));section.append(list);n28WorkBody.append(section)}","n28WorkGroup");

__studio33.n28WorkRender = __studio33.$fn((function n28WorkRender(){__studio33.n28WorkBody.replaceChildren();__studio33.n28WorkGroup('Saved work',['projectworkspaces','formulas','shortcuts']);__studio33.n28WorkGroup('Favorites',__studio33.favorites.map(__studio33.u23Canonical));__studio33.n28WorkGroup('Recent features',__studio33.recentTools.map(__studio33.u23Canonical));const manage=__studio33.u19Button('Manage workspace visibility',__studio33.$fn(()=>{__studio33.n28Work.close();__studio33.$('u23ManageButton').click()},"()=>{n28Work.close();$('u23ManageButton').click()}",""));__studio33.n28WorkBody.append(manage);}),"function n28WorkRender(){n28WorkBody.replaceChildren();n28WorkGroup('Saved work',['projectworkspaces','formulas','shortcuts']);n28WorkGroup('Favorites',favorites.map(u23Canonical));n28WorkGroup('Recent features',recentTools.map(u23Canonical));const manage=u19Button('Manage workspace visibility',()=>{n28Work.close();$('u23ManageButton').click()});n28WorkBody.append(manage);}","n28WorkRender");

__studio33.n28Normalize = (function n28Normalize(text){return String(text||'').normalize('NFKC').toLowerCase().replace(/[→↔\/&]+/g,' ').replace(/[^\p{L}\p{N}+#.]+/gu,' ').trim()});

__studio33.n28Entry = __studio33.$fn((function n28Entry(key,id,label,tags='',extra={}){const home=__studio33.u23Home(id),cat=__studio33.n28SubjectKey(id);return{key,id,home,label,category:cat?__studio33.n28Categories[cat].label:__studio33.n28SectionText(id),search:__studio33.n28Normalize([id,label,__studio33.n28OldNames[id],tags,__studio33.u23SearchAliases[id]||'',__studio33.studioDescription(id),cat?__studio33.n28Categories[cat].label:'My Work Settings'].join(' ')),...extra}}),"function n28Entry(key,id,label,tags='',extra={}){const home=u23Home(id),cat=n28SubjectKey(id);return{key,id,home,label,category:cat?n28Categories[cat].label:n28SectionText(id),search:n28Normalize([id,label,n28OldNames[id],tags,u23SearchAliases[id]||'',studioDescription(id),cat?n28Categories[cat].label:'My Work Settings'].join(' ')),...extra}}","n28Entry");

__studio33.n28BuildIndex = __studio33.$fn((function n28BuildIndex(){
 const entries=[];
 for(const[id,label]of Object.entries(__studio33.views)){if(__studio33.u23Aliases[id])continue;entries.push(__studio33.n28Entry('tool:'+id,id,label,__studio33.n28Tags[id]||'',{root:__studio33.u23Homes.has(id)}));}
 for(const[key,label,mode,operation,tags]of __studio33.n28ImageFeatures)entries.push(__studio33.n28Entry(key,'camerastudio',label,tags,{mode,operation}));
 entries.push(__studio33.n28Entry('image-redact','camerastudio','Privacy redaction','redact hide sensitive information solid block screenshot',{mode:'edit',operation:'annotate',mark:'redact'}));
 for(const[id,selectID]of [['matrices','matrixOperation'],['equations','equationType'],['calculus','calculusOperation'],['textutils','textUtilMode'],['encoding','encodingMode'],['dates','dateOperation'],['finance','financeOperation'],['programmer','programOperation']]){
  const select=__studio33.$(selectID);if(!select)continue;
  for(const option of select.options)entries.push(__studio33.n28Entry('option:'+selectID+':'+option.value,id,option.textContent.trim(),__studio33.n28Tags[id]||'',{select:selectID,value:option.value}));
 }
 for(const[key,id,label,reveal,tags]of [
  ['resume-experience','careerresume','Work experience','cr-experience-role','experience employment resume'],
  ['resume-education','careerresume','Education','cr-education-degree','education qualification resume'],
  ['photo-table','camerastudio','Photo to editable table','ci26Table','ocr table rows columns csv review']
 ])entries.push(__studio33.n28Entry(key,id,label,tags,{reveal,mode:id==='camerastudio'?'extract':null}));
 for(const id of Object.keys(__studio33.views)){
  const panel=__studio33.$(id);if(!panel)continue;
  for(const d of panel.querySelectorAll('details')){
   const owner=d.closest('section');if(owner!==panel)continue;
   const label=d.querySelector(':scope>summary')?.textContent.trim();if(!label||__studio33.n28CommonSummaries.has(label)||d.matches('.u17-editor-menu,.u17-view-menu'))continue;
   entries.push(__studio33.n28Entry('detail:'+id+':'+entries.length,id,label,__studio33.n28Tags[id]||'',{detail:d}));
  }
 }
 return entries;
}),"function n28BuildIndex(){\n const entries=[];\n for(const[id,label]of Object.entries(views)){if(u23Aliases[id])continue;entries.push(n28Entry('tool:'+id,id,label,n28Tags[id]||'',{root:u23Homes.has(id)}));}\n for(const[key,label,mode,operation,tags]of n28ImageFeatures)entries.push(n28Entry(key,'camerastudio',label,tags,{mode,operation}));\n entries.push(n28Entry('image-redact','camerastudio','Privacy redaction','redact hide sensitive information solid block screenshot',{mode:'edit',operation:'annotate',mark:'redact'}));\n for(const[id,selectID]of [['matrices','matrixOperation'],['equations','equationType'],['calculus','calculusOperation'],['textutils','textUtilMode'],['encoding','encodingMode'],['dates','dateOperation'],['finance','financeOperation'],['programmer','programOperation']]){\n  const select=$(selectID);if(!select)continue;\n  for(const option of select.options)entries.push(n28Entry('option:'+selectID+':'+option.value,id,option.textContent.trim(),n28Tags[id]||'',{select:selectID,value:option.value}));\n }\n for(const[key,id,label,reveal,tags]of [\n  ['resume-experience','careerresume','Work experience','cr-experience-role','experience employment resume'],\n  ['resume-education','careerresume','Education','cr-education-degree','education qualification resume'],\n  ['photo-table','camerastudio','Photo to editable table','ci26Table','ocr table rows columns csv review']\n ])entries.push(n28Entry(key,id,label,tags,{reveal,mode:id==='camerastudio'?'extract':null}));\n for(const id of Object.keys(views)){\n  const panel=$(id);if(!panel)continue;\n  for(const d of panel.querySelectorAll('details')){\n   const owner=d.closest('section');if(owner!==panel)continue;\n   const label=d.querySelector(':scope>summary')?.textContent.trim();if(!label||n28CommonSummaries.has(label)||d.matches('.u17-editor-menu,.u17-view-menu'))continue;\n   entries.push(n28Entry('detail:'+id+':'+entries.length,id,label,n28Tags[id]||'',{detail:d}));\n  }\n }\n return entries;\n}","n28BuildIndex");

__studio33.n28GetIndex = __studio33.$fn((function n28GetIndex(){return __studio33.n28Index||(__studio33.n28Index=__studio33.n28BuildIndex())}),"function n28GetIndex(){return n28Index||(n28Index=n28BuildIndex())}","n28GetIndex");

__studio33.n28FeatureOpen = __studio33.$fn((function n28FeatureOpen(entry){
 if(__studio33.n28ModeDialog.open)__studio33.n28ModeDialog.close();if(__studio33.n28Work.open)__studio33.n28Work.close();if(!__studio33.$('commandOverlay').hidden)__studio33.closeCommands();
 __studio33.openTab(entry.id);
 if(entry.mode){__studio33.ciMode(entry.mode);if(entry.operation){__studio33.$('ciOperation').value=entry.operation;__studio33.$('ciOperation').dispatchEvent(new Event('change',{bubbles:true}));}}
 if(entry.mark){__studio33.$('ciMark').value=entry.mark;__studio33.$('ciMark').dispatchEvent(new Event('change',{bubbles:true}));}
 if(entry.select){const select=__studio33.$(entry.select);select.value=entry.value;select.dispatchEvent(new Event('change',{bubbles:true}));}
 if(entry.loan){__studio33.tool='loan';__studio33.renderTools();__studio33.$('tools').querySelectorAll('[data-tool]').forEach(__studio33.$fn(b=>b.setAttribute('aria-pressed',String(b.dataset.tool===__studio33.tool)),"b=>b.setAttribute('aria-pressed',String(b.dataset.tool===tool))",""));}
 if(entry.detail){__studio33.u17Reveal(entry.detail);entry.detail.open=true;const s=entry.detail.querySelector(':scope>summary');s?.focus({preventScroll:true});entry.detail.scrollIntoView({block:'start',behavior:__studio33.u19ScrollBehaviour()});}
 else if(entry.reveal){const target=__studio33.$(entry.reveal);if(target){__studio33.u17Reveal(target);target.closest('details')?.setAttribute('open','');const focus=target.matches('input,select,textarea,button,summary')?target:target.querySelector('summary,button,input,select');focus?.focus({preventScroll:true});target.scrollIntoView({block:'start',behavior:__studio33.u19ScrollBehaviour()});}}
 else if(entry.mode){const target=entry.operation?__studio33.$('ciOperation'):document.querySelector('[data-ci-mode="'+entry.mode+'"]');target?.focus({preventScroll:true});target?.scrollIntoView({block:'nearest',behavior:__studio33.u19ScrollBehaviour()});}
 else if(entry.select){const select=__studio33.$(entry.select);__studio33.u17Reveal(select);select.focus({preventScroll:true});select.scrollIntoView({block:'nearest',behavior:__studio33.u19ScrollBehaviour()});}
 else {const p=__studio33.$(__studio33.activeView),h=p?.querySelector(':scope>.panel-heading');if(h){h.tabIndex=-1;h.focus({preventScroll:true});h.scrollIntoView({block:'nearest',behavior:__studio33.u19ScrollBehaviour()});}}
}),"function n28FeatureOpen(entry){\n if(n28ModeDialog.open)n28ModeDialog.close();if(n28Work.open)n28Work.close();if(!$('commandOverlay').hidden)closeCommands();\n openTab(entry.id);\n if(entry.mode){ciMode(entry.mode);if(entry.operation){$('ciOperation').value=entry.operation;$('ciOperation').dispatchEvent(new Event('change',{bubbles:true}));}}\n if(entry.mark){$('ciMark').value=entry.mark;$('ciMark').dispatchEvent(new Event('change',{bubbles:true}));}\n if(entry.select){const select=$(entry.select);select.value=entry.value;select.dispatchEvent(new Event('change',{bubbles:true}));}\n if(entry.loan){tool='loan';renderTools();$('tools').querySelectorAll('[data-tool]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tool===tool)));}\n if(entry.detail){u17Reveal(entry.detail);entry.detail.open=true;const s=entry.detail.querySelector(':scope>summary');s?.focus({preventScroll:true});entry.detail.scrollIntoView({block:'start',behavior:u19ScrollBehaviour()});}\n else if(entry.reveal){const target=$(entry.reveal);if(target){u17Reveal(target);target.closest('details')?.setAttribute('open','');const focus=target.matches('input,select,textarea,button,summary')?target:target.querySelector('summary,button,input,select');focus?.focus({preventScroll:true});target.scrollIntoView({block:'start',behavior:u19ScrollBehaviour()});}}\n else if(entry.mode){const target=entry.operation?$('ciOperation'):document.querySelector('[data-ci-mode=\"'+entry.mode+'\"]');target?.focus({preventScroll:true});target?.scrollIntoView({block:'nearest',behavior:u19ScrollBehaviour()});}\n else if(entry.select){const select=$(entry.select);u17Reveal(select);select.focus({preventScroll:true});select.scrollIntoView({block:'nearest',behavior:u19ScrollBehaviour()});}\n else {const p=$(activeView),h=p?.querySelector(':scope>.panel-heading');if(h){h.tabIndex=-1;h.focus({preventScroll:true});h.scrollIntoView({block:'nearest',behavior:u19ScrollBehaviour()});}}\n}","n28FeatureOpen");

__studio33.n28FeatureItems = __studio33.$fn((function n28FeatureItems(home){return __studio33.n28GetIndex().filter(e=>e.home===home&&(!e.root||e.home==='dataworkbench')&&(!e.key.startsWith('tool:'+home)||e.home==='dataworkbench'));}),"function n28FeatureItems(home){return n28GetIndex().filter(e=>e.home===home&&(!e.root||e.home==='dataworkbench')&&(!e.key.startsWith('tool:'+home)||e.home==='dataworkbench'));}","n28FeatureItems");

__studio33.n28FeatureRender = __studio33.$fn((function n28FeatureRender(){const q=__studio33.n28Normalize(__studio33.n28ModeSearch.value),items=__studio33.n28FeatureItems(__studio33.n28FeatureHome).filter(__studio33.$fn(e=>!q||q.split(' ').every(__studio33.$fn(t=>__studio33.n28Normalize(e.label).includes(t),"t=>n28Normalize(e.label).includes(t)","")),"e=>!q||q.split(' ').every(t=>n28Normalize(e.label).includes(t))",""));__studio33.n28ModeList.replaceChildren();for(const e of items){const b=__studio33.u19Button(e.label,__studio33.$fn(()=>__studio33.n28FeatureOpen(e),"()=>n28FeatureOpen(e)",""));b.dataset.feature=e.key;b.setAttribute('aria-current',String(e.id===__studio33.activeView&&!e.detail&&!e.mode));__studio33.n28ModeList.append(b)}if(!items.length)__studio33.n28ModeList.append(__studio33.csText('p','No matching features.','hint'));}),"function n28FeatureRender(){const q=n28Normalize(n28ModeSearch.value),items=n28FeatureItems(n28FeatureHome).filter(e=>!q||q.split(' ').every(t=>n28Normalize(e.label).includes(t)));n28ModeList.replaceChildren();for(const e of items){const b=u19Button(e.label,()=>n28FeatureOpen(e));b.dataset.feature=e.key;b.setAttribute('aria-current',String(e.id===activeView&&!e.detail&&!e.mode));n28ModeList.append(b)}if(!items.length)n28ModeList.append(csText('p','No matching features.','hint'));}","n28FeatureRender");

__studio33.n28Rank = __studio33.$fn((function n28Rank(entry,q,tokens){const label=__studio33.n28Normalize(entry.label),featureBonus=entry.mode?40:0;if(label===q)return 1000;if(label.startsWith(q))return 850+featureBonus;if(label.includes(q))return 700+featureBonus;if(!tokens.every(t=>entry.search.includes(t)))return -1;return (entry.root?80:100)+(entry.mode?120:0)+(tokens.every(t=>label.includes(t))?300:0);}),"function n28Rank(entry,q,tokens){const label=n28Normalize(entry.label),featureBonus=entry.mode?40:0;if(label===q)return 1000;if(label.startsWith(q))return 850+featureBonus;if(label.includes(q))return 700+featureBonus;if(!tokens.every(t=>entry.search.includes(t)))return -1;return (entry.root?80:100)+(entry.mode?120:0)+(tokens.every(t=>label.includes(t))?300:0);}","n28Rank");

__studio33.n28Decorate = __studio33.$fn((function n28Decorate(id){
 const panel=__studio33.$(id);if(!panel)return;
 const own=e=>e.closest('section')===panel;
 const primary=__studio33.$(__studio33.n28Primary[id])||__studio33.u17Panels.get(id)?.primary;
 if(primary){primary.dataset.n28Primary='true';panel.classList.add('n28-single-primary');}
 for(const {editor,tools}of __studio33.v13Editors.values())if(panel.contains(editor)&&own(editor)){
  tools.classList.add('n28-editor-actions');tools.setAttribute('aria-label',(editor.readOnly?'Result':'Input')+' editor actions');
 }
 for(const d of panel.querySelectorAll('details'))if(own(d)&&d.querySelector(':scope>summary')?.textContent==='Undo edits & output views'){
  const ids=[...d.querySelectorAll('select option')].map(e=>e.value).filter(__studio33.$fn(id=>__studio33.$(id)?.tagName==='TEXTAREA',"id=>$(id)?.tagName==='TEXTAREA'",""));
  if(ids.length&&ids.every(__studio33.$fn(id=>__studio33.v13Editors.has(id),"id=>v13Editors.has(id)","")))d.hidden=true;
 }
 for(const e of panel.querySelectorAll('.u17-result-actions'))if(own(e)){e.classList.add('n28-result-actions');e.setAttribute('aria-label','Copy, download and reuse result');}
 const heading=panel.querySelector(':scope>.panel-heading');if(heading)heading.dataset.n28Phase='workspace';
}),"function n28Decorate(id){\n const panel=$(id);if(!panel)return;\n const own=e=>e.closest('section')===panel;\n const primary=$(n28Primary[id])||u17Panels.get(id)?.primary;\n if(primary){primary.dataset.n28Primary='true';panel.classList.add('n28-single-primary');}\n for(const {editor,tools}of v13Editors.values())if(panel.contains(editor)&&own(editor)){\n  tools.classList.add('n28-editor-actions');tools.setAttribute('aria-label',(editor.readOnly?'Result':'Input')+' editor actions');\n }\n for(const d of panel.querySelectorAll('details'))if(own(d)&&d.querySelector(':scope>summary')?.textContent==='Undo edits & output views'){\n  const ids=[...d.querySelectorAll('select option')].map(e=>e.value).filter(id=>$(id)?.tagName==='TEXTAREA');\n  if(ids.length&&ids.every(id=>v13Editors.has(id)))d.hidden=true;\n }\n for(const e of panel.querySelectorAll('.u17-result-actions'))if(own(e)){e.classList.add('n28-result-actions');e.setAttribute('aria-label','Copy, download and reuse result');}\n const heading=panel.querySelector(':scope>.panel-heading');if(heading)heading.dataset.n28Phase='workspace';\n}","n28Decorate");

__studio33.n28ActiveTab = __studio33.$fn((function n28ActiveTab(){const tabs=__studio33.n28FeatureControls.get(__studio33.u23Home(__studio33.activeView))?.tabs,b=tabs?.querySelector('[aria-selected=true]');if(!b)return;const t=tabs.getBoundingClientRect(),r=b.getBoundingClientRect();if(r.left<t.left)tabs.scrollLeft-=t.left-r.left;else if(r.right>t.right)tabs.scrollLeft+=r.right-t.right;}),"function n28ActiveTab(){const tabs=n28FeatureControls.get(u23Home(activeView))?.tabs,b=tabs?.querySelector('[aria-selected=true]');if(!b)return;const t=tabs.getBoundingClientRect(),r=b.getBoundingClientRect();if(r.left<t.left)tabs.scrollLeft-=t.left-r.left;else if(r.right>t.right)tabs.scrollLeft+=r.right-t.right;}","n28ActiveTab");

__studio33.n28DecorateCurrent = __studio33.$fn((function n28DecorateCurrent(){__studio33.n28Decorate(__studio33.activeView);if(__studio33.u23Home(__studio33.activeView)!==__studio33.activeView)__studio33.n28Decorate(__studio33.u23Home(__studio33.activeView));}),"function n28DecorateCurrent(){n28Decorate(activeView);if(u23Home(activeView)!==activeView)n28Decorate(u23Home(activeView));}","n28DecorateCurrent");

__studio33.cs29Defaults = (function cs29Defaults(){return{version:1,density:'compact',favorites:false}});

__studio33.cs29Check = (function cs29Check(s){if(!s||s.version!==1||!['compact','comfortable'].includes(s.density)||typeof s.favorites!=='boolean')throw Error('Invalid workspace appearance preferences');return{version:1,density:s.density,favorites:s.favorites}});

__studio33.cs29Apply = __studio33.$fn((function cs29Apply(){__studio33.u19Root.dataset.workspaceDensity=__studio33.cs29State.density;__studio33.cs29Density.value=__studio33.cs29State.density;__studio33.cs29Favorites.checked=__studio33.cs29State.favorites;if(__studio33.cs29SavedStrip)__studio33.cs29SavedStrip.hidden=!__studio33.cs29State.favorites;__studio33.cs29Schedule()}),"function cs29Apply(){u19Root.dataset.workspaceDensity=cs29State.density;cs29Density.value=cs29State.density;cs29Favorites.checked=cs29State.favorites;if(cs29SavedStrip)cs29SavedStrip.hidden=!cs29State.favorites;cs29Schedule()}","cs29Apply");

__studio33.cs29Save = __studio33.$fn((function cs29Save(){__studio33.csPersist(__studio33.cs29Key,__studio33.cs29State);__studio33.cs29Apply()}),"function cs29Save(){csPersist(cs29Key,cs29State);cs29Apply()}","cs29Save");

__studio33.cs29Dialogs = (function cs29Dialogs(){for(const d of document.querySelectorAll('dialog:not(.cs29-dialog)'))d.classList.add('cs29-surface','cs29-dialog');});

__studio33.cs29Icons = __studio33.$fn((function cs29Icons(tools){
 tools.classList.add('cs29-editor-icons');
 for(const b of tools.querySelectorAll(':scope>button')){
  if(b.querySelector('.cs29-icon-glyph'))continue;
  const name=b.hasAttribute('data-expand')?'Expand':b.textContent.trim(),glyph=name==='Undo'?'↶':name==='Redo'?'↷':b.hasAttribute('data-expand')?'⤢':null;if(!glyph){if(!b.hasAttribute('aria-label'))b.setAttribute('aria-label',name);continue;}
  b.classList.add('cs29-icon-button');b.setAttribute('aria-label',name);b.title=name;const text=__studio33.csText('span',name,'cs29-sr'),symbol=__studio33.csText('span',glyph,'cs29-icon-glyph');symbol.setAttribute('aria-hidden','true');b.replaceChildren(text,symbol);__studio33.u17SetRole(b,'utility');
 }
 tools.querySelector(':scope>span.hint')?.classList.add('cs29-sr');
}),"function cs29Icons(tools){\n tools.classList.add('cs29-editor-icons');\n for(const b of tools.querySelectorAll(':scope>button')){\n  if(b.querySelector('.cs29-icon-glyph'))continue;\n  const name=b.hasAttribute('data-expand')?'Expand':b.textContent.trim(),glyph=name==='Undo'?'↶':name==='Redo'?'↷':b.hasAttribute('data-expand')?'⤢':null;if(!glyph){if(!b.hasAttribute('aria-label'))b.setAttribute('aria-label',name);continue;}\n  b.classList.add('cs29-icon-button');b.setAttribute('aria-label',name);b.title=name;const text=csText('span',name,'cs29-sr'),symbol=csText('span',glyph,'cs29-icon-glyph');symbol.setAttribute('aria-hidden','true');b.replaceChildren(text,symbol);u17SetRole(b,'utility');\n }\n tools.querySelector(':scope>span.hint')?.classList.add('cs29-sr');\n}","cs29Icons");

__studio33.cs29Field = __studio33.$fn((function cs29Field(editor){
 if(editor.closest('#typing,#keypads')||__studio33.v13Focused?.editor===editor)return;
 const field=editor.closest('.field,.cr-field')||editor.parentElement,rec=__studio33.v13Editors.get(editor.id);if(!rec)return;if(field.tagName==='LABEL')field.htmlFor=editor.id;__studio33.cs29Icons(rec.tools);
 let head=field.querySelector(':scope>.cs29-field-head');
 if(!head){const title=field.querySelector(':scope>span');if(!title)return;head=__studio33.csText('div','','cs29-field-head');title.before(head);title.classList.add('cs29-field-title');head.append(title);}
 const controls=rec.tools.closest('.u17-editor-controls')||rec.tools;if(!head.contains(controls))head.append(controls);
 for(const node of field.querySelectorAll(':scope>.u17-result-actions,:scope>.u17-field-actions,:scope>.v12-output-tabs'))head.append(node);
 if(!__studio33.cs29Fields.has(editor.id)){const anchor=document.createComment('workspace editor position');const holder=editor.closest('.u15-numbered')||editor;holder.before(anchor);__studio33.cs29Fields.set(editor.id,{field,head,anchor,editor});}
 if(field.classList.contains('cr-field'))editor.classList.add('cs29-short');
}),"function cs29Field(editor){\n if(editor.closest('#typing,#keypads')||v13Focused?.editor===editor)return;\n const field=editor.closest('.field,.cr-field')||editor.parentElement,rec=v13Editors.get(editor.id);if(!rec)return;if(field.tagName==='LABEL')field.htmlFor=editor.id;cs29Icons(rec.tools);\n let head=field.querySelector(':scope>.cs29-field-head');\n if(!head){const title=field.querySelector(':scope>span');if(!title)return;head=csText('div','','cs29-field-head');title.before(head);title.classList.add('cs29-field-title');head.append(title);}\n const controls=rec.tools.closest('.u17-editor-controls')||rec.tools;if(!head.contains(controls))head.append(controls);\n for(const node of field.querySelectorAll(':scope>.u17-result-actions,:scope>.u17-field-actions,:scope>.v12-output-tabs'))head.append(node);\n if(!cs29Fields.has(editor.id)){const anchor=document.createComment('workspace editor position');const holder=editor.closest('.u15-numbered')||editor;holder.before(anchor);cs29Fields.set(editor.id,{field,head,anchor,editor});}\n if(field.classList.contains('cr-field'))editor.classList.add('cs29-short');\n}","cs29Field");

__studio33.cs29About = __studio33.$fn((function cs29About(panel){if(__studio33.cs29AboutDone.has(panel))return;__studio33.cs29AboutDone.add(panel);const intro=panel.querySelector(':scope>.cs-intro'),heading=panel.querySelector(':scope>.panel-heading');if(!intro?.textContent.trim())return;
 if(__studio33.v12Home[panel.id]){const advanced=__studio33.u17Panels.get(panel.id)?.advanced;if(advanced){if(!advanced.isConnected)panel.append(advanced);const help=advanced.querySelector('.u17-help')||__studio33.csText('div','','u17-help');if(!help.isConnected)advanced.append(help);help.prepend(intro);}return;}
 if(!heading)return;const about=__studio33.csText('details','','cs29-about u17-view-menu'),body=__studio33.csText('div','');about.append(__studio33.csText('summary','About'),body);body.append(intro);heading.append(about);
}),"function cs29About(panel){if(cs29AboutDone.has(panel))return;cs29AboutDone.add(panel);const intro=panel.querySelector(':scope>.cs-intro'),heading=panel.querySelector(':scope>.panel-heading');if(!intro?.textContent.trim())return;\n if(v12Home[panel.id]){const advanced=u17Panels.get(panel.id)?.advanced;if(advanced){if(!advanced.isConnected)panel.append(advanced);const help=advanced.querySelector('.u17-help')||csText('div','','u17-help');if(!help.isConnected)advanced.append(help);help.prepend(intro);}return;}\n if(!heading)return;const about=csText('details','','cs29-about u17-view-menu'),body=csText('div','');about.append(csText('summary','About'),body);body.append(intro);heading.append(about);\n}","cs29About");

__studio33.cs29Advanced = __studio33.$fn((function cs29Advanced(panel){const advanced=__studio33.u17Panels.get(panel.id)?.advanced;if(!advanced?.isConnected||__studio33.cs29AdvancedDone.has(advanced))return;__studio33.cs29AdvancedDone.add(advanced);const children=[...advanced.children].filter(e=>e.tagName!=='SUMMARY');if(children.length<3)return;
 const groups=new Map();for(const child of children){const title=child.querySelector(':scope>summary')?.textContent||'',kind=child.matches('.u17-help')||/help|limits|privacy/i.test(title)?'Help & limits':/saved|draft|recovery|backup|templates|shared source/i.test(title)?'Saved work':/editor|output view|scroll|input.*layout|workspace settings/i.test(title)?'Reading & workspace settings':'Processing rules & features';if(!groups.has(kind)){const group=__studio33.csText('div','','cs29-advanced-group');group.append(__studio33.csText('h3',kind));groups.set(kind,group);}groups.get(kind).append(child);}
 for(const group of groups.values())advanced.append(group);
}),"function cs29Advanced(panel){const advanced=u17Panels.get(panel.id)?.advanced;if(!advanced?.isConnected||cs29AdvancedDone.has(advanced))return;cs29AdvancedDone.add(advanced);const children=[...advanced.children].filter(e=>e.tagName!=='SUMMARY');if(children.length<3)return;\n const groups=new Map();for(const child of children){const title=child.querySelector(':scope>summary')?.textContent||'',kind=child.matches('.u17-help')||/help|limits|privacy/i.test(title)?'Help & limits':/saved|draft|recovery|backup|templates|shared source/i.test(title)?'Saved work':/editor|output view|scroll|input.*layout|workspace settings/i.test(title)?'Reading & workspace settings':'Processing rules & features';if(!groups.has(kind)){const group=csText('div','','cs29-advanced-group');group.append(csText('h3',kind));groups.set(kind,group);}groups.get(kind).append(child);}\n for(const group of groups.values())advanced.append(group);\n}","cs29Advanced");

__studio33.cs29Status = __studio33.$fn((function cs29Status(id){const r=__studio33.u22Runs.get(id);if(!r)return;let actual=__studio33.cs29Statuses.get(id);const p=__studio33.$(id);
 if(!actual){const candidates=[...p.querySelectorAll('.developer-status[id],.u15-status[id]')].filter(e=>e.closest('section')===p&&!e.closest('details')&&!r.bar.contains(e));actual=candidates[0];if(actual){actual.classList.add('cs29-actual-status');r.bar.append(actual);__studio33.cs29Statuses.set(id,actual);}}
 r.bar.classList.add('cs29-statusline');if(!actual)return;const stale=['stale','running','cancelled'].includes(r.state),has=!!actual.textContent.trim();if(actual.hidden!==stale)actual.hidden=stale;const hideNote=!stale&&has;if(r.note.hidden!==hideNote)r.note.hidden=hideNote;__studio33.cs29StatusRuns++;
}),"function cs29Status(id){const r=u22Runs.get(id);if(!r)return;let actual=cs29Statuses.get(id);const p=$(id);\n if(!actual){const candidates=[...p.querySelectorAll('.developer-status[id],.u15-status[id]')].filter(e=>e.closest('section')===p&&!e.closest('details')&&!r.bar.contains(e));actual=candidates[0];if(actual){actual.classList.add('cs29-actual-status');r.bar.append(actual);cs29Statuses.set(id,actual);}}\n r.bar.classList.add('cs29-statusline');if(!actual)return;const stale=['stale','running','cancelled'].includes(r.state),has=!!actual.textContent.trim();if(actual.hidden!==stale)actual.hidden=stale;const hideNote=!stale&&has;if(r.note.hidden!==hideNote)r.note.hidden=hideNote;cs29StatusRuns++;\n}","cs29Status");

__studio33.cs29Context = __studio33.$fn((function cs29Context(panel){const box=__studio33.$('u24Empty-'+panel.id);if(box){const label=box.querySelector(':scope>p');if(label?.textContent!=='Add data')label.textContent='Add data';const empty=!box.hidden;if(panel.dataset.cs29Empty!==String(empty))panel.dataset.cs29Empty=String(empty);for(const b of panel.querySelectorAll('.u17-field-actions button'))if(/^(Upload|Open file)\b/i.test(b.textContent))b.dataset.cs29DuplicateUpload='true';}
 for(const b of panel.querySelectorAll('button[data-u17-role=primary]'))if(b.closest('section')===panel&&!b.closest('details'))b.classList.toggle('cs29-secondary',!b.dataset.n28Primary);
 if(panel.id==='camerastudio'){const main=__studio33.ci.stream?'ciSnap':__studio33.ci.mode==='pdf'?(__studio33.ci.pages.length?'ciBuildPDF':'ciPDFFilesButton'):__studio33.ci.mode==='batch'?'ciRunBatch':__studio33.ci.mode==='qr'?(__studio33.ci.canvas?'ciScanQR':'ciQRLiveStart'):!__studio33.ci.canvas?'ciUpload':__studio33.ci.mode==='extract'?'ciOCR':({crop:'ciCrop',document:'ciDocument',annotate:'ciExportPreview',adjust:'ciAdjust',compress:'ciCompress'}[__studio33.$('ciOperation').value]);for(const id of ['ciUpload','ciSnap','ciBuildPDF','ciPDFFilesButton','ciRunBatch','ciScanQR','ciQRLiveStart','ciOCR','ciCrop','ciDocument','ciExportPreview','ciAdjust','ciCompress'])__studio33.$(id)?.classList.toggle('cs29-main',id===main);}
}),"function cs29Context(panel){const box=$('u24Empty-'+panel.id);if(box){const label=box.querySelector(':scope>p');if(label?.textContent!=='Add data')label.textContent='Add data';const empty=!box.hidden;if(panel.dataset.cs29Empty!==String(empty))panel.dataset.cs29Empty=String(empty);for(const b of panel.querySelectorAll('.u17-field-actions button'))if(/^(Upload|Open file)\\b/i.test(b.textContent))b.dataset.cs29DuplicateUpload='true';}\n for(const b of panel.querySelectorAll('button[data-u17-role=primary]'))if(b.closest('section')===panel&&!b.closest('details'))b.classList.toggle('cs29-secondary',!b.dataset.n28Primary);\n if(panel.id==='camerastudio'){const main=ci.stream?'ciSnap':ci.mode==='pdf'?(ci.pages.length?'ciBuildPDF':'ciPDFFilesButton'):ci.mode==='batch'?'ciRunBatch':ci.mode==='qr'?(ci.canvas?'ciScanQR':'ciQRLiveStart'):!ci.canvas?'ciUpload':ci.mode==='extract'?'ciOCR':({crop:'ciCrop',document:'ciDocument',annotate:'ciExportPreview',adjust:'ciAdjust',compress:'ciCompress'}[$('ciOperation').value]);for(const id of ['ciUpload','ciSnap','ciBuildPDF','ciPDFFilesButton','ciRunBatch','ciScanQR','ciQRLiveStart','ciOCR','ciCrop','ciDocument','ciExportPreview','ciAdjust','ciCompress'])$(id)?.classList.toggle('cs29-main',id===main);}\n}","cs29Context");

__studio33.cs29Prepare = __studio33.$fn((function cs29Prepare(){if(__studio33.cs29Preparing)return;__studio33.cs29Preparing=true;try{const home=__studio33.u23Home(__studio33.activeView),panel=__studio33.$(__studio33.activeView);if(!panel)return;const expanded=__studio33.v13EditorDialog.querySelector('[data-expand]');if(expanded&&expanded.getAttribute('aria-label')!=='Exit expanded editor'){expanded.setAttribute('aria-label','Exit expanded editor');expanded.title='Exit expanded editor';}__studio33.u24EnsureEditors(panel);if(home!==__studio33.activeView)for(const e of __studio33.$(home).querySelectorAll(':scope>.field,:scope>label'))__studio33.u24EnsureEditors(e);
 for(const target of new Set([panel,__studio33.$(home)])){__studio33.cs29About(target);__studio33.cs29Advanced(target);__studio33.cs29Context(target);}
 for(const editor of panel.querySelectorAll('textarea[id]'))__studio33.cs29Field(editor);if(home!==__studio33.activeView)for(const editor of __studio33.$(home).querySelectorAll(':scope>.field textarea,:scope>label textarea'))__studio33.cs29Field(editor);
 __studio33.cs29Status(__studio33.activeView);__studio33.u17MobileSync();
 }finally{__studio33.cs29Preparing=false;}}),"function cs29Prepare(){if(cs29Preparing)return;cs29Preparing=true;try{const home=u23Home(activeView),panel=$(activeView);if(!panel)return;const expanded=v13EditorDialog.querySelector('[data-expand]');if(expanded&&expanded.getAttribute('aria-label')!=='Exit expanded editor'){expanded.setAttribute('aria-label','Exit expanded editor');expanded.title='Exit expanded editor';}u24EnsureEditors(panel);if(home!==activeView)for(const e of $(home).querySelectorAll(':scope>.field,:scope>label'))u24EnsureEditors(e);\n for(const target of new Set([panel,$(home)])){cs29About(target);cs29Advanced(target);cs29Context(target);}\n for(const editor of panel.querySelectorAll('textarea[id]'))cs29Field(editor);if(home!==activeView)for(const editor of $(home).querySelectorAll(':scope>.field textarea,:scope>label textarea'))cs29Field(editor);\n cs29Status(activeView);u17MobileSync();\n }finally{cs29Preparing=false;}}","cs29Prepare");

__studio33.cs29Schedule = __studio33.$fn((function cs29Schedule(){if(__studio33.cs29Frame)return;__studio33.cs29Frame=requestAnimationFrame(__studio33.$fn(()=>{__studio33.cs29Frame=0;__studio33.cs29Prepare()},"()=>{cs29Frame=0;cs29Prepare()}",""))}),"function cs29Schedule(){if(cs29Frame)return;cs29Frame=requestAnimationFrame(()=>{cs29Frame=0;cs29Prepare()})}","cs29Schedule");

__studio33.cs29Observe = __studio33.$fn((function cs29Observe(){__studio33.cs29Observer.disconnect();const p=__studio33.$(__studio33.activeView);if(p)__studio33.cs29Observer.observe(p,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['disabled','hidden','data-state','data-error']});__studio33.cs29Observer.observe(__studio33.v13EditorDialog,{subtree:true,childList:true,characterData:true});}),"function cs29Observe(){cs29Observer.disconnect();const p=$(activeView);if(p)cs29Observer.observe(p,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['disabled','hidden','data-state','data-error']});cs29Observer.observe(v13EditorDialog,{subtree:true,childList:true,characterData:true});}","cs29Observe");

__studio33.cs29RememberScroll = __studio33.$fn((function cs29RememberScroll(id){const p=__studio33.$(id);if(!p)return;const rows=[...p.querySelectorAll('textarea,.table-scroll,.u19-media-viewport,.n28-tabs')].slice(0,24).map(e=>({e,x:e.scrollLeft,y:e.scrollTop}));__studio33.cs29Scrolls.set(id,rows);}),"function cs29RememberScroll(id){const p=$(id);if(!p)return;const rows=[...p.querySelectorAll('textarea,.table-scroll,.u19-media-viewport,.n28-tabs')].slice(0,24).map(e=>({e,x:e.scrollLeft,y:e.scrollTop}));cs29Scrolls.set(id,rows);}","cs29RememberScroll");

__studio33.cs29RestoreScroll = __studio33.$fn((function cs29RestoreScroll(id){for(const {e,x,y}of __studio33.cs29Scrolls.get(id)||[])if(e.isConnected){e.scrollLeft=x;e.scrollTop=y;}}),"function cs29RestoreScroll(id){for(const {e,x,y}of cs29Scrolls.get(id)||[])if(e.isConnected){e.scrollLeft=x;e.scrollTop=y;}}","cs29RestoreScroll");

__studio33.cs30Heading = __studio33.$fn((function cs30Heading(id,title){const p=__studio33.$(id);__studio33.views[id]=title;p.setAttribute('aria-label',title);const h=p.querySelector(':scope>.panel-heading h1,:scope>.panel-heading h2');if(h)h.textContent=title;}),"function cs30Heading(id,title){const p=$(id);views[id]=title;p.setAttribute('aria-label',title);const h=p.querySelector(':scope>.panel-heading h1,:scope>.panel-heading h2');if(h)h.textContent=title;}","cs30Heading");

__studio33.cs30Root = __studio33.$fn((function cs30Root(id,title){const p=__studio33.$(id)||document.createElement('section');p.id=id;p.hidden=true;p.classList.add('extra-panel','cs29-surface');p.setAttribute('aria-label',title);if(!p.querySelector(':scope>.panel-heading')){const h=__studio33.csText('div','','panel-heading');h.append(__studio33.csText('h2',title));p.append(h);}if(!p.isConnected)__studio33.u19Card.append(p);__studio33.views[id]=title;return p;}),"function cs30Root(id,title){const p=$(id)||document.createElement('section');p.id=id;p.hidden=true;p.classList.add('extra-panel','cs29-surface');p.setAttribute('aria-label',title);if(!p.querySelector(':scope>.panel-heading')){const h=csText('div','','panel-heading');h.append(csText('h2',title));p.append(h);}if(!p.isConnected)u19Card.append(p);views[id]=title;return p;}","cs30Root");

__studio33.cs30NativeCore = __studio33.$fn((function cs30NativeCore(id){const p=__studio33.$(id),core=__studio33.csText('div','','cs30-native-core');core.id='cs30Core-'+id;const heading=p.querySelector(':scope>.panel-heading');for(const child of [...p.children])if(child!==heading)core.append(child);const actions=__studio33.csText('div','','row studio-actions');for(const child of [...heading.children])if(!child.matches('h1,h2,.cs29-about'))actions.append(child);if(actions.childElementCount)core.prepend(actions);p.append(core);__studio33.cs30Native.set(id,core);return core;}),"function cs30NativeCore(id){const p=$(id),core=csText('div','','cs30-native-core');core.id='cs30Core-'+id;const heading=p.querySelector(':scope>.panel-heading');for(const child of [...p.children])if(child!==heading)core.append(child);const actions=csText('div','','row studio-actions');for(const child of [...heading.children])if(!child.matches('h1,h2,.cs29-about'))actions.append(child);if(actions.childElementCount)core.prepend(actions);p.append(core);cs30Native.set(id,core);return core;}","cs30NativeCore");

__studio33.cs30Features = __studio33.$fn((function cs30Features(home){__studio33.n28FeatureHome=home;__studio33.n28ModeSearch.value='';__studio33.n28ModeDialog.querySelector('h2').textContent=__studio33.views[home]+' · features';__studio33.n28FeatureRender();__studio33.u19OpenDialog(__studio33.n28ModeDialog,__studio33.u19Layout==='tv'?__studio33.$('n28FeaturesClose'):__studio33.n28ModeSearch);}),"function cs30Features(home){n28FeatureHome=home;n28ModeSearch.value='';n28ModeDialog.querySelector('h2').textContent=views[home]+' · features';n28FeatureRender();u19OpenDialog(n28ModeDialog,u19Layout==='tv'?$('n28FeaturesClose'):n28ModeSearch);}","cs30Features");

__studio33.cs30ManageCount = __studio33.$fn((function cs30ManageCount(){__studio33.u23ManageCount.textContent=(__studio33.u23Homes.size-__studio33.u23ManageDraft.size)+' visible workspaces · '+__studio33.u23ManageDraft.size+' optional workspaces · '+__studio33.cs30ManageFeatures.size+' optional features';}),"function cs30ManageCount(){u23ManageCount.textContent=(u23Homes.size-u23ManageDraft.size)+' visible workspaces · '+u23ManageDraft.size+' optional workspaces · '+cs30ManageFeatures.size+' optional features';}","cs30ManageCount");

__studio33.cs30OpenHome = __studio33.$fn((function cs30OpenHome(home){const modes=__studio33.v12Suites[home];if(!modes)return __studio33.openTab(home);const saved=__studio33.n28State.last[home],target=modes.includes(saved)&&!__studio33.u23State.hiddenModes.includes(saved)?saved:modes.find(__studio33.$fn(id=>!__studio33.u23State.hiddenModes.includes(id),"id=>!u23State.hiddenModes.includes(id)",""))||modes[0];__studio33.openTab(target);}),"function cs30OpenHome(home){const modes=v12Suites[home];if(!modes)return openTab(home);const saved=n28State.last[home],target=modes.includes(saved)&&!u23State.hiddenModes.includes(saved)?saved:modes.find(id=>!u23State.hiddenModes.includes(id))||modes[0];openTab(target);}","cs30OpenHome");

__studio33.cs30Cache = __studio33.$fn((function cs30Cache(panel){if(++__studio33.cs30CachePasses%32===0)for(const[id,node]of __studio33.cs30NodeCache){const root=node.getRootNode();if(root!==document&&!__studio33.cs30TemplateRoots.has(root))__studio33.cs30NodeCache.delete(id);}for(const e of [panel,...panel.querySelectorAll('[id]')])if(e.id)__studio33.cs30NodeCache.set(e.id,e);}),"function cs30Cache(panel){if(++cs30CachePasses%32===0)for(const[id,node]of cs30NodeCache){const root=node.getRootNode();if(root!==document&&!cs30TemplateRoots.has(root))cs30NodeCache.delete(id);}for(const e of [panel,...panel.querySelectorAll('[id]')])if(e.id)cs30NodeCache.set(e.id,e);}","cs30Cache");

__studio33.cs30Mount = __studio33.$fn((function cs30Mount(home){const r=__studio33.cs30Parked.get(home);if(!r)return;const p=r.template.content.firstElementChild;if(!p)return;r.template.replaceWith(p);__studio33.cs30TemplateRoots.delete(r.template.content);__studio33.cs30Parked.delete(home);__studio33.cs30Metrics.mounts++;}),"function cs30Mount(home){const r=cs30Parked.get(home);if(!r)return;const p=r.template.content.firstElementChild;if(!p)return;r.template.replaceWith(p);cs30TemplateRoots.delete(r.template.content);cs30Parked.delete(home);cs30Metrics.mounts++;}","cs30Mount");

__studio33.cs30MountAll = __studio33.$fn((function cs30MountAll(){for(const home of [...__studio33.cs30Parked.keys()])__studio33.cs30Mount(home);}),"function cs30MountAll(){for(const home of [...cs30Parked.keys()])cs30Mount(home);}","cs30MountAll");

__studio33.cs30Park = __studio33.$fn((function cs30Park(home){const p=__studio33.$(home);if(!p?.isConnected||!p.hidden||p.contains(document.activeElement)||p.querySelector('dialog[open]'))return;__studio33.cs30Cache(p);const t=document.createElement('template');t.dataset.workspace=home;p.before(t);__studio33.cs30TemplateRoots.add(t.content);t.content.append(p);__studio33.cs30Parked.set(home,{template:t});__studio33.cs30Metrics.parks++;}),"function cs30Park(home){const p=$(home);if(!p?.isConnected||!p.hidden||p.contains(document.activeElement)||p.querySelector('dialog[open]'))return;cs30Cache(p);const t=document.createElement('template');t.dataset.workspace=home;p.before(t);cs30TemplateRoots.add(t.content);t.content.append(p);cs30Parked.set(home,{template:t});cs30Metrics.parks++;}","cs30Park");

__studio33.cs30ParkOthers = __studio33.$fn((function cs30ParkOthers(){const home=__studio33.u23Home(__studio33.activeView);for(const id of __studio33.u23Homes)if(id!==home)__studio33.cs30Park(id);}),"function cs30ParkOthers(){const home=u23Home(activeView);for(const id of u23Homes)if(id!==home)cs30Park(id);}","cs30ParkOthers");

__studio33.cs30DrawRaster = (function cs30DrawRaster(context,source,from,to){context.drawImage(source,...from,...to);});

__studio33.cs30DecodeQR = __studio33.$fn((async function cs30DecodeQR(canvas,key,status,edge,timeout){const width=canvas.naturalWidth||canvas.width,height=canvas.naturalHeight||canvas.height,scale=Math.min(1,edge/Math.max(width,height)),sample=__studio33.ciCanvas(Math.max(1,Math.round(width*scale)),Math.max(1,Math.round(height*scale)));let job;try{const ctx=sample.getContext('2d',{willReadFrequently:true});ctx.drawImage(canvas,0,0,sample.width,sample.height);job={pixels:ctx.getImageData(0,0,sample.width,sample.height).data,width:sample.width,height:sample.height};}finally{sample.width=sample.height=1;}return new Promise(__studio33.$fn((resolve,reject)=>__studio33.runStudioWorker(key,__studio33.v9WorkerSource(__studio33.qrDecodeJob),job,resolve,status,timeout,()=>reject(new DOMException('QR reading stopped','AbortError'))),"(resolve,reject)=>runStudioWorker(key,v9WorkerSource(qrDecodeJob),job,resolve,status,timeout,()=>reject(new DOMException('QR reading stopped','AbortError')))",""));}),"async function cs30DecodeQR(canvas,key,status,edge,timeout){const width=canvas.naturalWidth||canvas.width,height=canvas.naturalHeight||canvas.height,scale=Math.min(1,edge/Math.max(width,height)),sample=ciCanvas(Math.max(1,Math.round(width*scale)),Math.max(1,Math.round(height*scale)));let job;try{const ctx=sample.getContext('2d',{willReadFrequently:true});ctx.drawImage(canvas,0,0,sample.width,sample.height);job={pixels:ctx.getImageData(0,0,sample.width,sample.height).data,width:sample.width,height:sample.height};}finally{sample.width=sample.height=1;}return new Promise((resolve,reject)=>runStudioWorker(key,v9WorkerSource(qrDecodeJob),job,resolve,status,timeout,()=>reject(new DOMException('QR reading stopped','AbortError'))));}","cs30DecodeQR");

__studio33.cs30ReadQRFile = __studio33.$fn((async function cs30ReadQRFile(){const file=__studio33.$('qrFile').files[0];if(!file)return;const ticket=++__studio33.qrReadVersion;__studio33.stopEditionWorker('qrRead');__studio33.$('qrDecoded').value='';__studio33.$('qrCopy').disabled=true;try{const im=await __studio33.v9Raster(file);if(ticket!==__studio33.qrReadVersion)return;const pending=__studio33.cs30DecodeQR(im,'qrRead','qrStatus',2048,12000);im.removeAttribute('src');const r=await pending;if(ticket!==__studio33.qrReadVersion)return;__studio33.$('qrDecoded').value=r.text;__studio33.$('qrCopy').disabled=false;__studio33.v9Status('qrStatus','Decoded QR version '+r.version+'. Review the text before using it.');}catch(e){if(ticket===__studio33.qrReadVersion&&e.name!=='AbortError')__studio33.v9Status('qrStatus',e.message,true);}finally{__studio33.$('qrFile').value='';}}),"async function cs30ReadQRFile(){const file=$('qrFile').files[0];if(!file)return;const ticket=++qrReadVersion;stopEditionWorker('qrRead');$('qrDecoded').value='';$('qrCopy').disabled=true;try{const im=await v9Raster(file);if(ticket!==qrReadVersion)return;const pending=cs30DecodeQR(im,'qrRead','qrStatus',2048,12000);im.removeAttribute('src');const r=await pending;if(ticket!==qrReadVersion)return;$('qrDecoded').value=r.text;$('qrCopy').disabled=false;v9Status('qrStatus','Decoded QR version '+r.version+'. Review the text before using it.');}catch(e){if(ticket===qrReadVersion&&e.name!=='AbortError')v9Status('qrStatus',e.message,true);}finally{$('qrFile').value='';}}","cs30ReadQRFile");

__studio33.cs30Link = __studio33.$fn((function cs30Link(owner,target,label){const p=__studio33.$(owner),box=__studio33.csText('div','','cs30-transfer');box.append(__studio33.csText('p',label),__studio33.u19Button('Open '+__studio33.views[__studio33.u23Home(target)],__studio33.$fn(()=>__studio33.openTab(target),"()=>openTab(target)","")));p.append(box);}),"function cs30Link(owner,target,label){const p=$(owner),box=csText('div','','cs30-transfer');box.append(csText('p',label),u19Button('Open '+views[u23Home(target)],()=>openTab(target)));p.append(box);}","cs30Link");

__studio33.cs30ResourceRefresh = __studio33.$fn((function cs30ResourceRefresh(){__studio33.cs30ResourceStatus.textContent=__studio33.u23Homes.size+' workspace destinations · '+__studio33.cs30Parked.size+' inactive interfaces parked\n'+document.querySelectorAll('*').length+' live DOM elements · '+__studio33.editionWorkers.size+' active workers\nImage import: 20 MiB / 20 megapixels; edited raster output: 16 megapixels. Individual export and batch limits remain visible in their tools.\nOCR assets remain bundled for offline use. No image or editor content is included in diagnostics.';}),"function cs30ResourceRefresh(){cs30ResourceStatus.textContent=u23Homes.size+' workspace destinations · '+cs30Parked.size+' inactive interfaces parked\\n'+document.querySelectorAll('*').length+' live DOM elements · '+editionWorkers.size+' active workers\\nImage import: 20 MiB / 20 megapixels; edited raster output: 16 megapixels. Individual export and batch limits remain visible in their tools.\\nOCR assets remain bundled for offline use. No image or editor content is included in diagnostics.';}","cs30ResourceRefresh");
}
const steps=[
[4,function initialize_4(__studio33){
__studio33.cs30NodeCache = new Map();
__studio33.cs30TemplateRoots = new Set();

}],
[2619,function initialize_2619(__studio33){
__studio33.u21Header = document.querySelector('.studio-header');
__studio33.u21Actions = __studio33.u21Header.querySelector('.top-actions');
__studio33.u21Nav = __studio33.u21Header.querySelector('.compact-nav');
__studio33.u21Options = __studio33.u21Header.querySelector('.studio-menu');
__studio33.u21OptionsPanel = __studio33.u21Options.querySelector('.studio-menu-body');

}],
[2625,function initialize_2625(__studio33){
__studio33.u21HeaderHome = document.createComment('Shared studio header');

}],
[2631,function initialize_2631(__studio33){
__studio33.u21ThemeOpen = __studio33.themeOpen;

}],
[2637,function initialize_2637(__studio33){
__studio33.u21Apply = __studio33.u19Apply;

}],
[2639,function initialize_2639(__studio33){
__studio33.u21Fullscreen = __studio33.setEditorFullScreen;

}],
[2641,function initialize_2641(__studio33){
__studio33.u21Scope = __studio33.u19Scope;

}],
[2643,function initialize_2643(__studio33){
__studio33.u21ShowCommands = __studio33.showCommands;

}],
[2787,function initialize_2787(__studio33){
__studio33.u23Key = 'calc-studio-tool-menu-v20';

}],
[2788,function initialize_2788(__studio33){
__studio33.u23Optional = ['typing','flashcards','audioeditor','videoframes','barcodes','subnets'];

}],
[2798,function initialize_2798(__studio33){
__studio33.u23Aliases = {apirequest:'apiclient'};

}],
[2800,function initialize_2800(__studio33){
__studio33.u23Groups = {jwtworkspace:[['jwt','Inspect claims'],['jwtverify','Verify signature']],hashworkspace:[['hash','Text hash'],['fileinspect','File inspection & hash']],financeworkspace:[['finance','Loan comparison, tax & split'],['tools','Percentages & EMI'],['interestrate','Solve interest rate']],conversionworkspace:[['converter','Units & currency'],['presets','Saved & custom conversions']]};

}],
[2808,function initialize_2808(__studio33){
__studio33.u23ExportHeaders = class u23ExportHeaders{constructor(){this.values=[]}set(name,value){this.values.push([name,String(value)])}has(name){return this.values.some(([k])=>k.toLowerCase()===name.toLowerCase())}entries(){return this.values[Symbol.iterator]()}get(name){return [...this.values].reverse().find(([k])=>k.toLowerCase()===name.toLowerCase())?.[1]??null}};
}],
[2809,function initialize_2809(__studio33){
__studio33.u23CurlShell = document.createElement('select');

}],
[2813,function initialize_2813(__studio33){
__studio33.u23CurlControls = __studio33.csText('div','','u23-curl-controls');
__studio33.u23CurlLabel = __studio33.csText('label','Command shell');

}],
[2821,function initialize_2821(__studio33){
__studio33.u23OldBusy = __studio33.lcBusy;

}],
[2843,function initialize_2843(__studio33){
__studio33.u23HashCopy = __studio33.u19Button('Copy SHA-256',__studio33.$fn(()=>{if(__studio33.$('inspectDigest').value)__studio33.copyText(__studio33.$('inspectDigest').value)},"()=>{if($('inspectDigest').value)copyText($('inspectDigest').value)}",""),'u23HashCopy');

}],
[2846,function initialize_2846(__studio33){
__studio33.u23OldInspectHash = __studio33.$('inspectHash').onclick;

}],
[2854,function initialize_2854(__studio33){
__studio33.u23OldApply = __studio33.wsApply;

}],
[2856,function initialize_2856(__studio33){
__studio33.u23CategoryHome = {jwtworkspace:'developer',hashworkspace:'developer',financeworkspace:'finance',conversionworkspace:'finance',statistics:'math'};

}],
[2859,function initialize_2859(__studio33){
__studio33.u23Catalog = Object.fromEntries(Object.entries(__studio33.toolCategories).map(([key,cat])=>[key,{label:cat.label,tools:[...cat.tools]}]));

}],
[2860,function initialize_2860(__studio33){
__studio33.u23Homes = new Set(Object.values(__studio33.u23Catalog).flatMap(c=>c.tools));

}],
[2862,function initialize_2862(__studio33){
__studio33.u23State = undefined;

}],
[2873,function initialize_2873(__studio33){
__studio33.u23SearchAliases = {apiclient:'api request builder http curl export send postman powershell posix',jwtworkspace:'jwt token inspect decode verify signature',hashworkspace:'sha256 checksum text files digest inspection',financeworkspace:'finance loans emi percentage tax repayment',conversionworkspace:'units currency custom conversion presets',statistics:'statistics mean median sum deviation numbers',integrationtests:'integration test generator payload boundary cases'};

}],
[2874,function initialize_2874(__studio33){
__studio33.u23BaseCommandSearch = __studio33.renderCommands;

}],
[2876,function initialize_2876(__studio33){
__studio33.u23OldDescription = __studio33.studioDescription;

}],
[2878,function initialize_2878(__studio33){
__studio33.u23ExtraNote = __studio33.csText('p','This tool is kept under Extra utilities. Options → Manage tools can put it back in the main categories.','u23-extra-note');

}],
[2879,function initialize_2879(__studio33){
__studio33.u23Manage = __studio33.u19Dialog('u23Manage','Manage tools');

}],
[2881,function initialize_2881(__studio33){
__studio33.u23ManageSearch = document.createElement('input');

}],
[2887,function initialize_2887(__studio33){
__studio33.u23ManageCount = __studio33.csText('p','','hint');

}],
[2890,function initialize_2890(__studio33){
__studio33.u23ManageList = __studio33.csText('div','');

}],
[2893,function initialize_2893(__studio33){
__studio33.u23ManageDraft = new Set();

}],
[2896,function initialize_2896(__studio33){
__studio33.u23ManageActions = __studio33.csText('div','','u22-ui');

}],
[2899,function initialize_2899(__studio33){
__studio33.u23ManageButton = __studio33.u19Button('Manage tools',__studio33.$fn(()=>{__studio33.u23ManageDraft=new Set(__studio33.u23State.hidden);__studio33.u23ManageSearch.value='';__studio33.u23ManageRender();__studio33.u19OpenDialog(__studio33.u23Manage,__studio33.u19Layout==='tv'?__studio33.$('u23ManageClose'):__studio33.u23ManageSearch)},"()=>{u23ManageDraft=new Set(u23State.hidden);u23ManageSearch.value='';u23ManageRender();u19OpenDialog(u23Manage,u19Layout==='tv'?$('u23ManageClose'):u23ManageSearch)}",""),'u23ManageButton');

}],
[2904,function initialize_2904(__studio33){
__studio33.u23OldBackup = __studio33.backupSnapshot;

}],
[2906,function initialize_2906(__studio33){
__studio33.u23OldValidate = __studio33.validateBackup;

}],
[2908,function initialize_2908(__studio33){
__studio33.u23OldRestore = __studio33.csRestoreSavedWork;

}],
[3915,function initialize_3915(__studio33){
__studio33.n28Key = 'calc-studio-navigation-v28';

}],
[3916,function initialize_3916(__studio33){
__studio33.n28Categories = {
 math:{label:'Math & Measurement',tools:['calculator','notebook','graph','equations','fractions','matrices','calculus','statistics','numberwords','conversionworkspace','measurements']},
 finance:{label:'Finance',tools:['financeworkspace','expenses','paymentids']},
 text:{label:'Text & Writing',tools:['texttoolkit','regex','markdown']},
 json:{label:'Data & Tables',tools:['jsonstudio','dataworkbench','comparisonstudio','sampledata','workflows']},
 developer:{label:'Developer & API',tools:['integrationstudio','programmer','salesforce','soql','uuid','logs','jwtworkspace','hashworkspace','subnets','passwords','keyboard']},
 media:{label:'Files, Images & Design',tools:['camerastudio','imagestudio','pdfworkspace','colors','qr','archives','barcodes','audioeditor','videoframes']},
 productivity:{label:'Productivity & Planning',tools:['datetoolkit','calendar','cron','decision','flowchart','formsworkspace','kanban','presentationtimer','flashcards','typing']},
 career:{label:'Career & Professional Documents',tools:['careerresume','careermatcher','careerachievements','careerinterview','careerskills','careertemplates']}
};

}],
[3917,function initialize_3917(__studio33){
__studio33.n28Shared = ['formulas','shortcuts','projectworkspaces','settings'];

}],
[3918,function initialize_3918(__studio33){
__studio33.n28HomeCategory = Object.fromEntries(Object.entries(__studio33.n28Categories).flatMap(([key,c])=>c.tools.map(id=>[id,key])));

}],
[3919,function initialize_3919(__studio33){
__studio33.n28OldNames = {...__studio33.views};

}],
[3920,function initialize_3920(__studio33){
__studio33.n28Names = {notebook:'Calculation Notebook',graph:'Graph Plotter',equations:'Equation Solver',fractions:'Fractions & Exact Forms',matrices:'Matrices & Vectors',calculus:'Numerical Calculus',numberwords:'Number to Words',measurements:'Feet & Inches',conversionworkspace:'Converters',financeworkspace:'Finance & Loan Tools',texttoolkit:'Text Toolkit',jwtworkspace:'JWT Tools',hashworkspace:'Hash & File Inspection',subnets:'Network & Subnet Calculator',passwords:'Password & Passphrase Generator',logs:'Log Analyzer',settings:'Formatting & Backup',careerinterview:'Interview Preparation',colors:'Color & Accessibility',audioeditor:'Audio Editor',videoframes:'Video Frame Extractor',kanban:'Kanban Board',shortcuts:'URL Shortcuts',formulas:'Saved Formulas',projectworkspaces:'Saved Project Workspaces'};

}],
[3922,function initialize_3922(__studio33){
__studio33.n28Descriptions = {
 jsonstudio:'Format, explore, query, validate, mask and map JSON with a shared source.',
 dataworkbench:'Edit tables, convert CSV/JSON, clean records, join data and review transformations.',
 comparisonstudio:'Compare text, JSON, XML, Excel and keyed records; review changes before applying them.',
 integrationstudio:'Prepare API requests, Salesforce Composite payloads, response analysis and test inputs.',
 imagestudio:'Quick image conversion, annotations, pixel colors, palettes and contact sheets.',
 camerastudio:'Capture photos, scan documents, edit images, extract text/tables and prepare PDF or batch exports.',
 pdfworkspace:'Merge, select, reorder, rotate or split PDF pages; fill and flatten standard PDF forms.',
 formsworkspace:'Design forms, validate conditions and review imported responses.',
 datetoolkit:'Calculate dates, ages, durations, Unix timestamps and holiday-aware deadlines.',
 conversionworkspace:'Convert units/currency or reuse saved pairs and custom conversion factors.',
 financeworkspace:'Compare loans, calculate percentages/EMI, solve interest rates and review repayment schedules.',
 jwtworkspace:'Inspect claims or explicitly verify a token signature with one shared token editor.',
 hashworkspace:'Calculate SHA-256 for text or original file bytes and inspect file metadata.'
};

}],
[3923,function initialize_3923(__studio33){
__studio33.n28OldDescription = __studio33.studioDescription;

}],
[3933,function initialize_3933(__studio33){
__studio33.n28State = undefined;

}],
[3935,function initialize_3935(__studio33){
__studio33.n28PersistTimer = 0;
__studio33.n28Index = null;
__studio33.n28Dirty = false;
__studio33.n28SuppressSave = false;

}],
[3940,function initialize_3940(__studio33){
__studio33.n28SectionText = id=>id==='settings'?'Settings':'My Work';

}],
[3943,function initialize_3943(__studio33){
__studio33.n28SubjectKey = __studio33.$fn(id=>__studio33.n28HomeCategory[__studio33.u23Home(id)],"id=>n28HomeCategory[u23Home(id)]","n28SubjectKey");

}],
[3948,function initialize_3948(__studio33){
__studio33.n28OldManageRender = __studio33.u23ManageRender;

}],
[3950,function initialize_3950(__studio33){
__studio33.n28Work = __studio33.u19Dialog('n28Work','My Work');
__studio33.n28WorkBody = __studio33.csText('div','','n28-work-body');

}],
[3955,function initialize_3955(__studio33){
__studio33.n28WorkButton = __studio33.u19Button('My Work',__studio33.$fn(()=>{__studio33.u21Options.open=false;__studio33.themeOpen(false);__studio33.n28WorkRender();__studio33.u19OpenDialog(__studio33.n28Work,__studio33.$('n28WorkClose'))},"()=>{u21Options.open=false;themeOpen(false);n28WorkRender();u19OpenDialog(n28Work,$('n28WorkClose'))}",""),'n28WorkButton');

}],
[3957,function initialize_3957(__studio33){
__studio33.n28SettingsButton = __studio33.u19Button('Formatting & backup',__studio33.$fn(()=>{__studio33.u21Options.open=false;__studio33.openTab('settings')},"()=>{u21Options.open=false;openTab('settings')}",""),'n28SettingsButton');

}],
[3959,function initialize_3959(__studio33){
__studio33.n28ModeDialog = __studio33.u19Dialog('n28Features','Workspace features');
__studio33.n28ModeSearch = document.createElement('input');
__studio33.n28ModeList = __studio33.csText('div','','n28-feature-list');

}],
[3966,function initialize_3966(__studio33){
__studio33.n28FeatureHome = '';

}],
[3967,function initialize_3967(__studio33){
__studio33.n28Tags = {calculator:'scientific arithmetic trig memory',notebook:'variables expressions notes',graph:'plot chart roots intersections',equations:'linear quadratic simultaneous solve',fractions:'exact rational decimal radical',programmer:'binary hexadecimal octal bitwise bigint',formulas:'reusable templates equations',converter:'units currency length mass temperature rates',presets:'custom conversion factors',dates:'age birthday dates duration working holidays',timestamp:'unix epoch seconds milliseconds utc ist timezone',finance:'loans discount tax bill tip repayment amortization',tools:'percent emi loan',characters:'word letters unicode utf8 bytes',textutils:'uppercase lowercase title trim deduplicate sort replace',encoding:'url uri base64 base64url encode decode',jsonformatter:'pretty minify validate format json',jsondiff:'compare json changes patch',textdiff:'compare text lines code diff merge',csvjson:'csv tsv parse json',jsoncsv:'json csv flatten spreadsheet',schema:'json schema ajv validate',explorer:'json tree keys paths edit schema',jsonmask:'json redact privacy sensitive fields',jsonmapping:'json mapping transform rename nested calculated',jsonpath:'jsonpath query extract filter',salesforce:'sfdc casesafeid 15 18 bulk salesforce',soql:'sfdc salesforce query formatter',logs:'sfdc salesforce apex errors exceptions governor limits callouts timings',composite:'sfdc salesforce composite graph dependencies payload retry',integrationtests:'integration tests boundary missing null payload',apiclient:'http api curl postman requests rest powershell posix',apiresponse:'api response failed records salesforce errors',jwt:'decode token claims expiry exp nbf',jwtverify:'verify signature rsa ecdsa public jwk pem',hash:'sha256 sha-256 checksum digest hash text',fileinspect:'file hash checksum magic signature bytes inspection',qr:'qr code wifi url generate decode read image',images:'image photo crop resize compress rotate png jpeg webp',annotation:'image arrow text highlight redact screenshot',imagecolors:'pixel palette color colour picker',contactsheet:'image photos contact sheet collage',pdf:'pdf merge split reorder rotate pages',pdfform:'pdf fill form flatten',colors:'color colour hex rgb hsl accessibility contrast wcag',numberwords:'amount cheque rupees lakh crore million billion words',paymentids:'iban ifsc bic swift aba upi routing payment checksum',expenses:'expense split bill shares settle debts',cron:'cron salesforce apex scheduler upcoming runs',calendar:'calendar event ics timezone repeat',keyboard:'device physical keyboard keys codes modifiers',typing:'typing speed accuracy wpm practice',passwords:'secure passwords passphrases',subnets:'ip ipv4 ipv6 network subnet cidr',barcodes:'barcode code128 ean upc code39',audioeditor:'audio trim volume fade wav',videoframes:'video extract timestamp frames png zip',flashcards:'study cards revision decks practice',decision:'weighted decision criteria rank',flowchart:'diagram nodes connectors svg',presentationtimer:'speaker presentation segments warnings overtime timer',kanban:'tasks board list gantt timeline dependencies capacity workload',workflows:'workflow transformations conditions branches programs fixtures batch',dataworkbench:'tables csv json excel xlsx join profile cleanup recipes lineage',reconciliation:'reconcile keys records tables mappings duplicates tolerances',formdesigner:'offline forms questionnaire validation repeat calculate steps',responsedashboard:'form responses dashboard quality version mapping',careerresume:'resume cv profile experience education print pdf',careermatcher:'job description resume requirement matcher evidence',careerachievements:'achievement statement evidence metric',careerinterview:'interview questions answers preparation',careerskills:'skills matrix gaps learning actions',careertemplates:'professional documents introduction cover letter handover meeting appreciation',settings:'settings formatting precision decimals scientific Indian grouping backup restore',shortcuts:'saved urls links bookmarks groups',projectworkspaces:'saved projects snapshots history runs recovery'};

}],
[3968,function initialize_3968(__studio33){
__studio33.n28ImageFeatures = [
 ['image-edit','Edit image','edit',null,'crop resize rotate flip photo'],
 ['image-crop','Crop & resize','edit','crop','resize rotate flip fit fill pad straighten deskew'],
 ['image-document','Document scanner','edit','document','scan four corners straighten perspective document'],
 ['image-annotate','Annotate & redact','edit','annotate','annotation arrows rectangles text highlights privacy redaction layers screenshot'],
 ['image-adjust','Photo adjustments','edit','adjust','brightness contrast saturation grayscale sharpening before after'],
 ['image-compress','Image size target','edit','compress','compression under 200 kb 500 kb custom target quality dimensions'],
 ['image-ocr','Extract text & tables','extract',null,'ocr photo editable data printed text numbers table review'],
 ['image-qr','Camera QR scanner','qr',null,'live screenshot decode camera qr scan'],
 ['image-pdf','Photos to PDF','pdf',null,'multiple photos searchable pdf ocr pages reorder cleanup'],
 ['image-batch','Batch images','batch',null,'batch resize compress watermark zip export']
];

}],
[3970,function initialize_3970(__studio33){
__studio33.n28CommonSummaries = new Set(['More','More views','Advanced & help','Workspace settings','Undo edits & output views','Editor controls & send to tool','Input / output layout','Shared source & undo','Project, privacy & limits','Limits & help','Editing project & resource usage']);

}],
[3979,function initialize_3979(__studio33){
__studio33.n28FeatureControls = new Map();

}],
[3982,function initialize_3982(__studio33){
__studio33.n28SearchCount = __studio33.csText('p','','hint');

}],
[3989,function initialize_3989(__studio33){
__studio33.n28Primary = {careerresume:'crResumeBuild',careermatcher:'crMatchRun',careerachievements:'crAchBuild',careerinterview:'crInterviewSave',careerskills:'crSkillSave',careertemplates:'crTemplateBuild'};

}],
[3993,function initialize_3993(__studio33){
__studio33.n28OldCiMode = __studio33.ciMode;

}],
[3995,function initialize_3995(__studio33){
__studio33.n28OldCiOperation = __studio33.$('ciOperation').onchange;

}],
[4000,function initialize_4000(__studio33){
__studio33.n28OldFavorites = __studio33.renderFavorites;

}],
[4002,function initialize_4002(__studio33){
__studio33.n28OldRecents = __studio33.renderRecents;

}],
[4008,function initialize_4008(__studio33){
__studio33.n28OldReset = __studio33.$('u22ResetConfirm').onclick;

}],
[4010,function initialize_4010(__studio33){
__studio33.n28OldCleanup = __studio33.$('u24StorageClear').onclick;

}],
[4012,function initialize_4012(__studio33){
__studio33.n28OldRecordsApply = __studio33.$('u24RecordsApply').onclick;

}],
[4014,function initialize_4014(__studio33){
__studio33.n28OldBackup = __studio33.backupSnapshot;

}],
[4016,function initialize_4016(__studio33){
__studio33.n28OldValidate = __studio33.validateBackup;

}],
[4018,function initialize_4018(__studio33){
__studio33.n28OldRestore = __studio33.csRestoreSavedWork;

}],
[4029,function initialize_4029(__studio33){
__studio33.cs29Key = 'calc-studio-workspace-ui-v29';

}],
[4032,function initialize_4032(__studio33){
__studio33.cs29State = undefined;

}],
[4034,function initialize_4034(__studio33){
__studio33.cs29Settings = __studio33.csText('div','','cs29-settings');

}],
[4036,function initialize_4036(__studio33){
__studio33.cs29Density = __studio33.u19Option(__studio33.cs29Settings,'cs29Density','Workspace density',[['compact','Compact — less space around controls'],['comfortable','Comfortable — more space around controls']]);

}],
[4037,function initialize_4037(__studio33){
__studio33.cs29FavoritesRow = __studio33.csText('label','','cs29-setting-check');
__studio33.cs29Favorites = document.createElement('input');

}],
[4043,function initialize_4043(__studio33){
__studio33.cs29SavedStrip = __studio33.$('favoritesBar').closest('.studio-saved');
__studio33.cs29Fields = new Map();
__studio33.cs29Scrolls = new Map();

}],
[4044,function initialize_4044(__studio33){
__studio33.cs29Frame = 0;
__studio33.cs29Preparing = false;
__studio33.cs29StatusRuns = 0;
__studio33.cs29HiddenMutations = 0;

}],
[4056,function initialize_4056(__studio33){
__studio33.cs29OldClose = __studio33.v13CloseEditor;

}],
[4058,function initialize_4058(__studio33){
__studio33.cs29PolishedTools = new WeakSet();
__studio33.cs29OldPolish = __studio33.u24PolishEditor;

}],
[4060,function initialize_4060(__studio33){
__studio33.cs29ModeBars = new Map();

}],
[4063,function initialize_4063(__studio33){
__studio33.cs29AboutDone = new WeakSet();
__studio33.cs29AdvancedDone = new WeakSet();

}],
[4066,function initialize_4066(__studio33){
__studio33.cs29Statuses = new Map();

}],
[4073,function initialize_4073(__studio33){
__studio33.cs29Observer = new MutationObserver(__studio33.$fn(records=>{let work=false;for(const r of records){const e=r.target.nodeType===1?r.target:r.target.parentElement;if(!e||e.closest('[hidden]')){__studio33.cs29HiddenMutations++;continue;}if(r.type==='childList')for(const n of r.addedNodes)if(n.nodeType===1){if(n.matches('button'))__studio33.u17Classify(n);n.querySelectorAll('button').forEach(__studio33.u17Classify);}const button=e.closest('button');if(button)__studio33.u17Classify(button);const status=e.closest('[data-error=true]');if(status?.closest('.u17-advanced'))__studio33.u17Reveal(status);work=true;}if(work)__studio33.cs29Schedule();},"records=>{let work=false;for(const r of records){const e=r.target.nodeType===1?r.target:r.target.parentElement;if(!e||e.closest('[hidden]')){cs29HiddenMutations++;continue;}if(r.type==='childList')for(const n of r.addedNodes)if(n.nodeType===1){if(n.matches('button'))u17Classify(n);n.querySelectorAll('button').forEach(u17Classify);}const button=e.closest('button');if(button)u17Classify(button);const status=e.closest('[data-error=true]');if(status?.closest('.u17-advanced'))u17Reveal(status);work=true;}if(work)cs29Schedule();}",""));

}],
[4078,function initialize_4078(__studio33){
__studio33.cs29OldApply = __studio33.u19Apply;

}],
[4083,function initialize_4083(__studio33){
__studio33.cs29OldBackup = __studio33.backupSnapshot;

}],
[4085,function initialize_4085(__studio33){
__studio33.cs29OldValidate = __studio33.validateBackup;

}],
[4087,function initialize_4087(__studio33){
__studio33.cs29OldRestore = __studio33.csRestoreSavedWork;

}],
[4096,function initialize_4096(__studio33){
__studio33.cs30OldOwners = new Map(Object.keys(__studio33.views).map(__studio33.$fn(id=>[id,__studio33.u23Home(id)],"id=>[id,u23Home(id)]","")));
__studio33.cs30OldHomes = new Map([...__studio33.u23Homes].map(__studio33.$fn(id=>[id,Object.keys(__studio33.views).filter(__studio33.$fn(mode=>__studio33.u23Home(mode)===id&&!__studio33.u23Aliases[mode],"mode=>u23Home(mode)===id&&!u23Aliases[mode]",""))],"id=>[id,Object.keys(views).filter(mode=>u23Home(mode)===id&&!u23Aliases[mode])]","")));

}],
[4097,function initialize_4097(__studio33){
__studio33.cs30Native = new Map();
__studio33.cs30Parked = new Map();
__studio33.cs30Metrics = {opens:0,mounts:0,parks:0,routeMs:0};

}],
[4104,function initialize_4104(__studio33){
__studio33.cs30Groups = {
 imagestudio:['camerastudio','images','annotation','contactsheet'],
 colors:['colors','imagecolors'],calculator:['calculator','numberwords'],graph:['graph','calculus'],
 conversionworkspace:['converter','measurements','presets'],datetoolkit:['dates','timestamp','businessdays','calendar'],
 qr:['qr','barcodes'],salesforce:['salesforce','soql'],dataworkbench:['dataworkbench','csvjson','jsoncsv','sampledata'],
 careerdocuments:['careerresume','careermatcher','careerachievements','careertemplates'],careerpreparation:['careerinterview','careerskills']
};

}],
[4105,function initialize_4105(__studio33){
__studio33.cs30Names = {imagestudio:'Camera & Image Studio',camerastudio:'Camera, editing & scanning',images:'Quick image conversion',annotation:'Quick screenshot markup',contactsheet:'Contact sheets',colors:'Color & Accessibility',graph:'Functions & Graphs',conversionworkspace:'Converters & Measurements',datetoolkit:'Date, Time & Events',qr:'QR & Barcodes',salesforce:'Salesforce Utilities'};

}],
[4107,function initialize_4107(__studio33){
__studio33.cs30Labels = {camerastudio:'Edit, scan & OCR',images:'Quick convert',annotation:'Quick markup',contactsheet:'Contact sheets',colors:'Contrast & conversion',imagecolors:'Image palette',calculator:'Calculator',numberwords:'Amount in words',graph:'Plot functions',calculus:'Numerical calculus',converter:'Units & currency',measurements:'Feet & inches',presets:'Saved conversions',dates:'Dates & durations',timestamp:'Unix timestamps',businessdays:'Business days',calendar:'Calendar events',qr:'QR generation & reading',barcodes:'Barcodes',salesforce:'Salesforce IDs',soql:'SOQL',dataworkbench:'Table editor',csvjson:'CSV → JSON',jsoncsv:'JSON → CSV',sampledata:'Generate sample data',careerresume:'Resume',careermatcher:'Job matching',careerachievements:'Achievements',careertemplates:'Document templates',careerinterview:'Interview preparation',careerskills:'Skills matrix'};

}],
[4119,function initialize_4119(__studio33){
__studio33.cs30DefaultsOptional = [...new Set([...__studio33.u23Optional,'keyboard'])];

}],
[4124,function initialize_4124(__studio33){
__studio33.cs30GroupLabels = {calculator:'Calculate',notebook:'Calculate',graph:'Functions',equations:'Algebra',fractions:'Algebra',matrices:'Algebra',statistics:'Statistics',conversionworkspace:'Conversions',integrationstudio:'API',salesforce:'Salesforce',logs:'Salesforce',workflows:'Automation',cron:'Automation',jwtworkspace:'Tokens & security',hashworkspace:'Tokens & security',passwords:'Tokens & security',programmer:'Developer utilities',uuid:'Developer utilities',regex:'Developer utilities',subnets:'Developer utilities',keyboard:'Developer utilities',imagestudio:'Images',pdfworkspace:'Documents',colors:'Design',qr:'Codes',archives:'Files',audioeditor:'Media',videoframes:'Media',datetoolkit:'Dates & events',kanban:'Planning',formsworkspace:'Forms',decision:'Planning',flowchart:'Planning',presentationtimer:'Presentations',flashcards:'Practice',typing:'Practice'};

}],
[4126,function initialize_4126(__studio33){
__studio33.cs30BaseMenuApply = __studio33.u23MenuApply;

}],
[4129,function initialize_4129(__studio33){
__studio33.cs30ManageFeatures = new Set(__studio33.u23State.hiddenModes);

}],
[4146,function initialize_4146(__studio33){
__studio33.cs30CachePasses = 0;

}],
[4160,function initialize_4160(__studio33){
__studio33.cs30AmountActions = __studio33.csText('div','','row studio-actions');

}],
[4166,function initialize_4166(__studio33){
__studio33.cs30OriginalRestore = __studio33.csRestoreSavedWork;

}],
[4170,function initialize_4170(__studio33){
__studio33.cs30Resource = __studio33.csText('details','','details-box');

}],
[4172,function initialize_4172(__studio33){
__studio33.cs30ResourceStatus = __studio33.csText('p','','hint');

}],
[4178,function initialize_4178(__studio33){
__studio33.cs30Compatibility = document.createElement('template');

}]
];

return {id,register,steps};
})(),
(()=>{
// core/storage · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
const id="core/storage";
function register(__studio33){
__studio33.backupSnapshot = __studio33.$fn((function backupSnapshot(){__studio33.saveCurrentSession();const state={};for(const key of __studio33.backupKeys)state[key]=__studio33.storage.get(key,null);state['advanced-calculator-history']=__studio33.history;state['advanced-calculator-ans']=__studio33.ans;state['advanced-calculator-angle']=__studio33.angle;state['calc-studio-memory']=__studio33.memory;state['calc-studio-theme']=document.documentElement.dataset.theme;state['calc-studio-scientific']=!__studio33.$('sciencePad').hidden;state['calc-studio-history-visible']=!__studio33.$('historyPanel').hidden;state['calc-studio-compact-v2']=__studio33.compact;state['calc-studio-favorites']=__studio33.favorites;state['calc-studio-sessions']=__studio33.sessions;state['calc-studio-active-session']=__studio33.activeSessionId;state['calc-studio-formulas']=__studio33.formulaList;state['calc-studio-presets']=__studio33.presets;state['calc-studio-formatting']=__studio33.formatting;state['calc-studio-rates']=__studio33.rateCache;state['calc-studio-notebook-split']=Number(__studio33.$('notebookSplit').value);try{state['calc-studio-graph']={expressions:__studio33.$('graphInput').value,mode:__studio33.$('graphAngle').value,bounds:__studio33.readGraphBounds()}}catch{}state['calc-studio-notebook']=__studio33.$('notebookInput').value;state['calc-studio-drafts']=Object.fromEntries(__studio33.draftIds.filter(__studio33.$fn(id=>__studio33.$(id),"id=>$(id)","")).map(__studio33.$fn(id=>[id,__studio33.$(id).value],"id=>[id,$(id).value]","")));return JSON.parse(JSON.stringify({app:'calc-studio',version:3,createdAt:new Date().toISOString(),state}))}),"function backupSnapshot(){saveCurrentSession();const state={};for(const key of backupKeys)state[key]=storage.get(key,null);state['advanced-calculator-history']=history;state['advanced-calculator-ans']=ans;state['advanced-calculator-angle']=angle;state['calc-studio-memory']=memory;state['calc-studio-theme']=document.documentElement.dataset.theme;state['calc-studio-scientific']=!$('sciencePad').hidden;state['calc-studio-history-visible']=!$('historyPanel').hidden;state['calc-studio-compact-v2']=compact;state['calc-studio-favorites']=favorites;state['calc-studio-sessions']=sessions;state['calc-studio-active-session']=activeSessionId;state['calc-studio-formulas']=formulaList;state['calc-studio-presets']=presets;state['calc-studio-formatting']=formatting;state['calc-studio-rates']=rateCache;state['calc-studio-notebook-split']=Number($('notebookSplit').value);try{state['calc-studio-graph']={expressions:$('graphInput').value,mode:$('graphAngle').value,bounds:readGraphBounds()}}catch{}state['calc-studio-notebook']=$('notebookInput').value;state['calc-studio-drafts']=Object.fromEntries(draftIds.filter(id=>$(id)).map(id=>[id,$(id).value]));return JSON.parse(JSON.stringify({app:'calc-studio',version:3,createdAt:new Date().toISOString(),state}))}","backupSnapshot");

__studio33.csPersist = __studio33.$fn((function csPersist(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true}catch{__studio33.toast('Could not save to browser storage. Export your work now.');return false}}),"function csPersist(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true}catch{toast('Could not save to browser storage. Export your work now.');return false}}","csPersist");

__studio33.wsCapture = __studio33.$fn((function wsCapture(ids){const tools={};for(const id of ids){if(!__studio33.wsEligible.includes(id))throw Error('Tool is not eligible for snapshots: '+id);tools[id]={};for(const key of __studio33.wsElements.get(id)){const e=__studio33.$(key);if(e)tools[id][key]=e.type==='checkbox'?e.checked:e.value}if(id==='dataworkbench')tools[id].$table=__studio33.csClone(__studio33.dwTable);if(id==='responsedashboard')tools[id].$responses=__studio33.csClone(__studio33.v12State.responses);if(id==='workflows')tools[id].$steps=__studio33.csClone(__studio33.wfSteps)}return tools}),"function wsCapture(ids){const tools={};for(const id of ids){if(!wsEligible.includes(id))throw Error('Tool is not eligible for snapshots: '+id);tools[id]={};for(const key of wsElements.get(id)){const e=$(key);if(e)tools[id][key]=e.type==='checkbox'?e.checked:e.value}if(id==='dataworkbench')tools[id].$table=csClone(dwTable);if(id==='responsedashboard')tools[id].$responses=csClone(v12State.responses);if(id==='workflows')tools[id].$steps=csClone(wfSteps)}return tools}","wsCapture");

__studio33.wsValidateTools = __studio33.$fn((function wsValidateTools(tools){if(!tools||typeof tools!=='object'||Array.isArray(tools)||JSON.stringify(tools).length>8000000)throw Error('Snapshot limit: 8 MB');for(const [id,values]of Object.entries(tools)){if(!__studio33.wsEligible.includes(id)||!values||typeof values!=='object'||Array.isArray(values))throw Error('Unsupported snapshot tool');for(const [key,value]of Object.entries(values)){if(key==='$table'&&id==='dataworkbench'){__studio33.dwCheck(value);continue}if(key==='$responses'&&id==='responsedashboard'){if(!Array.isArray(value)||value.length>5000)throw Error('Invalid response snapshot');value.forEach(__studio33.rdNormalize);continue}if(key==='$steps'&&id==='workflows'){__studio33.wfValidate({name:'Snapshot',steps:value});continue}if(!__studio33.wsElements.get(id).includes(key)||!['string','boolean'].includes(typeof value)||typeof value==='string'&&value.length>2097152)throw Error('Invalid snapshot input')}}return __studio33.csClone(tools)}),"function wsValidateTools(tools){if(!tools||typeof tools!=='object'||Array.isArray(tools)||JSON.stringify(tools).length>8000000)throw Error('Snapshot limit: 8 MB');for(const [id,values]of Object.entries(tools)){if(!wsEligible.includes(id)||!values||typeof values!=='object'||Array.isArray(values))throw Error('Unsupported snapshot tool');for(const [key,value]of Object.entries(values)){if(key==='$table'&&id==='dataworkbench'){dwCheck(value);continue}if(key==='$responses'&&id==='responsedashboard'){if(!Array.isArray(value)||value.length>5000)throw Error('Invalid response snapshot');value.forEach(rdNormalize);continue}if(key==='$steps'&&id==='workflows'){wfValidate({name:'Snapshot',steps:value});continue}if(!wsElements.get(id).includes(key)||!['string','boolean'].includes(typeof value)||typeof value==='string'&&value.length>2097152)throw Error('Invalid snapshot input')}}return csClone(tools)}","wsValidateTools");

__studio33.wsApply = __studio33.$fn((function wsApply(tools){const valid=__studio33.wsValidateTools(tools);for(const [id,values]of Object.entries(valid)){for(const [key,value]of Object.entries(values)){if(key.startsWith('$'))continue;const e=__studio33.$(key);if(!e)continue;if(e.type==='checkbox')e.checked=value;else e.value=value;e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}))}if(values.$table){__studio33.dwTable=__studio33.csClone(values.$table);__studio33.dwUndo=[];__studio33.dwRedo=[];__studio33.dwSelected.clear();__studio33.dwRender()}if(values.$responses){__studio33.v12State.responses=__studio33.csClone(values.$responses);__studio33.rdRender()}if(values.$steps){__studio33.wfSteps=__studio33.csClone(values.$steps);__studio33.wfReset()}}__studio33.v12Save()}),"function wsApply(tools){const valid=wsValidateTools(tools);for(const [id,values]of Object.entries(valid)){for(const [key,value]of Object.entries(values)){if(key.startsWith('$'))continue;const e=$(key);if(!e)continue;if(e.type==='checkbox')e.checked=value;else e.value=value;e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}))}if(values.$table){dwTable=csClone(values.$table);dwUndo=[];dwRedo=[];dwSelected.clear();dwRender()}if(values.$responses){v12State.responses=csClone(values.$responses);rdRender()}if(values.$steps){wfSteps=csClone(values.$steps);wfReset()}}v12Save()}","wsApply");

__studio33.wsRecoverTool = __studio33.$fn((function wsRecoverTool(id){if(!__studio33.v12State.recovery.enabled||!__studio33.v12State.recovery.tools.includes(id))return;clearTimeout(__studio33.wsTimer);__studio33.wsTimer=setTimeout(__studio33.$fn(()=>{try{__studio33.v12State.recovery.values=__studio33.wsCapture(__studio33.v12State.recovery.tools);__studio33.v12Save()}catch(error){__studio33.csStatus('projectworkspaces',error.message,true)}},"()=>{try{v12State.recovery.values=wsCapture(v12State.recovery.tools);v12Save()}catch(error){csStatus('projectworkspaces',error.message,true)}}",""),500)}),"function wsRecoverTool(id){if(!v12State.recovery.enabled||!v12State.recovery.tools.includes(id))return;clearTimeout(wsTimer);wsTimer=setTimeout(()=>{try{v12State.recovery.values=wsCapture(v12State.recovery.tools);v12Save()}catch(error){csStatus('projectworkspaces',error.message,true)}},500)}","wsRecoverTool");

__studio33.wsChosen = __studio33.$fn((function wsChosen(){return [...__studio33.$('wsSources').querySelectorAll('input:checked')].map(e=>e.value)}),"function wsChosen(){return [...$('wsSources').querySelectorAll('input:checked')].map(e=>e.value)}","wsChosen");

__studio33.wsRender = __studio33.$fn((function wsRender(){__studio33.v12Opt(__studio33.$('wsSaved'),__studio33.v12State.snapshots.map(w=>[w.id,w.name]),__studio33.$('wsSaved').value);__studio33.$('wsAutosave').checked=__studio33.v12State.recovery.enabled;__studio33.$('wsSummary').textContent=__studio33.v12State.snapshots.length+' saved snapshots · Recovery '+(__studio33.v12State.recovery.enabled?'on for '+__studio33.v12State.recovery.tools.length+' tools':'off');__studio33.$('wsUndoRestore').disabled=!__studio33.wsUndoRestore}),"function wsRender(){v12Opt($('wsSaved'),v12State.snapshots.map(w=>[w.id,w.name]),$('wsSaved').value);$('wsAutosave').checked=v12State.recovery.enabled;$('wsSummary').textContent=v12State.snapshots.length+' saved snapshots · Recovery '+(v12State.recovery.enabled?'on for '+v12State.recovery.tools.length+' tools':'off');$('wsUndoRestore').disabled=!wsUndoRestore}","wsRender");

__studio33.u22ResetExplain = __studio33.$fn((function u22ResetExplain(){const scope=__studio33.u22ResetScope.value;__studio33.u22ResetVerify.hidden=scope!=='all';__studio33.u22ResetInput.value='';__studio33.u22ResetError.textContent='';__studio33.u22ResetDescription.textContent={cache:'Clears calculator memory and last answer, currency-rate cache, and saved/recoverable tool drafts. Reloads the app to release temporary inputs, results, uploads and running tasks. Named saved work, history and display preferences are kept.',settings:'Restores theme, layout, motion, editor size/wrapping, remote mappings, mobile pane choices and numeric/display settings. Saved work, drafts, history and calculator memory are kept. The app reloads after reset.',all:'Permanently removes all Calc Studio data in this browser, including saved boards, notes, snapshots, presets, histories, drafts, tool memory and preferences. The app then reloads with its defaults. Other applications’ stored data is kept.'}[scope]}),"function u22ResetExplain(){const scope=u22ResetScope.value;u22ResetVerify.hidden=scope!=='all';u22ResetInput.value='';u22ResetError.textContent='';u22ResetDescription.textContent={cache:'Clears calculator memory and last answer, currency-rate cache, and saved/recoverable tool drafts. Reloads the app to release temporary inputs, results, uploads and running tasks. Named saved work, history and display preferences are kept.',settings:'Restores theme, layout, motion, editor size/wrapping, remote mappings, mobile pane choices and numeric/display settings. Saved work, drafts, history and calculator memory are kept. The app reloads after reset.',all:'Permanently removes all Calc Studio data in this browser, including saved boards, notes, snapshots, presets, histories, drafts, tool memory and preferences. The app then reloads with its defaults. Other applications’ stored data is kept.'}[scope]}","u22ResetExplain");

__studio33.u24StorageInventory = __studio33.$fn((function u24StorageInventory(){const allowed=new Set(__studio33.u22OwnedKeys());const claimed=new Set(),groups=[];for(const[id,label,keys]of __studio33.u24StorageGroups){const found=[...new Set(keys)].filter(k=>allowed.has(k)&&localStorage.getItem(k)!==null&&!claimed.has(k));found.forEach(k=>claimed.add(k));if(found.length)groups.push({id,label,keys:found})}const other=[...allowed].filter(k=>!claimed.has(k)&&localStorage.getItem(k)!==null);if(other.length)groups.push({id:'other',label:'Other saved Calc Studio data',keys:other});return groups.map(g=>({...g,bytes:g.keys.reduce((n,k)=>n+2*(k.length+(localStorage.getItem(k)||'').length),0)})).sort((a,b)=>b.bytes-a.bytes)}),"function u24StorageInventory(){const allowed=new Set(u22OwnedKeys());const claimed=new Set(),groups=[];for(const[id,label,keys]of u24StorageGroups){const found=[...new Set(keys)].filter(k=>allowed.has(k)&&localStorage.getItem(k)!==null&&!claimed.has(k));found.forEach(k=>claimed.add(k));if(found.length)groups.push({id,label,keys:found})}const other=[...allowed].filter(k=>!claimed.has(k)&&localStorage.getItem(k)!==null);if(other.length)groups.push({id:'other',label:'Other saved Calc Studio data',keys:other});return groups.map(g=>({...g,bytes:g.keys.reduce((n,k)=>n+2*(k.length+(localStorage.getItem(k)||'').length),0)})).sort((a,b)=>b.bytes-a.bytes)}","u24StorageInventory");

__studio33.u24StorageSelection = __studio33.$fn((function u24StorageSelection(){return [...new Set(__studio33.u24StorageRows.filter(__studio33.$fn(r=>__studio33.u24StorageSelected.has(r.id),"r=>u24StorageSelected.has(r.id)","")).flatMap(r=>r.keys))]}),"function u24StorageSelection(){return [...new Set(u24StorageRows.filter(r=>u24StorageSelected.has(r.id)).flatMap(r=>r.keys))]}","u24StorageSelection");

__studio33.u24StorageUpdate = __studio33.$fn((function u24StorageUpdate(){const rows=__studio33.u24StorageRows.filter(__studio33.$fn(r=>__studio33.u24StorageSelected.has(r.id),"r=>u24StorageSelected.has(r.id)",""));__studio33.u24StorageReview.textContent=rows.length?'Selected: '+rows.map(r=>r.label).join('; ')+'. Clears '+__studio33.u24StorageSelection().length+' saved records ('+__studio33.u24Bytes(rows.reduce((n,r)=>n+r.bytes,0))+'). The app reloads; unsaved inputs/results are also released.':'Select saved-data groups to review cleanup.';__studio33.$('u24StorageClear').disabled=!rows.length;__studio33.u24StorageConfirm.checked=false}),"function u24StorageUpdate(){const rows=u24StorageRows.filter(r=>u24StorageSelected.has(r.id));u24StorageReview.textContent=rows.length?'Selected: '+rows.map(r=>r.label).join('; ')+'. Clears '+u24StorageSelection().length+' saved records ('+u24Bytes(rows.reduce((n,r)=>n+r.bytes,0))+'). The app reloads; unsaved inputs/results are also released.':'Select saved-data groups to review cleanup.';$('u24StorageClear').disabled=!rows.length;u24StorageConfirm.checked=false}","u24StorageUpdate");

__studio33.u24StorageRender = __studio33.$fn((function u24StorageRender(){__studio33.u24StorageRows=__studio33.u24StorageInventory();__studio33.u24StorageSelected.clear();__studio33.u24StorageSummary.textContent='Estimated app storage: '+__studio33.u24Bytes(__studio33.u24StorageRows.reduce((n,r)=>n+r.bytes,0))+' · '+__studio33.u24StorageRows.reduce((n,r)=>n+r.keys.length,0)+' saved records. Sizes estimate UTF-16 key/value bytes; browser quota and overhead vary.';__studio33.u24StorageList.replaceChildren();for(const row of __studio33.u24StorageRows){const label=__studio33.csText('label','','u24-storage-row'),check=document.createElement('input');check.type='checkbox';check.id='u24Storage-'+row.id;const text=__studio33.csText('span',row.label);text.append(__studio33.csText('small',__studio33.u24Bytes(row.bytes)+' · '+row.keys.length+' records'));label.append(check,text);check.onchange=__studio33.$fn(()=>{if(check.checked)__studio33.u24StorageSelected.add(row.id);else __studio33.u24StorageSelected.delete(row.id);__studio33.u24StorageUpdate()},"()=>{if(check.checked)u24StorageSelected.add(row.id);else u24StorageSelected.delete(row.id);u24StorageUpdate()}","");__studio33.u24StorageList.append(label)}__studio33.u24StorageUpdate()}),"function u24StorageRender(){u24StorageRows=u24StorageInventory();u24StorageSelected.clear();u24StorageSummary.textContent='Estimated app storage: '+u24Bytes(u24StorageRows.reduce((n,r)=>n+r.bytes,0))+' · '+u24StorageRows.reduce((n,r)=>n+r.keys.length,0)+' saved records. Sizes estimate UTF-16 key/value bytes; browser quota and overhead vary.';u24StorageList.replaceChildren();for(const row of u24StorageRows){const label=csText('label','','u24-storage-row'),check=document.createElement('input');check.type='checkbox';check.id='u24Storage-'+row.id;const text=csText('span',row.label);text.append(csText('small',u24Bytes(row.bytes)+' · '+row.keys.length+' records'));label.append(check,text);check.onchange=()=>{if(check.checked)u24StorageSelected.add(row.id);else u24StorageSelected.delete(row.id);u24StorageUpdate()};u24StorageList.append(label)}u24StorageUpdate()}","u24StorageRender");

__studio33.u25RecoveryCapture = __studio33.$fn((function u25RecoveryCapture(ids){return __studio33.u25RecoveryReady?{...__studio33.wsCapture(ids.filter(__studio33.$fn(id=>!__studio33.u25Eligible.includes(id),"id=>!u25Eligible.includes(id)",""))),...__studio33.u25Capture(ids.filter(__studio33.$fn(id=>__studio33.u25Eligible.includes(id),"id=>u25Eligible.includes(id)","")))}:__studio33.wsCapture(ids)}),"function u25RecoveryCapture(ids){return u25RecoveryReady?{...wsCapture(ids.filter(id=>!u25Eligible.includes(id))),...u25Capture(ids.filter(id=>u25Eligible.includes(id)))}:wsCapture(ids)}","u25RecoveryCapture");

__studio33.u25ProfileChoices = __studio33.$fn((function u25ProfileChoices(){const q=__studio33.u25ProfileSearch.value.trim().toLowerCase();__studio33.u25ProfileList.replaceChildren();for(const id of Object.keys(__studio33.views).filter(__studio33.$fn(id=>!__studio33.u23Aliases[id]&&(!__studio33.v12Suites[id]||__studio33.v12Suites[id].includes(id)||!__studio33.u25Eligible.includes(id)),"id=>!u23Aliases[id]&&(!v12Suites[id]||v12Suites[id].includes(id)||!u25Eligible.includes(id))",""))){if(!__studio33.views[id].toLowerCase().includes(q))continue;const c=__studio33.u25CheckRow(__studio33.u25ProfileList,'u25ProfileTool-'+id,__studio33.views[id]+(__studio33.u25Eligible.includes(id)?' · templates supported':''),__studio33.u25ProfileChosen.has(id));c.onchange=__studio33.$fn(()=>c.checked?__studio33.u25ProfileChosen.add(id):__studio33.u25ProfileChosen.delete(id),"()=>c.checked?u25ProfileChosen.add(id):u25ProfileChosen.delete(id)","")}}),"function u25ProfileChoices(){const q=u25ProfileSearch.value.trim().toLowerCase();u25ProfileList.replaceChildren();for(const id of Object.keys(views).filter(id=>!u23Aliases[id]&&(!v12Suites[id]||v12Suites[id].includes(id)||!u25Eligible.includes(id)))){if(!views[id].toLowerCase().includes(q))continue;const c=u25CheckRow(u25ProfileList,'u25ProfileTool-'+id,views[id]+(u25Eligible.includes(id)?' · templates supported':''),u25ProfileChosen.has(id));c.onchange=()=>c.checked?u25ProfileChosen.add(id):u25ProfileChosen.delete(id)}}","u25ProfileChoices");

__studio33.u25ProfileRender = __studio33.$fn((function u25ProfileRender(){const previous=__studio33.u25Saved.value;__studio33.u25Saved.replaceChildren(new Option('Choose a profile',''),...__studio33.u25State.profiles.map(p=>new Option(p.name,p.id)));__studio33.u25Saved.value=__studio33.u25State.profiles.some(p=>p.id===previous)?previous:'';__studio33.u25ProfileReview()}),"function u25ProfileRender(){const previous=u25Saved.value;u25Saved.replaceChildren(new Option('Choose a profile',''),...u25State.profiles.map(p=>new Option(p.name,p.id)));u25Saved.value=u25State.profiles.some(p=>p.id===previous)?previous:'';u25ProfileReview()}","u25ProfileRender");

__studio33.u25ProfileReview = __studio33.$fn((function u25ProfileReview(){const p=__studio33.u25State.profiles.find(__studio33.$fn(p=>p.id===__studio33.u25Saved.value,"p=>p.id===u25Saved.value",""));__studio33.u25ProfilePreview.textContent=p?JSON.stringify({name:p.name,tools:p.tools.map(__studio33.$fn(id=>__studio33.views[id],"id=>views[id]","")),opens:__studio33.views[p.active],display:p.display,inputTemplates:p.templates},null,2).slice(0,60000):'Select a saved profile to review its tools, display and input templates.';__studio33.$('u25ProfileApply').disabled=!p}),"function u25ProfileReview(){const p=u25State.profiles.find(p=>p.id===u25Saved.value);u25ProfilePreview.textContent=p?JSON.stringify({name:p.name,tools:p.tools.map(id=>views[id]),opens:views[p.active],display:p.display,inputTemplates:p.templates},null,2).slice(0,60000):'Select a saved profile to review its tools, display and input templates.';$('u25ProfileApply').disabled=!p}","u25ProfileReview");

__studio33.u25ProfileRenderLinks = __studio33.$fn((function u25ProfileRenderLinks(ids){__studio33.u25ProfileLinks.replaceChildren(__studio33.csText('strong','Profile tools'));for(const id of ids)__studio33.u25ProfileLinks.append(__studio33.u19Button(__studio33.views[id],__studio33.$fn(()=>__studio33.openTab(id),"()=>openTab(id)","")));__studio33.u25ProfileLinks.append(__studio33.u19Button('Dismiss',__studio33.$fn(()=>{__studio33.u25ProfileLinks.hidden=true},"()=>{u25ProfileLinks.hidden=true}","")));__studio33.u25ProfileLinks.hidden=false}),"function u25ProfileRenderLinks(ids){u25ProfileLinks.replaceChildren(csText('strong','Profile tools'));for(const id of ids)u25ProfileLinks.append(u19Button(views[id],()=>openTab(id)));u25ProfileLinks.append(u19Button('Dismiss',()=>{u25ProfileLinks.hidden=true}));u25ProfileLinks.hidden=false}","u25ProfileRenderLinks");

__studio33.u25RecoveryRender = __studio33.$fn((function u25RecoveryRender(){__studio33.u25RecoveryList.replaceChildren();for(const id of __studio33.u25Eligible){const saved=__studio33.v12State.recovery.values[id],time=__studio33.u22State.draftTimes[id],c=__studio33.u25CheckRow(__studio33.u25RecoveryList,'u25Recover-'+id,__studio33.views[id]+(saved?' · saved '+(time?new Date(time).toLocaleString():'earlier'):''),__studio33.u25RecoveryChosen.has(id));c.onchange=__studio33.$fn(()=>{c.checked?__studio33.u25RecoveryChosen.add(id):__studio33.u25RecoveryChosen.delete(id);__studio33.u25RecoveryData=null;__studio33.u25RecoveryConfirm.checked=false;__studio33.u25RecoveryPreview.textContent='Selection changed. Preview saved inputs again.';__studio33.$('u25RecoveryRestore').disabled=true},"()=>{c.checked?u25RecoveryChosen.add(id):u25RecoveryChosen.delete(id);u25RecoveryData=null;u25RecoveryConfirm.checked=false;u25RecoveryPreview.textContent='Selection changed. Preview saved inputs again.';$('u25RecoveryRestore').disabled=true}","")}}),"function u25RecoveryRender(){u25RecoveryList.replaceChildren();for(const id of u25Eligible){const saved=v12State.recovery.values[id],time=u22State.draftTimes[id],c=u25CheckRow(u25RecoveryList,'u25Recover-'+id,views[id]+(saved?' · saved '+(time?new Date(time).toLocaleString():'earlier'):''),u25RecoveryChosen.has(id));c.onchange=()=>{c.checked?u25RecoveryChosen.add(id):u25RecoveryChosen.delete(id);u25RecoveryData=null;u25RecoveryConfirm.checked=false;u25RecoveryPreview.textContent='Selection changed. Preview saved inputs again.';$('u25RecoveryRestore').disabled=true}}}","u25RecoveryRender");

__studio33.u25RecoveryRefresh = __studio33.$fn((function u25RecoveryRefresh(){__studio33.u25RecoveryBanner.hidden=!Object.keys(__studio33.v12State.recovery.values).some(__studio33.$fn(id=>__studio33.u25Eligible.includes(id)&&Object.keys(__studio33.v12State.recovery.values[id]).length,"id=>u25Eligible.includes(id)&&Object.keys(v12State.recovery.values[id]).length",""));__studio33.u22DraftRefresh();__studio33.wsRender()}),"function u25RecoveryRefresh(){u25RecoveryBanner.hidden=!Object.keys(v12State.recovery.values).some(id=>u25Eligible.includes(id)&&Object.keys(v12State.recovery.values[id]).length);u22DraftRefresh();wsRender()}","u25RecoveryRefresh");
}
const steps=[
[6,function initialize_6(__studio33){
__studio33.storage = {get(k,f){try{const v=JSON.parse(localStorage.getItem(k));return v??f}catch{return f}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};

}],
[321,function initialize_321(__studio33){
__studio33.backupKeys = ['advanced-calculator-history','advanced-calculator-ans','advanced-calculator-angle','calc-studio-memory','calc-studio-theme','calc-studio-scientific','calc-studio-history-visible','calc-studio-compact-v2','calc-studio-favorites','calc-studio-notebook','calc-studio-sessions','calc-studio-active-session','calc-studio-notebook-split','calc-studio-formulas','calc-studio-graph','calc-studio-rates','calc-studio-formatting','calc-studio-presets','calc-studio-drafts'];

}],
[1312,function initialize_1312(__studio33){
__studio33.wsEligible = ['statistics','equations','fractions','tools','measurements','matrices','calculus','converter','dates','finance','programmer','characters','jsonformatter','jsondiff','textdiff','textutils','encoding','regex','csvjson','jsoncsv','explorer','schema','jsonpath','jsonmapping','timestamp','businessdays','xml','numberwords','decision','expenses','cron','soql','flowchart','calendar','dataworkbench','reconciliation','workflows','responsedashboard'];

}],
[1313,function initialize_1313(__studio33){
__studio33.wsElements = new Map(__studio33.wsEligible.map(__studio33.$fn(id=>[id,[...__studio33.$(id).querySelectorAll('input[id],select[id],textarea[id]')].filter(e=>e.type!=='file'&&e.type!=='password'&&!['button','submit','hidden'].includes(e.type)&&!e.closest('dialog')).map(e=>e.id)],"id=>[id,[...$(id).querySelectorAll('input[id],select[id],textarea[id]')].filter(e=>e.type!=='file'&&e.type!=='password'&&!['button','submit','hidden'].includes(e.type)&&!e.closest('dialog')).map(e=>e.id)]","")));

}],
[1315,function initialize_1315(__studio33){
__studio33.wsUndoRestore = null;
__studio33.wsTimer = null;

}],
[2746,function initialize_2746(__studio33){
__studio33.u22Reset = __studio33.u19Dialog('u22Reset','Reset Calc Studio');

}],
[2748,function initialize_2748(__studio33){
__studio33.u22ResetScope = __studio33.u19Option(__studio33.u22Reset,'u22ResetScope','Reset scope',[['cache','Tool cache & memory'],['settings','Display & tool settings'],['all','All Calc Studio data']]);

}],
[2749,function initialize_2749(__studio33){
__studio33.u22ResetDescription = __studio33.csText('p','');

}],
[2751,function initialize_2751(__studio33){
__studio33.u22ResetVerify = __studio33.csText('label','','field');
__studio33.u22ResetInput = document.createElement('input');

}],
[2756,function initialize_2756(__studio33){
__studio33.u22ResetError = __studio33.csText('p','');

}],
[2766,function initialize_2766(__studio33){
__studio33.u22ResetButton = __studio33.u19Button('Reset…',__studio33.$fn(()=>{__studio33.u22ResetExplain();__studio33.u19OpenDialog(__studio33.u22Reset,__studio33.u22ResetScope)},"()=>{u22ResetExplain();u19OpenDialog(u22Reset,u22ResetScope)}",""),'u22ResetButton');

}],
[3030,function initialize_3030(__studio33){
__studio33.u24Storage = __studio33.u19Dialog('u24Storage','Storage & cleanup');
__studio33.u24StorageSummary = __studio33.csText('p','');
__studio33.u24StorageList = __studio33.csText('div','','u24-storage-list');
__studio33.u24StorageReview = __studio33.csText('p','','hint');

}],
[3035,function initialize_3035(__studio33){
__studio33.u24StorageGroups = [['kanban','Kanban boards',[__studio33.knKey]],['projects','Project snapshots, saved workflows & recovered drafts',[__studio33.v12Key]],['apis','Saved API requests, environments & API history',[__studio33.lcKey]],['notes','Notebook sessions, notes & formulas',['calc-studio-sessions','calc-studio-active-session','calc-studio-formulas','calc-studio-notebook']],['presets','Conversion presets & saved links',['calc-studio-presets',__studio33.shortcutStoreKey]],['forms','Forms & flashcards',[__studio33.fdKey,__studio33.fcKey]],['history','Calculator history, recent tools & history records',['advanced-calculator-history','calc-studio-recents-v6']],['cache','Calculator memory, last answer & currency cache',__studio33.u22CacheKeys],['advanced','Saved advanced recipes & programs',[__studio33.u18StateKey,__studio33.u16StateKey]],['settings','Display, menu & tool preferences',[...__studio33.u22SettingKeys,'calc-studio-favorites',__studio33.u24Key]]];

}],
[3036,function initialize_3036(__studio33){
__studio33.u24StorageRows = [];
__studio33.u24StorageSelected = new Set();

}],
[3042,function initialize_3042(__studio33){
__studio33.u24StorageConfirmRow = __studio33.csText('label','','u24-storage-row');
__studio33.u24StorageConfirm = document.createElement('input');

}],
[3095,function initialize_3095(__studio33){
__studio33.u25RecoveryReady = false;

}],
[3119,function initialize_3119(__studio33){
__studio33.u25Profiles = __studio33.u19Dialog('u25Profiles','Workspace profiles');
__studio33.u25ProfileStatus = __studio33.u25Status('u25ProfileStatus');

}],
[3121,function initialize_3121(__studio33){
__studio33.u25ProfileName = __studio33.u25Field(__studio33.u25Profiles,'u25ProfileName','Profile name');

}],
[3123,function initialize_3123(__studio33){
__studio33.u25ProfileSearch = __studio33.u25Field(__studio33.u25Profiles,'u25ProfileSearch','Filter tools','search');
__studio33.u25ProfileList = __studio33.csText('div','','u25-list');

}],
[3126,function initialize_3126(__studio33){
__studio33.u25ProfileChosen = new Set();
__studio33.u25ProfileUndo = null;

}],
[3127,function initialize_3127(__studio33){
__studio33.u25ProfileTemplates = __studio33.u25CheckRow(__studio33.u25Profiles,'u25ProfileTemplates','Include current input templates for selected supported tools');

}],
[3136,function initialize_3136(__studio33){
__studio33.u25ProfileActions = __studio33.csText('div','','u25-actions');

}],
[3140,function initialize_3140(__studio33){
__studio33.u25ProfileImport = __studio33.u25Field(__studio33.u25Profiles,'u25ProfileImport','Import profiles file','file');

}],
[3143,function initialize_3143(__studio33){
__studio33.u25ProfileLinks = __studio33.csText('nav','','u25-banner');

}],
[3193,function initialize_3193(__studio33){
__studio33.u25Recovery = __studio33.u19Dialog('u25Recovery','Session recovery');
__studio33.u25RecoveryStatus = __studio33.u25Status('u25RecoveryStatus');

}],
[3195,function initialize_3195(__studio33){
__studio33.u25RecoveryList = __studio33.csText('div','','u25-list');

}],
[3198,function initialize_3198(__studio33){
__studio33.u25RecoveryChosen = new Set();
__studio33.u25RecoveryData = null;

}],
[3199,function initialize_3199(__studio33){
__studio33.u25RecoveryPreview = __studio33.csText('pre','','u25-preview');

}],
[3202,function initialize_3202(__studio33){
__studio33.u25RecoveryConfirm = __studio33.u25CheckRow(__studio33.u25Recovery,'u25RecoveryConfirm','Restore the reviewed saved inputs for selected tools');

}],
[3207,function initialize_3207(__studio33){
__studio33.u25RecoveryBanner = __studio33.csText('div','','u25-banner');

}]
];

return {id,register,steps};
})(),
(()=>{
// core/shell · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
const id="core/shell";
function register(__studio33){
__studio33.validVariable = __studio33.$fn((function validVariable(name){return /^[a-z_][a-z0-9_]*$/i.test(name)&&!__studio33.reservedNames.has(name.toLowerCase())&&!['__proto__','prototype','constructor'].includes(name.toLowerCase())}),"function validVariable(name){return /^[a-z_][a-z0-9_]*$/i.test(name)&&!reservedNames.has(name.toLowerCase())&&!['__proto__','prototype','constructor'].includes(name.toLowerCase())}","validVariable");

__studio33.saveCurrentSession = __studio33.$fn((function saveCurrentSession(){if(!__studio33.sessions||!__studio33.activeSessionId)return;const item=__studio33.sessions.find(__studio33.$fn(x=>x.id===__studio33.activeSessionId,"x=>x.id===activeSessionId",""));if(item){item.notebook=__studio33.$('notebookInput').value;item.expression=__studio33.$('expression').value;__studio33.storage.set('calc-studio-sessions',__studio33.sessions);__studio33.storage.set('calc-studio-active-session',__studio33.activeSessionId)}}),"function saveCurrentSession(){if(!sessions||!activeSessionId)return;const item=sessions.find(x=>x.id===activeSessionId);if(item){item.notebook=$('notebookInput').value;item.expression=$('expression').value;storage.set('calc-studio-sessions',sessions);storage.set('calc-studio-active-session',activeSessionId)}}","saveCurrentSession");

__studio33.switchSession = __studio33.$fn((function switchSession(id){__studio33.saveCurrentSession();const item=__studio33.sessions.find(x=>x.id===id);if(!item)return;__studio33.activeSessionId=id;__studio33.$('notebookInput').value=item.notebook;__studio33.$('expression').value=item.expression;__studio33.renderSessionOptions();__studio33.renderNotebook();__studio33.preview();__studio33.resetEdits('notebookInput');__studio33.resetEdits('expression');__studio33.saveCurrentSession()}),"function switchSession(id){saveCurrentSession();const item=sessions.find(x=>x.id===id);if(!item)return;activeSessionId=id;$('notebookInput').value=item.notebook;$('expression').value=item.expression;renderSessionOptions();renderNotebook();preview();resetEdits('notebookInput');resetEdits('expression');saveCurrentSession()}","switchSession");

__studio33.installEditorControls = __studio33.$fn((function installEditorControls(){for(const [id,title]of Object.entries(__studio33.views)){if(id==='typing'||id==='passwords')continue;const panel=__studio33.$(id);if(!panel)continue;const editors=[...panel.querySelectorAll('textarea')];if(!editors.length)continue;const editable=editors.filter(e=>!e.readOnly),config=document.createElement('details');config.className='details-box editor-options';const summary=document.createElement('summary');summary.textContent='Editor controls & send to tool';config.append(summary);const bar=document.createElement('div');bar.className='developer-toolbar';const size=document.createElement('select');size.className='small';size.setAttribute('aria-label','Editor height');for(const [value,label]of [['','Default height'],['120','Compact: 120px'],['220','Standard: 220px'],['400','Roomy: 400px']]){const o=document.createElement('option');o.value=value;o.textContent=label;size.append(o)}size.onchange=()=>{for(const editor of editors){if(size.value){editor.style.setProperty('height',size.value+'px','important');editor.style.setProperty('min-height','0','important')}else{editor.style.removeProperty('height');editor.style.removeProperty('min-height')}}};bar.append(size);const hide=document.createElement('button');hide.className='small';hide.textContent='Collapse inputs';let collapsed=false;hide.onclick=()=>{collapsed=!collapsed;for(const editor of editable)editor.closest('.field')?editor.closest('.field').hidden=collapsed:editor.hidden=collapsed;hide.textContent=collapsed?'Show inputs':'Collapse inputs'};bar.append(hide);const optionToggle=document.createElement('button');optionToggle.className='small';optionToggle.textContent='Collapse options';let optionsHidden=false;const optionNodes=[...panel.querySelectorAll('.developer-toolbar')].flatMap(row=>[...row.children].filter(x=>['LABEL','SELECT'].includes(x.tagName)));optionToggle.onclick=()=>{optionsHidden=!optionsHidden;optionNodes.forEach(x=>x.hidden=optionsHidden);optionToggle.textContent=optionsHidden?'Show options':'Collapse options'};bar.append(optionToggle);const groups=[...panel.querySelectorAll('.json-editors')].filter(row=>row.children.length===2);if(groups.length){const label=document.createElement('label');label.className='inline-field';label.textContent='Left pane ';const split=document.createElement('input');split.type='range';split.min='25';split.max='75';split.value='50';split.setAttribute('aria-label','Input/output pane divider');split.oninput=()=>groups.forEach(row=>row.style.setProperty('--editor-left',split.value+'%'));label.append(split);bar.append(label)}config.append(bar);if(editable.length){const uploadRow=document.createElement('div');uploadRow.className='developer-toolbar';const destination=document.createElement('select');destination.className='small';destination.setAttribute('aria-label','Upload destination editor');for(const editor of editable){const option=document.createElement('option');option.value=editor.id;option.textContent=editor.closest('label')?.querySelector('span')?.textContent||editor.id;destination.append(option)}const upload=document.createElement('button');upload.className='small';upload.textContent='Upload text to editor';const file=document.createElement('input');file.type='file';file.hidden=true;file.accept='.txt,.json,.csv,.tsv,.log,.xml,.md,.pem';const hint=document.createElement('small');hint.textContent='UTF-8 / BOM UTF-16 · max 2 MiB; tool-specific limits still apply. Drop a text file onto an input editor.';upload.onclick=()=>file.click();const read=__studio33.$fn(async(file,editor)=>{const previous=editor.value;try{const text=await __studio33.readLocalText(file,['txt','json','csv','tsv','log','xml','md','pem']);if(editor.value!==previous)throw Error('Editor changed while reading; upload again to replace it');editor.value=text;editor.dispatchEvent(new Event('input',{bubbles:true}));hint.textContent='Loaded '+file.name+'. Run the tool to update results.'}catch(e){hint.textContent=e.message}},"async(file,editor)=>{const previous=editor.value;try{const text=await readLocalText(file,['txt','json','csv','tsv','log','xml','md','pem']);if(editor.value!==previous)throw Error('Editor changed while reading; upload again to replace it');editor.value=text;editor.dispatchEvent(new Event('input',{bubbles:true}));hint.textContent='Loaded '+file.name+'. Run the tool to update results.'}catch(e){hint.textContent=e.message}}","read");file.onchange=__studio33.$fn(async()=>{if(file.files[0])await read(file.files[0],__studio33.$(destination.value));file.value=''},"async()=>{if(file.files[0])await read(file.files[0],$(destination.value));file.value=''}","");for(const editor of editable){editor.addEventListener('dragover',e=>{e.preventDefault();editor.classList.add('file-drag')});editor.addEventListener('dragleave',()=>editor.classList.remove('file-drag'));editor.addEventListener('drop',async e=>{e.preventDefault();editor.classList.remove('file-drag');if(e.dataTransfer.files.length!==1){hint.textContent='Drop one text file at a time.';return}await read(e.dataTransfer.files[0],editor)})}uploadRow.append(destination,upload,file);config.append(uploadRow,hint)}const readonly=editors.filter(e=>e.readOnly);if(readonly.length||['logs','jwt'].includes(id)){const row=document.createElement('div');row.className='developer-toolbar';const source=document.createElement('select');source.className='small';source.setAttribute('aria-label','Transfer source');const sourceEditors=id==='jwt'?[...readonly,__studio33.$('jwtInput')]:readonly;for(const editor of sourceEditors){const o=document.createElement('option');o.value=editor.id;o.textContent=editor.closest('label')?.querySelector('span')?.textContent||editor.id;source.append(o)}if(id==='logs'){const o=document.createElement('option');o.value='logInput';o.textContent='Pasted log text';source.append(o)}const destination=document.createElement('select');destination.className='small';destination.setAttribute('aria-label','Send output to tool');for(const [view,input,label,kind]of __studio33.transferTargets){if(view===id)continue;const o=document.createElement('option');o.value=input;o.textContent=label;destination.append(o)}const send=document.createElement('button');send.className='small';send.textContent='Send to tool';const feedback=document.createElement('small');send.onclick=__studio33.$fn(()=>{try{const text=__studio33.$(source.value).value;if(!text)throw Error('Generate output or select a nonempty source first');const target=__studio33.transferTargets.find(t=>t[1]===destination.value);if(target[3]==='json')__studio33.strictJSON(text);__studio33.transferToolText(target[1],text,target[0]);feedback.textContent='Transferred. Use Undo last transfer to restore the previous destination.'}catch(e){feedback.textContent=e.message}},"()=>{try{const text=$(source.value).value;if(!text)throw Error('Generate output or select a nonempty source first');const target=transferTargets.find(t=>t[1]===destination.value);if(target[3]==='json')strictJSON(text);transferToolText(target[1],text,target[0]);feedback.textContent='Transferred. Use Undo last transfer to restore the previous destination.'}catch(e){feedback.textContent=e.message}}","");row.append(source,destination,send);config.append(row,feedback)}const heading=panel.querySelector('.panel-heading');if(heading)heading.after(config);else panel.prepend(config)}}),"function installEditorControls(){for(const [id,title]of Object.entries(views)){if(id==='typing'||id==='passwords')continue;const panel=$(id);if(!panel)continue;const editors=[...panel.querySelectorAll('textarea')];if(!editors.length)continue;const editable=editors.filter(e=>!e.readOnly),config=document.createElement('details');config.className='details-box editor-options';const summary=document.createElement('summary');summary.textContent='Editor controls & send to tool';config.append(summary);const bar=document.createElement('div');bar.className='developer-toolbar';const size=document.createElement('select');size.className='small';size.setAttribute('aria-label','Editor height');for(const [value,label]of [['','Default height'],['120','Compact: 120px'],['220','Standard: 220px'],['400','Roomy: 400px']]){const o=document.createElement('option');o.value=value;o.textContent=label;size.append(o)}size.onchange=()=>{for(const editor of editors){if(size.value){editor.style.setProperty('height',size.value+'px','important');editor.style.setProperty('min-height','0','important')}else{editor.style.removeProperty('height');editor.style.removeProperty('min-height')}}};bar.append(size);const hide=document.createElement('button');hide.className='small';hide.textContent='Collapse inputs';let collapsed=false;hide.onclick=()=>{collapsed=!collapsed;for(const editor of editable)editor.closest('.field')?editor.closest('.field').hidden=collapsed:editor.hidden=collapsed;hide.textContent=collapsed?'Show inputs':'Collapse inputs'};bar.append(hide);const optionToggle=document.createElement('button');optionToggle.className='small';optionToggle.textContent='Collapse options';let optionsHidden=false;const optionNodes=[...panel.querySelectorAll('.developer-toolbar')].flatMap(row=>[...row.children].filter(x=>['LABEL','SELECT'].includes(x.tagName)));optionToggle.onclick=()=>{optionsHidden=!optionsHidden;optionNodes.forEach(x=>x.hidden=optionsHidden);optionToggle.textContent=optionsHidden?'Show options':'Collapse options'};bar.append(optionToggle);const groups=[...panel.querySelectorAll('.json-editors')].filter(row=>row.children.length===2);if(groups.length){const label=document.createElement('label');label.className='inline-field';label.textContent='Left pane ';const split=document.createElement('input');split.type='range';split.min='25';split.max='75';split.value='50';split.setAttribute('aria-label','Input/output pane divider');split.oninput=()=>groups.forEach(row=>row.style.setProperty('--editor-left',split.value+'%'));label.append(split);bar.append(label)}config.append(bar);if(editable.length){const uploadRow=document.createElement('div');uploadRow.className='developer-toolbar';const destination=document.createElement('select');destination.className='small';destination.setAttribute('aria-label','Upload destination editor');for(const editor of editable){const option=document.createElement('option');option.value=editor.id;option.textContent=editor.closest('label')?.querySelector('span')?.textContent||editor.id;destination.append(option)}const upload=document.createElement('button');upload.className='small';upload.textContent='Upload text to editor';const file=document.createElement('input');file.type='file';file.hidden=true;file.accept='.txt,.json,.csv,.tsv,.log,.xml,.md,.pem';const hint=document.createElement('small');hint.textContent='UTF-8 / BOM UTF-16 · max 2 MiB; tool-specific limits still apply. Drop a text file onto an input editor.';upload.onclick=()=>file.click();const read=async(file,editor)=>{const previous=editor.value;try{const text=await readLocalText(file,['txt','json','csv','tsv','log','xml','md','pem']);if(editor.value!==previous)throw Error('Editor changed while reading; upload again to replace it');editor.value=text;editor.dispatchEvent(new Event('input',{bubbles:true}));hint.textContent='Loaded '+file.name+'. Run the tool to update results.'}catch(e){hint.textContent=e.message}};file.onchange=async()=>{if(file.files[0])await read(file.files[0],$(destination.value));file.value=''};for(const editor of editable){editor.addEventListener('dragover',e=>{e.preventDefault();editor.classList.add('file-drag')});editor.addEventListener('dragleave',()=>editor.classList.remove('file-drag'));editor.addEventListener('drop',async e=>{e.preventDefault();editor.classList.remove('file-drag');if(e.dataTransfer.files.length!==1){hint.textContent='Drop one text file at a time.';return}await read(e.dataTransfer.files[0],editor)})}uploadRow.append(destination,upload,file);config.append(uploadRow,hint)}const readonly=editors.filter(e=>e.readOnly);if(readonly.length||['logs','jwt'].includes(id)){const row=document.createElement('div');row.className='developer-toolbar';const source=document.createElement('select');source.className='small';source.setAttribute('aria-label','Transfer source');const sourceEditors=id==='jwt'?[...readonly,$('jwtInput')]:readonly;for(const editor of sourceEditors){const o=document.createElement('option');o.value=editor.id;o.textContent=editor.closest('label')?.querySelector('span')?.textContent||editor.id;source.append(o)}if(id==='logs'){const o=document.createElement('option');o.value='logInput';o.textContent='Pasted log text';source.append(o)}const destination=document.createElement('select');destination.className='small';destination.setAttribute('aria-label','Send output to tool');for(const [view,input,label,kind]of transferTargets){if(view===id)continue;const o=document.createElement('option');o.value=input;o.textContent=label;destination.append(o)}const send=document.createElement('button');send.className='small';send.textContent='Send to tool';const feedback=document.createElement('small');send.onclick=()=>{try{const text=$(source.value).value;if(!text)throw Error('Generate output or select a nonempty source first');const target=transferTargets.find(t=>t[1]===destination.value);if(target[3]==='json')strictJSON(text);transferToolText(target[1],text,target[0]);feedback.textContent='Transferred. Use Undo last transfer to restore the previous destination.'}catch(e){feedback.textContent=e.message}};row.append(source,destination,send);config.append(row,feedback)}const heading=panel.querySelector('.panel-heading');if(heading)heading.after(config);else panel.prepend(config)}}","installEditorControls");

__studio33.v9WorkerSource = __studio33.$fn((function v9WorkerSource(job){const kind=({excelWorkerJob:"excel",pdfWorkerJob:"pdf",qrDecodeJob:"qrdecode",archiveWorkerJob:"archive"})[job.name];if(!kind)throw Error("Unknown worker library");return "const studioLibraryCache={}; const studioLibraryFactories={"+JSON.stringify(kind)+":"+__studio33.studioLibraryFactories[kind].toString()+"};\n"+__studio33.v9Libraries.toString()+"\nself.job="+job.toString()}),"function v9WorkerSource(job){const kind=({excelWorkerJob:\"excel\",pdfWorkerJob:\"pdf\",qrDecodeJob:\"qrdecode\",archiveWorkerJob:\"archive\"})[job.name];if(!kind)throw Error(\"Unknown worker library\");return \"const studioLibraryCache={}; const studioLibraryFactories={\"+JSON.stringify(kind)+\":\"+studioLibraryFactories[kind].toString()+\"};\\n\"+v9Libraries.toString()+\"\\nself.job=\"+job.toString()}","v9WorkerSource");

__studio33.inspectFileBytes = (function inspectFileBytes(bytes,name=''){const b=bytes instanceof Uint8Array?bytes:new Uint8Array(bytes),hex=[...b.slice(0,32)].map(x=>x.toString(16).padStart(2,'0')).join(' '),ascii=new TextDecoder('latin1').decode(b.slice(0,512)),at=(offset,values)=>values.every((v,i)=>b[offset+i]===v);let type='Unknown',ext=[];if(at(0,[137,80,78,71,13,10,26,10])){type='PNG image';ext=['png']}else if(at(0,[255,216,255])){type='JPEG image';ext=['jpg','jpeg']}else if(ascii.startsWith('GIF87a')||ascii.startsWith('GIF89a')){type='GIF image';ext=['gif']}else if(ascii.startsWith('RIFF')&&ascii.slice(8,12)==='WEBP'){type='WebP image';ext=['webp']}else if(/%PDF-/.test(ascii)){type='PDF document';ext=['pdf']}else if(at(0,[80,75,3,4])||at(0,[80,75,5,6])||at(0,[80,75,7,8])){type='ZIP container (may be Office, EPUB, APK, or ZIP)';ext=['zip','xlsx','xlsm','docx','pptx','epub','apk','jar','ods','odt']}else if(at(0,[208,207,17,224,161,177,26,225])){type='OLE compound document';ext=['xls','doc','ppt','msg']}else if(at(0,[31,139])){type='GZIP archive';ext=['gz','tgz']}else if(ascii.startsWith('SQLite format 3\0')){type='SQLite database';ext=['sqlite','sqlite3','db']}else if(ascii.startsWith('MZ')){type='DOS/Windows executable candidate';ext=['exe','dll']}else if(at(0,[127,69,76,70])){type='ELF executable';ext=['elf','so','bin']}else if(ascii.startsWith('RIFF')&&ascii.slice(8,12)==='WAVE'){type='WAV audio';ext=['wav']}else if(ascii.slice(4,8)==='ftyp'){type='ISO media container';ext=['mp4','mov','m4a','avif','heic','heif']}const extension=name.includes('.')?name.split('.').pop().toLowerCase():'';return {name,signature:type,extension,expectedExtensions:ext,possibleMismatch:!!(extension&&ext.length&&!ext.includes(extension)),hex,ascii:[...ascii.slice(0,32)].map(c=>c.charCodeAt(0)>=32&&c.charCodeAt(0)<127?c:'.').join(''),notice:'Signature hints identify common formats only. ZIP/Office subtypes are not distinguished. This is not a malware scan.'}});

__studio33.beforeStudioToolChange = __studio33.$fn((function beforeStudioToolChange(id){if(id===__studio33.activeView)return;__studio33.cancelStudioTasks();if(__studio33.activeView==='archives')__studio33.zipVersion++;if(__studio33.activeView==='imagecolors')__studio33.pickerVersion++;if(__studio33.activeView==='qr')__studio33.qrReadVersion++;if(__studio33.activeView==='images')__studio33.imageVersion++;if(__studio33.activeView==='fileinspect')__studio33.inspectVersion++;if(__studio33.activeView==='pdf')__studio33.pdfVersion++;if(__studio33.activeView==='excel'){for(const role of ['A','B'])if(__studio33.excelState[role]&&!__studio33.excelState[role].rows){__studio33.excelState[role]=null;__studio33.$('excelSheet'+role).disabled=false}__studio33.renderExcelPreview()}if(__studio33.activeView==='typing'&&__studio33.typingArmed)__studio33.finishTyping();}),"function beforeStudioToolChange(id){if(id===activeView)return;cancelStudioTasks();if(activeView==='archives')zipVersion++;if(activeView==='imagecolors')pickerVersion++;if(activeView==='qr')qrReadVersion++;if(activeView==='images')imageVersion++;if(activeView==='fileinspect')inspectVersion++;if(activeView==='pdf')pdfVersion++;if(activeView==='excel'){for(const role of ['A','B'])if(excelState[role]&&!excelState[role].rows){excelState[role]=null;$('excelSheet'+role).disabled=false}renderExcelPreview()}if(activeView==='typing'&&typingArmed)finishTyping();}","beforeStudioToolChange");

__studio33.initializeStudioUI = __studio33.$fn((function initializeStudioUI(){
 const top=document.querySelector('.top'),nav=document.querySelector('.compact-nav');if(!top||!nav)return;top.classList.add('studio-header');top.append(nav);const more=document.createElement('details');more.className='studio-menu';more.innerHTML='<summary>Options</summary><div class="studio-menu-body"></div>';const body=more.lastElementChild;for(const id of ['favoriteToggle','undoEdit','redoEdit','fullScreenToggle','densityToggle'])if(__studio33.$(id))body.append(__studio33.$(id));top.append(more);body.addEventListener('click',e=>{if(e.target.closest('button'))more.open=false});document.addEventListener('pointerdown',e=>{if(!more.contains(e.target))more.open=false});document.addEventListener('keydown',e=>{if(e.key==='Escape')more.open=false});
 const task=document.createElement('div');task.id='studioTask';task.className='studio-task';task.hidden=true;task.innerHTML='<span id="studioTaskText" role="status"></span><progress id="studioProgress" max="1" aria-label="Task progress"></progress><button id="studioCancel" class="small">Cancel</button>';__studio33.$('workspace').before(task);__studio33.$('studioCancel').onclick=__studio33.$fn(()=>__studio33.cancelStudioTasks(),"()=>cancelStudioTasks()","");
 const saved=document.createElement('details');saved.className='studio-saved';saved.innerHTML='<summary>Favorites & recent tools</summary>';for(const id of ['favoritesBar','recentBar'])if(__studio33.$(id))saved.append(__studio33.$(id));document.querySelector('.main-card').prepend(saved);
 const width=document.createElement('label');width.className='studio-history-size';width.textContent='Drawer width ';const slider=document.createElement('input');slider.type='range';slider.min='240';slider.max='520';slider.value=String(__studio33.storage.get('calc-studio-history-width-v10',340));slider.setAttribute('aria-label','History drawer width');slider.oninput=__studio33.$fn(()=>{document.documentElement.style.setProperty('--history-width',slider.value+'px');__studio33.storage.set('calc-studio-history-width-v10',Number(slider.value))},"()=>{document.documentElement.style.setProperty('--history-width',slider.value+'px');storage.set('calc-studio-history-width-v10',Number(slider.value))}","");width.append(slider);__studio33.$('historyPanel').prepend(width);document.documentElement.style.setProperty('--history-width',slider.value+'px');document.addEventListener('keydown',__studio33.$fn(e=>{if(e.key==='Escape'&&!__studio33.$('historyPanel').hidden)__studio33.toggleHistory(false)},"e=>{if(e.key==='Escape'&&!$('historyPanel').hidden)toggleHistory(false)}",""));
 for(const id of Object.keys(__studio33.views)){const panel=__studio33.$(id);if(!panel||id==='calculator'||id==='apiclient')continue;const heading=panel.querySelector('.panel-heading');if(!heading)continue;const bar=document.createElement('div');bar.className='studio-actions';const candidates=[...panel.querySelectorAll('button[id]')].filter(b=>!b.closest('details')&&!b.closest('.studio-file-entry')&&/(upload|run|generate|build|render|inspect|format|convert|compare|calculate|copy|download|clear|open|extract|add)/i.test(b.id+' '+b.textContent)&&!/(node|edge|more|prev|next|all|none|demo|sheet)/i.test(b.id));const rank=b=>/upload|open|add/i.test(b.id+' '+b.textContent)?0:/clear/i.test(b.id)?4:/copy/i.test(b.id+' '+b.textContent)?2:/download|export/i.test(b.id+' '+b.textContent)?3:1;candidates.sort((a,b)=>rank(a)-rank(b));for(const b of candidates){b.dataset.studioAction=String(rank(b));bar.append(b)}if(bar.children.length)heading.after(bar);
  for(const row of panel.querySelectorAll('.json-editors')){if(row.children.length!==2)continue;const left=row.children[0],right=row.children[1],tabs=document.createElement('div');tabs.className='studio-editor-tabs';const labels=right.querySelector('textarea[readonly],iframe')?['Input','Output']:['Left input','Right input'];[left,right].forEach((field,i)=>field.dataset.studioPane=String(i));for(const [i,label]of labels.entries()){const b=document.createElement('button');b.className='small';b.textContent=label;b.setAttribute('aria-pressed',String(i===0));b.onclick=()=>{row.dataset.mobilePane=String(i);[...tabs.children].forEach((x,j)=>x.setAttribute('aria-pressed',String(i===j)))};tabs.append(b)}row.dataset.mobilePane='0';row.before(tabs);const handle=document.createElement('div');handle.className='studio-divider';handle.tabIndex=0;handle.role='separator';handle.setAttribute('aria-label','Resize input and output panes');handle.setAttribute('aria-orientation','vertical');handle.setAttribute('aria-valuemin','25');handle.setAttribute('aria-valuemax','75');handle.setAttribute('aria-valuenow','50');const change=value=>{value=Math.max(25,Math.min(75,value));row.style.setProperty('--editor-left',value+'%');handle.setAttribute('aria-valuenow',String(Math.round(value)))};let dragging=false;handle.onpointerdown=e=>{dragging=true;handle.setPointerCapture(e.pointerId);e.preventDefault()};handle.onpointermove=e=>{if(dragging){const r=row.getBoundingClientRect();change((e.clientX-r.left)/r.width*100)}};handle.onpointerup=()=>dragging=false;handle.onpointercancel=()=>dragging=false;handle.onkeydown=e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();change(Number(handle.getAttribute('aria-valuenow'))+(e.key==='ArrowLeft'?-5:5))}};row.append(handle)}
 }
 const mobile=document.createElement('div');mobile.className='studio-mobile-actions';mobile.setAttribute('aria-label','Active tool actions');document.body.append(mobile);let signature='';const sync=__studio33.$fn(()=>{__studio33.refreshTaskUI();const buttons=[...__studio33.$(__studio33.activeView).querySelectorAll('.studio-actions button')].filter(b=>!b.hidden),next=__studio33.activeView+'|'+buttons.map(b=>b.id+':'+b.disabled+':'+b.textContent).join('|');if(next===signature)return;signature=next;mobile.replaceChildren();for(const b of buttons.slice(0,6)){const proxy=document.createElement('button');proxy.className='small';proxy.textContent=b.textContent;proxy.disabled=b.disabled;proxy.onclick=()=>b.click();mobile.append(proxy)}mobile.hidden=!mobile.children.length},"()=>{refreshTaskUI();const buttons=[...$(activeView).querySelectorAll('.studio-actions button')].filter(b=>!b.hidden),next=activeView+'|'+buttons.map(b=>b.id+':'+b.disabled+':'+b.textContent).join('|');if(next===signature)return;signature=next;mobile.replaceChildren();for(const b of buttons.slice(0,6)){const proxy=document.createElement('button');proxy.className='small';proxy.textContent=b.textContent;proxy.disabled=b.disabled;proxy.onclick=()=>b.click();mobile.append(proxy)}mobile.hidden=!mobile.children.length}","sync");new MutationObserver(sync).observe(__studio33.$('workspace'),{subtree:true,attributes:true,childList:true,characterData:true});sync();__studio33.enhanceCommandResults();document.querySelectorAll('.theme-choice').forEach(__studio33.$fn(b=>b.addEventListener('click',__studio33.$fn(()=>{if(__studio33.flowState)__studio33.drawFlow()},"()=>{if(flowState)drawFlow()}","")),"b=>b.addEventListener('click',()=>{if(flowState)drawFlow()})",""));
}),"function initializeStudioUI(){\n const top=document.querySelector('.top'),nav=document.querySelector('.compact-nav');if(!top||!nav)return;top.classList.add('studio-header');top.append(nav);const more=document.createElement('details');more.className='studio-menu';more.innerHTML='<summary>Options</summary><div class=\"studio-menu-body\"></div>';const body=more.lastElementChild;for(const id of ['favoriteToggle','undoEdit','redoEdit','fullScreenToggle','densityToggle'])if($(id))body.append($(id));top.append(more);body.addEventListener('click',e=>{if(e.target.closest('button'))more.open=false});document.addEventListener('pointerdown',e=>{if(!more.contains(e.target))more.open=false});document.addEventListener('keydown',e=>{if(e.key==='Escape')more.open=false});\n const task=document.createElement('div');task.id='studioTask';task.className='studio-task';task.hidden=true;task.innerHTML='<span id=\"studioTaskText\" role=\"status\"></span><progress id=\"studioProgress\" max=\"1\" aria-label=\"Task progress\"></progress><button id=\"studioCancel\" class=\"small\">Cancel</button>';$('workspace').before(task);$('studioCancel').onclick=()=>cancelStudioTasks();\n const saved=document.createElement('details');saved.className='studio-saved';saved.innerHTML='<summary>Favorites & recent tools</summary>';for(const id of ['favoritesBar','recentBar'])if($(id))saved.append($(id));document.querySelector('.main-card').prepend(saved);\n const width=document.createElement('label');width.className='studio-history-size';width.textContent='Drawer width ';const slider=document.createElement('input');slider.type='range';slider.min='240';slider.max='520';slider.value=String(storage.get('calc-studio-history-width-v10',340));slider.setAttribute('aria-label','History drawer width');slider.oninput=()=>{document.documentElement.style.setProperty('--history-width',slider.value+'px');storage.set('calc-studio-history-width-v10',Number(slider.value))};width.append(slider);$('historyPanel').prepend(width);document.documentElement.style.setProperty('--history-width',slider.value+'px');document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('historyPanel').hidden)toggleHistory(false)});\n for(const id of Object.keys(views)){const panel=$(id);if(!panel||id==='calculator'||id==='apiclient')continue;const heading=panel.querySelector('.panel-heading');if(!heading)continue;const bar=document.createElement('div');bar.className='studio-actions';const candidates=[...panel.querySelectorAll('button[id]')].filter(b=>!b.closest('details')&&!b.closest('.studio-file-entry')&&/(upload|run|generate|build|render|inspect|format|convert|compare|calculate|copy|download|clear|open|extract|add)/i.test(b.id+' '+b.textContent)&&!/(node|edge|more|prev|next|all|none|demo|sheet)/i.test(b.id));const rank=b=>/upload|open|add/i.test(b.id+' '+b.textContent)?0:/clear/i.test(b.id)?4:/copy/i.test(b.id+' '+b.textContent)?2:/download|export/i.test(b.id+' '+b.textContent)?3:1;candidates.sort((a,b)=>rank(a)-rank(b));for(const b of candidates){b.dataset.studioAction=String(rank(b));bar.append(b)}if(bar.children.length)heading.after(bar);\n  for(const row of panel.querySelectorAll('.json-editors')){if(row.children.length!==2)continue;const left=row.children[0],right=row.children[1],tabs=document.createElement('div');tabs.className='studio-editor-tabs';const labels=right.querySelector('textarea[readonly],iframe')?['Input','Output']:['Left input','Right input'];[left,right].forEach((field,i)=>field.dataset.studioPane=String(i));for(const [i,label]of labels.entries()){const b=document.createElement('button');b.className='small';b.textContent=label;b.setAttribute('aria-pressed',String(i===0));b.onclick=()=>{row.dataset.mobilePane=String(i);[...tabs.children].forEach((x,j)=>x.setAttribute('aria-pressed',String(i===j)))};tabs.append(b)}row.dataset.mobilePane='0';row.before(tabs);const handle=document.createElement('div');handle.className='studio-divider';handle.tabIndex=0;handle.role='separator';handle.setAttribute('aria-label','Resize input and output panes');handle.setAttribute('aria-orientation','vertical');handle.setAttribute('aria-valuemin','25');handle.setAttribute('aria-valuemax','75');handle.setAttribute('aria-valuenow','50');const change=value=>{value=Math.max(25,Math.min(75,value));row.style.setProperty('--editor-left',value+'%');handle.setAttribute('aria-valuenow',String(Math.round(value)))};let dragging=false;handle.onpointerdown=e=>{dragging=true;handle.setPointerCapture(e.pointerId);e.preventDefault()};handle.onpointermove=e=>{if(dragging){const r=row.getBoundingClientRect();change((e.clientX-r.left)/r.width*100)}};handle.onpointerup=()=>dragging=false;handle.onpointercancel=()=>dragging=false;handle.onkeydown=e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();change(Number(handle.getAttribute('aria-valuenow'))+(e.key==='ArrowLeft'?-5:5))}};row.append(handle)}\n }\n const mobile=document.createElement('div');mobile.className='studio-mobile-actions';mobile.setAttribute('aria-label','Active tool actions');document.body.append(mobile);let signature='';const sync=()=>{refreshTaskUI();const buttons=[...$(activeView).querySelectorAll('.studio-actions button')].filter(b=>!b.hidden),next=activeView+'|'+buttons.map(b=>b.id+':'+b.disabled+':'+b.textContent).join('|');if(next===signature)return;signature=next;mobile.replaceChildren();for(const b of buttons.slice(0,6)){const proxy=document.createElement('button');proxy.className='small';proxy.textContent=b.textContent;proxy.disabled=b.disabled;proxy.onclick=()=>b.click();mobile.append(proxy)}mobile.hidden=!mobile.children.length};new MutationObserver(sync).observe($('workspace'),{subtree:true,attributes:true,childList:true,characterData:true});sync();enhanceCommandResults();document.querySelectorAll('.theme-choice').forEach(b=>b.addEventListener('click',()=>{if(flowState)drawFlow()}));\n}","initializeStudioUI");

__studio33.cs31CheckSettings = __studio33.$fn((function cs31CheckSettings(data){if(!data||data.version!==1||!Array.isArray(data.presets)||data.presets.length>60)throw Error('Invalid tool presets');const names=new Set();return{version:1,presets:data.presets.map(__studio33.$fn(p=>{if(!p||!['audio','video','pdf','form'].includes(p.kind)||typeof p.name!=='string'||!p.name.trim()||p.name.length>60||!p.settings||typeof p.settings!=='object'||Array.isArray(p.settings))throw Error('Invalid preset');const key=p.kind+'|'+p.name;if(names.has(key))throw Error('Duplicate preset name');names.add(key);const s=p.settings;let settings;if(p.kind==='audio'){if(!['gain','fadeIn','fadeOut'].every(k=>Number.isFinite(s[k]))||s.gain<0||s.gain>300||s.fadeIn<0||s.fadeOut<0||s.fadeIn>3600||s.fadeOut>3600)throw Error('Invalid audio preset');settings={gain:s.gain,fadeIn:s.fadeIn,fadeOut:s.fadeOut};}else if(p.kind==='video'){if(!Number.isFinite(s.step)||s.step<.04||s.step>3600||!Number.isInteger(s.width)||s.width<16||s.width>3840||!['image/png','image/jpeg'].includes(s.format)||!Number.isFinite(s.quality)||s.quality<.1||s.quality>1)throw Error('Invalid video preset');settings={step:s.step,width:s.width,format:s.format,quality:s.quality};}else if(p.kind==='pdf'){if(![0,90,180,270].includes(s.rotation)||typeof s.objectStreams!=='boolean')throw Error('Invalid PDF preset');settings={rotation:s.rotation,objectStreams:s.objectStreams};}else{if(!Array.isArray(s.fields)||s.fields.length>100||!Array.isArray(s.rules)||s.rules.length>100)throw Error('Invalid form rules preset');const fields=s.fields.map(f=>{if(!f||typeof f.id!=='string'||typeof f.label!=='string'||f.label.length>200||!['text','textarea','email','number','date','select','radio','checkbox'].includes(f.type))throw Error('Invalid rule field');return{id:f.id,label:f.label,type:f.type};});settings={fields,rules:__studio33.u16CrossRulesValidate(s.rules,fields)};}return{kind:p.kind,name:p.name,settings};},"p=>{if(!p||!['audio','video','pdf','form'].includes(p.kind)||typeof p.name!=='string'||!p.name.trim()||p.name.length>60||!p.settings||typeof p.settings!=='object'||Array.isArray(p.settings))throw Error('Invalid preset');const key=p.kind+'|'+p.name;if(names.has(key))throw Error('Duplicate preset name');names.add(key);const s=p.settings;let settings;if(p.kind==='audio'){if(!['gain','fadeIn','fadeOut'].every(k=>Number.isFinite(s[k]))||s.gain<0||s.gain>300||s.fadeIn<0||s.fadeOut<0||s.fadeIn>3600||s.fadeOut>3600)throw Error('Invalid audio preset');settings={gain:s.gain,fadeIn:s.fadeIn,fadeOut:s.fadeOut};}else if(p.kind==='video'){if(!Number.isFinite(s.step)||s.step<.04||s.step>3600||!Number.isInteger(s.width)||s.width<16||s.width>3840||!['image/png','image/jpeg'].includes(s.format)||!Number.isFinite(s.quality)||s.quality<.1||s.quality>1)throw Error('Invalid video preset');settings={step:s.step,width:s.width,format:s.format,quality:s.quality};}else if(p.kind==='pdf'){if(![0,90,180,270].includes(s.rotation)||typeof s.objectStreams!=='boolean')throw Error('Invalid PDF preset');settings={rotation:s.rotation,objectStreams:s.objectStreams};}else{if(!Array.isArray(s.fields)||s.fields.length>100||!Array.isArray(s.rules)||s.rules.length>100)throw Error('Invalid form rules preset');const fields=s.fields.map(f=>{if(!f||typeof f.id!=='string'||typeof f.label!=='string'||f.label.length>200||!['text','textarea','email','number','date','select','radio','checkbox'].includes(f.type))throw Error('Invalid rule field');return{id:f.id,label:f.label,type:f.type};});settings={fields,rules:u16CrossRulesValidate(s.rules,fields)};}return{kind:p.kind,name:p.name,settings};}",""))};}),"function cs31CheckSettings(data){if(!data||data.version!==1||!Array.isArray(data.presets)||data.presets.length>60)throw Error('Invalid tool presets');const names=new Set();return{version:1,presets:data.presets.map(p=>{if(!p||!['audio','video','pdf','form'].includes(p.kind)||typeof p.name!=='string'||!p.name.trim()||p.name.length>60||!p.settings||typeof p.settings!=='object'||Array.isArray(p.settings))throw Error('Invalid preset');const key=p.kind+'|'+p.name;if(names.has(key))throw Error('Duplicate preset name');names.add(key);const s=p.settings;let settings;if(p.kind==='audio'){if(!['gain','fadeIn','fadeOut'].every(k=>Number.isFinite(s[k]))||s.gain<0||s.gain>300||s.fadeIn<0||s.fadeOut<0||s.fadeIn>3600||s.fadeOut>3600)throw Error('Invalid audio preset');settings={gain:s.gain,fadeIn:s.fadeIn,fadeOut:s.fadeOut};}else if(p.kind==='video'){if(!Number.isFinite(s.step)||s.step<.04||s.step>3600||!Number.isInteger(s.width)||s.width<16||s.width>3840||!['image/png','image/jpeg'].includes(s.format)||!Number.isFinite(s.quality)||s.quality<.1||s.quality>1)throw Error('Invalid video preset');settings={step:s.step,width:s.width,format:s.format,quality:s.quality};}else if(p.kind==='pdf'){if(![0,90,180,270].includes(s.rotation)||typeof s.objectStreams!=='boolean')throw Error('Invalid PDF preset');settings={rotation:s.rotation,objectStreams:s.objectStreams};}else{if(!Array.isArray(s.fields)||s.fields.length>100||!Array.isArray(s.rules)||s.rules.length>100)throw Error('Invalid form rules preset');const fields=s.fields.map(f=>{if(!f||typeof f.id!=='string'||typeof f.label!=='string'||f.label.length>200||!['text','textarea','email','number','date','select','radio','checkbox'].includes(f.type))throw Error('Invalid rule field');return{id:f.id,label:f.label,type:f.type};});settings={fields,rules:u16CrossRulesValidate(s.rules,fields)};}return{kind:p.kind,name:p.name,settings};})};}","cs31CheckSettings");

__studio33.cs31GenericTools = __studio33.$fn((function cs31GenericTools(owner){
 const allowed=['calculator','jsonformatter','schema','jsondiff','textdiff','textutils','markdown','soql','composite','apiresponse','logs','converter','measurements','regex'];if(!allowed.includes(owner))return;
 const{box,body}=__studio33.cs31Box(owner,'cs31Reset-'+owner,'Reset this tool’s editable controls','Preview restores page defaults for this tool’s editable inputs and controls. Saved projects, histories, uploads and other tools are unchanged. Undo is available until these inputs change again.');const root=__studio33.csText('div');body.append(root);const actions=__studio33.cs31Actions(body);let candidate=null,previous=null;
 const fields=__studio33.$fn(()=>{const native=__studio33.cs30Native.get(owner)||__studio33.$(owner);return[...native.querySelectorAll('input[id],textarea[id],select[id]')].filter(__studio33.$fn(e=>e.closest('section')===__studio33.$(owner)&&!e.readOnly&&!e.disabled&&!['file','hidden','button','submit','password'].includes(e.type)&&!e.closest('.cs31-box,.v13-editor-tools,.v13-find,.u22-ui,.u24-empty,.u25-transfer,.u19-view-actions,.u17-help'),"e=>e.closest('section')===$(owner)&&!e.readOnly&&!e.disabled&&!['file','hidden','button','submit','password'].includes(e.type)&&!e.closest('.cs31-box,.v13-editor-tools,.v13-find,.u22-ui,.u24-empty,.u25-transfer,.u19-view-actions,.u17-help')",""));},"()=>{const native=cs30Native.get(owner)||$(owner);return[...native.querySelectorAll('input[id],textarea[id],select[id]')].filter(e=>e.closest('section')===$(owner)&&!e.readOnly&&!e.disabled&&!['file','hidden','button','submit','password'].includes(e.type)&&!e.closest('.cs31-box,.v13-editor-tools,.v13-find,.u22-ui,.u24-empty,.u25-transfer,.u19-view-actions,.u17-help'));}","fields");
 const value=e=>e.type==='checkbox'||e.type==='radio'?e.checked:e.value;
 const initial=e=>e.type==='checkbox'||e.type==='radio'?e.defaultChecked:e.tagName==='SELECT'?([...e.options].find(o=>o.defaultSelected)||e.options[0])?.value||'':e.defaultValue;
 const capture=()=>Object.fromEntries(fields().map(e=>[e.id,value(e)]));
 const applyValues=__studio33.$fn(values=>{for(const[id,v]of Object.entries(values))if(__studio33.$(id)){if(['checkbox','radio'].includes(__studio33.$(id).type)){__studio33.$(id).checked=v;__studio33.$(id).dispatchEvent(new Event('input',{bubbles:true}));__studio33.$(id).dispatchEvent(new Event('change',{bubbles:true}));}else __studio33.cs31Set(id,v);}},"values=>{for(const[id,v]of Object.entries(values))if($(id)){if(['checkbox','radio'].includes($(id).type)){$(id).checked=v;$(id).dispatchEvent(new Event('input',{bubbles:true}));$(id).dispatchEvent(new Event('change',{bubbles:true}));}else cs31Set(id,v);}}","applyValues");
 __studio33.cs31Button(actions,'cs31ResetReview-'+owner,'Preview reset',__studio33.$fn(()=>{const before=capture(),values=Object.fromEntries(fields().map(e=>[e.id,initial(e)])),changed=fields().filter(e=>value(e)!==values[e.id]);candidate={before,values};__studio33.cs31Table(root,['Control','Current','After reset'],changed.map(e=>[e.getAttribute('aria-label')||e.id,e.type==='checkbox'?String(e.checked):e.value.length+' characters',typeof values[e.id]==='boolean'?String(values[e.id]):values[e.id].length+' characters']));__studio33.cs31Status(box,changed.length+' controls would change. Review before applying.');},"()=>{const before=capture(),values=Object.fromEntries(fields().map(e=>[e.id,initial(e)])),changed=fields().filter(e=>value(e)!==values[e.id]);candidate={before,values};cs31Table(root,['Control','Current','After reset'],changed.map(e=>[e.getAttribute('aria-label')||e.id,e.type==='checkbox'?String(e.checked):e.value.length+' characters',typeof values[e.id]==='boolean'?String(values[e.id]):values[e.id].length+' characters']));cs31Status(box,changed.length+' controls would change. Review before applying.');}",""));
 __studio33.cs31Button(actions,'cs31ResetApply-'+owner,'Apply reviewed reset',__studio33.$fn(()=>{if(!candidate||JSON.stringify(candidate.before)!==JSON.stringify(capture()))throw Error('Preview the current controls first');previous={values:candidate.before};const values=candidate.values;candidate=null;applyValues(values);previous.applied=capture();root.replaceChildren();__studio33.cs31Status(box,'This tool’s editable controls reset. Undo can restore their previous values.');},"()=>{if(!candidate||JSON.stringify(candidate.before)!==JSON.stringify(capture()))throw Error('Preview the current controls first');previous={values:candidate.before};const values=candidate.values;candidate=null;applyValues(values);previous.applied=capture();root.replaceChildren();cs31Status(box,'This tool’s editable controls reset. Undo can restore their previous values.');}",""));
 __studio33.cs31Button(actions,'cs31ResetUndo-'+owner,'Undo tool reset',__studio33.$fn(()=>{if(!previous||JSON.stringify(previous.applied)!==JSON.stringify(capture()))throw Error('Controls changed after reset; review those edits before restoring');const values=previous.values;previous=null;applyValues(values);__studio33.cs31Status(box,'Previous editable controls restored.');},"()=>{if(!previous||JSON.stringify(previous.applied)!==JSON.stringify(capture()))throw Error('Controls changed after reset; review those edits before restoring');const values=previous.values;previous=null;applyValues(values);cs31Status(box,'Previous editable controls restored.');}",""));
}),"function cs31GenericTools(owner){\n const allowed=['calculator','jsonformatter','schema','jsondiff','textdiff','textutils','markdown','soql','composite','apiresponse','logs','converter','measurements','regex'];if(!allowed.includes(owner))return;\n const{box,body}=cs31Box(owner,'cs31Reset-'+owner,'Reset this tool’s editable controls','Preview restores page defaults for this tool’s editable inputs and controls. Saved projects, histories, uploads and other tools are unchanged. Undo is available until these inputs change again.');const root=csText('div');body.append(root);const actions=cs31Actions(body);let candidate=null,previous=null;\n const fields=()=>{const native=cs30Native.get(owner)||$(owner);return[...native.querySelectorAll('input[id],textarea[id],select[id]')].filter(e=>e.closest('section')===$(owner)&&!e.readOnly&&!e.disabled&&!['file','hidden','button','submit','password'].includes(e.type)&&!e.closest('.cs31-box,.v13-editor-tools,.v13-find,.u22-ui,.u24-empty,.u25-transfer,.u19-view-actions,.u17-help'));};\n const value=e=>e.type==='checkbox'||e.type==='radio'?e.checked:e.value;\n const initial=e=>e.type==='checkbox'||e.type==='radio'?e.defaultChecked:e.tagName==='SELECT'?([...e.options].find(o=>o.defaultSelected)||e.options[0])?.value||'':e.defaultValue;\n const capture=()=>Object.fromEntries(fields().map(e=>[e.id,value(e)]));\n const applyValues=values=>{for(const[id,v]of Object.entries(values))if($(id)){if(['checkbox','radio'].includes($(id).type)){$(id).checked=v;$(id).dispatchEvent(new Event('input',{bubbles:true}));$(id).dispatchEvent(new Event('change',{bubbles:true}));}else cs31Set(id,v);}};\n cs31Button(actions,'cs31ResetReview-'+owner,'Preview reset',()=>{const before=capture(),values=Object.fromEntries(fields().map(e=>[e.id,initial(e)])),changed=fields().filter(e=>value(e)!==values[e.id]);candidate={before,values};cs31Table(root,['Control','Current','After reset'],changed.map(e=>[e.getAttribute('aria-label')||e.id,e.type==='checkbox'?String(e.checked):e.value.length+' characters',typeof values[e.id]==='boolean'?String(values[e.id]):values[e.id].length+' characters']));cs31Status(box,changed.length+' controls would change. Review before applying.');});\n cs31Button(actions,'cs31ResetApply-'+owner,'Apply reviewed reset',()=>{if(!candidate||JSON.stringify(candidate.before)!==JSON.stringify(capture()))throw Error('Preview the current controls first');previous={values:candidate.before};const values=candidate.values;candidate=null;applyValues(values);previous.applied=capture();root.replaceChildren();cs31Status(box,'This tool’s editable controls reset. Undo can restore their previous values.');});\n cs31Button(actions,'cs31ResetUndo-'+owner,'Undo tool reset',()=>{if(!previous||JSON.stringify(previous.applied)!==JSON.stringify(capture()))throw Error('Controls changed after reset; review those edits before restoring');const values=previous.values;previous=null;applyValues(values);cs31Status(box,'Previous editable controls restored.');});\n}","cs31GenericTools");
}
const steps=[
[99,function initialize_99(__studio33){
__studio33.toolCategories.productivity.tools.push('formdesigner','flashcards','presentationtimer','keyboard','kanban');
}],
[255,function initialize_255(__studio33){
try{if(!Array.isArray(__studio33.sessions)||!__studio33.sessions.length||__studio33.sessions.length>50)throw Error();__studio33.sessions=__studio33.sessions.map(__studio33.normalizeSession);if(new Set(__studio33.sessions.map(x=>x.id)).size!==__studio33.sessions.length)throw Error()}catch{__studio33.sessions=[{id:'main',name:'Main',notebook:__studio33.$('notebookInput').value,expression:__studio33.$('expression').value}]}
}],
[1322,function initialize_1322(__studio33){
__studio33.$('wsSources').replaceChildren(...__studio33.wsEligible.map(__studio33.$fn(id=>{const label=document.createElement('label'),check=document.createElement('input');check.type='checkbox';check.value=id;check.checked=['dataworkbench','workflows'].includes(id);label.append(check,document.createTextNode(' '+__studio33.views[id]));return label},"id=>{const label=document.createElement('label'),check=document.createElement('input');check.type='checkbox';check.value=id;check.checked=['dataworkbench','workflows'].includes(id);label.append(check,document.createTextNode(' '+views[id]));return label}","")));
}],
[1359,function initialize_1359(__studio33){
__studio33.toolCategories.json.tools.push('reconciliation','workflows');
}],
[1369,function initialize_1369(__studio33){
for(const id of Object.keys(__studio33.views)){if(__studio33.v12Suites[id])continue;const panel=__studio33.$(id);if(!panel||['passwords','typing'].includes(id))continue;const inputs=[...panel.querySelectorAll('textarea[id]:not([readonly])')];if(inputs.length){const details=document.createElement('details');details.className='details-box';const summary=__studio33.csText('summary','Undo edits & output views');details.append(summary);const bar=__studio33.csText('div','','v12-wrap');const picker=document.createElement('select');picker.setAttribute('aria-label','Editor to undo');inputs.forEach(__studio33.$fn(e=>{picker.append(new Option(e.closest('label')?.querySelector('span')?.textContent||e.id,e.id));__studio33.v12Edits.set(e.id,{undo:[],redo:[],last:e.value});e.addEventListener('input',__studio33.$fn(()=>{const h=__studio33.v12Edits.get(e.id);if(h.last!==e.value){h.undo.push(h.last);h.undo=h.undo.slice(-20);h.redo=[];h.last=e.value}},"()=>{const h=v12Edits.get(e.id);if(h.last!==e.value){h.undo.push(h.last);h.undo=h.undo.slice(-20);h.redo=[];h.last=e.value}}",""))},"e=>{picker.append(new Option(e.closest('label')?.querySelector('span')?.textContent||e.id,e.id));v12Edits.set(e.id,{undo:[],redo:[],last:e.value});e.addEventListener('input',()=>{const h=v12Edits.get(e.id);if(h.last!==e.value){h.undo.push(h.last);h.undo=h.undo.slice(-20);h.redo=[];h.last=e.value}})}",""));const undo=__studio33.$fn(direction=>{const e=__studio33.$(picker.value),h=__studio33.v12Edits.get(e.id),from=direction==='undo'?h.undo:h.redo,to=direction==='undo'?h.redo:h.undo;if(!from.length)return;to.push(e.value);e.value=from.pop();h.last=e.value;const saved=[...h.redo];e.dispatchEvent(new Event('input',{bubbles:true}));h.redo=saved},"direction=>{const e=$(picker.value),h=v12Edits.get(e.id),from=direction==='undo'?h.undo:h.redo,to=direction==='undo'?h.redo:h.undo;if(!from.length)return;to.push(e.value);e.value=from.pop();h.last=e.value;const saved=[...h.redo];e.dispatchEvent(new Event('input',{bubbles:true}));h.redo=saved}","undo");bar.append(picker,__studio33.csButton('Undo edit',()=>undo('undo')),__studio33.csButton('Redo edit',()=>undo('redo')));details.append(bar);panel.querySelector('.panel-heading')?.after(details)}for(const output of panel.querySelectorAll('textarea[id][readonly]')){const field=output.closest('label.field');if(field){const container=document.createElement('div');for(const a of field.attributes)container.setAttribute(a.name,a.value);while(field.firstChild)container.append(field.firstChild);field.replaceWith(container);output.setAttribute('aria-label',container.querySelector('span')?.textContent||output.id)}const tabs=__studio33.csText('div','','v12-output-tabs'),preview=__studio33.csText('pre','','v12-output-preview');preview.hidden=true;const previous={value:output.value};let mode='raw';const show=__studio33.$fn(value=>{mode=value;output.hidden=value!=='raw';preview.hidden=value==='raw';if(value==='preview'){try{preview.textContent=__studio33.emitDeveloperJSON(__studio33.strictJSON(output.value),'  ')}catch{preview.textContent=output.value}}if(value==='changes'){const a=previous.value.split('\n'),b=output.value.split('\n');preview.textContent=Array.from({length:Math.max(a.length,b.length)},(_,i)=>a[i]===b[i]?'  '+(b[i]||''):[a[i]===undefined?'':'- '+a[i],b[i]===undefined?'':'+ '+b[i]].filter(Boolean).join('\n')).join('\n')}tabs.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===value)))},"value=>{mode=value;output.hidden=value!=='raw';preview.hidden=value==='raw';if(value==='preview'){try{preview.textContent=emitDeveloperJSON(strictJSON(output.value),'  ')}catch{preview.textContent=output.value}}if(value==='changes'){const a=previous.value.split('\\n'),b=output.value.split('\\n');preview.textContent=Array.from({length:Math.max(a.length,b.length)},(_,i)=>a[i]===b[i]?'  '+(b[i]||''):[a[i]===undefined?'':'- '+a[i],b[i]===undefined?'':'+ '+b[i]].filter(Boolean).join('\\n')).join('\\n')}tabs.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===value)))}","show");for(const [value,label]of [['raw','Raw'],['preview','Preview'],['changes','Changes from captured output']]){const b=__studio33.csButton(label,()=>show(value));b.setAttribute('aria-label',label);b.dataset.view=value;b.setAttribute('aria-pressed',String(value==='raw'));tabs.append(b)}tabs.append(__studio33.csButton('Capture output for comparison',()=>{previous.value=output.value;show(mode)}));output.before(tabs);output.after(preview)}}
}],
[1506,function initialize_1506(__studio33){
__studio33.knEdit=__studio33.$fn(function(...args){__studio33.v13OldKNEdit(...args);const task=__studio33.knCurrent().tasks.find(t=>t.id===args[0]);__studio33.ktSchedule.value=task?.schedule||(!task?__studio33.v13CalendarFor().mode:'calendar');if(task?.start&&task.due&&__studio33.ktSchedule.value==='working'){try{__studio33.$('ktDuration').value=__studio33.v13WorkingDuration(task.start,task.due,__studio33.v13CalendarFor())}catch(error){__studio33.$('knDialogStatus').textContent=error.message}}},"function(...args){v13OldKNEdit(...args);const task=knCurrent().tasks.find(t=>t.id===args[0]);ktSchedule.value=task?.schedule||(!task?v13CalendarFor().mode:'calendar');if(task?.start&&task.due&&ktSchedule.value==='working'){try{$('ktDuration').value=v13WorkingDuration(task.start,task.due,v13CalendarFor())}catch(error){$('knDialogStatus').textContent=error.message}}}","");
}],
[1526,function initialize_1526(__studio33){
__studio33.$('knTimelineCSV').onclick=__studio33.$fn(()=>__studio33.downloadFile('kanban-timeline.csv',__studio33.v12CSV([['id','title','start','due','duration_days','schedule','milestone','priority','column','dependencies'],...__studio33.knTaskList().map(__studio33.$fn(t=>[t.id,t.title,t.start||'',t.due,t.start&&t.due?(t.schedule==='working'?__studio33.v13WorkingDuration(t.start,t.due,__studio33.v13CalendarFor()):Math.round((Date.parse(t.due)-Date.parse(t.start))/86400000)+1):'',t.schedule||'calendar',!!t.milestone,t.priority,__studio33.knCurrent().columns.find(c=>c.id===t.column).name,t.dependencies.join(';')],"t=>[t.id,t.title,t.start||'',t.due,t.start&&t.due?(t.schedule==='working'?v13WorkingDuration(t.start,t.due,v13CalendarFor()):Math.round((Date.parse(t.due)-Date.parse(t.start))/86400000)+1):'',t.schedule||'calendar',!!t.milestone,t.priority,knCurrent().columns.find(c=>c.id===t.column).name,t.dependencies.join(';')]",""))]),'text/csv'),"()=>downloadFile('kanban-timeline.csv',v12CSV([['id','title','start','due','duration_days','schedule','milestone','priority','column','dependencies'],...knTaskList().map(t=>[t.id,t.title,t.start||'',t.due,t.start&&t.due?(t.schedule==='working'?v13WorkingDuration(t.start,t.due,v13CalendarFor()):Math.round((Date.parse(t.due)-Date.parse(t.start))/86400000)+1):'',t.schedule||'calendar',!!t.milestone,t.priority,knCurrent().columns.find(c=>c.id===t.column).name,t.dependencies.join(';')])]),'text/csv')","");
}],
[1573,function initialize_1573(__studio33){
__studio33.$('lcResponseDownload').onclick=__studio33.$fn(()=>{if(!__studio33.lcResponse?.bytes||__studio33.lcResponse.incomplete)return;const type=__studio33.lcResponse.type.split(';')[0].trim(),ext=__studio33.lcResponse.json?'json':type==='application/pdf'?'pdf':type==='image/png'?'png':type==='image/jpeg'?'jpg':type.startsWith('text/')?'txt':'bin';__studio33.downloadFile('api-response.'+ext,__studio33.lcResponse.bytes,__studio33.lcResponse.type)},"()=>{if(!lcResponse?.bytes||lcResponse.incomplete)return;const type=lcResponse.type.split(';')[0].trim(),ext=lcResponse.json?'json':type==='application/pdf'?'pdf':type==='image/png'?'png':type==='image/jpeg'?'jpg':type.startsWith('text/')?'txt':'bin';downloadFile('api-response.'+ext,lcResponse.bytes,lcResponse.type)}","");
}],
[2067,function initialize_2067(__studio33){
__studio33.u16Button(__studio33.u16Composite,'u16RetryReview','Preview selected retry payload',__studio33.$fn(()=>{__studio33.u16Retry=null;if(!__studio33.u16CompositeMapped)throw Error('Map the responses first');__studio33.u16Fresh(__studio33.u16CompositeMapped.signature,__studio33.u16CompositeSignature());const mapped=__studio33.u16CompositeMapped,list=__studio33.u16Array(__studio33.$('u16RetrySelection').value,500);if(!list.length||new Set(list).size!==list.length||list.some(k=>!mapped.items.some(i=>i.key===k)))throw Error('Select unique mapped request keys');const selected=new Set(list),groups=new Map();for(const item of mapped.items.filter(i=>selected.has(i.key))){const n=__studio33.csClone(item.request);n.entries=n.entries.map(__studio33.$fn(([k,v])=>[k,k==='url'?__studio33.u16ResolveCompositeReferences(v,item,mapped,selected,true):k==='body'?__studio33.u16ResolveCompositeReferences(v,item,mapped,selected):v],"([k,v])=>[k,k==='url'?u16ResolveCompositeReferences(v,item,mapped,selected,true):k==='body'?u16ResolveCompositeReferences(v,item,mapped,selected):v]",""));if(!groups.has(item.graph))groups.set(item.graph,[]);groups.get(item.graph).push(n)}const root=mapped.graph?{type:'object',entries:[['graphs',{type:'array',items:[...groups].map(([id,items])=>({type:'object',entries:[['graphId',{type:'string',value:id}],['compositeRequest',{type:'array',items}]]}))}]]}:{type:'object',entries:[['allOrNone',{type:'boolean',value:mapped.allOrNone}],['compositeRequest',{type:'array',items:[...groups.values()].flat()}]]};const text=__studio33.emitDeveloperJSON(root,'  '),checked=__studio33.compositePayload(text,__studio33.$('compMode').value,__studio33.$('compAll').checked);if(!checked.valid)throw Error(checked.errors.join('; '));__studio33.u16Retry={signature:__studio33.u16CompositeSignature(),selection:__studio33.$('u16RetrySelection').value,text};__studio33.u16RetryPreview.replaceChildren(__studio33.csText('pre',text.slice(0,30000)));__studio33.u16CompositeStatus.textContent=list.length+' selected requests. Successful prerequisite references were resolved where rollback status permits. Review side effects and duplicate-create risk before sending; nothing was sent.'},"()=>{u16Retry=null;if(!u16CompositeMapped)throw Error('Map the responses first');u16Fresh(u16CompositeMapped.signature,u16CompositeSignature());const mapped=u16CompositeMapped,list=u16Array($('u16RetrySelection').value,500);if(!list.length||new Set(list).size!==list.length||list.some(k=>!mapped.items.some(i=>i.key===k)))throw Error('Select unique mapped request keys');const selected=new Set(list),groups=new Map();for(const item of mapped.items.filter(i=>selected.has(i.key))){const n=csClone(item.request);n.entries=n.entries.map(([k,v])=>[k,k==='url'?u16ResolveCompositeReferences(v,item,mapped,selected,true):k==='body'?u16ResolveCompositeReferences(v,item,mapped,selected):v]);if(!groups.has(item.graph))groups.set(item.graph,[]);groups.get(item.graph).push(n)}const root=mapped.graph?{type:'object',entries:[['graphs',{type:'array',items:[...groups].map(([id,items])=>({type:'object',entries:[['graphId',{type:'string',value:id}],['compositeRequest',{type:'array',items}]]}))}]]}:{type:'object',entries:[['allOrNone',{type:'boolean',value:mapped.allOrNone}],['compositeRequest',{type:'array',items:[...groups.values()].flat()}]]};const text=emitDeveloperJSON(root,'  '),checked=compositePayload(text,$('compMode').value,$('compAll').checked);if(!checked.valid)throw Error(checked.errors.join('; '));u16Retry={signature:u16CompositeSignature(),selection:$('u16RetrySelection').value,text};u16RetryPreview.replaceChildren(csText('pre',text.slice(0,30000)));u16CompositeStatus.textContent=list.length+' selected requests. Successful prerequisite references were resolved where rollback status permits. Review side effects and duplicate-create risk before sending; nothing was sent.'}",""));
}],
[2223,function initialize_2223(__studio33){
for(const [id,split]of __studio33.u16Splits){if(['apiclient','workflows'].includes(id))continue;const [a,b]=split.fields;if(a.parentElement===b.parentElement&&a.parentElement.matches('.json-editors'))continue;const pair=__studio33.csText('div','','u17-editor-pair');pair.id='u17Pair-'+id;a.before(pair);pair.append(a,b)}
}],
[2228,function initialize_2228(__studio33){
for(const home of Object.keys(__studio33.v12Suites)){const intro=__studio33.$(home)?.querySelector(':scope>.cs-intro');if(intro&&intro.textContent.length>110){const about=__studio33.csText('p',intro.textContent);__studio33.u17Panels.get(home)?.advanced.append(about);intro.textContent=home==='jsonstudio'?'Edit, explore, validate and transform JSON.':home==='texttoolkit'?'Count, clean and encode text.':'Choose a tool below.'}}
}],
[2675,function initialize_2675(__studio33){
for(const[id,r]of __studio33.u22Runs){const p=__studio33.$(id);for(const b of p.querySelectorAll('button[id]')){if(b.closest('section')!==p||!b.onclick||b.closest('.u22-ui')||!((b.dataset.u17Role==='primary'||b.classList.contains('u15-primary'))&&!/Clear|Upload|Open|Add|Send|Cancel/i.test(b.id))&& !['csvJsonConvert','csvConvert','jsonPretty','jsonMinify','jsonValidate','diffCompare','logAnalyze','regexRun','regexReplace'].includes(b.id))continue;const old=b.onclick;b.onclick=__studio33.$fn(function(...args){r.signature=__studio33.u22Inputs(id);__studio33.u22Status(id,'running');const done=__studio33.$fn(()=>{if([...__studio33.editionWorkers.values()].some(e=>e.owner===id)||id==='regex'&&__studio33.regexWorker)return;const error=[...p.querySelectorAll('[data-error=true]')].some(e=>e.getClientRects().length);if(r.signature!==__studio33.u22Inputs(id)){__studio33.u22Status(id,'stale');return}if(error)__studio33.u22Status(id,'error','Check the tool’s message.');else __studio33.u22Complete(id)},"()=>{if([...editionWorkers.values()].some(e=>e.owner===id)||id==='regex'&&regexWorker)return;const error=[...p.querySelectorAll('[data-error=true]')].some(e=>e.getClientRects().length);if(r.signature!==u22Inputs(id)){u22Status(id,'stale');return}if(error)u22Status(id,'error','Check the tool’s message.');else u22Complete(id)}","done");try{const v=old.apply(this,args);if(v?.then)return v.then(x=>{done();return x},__studio33.$fn(e=>{__studio33.u22Status(id,'error',e.message);throw e},"e=>{u22Status(id,'error',e.message);throw e}",""));done();return v}catch(e){__studio33.u22Status(id,'error',e.message);throw e}},"function(...args){r.signature=u22Inputs(id);u22Status(id,'running');const done=()=>{if([...editionWorkers.values()].some(e=>e.owner===id)||id==='regex'&&regexWorker)return;const error=[...p.querySelectorAll('[data-error=true]')].some(e=>e.getClientRects().length);if(r.signature!==u22Inputs(id)){u22Status(id,'stale');return}if(error)u22Status(id,'error','Check the tool’s message.');else u22Complete(id)};try{const v=old.apply(this,args);if(v?.then)return v.then(x=>{done();return x},e=>{u22Status(id,'error',e.message);throw e});done();return v}catch(e){u22Status(id,'error',e.message);throw e}}","")}}
}],
[2857,function initialize_2857(__studio33){
for(const[key,cat]of Object.entries(__studio33.toolCategories)){cat.tools=[...new Set(cat.tools.map(__studio33.$fn(id=>key==='math'&&id==='tools'?'statistics':__studio33.v12Home[__studio33.u23Canonical(id)]||__studio33.u23Canonical(id),"id=>key==='math'&&id==='tools'?'statistics':v12Home[u23Canonical(id)]||u23Canonical(id)","")))].filter(__studio33.$fn(id=>!__studio33.u23CategoryHome[id]||__studio33.u23CategoryHome[id]===key,"id=>!u23CategoryHome[id]||u23CategoryHome[id]===key",""))}
}],
[2969,function initialize_2969(__studio33){
for(const[id,canvas]of [['imageClear','imageCanvas'],['pickerClear','pickerCanvas']]){const b=__studio33.$(id);if(!b?.onclick)continue;const old=b.onclick;b.onclick=__studio33.$fn(function(...args){const result=old.apply(this,args);const c=__studio33.$(canvas);if(c){c.width=1;c.height=1}return result},"function(...args){const result=old.apply(this,args);const c=$(canvas);if(c){c.width=1;c.height=1}return result}","")}
}],
[2971,function initialize_2971(__studio33){
window.addEventListener('pagehide',__studio33.$fn(event=>{for(const key of [...__studio33.editionWorkers.keys()])__studio33.stopEditionWorker(key);if(__studio33.u24TaskTimer){clearInterval(__studio33.u24TaskTimer);__studio33.u24TaskTimer=0}__studio33.$('audPlayer').pause();__studio33.$('vidPlayer').pause();if(__studio33.audContext?.state==='running')__studio33.audContext.suspend().catch(()=>{});if(!event.persisted){if(__studio33.audURL)URL.revokeObjectURL(__studio33.audURL);if(__studio33.vidURL)URL.revokeObjectURL(__studio33.vidURL);for(const f of __studio33.vidFrames)URL.revokeObjectURL(f.url)}},"event=>{for(const key of [...editionWorkers.keys()])stopEditionWorker(key);if(u24TaskTimer){clearInterval(u24TaskTimer);u24TaskTimer=0}$('audPlayer').pause();$('vidPlayer').pause();if(audContext?.state==='running')audContext.suspend().catch(()=>{});if(!event.persisted){if(audURL)URL.revokeObjectURL(audURL);if(vidURL)URL.revokeObjectURL(vidURL);for(const f of vidFrames)URL.revokeObjectURL(f.url)}}",""));
}],
[3001,function initialize_3001(__studio33){
__studio33.renderCommands=__studio33.$fn(function(){__studio33.u24OldCommands();const q=__studio33.$('commandSearch').value.toLowerCase().trim().replace(/\s+/g,' ');if(!q)return;const matches=__studio33.u24Actions.filter(([,phrases])=>phrases.some(t=>t===q));if(!matches.length)return;for(const[id]of matches.reverse()){__studio33.commandItems=__studio33.commandItems.filter(([k])=>k!==id);__studio33.commandItems.unshift([id,__studio33.views[id]]);const b=__studio33.csText('button','','command-result');b.append(__studio33.csText('strong',__studio33.views[id]),__studio33.csText('small','Open this action · '+__studio33.views[__studio33.u23Home(id)]));b.onclick=__studio33.$fn(()=>{if(id==='tools'&&/emi|loan/.test(q)){__studio33.tool='loan';__studio33.renderTools();__studio33.$('tools').querySelectorAll('[data-tool]').forEach(__studio33.$fn(b=>b.setAttribute('aria-pressed',String(b.dataset.tool===__studio33.tool)),"b=>b.setAttribute('aria-pressed',String(b.dataset.tool===tool))",""))}if(id==='hash'&&q==='hash file')__studio33.openTab('fileinspect');else __studio33.openTab(id);__studio33.closeCommands()},"()=>{if(id==='tools'&&/emi|loan/.test(q)){tool='loan';renderTools();$('tools').querySelectorAll('[data-tool]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tool===tool)))}if(id==='hash'&&q==='hash file')openTab('fileinspect');else openTab(id);closeCommands()}","");const existing=[...__studio33.$('commandResults').children].find(__studio33.$fn(b=>b.querySelector('strong')?.textContent.replace(/^★ /,'')===__studio33.views[id],"b=>b.querySelector('strong')?.textContent.replace(/^★ /,'')===views[id]",""));existing?.remove();__studio33.$('commandResults').prepend(b)}__studio33.commandIndex=0;[...__studio33.$('commandResults').children].forEach((b,i)=>b.classList.toggle('active',i===0))},"function(){u24OldCommands();const q=$('commandSearch').value.toLowerCase().trim().replace(/\\s+/g,' ');if(!q)return;const matches=u24Actions.filter(([,phrases])=>phrases.some(t=>t===q));if(!matches.length)return;for(const[id]of matches.reverse()){commandItems=commandItems.filter(([k])=>k!==id);commandItems.unshift([id,views[id]]);const b=csText('button','','command-result');b.append(csText('strong',views[id]),csText('small','Open this action · '+views[u23Home(id)]));b.onclick=()=>{if(id==='tools'&&/emi|loan/.test(q)){tool='loan';renderTools();$('tools').querySelectorAll('[data-tool]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tool===tool)))}if(id==='hash'&&q==='hash file')openTab('fileinspect');else openTab(id);closeCommands()};const existing=[...$('commandResults').children].find(b=>b.querySelector('strong')?.textContent.replace(/^★ /,'')===views[id]);existing?.remove();$('commandResults').prepend(b)}commandIndex=0;[...$('commandResults').children].forEach((b,i)=>b.classList.toggle('active',i===0))}","");
}],
[3205,function initialize_3205(__studio33){
__studio33.u25Recovery.append(__studio33.u19Button('Save recovery selection',__studio33.u25Safe(__studio33.$fn(()=>{const tools=[...__studio33.u25RecoveryChosen],existing=__studio33.v12State.recovery.values;__studio33.v12State.recovery={enabled:tools.length>0,tools,values:{...existing}};for(const id of tools)if(!existing[id])__studio33.v12State.recovery.values[id]=__studio33.u25Capture([id])[id];__studio33.v12Save();__studio33.u25RecoveryRefresh();__studio33.u25RecoveryStatus.textContent=tools.length?'Automatic draft saving enabled for '+tools.length+' tools. Existing saved drafts are retained.':'Automatic draft saving disabled; saved drafts remain available.'},"()=>{const tools=[...u25RecoveryChosen],existing=v12State.recovery.values;v12State.recovery={enabled:tools.length>0,tools,values:{...existing}};for(const id of tools)if(!existing[id])v12State.recovery.values[id]=u25Capture([id])[id];v12Save();u25RecoveryRefresh();u25RecoveryStatus.textContent=tools.length?'Automatic draft saving enabled for '+tools.length+' tools. Existing saved drafts are retained.':'Automatic draft saving disabled; saved drafts remain available.'}",""),__studio33.u25RecoveryStatus),'u25RecoverySave'),__studio33.u19Button('Preview selected saved inputs',__studio33.u25Safe(__studio33.$fn(()=>{const tools=Object.fromEntries([...__studio33.u25RecoveryChosen].filter(__studio33.$fn(id=>__studio33.v12State.recovery.values[id],"id=>v12State.recovery.values[id]","")).map(__studio33.$fn(id=>[id,__studio33.v12State.recovery.values[id]],"id=>[id,v12State.recovery.values[id]]","")));if(!Object.keys(tools).length)throw Error('No saved drafts for the selected tools');/* Older drafts can include outputs; retain supported inputs only. */__studio33.u25RecoveryData=__studio33.u25InputsCheck(Object.fromEntries(Object.entries(tools).map(__studio33.$fn(([id,values])=>[id,Object.fromEntries(Object.entries(values).filter(__studio33.$fn(([k])=>__studio33.u25InputFields(id).some(e=>e.id===k)||id==='tools'&&k.startsWith('loan')||id==='dataworkbench'&&k==='$table'||id==='workflows'&&k==='$steps',"([k])=>u25InputFields(id).some(e=>e.id===k)||id==='tools'&&k.startsWith('loan')||id==='dataworkbench'&&k==='$table'||id==='workflows'&&k==='$steps'","")))],"([id,values])=>[id,Object.fromEntries(Object.entries(values).filter(([k])=>u25InputFields(id).some(e=>e.id===k)||id==='tools'&&k.startsWith('loan')||id==='dataworkbench'&&k==='$table'||id==='workflows'&&k==='$steps'))]",""))));__studio33.u25RecoveryPreview.textContent=JSON.stringify(__studio33.u25RecoveryData,null,2).slice(0,60000);__studio33.u25RecoveryConfirm.checked=false;__studio33.$('u25RecoveryRestore').disabled=false;__studio33.u25RecoveryStatus.textContent='Review '+Object.keys(__studio33.u25RecoveryData).length+' tool drafts. Preview is limited to 60,000 characters; download to review the full selection.'},"()=>{const tools=Object.fromEntries([...u25RecoveryChosen].filter(id=>v12State.recovery.values[id]).map(id=>[id,v12State.recovery.values[id]]));if(!Object.keys(tools).length)throw Error('No saved drafts for the selected tools');/* Older drafts can include outputs; retain supported inputs only. */u25RecoveryData=u25InputsCheck(Object.fromEntries(Object.entries(tools).map(([id,values])=>[id,Object.fromEntries(Object.entries(values).filter(([k])=>u25InputFields(id).some(e=>e.id===k)||id==='tools'&&k.startsWith('loan')||id==='dataworkbench'&&k==='$table'||id==='workflows'&&k==='$steps'))])));u25RecoveryPreview.textContent=JSON.stringify(u25RecoveryData,null,2).slice(0,60000);u25RecoveryConfirm.checked=false;$('u25RecoveryRestore').disabled=false;u25RecoveryStatus.textContent='Review '+Object.keys(u25RecoveryData).length+' tool drafts. Preview is limited to 60,000 characters; download to review the full selection.'}",""),__studio33.u25RecoveryStatus),'u25RecoveryReview'),__studio33.u19Button('Download reviewed drafts',__studio33.$fn(()=>{if(__studio33.u25RecoveryData)__studio33.downloadFile('calc-studio-recovered-inputs.json',JSON.stringify(__studio33.u25RecoveryData,null,2),'application/json')},"()=>{if(u25RecoveryData)downloadFile('calc-studio-recovered-inputs.json',JSON.stringify(u25RecoveryData,null,2),'application/json')}",""),'u25RecoveryDownload'),__studio33.u19Button('Restore reviewed inputs',__studio33.u25Safe(__studio33.$fn(()=>{if(!__studio33.u25RecoveryData||!__studio33.u25RecoveryConfirm.checked)throw Error('Preview and confirm the saved drafts first');__studio33.wsUndoRestore=__studio33.u25Capture(Object.keys(__studio33.u25RecoveryData));__studio33.wsApply(__studio33.u25RecoveryData);__studio33.u25RecoveryBanner.hidden=true;__studio33.u25RecoveryStatus.textContent='Inputs restored. Run the tools to refresh results. Undo is available in Project Workspaces.'},"()=>{if(!u25RecoveryData||!u25RecoveryConfirm.checked)throw Error('Preview and confirm the saved drafts first');wsUndoRestore=u25Capture(Object.keys(u25RecoveryData));wsApply(u25RecoveryData);u25RecoveryBanner.hidden=true;u25RecoveryStatus.textContent='Inputs restored. Run the tools to refresh results. Undo is available in Project Workspaces.'}",""),__studio33.u25RecoveryStatus),'u25RecoveryRestore'),__studio33.u19Button('Discard selected saved drafts',__studio33.$fn(()=>{for(const id of __studio33.u25RecoveryChosen){delete __studio33.v12State.recovery.values[id];delete __studio33.u22State.draftTimes[id]}__studio33.v12State.recovery.tools=__studio33.v12State.recovery.tools.filter(__studio33.$fn(id=>!__studio33.u25RecoveryChosen.has(id),"id=>!u25RecoveryChosen.has(id)",""));__studio33.v12State.recovery.enabled=__studio33.v12State.recovery.tools.length>0;__studio33.v12Save();__studio33.u22Save();__studio33.u25RecoveryData=null;__studio33.u25RecoveryPreview.textContent='';__studio33.$('u25RecoveryRestore').disabled=true;__studio33.u25RecoveryRender();__studio33.u25RecoveryRefresh();__studio33.u25RecoveryStatus.textContent='Selected drafts discarded and automatic saving disabled for those tools.'},"()=>{for(const id of u25RecoveryChosen){delete v12State.recovery.values[id];delete u22State.draftTimes[id]}v12State.recovery.tools=v12State.recovery.tools.filter(id=>!u25RecoveryChosen.has(id));v12State.recovery.enabled=v12State.recovery.tools.length>0;v12Save();u22Save();u25RecoveryData=null;u25RecoveryPreview.textContent='';$('u25RecoveryRestore').disabled=true;u25RecoveryRender();u25RecoveryRefresh();u25RecoveryStatus.textContent='Selected drafts discarded and automatic saving disabled for those tools.'}",""),'u25RecoveryDiscard'));
}],
[3311,function initialize_3311(__studio33){
__studio33.wsRecoverTool=__studio33.$fn(function(id){let changed=false;if(id==='dataworkbench'){changed=__studio33.u25Structural.get(id)!==__studio33.dwTable;__studio33.u25Structural.set(id,__studio33.dwTable)}else if(id==='workflows'){const signature=JSON.stringify(__studio33.wfSteps);changed=__studio33.u25Structural.get(id)!==signature;__studio33.u25Structural.set(id,signature)}if(!__studio33.v12State.recovery.enabled||!__studio33.v12State.recovery.tools.includes(id)||!changed&&!__studio33.u25Dirty.has(id))return;__studio33.u25Dirty.add(id);clearTimeout(__studio33.u25DraftTimer);__studio33.u25DraftTimer=setTimeout(__studio33.u25Flush,500)},"function(id){let changed=false;if(id==='dataworkbench'){changed=u25Structural.get(id)!==dwTable;u25Structural.set(id,dwTable)}else if(id==='workflows'){const signature=JSON.stringify(wfSteps);changed=u25Structural.get(id)!==signature;u25Structural.set(id,signature)}if(!v12State.recovery.enabled||!v12State.recovery.tools.includes(id)||!changed&&!u25Dirty.has(id))return;u25Dirty.add(id);clearTimeout(u25DraftTimer);u25DraftTimer=setTimeout(u25Flush,500)}","");
}],
[3409,function initialize_3409(__studio33){
__studio33.$('ciCanvas').onpointermove=__studio33.$fn(e=>{if(!__studio33.ci.drag||e.pointerId!==__studio33.ci.drag.pointer||!__studio33.ci.canvas)return;e.preventDefault();const p=__studio33.ciPoint(e);if(__studio33.ci.drag.op==='crop')__studio33.ciCropDrag(__studio33.ci.drag.start,p);else if(__studio33.ci.drag.op==='document'){__studio33.ci.corners[__studio33.ci.drag.corner]=p;__studio33.ciCornerFields()}else if(__studio33.ci.draft){__studio33.ci.draft.x2=p.x;__studio33.ci.draft.y2=p.y;if(__studio33.ci.draft.type==='pen'&&__studio33.ci.draft.points.length<5000)__studio33.ci.draft.points.push(p)}__studio33.ciDraw()},"e=>{if(!ci.drag||e.pointerId!==ci.drag.pointer||!ci.canvas)return;e.preventDefault();const p=ciPoint(e);if(ci.drag.op==='crop')ciCropDrag(ci.drag.start,p);else if(ci.drag.op==='document'){ci.corners[ci.drag.corner]=p;ciCornerFields()}else if(ci.draft){ci.draft.x2=p.x;ci.draft.y2=p.y;if(ci.draft.type==='pen'&&ci.draft.points.length<5000)ci.draft.points.push(p)}ciDraw()}","");
}],
[3460,function initialize_3460(__studio33){
__studio33.ciSendDialog.append(__studio33.u19Button('Replace destination input',__studio33.ciSafe(__studio33.$fn(()=>{const target=__studio33.ciSendTarget.value,fields={characters:'charInput',statistics:'u23StatsInput',csvjson:'csvJsonInput',jsonformatter:'jsonInput',notebook:'notebookInput'},field=__studio33.$(fields[target]);if(!field)throw Error('Destination unavailable');field.value=__studio33.ciSendValue;field.dispatchEvent(new Event('input',{bubbles:true}));__studio33.ciSendDialog.close();__studio33.openTab(target);field.focus()},"()=>{const target=ciSendTarget.value,fields={characters:'charInput',statistics:'u23StatsInput',csvjson:'csvJsonInput',jsonformatter:'jsonInput',notebook:'notebookInput'},field=$(fields[target]);if(!field)throw Error('Destination unavailable');field.value=ciSendValue;field.dispatchEvent(new Event('input',{bubbles:true}));ciSendDialog.close();openTab(target);field.focus()}","")),'ciSendApply'));
}],
[3657,function initialize_3657(__studio33){
__studio33.$('ci26Deskew').closest('details').setAttribute('data-ci-op','crop');
}],
[3726,function initialize_3726(__studio33){
__studio33.ci26SendDialog.append(__studio33.ci26SendInfo,__studio33.ci26SendPreview,__studio33.u19Button('Replace Data Table',__studio33.ciSafe(__studio33.$fn(()=>{if(!__studio33.ci26SendTable)throw Error('Review a table first');__studio33.dwCommit(__studio33.ci26SendTable,'Reviewed photo table loaded as text cells');__studio33.ci26SendDialog.close();__studio33.openTab('dataworkbench')},"()=>{if(!ci26SendTable)throw Error('Review a table first');dwCommit(ci26SendTable,'Reviewed photo table loaded as text cells');ci26SendDialog.close();openTab('dataworkbench')}","")),'ci26TableSendApply'));
}],
[3903,function initialize_3903(__studio33){
__studio33.u19ResultNodes=__studio33.$fn(function(id){if(__studio33.crIDs.includes(id)){if(__studio33.crDocs.has(id))return[__studio33.$(id+'Document')];if(id==='careermatcher'&&__studio33.crMatchRows.length)return[__studio33.$('crMatchResults')];if(id==='careerachievements'&&__studio33.cr.achievements.length)return[__studio33.$('crAchList')];if(id==='careerinterview'&&__studio33.cr.interviews.length)return[__studio33.$('crInterviewList')];if(id==='careerskills'&&__studio33.cr.skills.length)return[__studio33.$('crSkillList')];return[]}return __studio33.crResultOld(id)},"function(id){if(crIDs.includes(id)){if(crDocs.has(id))return[$(id+'Document')];if(id==='careermatcher'&&crMatchRows.length)return[$('crMatchResults')];if(id==='careerachievements'&&cr.achievements.length)return[$('crAchList')];if(id==='careerinterview'&&cr.interviews.length)return[$('crInterviewList')];if(id==='careerskills'&&cr.skills.length)return[$('crSkillList')];return[]}return crResultOld(id)}","");
}],
[3986,function initialize_3986(__studio33){
__studio33.renderCommands=__studio33.$fn(function(){
 const q=__studio33.n28Normalize(__studio33.$('commandSearch').value),tokens=q.split(' ').filter(Boolean),entries=__studio33.n28GetIndex();
 let rows=q?entries.map(__studio33.$fn(e=>({e,rank:__studio33.n28Rank(e,q,tokens)}),"e=>({e,rank:n28Rank(e,q,tokens)})","")).filter(r=>r.rank>=0).sort((a,b)=>b.rank-a.rank||a.e.label.localeCompare(b.e.label)).map(r=>r.e):entries.filter(__studio33.$fn(e=>e.root&&!__studio33.u23IsExtra(e.id),"e=>e.root&&!u23IsExtra(e.id)",""));
 if(['calculate emi','emi calculator','loan emi'].includes(q)){rows=rows.filter(e=>e.id!=='tools');rows.unshift(__studio33.n28Entry('emi','tools','Loan / EMI','',{loan:true}));}
 if(q==='hash file'){rows=rows.filter(e=>e.id!=='fileinspect');rows.unshift(__studio33.n28Entry('file-hash','fileinspect','Hash a file'));}
 const actions=__studio33.u25PaletteActions.filter(__studio33.$fn(([label,aliases],i)=>q?__studio33.n28Normalize(label+' '+aliases).includes(q):i<3,"([label,aliases],i)=>q?n28Normalize(label+' '+aliases).includes(q):i<3","")).map(([label,aliases,fn],i)=>({key:'action:'+i,label,category:'Shared action',action:fn}));
 rows=[...actions,...rows];const total=rows.length;rows=rows.slice(0,60);const host=__studio33.$('commandResults'),fragment=document.createDocumentFragment();
 for(const entry of rows){const b=__studio33.csText('button','','command-result');b.dataset.n28Entry=entry.key;b.append(__studio33.csText('strong',(entry.id&&__studio33.favorites.includes(entry.id)?'★ ':'')+entry.label),__studio33.csText('small',entry.category+(entry.id&&!entry.root?' · '+__studio33.views[entry.home]:'')+(entry.id&&__studio33.u23IsExtra(entry.id)?' · optional':'')));b.onclick=__studio33.$fn(()=>{if(entry.action){__studio33.closeCommands();entry.action()}else __studio33.n28FeatureOpen(entry)},"()=>{if(entry.action){closeCommands();entry.action()}else n28FeatureOpen(entry)}","");fragment.append(b)}
 if(!rows.length)fragment.append(__studio33.csText('p','No matching tools or features.','hint'));host.replaceChildren(fragment);
 __studio33.commandIndex=Math.max(0,Math.min(__studio33.commandIndex,rows.length-1));[...host.querySelectorAll('button')].forEach(__studio33.$fn((b,i)=>b.classList.toggle('active',i===__studio33.commandIndex),"(b,i)=>b.classList.toggle('active',i===commandIndex)",""));__studio33.commandItems=rows.map(e=>[e.key,e.label]);
 __studio33.n28SearchCount.textContent=total>60?'Showing 60 of '+total+' matches · refine your search.':total+' matching '+(q?'tools, features and actions':'workspaces and actions');
},"function(){\n const q=n28Normalize($('commandSearch').value),tokens=q.split(' ').filter(Boolean),entries=n28GetIndex();\n let rows=q?entries.map(e=>({e,rank:n28Rank(e,q,tokens)})).filter(r=>r.rank>=0).sort((a,b)=>b.rank-a.rank||a.e.label.localeCompare(b.e.label)).map(r=>r.e):entries.filter(e=>e.root&&!u23IsExtra(e.id));\n if(['calculate emi','emi calculator','loan emi'].includes(q)){rows=rows.filter(e=>e.id!=='tools');rows.unshift(n28Entry('emi','tools','Loan / EMI','',{loan:true}));}\n if(q==='hash file'){rows=rows.filter(e=>e.id!=='fileinspect');rows.unshift(n28Entry('file-hash','fileinspect','Hash a file'));}\n const actions=u25PaletteActions.filter(([label,aliases],i)=>q?n28Normalize(label+' '+aliases).includes(q):i<3).map(([label,aliases,fn],i)=>({key:'action:'+i,label,category:'Shared action',action:fn}));\n rows=[...actions,...rows];const total=rows.length;rows=rows.slice(0,60);const host=$('commandResults'),fragment=document.createDocumentFragment();\n for(const entry of rows){const b=csText('button','','command-result');b.dataset.n28Entry=entry.key;b.append(csText('strong',(entry.id&&favorites.includes(entry.id)?'★ ':'')+entry.label),csText('small',entry.category+(entry.id&&!entry.root?' · '+views[entry.home]:'')+(entry.id&&u23IsExtra(entry.id)?' · optional':'')));b.onclick=()=>{if(entry.action){closeCommands();entry.action()}else n28FeatureOpen(entry)};fragment.append(b)}\n if(!rows.length)fragment.append(csText('p','No matching tools or features.','hint'));host.replaceChildren(fragment);\n commandIndex=Math.max(0,Math.min(commandIndex,rows.length-1));[...host.querySelectorAll('button')].forEach((b,i)=>b.classList.toggle('active',i===commandIndex));commandItems=rows.map(e=>[e.key,e.label]);\n n28SearchCount.textContent=total>60?'Showing 60 of '+total+' matches · refine your search.':total+' matching '+(q?'tools, features and actions':'workspaces and actions');\n}","");
}],
[4103,function initialize_4103(__studio33){
for(const id of ['calculator','graph','colors','qr','salesforce'])__studio33.cs30NativeCore(id);
}],
[4112,function initialize_4112(__studio33){
Object.assign(__studio33.n28Categories,{
 math:{label:'Math & Measurement',tools:['calculator','notebook','graph','equations','fractions','matrices','statistics','conversionworkspace']},
 text:{label:'Text & Writing',tools:['texttoolkit','markdown']},
 json:{label:'Data & Tables',tools:['jsonstudio','dataworkbench','comparisonstudio']},
 developer:{label:'Developer, API & Automation',tools:['integrationstudio','salesforce','logs','workflows','cron','jwtworkspace','hashworkspace','passwords','programmer','uuid','regex','subnets','keyboard']},
 media:{label:'Files, Images & Design',tools:['imagestudio','pdfworkspace','colors','qr','archives','audioeditor','videoframes']},
 productivity:{label:'Productivity & Planning',tools:['datetoolkit','kanban','formsworkspace','decision','flowchart','presentationtimer','flashcards','typing']},
 career:{label:'Career & Professional Documents',tools:['careerdocuments','careerpreparation']}
});
}],
[4122,function initialize_4122(__studio33){
try{__studio33.u23State=__studio33.u23Check(__studio33.storage.get(__studio33.u23Key,__studio33.u23State));}catch{__studio33.u23State=__studio33.u23Check({version:1,hidden:['typing','flashcards','audioeditor','videoframes','barcodes','subnets','keyboard'],shell:'posix'});}
}],
[4133,function initialize_4133(__studio33){
__studio33.$('u23ManageDefaults').onclick=__studio33.$fn(()=>{const defaults=__studio33.u23Check({version:1,hidden:['typing','flashcards','audioeditor','videoframes','barcodes','subnets','keyboard'],shell:__studio33.u23State.shell});__studio33.u23ManageDraft=new Set(defaults.hidden);__studio33.cs30ManageFeatures=new Set(defaults.hiddenModes);__studio33.u23ManageRender();},"()=>{const defaults=u23Check({version:1,hidden:['typing','flashcards','audioeditor','videoframes','barcodes','subnets','keyboard'],shell:u23State.shell});u23ManageDraft=new Set(defaults.hidden);cs30ManageFeatures=new Set(defaults.hiddenModes);u23ManageRender();}","");
}],
[4153,function initialize_4153(__studio33){
__studio33.openTab=__studio33.$fn(function(request){
 const started=performance.now();let id=__studio33.u23Canonical(request);if(!Object.hasOwn(__studio33.views,id))return;let home=__studio33.u23Home(id),target=id;
 if(id===home&&__studio33.v12Suites[home]&&!__studio33.cs30Native.has(home)&&home!=='dataworkbench')target=__studio33.n28State.last[home]||__studio33.v12Last[home]||__studio33.v12Suites[home][0];if(!Object.hasOwn(__studio33.views,target)||__studio33.u23Home(target)!==home)target=__studio33.v12Suites[home]?.[0]||home;
 const q=__studio33.$('commandOverlay').hidden?'':__studio33.$('commandSearch').value.toLowerCase().trim();if(target==='hash'&&q==='hash file'){target='fileinspect';home=__studio33.u23Home(target);}if(target==='tools'&&['calculate emi','emi calculator','loan emi'].includes(q)){__studio33.tool='loan';__studio33.renderTools();__studio33.$('tools').querySelectorAll('[data-tool]').forEach(__studio33.$fn(b=>b.setAttribute('aria-pressed',String(b.dataset.tool===__studio33.tool)),"b=>b.setAttribute('aria-pressed',String(b.dataset.tool===tool))",""));}if(target==='tools'&&__studio33.tool==='stats'){__studio33.tool='percent';__studio33.renderTools();}
 if(__studio33.cs31Ready)__studio33.cs31Leave(target);const previous=__studio33.activeView;__studio33.cs29RememberScroll(previous);__studio33.cs29Observer.disconnect();__studio33.u22StopInspect();__studio33.u19StopEditing();__studio33.v13CloseEditor();if(__studio33.u26FilterTimer){clearTimeout(__studio33.u26FilterTimer);__studio33.u26FilterTimer=0;__studio33.dwRender();}
 __studio33.beforeStudioToolChange(target);if(previous!==target){if(previous==='audioeditor'){__studio33.$('audPlayer').pause();if(__studio33.audContext?.state==='running')__studio33.audContext.suspend().catch(()=>{});}if(previous==='videoframes'){__studio33.vidGeneration++;__studio33.$('vidPlayer').pause();}__studio33.kbKeys.forEach(el=>el.classList.remove('pressed'));__studio33.u24ForgetUndo();}
 const oldHome=__studio33.u23Home(previous);if(__studio33.v12SharedInputs[oldHome]?.[previous])__studio33.v12SharedState[oldHome].source=__studio33.$(__studio33.v12SharedInputs[oldHome][previous]).value;
 __studio33.cs30Mount(home);if(__studio33.crIDs.includes(target))__studio33.crEnsure(target);
 if(__studio33.v12SharedInputs[home]?.[target]){const input=__studio33.$(__studio33.v12SharedInputs[home][target]);if(input.value!==__studio33.v12SharedState[home].source){input.value=__studio33.v12SharedState[home].source;input.dispatchEvent(new Event('input',{bubbles:true}));}}
 __studio33.u24Opening=true;try{__studio33.activeView=target;for(const key of Object.keys(__studio33.views)){const panel=__studio33.$(key);if(panel)panel.hidden=key!==target&&key!==home;}if(__studio33.v12Suites[home]){__studio33.v12Last[home]=target;for(const mode of __studio33.v12Suites[home])if(mode!==home)__studio33.$(mode).hidden=mode!==target;const core=__studio33.cs30Native.get(home)||(home==='dataworkbench'?__studio33.$('dwCore'):null);if(core)core.hidden=target!==home;const tabs=__studio33.n28FeatureControls.get(home)?.tabs;for(const b of tabs?.querySelectorAll('[data-mode]')||[]){b.setAttribute('aria-selected',String(b.dataset.mode===target));b.hidden=b.dataset.mode!==target&&__studio33.u23State.hiddenModes.includes(b.dataset.mode);}}
 __studio33.rememberTool(target);__studio33.syncToolNavigation(target);__studio33.renderFavorites();
 const render={calculator:__studio33.preview,converter:__studio33.updateConversion,tools:__studio33.renderToolResults,notebook:__studio33.renderNotebook,graph:__studio33.graphRender,equations:__studio33.renderEquations,fractions:__studio33.renderFractions,dates:__studio33.renderDates,finance:__studio33.renderFinance,programmer:__studio33.renderProgrammer,formulas:__studio33.renderFormulaResult,measurements:__studio33.renderMeasurements,matrices:__studio33.renderMatrices,calculus:__studio33.renderCalculus,presets:__studio33.presetType,settings:__studio33.syncFormatting,characters:__studio33.renderCharacters,statistics:__studio33.u23Statistics,dataworkbench:__studio33.dwRender,reconciliation:__studio33.rcRender,responsedashboard:__studio33.rdRender,workflows:__studio33.wfRender,projectworkspaces:__studio33.wsRender,kanban:__studio33.knRender,formdesigner:__studio33.fdRender,audioeditor:__studio33.audWave};render[target]?.();
 }finally{__studio33.u24Opening=false;}
 if(__studio33.u24KnPending){__studio33.u24KnPending=false;__studio33.knRender();}if(__studio33.u24DWPending){__studio33.u24DWPending=false;__studio33.dwRender();}if(__studio33.v13Reviews.has(target))__studio33.v13ReviewRender(target);
 __studio33.u17SuiteOptions();if(__studio33.cs31Ready)__studio33.cs31Prepare(target);__studio33.u24EnsureEditors(__studio33.$(target));if(home!==target)for(const node of __studio33.$(home).querySelectorAll(':scope>.field,:scope>label'))__studio33.u24EnsureEditors(node);__studio33.u24EmptyRefresh(target);
 if(__studio33.u23IsExtra(target))__studio33.$(home).querySelector('.panel-heading')?.after(__studio33.u23ExtraNote);else __studio33.u23ExtraNote.remove();__studio33.u17MobileSync();__studio33.u19InstallRowButtons();__studio33.u19SyncExit();
 if(target==='camerastudio'){__studio33.ciDraw();__studio33.ciButtons();}__studio33.ci26RegisterInputs(target);__studio33.ci26RefreshInput(target);__studio33.n28DecorateCurrent();__studio33.n28ActiveTab();if(__studio33.v12Suites[home]){__studio33.n28State.last[home]=target;__studio33.n28Save();}__studio33.cs29Prepare();__studio33.cs29Observe();if(previous!==target)__studio33.cs29RestoreScroll(target);
 if(__studio33.u19Layout==='tv')__studio33.$(target)?.querySelector('.u19-view-actions button,.u17-actions button,button:not([disabled]),summary')?.focus({preventScroll:true});
 const oldPanel=__studio33.$(previous);if(previous!==target&&oldPanel?.hidden&&oldPanel.contains(document.activeElement)){const heading=__studio33.$(home).querySelector(':scope>.panel-heading');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}}
 __studio33.cs30ParkOthers();__studio33.u24Record('open',target,started);__studio33.refreshTaskUI();__studio33.cs30Metrics.opens++;__studio33.cs30Metrics.routeMs=performance.now()-started;
},"function(request){\n const started=performance.now();let id=u23Canonical(request);if(!Object.hasOwn(views,id))return;let home=u23Home(id),target=id;\n if(id===home&&v12Suites[home]&&!cs30Native.has(home)&&home!=='dataworkbench')target=n28State.last[home]||v12Last[home]||v12Suites[home][0];if(!Object.hasOwn(views,target)||u23Home(target)!==home)target=v12Suites[home]?.[0]||home;\n const q=$('commandOverlay').hidden?'':$('commandSearch').value.toLowerCase().trim();if(target==='hash'&&q==='hash file'){target='fileinspect';home=u23Home(target);}if(target==='tools'&&['calculate emi','emi calculator','loan emi'].includes(q)){tool='loan';renderTools();$('tools').querySelectorAll('[data-tool]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tool===tool)));}if(target==='tools'&&tool==='stats'){tool='percent';renderTools();}\n if(cs31Ready)cs31Leave(target);const previous=activeView;cs29RememberScroll(previous);cs29Observer.disconnect();u22StopInspect();u19StopEditing();v13CloseEditor();if(u26FilterTimer){clearTimeout(u26FilterTimer);u26FilterTimer=0;dwRender();}\n beforeStudioToolChange(target);if(previous!==target){if(previous==='audioeditor'){$('audPlayer').pause();if(audContext?.state==='running')audContext.suspend().catch(()=>{});}if(previous==='videoframes'){vidGeneration++;$('vidPlayer').pause();}kbKeys.forEach(el=>el.classList.remove('pressed'));u24ForgetUndo();}\n const oldHome=u23Home(previous);if(v12SharedInputs[oldHome]?.[previous])v12SharedState[oldHome].source=$(v12SharedInputs[oldHome][previous]).value;\n cs30Mount(home);if(crIDs.includes(target))crEnsure(target);\n if(v12SharedInputs[home]?.[target]){const input=$(v12SharedInputs[home][target]);if(input.value!==v12SharedState[home].source){input.value=v12SharedState[home].source;input.dispatchEvent(new Event('input',{bubbles:true}));}}\n u24Opening=true;try{activeView=target;for(const key of Object.keys(views)){const panel=$(key);if(panel)panel.hidden=key!==target&&key!==home;}if(v12Suites[home]){v12Last[home]=target;for(const mode of v12Suites[home])if(mode!==home)$(mode).hidden=mode!==target;const core=cs30Native.get(home)||(home==='dataworkbench'?$('dwCore'):null);if(core)core.hidden=target!==home;const tabs=n28FeatureControls.get(home)?.tabs;for(const b of tabs?.querySelectorAll('[data-mode]')||[]){b.setAttribute('aria-selected',String(b.dataset.mode===target));b.hidden=b.dataset.mode!==target&&u23State.hiddenModes.includes(b.dataset.mode);}}\n rememberTool(target);syncToolNavigation(target);renderFavorites();\n const render={calculator:preview,converter:updateConversion,tools:renderToolResults,notebook:renderNotebook,graph:graphRender,equations:renderEquations,fractions:renderFractions,dates:renderDates,finance:renderFinance,programmer:renderProgrammer,formulas:renderFormulaResult,measurements:renderMeasurements,matrices:renderMatrices,calculus:renderCalculus,presets:presetType,settings:syncFormatting,characters:renderCharacters,statistics:u23Statistics,dataworkbench:dwRender,reconciliation:rcRender,responsedashboard:rdRender,workflows:wfRender,projectworkspaces:wsRender,kanban:knRender,formdesigner:fdRender,audioeditor:audWave};render[target]?.();\n }finally{u24Opening=false;}\n if(u24KnPending){u24KnPending=false;knRender();}if(u24DWPending){u24DWPending=false;dwRender();}if(v13Reviews.has(target))v13ReviewRender(target);\n u17SuiteOptions();if(cs31Ready)cs31Prepare(target);u24EnsureEditors($(target));if(home!==target)for(const node of $(home).querySelectorAll(':scope>.field,:scope>label'))u24EnsureEditors(node);u24EmptyRefresh(target);\n if(u23IsExtra(target))$(home).querySelector('.panel-heading')?.after(u23ExtraNote);else u23ExtraNote.remove();u17MobileSync();u19InstallRowButtons();u19SyncExit();\n if(target==='camerastudio'){ciDraw();ciButtons();}ci26RegisterInputs(target);ci26RefreshInput(target);n28DecorateCurrent();n28ActiveTab();if(v12Suites[home]){n28State.last[home]=target;n28Save();}cs29Prepare();cs29Observe();if(previous!==target)cs29RestoreScroll(target);\n if(u19Layout==='tv')$(target)?.querySelector('.u19-view-actions button,.u17-actions button,button:not([disabled]),summary')?.focus({preventScroll:true});\n const oldPanel=$(previous);if(previous!==target&&oldPanel?.hidden&&oldPanel.contains(document.activeElement)){const heading=$(home).querySelector(':scope>.panel-heading');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}}\n cs30ParkOthers();u24Record('open',target,started);refreshTaskUI();cs30Metrics.opens++;cs30Metrics.routeMs=performance.now()-started;\n}","");
}]
];

return {id,register,steps};
})(),
(()=>{
// core/editors · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
const id="core/editors";
function register(__studio33){
__studio33.v13CloseEditor = __studio33.$fn((function v13CloseEditor(){if(__studio33.v13EditorDialog.open)__studio33.v13EditorDialog.close();if(__studio33.v13Focused){const {editor,tools,search,marker,previousFocus}=__studio33.v13Focused;marker.replaceWith(tools,search,editor);editor.classList.remove('v13-expanded');tools.querySelector('[data-expand]').textContent='Expand editor';__studio33.v13Focused=null;previousFocus?.focus()}}),"function v13CloseEditor(){if(v13EditorDialog.open)v13EditorDialog.close();if(v13Focused){const {editor,tools,search,marker,previousFocus}=v13Focused;marker.replaceWith(tools,search,editor);editor.classList.remove('v13-expanded');tools.querySelector('[data-expand]').textContent='Expand editor';v13Focused=null;previousFocus?.focus()}}","v13CloseEditor");

__studio33.v13InstallEditor = __studio33.$fn((function v13InstallEditor(editor){if(__studio33.u24Defer(editor,"editor"))return;if(!editor.id||__studio33.v13Editors.has(editor.id)||editor.closest('#typing'))return;
 if(!editor.readOnly&&!__studio33.v12Edits.has(editor.id)){__studio33.v12Edits.set(editor.id,{undo:[],redo:[],last:editor.value});editor.addEventListener('input',__studio33.$fn(()=>{const h=__studio33.v12Edits.get(editor.id);if(h.last!==editor.value){h.undo.push(h.last);h.undo=h.undo.slice(-20);h.redo=[];h.last=editor.value}},"()=>{const h=v12Edits.get(editor.id);if(h.last!==editor.value){h.undo.push(h.last);h.undo=h.undo.slice(-20);h.redo=[];h.last=editor.value}}",""))}
 const host=editor.closest('.field')||editor.parentElement,title=editor.getAttribute('aria-label')||host.querySelector('span')?.textContent||editor.id,tools=__studio33.csText('div','','v13-editor-tools'),search=__studio33.csText('div','','v13-find');search.hidden=true;search.id='find-'+editor.id;search.setAttribute('role','search');search.setAttribute('aria-label','Find in '+title);
 const find=document.createElement('input'),replace=document.createElement('input'),matchCase=document.createElement('input');find.type=replace.type='text';find.placeholder='Find text';replace.placeholder='Replace with';find.setAttribute('aria-label','Find in '+title);replace.setAttribute('aria-label','Replace in '+title);matchCase.type='checkbox';const caseLabel=document.createElement('label');caseLabel.append(matchCase,document.createTextNode('Match case'));const status=__studio33.csText('p','','hint');status.setAttribute('role','status');let matches=[],current=-1;
 const refresh=()=>{matches=[];const needle=matchCase.checked?find.value:find.value.toLowerCase(),source=matchCase.checked?editor.value:editor.value.toLowerCase();if(needle){let p=0;while((p=source.indexOf(needle,p))>=0){matches.push(p);p+=needle.length;if(matches.length>=100000)break}}if(current>=matches.length)current=-1;status.textContent=find.value?matches.length+' matches'+(current>=0?' · '+(current+1)+' of '+matches.length:''):'Enter text to find';};
 const jump=direction=>{refresh();if(!matches.length)return;current=current<0?(direction<0?matches.length-1:0):(current+direction+matches.length)%matches.length;editor.focus();editor.setSelectionRange(matches[current],matches[current]+find.value.length);const line=editor.value.slice(0,matches[current]).split('\n').length;editor.scrollTop=Math.max(0,(line-3)*(parseFloat(getComputedStyle(editor).lineHeight)||20));status.textContent=(current+1)+' of '+matches.length+' matches';};
 const change=all=>{if(editor.readOnly)return;refresh();if(!matches.length)return;if(!all&&current<0){jump(1);return}const indices=all?matches:[matches[current]],before=editor.value;let value=before;for(const pos of [...indices].reverse())value=value.slice(0,pos)+replace.value+value.slice(pos+find.value.length);editor.value=value;editor.dispatchEvent(new Event('input',{bubbles:true}));editor.dispatchEvent(new Event('change',{bubbles:true}));const count=indices.length;current=-1;refresh();status.textContent='Replaced '+count+' matches · Undo edit is available';};
 const show=wantReplace=>{search.hidden=false;replace.hidden=!wantReplace||editor.readOnly;replaceOne.hidden=replaceAll.hidden=replace.hidden;refresh();find.focus();find.select();};
 const replaceOne=__studio33.csButton('Replace match',()=>change(false)),replaceAll=__studio33.csButton('Replace all',()=>change(true));search.append(find,replace,caseLabel,__studio33.csButton('Previous',()=>jump(-1)),__studio33.csButton('Next',()=>jump(1)),replaceOne,replaceAll,__studio33.csButton('Close find',()=>{search.hidden=true;editor.focus()}),status);
 find.oninput=()=>{current=-1;refresh()};matchCase.onchange=()=>{current=-1;refresh()};find.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();jump(e.shiftKey?-1:1)}};editor.addEventListener('input',()=>{current=-1;if(!search.hidden)refresh()});
 const expand=__studio33.$fn(()=>{if(__studio33.v13Focused?.editor===editor){__studio33.v13CloseEditor();return}__studio33.v13CloseEditor();const marker=document.createComment('expanded editor '+editor.id);tools.before(marker);__studio33.v13Focused={editor,tools,search,marker,previousFocus:document.activeElement};__studio33.v13EditorTitle.textContent=(__studio33.views[editor.closest('section')?.id]||'Editor')+' · '+title;tools.querySelector('[data-expand]').textContent='Exit expanded editor';__studio33.v13EditorDialog.append(tools,search,editor);__studio33.v13EditorDialog.showModal();editor.focus()},"()=>{if(v13Focused?.editor===editor){v13CloseEditor();return}v13CloseEditor();const marker=document.createComment('expanded editor '+editor.id);tools.before(marker);v13Focused={editor,tools,search,marker,previousFocus:document.activeElement};v13EditorTitle.textContent=(views[editor.closest('section')?.id]||'Editor')+' · '+title;tools.querySelector('[data-expand]').textContent='Exit expanded editor';v13EditorDialog.append(tools,search,editor);v13EditorDialog.showModal();editor.focus()}","expand");
 const undo=__studio33.$fn(direction=>{const h=__studio33.v12Edits.get(editor.id);if(!h)return;const from=direction==='undo'?h.undo:h.redo,to=direction==='undo'?h.redo:h.undo;if(!from.length)return;to.push(editor.value);editor.value=from.pop();h.last=editor.value;editor.dispatchEvent(new Event('input',{bubbles:true}));editor.dispatchEvent(new Event('change',{bubbles:true}));current=-1;if(!search.hidden)refresh()},"direction=>{const h=v12Edits.get(editor.id);if(!h)return;const from=direction==='undo'?h.undo:h.redo,to=direction==='undo'?h.redo:h.undo;if(!from.length)return;to.push(editor.value);editor.value=from.pop();h.last=editor.value;editor.dispatchEvent(new Event('input',{bubbles:true}));editor.dispatchEvent(new Event('change',{bubbles:true}));current=-1;if(!search.hidden)refresh()}","undo");
 const expandButton=__studio33.csButton('Expand editor',expand);expandButton.dataset.expand='true';tools.append(__studio33.csButton('Find',()=>show(false)));if(!editor.readOnly)tools.append(__studio33.csButton('Find & replace',()=>show(true)));if(!editor.readOnly)tools.append(__studio33.csButton('Undo',()=>undo('undo')),__studio33.csButton('Redo',()=>undo('redo')));tools.append(expandButton,__studio33.csText('span','Ctrl/⌘ F · Ctrl/⌘ H · Alt Enter','hint'));
 editor.before(tools,search);__studio33.v13Editors.set(editor.id,{editor,tools,search,refresh,show,expand});
 const keydown=e=>{if((e.ctrlKey||e.metaKey)&&!e.altKey&&['f','h'].includes(e.key.toLowerCase())){e.preventDefault();e.stopPropagation();show(e.key.toLowerCase()==='h')}else if(e.altKey&&e.key==='Enter'){e.preventDefault();expand()}else if(e.key==='Escape'&&!search.hidden){e.preventDefault();e.stopPropagation();search.hidden=true;editor.focus()}};editor.addEventListener('keydown',keydown);search.addEventListener('keydown',keydown);
}),"function v13InstallEditor(editor){if(u24Defer(editor,\"editor\"))return;if(!editor.id||v13Editors.has(editor.id)||editor.closest('#typing'))return;\n if(!editor.readOnly&&!v12Edits.has(editor.id)){v12Edits.set(editor.id,{undo:[],redo:[],last:editor.value});editor.addEventListener('input',()=>{const h=v12Edits.get(editor.id);if(h.last!==editor.value){h.undo.push(h.last);h.undo=h.undo.slice(-20);h.redo=[];h.last=editor.value}})}\n const host=editor.closest('.field')||editor.parentElement,title=editor.getAttribute('aria-label')||host.querySelector('span')?.textContent||editor.id,tools=csText('div','','v13-editor-tools'),search=csText('div','','v13-find');search.hidden=true;search.id='find-'+editor.id;search.setAttribute('role','search');search.setAttribute('aria-label','Find in '+title);\n const find=document.createElement('input'),replace=document.createElement('input'),matchCase=document.createElement('input');find.type=replace.type='text';find.placeholder='Find text';replace.placeholder='Replace with';find.setAttribute('aria-label','Find in '+title);replace.setAttribute('aria-label','Replace in '+title);matchCase.type='checkbox';const caseLabel=document.createElement('label');caseLabel.append(matchCase,document.createTextNode('Match case'));const status=csText('p','','hint');status.setAttribute('role','status');let matches=[],current=-1;\n const refresh=()=>{matches=[];const needle=matchCase.checked?find.value:find.value.toLowerCase(),source=matchCase.checked?editor.value:editor.value.toLowerCase();if(needle){let p=0;while((p=source.indexOf(needle,p))>=0){matches.push(p);p+=needle.length;if(matches.length>=100000)break}}if(current>=matches.length)current=-1;status.textContent=find.value?matches.length+' matches'+(current>=0?' · '+(current+1)+' of '+matches.length:''):'Enter text to find';};\n const jump=direction=>{refresh();if(!matches.length)return;current=current<0?(direction<0?matches.length-1:0):(current+direction+matches.length)%matches.length;editor.focus();editor.setSelectionRange(matches[current],matches[current]+find.value.length);const line=editor.value.slice(0,matches[current]).split('\\n').length;editor.scrollTop=Math.max(0,(line-3)*(parseFloat(getComputedStyle(editor).lineHeight)||20));status.textContent=(current+1)+' of '+matches.length+' matches';};\n const change=all=>{if(editor.readOnly)return;refresh();if(!matches.length)return;if(!all&&current<0){jump(1);return}const indices=all?matches:[matches[current]],before=editor.value;let value=before;for(const pos of [...indices].reverse())value=value.slice(0,pos)+replace.value+value.slice(pos+find.value.length);editor.value=value;editor.dispatchEvent(new Event('input',{bubbles:true}));editor.dispatchEvent(new Event('change',{bubbles:true}));const count=indices.length;current=-1;refresh();status.textContent='Replaced '+count+' matches · Undo edit is available';};\n const show=wantReplace=>{search.hidden=false;replace.hidden=!wantReplace||editor.readOnly;replaceOne.hidden=replaceAll.hidden=replace.hidden;refresh();find.focus();find.select();};\n const replaceOne=csButton('Replace match',()=>change(false)),replaceAll=csButton('Replace all',()=>change(true));search.append(find,replace,caseLabel,csButton('Previous',()=>jump(-1)),csButton('Next',()=>jump(1)),replaceOne,replaceAll,csButton('Close find',()=>{search.hidden=true;editor.focus()}),status);\n find.oninput=()=>{current=-1;refresh()};matchCase.onchange=()=>{current=-1;refresh()};find.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();jump(e.shiftKey?-1:1)}};editor.addEventListener('input',()=>{current=-1;if(!search.hidden)refresh()});\n const expand=()=>{if(v13Focused?.editor===editor){v13CloseEditor();return}v13CloseEditor();const marker=document.createComment('expanded editor '+editor.id);tools.before(marker);v13Focused={editor,tools,search,marker,previousFocus:document.activeElement};v13EditorTitle.textContent=(views[editor.closest('section')?.id]||'Editor')+' · '+title;tools.querySelector('[data-expand]').textContent='Exit expanded editor';v13EditorDialog.append(tools,search,editor);v13EditorDialog.showModal();editor.focus()};\n const undo=direction=>{const h=v12Edits.get(editor.id);if(!h)return;const from=direction==='undo'?h.undo:h.redo,to=direction==='undo'?h.redo:h.undo;if(!from.length)return;to.push(editor.value);editor.value=from.pop();h.last=editor.value;editor.dispatchEvent(new Event('input',{bubbles:true}));editor.dispatchEvent(new Event('change',{bubbles:true}));current=-1;if(!search.hidden)refresh()};\n const expandButton=csButton('Expand editor',expand);expandButton.dataset.expand='true';tools.append(csButton('Find',()=>show(false)));if(!editor.readOnly)tools.append(csButton('Find & replace',()=>show(true)));if(!editor.readOnly)tools.append(csButton('Undo',()=>undo('undo')),csButton('Redo',()=>undo('redo')));tools.append(expandButton,csText('span','Ctrl/⌘ F · Ctrl/⌘ H · Alt Enter','hint'));\n editor.before(tools,search);v13Editors.set(editor.id,{editor,tools,search,refresh,show,expand});\n const keydown=e=>{if((e.ctrlKey||e.metaKey)&&!e.altKey&&['f','h'].includes(e.key.toLowerCase())){e.preventDefault();e.stopPropagation();show(e.key.toLowerCase()==='h')}else if(e.altKey&&e.key==='Enter'){e.preventDefault();expand()}else if(e.key==='Escape'&&!search.hidden){e.preventDefault();e.stopPropagation();search.hidden=true;editor.focus()}};editor.addEventListener('keydown',keydown);search.addEventListener('keydown',keydown);\n}","v13InstallEditor");

__studio33.v13JSONValue = __studio33.$fn((function v13JSONValue(node){return node?__studio33.emitDeveloperJSON(node,'  '):'(missing)'}),"function v13JSONValue(node){return node?emitDeveloperJSON(node,'  '):'(missing)'}","v13JSONValue");

__studio33.v13CompareRecords = __studio33.$fn((function v13CompareRecords(id){
 if(id==='textdiff')return (__studio33.textDiffResult?.rows||[]).filter(__studio33.$fn(r=>r.type!=='same'||__studio33.$('textDiffSame').checked,"r=>r.type!=='same'||$('textDiffSame').checked","")).map(r=>({kind:r.type,key:'Line '+(r.left??'—')+' → '+(r.right??'—'),before:r.type==='added'?'':r.text,after:r.type==='removed'?'':r.text,raw:r}));
 if(id==='jsondiff')return (__studio33.diffResult?.changes||[]).map(__studio33.$fn(r=>({kind:r.type,key:r.path||'(root)',before:__studio33.v13JSONValue(r.before),after:__studio33.v13JSONValue(r.after),raw:{type:r.type,path:r.path,...(r.before?{beforeJSON:__studio33.emitDeveloperJSON(r.before)}:{}),...(r.after?{afterJSON:__studio33.emitDeveloperJSON(r.after)}:{})}}),"r=>({kind:r.type,key:r.path||'(root)',before:v13JSONValue(r.before),after:v13JSONValue(r.after),raw:{type:r.type,path:r.path,...(r.before?{beforeJSON:emitDeveloperJSON(r.before)}:{}),...(r.after?{afterJSON:emitDeveloperJSON(r.after)}:{})}})",""));
 if(id==='xml'){if(!__studio33.xmlReady||__studio33.xmlKind!=='json')return [];try{return __studio33.ordinaryJSON(__studio33.$('xmlOutput').value).differences.map(r=>({kind:r.type,key:r.path||'(root)',before:r.beforeJSON??'(missing)',after:r.afterJSON??'(missing)',raw:r}))}catch{return []}}
 if(id==='excel')return (__studio33.excelDifference?.changes||[]).map(__studio33.$fn(r=>{const row=__studio33.$fn((side,num)=>num?Object.fromEntries(__studio33.excelState[side].rows[0].map(__studio33.$fn((h,i)=>[h,__studio33.excelState[side].rows[num-1][i]??null],"(h,i)=>[h,excelState[side].rows[num-1][i]??null]",""))):null,"(side,num)=>num?Object.fromEntries(excelState[side].rows[0].map((h,i)=>[h,excelState[side].rows[num-1][i]??null])):null","row");return {kind:r.kind,key:String(r.key)+' · rows '+(r.leftRow??'—')+' / '+(r.rightRow??'—'),before:JSON.stringify(row('A',r.leftRow),null,2),after:JSON.stringify(row('B',r.rightRow),null,2),raw:r}},"r=>{const row=(side,num)=>num?Object.fromEntries(excelState[side].rows[0].map((h,i)=>[h,excelState[side].rows[num-1][i]??null])):null;return {kind:r.kind,key:String(r.key)+' · rows '+(r.leftRow??'—')+' / '+(r.rightRow??'—'),before:JSON.stringify(row('A',r.leftRow),null,2),after:JSON.stringify(row('B',r.rightRow),null,2),raw:r}}",""));
 if(id==='reconciliation')return (__studio33.rcReport?.results||[]).map(r=>({kind:r.kind,key:r.key+' · rows '+r.referenceRows.join(',')+' / '+r.currentRows.join(','),before:JSON.stringify(r.reference,null,2),after:JSON.stringify(r.current,null,2),raw:r}));return [];
}),"function v13CompareRecords(id){\n if(id==='textdiff')return (textDiffResult?.rows||[]).filter(r=>r.type!=='same'||$('textDiffSame').checked).map(r=>({kind:r.type,key:'Line '+(r.left??'—')+' → '+(r.right??'—'),before:r.type==='added'?'':r.text,after:r.type==='removed'?'':r.text,raw:r}));\n if(id==='jsondiff')return (diffResult?.changes||[]).map(r=>({kind:r.type,key:r.path||'(root)',before:v13JSONValue(r.before),after:v13JSONValue(r.after),raw:{type:r.type,path:r.path,...(r.before?{beforeJSON:emitDeveloperJSON(r.before)}:{}),...(r.after?{afterJSON:emitDeveloperJSON(r.after)}:{})}}));\n if(id==='xml'){if(!xmlReady||xmlKind!=='json')return [];try{return ordinaryJSON($('xmlOutput').value).differences.map(r=>({kind:r.type,key:r.path||'(root)',before:r.beforeJSON??'(missing)',after:r.afterJSON??'(missing)',raw:r}))}catch{return []}}\n if(id==='excel')return (excelDifference?.changes||[]).map(r=>{const row=(side,num)=>num?Object.fromEntries(excelState[side].rows[0].map((h,i)=>[h,excelState[side].rows[num-1][i]??null])):null;return {kind:r.kind,key:String(r.key)+' · rows '+(r.leftRow??'—')+' / '+(r.rightRow??'—'),before:JSON.stringify(row('A',r.leftRow),null,2),after:JSON.stringify(row('B',r.rightRow),null,2),raw:r}});\n if(id==='reconciliation')return (rcReport?.results||[]).map(r=>({kind:r.kind,key:r.key+' · rows '+r.referenceRows.join(',')+' / '+r.currentRows.join(','),before:JSON.stringify(r.reference,null,2),after:JSON.stringify(r.current,null,2),raw:r}));return [];\n}","v13CompareRecords");

__studio33.v13CompareReady = __studio33.$fn((function v13CompareReady(id){return id==='textdiff'?!!__studio33.textDiffResult:id==='jsondiff'?!!__studio33.diffResult:id==='xml'?__studio33.xmlReady&&__studio33.xmlKind==='json':id==='excel'?!!__studio33.excelDifference:!!__studio33.rcReport&&__studio33.v13RcSignature===__studio33.v13RcInputs()}),"function v13CompareReady(id){return id==='textdiff'?!!textDiffResult:id==='jsondiff'?!!diffResult:id==='xml'?xmlReady&&xmlKind==='json':id==='excel'?!!excelDifference:!!rcReport&&v13RcSignature===v13RcInputs()}","v13CompareReady");

__studio33.v13Filtered = __studio33.$fn((function v13Filtered(id){const ui=__studio33.v13Reviews.get(id),q=ui.search.value.toLowerCase();return __studio33.v13CompareRecords(id).filter(r=>(ui.type.value==='all'||r.kind===ui.type.value)&&(!q||[r.key,r.before,r.after].some(x=>String(x).toLowerCase().includes(q))));}),"function v13Filtered(id){const ui=v13Reviews.get(id),q=ui.search.value.toLowerCase();return v13CompareRecords(id).filter(r=>(ui.type.value==='all'||r.kind===ui.type.value)&&(!q||[r.key,r.before,r.after].some(x=>String(x).toLowerCase().includes(q))));}","v13Filtered");

__studio33.v13ReviewRender = __studio33.$fn((function v13ReviewRender(id,reset=false){const ui=__studio33.v13Reviews.get(id);if(!ui)return;if(reset)ui.current=-1;const all=__studio33.v13CompareRecords(id),kinds=[...new Set(all.map(r=>r.kind))];__studio33.v12Opt(ui.type,[['all','All result types'],...kinds.map(k=>[k,k.replaceAll('-',' ')])],ui.type.value);const rows=__studio33.v13Filtered(id),ready=__studio33.v13CompareReady(id);if(ui.current>=rows.length)ui.current=-1;const page=ui.current<0?ui.page:Math.floor(ui.current/50);ui.page=Math.min(page,Math.max(0,Math.ceil(rows.length/50)-1));ui.summary.textContent=!ready?'Run this comparison to review changes.':rows.length+' filtered of '+all.length+' results'+(ui.current>=0?' · result '+(ui.current+1):'')+' · page '+(ui.page+1)+' of '+Math.max(1,Math.ceil(rows.length/50));ui.previous.disabled=ui.next.disabled=!rows.length;ui.json.disabled=ui.csv.disabled=!ready;ui.pagePrev.disabled=!ui.page;ui.pageNext.disabled=(ui.page+1)*50>=rows.length;
 const table=document.createElement('table'),head=document.createElement('thead'),tr=document.createElement('tr');for(const text of ['Change / location','Original / reference','Updated / current'])tr.append(__studio33.csText('th',text));head.append(tr);table.append(head);const body=document.createElement('tbody');rows.slice(ui.page*50,(ui.page+1)*50).forEach(__studio33.$fn((r,i)=>{const row=document.createElement('tr'),index=ui.page*50+i;row.classList.toggle('v13-current',index===ui.current);row.dataset.result=String(index);row.tabIndex=0;row.setAttribute('aria-label',r.kind+' '+r.key);const first=__studio33.csText('td','');first.append(__studio33.csText('strong',r.kind),__studio33.csText('p',r.key,'hint'));row.append(first);for(const value of [r.before,r.after]){const td=document.createElement('td');td.append(__studio33.csText('pre',value));row.append(td)}row.onclick=__studio33.$fn(()=>{ui.current=index;__studio33.v13ReviewRender(id)},"()=>{ui.current=index;v13ReviewRender(id)}","");body.append(row)},"(r,i)=>{const row=document.createElement('tr'),index=ui.page*50+i;row.classList.toggle('v13-current',index===ui.current);row.dataset.result=String(index);row.tabIndex=0;row.setAttribute('aria-label',r.kind+' '+r.key);const first=csText('td','');first.append(csText('strong',r.kind),csText('p',r.key,'hint'));row.append(first);for(const value of [r.before,r.after]){const td=document.createElement('td');td.append(csText('pre',value));row.append(td)}row.onclick=()=>{ui.current=index;v13ReviewRender(id)};body.append(row)}",""));table.append(body);ui.table.replaceChildren(table);if(!rows.length)ui.table.append(__studio33.csText('p',ready?'No results match the filter.':'Results will appear here.','hint'));
}),"function v13ReviewRender(id,reset=false){const ui=v13Reviews.get(id);if(!ui)return;if(reset)ui.current=-1;const all=v13CompareRecords(id),kinds=[...new Set(all.map(r=>r.kind))];v12Opt(ui.type,[['all','All result types'],...kinds.map(k=>[k,k.replaceAll('-',' ')])],ui.type.value);const rows=v13Filtered(id),ready=v13CompareReady(id);if(ui.current>=rows.length)ui.current=-1;const page=ui.current<0?ui.page:Math.floor(ui.current/50);ui.page=Math.min(page,Math.max(0,Math.ceil(rows.length/50)-1));ui.summary.textContent=!ready?'Run this comparison to review changes.':rows.length+' filtered of '+all.length+' results'+(ui.current>=0?' · result '+(ui.current+1):'')+' · page '+(ui.page+1)+' of '+Math.max(1,Math.ceil(rows.length/50));ui.previous.disabled=ui.next.disabled=!rows.length;ui.json.disabled=ui.csv.disabled=!ready;ui.pagePrev.disabled=!ui.page;ui.pageNext.disabled=(ui.page+1)*50>=rows.length;\n const table=document.createElement('table'),head=document.createElement('thead'),tr=document.createElement('tr');for(const text of ['Change / location','Original / reference','Updated / current'])tr.append(csText('th',text));head.append(tr);table.append(head);const body=document.createElement('tbody');rows.slice(ui.page*50,(ui.page+1)*50).forEach((r,i)=>{const row=document.createElement('tr'),index=ui.page*50+i;row.classList.toggle('v13-current',index===ui.current);row.dataset.result=String(index);row.tabIndex=0;row.setAttribute('aria-label',r.kind+' '+r.key);const first=csText('td','');first.append(csText('strong',r.kind),csText('p',r.key,'hint'));row.append(first);for(const value of [r.before,r.after]){const td=document.createElement('td');td.append(csText('pre',value));row.append(td)}row.onclick=()=>{ui.current=index;v13ReviewRender(id)};body.append(row)});table.append(body);ui.table.replaceChildren(table);if(!rows.length)ui.table.append(csText('p',ready?'No results match the filter.':'Results will appear here.','hint'));\n}","v13ReviewRender");

__studio33.v13ReviewJump = __studio33.$fn((function v13ReviewJump(id,direction){const ui=__studio33.v13Reviews.get(id),rows=__studio33.v13Filtered(id);if(!rows.length)return;ui.current=ui.current<0?(direction<0?rows.length-1:0):(ui.current+direction+rows.length)%rows.length;__studio33.v13ReviewRender(id);const row=ui.table.querySelector('.v13-current');row?.scrollIntoView({block:'nearest'});row?.focus({preventScroll:true});}),"function v13ReviewJump(id,direction){const ui=v13Reviews.get(id),rows=v13Filtered(id);if(!rows.length)return;ui.current=ui.current<0?(direction<0?rows.length-1:0):(ui.current+direction+rows.length)%rows.length;v13ReviewRender(id);const row=ui.table.querySelector('.v13-current');row?.scrollIntoView({block:'nearest'});row?.focus({preventScroll:true});}","v13ReviewJump");

__studio33.v13MappingWrite = __studio33.$fn((function v13MappingWrite(keys){const host=keys?__studio33.v13KeyRows:__studio33.v13ColumnRows,area=__studio33.$(keys?'rcKeys':'rcColumns'),pairs=[...host.querySelectorAll('.v13-map-row')].map(row=>[...row.querySelectorAll('select')].map(e=>e.value));area.value=JSON.stringify(pairs);area.dispatchEvent(new Event('input',{bubbles:true}));}),"function v13MappingWrite(keys){const host=keys?v13KeyRows:v13ColumnRows,area=$(keys?'rcKeys':'rcColumns'),pairs=[...host.querySelectorAll('.v13-map-row')].map(row=>[...row.querySelectorAll('select')].map(e=>e.value));area.value=JSON.stringify(pairs);area.dispatchEvent(new Event('input',{bubbles:true}));}","v13MappingWrite");

__studio33.v13AddMapping = __studio33.$fn((function v13AddMapping(keys,pair){if(!__studio33.rcTables.every(Boolean))return __studio33.csStatus('reconciliation','Load both tables first',true);const host=keys?__studio33.v13KeyRows:__studio33.v13ColumnRows,row=__studio33.csText('div','','v13-map-row'),selects=__studio33.rcTables.map(__studio33.$fn((t,i)=>{const e=document.createElement('select');__studio33.v12Opt(e,t.columns.map(c=>[c,c]),pair?.[i]);e.setAttribute('aria-label',(keys?'Key':'Compare')+' '+(i?'current':'reference')+' column');return e},"(t,i)=>{const e=document.createElement('select');v12Opt(e,t.columns.map(c=>[c,c]),pair?.[i]);e.setAttribute('aria-label',(keys?'Key':'Compare')+' '+(i?'current':'reference')+' column');return e}","")),sample=__studio33.csText('small','','hint');const update=__studio33.$fn(()=>{sample.textContent=selects.map(__studio33.$fn((e,i)=>{const cell=__studio33.rcTables[i].rows[0]?.[__studio33.rcTables[i].columns.indexOf(e.value)];return (i?'Current':'Reference')+' sample: '+(cell?JSON.stringify(cell.value)+' ('+cell.type+')':'(no rows)')},"(e,i)=>{const cell=rcTables[i].rows[0]?.[rcTables[i].columns.indexOf(e.value)];return (i?'Current':'Reference')+' sample: '+(cell?JSON.stringify(cell.value)+' ('+cell.type+')':'(no rows)')}","")).join(' → ')},"()=>{sample.textContent=selects.map((e,i)=>{const cell=rcTables[i].rows[0]?.[rcTables[i].columns.indexOf(e.value)];return (i?'Current':'Reference')+' sample: '+(cell?JSON.stringify(cell.value)+' ('+cell.type+')':'(no rows)')}).join(' → ')}","update");for(const e of selects)e.onchange=__studio33.$fn(()=>{update();__studio33.v13MappingWrite(keys)},"()=>{update();v13MappingWrite(keys)}","");row.append(...selects,__studio33.csButton('Remove',__studio33.$fn(()=>{row.remove();__studio33.v13MappingWrite(keys)},"()=>{row.remove();v13MappingWrite(keys)}","")),sample);host.append(row);update();if(!pair)__studio33.v13MappingWrite(keys);}),"function v13AddMapping(keys,pair){if(!rcTables.every(Boolean))return csStatus('reconciliation','Load both tables first',true);const host=keys?v13KeyRows:v13ColumnRows,row=csText('div','','v13-map-row'),selects=rcTables.map((t,i)=>{const e=document.createElement('select');v12Opt(e,t.columns.map(c=>[c,c]),pair?.[i]);e.setAttribute('aria-label',(keys?'Key':'Compare')+' '+(i?'current':'reference')+' column');return e}),sample=csText('small','','hint');const update=()=>{sample.textContent=selects.map((e,i)=>{const cell=rcTables[i].rows[0]?.[rcTables[i].columns.indexOf(e.value)];return (i?'Current':'Reference')+' sample: '+(cell?JSON.stringify(cell.value)+' ('+cell.type+')':'(no rows)')}).join(' → ')};for(const e of selects)e.onchange=()=>{update();v13MappingWrite(keys)};row.append(...selects,csButton('Remove',()=>{row.remove();v13MappingWrite(keys)}),sample);host.append(row);update();if(!pair)v13MappingWrite(keys);}","v13AddMapping");

__studio33.v13MappingRefresh = __studio33.$fn((function v13MappingRefresh(){if(!__studio33.rcTables.every(Boolean))return;__studio33.v13MappingSignature=__studio33.rcTables.map(t=>JSON.stringify(t.columns)).join('|');for(const [keys,area,host]of [[true,__studio33.$('rcKeys'),__studio33.v13KeyRows],[false,__studio33.$('rcColumns'),__studio33.v13ColumnRows]]){host.replaceChildren();try{__studio33.rcMappings(area.value,...__studio33.rcTables,keys).forEach(__studio33.$fn(pair=>__studio33.v13AddMapping(keys,pair),"pair=>v13AddMapping(keys,pair)",""))}catch{host.append(__studio33.csText('p','Some mappings no longer match these tables. Choose new column mappings or edit the mapping text below.','hint'))}}}),"function v13MappingRefresh(){if(!rcTables.every(Boolean))return;v13MappingSignature=rcTables.map(t=>JSON.stringify(t.columns)).join('|');for(const [keys,area,host]of [[true,$('rcKeys'),v13KeyRows],[false,$('rcColumns'),v13ColumnRows]]){host.replaceChildren();try{rcMappings(area.value,...rcTables,keys).forEach(pair=>v13AddMapping(keys,pair))}catch{host.append(csText('p','Some mappings no longer match these tables. Choose new column mappings or edit the mapping text below.','hint'))}}}","v13MappingRefresh");

__studio33.v13WrapAction = (function v13WrapAction(button,after){const original=button.onclick;button.onclick=function(...args){const value=original?.apply(this,args);if(value&&typeof value.then==='function')return value.then(r=>{after();return r});after();return value};});

__studio33.v13PreviewRules = __studio33.$fn((function v13PreviewRules(){return JSON.stringify({values:['dwColumn','dwCleanMode','dwFind','dwReplace','dwFilter'].map(__studio33.$fn(id=>__studio33.$(id).value,"id=>$(id).value","")),keys:[...__studio33.v13DedupeColumns.querySelectorAll('input:checked')].map(e=>e.value),rows:[...__studio33.dwSelected].sort((a,b)=>a-b)})}),"function v13PreviewRules(){return JSON.stringify({values:['dwColumn','dwCleanMode','dwFind','dwReplace','dwFilter'].map(id=>$(id).value),keys:[...v13DedupeColumns.querySelectorAll('input:checked')].map(e=>e.value),rows:[...dwSelected].sort((a,b)=>a-b)})}","v13PreviewRules");

__studio33.v13CancelPreview = __studio33.$fn((function v13CancelPreview(){__studio33.v13Pending=null;__studio33.v13Preview.hidden=true}),"function v13CancelPreview(){v13Pending=null;v13Preview.hidden=true}","v13CancelPreview");

__studio33.v13DataPreview = __studio33.$fn((function v13DataPreview(table,label,changes){__studio33.dwCheck(table);__studio33.v13Pending={base:JSON.stringify(__studio33.dwTable),rules:__studio33.v13PreviewRules(),table:__studio33.csClone(table),label};__studio33.v13Preview.hidden=false;__studio33.v13Preview.replaceChildren(__studio33.csText('h3','Preview changes'),__studio33.csText('p',changes.length+' proposed changes. Apply to update the table; Cancel keeps the current data.','hint'));const scroll=__studio33.csText('div','','table-scroll'),grid=document.createElement('table'),head=document.createElement('tr');for(const text of ['Source row / column','Before','After'])head.append(__studio33.csText('th',text));grid.append(head);for(const change of changes.slice(0,100)){const row=document.createElement('tr');for(const text of change)row.append(__studio33.csText('td',String(text)));grid.append(row)}scroll.append(grid);__studio33.v13Preview.append(scroll);if(changes.length>100)__studio33.v13Preview.append(__studio33.csText('p','First 100 changes shown. Download the preview for all changes.','hint'));const apply=__studio33.csButton('Apply changes',__studio33.v12Safe('dataworkbench',__studio33.$fn(()=>{if(!__studio33.v13Pending)return;if(__studio33.v13Pending.base!==JSON.stringify(__studio33.dwTable)||__studio33.v13Pending.rules!==__studio33.v13PreviewRules())throw Error('The table changed. Preview the operation again.');const pending=__studio33.v13Pending;__studio33.v13Pending=null;__studio33.v13Preview.hidden=true;__studio33.dwCommit(pending.table,pending.label)},"()=>{if(!v13Pending)return;if(v13Pending.base!==JSON.stringify(dwTable)||v13Pending.rules!==v13PreviewRules())throw Error('The table changed. Preview the operation again.');const pending=v13Pending;v13Pending=null;v13Preview.hidden=true;dwCommit(pending.table,pending.label)}","")));apply.id='dwApplyPreview';apply.disabled=!changes.length;const cancel=__studio33.csButton('Cancel preview',__studio33.$fn(()=>{__studio33.v13Pending=null;__studio33.v13Preview.hidden=true},"()=>{v13Pending=null;v13Preview.hidden=true}",""));cancel.id='dwCancelPreview';__studio33.v13Preview.append(apply,cancel,__studio33.csButton('Download change preview',__studio33.$fn(()=>__studio33.downloadFile('data-change-preview.csv',__studio33.v12CSV([['row_column','before','after'],...changes]),'text/csv'),"()=>downloadFile('data-change-preview.csv',v12CSV([['row_column','before','after'],...changes]),'text/csv')","")));__studio33.csStatus('dataworkbench','Review '+changes.length+' changes before applying');__studio33.v13Preview.scrollIntoView({block:'nearest'});}),"function v13DataPreview(table,label,changes){dwCheck(table);v13Pending={base:JSON.stringify(dwTable),rules:v13PreviewRules(),table:csClone(table),label};v13Preview.hidden=false;v13Preview.replaceChildren(csText('h3','Preview changes'),csText('p',changes.length+' proposed changes. Apply to update the table; Cancel keeps the current data.','hint'));const scroll=csText('div','','table-scroll'),grid=document.createElement('table'),head=document.createElement('tr');for(const text of ['Source row / column','Before','After'])head.append(csText('th',text));grid.append(head);for(const change of changes.slice(0,100)){const row=document.createElement('tr');for(const text of change)row.append(csText('td',String(text)));grid.append(row)}scroll.append(grid);v13Preview.append(scroll);if(changes.length>100)v13Preview.append(csText('p','First 100 changes shown. Download the preview for all changes.','hint'));const apply=csButton('Apply changes',v12Safe('dataworkbench',()=>{if(!v13Pending)return;if(v13Pending.base!==JSON.stringify(dwTable)||v13Pending.rules!==v13PreviewRules())throw Error('The table changed. Preview the operation again.');const pending=v13Pending;v13Pending=null;v13Preview.hidden=true;dwCommit(pending.table,pending.label)}));apply.id='dwApplyPreview';apply.disabled=!changes.length;const cancel=csButton('Cancel preview',()=>{v13Pending=null;v13Preview.hidden=true});cancel.id='dwCancelPreview';v13Preview.append(apply,cancel,csButton('Download change preview',()=>downloadFile('data-change-preview.csv',v12CSV([['row_column','before','after'],...changes]),'text/csv')));csStatus('dataworkbench','Review '+changes.length+' changes before applying');v13Preview.scrollIntoView({block:'nearest'});}","v13DataPreview");

__studio33.v13CalendarFor = __studio33.$fn((function v13CalendarFor(board=__studio33.knCurrent()){return board.calendar||{mode:'calendar',weekends:[0,6],holidays:[]}}),"function v13CalendarFor(board=knCurrent()){return board.calendar||{mode:'calendar',weekends:[0,6],holidays:[]}}","v13CalendarFor");

__studio33.v13CheckCalendar = __studio33.$fn((function v13CheckCalendar(calendar){if(!calendar||!['calendar','working'].includes(calendar.mode)||!Array.isArray(calendar.weekends)||calendar.weekends.length>6||new Set(calendar.weekends).size!==calendar.weekends.length||calendar.weekends.some(n=>!Number.isInteger(n)||n<0||n>6)||!Array.isArray(calendar.holidays)||calendar.holidays.length>1000||new Set(calendar.holidays).size!==calendar.holidays.length||calendar.holidays.some(__studio33.$fn(s=>!__studio33.v12Date(s),"s=>!v12Date(s)","")))throw Error('Use a valid calendar with at least one working weekday and at most 1,000 unique holiday dates');return calendar}),"function v13CheckCalendar(calendar){if(!calendar||!['calendar','working'].includes(calendar.mode)||!Array.isArray(calendar.weekends)||calendar.weekends.length>6||new Set(calendar.weekends).size!==calendar.weekends.length||calendar.weekends.some(n=>!Number.isInteger(n)||n<0||n>6)||!Array.isArray(calendar.holidays)||calendar.holidays.length>1000||new Set(calendar.holidays).size!==calendar.holidays.length||calendar.holidays.some(s=>!v12Date(s)))throw Error('Use a valid calendar with at least one working weekday and at most 1,000 unique holiday dates');return calendar}","v13CheckCalendar");

__studio33.v13IsWorking = (function v13IsWorking(date,calendar){return !calendar.weekends.includes(new Date(date+'T12:00:00Z').getUTCDay())&&!calendar.holidays.includes(date)});

__studio33.v13NextWorking = __studio33.$fn((function v13NextWorking(date,calendar,direction=1){let result=date;for(let i=0;i<12000;i++){if(__studio33.v13IsWorking(result,calendar))return result;result=__studio33.v12Shift(result,direction)}throw Error('No working date found in the supported range')}),"function v13NextWorking(date,calendar,direction=1){let result=date;for(let i=0;i<12000;i++){if(v13IsWorking(result,calendar))return result;result=v12Shift(result,direction)}throw Error('No working date found in the supported range')}","v13NextWorking");

__studio33.v13WorkingShift = __studio33.$fn((function v13WorkingShift(date,days,calendar){if(!Number.isInteger(days)||Math.abs(days)>3650)throw Error('Shift supports up to 3,650 working days');let result=__studio33.v13NextWorking(date,calendar,days<0?-1:1),remaining=Math.abs(days),direction=days<0?-1:1;while(remaining){result=__studio33.v12Shift(result,direction);if(__studio33.v13IsWorking(result,calendar))remaining--}if(!__studio33.v12Date(result))throw Error('Scheduled date is outside the supported range');return result}),"function v13WorkingShift(date,days,calendar){if(!Number.isInteger(days)||Math.abs(days)>3650)throw Error('Shift supports up to 3,650 working days');let result=v13NextWorking(date,calendar,days<0?-1:1),remaining=Math.abs(days),direction=days<0?-1:1;while(remaining){result=v12Shift(result,direction);if(v13IsWorking(result,calendar))remaining--}if(!v12Date(result))throw Error('Scheduled date is outside the supported range');return result}","v13WorkingShift");

__studio33.v13WorkingDuration = __studio33.$fn((function v13WorkingDuration(start,due,calendar){if(!__studio33.v12Date(start)||!__studio33.v12Date(due)||start>due)return 1;const span=Math.round((Date.parse(due)-Date.parse(start))/86400000);if(span>40000)throw Error('Working-day duration supports a span of 40,000 calendar days');let count=0;for(let i=0;i<=span;i++)if(__studio33.v13IsWorking(__studio33.v12Shift(start,i),calendar))count++;return Math.max(1,count)}),"function v13WorkingDuration(start,due,calendar){if(!v12Date(start)||!v12Date(due)||start>due)return 1;const span=Math.round((Date.parse(due)-Date.parse(start))/86400000);if(span>40000)throw Error('Working-day duration supports a span of 40,000 calendar days');let count=0;for(let i=0;i<=span;i++)if(v13IsWorking(v12Shift(start,i),calendar))count++;return Math.max(1,count)}","v13WorkingDuration");

__studio33.v13TaskSchedule = __studio33.$fn((function v13TaskSchedule(task,board=__studio33.knCurrent()){return task.schedule||'calendar'}),"function v13TaskSchedule(task,board=knCurrent()){return task.schedule||'calendar'}","v13TaskSchedule");

__studio33.v13ScheduleRange = __studio33.$fn((function v13ScheduleRange(task,newStart,board=__studio33.knCurrent()){const calendar=__studio33.v13CalendarFor(board),working=__studio33.v13TaskSchedule(task,board)==='working',oldStart=task.start||task.due,oldDue=task.due||task.start;if(!oldStart)return;const duration=working?__studio33.v13WorkingDuration(oldStart,oldDue,calendar):Math.max(1,Math.round((Date.parse(oldDue)-Date.parse(oldStart))/86400000)+1);task.start=working?__studio33.v13NextWorking(newStart,calendar):newStart;task.due=working?__studio33.v13WorkingShift(task.start,duration-1,calendar):__studio33.v12Shift(task.start,duration-1);task.updated=new Date().toISOString()}),"function v13ScheduleRange(task,newStart,board=knCurrent()){const calendar=v13CalendarFor(board),working=v13TaskSchedule(task,board)==='working',oldStart=task.start||task.due,oldDue=task.due||task.start;if(!oldStart)return;const duration=working?v13WorkingDuration(oldStart,oldDue,calendar):Math.max(1,Math.round((Date.parse(oldDue)-Date.parse(oldStart))/86400000)+1);task.start=working?v13NextWorking(newStart,calendar):newStart;task.due=working?v13WorkingShift(task.start,duration-1,calendar):v12Shift(task.start,duration-1);task.updated=new Date().toISOString()}","v13ScheduleRange");

__studio33.v13DurationToDue = __studio33.$fn((function v13DurationToDue(){const start=__studio33.$('ktStart').value,n=Number(__studio33.$('ktDuration').value);if(!__studio33.v12Date(start)||!Number.isInteger(n)||n<1||n>3650)return;try{if(__studio33.ktSchedule.value==='working'){const calendar=__studio33.v13CalendarFor();__studio33.$('ktStart').value=__studio33.v13NextWorking(start,calendar);__studio33.$('ktDue').value=__studio33.v13WorkingShift(__studio33.$('ktStart').value,n-1,calendar)}else __studio33.$('ktDue').value=__studio33.v12Shift(start,n-1)}catch(error){__studio33.$('knDialogStatus').textContent=error.message}}),"function v13DurationToDue(){const start=$('ktStart').value,n=Number($('ktDuration').value);if(!v12Date(start)||!Number.isInteger(n)||n<1||n>3650)return;try{if(ktSchedule.value==='working'){const calendar=v13CalendarFor();$('ktStart').value=v13NextWorking(start,calendar);$('ktDue').value=v13WorkingShift($('ktStart').value,n-1,calendar)}else $('ktDue').value=v12Shift(start,n-1)}catch(error){$('knDialogStatus').textContent=error.message}}","v13DurationToDue");

__studio33.v13NormalizeRecurring = __studio33.$fn((function v13NormalizeRecurring(copy,board,original){if(copy.schedule!=='working'||!copy.start&&!copy.due)return;const calendar=__studio33.v13CalendarFor(board),duration=__studio33.v13WorkingDuration(original.start||original.due,original.due||original.start,calendar);copy.start=__studio33.v13NextWorking(copy.start||copy.due,calendar);copy.due=__studio33.v13WorkingShift(copy.start,duration-1,calendar)}),"function v13NormalizeRecurring(copy,board,original){if(copy.schedule!=='working'||!copy.start&&!copy.due)return;const calendar=v13CalendarFor(board),duration=v13WorkingDuration(original.start||original.due,original.due||original.start,calendar);copy.start=v13NextWorking(copy.start||copy.due,calendar);copy.due=v13WorkingShift(copy.start,duration-1,calendar)}","v13NormalizeRecurring");

__studio33.v13Conflicts = __studio33.$fn((function v13Conflicts(board=__studio33.knCurrent()){const tasks=board.tasks.filter(t=>!t.archived),result=[];for(const task of tasks){if(__studio33.knDone(board,task))continue;for(const id of task.dependencies){const predecessor=board.tasks.find(t=>t.id===id);if(!predecessor)continue;const finish=predecessor.due||predecessor.start,start=task.start||task.due;if(!finish||!start){result.push({task,predecessor,kind:'undated',earliest:null});continue}const calendar=__studio33.v13CalendarFor(board),earliest=__studio33.v13TaskSchedule(task,board)==='working'?__studio33.v13NextWorking(__studio33.v12Shift(finish,1),calendar):__studio33.v12Shift(finish,1);if(start<earliest)result.push({task,predecessor,kind:'overlap',earliest})}}return result}),"function v13Conflicts(board=knCurrent()){const tasks=board.tasks.filter(t=>!t.archived),result=[];for(const task of tasks){if(knDone(board,task))continue;for(const id of task.dependencies){const predecessor=board.tasks.find(t=>t.id===id);if(!predecessor)continue;const finish=predecessor.due||predecessor.start,start=task.start||task.due;if(!finish||!start){result.push({task,predecessor,kind:'undated',earliest:null});continue}const calendar=v13CalendarFor(board),earliest=v13TaskSchedule(task,board)==='working'?v13NextWorking(v12Shift(finish,1),calendar):v12Shift(finish,1);if(start<earliest)result.push({task,predecessor,kind:'overlap',earliest})}}return result}","v13Conflicts");

__studio33.v13ConflictRender = __studio33.$fn((function v13ConflictRender(){const conflicts=__studio33.v13Conflicts(),overlap=conflicts.filter(c=>c.kind==='overlap');__studio33.v13ConflictPanel.replaceChildren(__studio33.csText('h3','Dependency schedule'),__studio33.csText('p',overlap.length+' date conflicts · '+(conflicts.length-overlap.length)+' dependencies need dates. Checks include all active unfinished tasks on this board.','hint'));for(const conflict of conflicts.slice(0,100)){const row=__studio33.csText('div','','v13-conflict-row');row.append(__studio33.csText('span',conflict.task.title+' waits for '+conflict.predecessor.title+'. '+(conflict.earliest?'Starts '+(conflict.task.start||conflict.task.due)+'; earliest start '+conflict.earliest+'.':'Add dates to check the schedule.')),__studio33.csButton('Edit task',__studio33.$fn(()=>__studio33.knEdit(conflict.task.id),"()=>knEdit(conflict.task.id)","")));if(conflict.earliest)row.append(__studio33.csButton('Move to earliest start',__studio33.v12Safe('kanban',__studio33.$fn(()=>__studio33.knTransaction('Resolved dependency dates for '+conflict.task.title,__studio33.$fn(board=>{const task=board.tasks.find(t=>t.id===conflict.task.id),calendar=__studio33.v13CalendarFor(board);let earliest=conflict.earliest;for(const id of task.dependencies){const dep=board.tasks.find(t=>t.id===id),finish=dep?.due||dep?.start;if(!finish)continue;const candidate=task.schedule==='working'?__studio33.v13NextWorking(__studio33.v12Shift(finish,1),calendar):__studio33.v12Shift(finish,1);if(candidate>earliest)earliest=candidate}__studio33.v13ScheduleRange(task,earliest,board)},"board=>{const task=board.tasks.find(t=>t.id===conflict.task.id),calendar=v13CalendarFor(board);let earliest=conflict.earliest;for(const id of task.dependencies){const dep=board.tasks.find(t=>t.id===id),finish=dep?.due||dep?.start;if(!finish)continue;const candidate=task.schedule==='working'?v13NextWorking(v12Shift(finish,1),calendar):v12Shift(finish,1);if(candidate>earliest)earliest=candidate}v13ScheduleRange(task,earliest,board)}","")),"()=>knTransaction('Resolved dependency dates for '+conflict.task.title,board=>{const task=board.tasks.find(t=>t.id===conflict.task.id),calendar=v13CalendarFor(board);let earliest=conflict.earliest;for(const id of task.dependencies){const dep=board.tasks.find(t=>t.id===id),finish=dep?.due||dep?.start;if(!finish)continue;const candidate=task.schedule==='working'?v13NextWorking(v12Shift(finish,1),calendar):v12Shift(finish,1);if(candidate>earliest)earliest=candidate}v13ScheduleRange(task,earliest,board)})",""))));__studio33.v13ConflictPanel.append(row)}if(conflicts.length>100)__studio33.v13ConflictPanel.append(__studio33.csText('p','First 100 conflicts shown. Filter tasks or repair these dates to review the rest.','hint'))}),"function v13ConflictRender(){const conflicts=v13Conflicts(),overlap=conflicts.filter(c=>c.kind==='overlap');v13ConflictPanel.replaceChildren(csText('h3','Dependency schedule'),csText('p',overlap.length+' date conflicts · '+(conflicts.length-overlap.length)+' dependencies need dates. Checks include all active unfinished tasks on this board.','hint'));for(const conflict of conflicts.slice(0,100)){const row=csText('div','','v13-conflict-row');row.append(csText('span',conflict.task.title+' waits for '+conflict.predecessor.title+'. '+(conflict.earliest?'Starts '+(conflict.task.start||conflict.task.due)+'; earliest start '+conflict.earliest+'.':'Add dates to check the schedule.')),csButton('Edit task',()=>knEdit(conflict.task.id)));if(conflict.earliest)row.append(csButton('Move to earliest start',v12Safe('kanban',()=>knTransaction('Resolved dependency dates for '+conflict.task.title,board=>{const task=board.tasks.find(t=>t.id===conflict.task.id),calendar=v13CalendarFor(board);let earliest=conflict.earliest;for(const id of task.dependencies){const dep=board.tasks.find(t=>t.id===id),finish=dep?.due||dep?.start;if(!finish)continue;const candidate=task.schedule==='working'?v13NextWorking(v12Shift(finish,1),calendar):v12Shift(finish,1);if(candidate>earliest)earliest=candidate}v13ScheduleRange(task,earliest,board)}))));v13ConflictPanel.append(row)}if(conflicts.length>100)v13ConflictPanel.append(csText('p','First 100 conflicts shown. Filter tasks or repair these dates to review the rest.','hint'))}","v13ConflictRender");
}
const steps=[
[1341,function initialize_1341(__studio33){
__studio33.v12Edits = new Map();

}],
[1384,function initialize_1384(__studio33){
__studio33.v13Suites = {comparisonstudio:['textdiff','jsondiff','xml','excel','reconciliation'],integrationstudio:['apirequest','composite','apiresponse','integrationtests'],imagestudio:['images','annotation','imagecolors','contactsheet'],formsworkspace:['formdesigner','responsedashboard']};

}],
[1394,function initialize_1394(__studio33){
__studio33.v13EditorDialog = document.createElement('dialog');

}],
[1398,function initialize_1398(__studio33){
__studio33.v13EditorHeader = __studio33.csText('header','');
__studio33.v13EditorTitle = __studio33.csText('h3','Editor');

}],
[1402,function initialize_1402(__studio33){
__studio33.v13Focused = null;

}],
[1406,function initialize_1406(__studio33){
__studio33.v13Editors = new Map();

}],
[1409,function initialize_1409(__studio33){
__studio33.v13Reviews = new Map();

}],
[1410,function initialize_1410(__studio33){
__studio33.v13RcSignature = '';

}],
[1411,function initialize_1411(__studio33){
__studio33.v13RcInputs = __studio33.$fn(()=>JSON.stringify(['rcLeft','rcRight','rcKeys','rcColumns','rcTolerance','rcNumeric'].map(__studio33.$fn(id=>__studio33.$(id).value,"id=>$(id).value","")).concat(['rcTrim','rcIgnoreCase'].map(__studio33.$fn(id=>__studio33.$(id).checked,"id=>$(id).checked","")))),"()=>JSON.stringify(['rcLeft','rcRight','rcKeys','rcColumns','rcTolerance','rcNumeric'].map(id=>$(id).value).concat(['rcTrim','rcIgnoreCase'].map(id=>$(id).checked)))","v13RcInputs");

}],
[1412,function initialize_1412(__studio33){
__studio33.v13RcRunAction = __studio33.$('rcRun').onclick;

}],
[1421,function initialize_1421(__studio33){
__studio33.v13LegacyMappings = __studio33.rcMappings;

}],
[1423,function initialize_1423(__studio33){
__studio33.v13Mapping = __studio33.csText('div','','v13-mapping');

}],
[1426,function initialize_1426(__studio33){
__studio33.v13KeyRows = __studio33.csText('div','');
__studio33.v13ColumnRows = __studio33.csText('div','');

}],
[1431,function initialize_1431(__studio33){
__studio33.v13MappingSignature = '';

}],
[1440,function initialize_1440(__studio33){
__studio33.v13Dedupe = document.createElement('details');

}],
[1444,function initialize_1444(__studio33){
__studio33.v13DedupeColumns = __studio33.csText('div','','v12-checkbox-grid');

}],
[1448,function initialize_1448(__studio33){
__studio33.v13Preview = __studio33.csText('div','','v13-preview');

}],
[1452,function initialize_1452(__studio33){
__studio33.v13Pending = null;
__studio33.v13DedupeSignature = '';

}],
[1457,function initialize_1457(__studio33){
__studio33.v13OldDWRender = __studio33.dwRender;

}],
[1464,function initialize_1464(__studio33){
__studio33.v13Calendar = document.createElement('details');

}],
[1486,function initialize_1486(__studio33){
__studio33.v13OldKNValidate = __studio33.knValidate;

}],
[1496,function initialize_1496(__studio33){
__studio33.v13OldTaskFields = __studio33.v12TaskFields;

}],
[1498,function initialize_1498(__studio33){
__studio33.v13OldTaskSubmit = __studio33.$('knTaskForm').onsubmit;

}],
[1505,function initialize_1505(__studio33){
__studio33.v13OldKNEdit = __studio33.knEdit;

}],
[1508,function initialize_1508(__studio33){
__studio33.v13Zoom = __studio33.csText('div','','v13-zoom');

}],
[1512,function initialize_1512(__studio33){
__studio33.v13ConflictPanel = __studio33.csText('div','','v13-conflicts');

}],
[1517,function initialize_1517(__studio33){
__studio33.v13ZoomSettings = {day:{days:90,unit:32},week:{days:366,unit:8},month:{days:1096,unit:3}};

}],
[1523,function initialize_1523(__studio33){
__studio33.v13OldKNRender = __studio33.knRender;

}],
[1524,function initialize_1524(__studio33){
__studio33.v13CalendarBoard = '';
__studio33.v13TimelineBoard = '';

}]
];

return {id,register,steps};
})(),
(()=>{
// core/device · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
const id="core/device";
function register(__studio33){
__studio33.u19Check = __studio33.$fn((function u19Check(value){
 if(!value||value.version!==1||!['auto','desktop','mobile','tv'].includes(value.layout)||!['auto','full','reduced','off'].includes(value.motion)||!['auto','13','15','18','22','26'].includes(value.editorSize)||typeof value.wrap!=='boolean')throw Error('Invalid device preferences');
 if(!value.remote||typeof value.remote!=='object'||Array.isArray(value.remote)||JSON.stringify(value.remote).length>2000)throw Error('Invalid remote preferences');
 const tokens=new Set();for(const [name,key]of Object.entries(value.remote)){if(!['up','down','left','right','activate','normal'].includes(name)||!key||typeof key.key!=='string'||typeof key.code!=='string'||key.key.length>80||key.code.length>80||!Number.isInteger(key.keyCode)||key.keyCode<0||key.keyCode>65535||tokens.has(JSON.stringify(key)))throw Error('Invalid or duplicate remote key');tokens.add(JSON.stringify(key))}
 const boardViews=value.boardViews||{};for(const [layout,mode]of Object.entries(boardViews))if(!['desktop','mobile','tv'].includes(layout)||!['board','list'].includes(mode))throw Error('Invalid board view preference');
 return {version:1,layout:value.layout,motion:value.motion,editorSize:value.editorSize,wrap:value.wrap,remote:__studio33.csClone(value.remote),boardViews:{...boardViews}};
}),"function u19Check(value){\n if(!value||value.version!==1||!['auto','desktop','mobile','tv'].includes(value.layout)||!['auto','full','reduced','off'].includes(value.motion)||!['auto','13','15','18','22','26'].includes(value.editorSize)||typeof value.wrap!=='boolean')throw Error('Invalid device preferences');\n if(!value.remote||typeof value.remote!=='object'||Array.isArray(value.remote)||JSON.stringify(value.remote).length>2000)throw Error('Invalid remote preferences');\n const tokens=new Set();for(const [name,key]of Object.entries(value.remote)){if(!['up','down','left','right','activate','normal'].includes(name)||!key||typeof key.key!=='string'||typeof key.code!=='string'||key.key.length>80||key.code.length>80||!Number.isInteger(key.keyCode)||key.keyCode<0||key.keyCode>65535||tokens.has(JSON.stringify(key)))throw Error('Invalid or duplicate remote key');tokens.add(JSON.stringify(key))}\n const boardViews=value.boardViews||{};for(const [layout,mode]of Object.entries(boardViews))if(!['desktop','mobile','tv'].includes(layout)||!['board','list'].includes(mode))throw Error('Invalid board view preference');\n return {version:1,layout:value.layout,motion:value.motion,editorSize:value.editorSize,wrap:value.wrap,remote:csClone(value.remote),boardViews:{...boardViews}};\n}","u19Check");

__studio33.u19Save = __studio33.$fn((function u19Save(){__studio33.csPersist(__studio33.u19Key,__studio33.u19State)}),"function u19Save(){csPersist(u19Key,u19State)}","u19Save");

__studio33.u19AutoLayout = (function u19AutoLayout(){const ua=navigator.userAgent||'';if(/SmartTV|SMART-TV|Tizen|Web0S|WebOS|HbbTV|GoogleTV|Android TV|AFT[A-Z]/i.test(ua))return 'tv';const narrow=matchMedia('(max-width:750px)').matches,coarse=matchMedia('(pointer:coarse)').matches;return narrow||(coarse&&Math.min(screen.width||innerWidth,innerWidth)<=950)?'mobile':'desktop'});

__studio33.u19Motion = __studio33.$fn((function u19Motion(){return __studio33.u19State.motion==='off'?'off':__studio33.u19State.motion==='reduced'||matchMedia('(prefers-reduced-motion:reduce)').matches?'reduced':__studio33.u19State.motion==='full'?'full':__studio33.u19Layout==='tv'?'reduced':'full'}),"function u19Motion(){return u19State.motion==='off'?'off':u19State.motion==='reduced'||matchMedia('(prefers-reduced-motion:reduce)').matches?'reduced':u19State.motion==='full'?'full':u19Layout==='tv'?'reduced':'full'}","u19Motion");

__studio33.u19ScrollBehaviour = __studio33.$fn((function u19ScrollBehaviour(){return __studio33.u19Motion()==='full'?'smooth':'auto'}),"function u19ScrollBehaviour(){return u19Motion()==='full'?'smooth':'auto'}","u19ScrollBehaviour");

__studio33.u19Option = __studio33.$fn((function u19Option(parent,id,label,options){const wrap=__studio33.csText('label','','field'),select=document.createElement('select');select.id=id;select.setAttribute('aria-label',label);wrap.append(__studio33.csText('span',label),select);for(const [value,text]of options)select.append(new Option(text,value));parent.append(wrap);return select}),"function u19Option(parent,id,label,options){const wrap=csText('label','','field'),select=document.createElement('select');select.id=id;select.setAttribute('aria-label',label);wrap.append(csText('span',label),select);for(const [value,text]of options)select.append(new Option(text,value));parent.append(wrap);return select}","u19Option");

__studio33.u19Button = __studio33.$fn((function u19Button(label,fn,id){const b=__studio33.csButton(label,fn);if(id)b.id=id;__studio33.u17SetRole(b,'utility');return b}),"function u19Button(label,fn,id){const b=csButton(label,fn);if(id)b.id=id;u17SetRole(b,'utility');return b}","u19Button");

__studio33.u19Dialog = __studio33.$fn((function u19Dialog(id,title){const d=document.createElement('dialog');d.id=id;d.className='u19-dialog';d.setAttribute('aria-label',title);const header=__studio33.csText('header','');header.append(__studio33.csText('h2',title),__studio33.u19Button('Close',()=>d.close(),id+'Close'));d.append(header);document.body.append(d);return d}),"function u19Dialog(id,title){const d=document.createElement('dialog');d.id=id;d.className='u19-dialog';d.setAttribute('aria-label',title);const header=csText('header','');header.append(csText('h2',title),u19Button('Close',()=>d.close(),id+'Close'));d.append(header);document.body.append(d);return d}","u19Dialog");

__studio33.u19MappingLabels = __studio33.$fn((function u19MappingLabels(){for(const [action,e]of Object.entries(__studio33.u19RemoteText)){const k=__studio33.u19State.remote[action];e.textContent=k?((k.key&&k.key!=='Unidentified'?k.key:k.code||'Key code '+k.keyCode)+' · custom'):'Default'}}),"function u19MappingLabels(){for(const [action,e]of Object.entries(u19RemoteText)){const k=u19State.remote[action];e.textContent=k?((k.key&&k.key!=='Unidentified'?k.key:k.code||'Key code '+k.keyCode)+' · custom'):'Default'}}","u19MappingLabels");

__studio33.u19OpenDialog = __studio33.$fn((function u19OpenDialog(dialog,focus){__studio33.u19DialogFocus.set(dialog,document.activeElement);if(!dialog.open)dialog.showModal();(focus||dialog.querySelector('button,summary,select'))?.focus();__studio33.u19SyncExit()}),"function u19OpenDialog(dialog,focus){u19DialogFocus.set(dialog,document.activeElement);if(!dialog.open)dialog.showModal();(focus||dialog.querySelector('button,summary,select'))?.focus();u19SyncExit()}","u19OpenDialog");

__studio33.u19OpenSettings = __studio33.$fn((function u19OpenSettings(){__studio33.u19SyncSettings();__studio33.u19OpenDialog(__studio33.u19Settings,__studio33.u19LayoutPicker)}),"function u19OpenSettings(){u19SyncSettings();u19OpenDialog(u19Settings,u19LayoutPicker)}","u19OpenSettings");

__studio33.u19SyncSettings = __studio33.$fn((function u19SyncSettings(){__studio33.u19LayoutPicker.value=__studio33.u19State.layout;__studio33.u19MotionPicker.value=__studio33.u19State.motion;__studio33.u19TextPicker.value=__studio33.u19State.editorSize;__studio33.u19WrapPicker.value=__studio33.u19State.wrap?'on':'off';__studio33.u19MappingLabels();__studio33.u19DeviceStatus.textContent='Current layout: '+__studio33.u19Layout+'. '+(__studio33.u19State.layout==='auto'?'Auto uses display and input capabilities; wide desktops stay Desktop.':'Your layout choice is remembered.')}),"function u19SyncSettings(){u19LayoutPicker.value=u19State.layout;u19MotionPicker.value=u19State.motion;u19TextPicker.value=u19State.editorSize;u19WrapPicker.value=u19State.wrap?'on':'off';u19MappingLabels();u19DeviceStatus.textContent='Current layout: '+u19Layout+'. '+(u19State.layout==='auto'?'Auto uses display and input capabilities; wide desktops stay Desktop.':'Your layout choice is remembered.')}","u19SyncSettings");

__studio33.u19Apply = __studio33.$fn((function u19Apply(){const previous=__studio33.u19Layout;__studio33.u19Layout=__studio33.u19State.layout==='auto'?__studio33.u19AutoLayout():__studio33.u19State.layout;__studio33.u19Root.dataset.deviceLayout=__studio33.u19Layout;__studio33.u19Root.dataset.motion=__studio33.u19Motion();__studio33.u19Root.dataset.editorWrap=__studio33.u19State.wrap?'on':'off';__studio33.u19Root.style.setProperty('--u19-editor-size',(__studio33.u19State.editorSize==='auto'?(__studio33.u19Layout==='tv'?20:__studio33.u19Layout==='mobile'?15:14):Number(__studio33.u19State.editorSize))+'px');const title=__studio33.u19Layout[0].toUpperCase()+__studio33.u19Layout.slice(1);__studio33.u19DeviceButton.textContent=title+' · Display';__studio33.$('commandToggle').textContent=__studio33.u19Layout==='mobile'?'Find tool':'Find tool';__studio33.$('commandToggle').setAttribute('aria-label','Find a tool');
 if(previous!==__studio33.u19Layout){__studio33.$('knView').value=__studio33.u19State.boardViews[__studio33.u19Layout]||(__studio33.u19Layout==='mobile'?'list':'board');__studio33.knRender();__studio33.u19StopEditing();__studio33.u19InstallRowButtons();if(__studio33.u19Layout==='tv'&&!__studio33.u19IsEditable(document.activeElement))__studio33.u19DeviceButton.focus({preventScroll:true})}
 __studio33.u19SyncSettings();__studio33.u19Viewport();for(const wrap of document.querySelectorAll('.u19-wrap-toggle'))wrap.checked=__studio33.u19State.wrap;__studio33.u19SyncExit();__studio33.u19DirtyLayout=false;
}),"function u19Apply(){const previous=u19Layout;u19Layout=u19State.layout==='auto'?u19AutoLayout():u19State.layout;u19Root.dataset.deviceLayout=u19Layout;u19Root.dataset.motion=u19Motion();u19Root.dataset.editorWrap=u19State.wrap?'on':'off';u19Root.style.setProperty('--u19-editor-size',(u19State.editorSize==='auto'?(u19Layout==='tv'?20:u19Layout==='mobile'?15:14):Number(u19State.editorSize))+'px');const title=u19Layout[0].toUpperCase()+u19Layout.slice(1);u19DeviceButton.textContent=title+' · Display';$('commandToggle').textContent=u19Layout==='mobile'?'Find tool':'Find tool';$('commandToggle').setAttribute('aria-label','Find a tool');\n if(previous!==u19Layout){$('knView').value=u19State.boardViews[u19Layout]||(u19Layout==='mobile'?'list':'board');knRender();u19StopEditing();u19InstallRowButtons();if(u19Layout==='tv'&&!u19IsEditable(document.activeElement))u19DeviceButton.focus({preventScroll:true})}\n u19SyncSettings();u19Viewport();for(const wrap of document.querySelectorAll('.u19-wrap-toggle'))wrap.checked=u19State.wrap;u19SyncExit();u19DirtyLayout=false;\n}","u19Apply");

__studio33.u19Resize = __studio33.$fn((function u19Resize(){if(__studio33.u19ResizeFrame)return;__studio33.u19ResizeFrame=requestAnimationFrame(__studio33.$fn(()=>{__studio33.u19ResizeFrame=0;if(__studio33.u19State.layout==='auto'&&__studio33.u19AutoLayout()!==__studio33.u19Layout)__studio33.u19Apply();else __studio33.u19Viewport()},"()=>{u19ResizeFrame=0;if(u19State.layout==='auto'&&u19AutoLayout()!==u19Layout)u19Apply();else u19Viewport()}",""))}),"function u19Resize(){if(u19ResizeFrame)return;u19ResizeFrame=requestAnimationFrame(()=>{u19ResizeFrame=0;if(u19State.layout==='auto'&&u19AutoLayout()!==u19Layout)u19Apply();else u19Viewport()})}","u19Resize");

__studio33.u19Viewport = __studio33.$fn((function u19Viewport(){const viewport=window.visualViewport;__studio33.u19Root.style.setProperty('--u19-viewport',(viewport?.height||innerHeight)+'px');const typing=__studio33.u19IsEditable(document.activeElement),keyboard=__studio33.u19Layout==='mobile'&&typing&&!!viewport&&innerHeight-viewport.height>140;__studio33.u19Root.dataset.u19Keyboard=keyboard?'open':'closed';if(keyboard)requestAnimationFrame(()=>document.activeElement?.scrollIntoView({block:'nearest'}))}),"function u19Viewport(){const viewport=window.visualViewport;u19Root.style.setProperty('--u19-viewport',(viewport?.height||innerHeight)+'px');const typing=u19IsEditable(document.activeElement),keyboard=u19Layout==='mobile'&&typing&&!!viewport&&innerHeight-viewport.height>140;u19Root.dataset.u19Keyboard=keyboard?'open':'closed';if(keyboard)requestAnimationFrame(()=>document.activeElement?.scrollIntoView({block:'nearest'}))}","u19Viewport");

__studio33.u19Snapshot = __studio33.$fn((function u19Snapshot(){return {focus:document.activeElement,x:scrollX,y:scrollY,cardTop:__studio33.u19Card.scrollTop,cardLeft:__studio33.u19Card.scrollLeft,scrolls:[...document.querySelectorAll('.u19-media-viewport,#dwGrid,.json-editors,.v13-review')].map(e=>({e,top:e.scrollTop,left:e.scrollLeft}))}}),"function u19Snapshot(){return {focus:document.activeElement,x:scrollX,y:scrollY,cardTop:u19Card.scrollTop,cardLeft:u19Card.scrollLeft,scrolls:[...document.querySelectorAll('.u19-media-viewport,#dwGrid,.json-editors,.v13-review')].map(e=>({e,top:e.scrollTop,left:e.scrollLeft}))}}","u19Snapshot");

__studio33.u19Restore = __studio33.$fn((function u19Restore(s){if(!s)return;requestAnimationFrame(__studio33.$fn(()=>{let focus=s.focus;const closed=focus?.closest('details:not([open])');if(closed)focus=closed.querySelector(':scope>summary');if(focus?.isConnected&&__studio33.u19Visible(focus))focus.focus({preventScroll:true});window.scrollTo(s.x,s.y);__studio33.u19Card.scrollTop=s.cardTop;__studio33.u19Card.scrollLeft=s.cardLeft;for(const r of s.scrolls)if(r.e.isConnected){r.e.scrollTop=r.top;r.e.scrollLeft=r.left}},"()=>{let focus=s.focus;const closed=focus?.closest('details:not([open])');if(closed)focus=closed.querySelector(':scope>summary');if(focus?.isConnected&&u19Visible(focus))focus.focus({preventScroll:true});window.scrollTo(s.x,s.y);u19Card.scrollTop=s.cardTop;u19Card.scrollLeft=s.cardLeft;for(const r of s.scrolls)if(r.e.isConnected){r.e.scrollTop=r.top;r.e.scrollLeft=r.left}}",""))}),"function u19Restore(s){if(!s)return;requestAnimationFrame(()=>{let focus=s.focus;const closed=focus?.closest('details:not([open])');if(closed)focus=closed.querySelector(':scope>summary');if(focus?.isConnected&&u19Visible(focus))focus.focus({preventScroll:true});window.scrollTo(s.x,s.y);u19Card.scrollTop=s.cardTop;u19Card.scrollLeft=s.cardLeft;for(const r of s.scrolls)if(r.e.isConnected){r.e.scrollTop=r.top;r.e.scrollLeft=r.left}})}","u19Restore");

__studio33.u19Modal = (function u19Modal(){const dialogs=[...document.querySelectorAll('dialog[open]')];return dialogs.at(-1)||null});

__studio33.u19StageExit = __studio33.$fn((function u19StageExit(){const stage=__studio33.$('ptStage');stage.classList.remove('u19-stage-expanded');document.body.style.overflow=__studio33.editorFullScreen?'hidden':'';__studio33.u19Restore(__studio33.u19StageSnapshot);__studio33.u19StageSnapshot=null;__studio33.$('ptFull').textContent='Fullscreen';__studio33.$('ptFull').setAttribute('aria-pressed','false');__studio33.u19SyncExit()}),"function u19StageExit(){const stage=$('ptStage');stage.classList.remove('u19-stage-expanded');document.body.style.overflow=editorFullScreen?'hidden':'';u19Restore(u19StageSnapshot);u19StageSnapshot=null;$('ptFull').textContent='Fullscreen';$('ptFull').setAttribute('aria-pressed','false');u19SyncExit()}","u19StageExit");

__studio33.u19SyncExit = __studio33.$fn((function u19SyncExit(){const modal=__studio33.u19Modal(),native=document.fullscreenElement,expandedReader=typeof __studio33.u19Reader!=='undefined'&&__studio33.u19Reader.open&&__studio33.u19Reader.classList.contains('u19-expanded'),stage=__studio33.$('ptStage').classList.contains('u19-stage-expanded');const expanded=__studio33.editorFullScreen||!!__studio33.v13Focused||!!native||stage||expandedReader;const parent=modal||native||(stage?__studio33.$('ptStage'):__studio33.u19Card);if(__studio33.u19Exit.parentElement!==parent)parent.append(__studio33.u19Exit);if(__studio33.u19Exit.hidden===expanded)__studio33.u19Exit.hidden=!expanded;__studio33.u19Root.classList.toggle('u19-has-expanded',expanded);if(!expanded&&__studio33.u19Exit.parentElement!==__studio33.u19Card)__studio33.u19Card.append(__studio33.u19Exit)}),"function u19SyncExit(){const modal=u19Modal(),native=document.fullscreenElement,expandedReader=typeof u19Reader!=='undefined'&&u19Reader.open&&u19Reader.classList.contains('u19-expanded'),stage=$('ptStage').classList.contains('u19-stage-expanded');const expanded=editorFullScreen||!!v13Focused||!!native||stage||expandedReader;const parent=modal||native||(stage?$('ptStage'):u19Card);if(u19Exit.parentElement!==parent)parent.append(u19Exit);if(u19Exit.hidden===expanded)u19Exit.hidden=!expanded;u19Root.classList.toggle('u19-has-expanded',expanded);if(!expanded&&u19Exit.parentElement!==u19Card)u19Card.append(u19Exit)}","u19SyncExit");

__studio33.u19ExitCurrent = __studio33.$fn((async function u19ExitCurrent(){__studio33.u19StopEditing();if(__studio33.v13Focused){__studio33.v13CloseEditor();return}if(__studio33.u19Reader.open){__studio33.u19Reader.close();return}const modal=__studio33.u19Modal();if(modal){modal.close();__studio33.u19SyncExit();return}if(document.fullscreenElement){try{await document.exitFullscreen()}catch{__studio33.toast('Use the browser fullscreen exit control')}return}if(__studio33.$('ptStage').classList.contains('u19-stage-expanded')){__studio33.u19StageExit();return}if(__studio33.editorFullScreen)__studio33.setEditorFullScreen(false)}),"async function u19ExitCurrent(){u19StopEditing();if(v13Focused){v13CloseEditor();return}if(u19Reader.open){u19Reader.close();return}const modal=u19Modal();if(modal){modal.close();u19SyncExit();return}if(document.fullscreenElement){try{await document.exitFullscreen()}catch{toast('Use the browser fullscreen exit control')}return}if($('ptStage').classList.contains('u19-stage-expanded')){u19StageExit();return}if(editorFullScreen)setEditorFullScreen(false)}","u19ExitCurrent");

__studio33.u19IsEditable = (function u19IsEditable(e){return !!e&&(e.matches('textarea,select,input:not([type=checkbox]):not([type=radio]):not([type=button]):not([type=submit]):not([type=file]):not([type=color])')||e.isContentEditable)});

__studio33.u19StopEditing = __studio33.$fn((function u19StopEditing(){if(__studio33.u19Editing)delete __studio33.u19Editing.dataset.u19Editing;__studio33.u19Editing=null}),"function u19StopEditing(){if(u19Editing)delete u19Editing.dataset.u19Editing;u19Editing=null}","u19StopEditing");

__studio33.u19KeyToken = (function u19KeyToken(e){return {key:e.key||'',code:e.code||'',keyCode:e.keyCode||0}});

__studio33.u19Mapped = __studio33.$fn((function u19Mapped(e){for(const [action,key]of Object.entries(__studio33.u19State.remote)){if(key.code?e.code===key.code:key.key&&key.key!=='Unidentified'?e.key===key.key:(e.keyCode||0)===key.keyCode)return action}return null}),"function u19Mapped(e){for(const [action,key]of Object.entries(u19State.remote)){if(key.code?e.code===key.code:key.key&&key.key!=='Unidentified'?e.key===key.key:(e.keyCode||0)===key.keyCode)return action}return null}","u19Mapped");

__studio33.u19Visible = (function u19Visible(e){for(let d=e.closest('details');d;d=d.parentElement?.closest('details'))if(!d.open&&!d.querySelector(':scope>summary')?.contains(e))return false;return !e.disabled&&e.getAttribute('aria-disabled')!=='true'&&e.tabIndex>=0&&!e.closest('[hidden],[inert]')&&e.getClientRects().length>0&&getComputedStyle(e).visibility!=='hidden'});

__studio33.u19Scope = __studio33.$fn((function u19Scope(){return __studio33.u19Modal()||(!__studio33.$('commandOverlay').hidden?__studio33.$('commandOverlay'):document.fullscreenElement||(__studio33.$('ptStage').classList.contains('u19-stage-expanded')?__studio33.$('ptStage'):__studio33.editorFullScreen?__studio33.u19Card:document))}),"function u19Scope(){return u19Modal()||(!$('commandOverlay').hidden?$('commandOverlay'):document.fullscreenElement||($('ptStage').classList.contains('u19-stage-expanded')?$('ptStage'):editorFullScreen?u19Card:document))}","u19Scope");

__studio33.u19Focusable = __studio33.$fn((function u19Focusable(){return [...__studio33.u19Scope().querySelectorAll('button,input,select,textarea,summary,a[href],[tabindex]')].filter(__studio33.u19Visible)}),"function u19Focusable(){return [...u19Scope().querySelectorAll('button,input,select,textarea,summary,a[href],[tabindex]')].filter(u19Visible)}","u19Focusable");

__studio33.u19Navigate = __studio33.$fn((function u19Navigate(direction){const items=__studio33.u19Focusable();if(!items.length)return;const current=document.activeElement;if(!items.includes(current)){items[0].focus();return}const r=current.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;const vertical=direction==='up'||direction==='down',sign=direction==='up'||direction==='left'?-1:1;let winner=null,best=Infinity;for(const e of items){if(e===current)continue;const b=e.getBoundingClientRect(),x=b.left+b.width/2,y=b.top+b.height/2,primary=(vertical?y-cy:x-cx)*sign,secondary=Math.abs(vertical?x-cx:y-cy);if(primary<4)continue;const overlap=vertical?Math.min(r.right,b.right)-Math.max(r.left,b.left):Math.min(r.bottom,b.bottom)-Math.max(r.top,b.top);const score=primary+secondary*2.5+(overlap>0?0:200);if(score<best){winner=e;best=score}}if(winner){winner.focus({preventScroll:true});winner.scrollIntoView({block:'nearest',inline:'nearest',behavior:__studio33.u19ScrollBehaviour()})}else{const region=current.closest('.u19-media-viewport,#dwGrid,.v13-review,.cs-board');region?.scrollBy({left:vertical?0:sign*180,top:vertical?sign*180:0,behavior:__studio33.u19ScrollBehaviour()})}}),"function u19Navigate(direction){const items=u19Focusable();if(!items.length)return;const current=document.activeElement;if(!items.includes(current)){items[0].focus();return}const r=current.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;const vertical=direction==='up'||direction==='down',sign=direction==='up'||direction==='left'?-1:1;let winner=null,best=Infinity;for(const e of items){if(e===current)continue;const b=e.getBoundingClientRect(),x=b.left+b.width/2,y=b.top+b.height/2,primary=(vertical?y-cy:x-cx)*sign,secondary=Math.abs(vertical?x-cx:y-cy);if(primary<4)continue;const overlap=vertical?Math.min(r.right,b.right)-Math.max(r.left,b.left):Math.min(r.bottom,b.bottom)-Math.max(r.top,b.top);const score=primary+secondary*2.5+(overlap>0?0:200);if(score<best){winner=e;best=score}}if(winner){winner.focus({preventScroll:true});winner.scrollIntoView({block:'nearest',inline:'nearest',behavior:u19ScrollBehaviour()})}else{const region=current.closest('.u19-media-viewport,#dwGrid,.v13-review,.cs-board');region?.scrollBy({left:vertical?0:sign*180,top:vertical?sign*180:0,behavior:u19ScrollBehaviour()})}}","u19Navigate");

__studio33.u19MenuClose = __studio33.$fn((function u19MenuClose(){const find=[...document.querySelectorAll('.v13-find:not([hidden])')].at(-1);if(find){find.hidden=true;return true}const menus=[...document.querySelectorAll('.u17-editor-menu[open],.u17-view-menu[open],.studio-menu[open]')];if(menus.length){const d=menus.at(-1);d.open=false;d.querySelector('summary')?.focus();return true}if(!__studio33.$('themeMenu').hidden){__studio33.themeOpen(false);__studio33.$('themeToggle').focus();return true}return false}),"function u19MenuClose(){const find=[...document.querySelectorAll('.v13-find:not([hidden])')].at(-1);if(find){find.hidden=true;return true}const menus=[...document.querySelectorAll('.u17-editor-menu[open],.u17-view-menu[open],.studio-menu[open]')];if(menus.length){const d=menus.at(-1);d.open=false;d.querySelector('summary')?.focus();return true}if(!$('themeMenu').hidden){themeOpen(false);$('themeToggle').focus();return true}return false}","u19MenuClose");

__studio33.u19Back = __studio33.$fn((function u19Back(){if(__studio33.u19Editing){__studio33.u19StopEditing();return true}if(__studio33.u19MenuClose())return true;if(!__studio33.$('commandOverlay').hidden){__studio33.closeCommands();return true}const modal=__studio33.u19Modal();if(modal){if(modal===__studio33.v13EditorDialog)__studio33.v13CloseEditor();else modal.close();return true}if(document.fullscreenElement||__studio33.$('ptStage').classList.contains('u19-stage-expanded')||__studio33.editorFullScreen){__studio33.u19ExitCurrent();return true}return false}),"function u19Back(){if(u19Editing){u19StopEditing();return true}if(u19MenuClose())return true;if(!$('commandOverlay').hidden){closeCommands();return true}const modal=u19Modal();if(modal){if(modal===v13EditorDialog)v13CloseEditor();else modal.close();return true}if(document.fullscreenElement||$('ptStage').classList.contains('u19-stage-expanded')||editorFullScreen){u19ExitCurrent();return true}return false}","u19Back");

__studio33.u19Consume = (function u19Consume(e){e.preventDefault();e.stopImmediatePropagation()});

__studio33.u19CloneResult = __studio33.$fn((function u19CloneResult(node){if(node.tagName==='TEXTAREA'||node.tagName==='PRE'||node.tagName==='INPUT')return __studio33.csText('pre',node.value??node.textContent);if(node.tagName==='CANVAS'){const image=document.createElement('img');image.src=node.toDataURL();image.alt=node.getAttribute('aria-label')||'Result preview';image.style.maxWidth='100%';return image}const copy=node.cloneNode(true);for(const e of copy.querySelectorAll('input,select,textarea')){const value=e.type==='checkbox'?(e.checked?'Selected':'Not selected'):e.value||'';e.replaceWith(__studio33.csText('span',value))}copy.querySelectorAll('button,.v13-editor-tools,.u17-editor-controls,.u17-result-actions,.u19-view-actions,script,iframe').forEach(e=>e.remove());for(const e of [copy,...copy.querySelectorAll('*')]){e.removeAttribute('id');e.removeAttribute('tabindex');e.removeAttribute('hidden');for(const a of [...e.attributes])if(a.name.startsWith('on'))e.removeAttribute(a.name);if(e.tagName==='DETAILS')e.open=true}copy.style.maxHeight='none';return copy}),"function u19CloneResult(node){if(node.tagName==='TEXTAREA'||node.tagName==='PRE'||node.tagName==='INPUT')return csText('pre',node.value??node.textContent);if(node.tagName==='CANVAS'){const image=document.createElement('img');image.src=node.toDataURL();image.alt=node.getAttribute('aria-label')||'Result preview';image.style.maxWidth='100%';return image}const copy=node.cloneNode(true);for(const e of copy.querySelectorAll('input,select,textarea')){const value=e.type==='checkbox'?(e.checked?'Selected':'Not selected'):e.value||'';e.replaceWith(csText('span',value))}copy.querySelectorAll('button,.v13-editor-tools,.u17-editor-controls,.u17-result-actions,.u19-view-actions,script,iframe').forEach(e=>e.remove());for(const e of [copy,...copy.querySelectorAll('*')]){e.removeAttribute('id');e.removeAttribute('tabindex');e.removeAttribute('hidden');for(const a of [...e.attributes])if(a.name.startsWith('on'))e.removeAttribute(a.name);if(e.tagName==='DETAILS')e.open=true}copy.style.maxHeight='none';return copy}","u19CloneResult");

__studio33.u19ResultNodes = __studio33.$fn((function u19ResultNodes(id){const p=__studio33.$(id);if(!p)return [];const output=[...p.querySelectorAll('textarea[readonly]')].filter(e=>e.closest('section')===p&&!e.closest('details')&&e.id!=='lcCurlOutput');if(output.some(e=>e.value))return output.filter(e=>e.value);const ids={graph:['graphSvg','graphStatus'],calculator:['result','expression'],kanban:['knStats','knTasks'],dataworkbench:['dwSummary','dwGrid'],logs:['logSummary','logResults','logMetrics'],apiclient:['lcResponseMeta','lcResponseText'],finance:['financeResults','scheduleSummary','scheduleBody'],images:['imageSummary','imageCanvas'],annotation:['annCanvas'],contactsheet:['csCanvas'],colors:['colorResults']};const preferred=(ids[id]||[]).map(__studio33.$).filter(__studio33.$fn(e=>e&&__studio33.u19VisibleResult(e),"e=>e&&u19VisibleResult(e)",""));if(preferred.length)return preferred;return [...p.querySelectorAll('.metrics,.v13-review,.v9-results,.u18-report,.cs-stats,.cs-timer,canvas,svg')].filter(__studio33.$fn(e=>e.closest('section')===p&&!e.closest('details')&&__studio33.u19VisibleResult(e),"e=>e.closest('section')===p&&!e.closest('details')&&u19VisibleResult(e)","")).slice(0,6)}),"function u19ResultNodes(id){const p=$(id);if(!p)return [];const output=[...p.querySelectorAll('textarea[readonly]')].filter(e=>e.closest('section')===p&&!e.closest('details')&&e.id!=='lcCurlOutput');if(output.some(e=>e.value))return output.filter(e=>e.value);const ids={graph:['graphSvg','graphStatus'],calculator:['result','expression'],kanban:['knStats','knTasks'],dataworkbench:['dwSummary','dwGrid'],logs:['logSummary','logResults','logMetrics'],apiclient:['lcResponseMeta','lcResponseText'],finance:['financeResults','scheduleSummary','scheduleBody'],images:['imageSummary','imageCanvas'],annotation:['annCanvas'],contactsheet:['csCanvas'],colors:['colorResults']};const preferred=(ids[id]||[]).map($).filter(e=>e&&u19VisibleResult(e));if(preferred.length)return preferred;return [...p.querySelectorAll('.metrics,.v13-review,.v9-results,.u18-report,.cs-stats,.cs-timer,canvas,svg')].filter(e=>e.closest('section')===p&&!e.closest('details')&&u19VisibleResult(e)).slice(0,6)}","u19ResultNodes");

__studio33.u19VisibleResult = (function u19VisibleResult(e){return !e.closest('[hidden]')&&e.getClientRects().length>0&&(e.tagName==='CANVAS'||e.tagName==='SVG'||e.textContent.trim())});

__studio33.u19ReadResult = __studio33.$fn((function u19ReadResult(id){const nodes=__studio33.u19ResultNodes(id);__studio33.u19ReaderText.replaceChildren();if(!nodes.length){__studio33.toast('Generate a result first, then open Focus result.');return}__studio33.u19ReaderSnapshot=__studio33.u19Snapshot();__studio33.u19Reader.querySelector('h2').textContent=__studio33.views[id]+' · Result';let total=0;for(const node of nodes){total+=(node.value||node.textContent||'').length;if(total>200000){__studio33.u19ReaderText.append(__studio33.csText('p','This result is large. Use the original result/download for the complete content.'));break}try{const content=__studio33.u19CloneResult(node);if(content.matches('table')||content.querySelector('table')){const wrap=__studio33.csText('div','','u19-scroll-table');wrap.append(content);__studio33.u19ReaderText.append(wrap)}else __studio33.u19ReaderText.append(content)}catch{__studio33.u19ReaderText.append(__studio33.csText('p','This preview cannot be copied; inspect it in the original tool.'))}}const summary=__studio33.csText('div','Result from '+__studio33.views[id]+'. Viewing does not change your inputs or run the tool.','u19-result-summary');__studio33.u19ReaderText.prepend(summary);__studio33.u19OpenDialog(__studio33.u19Reader,__studio33.u19ReaderCopy);__studio33.u19SyncExit()}),"function u19ReadResult(id){const nodes=u19ResultNodes(id);u19ReaderText.replaceChildren();if(!nodes.length){toast('Generate a result first, then open Focus result.');return}u19ReaderSnapshot=u19Snapshot();u19Reader.querySelector('h2').textContent=views[id]+' · Result';let total=0;for(const node of nodes){total+=(node.value||node.textContent||'').length;if(total>200000){u19ReaderText.append(csText('p','This result is large. Use the original result/download for the complete content.'));break}try{const content=u19CloneResult(node);if(content.matches('table')||content.querySelector('table')){const wrap=csText('div','','u19-scroll-table');wrap.append(content);u19ReaderText.append(wrap)}else u19ReaderText.append(content)}catch{u19ReaderText.append(csText('p','This preview cannot be copied; inspect it in the original tool.'))}}const summary=csText('div','Result from '+views[id]+'. Viewing does not change your inputs or run the tool.','u19-result-summary');u19ReaderText.prepend(summary);u19OpenDialog(u19Reader,u19ReaderCopy);u19SyncExit()}","u19ReadResult");

__studio33.u19ShowRow = __studio33.$fn((function u19ShowRow(index,open=true){const row=__studio33.dwTable.rows[index];if(!row)return;__studio33.u19RowIndex=index;__studio33.u19RowOrder=__studio33.dwVisible().map(x=>x.i);__studio33.u19RowDialog.querySelector('h2').textContent='Table row '+(index+1);__studio33.u19RowFields.replaceChildren();for(let j=0;j<__studio33.dwTable.columns.length;j++){const dt=__studio33.csText('dt',__studio33.dwTable.columns[j]),dd=__studio33.csText('dd',row[j].value);dd.append(__studio33.csText('small','Stored type: '+row[j].type));__studio33.u19RowFields.append(dt,dd)}const at=__studio33.u19RowOrder.indexOf(index);__studio33.u19RowPrev.disabled=at<=0;__studio33.u19RowNext.disabled=at>=__studio33.u19RowOrder.length-1;if(open)__studio33.u19OpenDialog(__studio33.u19RowDialog,__studio33.u19RowDialog.querySelector('button'))}),"function u19ShowRow(index,open=true){const row=dwTable.rows[index];if(!row)return;u19RowIndex=index;u19RowOrder=dwVisible().map(x=>x.i);u19RowDialog.querySelector('h2').textContent='Table row '+(index+1);u19RowFields.replaceChildren();for(let j=0;j<dwTable.columns.length;j++){const dt=csText('dt',dwTable.columns[j]),dd=csText('dd',row[j].value);dd.append(csText('small','Stored type: '+row[j].type));u19RowFields.append(dt,dd)}const at=u19RowOrder.indexOf(index);u19RowPrev.disabled=at<=0;u19RowNext.disabled=at>=u19RowOrder.length-1;if(open)u19OpenDialog(u19RowDialog,u19RowDialog.querySelector('button'))}","u19ShowRow");

__studio33.u19InstallRowButtons = __studio33.$fn((function u19InstallRowButtons(){for(const row of document.querySelectorAll('#dwGrid tbody tr[data-row]')){if(row.querySelector('.u19-row-open'))continue;const cell=row.querySelector('td');if(!cell)continue;const b=__studio33.u19Button('Details',__studio33.$fn(()=>__studio33.u19ShowRow(Number(row.dataset.row)),"()=>u19ShowRow(Number(row.dataset.row))",""));b.className+=' u19-row-open';b.setAttribute('aria-label','Details for data row '+(Number(row.dataset.row)+1));cell.append(b)}}),"function u19InstallRowButtons(){for(const row of document.querySelectorAll('#dwGrid tbody tr[data-row]')){if(row.querySelector('.u19-row-open'))continue;const cell=row.querySelector('td');if(!cell)continue;const b=u19Button('Details',()=>u19ShowRow(Number(row.dataset.row)));b.className+=' u19-row-open';b.setAttribute('aria-label','Details for data row '+(Number(row.dataset.row)+1));cell.append(b)}}","u19InstallRowButtons");
}
const steps=[
[2451,function initialize_2451(__studio33){
__studio33.u19Key = 'calc-studio-device-v19';

}],
[2452,function initialize_2452(__studio33){
__studio33.u19Defaults = {version:1,layout:'auto',motion:'auto',editorSize:'auto',wrap:true,remote:{},boardViews:{}};

}],
[2454,function initialize_2454(__studio33){
__studio33.u19State = undefined;

}],
[2456,function initialize_2456(__studio33){
__studio33.u19Root = document.documentElement;
__studio33.u19Card = document.querySelector('.main-card');

}],
[2457,function initialize_2457(__studio33){
__studio33.u19Layout = '';
__studio33.u19Learn = '';
__studio33.u19DirtyLayout = false;

}],
[2465,function initialize_2465(__studio33){
__studio33.u19Settings = __studio33.u19Dialog('u19Settings','Device & display');

}],
[2467,function initialize_2467(__studio33){
__studio33.u19LayoutPicker = __studio33.u19Option(__studio33.u19Settings,'u19Layout','Layout',[['auto','Auto — adapt to device'],['desktop','Desktop'],['mobile','Mobile'],['tv','TV — remote navigation']]);

}],
[2468,function initialize_2468(__studio33){
__studio33.u19MotionPicker = __studio33.u19Option(__studio33.u19Settings,'u19Motion','Motion',[['auto','Auto — animated; reduced on TV'],['full','Animated — full theme effects, including TV'],['reduced','Reduced — static effects'],['off','Off — no animation or transitions']]);

}],
[2469,function initialize_2469(__studio33){
__studio33.u19TextPicker = __studio33.u19Option(__studio33.u19Settings,'u19Text','Editor text size',[['auto','Auto — fit the selected layout'],['13','Compact · 13 px'],['15','Standard · 15 px'],['18','Large · 18 px'],['22','Extra large · 22 px'],['26','Presentation · 26 px']]);

}],
[2470,function initialize_2470(__studio33){
__studio33.u19WrapPicker = __studio33.u19Option(__studio33.u19Settings,'u19Wrap','Editor line wrapping',[['on','Wrap long lines'],['off','Keep lines; scroll horizontally']]);

}],
[2471,function initialize_2471(__studio33){
__studio33.u19DeviceStatus = __studio33.csText('p','','u19-settings-note');

}],
[2474,function initialize_2474(__studio33){
__studio33.u19RemoteBox = __studio33.csText('details','','details-box');

}],
[2476,function initialize_2476(__studio33){
__studio33.u19KeyStatus = __studio33.csText('p','Press a remote key while this panel is open.','u19-settings-note');

}],
[2480,function initialize_2480(__studio33){
__studio33.u19RemoteLabels = {up:'Move up',down:'Move down',left:'Move left',right:'Move right',activate:'OK / activate',normal:'Normal view'};

}],
[2481,function initialize_2481(__studio33){
__studio33.u19RemoteText = {};

}],
[2486,function initialize_2486(__studio33){
__studio33.u19DeviceButton = __studio33.u19Button('Device & display',__studio33.$fn(()=>__studio33.u19OpenSettings(),"()=>u19OpenSettings()",""),'u19DeviceButton');

}],
[2490,function initialize_2490(__studio33){
__studio33.u19DialogFocus = new WeakMap();

}],
[2498,function initialize_2498(__studio33){
__studio33.u19ResizeFrame = 0;

}],
[2507,function initialize_2507(__studio33){
__studio33.u19ThemePrevious = __studio33.setTheme;

}],
[2509,function initialize_2509(__studio33){
__studio33.u19Exit = __studio33.u19Button('↙ Normal view',__studio33.$fn(()=>__studio33.u19ExitCurrent(),"()=>u19ExitCurrent()",""),'u19Exit');

}],
[2514,function initialize_2514(__studio33){
__studio33.u19AppSnapshot = null;
__studio33.u19EditorSnapshot = null;
__studio33.u19StageSnapshot = null;
__studio33.u19ReaderSnapshot = null;
__studio33.u19NativeClosing = false;

}],
[2517,function initialize_2517(__studio33){
__studio33.u19OldAppFullscreen = __studio33.setEditorFullScreen;

}],
[2519,function initialize_2519(__studio33){
__studio33.u19OldCloseEditor = __studio33.v13CloseEditor;

}],
[2524,function initialize_2524(__studio33){
__studio33.u19OldEditorHeaderButton = __studio33.v13EditorHeader.querySelector('button');

}],
[2534,function initialize_2534(__studio33){
__studio33.u19Editing = null;

}],
[2548,function initialize_2548(__studio33){
__studio33.u19OldCommands = __studio33.showCommands;

}],
[2551,function initialize_2551(__studio33){
__studio33.u19Reader = __studio33.u19Dialog('u19Reader','Focused result');

}],
[2553,function initialize_2553(__studio33){
__studio33.u19ReaderActions = __studio33.csText('div','','u19-view-actions');

}],
[2554,function initialize_2554(__studio33){
__studio33.u19ReaderText = __studio33.csText('div','','u19-reading-content');

}],
[2557,function initialize_2557(__studio33){
__studio33.u19ReaderCopy = __studio33.u19Button('Copy result',__studio33.$fn(()=>__studio33.copyText(__studio33.u19ReaderText.innerText),"()=>copyText(u19ReaderText.innerText)",""),'u19ReaderCopy');

}],
[2565,function initialize_2565(__studio33){
__studio33.u19ZoomAreas = [];

}],
[2568,function initialize_2568(__studio33){
__studio33.u19RowDialog = __studio33.u19Dialog('u19RowDialog','Table row details');
__studio33.u19RowFields = document.createElement('dl');

}],
[2571,function initialize_2571(__studio33){
__studio33.u19RowTools = __studio33.csText('div','','u19-row-tools');

}],
[2572,function initialize_2572(__studio33){
__studio33.u19RowIndex = 0;
__studio33.u19RowOrder = [];

}],
[2573,function initialize_2573(__studio33){
__studio33.u19RowPrev = __studio33.u19Button('Previous row',__studio33.$fn(()=>__studio33.u19ShowRow(__studio33.u19RowOrder[Math.max(0,__studio33.u19RowOrder.indexOf(__studio33.u19RowIndex)-1)],false),"()=>u19ShowRow(u19RowOrder[Math.max(0,u19RowOrder.indexOf(u19RowIndex)-1)],false)",""),'u19RowPrev');
__studio33.u19RowNext = __studio33.u19Button('Next row',__studio33.$fn(()=>__studio33.u19ShowRow(__studio33.u19RowOrder[Math.min(__studio33.u19RowOrder.length-1,__studio33.u19RowOrder.indexOf(__studio33.u19RowIndex)+1)],false),"()=>u19ShowRow(u19RowOrder[Math.min(u19RowOrder.length-1,u19RowOrder.indexOf(u19RowIndex)+1)],false)",""),'u19RowNext');

}],
[2578,function initialize_2578(__studio33){
__studio33.u19OldDWRender = __studio33.dwRender;

}],
[2584,function initialize_2584(__studio33){
__studio33.u19PreviousBackup = __studio33.backupSnapshot;

}],
[2586,function initialize_2586(__studio33){
__studio33.u19PreviousValidation = __studio33.validateBackup;

}],
[2588,function initialize_2588(__studio33){
__studio33.u19PreviousRestore = __studio33.csRestoreSavedWork;

}],
[2590,function initialize_2590(__studio33){
__studio33.u19DialogWatch = new MutationObserver(__studio33.$fn(records=>{if(records.some(r=>r.type==='attributes'&&r.attributeName==='open'))__studio33.u19SyncExit()},"records=>{if(records.some(r=>r.type==='attributes'&&r.attributeName==='open'))u19SyncExit()}",""));

}]
];

return {id,register,steps};
})(),
(()=>{
// core/themes · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
const id="core/themes";
function register(__studio33){
__studio33.u20Animated = __studio33.$fn((function u20Animated(){return ['pearl','graphite'].includes(__studio33.u19Root.dataset.theme)&&__studio33.u19Motion()==='full'}),"function u20Animated(){return ['pearl','graphite'].includes(u19Root.dataset.theme)&&u19Motion()==='full'}","u20Animated");

__studio33.u20MotionLabel = __studio33.$fn((function u20MotionLabel(){const motion=__studio33.u19Motion();__studio33.u20MotionStatus.textContent=motion==='full'?'Animated · ambient light + interactive effects':motion==='off'?'Motion off · enable Animated in settings':matchMedia('(prefers-reduced-motion:reduce)').matches?'Reduced · system accessibility preference':__studio33.u19State.motion==='auto'&&__studio33.u19Layout==='tv'?'Reduced on TV · choose Animated for full effects':'Reduced · static theme design';__studio33.u19DeviceStatus.textContent=__studio33.u19DeviceStatus.textContent.replace(/ Motion:.*$/,'')+' Motion: '+(motion==='full'?'Animated':motion==='off'?'Off':'Reduced')+'.';}),"function u20MotionLabel(){const motion=u19Motion();u20MotionStatus.textContent=motion==='full'?'Animated · ambient light + interactive effects':motion==='off'?'Motion off · enable Animated in settings':matchMedia('(prefers-reduced-motion:reduce)').matches?'Reduced · system accessibility preference':u19State.motion==='auto'&&u19Layout==='tv'?'Reduced on TV · choose Animated for full effects':'Reduced · static theme design';u19DeviceStatus.textContent=u19DeviceStatus.textContent.replace(/ Motion:.*$/,'')+' Motion: '+(motion==='full'?'Animated':motion==='off'?'Off':'Reduced')+'.';}","u20MotionLabel");

__studio33.u20Feedback = __studio33.$fn((function u20Feedback(button,event){if(!__studio33.u20Animated()||!button||button.disabled)return;button.classList.add('u20-tap-glow','u20-interactive');const r=button.getBoundingClientRect(),ripple=__studio33.csText('span','','u20-ripple');ripple.setAttribute('aria-hidden','true');const pointer=event&&Number.isFinite(event.clientX)&&event.clientX>=r.left&&event.clientX<=r.right&&event.clientY>=r.top&&event.clientY<=r.bottom;ripple.style.left=(pointer?event.clientX-r.left:r.width/2)+'px';ripple.style.top=(pointer?event.clientY-r.top:r.height/2)+'px';button.append(ripple);setTimeout(()=>{ripple.remove();button.classList.remove('u20-tap-glow','u20-interactive')},600)}),"function u20Feedback(button,event){if(!u20Animated()||!button||button.disabled)return;button.classList.add('u20-tap-glow','u20-interactive');const r=button.getBoundingClientRect(),ripple=csText('span','','u20-ripple');ripple.setAttribute('aria-hidden','true');const pointer=event&&Number.isFinite(event.clientX)&&event.clientX>=r.left&&event.clientX<=r.right&&event.clientY>=r.top&&event.clientY<=r.bottom;ripple.style.left=(pointer?event.clientX-r.left:r.width/2)+'px';ripple.style.top=(pointer?event.clientY-r.top:r.height/2)+'px';button.append(ripple);setTimeout(()=>{ripple.remove();button.classList.remove('u20-tap-glow','u20-interactive')},600)}","u20Feedback");
}
const steps=[
[2596,function initialize_2596(__studio33){
__studio33.u20MotionFooter = __studio33.csText('div','','u20-motion-footer');
__studio33.u20MotionStatus = __studio33.csText('span','');

}],
[2599,function initialize_2599(__studio33){
__studio33.u20MotionButton = __studio33.u19Button('Animation settings',__studio33.$fn(()=>{__studio33.themeOpen(false);__studio33.u19OpenSettings();__studio33.u19MotionPicker.focus()},"()=>{themeOpen(false);u19OpenSettings();u19MotionPicker.focus()}",""),'u20MotionSettings');

}],
[2604,function initialize_2604(__studio33){
__studio33.u20ApplyPrevious = __studio33.u19Apply;

}],
[2606,function initialize_2606(__studio33){
__studio33.u20SetThemePrevious = __studio33.setTheme;

}],
[2608,function initialize_2608(__studio33){
__studio33.u20PointerFrame = 0;
__studio33.u20PointerPoint = null;

}],
[2615,function initialize_2615(__studio33){
__studio33.u20VisibilityChanged = __studio33.$fn(()=>{__studio33.u19Root.dataset.themePaused=document.hidden?'true':'false'},"()=>{u19Root.dataset.themePaused=document.hidden?'true':'false'}","u20VisibilityChanged");

}]
];

return {id,register,steps};
})(),
(()=>{
// core/processing · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
const id="core/processing";
function register(__studio33){
__studio33.u22Check = __studio33.$fn((function u22Check(x){if(!x||x.version!==1||!x.panes||typeof x.panes!=='object'||!x.draftTimes||typeof x.draftTimes!=='object')throw Error('Invalid tool-view preferences');const panes={},draftTimes={};for(const[k,v]of Object.entries(x.panes)){if(!__studio33.u16Splits.has(k)||!['input','result','both'].includes(v))throw Error('Invalid mobile pane');panes[k]=v}for(const[k,v]of Object.entries(x.draftTimes)){if(!__studio33.wsEligible.includes(k)||typeof v!=='string'||!Number.isFinite(Date.parse(v)))throw Error('Invalid draft timestamp');draftTimes[k]=v}return{version:1,panes,draftTimes}}),"function u22Check(x){if(!x||x.version!==1||!x.panes||typeof x.panes!=='object'||!x.draftTimes||typeof x.draftTimes!=='object')throw Error('Invalid tool-view preferences');const panes={},draftTimes={};for(const[k,v]of Object.entries(x.panes)){if(!u16Splits.has(k)||!['input','result','both'].includes(v))throw Error('Invalid mobile pane');panes[k]=v}for(const[k,v]of Object.entries(x.draftTimes)){if(!wsEligible.includes(k)||typeof v!=='string'||!Number.isFinite(Date.parse(v)))throw Error('Invalid draft timestamp');draftTimes[k]=v}return{version:1,panes,draftTimes}}","u22Check");

__studio33.u22Save = __studio33.$fn((function u22Save(){__studio33.csPersist(__studio33.u22Key,__studio33.u22State)}),"function u22Save(){csPersist(u22Key,u22State)}","u22Save");

__studio33.u22Status = __studio33.$fn((function u22Status(id,state,message=''){const r=__studio33.u22Runs.get(id);if(!r)return;r.state=state;r.bar.dataset.state=state;r.badge.textContent={ready:'Ready',running:'Processing',complete:'Complete',stale:'Inputs changed',error:'Needs attention',cancelled:'Cancelled'}[state]||state;r.note.textContent=message||(state==='stale'?'Run again to refresh the result.':state==='complete'?'Last run '+new Date(r.time).toLocaleTimeString():state==='ready'?'Generate a result when ready.':'');}),"function u22Status(id,state,message=''){const r=u22Runs.get(id);if(!r)return;r.state=state;r.bar.dataset.state=state;r.badge.textContent={ready:'Ready',running:'Processing',complete:'Complete',stale:'Inputs changed',error:'Needs attention',cancelled:'Cancelled'}[state]||state;r.note.textContent=message||(state==='stale'?'Run again to refresh the result.':state==='complete'?'Last run '+new Date(r.time).toLocaleTimeString():state==='ready'?'Generate a result when ready.':'');}","u22Status");

__studio33.u22Complete = __studio33.$fn((function u22Complete(id){const r=__studio33.u22Runs.get(id);if(!r)return;r.time=Date.now();__studio33.u22Status(id,'complete')}),"function u22Complete(id){const r=u22Runs.get(id);if(!r)return;r.time=Date.now();u22Status(id,'complete')}","u22Complete");

__studio33.u22Inputs = __studio33.$fn((function u22Inputs(id){const p=__studio33.$(id);return JSON.stringify([...p.querySelectorAll('textarea:not([readonly]),input:not([readonly]),select')].filter(e=>e.closest('section')===p&&!e.closest('.u22-ui,.u19-view-actions,.v13-editor-tools,.u17-editor-controls')&&e.type!=='file'&&!/Search|Filter|diffFilter|diffSearch|lcResponse/i.test(e.id)).map(e=>[e.id,e.type==='checkbox'?e.checked:e.value]))}),"function u22Inputs(id){const p=$(id);return JSON.stringify([...p.querySelectorAll('textarea:not([readonly]),input:not([readonly]),select')].filter(e=>e.closest('section')===p&&!e.closest('.u22-ui,.u19-view-actions,.v13-editor-tools,.u17-editor-controls')&&e.type!=='file'&&!/Search|Filter|diffFilter|diffSearch|lcResponse/i.test(e.id)).map(e=>[e.id,e.type==='checkbox'?e.checked:e.value]))}","u22Inputs");

__studio33.u22Changed = __studio33.$fn((function u22Changed(e){const id=e.target.closest('section')?.id,r=__studio33.u22Runs.get(id);if(!r||e.target.readOnly||e.target.closest('.u22-ui,.u19-view-actions,.v13-editor-tools,.u17-editor-controls'))return;const signature=__studio33.u22Inputs(id);if(signature===r.signature)return;r.signature=signature;if(r.state==='complete'||r.state==='running'||r.state==='stale')__studio33.u22Status(id,'stale');for(const[key,job]of [...__studio33.editionWorkers])if(job.owner===id&&key.startsWith('u22-')){__studio33.stopEditionWorker(key);job.failure?.();__studio33.refreshTaskUI()}}),"function u22Changed(e){const id=e.target.closest('section')?.id,r=u22Runs.get(id);if(!r||e.target.readOnly||e.target.closest('.u22-ui,.u19-view-actions,.v13-editor-tools,.u17-editor-controls'))return;const signature=u22Inputs(id);if(signature===r.signature)return;r.signature=signature;if(r.state==='complete'||r.state==='running'||r.state==='stale')u22Status(id,'stale');for(const[key,job]of [...editionWorkers])if(job.owner===id&&key.startsWith('u22-')){stopEditionWorker(key);job.failure?.();refreshTaskUI()}}","u22Changed");

__studio33.u22ApplyPanes = __studio33.$fn((function u22ApplyPanes(){for(const[id,split]of __studio33.u16Splits){const mode=__studio33.u22State.panes[id]||'both';__studio33.$(id).dataset.u22Pane=mode;split.fields[0].dataset.u22Field='input';split.fields[1].dataset.u22Field='result';for(const b of __studio33.$('u22Panes-'+id)?.querySelectorAll('button')||[])b.setAttribute('aria-pressed',String(b.dataset.pane===mode))}}),"function u22ApplyPanes(){for(const[id,split]of u16Splits){const mode=u22State.panes[id]||'both';$(id).dataset.u22Pane=mode;split.fields[0].dataset.u22Field='input';split.fields[1].dataset.u22Field='result';for(const b of $('u22Panes-'+id)?.querySelectorAll('button')||[])b.setAttribute('aria-pressed',String(b.dataset.pane===mode))}}","u22ApplyPanes");

__studio33.u22RenderReaderText = __studio33.$fn((function u22RenderReaderText(){__studio33.u19ReaderText.replaceChildren(__studio33.csText('pre',__studio33.u22ReaderPayload.slice(__studio33.u22ReaderStart,__studio33.u22ReaderEnd)));__studio33.u22ReaderInfo.textContent='Showing characters '+(__studio33.u22ReaderStart+1).toLocaleString()+'–'+__studio33.u22ReaderEnd.toLocaleString()+' of '+__studio33.u22ReaderPayload.length.toLocaleString()+'. Copy and download include the complete result.';__studio33.u22ReaderMore.hidden=__studio33.u22ReaderEnd>=__studio33.u22ReaderPayload.length}),"function u22RenderReaderText(){u19ReaderText.replaceChildren(csText('pre',u22ReaderPayload.slice(u22ReaderStart,u22ReaderEnd)));u22ReaderInfo.textContent='Showing characters '+(u22ReaderStart+1).toLocaleString()+'–'+u22ReaderEnd.toLocaleString()+' of '+u22ReaderPayload.length.toLocaleString()+'. Copy and download include the complete result.';u22ReaderMore.hidden=u22ReaderEnd>=u22ReaderPayload.length}","u22RenderReaderText");

__studio33.u22FindReader = __studio33.$fn((function u22FindReader(direction){const q=__studio33.u22ReaderFind.value;if(!q)return;const next=direction>0?__studio33.u22ReaderPayload.indexOf(q,__studio33.u22ReaderMatch+1):(__studio33.u22ReaderMatch>0?__studio33.u22ReaderPayload.lastIndexOf(q,__studio33.u22ReaderMatch-1):-1);__studio33.u22ReaderMatch=next<0?(direction>0?__studio33.u22ReaderPayload.indexOf(q):__studio33.u22ReaderPayload.lastIndexOf(q)):next;if(__studio33.u22ReaderMatch<0){__studio33.u22ReaderInfo.textContent='No matches in the complete result.';return}__studio33.u22ReaderStart=Math.max(0,__studio33.u22ReaderMatch-1000);__studio33.u22ReaderEnd=Math.min(__studio33.u22ReaderPayload.length,__studio33.u22ReaderStart+50000);__studio33.u22RenderReaderText();const pre=__studio33.u19ReaderText.querySelector('pre'),before=__studio33.u22ReaderPayload.slice(__studio33.u22ReaderStart,__studio33.u22ReaderMatch),match=__studio33.csText('mark',q);pre.replaceChildren(document.createTextNode(before),match,document.createTextNode(__studio33.u22ReaderPayload.slice(__studio33.u22ReaderMatch+q.length,__studio33.u22ReaderEnd)));match.scrollIntoView({block:'center'});__studio33.u22ReaderInfo.textContent+=' Match at character '+(__studio33.u22ReaderMatch+1).toLocaleString()+'.'}),"function u22FindReader(direction){const q=u22ReaderFind.value;if(!q)return;const next=direction>0?u22ReaderPayload.indexOf(q,u22ReaderMatch+1):(u22ReaderMatch>0?u22ReaderPayload.lastIndexOf(q,u22ReaderMatch-1):-1);u22ReaderMatch=next<0?(direction>0?u22ReaderPayload.indexOf(q):u22ReaderPayload.lastIndexOf(q)):next;if(u22ReaderMatch<0){u22ReaderInfo.textContent='No matches in the complete result.';return}u22ReaderStart=Math.max(0,u22ReaderMatch-1000);u22ReaderEnd=Math.min(u22ReaderPayload.length,u22ReaderStart+50000);u22RenderReaderText();const pre=u19ReaderText.querySelector('pre'),before=u22ReaderPayload.slice(u22ReaderStart,u22ReaderMatch),match=csText('mark',q);pre.replaceChildren(document.createTextNode(before),match,document.createTextNode(u22ReaderPayload.slice(u22ReaderMatch+q.length,u22ReaderEnd)));match.scrollIntoView({block:'center'});u22ReaderInfo.textContent+=' Match at character '+(u22ReaderMatch+1).toLocaleString()+'.'}","u22FindReader");

__studio33.u22DiffRows = __studio33.$fn((function u22DiffRows(){return(__studio33.diffResult?.changes||[]).filter(__studio33.$fn(x=>(__studio33.$('diffFilter').value==='all'||x.type===__studio33.$('diffFilter').value)&&x.path.toLowerCase().includes(__studio33.$('diffSearch').value.toLowerCase()),"x=>($('diffFilter').value==='all'||x.type===$('diffFilter').value)&&x.path.toLowerCase().includes($('diffSearch').value.toLowerCase())",""))}),"function u22DiffRows(){return(diffResult?.changes||[]).filter(x=>($('diffFilter').value==='all'||x.type===$('diffFilter').value)&&x.path.toLowerCase().includes($('diffSearch').value.toLowerCase()))}","u22DiffRows");

__studio33.u22MoveDiff = __studio33.$fn((function u22MoveDiff(step){const rows=__studio33.u22DiffRows();if(!rows.length)return;__studio33.u22DiffIndex=Math.max(0,Math.min(rows.length-1,__studio33.u22DiffIndex+step));__studio33.diffVisible=Math.max(__studio33.diffVisible,Math.ceil((__studio33.u22DiffIndex+1)/200)*200);__studio33.renderJSONDiff();__studio33.$('diffResults').querySelectorAll('.diff-row')[__studio33.u22DiffIndex]?.scrollIntoView({block:'center',behavior:__studio33.u19ScrollBehaviour()})}),"function u22MoveDiff(step){const rows=u22DiffRows();if(!rows.length)return;u22DiffIndex=Math.max(0,Math.min(rows.length-1,u22DiffIndex+step));diffVisible=Math.max(diffVisible,Math.ceil((u22DiffIndex+1)/200)*200);renderJSONDiff();$('diffResults').querySelectorAll('.diff-row')[u22DiffIndex]?.scrollIntoView({block:'center',behavior:u19ScrollBehaviour()})}","u22MoveDiff");

__studio33.u22APIMessage = __studio33.$fn((function u22APIMessage(text){__studio33.u22APIHelp.textContent=text;__studio33.u22APIHelp.hidden=!text}),"function u22APIMessage(text){u22APIHelp.textContent=text;u22APIHelp.hidden=!text}","u22APIMessage");

__studio33.u22StopInspect = __studio33.$fn((function u22StopInspect(restoreFocus=true){if(!__studio33.u22Inspection)return;const{target,button}=__studio33.u22Inspection;delete target.dataset.u22Inspecting;button.setAttribute('aria-pressed','false');button.textContent='Inspect with arrows';__studio33.u22Inspection=null;if(restoreFocus&&button.isConnected&&__studio33.u19Visible(button))button.focus({preventScroll:true})}),"function u22StopInspect(restoreFocus=true){if(!u22Inspection)return;const{target,button}=u22Inspection;delete target.dataset.u22Inspecting;button.setAttribute('aria-pressed','false');button.textContent='Inspect with arrows';u22Inspection=null;if(restoreFocus&&button.isConnected&&u19Visible(button))button.focus({preventScroll:true})}","u22StopInspect");

__studio33.u22StartInspect = __studio33.$fn((function u22StartInspect(target,button,kind){if(__studio33.u22Inspection){__studio33.u22StopInspect();return}if(kind==='picker'&&!__studio33.pickerSource){__studio33.toast('Upload an image first.');return}__studio33.u19StopEditing();__studio33.u22Inspection={target,button,kind};target.dataset.u22Inspecting='true';button.setAttribute('aria-pressed','true');button.textContent='Exit inspection';target.focus();__studio33.toast(kind==='picker'?'Arrows move the source-pixel cursor; OK samples; Back returns to controls.':'Arrows pan the view; OK or Back returns to controls.')}),"function u22StartInspect(target,button,kind){if(u22Inspection){u22StopInspect();return}if(kind==='picker'&&!pickerSource){toast('Upload an image first.');return}u19StopEditing();u22Inspection={target,button,kind};target.dataset.u22Inspecting='true';button.setAttribute('aria-pressed','true');button.textContent='Exit inspection';target.focus();toast(kind==='picker'?'Arrows move the source-pixel cursor; OK samples; Back returns to controls.':'Arrows pan the view; OK or Back returns to controls.')}","u22StartInspect");

__studio33.u22InspectKey = __studio33.$fn((function u22InspectKey(e){if(!__studio33.u22Inspection)return false;const mapped=__studio33.u19Mapped(e),dir=mapped||({ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down',Enter:'activate',Accept:'activate',Select:'activate'}[e.key]);if(['Escape','BrowserBack','GoBack','Back'].includes(e.key)||e.key==='Backspace'&&!__studio33.u19IsEditable(e.target)||[10009,461].includes(e.keyCode)||mapped==='normal'){__studio33.u22StopInspect();return true}if(dir==='activate'){if(__studio33.u22Inspection.kind==='picker')__studio33.pickerSample();else __studio33.u22StopInspect();return true}if(!['left','right','up','down'].includes(dir))return false;const{kind,target}=__studio33.u22Inspection,dx=dir==='left'?-1:dir==='right'?1:0,dy=dir==='up'?-1:dir==='down'?1:0;if(kind==='picker'){const image=__studio33.pickerSource.image,step=e.shiftKey?10:1;__studio33.pickerPoint.x=Math.max(0,Math.min(image.naturalWidth-1,__studio33.pickerPoint.x+dx*step));__studio33.pickerPoint.y=Math.max(0,Math.min(image.naturalHeight-1,__studio33.pickerPoint.y+dy*step));__studio33.pickerSample()}else if(kind==='graph'){try{const b=__studio33.readGraphBounds(),x=(b.xmax-b.xmin)*.1*dx,y=(b.ymax-b.ymin)*-.1*dy;__studio33.setGraphBounds({xmin:b.xmin+x,xmax:b.xmax+x,ymin:b.ymin+y,ymax:b.ymax+y})}catch(error){__studio33.toast(error.message)}}else target.scrollBy({left:dx*120,top:dy*120,behavior:__studio33.u19ScrollBehaviour()});return true}),"function u22InspectKey(e){if(!u22Inspection)return false;const mapped=u19Mapped(e),dir=mapped||({ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down',Enter:'activate',Accept:'activate',Select:'activate'}[e.key]);if(['Escape','BrowserBack','GoBack','Back'].includes(e.key)||e.key==='Backspace'&&!u19IsEditable(e.target)||[10009,461].includes(e.keyCode)||mapped==='normal'){u22StopInspect();return true}if(dir==='activate'){if(u22Inspection.kind==='picker')pickerSample();else u22StopInspect();return true}if(!['left','right','up','down'].includes(dir))return false;const{kind,target}=u22Inspection,dx=dir==='left'?-1:dir==='right'?1:0,dy=dir==='up'?-1:dir==='down'?1:0;if(kind==='picker'){const image=pickerSource.image,step=e.shiftKey?10:1;pickerPoint.x=Math.max(0,Math.min(image.naturalWidth-1,pickerPoint.x+dx*step));pickerPoint.y=Math.max(0,Math.min(image.naturalHeight-1,pickerPoint.y+dy*step));pickerSample()}else if(kind==='graph'){try{const b=readGraphBounds(),x=(b.xmax-b.xmin)*.1*dx,y=(b.ymax-b.ymin)*-.1*dy;setGraphBounds({xmin:b.xmin+x,xmax:b.xmax+x,ymin:b.ymin+y,ymax:b.ymax+y})}catch(error){toast(error.message)}}else target.scrollBy({left:dx*120,top:dy*120,behavior:u19ScrollBehaviour()});return true}","u22InspectKey");

__studio33.u22DraftRefresh = __studio33.$fn((function u22DraftRefresh(){for(const[id,{check,label,preview}]of __studio33.u22DraftLabels){check.checked=__studio33.v12State.recovery.enabled&&__studio33.v12State.recovery.tools.includes(id);const has=!!__studio33.v12State.recovery.values[id];label.textContent=has?'Saved '+(__studio33.u22State.draftTimes[id]?new Date(__studio33.u22State.draftTimes[id]).toLocaleString():'in a previous version'):'No saved draft';preview.disabled=!has}}),"function u22DraftRefresh(){for(const[id,{check,label,preview}]of u22DraftLabels){check.checked=v12State.recovery.enabled&&v12State.recovery.tools.includes(id);const has=!!v12State.recovery.values[id];label.textContent=has?'Saved '+(u22State.draftTimes[id]?new Date(u22State.draftTimes[id]).toLocaleString():'in a previous version'):'No saved draft';preview.disabled=!has}}","u22DraftRefresh");

__studio33.u22PreviewDraft = __studio33.$fn((function u22PreviewDraft(id){const values=__studio33.v12State.recovery.values[id];if(!values)return;try{__studio33.u22DraftValues=__studio33.wsValidateTools({[id]:values})[id];__studio33.u22DraftTool=id;__studio33.u22DraftDialog.querySelector('h2').textContent=__studio33.views[id]+' · Saved draft';__studio33.u22DraftInfo.textContent='Saved '+(__studio33.u22State.draftTimes[id]?new Date(__studio33.u22State.draftTimes[id]).toLocaleString():'in a previous version')+'. Restore replaces this tool’s current fields. It does not send an API request.';const text=JSON.stringify(__studio33.u22DraftValues,null,2);__studio33.u22DraftText.textContent=text.slice(0,30000)+(text.length>30000?'\n… Preview limited to 30,000 characters; restore includes the complete saved draft.':'');__studio33.u19OpenDialog(__studio33.u22DraftDialog,__studio33.$('u22DraftPreviewClose'))}catch(e){__studio33.toast(e.message)}}),"function u22PreviewDraft(id){const values=v12State.recovery.values[id];if(!values)return;try{u22DraftValues=wsValidateTools({[id]:values})[id];u22DraftTool=id;u22DraftDialog.querySelector('h2').textContent=views[id]+' · Saved draft';u22DraftInfo.textContent='Saved '+(u22State.draftTimes[id]?new Date(u22State.draftTimes[id]).toLocaleString():'in a previous version')+'. Restore replaces this tool’s current fields. It does not send an API request.';const text=JSON.stringify(u22DraftValues,null,2);u22DraftText.textContent=text.slice(0,30000)+(text.length>30000?'\\n… Preview limited to 30,000 characters; restore includes the complete saved draft.':'');u19OpenDialog(u22DraftDialog,$('u22DraftPreviewClose'))}catch(e){toast(e.message)}}","u22PreviewDraft");

__studio33.u22OwnedKeys = __studio33.$fn((function u22OwnedKeys(){return [...new Set([...__studio33.backupKeys,...Object.keys(localStorage).filter(k=>k.startsWith('calc-studio-')||k.startsWith('advanced-calculator-'))])]}),"function u22OwnedKeys(){return [...new Set([...backupKeys,...Object.keys(localStorage).filter(k=>k.startsWith('calc-studio-')||k.startsWith('advanced-calculator-'))])]}","u22OwnedKeys");
}
const steps=[
[2647,function initialize_2647(__studio33){
__studio33.u22Key = 'calc-studio-refinements-v22';

}],
[2649,function initialize_2649(__studio33){
__studio33.u22State = undefined;

}],
[2652,function initialize_2652(__studio33){
__studio33.u22Runs = new Map();

}],
[2656,function initialize_2656(__studio33){
__studio33.u22Tracked = new Set(['jsonformatter','jsondiff','csvjson','jsoncsv','logs','regex','encoding','textutils','jsonpath','jsonmapping','jsonmask','schema','hash','apiclient','textdiff','xml','reconciliation','apiresponse','composite','integrationtests','sampledata','jwt','jwtverify','soql','cron','calendar','markdown','numberwords','paymentids','fileinspect','subnets','barcodes','qr','flowchart']);

}],
[2662,function initialize_2662(__studio33){
__studio33.u22OldWorker = __studio33.runStudioWorker;

}],
[2664,function initialize_2664(__studio33){
__studio33.u22JSONSource = 'const developerLimit=2097152;'+[__studio33.parseDeveloperJSON,__studio33.jsonPointerSegment,__studio33.emitDeveloperJSON].map(f=>f.toString()).join('\n');

}],
[2665,function initialize_2665(__studio33){
__studio33.u22CSVSource = __studio33.u22JSONSource+'\n'+[__studio33.parseCSVText,__studio33.csvToJSON,__studio33.nodeAtJSONPointer,__studio33.jsonCSV].map(f=>f.toString()).join('\n');

}],
[2666,function initialize_2666(__studio33){
__studio33.u22OldJSON = __studio33.renderJSON;

}],
[2670,function initialize_2670(__studio33){
__studio33.u22OldCSVJSON = __studio33.$('csvJsonConvert').onclick;

}],
[2672,function initialize_2672(__studio33){
__studio33.u22OldJSONCSV = __studio33.runJSONCSV;

}],
[2676,function initialize_2676(__studio33){
__studio33.u22OldRegexResult = __studio33.renderRegexResult;

}],
[2681,function initialize_2681(__studio33){
__studio33.u22ReaderBlob = null;
__studio33.u22ReaderJSON = false;
__studio33.u22ReaderPayload = '';
__studio33.u22ReaderTool = '';
__studio33.u22ReaderStart = 0;
__studio33.u22ReaderEnd = 0;
__studio33.u22ReaderMatch = -1;
__studio33.u22ReaderIsText = false;

}],
[2682,function initialize_2682(__studio33){
__studio33.u22ReaderInfo = __studio33.csText('p','','hint');

}],
[2685,function initialize_2685(__studio33){
__studio33.u22ReaderFind = document.createElement('input');

}],
[2690,function initialize_2690(__studio33){
__studio33.u22ReaderSearch = __studio33.csText('div','','u22-ui');

}],
[2693,function initialize_2693(__studio33){
__studio33.u22ReaderMore = __studio33.u19Button('Load more',__studio33.$fn(()=>{__studio33.u22ReaderEnd=Math.min(__studio33.u22ReaderPayload.length,__studio33.u22ReaderEnd+50000);if(__studio33.u22ReaderEnd-__studio33.u22ReaderStart>200000)__studio33.u22ReaderStart=__studio33.u22ReaderEnd-200000;__studio33.u22RenderReaderText()},"()=>{u22ReaderEnd=Math.min(u22ReaderPayload.length,u22ReaderEnd+50000);if(u22ReaderEnd-u22ReaderStart>200000)u22ReaderStart=u22ReaderEnd-200000;u22RenderReaderText()}",""),'u22ReaderMore');

}],
[2694,function initialize_2694(__studio33){
__studio33.u22ReaderDownload = __studio33.u19Button('Download complete result',__studio33.$fn(()=>{if(__studio33.u22ReaderBlob){__studio33.downloadFile('api-response.bin',__studio33.u22ReaderBlob,__studio33.u22ReaderBlob.type);return}if(!__studio33.u22ReaderPayload)return;let ext='txt',mime='text/plain;charset=utf-8';if(__studio33.u22ReaderTool==='jsoncsv'){ext='csv';mime='text/csv;charset=utf-8'}else if(__studio33.u22ReaderJSON){ext='json';mime='application/json'}__studio33.downloadFile(__studio33.u22ReaderTool+'-result.'+ext,__studio33.u22ReaderPayload,mime)},"()=>{if(u22ReaderBlob){downloadFile('api-response.bin',u22ReaderBlob,u22ReaderBlob.type);return}if(!u22ReaderPayload)return;let ext='txt',mime='text/plain;charset=utf-8';if(u22ReaderTool==='jsoncsv'){ext='csv';mime='text/csv;charset=utf-8'}else if(u22ReaderJSON){ext='json';mime='application/json'}downloadFile(u22ReaderTool+'-result.'+ext,u22ReaderPayload,mime)}",""),'u22ReaderDownload');

}],
[2702,function initialize_2702(__studio33){
__studio33.u22DiffIndex = -1;

}],
[2703,function initialize_2703(__studio33){
__studio33.u22DiffNav = __studio33.csText('div','','u22-ui');

}],
[2705,function initialize_2705(__studio33){
__studio33.u22DiffCount = __studio33.csText('span','No differences');

}],
[2706,function initialize_2706(__studio33){
__studio33.u22DiffPrev = __studio33.u19Button('Previous change',__studio33.$fn(()=>__studio33.u22MoveDiff(-1),"()=>u22MoveDiff(-1)",""),'u22DiffPrev');
__studio33.u22DiffNext = __studio33.u19Button('Next change',__studio33.$fn(()=>__studio33.u22MoveDiff(1),"()=>u22MoveDiff(1)",""),'u22DiffNext');

}],
[2710,function initialize_2710(__studio33){
__studio33.u22OldDiffRender = __studio33.renderJSONDiff;

}],
[2715,function initialize_2715(__studio33){
__studio33.u22APIHelp = __studio33.csText('div','','u22-api-help');

}],
[2721,function initialize_2721(__studio33){
__studio33.u22OldResponse = __studio33.lcResponseRender;

}],
[2724,function initialize_2724(__studio33){
__studio33.u22Inspection = null;

}],
[2728,function initialize_2728(__studio33){
__studio33.u22Graph = __studio33.$('graphSvg');

}],
[2731,function initialize_2731(__studio33){
__studio33.u22GraphButton = __studio33.u19Button('Inspect with arrows',__studio33.$fn(()=>__studio33.u22StartInspect(__studio33.u22Graph,__studio33.u22GraphButton,'graph'),"()=>u22StartInspect(u22Graph,u22GraphButton,'graph')",""),'u22Inspect-graph');

}],
[2735,function initialize_2735(__studio33){
__studio33.u22DraftDialog = __studio33.u19Dialog('u22DraftPreview','Review saved draft');
__studio33.u22DraftInfo = __studio33.csText('p','');
__studio33.u22DraftText = __studio33.csText('pre','');

}],
[2736,function initialize_2736(__studio33){
__studio33.u22DraftTool = '';
__studio33.u22DraftValues = null;

}],
[2738,function initialize_2738(__studio33){
__studio33.u22DraftLabels = new Map();

}],
[2742,function initialize_2742(__studio33){
__studio33.u22DraftLast = JSON.stringify(__studio33.v12State.recovery.values);

}],
[2743,function initialize_2743(__studio33){
__studio33.u22OldPersist = __studio33.csPersist;

}],
[2760,function initialize_2760(__studio33){
__studio33.u22CacheKeys = ['calc-studio-memory','advanced-calculator-ans','calc-studio-drafts','calc-studio-rates'];

}],
[2761,function initialize_2761(__studio33){
__studio33.u22SettingKeys = ['calc-studio-theme','advanced-calculator-angle','calc-studio-scientific','calc-studio-history-visible','calc-studio-compact-v2','calc-studio-notebook-split','calc-studio-formatting','calc-studio-history-width-v10',__studio33.u19Key,__studio33.u22Key,'calc-studio-theme-motion-v20'];

}],
[2770,function initialize_2770(__studio33){
__studio33.u22OldBackup = __studio33.backupSnapshot;

}],
[2772,function initialize_2772(__studio33){
__studio33.u22OldValidate = __studio33.validateBackup;

}],
[2774,function initialize_2774(__studio33){
__studio33.u22OldRestore = __studio33.csRestoreSavedWork;

}]
];

return {id,register,steps};
})(),
(()=>{
// core/connections · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
const id="core/connections";
function register(__studio33){
__studio33.cs32StopResults = __studio33.$fn((function cs32StopResults(){clearInterval(__studio33.cs32Timer);__studio33.cs32Timer=null;__studio33.cs32Pinned='';__studio33.cs32Last=''}),"function cs32StopResults(){clearInterval(cs32Timer);cs32Timer=null;cs32Pinned='';cs32Last=''}","cs32StopResults");

__studio33.cs32Revoke = __studio33.$fn((function cs32Revoke(){__studio33.cs32StopResults();if(__studio33.cs32Dialog?.open)__studio33.cs32Dialog.close();if(__studio33.cs32Session){__studio33.cs32Session.remote=false;__studio33.cs32Session.results=false;__studio33.cs32Session.port?.postMessage({type:'status',text:'Main-tab permissions are off.'})}}),"function cs32Revoke(){cs32StopResults();if(cs32Dialog?.open)cs32Dialog.close();if(cs32Session){cs32Session.remote=false;cs32Session.results=false;cs32Session.port?.postMessage({type:'status',text:'Main-tab permissions are off.'})}}","cs32Revoke");

__studio33.cs32Close = __studio33.$fn((function cs32Close(){__studio33.cs32Revoke();if(__studio33.cs32Session){__studio33.cs32Session.port?.postMessage({type:'closed'});__studio33.cs32Session.port?.close();clearInterval(__studio33.cs32Session.watch);__studio33.cs32Session=null}if(__studio33.cs32Dialog?.open)__studio33.cs32Dialog.close()}),"function cs32Close(){cs32Revoke();if(cs32Session){cs32Session.port?.postMessage({type:'closed'});cs32Session.port?.close();clearInterval(cs32Session.watch);cs32Session=null}if(cs32Dialog?.open)cs32Dialog.close()}","cs32Close");

__studio33.cs32Launch = __studio33.$fn((function cs32Launch(){if(__studio33.cs32Session?.child&&!__studio33.cs32Session.child.closed){__studio33.cs32Session.child.focus();return}__studio33.cs32Close();__studio33.u21Options.open=false;const token=[...crypto.getRandomValues(new Uint8Array(32))].map(x=>x.toString(16).padStart(2,'0')).join(''),url=new URL('Calc_Studio_Connection.html',location.href);url.hash='bridge='+token;const child=window.open(url.href,'_blank');if(!child){__studio33.toast('Allow this page to open the Connection tab.');return}__studio33.cs32Session={child,token,port:null,remote:false,results:false,watch:setInterval(__studio33.$fn(()=>{if(__studio33.cs32Session?.child.closed)__studio33.cs32Close()},"()=>{if(cs32Session?.child.closed)cs32Close()}",""),1500)};}),"function cs32Launch(){if(cs32Session?.child&&!cs32Session.child.closed){cs32Session.child.focus();return}cs32Close();u21Options.open=false;const token=[...crypto.getRandomValues(new Uint8Array(32))].map(x=>x.toString(16).padStart(2,'0')).join(''),url=new URL('Calc_Studio_Connection.html',location.href);url.hash='bridge='+token;const child=window.open(url.href,'_blank');if(!child){toast('Allow this page to open the Connection tab.');return}cs32Session={child,token,port:null,remote:false,results:false,watch:setInterval(()=>{if(cs32Session?.child.closed)cs32Close()},1500)};}","cs32Launch");

__studio33.cs32DialogBase = __studio33.$fn((function cs32DialogBase(){if(__studio33.cs32Dialog)return __studio33.cs32Dialog;__studio33.cs32Dialog=__studio33.u19Dialog('cs32Review','Connection request');__studio33.cs32Dialog.append(__studio33.csText('p','Requests are limited to the Connection tab you opened. You can revoke permissions from that page or close it.'));return __studio33.cs32Dialog}),"function cs32DialogBase(){if(cs32Dialog)return cs32Dialog;cs32Dialog=u19Dialog('cs32Review','Connection request');cs32Dialog.append(csText('p','Requests are limited to the Connection tab you opened. You can revoke permissions from that page or close it.'));return cs32Dialog}","cs32DialogBase");

__studio33.cs32Ask = __studio33.$fn((function cs32Ask(title,build){if(__studio33.cs32Busy)return Promise.resolve(false);__studio33.cs32Busy=true;const d=__studio33.cs32DialogBase();d.querySelector('h2').textContent=title;const body=__studio33.csText('div');d.append(body);return new Promise(__studio33.$fn(resolve=>{let done=false,decision=false;const finish=v=>{decision=v;if(d.open)d.close();else close()},close=__studio33.$fn(()=>{if(done)return;done=true;d.removeEventListener('close',close);body.remove();__studio33.cs32Busy=false;resolve(decision)},"()=>{if(done)return;done=true;d.removeEventListener('close',close);body.remove();cs32Busy=false;resolve(decision)}","close");d.addEventListener('close',close);build(body,()=>finish(true));body.append(__studio33.u19Button('Decline',()=>finish(false),'cs32Decline'));__studio33.u25Open(d,__studio33.$('cs32Decline'))},"resolve=>{let done=false,decision=false;const finish=v=>{decision=v;if(d.open)d.close();else close()},close=()=>{if(done)return;done=true;d.removeEventListener('close',close);body.remove();cs32Busy=false;resolve(decision)};d.addEventListener('close',close);build(body,()=>finish(true));body.append(u19Button('Decline',()=>finish(false),'cs32Decline'));u25Open(d,$('cs32Decline'))}",""))}),"function cs32Ask(title,build){if(cs32Busy)return Promise.resolve(false);cs32Busy=true;const d=cs32DialogBase();d.querySelector('h2').textContent=title;const body=csText('div');d.append(body);return new Promise(resolve=>{let done=false,decision=false;const finish=v=>{decision=v;if(d.open)d.close();else close()},close=()=>{if(done)return;done=true;d.removeEventListener('close',close);body.remove();cs32Busy=false;resolve(decision)};d.addEventListener('close',close);build(body,()=>finish(true));body.append(u19Button('Decline',()=>finish(false),'cs32Decline'));u25Open(d,$('cs32Decline'))})}","cs32Ask");

__studio33.cs32Grant = __studio33.$fn((async function cs32Grant(){let remote,results;const ok=await __studio33.cs32Ask('Connection permissions',__studio33.$fn((body,accept)=>{remote=__studio33.u25CheckRow(body,'cs32Remote','Allow tool navigation, zoom, timer controls and Normal view');results=__studio33.u25CheckRow(body,'cs32Results','Allow sharing text results from the current tool');body.append(__studio33.csText('p','Current result tool: '+__studio33.views[__studio33.activeView]+'. Inputs, uploads, API credentials and requests are not shared automatically.'));body.append(__studio33.u19Button('Grant selected permissions',accept,'cs32Grant'))},"(body,accept)=>{remote=u25CheckRow(body,'cs32Remote','Allow tool navigation, zoom, timer controls and Normal view');results=u25CheckRow(body,'cs32Results','Allow sharing text results from the current tool');body.append(csText('p','Current result tool: '+views[activeView]+'. Inputs, uploads, API credentials and requests are not shared automatically.'));body.append(u19Button('Grant selected permissions',accept,'cs32Grant'))}",""));if(!ok)return false;if(!__studio33.cs32Session)return false;__studio33.cs32Session.remote=remote.checked;__studio33.cs32Session.results=results.checked;if(!results.checked)__studio33.cs32StopResults();return true}),"async function cs32Grant(){let remote,results;const ok=await cs32Ask('Connection permissions',(body,accept)=>{remote=u25CheckRow(body,'cs32Remote','Allow tool navigation, zoom, timer controls and Normal view');results=u25CheckRow(body,'cs32Results','Allow sharing text results from the current tool');body.append(csText('p','Current result tool: '+views[activeView]+'. Inputs, uploads, API credentials and requests are not shared automatically.'));body.append(u19Button('Grant selected permissions',accept,'cs32Grant'))});if(!ok)return false;if(!cs32Session)return false;cs32Session.remote=remote.checked;cs32Session.results=results.checked;if(!results.checked)cs32StopResults();return true}","cs32Grant");

__studio33.cs32Text = __studio33.$fn((async function cs32Text(text){if(typeof text!=='string'||new TextEncoder().encode(text).length>65536)throw Error('Text limit: 64 KiB');let dest,confirmed;const ok=await __studio33.cs32Ask('Review received text',__studio33.$fn((body,accept)=>{body.append(__studio33.csText('pre',text,'u25-preview'));dest=__studio33.u19Option(body,'cs32Destination','Destination',Object.keys(__studio33.u25Targets).filter(__studio33.$fn(k=>__studio33.$(__studio33.u25Targets[k]),"k=>$(u25Targets[k])","")).map(__studio33.$fn(k=>[k,k==='apiurl'?'Integration Studio · URL':k==='apiclient'?'Integration Studio · body':__studio33.views[k]],"k=>[k,k==='apiurl'?'Integration Studio · URL':k==='apiclient'?'Integration Studio · body':views[k]]","")));confirmed=__studio33.u25CheckRow(body,'cs32Replace','Replace this destination input with the reviewed text');body.append(__studio33.u19Button('Place in selected tool',__studio33.$fn(()=>{if(!confirmed.checked){__studio33.toast('Confirm the input replacement first');return}accept()},"()=>{if(!confirmed.checked){toast('Confirm the input replacement first');return}accept()}",""),'cs32ApplyText'))},"(body,accept)=>{body.append(csText('pre',text,'u25-preview'));dest=u19Option(body,'cs32Destination','Destination',Object.keys(u25Targets).filter(k=>$(u25Targets[k])).map(k=>[k,k==='apiurl'?'Integration Studio · URL':k==='apiclient'?'Integration Studio · body':views[k]]));confirmed=u25CheckRow(body,'cs32Replace','Replace this destination input with the reviewed text');body.append(u19Button('Place in selected tool',()=>{if(!confirmed.checked){toast('Confirm the input replacement first');return}accept()},'cs32ApplyText'))}",""));if(!ok)throw Error('Text replacement declined');const tool=dest.value,field=__studio33.$(__studio33.u25Targets[tool]);if(!field)throw Error('Destination unavailable');__studio33.openTab(tool==='apiurl'?'apiclient':tool);field.value=text;field.dispatchEvent(new Event('input',{bubbles:true}));__studio33.u17Reveal(field);field.focus();return'Placed for review. Run the tool when ready.'}),"async function cs32Text(text){if(typeof text!=='string'||new TextEncoder().encode(text).length>65536)throw Error('Text limit: 64 KiB');let dest,confirmed;const ok=await cs32Ask('Review received text',(body,accept)=>{body.append(csText('pre',text,'u25-preview'));dest=u19Option(body,'cs32Destination','Destination',Object.keys(u25Targets).filter(k=>$(u25Targets[k])).map(k=>[k,k==='apiurl'?'Integration Studio · URL':k==='apiclient'?'Integration Studio · body':views[k]]));confirmed=u25CheckRow(body,'cs32Replace','Replace this destination input with the reviewed text');body.append(u19Button('Place in selected tool',()=>{if(!confirmed.checked){toast('Confirm the input replacement first');return}accept()},'cs32ApplyText'))});if(!ok)throw Error('Text replacement declined');const tool=dest.value,field=$(u25Targets[tool]);if(!field)throw Error('Destination unavailable');openTab(tool==='apiurl'?'apiclient':tool);field.value=text;field.dispatchEvent(new Event('input',{bubbles:true}));u17Reveal(field);field.focus();return'Placed for review. Run the tool when ready.'}","cs32Text");

__studio33.cs32Image = __studio33.$fn((async function cs32Image(m){if(!(m.blob instanceof Blob)||m.blob.size>32*1024*1024||!/^image\/(png|jpeg|webp|gif|bmp)$/.test(m.mime))throw Error('Unsupported image transfer');const url=URL.createObjectURL(m.blob);let confirmed;try{const ok=await __studio33.cs32Ask('Review received photo',__studio33.$fn((body,accept)=>{const img=__studio33.csText('img');img.src=url;img.alt='Received photo preview';img.style.cssText='max-width:100%;max-height:40vh;object-fit:contain';body.append(img,__studio33.csText('p',String(m.name).slice(0,180)+' · '+m.blob.size.toLocaleString()+' bytes'));confirmed=__studio33.u25CheckRow(body,'cs32ReplaceImage','Replace the current Camera & Image Studio image');body.append(__studio33.u19Button('Open reviewed image',__studio33.$fn(()=>{if(!confirmed.checked){__studio33.toast('Confirm image replacement first');return}accept()},"()=>{if(!confirmed.checked){toast('Confirm image replacement first');return}accept()}",""),'cs32ApplyImage'))},"(body,accept)=>{const img=csText('img');img.src=url;img.alt='Received photo preview';img.style.cssText='max-width:100%;max-height:40vh;object-fit:contain';body.append(img,csText('p',String(m.name).slice(0,180)+' · '+m.blob.size.toLocaleString()+' bytes'));confirmed=u25CheckRow(body,'cs32ReplaceImage','Replace the current Camera & Image Studio image');body.append(u19Button('Open reviewed image',()=>{if(!confirmed.checked){toast('Confirm image replacement first');return}accept()},'cs32ApplyImage'))}",""));if(!ok)throw Error('Photo replacement declined');if(__studio33.ci25.page||__studio33.ci.busy||__studio33.ci.batchBusy)throw Error('Finish or cancel current Camera Studio processing first');__studio33.openTab('camerastudio');const ticket=++__studio33.ci.loadTicket;__studio33.ciCancelProcessing();await __studio33.ciOpenFile(new File([m.blob],String(m.name).slice(0,180),{type:m.mime}),ticket);return'Image opened in Camera & Image Studio.'}finally{URL.revokeObjectURL(url)}}),"async function cs32Image(m){if(!(m.blob instanceof Blob)||m.blob.size>32*1024*1024||!/^image\\/(png|jpeg|webp|gif|bmp)$/.test(m.mime))throw Error('Unsupported image transfer');const url=URL.createObjectURL(m.blob);let confirmed;try{const ok=await cs32Ask('Review received photo',(body,accept)=>{const img=csText('img');img.src=url;img.alt='Received photo preview';img.style.cssText='max-width:100%;max-height:40vh;object-fit:contain';body.append(img,csText('p',String(m.name).slice(0,180)+' · '+m.blob.size.toLocaleString()+' bytes'));confirmed=u25CheckRow(body,'cs32ReplaceImage','Replace the current Camera & Image Studio image');body.append(u19Button('Open reviewed image',()=>{if(!confirmed.checked){toast('Confirm image replacement first');return}accept()},'cs32ApplyImage'))});if(!ok)throw Error('Photo replacement declined');if(ci25.page||ci.busy||ci.batchBusy)throw Error('Finish or cancel current Camera Studio processing first');openTab('camerastudio');const ticket=++ci.loadTicket;ciCancelProcessing();await ciOpenFile(new File([m.blob],String(m.name).slice(0,180),{type:m.mime}),ticket);return'Image opened in Camera & Image Studio.'}finally{URL.revokeObjectURL(url)}}","cs32Image");

__studio33.cs32Command = __studio33.$fn((async function cs32Command(m){const s=__studio33.cs32Session;if(!s?.remote){if(!await __studio33.cs32Grant()||!s?.remote)throw Error('Remote control was not granted')}if(__studio33.u19Modal()&&(m.action!=='normal'||__studio33.cs32Dialog?.open))throw Error('Close the dialog in Calc Studio before using remote controls');switch(m.action){case'tools':return window.calcStudio.tools().filter(t=>!t.alias).map(t=>({id:t.id,name:t.name}));case'open':if(typeof m.tool!=='string'||!Object.hasOwn(__studio33.views,m.tool))throw Error('Unknown tool');__studio33.openTab(m.tool);return m.tool;case'normal':await __studio33.u19ExitCurrent();return'Normal view';case'timer-start':case'timer-pause':case'timer-next':case'timer-reset':if(__studio33.activeView!=='presentationtimer')throw Error('Open Presentation Timer first');if(!__studio33.ptSegments.length)throw Error('Load timer segments in Calc Studio first');if(m.action==='timer-start')__studio33.ptStart();if(m.action==='timer-pause')__studio33.ptPause();if(m.action==='timer-next')__studio33.ptNext();if(m.action==='timer-reset'){__studio33.ptPause();__studio33.ptElapsed=0;__studio33.ptRender()}return'Timer updated';case'zoom-in':case'zoom-out':case'zoom-reset':{const controls=__studio33.activeView==='graph'?{ 'zoom-in':'graphZoomIn','zoom-out':'graphZoomOut','zoom-reset':'graphReset'}:__studio33.activeView==='camerastudio'?{'zoom-in':'ciZoomIn','zoom-out':'ciZoomOut','zoom-reset':'ciFit'}:null;if(!controls||!__studio33.$(controls[m.action]))throw Error('Zoom is available in Functions & Graphs and Camera & Image Studio');__studio33.$(controls[m.action]).click();return'Zoom updated'}default:throw Error('Unsupported command')}}),"async function cs32Command(m){const s=cs32Session;if(!s?.remote){if(!await cs32Grant()||!s?.remote)throw Error('Remote control was not granted')}if(u19Modal()&&(m.action!=='normal'||cs32Dialog?.open))throw Error('Close the dialog in Calc Studio before using remote controls');switch(m.action){case'tools':return window.calcStudio.tools().filter(t=>!t.alias).map(t=>({id:t.id,name:t.name}));case'open':if(typeof m.tool!=='string'||!Object.hasOwn(views,m.tool))throw Error('Unknown tool');openTab(m.tool);return m.tool;case'normal':await u19ExitCurrent();return'Normal view';case'timer-start':case'timer-pause':case'timer-next':case'timer-reset':if(activeView!=='presentationtimer')throw Error('Open Presentation Timer first');if(!ptSegments.length)throw Error('Load timer segments in Calc Studio first');if(m.action==='timer-start')ptStart();if(m.action==='timer-pause')ptPause();if(m.action==='timer-next')ptNext();if(m.action==='timer-reset'){ptPause();ptElapsed=0;ptRender()}return'Timer updated';case'zoom-in':case'zoom-out':case'zoom-reset':{const controls=activeView==='graph'?{ 'zoom-in':'graphZoomIn','zoom-out':'graphZoomOut','zoom-reset':'graphReset'}:activeView==='camerastudio'?{'zoom-in':'ciZoomIn','zoom-out':'ciZoomOut','zoom-reset':'ciFit'}:null;if(!controls||!$(controls[m.action]))throw Error('Zoom is available in Functions & Graphs and Camera & Image Studio');$(controls[m.action]).click();return'Zoom updated'}default:throw Error('Unsupported command')}}","cs32Command");

__studio33.cs32Results = __studio33.$fn((async function cs32Results(){const s=__studio33.cs32Session;if(!s?.results){if(!await __studio33.cs32Grant()||!s?.results)throw Error('Result sharing was not granted')}const pinned=__studio33.activeView;if(!await __studio33.cs32Ask('Share live results?',__studio33.$fn((body,accept)=>{body.append(__studio33.csText('p','Share up to 64 KiB of text results from '+__studio33.views[pinned]+'. Updates are sent while this tool produces results. Switching to other tools does not share them. Review the output for confidential data.'));try{body.append(__studio33.csText('pre',__studio33.u25Result(pinned).slice(0,6000),'u25-preview'))}catch{body.append(__studio33.csText('p','No current text result. Updates begin when a result is available.'))}body.append(__studio33.u19Button('Start sharing this result',accept,'cs32StartResults'))},"(body,accept)=>{body.append(csText('p','Share up to 64 KiB of text results from '+views[pinned]+'. Updates are sent while this tool produces results. Switching to other tools does not share them. Review the output for confidential data.'));try{body.append(csText('pre',u25Result(pinned).slice(0,6000),'u25-preview'))}catch{body.append(csText('p','No current text result. Updates begin when a result is available.'))}body.append(u19Button('Start sharing this result',accept,'cs32StartResults'))}","")))throw Error('Result sharing declined');__studio33.cs32StopResults();__studio33.cs32Pinned=pinned;const emit=__studio33.$fn(()=>{if(!__studio33.cs32Session?.results){__studio33.cs32StopResults();return}try{let text=__studio33.u25Result(__studio33.cs32Pinned);const bytes=new TextEncoder().encode(text);if(bytes.length>65536)text=new TextDecoder().decode(bytes.slice(0,65000))+'\n[Result truncated]';if(text!==__studio33.cs32Last){__studio33.cs32Last=text;__studio33.cs32Session.port?.postMessage({type:'result',label:__studio33.views[__studio33.cs32Pinned],text})}}catch{/* Pending/stale results never replace the reviewed display. */}},"()=>{if(!cs32Session?.results){cs32StopResults();return}try{let text=u25Result(cs32Pinned);const bytes=new TextEncoder().encode(text);if(bytes.length>65536)text=new TextDecoder().decode(bytes.slice(0,65000))+'\\n[Result truncated]';if(text!==cs32Last){cs32Last=text;cs32Session.port?.postMessage({type:'result',label:views[cs32Pinned],text})}}catch{/* Pending/stale results never replace the reviewed display. */}}","emit");emit();__studio33.cs32Timer=setInterval(emit,1000);return'Sharing '+__studio33.views[pinned]}),"async function cs32Results(){const s=cs32Session;if(!s?.results){if(!await cs32Grant()||!s?.results)throw Error('Result sharing was not granted')}const pinned=activeView;if(!await cs32Ask('Share live results?',(body,accept)=>{body.append(csText('p','Share up to 64 KiB of text results from '+views[pinned]+'. Updates are sent while this tool produces results. Switching to other tools does not share them. Review the output for confidential data.'));try{body.append(csText('pre',u25Result(pinned).slice(0,6000),'u25-preview'))}catch{body.append(csText('p','No current text result. Updates begin when a result is available.'))}body.append(u19Button('Start sharing this result',accept,'cs32StartResults'))}))throw Error('Result sharing declined');cs32StopResults();cs32Pinned=pinned;const emit=()=>{if(!cs32Session?.results){cs32StopResults();return}try{let text=u25Result(cs32Pinned);const bytes=new TextEncoder().encode(text);if(bytes.length>65536)text=new TextDecoder().decode(bytes.slice(0,65000))+'\\n[Result truncated]';if(text!==cs32Last){cs32Last=text;cs32Session.port?.postMessage({type:'result',label:views[cs32Pinned],text})}}catch{/* Pending/stale results never replace the reviewed display. */}};emit();cs32Timer=setInterval(emit,1000);return'Sharing '+views[pinned]}","cs32Results");
}
const steps=[
[4288,function initialize_4288(__studio33){
__studio33.cs32Button = __studio33.u19Button('Connection',__studio33.cs32Launch,'cs32ConnectionButton');

}],
[4290,function initialize_4290(__studio33){
__studio33.cs32Session = null;
__studio33.cs32Dialog = null;
__studio33.cs32Timer = null;
__studio33.cs32Pinned = '';
__studio33.cs32Last = '';
__studio33.cs32Busy = false;

}]
];

return {id,register,steps};
})()
];
