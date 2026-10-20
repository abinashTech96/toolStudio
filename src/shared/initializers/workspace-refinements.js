// Original initializer positions are part of the compatibility contract.
export const steps3=[
[3005,function initialize_3005(__studio33){
for(const[id,c]of Object.entries(__studio33.u24EmptyConfigs)){if(c.fields.some(__studio33.$fn(k=>!__studio33.$(k),"k=>!$(k)","")))continue;const p=__studio33.$(id),box=__studio33.csText('div','','u24-empty');box.id='u24Empty-'+id;box.append(__studio33.csText('p','Start with your data or an example.'));const actions=__studio33.csText('div','','u24-empty-actions');actions.append(__studio33.u19Button('Paste data',__studio33.$fn(async()=>{const e=__studio33.$(c.fields[0]);try{if(!navigator.clipboard?.readText)throw Error('unavailable');const text=await navigator.clipboard.readText();if(text.length>2097152)throw Error('size');__studio33.u15Change(e,text);e.focus()}catch{__studio33.toast('Paste with your keyboard or the device paste menu.');e.focus()}},"async()=>{const e=$(c.fields[0]);try{if(!navigator.clipboard?.readText)throw Error('unavailable');const text=await navigator.clipboard.readText();if(text.length>2097152)throw Error('size');u15Change(e,text);e.focus()}catch{toast('Paste with your keyboard or the device paste menu.');e.focus()}}",""),'u24Paste-'+id));if(c.upload&&__studio33.$(c.upload))actions.append(__studio33.u19Button('Upload file',__studio33.$fn(()=>__studio33.$(c.upload).click(),"()=>$(c.upload).click()",""),'u24Upload-'+id));actions.append(__studio33.u19Button('Load example',__studio33.$fn(()=>c.fields.forEach(__studio33.$fn((k,i)=>__studio33.u15Change(__studio33.$(k),c.example[i]||c.example[0]),"(k,i)=>u15Change($(k),c.example[i]||c.example[0])","")),"()=>c.fields.forEach((k,i)=>u15Change($(k),c.example[i]||c.example[0]))",""),'u24Example-'+id));box.append(actions);p.querySelector('.panel-heading').after(box);__studio33.u24EmptyBars.set(id,box);for(const k of c.fields)__studio33.$(k).addEventListener('input',__studio33.$fn(()=>__studio33.u24EmptyRefresh(id),"()=>u24EmptyRefresh(id)",""));__studio33.u24EmptyRefresh(id)}
}],
[3008,function initialize_3008(__studio33){
__studio33.u24UndoBar.id='u24UndoClear';
}],
[3009,function initialize_3009(__studio33){
__studio33.u24UndoBar.hidden=true;
}],
[3011,function initialize_3011(__studio33){
__studio33.u24UndoBar.append(__studio33.u24UndoLabel,__studio33.u19Button('Undo clear',__studio33.$fn(()=>{const r=__studio33.u24Undo;if(!r)return;const signature=__studio33.u24TextSignature(r.id);if(signature!==r.after){__studio33.u24ForgetUndo();__studio33.toast('New input entered; clear undo was dismissed.');return}for(const[k,v]of Object.entries(r.values))if(__studio33.$(k))__studio33.u15Change(__studio33.$(k),v);__studio33.u24ForgetUndo();__studio33.u24EmptyRefresh(r.id);__studio33.toast('Inputs restored. Run the tool to refresh results.')},"()=>{const r=u24Undo;if(!r)return;const signature=u24TextSignature(r.id);if(signature!==r.after){u24ForgetUndo();toast('New input entered; clear undo was dismissed.');return}for(const[k,v]of Object.entries(r.values))if($(k))u15Change($(k),v);u24ForgetUndo();u24EmptyRefresh(r.id);toast('Inputs restored. Run the tool to refresh results.')}",""),'u24UndoClearButton'),__studio33.u19Button('Dismiss',__studio33.u24ForgetUndo));
}],
[3012,function initialize_3012(__studio33){
__studio33.u19Card.append(__studio33.u24UndoBar);
}],
[3016,function initialize_3016(__studio33){
for(const id of Object.keys(__studio33.u24EmptyConfigs)){const p=__studio33.$(id);if(!p)continue;for(const b of p.querySelectorAll('button[id]')){if(!/Clear$/i.test(b.id)||!b.onclick||b.closest('section')!==p)continue;const old=b.onclick;b.onclick=__studio33.$fn(function(...args){const values=__studio33.u24TextValues(id),before=JSON.stringify(values),out=old.apply(this,args),done=__studio33.$fn(()=>{__studio33.u24EmptyRefresh(id);const after=__studio33.u24TextSignature(id);if(before!==after&&before.length<=4194304){__studio33.u24ForgetUndo();__studio33.u24Undo={id,values,after};__studio33.u24UndoLabel.textContent=__studio33.views[id]+' inputs cleared · Undo available for 15 seconds';__studio33.u24UndoBar.hidden=false;__studio33.u24UndoTimer=setTimeout(__studio33.u24ForgetUndo,15000)}},"()=>{u24EmptyRefresh(id);const after=u24TextSignature(id);if(before!==after&&before.length<=4194304){u24ForgetUndo();u24Undo={id,values,after};u24UndoLabel.textContent=views[id]+' inputs cleared · Undo available for 15 seconds';u24UndoBar.hidden=false;u24UndoTimer=setTimeout(u24ForgetUndo,15000)}}","done");if(out?.then)return out.finally(done);done();return out},"function(...args){const values=u24TextValues(id),before=JSON.stringify(values),out=old.apply(this,args),done=()=>{u24EmptyRefresh(id);const after=u24TextSignature(id);if(before!==after&&before.length<=4194304){u24ForgetUndo();u24Undo={id,values,after};u24UndoLabel.textContent=views[id]+' inputs cleared · Undo available for 15 seconds';u24UndoBar.hidden=false;u24UndoTimer=setTimeout(u24ForgetUndo,15000)}};if(out?.then)return out.finally(done);done();return out}","")}}
}],
[3017,function initialize_3017(__studio33){
document.addEventListener('input',__studio33.$fn(e=>{if(__studio33.u24Undo&&e.target.closest('section')?.id===__studio33.u24Undo.id&&__studio33.u24TextSignature(__studio33.u24Undo.id)!==__studio33.u24Undo.after)__studio33.u24ForgetUndo()},"e=>{if(u24Undo&&e.target.closest('section')?.id===u24Undo.id&&u24TextSignature(u24Undo.id)!==u24Undo.after)u24ForgetUndo()}",""));
}],
[3020,function initialize_3020(__studio33){
document.addEventListener('click',__studio33.$fn(e=>{const b=e.target.closest('button'),id=b?.closest('section')?.id;if(!id||/Clear|Copy|Download|Upload|Cancel|Close|Undo|Focus|TextSize/i.test(b.id))return;__studio33.u24Action={id,at:performance.now()}},"e=>{const b=e.target.closest('button'),id=b?.closest('section')?.id;if(!id||/Clear|Copy|Download|Upload|Cancel|Close|Undo|Focus|TextSize/i.test(b.id))return;u24Action={id,at:performance.now()}}",""),true);
}],
[3024,function initialize_3024(__studio33){
__studio33.newToolStatus=__studio33.$fn(function(id,message,error=false){__studio33.u24OldNewStatus(id,message,error);__studio33.u24FieldError(__studio33.$(id),message,error);__studio33.u24EmptyRefresh(__studio33.$(id)?.closest('section')?.id)},"function(id,message,error=false){u24OldNewStatus(id,message,error);u24FieldError($(id),message,error);u24EmptyRefresh($(id)?.closest('section')?.id)}","");
}],
[3026,function initialize_3026(__studio33){
__studio33.csStatus=__studio33.$fn(function(id,message,error=false){__studio33.u24OldCSStatus(id,message,error);__studio33.u24FieldError(__studio33.$(id+'Status'),message,error);__studio33.u24EmptyRefresh(id)},"function(id,message,error=false){u24OldCSStatus(id,message,error);u24FieldError($(id+'Status'),message,error);u24EmptyRefresh(id)}","");
}],
[3029,function initialize_3029(__studio33){
document.addEventListener('input',__studio33.$fn(e=>__studio33.u24ClearError(e.target),"e=>u24ClearError(e.target)",""));
}],
[3031,function initialize_3031(__studio33){
__studio33.u24StorageSummary.id='u24StorageSummary';
}],
[3032,function initialize_3032(__studio33){
__studio33.u24StorageList.id='u24StorageList';
}],
[3033,function initialize_3033(__studio33){
__studio33.u24StorageReview.id='u24StorageReview';
}],
[3034,function initialize_3034(__studio33){
__studio33.u24Storage.append(__studio33.csText('p','Review saved-data size in this browser. Download a full backup before cleanup. Uploaded media and unsaved results live in memory and are not included in these totals.'),__studio33.u24StorageSummary,__studio33.u24StorageList,__studio33.u24StorageReview);
}],
[3043,function initialize_3043(__studio33){
__studio33.u24StorageConfirm.type='checkbox';
}],
[3044,function initialize_3044(__studio33){
__studio33.u24StorageConfirm.id='u24StorageConfirm';
}],
[3045,function initialize_3045(__studio33){
__studio33.u24StorageConfirmRow.append(__studio33.u24StorageConfirm,__studio33.csText('span','I reviewed the selected groups and want to clear them.'));
}],
[3046,function initialize_3046(__studio33){
__studio33.u24Storage.append(__studio33.u24StorageConfirmRow,__studio33.u19Button('Download full backup',__studio33.$fn(()=>__studio33.downloadFile('calc-studio-before-cleanup.json',JSON.stringify(__studio33.backupSnapshot(),null,2),'application/json'),"()=>downloadFile('calc-studio-before-cleanup.json',JSON.stringify(backupSnapshot(),null,2),'application/json')",""),'u24StorageBackup'),__studio33.u19Button('Refresh usage',__studio33.u24StorageRender,'u24StorageRefresh'),__studio33.u19Button('Clear selected saved data',__studio33.$fn(()=>{const keys=__studio33.u24StorageSelection();if(!keys.length)return;if(!__studio33.u24StorageConfirm.checked){__studio33.u24StorageReview.textContent='Review the selected groups and check the confirmation before cleanup.';__studio33.u24StorageConfirm.focus();return}try{clearTimeout(__studio33.wsTimer);clearTimeout(__studio33.jsonDebounce);for(const owner of new Set([...__studio33.editionWorkers.values()].map(e=>e.owner)))__studio33.cancelStudioTasks(owner);__studio33.lcJob?.controller.abort();for(const key of keys)localStorage.removeItem(key);location.reload()}catch(e){__studio33.u24StorageReview.textContent='Cleanup could not finish: '+e.message+'. Restore from your backup if needed.'}},"()=>{const keys=u24StorageSelection();if(!keys.length)return;if(!u24StorageConfirm.checked){u24StorageReview.textContent='Review the selected groups and check the confirmation before cleanup.';u24StorageConfirm.focus();return}try{clearTimeout(wsTimer);clearTimeout(jsonDebounce);for(const owner of new Set([...editionWorkers.values()].map(e=>e.owner)))cancelStudioTasks(owner);lcJob?.controller.abort();for(const key of keys)localStorage.removeItem(key);location.reload()}catch(e){u24StorageReview.textContent='Cleanup could not finish: '+e.message+'. Restore from your backup if needed.'}}",""),'u24StorageClear'));
}],
[3047,function initialize_3047(__studio33){
document.querySelector('.studio-menu-body').insertBefore(__studio33.u19Button('Storage & cleanup…',__studio33.$fn(()=>{__studio33.u24StorageRender();__studio33.u19OpenDialog(__studio33.u24Storage,__studio33.$('u24StorageClose'))},"()=>{u24StorageRender();u19OpenDialog(u24Storage,$('u24StorageClose'))}",""),'u24StorageButton'),__studio33.$('u22ResetButton'));
}],
[3050,function initialize_3050(__studio33){
__studio33.$('u24StorageBackup').before(__studio33.u24RecordsExport);
}],
[3052,function initialize_3052(__studio33){
__studio33.u24Storage.append(__studio33.u24RecordsHelp);
}],
[3054,function initialize_3054(__studio33){
__studio33.u24RecordsRestore.append(__studio33.csText('summary','Restore saved records'));
}],
[3056,function initialize_3056(__studio33){
__studio33.u24RecordsFile.type='file';
}],
[3057,function initialize_3057(__studio33){
__studio33.u24RecordsFile.accept='.json';
}],
[3058,function initialize_3058(__studio33){
__studio33.u24RecordsFile.id='u24RecordsFile';
}],
[3059,function initialize_3059(__studio33){
__studio33.u24RecordsFile.setAttribute('aria-label','Saved-record export');
}],
[3061,function initialize_3061(__studio33){
__studio33.u24RecordsStatus.id='u24RecordsStatus';
}],
[3064,function initialize_3064(__studio33){
__studio33.u24RecordsConfirm.type='checkbox';
}],
[3065,function initialize_3065(__studio33){
__studio33.u24RecordsConfirm.id='u24RecordsConfirm';
}],
[3066,function initialize_3066(__studio33){
__studio33.u24RecordsConfirmRow.append(__studio33.u24RecordsConfirm,__studio33.csText('span','Replace matching saved records with the reviewed file.'));
}],
[3068,function initialize_3068(__studio33){
__studio33.u24RecordsFile.onchange=__studio33.$fn(async()=>{__studio33.u24RecordsPending=null;__studio33.u24RecordsConfirm.checked=false;__studio33.u24RecordsApply.disabled=true;try{const f=__studio33.u24RecordsFile.files[0];if(!f)return;if(f.size>12*1024*1024)throw Error('Saved-record export limit: 12 MiB');const records=__studio33.u24RecordsCheck(JSON.parse(await f.text()));__studio33.u24RecordsPending=records;const keys=Object.keys(records),existing=keys.filter(k=>localStorage.getItem(k)!==null).length;__studio33.u24RecordsStatus.textContent='Reviewed '+keys.length+' Calc Studio records; '+existing+' matching records will be replaced. Other records stay. Applying reloads the app and releases unsaved input/results.';__studio33.u24RecordsApply.disabled=!keys.length}catch(e){__studio33.u24RecordsStatus.textContent=e.message}},"async()=>{u24RecordsPending=null;u24RecordsConfirm.checked=false;u24RecordsApply.disabled=true;try{const f=u24RecordsFile.files[0];if(!f)return;if(f.size>12*1024*1024)throw Error('Saved-record export limit: 12 MiB');const records=u24RecordsCheck(JSON.parse(await f.text()));u24RecordsPending=records;const keys=Object.keys(records),existing=keys.filter(k=>localStorage.getItem(k)!==null).length;u24RecordsStatus.textContent='Reviewed '+keys.length+' Calc Studio records; '+existing+' matching records will be replaced. Other records stay. Applying reloads the app and releases unsaved input/results.';u24RecordsApply.disabled=!keys.length}catch(e){u24RecordsStatus.textContent=e.message}}","");
}],
[3070,function initialize_3070(__studio33){
__studio33.u24RecordsApply.disabled=true;
}],
[3071,function initialize_3071(__studio33){
__studio33.u24RecordsRestore.append(__studio33.u24RecordsFile,__studio33.u24RecordsStatus,__studio33.u24RecordsConfirmRow,__studio33.u24RecordsApply);
}],
[3072,function initialize_3072(__studio33){
__studio33.u24Storage.append(__studio33.u24RecordsRestore);
}],
[3073,function initialize_3073(__studio33){
__studio33.$('u24StorageBackup').textContent='Download app backup';
}],
[3074,function initialize_3074(__studio33){
__studio33.u24Storage.querySelector('p').textContent='Review saved-data size in this browser. Download all saved records before cleanup. Uploaded media and unsaved results live in memory and are not included in these totals.';
}],
[3076,function initialize_3076(__studio33){
for(const id of Object.keys(__studio33.views)){const p=__studio33.$(id);if(!p)continue;for(const b of p.querySelectorAll('button[id][data-u17-role=primary],#hashText,#verifyRun,#inspectHash')){if(b.closest('section')!==p||!b.onclick)continue;const old=b.onclick;b.onclick=__studio33.$fn(function(...args){if(__studio33.u24RunningButtons.has(b)){__studio33.toast('This action is still running.');return}const start=performance.now();let result;try{result=old.apply(this,args)}catch(e){__studio33.u24Record('run',id,start,'error');throw e}if(!result?.then){if(![...__studio33.editionWorkers.values()].some(e=>e.owner===id))__studio33.u24Record('run',id,start);return result}__studio33.u24RunningButtons.add(b);b.setAttribute('aria-busy','true');return result.then(__studio33.$fn(value=>{__studio33.u24Record('run',id,start);return value},"value=>{u24Record('run',id,start);return value}",""),__studio33.$fn(e=>{__studio33.u24Record('run',id,start,'error');throw e},"e=>{u24Record('run',id,start,'error');throw e}","")).finally(__studio33.$fn(()=>{__studio33.u24RunningButtons.delete(b);b.removeAttribute('aria-busy')},"()=>{u24RunningButtons.delete(b);b.removeAttribute('aria-busy')}",""))},"function(...args){if(u24RunningButtons.has(b)){toast('This action is still running.');return}const start=performance.now();let result;try{result=old.apply(this,args)}catch(e){u24Record('run',id,start,'error');throw e}if(!result?.then){if(![...editionWorkers.values()].some(e=>e.owner===id))u24Record('run',id,start);return result}u24RunningButtons.add(b);b.setAttribute('aria-busy','true');return result.then(value=>{u24Record('run',id,start);return value},e=>{u24Record('run',id,start,'error');throw e}).finally(()=>{u24RunningButtons.delete(b);b.removeAttribute('aria-busy')})}","")}}
}],
[3077,function initialize_3077(__studio33){
__studio33.backupKeys.push(__studio33.u24Key);
}],
[3078,function initialize_3078(__studio33){
__studio33.u22SettingKeys.push(__studio33.u24Key);
}],
[3080,function initialize_3080(__studio33){
__studio33.backupSnapshot=__studio33.$fn(function(){const b=__studio33.u24OldBackup();b.state[__studio33.u24Key]=__studio33.csClone(__studio33.u24State);return b},"function(){const b=u24OldBackup();b.state[u24Key]=csClone(u24State);return b}","");
}],
[3082,function initialize_3082(__studio33){
__studio33.validateBackup=__studio33.$fn(function(data){const b={...data,state:{...data?.state}};if(!Object.hasOwn(b.state,__studio33.u24Key))b.state[__studio33.u24Key]=null;const valid=__studio33.u24OldValidate(b);if(valid.state[__studio33.u24Key])valid.state[__studio33.u24Key]=__studio33.u24Check(valid.state[__studio33.u24Key]);return valid},"function(data){const b={...data,state:{...data?.state}};if(!Object.hasOwn(b.state,u24Key))b.state[u24Key]=null;const valid=u24OldValidate(b);if(valid.state[u24Key])valid.state[u24Key]=u24Check(valid.state[u24Key]);return valid}","");
}],
[3084,function initialize_3084(__studio33){
__studio33.csRestoreSavedWork=__studio33.$fn(function(state){__studio33.u24OldRestore(state);__studio33.u24State=state[__studio33.u24Key]?__studio33.u24Check(state[__studio33.u24Key]):{version:1,mode:'auto',diagnostics:false};__studio33.u24ForgetUndo();__studio33.u24ApplyPerformance()},"function(state){u24OldRestore(state);u24State=state[u24Key]?u24Check(state[u24Key]):{version:1,mode:'auto',diagnostics:false};u24ForgetUndo();u24ApplyPerformance()}","");
}],
[3085,function initialize_3085(__studio33){
for(const dialog of [__studio33.u24Performance,__studio33.u24Storage])dialog.addEventListener('close',__studio33.$fn(()=>{let focus=__studio33.u19DialogFocus.get(dialog);const closed=focus?.closest('details:not([open])');if(closed)focus=closed.querySelector(':scope>summary');if(focus&&__studio33.u19Visible(focus))focus.focus({preventScroll:true});__studio33.u19SyncExit()},"()=>{let focus=u19DialogFocus.get(dialog);const closed=focus?.closest('details:not([open])');if(closed)focus=closed.querySelector(':scope>summary');if(focus&&u19Visible(focus))focus.focus({preventScroll:true});u19SyncExit()}",""));
}],
[3086,function initialize_3086(__studio33){
__studio33.u24Booting=false;
}],
[3087,function initialize_3087(__studio33){
__studio33.u24ApplyPerformance();
}],
[3088,function initialize_3088(__studio33){
__studio33.u24EnsureEditors(__studio33.$(__studio33.u23Home(__studio33.activeView)));
}],
[3089,function initialize_3089(__studio33){
__studio33.renderJSONDiff();
}],
[3090,function initialize_3090(__studio33){
__studio33.u24Metrics.setupMs=performance.now()-__studio33.u24SetupStart;
}],
[3091,function initialize_3091(__studio33){
__studio33.u24Metrics.readyMs=performance.now();
}],
[3092,function initialize_3092(__studio33){
window.calcStudio=Object.freeze({...window.calcStudio,version:21,openTool:__studio33.$fn(id=>__studio33.openTab(id),"id=>openTab(id)",""),performance:__studio33.$fn(()=>__studio33.u24Diagnostics(),"()=>u24Diagnostics()","")});
}],
[3093,function initialize_3093(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 21';
}],
[3094,function initialize_3094(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Performance, storage & easier entry'),__studio33.csText('p','Options → Performance selects Auto, Standard or Performance effects and optional local timing measurements. Editor controls initialize when used. Long result tables, differences and Kanban cards use bounded pages; downloads retain complete data. Large JSON comparisons use the cancellable task bar. Options → Storage & cleanup shows saved-data sizes with backup and reviewed selective cleanup. Empty supported tools offer Paste, Upload or Load example; supported text clears have a 15-second Undo. Action searches include compare JSON, calculate EMI and hash file. Explicit media clear/unload releases temporary sources.'));
}],
[3106,function initialize_3106(__studio33){
try{__studio33.u25State=__studio33.u25Check(__studio33.storage.get(__studio33.u25Key,__studio33.u25Defaults))}catch{__studio33.u25State=__studio33.csClone(__studio33.u25Defaults)}
}],
[3115,function initialize_3115(__studio33){
__studio33.u25Hub.append(__studio33.csText('p','Connect tools, reuse setups and process files. Every input replacement has a review step.'),__studio33.u25HubCards);
}],
[3118,function initialize_3118(__studio33){
document.querySelector('.studio-menu-body').insertBefore(__studio33.u25HubButton,__studio33.$('u22ResetButton'));
}],
[3120,function initialize_3120(__studio33){
__studio33.u25Profiles.append(__studio33.csText('p','Save a set of tools and display preferences. Input templates are optional and limited to supported text/calculation tools. API authentication, JWTs, passwords, uploads and results are excluded. Review any personal data inside ordinary text or JSON before saving.'));
}],
[3122,function initialize_3122(__studio33){
__studio33.u25ProfileName.maxLength=100;
}],
[3124,function initialize_3124(__studio33){
__studio33.u25ProfileList.id='u25ProfileList';
}],
[3125,function initialize_3125(__studio33){
__studio33.u25Profiles.append(__studio33.u25ProfileList);
}],
[3129,function initialize_3129(__studio33){
__studio33.u25ProfileSearch.oninput=__studio33.u25ProfileChoices;
}],
[3131,function initialize_3131(__studio33){
__studio33.u25ProfilePreview.id='u25ProfilePreview';
}],
[3132,function initialize_3132(__studio33){
__studio33.u25Profiles.append(__studio33.u25ProfilePreview,__studio33.u25ProfileStatus);
}],
[3135,function initialize_3135(__studio33){
__studio33.u25Saved.onchange=__studio33.u25ProfileReview;
}],
[3137,function initialize_3137(__studio33){
__studio33.u25Profiles.append(__studio33.u25ProfileActions);
}],
[3139,function initialize_3139(__studio33){
__studio33.$('u25ProfileUndo').disabled=true;
}],
[3141,function initialize_3141(__studio33){
__studio33.u25ProfileImport.accept='.json';
}],
[3142,function initialize_3142(__studio33){
__studio33.u25ProfileImport.onchange=__studio33.u25Safe(__studio33.$fn(async()=>{const f=__studio33.u25ProfileImport.files[0];if(!f)return;if(f.size>4*1024*1024)throw Error('Profile import limit: 4 MiB');const imported=__studio33.u25Check(JSON.parse(await f.text()));__studio33.u25State=__studio33.u25Check({...__studio33.u25State,profiles:[...__studio33.u25State.profiles,...imported.profiles.map(__studio33.$fn(p=>({...p,id:__studio33.csId('profile')}),"p=>({...p,id:csId('profile')})",""))]});__studio33.u25Save();__studio33.u25ProfileRender();__studio33.u25ProfileStatus.textContent='Profiles imported. Review before applying.'},"async()=>{const f=u25ProfileImport.files[0];if(!f)return;if(f.size>4*1024*1024)throw Error('Profile import limit: 4 MiB');const imported=u25Check(JSON.parse(await f.text()));u25State=u25Check({...u25State,profiles:[...u25State.profiles,...imported.profiles.map(p=>({...p,id:csId('profile')}))]});u25Save();u25ProfileRender();u25ProfileStatus.textContent='Profiles imported. Review before applying.'}",""),__studio33.u25ProfileStatus);
}],
[3144,function initialize_3144(__studio33){
__studio33.u25ProfileLinks.id='u25ProfileLinks';
}],
[3145,function initialize_3145(__studio33){
__studio33.u25ProfileLinks.setAttribute('aria-label','Active workspace profile tools');
}],
[3146,function initialize_3146(__studio33){
__studio33.u25ProfileLinks.hidden=true;
}],
[3147,function initialize_3147(__studio33){
__studio33.u19Card.prepend(__studio33.u25ProfileLinks);
}],
[3154,function initialize_3154(__studio33){
__studio33.u25TransferPreview.id='u25TransferPreview';
}],
[3164,function initialize_3164(__studio33){
__studio33.u25Share.append(__studio33.csText('p','Links contain only the selected tool and display preferences by default. Optional input templates are visible to anyone receiving the link or setup file. API credentials, tokens and uploads are excluded. A local file link requires the recipient to have the HTML; download a setup file for a portable alternative.'));
}],
[3166,function initialize_3166(__studio33){
__studio33.u25SharePreview.id='u25SharePreview';
}],
[3168,function initialize_3168(__studio33){
__studio33.u25ShareLink.readOnly=true;
}],
[3169,function initialize_3169(__studio33){
__studio33.u25ShareLink.rows=3;
}],
[3170,function initialize_3170(__studio33){
__studio33.u25Share.append(__studio33.u25SharePreview,__studio33.u25ShareStatus);
}],
[3176,function initialize_3176(__studio33){
__studio33.u25ShareInputs.onchange=__studio33.u25Safe(__studio33.u25ShareRender,__studio33.u25ShareStatus);
}],
[3177,function initialize_3177(__studio33){
__studio33.u25Share.append(__studio33.u19Button('Copy reviewed link',__studio33.u25Safe(__studio33.$fn(async()=>{if(!__studio33.u25ShareLink.value)throw Error('Download the setup file for this setup');await navigator.clipboard.writeText(__studio33.u25ShareLink.value);__studio33.u25ShareStatus.textContent='Link copied.'},"async()=>{if(!u25ShareLink.value)throw Error('Download the setup file for this setup');await navigator.clipboard.writeText(u25ShareLink.value);u25ShareStatus.textContent='Link copied.'}",""),__studio33.u25ShareStatus),'u25ShareCopy'),__studio33.u19Button('Download setup file',__studio33.$fn(()=>__studio33.downloadFile('calc-studio-tool-setup.json',JSON.stringify(__studio33.u25Shared,null,2),'application/json'),"()=>downloadFile('calc-studio-tool-setup.json',JSON.stringify(u25Shared,null,2),'application/json')",""),'u25ShareDownload'));
}],
[3180,function initialize_3180(__studio33){
__studio33.u25SetupPreview.id='u25SetupPreview';
}],
[3181,function initialize_3181(__studio33){
__studio33.u25Setup.append(__studio33.csText('p','Applying replaces the listed input fields and display preferences. Review the complete setup before applying. No tool runs and no API request is sent.'),__studio33.u25SetupPreview,__studio33.u25SetupStatus);
}],
[3183,function initialize_3183(__studio33){
__studio33.u25SetupFile.accept='.json';
}],
[3187,function initialize_3187(__studio33){
__studio33.u25SetupFile.onchange=__studio33.$fn(async()=>{const ticket=++__studio33.u25SetupTicket;__studio33.u25SetupStatus.textContent='Reading setup file…';__studio33.u25Received=null;__studio33.$('u25SetupApply').disabled=true;__studio33.u25SetupPreview.textContent='';try{const f=__studio33.u25SetupFile.files[0];if(!f){__studio33.u25SetupStatus.textContent='Choose a setup file to review.';return;}if(f.size>2*1024*1024)throw Error('Setup import limit: 2 MiB');const text=await f.text();if(ticket!==__studio33.u25SetupTicket)return;__studio33.u25SetupReview(JSON.parse(text))}catch(e){if(ticket===__studio33.u25SetupTicket)__studio33.u25SetupStatus.textContent=e.message}},"async()=>{const ticket=++u25SetupTicket;u25SetupStatus.textContent='Reading setup file…';u25Received=null;$('u25SetupApply').disabled=true;u25SetupPreview.textContent='';try{const f=u25SetupFile.files[0];if(!f){u25SetupStatus.textContent='Choose a setup file to review.';return;}if(f.size>2*1024*1024)throw Error('Setup import limit: 2 MiB');const text=await f.text();if(ticket!==u25SetupTicket)return;u25SetupReview(JSON.parse(text))}catch(e){if(ticket===u25SetupTicket)u25SetupStatus.textContent=e.message}}","");
}],
[3188,function initialize_3188(__studio33){
__studio33.u25Setup.append(__studio33.u19Button('Download received setup',__studio33.$fn(()=>{if(__studio33.u25Received)__studio33.downloadFile('received-tool-setup.json',JSON.stringify(__studio33.u25Received,null,2),'application/json')},"()=>{if(u25Received)downloadFile('received-tool-setup.json',JSON.stringify(u25Received,null,2),'application/json')}",""),'u25SetupDownload'),__studio33.u19Button('Apply reviewed setup',__studio33.u25Safe(__studio33.$fn(()=>{if(!__studio33.u25Received||!__studio33.u25SetupConfirm.checked)throw Error('Load and review a setup, then confirm application');if(__studio33.lcJob||__studio33.editionWorkers.size)throw Error('Finish or cancel processing first');__studio33.wsApply(__studio33.u25Received.templates);__studio33.u25DisplayApply(__studio33.u25Received.display);__studio33.openTab(__studio33.u25Received.tool);__studio33.u25Setup.close();__studio33.toast('Setup applied. Run the tool when ready.')},"()=>{if(!u25Received||!u25SetupConfirm.checked)throw Error('Load and review a setup, then confirm application');if(lcJob||editionWorkers.size)throw Error('Finish or cancel processing first');wsApply(u25Received.templates);u25DisplayApply(u25Received.display);openTab(u25Received.tool);u25Setup.close();toast('Setup applied. Run the tool when ready.')}",""),__studio33.u25SetupStatus),'u25SetupApply'));
}],
[3189,function initialize_3189(__studio33){
__studio33.$('u25SetupApply').disabled=true;
}],
[3192,function initialize_3192(__studio33){
window.addEventListener('hashchange',__studio33.u25ReadFragment);
}],
[3194,function initialize_3194(__studio33){
__studio33.u25Recovery.append(__studio33.csText('p','Choose tools whose unfinished inputs should be saved in this browser. Recovery is opt-in; uploads, live responses and credentials are excluded. Ordinary text/JSON can still contain personal data. Review saved inputs before restoring them.'));
}],
[3196,function initialize_3196(__studio33){
__studio33.u25RecoveryList.id='u25RecoveryList';
}],
[3197,function initialize_3197(__studio33){
__studio33.u25Recovery.append(__studio33.u25RecoveryList);
}],
[3200,function initialize_3200(__studio33){
__studio33.u25RecoveryPreview.id='u25RecoveryPreview';
}],
[3201,function initialize_3201(__studio33){
__studio33.u25Recovery.append(__studio33.u25RecoveryPreview,__studio33.u25RecoveryStatus);
}],
[3206,function initialize_3206(__studio33){
__studio33.$('u25RecoveryRestore').disabled=true;
}],
[3208,function initialize_3208(__studio33){
__studio33.u25RecoveryBanner.id='u25RecoveryBanner';
}],
[3209,function initialize_3209(__studio33){
__studio33.u25RecoveryBanner.append(__studio33.csText('span','Saved unfinished work is available.'),__studio33.u19Button('Review recovery',__studio33.$fn(()=>__studio33.u25ShowRecovery(),"()=>u25ShowRecovery()",""),'u25RecoveryBannerReview'),__studio33.u19Button('Dismiss',__studio33.$fn(()=>{__studio33.u25RecoveryBanner.hidden=true},"()=>{u25RecoveryBanner.hidden=true}","")));
}],
[3210,function initialize_3210(__studio33){
__studio33.u19Card.prepend(__studio33.u25RecoveryBanner);
}],
[3215,function initialize_3215(__studio33){
document.addEventListener('input',__studio33.$fn(e=>{const id=[...__studio33.u25Eligible].find(__studio33.$fn(id=>__studio33.wsElements.get(id)?.includes(e.target.id),"id=>wsElements.get(id)?.includes(e.target.id)",""));if(!id||!__studio33.v12State.recovery.enabled||!__studio33.v12State.recovery.tools.includes(id))return;__studio33.u25Dirty.add(id);clearTimeout(__studio33.u25DraftTimer);__studio33.u25DraftTimer=setTimeout(__studio33.u25Flush,550)},"e=>{const id=[...u25Eligible].find(id=>wsElements.get(id)?.includes(e.target.id));if(!id||!v12State.recovery.enabled||!v12State.recovery.tools.includes(id))return;u25Dirty.add(id);clearTimeout(u25DraftTimer);u25DraftTimer=setTimeout(u25Flush,550)}",""));
}],
[3216,function initialize_3216(__studio33){
window.addEventListener('pagehide',__studio33.u25Flush);
}],
[3217,function initialize_3217(__studio33){
document.addEventListener('visibilitychange',__studio33.$fn(()=>{if(document.hidden)__studio33.u25Flush()},"()=>{if(document.hidden)u25Flush()}",""));
}],
[3219,function initialize_3219(__studio33){
__studio33.u25Batch.append(__studio33.csText('p','Process up to 50 files and 50 MiB total, one file at a time in a background worker. JSON/text inputs are limited to 2 MiB per file; SHA-256 accepts up to 16 MiB per file. Comparisons use one reference file against each selected file. Files remain in memory.'));
}],
[3221,function initialize_3221(__studio33){
__studio33.u25BatchFiles.multiple=true;
}],
[3223,function initialize_3223(__studio33){
__studio33.u25BatchBase.parentElement.hidden=true;
}],
[3225,function initialize_3225(__studio33){
__studio33.u25BatchProgress.id='u25BatchProgress';
}],
[3226,function initialize_3226(__studio33){
__studio33.u25BatchProgress.max=1;
}],
[3227,function initialize_3227(__studio33){
__studio33.u25BatchProgress.value=0;
}],
[3228,function initialize_3228(__studio33){
__studio33.u25BatchProgress.setAttribute('aria-label','Batch progress');
}],
[3230,function initialize_3230(__studio33){
__studio33.u25BatchResults.id='u25BatchResults';
}],
[3231,function initialize_3231(__studio33){
__studio33.u25Batch.append(__studio33.u25BatchProgress,__studio33.u25BatchStatus,__studio33.u25BatchResults);
}],
[3240,function initialize_3240(__studio33){
__studio33.u25BatchClear();
}],
[3241,function initialize_3241(__studio33){
__studio33.u25Batch.addEventListener('close',__studio33.$fn(()=>{if(__studio33.u25BatchJob){__studio33.u25BatchClear();__studio33.u25BatchStatus.textContent='Batch cancelled when the dialog closed.'}},"()=>{if(u25BatchJob){u25BatchClear();u25BatchStatus.textContent='Batch cancelled when the dialog closed.'}}",""));
}],
[3242,function initialize_3242(__studio33){
window.addEventListener('pagehide',__studio33.u25BatchClear);
}],
[3245,function initialize_3245(__studio33){
__studio33.u25SFDetails.append(__studio33.csText('summary','Developer handoffs'));
}],
[3249,function initialize_3249(__studio33){
__studio33.u25SOQLDetails.append(__studio33.csText('summary','Query starters & API handoff'));
}],
[3251,function initialize_3251(__studio33){
__studio33.u25SOQLOrg.placeholder='https://your-org.my.salesforce.com';
}],
[3257,function initialize_3257(__studio33){
__studio33.u25CompositeDetails.append(__studio33.csText('summary','Composite workflow starters'));
}],
[3259,function initialize_3259(__studio33){
__studio33.u25CompositeVersion.value='57.0';
}],
[3261,function initialize_3261(__studio33){
__studio33.u25CompositePreview.id='u25CompositePreview';
}],
[3262,function initialize_3262(__studio33){
__studio33.u25CompositeDetails.append(__studio33.u25CompositePreview,__studio33.u25CompositeStatus);
}],
[3265,function initialize_3265(__studio33){
__studio33.u25CompositeDetails.querySelector('#u25CompositeApply').disabled=true;
}],
[3266,function initialize_3266(__studio33){
for(const e of [__studio33.u25CompositeStarter,__studio33.u25CompositeVersion])e.addEventListener('input',__studio33.$fn(()=>{__studio33.u25CompositePayload=null;__studio33.$('u25CompositeApply').disabled=true;__studio33.u25CompositePreview.textContent='';__studio33.u25CompositeStatus.textContent='Starter changed. Preview again.'},"()=>{u25CompositePayload=null;$('u25CompositeApply').disabled=true;u25CompositePreview.textContent='';u25CompositeStatus.textContent='Starter changed. Preview again.'}",""));
}],
[3269,function initialize_3269(__studio33){
__studio33.u25Limits.append(__studio33.csText('summary','Governor usage summary'),__studio33.csText('p','Summarizes reported usage from the current analyzer result. Uses limits recorded in the log rather than assuming a synchronous/asynchronous limit. Missing metrics remain unknown. Truncated logs may omit their final limit block.'));
}],
[3271,function initialize_3271(__studio33){
__studio33.u25LimitOutput.id='u25LimitOutput';
}],
[3273,function initialize_3273(__studio33){
__studio33.u25Limits.append(__studio33.u25LimitOutput);
}],
[3275,function initialize_3275(__studio33){
__studio33.u25HubItem('Linked tool workflow','Review a result, then place it in another tool without copying.',__studio33.$fn(()=>__studio33.u25ShowTransfer(),"()=>u25ShowTransfer()",""),'u25HubTransfer');
}],
[3276,function initialize_3276(__studio33){
__studio33.u25HubItem('Workspace profiles','Save selected tools, display choices and optional input templates.',__studio33.u25ShowProfiles,'u25HubProfiles');
}],
[3277,function initialize_3277(__studio33){
__studio33.u25HubItem('Batch processing','Format JSON, hash files or compare multiple files to one reference.',__studio33.u25ShowBatch,'u25HubBatch');
}],
[3278,function initialize_3278(__studio33){
__studio33.u25HubItem('Share tool setup','Copy a reviewed setup link or download a portable setup file.',__studio33.u25ShowShare,'u25HubShare');
}],
[3279,function initialize_3279(__studio33){
__studio33.u25HubItem('Load shared setup','Review a setup file before replacing inputs or display choices.',__studio33.u25ShowSetup,'u25HubSetup');
}],
[3280,function initialize_3280(__studio33){
__studio33.u25HubItem('Session recovery','Choose autosaved tools, review unfinished work or discard drafts.',__studio33.u25ShowRecovery,'u25HubRecovery');
}],
[3284,function initialize_3284(__studio33){
__studio33.renderCommands=__studio33.$fn(function(){__studio33.u25OldCommands();const q=__studio33.$('commandSearch').value.trim().toLowerCase(),actions=__studio33.u25PaletteActions.filter(([label,aliases],i)=>q?(label+' '+aliases).toLowerCase().includes(q):i<3),host=__studio33.$('commandResults');if(actions.length&&host.querySelector('p.hint'))host.replaceChildren();for(const[label,aliases,fn]of [...actions].reverse()){const b=__studio33.csText('button','','command-result');b.append(__studio33.csText('strong',label),__studio33.csText('small','Action · '+aliases));b.onclick=__studio33.$fn(()=>{__studio33.closeCommands();fn()},"()=>{closeCommands();fn()}","");host.prepend(b)}const buttons=[...host.querySelectorAll('button')];__studio33.commandIndex=Math.max(0,Math.min(__studio33.commandIndex,buttons.length-1));buttons.forEach(__studio33.$fn((b,i)=>b.classList.toggle('active',i===__studio33.commandIndex),"(b,i)=>b.classList.toggle('active',i===commandIndex)",""));__studio33.commandItems=buttons.map((b,i)=>['u25-action-'+i,b.textContent])},"function(){u25OldCommands();const q=$('commandSearch').value.trim().toLowerCase(),actions=u25PaletteActions.filter(([label,aliases],i)=>q?(label+' '+aliases).toLowerCase().includes(q):i<3),host=$('commandResults');if(actions.length&&host.querySelector('p.hint'))host.replaceChildren();for(const[label,aliases,fn]of [...actions].reverse()){const b=csText('button','','command-result');b.append(csText('strong',label),csText('small','Action · '+aliases));b.onclick=()=>{closeCommands();fn()};host.prepend(b)}const buttons=[...host.querySelectorAll('button')];commandIndex=Math.max(0,Math.min(commandIndex,buttons.length-1));buttons.forEach((b,i)=>b.classList.toggle('active',i===commandIndex));commandItems=buttons.map((b,i)=>['u25-action-'+i,b.textContent])}","");
}],
[3285,function initialize_3285(__studio33){
__studio33.$('commandSearch').placeholder='Find tools, settings or actions';
}],
[3286,function initialize_3286(__studio33){
__studio33.$('commandSearch').setAttribute('aria-label','Find tools, settings or actions');
}],
[3287,function initialize_3287(__studio33){
__studio33.$('commandSearch').onkeydown=__studio33.$fn(e=>{const buttons=[...__studio33.$('commandResults').querySelectorAll('button')];if(!buttons.length)return;if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();__studio33.commandIndex=e.key==='Home'?0:e.key==='End'?buttons.length-1:(__studio33.commandIndex+(e.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length;buttons.forEach(__studio33.$fn((b,i)=>b.classList.toggle('active',i===__studio33.commandIndex),"(b,i)=>b.classList.toggle('active',i===commandIndex)",""));buttons[__studio33.commandIndex].scrollIntoView({block:'nearest'})}else if(e.key==='Enter'){e.preventDefault();buttons[__studio33.commandIndex]?.click()}},"e=>{const buttons=[...$('commandResults').querySelectorAll('button')];if(!buttons.length)return;if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();commandIndex=e.key==='Home'?0:e.key==='End'?buttons.length-1:(commandIndex+(e.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length;buttons.forEach((b,i)=>b.classList.toggle('active',i===commandIndex));buttons[commandIndex].scrollIntoView({block:'nearest'})}else if(e.key==='Enter'){e.preventDefault();buttons[commandIndex]?.click()}}","");
}],
[3288,function initialize_3288(__studio33){
__studio33.backupKeys.push(__studio33.u25Key);
}],
[3289,function initialize_3289(__studio33){
__studio33.u24StorageGroups.push(['profiles','Workspace profiles',[__studio33.u25Key]]);
}],
[3291,function initialize_3291(__studio33){
__studio33.backupSnapshot=__studio33.$fn(function(){const b=__studio33.u25OldBackup();b.state[__studio33.u25Key]=__studio33.csClone(__studio33.u25State);return b},"function(){const b=u25OldBackup();b.state[u25Key]=csClone(u25State);return b}","");
}],
[3293,function initialize_3293(__studio33){
__studio33.validateBackup=__studio33.$fn(function(data){const b={...data,state:{...data?.state}};if(!Object.hasOwn(b.state,__studio33.u25Key))b.state[__studio33.u25Key]=null;const valid=__studio33.u25OldValidate(b);if(valid.state[__studio33.u25Key])valid.state[__studio33.u25Key]=__studio33.u25Check(valid.state[__studio33.u25Key]);return valid},"function(data){const b={...data,state:{...data?.state}};if(!Object.hasOwn(b.state,u25Key))b.state[u25Key]=null;const valid=u25OldValidate(b);if(valid.state[u25Key])valid.state[u25Key]=u25Check(valid.state[u25Key]);return valid}","");
}],
[3295,function initialize_3295(__studio33){
__studio33.csRestoreSavedWork=__studio33.$fn(function(state){__studio33.u25OldRestore(state);__studio33.u25State=state[__studio33.u25Key]?__studio33.u25Check(state[__studio33.u25Key]):__studio33.csClone(__studio33.u25Defaults);__studio33.u25ProfileUndo=null;__studio33.u25ProfileLinks.hidden=true;__studio33.u25ProfileRender();__studio33.u25RecoveryRefresh()},"function(state){u25OldRestore(state);u25State=state[u25Key]?u25Check(state[u25Key]):csClone(u25Defaults);u25ProfileUndo=null;u25ProfileLinks.hidden=true;u25ProfileRender();u25RecoveryRefresh()}","");
}],
[3296,function initialize_3296(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 22';
}],
[3297,function initialize_3297(__studio33){
__studio33.$('helpPanel').querySelector('p').textContent=__studio33.$('helpPanel').querySelector('p').textContent.replace(/^\d+ registered tool\/workspace entries/,Object.keys(__studio33.views).length+' registered tool/workspace entries');
}],
[3298,function initialize_3298(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Connected workspaces'),__studio33.csText('p','Find tool now searches settings and actions as well as tools. Options → Workspace tools opens reviewed result handoffs, workspace profiles, batch file processing, share/import setup and central session recovery. Handoffs and setup imports replace only reviewed inputs and never run a tool or send a request automatically. Salesforce starters extend the existing ID, SOQL, Composite and log tools.'));
}],
[3299,function initialize_3299(__studio33){
window.calcStudio=Object.freeze({...window.calcStudio,version:22,openTool:__studio33.$fn(id=>__studio33.openTab(id),"id=>openTab(id)","")});
}],
[3301,function initialize_3301(__studio33){
__studio33.u25RecoveryReady=true;
}],
[3302,function initialize_3302(__studio33){
__studio33.u25ProfileRender();
}],
[3303,function initialize_3303(__studio33){
__studio33.u25RecoveryRefresh();
}],
[3304,function initialize_3304(__studio33){
__studio33.u25ReadFragment();
}],
[3305,function initialize_3305(__studio33){
for(const dialog of [__studio33.u25Hub,__studio33.u25Profiles,__studio33.u25Transfer,__studio33.u25Share,__studio33.u25Setup,__studio33.u25Recovery,__studio33.u25Batch])dialog.addEventListener('close',__studio33.$fn(()=>{if(__studio33.u19Modal()){__studio33.u19SyncExit();return}let focus=__studio33.u19DialogFocus.get(dialog);const closed=focus?.closest('details:not([open])');if(closed)focus=closed.querySelector(':scope>summary');if(focus&&__studio33.u19Visible(focus))focus.focus({preventScroll:true});__studio33.u19StopEditing();__studio33.u19SyncExit()},"()=>{if(u19Modal()){u19SyncExit();return}let focus=u19DialogFocus.get(dialog);const closed=focus?.closest('details:not([open])');if(closed)focus=closed.querySelector(':scope>summary');if(focus&&u19Visible(focus))focus.focus({preventScroll:true});u19StopEditing();u19SyncExit()}",""));
}],
[3306,function initialize_3306(__studio33){
for(const id of ['u22ResetConfirm','u24StorageClear','u24RecordsApply']){const button=__studio33.$(id),old=button.onclick;button.onclick=__studio33.$fn(function(...args){const permitted=id==='u22ResetConfirm'?(__studio33.u22ResetScope.value!=='all'||__studio33.u22ResetInput.value.trim()==='RESET'):id==='u24StorageClear'?__studio33.u24StorageConfirm.checked&&__studio33.u24StorageSelection().length>0:!!__studio33.u24RecordsPending&&__studio33.u24RecordsConfirm.checked;if(permitted){clearTimeout(__studio33.u25DraftTimer);__studio33.u25Dirty.clear()}return old.apply(this,args)},"function(...args){const permitted=id==='u22ResetConfirm'?(u22ResetScope.value!=='all'||u22ResetInput.value.trim()==='RESET'):id==='u24StorageClear'?u24StorageConfirm.checked&&u24StorageSelection().length>0:!!u24RecordsPending&&u24RecordsConfirm.checked;if(permitted){clearTimeout(u25DraftTimer);u25Dirty.clear()}return old.apply(this,args)}","")}
}],
[3308,function initialize_3308(__studio33){
__studio33.invalidateLogs=__studio33.$fn(function(){__studio33.u25OldInvalidateLogs();__studio33.u25LimitOutput.replaceChildren()},"function(){u25OldInvalidateLogs();u25LimitOutput.replaceChildren()}","");
}],
[3309,function initialize_3309(__studio33){
clearTimeout(__studio33.wsTimer);
}],
[3317,function initialize_3317(__studio33){
__studio33.u24RecordsFile.onchange=__studio33.$fn(async()=>{const ticket=++__studio33.u26RecordsTicket,file=__studio33.u24RecordsFile.files[0];__studio33.u24RecordsPending=null;__studio33.u24RecordsConfirm.checked=false;__studio33.u24RecordsApply.disabled=true;__studio33.u24RecordsStatus.textContent=file?'Reading saved records…':'Choose a saved-record file.';if(!file)return;try{if(file.size>12*1024*1024)throw Error('Saved-record export limit: 12 MiB');const text=await file.text();if(ticket!==__studio33.u26RecordsTicket)return;const records=__studio33.u24RecordsCheck(JSON.parse(text)),keys=Object.keys(records),existing=keys.filter(k=>localStorage.getItem(k)!==null).length;__studio33.u24RecordsPending=records;__studio33.u24RecordsStatus.textContent='Reviewed '+keys.length+' Calc Studio records; '+existing+' matching records will be replaced. Other records stay. Applying reloads the app and releases unsaved input/results.';__studio33.u24RecordsApply.disabled=!keys.length}catch(e){if(ticket===__studio33.u26RecordsTicket)__studio33.u24RecordsStatus.textContent=e.message}},"async()=>{const ticket=++u26RecordsTicket,file=u24RecordsFile.files[0];u24RecordsPending=null;u24RecordsConfirm.checked=false;u24RecordsApply.disabled=true;u24RecordsStatus.textContent=file?'Reading saved records…':'Choose a saved-record file.';if(!file)return;try{if(file.size>12*1024*1024)throw Error('Saved-record export limit: 12 MiB');const text=await file.text();if(ticket!==u26RecordsTicket)return;const records=u24RecordsCheck(JSON.parse(text)),keys=Object.keys(records),existing=keys.filter(k=>localStorage.getItem(k)!==null).length;u24RecordsPending=records;u24RecordsStatus.textContent='Reviewed '+keys.length+' Calc Studio records; '+existing+' matching records will be replaced. Other records stay. Applying reloads the app and releases unsaved input/results.';u24RecordsApply.disabled=!keys.length}catch(e){if(ticket===u26RecordsTicket)u24RecordsStatus.textContent=e.message}}","");
}],
[3332,function initialize_3332(__studio33){
__studio33.u26TextPager.id='u26TextPager';
}],
[3339,function initialize_3339(__studio33){
__studio33.u24PolishEditor=__studio33.$fn(function(editor){if(__studio33.u26Polished.has(editor))return;__studio33.u26PolishOld(editor);__studio33.u26Polished.add(editor)},"function(editor){if(u26Polished.has(editor))return;u26PolishOld(editor);u26Polished.add(editor)}","");
}],
[3340,function initialize_3340(__studio33){
document.addEventListener('visibilitychange',__studio33.$fn(()=>{if(document.hidden){if(__studio33.u24TaskTimer){clearInterval(__studio33.u24TaskTimer);__studio33.u24TaskTimer=0}if(__studio33.u20PointerFrame){cancelAnimationFrame(__studio33.u20PointerFrame);__studio33.u20PointerFrame=0}__studio33.u20PointerPoint=null}else if(__studio33.editionWorkers.size)__studio33.u24TaskClock()},"()=>{if(document.hidden){if(u24TaskTimer){clearInterval(u24TaskTimer);u24TaskTimer=0}if(u20PointerFrame){cancelAnimationFrame(u20PointerFrame);u20PointerFrame=0}u20PointerPoint=null}else if(editionWorkers.size)u24TaskClock()}",""));
}],
[3342,function initialize_3342(__studio33){
window.addEventListener('resize',__studio33.$fn(()=>{if(__studio33.u26PerformanceFrame)return;__studio33.u26PerformanceFrame=requestAnimationFrame(__studio33.$fn(()=>{__studio33.u26PerformanceFrame=0;__studio33.u19Root.dataset.performance=__studio33.u24Effective()?'on':'off'},"()=>{u26PerformanceFrame=0;u19Root.dataset.performance=u24Effective()?'on':'off'}",""))},"()=>{if(u26PerformanceFrame)return;u26PerformanceFrame=requestAnimationFrame(()=>{u26PerformanceFrame=0;u19Root.dataset.performance=u24Effective()?'on':'off'})}",""),{passive:true});
}],
[3343,function initialize_3343(__studio33){
__studio33.u26Booting=false;
}],
[3345,function initialize_3345(__studio33){
__studio33.renderTextDiff();
}],
[3346,function initialize_3346(__studio33){
window.calcStudio=Object.freeze({...window.calcStudio,version:23,openTool:__studio33.$fn(id=>__studio33.openTab(id),"id=>openTab(id)","")});
}],
[3347,function initialize_3347(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 23';
}],
[3348,function initialize_3348(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Existing-tool accuracy & performance'),__studio33.csText('p','Short basic calculator expressions use exact fraction arithmetic before a finite Number result; scientific functions remain approximations. Statistics use scaled compensated sums. Text comparisons align exactly with linear-space frontiers and bounded pages. Large mapping, masking, JSONPath, Composite, response analysis and test-pack runs use cancellable workers. Blank CSV records are retained. Table selection and simple unfiltered cell edits preserve controls. Background timing and theme work pause while hidden.'));
}],
[3349,function initialize_3349(__studio33){
__studio33.CI_HTML = "<div class=\"ci-studio\">\n  <div class=\"ci-actions ci-source\">\n    <button id=\"ciUpload\">Open image</button><button id=\"ciPhoto\">Take photo</button><button id=\"ciCamera\">Live camera</button><button id=\"ciUnload\">Clear studio</button><button id=\"ciStopProcessing\" hidden>Cancel operation</button>\n    <input id=\"ciFile\" type=\"file\" accept=\"image/png,image/jpeg,image/webp,image/bmp,image/avif,image/gif\" hidden>\n    <input id=\"ciCapture\" type=\"file\" accept=\"image/*\" capture=\"environment\" hidden>\n  </div>\n  <p id=\"camerastudioStatus\" class=\"hint developer-status\" role=\"status\">Open a photo or screenshot to begin. Images stay in this tab; they are not saved in browser backups.</p>\n  <div class=\"ci-tabs\" role=\"tablist\" aria-label=\"Camera and image workflows\">\n    <button data-ci-mode=\"edit\" role=\"tab\" aria-controls=\"ciEdit\" aria-selected=\"true\">Edit image</button>\n    <button data-ci-mode=\"extract\" role=\"tab\" aria-controls=\"ciExtract\" aria-selected=\"false\">Extract text</button>\n    <button data-ci-mode=\"qr\" role=\"tab\" aria-controls=\"ciQR\" aria-selected=\"false\">QR scan</button>\n    <button data-ci-mode=\"pdf\" role=\"tab\" aria-controls=\"ciPDF\" aria-selected=\"false\">Photos to PDF</button>\n    <button data-ci-mode=\"batch\" role=\"tab\" aria-controls=\"ciBatch\" aria-selected=\"false\">Batch images</button>\n  </div>\n  <div id=\"ciLive\" hidden>\n    <div class=\"ci25-camera-frame\"><video id=\"ciVideo\" playsinline muted aria-label=\"Live camera preview\"></video><div class=\"ci25-framing\" aria-hidden=\"true\"></div><output id=\"ci25Countdown\" aria-live=\"polite\"></output></div>\n    <div class=\"ci-actions\"><label>Camera <select id=\"ciFacing\"><option value=\"environment\">Rear</option><option value=\"user\">Front</option></select></label><label>Countdown <select id=\"ci25Delay\"><option value=\"0\">Off</option><option value=\"3\">3 seconds</option><option value=\"5\">5 seconds</option></select></label><button id=\"ciSnap\">Capture &amp; review</button><button id=\"ciLiveQR\">Scan live QR</button><button id=\"ciStopCamera\">Stop camera</button></div>\n    <p class=\"hint\">Live access requires browser camera permission. Take photo / Open image remain available when live access is blocked.</p>\n  </div>\n  <div id=\"ciImageArea\">\n    <div class=\"ci-actions ci-history\"><button id=\"ciUndo\" disabled>Undo</button><button id=\"ciRedo\" disabled>Redo</button><button id=\"ciReset\" disabled>Reset to original</button><label><input id=\"ciBefore\" type=\"checkbox\"> Show original</label><button id=\"ciZoomOut\">− Zoom</button><button id=\"ciZoomIn\">+ Zoom</button><button id=\"ciFit\">Fit</button><label><input id=\"ci25Compare\" type=\"checkbox\"> Compare original</label><label id=\"ci25SplitLabel\" hidden>Divider <input id=\"ci25Split\" type=\"range\" min=\"0\" max=\"100\" value=\"50\" aria-label=\"Before and after divider\"></label><span id=\"ciDimensions\" class=\"hint\">No image</span></div>\n    <div id=\"ciViewport\" class=\"ci-viewport\"><canvas id=\"ciCanvas\" width=\"1\" height=\"1\" tabindex=\"0\" aria-label=\"Image preview. Drag for the selected crop, corner or annotation tool.\"></canvas><p id=\"ciEmpty\">Your image preview appears here</p></div>\n    <p id=\"ciPreviewNote\" class=\"hint\">Touch or drag the preview to select an area. Numeric controls are available for precise editing.</p>\n  </div>\n  <section id=\"ciEdit\" role=\"tabpanel\" class=\"ci-mode\">\n    <label class=\"ci-operation\">Editing tool <select id=\"ciOperation\"><option value=\"crop\">Crop & resize</option><option value=\"document\">Document scanner</option><option value=\"annotate\">Annotate & redact</option><option value=\"adjust\">Photo adjustments</option><option value=\"compress\">Image size target</option></select></label>\n    <div data-ci-op=\"crop\">\n      <div class=\"ci-fields\"><label>Aspect ratio <select id=\"ciRatio\"><option value=\"free\">Free</option><option value=\"1\">Square 1:1</option><option value=\"1.3333333333333333\">4:3</option><option value=\"1.7777777777777777\">16:9</option><option value=\"0.75\">Portrait 3:4</option><option value=\"0.5625\">Portrait 9:16</option></select></label><label>Left px <input id=\"ciCropX\" type=\"number\" min=\"0\" value=\"0\"></label><label>Top px <input id=\"ciCropY\" type=\"number\" min=\"0\" value=\"0\"></label><label>Crop width px <input id=\"ciCropW\" type=\"number\" min=\"1\" value=\"1\"></label><label>Crop height px <input id=\"ciCropH\" type=\"number\" min=\"1\" value=\"1\"></label></div>\n      <div class=\"ci-actions\"><button id=\"ciCrop\">Apply crop</button><button id=\"ciSelectionReset\">Select whole image</button><button id=\"ciLeft\">↶ Rotate left</button><button id=\"ciRight\">↷ Rotate right</button><button id=\"ciFlipX\">Flip horizontal</button><button id=\"ciFlipY\">Flip vertical</button></div>\n      <div class=\"ci-fields\"><label>Output width px <input id=\"ciWidth\" type=\"number\" min=\"1\" max=\"8192\" value=\"1\"></label><label>Output height px <input id=\"ciHeight\" type=\"number\" min=\"1\" max=\"8192\" value=\"1\"></label><label><input id=\"ciLock\" type=\"checkbox\" checked> Keep proportions</label></div><button id=\"ciResize\">Apply resize</button><div class=\"ci-fields\"><label>Straighten angle ° <input id=\"ci25Angle\" type=\"number\" min=\"-45\" max=\"45\" step=\"0.1\" value=\"0\"></label><label>Angle preview <input id=\"ci25AngleSlider\" type=\"range\" min=\"-45\" max=\"45\" step=\"0.1\" value=\"0\" aria-label=\"Straighten angle\"></label></div><div class=\"ci-actions\"><button id=\"ci25Straighten\">Apply fine rotation</button><button id=\"ci25AngleCancel\">Cancel angle preview</button></div>\n    </div>\n    <div data-ci-op=\"document\" hidden>\n      <p class=\"hint\">Drag the four labelled corners around the document, in order: top-left, top-right, bottom-right, bottom-left. Or enter their coordinates below.</p>\n      <div id=\"ciCorners\" class=\"ci-fields\"></div>\n      <div class=\"ci-fields\"><label>Output width px <input id=\"ciDocW\" type=\"number\" min=\"16\" max=\"3000\" value=\"1200\"></label><label>Output height px <input id=\"ciDocH\" type=\"number\" min=\"16\" max=\"3000\" value=\"1600\"></label><label>Finish <select id=\"ciDocFinish\"><option value=\"color\">Colour</option><option value=\"gray\">Grayscale</option><option value=\"bw\">Black & white</option></select></label><label>Contrast % <input id=\"ciDocContrast\" type=\"number\" min=\"0\" max=\"200\" value=\"120\"></label></div>\n      <div class=\"ci-actions\"><button id=\"ciDocument\">Straighten document</button><button id=\"ciCornerReset\">Reset corners</button><button id=\"ci25Suggest\">Suggest document corners</button></div>\n    <p id=\"ci25CornerInfo\" class=\"hint\" role=\"status\">Suggested corners are a starting point. Check all four before straightening.</p></div>\n    <div data-ci-op=\"annotate\" hidden>\n      <div class=\"ci-fields\"><label>Mark <select id=\"ciMark\"><option value=\"arrow\">Arrow</option><option value=\"rectangle\">Rectangle</option><option value=\"highlight\">Highlight</option><option value=\"text\">Text</option><option value=\"redact\">Solid redaction</option><option value=\"pen\">Freehand pen</option></select></label><label>Colour <input id=\"ciColor\" type=\"color\" value=\"#ff3b30\"></label><label>Stroke / text size px <input id=\"ciStroke\" type=\"number\" min=\"1\" max=\"200\" value=\"6\"></label><label>Text <input id=\"ciText\" maxlength=\"500\" placeholder=\"Label or note\"></label></div>\n      <details><summary>Place mark using coordinates</summary><div class=\"ci-fields\"><label>Start x <input id=\"ciMarkX\" type=\"number\" value=\"0\" min=\"0\"></label><label>Start y <input id=\"ciMarkY\" type=\"number\" value=\"0\" min=\"0\"></label><label>End x <input id=\"ciMarkX2\" type=\"number\" value=\"100\" min=\"0\"></label><label>End y <input id=\"ciMarkY2\" type=\"number\" value=\"100\" min=\"0\"></label></div><button id=\"ciAddMark\">Apply mark</button></details>\n      <details id=\"ci25MarksPanel\"><summary>Edit existing annotations</summary><label>Annotation <select id=\"ci25MarkList\"><option value=\"\">No editable annotations</option></select></label><p class=\"hint\">Select a mark, then change its coordinates, colour, size or text above. A selected mark can also be dragged to move it.</p><div class=\"ci-actions\"><button id=\"ci25MarkUpdate\">Update selected</button><button id=\"ci25MarkDelete\">Delete selected</button><button id=\"ci25MarkNew\">Draw new mark</button></div><p id=\"ci25MarkInfo\" class=\"hint\">Up to 100 editable marks. Crop, rotate or pixel adjustments flatten the current annotation layer; Undo can restore it.</p></details><p class=\"hint\">Redactions are opaque black blocks. Export contains flattened edited pixels; the original remains available in this tab until Clear studio.</p>\n    </div>\n    <div data-ci-op=\"adjust\" hidden>\n      <div class=\"ci-fields\"><label>Brightness % <input id=\"ciBrightness\" type=\"number\" min=\"0\" max=\"200\" value=\"100\"></label><label>Contrast % <input id=\"ciContrast\" type=\"number\" min=\"0\" max=\"200\" value=\"100\"></label><label>Saturation % <input id=\"ciSaturation\" type=\"number\" min=\"0\" max=\"200\" value=\"100\"></label><label>Grayscale % <input id=\"ciGray\" type=\"number\" min=\"0\" max=\"100\" value=\"0\"></label><label>Sharpen <select id=\"ciSharpen\"><option value=\"0\">Off</option><option value=\"0.5\">Gentle</option><option value=\"1\">Strong</option></select></label></div>\n      <div class=\"ci-actions\"><button id=\"ciAdjust\">Apply adjustments</button><button id=\"ciAdjustReset\">Reset adjustment controls</button><button id=\"ci25AdjustCancel\">Cancel preview</button></div>\n    </div>\n    <div data-ci-op=\"compress\" hidden>\n      <div class=\"ci-fields\"><label>Size target <select id=\"ciTarget\"><option value=\"200\">Under 200 KB</option><option value=\"500\">Under 500 KB</option><option value=\"1000\">Under 1 MB</option><option value=\"custom\">Custom KB</option></select></label><label>Custom KB <input id=\"ciCustomKB\" type=\"number\" min=\"1\" max=\"20000\" value=\"300\"></label><label>Format <select id=\"ciTargetFormat\"><option value=\"image/jpeg\">JPEG</option><option value=\"image/webp\">WebP</option></select></label><label>Minimum quality % <input id=\"ciMinQuality\" type=\"number\" min=\"5\" max=\"90\" value=\"35\"></label><label><input id=\"ciDownsize\" type=\"checkbox\" checked> Reduce dimensions if needed</label></div>\n      <button id=\"ciCompress\">Find size & preview</button><p class=\"hint\">KB means 1,000 bytes. JPEG replaces transparency with the selected export background. Dimensions may shrink when enabled; the actual output is checked against the limit.</p>\n    </div>\n    <div class=\"ci-export\"><details><summary>Export presets &amp; size</summary><div class=\"ci-fields\"><label>Preset <select id=\"ci25Preset\"></select></label><label>Preset name <input id=\"ci25PresetName\" maxlength=\"60\" placeholder=\"My export preset\"></label><label>Maximum export edge px · 0 = unchanged <input id=\"ci25MaxEdge\" type=\"number\" min=\"0\" max=\"8192\" value=\"0\"></label><label>JPEG background <input id=\"ci25Background\" type=\"color\" value=\"#ffffff\"></label></div><div class=\"ci-actions\"><button id=\"ci25PresetApply\">Use preset</button><button id=\"ci25PresetSave\">Save current settings</button><button id=\"ci25PresetDelete\">Delete saved preset</button></div><p id=\"ci25PresetInfo\" class=\"hint\" role=\"status\">Presets save export/PDF settings only, without photos or text.</p></details><div class=\"ci-fields\"><label>Export format <select id=\"ciFormat\"><option value=\"image/png\">PNG · preserve transparency</option><option value=\"image/jpeg\">JPEG · selected background</option><option value=\"image/webp\">WebP</option></select></label><label>Quality % <input id=\"ciQuality\" type=\"number\" min=\"5\" max=\"100\" value=\"90\"></label><label>Filename <input id=\"ciName\" value=\"edited-image\" maxlength=\"80\"></label></div><div class=\"ci-actions\"><button id=\"ciExportPreview\">Prepare export</button><button id=\"ciDownload\" disabled>Download image</button><button id=\"ci25ShareImage\" disabled>Share image</button><button id=\"ciAddPage\">Add edited image to PDF</button></div><div id=\"ciExportResult\" hidden><img id=\"ciExportImage\" alt=\"Actual encoded output preview\"><p id=\"ciExportInfo\" class=\"hint\" role=\"status\"></p><dl id=\"ci25Verification\" class=\"ci25-verification\"></dl></div></div>\n  </section>\n  <section id=\"ciExtract\" role=\"tabpanel\" class=\"ci-mode\" hidden>\n    <p class=\"hint\">English printed text and numbers are bundled for offline extraction. Drag the preview to select a text area, or use the whole image. Straighten your photo in Edit image first if needed. Review every extracted value; this is not reliable handwriting recognition or automatic table reconstruction.</p>\n    <div class=\"ci-fields\"><label>Recognition layout <select id=\"ciOCRLayout\"><option value=\"3\">Automatic page</option><option value=\"6\">Single text block</option><option value=\"7\">Single line</option><option value=\"11\">Scattered text</option></select></label><label><input id=\"ciOCRNumbers\" type=\"checkbox\"> Numbers & arithmetic symbols only</label></div>\n    <div class=\"ci-actions\"><button id=\"ciOCR\">Extract selected area</button><button id=\"ciOCRWhole\">Use whole image</button><button id=\"ciCancel\">Cancel processing</button></div>\n    <details id=\"ci25OCRReview\"><summary>Review recognised words on the photo</summary><div class=\"ci-fields\"><label><input id=\"ci25OCRShow\" type=\"checkbox\" checked> Show word boxes</label><label>Flag confidence below <input id=\"ci25OCRThreshold\" type=\"number\" min=\"0\" max=\"100\" value=\"80\"></label><label>Word to review <select id=\"ci25OCRWord\"></select></label><label>Correction <input id=\"ci25OCRCorrection\" maxlength=\"500\"></label></div><div class=\"ci-actions\"><button id=\"ci25OCRCorrect\">Apply word correction</button><button id=\"ci25OCRPrev\">Previous word</button><button id=\"ci25OCRNext\">Next word</button></div><p id=\"ci25OCRWordInfo\" class=\"hint\" role=\"status\">Extract text to see word positions. Boxes are review aids, not proof of accuracy.</p></details><label class=\"field\"><span>Review and correct extracted text</span><textarea id=\"ciOCRText\" rows=\"7\" spellcheck=\"false\" aria-label=\"Reviewed extracted text\"></textarea></label>\n    <div class=\"ci-actions\"><button id=\"ciCopyText\">Copy text</button><button id=\"ciTextDownload\">Download text</button><button id=\"ciNumbers\">Extract number tokens</button><button id=\"ciSend\">Review send to tool…</button></div><p id=\"ciOCRInfo\" class=\"hint\" role=\"status\">No extraction yet.</p>\n  </section>\n  <section id=\"ciQR\" role=\"tabpanel\" class=\"ci-mode\" hidden>\n    <p class=\"hint\">Open a QR screenshot or use Live camera. Scan results are shown before you choose an action; links never open automatically.</p>\n    <div class=\"ci-actions\"><button id=\"ciScanQR\">Scan edited image</button><button id=\"ciQRLiveStart\">Start live QR scan</button><button id=\"ciQRCopy\" disabled>Copy decoded text</button><button id=\"ciQROpen\" disabled>Open reviewed web link</button></div>\n    <label class=\"field\"><span>Decoded content</span><textarea id=\"ciQRText\" rows=\"4\" readonly aria-label=\"Decoded QR content\"></textarea></label><p id=\"ciQRInfo\" class=\"hint\" role=\"status\">No QR scanned.</p>\n  </section>\n  <section id=\"ciPDF\" role=\"tabpanel\" class=\"ci-mode\" hidden>\n    <div class=\"ci-actions\"><button id=\"ciPDFFilesButton\">Add photos</button><input id=\"ciPDFFiles\" type=\"file\" accept=\"image/*\" multiple hidden><button id=\"ciPDFClear\">Clear pages</button></div>\n    <div class=\"ci-fields\"><label>Page size <select id=\"ciPageSize\"><option value=\"a4\">A4</option><option value=\"letter\">Letter</option><option value=\"image\">Fit image size</option></select></label><label>Orientation <select id=\"ciPageOrientation\"><option value=\"auto\">Auto per photo</option><option value=\"portrait\">Portrait</option><option value=\"landscape\">Landscape</option></select></label><label>Margin mm <input id=\"ciMargin\" type=\"number\" min=\"0\" max=\"40\" value=\"10\"></label><label>Photo quality % <input id=\"ciPDFQuality\" type=\"number\" min=\"20\" max=\"100\" value=\"85\"></label></div>\n    <p class=\"hint\">Use Edit page for crop, fine rotation and document cleanup. Save replaces that queued page; Cancel keeps it unchanged.</p><div id=\"ciPages\" class=\"ci-pages\"></div><details><summary>Apply common cleanup to all queued pages</summary><div class=\"ci-fields\"><label>Crop inset % per edge <input id=\"ci25PageInset\" type=\"number\" min=\"0\" max=\"25\" value=\"0\"></label><label>Straighten angle ° <input id=\"ci25PageAngle\" type=\"number\" min=\"-45\" max=\"45\" step=\"0.1\" value=\"0\"></label><label>Finish <select id=\"ci25PageFinish\"><option value=\"color\">Colour</option><option value=\"gray\">Grayscale</option><option value=\"bw\">Black &amp; white</option></select></label><label>Contrast % <input id=\"ci25PageContrast\" type=\"number\" min=\"0\" max=\"200\" value=\"100\"></label></div><button id=\"ci25PagesClean\">Apply cleanup to all pages</button><p class=\"hint\">Uses the same relative inset and angle for every page. Different camera perspectives should be corrected individually. Changes are published only after every page succeeds.</p></details><div class=\"ci-actions\"><button id=\"ciBuildPDF\">Build PDF</button><button id=\"ciDownloadPDF\" disabled>Download PDF</button><button id=\"ci25SharePDF\" disabled>Share PDF</button></div><p id=\"ciPDFInfo\" class=\"hint\" role=\"status\">Add up to 30 photos, then reorder and rotate pages.</p>\n  </section>\n  <section id=\"ciBatch\" role=\"tabpanel\" class=\"ci-mode\" hidden>\n    <label class=\"field\"><span>Images to process · up to 30 files / 60 MiB total</span><input id=\"ciBatchFiles\" type=\"file\" accept=\"image/*\" multiple></label>\n    <div class=\"ci-fields\"><label>Maximum width px <input id=\"ciBatchW\" type=\"number\" min=\"16\" max=\"8192\" value=\"1600\"></label><label>Maximum height px <input id=\"ciBatchH\" type=\"number\" min=\"16\" max=\"8192\" value=\"1600\"></label><label>Format <select id=\"ciBatchFormat\"><option value=\"image/jpeg\">JPEG</option><option value=\"image/webp\">WebP</option><option value=\"image/png\">PNG</option></select></label><label>Quality % <input id=\"ciBatchQuality\" type=\"number\" min=\"5\" max=\"100\" value=\"85\"></label><label>Size target KB · 0 = off <input id=\"ciBatchKB\" type=\"number\" min=\"0\" max=\"20000\" value=\"0\"></label><label>Watermark text <input id=\"ciWatermark\" maxlength=\"100\" placeholder=\"Optional\"></label></div>\n    <div class=\"ci-actions\"><button id=\"ci25BatchPreview\">Preview first image</button><button id=\"ciRunBatch\">Run batch</button><button id=\"ciCancelBatch\">Cancel batch</button><button id=\"ciDownloadZIP\" disabled>Download ZIP & report</button><button id=\"ciBatchClear\">Clear files & results</button></div><progress id=\"ciBatchProgress\" max=\"1\" value=\"0\" aria-label=\"Image batch progress\"></progress><p id=\"ciBatchInfo\" class=\"hint\" role=\"status\">Each image is processed separately. A report records dimensions, actual size and any failures.</p><div id=\"ci25BatchPreviewResult\" hidden><img id=\"ci25BatchImage\" alt=\"Actual encoded first-image preview\"><p id=\"ci25BatchPreviewInfo\" class=\"hint\" role=\"status\"></p></div><div id=\"ciBatchResults\"></div>\n  </section>\n</div>\n\n<details class=\"ci-help\"><summary>Limits &amp; help</summary><p class=\"hint\">Raster images: up to 20 MiB and 20 megapixels; the working image is reduced to at most 16 megapixels. Exports support up to 8192 px per side and 16 megapixels. Undo retains up to 12 states / 64 MiB; Reset to original remains available. OCR supports English printed text, processes at most 6 megapixels and stops after 120 seconds. Document output supports up to 3000 px per side. PDF: 30 photo pages / 60 MiB retained. Batch: 30 source images / 60 MiB total / 64 MiB combined output. GIF uses a still frame. Browser image codecs determine available formats.</p><p class=\"hint\">Live camera needs permission and a secure context. Use Take photo or Open image if access is unavailable. QR reads one code per image. PDF pages contain flattened photos, without a searchable OCR text layer. Review extracted values before use. Clear studio releases retained photos, edits, text and camera access; it does not clear other tools.</p></details>\n";

}],
[3351,function initialize_3351(__studio33){
__studio33.ciPanel.querySelector('.u17-advanced')?.remove();
}],
[3352,function initialize_3352(__studio33){
__studio33.ciPanel.insertAdjacentHTML('beforeend',__studio33.CI_HTML);
}],
[3427,function initialize_3427(__studio33){
;
}],
[3429,function initialize_3429(__studio33){
__studio33.ciControlVisibility();
}],
[3487,function initialize_3487(__studio33){
document.addEventListener('visibilitychange',__studio33.$fn(()=>{if(document.hidden)__studio33.ciStopCamera()},"()=>{if(document.hidden)ciStopCamera()}",""));
}],
[3488,function initialize_3488(__studio33){
__studio33.u23SearchAliases.camerastudio='camera photo image studio ocr extract document scanner perspective crop resize rotate compress target size annotate redact qr scan pdf batch watermark';
}],
[3559,function initialize_3559(__studio33){
__studio33.backupKeys.push(__studio33.ci25PresetKey);
}],
[3560,function initialize_3560(__studio33){
__studio33.u22SettingKeys.push(__studio33.ci25PresetKey);
}],
[3561,function initialize_3561(__studio33){
__studio33.u24StorageGroups.push(['camera-presets','Camera export presets',[__studio33.ci25PresetKey]]);
}],
[3568,function initialize_3568(__studio33){
__studio33.ci25PresetRender();
}],
[3588,function initialize_3588(__studio33){
__studio33.ci25CaptureImage.alt='Captured photo review';
}],
[3601,function initialize_3601(__studio33){
__studio33.ci25PageBar.hidden=true;
}],
[3630,function initialize_3630(__studio33){
__studio33.ci25MarksUI();
}],
[3631,function initialize_3631(__studio33){
__studio33.ci25OCRList();
}],
[3643,function initialize_3643(__studio33){
__studio33.CI26_HTML = "<template id=\"ci26ProjectUI\"><details class=\"ci26-details\"><summary>Editing project &amp; resource usage</summary><div class=\"ci-actions\"><button id=\"ci26ProjectSave\">Save editing project</button><button id=\"ci26ProjectOpen\">Open editing project</button><input id=\"ci26ProjectFile\" type=\"file\" accept=\".json,application/json\" hidden></div><p class=\"hint\">Projects contain original pixels and editable annotations, including areas hidden by redactions. Share flattened image/PDF exports when you want covered content removed. Projects do not include camera access, queued photos or edit history.</p><p id=\"ci26Dirty\" role=\"status\" class=\"hint\">No editing project loaded.</p><p id=\"ci26Memory\" class=\"hint\">Open an image to see estimated image-buffer memory.</p></details></template>\n<template id=\"ci26ResizeUI\"><details class=\"ci26-details\"><summary>Fit, Fill &amp; Pad resize</summary><div class=\"ci-fields\"><label>Resize behaviour <select id=\"ci26ResizeMode\"><option value=\"exact\">Exact dimensions · existing behaviour</option><option value=\"fit\">Fit within dimensions</option><option value=\"fill\">Fill dimensions · crop overflow</option><option value=\"pad\">Pad to dimensions</option></select></label><label>Padding colour <input id=\"ci26PadColor\" type=\"color\" value=\"#ffffff\"></label><label><input id=\"ci26PadTransparent\" type=\"checkbox\"> Transparent padding</label></div><div class=\"ci-actions\"><button id=\"ci26ResizePreview\">Preview resize</button><button id=\"ci26ResizeCancel\">Cancel resize preview</button></div><p id=\"ci26ResizeInfo\" class=\"hint\">Use output width/height above. Fit preserves proportions; Fill crops centrally; Pad keeps the whole image. Apply resize commits the previewed operation.</p></details></template>\n<template id=\"ci26CornerUI\"><details class=\"ci26-details\"><summary>Precision corner magnifier</summary><div class=\"ci-fields\"><label>Corner <select id=\"ci26Corner\"><option value=\"0\">1 · Top-left</option><option value=\"1\">2 · Top-right</option><option value=\"2\">3 · Bottom-right</option><option value=\"3\">4 · Bottom-left</option></select></label><label>Fine step px <input id=\"ci26CornerStep\" type=\"number\" min=\"1\" max=\"100\" value=\"1\"></label><label>Magnification <select id=\"ci26LoupeZoom\"><option value=\"4\">4×</option><option value=\"8\">8×</option><option value=\"16\">16×</option></select></label></div><canvas id=\"ci26Loupe\" width=\"192\" height=\"192\" aria-label=\"Magnified document corner\"></canvas><div class=\"ci-actions\"><button id=\"ci26CornerLeft\">← Left</button><button id=\"ci26CornerRight\">Right →</button><button id=\"ci26CornerUp\">↑ Up</button><button id=\"ci26CornerDown\">Down ↓</button></div><p class=\"hint\">The crosshair marks the exact corner. Fine-step buttons work with touch, keyboard and TV focus navigation.</p></details></template>\n<template id=\"ci26LayerUI\"><details class=\"ci26-details\"><summary>Layer order, lock &amp; alignment</summary><div class=\"ci-actions\"><button id=\"ci26MarkBack\">Move backward</button><button id=\"ci26MarkFront\">Move forward</button><button id=\"ci26MarkDuplicate\">Duplicate selected</button><button id=\"ci26MarkLock\">Lock / unlock selected</button></div><div class=\"ci-fields\"><label>Align selected to image <select id=\"ci26Align\"><option value=\"left\">Left</option><option value=\"center\">Horizontal centre</option><option value=\"right\">Right</option><option value=\"top\">Top</option><option value=\"middle\">Vertical centre</option><option value=\"bottom\">Bottom</option></select></label></div><button id=\"ci26MarkAlign\">Align selected</button><p id=\"ci26LayerInfo\" class=\"hint\">Select a mark in Edit existing annotations. Locked marks keep their pixels and block move/update/delete until unlocked.</p></details></template>\n<template id=\"ci26TableUI\"><details id=\"ci26Table\" class=\"ci26-details\"><summary>Photo → editable table</summary><p class=\"hint\">Select the table area in the photo, mark row/column boundaries, extract, then correct every cell. All cells remain text, preserving leading zeros. Merged cells and irregular layouts require manual correction.</p><div class=\"ci-fields\"><label>Rows <input id=\"ci26Rows\" type=\"number\" min=\"1\" max=\"100\" value=\"3\"></label><label>Columns <input id=\"ci26Cols\" type=\"number\" min=\"1\" max=\"20\" value=\"3\"></label><label>Internal row boundaries · y px relative to selection <input id=\"ci26RowLines\" placeholder=\"Example: 60, 120\"></label><label>Internal column boundaries · x px relative to selection <input id=\"ci26ColLines\" placeholder=\"Example: 100, 250\"></label><label><input id=\"ci26GridShow\" type=\"checkbox\" checked> Show &amp; drag guides</label></div><div class=\"ci-actions\"><button id=\"ci26GridReset\">Make equal row/column guides</button><button id=\"ci26TableExtract\">Extract table cells</button><button id=\"ci26TableBlank\">Create blank review table</button><button id=\"ci26TableClear\">Clear reviewed table</button></div><div id=\"ci26TablePreview\" class=\"table-scroll\"></div><div class=\"ci-actions\"><button id=\"ci26TablePrev\">Previous rows</button><button id=\"ci26TableNext\">Next rows</button><span id=\"ci26TablePage\" class=\"hint\"></span></div><label><input id=\"ci26TableHeader\" type=\"checkbox\" checked> First row is column headings for Data Table</label><div class=\"ci-actions\"><button id=\"ci26TableCSV\">Download reviewed CSV</button><button id=\"ci26TableSend\">Review send to Data Table…</button></div><p id=\"ci26TableInfo\" class=\"hint\" role=\"status\">Up to 100 rows × 20 columns, 1,000 cells. The photo remains unchanged.</p></details></template>\n<template id=\"ci26DeskewUI\"><details class=\"ci26-details\"><summary>Suggest straightening from text</summary><button id=\"ci26Deskew\">Analyse text alignment</button><p id=\"ci26DeskewInfo\" class=\"hint\" role=\"status\">Suggests a correction within ±12° from printed text. Review the angle preview before Apply fine rotation.</p></details></template>\n<template id=\"ci26PDFUI\"><details class=\"ci26-details\"><summary>Searchable PDF text</summary><label><input id=\"ci26PDFSearchable\" type=\"checkbox\"> Include reviewed OCR text layer</label><p class=\"hint\">Use Extract/review text beside each queued page, correct words, then confirm review. Every page must have a current reviewed result before building a searchable PDF; blank pages can be confirmed as having no text. Rotating or editing a page requires extracting its text again. English/Latin text supported by the bundled PDF font; unsupported characters are reported before export.</p><p id=\"ci26PDFTextInfo\" class=\"hint\" role=\"status\">Searchable text is optional. Image-only PDFs remain available.</p></details></template>\n";

}],
[3646,function initialize_3646(__studio33){
__studio33.ci26Templates.innerHTML=__studio33.CI26_HTML;
}],
[3745,function initialize_3745(__studio33){
__studio33.ci26PDFImage.alt='Page being reviewed for searchable text';
}],
[3752,function initialize_3752(__studio33){
__studio33.ci26PDFAck.type='checkbox';
}],
[3772,function initialize_3772(__studio33){
__studio33.ciPanel.addEventListener('input',e=>{if(e.target.matches('input,textarea,select'))e.target.removeAttribute('aria-invalid')});
}],
[3777,function initialize_3777(__studio33){
document.addEventListener('invalid',e=>{e.target.setAttribute('aria-invalid','true');e.target.setAttribute('aria-description',e.target.validationMessage)},true);
}],
[3778,function initialize_3778(__studio33){
document.addEventListener('input',e=>{if(e.target.matches?.('[aria-invalid=true]')&&e.target.validity?.valid){e.target.removeAttribute('aria-invalid');e.target.removeAttribute('aria-description')}});
}],
[3792,function initialize_3792(__studio33){
__studio33.ci26Checklist.append(__studio33.csText('p','Edition 26 development checks cover the following release criteria. This checklist does not run tests or certify this browser/device.'));
}],
[3809,function initialize_3809(__studio33){
__studio33.ci26TableRender();
}],
[3810,function initialize_3810(__studio33){
__studio33.ci26Dirty();
}],
[3818,function initialize_3818(__studio33){
__studio33.ci26Dirty();
}],
[3820,function initialize_3820(__studio33){
__studio33.u24EnsureEditors(__studio33.ciPanel);
}],
[3821,function initialize_3821(__studio33){
for(const e of __studio33.ciPanel.querySelectorAll('button')){e.type='button';e.classList.add('small');if(e.hasAttribute('data-ci-mode'))__studio33.u17SetRole(e,'utility')}
}],
[3822,function initialize_3822(__studio33){
__studio33.ciButtons();
}],
[3823,function initialize_3823(__studio33){
__studio33.ciPDFPages();
}],
[3824,function initialize_3824(__studio33){
__studio33.ciMode('edit');
}],
[3825,function initialize_3825(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 26';
}],
[3826,function initialize_3826(__studio33){
__studio33.$('helpPanel').querySelector('p').textContent=__studio33.$('helpPanel').querySelector('p').textContent.replace(/^\d+ registered tool\/workspace entries/,Object.keys(__studio33.views).length+' registered tool/workspace entries');
}],
[3827,function initialize_3827(__studio33){
window.calcStudio=Object.freeze({...window.calcStudio,version:26});
}],
[3857,function initialize_3857(__studio33){
window.addEventListener('afterprint',__studio33.crPrintCleanup);
}],
[3880,function initialize_3880(__studio33){
__studio33.crTransferTarget.setAttribute('aria-label','Resume experience destination');
}],
[3904,function initialize_3904(__studio33){
Object.assign(__studio33.u23SearchAliases,{careerresume:'resume cv curriculum vitae professional profile',careermatcher:'career job description keywords requirements resume comparison',careerachievements:'achievement accomplishment impact evidence metrics',careerinterview:'interview preparation questions answers project examples',careerskills:'career skill matrix gap learning checklist target role',careertemplates:'professional documents introduction update handover appreciation cover letter'});
}],
[3906,function initialize_3906(__studio33){
__studio33.studioDescription=__studio33.$fn(function(id){return({careerresume:'Build and print a structured resume from your supplied details.',careermatcher:'Compare literal job requirements with resume wording and evidence.',careerachievements:'Draft reviewed achievement statements using your facts.',careerinterview:'Organise questions, answers, project examples and preparation status.',careerskills:'Compare self-rated current/target skills and export learning actions.',careertemplates:'Fill, review and print professional introductions, updates and handovers.'})[id]||__studio33.crDescriptionOld(id)},"function(id){return({careerresume:'Build and print a structured resume from your supplied details.',careermatcher:'Compare literal job requirements with resume wording and evidence.',careerachievements:'Draft reviewed achievement statements using your facts.',careerinterview:'Organise questions, answers, project examples and preparation status.',careerskills:'Compare self-rated current/target skills and export learning actions.',careertemplates:'Fill, review and print professional introductions, updates and handovers.'})[id]||crDescriptionOld(id)}","");
}],
[3908,function initialize_3908(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 27';
}],
[3909,function initialize_3909(__studio33){
__studio33.$('helpPanel').querySelector('p').textContent=__studio33.$('helpPanel').querySelector('p').textContent.replace(/^\d+ registered tool\/workspace entries/,Object.keys(__studio33.views).length+' registered tool/workspace entries');
}],
[3910,function initialize_3910(__studio33){
window.calcStudio=Object.freeze({...window.calcStudio,version:27});
}],
[3911,function initialize_3911(__studio33){
document.title='Calc Studio — Career edition 27';
}],
[3912,function initialize_3912(__studio33){
__studio33.ci26Checklist.querySelector('p').textContent='Edition 27 release criteria include existing tools and Career & Professional Documents. This checklist does not run tests or certify this browser/device.';
}],
[3913,function initialize_3913(__studio33){
__studio33.ci26List.append(__studio33.csText('li','Career document printing, literal comparison, reviewed handoffs, project validation and privacy cleanup pass'));
}],
[3914,function initialize_3914(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Career & Professional Documents'),__studio33.csText('p','Resume Builder, Job Description Matcher, Achievement Builder, Interview Preparation Organizer, Skills Matrix and Professional Document Templates share one in-memory project. Add/save entry records before downloading the project. No career data is automatically stored in app backups. Literal match counts are not an ATS score. Build/review documents before exporting; Print / Save as PDF uses the browser print dialog.'));
}],
[3921,function initialize_3921(__studio33){
Object.assign(__studio33.views,__studio33.n28Names);
}],
[3924,function initialize_3924(__studio33){
__studio33.studioDescription=__studio33.$fn(id=>__studio33.n28Descriptions[id]||__studio33.n28OldDescription(id),"id=>n28Descriptions[id]||n28OldDescription(id)","");
}],
[3925,function initialize_3925(__studio33){
for(const[id,name]of Object.entries(__studio33.n28Names)){
 const panel=__studio33.$(id);panel?.setAttribute('aria-label',name);const h=panel?.querySelector(':scope>.panel-heading h1,:scope>.panel-heading h2');if(h)h.textContent=name;
}
}],
[3926,function initialize_3926(__studio33){
for(const[id,text]of Object.entries(__studio33.n28Descriptions)){const p=__studio33.$(id),intro=p?.querySelector(':scope>.cs-intro');if(intro)intro.textContent=text;}
}],
[3927,function initialize_3927(__studio33){
for(const key of Object.keys(__studio33.u23Catalog))delete __studio33.u23Catalog[key];
}],
[3928,function initialize_3928(__studio33){
Object.assign(__studio33.u23Catalog,__studio33.n28Categories,{saved:{label:'My Work & Settings',tools:[...__studio33.n28Shared]}});
}],
[3929,function initialize_3929(__studio33){
__studio33.u23Homes.clear();
}],
[3930,function initialize_3930(__studio33){
for(const id of [...Object.keys(__studio33.n28HomeCategory),...__studio33.n28Shared])__studio33.u23Homes.add(id);
}],
[3934,function initialize_3934(__studio33){
try{__studio33.n28State=__studio33.n28Check(__studio33.storage.get(__studio33.n28Key,__studio33.n28Defaults()))}catch{__studio33.n28State=__studio33.n28Defaults()}
}],
[3939,function initialize_3939(__studio33){
window.addEventListener('pagehide',__studio33.n28Flush);
}],
[3941,function initialize_3941(__studio33){
__studio33.u23Category=__studio33.$fn(function(id){const home=__studio33.u23Home(id);return __studio33.n28HomeCategory[home]||'saved'},"function(id){const home=u23Home(id);return n28HomeCategory[home]||'saved'}","");
}],
[3942,function initialize_3942(__studio33){
__studio33.categoryForTool=__studio33.u23Category;
}],
[3946,function initialize_3946(__studio33){
__studio33.u23Manage.querySelector('p').textContent='Choose workspaces for the main dropdowns. Unchecked workspaces keep their subject category and remain available through Find tool, My Work and existing links. Saved content is kept.';
}],
[3947,function initialize_3947(__studio33){
__studio33.u23ExtraNote.textContent='Optional workspace · use Options → Manage tools to include it in its subject dropdown.';
}],
[3949,function initialize_3949(__studio33){
__studio33.u23ManageRender=__studio33.$fn(function(){__studio33.n28OldManageRender();const count=__studio33.u23Manage.querySelector('[role=status]');if(count)count.textContent=count.textContent.replace('main workspaces','visible workspaces').replace('in Extra utilities','optional workspaces');},"function(){n28OldManageRender();const count=u23Manage.querySelector('[role=status]');if(count)count.textContent=count.textContent.replace('main workspaces','visible workspaces').replace('in Extra utilities','optional workspaces');}","");
}],
[3951,function initialize_3951(__studio33){
__studio33.n28Work.append(__studio33.csText('p','Open saved projects, formulas and links, or return to a favorite or recent feature. Opening an item does not restore or overwrite your inputs.'),__studio33.n28WorkBody);
}],
[3956,function initialize_3956(__studio33){
__studio33.$('commandToggle').after(__studio33.n28WorkButton);
}],
[3958,function initialize_3958(__studio33){
__studio33.u21OptionsPanel.prepend(__studio33.n28SettingsButton);
}],
[3960,function initialize_3960(__studio33){
__studio33.n28ModeSearch.type='search';
}],
[3961,function initialize_3961(__studio33){
__studio33.n28ModeSearch.id='n28FeatureSearch';
}],
[3962,function initialize_3962(__studio33){
__studio33.n28ModeSearch.placeholder='Filter feature names';
}],
[3963,function initialize_3963(__studio33){
__studio33.n28ModeSearch.setAttribute('aria-label','Filter workspace features');
}],
[3964,function initialize_3964(__studio33){
__studio33.n28ModeList.id='n28FeatureList';
}],
[3965,function initialize_3965(__studio33){
__studio33.n28ModeDialog.append(__studio33.n28ModeSearch,__studio33.n28ModeList);
}],
[3978,function initialize_3978(__studio33){
__studio33.n28ModeSearch.oninput=__studio33.n28FeatureRender;
}],
[3983,function initialize_3983(__studio33){
__studio33.n28SearchCount.id='n28SearchCount';
}],
[3985,function initialize_3985(__studio33){
__studio33.$('commandSearch').after(__studio33.n28SearchCount);
}],
[3987,function initialize_3987(__studio33){
__studio33.$('commandSearch').placeholder='Find workspaces, features or actions';
}],
[3988,function initialize_3988(__studio33){
__studio33.$('commandSearch').setAttribute('aria-label','Find workspaces, features or actions');
}],
[3998,function initialize_3998(__studio33){
__studio33.n28OldCiOperation();
}],
[3999,function initialize_3999(__studio33){
__studio33.n28OldCiMode(__studio33.n28State.camera.mode);
}],
[4001,function initialize_4001(__studio33){
__studio33.renderFavorites=__studio33.$fn(function(){__studio33.n28OldFavorites();if(__studio33.n28Work.open)__studio33.n28WorkRender()},"function(){n28OldFavorites();if(n28Work.open)n28WorkRender()}","");
}],
[4003,function initialize_4003(__studio33){
__studio33.renderRecents=__studio33.$fn(function(){__studio33.n28OldRecents();if(__studio33.n28Work.open)__studio33.n28WorkRender()},"function(){n28OldRecents();if(n28Work.open)n28WorkRender()}","");
}],
[4005,function initialize_4005(__studio33){
__studio33.backupKeys.push(__studio33.n28Key);
}],
[4006,function initialize_4006(__studio33){
__studio33.u22SettingKeys.push(__studio33.n28Key);
}],
[4009,function initialize_4009(__studio33){
__studio33.$('u22ResetConfirm').onclick=__studio33.$fn(function(...args){const scope=__studio33.u22ResetScope.value;if(scope==='all'&&__studio33.u22ResetInput.value.trim()!=='RESET')return __studio33.n28OldReset.apply(this,args);if(scope==='cache')__studio33.n28Flush();else __studio33.n28StopSave();return __studio33.n28OldReset.apply(this,args);},"function(...args){const scope=u22ResetScope.value;if(scope==='all'&&u22ResetInput.value.trim()!=='RESET')return n28OldReset.apply(this,args);if(scope==='cache')n28Flush();else n28StopSave();return n28OldReset.apply(this,args);}","");
}],
[4011,function initialize_4011(__studio33){
__studio33.$('u24StorageClear').onclick=__studio33.$fn(function(...args){const keys=__studio33.u24StorageSelection();if(keys.length&&__studio33.u24StorageConfirm.checked){if(keys.includes(__studio33.n28Key))__studio33.n28StopSave();else __studio33.n28Flush();}return __studio33.n28OldCleanup.apply(this,args);},"function(...args){const keys=u24StorageSelection();if(keys.length&&u24StorageConfirm.checked){if(keys.includes(n28Key))n28StopSave();else n28Flush();}return n28OldCleanup.apply(this,args);}","");
}],
[4013,function initialize_4013(__studio33){
__studio33.$('u24RecordsApply').onclick=__studio33.$fn(function(...args){if(__studio33.u24RecordsPending&&__studio33.u24RecordsConfirm.checked){if(Object.hasOwn(__studio33.u24RecordsPending,__studio33.n28Key))__studio33.n28StopSave();else __studio33.n28Flush();}return __studio33.n28OldRecordsApply.apply(this,args);},"function(...args){if(u24RecordsPending&&u24RecordsConfirm.checked){if(Object.hasOwn(u24RecordsPending,n28Key))n28StopSave();else n28Flush();}return n28OldRecordsApply.apply(this,args);}","");
}],
[4015,function initialize_4015(__studio33){
__studio33.backupSnapshot=__studio33.$fn(function(){const b=__studio33.n28OldBackup();b.state[__studio33.n28Key]=__studio33.csClone(__studio33.n28State);return b;},"function(){const b=n28OldBackup();b.state[n28Key]=csClone(n28State);return b;}","");
}],
[4017,function initialize_4017(__studio33){
__studio33.validateBackup=__studio33.$fn(function(data){const b={...data,state:{...data?.state}};if(!Object.hasOwn(b.state,__studio33.n28Key))b.state[__studio33.n28Key]=null;const result=__studio33.n28OldValidate(b);if(result.state[__studio33.n28Key])result.state[__studio33.n28Key]=__studio33.n28Check(result.state[__studio33.n28Key]);return result;},"function(data){const b={...data,state:{...data?.state}};if(!Object.hasOwn(b.state,n28Key))b.state[n28Key]=null;const result=n28OldValidate(b);if(result.state[n28Key])result.state[n28Key]=n28Check(result.state[n28Key]);return result;}","");
}],
[4020,function initialize_4020(__studio33){
for(const d of [__studio33.n28Work,__studio33.n28ModeDialog])d.addEventListener('close',__studio33.$fn(()=>{const focus=__studio33.u19DialogFocus.get(d);if(focus&&__studio33.u19Visible(focus))focus.focus({preventScroll:true});__studio33.u19SyncExit()},"()=>{const focus=u19DialogFocus.get(d);if(focus&&u19Visible(focus))focus.focus({preventScroll:true});u19SyncExit()}",""));
}],
[4021,function initialize_4021(__studio33){
for(const[home,id]of Object.entries(__studio33.n28State.last))if(__studio33.v12Suites[home])__studio33.v12Last[home]=id;
}],
[4022,function initialize_4022(__studio33){
document.querySelector('label[for=workspacePicker]>span').textContent='Workspace / tool';
}],
[4023,function initialize_4023(__studio33){
__studio33.u23MenuApply();
}],
[4024,function initialize_4024(__studio33){
__studio33.n28DecorateCurrent();
}],
[4025,function initialize_4025(__studio33){
document.title='Calc Studio — Organized edition 28';
}],
[4027,function initialize_4027(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 28';
}],
[4028,function initialize_4028(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Categories, workspaces and features'),__studio33.csText('p','Eight subject categories group all tools. My Work opens saved projects, formulas, links, favorites and recent features. Formatting & backup is in Options. Browse features filters the current workspace; Find tool searches names, categories and features and opens the matching surface without running it. Optional workspaces keep their subject home and remain searchable. Workspace tabs and camera feature choices are remembered without storing their inputs. Existing tool IDs, backups and transformation handlers are retained.'));
}],
[4033,function initialize_4033(__studio33){
try{__studio33.cs29State=__studio33.cs29Check(__studio33.storage.get(__studio33.cs29Key,__studio33.cs29Defaults()))}catch{__studio33.cs29State=__studio33.cs29Defaults()}
}],
[4035,function initialize_4035(__studio33){
__studio33.cs29Settings.append(__studio33.csText('h3','Workspace appearance'));
}],
[4038,function initialize_4038(__studio33){
__studio33.cs29Favorites.type='checkbox';
}],
[4039,function initialize_4039(__studio33){
__studio33.cs29Favorites.id='cs29Favorites';
}],
[4040,function initialize_4040(__studio33){
__studio33.cs29FavoritesRow.append(__studio33.cs29Favorites,__studio33.csText('span','Show favorites & recent tools above the workspace'));
}],
[4041,function initialize_4041(__studio33){
__studio33.cs29Settings.append(__studio33.cs29FavoritesRow,__studio33.csText('p','Mobile keeps 48 px touch targets; TV keeps larger controls and readable text. My Work always provides favorites and recent tools. The existing topbar and Expand/Compact shell switch retain their arrangement and behaviour.','hint'));
}],
[4042,function initialize_4042(__studio33){
__studio33.u19RemoteBox.before(__studio33.cs29Settings);
}],
[4047,function initialize_4047(__studio33){
__studio33.cs29Density.onchange=__studio33.$fn(()=>{__studio33.cs29State.density=__studio33.cs29Density.value;__studio33.cs29Save()},"()=>{cs29State.density=cs29Density.value;cs29Save()}","");
}],
[4048,function initialize_4048(__studio33){
__studio33.cs29Favorites.onchange=__studio33.$fn(()=>{__studio33.cs29State.favorites=__studio33.cs29Favorites.checked;__studio33.cs29Save()},"()=>{cs29State.favorites=cs29Favorites.checked;cs29Save()}","");
}],
[4049,function initialize_4049(__studio33){
for(const id of Object.keys(__studio33.views))__studio33.$(id)?.classList.add('cs29-surface');
}],
[4051,function initialize_4051(__studio33){
__studio33.cs29Dialogs();
}],
[4052,function initialize_4052(__studio33){
document.addEventListener('focusin',__studio33.$fn(e=>{if(e.target.closest('dialog'))__studio33.cs29Dialogs()},"e=>{if(e.target.closest('dialog'))cs29Dialogs()}",""));
}],
[4053,function initialize_4053(__studio33){
__studio33.u19Settings.addEventListener('close',__studio33.$fn(()=>{for(const editor of __studio33.$(__studio33.activeView)?.querySelectorAll('textarea')||[]){if(!__studio33.u19Visible(editor))continue;const parent=editor.parentNode,next=editor.nextSibling,focused=document.activeElement===editor,start=editor.selectionStart,end=editor.selectionEnd,direction=editor.selectionDirection,x=editor.scrollLeft,y=editor.scrollTop;editor.remove();parent.insertBefore(editor,next);if(focused)editor.focus({preventScroll:true});editor.setSelectionRange(start,end,direction);editor.scrollLeft=x;editor.scrollTop=y;}__studio33.cs29Schedule()},"()=>{for(const editor of $(activeView)?.querySelectorAll('textarea')||[]){if(!u19Visible(editor))continue;const parent=editor.parentNode,next=editor.nextSibling,focused=document.activeElement===editor,start=editor.selectionStart,end=editor.selectionEnd,direction=editor.selectionDirection,x=editor.scrollLeft,y=editor.scrollTop;editor.remove();parent.insertBefore(editor,next);if(focused)editor.focus({preventScroll:true});editor.setSelectionRange(start,end,direction);editor.scrollLeft=x;editor.scrollTop=y;}cs29Schedule()}",""));
}],
[4057,function initialize_4057(__studio33){
__studio33.v13CloseEditor=__studio33.$fn(function(){const editor=__studio33.v13Focused?.editor;__studio33.cs29OldClose();const r=editor&&__studio33.cs29Fields.get(editor.id);if(r&&r.anchor.isConnected){const gutter=editor.closest('.u15-numbered');if(!gutter&&editor.parentElement===r.head)r.anchor.after(editor);else if(!gutter&&r.head.contains(editor))r.anchor.after(editor);if(r.head.contains(__studio33.v13Editors.get(editor.id)?.search))r.head.after(__studio33.v13Editors.get(editor.id).search);}__studio33.cs29Schedule()},"function(){const editor=v13Focused?.editor;cs29OldClose();const r=editor&&cs29Fields.get(editor.id);if(r&&r.anchor.isConnected){const gutter=editor.closest('.u15-numbered');if(!gutter&&editor.parentElement===r.head)r.anchor.after(editor);else if(!gutter&&r.head.contains(editor))r.anchor.after(editor);if(r.head.contains(v13Editors.get(editor.id)?.search))r.head.after(v13Editors.get(editor.id).search);}cs29Schedule()}","");
}],
[4059,function initialize_4059(__studio33){
__studio33.u24PolishEditor=__studio33.$fn(function(editor){const tools=__studio33.v13Editors.get(editor.id)?.tools;let out;if(tools&&!__studio33.cs29PolishedTools.has(tools)){out=__studio33.cs29OldPolish(editor);__studio33.cs29PolishedTools.add(tools);}if(editor.closest('.cs29-surface'))__studio33.cs29Field(editor);return out;},"function(editor){const tools=v13Editors.get(editor.id)?.tools;let out;if(tools&&!cs29PolishedTools.has(tools)){out=cs29OldPolish(editor);cs29PolishedTools.add(tools);}if(editor.closest('.cs29-surface'))cs29Field(editor);return out;}","");
}],
[4061,function initialize_4061(__studio33){
for(const[home,r]of __studio33.n28FeatureControls){const bar=__studio33.csText('div','','cs29-modesbar'),button=r.row.querySelector('button');r.row.before(bar);bar.append(r.tabs,button);button.classList.add('cs29-feature-button');button.textContent='Features';button.setAttribute('aria-label','Browse '+__studio33.views[home]+' features');r.row.remove();__studio33.cs29ModeBars.set(home,bar);}
}],
[4062,function initialize_4062(__studio33){
__studio33.n28CommonSummaries.add('About');
}],
[4071,function initialize_4071(__studio33){
__studio33.u17Observer.disconnect();
}],
[4072,function initialize_4072(__studio33){
__studio33.u24EditorVisibility.disconnect();
}],
[4075,function initialize_4075(__studio33){
document.addEventListener('toggle',__studio33.$fn(e=>{if(e.target.tagName==='DETAILS'&&e.target.open&&e.target.closest('.cs29-surface'))__studio33.cs29Schedule()},"e=>{if(e.target.tagName==='DETAILS'&&e.target.open&&e.target.closest('.cs29-surface'))cs29Schedule()}",""),true);
}],
[4079,function initialize_4079(__studio33){
__studio33.u19Apply=__studio33.$fn(function(){__studio33.cs29OldApply();__studio33.cs29Apply();},"function(){cs29OldApply();cs29Apply();}","");
}],
[4080,function initialize_4080(__studio33){
__studio33.backupKeys.push(__studio33.cs29Key);
}],
[4081,function initialize_4081(__studio33){
__studio33.u22SettingKeys.push(__studio33.cs29Key);
}],
[4084,function initialize_4084(__studio33){
__studio33.backupSnapshot=__studio33.$fn(function(){const b=__studio33.cs29OldBackup();b.state[__studio33.cs29Key]=__studio33.csClone(__studio33.cs29State);return b;},"function(){const b=cs29OldBackup();b.state[cs29Key]=csClone(cs29State);return b;}","");
}],
[4086,function initialize_4086(__studio33){
__studio33.validateBackup=__studio33.$fn(function(data){const b={...data,state:{...data?.state}};if(!Object.hasOwn(b.state,__studio33.cs29Key))b.state[__studio33.cs29Key]=null;const valid=__studio33.cs29OldValidate(b);if(valid.state[__studio33.cs29Key])valid.state[__studio33.cs29Key]=__studio33.cs29Check(valid.state[__studio33.cs29Key]);return valid;},"function(data){const b={...data,state:{...data?.state}};if(!Object.hasOwn(b.state,cs29Key))b.state[cs29Key]=null;const valid=cs29OldValidate(b);if(valid.state[cs29Key])valid.state[cs29Key]=cs29Check(valid.state[cs29Key]);return valid;}","");
}],
[4088,function initialize_4088(__studio33){
__studio33.csRestoreSavedWork=__studio33.$fn(function(state){__studio33.cs29OldRestore(state);__studio33.cs29State=state[__studio33.cs29Key]?__studio33.cs29Check(state[__studio33.cs29Key]):__studio33.cs29Defaults();__studio33.cs29Apply();__studio33.cs29Prepare();__studio33.cs29Observe();},"function(state){cs29OldRestore(state);cs29State=state[cs29Key]?cs29Check(state[cs29Key]):cs29Defaults();cs29Apply();cs29Prepare();cs29Observe();}","");
}],
[4089,function initialize_4089(__studio33){
__studio33.cs29Apply();
}],
[4090,function initialize_4090(__studio33){
__studio33.cs29Prepare();
}],
[4091,function initialize_4091(__studio33){
__studio33.cs29Observe();
}],
[4092,function initialize_4092(__studio33){
document.title='Calc Studio — Compact edition 29';
}],
[4093,function initialize_4093(__studio33){
window.calcStudio=Object.freeze({...window.calcStudio,version:29,openTool:__studio33.$fn(id=>__studio33.openTab(id),"id=>openTab(id)",""),workspaceUI:__studio33.$fn(()=>({version:1,...__studio33.csClone(__studio33.cs29State),observedTool:__studio33.activeView,coalescedFramePending:!!__studio33.cs29Frame,trackedScrollViews:__studio33.cs29Scrolls.size}),"()=>({version:1,...csClone(cs29State),observedTool:activeView,coalescedFramePending:!!cs29Frame,trackedScrollViews:cs29Scrolls.size})","")});
}],
[4094,function initialize_4094(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 29';
}],
[4095,function initialize_4095(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Compact workspace controls'),__studio33.csText('p','The existing topbar is retained. Display → Workspace appearance selects Compact or Comfortable and the optional favorites/recent strip. Feature browsing shares a row with tabs. Editor labels and tools share a toolbar; Undo, Redo and Expand use labelled accessible icons. Status lines combine task state with the current validation message. Named advanced panels are grouped without adding disclosure levels. UI observation follows the active workspace and updates are coalesced per frame; uploaded files, editor values and transformations keep their original handlers.'));
}],
[4106,function initialize_4106(__studio33){
for(const[id,title]of Object.entries(__studio33.cs30Names))__studio33.cs30Heading(id,title);
}],
[4110,function initialize_4110(__studio33){
__studio33.$('n28Browse-camerastudio')?.remove();
}],
[4113,function initialize_4113(__studio33){
for(const key of Object.keys(__studio33.n28HomeCategory))delete __studio33.n28HomeCategory[key];
}],
[4114,function initialize_4114(__studio33){
for(const[key,c]of Object.entries(__studio33.n28Categories))for(const home of c.tools)__studio33.n28HomeCategory[home]=key;
}],
[4115,function initialize_4115(__studio33){
for(const key of Object.keys(__studio33.u23Catalog))delete __studio33.u23Catalog[key];
}],
[4116,function initialize_4116(__studio33){
Object.assign(__studio33.u23Catalog,__studio33.n28Categories,{saved:{label:'My Work & Settings',tools:__studio33.n28Shared}});
}],
[4117,function initialize_4117(__studio33){
__studio33.u23Homes.clear();
}],
[4118,function initialize_4118(__studio33){
for(const id of [...Object.keys(__studio33.n28HomeCategory),...__studio33.n28Shared])__studio33.u23Homes.add(id);
}],
[4123,function initialize_4123(__studio33){
__studio33.u23IsExtra=__studio33.$fn(function(id){return __studio33.u23State.hidden.includes(__studio33.u23Home(id))||(id!==__studio33.u23Home(id)&&(__studio33.u23State.hiddenModes||[]).includes(id));},"function(id){return u23State.hidden.includes(u23Home(id))||(id!==u23Home(id)&&(u23State.hiddenModes||[]).includes(id));}","");
}],
[4127,function initialize_4127(__studio33){
__studio33.u23MenuApply=__studio33.$fn(function(){if(__studio33.u23State.version!==2||!Array.isArray(__studio33.u23State.hiddenModes))__studio33.u23State=__studio33.u23Check(__studio33.u23State);__studio33.cs30BaseMenuApply();for(const[home,record]of __studio33.n28FeatureControls)for(const b of record.tabs.querySelectorAll('[data-mode]')){const id=b.dataset.mode;b.hidden=id!==__studio33.activeView&&__studio33.u23State.hiddenModes.includes(id);b.dataset.cs30Optional=String(__studio33.u23State.hiddenModes.includes(id));}__studio33.n28Index=null;},"function(){if(u23State.version!==2||!Array.isArray(u23State.hiddenModes))u23State=u23Check(u23State);cs30BaseMenuApply();for(const[home,record]of n28FeatureControls)for(const b of record.tabs.querySelectorAll('[data-mode]')){const id=b.dataset.mode;b.hidden=id!==activeView&&u23State.hiddenModes.includes(id);b.dataset.cs30Optional=String(u23State.hiddenModes.includes(id));}n28Index=null;}","");
}],
[4131,function initialize_4131(__studio33){
__studio33.u23ManageButton.onclick=__studio33.$fn(()=>{__studio33.u21Options.open=false;__studio33.u23ManageDraft=new Set(__studio33.u23State.hidden);__studio33.cs30ManageFeatures=new Set(__studio33.u23State.hiddenModes);__studio33.u23ManageSearch.value='';__studio33.u23ManageRender();__studio33.u19OpenDialog(__studio33.u23Manage,__studio33.u19Layout==='tv'?__studio33.$('u23ManageClose'):__studio33.u23ManageSearch);},"()=>{u21Options.open=false;u23ManageDraft=new Set(u23State.hidden);cs30ManageFeatures=new Set(u23State.hiddenModes);u23ManageSearch.value='';u23ManageRender();u19OpenDialog(u23Manage,u19Layout==='tv'?$('u23ManageClose'):u23ManageSearch);}","");
}],
[4132,function initialize_4132(__studio33){
__studio33.$('u23ManageAll').onclick=__studio33.$fn(()=>{__studio33.u23ManageDraft.clear();__studio33.cs30ManageFeatures.clear();__studio33.u23ManageRender()},"()=>{u23ManageDraft.clear();cs30ManageFeatures.clear();u23ManageRender()}","");
}],
[4134,function initialize_4134(__studio33){
__studio33.$('u23ManageApply').onclick=__studio33.$fn(()=>{__studio33.u23State=__studio33.u23Check({version:2,hidden:[...__studio33.u23ManageDraft],hiddenModes:[...__studio33.cs30ManageFeatures],shell:__studio33.u23State.shell});__studio33.u23Save();__studio33.u23MenuApply();__studio33.u23Manage.close();},"()=>{u23State=u23Check({version:2,hidden:[...u23ManageDraft],hiddenModes:[...cs30ManageFeatures],shell:u23State.shell});u23Save();u23MenuApply();u23Manage.close();}","");
}],
[4136,function initialize_4136(__studio33){
__studio33.$('workspacePicker').onchange=__studio33.$fn(()=>__studio33.cs30OpenHome(__studio33.$('workspacePicker').value),"()=>cs30OpenHome($('workspacePicker').value)","");
}],
[4137,function initialize_4137(__studio33){
__studio33.$('categoryPicker').onchange=__studio33.$fn(()=>__studio33.cs30OpenHome(__studio33.toolCategories[__studio33.$('categoryPicker').value]?.tools[0]),"()=>cs30OpenHome(toolCategories[$('categoryPicker').value]?.tools[0])","");
}],
[4139,function initialize_4139(__studio33){
try{__studio33.n28State=__studio33.n28Check(__studio33.storage.get(__studio33.n28Key,__studio33.n28State));}catch{__studio33.n28State=__studio33.n28Defaults();}
}],
[4141,function initialize_4141(__studio33){
__studio33.n28OldCiOperation();
}],
[4142,function initialize_4142(__studio33){
__studio33.n28OldCiMode(__studio33.n28State.camera.mode);
}],
[4143,function initialize_4143(__studio33){
for(const[home,id]of Object.entries(__studio33.n28State.last))__studio33.v12Last[home]=id;
}],
[4144,function initialize_4144(__studio33){
Object.assign(__studio33.n28Descriptions,{imagestudio:'Camera capture, image editing, OCR, QR scanning, quick conversion, screenshot markup, contact sheets, photos to PDF and batch exports.',graph:'Plot functions and inspect numerical derivatives and integrals.',calculator:'Scientific and exact arithmetic, memory and amounts in words.',colors:'Color conversion, text contrast, image pixels and extracted palettes.',salesforce:'Salesforce ID conversion and SOQL formatting, with links to logs and Composite requests.',conversionworkspace:'Units, currency, feet/inches arithmetic, areas, volumes and saved conversions.',datetoolkit:'Date calculations, timestamps, business-day deadlines and calendar event exports.',careerdocuments:'Resume, job wording comparison, evidence-based achievements and professional templates.',careerpreparation:'Interview preparation records and a skills matrix with learning actions.'});
}],
[4145,function initialize_4145(__studio33){
for(const home of Object.keys(__studio33.cs30Groups)){const panel=__studio33.$(home),heading=panel.querySelector(':scope>.panel-heading');let intro=[...panel.querySelectorAll('.cs-intro')].find(e=>e.closest('section')===panel);if(!intro){intro=__studio33.csText('p','','cs-intro');}intro.textContent=__studio33.n28Descriptions[home]||__studio33.studioDescription(home);if(!intro.closest('.cs29-about')){heading.after(intro);__studio33.cs29AboutDone.delete(panel);}}
}],
[4156,function initialize_4156(__studio33){
;
}],
[4159,function initialize_4159(__studio33){
;
}],
[4167,function initialize_4167(__studio33){
__studio33.csRestoreSavedWork=__studio33.$fn(function(state){__studio33.cs30MountAll();__studio33.cs30OriginalRestore(state);__studio33.u23State=__studio33.u23Check(__studio33.u23State);__studio33.n28State=__studio33.n28Check(__studio33.n28State);__studio33.n28Index=null;__studio33.u23MenuApply();__studio33.openTab(__studio33.activeView);},"function(state){cs30MountAll();cs30OriginalRestore(state);u23State=u23Check(u23State);n28State=n28Check(n28State);n28Index=null;u23MenuApply();openTab(activeView);}","");
}],
[4171,function initialize_4171(__studio33){
__studio33.cs30Resource.append(__studio33.csText('summary','Workspace lifecycle & shared file limits'));
}],
[4173,function initialize_4173(__studio33){
__studio33.cs30ResourceStatus.id='cs30ResourceStatus';
}],
[4175,function initialize_4175(__studio33){
__studio33.cs30Resource.append(__studio33.cs30ResourceStatus,__studio33.u19Button('Refresh lifecycle details',__studio33.cs30ResourceRefresh));
}],
[4176,function initialize_4176(__studio33){
__studio33.u24Performance.append(__studio33.cs30Resource);
}],
[4177,function initialize_4177(__studio33){
__studio33.cs30Resource.addEventListener('toggle',__studio33.$fn(()=>{if(__studio33.cs30Resource.open)__studio33.cs30ResourceRefresh()},"()=>{if(cs30Resource.open)cs30ResourceRefresh()}",""));
}],
[4180,function initialize_4180(__studio33){
__studio33.cs30TemplateRoots.add(__studio33.cs30Compatibility.content);
}],
[4182,function initialize_4182(__studio33){
__studio33.u23MenuApply();
}],
[4183,function initialize_4183(__studio33){
__studio33.n28Index=null;
}],
[4185,function initialize_4185(__studio33){
document.title='Calc Studio — Consolidated edition 30';
}],
[4187,function initialize_4187(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 30';
}],
[4188,function initialize_4188(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Consolidated workspaces'),__studio33.csText('p','Existing features are migrated into fewer workspaces. All legacy tool links and project field IDs remain available. Camera & Image Studio includes the quick conversion, quick markup and contact-sheet workflows; image palettes are in Color & Accessibility. Career has Resume & Applications and Interview & Skills. Graph/calculus, conversions/measurements, dates/events, QR/barcodes and Salesforce IDs/SOQL are grouped. Amount in words is a Calculator feature and sample data is a Data Workbench mode. Workflow Builder, Regex and Cron are in Developer, API & Automation. Manage tools supports optional barcode features and Keyboard Tester. A single dispatcher mounts the current workspace and parks inactive interfaces while retaining their values and handlers. OCR remains fully bundled.'));
}],
[4215,function initialize_4215(__studio33){
__studio33.cs31Ready = false;

}],
[4216,function initialize_4216(__studio33){
__studio33.cs31Mounted = new Map();
__studio33.cs31Tasks = new Map();
__studio33.cs31Reports = new Map();
__studio33.cs31Key = 'calc-studio-tool-enhancements-v31';

}],
[4218,function initialize_4218(__studio33){
__studio33.cs31Settings = undefined;

}],
[4219,function initialize_4219(__studio33){
try{__studio33.cs31Settings=__studio33.cs31CheckSettings(__studio33.storage.get(__studio33.cs31Key,{version:1,presets:[]}));}catch{__studio33.cs31Settings={version:1,presets:[]};}
}],
[4220,function initialize_4220(__studio33){
__studio33.backupKeys.push(__studio33.cs31Key);
}],
[4221,function initialize_4221(__studio33){
__studio33.u22SettingKeys.push(__studio33.cs31Key);
}],
[4222,function initialize_4222(__studio33){
__studio33.u24StorageGroups.push(['tool-presets31','Media, PDF & validation presets',[__studio33.cs31Key]]);
}],
[4223,function initialize_4223(__studio33){
__studio33.cs31BackupOld = __studio33.backupSnapshot;

}],
[4224,function initialize_4224(__studio33){
__studio33.backupSnapshot=__studio33.$fn(function(){const data=__studio33.cs31BackupOld();data.state[__studio33.cs31Key]=__studio33.csClone(__studio33.cs31Settings);return data;},"function(){const data=cs31BackupOld();data.state[cs31Key]=csClone(cs31Settings);return data;}","");
}],
[4225,function initialize_4225(__studio33){
__studio33.cs31ValidateOld = __studio33.validateBackup;

}],
[4226,function initialize_4226(__studio33){
__studio33.validateBackup=__studio33.$fn(function(raw){const data={...raw,state:{...raw?.state}};if(!Object.hasOwn(data.state,__studio33.cs31Key))data.state[__studio33.cs31Key]=null;const valid=__studio33.cs31ValidateOld(data);if(valid.state[__studio33.cs31Key])valid.state[__studio33.cs31Key]=__studio33.cs31CheckSettings(valid.state[__studio33.cs31Key]);return valid;},"function(raw){const data={...raw,state:{...raw?.state}};if(!Object.hasOwn(data.state,cs31Key))data.state[cs31Key]=null;const valid=cs31ValidateOld(data);if(valid.state[cs31Key])valid.state[cs31Key]=cs31CheckSettings(valid.state[cs31Key]);return valid;}","");
}],
[4227,function initialize_4227(__studio33){
__studio33.cs31RestoreOld = __studio33.csRestoreSavedWork;

}],
[4228,function initialize_4228(__studio33){
__studio33.csRestoreSavedWork=__studio33.$fn(function(state){__studio33.cs31Settings=state[__studio33.cs31Key]?__studio33.cs31CheckSettings(state[__studio33.cs31Key]):{version:1,presets:[]};__studio33.cs31RestoreOld(state);for(const render of __studio33.cs31PresetRenders)render();},"function(state){cs31Settings=state[cs31Key]?cs31CheckSettings(state[cs31Key]):{version:1,presets:[]};cs31RestoreOld(state);for(const render of cs31PresetRenders)render();}","");
}],
[4243,function initialize_4243(__studio33){
__studio33.cs31WorkerSource = '';

}],
[4247,function initialize_4247(__studio33){
__studio33.cs31PresetRenders = new Set();

}],
[4260,function initialize_4260(__studio33){
__studio33.cs31CrCheckOld = __studio33.crCheck;

}],
[4262,function initialize_4262(__studio33){
__studio33.cs31CareerRefresh = ()=>{};

}],
[4263,function initialize_4263(__studio33){
__studio33.cs31CrResetOld = __studio33.crResetViews;

}],
[4264,function initialize_4264(__studio33){
__studio33.crResetViews=__studio33.$fn(function(){__studio33.cs31CrResetOld();queueMicrotask(__studio33.$fn(()=>__studio33.cs31CareerRefresh(),"()=>cs31CareerRefresh()",""));},"function(){cs31CrResetOld();queueMicrotask(()=>cs31CareerRefresh());}","");
}],
[4271,function initialize_4271(__studio33){
__studio33.cs31ImageBatchReport = null;

}],
[4273,function initialize_4273(__studio33){
__studio33.cs31Installers = {jsondiff:__studio33.cs31ReadableReport,textdiff:__studio33.cs31ReadableReport,reconciliation:__studio33.cs31ReadableReport,apiresponse:__studio33.cs31ResponseLinks,apiclient:__studio33.cs31Developer,salesforce:__studio33.cs31Developer,soql:__studio33.cs31Developer,schema:__studio33.cs31JSONTools,jsonformatter:__studio33.cs31JSONTools,dataworkbench:__studio33.cs31JSONTools,textutils:__studio33.cs31TextTools,markdown:__studio33.cs31TextTools,dates:__studio33.cs31DateTools,calculator:__studio33.cs31CalculateTools,finance:__studio33.cs31CalculateTools,graph:__studio33.cs31CalculateTools,converter:__studio33.cs31CalculateTools,colors:__studio33.cs31Colors,qr:__studio33.cs31QRTools,barcodes:__studio33.cs31QRTools,pdf:__studio33.cs31PDFTools,audioeditor:__studio33.cs31MediaTools,videoframes:__studio33.cs31MediaTools,careermatcher:__studio33.cs31CareerTools,formdesigner:__studio33.cs31FormTools,kanban:__studio33.cs31KanbanTools,archives:__studio33.cs31ArchiveTools};

}],
[4277,function initialize_4277(__studio33){
__studio33.cs31IndexOld = __studio33.n28BuildIndex;

}],
[4279,function initialize_4279(__studio33){
__studio33.cs31OpenFeatureOld = __studio33.n28FeatureOpen;

}],
[4280,function initialize_4280(__studio33){
__studio33.n28FeatureOpen=__studio33.$fn(function(entry){if(entry.cs31Detail){if(__studio33.n28ModeDialog.open)__studio33.n28ModeDialog.close();__studio33.closeCommands();__studio33.openTab(entry.id);const detail=__studio33.$(entry.cs31Detail);for(let p=detail?.parentElement;p;p=p.parentElement)if(p.tagName==='DETAILS')p.open=true;if(detail){detail.open=true;detail.scrollIntoView({block:'nearest'});detail.querySelector('summary')?.focus();}return;}__studio33.cs31OpenFeatureOld(entry);},"function(entry){if(entry.cs31Detail){if(n28ModeDialog.open)n28ModeDialog.close();closeCommands();openTab(entry.id);const detail=$(entry.cs31Detail);for(let p=detail?.parentElement;p;p=p.parentElement)if(p.tagName==='DETAILS')p.open=true;if(detail){detail.open=true;detail.scrollIntoView({block:'nearest'});detail.querySelector('summary')?.focus();}return;}cs31OpenFeatureOld(entry);}","");
}],
[4281,function initialize_4281(__studio33){
__studio33.cs31Ready=true;
}],
[4282,function initialize_4282(__studio33){
__studio33.cs31Prepare(__studio33.activeView);
}],
[4283,function initialize_4283(__studio33){
__studio33.n28Index=null;
}],
[4284,function initialize_4284(__studio33){
window.calcStudio=Object.freeze({...window.calcStudio,version:31,enhancements:__studio33.$fn(()=>({edition:31,features:__studio33.cs31Features.map(([tool,id,name])=>({tool,id,name})),mounted:[...__studio33.cs31Mounted.keys()],topbar:'unchanged',offlineOCR:'retained'}),"()=>({edition:31,features:cs31Features.map(([tool,id,name])=>({tool,id,name})),mounted:[...cs31Mounted.keys()],topbar:'unchanged',offlineOCR:'retained'})","")});
}],
[4285,function initialize_4285(__studio33){
document.title='Calc Studio — Tool improvements edition 31';
}],
[4286,function initialize_4286(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 31';
}],
[4287,function initialize_4287(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Existing-tool improvements'),__studio33.csText('p','Use Features or Find tool to locate new advanced workflows. Edition 31 adds sample-based Apex/schema generation, value-state inspection, response snapshots, reviewed text cleanup, timezone overlap, formulas and discontinuity review, batch conversions, palette analysis, printable codes, PDF content/size previews, media presets and resume versions. Existing Composite checks, logs, reconciliation, OCR review, table cleanup, form conditions and recurring Kanban tasks are retained. New settings presets participate in backup/reset; resume versions stay in the explicitly saved career project. The topbar layout and bundled offline OCR are unchanged.'));
}],
[4289,function initialize_4289(__studio33){
document.querySelector('.studio-menu-body').append(__studio33.cs32Button);
}],
[4302,function initialize_4302(__studio33){
window.addEventListener('message',__studio33.$fn(e=>{const s=__studio33.cs32Session;if(!s||s.port||e.source!==s.child||e.data?.type!=='cs-connection-ready'||e.data.token!==s.token)return;if(location.protocol!=='file:'&&e.origin!==location.origin)return;const c=new MessageChannel();s.port=c.port1;s.port.onmessage=__studio33.$fn(async e=>{const m=e.data;if(__studio33.cs32Session!==s||!m||typeof m.type!=='string')return;if(m.type==='ready')return;if(m.type==='detach'){__studio33.cs32Close();return}if(m.type==='revoke'){__studio33.cs32Revoke();return}if(m.type==='stop-results'){__studio33.cs32StopResults();return}if(typeof m.id!=='string'||m.id.length>80)return;try{let data;switch(m.type){case'permissions':data=await __studio33.cs32Grant();break;case'text':data=await __studio33.cs32Text(m.text);break;case'image':data=await __studio33.cs32Image(m);break;case'command':data=await __studio33.cs32Command(m);break;case'results':data=await __studio33.cs32Results();break;default:throw Error('Unsupported connection request')}if(__studio33.cs32Session===s)s.port.postMessage({type:'reply',id:m.id,data})}catch(error){if(__studio33.cs32Session===s)s.port.postMessage({type:'reply',id:m.id,error:error.message})}},"async e=>{const m=e.data;if(cs32Session!==s||!m||typeof m.type!=='string')return;if(m.type==='ready')return;if(m.type==='detach'){cs32Close();return}if(m.type==='revoke'){cs32Revoke();return}if(m.type==='stop-results'){cs32StopResults();return}if(typeof m.id!=='string'||m.id.length>80)return;try{let data;switch(m.type){case'permissions':data=await cs32Grant();break;case'text':data=await cs32Text(m.text);break;case'image':data=await cs32Image(m);break;case'command':data=await cs32Command(m);break;case'results':data=await cs32Results();break;default:throw Error('Unsupported connection request')}if(cs32Session===s)s.port.postMessage({type:'reply',id:m.id,data})}catch(error){if(cs32Session===s)s.port.postMessage({type:'reply',id:m.id,error:error.message})}}","");s.port.start();s.child.postMessage({type:'cs-connection-port',token:s.token},location.protocol==='file:'?'*':location.origin,[c.port2]);},"e=>{const s=cs32Session;if(!s||s.port||e.source!==s.child||e.data?.type!=='cs-connection-ready'||e.data.token!==s.token)return;if(location.protocol!=='file:'&&e.origin!==location.origin)return;const c=new MessageChannel();s.port=c.port1;s.port.onmessage=async e=>{const m=e.data;if(cs32Session!==s||!m||typeof m.type!=='string')return;if(m.type==='ready')return;if(m.type==='detach'){cs32Close();return}if(m.type==='revoke'){cs32Revoke();return}if(m.type==='stop-results'){cs32StopResults();return}if(typeof m.id!=='string'||m.id.length>80)return;try{let data;switch(m.type){case'permissions':data=await cs32Grant();break;case'text':data=await cs32Text(m.text);break;case'image':data=await cs32Image(m);break;case'command':data=await cs32Command(m);break;case'results':data=await cs32Results();break;default:throw Error('Unsupported connection request')}if(cs32Session===s)s.port.postMessage({type:'reply',id:m.id,data})}catch(error){if(cs32Session===s)s.port.postMessage({type:'reply',id:m.id,error:error.message})}};s.port.start();s.child.postMessage({type:'cs-connection-port',token:s.token},location.protocol==='file:'?'*':location.origin,[c.port2]);}",""));
}],
[4303,function initialize_4303(__studio33){
window.addEventListener('pagehide',__studio33.cs32Close);
}],
[4304,function initialize_4304(__studio33){
window.calcStudio=Object.freeze({...window.calcStudio,connection:__studio33.$fn(()=>({available:true,attached:!!__studio33.cs32Session?.port,remote:!!__studio33.cs32Session?.remote,sharingResults:!!__studio33.cs32Timer}),"()=>({available:true,attached:!!cs32Session?.port,remote:!!cs32Session?.remote,sharingResults:!!cs32Timer})","")});
}]
];
