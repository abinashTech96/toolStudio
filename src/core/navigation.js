// core/navigation · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
export const id="core/navigation";
export function register(__studio33){
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
 if(!value||value.version!==1||!value.last||typeof value.last!=='object'||Array.isArray(value.last)||Object.keys(value.last).length>__studio33.u23Homes.size)throw Error('Invalid navigation preferences');
 const last={};for(const[home,id]of Object.entries(value.last)){if(!__studio33.u23Homes.has(home)||!Object.hasOwn(__studio33.views,id)||__studio33.u23Home(id)!==home||__studio33.u23Aliases[id]||__studio33.v12Suites[home]&&!__studio33.v12Suites[home].includes(id)&&!(home==='dataworkbench'&&id===home))throw Error('Invalid remembered feature');last[home]=id;}
 const camera=value.camera||{mode:'edit',operation:'crop'};
 if(!['edit','extract','qr','pdf','batch'].includes(camera.mode)||!['crop','document','annotate','adjust','compress'].includes(camera.operation))throw Error('Invalid remembered image feature');
 return{version:1,last,camera:{mode:camera.mode,operation:camera.operation}};
}),"function n28Check(value){\n if(!value||value.version!==1||!value.last||typeof value.last!=='object'||Array.isArray(value.last)||Object.keys(value.last).length>u23Homes.size)throw Error('Invalid navigation preferences');\n const last={};for(const[home,id]of Object.entries(value.last)){if(!u23Homes.has(home)||!Object.hasOwn(views,id)||u23Home(id)!==home||u23Aliases[id]||v12Suites[home]&&!v12Suites[home].includes(id)&&!(home==='dataworkbench'&&id===home))throw Error('Invalid remembered feature');last[home]=id;}\n const camera=value.camera||{mode:'edit',operation:'crop'};\n if(!['edit','extract','qr','pdf','batch'].includes(camera.mode)||!['crop','document','annotate','adjust','compress'].includes(camera.operation))throw Error('Invalid remembered image feature');\n return{version:1,last,camera:{mode:camera.mode,operation:camera.operation}};\n}","n28Check");

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
export const steps=[
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
