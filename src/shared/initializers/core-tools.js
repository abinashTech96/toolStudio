// Original initializer positions are part of the compatibility contract.
export const steps0=[
[5,function initialize_5(__studio33){
__studio33.$ = __studio33.$fn(id=>{const e=document.getElementById(id);if(e)return e;const cached=__studio33.cs30NodeCache.get(id);if(cached&&__studio33.cs30TemplateRoots.has(cached.getRootNode()))return cached;__studio33.cs30NodeCache.delete(id);for(const root of __studio33.cs30TemplateRoots){const found=root.getElementById(id);if(found){__studio33.cs30NodeCache.set(id,found);return found;}}return null},"id=>{const e=document.getElementById(id);if(e)return e;const cached=cs30NodeCache.get(id);if(cached&&cs30TemplateRoots.has(cached.getRootNode()))return cached;cs30NodeCache.delete(id);for(const root of cs30TemplateRoots){const found=root.getElementById(id);if(found){cs30NodeCache.set(id,found);return found;}}return null}","$");

}],
[7,function initialize_7(__studio33){
__studio33.angle = __studio33.storage.get('advanced-calculator-angle','DEG');

}],
[8,function initialize_8(__studio33){
if(!['DEG','RAD'].includes(__studio33.angle))__studio33.angle='DEG';
}],
[9,function initialize_9(__studio33){
__studio33.ans = Number(__studio33.storage.get('advanced-calculator-ans',0));

}],
[10,function initialize_10(__studio33){
if(!Number.isFinite(__studio33.ans))__studio33.ans=0;
}],
[11,function initialize_11(__studio33){
__studio33.memory = __studio33.storage.get('calc-studio-memory',null);

}],
[12,function initialize_12(__studio33){
if(__studio33.memory!==null&&!Number.isFinite(__studio33.memory))__studio33.memory=null;
}],
[13,function initialize_13(__studio33){
__studio33.history = __studio33.storage.get('advanced-calculator-history',[]);

}],
[14,function initialize_14(__studio33){
if(!Array.isArray(__studio33.history))__studio33.history=[];
}],
[15,function initialize_15(__studio33){
__studio33.history=__studio33.history.filter(x=>x&&typeof x.expr==='string'&&typeof x.result==='string').slice(0,100);
}],
[16,function initialize_16(__studio33){
__studio33.currentValue = null;
__studio33.conversionValue = null;
__studio33.conversionMeta = null;
__studio33.tool = 'percent';
__studio33.toastTimer = undefined;

}],
[17,function initialize_17(__studio33){
__studio33.formatting = __studio33.normalizeFormat(__studio33.storage.get('calc-studio-formatting',{}));

}],
[18,function initialize_18(__studio33){
__studio33.editStacks = new Map();

}],
[20,function initialize_20(__studio33){
__studio33.fmt = __studio33.formatNumber;

}],
[21,function initialize_21(__studio33){
__studio33.finite = n=>{if(!Number.isFinite(n))throw Error('Result is outside the finite real-number range');return n};

}],
[22,function initialize_22(__studio33){
__studio33.integer = n=>{if(!Number.isSafeInteger(n)||n<0)throw Error('Use nonnegative safe integers');return n};

}],
[32,function initialize_32(__studio33){
__studio33.sci = [['sin','sin'],['cos','cos'],['tan','tan'],['sin⁻¹','asin'],['cos⁻¹','acos'],['tan⁻¹','atan'],['√x','sqrt'],['∛x','cbrt'],['x²','^2',false],['xʸ','^',false],['ln','ln'],['log₁₀','log'],['eˣ','exp'],['|x|','abs'],['x!','!',false],['π','pi',false],['e','e',false],['Ans','Ans',false],['nCr','nCr'],['nPr','nPr'],['root','root'],['mod','mod'],['(', '(',false],[')',')',false]];

}],
[34,function initialize_34(__studio33){
__studio33.commaButton = document.createElement('button');

}],
[35,function initialize_35(__studio33){
__studio33.commaButton.className='key function';
}],
[36,function initialize_36(__studio33){
__studio33.commaButton.textContent=',';
}],
[37,function initialize_37(__studio33){
__studio33.commaButton.title='Separate function arguments';
}],
[38,function initialize_38(__studio33){
__studio33.commaButton.onclick=__studio33.$fn(()=>__studio33.insert(','),"()=>insert(',')","");
}],
[40,function initialize_40(__studio33){
__studio33.nums = [['AC','clear'],['±','negate'],['%','%'],['÷','/'],['7','7'],['8','8'],['9','9'],['×','*'],['4','4'],['5','5'],['6','6'],['−','-'],['1','1'],['2','2'],['3','3'],['+','+'],['0','0'],['.','.'],['⌫','backspace'],['=','equals']];

}],
[47,function initialize_47(__studio33){
__studio33.science(__studio33.storage.get('calc-studio-scientific',true));
}],
[50,function initialize_50(__studio33){
__studio33.memoryLabel();
}],
[53,function initialize_53(__studio33){
__studio33.retiredThemes = new Set(['amber', 'rose', 'slate', 'ocean', 'sand', 'violet', 'copper', 'midnight', 'contrast', 'light', 'dark', 'glass']);

}],
[54,function initialize_54(__studio33){
__studio33.themes = {cartoon:'Cartoonish',forest:'Forest',sky:'Sky & clouds',neon:'Neon',pearl:'Pearl',graphite:'Graphite'};

}],
[56,function initialize_56(__studio33){
for(const [name,label] of Object.entries(__studio33.themes)){const b=document.createElement('button');b.className='theme-choice';b.dataset.theme=name;b.innerHTML='<b>'+label+'</b><span class="mini-keys"><i>7</i><i>+</i><i>=</i></span>';b.onclick=__studio33.$fn(()=>{__studio33.setTheme(name);__studio33.themeOpen(false);__studio33.$('themeToggle').focus()},"()=>{setTheme(name);themeOpen(false);$('themeToggle').focus()}","");__studio33.$('themeGrid').append(b)}
}],
[57,function initialize_57(__studio33){
__studio33.setTheme(__studio33.storage.get('calc-studio-theme','forest'));
}],
[59,function initialize_59(__studio33){
__studio33.$('themeToggle').onclick=__studio33.$fn(()=>__studio33.themeOpen(__studio33.$('themeMenu').hidden),"()=>themeOpen($('themeMenu').hidden)","");
}],
[60,function initialize_60(__studio33){
document.addEventListener('click',__studio33.$fn(e=>{if(!e.target.closest('.theme-wrap'))__studio33.themeOpen(false)},"e=>{if(!e.target.closest('.theme-wrap'))themeOpen(false)}",""));
}],
[61,function initialize_61(__studio33){
document.addEventListener('keydown',__studio33.$fn(e=>{if(e.key==='Escape')__studio33.themeOpen(false)},"e=>{if(e.key==='Escape')themeOpen(false)}",""));
}],
[63,function initialize_63(__studio33){
__studio33.toggleHistory(__studio33.storage.get('calc-studio-history-visible',false));
}],
[64,function initialize_64(__studio33){
__studio33.$('historyToggle').onclick=__studio33.$fn(()=>__studio33.toggleHistory(__studio33.$('historyPanel').hidden),"()=>toggleHistory($('historyPanel').hidden)","");
}],
[65,function initialize_65(__studio33){
__studio33.$('minimizeHistory').onclick=__studio33.$fn(()=>{__studio33.toggleHistory(false);__studio33.$('historyToggle').focus()},"()=>{toggleHistory(false);$('historyToggle').focus()}","");
}],
[69,function initialize_69(__studio33){
__studio33.$('clearHistory').onclick=__studio33.$fn(()=>{const previous=__studio33.history;__studio33.history=[];__studio33.storage.set('advanced-calculator-history',__studio33.history);__studio33.renderHistory();__studio33.toast('History cleared');const undo=document.createElement('button');undo.textContent='Undo';undo.style.marginLeft='14px';undo.onclick=__studio33.$fn(()=>{__studio33.history=previous;__studio33.storage.set('advanced-calculator-history',__studio33.history);__studio33.renderHistory();__studio33.toast('History restored')},"()=>{history=previous;storage.set('advanced-calculator-history',history);renderHistory();toast('History restored')}","");__studio33.$('toast').append(undo);clearTimeout(__studio33.toastTimer);__studio33.toastTimer=setTimeout(__studio33.$fn(()=>__studio33.$('toast').hidden=true,"()=>$('toast').hidden=true",""),7000)},"()=>{const previous=history;history=[];storage.set('advanced-calculator-history',history);renderHistory();toast('History cleared');const undo=document.createElement('button');undo.textContent='Undo';undo.style.marginLeft='14px';undo.onclick=()=>{history=previous;storage.set('advanced-calculator-history',history);renderHistory();toast('History restored')};$('toast').append(undo);clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').hidden=true,7000)}","");
}],
[70,function initialize_70(__studio33){
__studio33.$('exportHistory').onclick=__studio33.$fn(()=>{if(!__studio33.history.length)return __studio33.toast('No history to export');const cell=v=>'"'+String(v??'').replace(/^[=+\-@\t\r]/,"'$&").replace(/"/g,'""')+'"';const csv='Expression,Result,Angle,Time,Label,Note,Pinned,RawValue\r\n'+__studio33.history.map(x=>[x.expr,x.result,x.angle,x.time,x.label||'',x.note||'',x.pinned?'yes':'no',Number.isFinite(x.value)?String(x.value):''].map(cell).join(',')).join('\r\n');const url=URL.createObjectURL(new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='calculator-history.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)},"()=>{if(!history.length)return toast('No history to export');const cell=v=>'\"'+String(v??'').replace(/^[=+\\-@\\t\\r]/,\"'$&\").replace(/\"/g,'\"\"')+'\"';const csv='Expression,Result,Angle,Time,Label,Note,Pinned,RawValue\\r\\n'+history.map(x=>[x.expr,x.result,x.angle,x.time,x.label||'',x.note||'',x.pinned?'yes':'no',Number.isFinite(x.value)?String(x.value):''].map(cell).join(',')).join('\\r\\n');const url=URL.createObjectURL(new Blob(['\\uFEFF'+csv],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='calculator-history.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}","");
}],
[71,function initialize_71(__studio33){
__studio33.$('helpToggle').onclick=__studio33.$fn(()=>{__studio33.$('helpPanel').hidden=!__studio33.$('helpPanel').hidden;__studio33.$('helpToggle').setAttribute('aria-expanded',String(!__studio33.$('helpPanel').hidden))},"()=>{$('helpPanel').hidden=!$('helpPanel').hidden;$('helpToggle').setAttribute('aria-expanded',String(!$('helpPanel').hidden))}","");
}],
[72,function initialize_72(__studio33){
__studio33.unitGroups = {length:{m:['Metres',1],km:['Kilometres',1000],cm:['Centimetres',.01],mm:['Millimetres',.001],ft:['Feet',.3048],in:['Inches',.0254],yd:['Yards',.9144],mi:['Miles',1609.344]},area:{m2:['Square metres',1],ft2:['Square feet',.09290304],km2:['Square kilometres',1e6],acre:['Acres',4046.8564224],hectare:['Hectares',10000]},mass:{kg:['Kilograms',1],g:['Grams',.001],mg:['Milligrams',1e-6],lb:['Pounds',.45359237],oz:['Ounces',.028349523125],t:['Metric tonnes',1000]},temperature:{c:['Celsius (°C)',1],f:['Fahrenheit (°F)',1],k:['Kelvin (K)',1]},volume:{l:['Litres',1],ml:['Millilitres',.001],m3:['Cubic metres',1000],usgal:['US gallons',3.785411784],ukgal:['Imperial gallons',4.54609],cup:['US cups',.2365882365]},speed:{ms:['Metres / second',1],kmh:['Kilometres / hour',1/3.6],mph:['Miles / hour',.44704],knot:['Knots',.5144444444444445]},time:{s:['Seconds',1],min:['Minutes',60],h:['Hours',3600],d:['Days',86400],wk:['Weeks',604800]},data:{b:['Bytes',1],bit:['Bits',.125],kb:['kB (1000 B)',1000],mb:['MB (10⁶ B)',1e6],gb:['GB (10⁹ B)',1e9],tb:['TB (10¹² B)',1e12],kib:['KiB (1024 B)',1024],mib:['MiB (1024² B)',1048576],gib:['GiB (1024³ B)',1073741824]},energy:{j:['Joules',1],kj:['Kilojoules',1000],cal:['Calories (thermochemical)',4.184],kcal:['Kilocalories',4184],kwh:['Kilowatt-hours',3.6e6]},pressure:{pa:['Pascals',1],kpa:['Kilopascals',1000],bar:['Bar',100000],psi:['PSI',6894.757293168],atm:['Atmospheres',101325]}};

}],
[73,function initialize_73(__studio33){
__studio33.currencies = {USD:'US dollar',INR:'Indian rupee',EUR:'Euro',GBP:'British pound',AED:'UAE dirham',AUD:'Australian dollar',CAD:'Canadian dollar',SGD:'Singapore dollar',JPY:'Japanese yen',CHF:'Swiss franc',CNY:'Chinese yuan',NZD:'New Zealand dollar',SAR:'Saudi riyal',QAR:'Qatari riyal',KWD:'Kuwaiti dinar',BHD:'Bahraini dinar',OMR:'Omani rial',HKD:'Hong Kong dollar',KRW:'South Korean won',THB:'Thai baht',MYR:'Malaysian ringgit',IDR:'Indonesian rupiah',PHP:'Philippine peso',VND:'Vietnamese dong',BDT:'Bangladeshi taka',NPR:'Nepalese rupee',LKR:'Sri Lankan rupee',PKR:'Pakistani rupee',ZAR:'South African rand',BRL:'Brazilian real',MXN:'Mexican peso',SEK:'Swedish krona',NOK:'Norwegian krone',DKK:'Danish krone',PLN:'Polish zloty',TRY:'Turkish lira'};

}],
[74,function initialize_74(__studio33){
__studio33.rateCache = __studio33.storage.get('calc-studio-rates',{});

}],
[75,function initialize_75(__studio33){
if(!__studio33.rateCache||typeof __studio33.rateCache!=='object'||Array.isArray(__studio33.rateCache))__studio33.rateCache={};
}],
[76,function initialize_76(__studio33){
__studio33.requestId = 0;
__studio33.controller = null;
__studio33.debounce = undefined;

}],
[91,function initialize_91(__studio33){
document.querySelectorAll('[data-tool]').forEach(__studio33.$fn(b=>b.onclick=__studio33.$fn(()=>{__studio33.tool=b.dataset.tool;document.querySelectorAll('[data-tool]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));__studio33.renderTools()},"b=>b.onclick=()=>{tool=b.dataset.tool;document.querySelectorAll('[data-tool]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));renderTools()}",""),"()=>{tool=b.dataset.tool;document.querySelectorAll('[data-tool]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));renderTools()}",""));
}],
[93,function initialize_93(__studio33){
__studio33.recentTools = __studio33.storage.get("calc-studio-recents-v6",[]);

}],
[94,function initialize_94(__studio33){
if(!Array.isArray(__studio33.recentTools))__studio33.recentTools=[];
}],
[95,function initialize_95(__studio33){
__studio33.editorFullScreen = false;

}],
[97,function initialize_97(__studio33){
Object.assign(__studio33.views,{annotation:'Image Annotation & Redaction',audioeditor:'Audio Trimmer & Editor',videoframes:'Video Frame Extractor',pdfform:'PDF Form Filler',formdesigner:'Offline Form Designer',flashcards:'Flashcards & Study Mode',presentationtimer:'Presentation Timer',keyboard:'Keyboard Tester',contactsheet:'Image Contact Sheet Builder',kanban:'Personal Kanban Board'});
}],
[100,function initialize_100(__studio33){
Object.assign(__studio33.views,{dataworkbench:'Data Workbench',reconciliation:'Reconciliation Studio',workflows:'Workflow Builder',responsedashboard:'Form Response Dashboard',jsonstudio:'JSON Studio',texttoolkit:'Text Toolkit',datetoolkit:'Date & Time Toolkit',pdfworkspace:'PDF Workspace',projectworkspaces:'Saved Project Workspaces'});
}],
[101,function initialize_101(__studio33){
Object.assign(__studio33.views,{comparisonstudio:'Comparison Studio',integrationstudio:'Integration Studio',imagestudio:'Image Studio',formsworkspace:'Forms Workspace'});
}],
[102,function initialize_102(__studio33){
Object.assign(__studio33.views,{apiclient:'Live API client',jwtworkspace:'JWT tool',hashworkspace:'Hash & file inspection',financeworkspace:'Finance & loan tools',conversionworkspace:'Converters',statistics:'Statistics'});
}],
[103,function initialize_103(__studio33){
__studio33.reservedNames = new Set(['pi','e','ans','sin','cos','tan','asin','acos','atan','sinh','cosh','tanh','sqrt','cbrt','ln','log','exp','abs','floor','ceil','round','root','ncr','npr','mod','min','max']);

}],
[117,function initialize_117(__studio33){
__studio33.$('densityToggle').onclick=__studio33.$fn(()=>__studio33.setCompact(!__studio33.compact),"()=>setCompact(!compact)","");
}],
[118,function initialize_118(__studio33){
__studio33.$('workspacePicker').onchange=__studio33.$fn(()=>__studio33.openTab(__studio33.$('workspacePicker').value),"()=>openTab($('workspacePicker').value)","");
}],
[119,function initialize_119(__studio33){
__studio33.setCompact(__studio33.compact);
}],
[120,function initialize_120(__studio33){
if(__studio33.compact&&!__studio33.storage.get('calc-studio-v2-initialized',false))__studio33.toggleHistory(false);
}],
[121,function initialize_121(__studio33){
__studio33.storage.set('calc-studio-v2-initialized',true);
}],
[122,function initialize_122(__studio33){
__studio33.commandItems = [];
__studio33.commandIndex = 0;
__studio33.commandFocus = null;

}],
[126,function initialize_126(__studio33){
__studio33.$('commandToggle').onclick=__studio33.showCommands;
}],
[127,function initialize_127(__studio33){
__studio33.$('commandClose').onclick=__studio33.closeCommands;
}],
[128,function initialize_128(__studio33){
__studio33.$('commandSearch').oninput=__studio33.$fn(()=>{__studio33.commandIndex=0;__studio33.renderCommands()},"()=>{commandIndex=0;renderCommands()}","");
}],
[129,function initialize_129(__studio33){
__studio33.$('commandOverlay').onclick=__studio33.$fn(e=>{if(e.target===__studio33.$('commandOverlay'))__studio33.closeCommands()},"e=>{if(e.target===$('commandOverlay'))closeCommands()}","");
}],
[130,function initialize_130(__studio33){
__studio33.$('commandSearch').onkeydown=__studio33.$fn(e=>{if(['ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();__studio33.commandIndex=(__studio33.commandIndex+(e.key==='ArrowDown'?1:-1)+__studio33.commandItems.length)%Math.max(1,__studio33.commandItems.length);__studio33.renderCommands()}if(e.key==='Enter'&&__studio33.commandItems.length){e.preventDefault();__studio33.openTab(__studio33.commandItems[__studio33.commandIndex][0]);__studio33.closeCommands()}},"e=>{if(['ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();commandIndex=(commandIndex+(e.key==='ArrowDown'?1:-1)+commandItems.length)%Math.max(1,commandItems.length);renderCommands()}if(e.key==='Enter'&&commandItems.length){e.preventDefault();openTab(commandItems[commandIndex][0]);closeCommands()}}","");
}],
[131,function initialize_131(__studio33){
document.addEventListener('keydown',__studio33.$fn(e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();__studio33.showCommands()}if(!__studio33.$('commandOverlay').hidden){if(e.key==='Escape'){e.preventDefault();__studio33.closeCommands()}if(e.key==='Tab'){const focusable=[...__studio33.$('commandOverlay').querySelectorAll('button,input')].filter(x=>!x.disabled),first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}},"e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();showCommands()}if(!$('commandOverlay').hidden){if(e.key==='Escape'){e.preventDefault();closeCommands()}if(e.key==='Tab'){const focusable=[...$('commandOverlay').querySelectorAll('button,input')].filter(x=>!x.disabled),first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}}",""));
}],
[134,function initialize_134(__studio33){
__studio33.notebookExample = 'price = 250\nqty = 4\nsubtotal = price * qty\ntax = subtotal * 18%\ntotal = subtotal + tax\n# Change price or qty to update everything\ntotal / 2';

}],
[149,function initialize_149(__studio33){
__studio33.currentExact = null;

}],
[154,function initialize_154(__studio33){
__studio33.dayMs = 86400000;

}],
[168,function initialize_168(__studio33){
__studio33.financeLoans = null;

}],
[180,function initialize_180(__studio33){
__studio33.initialFormulas = [{id:'total-price',name:'Total price',variables:['price','qty','tax'],expression:'price * qty * (1 + tax/100)',values:{price:'250',qty:'4',tax:'18'}},{id:'rectangle-area',name:'Rectangle area',variables:['width','height'],expression:'width * height',values:{width:'10',height:'12'}}];

}],
[181,function initialize_181(__studio33){
__studio33.formulaList = __studio33.storage.get('calc-studio-formulas',__studio33.initialFormulas);
__studio33.selectedFormula = null;
__studio33.formulaValue = null;

}],
[183,function initialize_183(__studio33){
try{if(!Array.isArray(__studio33.formulaList)||__studio33.formulaList.length>100)throw Error();__studio33.formulaList=__studio33.formulaList.map(__studio33.normalizeFormula)}catch{__studio33.formulaList=__studio33.initialFormulas.map(__studio33.normalizeFormula)}
}],
[199,function initialize_199(__studio33){
__studio33.renderFormulaOptions();
}],
[200,function initialize_200(__studio33){
__studio33.loadFormula(__studio33.formulaList[0]?.id||'');
}],
[223,function initialize_223(__studio33){
__studio33.savedGraph = __studio33.storage.get('calc-studio-graph',null);

}],
[226,function initialize_226(__studio33){
__studio33.renderFavorites();
}],
[227,function initialize_227(__studio33){
__studio33.renderNotebook();
}],
[228,function initialize_228(__studio33){
__studio33.renderEquationFields();
}],
[229,function initialize_229(__studio33){
__studio33.renderFractions();
}],
[230,function initialize_230(__studio33){
__studio33.renderDateFields();
}],
[231,function initialize_231(__studio33){
__studio33.renderFinanceFields();
}],
[232,function initialize_232(__studio33){
__studio33.renderProgrammer();
}],
[244,function initialize_244(__studio33){
__studio33.$('undoEdit').onclick=__studio33.$fn(()=>__studio33.replayEdit(false),"()=>replayEdit(false)","");
}],
[245,function initialize_245(__studio33){
__studio33.$('redoEdit').onclick=__studio33.$fn(()=>__studio33.replayEdit(true),"()=>replayEdit(true)","");
}],
[247,function initialize_247(__studio33){
for(const id of __studio33.undoIds){const el=__studio33.$(id);el.dataset.undo='true';__studio33.recordEdit(id);el.addEventListener('focus',__studio33.$fn(()=>{__studio33.lastEditor=id;__studio33.updateUndoButtons()},"()=>{lastEditor=id;updateUndoButtons()}",""));el.addEventListener('input',__studio33.$fn(()=>__studio33.recordEdit(id),"()=>recordEdit(id)",""))}
}],
[254,function initialize_254(__studio33){
__studio33.sessions=__studio33.storage.get('calc-studio-sessions',null);
}],
[261,function initialize_261(__studio33){
__studio33.renderSessionOptions();
}],
[262,function initialize_262(__studio33){
__studio33.renderNotebook();
}],
[263,function initialize_263(__studio33){
__studio33.preview();
}],
[272,function initialize_272(__studio33){
__studio33.setNotebookSplit(__studio33.storage.get('calc-studio-notebook-split',55));
}],
[273,function initialize_273(__studio33){
__studio33.history=__studio33.history.map(__studio33.$fn(item=>({...item,id:typeof item.id==='string'?item.id:__studio33.newId('hist'),label:typeof item.label==='string'?item.label.slice(0,80):'',note:typeof item.note==='string'?item.note.slice(0,1000):'',pinned:item.pinned===true}),"item=>({...item,id:typeof item.id==='string'?item.id:newId('hist'),label:typeof item.label==='string'?item.label.slice(0,80):'',note:typeof item.note==='string'?item.note.slice(0,1000):'',pinned:item.pinned===true})",""));
}],
[274,function initialize_274(__studio33){
__studio33.storage.set('advanced-calculator-history',__studio33.history);
}],
[287,function initialize_287(__studio33){
__studio33.matrixText = '';

}],
[301,function initialize_301(__studio33){
__studio33.presets = __studio33.storage.get('calc-studio-presets',[]);
__studio33.selectedPreset = null;

}],
[303,function initialize_303(__studio33){
try{if(!Array.isArray(__studio33.presets)||__studio33.presets.length>100)throw Error();__studio33.presets=__studio33.presets.map(__studio33.normalizePreset)}catch{__studio33.presets=[]}
}],
[312,function initialize_312(__studio33){
__studio33.presetUnits();
}],
[313,function initialize_313(__studio33){
__studio33.renderPresetOptions();
}],
[323,function initialize_323(__studio33){
__studio33.reviewedBackup = null;
__studio33.undoBackup = null;

}],
[336,function initialize_336(__studio33){
__studio33.syncFormatting();
}],
[337,function initialize_337(__studio33){
__studio33.renderMeasurements();
}],
[338,function initialize_338(__studio33){
__studio33.renderMatrices();
}],
[339,function initialize_339(__studio33){
__studio33.renderCalculus();
}],
[340,function initialize_340(__studio33){
__studio33.presetType();
}],
[341,function initialize_341(__studio33){
__studio33.updateUndoButtons();
}],
[342,function initialize_342(__studio33){
__studio33.developerLimit = 2*1024*1024;

}],
[345,function initialize_345(__studio33){
__studio33.charDebounce = undefined;

}],
[360,function initialize_360(__studio33){
__studio33.jsonMode = 'pretty';
__studio33.jsonDebounce = undefined;
__studio33.jsonReady = false;

}],
[377,function initialize_377(__studio33){
__studio33.diffResult = null;
__studio33.diffVisible = 200;

}],
[393,function initialize_393(__studio33){
__studio33.renderCharacters();
}],
[394,function initialize_394(__studio33){
__studio33.jsonButtons();
}],
[399,function initialize_399(__studio33){
__studio33.encodingReady = false;

}],
[411,function initialize_411(__studio33){
__studio33.regexWorkerSource = 'const job='+__studio33.regexWorkerJob.toString()+';self.onmessage=function(event){try{self.postMessage({ok:true,result:job(event.data)})}catch(e){self.postMessage({ok:false,error:e.message})}}';

}],
[412,function initialize_412(__studio33){
__studio33.regexWorker = null;
__studio33.regexWorkerURL = null;
__studio33.regexTimer = null;
__studio33.regexJobId = 0;

}],
[424,function initialize_424(__studio33){
__studio33.csvReady = false;

}],
[439,function initialize_439(__studio33){
__studio33.timestampMillis = null;
__studio33.timestampCopyText = '';

}],
[450,function initialize_450(__studio33){
__studio33.schemaBundleSource="";

}],
[455,function initialize_455(__studio33){
__studio33.$('categoryPicker').onchange=__studio33.$fn(()=>__studio33.openTab(__studio33.toolCategories[__studio33.$('categoryPicker').value].tools[0]),"()=>openTab(toolCategories[$('categoryPicker').value].tools[0])","");
}],
[457,function initialize_457(__studio33){
__studio33.$('fullScreenToggle').onclick=__studio33.$fn(()=>__studio33.setEditorFullScreen(!__studio33.editorFullScreen),"()=>setEditorFullScreen(!editorFullScreen)","");
}],
[458,function initialize_458(__studio33){
document.addEventListener('keydown',__studio33.$fn(e=>{if(e.key==='Escape'&&__studio33.editorFullScreen&&__studio33.$('commandOverlay').hidden){e.preventDefault();e.stopPropagation();__studio33.setEditorFullScreen(false)}},"e=>{if(e.key==='Escape'&&editorFullScreen&&$('commandOverlay').hidden){e.preventDefault();e.stopPropagation();setEditorFullScreen(false)}}",""),true);
}],
[462,function initialize_462(__studio33){
__studio33.editionWorkers = new Map();

}],
[466,function initialize_466(__studio33){
__studio33.textDiffResult = null;
__studio33.textDiffVisible = 200;

}],
[480,function initialize_480(__studio33){
__studio33.csvJsonReady = false;

}],
[490,function initialize_490(__studio33){
__studio33.explorerRoot = null;
__studio33.explorerNodes = 0;
__studio33.explorerDetailNodes = [];

}],
[524,function initialize_524(__studio33){
__studio33.hashTicket = 0;

}],
[544,function initialize_544(__studio33){
__studio33.schemaResult = null;

}],
[554,function initialize_554(__studio33){
__studio33.syncToolNavigation(__studio33.activeView);
}],
[555,function initialize_555(__studio33){
__studio33.renderRecents();
}],
[593,function initialize_593(__studio33){
__studio33.sampleExample = 'id | sequence | 1\nname | name\nemail | email\namount | integer | 100:5000\nactive | boolean\nstatus | choice | New,Pending,Approved';

}],
[607,function initialize_607(__studio33){
__studio33.invalidateMarkdown();
}],
[625,function initialize_625(__studio33){
__studio33.updateLogFiles();
}],
[632,function initialize_632(__studio33){
__studio33.responseAdvice = {REQUIRED_FIELD_MISSING:'Check required fields and values for this record.',FIELD_CUSTOM_VALIDATION_EXCEPTION:'Review validation rules and the message against the record values.',INVALID_FIELD:'Check API names, relationships and field access.',INVALID_TYPE:'Check the object API name and availability.',MALFORMED_QUERY:'Inspect the SOQL syntax and selected fields.',INVALID_CROSS_REFERENCE_KEY:'Check lookup ID type, existence, access and related record availability.',DUPLICATE_VALUE:'Review unique fields and duplicate records.',UNABLE_TO_LOCK_ROW:'Inspect concurrent updates and retry handling.',INVALID_SESSION_ID:'Check the session/token and authentication flow.',INSUFFICIENT_ACCESS_OR_READONLY:'Review user/object/record permissions.',PROCESSING_HALTED:'Inspect the first earlier failure and dependency/rollback settings.'};

}],
[644,function initialize_644(__studio33){
__studio33.compositeDemo = JSON.stringify([{method:'POST',url:'/services/data/v57.0/sobjects/Account',referenceId:'refAccount',body:{Name:'Sample Account'}},{method:'POST',url:'/services/data/v57.0/sobjects/Contact',referenceId:'refContact',body:{LastName:'Sample',AccountId:'@{refAccount.id}'}}],null,2);

}],
[652,function initialize_652(__studio33){
__studio33.responseResult = null;

}],
[660,function initialize_660(__studio33){
__studio33.mappingDemoRules = JSON.stringify([{from:'/name',to:'/customer/fullName',required:true},{from:'/phone',to:'/customer/phone',type:'string'},{from:'/amount',to:'/loan/amount',type:'number'},{from:'/active',to:'/loan/active',type:'boolean'},{from:'/missing',to:'/source',default:'Sample'}],null,2);

}],
[686,function initialize_686(__studio33){
__studio33.verifyRevision = 0;
__studio33.verifyReady = false;

}],
[700,function initialize_700(__studio33){
__studio33.installEditorControls();
}],
[715,function initialize_715(__studio33){
__studio33.studioLibraryCache = {};

}],
[745,function initialize_745(__studio33){
__studio33.excelState = {A:null,B:null};

}],
[746,function initialize_746(__studio33){
__studio33.excelDifference = null;
__studio33.excelPage = 0;

}],
[772,function initialize_772(__studio33){
__studio33.imageSource = null;
__studio33.imageResult = null;
__studio33.imageVersion = 0;

}],
[794,function initialize_794(__studio33){
__studio33.colorResult = null;

}],
[800,function initialize_800(__studio33){
__studio33.rateResult = null;

}],
[810,function initialize_810(__studio33){
__studio33.decisionResult = null;
__studio33.expenseResult = null;

}],
[823,function initialize_823(__studio33){
__studio33.typingStartTime = null;
__studio33.typingEndTime = null;
__studio33.typingTimer = null;
__studio33.typingArmed = false;
__studio33.typingTarget = '';
__studio33.typingFrozen = '';

}],
[834,function initialize_834(__studio33){
__studio33.inspectedFile = null;
__studio33.inspectVersion = 0;

}],
[839,function initialize_839(__studio33){
__studio33.shortcutStoreKey = 'calc-studio-url-shortcuts-v9';

}],
[840,function initialize_840(__studio33){
__studio33.shortcuts = [];
__studio33.shortcutEditing = null;

}],
[841,function initialize_841(__studio33){
try{const saved=__studio33.storage.get(__studio33.shortcutStoreKey,[]);__studio33.shortcuts=__studio33.parseShortcutImport(JSON.stringify(saved))}catch{__studio33.shortcuts=[]}
}],
[852,function initialize_852(__studio33){
__studio33.renderShortcuts();
}],
[891,function initialize_891(__studio33){
__studio33.flowState = null;
__studio33.flowDragging = null;

}],
[937,function initialize_937(__studio33){
__studio33.eventResult = null;

}],
[945,function initialize_945(__studio33){
__studio33.pickerSource = null;
__studio33.pickerResult = null;
__studio33.pickerPoint = {x:0,y:0};
__studio33.pickerVersion = 0;

}],
[963,function initialize_963(__studio33){
__studio33.csId = prefix=>prefix+'-'+(crypto.randomUUID?.()||Date.now().toString(36)+Math.random().toString(36).slice(2));

}],
[964,function initialize_964(__studio33){
__studio33.csClone = x=>JSON.parse(JSON.stringify(x));

}],
[965,function initialize_965(__studio33){
__studio33.csText = (tag,text,cls='')=>{const e=document.createElement(tag);e.textContent=text;if(cls)e.className=cls;return e};

}],
[966,function initialize_966(__studio33){
__studio33.csButton = __studio33.$fn((text,action)=>{const b=__studio33.csText('button',text,'small');b.type='button';b.onclick=action;return b},"(text,action)=>{const b=csText('button',text,'small');b.type='button';b.onclick=action;return b}","csButton");

}],
[971,function initialize_971(__studio33){
__studio33.csDate = ()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};

}],
[985,function initialize_985(__studio33){
__studio33.annDraw();
}],
[997,function initialize_997(__studio33){
__studio33.vidURL = null;
__studio33.vidFrames = [];
__studio33.vidBusy = false;
__studio33.vidGeneration = 0;

}]
];
