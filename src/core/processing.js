// core/processing · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
export const id="core/processing";
export function register(__studio33){
__studio33.u22Check = __studio33.$fn((function u22Check(x){if(!x||x.version!==1||!x.panes||typeof x.panes!=='object'||!x.draftTimes||typeof x.draftTimes!=='object')throw Error('Invalid tool-view preferences');const panes={},draftTimes={};for(const[k,v]of Object.entries(x.panes)){if(!__studio33.u16Splits.has(k)||!['input','result','both'].includes(v))throw Error('Invalid mobile pane');panes[k]=v}for(const[k,v]of Object.entries(x.draftTimes)){if(!__studio33.wsEligible.includes(k)||typeof v!=='string'||!Number.isFinite(Date.parse(v)))throw Error('Invalid draft timestamp');draftTimes[k]=v}return{version:1,panes,draftTimes}}),"function u22Check(x){if(!x||x.version!==1||!x.panes||typeof x.panes!=='object'||!x.draftTimes||typeof x.draftTimes!=='object')throw Error('Invalid tool-view preferences');const panes={},draftTimes={};for(const[k,v]of Object.entries(x.panes)){if(!u16Splits.has(k)||!['input','result','both'].includes(v))throw Error('Invalid mobile pane');panes[k]=v}for(const[k,v]of Object.entries(x.draftTimes)){if(!wsEligible.includes(k)||typeof v!=='string'||!Number.isFinite(Date.parse(v)))throw Error('Invalid draft timestamp');draftTimes[k]=v}return{version:1,panes,draftTimes}}","u22Check");

__studio33.u22Save = __studio33.$fn((function u22Save(){__studio33.csPersist(__studio33.u22Key,__studio33.u22State)}),"function u22Save(){csPersist(u22Key,u22State)}","u22Save");

__studio33.u22Status = __studio33.$fn((function u22Status(id,state,message=''){const r=__studio33.u22Runs.get(id);if(!r)return;r.state=state;window.dispatchEvent(new CustomEvent('studio:calculation-state',{detail:{workspace:id,state,time:r.time}}));r.bar.dataset.state=state;r.badge.textContent={ready:'Ready',running:'Processing',complete:'Complete',stale:'Inputs changed',error:'Needs attention',cancelled:'Cancelled'}[state]||state;r.note.textContent=message||(state==='stale'?'Run again to refresh the result.':state==='complete'?'Last run '+new Date(r.time).toLocaleTimeString():state==='ready'?'Generate a result when ready.':'');}),"function u22Status(id,state,message=''){const r=u22Runs.get(id);if(!r)return;r.state=state;window.dispatchEvent(new CustomEvent('studio:calculation-state',{detail:{workspace:id,state,time:r.time}}));r.bar.dataset.state=state;r.badge.textContent={ready:'Ready',running:'Processing',complete:'Complete',stale:'Inputs changed',error:'Needs attention',cancelled:'Cancelled'}[state]||state;r.note.textContent=message||(state==='stale'?'Run again to refresh the result.':state==='complete'?'Last run '+new Date(r.time).toLocaleTimeString():state==='ready'?'Generate a result when ready.':'');}","u22Status");

__studio33.u22Complete = __studio33.$fn((function u22Complete(id){const r=__studio33.u22Runs.get(id);if(!r)return;r.time=Date.now();__studio33.u22Status(id,'complete')}),"function u22Complete(id){const r=u22Runs.get(id);if(!r)return;r.time=Date.now();u22Status(id,'complete')}","u22Complete");

__studio33.u22Inputs = __studio33.$fn((function u22Inputs(id){const p=__studio33.$(id);return JSON.stringify([...p.querySelectorAll('textarea:not([readonly]),input:not([readonly]),select')].filter(e=>e.closest('section')===p&&!e.closest('.u22-ui,.u19-view-actions,.v13-editor-tools,.u17-editor-controls,[data-numerical-policy]')&&e.type!=='file'&&!/Search|Filter|diffFilter|diffSearch|lcResponse/i.test(e.id)).map(e=>[e.id,e.type==='checkbox'?e.checked:e.value]))}),"function u22Inputs(id){const p=$(id);return JSON.stringify([...p.querySelectorAll('textarea:not([readonly]),input:not([readonly]),select')].filter(e=>e.closest('section')===p&&!e.closest('.u22-ui,.u19-view-actions,.v13-editor-tools,.u17-editor-controls,[data-numerical-policy]')&&e.type!=='file'&&!/Search|Filter|diffFilter|diffSearch|lcResponse/i.test(e.id)).map(e=>[e.id,e.type==='checkbox'?e.checked:e.value]))}","u22Inputs");

__studio33.u22Changed = __studio33.$fn((function u22Changed(e){const id=e.target.closest('section')?.id,r=__studio33.u22Runs.get(id);if(!r||e.target.readOnly||e.target.closest('.u22-ui,.u19-view-actions,.v13-editor-tools,.u17-editor-controls,[data-numerical-policy]'))return;const signature=__studio33.u22Inputs(id);if(signature===r.signature)return;r.signature=signature;if(r.state==='complete'||r.state==='running'||r.state==='stale')__studio33.u22Status(id,'stale');for(const[key,job]of [...__studio33.editionWorkers])if(job.owner===id&&key.startsWith('u22-')){__studio33.stopEditionWorker(key);job.failure?.();__studio33.refreshTaskUI()}}),"function u22Changed(e){const id=e.target.closest('section')?.id,r=u22Runs.get(id);if(!r||e.target.readOnly||e.target.closest('.u22-ui,.u19-view-actions,.v13-editor-tools,.u17-editor-controls,[data-numerical-policy]'))return;const signature=u22Inputs(id);if(signature===r.signature)return;r.signature=signature;if(r.state==='complete'||r.state==='running'||r.state==='stale')u22Status(id,'stale');for(const[key,job]of [...editionWorkers])if(job.owner===id&&key.startsWith('u22-')){stopEditionWorker(key);job.failure?.();refreshTaskUI()}}","u22Changed");

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
export const steps=[
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
