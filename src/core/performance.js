// core/performance · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
export const id="core/performance";
export function register(__studio33){
__studio33.u24Defer = __studio33.$fn((function u24Defer(editor,kind){if(__studio33.u24Installing||!editor.closest('section')||editor.closest('#calculator'))return false;(kind==='editor'?__studio33.u24DeferredEditors:__studio33.u24DeferredGutters).set(editor.id,editor);return true}),"function u24Defer(editor,kind){if(u24Installing||!editor.closest('section')||editor.closest('#calculator'))return false;(kind==='editor'?u24DeferredEditors:u24DeferredGutters).set(editor.id,editor);return true}","u24Defer");

__studio33.u24CreateWorker = (function u24CreateWorker(url){try{return new Worker(url)}catch(e){URL.revokeObjectURL(url);throw e}});

__studio33.u24Check = (function u24Check(s){if(!s||s.version!==1||!['auto','standard','performance'].includes(s.mode)||typeof s.diagnostics!=='boolean')throw Error('Invalid performance preferences');return {version:1,mode:s.mode,diagnostics:s.diagnostics}});

__studio33.u24Record = __studio33.$fn((function u24Record(kind,id,start,outcome='complete'){if(!__studio33.u24State.diagnostics)return;const list=kind==='open'?__studio33.u24Metrics.opens:__studio33.u24Metrics.runs;list.push({tool:__studio33.views[id]||id,ms:Math.round((performance.now()-start)*10)/10,outcome});if(list.length>30)list.shift()}),"function u24Record(kind,id,start,outcome='complete'){if(!u24State.diagnostics)return;const list=kind==='open'?u24Metrics.opens:u24Metrics.runs;list.push({tool:views[id]||id,ms:Math.round((performance.now()-start)*10)/10,outcome});if(list.length>30)list.shift()}","u24Record");

__studio33.u24PolishEditor = __studio33.$fn((function u24PolishEditor(editor){const rec=__studio33.v13Editors.get(editor.id);if(!rec)return;const tools=rec.tools;if(!tools.querySelector('.u17-editor-menu')){const find=[...tools.children].find(b=>b.tagName==='BUTTON'&&b.textContent==='Find & replace'),hint=tools.querySelector('span.hint');tools.title=hint?.textContent||'Editor controls';const expand=tools.querySelector('[data-expand]');if(expand)expand.textContent='Expand';if(find)tools.append(__studio33.u17Menu('More','u17-editor-menu',[find]))}const tabs=editor.closest('.field')?.querySelector('.v12-output-tabs');if(tabs&&!tabs.querySelector('.u17-view-menu')){const extra=[...tabs.children].filter(e=>e.tagName==='BUTTON'&&/Changes|Capture/.test(e.textContent));if(extra.length)tabs.append(__studio33.u17Menu('More views','u17-view-menu',extra))}}),"function u24PolishEditor(editor){const rec=v13Editors.get(editor.id);if(!rec)return;const tools=rec.tools;if(!tools.querySelector('.u17-editor-menu')){const find=[...tools.children].find(b=>b.tagName==='BUTTON'&&b.textContent==='Find & replace'),hint=tools.querySelector('span.hint');tools.title=hint?.textContent||'Editor controls';const expand=tools.querySelector('[data-expand]');if(expand)expand.textContent='Expand';if(find)tools.append(u17Menu('More','u17-editor-menu',[find]))}const tabs=editor.closest('.field')?.querySelector('.v12-output-tabs');if(tabs&&!tabs.querySelector('.u17-view-menu')){const extra=[...tabs.children].filter(e=>e.tagName==='BUTTON'&&/Changes|Capture/.test(e.textContent));if(extra.length)tabs.append(u17Menu('More views','u17-view-menu',extra))}}","u24PolishEditor");

__studio33.u24EnsureEditors = __studio33.$fn((function u24EnsureEditors(root,includeClosed=false){if(!root)return;const focus=document.activeElement,selection=focus?.tagName==='TEXTAREA'?[focus.selectionStart,focus.selectionEnd,focus.scrollTop]:null;__studio33.u24Installing=true;try{for(const e of root.querySelectorAll('textarea[id]')){if(!includeClosed&&e.closest('details:not([open]),[hidden]'))continue;__studio33.v13InstallEditor(e);__studio33.u15InstallGutter(e);__studio33.u24DeferredEditors.delete(e.id);__studio33.u24DeferredGutters.delete(e.id);__studio33.u24PolishEditor(e)}}finally{__studio33.u24Installing=false;if(selection&&focus.isConnected&&__studio33.u19Visible(focus)){focus.focus({preventScroll:true});focus.setSelectionRange(selection[0],selection[1]);focus.scrollTop=selection[2]}}}),"function u24EnsureEditors(root,includeClosed=false){if(!root)return;const focus=document.activeElement,selection=focus?.tagName==='TEXTAREA'?[focus.selectionStart,focus.selectionEnd,focus.scrollTop]:null;u24Installing=true;try{for(const e of root.querySelectorAll('textarea[id]')){if(!includeClosed&&e.closest('details:not([open]),[hidden]'))continue;v13InstallEditor(e);u15InstallGutter(e);u24DeferredEditors.delete(e.id);u24DeferredGutters.delete(e.id);u24PolishEditor(e)}}finally{u24Installing=false;if(selection&&focus.isConnected&&u19Visible(focus)){focus.focus({preventScroll:true});focus.setSelectionRange(selection[0],selection[1]);focus.scrollTop=selection[2]}}}","u24EnsureEditors");

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
export const steps=[
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
