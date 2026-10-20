// Original initializer positions are part of the compatibility contract.
export const steps1=[
[1022,function initialize_1022(__studio33){
__studio33.fdTypeControls();
}],
[1031,function initialize_1031(__studio33){
__studio33.fdRender();
}],
[1055,function initialize_1055(__studio33){
__studio33.fcRender();
}],
[1073,function initialize_1073(__studio33){
;
}],
[1077,function initialize_1077(__studio33){
setInterval(__studio33.ptRender,250);
}],
[1079,function initialize_1079(__studio33){
__studio33.kbRows = [['Escape','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12'],['Backquote','Digit1','Digit2','Digit3','Digit4','Digit5','Digit6','Digit7','Digit8','Digit9','Digit0','Minus','Equal','Backspace'],['Tab','KeyQ','KeyW','KeyE','KeyR','KeyT','KeyY','KeyU','KeyI','KeyO','KeyP','BracketLeft','BracketRight','Backslash'],['CapsLock','KeyA','KeyS','KeyD','KeyF','KeyG','KeyH','KeyJ','KeyK','KeyL','Semicolon','Quote','Enter'],['ShiftLeft','KeyZ','KeyX','KeyC','KeyV','KeyB','KeyN','KeyM','Comma','Period','Slash','ShiftRight'],['ControlLeft','MetaLeft','AltLeft','Space','AltRight','MetaRight','ContextMenu','ControlRight','ArrowLeft','ArrowUp','ArrowDown','ArrowRight'],['Insert','Delete','Home','End','PageUp','PageDown','NumLock','NumpadDivide','NumpadMultiply','NumpadSubtract','NumpadAdd','NumpadEnter'],['Numpad0','Numpad1','Numpad2','Numpad3','Numpad4','Numpad5','Numpad6','Numpad7','Numpad8','Numpad9','NumpadDecimal']];

}],
[1080,function initialize_1080(__studio33){
__studio33.kbKeys = new Map();
__studio33.kbTested = new Set();

}],
[1081,function initialize_1081(__studio33){
__studio33.kbEvents = [];
__studio33.kbPresses = 0;

}],
[1084,function initialize_1084(__studio33){
document.addEventListener('keydown',__studio33.kbEvent,true);
}],
[1085,function initialize_1085(__studio33){
document.addEventListener('keyup',__studio33.kbEvent,true);
}],
[1089,function initialize_1089(__studio33){
__studio33.csImages = [];
__studio33.csTicket = 0;

}],
[1114,function initialize_1114(__studio33){
__studio33.knChecklist.className='cs-checklist full';
}],
[1115,function initialize_1115(__studio33){
__studio33.knChecklist.id='ktChecklist';
}],
[1116,function initialize_1116(__studio33){
__studio33.$('ktSubtasks').closest('label').after(__studio33.knChecklist);
}],
[1118,function initialize_1118(__studio33){
__studio33.$('ktSubtasks').oninput=__studio33.knChecklistRender;
}],
[1139,function initialize_1139(__studio33){
__studio33.knRender();
}],
[1140,function initialize_1140(__studio33){
__studio33.csExtraKeys = [__studio33.knKey,__studio33.fcKey,__studio33.fdKey,__studio33.ptKey];

}],
[1141,function initialize_1141(__studio33){
__studio33.backupKeys.push(...__studio33.csExtraKeys);
}],
[1142,function initialize_1142(__studio33){
__studio33.csOriginalValidateBackup = __studio33.validateBackup;

}],
[1143,function initialize_1143(__studio33){
__studio33.validateBackup=__studio33.$fn(function(data){const input=__studio33.csClone(data);if(input?.state)for(const key of __studio33.csExtraKeys)if(!Object.hasOwn(input.state,key))input.state[key]=null;const result=__studio33.csOriginalValidateBackup(input),s=result.state;if(s[__studio33.knKey]!==null)s[__studio33.knKey]=__studio33.knValidate(s[__studio33.knKey]);if(s[__studio33.fcKey]!==null)s[__studio33.fcKey]=__studio33.fcValidate(s[__studio33.fcKey]);if(s[__studio33.fdKey]!==null)s[__studio33.fdKey]=__studio33.fdValidate(s[__studio33.fdKey]);const timer=s[__studio33.ptKey];if(timer!==null&&(!timer||typeof timer.segments!=='string'||timer.segments.length>10000||!Number.isFinite(timer.warning)||timer.warning<0||timer.warning>600))throw Error('Invalid timer settings');return result},"function(data){const input=csClone(data);if(input?.state)for(const key of csExtraKeys)if(!Object.hasOwn(input.state,key))input.state[key]=null;const result=csOriginalValidateBackup(input),s=result.state;if(s[knKey]!==null)s[knKey]=knValidate(s[knKey]);if(s[fcKey]!==null)s[fcKey]=fcValidate(s[fcKey]);if(s[fdKey]!==null)s[fdKey]=fdValidate(s[fdKey]);const timer=s[ptKey];if(timer!==null&&(!timer||typeof timer.segments!=='string'||timer.segments.length>10000||!Number.isFinite(timer.warning)||timer.warning<0||timer.warning>600))throw Error('Invalid timer settings');return result}","");
}],
[1145,function initialize_1145(__studio33){
__studio33.csOriginalSnapshot = __studio33.backupSnapshot;

}],
[1146,function initialize_1146(__studio33){
__studio33.backupSnapshot=__studio33.$fn(function(){const r=__studio33.csOriginalSnapshot();r.state[__studio33.knKey]=__studio33.csClone(__studio33.knData);r.state[__studio33.fcKey]=__studio33.csClone(__studio33.fcData);r.state[__studio33.fdKey]=__studio33.csClone(__studio33.fdData);return r},"function(){const r=csOriginalSnapshot();r.state[knKey]=csClone(knData);r.state[fcKey]=csClone(fcData);r.state[fdKey]=csClone(fdData);return r}","");
}],
[1147,function initialize_1147(__studio33){
Object.assign(__studio33.studioDescriptions,{annotation:'Annotate images with arrows, labels, highlights and opaque redactions.',audioeditor:'Trim audio, adjust volume, apply fades and export WAV.',videoframes:'Extract timestamped PNG frames and ZIP sequences from video.',pdfform:'Fill standard PDF form fields and optionally flatten the result.',formdesigner:'Build validated questionnaires and export standalone HTML.',flashcards:'Organise decks, import CSV and practise with revision tracking.',presentationtimer:'Run speaker segments with warnings and overtime tracking.',keyboard:'Inspect physical key codes, modifiers and repeated presses.',contactsheet:'Create labelled image grids with configurable layout.',kanban:'Manage boards with dependencies, subtasks, priorities and WIP limits.'});
}],
[1154,function initialize_1154(__studio33){
try{__studio33.v12State=__studio33.v12Validate(__studio33.storage.get(__studio33.v12Key,__studio33.v12Defaults()))}catch{__studio33.v12State=__studio33.v12Defaults()}
}],
[1194,function initialize_1194(__studio33){
__studio33.rcTables = [null,null];
__studio33.rcReport = null;
__studio33.rcLimit = 100;

}],
[1244,function initialize_1244(__studio33){
__studio33.fdData.formId||=__studio33.csId('form');
}],
[1245,function initialize_1245(__studio33){
__studio33.fdData.formVersion||=1;
}],
[1261,function initialize_1261(__studio33){
__studio33.rdPage = 0;
__studio33.rdUndo = null;

}],
[1285,function initialize_1285(__studio33){
__studio33.$('ktDuration').oninput=__studio33.$fn(()=>{if(__studio33.v12Date(__studio33.$('ktStart').value)&&Number(__studio33.$('ktDuration').value)>=1&&Number(__studio33.$('ktDuration').value)<=3650)__studio33.$('ktDue').value=__studio33.v12Shift(__studio33.$('ktStart').value,Number(__studio33.$('ktDuration').value)-1)},"()=>{if(v12Date($('ktStart').value)&&Number($('ktDuration').value)>=1&&Number($('ktDuration').value)<=3650)$('ktDue').value=v12Shift($('ktStart').value,Number($('ktDuration').value)-1)}","");
}],
[1293,function initialize_1293(__studio33){
__studio33.timeline = document.createElement('div');

}],
[1295,function initialize_1295(__studio33){
__studio33.timeline.className='v12-table v12-timeline';
}],
[1296,function initialize_1296(__studio33){
__studio33.timeline.hidden=true;
}],
[1298,function initialize_1298(__studio33){
__studio33.bulk = document.createElement('div');

}],
[1299,function initialize_1299(__studio33){
__studio33.bulk.className='v12-timeline-toolbar';
}],
[1300,function initialize_1300(__studio33){
__studio33.bulk.innerHTML='<label class="field"><span>Task templates</span><select id="knTemplate"></select></label><button id="knUseTemplate" class="small">Create from template</button><label class="field"><span>Bulk priority</span><select id="knBulkPriority"><option value="">Keep priority</option><option>urgent</option><option>high</option><option>normal</option><option>low</option></select></label><label class="field"><span>Bulk column</span><select id="knBulkColumn"></select></label><button id="knBulkApply" class="small">Apply to checked tasks</button><button id="knBulkSelect" class="small">Select filtered tasks</button><button id="knBulkClear" class="small">Clear selection</button><button id="knTimelineCSV" class="small">Export timeline CSV</button>';
}],
[1334,function initialize_1334(__studio33){
__studio33.backupKeys.push(__studio33.v12Key);
}],
[1336,function initialize_1336(__studio33){
__studio33.validateBackup=__studio33.$fn(function(data){const raw={...data,state:{...data?.state}};if(!Object.hasOwn(raw.state,__studio33.v12Key))raw.state[__studio33.v12Key]=null;const result=__studio33.v12PreviousValidateBackup(raw);if(result.state[__studio33.v12Key]){__studio33.v12Validate(result.state[__studio33.v12Key]);for(const s of result.state[__studio33.v12Key].snapshots)__studio33.wsValidateTools(s.tools);__studio33.wsValidateTools(result.state[__studio33.v12Key].recovery.values)}return result},"function(data){const raw={...data,state:{...data?.state}};if(!Object.hasOwn(raw.state,v12Key))raw.state[v12Key]=null;const result=v12PreviousValidateBackup(raw);if(result.state[v12Key]){v12Validate(result.state[v12Key]);for(const s of result.state[v12Key].snapshots)wsValidateTools(s.tools);wsValidateTools(result.state[v12Key].recovery.values)}return result}","");
}],
[1338,function initialize_1338(__studio33){
__studio33.backupSnapshot=__studio33.$fn(function(){const x=__studio33.v12PreviousSnapshot();x.state[__studio33.v12Key]=__studio33.csClone(__studio33.v12State);return x},"function(){const x=v12PreviousSnapshot();x.state[v12Key]=csClone(v12State);return x}","");
}],
[1351,function initialize_1351(__studio33){
__studio33.workflowHelp = document.createElement('details');

}],
[1352,function initialize_1352(__studio33){
__studio33.workflowHelp.className='details-box';
}],
[1353,function initialize_1353(__studio33){
__studio33.workflowHelp.innerHTML='<summary>Step options and examples</summary><p class="hint">Mask: {"fields":["secret"],"replacement":"[REDACTED]"}. Map: {"rules":[{"from":"/id","to":"/recordId","required":true}]}. Query: {"path":"$.items[*]"}. Schema: {"schema":{"type":"object","required":["id"]}}. CSV conversion: {"delimiter":",","headers":true,"infer":false}. JSON → CSV: {"path":"/items","flatten":true,"protect":true}. Empty options use the defaults. A failed step stops that file; successful batch files remain downloadable.</p>';
}],
[1355,function initialize_1355(__studio33){
__studio33.initializeStudioUI();
}],
[1357,function initialize_1357(__studio33){
for(const cat of Object.values(__studio33.toolCategories)){const mapped=cat.tools.map(__studio33.$fn(id=>__studio33.v12Home[id]||id,"id=>v12Home[id]||id",""));cat.tools=[...new Set(mapped)]}
}],
[1362,function initialize_1362(__studio33){
for(const cat of Object.values(__studio33.toolCategories))cat.tools=[...new Set(cat.tools)];
}],
[1364,function initialize_1364(__studio33){
__studio33.categoryForTool=__studio33.$fn(function(id){return __studio33.v12OriginalCategory(__studio33.v12Home[id]||id)},"function(id){return v12OriginalCategory(v12Home[id]||id)}","");
}],
[1368,function initialize_1368(__studio33){
window.addEventListener('hashchange',__studio33.v12Route);
}],
[1374,function initialize_1374(__studio33){
__studio33.dwRender();
}],
[1375,function initialize_1375(__studio33){
__studio33.wfRender();
}],
[1376,function initialize_1376(__studio33){
__studio33.rdRender();
}],
[1377,function initialize_1377(__studio33){
__studio33.wsRender();
}],
[1378,function initialize_1378(__studio33){
__studio33.fdRender();
}],
[1379,function initialize_1379(__studio33){
__studio33.knRender();
}],
[1381,function initialize_1381(__studio33){
__studio33.syncToolNavigation(__studio33.activeView);
}],
[1382,function initialize_1382(__studio33){
__studio33.v12Route();
}],
[1386,function initialize_1386(__studio33){
Object.assign(__studio33.v12Suites,__studio33.v13Suites);
}],
[1387,function initialize_1387(__studio33){
for(const [home,modes]of Object.entries(__studio33.v13Suites)){
 __studio33.v12Last[home]=modes[0];const panel=__studio33.$(home),tabs=__studio33.csText('div','','v12-suite-tabs');tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label',__studio33.views[home]+' modes');
 for(const id of modes){__studio33.v12Home[id]=home;const button=__studio33.csButton(__studio33.views[id],__studio33.$fn(()=>__studio33.openTab(id),"()=>openTab(id)",""));button.dataset.mode=id;button.setAttribute('role','tab');button.setAttribute('aria-controls',id);tabs.append(button)}
 panel.querySelector('.panel-heading').after(tabs);const container=__studio33.csText('div','','v12-suite-modes');for(const id of modes){__studio33.$(id).classList.add('v12-nested-mode');container.append(__studio33.$(id))}panel.append(container);
 tabs.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;const buttons=[...tabs.querySelectorAll('button')],i=buttons.indexOf(document.activeElement);if(i<0)return;e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?buttons.length-1:(i+(e.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;buttons[next].click();buttons[next].focus()});
}
}],
[1388,function initialize_1388(__studio33){
for(const cat of Object.values(__studio33.toolCategories))cat.tools=[...new Set(cat.tools.map(__studio33.$fn(id=>__studio33.v12Home[id]||id,"id=>v12Home[id]||id","")))];
}],
[1389,function initialize_1389(__studio33){
for(const id of Object.keys(__studio33.v13Suites))for(const cat of Object.values(__studio33.toolCategories))cat.tools=cat.tools.filter(x=>x!==id);
}],
[1395,function initialize_1395(__studio33){
__studio33.v13EditorDialog.className='v13-editor-dialog';
}],
[1396,function initialize_1396(__studio33){
__studio33.v13EditorDialog.id='editorFocusDialog';
}],
[1397,function initialize_1397(__studio33){
__studio33.v13EditorDialog.setAttribute('aria-label','Expanded editor');
}],
[1399,function initialize_1399(__studio33){
__studio33.v13EditorHeader.append(__studio33.v13EditorTitle,__studio33.csButton('Close editor (Esc)',__studio33.$fn(()=>__studio33.v13EditorDialog.close(),"()=>v13EditorDialog.close()","")));
}],
[1400,function initialize_1400(__studio33){
__studio33.v13EditorDialog.append(__studio33.v13EditorHeader);
}],
[1401,function initialize_1401(__studio33){
document.body.append(__studio33.v13EditorDialog);
}],
[1404,function initialize_1404(__studio33){
__studio33.v13EditorDialog.addEventListener('close',__studio33.$fn(()=>{if(!__studio33.v13EditorDialog.open)__studio33.v13CloseEditor()},"()=>{if(!v13EditorDialog.open)v13CloseEditor()}",""));
}],
[1405,function initialize_1405(__studio33){
__studio33.v13EditorDialog.addEventListener('cancel',__studio33.$fn(()=>__studio33.v13CloseEditor(),"()=>v13CloseEditor()",""));
}],
[1408,function initialize_1408(__studio33){
for(const editor of document.querySelectorAll('section textarea[id]'))__studio33.v13InstallEditor(editor);
}],
[1422,function initialize_1422(__studio33){
__studio33.rcMappings=__studio33.$fn(function(text,a,b,required){if(!text.trimStart().startsWith('['))return __studio33.v13LegacyMappings(text,a,b,required);const pairs=__studio33.ordinaryJSON(text);if(!Array.isArray(pairs)||pairs.length>200||required&&!pairs.length||pairs.some(p=>!Array.isArray(p)||p.length!==2||!a.columns.includes(p[0])||!b.columns.includes(p[1])))throw Error('Invalid column mappings');return pairs},"function(text,a,b,required){if(!text.trimStart().startsWith('['))return v13LegacyMappings(text,a,b,required);const pairs=ordinaryJSON(text);if(!Array.isArray(pairs)||pairs.length>200||required&&!pairs.length||pairs.some(p=>!Array.isArray(p)||p.length!==2||!a.columns.includes(p[0])||!b.columns.includes(p[1])))throw Error('Invalid column mappings');return pairs}","");
}],
[1424,function initialize_1424(__studio33){
__studio33.v13Mapping.id='rcMappingEditor';
}],
[1425,function initialize_1425(__studio33){
__studio33.v13Mapping.append(__studio33.csText('h3','Map columns'),__studio33.csText('p','Load both tables to choose matching columns. Key columns identify records; compare columns supply values to check. The first-row samples below help verify each mapping.','hint'));
}],
[1427,function initialize_1427(__studio33){
__studio33.v13KeyRows.id='rcKeyRows';
}],
[1428,function initialize_1428(__studio33){
__studio33.v13ColumnRows.id='rcColumnRows';
}],
[1429,function initialize_1429(__studio33){
__studio33.v13Mapping.append(__studio33.csText('h4','Record keys'),__studio33.v13KeyRows,__studio33.csButton('Add key mapping',__studio33.$fn(()=>__studio33.v13AddMapping(true),"()=>v13AddMapping(true)","")),__studio33.csText('h4','Values to compare'),__studio33.v13ColumnRows,__studio33.csButton('Add compare mapping',__studio33.$fn(()=>__studio33.v13AddMapping(false),"()=>v13AddMapping(false)","")));
}],
[1441,function initialize_1441(__studio33){
__studio33.v13Dedupe.className='details-box v13-dedupe';
}],
[1442,function initialize_1442(__studio33){
__studio33.v13Dedupe.open=true;
}],
[1443,function initialize_1443(__studio33){
__studio33.v13Dedupe.append(__studio33.csText('summary','Duplicate keys'),__studio33.csText('p','Choose the columns that define a duplicate. Keep the first row in source order. Cell types remain significant. Deduplication reviews the whole table; cleanup uses selected rows, or all filtered rows.','hint'));
}],
[1446,function initialize_1446(__studio33){
__studio33.v13Dedupe.append(__studio33.v13DedupeColumns);
}],
[1450,function initialize_1450(__studio33){
__studio33.v13Preview.hidden=true;
}],
[1456,function initialize_1456(__studio33){
__studio33.v13DedupeColumns.addEventListener('change',__studio33.v13CancelPreview);
}],
[1465,function initialize_1465(__studio33){
__studio33.v13Calendar.className='details-box v13-calendar';
}],
[1466,function initialize_1466(__studio33){
__studio33.v13Calendar.append(__studio33.csText('summary','Working-day calendar'));
}],
[1467,function initialize_1467(__studio33){
__studio33.calendarFields = __studio33.csText('div','','fields');

}],
[1468,function initialize_1468(__studio33){
__studio33.calendarFields.innerHTML='<label class="field"><span>Default schedule for new tasks</span><select id="knScheduleDefault"><option value="calendar">Calendar days</option><option value="working">Working days</option></select></label><label class="field"><span>Holidays (YYYY-MM-DD, one per line)</span><textarea id="knHolidays" maxlength="12000" spellcheck="false"></textarea></label>';
}],
[1469,function initialize_1469(__studio33){
__studio33.v13Calendar.append(__studio33.calendarFields,__studio33.csText('p','Working-day durations skip the weekend days and holidays selected here. Changing the calendar does not move existing tasks. Use the task editor or a conflict repair to reschedule explicitly.','hint'));
}],
[1470,function initialize_1470(__studio33){
__studio33.weekendBox = __studio33.csText('div','','v12-checkbox-grid');

}],
[1472,function initialize_1472(__studio33){
for(const [day,name]of ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].entries()){const label=document.createElement('label'),input=document.createElement('input');input.type='checkbox';input.value=String(day);input.setAttribute('aria-label','Nonworking '+name);label.append(input,document.createTextNode(' '+name));__studio33.weekendBox.append(label)}
}],
[1473,function initialize_1473(__studio33){
__studio33.v13Calendar.append(__studio33.csText('p','Nonworking weekdays','hint'),__studio33.weekendBox);
}],
[1476,function initialize_1476(__studio33){
__studio33.v13Calendar.append(__studio33.calendarSave);
}],
[1488,function initialize_1488(__studio33){
__studio33.ktScheduleField = __studio33.csText('label','','field');

}],
[1489,function initialize_1489(__studio33){
__studio33.ktScheduleField.append(__studio33.csText('span','Duration calendar'));
}],
[1490,function initialize_1490(__studio33){
__studio33.ktSchedule = document.createElement('select');

}],
[1491,function initialize_1491(__studio33){
__studio33.ktSchedule.id='ktSchedule';
}],
[1493,function initialize_1493(__studio33){
__studio33.ktScheduleField.append(__studio33.ktSchedule);
}],
[1494,function initialize_1494(__studio33){
__studio33.$('ktDuration').closest('label').before(__studio33.ktScheduleField);
}],
[1495,function initialize_1495(__studio33){
__studio33.$('ktDuration').closest('label').querySelector('span').textContent='Duration (days, including start)';
}],
[1497,function initialize_1497(__studio33){
__studio33.v12TaskFields=__studio33.$fn(function(existing){const fields=__studio33.v13OldTaskFields(existing);fields.schedule=__studio33.ktSchedule.value;if(fields.schedule==='working'&&fields.start){const calendar=__studio33.v13CalendarFor(),duration=Number(__studio33.$('ktDuration').value);if(!Number.isInteger(duration)||duration<1||duration>3650)throw Error('Working-day duration must be 1–3,650 days');fields.start=__studio33.v13NextWorking(fields.start,calendar);__studio33.$('ktDue').value=__studio33.v13WorkingShift(fields.start,duration-1,calendar)}return fields},"function(existing){const fields=v13OldTaskFields(existing);fields.schedule=ktSchedule.value;if(fields.schedule==='working'&&fields.start){const calendar=v13CalendarFor(),duration=Number($('ktDuration').value);if(!Number.isInteger(duration)||duration<1||duration>3650)throw Error('Working-day duration must be 1–3,650 days');fields.start=v13NextWorking(fields.start,calendar);$('ktDue').value=v13WorkingShift(fields.start,duration-1,calendar)}return fields}","");
}],
[1501,function initialize_1501(__studio33){
__studio33.$('ktDuration').oninput=__studio33.v13DurationToDue;
}],
[1502,function initialize_1502(__studio33){
__studio33.ktSchedule.onchange=__studio33.v13DurationToDue;
}],
[1503,function initialize_1503(__studio33){
__studio33.$('ktStart').addEventListener('change',__studio33.v13DurationToDue);
}],
[1510,function initialize_1510(__studio33){
__studio33.v13Zoom.innerHTML='<label class="field"><span>Timeline zoom</span><select id="knTimelineZoom"><option value="day">Day · 90 days</option><option value="week" selected>Week · 1 year</option><option value="month">Month · 3 years</option></select></label><label class="field"><span>Window starts</span><input id="knTimelineStart" type="date"></label><button id="knTimelineBack" class="small">Earlier</button><button id="knTimelineToday" class="small">Today</button><button id="knTimelineFirst" class="small">First task</button><button id="knTimelineForward" class="small">Later</button>';
}],
[1530,function initialize_1530(__studio33){
__studio33.dwRender();
}],
[1531,function initialize_1531(__studio33){
__studio33.knRender();
}],
[1532,function initialize_1532(__studio33){
__studio33.syncToolNavigation(__studio33.activeView);
}],
[1533,function initialize_1533(__studio33){
__studio33.openTab(__studio33.activeView);
}],
[1534,function initialize_1534(__studio33){
__studio33.v12Route();
}],
[1594,function initialize_1594(__studio33){
__studio33.lcBuilderButton.id='apiOpenClient';
}],
[1597,function initialize_1597(__studio33){
__studio33.lcCompositeButton.id='compOpenClient';
}],
[1604,function initialize_1604(__studio33){
__studio33.lcModeButton.setAttribute('role','tab');
}],
[1609,function initialize_1609(__studio33){
__studio33.backupKeys.push(__studio33.lcKey);
}],
[1618,function initialize_1618(__studio33){
__studio33.lcLibraryRender();
}],
[1619,function initialize_1619(__studio33){
__studio33.lcAuthRender();
}],
[1620,function initialize_1620(__studio33){
__studio33.lcResponseRender();
}],
[1622,function initialize_1622(__studio33){
__studio33.syncToolNavigation(__studio33.activeView);
}],
[1623,function initialize_1623(__studio33){
__studio33.openTab(__studio33.activeView);
}],
[1624,function initialize_1624(__studio33){
__studio33.v12Route();
}],
[1628,function initialize_1628(__studio33){
__studio33.conversionButtons();
}],
[1629,function initialize_1629(__studio33){
__studio33.renderHistory();
}],
[1630,function initialize_1630(__studio33){
__studio33.renderTools();
}],
[1631,function initialize_1631(__studio33){
__studio33.preview();
}],
[1632,function initialize_1632(__studio33){
__studio33.restoredDrafts = __studio33.storage.get('calc-studio-drafts',null);

}],
[1636,function initialize_1636(__studio33){
__studio33.u15Style.textContent=`
.u15-box{margin:14px 0;padding:14px;border:1px solid var(--line);border-radius:12px;background:var(--surface)}.u15-box>summary{cursor:pointer;font-weight:650}.u15-box h3{margin:0 0 10px}.u15-box .fields{margin:10px 0}.u15-status{white-space:pre-wrap;overflow-wrap:anywhere;font-size:12px;margin:8px 0}.u15-row{display:flex;gap:7px;align-items:center;margin:7px 0;flex-wrap:wrap}.u15-row input:not([type=checkbox]),.u15-row select{flex:1;min-width:100px}.u15-table{border-collapse:collapse;width:100%;font-size:12px}.u15-table th,.u15-table td{border:1px solid var(--line);padding:7px;text-align:left;vertical-align:top;overflow-wrap:anywhere}.u15-table pre{max-width:500px;white-space:pre-wrap}.u15-numbered{display:flex;gap:0;min-width:0;width:100%;align-items:stretch}.u15-numbered textarea{flex:1;min-width:0;margin:0!important;border-radius:0 8px 8px 0!important}.u15-gutter{flex:0 0 45px;background:var(--surface);border:1px solid var(--line);border-right:0;border-radius:8px 0 0 8px;overflow:hidden;user-select:none;color:var(--muted);padding:10px 5px;text-align:right;max-height:600px;font:12px/1.6 ui-monospace,Consolas,monospace;white-space:pre}.u15-error-line{background:#d76b6633;color:var(--text);display:block}.u15-box input[aria-invalid=true],textarea[aria-invalid=true]{outline:2px solid #d76b66}.u15-meter{height:10px;accent-color:var(--accent);width:100%}.u15-chart{width:100%;height:auto;min-height:140px}.u15-highlight-old{background:#d76b6633;text-decoration:none}.u15-highlight-new{background:#31a36b33;text-decoration:none}.u15-muted{color:var(--muted)}.u15-primary{background:var(--accent)!important;color:var(--on-accent,#fff)!important;border-color:var(--accent)!important}.u15-stale{border-left:3px solid #d69b36;padding-left:8px}.u15-json-row{display:grid;grid-template-columns:minmax(160px,1fr) 110px minmax(170px,2fr) auto;gap:7px;padding:7px 0;align-items:center}.u15-json-row input{min-width:0;width:100%}.u15-json-row code{overflow-wrap:anywhere}.u15-help{max-width:100%;overflow-wrap:anywhere}.u15-status[data-error=true]{color:#b34343}@media(max-width:700px){.u15-json-row{grid-template-columns:1fr}.u15-row{align-items:stretch}.u15-gutter{flex-basis:35px}.u15-box{padding:10px}.u15-table pre{max-width:240px}.u15-box .table-scroll{max-width:100%;overflow:auto}}
`;
}],
[1637,function initialize_1637(__studio33){
document.head.append(__studio33.u15Style);
}],
[1652,function initialize_1652(__studio33){
__studio33.u15Field(__studio33.u15Curl,'u15CurlInput','Paste a literal cURL command','','textarea');
}],
[1665,function initialize_1665(__studio33){
__studio33.u15PrivacyOutput.readOnly=true;
}],
[1670,function initialize_1670(__studio33){
__studio33.u15Field(__studio33.u15Checks,'u15Assertions','Checks: JSON array','[{"type":"status","equals":200},{"type":"path","path":"/id","exists":true}]','textarea');
}],
[1671,function initialize_1671(__studio33){
__studio33.u15Field(__studio33.u15Checks,'u15Extract','Extract rules: name → JSON Pointer','[{"name":"record_id","path":"/id"}]','textarea');
}],
[1673,function initialize_1673(__studio33){
__studio33.u15Checks.append(__studio33.u15CheckResults);
}],
[1680,function initialize_1680(__studio33){
__studio33.$('u15Extract').addEventListener('input',__studio33.$fn(()=>{__studio33.u15Extracted=[];__studio33.u15ChecksStatus.textContent='Extraction rules changed. Preview again before applying.'},"()=>{u15Extracted=[];u15ChecksStatus.textContent='Extraction rules changed. Preview again before applying.'}",""));
}],
[1685,function initialize_1685(__studio33){
__studio33.u15Field(__studio33.u15Tree,'u15TreeFilter','Filter JSON Pointer paths','');
}],
[1687,function initialize_1687(__studio33){
__studio33.u15Tree.append(__studio33.u15TreeRows);
}],
[1694,function initialize_1694(__studio33){
__studio33.$('u15TreeFilter').oninput=__studio33.$fn(()=>{__studio33.u15TreePage=0;try{__studio33.u15RenderTree()}catch{}},"()=>{u15TreePage=0;try{u15RenderTree()}catch{}}","");
}],
[1700,function initialize_1700(__studio33){
__studio33.u15Map.append(__studio33.u15MapRows);
}],
[1707,function initialize_1707(__studio33){
__studio33.u15MapPreview.id='u15MapPreview';
}],
[1708,function initialize_1708(__studio33){
__studio33.u15Map.append(__studio33.u15MapPreview);
}],
[1713,function initialize_1713(__studio33){
__studio33.u15Field(__studio33.u15DiffFields,'u15ArrayPath','Array JSON Pointer (blank = root)','');
}],
[1714,function initialize_1714(__studio33){
__studio33.u15Field(__studio33.u15DiffFields,'u15ArrayKey','Record key, e.g. id (blank = compare by index)','');
}],
[1715,function initialize_1715(__studio33){
__studio33.u15Field(__studio33.u15Diff,'u15IgnorePaths','Ignored JSON Pointers, one per line; * matches one segment','','textarea');
}],
[1716,function initialize_1716(__studio33){
__studio33.u15Diff.append(__studio33.csText('p','Example: array /records, key id, ignored /records/*/updatedAt. Duplicate, missing or blank record keys are reported as errors. Matching retains source indexes in the report.','hint'));
}],
[1717,function initialize_1717(__studio33){
__studio33.u15Status(__studio33.u15Diff,'u15DiffStatus');
}],
[1720,function initialize_1720(__studio33){
__studio33.compareDeveloperJSON=__studio33.$fn(function(a,b,n=false){const config={key:__studio33.$('u15ArrayKey').value.trim(),arrayPath:__studio33.$('u15ArrayPath').value.trim(),ignore:__studio33.$('u15IgnorePaths').value};return config.key||config.ignore.trim()?__studio33.u15CompareJSON(a,b,n,config):__studio33.u15BaseCompare(a,b,n)},"function(a,b,n=false){const config={key:$('u15ArrayKey').value.trim(),arrayPath:$('u15ArrayPath').value.trim(),ignore:$('u15IgnorePaths').value};return config.key||config.ignore.trim()?u15CompareJSON(a,b,n,config):u15BaseCompare(a,b,n)}","");
}],
[1722,function initialize_1722(__studio33){
__studio33.jsonDiffReport=__studio33.$fn(function(result){const report=JSON.parse(__studio33.u15OldDiffReport(result));if(result.rules){report.comparison=result.rules.key?'JSON values; selected array matched by record key':'JSON values; arrays by index';report.rules=result.rules;report.indexPairs=result.indexPairs;report.differences=result.changes.map(__studio33.$fn(r=>({type:r.type,path:r.path,recordKey:r.recordKey,beforeIndex:r.beforeIndex,afterIndex:r.afterIndex,...(r.before?{beforeJSON:__studio33.emitDeveloperJSON(r.before)}:{}),...(r.after?{afterJSON:__studio33.emitDeveloperJSON(r.after)}:{})}),"r=>({type:r.type,path:r.path,recordKey:r.recordKey,beforeIndex:r.beforeIndex,afterIndex:r.afterIndex,...(r.before?{beforeJSON:emitDeveloperJSON(r.before)}:{}),...(r.after?{afterJSON:emitDeveloperJSON(r.after)}:{})})",""))}return JSON.stringify(report,null,2)},"function(result){const report=JSON.parse(u15OldDiffReport(result));if(result.rules){report.comparison=result.rules.key?'JSON values; selected array matched by record key':'JSON values; arrays by index';report.rules=result.rules;report.indexPairs=result.indexPairs;report.differences=result.changes.map(r=>({type:r.type,path:r.path,recordKey:r.recordKey,beforeIndex:r.beforeIndex,afterIndex:r.afterIndex,...(r.before?{beforeJSON:emitDeveloperJSON(r.before)}:{}),...(r.after?{afterJSON:emitDeveloperJSON(r.after)}:{})}))}return JSON.stringify(report,null,2)}","");
}],
[1731,function initialize_1731(__studio33){
__studio33.u15Profile.id='u15Profile';
}],
[1732,function initialize_1732(__studio33){
__studio33.u15Data.append(__studio33.u15Profile);
}],
[1735,function initialize_1735(__studio33){
__studio33.u15Field(__studio33.u15TypeFields,'u15DataType','Explicit target type','string','text',[['string','Text'],['number','JSON number'],['boolean','Boolean true/false'],['date','Date YYYY-MM-DD']]);
}],
[1737,function initialize_1737(__studio33){
__studio33.u15Field(__studio33.u15Data,'u15SortRules','Sort rules: priority order JSON array','[]','textarea');
}],
[1738,function initialize_1738(__studio33){
__studio33.u15Field(__studio33.u15Data,'u15FilterRules','Filter rules: all must match (JSON array)','[]','textarea');
}],
[1739,function initialize_1739(__studio33){
__studio33.u15Data.append(__studio33.csText('p','Sort: [{"column":"amount","direction":"desc"}]. Filter: [{"column":"status","op":"eq","value":"Approved"}]. Operators: eq, ne, contains, gt, gte, lt, lte, blank, notBlank. Numeric operators use exact decimal comparisons.','hint'));
}],
[1745,function initialize_1745(__studio33){
__studio33.u15Field(__studio33.u15Data,'u15ValidationRules','Validation rules: JSON array','[]','textarea');
}],
[1746,function initialize_1746(__studio33){
__studio33.u15Data.append(__studio33.csText('p','Example: [{"column":"id","required":true,"unique":true},{"column":"amount","type":"number","min":"0"},{"column":"status","enum":["New","Approved"]}]. Dates use type date.','hint'));
}],
[1748,function initialize_1748(__studio33){
__studio33.u15ValidationHost.id='u15ValidationHost';
}],
[1749,function initialize_1749(__studio33){
__studio33.u15Data.append(__studio33.u15ValidationHost);
}],
[1753,function initialize_1753(__studio33){
__studio33.u15Button(__studio33.u15Data,'u15ValidationDownload','Download quality report',__studio33.$fn(()=>{if(!__studio33.u15ValidationReport)throw Error('Validate the table first');__studio33.downloadFile('data-quality-report.json',JSON.stringify(__studio33.u15ValidationReport,null,2),'application/json')},"()=>{if(!u15ValidationReport)throw Error('Validate the table first');downloadFile('data-quality-report.json',JSON.stringify(u15ValidationReport,null,2),'application/json')}",""));
}],
[1759,function initialize_1759(__studio33){
__studio33.dwCommit=__studio33.$fn(function(...args){__studio33.u15ValidationReport=null;__studio33.u15ValidationHost.replaceChildren();__studio33.u15Profile.replaceChildren();return __studio33.u15OldCommit(...args)},"function(...args){u15ValidationReport=null;u15ValidationHost.replaceChildren();u15Profile.replaceChildren();return u15OldCommit(...args)}","");
}],
[1761,function initialize_1761(__studio33){
__studio33.u15Field(__studio33.u15Rc,'u15RcRules','Rules keyed by reference column','{}','textarea');
}],
[1762,function initialize_1762(__studio33){
__studio33.u15Rc.append(__studio33.csText('p','Example: {"amount":{"tolerance":"0.50","mode":"decimal"},"status":{"blank":"equivalent"}}. Modes: text or decimal. Blank handling: exact (distinguish null/missing/empty), equivalent, ignore (skip if either blank). Global trimming/case settings still apply.','hint'));
}],
[1764,function initialize_1764(__studio33){
__studio33.u15Rc.append(__studio33.u15RcDetail);
}],
[1765,function initialize_1765(__studio33){
__studio33.u15Status(__studio33.u15Rc,'u15RcStatus');
}],
[1770,function initialize_1770(__studio33){
__studio33.rcRender=__studio33.$fn(function(){__studio33.u15OldRcRender();__studio33.u15RcDetail.replaceChildren();for(const r of (__studio33.rcReport?.results||[]).filter(x=>x.kind==='duplicate').slice(0,100)){const box=__studio33.u15Box('u15Dup-'+__studio33.u15RcDetail.children.length,'Duplicate group '+r.key,__studio33.u15RcDetail);const content=__studio33.csText('div','');box.append(content);__studio33.u15Table(content,['Side','Source row','Record'],[...(r.referenceRecords||[]).map(__studio33.$fn(x=>['Reference',x.row,__studio33.csText('pre',JSON.stringify(x.values,null,2))],"x=>['Reference',x.row,csText('pre',JSON.stringify(x.values,null,2))]","")),...(r.currentRecords||[]).map(__studio33.$fn(x=>['Current',x.row,__studio33.csText('pre',JSON.stringify(x.values,null,2))],"x=>['Current',x.row,csText('pre',JSON.stringify(x.values,null,2))]",""))]);}__studio33.u15RcSignatureRefresh()},"function(){u15OldRcRender();u15RcDetail.replaceChildren();for(const r of (rcReport?.results||[]).filter(x=>x.kind==='duplicate').slice(0,100)){const box=u15Box('u15Dup-'+u15RcDetail.children.length,'Duplicate group '+r.key,u15RcDetail);const content=csText('div','');box.append(content);u15Table(content,['Side','Source row','Record'],[...(r.referenceRecords||[]).map(x=>['Reference',x.row,csText('pre',JSON.stringify(x.values,null,2))]),...(r.currentRecords||[]).map(x=>['Current',x.row,csText('pre',JSON.stringify(x.values,null,2))])]);}u15RcSignatureRefresh()}","");
}],
[1780,function initialize_1780(__studio33){
__studio33.u15Field(__studio33.u15WorkflowFields,'u15WhenPath','Condition JSON Pointer (blank = always)','');
}],
[1781,function initialize_1781(__studio33){
__studio33.u15Field(__studio33.u15WorkflowFields,'u15WhenMode','Condition test','exists','text',[['exists','Path exists'],['missing','Path missing'],['equals','Equals JSON value']]);
}],
[1782,function initialize_1782(__studio33){
__studio33.u15Field(__studio33.u15WorkflowFields,'u15WhenValue','Expected JSON value','true');
}],
[1783,function initialize_1783(__studio33){
__studio33.u15Field(__studio33.u15WorkflowFields,'u15OnError','If this step fails','stop','text',[['stop','Stop this file'],['continue','Keep previous input and continue']]);
}],
[1784,function initialize_1784(__studio33){
__studio33.u15Workflow.append(__studio33.csText('p','Conditions examine the input at this step. Continue records the failure and passes the unchanged input to the next step. Conditions do not execute code.','hint'));
}],
[1787,function initialize_1787(__studio33){
__studio33.u15CancelStep.id='u15CancelStep';
}],
[1788,function initialize_1788(__studio33){
__studio33.u15CancelStep.hidden=true;
}],
[1792,function initialize_1792(__studio33){
__studio33.wfValidate=__studio33.$fn(function(w){const valid=__studio33.u15OldWfValidate(w);for(const s of valid.steps){const o=s.options;if(o.$onError!==undefined&&!['stop','continue'].includes(o.$onError))throw Error('Step $onError must be stop or continue');if(o.$when){if(typeof o.$when!=='object'||typeof o.$when.path!=='string'||!['exists','missing','equals'].includes(o.$when.test))throw Error('Condition needs path and exists/missing/equals test');__studio33.u15PointerParts(o.$when.path);if(o.$when.test==='equals'&&!Object.hasOwn(o.$when,'value'))throw Error('Equals condition needs value')}}return valid},"function(w){const valid=u15OldWfValidate(w);for(const s of valid.steps){const o=s.options;if(o.$onError!==undefined&&!['stop','continue'].includes(o.$onError))throw Error('Step $onError must be stop or continue');if(o.$when){if(typeof o.$when!=='object'||typeof o.$when.path!=='string'||!['exists','missing','equals'].includes(o.$when.test))throw Error('Condition needs path and exists/missing/equals test');u15PointerParts(o.$when.path);if(o.$when.test==='equals'&&!Object.hasOwn(o.$when,'value'))throw Error('Equals condition needs value')}}return valid}","");
}],
[1797,function initialize_1797(__studio33){
__studio33.u15Field(__studio33.u15PresetFields,'u15WorkflowPreset','Reusable starter workflow','mask','text',[['mask','Mask sensitive fields → format JSON'],['csv','CSV → JSON → validate → format'],['query','Extract records → convert to CSV']]);
}],
[1807,function initialize_1807(__studio33){
for(const [id,label,value]of [['u15LoanPrincipal','Principal','500000'],['u15LoanRate','Annual interest (%)','9'],['u15LoanMonths','Tenure (months)','60'],['u15LoanFee','Upfront fees (not financed)','0'],['u15LoanExtra','Extra principal every month','0'],['u15LoanLump','One-time principal payment','0'],['u15LoanLumpMonth','One-time payment month','12'],['u15LoanNewRate','New annual interest (%)','9'],['u15LoanRateMonth','Rate change month (0 = none)','0']])__studio33.u15Field(__studio33.u15LoanFields,id,label,value,'number');
}],
[1808,function initialize_1808(__studio33){
__studio33.u15Field(__studio33.u15LoanFields,'u15LoanRatePolicy','At rate change','recast','text',[['recast','Recalculate payment over remaining term'],['keep','Keep regular payment; require repayment within term']]);
}],
[1810,function initialize_1810(__studio33){
__studio33.u15LoanResults.id='u15LoanResults';
}],
[1811,function initialize_1811(__studio33){
__studio33.u15Loan.append(__studio33.u15LoanResults);
}],
[1814,function initialize_1814(__studio33){
__studio33.u15Button(__studio33.u15Loan,'u15LoanUseA','Use current Loan A inputs',__studio33.$fn(()=>{if(!__studio33.$('financeAp'))throw Error('Choose Compare loans in Finance first');for(const[a,b]of [['u15LoanPrincipal','financeAp'],['u15LoanRate','financeAr'],['u15LoanMonths','financeAn']])__studio33.$(a).value=String(__studio33.numeric(b));__studio33.$('u15LoanNewRate').value=__studio33.$('u15LoanRate').value;__studio33.u15LoanStatus.textContent='Loan A values copied. Review scenario amounts.'},"()=>{if(!$('financeAp'))throw Error('Choose Compare loans in Finance first');for(const[a,b]of [['u15LoanPrincipal','financeAp'],['u15LoanRate','financeAr'],['u15LoanMonths','financeAn']])$(a).value=String(numeric(b));$('u15LoanNewRate').value=$('u15LoanRate').value;u15LoanStatus.textContent='Loan A values copied. Review scenario amounts.'}",""));
}],
[1815,function initialize_1815(__studio33){
__studio33.u15Button(__studio33.u15Loan,'u15LoanCalculate','Compare repayment scenario',__studio33.$fn(()=>{const read=__studio33.$fn(id=>{if(!__studio33.$(id).value.trim())throw Error('Complete '+__studio33.$(id).closest('label').innerText);return Number(__studio33.$(id).value)},"id=>{if(!$(id).value.trim())throw Error('Complete '+$(id).closest('label').innerText);return Number($(id).value)}","read"),c={principal:read('u15LoanPrincipal'),rate:read('u15LoanRate'),months:read('u15LoanMonths'),fee:read('u15LoanFee'),extra:read('u15LoanExtra'),lump:read('u15LoanLump'),lumpMonth:read('u15LoanLumpMonth'),newRate:read('u15LoanNewRate'),rateMonth:read('u15LoanRateMonth'),policy:__studio33.$('u15LoanRatePolicy').value},scenario=__studio33.u15LoanScenario(c),baseline=__studio33.u15LoanScenario({...c,extra:0,lump:0,rateMonth:0});__studio33.u15LoanReport={baseline,scenario};__studio33.u15Table(__studio33.u15LoanResults,['Metric','Baseline','Scenario'],[['Months to repay',baseline.months,scenario.months],['Interest',baseline.interest.toFixed(2),scenario.interest.toFixed(2)],['Upfront fees',baseline.fees.toFixed(2),scenario.fees.toFixed(2)],['Total including fees',baseline.totalCost.toFixed(2),scenario.totalCost.toFixed(2)],['Interest saving','—',(baseline.interest-scenario.interest).toFixed(2)]]);const schedule=__studio33.csText('div','');__studio33.u15LoanResults.append(schedule);__studio33.u15Table(schedule,['Month','Rate %','Payment','Extra principal','Interest','Principal','Balance'],scenario.rows.slice(0,120).map(r=>[r.month,r.annualRate,r.payment.toFixed(2),r.extra.toFixed(2),r.interest.toFixed(2),r.principal.toFixed(2),r.balance.toFixed(2)]));__studio33.u15LoanStatus.textContent=scenario.notice+' First 120 schedule rows shown; CSV contains every month.'},"()=>{const read=id=>{if(!$(id).value.trim())throw Error('Complete '+$(id).closest('label').innerText);return Number($(id).value)},c={principal:read('u15LoanPrincipal'),rate:read('u15LoanRate'),months:read('u15LoanMonths'),fee:read('u15LoanFee'),extra:read('u15LoanExtra'),lump:read('u15LoanLump'),lumpMonth:read('u15LoanLumpMonth'),newRate:read('u15LoanNewRate'),rateMonth:read('u15LoanRateMonth'),policy:$('u15LoanRatePolicy').value},scenario=u15LoanScenario(c),baseline=u15LoanScenario({...c,extra:0,lump:0,rateMonth:0});u15LoanReport={baseline,scenario};u15Table(u15LoanResults,['Metric','Baseline','Scenario'],[['Months to repay',baseline.months,scenario.months],['Interest',baseline.interest.toFixed(2),scenario.interest.toFixed(2)],['Upfront fees',baseline.fees.toFixed(2),scenario.fees.toFixed(2)],['Total including fees',baseline.totalCost.toFixed(2),scenario.totalCost.toFixed(2)],['Interest saving','—',(baseline.interest-scenario.interest).toFixed(2)]]);const schedule=csText('div','');u15LoanResults.append(schedule);u15Table(schedule,['Month','Rate %','Payment','Extra principal','Interest','Principal','Balance'],scenario.rows.slice(0,120).map(r=>[r.month,r.annualRate,r.payment.toFixed(2),r.extra.toFixed(2),r.interest.toFixed(2),r.principal.toFixed(2),r.balance.toFixed(2)]));u15LoanStatus.textContent=scenario.notice+' First 120 schedule rows shown; CSV contains every month.'}",""));
}],
[1818,function initialize_1818(__studio33){
for(const e of __studio33.u15LoanFields.querySelectorAll('input,select'))e.addEventListener('input',__studio33.$fn(()=>{__studio33.u15LoanReport=null;__studio33.u15LoanResults.classList.add('u15-stale');__studio33.u15LoanStatus.textContent='Inputs changed. Recalculate the scenario.'},"()=>{u15LoanReport=null;u15LoanResults.classList.add('u15-stale');u15LoanStatus.textContent='Inputs changed. Recalculate the scenario.'}",""));
}],
[1821,function initialize_1821(__studio33){
__studio33.u15Field(__studio33.u15GraphFields,'u15InspectX','Inspect x coordinate','0','number');
}],
[1823,function initialize_1823(__studio33){
__studio33.u15PointHost.id='u15PointHost';
}],
[1824,function initialize_1824(__studio33){
__studio33.u15Graph.append(__studio33.u15PointHost);
}],
[1830,function initialize_1830(__studio33){
__studio33.u15RootHost.id='u15RootHost';
}],
[1831,function initialize_1831(__studio33){
__studio33.u15Graph.append(__studio33.u15RootHost);
}],
[1837,function initialize_1837(__studio33){
__studio33.u15Field(__studio33.u15CalcFields,'u15RootA','Lower x','-10','number');
}],
[1838,function initialize_1838(__studio33){
__studio33.u15Field(__studio33.u15CalcFields,'u15RootB','Upper x','10','number');
}],
[1840,function initialize_1840(__studio33){
__studio33.u15Calculus.append(__studio33.u15CalcRootHost);
}],
[1847,function initialize_1847(__studio33){
__studio33.u15Field(__studio33.u15LogFields,'u15LogTransaction','Timeline transaction','','text',[]);
}],
[1849,function initialize_1849(__studio33){
__studio33.u15LogPairs.id='u15LogPairs';
}],
[1850,function initialize_1850(__studio33){
__studio33.u15LogLimits.id='u15LogLimits';
}],
[1851,function initialize_1851(__studio33){
__studio33.u15LogTimeline.id='u15LogTimeline';
}],
[1852,function initialize_1852(__studio33){
__studio33.u15Logs.append(__studio33.u15LogTimeline,__studio33.u15LogLimits,__studio33.u15LogPairs);
}],
[1855,function initialize_1855(__studio33){
__studio33.$('u15LogTransaction').onchange=__studio33.u15LogVisuals;
}],
[1863,function initialize_1863(__studio33){
__studio33.u15CompositeHost.id='u15CompositeHost';
}],
[1864,function initialize_1864(__studio33){
__studio33.u15Composite.append(__studio33.u15CompositeHost);
}],
[1869,function initialize_1869(__studio33){
__studio33.u15Kanban.append(__studio33.u15KanbanStats);
}],
[1871,function initialize_1871(__studio33){
__studio33.u15KanbanPreview.id='u15KanbanPreview';
}],
[1872,function initialize_1872(__studio33){
__studio33.u15Kanban.append(__studio33.u15KanbanPreview);
}],
[1880,function initialize_1880(__studio33){
__studio33.u15Button(__studio33.u15Kanban,'u15CancelSchedule','Cancel schedule preview',__studio33.$fn(()=>{__studio33.u15PendingSchedule=null;__studio33.u15KanbanPreview.replaceChildren();__studio33.u15KanbanStatus.textContent='Preview cleared.'},"()=>{u15PendingSchedule=null;u15KanbanPreview.replaceChildren();u15KanbanStatus.textContent='Preview cleared.'}",""));
}],
[1884,function initialize_1884(__studio33){
__studio33.u15Forms.append(__studio33.u15ImportHost);
}],
[1887,function initialize_1887(__studio33){
__studio33.fdValidate=__studio33.$fn(function(data){const valid=__studio33.u15OldFDValidate(data);for(const f of valid.fields){if(['text','textarea','email'].includes(f.type)&&[f.min,f.max].some(v=>v!==null&&(!Number.isInteger(v)||v<0)))throw Error('Text lengths must be nonnegative integers');if(['select','radio'].includes(f.type)&&!f.choices.length)throw Error('Choice fields need at least one option')}return valid},"function(data){const valid=u15OldFDValidate(data);for(const f of valid.fields){if(['text','textarea','email'].includes(f.type)&&[f.min,f.max].some(v=>v!==null&&(!Number.isInteger(v)||v<0)))throw Error('Text lengths must be nonnegative integers');if(['select','radio'].includes(f.type)&&!f.choices.length)throw Error('Choice fields need at least one option')}return valid}","");
}],
[1892,function initialize_1892(__studio33){
__studio33.u15Forms.append(__studio33.u15ConditionHost);
}],
[1901,function initialize_1901(__studio33){
__studio33.u15QualityHost.id='u15QualityHost';
}],
[1902,function initialize_1902(__studio33){
__studio33.u15Quality.append(__studio33.u15QualityHost);
}],
[1911,function initialize_1911(__studio33){
for(const editor of document.querySelectorAll('section textarea[id]')){if(editor.id.startsWith('u15')){editor.classList.add('developer-editor');editor.rows=5;editor.spellcheck=false;__studio33.v13InstallEditor(editor)}__studio33.u15InstallGutter(editor)}
}],
[1914,function initialize_1914(__studio33){
__studio33.v13CloseEditor=__studio33.$fn(function(){__studio33.u15OldCloseEditor();__studio33.u15ReattachGutters()},"function(){u15OldCloseEditor();u15ReattachGutters()}","");
}],
[1915,function initialize_1915(__studio33){
__studio33.v13EditorDialog.addEventListener('close',__studio33.u15ReattachGutters);
}],
[1916,function initialize_1916(__studio33){
__studio33.v13EditorHeader.querySelector('button').onclick=__studio33.$fn(()=>__studio33.v13CloseEditor(),"()=>v13CloseEditor()","");
}],
[1919,function initialize_1919(__studio33){
__studio33.newToolStatus=__studio33.$fn(function(id,message,error=false){__studio33.u15OldStatus(id,message,error);__studio33.u15MarkError(__studio33.$(id),message,error)},"function(id,message,error=false){u15OldStatus(id,message,error);u15MarkError($(id),message,error)}","");
}],
[1922,function initialize_1922(__studio33){
for(const status of document.querySelectorAll('.developer-status,.u15-status'))new MutationObserver(__studio33.$fn(()=>__studio33.u15MarkError(status,status.textContent,status.dataset.error==='true'),"()=>u15MarkError(status,status.textContent,status.dataset.error==='true')","")).observe(status,{childList:true,characterData:true,subtree:true,attributes:true,attributeFilter:['data-error']});
}],
[1924,function initialize_1924(__studio33){
for(const id of ['u15LoanPrincipal','u15LoanRate','u15LoanMonths','u15LoanFee','u15LoanExtra','u15LoanLump','u15LoanLumpMonth','u15LoanNewRate','u15LoanRateMonth','u15LoanRatePolicy'])__studio33.$(id).addEventListener('input',__studio33.$fn(()=>{__studio33.u15LoanReport=null;__studio33.u15LoanStatus.textContent='Inputs changed. Recalculate the scenario.';__studio33.u15LoanResults.classList.add('u15-stale')},"()=>{u15LoanReport=null;u15LoanStatus.textContent='Inputs changed. Recalculate the scenario.';u15LoanResults.classList.add('u15-stale')}",""));
}],
[1926,function initialize_1926(__studio33){
__studio33.$('u15LoanCalculate').onclick=__studio33.$fn(async function(...args){await __studio33.u15LoanCalculateAction.apply(this,args);if(__studio33.u15LoanReport)__studio33.u15LoanResults.classList.remove('u15-stale')},"async function(...args){await u15LoanCalculateAction.apply(this,args);if(u15LoanReport)u15LoanResults.classList.remove('u15-stale')}","");
}],
[1930,function initialize_1930(__studio33){
__studio33.knValidate=__studio33.$fn(function(data){const valid=__studio33.u15OldKNValidate(data);for(const b of valid.boards)for(const t of b.tasks)if(t.completedAt!==undefined&&(typeof t.completedAt!=='string'||!Number.isFinite(Date.parse(t.completedAt))))throw Error('Invalid task completion timestamp');return valid},"function(data){const valid=u15OldKNValidate(data);for(const b of valid.boards)for(const t of b.tasks)if(t.completedAt!==undefined&&(typeof t.completedAt!=='string'||!Number.isFinite(Date.parse(t.completedAt))))throw Error('Invalid task completion timestamp');return valid}","");
}],
[1932,function initialize_1932(__studio33){
document.title='Calc Studio — Complete edition '+__studio33.u15Version;
}],
[1933,function initialize_1933(__studio33){
__studio33.$('helpPanel').replaceChildren(__studio33.csText('h3','Calc Studio · edition '+__studio33.u15Version),__studio33.csText('p','91 registered tool/workspace entries, grouped into combined studios. This release improves existing workflows: cURL import, enabled request rows, response checks, variable extraction, redaction preview, keyed JSON comparison, editable JSON values, schema suggestions, visual mapping, data profiling/validation, per-column reconciliation, workflow conditions, loan scenarios, numerical graph analysis, log visuals, Kanban workload and form-response quality checks.'),__studio33.csText('p','New controls are under descriptive expandable panels in each existing tool. Local tools and bundled libraries work without a server. Live HTTP requests and currency refresh require a network connection; API calls remain subject to browser CORS. Nothing is sent until you choose Send.'),__studio33.csText('p','Find tool: Ctrl/⌘ K. Find in an editor: Ctrl/⌘ F. Replace: Ctrl/⌘ H. Expand editor: Alt Enter. Escape closes expanded editors. Undo/redo remains available for supported text edits. Editor gutters show line numbers and detected error locations.'),__studio33.csText('p','API saving omits dedicated credentials and redacts sensitive JSON/form body keys by default. Literal text bodies are omitted unless they are a variable placeholder or authentication inclusion is enabled. Preview saved values before export. Remembered environments and explicitly included credentials remain in full backups; review backups before sharing.'),__studio33.csText('p','Keyed JSON comparison requires unique, nonblank scalar record keys. Ignored paths use JSON Pointer syntax; * matches one segment. Exact numeric tokens are retained. Workflow failure policy Continue records the failure and keeps the previous input. Cancel step edit never removes the original step.'),__studio33.csText('p','Numerical roots/intersections use sign-change brackets and sampled exact zeros. Tangencies, narrow features and discontinuities may be missed. Loan schedules are rounded monthly estimates with upfront fees; they do not reproduce lender-specific rules. Log diagrams show recorded evidence; inclusive elapsed operations can overlap.'),__studio33.csText('p','Use Formatting & backup to export all saved work. Project snapshots and draft recovery remain opt-in. Current uploads, live responses and unsaved credentials remain page-local. The separate Calc Studio Guide provides examples and detailed operating limits.'));
}],
[1934,function initialize_1934(__studio33){
__studio33.wfRender();
}],
[1935,function initialize_1935(__studio33){
__studio33.dwRender();
}],
[1936,function initialize_1936(__studio33){
__studio33.u15LogVisuals();
}],
[1937,function initialize_1937(__studio33){
__studio33.u15ReattachGutters();
}],
[1939,function initialize_1939(__studio33){
__studio33.u16Style.textContent=`.u16-preview{border:1px solid var(--line);border-radius:12px;padding:12px;margin:12px 0;max-height:480px;overflow:auto}.u16-split{display:flex!important;gap:16px;align-items:stretch}.u16-split>.field{flex:1;min-width:220px;resize:horizontal;overflow:auto}.u16-split textarea{min-height:280px}.u16-note{max-width:240px}.u16-review-row{display:flex;gap:8px;flex-wrap:wrap;padding:10px 0;border-bottom:1px solid var(--line)}.u16-review-row>code{flex:1;min-width:180px;overflow-wrap:anywhere}.u16-review-row select{max-width:190px}.u16-review-row input{min-width:140px;flex:1}.u16-error{color:var(--text);background:var(--op);padding:12px;border-radius:10px}@media(max-width:750px){.u16-split{display:grid!important;grid-template-columns:1fr!important}.u16-split>.field{resize:none;min-width:0}.u16-review-row>*{max-width:100%;min-width:0}}`;
}],
[1940,function initialize_1940(__studio33){
document.head.append(__studio33.u16Style);
}],
[1955,function initialize_1955(__studio33){
__studio33.u16Runner.append(__studio33.csText('p','Load a saved collection, review the order and rules, then Preview and Run. CSV values and extracted variables remain within this run. Requests run once in sequence; cancellation stops future requests.','hint'));
}],
[1973,function initialize_1973(__studio33){
__studio33.u16Field(__studio33.u16Tables,'u16JoinRight','Second table: CSV or JSON array','','textarea');
}],
[1974,function initialize_1974(__studio33){
__studio33.u16Field(__studio33.u16Tables,'u16JoinKeys','Join keys: JSON array of [current column, second-table column]','[["id","id"]]','textarea');
}],
[1975,function initialize_1975(__studio33){
__studio33.u16Field(__studio33.u16Tables,'u16JoinMode','Join type','left','text',[['left','Left join'],['inner','Inner join'],['full','Full outer join']]);
}],
[1976,function initialize_1976(__studio33){
__studio33.u16Field(__studio33.u16Tables,'u16JoinDuplicates','Duplicate key policy','reject','text',[['reject','Reject duplicate groups'],['expand','Expand all matching combinations']]);
}],
[1977,function initialize_1977(__studio33){
__studio33.u16Field(__studio33.u16Tables,'u16GroupColumns','Group columns: JSON array','["status"]');
}],
[1978,function initialize_1978(__studio33){
__studio33.u16Field(__studio33.u16Tables,'u16GroupMetrics','Summary metrics: JSON array','[{"op":"count","as":"records"},{"op":"sum","column":"amount","as":"total"}]','textarea');
}],
[1989,function initialize_1989(__studio33){
__studio33.u16Button(__studio33.u16Tables,'u16UnmatchedExport','Export unmatched records',__studio33.$fn(()=>{if(!__studio33.u16TablePending)throw Error('Preview a join first');__studio33.u16Fresh(__studio33.u16TablePending.signature,__studio33.u16TableSignature());__studio33.downloadFile('join-unmatched.csv',__studio33.v12CSV([['side','source_row','reason'],...__studio33.u16TablePending.unmatched]),'text/csv')},"()=>{if(!u16TablePending)throw Error('Preview a join first');u16Fresh(u16TablePending.signature,u16TableSignature());downloadFile('join-unmatched.csv',v12CSV([['side','source_row','reason'],...u16TablePending.unmatched]),'text/csv')}",""));
}],
[1991,function initialize_1991(__studio33){
__studio33.u16Field(__studio33.u16JSONBox,'u16JSONAction','Operation','add','text',[['add','Add property / insert array item'],['replace','Replace value or branch'],['rename','Rename object property'],['remove','Delete property / array item'],['move','Move branch']]);
}],
[1992,function initialize_1992(__studio33){
__studio33.u16Field(__studio33.u16JSONBox,'u16JSONPath','Target JSON Pointer (blank = root)','/newField');
}],
[1993,function initialize_1993(__studio33){
__studio33.u16Field(__studio33.u16JSONBox,'u16JSONFrom','Move source JSON Pointer','');
}],
[1994,function initialize_1994(__studio33){
__studio33.u16Field(__studio33.u16JSONBox,'u16JSONName','New property name (rename only)','');
}],
[1995,function initialize_1995(__studio33){
__studio33.u16Field(__studio33.u16JSONBox,'u16JSONValue','New JSON value','null','textarea');
}],
[1996,function initialize_1996(__studio33){
__studio33.u16Field(__studio33.u16JSONBox,'u16SchemaSamples','Schema samples: JSON array of sample documents','[{"id":1},{"id":2,"note":"optional"}]','textarea');
}]
];
