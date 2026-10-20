// Original initializer positions are part of the compatibility contract.
export const steps2=[
[2022,function initialize_2022(__studio33){
__studio33.u16Button(__studio33.u16Resolution,'u16ResolvedJSON','Export corrected JSON',__studio33.$fn(()=>__studio33.downloadFile('reconciled-data.json',__studio33.dwJSON(__studio33.u16ResolvedReady().table),'application/json'),"()=>downloadFile('reconciled-data.json',dwJSON(u16ResolvedReady().table),'application/json')",""));
}],
[2023,function initialize_2023(__studio33){
__studio33.u16Button(__studio33.u16Resolution,'u16ResolvedCSV','Export corrected CSV',__studio33.$fn(()=>__studio33.downloadFile('reconciled-data.csv',__studio33.dwCSV(__studio33.u16ResolvedReady().table),'text/csv'),"()=>downloadFile('reconciled-data.csv',dwCSV(u16ResolvedReady().table),'text/csv')",""));
}],
[2024,function initialize_2024(__studio33){
__studio33.u16Button(__studio33.u16Resolution,'u16ResolutionAudit','Export decision audit',__studio33.$fn(()=>{const p=__studio33.u16ResolvedReady();__studio33.downloadFile('reconciliation-decisions.json',JSON.stringify({app:'calc-studio-resolution',version:1,createdAt:p.createdAt,rules:__studio33.rcReport.rules,outputColumns:p.table.columns,outputRows:p.table.rows.length,decisions:p.audit},null,2),'application/json')},"()=>{const p=u16ResolvedReady();downloadFile('reconciliation-decisions.json',JSON.stringify({app:'calc-studio-resolution',version:1,createdAt:p.createdAt,rules:rcReport.rules,outputColumns:p.table.columns,outputRows:p.table.rows.length,decisions:p.audit},null,2),'application/json')}",""));
}],
[2027,function initialize_2027(__studio33){
__studio33.u16Field(__studio33.u16Hotspots,'u16HotspotSort','Rank by','total','text',[['total','Total inclusive elapsed'],['count','Execution count'],['max','Maximum elapsed'],['self','Recorded self time']]);
}],
[2034,function initialize_2034(__studio33){
__studio33.$('u16HotspotSort').onchange=__studio33.u16HotspotsDraw;
}],
[2037,function initialize_2037(__studio33){
__studio33.invalidateLogs=__studio33.$fn(function(){__studio33.u16OldInvalidateLogs();__studio33.u16HotspotReport=null;__studio33.u16HotspotRows.replaceChildren();__studio33.u16HotspotStatus.textContent='Log inputs changed. Analyze logs and hotspots again.'},"function(){u16OldInvalidateLogs();u16HotspotReport=null;u16HotspotRows.replaceChildren();u16HotspotStatus.textContent='Log inputs changed. Analyze logs and hotspots again.'}","");
}],
[2046,function initialize_2046(__studio33){
__studio33.u16Field(__studio33.u16PatchBox,'u16PatchRules','Patch selection','all','text',[['all','All raw source-to-target changes'],['accepted','Accepted reviewed changes only']]);
}],
[2057,function initialize_2057(__studio33){
__studio33.u16Field(__studio33.u16Composite,'u16CompositeResponse','Composite / Graph response JSON','','textarea');
}],
[2058,function initialize_2058(__studio33){
__studio33.u16Field(__studio33.u16Composite,'u16RetrySelection','Requests to retry: JSON array of "graphId/referenceId"','[]','textarea');
}],
[2069,function initialize_2069(__studio33){
__studio33.u16Button(__studio33.u16Composite,'u16RetryExport','Export retry payload',__studio33.$fn(()=>__studio33.downloadFile('composite-retry.json',__studio33.u16RetryReady(),'application/json'),"()=>downloadFile('composite-retry.json',u16RetryReady(),'application/json')",""));
}],
[2072,function initialize_2072(__studio33){
__studio33.u16Field(__studio33.u16Workflow,'u16StepName','Save this step output under a name','');
}],
[2073,function initialize_2073(__studio33){
__studio33.u16Field(__studio33.u16Workflow,'u16StepSource','Use a previous named output (blank = previous step)','');
}],
[2074,function initialize_2074(__studio33){
__studio33.u16Field(__studio33.u16Workflow,'u16StepEach','Process array items individually','no','text',[['no','Process whole input'],['yes','Process each JSON array item']]);
}],
[2075,function initialize_2075(__studio33){
__studio33.u16Field(__studio33.u16Workflow,'u16StepEachLimit','Maximum items (1–500)','100','number');
}],
[2080,function initialize_2080(__studio33){
__studio33.wfValidate=__studio33.$fn(function(w){const valid=__studio33.u16OldWFValidate(w),names=new Set();for(const s of valid.steps){const o=s.options;for(const key of ['$name','$input'])if(o[key]!==undefined&&(!/^[A-Za-z_][\w.-]{0,99}$/.test(o[key])))throw Error(key+' must be a name of 1–100 characters');if(o.$input&&!names.has(o.$input))throw Error('Named input '+o.$input+' must come from an earlier step');if(o.$name){if(names.has(o.$name))throw Error('Use unique output names');names.add(o.$name)}if(o.$each!==undefined&&typeof o.$each!=='boolean')throw Error('$each must be boolean');if(o.$eachLimit!==undefined&&(!Number.isInteger(o.$eachLimit)||o.$eachLimit<1||o.$eachLimit>500))throw Error('$eachLimit must be 1–500')}return valid},"function(w){const valid=u16OldWFValidate(w),names=new Set();for(const s of valid.steps){const o=s.options;for(const key of ['$name','$input'])if(o[key]!==undefined&&(!/^[A-Za-z_][\\w.-]{0,99}$/.test(o[key])))throw Error(key+' must be a name of 1–100 characters');if(o.$input&&!names.has(o.$input))throw Error('Named input '+o.$input+' must come from an earlier step');if(o.$name){if(names.has(o.$name))throw Error('Use unique output names');names.add(o.$name)}if(o.$each!==undefined&&typeof o.$each!=='boolean')throw Error('$each must be boolean');if(o.$eachLimit!==undefined&&(!Number.isInteger(o.$eachLimit)||o.$eachLimit<1||o.$eachLimit>500))throw Error('$eachLimit must be 1–500')}return valid}","");
}],
[2092,function initialize_2092(__studio33){
__studio33.u16Field(__studio33.u16Planning,'u16Capacity','Weekly hours by assignee: JSON object','{"Unassigned":40}','textarea');
}],
[2098,function initialize_2098(__studio33){
__studio33.knValidate=__studio33.$fn(function(data){const x=__studio33.u16OldKNValidate(data);for(const b of x.boards){if(b.weeklyCapacity!==undefined)__studio33.u16ValidateCapacity(b.weeklyCapacity);if(b.scheduleBaseline!==undefined){const p=b.scheduleBaseline;if(!p||!Number.isFinite(Date.parse(p.at))||!Array.isArray(p.tasks)||p.tasks.length>2000||p.tasks.some(__studio33.$fn(t=>!t||typeof t.id!=='string'||typeof t.title!=='string'||t.start&&!__studio33.v12Date(t.start)||t.due&&!__studio33.v12Date(t.due),"t=>!t||typeof t.id!=='string'||typeof t.title!=='string'||t.start&&!v12Date(t.start)||t.due&&!v12Date(t.due)","")))throw Error('Invalid schedule baseline')}}return x},"function(data){const x=u16OldKNValidate(data);for(const b of x.boards){if(b.weeklyCapacity!==undefined)u16ValidateCapacity(b.weeklyCapacity);if(b.scheduleBaseline!==undefined){const p=b.scheduleBaseline;if(!p||!Number.isFinite(Date.parse(p.at))||!Array.isArray(p.tasks)||p.tasks.length>2000||p.tasks.some(t=>!t||typeof t.id!=='string'||typeof t.title!=='string'||t.start&&!v12Date(t.start)||t.due&&!v12Date(t.due)))throw Error('Invalid schedule baseline')}}return x}","");
}],
[2111,function initialize_2111(__studio33){
for(const [id,label,value,type]of [['u16LoanPrincipal','Principal','500000','number'],['u16LoanAnnual','Annual rate (%)','9','number'],['u16LoanStart','Accrual start date','2026-01-01','date'],['u16LoanFirst','First payment date','2026-02-01','date'],['u16LoanPayments','Number of payments','60','number'],['u16LoanFees','Upfront fees','0','number']])__studio33.u16Field(__studio33.u16FinanceFields,id,label,value,type);
}],
[2112,function initialize_2112(__studio33){
__studio33.u16Field(__studio33.u16FinanceFields,'u16LoanFrequency','Payment frequency','monthly','text',[['monthly','Monthly'],['fortnightly','Every 14 days'],['weekly','Every 7 days']]);
}],
[2113,function initialize_2113(__studio33){
__studio33.u16Field(__studio33.u16FinanceFields,'u16LoanPolicy','After a rate change','recast','text',[['recast','Recalculate scheduled payment'],['keep','Keep scheduled payment']]);
}],
[2114,function initialize_2114(__studio33){
__studio33.u16Field(__studio33.u16Finance,'u16LoanEvents','Dated events: rate or extra-principal JSON array','[]','textarea');
}],
[2115,function initialize_2115(__studio33){
__studio33.u16Field(__studio33.u16Finance,'u16LoanName','Scenario name','Scenario 1');
}],
[2116,function initialize_2116(__studio33){
__studio33.u16Field(__studio33.u16Finance,'u16LoanSaved','Saved scenario','','text',[['','Choose scenario']]);
}],
[2123,function initialize_2123(__studio33){
try{__studio33.u16State=__studio33.u16StateValidate(__studio33.storage.get(__studio33.u16StateKey,{version:1,loans:[],runs:[]}))}catch{__studio33.u16State={version:1,loans:[],runs:[]}}
}],
[2132,function initialize_2132(__studio33){
__studio33.u16LoanSavedRender();
}],
[2133,function initialize_2133(__studio33){
__studio33.u16Button(__studio33.u16Finance,'u16LoanCalculate','Calculate dated schedule',__studio33.$fn(()=>{__studio33.u16DatedLoan=null;const report=__studio33.u16DatedSchedule(__studio33.u16LoanConfig());__studio33.u16DatedLoan={signature:__studio33.u16LoanSignature(),report};__studio33.u16FinanceDraw(report)},"()=>{u16DatedLoan=null;const report=u16DatedSchedule(u16LoanConfig());u16DatedLoan={signature:u16LoanSignature(),report};u16FinanceDraw(report)}",""));
}],
[2135,function initialize_2135(__studio33){
__studio33.u16Button(__studio33.u16Finance,'u16LoanSave','Save calculated scenario',__studio33.$fn(()=>{if(!__studio33.u16DatedLoan)throw Error('Calculate a schedule first');__studio33.u16Fresh(__studio33.u16DatedLoan.signature,__studio33.u16LoanSignature());const name=__studio33.$('u16LoanName').value.trim();if(!name||name.length>100)throw Error('Enter a name up to 100 characters');if(__studio33.u16State.loans.length>=30)throw Error('Maximum 30 saved scenarios');__studio33.u16State.loans.push({id:__studio33.csId('loan16'),name,config:__studio33.csClone(__studio33.u16DatedLoan.report.configuration)});__studio33.u16StateSave();__studio33.u16LoanSavedRender();__studio33.u16FinanceStatus.textContent='Scenario saved; compare all saved scenarios below.'},"()=>{if(!u16DatedLoan)throw Error('Calculate a schedule first');u16Fresh(u16DatedLoan.signature,u16LoanSignature());const name=$('u16LoanName').value.trim();if(!name||name.length>100)throw Error('Enter a name up to 100 characters');if(u16State.loans.length>=30)throw Error('Maximum 30 saved scenarios');u16State.loans.push({id:csId('loan16'),name,config:csClone(u16DatedLoan.report.configuration)});u16StateSave();u16LoanSavedRender();u16FinanceStatus.textContent='Scenario saved; compare all saved scenarios below.'}",""));
}],
[2136,function initialize_2136(__studio33){
__studio33.u16Button(__studio33.u16Finance,'u16LoanLoad','Load saved scenario',__studio33.$fn(()=>{const s=__studio33.u16State.loans.find(__studio33.$fn(s=>s.id===__studio33.$('u16LoanSaved').value,"s=>s.id===$('u16LoanSaved').value",""));if(!s)throw Error('Choose a saved scenario');const c=s.config,values={u16LoanPrincipal:c.principal,u16LoanAnnual:c.rate,u16LoanStart:c.start,u16LoanFirst:c.first,u16LoanPayments:c.payments,u16LoanFees:c.fee,u16LoanFrequency:c.frequency,u16LoanPolicy:c.policy,u16LoanEvents:JSON.stringify(c.events,null,2)};for(const [id,v]of Object.entries(values))__studio33.u15Change(__studio33.$(id),String(v));__studio33.$('u16LoanName').value=s.name;__studio33.u16DatedLoan=null;__studio33.u16FinanceStatus.textContent='Loaded. Calculate to refresh the schedule.'},"()=>{const s=u16State.loans.find(s=>s.id===$('u16LoanSaved').value);if(!s)throw Error('Choose a saved scenario');const c=s.config,values={u16LoanPrincipal:c.principal,u16LoanAnnual:c.rate,u16LoanStart:c.start,u16LoanFirst:c.first,u16LoanPayments:c.payments,u16LoanFees:c.fee,u16LoanFrequency:c.frequency,u16LoanPolicy:c.policy,u16LoanEvents:JSON.stringify(c.events,null,2)};for(const [id,v]of Object.entries(values))u15Change($(id),String(v));$('u16LoanName').value=s.name;u16DatedLoan=null;u16FinanceStatus.textContent='Loaded. Calculate to refresh the schedule.'}",""));
}],
[2137,function initialize_2137(__studio33){
__studio33.u16Button(__studio33.u16Finance,'u16LoanDelete','Delete selected scenario',__studio33.$fn(()=>{__studio33.u16State.loans=__studio33.u16State.loans.filter(__studio33.$fn(s=>s.id!==__studio33.$('u16LoanSaved').value,"s=>s.id!==$('u16LoanSaved').value",""));__studio33.u16StateSave();__studio33.u16LoanSavedRender();__studio33.u16FinanceStatus.textContent='Selected saved scenario removed.'},"()=>{u16State.loans=u16State.loans.filter(s=>s.id!==$('u16LoanSaved').value);u16StateSave();u16LoanSavedRender();u16FinanceStatus.textContent='Selected saved scenario removed.'}",""));
}],
[2138,function initialize_2138(__studio33){
__studio33.u16Button(__studio33.u16Finance,'u16LoanCompare','Compare saved scenarios',__studio33.$fn(()=>{if(!__studio33.u16State.loans.length)throw Error('Save at least one scenario');const rows=__studio33.u16State.loans.map(__studio33.$fn(s=>{const r=__studio33.u16DatedSchedule(s.config);return [s.name,s.config.frequency,r.regularPayments,r.initialPayment.toFixed(2),r.finalPayment.toFixed(2),r.interest.toFixed(2),r.fees.toFixed(2),r.totalCost.toFixed(2)]},"s=>{const r=u16DatedSchedule(s.config);return [s.name,s.config.frequency,r.regularPayments,r.initialPayment.toFixed(2),r.finalPayment.toFixed(2),r.interest.toFixed(2),r.fees.toFixed(2),r.totalCost.toFixed(2)]}",""));__studio33.u15Table(__studio33.u16FinanceRows,['Scenario','Frequency','Payments','Initial payment','Final payment','Interest','Fees','Total cost'],rows);__studio33.u16FinanceStatus.textContent='All saved scenarios recalculated with the same actual/365 estimate. Different terms, principals and fees affect comparisons.'},"()=>{if(!u16State.loans.length)throw Error('Save at least one scenario');const rows=u16State.loans.map(s=>{const r=u16DatedSchedule(s.config);return [s.name,s.config.frequency,r.regularPayments,r.initialPayment.toFixed(2),r.finalPayment.toFixed(2),r.interest.toFixed(2),r.fees.toFixed(2),r.totalCost.toFixed(2)]});u15Table(u16FinanceRows,['Scenario','Frequency','Payments','Initial payment','Final payment','Interest','Fees','Total cost'],rows);u16FinanceStatus.textContent='All saved scenarios recalculated with the same actual/365 estimate. Different terms, principals and fees affect comparisons.'}",""));
}],
[2147,function initialize_2147(__studio33){
__studio33.fdValidate=__studio33.$fn(function(data){const valid=__studio33.u16OldFDValidate(data);if(valid.crossRules!==undefined)__studio33.u16CrossRulesValidate(valid.crossRules,valid.fields);return valid},"function(data){const valid=u16OldFDValidate(data);if(valid.crossRules!==undefined)u16CrossRulesValidate(valid.crossRules,valid.fields);return valid}","");
}],
[2156,function initialize_2156(__studio33){
__studio33.rdNormalize=__studio33.$fn(function(r){const x=__studio33.u16OldRDNormalize(r);if(x.crossRules!==undefined){if(x.version!==2)throw Error('Cross-field rules require a versioned response');__studio33.u16CrossRulesValidate(x.crossRules,x.fields)}return x},"function(r){const x=u16OldRDNormalize(r);if(x.crossRules!==undefined){if(x.version!==2)throw Error('Cross-field rules require a versioned response');u16CrossRulesValidate(x.crossRules,x.fields)}return x}","");
}],
[2159,function initialize_2159(__studio33){
__studio33.u16Field(__studio33.u16ResponseRules,'u16ResponseSource','Source form/version group','','text',[['','Choose source group']]);
}],
[2160,function initialize_2160(__studio33){
__studio33.u16Field(__studio33.u16ResponseRules,'u16ResponseMap','Source field ID → target field ID: JSON array','[]','textarea');
}],
[2174,function initialize_2174(__studio33){
__studio33.rdRender=__studio33.$fn(function(){__studio33.u16PreviousRDRender();__studio33.u16MigrationGeneration++;const groups=[...new Set(__studio33.v12State.responses.map(__studio33.rdGroup))];__studio33.v12Opt(__studio33.$('u16ResponseSource'),[['','Choose source group'],...groups.map(__studio33.$fn(k=>{const r=__studio33.v12State.responses.find(__studio33.$fn(r=>__studio33.rdGroup(r)===k,"r=>rdGroup(r)===k",""));return [k,(r.formTitle||'Form')+' · '+k]},"k=>{const r=v12State.responses.find(r=>rdGroup(r)===k);return [k,(r.formTitle||'Form')+' · '+k]}",""))],__studio33.$('u16ResponseSource').value)},"function(){u16PreviousRDRender();u16MigrationGeneration++;const groups=[...new Set(v12State.responses.map(rdGroup))];v12Opt($('u16ResponseSource'),[['','Choose source group'],...groups.map(k=>{const r=v12State.responses.find(r=>rdGroup(r)===k);return [k,(r.formTitle||'Form')+' · '+k]})],$('u16ResponseSource').value)}","");
}],
[2181,function initialize_2181(__studio33){
__studio33.u16Field(__studio33.u16History,'u16HistoryName','Run name','Reviewed run');
}],
[2182,function initialize_2182(__studio33){
__studio33.u16Field(__studio33.u16History,'u16HistorySaved','Saved run','','text',[['','Choose saved run']]);
}],
[2188,function initialize_2188(__studio33){
__studio33.u16HistoryRender();
}],
[2189,function initialize_2189(__studio33){
__studio33.u16Button(__studio33.u16History,'u16HistoryCapture','Save current inputs, rules and outputs',__studio33.$fn(()=>{const tool=__studio33.$('u16HistoryTool').value,name=__studio33.$('u16HistoryName').value.trim();if(!name||name.length>100)throw Error('Enter a name up to 100 characters');const record=__studio33.u16HistoryCapture(tool);if(__studio33.u16State.runs.length>=20)throw Error('Maximum 20 saved runs; delete or export an older run');__studio33.u16State.runs.unshift({id:__studio33.csId('run16'),name,at:new Date().toISOString(),...record});__studio33.u16StateSave();__studio33.u16HistoryRender();__studio33.u16HistoryStatus.textContent='Saved '+name+'. API snapshots contain a redacted request and response metadata; environments and response bodies are excluded.'},"()=>{const tool=$('u16HistoryTool').value,name=$('u16HistoryName').value.trim();if(!name||name.length>100)throw Error('Enter a name up to 100 characters');const record=u16HistoryCapture(tool);if(u16State.runs.length>=20)throw Error('Maximum 20 saved runs; delete or export an older run');u16State.runs.unshift({id:csId('run16'),name,at:new Date().toISOString(),...record});u16StateSave();u16HistoryRender();u16HistoryStatus.textContent='Saved '+name+'. API snapshots contain a redacted request and response metadata; environments and response bodies are excluded.'}",""));
}],
[2191,function initialize_2191(__studio33){
__studio33.u16Button(__studio33.u16History,'u16HistoryInspect','Preview saved run',__studio33.$fn(()=>{const r=__studio33.u16SelectedRun();__studio33.u16HistoryPreview.replaceChildren(__studio33.csText('pre',JSON.stringify(r,null,2).slice(0,30000)));__studio33.u16HistoryStatus.textContent='First 30,000 characters shown. Restore loads inputs; choose the tool action to rerun explicitly.'},"()=>{const r=u16SelectedRun();u16HistoryPreview.replaceChildren(csText('pre',JSON.stringify(r,null,2).slice(0,30000)));u16HistoryStatus.textContent='First 30,000 characters shown. Restore loads inputs; choose the tool action to rerun explicitly.'}",""));
}],
[2194,function initialize_2194(__studio33){
__studio33.u16Button(__studio33.u16History,'u16HistoryRestore','Restore inputs for rerun',__studio33.$fn(()=>{const r=__studio33.u16SelectedRun();__studio33.u16RunRestoreUndo=__studio33.u16HistoryCapture(r.tool);__studio33.u16RestoreRun(r);__studio33.u16HistoryStatus.textContent='Inputs restored. Outputs were retained only in the saved record; run the tool to compute fresh results. No API request sent.'},"()=>{const r=u16SelectedRun();u16RunRestoreUndo=u16HistoryCapture(r.tool);u16RestoreRun(r);u16HistoryStatus.textContent='Inputs restored. Outputs were retained only in the saved record; run the tool to compute fresh results. No API request sent.'}",""));
}],
[2195,function initialize_2195(__studio33){
__studio33.u16Button(__studio33.u16History,'u16HistoryUndo','Undo last run restore',__studio33.$fn(()=>{if(!__studio33.u16RunRestoreUndo)throw Error('Restore a run first');const next=__studio33.u16HistoryCapture(__studio33.u16RunRestoreUndo.tool);__studio33.u16RestoreRun(__studio33.u16RunRestoreUndo);__studio33.u16RunRestoreUndo=next},"()=>{if(!u16RunRestoreUndo)throw Error('Restore a run first');const next=u16HistoryCapture(u16RunRestoreUndo.tool);u16RestoreRun(u16RunRestoreUndo);u16RunRestoreUndo=next}",""));
}],
[2196,function initialize_2196(__studio33){
__studio33.u16Button(__studio33.u16History,'u16HistoryExport','Export selected saved run',__studio33.$fn(()=>__studio33.downloadFile('saved-tool-run.json',JSON.stringify(__studio33.u16SelectedRun(),null,2),'application/json'),"()=>downloadFile('saved-tool-run.json',JSON.stringify(u16SelectedRun(),null,2),'application/json')",""));
}],
[2197,function initialize_2197(__studio33){
__studio33.u16Button(__studio33.u16History,'u16HistoryDelete','Delete selected saved run',__studio33.$fn(()=>{__studio33.u16State.runs=__studio33.u16State.runs.filter(__studio33.$fn(r=>r.id!==__studio33.$('u16HistorySaved').value,"r=>r.id!==$('u16HistorySaved').value",""));__studio33.u16StateSave();__studio33.u16HistoryRender();__studio33.u16HistoryStatus.textContent='Selected run removed.'},"()=>{u16State.runs=u16State.runs.filter(r=>r.id!==$('u16HistorySaved').value);u16StateSave();u16HistoryRender();u16HistoryStatus.textContent='Selected run removed.'}",""));
}],
[2198,function initialize_2198(__studio33){
__studio33.backupKeys.push(__studio33.u16StateKey);
}],
[2200,function initialize_2200(__studio33){
__studio33.validateBackup=__studio33.$fn(function(data){const raw={...data,state:{...data?.state}};if(!Object.hasOwn(raw.state,__studio33.u16StateKey))raw.state[__studio33.u16StateKey]=null;const valid=__studio33.u16PreviousValidateBackup(raw);if(valid.state[__studio33.u16StateKey])__studio33.u16StateValidate(valid.state[__studio33.u16StateKey]);return valid},"function(data){const raw={...data,state:{...data?.state}};if(!Object.hasOwn(raw.state,u16StateKey))raw.state[u16StateKey]=null;const valid=u16PreviousValidateBackup(raw);if(valid.state[u16StateKey])u16StateValidate(valid.state[u16StateKey]);return valid}","");
}],
[2202,function initialize_2202(__studio33){
__studio33.backupSnapshot=__studio33.$fn(function(){const x=__studio33.u16PreviousBackup();x.state[__studio33.u16StateKey]=__studio33.csClone(__studio33.u16State);return x},"function(){const x=u16PreviousBackup();x.state[u16StateKey]=csClone(u16State);return x}","");
}],
[2204,function initialize_2204(__studio33){
__studio33.csRestoreSavedWork=__studio33.$fn(function(s){__studio33.u16PreviousRestore(s);__studio33.u16State=s[__studio33.u16StateKey]?__studio33.u16StateValidate(s[__studio33.u16StateKey]):{version:1,loans:[],runs:[]};__studio33.u16LoanSavedRender();__studio33.u16HistoryRender();__studio33.u16DatedLoan=null;__studio33.u16PlanReport=null;__studio33.u16ResolutionState=null;__studio33.u16Resolved=null;__studio33.u16CompositeMapped=null;__studio33.u16Retry=null},"function(s){u16PreviousRestore(s);u16State=s[u16StateKey]?u16StateValidate(s[u16StateKey]):{version:1,loans:[],runs:[]};u16LoanSavedRender();u16HistoryRender();u16DatedLoan=null;u16PlanReport=null;u16ResolutionState=null;u16Resolved=null;u16CompositeMapped=null;u16Retry=null}","");
}],
[2205,function initialize_2205(__studio33){
for(const [id,list]of __studio33.wsElements){const added=[...__studio33.$(id).querySelectorAll('input[id],textarea[id],select[id]')].filter(e=>e.id.startsWith('u16')&&!e.readOnly&&!e.matches('[type=file]')).map(e=>e.id);__studio33.wsElements.set(id,[...new Set([...list,...added])])}
}],
[2206,function initialize_2206(__studio33){
for(const area of document.querySelectorAll('textarea[id]')){if(area.id.startsWith('u16')&&!__studio33.v13Editors.has(area.id)){__studio33.v13InstallEditor(area);__studio33.u15InstallGutter(area)}}
}],
[2208,function initialize_2208(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 16';
}],
[2209,function initialize_2209(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Edition 16: complete task flows'),__studio33.csText('p','Collection runner with CSV iterations, reconciliation resolutions, table joins and summaries, structural JSON editing, log hotspots, Composite response/retry mapping, named workflow outputs and item processing, comparison decisions and JSON Patch, Kanban capacity and baselines, dated loan scenarios, cross-field form rules and response-version mapping, resizable editor splits and saved run history. New panels use Preview before Apply or Run where relevant.'));
}],
[2210,function initialize_2210(__studio33){
__studio33.fdRender();
}],
[2211,function initialize_2211(__studio33){
__studio33.knRender();
}],
[2212,function initialize_2212(__studio33){
__studio33.wfRender();
}],
[2213,function initialize_2213(__studio33){
__studio33.rdRender();
}],
[2215,function initialize_2215(__studio33){
__studio33.u17Style.textContent=`
:root{--u17-gap:8px;--u17-danger:#ad343c}:root[data-theme=neon]{--u17-danger:#ff939b}
body{padding:10px 16px 20px}.main-card{padding:16px}.top.studio-header{padding:5px 0;margin-bottom:6px}.panel-heading{margin:8px 0 4px}.panel-heading h2{font-size:18px;line-height:1.3}.cs-intro{font-size:12px;line-height:1.5;margin:4px 0 12px;color:var(--muted)}
.extra-panel,.v12-native-mode,.v12-suite-modes{min-width:0}.extra-panel .fields{gap:12px;margin:10px 0;align-items:start}.extra-panel .row,.extra-panel .developer-toolbar,.extra-panel .v12-wrap{gap:8px;margin:8px 0;align-items:center}.extra-panel .field{min-width:0}.extra-panel .field>span{font-size:12px;font-weight:600;margin-bottom:5px}
button[data-u17-role]{min-height:36px;padding:7px 12px;border-radius:8px;font-size:12px;line-height:1.3;font-weight:600;white-space:normal;box-shadow:none;background:transparent!important;color:var(--text)!important;border:1px solid var(--line)!important}
button[data-u17-role=primary]{background:var(--accent)!important;color:var(--on)!important;border-color:var(--accent)!important}
button[data-u17-role=result]{background:var(--surface)!important;border-color:var(--accent)!important}
button[data-u17-role=utility]{background:transparent!important;border-color:transparent!important;font-weight:500;padding:6px 8px}
button[data-u17-role=danger]{color:var(--u17-danger)!important;border-color:var(--u17-danger)!important;background:transparent!important}
button[data-u17-role]:disabled{opacity:.45;cursor:not-allowed}button[data-u17-role]:not(:disabled):hover{filter:brightness(.94);text-decoration:underline}button:focus-visible,input:focus-visible,select:focus-visible,summary:focus-visible{outline:2px solid var(--accent);outline-offset:3px}.u15-status[data-error=true]{color:var(--u17-danger)}
.extra-panel select,.compact-nav select{appearance:none;background:var(--surface);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='m2 2 4 4 4-4' fill='none' stroke='%2377838a' stroke-width='1.8' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 11px center;border:1px solid var(--line);border-radius:6px;padding:7px 30px 7px 10px;min-height:36px;font-size:12px;max-width:100%;min-width:0;box-shadow:inset 0 -1px 0 var(--line)}
.extra-panel .inline-field select,.extra-panel .row>select,.extra-panel .developer-toolbar>select{width:auto;max-width:260px}.extra-panel .field select{width:100%}.extra-panel input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=color]):not([type=file]){min-height:36px;padding:7px 10px;font-size:12px;border-radius:6px}.extra-panel input[type=file]{max-width:100%}.extra-panel input[type=checkbox]{width:16px;height:16px;vertical-align:middle}
.v12-suite-tabs{padding:4px 0 8px;margin-bottom:8px;gap:4px}.v12-suite-tabs button{min-height:34px;padding:6px 10px;border-radius:6px;font-size:12px}.v12-shared{margin:6px 0;padding:0;border:0;background:transparent}.v12-shared>p{display:none}.v12-nested-mode>.panel-heading{margin:6px 0 2px}.v12-nested-mode>.panel-heading h2{font-size:14px;color:var(--muted)}
.u17-actions{display:flex;gap:8px;flex-wrap:wrap;align-items:center;padding:8px 0;margin:4px 0 10px;border:0}.u17-actions:empty,.u17-empty{display:none!important}.u17-actions .inline-field{display:flex;gap:5px;align-items:center;font-size:12px}.u17-field-actions{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin:4px 0 6px}.u17-result-actions{display:flex;gap:6px;flex-wrap:wrap;margin:4px 0 8px;align-items:center}
.u17-advanced{margin:16px 0 4px;border:1px solid var(--line);border-radius:10px;background:var(--surface);padding:0}.u17-advanced>summary{padding:10px 12px;font-size:12px;font-weight:650;cursor:pointer}.u17-advanced[open]{padding:0 12px 12px}.u17-advanced[open]>summary{margin:0 -12px 8px;border-bottom:1px solid var(--line)}.u17-advanced .details-box,.u17-advanced .u15-box{margin:8px 0;padding:10px;border-radius:8px;background:var(--panel)}.u17-advanced .hint{line-height:1.5}.u17-advanced textarea.developer-editor{min-height:130px}.u17-advanced .u16-split textarea{min-height:260px}.u17-help p{font-size:12px;line-height:1.5;margin:8px 0}
.developer-editor{min-height:240px;font-size:13px;line-height:1.6;padding:10px}.u15-gutter{font-size:13px;line-height:1.6}.json-editors,.u17-editor-pair{display:grid;grid-template-columns:minmax(0,var(--editor-left,50%)) minmax(0,1fr);gap:12px;margin:8px 0;align-items:start}.u17-editor-pair>.field{width:100%;margin:0}.u17-editor-pair textarea{min-height:260px}.u17-editor-pair.u17-stacked{grid-template-columns:1fr}.studio-editor-tabs{display:none!important}.v13-editor-tools{display:flex;gap:2px;align-items:center;flex-wrap:wrap;margin:3px 0 5px;padding:0;border:0;background:transparent}.v13-editor-tools>button{min-height:30px;font-size:11px;padding:5px 7px;white-space:nowrap}.v13-editor-tools>span.hint{display:none}.u17-editor-menu{position:relative;margin-left:auto}.u17-editor-menu>summary{font-size:11px;cursor:pointer;padding:6px}.u17-editor-menu[open]>div{position:absolute;right:0;top:100%;z-index:12;min-width:160px;background:var(--panel);padding:8px;border:1px solid var(--line);border-radius:8px;box-shadow:var(--shadow)}.u17-editor-menu button{width:100%;text-align:left}.v12-output-tabs{gap:3px;margin:3px 0 5px;align-items:center}.v12-output-tabs button{min-height:30px;padding:5px 7px;font-size:11px}.u17-view-menu{position:relative}.u17-view-menu summary{font-size:11px;padding:6px;cursor:pointer}.u17-view-menu[open]>div{position:absolute;right:0;top:100%;z-index:12;background:var(--panel);padding:8px;min-width:200px;border:1px solid var(--line);border-radius:8px}.u17-view-menu button{display:block;width:100%;text-align:left}.u17-view-menu button[aria-pressed=true]{text-decoration:underline}
.studio-mobile-actions{display:none!important}.u17-mobile-actions{display:none}.u17-auto{font-size:11px;color:var(--muted);margin:4px 0}.u17-result-actions:empty{display:none}.lc-request-line{margin:8px 0}.lc-input-tabs,.lc-response-tabs{margin:8px 0}.lc-response{margin-top:12px}.u17-advanced .u16-split>.field{min-width:0}.u16-review-row select{max-width:100%}.v13-mapping-row{min-width:0}
@media(max-width:750px){body{padding:6px 8px 84px}.main-card{padding:12px}.top.studio-header{position:relative}.extra-panel button[data-u17-role]{min-height:44px;padding:8px 10px}.extra-panel select,.compact-nav select{min-height:44px}.extra-panel input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=color]):not([type=file]){min-height:44px}.json-editors,.u17-editor-pair{display:grid!important;grid-template-columns:minmax(0,1fr)!important;gap:14px;padding-right:0}.json-editors[data-mobile-pane]>[data-studio-pane]{display:block!important}.studio-divider{display:none}.u17-editor-pair textarea,.developer-editor{min-height:190px}.v13-editor-tools>button{min-height:44px;font-size:11px;padding:8px 6px}.v13-editor-tools{gap:2px}.u17-editor-menu>summary,.u17-view-menu>summary{min-height:44px;display:flex;align-items:center}.v12-output-tabs button{min-height:44px}.v12-suite-tabs{flex-wrap:nowrap;overflow:auto;max-width:100%;padding-bottom:8px}.v12-suite-tabs button{flex:none;white-space:nowrap;min-height:44px}.extra-panel .field,.extra-panel .row>*{max-width:100%}.u17-actions{gap:6px}.u17-mobile-actions{position:fixed;display:flex;left:0;right:0;bottom:0;z-index:25;gap:8px;padding:8px 12px max(8px,env(safe-area-inset-bottom));background:var(--panel);border-top:1px solid var(--line)}.u17-mobile-actions[hidden]{display:none}.u17-mobile-actions button{min-height:44px;flex:1;min-width:0;font-size:12px}.u17-advanced>summary{min-height:44px}.u17-editor-menu[open]>div{min-width:160px}.u17-result-actions button{font-size:11px}.v12-shared{gap:4px}.v12-shared button{font-size:11px;min-height:44px}.u17-advanced .u16-split>.field{resize:none;min-width:0}.lc-request-line{gap:6px}.lc-request-line .field{min-width:0}.lc-request-line select{width:90px}}
/* Override the earlier compact/mobile editor rules without shrinking the working area. */
.extra-panel .u17-actions{display:flex!important;padding:6px 0!important;margin:2px 0 8px!important;justify-content:flex-start!important;gap:8px!important}
.developer-status:empty,.u15-status:empty{display:none!important}.v12-nested-mode>.panel-heading:not(:has(button)){display:none}.v12-nested-mode{padding-top:2px!important}
.u17-editor-controls{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin:3px 0 5px}.u17-editor-controls .v13-editor-tools,.u17-editor-controls .v12-output-tabs{margin:0}.u17-editor-controls .v13-editor-tools{flex:1}.u17-editor-controls .v12-output-tabs{order:2}.developer-editor{min-height:240px!important}.u17-advanced .developer-editor{min-height:130px!important}.u17-advanced .u16-split .developer-editor{min-height:260px!important}.u17-workspace-options{margin:8px 0!important;border-radius:8px!important}.u17-workspace-options>summary{padding:10px!important}
@media(max-width:750px){.developer-editor{min-height:190px!important}.extra-panel .u17-actions{gap:6px!important}.u17-editor-controls{gap:3px}.u17-editor-controls .v13-editor-tools{flex:1}.u17-editor-controls .v12-output-tabs{order:0}.u17-editor-controls .v13-editor-tools>button{font-size:11px}.v12-nested-mode>.cs-intro{margin:2px 0 8px}.u17-actions .inline-field{margin:0}.u17-actions>button{flex:none}}
`;
}],
[2216,function initialize_2216(__studio33){
document.head.append(__studio33.u17Style);
}],
[2225,function initialize_2225(__studio33){
for(const e of document.querySelectorAll('.row,.developer-toolbar'))if(!e.id&&!e.querySelector('button,input:not([type=file]),select,textarea')&&!e.textContent.trim())e.classList.add('u17-empty');
}],
[2226,function initialize_2226(__studio33){
for(const {editor,tools}of __studio33.v13Editors.values()){const field=editor.closest('.field');if(!field||tools.closest('.u17-editor-controls'))continue;const controls=__studio33.csText('div','','u17-editor-controls');tools.before(controls);controls.append(tools);const tabs=field.querySelector('.v12-output-tabs');if(tabs)controls.append(tabs)}
}],
[2242,function initialize_2242(__studio33){
__studio33.u17SuiteOptions();
}],
[2243,function initialize_2243(__studio33){
document.querySelectorAll('button').forEach(__studio33.u17Classify);
}],
[2244,function initialize_2244(__studio33){
for(const e of document.querySelectorAll('.field input,.field select,.field textarea'))if(!e.hasAttribute('aria-label')&&!e.hasAttribute('aria-labelledby')){const title=e.closest('.field')?.querySelector(':scope>span')?.textContent.trim();if(title)e.setAttribute('aria-label',title)}
}],
[2246,function initialize_2246(__studio33){
document.addEventListener('toggle',__studio33.$fn(e=>{if(e.target.tagName==='DETAILS'&&e.target.open&&e.target.closest('.u17-advanced')){const parent=e.target.parentElement?.closest('details');if(parent)__studio33.u17Reveal(parent)}},"e=>{if(e.target.tagName==='DETAILS'&&e.target.open&&e.target.closest('.u17-advanced')){const parent=e.target.parentElement?.closest('details');if(parent)u17Reveal(parent)}}",""),true);
}],
[2247,function initialize_2247(__studio33){
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.u17-editor-menu[open],.u17-view-menu[open]').forEach(d=>d.open=false)});
}],
[2248,function initialize_2248(__studio33){
document.addEventListener('pointerdown',e=>document.querySelectorAll('.u17-editor-menu[open],.u17-view-menu[open]').forEach(d=>{if(!d.contains(e.target))d.open=false}));
}],
[2250,function initialize_2250(__studio33){
__studio33.u17Mobile.setAttribute('aria-label','Current tool shortcuts');
}],
[2251,function initialize_2251(__studio33){
__studio33.u17Mobile.hidden=true;
}],
[2252,function initialize_2252(__studio33){
document.body.append(__studio33.u17Mobile);
}],
[2256,function initialize_2256(__studio33){
__studio33.u17Observer.observe(__studio33.$('workspace'),{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['disabled','hidden']});
}],
[2257,function initialize_2257(__studio33){
__studio33.u17MobileSync();
}],
[2259,function initialize_2259(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 17';
}],
[2260,function initialize_2260(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Edition 17: compact, consistent controls'),__studio33.csText('p','Filled buttons run the main action. Outlined result buttons copy, download or reuse output. Text controls manage editors. Clear/delete actions use a distinct danger style. Inputs and outputs are visible together on desktop and stacked on mobile; editor tools and advanced features remain available through More and Advanced & help. Mobile shortcuts provide the main action, Results and Advanced.'));
}],
[2290,function initialize_2290(__studio33){
try{__studio33.u18State=__studio33.u18StateCheck(__studio33.storage.get(__studio33.u18StateKey,{version:1,recipes:[],programs:[]}))}catch{__studio33.u18State={version:1,recipes:[],programs:[]}}
}],
[2310,function initialize_2310(__studio33){
__studio33.rdNormalize=__studio33.$fn(function(x){const r=__studio33.u18PreviousRDNormalize(x);if(r.sections!==undefined){if(!r.sections||typeof r.sections!=='object'||Array.isArray(r.sections)||!Array.isArray(r.repeatingDefinitions))throw Error('Invalid repeating response sections');const layout=__studio33.u18FormLayoutCheck({repeating:r.repeatingDefinitions,steps:[],computed:[]},r.fields,false);for(const [id,entries]of Object.entries(r.sections)){const s=layout.repeating.find(s=>s.id===id);if(!s||!Array.isArray(entries)||entries.length<s.minRows||entries.length>s.maxRows)throw Error('Repeating response rows are outside the declared bounds');for(const row of entries){if(!row||typeof row!=='object'||Array.isArray(row)||Object.keys(row).some(k=>!s.fields.some(f=>f.id===k)))throw Error('Unknown repeating response field');for(const f of s.fields){const v=row[f.id];if(v!==undefined&&!['string','number','boolean'].includes(typeof v)||typeof v==='number'&&!Number.isFinite(v))throw Error('Unsupported repeating answer value')}}}for(const s of layout.repeating)if(!Object.hasOwn(r.sections,s.id))throw Error('Missing repeating response section '+s.id)}return r},"function(x){const r=u18PreviousRDNormalize(x);if(r.sections!==undefined){if(!r.sections||typeof r.sections!=='object'||Array.isArray(r.sections)||!Array.isArray(r.repeatingDefinitions))throw Error('Invalid repeating response sections');const layout=u18FormLayoutCheck({repeating:r.repeatingDefinitions,steps:[],computed:[]},r.fields,false);for(const [id,entries]of Object.entries(r.sections)){const s=layout.repeating.find(s=>s.id===id);if(!s||!Array.isArray(entries)||entries.length<s.minRows||entries.length>s.maxRows)throw Error('Repeating response rows are outside the declared bounds');for(const row of entries){if(!row||typeof row!=='object'||Array.isArray(row)||Object.keys(row).some(k=>!s.fields.some(f=>f.id===k)))throw Error('Unknown repeating response field');for(const f of s.fields){const v=row[f.id];if(v!==undefined&&!['string','number','boolean'].includes(typeof v)||typeof v==='number'&&!Number.isFinite(v))throw Error('Unsupported repeating answer value')}}}for(const s of layout.repeating)if(!Object.hasOwn(r.sections,s.id))throw Error('Missing repeating response section '+s.id)}return r}","");
}],
[2312,function initialize_2312(__studio33){
__studio33.u18Style.textContent=`.u18-feature{overflow-wrap:anywhere}.u18-feature>.field{margin:12px 0}.u18-feature textarea{min-height:130px!important;font:12px/1.6 ui-monospace,Consolas,monospace;resize:vertical;white-space:pre}.u18-feature>button{margin:5px 6px 5px 0}.u18-feature pre{white-space:pre-wrap;max-height:360px;overflow:auto;font:12px/1.6 ui-monospace,monospace}.u18-feature .u18-report{margin:12px 0;max-height:500px;overflow:auto}.u18-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:8px 0;border-bottom:1px solid var(--line)}.u18-row>strong{flex:1;min-width:160px}.u18-row input,.u18-row select{max-width:100%;min-width:0}.u18-guide{width:min(860px,calc(100% - 24px));max-height:90vh;overflow:auto;border:1px solid var(--line);background:var(--panel);color:var(--text);border-radius:14px;padding:22px}.u18-guide::backdrop{background:#12221c88}.u18-guide header{display:flex;gap:12px;justify-content:space-between;align-items:center}.u18-guide h2{font-size:20px;margin:0}.u18-guide input{width:100%;padding:10px;margin:12px 0;border:1px solid var(--line);border-radius:6px;background:var(--surface);color:var(--text)}.u18-guide td{overflow-wrap:anywhere}.u18-program-svg{display:block;max-width:100%;height:auto}.u18-form-frame{width:100%;height:600px;border:1px solid var(--line);border-radius:8px}@media(max-width:750px){.u18-feature>button{min-height:44px}.u18-feature .u15-table{min-width:560px}.u18-feature .table-scroll{overflow:auto;max-width:100%}.u18-guide{padding:14px}.u18-guide .table-scroll{overflow:auto}.u18-guide table{min-width:560px}}`;
}],
[2313,function initialize_2313(__studio33){
document.head.append(__studio33.u18Style);
}],
[2322,function initialize_2322(__studio33){
__studio33.u18Field(__studio33.u18API,'u18Spec','OpenAPI 3.0 JSON','{}');
}],
[2323,function initialize_2323(__studio33){
__studio33.u18Field(__studio33.u18API,'u18Operation','Operation','','text',[['','Import a specification first']]);
}],
[2326,function initialize_2326(__studio33){
__studio33.u18File(__studio33.u18API,'u18SpecFile','Import specification JSON','.json,application/json',__studio33.$fn(async f=>{const source=await f[0].text();__studio33.u15Change(__studio33.$('u18Spec'),source);__studio33.u18LoadSpec(__studio33.u18Read(source))},"async f=>{const source=await f[0].text();u15Change($('u18Spec'),source);u18LoadSpec(u18Read(source))}",""));
}],
[2327,function initialize_2327(__studio33){
__studio33.u18Button(__studio33.u18API,'u18SpecImport','Import specification',__studio33.$fn(()=>__studio33.u18LoadSpec(__studio33.u18Read(__studio33.$('u18Spec').value)),"()=>u18LoadSpec(u18Read($('u18Spec').value))",""),true);
}],
[2334,function initialize_2334(__studio33){
__studio33.$('u18Spec').addEventListener('input',__studio33.$fn(()=>{__studio33.u18Operations=[];__studio33.u18APIBinding=null;__studio33.u18SentBinding=null},"()=>{u18Operations=[];u18APIBinding=null;u18SentBinding=null}",""));
}],
[2335,function initialize_2335(__studio33){
__studio33.$('u18Operation').addEventListener('change',__studio33.$fn(()=>{__studio33.u18APIBinding=null;__studio33.u18SentBinding=null},"()=>{u18APIBinding=null;u18SentBinding=null}",""));
}],
[2337,function initialize_2337(__studio33){
__studio33.u18Field(__studio33.u18Meta,'u18Describe','Describe JSON: object, array, or object-name map','[]');
}],
[2345,function initialize_2345(__studio33){
__studio33.u18Field(__studio33.u18Logs,'u18Apex','Or paste one Apex class','');
}],
[2349,function initialize_2349(__studio33){
__studio33.u18Field(__studio33.u18Map,'u18MapRules','Advanced mapping rules','[{"to":"/recordId","value":{"path":"/id"}}]');
}],
[2355,function initialize_2355(__studio33){
__studio33.u18Field(__studio33.u18Data,'u18RecipeName','Recipe name','Clean records','text');
}],
[2356,function initialize_2356(__studio33){
__studio33.u18Field(__studio33.u18Data,'u18RecipeSaved','Saved recipe','','text',[['','Choose a recipe']]);
}],
[2357,function initialize_2357(__studio33){
__studio33.u18Field(__studio33.u18Data,'u18RecipeSteps','Recipe steps','[]');
}],
[2358,function initialize_2358(__studio33){
__studio33.u18Field(__studio33.u18Data,'u18LineRow','Output row (1-based)','1','number');
}],
[2359,function initialize_2359(__studio33){
__studio33.u18Field(__studio33.u18Data,'u18LineColumn','Output column name','','text');
}],
[2362,function initialize_2362(__studio33){
__studio33.u18RecipeChoices();
}],
[2368,function initialize_2368(__studio33){
__studio33.u18Button(__studio33.u18Data,'u18RecipeLoad','Load selected recipe',__studio33.$fn(()=>{const r=__studio33.u18State.recipes.find(__studio33.$fn(r=>r.name===__studio33.$('u18RecipeSaved').value,"r=>r.name===$('u18RecipeSaved').value",""));if(!r)throw Error('Choose a recipe');__studio33.u15Change(__studio33.$('u18RecipeSteps'),JSON.stringify(r.steps,null,2));__studio33.$('u18RecipeName').value=r.name;__studio33.u18RecipePreview=null},"()=>{const r=u18State.recipes.find(r=>r.name===$('u18RecipeSaved').value);if(!r)throw Error('Choose a recipe');u15Change($('u18RecipeSteps'),JSON.stringify(r.steps,null,2));$('u18RecipeName').value=r.name;u18RecipePreview=null}",""));
}],
[2369,function initialize_2369(__studio33){
__studio33.u18Button(__studio33.u18Data,'u18RecipeExport','Export recipe & lineage',__studio33.$fn(()=>{__studio33.u18Fresh(__studio33.u18RecipePreview,__studio33.u18RecipeSig());const r=__studio33.u18RecipePreview.report;__studio33.u18Export('transformation-recipe-lineage.json',{name:__studio33.$('u18RecipeName').value,steps:r.steps,rowRefs:r.rowRefs.map(i=>i+1),columns:r.columns})},"()=>{u18Fresh(u18RecipePreview,u18RecipeSig());const r=u18RecipePreview.report;u18Export('transformation-recipe-lineage.json',{name:$('u18RecipeName').value,steps:r.steps,rowRefs:r.rowRefs.map(i=>i+1),columns:r.columns})}",""));
}],
[2372,function initialize_2372(__studio33){
__studio33.u18Field(__studio33.u18Recon,'u18MatchRules','Weighted matching rules','[{"left":"name","right":"name","mode":"text","weight":1,"tolerance":0}]');
}],
[2373,function initialize_2373(__studio33){
__studio33.u18Field(__studio33.u18Recon,'u18MatchThreshold','Minimum similarity (%)','70','number');
}],
[2378,function initialize_2378(__studio33){
__studio33.u18Button(__studio33.u18Recon,'u18MatchExport','Export reviewed pair audit',__studio33.$fn(()=>__studio33.u18Export('reviewed-record-matches.json',{pairs:__studio33.u18ReviewedPairs().map(m=>({...m,left:m.left+1,right:m.right+1})),notice:'Indices are 1-based source rows. Similarity scores are not probabilities.'}),"()=>u18Export('reviewed-record-matches.json',{pairs:u18ReviewedPairs().map(m=>({...m,left:m.left+1,right:m.right+1})),notice:'Indices are 1-based source rows. Similarity scores are not probabilities.'})",""));
}],
[2382,function initialize_2382(__studio33){
__studio33.u18Field(__studio33.u18Flow,'u18ProgramName','Program name','Branching transformation','text');
}],
[2383,function initialize_2383(__studio33){
__studio33.u18Field(__studio33.u18Flow,'u18ProgramSaved','Saved program','','text',[['','Choose a program']]);
}],
[2384,function initialize_2384(__studio33){
__studio33.u18Field(__studio33.u18Flow,'u18Program','Program graph JSON',JSON.stringify({entry:'format',nodes:[{id:'format',kind:'action',action:'pretty',options:{},next:'end'},{id:'end',kind:'end'}]},null,2));
}],
[2385,function initialize_2385(__studio33){
__studio33.u18Field(__studio33.u18Flow,'u18ProgramTests','Test fixtures (text inputs and expected outputs)','[]');
}],
[2388,function initialize_2388(__studio33){
__studio33.u18ProgramChoices();
}],
[2394,function initialize_2394(__studio33){
__studio33.u18Button(__studio33.u18Flow,'u18ProgramLoad','Load selected program',__studio33.$fn(()=>{const p=__studio33.u18State.programs.find(__studio33.$fn(p=>p.name===__studio33.$('u18ProgramSaved').value,"p=>p.name===$('u18ProgramSaved').value",""));if(!p)throw Error('Choose a saved program');__studio33.$('u18ProgramName').value=p.name;__studio33.u15Change(__studio33.$('u18Program'),JSON.stringify(p.program,null,2));__studio33.u18ProgramDraw(p.program)},"()=>{const p=u18State.programs.find(p=>p.name===$('u18ProgramSaved').value);if(!p)throw Error('Choose a saved program');$('u18ProgramName').value=p.name;u15Change($('u18Program'),JSON.stringify(p.program,null,2));u18ProgramDraw(p.program)}",""));
}],
[2396,function initialize_2396(__studio33){
__studio33.u18Button(__studio33.u18Flow,'u18ProgramExport','Export program, fixtures & test report',__studio33.$fn(()=>{const program=__studio33.u18ProgramCheck(__studio33.u18Read(__studio33.$('u18Program').value)),tests=__studio33.u18Read(__studio33.$('u18ProgramTests').value);if(__studio33.u18ProgramTestReport)__studio33.u18Fresh(__studio33.u18ProgramTestReport,__studio33.u18Signature(['u18Program','u18ProgramTests'],__studio33.u18State.programs));__studio33.u18Export('workflow-program-tests.json',{name:__studio33.$('u18ProgramName').value,program,tests,report:__studio33.u18ProgramTestReport?.rows||[]})},"()=>{const program=u18ProgramCheck(u18Read($('u18Program').value)),tests=u18Read($('u18ProgramTests').value);if(u18ProgramTestReport)u18Fresh(u18ProgramTestReport,u18Signature(['u18Program','u18ProgramTests'],u18State.programs));u18Export('workflow-program-tests.json',{name:$('u18ProgramName').value,program,tests,report:u18ProgramTestReport?.rows||[]})}",""));
}],
[2397,function initialize_2397(__studio33){
__studio33.u18File(__studio33.u18Flow,'u18ProgramFile','Import program and fixtures','.json,application/json',__studio33.$fn(async files=>{const p=__studio33.u18Read(await files[0].text());__studio33.u18ProgramCheck(p.program);__studio33.u18Array(p.tests||[],30,'tests');__studio33.$('u18ProgramName').value=String(p.name||'Imported program').slice(0,100);__studio33.u15Change(__studio33.$('u18Program'),JSON.stringify(p.program,null,2));__studio33.u15Change(__studio33.$('u18ProgramTests'),JSON.stringify(p.tests||[],null,2));__studio33.u18ProgramTestReport=null;__studio33.u18ProgramDraw(p.program)},"async files=>{const p=u18Read(await files[0].text());u18ProgramCheck(p.program);u18Array(p.tests||[],30,'tests');$('u18ProgramName').value=String(p.name||'Imported program').slice(0,100);u15Change($('u18Program'),JSON.stringify(p.program,null,2));u15Change($('u18ProgramTests'),JSON.stringify(p.tests||[],null,2));u18ProgramTestReport=null;u18ProgramDraw(p.program)}",""));
}],
[2399,function initialize_2399(__studio33){
__studio33.u18Field(__studio33.u18Board,'u18AvailabilityJSON','Availability by exact assignee name','{"Unassigned":{"dailyHours":8,"weekends":[0,6],"leave":[],"overrides":{}}}');
}],
[2400,function initialize_2400(__studio33){
__studio33.u18Field(__studio33.u18Board,'u18LevelStart','Earliest start date',__studio33.csDate(),'date');
}],
[2405,function initialize_2405(__studio33){
__studio33.u18Button(__studio33.u18Board,'u18LevelExport','Export reviewed allocations',__studio33.$fn(()=>{__studio33.u18Fresh(__studio33.u18LevelPreview,__studio33.u18LevelSig());__studio33.u18Export('availability-schedule.json',__studio33.u18LevelPreview.report)},"()=>{u18Fresh(u18LevelPreview,u18LevelSig());u18Export('availability-schedule.json',u18LevelPreview.report)}",""));
}],
[2407,function initialize_2407(__studio33){
__studio33.u18Field(__studio33.u18Form,'u18Layout','Layout JSON','{"steps":[],"computed":[],"repeating":[]}');
}],
[2415,function initialize_2415(__studio33){
__studio33.u18Field(__studio33.u18Finance,'u18ActualPayments','Actual payments JSON','[]');
}],
[2416,function initialize_2416(__studio33){
__studio33.u18Field(__studio33.u18Finance,'u18ActualDate','As-of date',__studio33.csDate(),'date');
}],
[2417,function initialize_2417(__studio33){
__studio33.u18Field(__studio33.u18Finance,'u18Rounding','Actual interest rounding','payment','text',[['payment','At each payment'],['daily','Each day']]);
}],
[2421,function initialize_2421(__studio33){
__studio33.u18Button(__studio33.u18Finance,'u18ActualExport','Export payment comparison',__studio33.$fn(()=>{__studio33.u18Fresh(__studio33.u18ActualPreview,__studio33.u18ActualSig());__studio33.u18Export('planned-actual-payments.json',__studio33.u18ActualPreview.report)},"()=>{u18Fresh(u18ActualPreview,u18ActualSig());u18Export('planned-actual-payments.json',u18ActualPreview.report)}",""));
}],
[2423,function initialize_2423(__studio33){
__studio33.u18Guide.id='u18Guide';
}],
[2424,function initialize_2424(__studio33){
__studio33.u18Guide.className='u18-guide';
}],
[2425,function initialize_2425(__studio33){
__studio33.u18Guide.setAttribute('aria-label','Current tool guide');
}],
[2427,function initialize_2427(__studio33){
__studio33.u18GuideSearch.placeholder='Find a button or dropdown';
}],
[2428,function initialize_2428(__studio33){
__studio33.u18GuideSearch.setAttribute('aria-label','Find a control in this guide');
}],
[2429,function initialize_2429(__studio33){
__studio33.u18GuideHeader.append(__studio33.u18GuideTitle,__studio33.csButton('Close Guide',__studio33.$fn(()=>__studio33.u18Guide.close(),"()=>u18Guide.close()","")));
}],
[2430,function initialize_2430(__studio33){
__studio33.u18Guide.append(__studio33.u18GuideHeader,__studio33.csText('p','Control meanings, locations and dropdown choices for the current tool. Advanced controls stay in their named feature panel.','hint'),__studio33.u18GuideSearch,__studio33.u18GuideBody);
}],
[2431,function initialize_2431(__studio33){
document.body.append(__studio33.u18Guide);
}],
[2433,function initialize_2433(__studio33){
Object.assign(__studio33.u18GuideDescriptions,{
 u18SpecImport:'Parses OpenAPI 3.0 JSON and lists supported operations. No request is sent.',u18Operation:'Chooses the imported method/path to load. Changing it clears the prior response contract binding.',u18SpecLoad:'Replaces the client editor with an operation template. Review variables and authentication before Send.',u18ContractCheck:'Checks the latest complete response from the loaded operation against its declared status and JSON contract.',
 u18MetaCheck:'Checks current Composite writes against the imported Describe metadata; no org request is made.',u18MetaExport:'Downloads the findings only while the payload and metadata still match the checked inputs.',u18SourceAnalyze:'Links query/DML log events to uploaded classes and source lines, with evidence and loop candidates.',u18SourceExport:'Downloads source-link findings, without copying the uploaded class bodies into the report.',
 u18MapPreview:'Builds a local result using nested declarative mapping expressions. The source is unchanged.',u18MapUse:'Places the reviewed mapping in the output editor only while its inputs are unchanged.',u18MapExport:'Downloads the fresh mapped JSON result with exact numeric tokens.',
 u18RecipePreview:'Runs recipe steps on a copy of the loaded table for review.',u18RecipeApply:'Commits the reviewed table as one change. Table Undo restores the source.',u18RecipeSaved:'Chooses a saved recipe configuration; use Load selected recipe to put it in the editor.',u18RecipeLoad:'Loads the chosen configuration; it does not transform the table until preview and apply.',u18RecipeSave:'Saves recipe steps under the entered name, replacing a recipe with that name. Source data is excluded.',u18Lineage:'Shows the source row, source columns and transformation steps for the selected output cell.',u18RecipeExport:'Downloads recipe steps and lineage references before Apply. Source cell values are excluded.',
 u18MatchPreview:'Computes up to three rule-based similarity candidates per reference row in a bounded worker.',u18MatchExport:'Downloads the pair audit after every row is reviewed and duplicate assignments are resolved.',u18MatchUse:'Adds approved synthetic match keys to working copies. Review mappings and choose Reconcile afterward.',
 u18ProgramReview:'Validates graph nodes and displays branch connections without running transformations.',u18ProgramRun:'Runs local action/condition/call nodes on workflow input and places the result in workflow output.',u18ProgramSaved:'Chooses a reusable saved program. Use Load selected program to edit it.',u18ProgramCancel:'Requests cancellation of the graph or fixtures at the next local processing checkpoint.',u18ProgramSave:'Saves the graph under its name for Call nodes; fixture data is excluded.',u18ProgramLoad:'Replaces draft graph JSON with the selected saved program.',u18ProgramTest:'Runs editor fixtures and compares actual output with expected text or JSON.',u18ProgramExport:'Downloads the graph, fixtures and current test report; changed inputs require rerunning the tests.',
 u18LevelPreview:'Allocates estimated task hours using dependencies, assignee calendars and daily capacities without changing dates.',u18LevelApply:'Applies reviewed task dates as one board change. Board Undo restores the previous dates.',u18LevelExport:'Downloads the reviewed task dates and per-day allocations before Apply.',
 u18LayoutFields:'Shows stable ordinary field IDs and fills the layout editor with its saved configuration.',u18LayoutSave:'Validates and saves the layout; actual changes increment the form version.',u18LayoutPreview:'Opens the saved standalone wizard in a local preview frame.',u18LayoutExport:'Downloads a self-contained form with the saved steps, calculations, repeats and response contract.',u18RepeatInspect:'Checks imported repeating entries for required values, types and allowed choices.',
 u18ActualCompare:'Computes actual/365 principal and interest from receipts and compares with the existing dated loan plan.',u18ActualExport:'Downloads the fresh principal/interest/receipt comparison.',u18Rounding:'At each payment rounds accrued interest when a normal receipt arrives; Each day rounds each daily accrual to cents.'
});
}],
[2437,function initialize_2437(__studio33){
__studio33.u18GuideButton.id='u18GuideOpen';
}],
[2438,function initialize_2438(__studio33){
__studio33.u18GuideButton.setAttribute('aria-label','Guide to the current tool');
}],
[2439,function initialize_2439(__studio33){
document.querySelector('.top-actions')?.append(__studio33.u18GuideButton);
}],
[2440,function initialize_2440(__studio33){
__studio33.u18GuideSearch.oninput=__studio33.u18GuideDraw;
}],
[2441,function initialize_2441(__studio33){
__studio33.backupKeys.push(__studio33.u18StateKey);
}],
[2443,function initialize_2443(__studio33){
__studio33.backupSnapshot=__studio33.$fn(function(){const x=__studio33.u18OldBackup();x.state[__studio33.u18StateKey]=__studio33.csClone(__studio33.u18State);return x},"function(){const x=u18OldBackup();x.state[u18StateKey]=csClone(u18State);return x}","");
}],
[2445,function initialize_2445(__studio33){
__studio33.validateBackup=__studio33.$fn(function(data){const raw={...data,state:{...data?.state}};if(!Object.hasOwn(raw.state,__studio33.u18StateKey))raw.state[__studio33.u18StateKey]=null;const x=__studio33.u18OldValidateBackup(raw);if(x.state[__studio33.u18StateKey])__studio33.u18StateCheck(x.state[__studio33.u18StateKey]);return x},"function(data){const raw={...data,state:{...data?.state}};if(!Object.hasOwn(raw.state,u18StateKey))raw.state[u18StateKey]=null;const x=u18OldValidateBackup(raw);if(x.state[u18StateKey])u18StateCheck(x.state[u18StateKey]);return x}","");
}],
[2447,function initialize_2447(__studio33){
__studio33.csRestoreSavedWork=__studio33.$fn(function(s){__studio33.u18OldRestore(s);__studio33.u18State=s[__studio33.u18StateKey]?__studio33.u18StateCheck(s[__studio33.u18StateKey]):{version:1,recipes:[],programs:[]};__studio33.u18RecipeChoices();__studio33.u18ProgramChoices()},"function(s){u18OldRestore(s);u18State=s[u18StateKey]?u18StateCheck(s[u18StateKey]):{version:1,recipes:[],programs:[]};u18RecipeChoices();u18ProgramChoices()}","");
}],
[2449,function initialize_2449(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 18';
}],
[2450,function initialize_2450(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Edition 18: deeper existing tools'),__studio33.csText('p','OpenAPI 3.0 request templates and JSON response contracts, imported Salesforce Describe validation, source-linked Apex evidence, reviewed similarity matches, transformation recipes and cell lineage, nested mappings, three-way JSON/text merges, branching sub-workflows with fixtures, availability scheduling, repeating/calculated multi-step forms, and planned/actual payment reconciliation. Use Guide in the header for control locations and dropdown choices.'));
}],
[2455,function initialize_2455(__studio33){
try{__studio33.u19State=__studio33.u19Check(__studio33.storage.get(__studio33.u19Key,__studio33.u19Defaults))}catch{__studio33.u19State=__studio33.csClone(__studio33.u19Defaults)}
}],
[2466,function initialize_2466(__studio33){
__studio33.u19Settings.append(__studio33.csText('p','Choose a layout and reading style. These settings apply to every tool; themes remain independent.','u19-settings-note'));
}],
[2473,function initialize_2473(__studio33){
__studio33.u19Settings.append(__studio33.u19DeviceStatus);
}],
[2475,function initialize_2475(__studio33){
__studio33.u19RemoteBox.append(__studio33.csText('summary','Remote setup & received keys'),__studio33.csText('p','Arrows move focus. OK / Enter activates a control. Press OK on a field to edit; press Back to leave field editing. Learn only keys that this browser delivers. Browser-reserved keys cannot be remapped.','u19-settings-note'));
}],
[2477,function initialize_2477(__studio33){
__studio33.u19KeyStatus.id='u19KeyStatus';
}],
[2479,function initialize_2479(__studio33){
__studio33.u19RemoteBox.append(__studio33.u19KeyStatus);
}],
[2482,function initialize_2482(__studio33){
for(const [action,label]of Object.entries(__studio33.u19RemoteLabels)){const row=__studio33.csText('div','','u19-mapping'),text=__studio33.csText('div','');text.append(__studio33.csText('strong',label),document.createElement('br'));const detail=__studio33.csText('small','Default');__studio33.u19RemoteText[action]=detail;text.append(detail);row.append(text,__studio33.u19Button('Learn key',__studio33.$fn(()=>{__studio33.u19Learn=action;__studio33.u19KeyStatus.textContent='Press the key for '+label+'. Escape cancels learning.'},"()=>{u19Learn=action;u19KeyStatus.textContent='Press the key for '+label+'. Escape cancels learning.'}",""),'u19Learn-'+action));__studio33.u19RemoteBox.append(row)}
}],
[2483,function initialize_2483(__studio33){
__studio33.u19RemoteBox.append(__studio33.u19Button('Reset remote mappings',__studio33.$fn(()=>{__studio33.u19Learn='';__studio33.u19State.remote={};__studio33.u19Save();__studio33.u19MappingLabels();__studio33.u19KeyStatus.textContent='Default remote mappings restored.'},"()=>{u19Learn='';u19State.remote={};u19Save();u19MappingLabels();u19KeyStatus.textContent='Default remote mappings restored.'}",""),'u19RemoteReset'));
}],
[2484,function initialize_2484(__studio33){
__studio33.u19Settings.append(__studio33.u19RemoteBox);
}],
[2485,function initialize_2485(__studio33){
__studio33.u19Settings.append(__studio33.csText('p','Normal view always has a visible button in an expanded workspace, editor or presentation. Back closes the current menu/dialog first. TV field editing uses a dashed focus outline.','u19-settings-note'));
}],
[2487,function initialize_2487(__studio33){
__studio33.u19DeviceButton.classList.add('u19-device-button');
}],
[2488,function initialize_2488(__studio33){
document.querySelector('.studio-header').append(__studio33.u19DeviceButton);
}],
[2494,function initialize_2494(__studio33){
for(const [picker,key]of [[__studio33.u19LayoutPicker,'layout'],[__studio33.u19MotionPicker,'motion'],[__studio33.u19TextPicker,'editorSize']])picker.onchange=__studio33.$fn(()=>{__studio33.u19State[key]=picker.value;__studio33.u19Save();__studio33.u19Apply()},"()=>{u19State[key]=picker.value;u19Save();u19Apply()}","");
}],
[2495,function initialize_2495(__studio33){
__studio33.u19WrapPicker.onchange=__studio33.$fn(()=>{__studio33.u19State.wrap=__studio33.u19WrapPicker.value==='on';__studio33.u19Save();__studio33.u19Apply()},"()=>{u19State.wrap=u19WrapPicker.value==='on';u19Save();u19Apply()}","");
}],
[2496,function initialize_2496(__studio33){
__studio33.u19Settings.addEventListener('close',__studio33.$fn(()=>{__studio33.u19Learn='';__studio33.u19StopEditing();const current=document.activeElement;if(current===document.body||current===__studio33.u19Settings||__studio33.u19Settings.contains(current)){const previous=__studio33.u19DialogFocus.get(__studio33.u19Settings);(previous?.getClientRects().length?previous:__studio33.u19DeviceButton)?.focus({preventScroll:true})}__studio33.u19SyncExit()},"()=>{u19Learn='';u19StopEditing();const current=document.activeElement;if(current===document.body||current===u19Settings||u19Settings.contains(current)){const previous=u19DialogFocus.get(u19Settings);(previous?.getClientRects().length?previous:u19DeviceButton)?.focus({preventScroll:true})}u19SyncExit()}",""));
}],
[2501,function initialize_2501(__studio33){
window.addEventListener('resize',__studio33.u19Resize);
}],
[2502,function initialize_2502(__studio33){
window.addEventListener('orientationchange',__studio33.u19Resize);
}],
[2503,function initialize_2503(__studio33){
window.visualViewport?.addEventListener('resize',__studio33.u19Resize);
}],
[2504,function initialize_2504(__studio33){
for(const query of ['(pointer:coarse)','(prefers-reduced-motion:reduce)']){const media=matchMedia(query);if(media.addEventListener)media.addEventListener('change',__studio33.$fn(()=>__studio33.u19Apply(),"()=>u19Apply()",""))}
}],
[2505,function initialize_2505(__studio33){
document.addEventListener('focusin',__studio33.u19Viewport);
}],
[2506,function initialize_2506(__studio33){
document.addEventListener('focusout',__studio33.$fn(()=>requestAnimationFrame(__studio33.u19Viewport),"()=>requestAnimationFrame(u19Viewport)",""));
}],
[2510,function initialize_2510(__studio33){
__studio33.u19Exit.className='u19-exit';
}],
[2511,function initialize_2511(__studio33){
__studio33.u19Exit.hidden=true;
}],
[2512,function initialize_2512(__studio33){
__studio33.u19Exit.setAttribute('aria-label','Exit full screen and return to normal view');
}],
[2513,function initialize_2513(__studio33){
__studio33.u19Card.append(__studio33.u19Exit);
}],
[2518,function initialize_2518(__studio33){
__studio33.setEditorFullScreen=__studio33.$fn(function(value){if(value&&!__studio33.editorFullScreen)__studio33.u19AppSnapshot=__studio33.u19Snapshot();__studio33.u19OldAppFullscreen(value);if(!value){__studio33.u19Restore(__studio33.u19AppSnapshot);__studio33.u19AppSnapshot=null}__studio33.u19SyncExit()},"function(value){if(value&&!editorFullScreen)u19AppSnapshot=u19Snapshot();u19OldAppFullscreen(value);if(!value){u19Restore(u19AppSnapshot);u19AppSnapshot=null}u19SyncExit()}","");
}],
[2520,function initialize_2520(__studio33){
__studio33.v13CloseEditor=__studio33.$fn(function(){const was=!!__studio33.v13Focused;__studio33.u19OldCloseEditor();if(was){__studio33.u19Restore(__studio33.u19EditorSnapshot);__studio33.u19EditorSnapshot=null}__studio33.u19SyncExit()},"function(){const was=!!v13Focused;u19OldCloseEditor();if(was){u19Restore(u19EditorSnapshot);u19EditorSnapshot=null}u19SyncExit()}","");
}],
[2521,function initialize_2521(__studio33){
for(const [id,entry]of __studio33.v13Editors){const old=entry.expand;entry.expand=__studio33.$fn(function(){if(!__studio33.v13Focused)__studio33.u19EditorSnapshot=__studio33.u19Snapshot();old();__studio33.u19SyncExit()},"function(){if(!v13Focused)u19EditorSnapshot=u19Snapshot();old();u19SyncExit()}","");const button=entry.tools.querySelector('[data-expand]');if(button)button.onclick=entry.expand}
}],
[2522,function initialize_2522(__studio33){
document.addEventListener('click',__studio33.$fn(e=>{if(e.target.closest('[data-expand]')&&!__studio33.v13Focused)__studio33.u19EditorSnapshot=__studio33.u19Snapshot();if(e.target.closest('[data-expand],#ptFull,#fullScreenToggle'))requestAnimationFrame(__studio33.u19SyncExit)},"e=>{if(e.target.closest('[data-expand]')&&!v13Focused)u19EditorSnapshot=u19Snapshot();if(e.target.closest('[data-expand],#ptFull,#fullScreenToggle'))requestAnimationFrame(u19SyncExit)}",""),true);
}],
[2523,function initialize_2523(__studio33){
document.addEventListener('keydown',__studio33.$fn(e=>{if(e.altKey&&e.key==='Enter'&&e.target.tagName==='TEXTAREA'&&!__studio33.v13Focused){__studio33.u19EditorSnapshot=__studio33.u19Snapshot();requestAnimationFrame(__studio33.u19SyncExit)}},"e=>{if(e.altKey&&e.key==='Enter'&&e.target.tagName==='TEXTAREA'&&!v13Focused){u19EditorSnapshot=u19Snapshot();requestAnimationFrame(u19SyncExit)}}",""),true);
}],
[2525,function initialize_2525(__studio33){
if(__studio33.u19OldEditorHeaderButton)__studio33.u19OldEditorHeaderButton.textContent='Close editor';
}],
[2531,function initialize_2531(__studio33){
document.addEventListener('fullscreenchange',__studio33.$fn(()=>{if(!document.fullscreenElement&&__studio33.u19StageSnapshot)__studio33.u19StageExit();__studio33.u19SyncExit()},"()=>{if(!document.fullscreenElement&&u19StageSnapshot)u19StageExit();u19SyncExit()}",""));
}],
[2532,function initialize_2532(__studio33){
for(const dialog of document.querySelectorAll('dialog'))dialog.addEventListener('close',__studio33.$fn(()=>requestAnimationFrame(__studio33.u19SyncExit),"()=>requestAnimationFrame(u19SyncExit)",""));
}],
[2546,function initialize_2546(__studio33){
document.addEventListener('focusout',__studio33.$fn(e=>{if(e.target===__studio33.u19Editing)__studio33.u19StopEditing()},"e=>{if(e.target===u19Editing)u19StopEditing()}",""));
}],
[2547,function initialize_2547(__studio33){
document.addEventListener('pointerdown',__studio33.$fn(()=>__studio33.u19StopEditing(),"()=>u19StopEditing()",""));
}],
[2549,function initialize_2549(__studio33){
__studio33.showCommands=__studio33.$fn(function(){__studio33.u19OldCommands();if(__studio33.u19Layout==='tv'){const first=__studio33.$('commandResults').querySelector('button');(first||__studio33.$('commandClose')).focus()}__studio33.u19SyncExit()},"function(){u19OldCommands();if(u19Layout==='tv'){const first=$('commandResults').querySelector('button');(first||$('commandClose')).focus()}u19SyncExit()}","");
}],
[2550,function initialize_2550(__studio33){
__studio33.$('commandToggle').onclick=__studio33.showCommands;
}],
[2552,function initialize_2552(__studio33){
__studio33.u19Reader.classList.add('u19-expanded');
}],
[2555,function initialize_2555(__studio33){
__studio33.u19ReaderText.id='u19ReaderContent';
}],
[2556,function initialize_2556(__studio33){
__studio33.u19Reader.append(__studio33.u19ReaderActions,__studio33.u19ReaderText);
}],
[2558,function initialize_2558(__studio33){
__studio33.u19ReaderActions.append(__studio33.u19ReaderCopy,__studio33.csText('span','Result snapshot · rerun the tool to refresh.','hint'));
}],
[2559,function initialize_2559(__studio33){
__studio33.u19Reader.addEventListener('close',__studio33.$fn(()=>{__studio33.u19Restore(__studio33.u19ReaderSnapshot);__studio33.u19ReaderSnapshot=null;__studio33.u19SyncExit()},"()=>{u19Restore(u19ReaderSnapshot);u19ReaderSnapshot=null;u19SyncExit()}",""));
}],
[2569,function initialize_2569(__studio33){
__studio33.u19RowFields.className='u19-row-detail';
}],
[2570,function initialize_2570(__studio33){
__studio33.u19RowDialog.append(__studio33.u19RowFields);
}],
[2575,function initialize_2575(__studio33){
__studio33.u19RowDialog.append(__studio33.u19RowTools,__studio33.csText('p','Read-only details. Use the original table cells to edit values. Copy includes each value and its stored type.','u19-settings-note'));
}],
[2579,function initialize_2579(__studio33){
__studio33.dwRender=__studio33.$fn(function(){__studio33.u19OldDWRender();__studio33.u19InstallRowButtons()},"function(){u19OldDWRender();u19InstallRowButtons()}","");
}],
[2580,function initialize_2580(__studio33){
__studio33.u19InstallRowButtons();
}],
[2581,function initialize_2581(__studio33){
__studio33.u19RowDialog.addEventListener('close',__studio33.$fn(()=>{__studio33.u19DialogFocus.get(__studio33.u19RowDialog)?.focus({preventScroll:true});__studio33.u19SyncExit()},"()=>{u19DialogFocus.get(u19RowDialog)?.focus({preventScroll:true});u19SyncExit()}",""));
}],
[2583,function initialize_2583(__studio33){
__studio33.backupKeys.push(__studio33.u19Key);
}],
[2585,function initialize_2585(__studio33){
__studio33.backupSnapshot=__studio33.$fn(function(){const result=__studio33.u19PreviousBackup();result.state[__studio33.u19Key]=__studio33.csClone(__studio33.u19State);return result},"function(){const result=u19PreviousBackup();result.state[u19Key]=csClone(u19State);return result}","");
}],
[2587,function initialize_2587(__studio33){
__studio33.validateBackup=__studio33.$fn(function(data){const raw={...data,state:{...data?.state}};if(!Object.hasOwn(raw.state,__studio33.u19Key))raw.state[__studio33.u19Key]=null;const result=__studio33.u19PreviousValidation(raw);if(result.state[__studio33.u19Key])result.state[__studio33.u19Key]=__studio33.u19Check(result.state[__studio33.u19Key]);return result},"function(data){const raw={...data,state:{...data?.state}};if(!Object.hasOwn(raw.state,u19Key))raw.state[u19Key]=null;const result=u19PreviousValidation(raw);if(result.state[u19Key])result.state[u19Key]=u19Check(result.state[u19Key]);return result}","");
}],
[2589,function initialize_2589(__studio33){
__studio33.csRestoreSavedWork=__studio33.$fn(function(state){__studio33.u19PreviousRestore(state);__studio33.u19State=state[__studio33.u19Key]?__studio33.u19Check(state[__studio33.u19Key]):__studio33.csClone(__studio33.u19Defaults);__studio33.u19Apply()},"function(state){u19PreviousRestore(state);u19State=state[u19Key]?u19Check(state[u19Key]):csClone(u19Defaults);u19Apply()}","");
}],
[2591,function initialize_2591(__studio33){
__studio33.u19DialogWatch.observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
}],
[2593,function initialize_2593(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 19';
}],
[2594,function initialize_2594(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Edition 19: mobile & TV'),__studio33.csText('p','Use Device & display for Auto/Desktop/Mobile/TV layouts, editor size, wrapping and motion. Pearl and Graphite add subtle animated surfaces. TV uses arrows/OK/Back with optional received-key mapping; OK begins field editing, Back ends it. Every expanded view has a visible Normal view button. Focus result shows a snapshot, image zoom changes preview only, and Data Workbench rows have read-only Details. Remote keys and native fullscreen depend on the browser; onscreen exit remains available.'));
}],
[2595,function initialize_2595(__studio33){
__studio33.u19Apply();
}],
[2597,function initialize_2597(__studio33){
__studio33.u20MotionStatus.id='u20MotionStatus';
}],
[2600,function initialize_2600(__studio33){
__studio33.u20MotionFooter.append(__studio33.u20MotionStatus,__studio33.u20MotionButton);
}],
[2601,function initialize_2601(__studio33){
__studio33.$('themeMenu').append(__studio33.u20MotionFooter);
}],
[2605,function initialize_2605(__studio33){
__studio33.u19Apply=__studio33.$fn(function(){__studio33.u20ApplyPrevious();__studio33.u20MotionLabel();if(!__studio33.u20Animated()){__studio33.u19Card.style.removeProperty('--u20-x');__studio33.u19Card.style.removeProperty('--u20-y');document.querySelectorAll('.u20-ripple').forEach(e=>e.remove())}},"function(){u20ApplyPrevious();u20MotionLabel();if(!u20Animated()){u19Card.style.removeProperty('--u20-x');u19Card.style.removeProperty('--u20-y');document.querySelectorAll('.u20-ripple').forEach(e=>e.remove())}}","");
}],
[2607,function initialize_2607(__studio33){
__studio33.setTheme=__studio33.$fn(function(name){__studio33.u20SetThemePrevious(name);__studio33.u20MotionLabel();__studio33.u19Card.classList.remove('u20-enter');if(__studio33.u20Animated()){requestAnimationFrame(__studio33.$fn(()=>{__studio33.u19Card.classList.add('u20-enter');setTimeout(__studio33.$fn(()=>__studio33.u19Card.classList.remove('u20-enter'),"()=>u19Card.classList.remove('u20-enter')",""),400)},"()=>{u19Card.classList.add('u20-enter');setTimeout(()=>u19Card.classList.remove('u20-enter'),400)}",""))}},"function(name){u20SetThemePrevious(name);u20MotionLabel();u19Card.classList.remove('u20-enter');if(u20Animated()){requestAnimationFrame(()=>{u19Card.classList.add('u20-enter');setTimeout(()=>u19Card.classList.remove('u20-enter'),400)})}}","");
}],
[2609,function initialize_2609(__studio33){
__studio33.u19Card.addEventListener('pointermove',__studio33.$fn(e=>{if(!__studio33.u20Animated()||e.pointerType==='touch'||__studio33.u19Layout==='tv'||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;__studio33.u20PointerPoint={x:e.clientX,y:e.clientY};if(__studio33.u20PointerFrame)return;__studio33.u20PointerFrame=requestAnimationFrame(__studio33.$fn(()=>{__studio33.u20PointerFrame=0;if(!__studio33.u20Animated()||!__studio33.u20PointerPoint)return;const box=__studio33.u19Card.getBoundingClientRect();__studio33.u19Card.style.setProperty('--u20-x',Math.max(0,Math.min(100,(__studio33.u20PointerPoint.x-box.left)/box.width*100))+'%');__studio33.u19Card.style.setProperty('--u20-y',Math.max(0,Math.min(100,(__studio33.u20PointerPoint.y-box.top)/box.height*100))+'%')},"()=>{u20PointerFrame=0;if(!u20Animated()||!u20PointerPoint)return;const box=u19Card.getBoundingClientRect();u19Card.style.setProperty('--u20-x',Math.max(0,Math.min(100,(u20PointerPoint.x-box.left)/box.width*100))+'%');u19Card.style.setProperty('--u20-y',Math.max(0,Math.min(100,(u20PointerPoint.y-box.top)/box.height*100))+'%')}",""))},"e=>{if(!u20Animated()||e.pointerType==='touch'||u19Layout==='tv'||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;u20PointerPoint={x:e.clientX,y:e.clientY};if(u20PointerFrame)return;u20PointerFrame=requestAnimationFrame(()=>{u20PointerFrame=0;if(!u20Animated()||!u20PointerPoint)return;const box=u19Card.getBoundingClientRect();u19Card.style.setProperty('--u20-x',Math.max(0,Math.min(100,(u20PointerPoint.x-box.left)/box.width*100))+'%');u19Card.style.setProperty('--u20-y',Math.max(0,Math.min(100,(u20PointerPoint.y-box.top)/box.height*100))+'%')})}",""));
}],
[2610,function initialize_2610(__studio33){
__studio33.u19Card.addEventListener('pointerleave',__studio33.$fn(()=>{__studio33.u20PointerPoint=null;__studio33.u19Card.style.removeProperty('--u20-x');__studio33.u19Card.style.removeProperty('--u20-y')},"()=>{u20PointerPoint=null;u19Card.style.removeProperty('--u20-x');u19Card.style.removeProperty('--u20-y')}",""));
}],
[2612,function initialize_2612(__studio33){
document.addEventListener('pointerdown',__studio33.$fn(e=>__studio33.u20Feedback(e.target.closest('button'),e),"e=>u20Feedback(e.target.closest('button'),e)",""),{passive:true});
}],
[2613,function initialize_2613(__studio33){
document.addEventListener('click',__studio33.$fn(e=>{if(e.detail===0)__studio33.u20Feedback(e.target.closest('button'))},"e=>{if(e.detail===0)u20Feedback(e.target.closest('button'))}",""),true);
}],
[2614,function initialize_2614(__studio33){
window.addEventListener('keydown',__studio33.$fn(e=>{if(['Enter',' ','Select','Accept'].includes(e.key))__studio33.u20Feedback(e.target.closest('button'));if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)&&__studio33.u19Layout==='tv'&&__studio33.u20Animated())requestAnimationFrame(()=>{const e=document.activeElement;if(e?.matches('button')){e.classList.add('u20-tap-glow');setTimeout(()=>e.classList.remove('u20-tap-glow'),250)}})},"e=>{if(['Enter',' ','Select','Accept'].includes(e.key))u20Feedback(e.target.closest('button'));if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)&&u19Layout==='tv'&&u20Animated())requestAnimationFrame(()=>{const e=document.activeElement;if(e?.matches('button')){e.classList.add('u20-tap-glow');setTimeout(()=>e.classList.remove('u20-tap-glow'),250)}})}",""),true);
}],
[2616,function initialize_2616(__studio33){
document.addEventListener('visibilitychange',__studio33.u20VisibilityChanged);
}],
[2617,function initialize_2617(__studio33){
__studio33.u20VisibilityChanged();
}],
[2618,function initialize_2618(__studio33){
__studio33.u20MotionLabel();
}],
[2620,function initialize_2620(__studio33){
for(const [id,title]of [['categoryPicker','Category'],['workspacePicker','Tool']]){const select=__studio33.$(id),label=__studio33.csText('label','','u21-picker');label.htmlFor=id;label.append(__studio33.csText('span',title));select.before(label);label.append(select)}
}],
[2621,function initialize_2621(__studio33){
__studio33.u21Actions.prepend(__studio33.$('commandToggle'));
}],
[2622,function initialize_2622(__studio33){
__studio33.u21Actions.append(__studio33.u21Options);
}],
[2623,function initialize_2623(__studio33){
document.body.append(__studio33.$('commandOverlay'));
}],
[2624,function initialize_2624(__studio33){
__studio33.$('commandClose').onclick=__studio33.$fn(()=>__studio33.closeCommands(),"()=>closeCommands()","");
}],
[2626,function initialize_2626(__studio33){
__studio33.u21Header.before(__studio33.u21HeaderHome);
}],
[2630,function initialize_2630(__studio33){
__studio33.u21Options.addEventListener('toggle',__studio33.u21Position);
}],
[2632,function initialize_2632(__studio33){
__studio33.themeOpen=__studio33.$fn(function(open){if(open)__studio33.u21Options.open=false;__studio33.u21ThemeOpen(open);__studio33.u21Position()},"function(open){if(open)u21Options.open=false;u21ThemeOpen(open);u21Position()}","");
}],
[2633,function initialize_2633(__studio33){
__studio33.u21Options.querySelector('summary').addEventListener('click',__studio33.$fn(()=>{__studio33.themeOpen(false);requestAnimationFrame(__studio33.u21Position)},"()=>{themeOpen(false);requestAnimationFrame(u21Position)}",""));
}],
[2634,function initialize_2634(__studio33){
for(const event of ['resize','scroll','orientationchange'])window.addEventListener(event,__studio33.u21Position,{passive:true});
}],
[2635,function initialize_2635(__studio33){
window.visualViewport?.addEventListener('resize',__studio33.u21Position);
}],
[2636,function initialize_2636(__studio33){
window.visualViewport?.addEventListener('scroll',__studio33.u21Position);
}],
[2638,function initialize_2638(__studio33){
__studio33.u19Apply=__studio33.$fn(function(){__studio33.u21Apply();__studio33.u21Position()},"function(){u21Apply();u21Position()}","");
}],
[2640,function initialize_2640(__studio33){
__studio33.setEditorFullScreen=__studio33.$fn(function(value){const snapshot=value&&!__studio33.editorFullScreen?__studio33.u19Snapshot():null;if(value&&!__studio33.editorFullScreen)__studio33.u19Card.prepend(__studio33.u21Header);if(!value&&__studio33.u21Header.parentElement===__studio33.u19Card)__studio33.u21HeaderHome.after(__studio33.u21Header);__studio33.u21Fullscreen(value);if(snapshot)__studio33.u19AppSnapshot=snapshot;__studio33.u21Position()},"function(value){const snapshot=value&&!editorFullScreen?u19Snapshot():null;if(value&&!editorFullScreen)u19Card.prepend(u21Header);if(!value&&u21Header.parentElement===u19Card)u21HeaderHome.after(u21Header);u21Fullscreen(value);if(snapshot)u19AppSnapshot=snapshot;u21Position()}","");
}],
[2642,function initialize_2642(__studio33){
__studio33.u19Scope=__studio33.$fn(function(){return __studio33.u19Modal()||(!__studio33.$('commandOverlay').hidden?__studio33.$('commandOverlay'):!__studio33.$('themeMenu').hidden?__studio33.$('themeMenu'):__studio33.u21Options.open?__studio33.u21Options:__studio33.u21Scope())},"function(){return u19Modal()||(!$('commandOverlay').hidden?$('commandOverlay'):!$('themeMenu').hidden?$('themeMenu'):u21Options.open?u21Options:u21Scope())}","");
}],
[2644,function initialize_2644(__studio33){
__studio33.showCommands=__studio33.$fn(function(){__studio33.u21Options.open=false;__studio33.themeOpen(false);__studio33.u21Position();__studio33.u21ShowCommands()},"function(){u21Options.open=false;themeOpen(false);u21Position();u21ShowCommands()}","");
}],
[2645,function initialize_2645(__studio33){
__studio33.$('commandToggle').onclick=__studio33.showCommands;
}],
[2646,function initialize_2646(__studio33){
__studio33.u21Position();
}],
[2650,function initialize_2650(__studio33){
try{__studio33.u22State=__studio33.u22Check(__studio33.storage.get(__studio33.u22Key,{version:1,panes:{},draftTimes:{}}))}catch{__studio33.u22State={version:1,panes:{},draftTimes:{}}}
}],
[2659,function initialize_2659(__studio33){
document.addEventListener('input',__studio33.u22Changed);
}],
[2660,function initialize_2660(__studio33){
document.addEventListener('change',__studio33.u22Changed);
}],
[2680,function initialize_2680(__studio33){
__studio33.u22ApplyPanes();
}],
[2683,function initialize_2683(__studio33){
__studio33.u22ReaderInfo.id='u22ReaderInfo';
}],
[2684,function initialize_2684(__studio33){
__studio33.u19ReaderText.before(__studio33.u22ReaderInfo);
}],
[2686,function initialize_2686(__studio33){
__studio33.u22ReaderFind.type='search';
}],
[2687,function initialize_2687(__studio33){
__studio33.u22ReaderFind.placeholder='Find in complete result';
}],
[2688,function initialize_2688(__studio33){
__studio33.u22ReaderFind.setAttribute('aria-label','Find in complete result');
}],
[2689,function initialize_2689(__studio33){
__studio33.u22ReaderFind.id='u22ReaderFind';
}],
[2691,function initialize_2691(__studio33){
__studio33.u22ReaderSearch.append(__studio33.u22ReaderFind,__studio33.u19Button('Previous match',__studio33.$fn(()=>__studio33.u22FindReader(-1),"()=>u22FindReader(-1)",""),'u22ReaderPrevious'),__studio33.u19Button('Next match',__studio33.$fn(()=>__studio33.u22FindReader(1),"()=>u22FindReader(1)",""),'u22ReaderNext'));
}],
[2692,function initialize_2692(__studio33){
__studio33.u19ReaderText.before(__studio33.u22ReaderSearch);
}],
[2695,function initialize_2695(__studio33){
__studio33.u19ReaderActions.append(__studio33.u22ReaderDownload,__studio33.u22ReaderMore);
}],
[2696,function initialize_2696(__studio33){
__studio33.u19ReaderCopy.onclick=__studio33.$fn(()=>{if(__studio33.u22ReaderPayload)__studio33.copyText(__studio33.u22ReaderPayload)},"()=>{if(u22ReaderPayload)copyText(u22ReaderPayload)}","");
}],
[2699,function initialize_2699(__studio33){
__studio33.u22ReaderFind.oninput=__studio33.$fn(()=>{__studio33.u22ReaderMatch=-1;__studio33.u22FindReader(1)},"()=>{u22ReaderMatch=-1;u22FindReader(1)}","");
}],
[2701,function initialize_2701(__studio33){
__studio33.u19Reader.addEventListener('close',__studio33.$fn(()=>{__studio33.u22ReaderPayload='';__studio33.u22ReaderBlob=null;__studio33.u19ReaderText.replaceChildren();__studio33.u22ReaderFind.value=''},"()=>{u22ReaderPayload='';u22ReaderBlob=null;u19ReaderText.replaceChildren();u22ReaderFind.value=''}",""));
}],
[2704,function initialize_2704(__studio33){
__studio33.u22DiffNav.id='u22DiffNav';
}],
[2707,function initialize_2707(__studio33){
__studio33.u22DiffNav.append(__studio33.u22DiffPrev,__studio33.u22DiffNext,__studio33.u22DiffCount);
}],
[2714,function initialize_2714(__studio33){
__studio33.renderJSONDiff();
}],
[2716,function initialize_2716(__studio33){
__studio33.u22APIHelp.id='u22APIHelp';
}],
[2717,function initialize_2717(__studio33){
__studio33.u22APIHelp.hidden=true;
}],
[2729,function initialize_2729(__studio33){
__studio33.u22Graph.tabIndex=0;
}],
[2730,function initialize_2730(__studio33){
__studio33.u22Graph.setAttribute('aria-label','Graph preview');
}],
[2732,function initialize_2732(__studio33){
__studio33.$('u19View-graph').append(__studio33.u22GraphButton);
}],
[2734,function initialize_2734(__studio33){
__studio33.u19LayoutPicker.addEventListener('change',__studio33.u22StopInspect);
}],
[2737,function initialize_2737(__studio33){
__studio33.u22DraftDialog.append(__studio33.u22DraftInfo,__studio33.u22DraftText,__studio33.u19Button('Restore this draft',__studio33.$fn(()=>{if(!__studio33.u22DraftValues)return;try{__studio33.wsUndoRestore=__studio33.wsCapture([__studio33.u22DraftTool]);__studio33.wsApply({[__studio33.u22DraftTool]:__studio33.u22DraftValues});__studio33.wsRender();__studio33.u22DraftDialog.close();__studio33.toast('Draft restored. Undo snapshot restore is available in Project Workspaces.')}catch(e){__studio33.u22DraftInfo.textContent=e.message}},"()=>{if(!u22DraftValues)return;try{wsUndoRestore=wsCapture([u22DraftTool]);wsApply({[u22DraftTool]:u22DraftValues});wsRender();u22DraftDialog.close();toast('Draft restored. Undo snapshot restore is available in Project Workspaces.')}catch(e){u22DraftInfo.textContent=e.message}}",""),'u22DraftRestore'));
}],
[2741,function initialize_2741(__studio33){
for(const id of __studio33.wsEligible){const p=__studio33.$(id);if(!p)continue;const row=__studio33.csText('div','','u22-ui u22-draft'),labelWrap=__studio33.csText('label',''),check=document.createElement('input');check.type='checkbox';check.id='u22Recovery-'+id;labelWrap.append(check,document.createTextNode('Save this tool’s draft locally'));const label=__studio33.csText('small',''),preview=__studio33.u19Button('Preview saved draft',__studio33.$fn(()=>__studio33.u22PreviewDraft(id),"()=>u22PreviewDraft(id)",""),'u22Preview-'+id);row.append(labelWrap,label,preview);const advanced=p.querySelector(':scope>.u17-advanced');(advanced||p).append(row);__studio33.u22DraftLabels.set(id,{check,label,preview});check.onchange=__studio33.$fn(()=>{const tools=new Set(__studio33.v12State.recovery.tools);if(check.checked){tools.add(id);__studio33.v12State.recovery.values[id]=__studio33.u25RecoveryCapture([id])[id];__studio33.u22State.draftTimes[id]=new Date().toISOString()}else tools.delete(id);__studio33.v12State.recovery.tools=[...tools];__studio33.v12State.recovery.enabled=tools.size>0;__studio33.v12Save();__studio33.u22Save();__studio33.u22DraftRefresh()},"()=>{const tools=new Set(v12State.recovery.tools);if(check.checked){tools.add(id);v12State.recovery.values[id]=u25RecoveryCapture([id])[id];u22State.draftTimes[id]=new Date().toISOString()}else tools.delete(id);v12State.recovery.tools=[...tools];v12State.recovery.enabled=tools.size>0;v12Save();u22Save();u22DraftRefresh()}","")}
}],
[2744,function initialize_2744(__studio33){
__studio33.csPersist=__studio33.$fn(function(key,value){const ok=__studio33.u22OldPersist(key,value);if(ok&&key===__studio33.v12Key){const next=JSON.stringify(value.recovery.values);if(next!==__studio33.u22DraftLast){let before={};try{before=JSON.parse(__studio33.u22DraftLast)}catch{}for(const[id,v]of Object.entries(value.recovery.values))if(JSON.stringify(v)!==JSON.stringify(before[id]))__studio33.u22State.draftTimes[id]=new Date().toISOString();for(const id of Object.keys(__studio33.u22State.draftTimes))if(!value.recovery.values[id])delete __studio33.u22State.draftTimes[id];__studio33.u22DraftLast=next;__studio33.u22OldPersist(__studio33.u22Key,__studio33.u22State)}__studio33.u22DraftRefresh()}return ok},"function(key,value){const ok=u22OldPersist(key,value);if(ok&&key===v12Key){const next=JSON.stringify(value.recovery.values);if(next!==u22DraftLast){let before={};try{before=JSON.parse(u22DraftLast)}catch{}for(const[id,v]of Object.entries(value.recovery.values))if(JSON.stringify(v)!==JSON.stringify(before[id]))u22State.draftTimes[id]=new Date().toISOString();for(const id of Object.keys(u22State.draftTimes))if(!value.recovery.values[id])delete u22State.draftTimes[id];u22DraftLast=next;u22OldPersist(u22Key,u22State)}u22DraftRefresh()}return ok}","");
}],
[2745,function initialize_2745(__studio33){
__studio33.u22DraftRefresh();
}],
[2747,function initialize_2747(__studio33){
__studio33.u22Reset.append(__studio33.csText('p','Choose what to clear in this browser. Download a backup first if you need to keep saved work.'));
}],
[2750,function initialize_2750(__studio33){
__studio33.u22ResetDescription.id='u22ResetDescription';
}],
[2752,function initialize_2752(__studio33){
__studio33.u22ResetInput.id='u22ResetInput';
}],
[2753,function initialize_2753(__studio33){
__studio33.u22ResetInput.placeholder='Type RESET';
}],
[2754,function initialize_2754(__studio33){
__studio33.u22ResetInput.autocomplete='off';
}],
[2755,function initialize_2755(__studio33){
__studio33.u22ResetVerify.append(__studio33.csText('span','For all saved data, type RESET to confirm'),__studio33.u22ResetInput);
}],
[2758,function initialize_2758(__studio33){
__studio33.u22ResetError.id='u22ResetError';
}],
[2759,function initialize_2759(__studio33){
__studio33.u22Reset.append(__studio33.u22ResetDescription,__studio33.u22ResetVerify,__studio33.u22ResetError);
}],
[2764,function initialize_2764(__studio33){
__studio33.u22ResetScope.onchange=__studio33.u22ResetExplain;
}],
[2767,function initialize_2767(__studio33){
document.querySelector('.studio-menu-body').append(__studio33.u22ResetButton);
}],
[2768,function initialize_2768(__studio33){
__studio33.u22ResetExplain();
}],
[2769,function initialize_2769(__studio33){
__studio33.backupKeys.push(__studio33.u22Key);
}],
[2771,function initialize_2771(__studio33){
__studio33.backupSnapshot=__studio33.$fn(function(){const b=__studio33.u22OldBackup();b.state[__studio33.u22Key]=__studio33.csClone(__studio33.u22State);return b},"function(){const b=u22OldBackup();b.state[u22Key]=csClone(u22State);return b}","");
}],
[2773,function initialize_2773(__studio33){
__studio33.validateBackup=__studio33.$fn(function(data){const b={...data,state:{...data?.state}};if(!Object.hasOwn(b.state,__studio33.u22Key))b.state[__studio33.u22Key]=null;const result=__studio33.u22OldValidate(b);if(result.state[__studio33.u22Key])result.state[__studio33.u22Key]=__studio33.u22Check(result.state[__studio33.u22Key]);return result},"function(data){const b={...data,state:{...data?.state}};if(!Object.hasOwn(b.state,u22Key))b.state[u22Key]=null;const result=u22OldValidate(b);if(result.state[u22Key])result.state[u22Key]=u22Check(result.state[u22Key]);return result}","");
}],
[2775,function initialize_2775(__studio33){
__studio33.csRestoreSavedWork=__studio33.$fn(function(state){__studio33.u22OldRestore(state);__studio33.u22State=state[__studio33.u22Key]?__studio33.u22Check(state[__studio33.u22Key]):{version:1,panes:{},draftTimes:{}};__studio33.u22ApplyPanes();__studio33.u22DraftLast=JSON.stringify(__studio33.v12State.recovery.values);__studio33.u22DraftRefresh()},"function(state){u22OldRestore(state);u22State=state[u22Key]?u22Check(state[u22Key]):{version:1,panes:{},draftTimes:{}};u22ApplyPanes();u22DraftLast=JSON.stringify(v12State.recovery.values);u22DraftRefresh()}","");
}],
[2777,function initialize_2777(__studio33){
for(const d of [__studio33.u22Reset,__studio33.u22DraftDialog])d.addEventListener('close',__studio33.$fn(()=>{let target=__studio33.u19DialogFocus.get(d);const closed=target?.closest('details:not([open])');if(closed)target=closed.querySelector(':scope>summary');if(target&&__studio33.u19Visible(target))target.focus({preventScroll:true});__studio33.u19SyncExit()},"()=>{let target=u19DialogFocus.get(d);const closed=target?.closest('details:not([open])');if(closed)target=closed.querySelector(':scope>summary');if(target&&u19Visible(target))target.focus({preventScroll:true});u19SyncExit()}",""));
}],
[2781,function initialize_2781(__studio33){
;
}],
[2783,function initialize_2783(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Result refinements & Reset'),__studio33.csText('p','Mobile editors offer Input / Result / Both. Focus result copies data only and searches/downloads the full text. Large JSON and CSV jobs use the cancellable task bar. Eligible tools offer per-tool draft opt-in and preview before restore under Advanced & help. Options → Reset… lets you clear tool cache/memory, restore display settings, or delete all app-owned browser data; the dialog offers a backup and describes each scope.'));
}],
[2785,function initialize_2785(__studio33){
document.addEventListener('pointerdown',__studio33.$fn(e=>{if(__studio33.u22Inspection&&!__studio33.u22Inspection.target.contains(e.target)&&!__studio33.u22Inspection.button.contains(e.target))__studio33.u22StopInspect(false)},"e=>{if(u22Inspection&&!u22Inspection.target.contains(e.target)&&!u22Inspection.button.contains(e.target))u22StopInspect(false)}",""),true);
}],
[2786,function initialize_2786(__studio33){
document.addEventListener('keydown',__studio33.$fn(e=>{if(e.key==='Tab'&&__studio33.u22Inspection)__studio33.u22StopInspect(false)},"e=>{if(e.key==='Tab'&&u22Inspection)u22StopInspect(false)}",""),true);
}],
[2789,function initialize_2789(__studio33){
__studio33.views.tools='Percentages & EMI';
}],
[2790,function initialize_2790(__studio33){
__studio33.views.apiclient='API request editor';
}],
[2791,function initialize_2791(__studio33){
__studio33.views.integrationtests='Integration test payload generator';
}],
[2810,function initialize_2810(__studio33){
__studio33.u23CurlShell.id='u23CurlShell';
}],
[2811,function initialize_2811(__studio33){
__studio33.u23CurlShell.setAttribute('aria-label','Command shell');
}],
[2812,function initialize_2812(__studio33){
__studio33.u23CurlShell.append(new Option('POSIX · macOS / Linux','posix'),new Option('PowerShell · Windows','powershell'));
}],
[2814,function initialize_2814(__studio33){
__studio33.u23CurlLabel.append(__studio33.u23CurlShell);
}],
[2820,function initialize_2820(__studio33){
__studio33.u23CurlShell.onchange=__studio33.$fn(()=>{__studio33.lcInvalidateCurl();__studio33.u23State.shell=__studio33.u23CurlShell.value;__studio33.u23Save()},"()=>{lcInvalidateCurl();u23State.shell=u23CurlShell.value;u23Save()}","");
}],
[2822,function initialize_2822(__studio33){
__studio33.lcBusy=__studio33.$fn(function(busy){__studio33.u23OldBusy(busy);__studio33.u23CurlShell.disabled=busy},"function(busy){u23OldBusy(busy);u23CurlShell.disabled=busy}","");
}],
[2824,function initialize_2824(__studio33){
__studio33.u23Token.id='u23JWTToken';
}],
[2825,function initialize_2825(__studio33){
__studio33.u23Token.className='developer-editor';
}],
[2826,function initialize_2826(__studio33){
__studio33.u23Token.rows=4;
}],
[2827,function initialize_2827(__studio33){
__studio33.u23Token.spellcheck=false;
}],
[2831,function initialize_2831(__studio33){
__studio33.v13InstallEditor(__studio33.u23Token);
}],
[2832,function initialize_2832(__studio33){
__studio33.u15InstallGutter(__studio33.u23Token);
}],
[2844,function initialize_2844(__studio33){
__studio33.u23HashCopy.disabled=true;
}],
[2852,function initialize_2852(__studio33){
__studio33.u23Statistics();
}],
[2855,function initialize_2855(__studio33){
__studio33.wsApply=__studio33.$fn(function(tools){if(tools.tools){const next=Object.keys(tools.tools).some(k=>k.startsWith('loan'))?'loan':Object.keys(tools.tools).some(k=>k.startsWith('percent'))?'percent':__studio33.tool;if(next!==__studio33.tool){__studio33.tool=next;__studio33.renderTools();document.querySelectorAll('[data-tool]').forEach(__studio33.$fn(b=>b.setAttribute('aria-pressed',String(b.dataset.tool===__studio33.tool)),"b=>b.setAttribute('aria-pressed',String(b.dataset.tool===tool))",""))}}__studio33.u23OldApply(tools);if(tools.statistics)__studio33.u23Statistics()},"function(tools){if(tools.tools){const next=Object.keys(tools.tools).some(k=>k.startsWith('loan'))?'loan':Object.keys(tools.tools).some(k=>k.startsWith('percent'))?'percent':tool;if(next!==tool){tool=next;renderTools();document.querySelectorAll('[data-tool]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tool===tool)))}}u23OldApply(tools);if(tools.statistics)u23Statistics()}","");
}],
[2863,function initialize_2863(__studio33){
try{__studio33.u23State=__studio33.u23Check(__studio33.storage.get(__studio33.u23Key,{version:1,hidden:__studio33.u23Optional,shell:'posix'}))}catch{__studio33.u23State={version:1,hidden:[...__studio33.u23Optional],shell:'posix'}}
}],
[2869,function initialize_2869(__studio33){
__studio33.categoryForTool=__studio33.u23Category;
}],
[2877,function initialize_2877(__studio33){
__studio33.studioDescription=__studio33.$fn(function(id){return({jwtworkspace:'One token editor with explicit inspection and signature verification.',hashworkspace:'Hash UTF-8 text or inspect and hash original file bytes.',financeworkspace:'Compare loans, calculate percentages/EMI and solve an interest rate.',conversionworkspace:'Built-in units/currencies and saved/custom conversion factors.',statistics:'Mean, median, sum and population/sample deviation.',integrationtests:'Generate payload candidates for integration test cases.'})[id]||__studio33.u23OldDescription(id)},"function(id){return({jwtworkspace:'One token editor with explicit inspection and signature verification.',hashworkspace:'Hash UTF-8 text or inspect and hash original file bytes.',financeworkspace:'Compare loans, calculate percentages/EMI and solve an interest rate.',conversionworkspace:'Built-in units/currencies and saved/custom conversion factors.',statistics:'Mean, median, sum and population/sample deviation.',integrationtests:'Generate payload candidates for integration test cases.'})[id]||u23OldDescription(id)}","");
}],
[2880,function initialize_2880(__studio33){
__studio33.u23Manage.append(__studio33.csText('p','Choose which workspaces appear in the main categories. Unchecked workspaces remain available under Extra utilities and through Find tool. Their saved data is kept.'));
}],
[2882,function initialize_2882(__studio33){
__studio33.u23ManageSearch.id='u23ManageSearch';
}],
[2883,function initialize_2883(__studio33){
__studio33.u23ManageSearch.type='search';
}],
[2884,function initialize_2884(__studio33){
__studio33.u23ManageSearch.placeholder='Search tool workspaces';
}],
[2885,function initialize_2885(__studio33){
__studio33.u23ManageSearch.setAttribute('aria-label','Search tool workspaces');
}],
[2886,function initialize_2886(__studio33){
__studio33.u23Manage.append(__studio33.u23ManageSearch);
}],
[2889,function initialize_2889(__studio33){
__studio33.u23Manage.append(__studio33.u23ManageCount);
}],
[2891,function initialize_2891(__studio33){
__studio33.u23ManageList.id='u23ManageList';
}],
[2892,function initialize_2892(__studio33){
__studio33.u23Manage.append(__studio33.u23ManageList);
}],
[2895,function initialize_2895(__studio33){
__studio33.u23ManageSearch.oninput=__studio33.u23ManageRender;
}],
[2897,function initialize_2897(__studio33){
__studio33.u23ManageActions.append(__studio33.u19Button('Show all',__studio33.$fn(()=>{__studio33.u23ManageDraft.clear();__studio33.u23ManageRender()},"()=>{u23ManageDraft.clear();u23ManageRender()}",""),'u23ManageAll'),__studio33.u19Button('Recommended defaults',__studio33.$fn(()=>{__studio33.u23ManageDraft=new Set(__studio33.u23Optional);__studio33.u23ManageRender()},"()=>{u23ManageDraft=new Set(u23Optional);u23ManageRender()}",""),'u23ManageDefaults'),__studio33.u19Button('Apply & close',__studio33.$fn(()=>{__studio33.u23State.hidden=[...__studio33.u23ManageDraft];__studio33.u23Save();__studio33.u23MenuApply();__studio33.u23Manage.close()},"()=>{u23State.hidden=[...u23ManageDraft];u23Save();u23MenuApply();u23Manage.close()}",""),'u23ManageApply'));
}],
[2898,function initialize_2898(__studio33){
__studio33.u23Manage.append(__studio33.u23ManageActions);
}],
[2900,function initialize_2900(__studio33){
document.querySelector('.studio-menu-body').insertBefore(__studio33.u23ManageButton,__studio33.$('u22ResetButton'));
}],
[2901,function initialize_2901(__studio33){
__studio33.u23Manage.addEventListener('close',__studio33.$fn(()=>{let focus=__studio33.u19DialogFocus.get(__studio33.u23Manage);const closed=focus?.closest('details:not([open])');if(closed)focus=closed.querySelector(':scope>summary');if(focus&&__studio33.u19Visible(focus))focus.focus({preventScroll:true});__studio33.u19SyncExit()},"()=>{let focus=u19DialogFocus.get(u23Manage);const closed=focus?.closest('details:not([open])');if(closed)focus=closed.querySelector(':scope>summary');if(focus&&u19Visible(focus))focus.focus({preventScroll:true});u19SyncExit()}",""));
}],
[2902,function initialize_2902(__studio33){
__studio33.backupKeys.push(__studio33.u23Key);
}],
[2903,function initialize_2903(__studio33){
__studio33.u22SettingKeys.push(__studio33.u23Key);
}],
[2905,function initialize_2905(__studio33){
__studio33.backupSnapshot=__studio33.$fn(function(){const b=__studio33.u23OldBackup();b.state[__studio33.u23Key]=__studio33.csClone(__studio33.u23State);return b},"function(){const b=u23OldBackup();b.state[u23Key]=csClone(u23State);return b}","");
}],
[2907,function initialize_2907(__studio33){
__studio33.validateBackup=__studio33.$fn(function(data){const b={...data,state:{...data?.state}};if(!Object.hasOwn(b.state,__studio33.u23Key))b.state[__studio33.u23Key]=null;const result=__studio33.u23OldValidate(b);if(result.state[__studio33.u23Key])result.state[__studio33.u23Key]=__studio33.u23Check(result.state[__studio33.u23Key]);return result},"function(data){const b={...data,state:{...data?.state}};if(!Object.hasOwn(b.state,u23Key))b.state[u23Key]=null;const result=u23OldValidate(b);if(result.state[u23Key])result.state[u23Key]=u23Check(result.state[u23Key]);return result}","");
}],
[2909,function initialize_2909(__studio33){
__studio33.csRestoreSavedWork=__studio33.$fn(function(state){__studio33.u23OldRestore(state);__studio33.u23State=state[__studio33.u23Key]?__studio33.u23Check(state[__studio33.u23Key]):{version:1,hidden:[...__studio33.u23Optional],shell:'posix'};__studio33.u23MenuApply();__studio33.u23Statistics()},"function(state){u23OldRestore(state);u23State=state[u23Key]?u23Check(state[u23Key]):{version:1,hidden:[...u23Optional],shell:'posix'};u23MenuApply();u23Statistics()}","");
}],
[2911,function initialize_2911(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 20';
}],
[2912,function initialize_2912(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Focused workspaces & optional tools'),__studio33.csText('p','Options → Manage tools controls main-menu visibility. Unchecked tools remain under Extra utilities and in targeted search, with saved data retained. JWT uses one shared token; Hash & file inspection has text/file modes; Finance groups loan comparison, percentages/EMI and interest-rate solving; Statistics stays in Math. Converters includes saved/custom conversions. The API request editor builds POSIX or PowerShell cURL and sends only when Send is explicitly chosen. Old request-builder links open this shared editor. Integration test payload generator produces test inputs.'));
}],
[2913,function initialize_2913(__studio33){
__studio33.u23MenuApply();
}],
[2914,function initialize_2914(__studio33){
__studio33.openTab(__studio33.u23Canonical(__studio33.activeView));
}],
[2918,function initialize_2918(__studio33){
try{__studio33.u24State=__studio33.u24Check(__studio33.storage.get(__studio33.u24Key,{version:1,mode:'auto',diagnostics:false}))}catch{__studio33.u24State={version:1,mode:'auto',diagnostics:false}}
}],
[2924,function initialize_2924(__studio33){
__studio33.u24EditorVisibility.observe(document.querySelector('.main-card'),{subtree:true,attributes:true,attributeFilter:['hidden']});
}],
[2925,function initialize_2925(__studio33){
document.addEventListener('toggle',__studio33.$fn(e=>{if(e.target.tagName==='DETAILS'&&e.target.open)__studio33.u24EnsureEditors(e.target)},"e=>{if(e.target.tagName==='DETAILS'&&e.target.open)u24EnsureEditors(e.target)}",""),true);
}],
[2926,function initialize_2926(__studio33){
document.addEventListener('focusin',__studio33.$fn(e=>{if(e.target.matches('textarea[id]')&&!__studio33.v13Editors.has(e.target.id))__studio33.u24EnsureEditors(e.target.closest('.field')||e.target.parentElement,true)},"e=>{if(e.target.matches('textarea[id]')&&!v13Editors.has(e.target.id))u24EnsureEditors(e.target.closest('.field')||e.target.parentElement,true)}",""));
}],
[2934,function initialize_2934(__studio33){
__studio33.knTaskList=__studio33.$fn(function(){const tasks=__studio33.u24OldTaskList();return __studio33.u24TimelinePaging?__studio33.u24TaskWindow(tasks,'timeline'):tasks},"function(){const tasks=u24OldTaskList();return u24TimelinePaging?u24TaskWindow(tasks,'timeline'):tasks}","");
}],
[2936,function initialize_2936(__studio33){
__studio33.knTimelineRender=__studio33.$fn(function(){__studio33.u24TimelinePaging=true;try{__studio33.u24OldTimeline()}finally{__studio33.u24TimelinePaging=false}__studio33.u24TaskPager(__studio33.timeline,'timeline')},"function(){u24TimelinePaging=true;try{u24OldTimeline()}finally{u24TimelinePaging=false}u24TaskPager(timeline,'timeline')}","");
}],
[2941,function initialize_2941(__studio33){
__studio33.dwRender=__studio33.$fn(function(){if(__studio33.u24Opening){__studio33.u24DWPending=true;return}return __studio33.u24OldDWRender()},"function(){if(u24Opening){u24DWPending=true;return}return u24OldDWRender()}","");
}],
[2949,function initialize_2949(__studio33){
__studio33.u24DiffPager.id='u24DiffPager';
}],
[2953,function initialize_2953(__studio33){
__studio33.u24DiffPager.append(__studio33.u24DiffPrev,__studio33.u24DiffPageText,__studio33.u24DiffNext);
}],
[2960,function initialize_2960(__studio33){
__studio33.refreshTaskUI=__studio33.$fn(function(){__studio33.u24OldTaskUI();const e=[...__studio33.editionWorkers.values()].find(__studio33.$fn(e=>e.owner===__studio33.activeView,"e=>e.owner===activeView",""));if(e?.started)__studio33.$('studioTaskText').textContent+=' · '+((performance.now()-e.started)/1000).toFixed(1)+' s';},"function(){u24OldTaskUI();const e=[...editionWorkers.values()].find(e=>e.owner===activeView);if(e?.started)$('studioTaskText').textContent+=' · '+((performance.now()-e.started)/1000).toFixed(1)+' s';}","");
}],
[2964,function initialize_2964(__studio33){
__studio33.runStudioWorker=__studio33.$fn(function(...args){const out=__studio33.u24WorkerClock(...args);if(__studio33.editionWorkers.size)__studio33.u24TaskClock();return out},"function(...args){const out=u24WorkerClock(...args);if(editionWorkers.size)u24TaskClock();return out}","");
}],
[2974,function initialize_2974(__studio33){
__studio33.u19Motion=__studio33.$fn(function(){return __studio33.u24Effective()&&(__studio33.u24State.mode==='performance'||__studio33.u19State.motion!=='full')&&__studio33.u24OldMotion()==='full'?'reduced':__studio33.u24OldMotion()},"function(){return u24Effective()&&(u24State.mode==='performance'||u19State.motion!=='full')&&u24OldMotion()==='full'?'reduced':u24OldMotion()}","");
}],
[2977,function initialize_2977(__studio33){
__studio33.u24Performance.append(__studio33.csText('p','Choose lighter effects for a slower device. Tool calculations and exports use the same data.'));
}],
[2980,function initialize_2980(__studio33){
__studio33.u24PerformanceStatus.id='u24PerformanceStatus';
}],
[2981,function initialize_2981(__studio33){
__studio33.u24Performance.append(__studio33.u24PerformanceStatus);
}],
[2982,function initialize_2982(__studio33){
__studio33.u24PerformancePicker.onchange=__studio33.$fn(()=>{__studio33.u24State.mode=__studio33.u24PerformancePicker.value;__studio33.csPersist(__studio33.u24Key,__studio33.u24State);__studio33.u24ApplyPerformance()},"()=>{u24State.mode=u24PerformancePicker.value;csPersist(u24Key,u24State);u24ApplyPerformance()}","");
}],
[2984,function initialize_2984(__studio33){
__studio33.u24DiagnosticsCheck.type='checkbox';
}],
[2985,function initialize_2985(__studio33){
__studio33.u24DiagnosticsCheck.id='u24DiagnosticsEnabled';
}],
[2986,function initialize_2986(__studio33){
__studio33.u24DiagnosticsLabel.append(__studio33.u24DiagnosticsCheck,__studio33.csText('span','Measure tool-opening and processing time locally'));
}],
[2987,function initialize_2987(__studio33){
__studio33.u24Performance.append(__studio33.u24DiagnosticsLabel);
}],
[2989,function initialize_2989(__studio33){
__studio33.u24DiagnosticsText.id='u24Diagnostics';
}],
[2990,function initialize_2990(__studio33){
__studio33.u24Performance.append(__studio33.u24DiagnosticsText);
}],
[2993,function initialize_2993(__studio33){
__studio33.u24DiagnosticsCheck.onchange=__studio33.$fn(()=>{__studio33.u24State.diagnostics=__studio33.u24DiagnosticsCheck.checked;__studio33.u24Metrics.runs=[];__studio33.u24Metrics.opens=[];__studio33.csPersist(__studio33.u24Key,__studio33.u24State);__studio33.u24DiagnosticsRender()},"()=>{u24State.diagnostics=u24DiagnosticsCheck.checked;u24Metrics.runs=[];u24Metrics.opens=[];csPersist(u24Key,u24State);u24DiagnosticsRender()}","");
}],
[2994,function initialize_2994(__studio33){
__studio33.u24Performance.append(__studio33.u19Button('Refresh measurements',__studio33.u24DiagnosticsRender,'u24DiagnosticsRefresh'),__studio33.u19Button('Download measurements',__studio33.$fn(()=>__studio33.downloadFile('calc-studio-performance.json',JSON.stringify(__studio33.u24Diagnostics(),null,2),'application/json'),"()=>downloadFile('calc-studio-performance.json',JSON.stringify(u24Diagnostics(),null,2),'application/json')",""),'u24DiagnosticsExport'));
}],
[2995,function initialize_2995(__studio33){
document.querySelector('.studio-menu-body').insertBefore(__studio33.u19Button('Performance…',__studio33.$fn(()=>{__studio33.u24ApplyPerformance();__studio33.u24DiagnosticsRender();__studio33.u19OpenDialog(__studio33.u24Performance,__studio33.$('u24PerformanceClose'))},"()=>{u24ApplyPerformance();u24DiagnosticsRender();u19OpenDialog(u24Performance,$('u24PerformanceClose'))}",""),'u24PerformanceButton'),__studio33.$('u22ResetButton'));
}],
[2997,function initialize_2997(__studio33){
for(const e of [__studio33.u19Card,document.querySelector('.studio-header'),__studio33.$('themeGrid'),...document.querySelectorAll('section')])if(e)__studio33.u24ScreenObserver.observe(e);
}],
[2998,function initialize_2998(__studio33){
__studio33.u19LayoutPicker.addEventListener('change',__studio33.$fn(()=>requestAnimationFrame(__studio33.u24ApplyPerformance),"()=>requestAnimationFrame(u24ApplyPerformance)",""));
}]
];
