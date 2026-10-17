// core/storage · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
export const id="core/storage";
export function register(__studio33){
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
export const steps=[
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
