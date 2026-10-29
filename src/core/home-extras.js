import{featurePinKey}from'./home-discovery.js';
import{displayVersion,fileTargets}from'./home-state.js';

export function installHomeExtras({c,registry,options,home,personal,browse,footer,search,grid,render}){
  const node=(tag,text,className)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(className)e.className=className;return e};
  const button=(label,run,className='home-chip')=>{const e=node('button',label,className);e.type='button';e.onclick=run;return e};
  let inputRevision=0,navigationRevision=0;document.addEventListener('input',()=>inputRevision++,true);
  const api=c.$advanced.api,prefs=()=>api.homePreferences(),save=(change,immediate=true)=>{try{api.saveHomePreferences({...prefs(),...change},{immediate});return true}catch(e){c.toast(e.message);return false}};
  const version=displayVersion(registry.appVersion||'35.0.0');document.title='ToolStudio — '+version;
  const openGuide=(fragment='')=>{
    if(options.guideHTML){const url=URL.createObjectURL(new Blob([options.guideHTML],{type:'text/html'}));window.open(url+fragment,'_blank','noopener');setTimeout(()=>URL.revokeObjectURL(url),60000)}
    else window.open(new URL('./guide.html'+fragment,location.href),'_blank','noopener');
  };const guide=button('Guide',()=>openGuide());footer.append(button('What’s new',()=>openGuide('#edition46')));const headerGuide=c.$('u18GuideOpen');headerGuide?.addEventListener('click',event=>{if(document.body.dataset.home==='true'){event.preventDefault();event.stopImmediatePropagation();guide.click()}},true);guide.id='homeGuide';guide.setAttribute('aria-label','Open guide');
  const actions=node('div',undefined,'home-hero-actions');const versionLabel=node('span',version,'home-version');versionLabel.title='Application version '+(registry.appVersion||'35.0.0');actions.append(guide,versionLabel);home.querySelector('.home-hero').append(actions);
  const tasks=node('section',undefined,'home-task-shortcuts');tasks.setAttribute('aria-label','Task shortcuts');
  for(const[label,id]of[['Format JSON','jsonformatter'],['Analyze Apex log','logs'],['Compare files','excel'],['Calculate EMI','tools']])tasks.append(button(label,()=>{if(id==='tools')c.n28FeatureOpen(c.n28Entry('home:task:emi','tools','Loan / EMI','',{loan:true}));else c.openTab(id)}));
  personal.after(tasks);
  const drop=node('section',undefined,'home-drop'),dropTitle=node('h2','Drop a file to begin'),file=node('input');file.type='file';file.id='homeFile';file.accept='.json,.csv,.tsv,.xlsx,.xls,.ods,.pdf,.png,.jpg,.jpeg,.webp,.gif,.bmp,.txt,.log';file.hidden=true;
  const choose=button('Choose file',()=>file.click()),fileStatus=node('p','JSON, spreadsheets, PDF, images or logs · up to 20 MiB','home-file-status');fileStatus.setAttribute('role','status');
  const review=node('div',undefined,'home-file-review'),target=node('select'),targetLabel=node('label','Open with');target.id='homeFileTarget';targetLabel.htmlFor=target.id;let pendingFile,targets=[],ticket=0,busy=false;
  const clear=()=>{ticket++;pendingFile=null;targets=[];file.value='';review.hidden=true;fileStatus.textContent='JSON, spreadsheets, PDF, images or logs · up to 20 MiB'};
  const open=button('Open selected file',async()=>{
    if(busy||!pendingFile)return;const selected=pendingFile,chosen=targets[Number(target.value)],token=++ticket;
    if(!confirm('Open '+selected.name+' in '+chosen.label+'? This replaces that tool’s current file or input.'))return;
    busy=true;open.disabled=true;
    try{
      c.openTab(chosen.route);const navigation=navigationRevision,revision=inputRevision;await window.calcStudio.ensureToolResources(chosen.route,chosen.input);
      if(token!==ticket||pendingFile!==selected)return;
      if(navigation!==navigationRevision||revision!==inputRevision||c.activeView!==chosen.route||document.body.dataset.home==='true'){fileStatus.textContent='Inputs or workspace changed. Review the file and open again.';return;}
      const input=c.$(chosen.input);if(!input)throw Error('This file input is unavailable. Open the file from inside the tool.');
      const transfer=new DataTransfer();transfer.items.add(selected);input.files=transfer.files;input.dispatchEvent(new Event('change',{bubbles:true}));clear();
    }catch(e){fileStatus.textContent=e.message;c.toast(e.message)}finally{busy=false;open.disabled=false}
  });open.id='homeFileOpen';
  review.append(targetLabel,target,open,button('Cancel file',clear));review.hidden=true;drop.append(dropTitle,choose,file,fileStatus,review);tasks.after(drop);
  const accept=files=>{clear();const drawer=drop.closest('.home-auxiliary');if(drawer)drawer.open=true;try{if(files.length!==1)throw Error('Choose one file at a time.');targets=fileTargets(files[0]);pendingFile=files[0];target.replaceChildren(...targets.map((t,i)=>new Option(t.label,String(i))));fileStatus.textContent=pendingFile.name+' · '+Math.ceil(pendingFile.size/1024)+' KiB. Choose a tool to open it.';review.hidden=false}catch(e){fileStatus.textContent=e.message}};
  file.onchange=()=>accept([...file.files]);target.onchange=()=>ticket++;
  drop.ondragover=e=>{if(e.dataTransfer?.types.includes('Files')){e.preventDefault();drop.classList.add('home-dragover')}};drop.ondragleave=()=>drop.classList.remove('home-dragover');drop.ondrop=e=>{e.preventDefault();drop.classList.remove('home-dragover');accept([...e.dataTransfer.files])};
  const projects=node('section',undefined,'home-projects'),projectList=node('div',undefined,'home-project-list');projects.append(node('h2','Recent saved projects'),projectList);footer.before(projects);
  const custom=node('details',undefined,'home-customize'),summary=node('summary','Personalize Home'),customBody=node('div');custom.append(summary,customBody);footer.before(custom);
  const personalize=button('Personalize Home',()=>{custom.open=!custom.open;if(custom.open){custom.scrollIntoView({block:'nearest'});summary.focus()}});footer.append(personalize);
  const status=node('span',undefined,'home-network-status'),update=button('Update ready',()=>document.querySelector('.a35-update button')?.click());update.hidden=true;footer.firstElementChild.replaceWith(node('span',version,'home-footer-version'));footer.prepend(status);footer.append(update);
  const statusUpdate=()=>{status.textContent=location.protocol==='file:'?'Standalone · offline ready':navigator.onLine?'Online'+(navigator.serviceWorker?.controller?' · offline cache active':''):'Offline · previously loaded tools available'};
  for(const type of['online','offline'])window.addEventListener(type,statusUpdate);navigator.serviceWorker?.addEventListener('controllerchange',statusUpdate);window.addEventListener('toolstudio:update',()=>{update.hidden=false});statusUpdate();
  function renderProjects(){
    const snapshots=[...(c.v12State.snapshots||[])].sort((a,b)=>Date.parse(b.updatedAt||b.createdAt)-Date.parse(a.updatedAt||a.createdAt)).slice(0,3);projectList.replaceChildren();projects.hidden=!snapshots.length;
    for(const snap of snapshots){const row=node('article'),date=new Date(snap.updatedAt||snap.createdAt),tools=Object.keys(snap.tools).map(id=>c.views[id]||id).slice(0,3).join(', ');row.append(node('strong',snap.name),node('small',tools+' · '+(Number.isFinite(date.getTime())?date.toLocaleDateString():'Saved snapshot')),button('Review '+snap.name,()=>{c.openTab('projectworkspaces');c.$('wsSaved').value=snap.id;c.$('wsSaved').dispatchEvent(new Event('change',{bubbles:true}));c.$('wsSaved').focus()}));projectList.append(row)}
  }
  const orderedCategories=()=>{const map=new Map(registry.categories.map(x=>[x.id,x]));return[...prefs().categories,...registry.categories.map(x=>x.id)].filter((id,i,all)=>all.indexOf(id)===i&&map.has(id)).map(id=>map.get(id))};
  function renderCustomize(){
    customBody.replaceChildren(node('p','Pin workspaces with the star on each card. Move favorites and categories into your preferred order.'));
    for(const[kind,ids]of[['favorites',[...c.favorites]],['categories',orderedCategories().map(x=>x.id)],['pinnedCategories',prefs().pinnedCategories||[]],['pinnedFeatures',prefs().pinnedFeatures||[]]]){
      const list=node('div',undefined,'home-order-list');list.append(node('h3',({favorites:'Favorite tools',categories:'Categories',pinnedCategories:'Favorite categories',pinnedFeatures:'Favorite features'})[kind]));
      for(const[id,index]of ids.map((id,index)=>[id,index])){const label=kind==='favorites'?c.views[id]:kind==='pinnedFeatures'?c.n28GetIndex().find(e=>featurePinKey(e,c.n28Normalize)===id)?.label||({'home:emi':'Loan / EMI'})[id]:registry.categories.find(x=>x.id===id)?.label;if(!label)continue;const row=node('div');row.append(node('span',label));
        for(const[delta,word]of[[-1,'earlier'],[1,'later']]){const move=button('Move '+label+' '+word,()=>{const next=[...ids];[next[index],next[index+delta]]=[next[index+delta],next[index]];let saved;if(kind!=='favorites')saved=save({[kind]:next});else{saved=c.csPersist('calc-studio-favorites',next);if(saved){c.favorites=next;c.renderFavorites()}}if(saved){render();(customBody.querySelector('[data-order="'+kind+'-'+(index+delta)+'-'+delta+'"]:not([disabled])')||customBody.querySelector('[data-order="'+kind+'-'+(index+delta)+'-'+(-delta)+'"]'))?.focus()}});move.dataset.order=kind+'-'+index+'-'+delta;move.textContent=delta<0?'↑':'↓';move.setAttribute('aria-label','Move '+label+' '+word);move.disabled=index+delta<0||index+delta>=ids.length;row.append(move)}list.append(row)}customBody.append(list)
    }
    const recent=node('label'),showRecent=node('input');showRecent.type='checkbox';showRecent.checked=prefs().showRecent!==false;showRecent.onchange=()=>{if(save({showRecent:showRecent.checked}))render()};recent.append(showRecent,document.createTextNode('Show recent work'));customBody.append(recent);
    customBody.append(button('Reset category order',()=>{if(save({categories:[]}))render()}),button('Reset Home layout',()=>{if(save({categories:[],view:'grid',showRecent:true}))render()}));
  }
  const keydown=e=>{
    if(document.body.dataset.home!=='true'||e.altKey||e.ctrlKey||e.metaKey||e.isComposing)return;
    const editing=e.target.closest?.('input,textarea,select,[contenteditable=true]');
    if(e.key==='/'&&!editing){e.preventDefault();search.focus();return}
    const buttons=[...grid.querySelectorAll('.home-tool-open,.home-result-category')],index=buttons.indexOf(document.activeElement);
    if((document.activeElement===search||index>=0)&&['ArrowDown','ArrowUp','ArrowLeft','ArrowRight'].includes(e.key)&&buttons.length){e.preventDefault();buttons[Math.max(0,Math.min(buttons.length-1,index+(e.key==='ArrowUp'||e.key==='ArrowLeft'?-1:1)))].focus()}
    else if(index>=0&&e.key==='Escape'){e.preventDefault();search.focus()}
  };document.addEventListener('keydown',keydown);
  const header=document.querySelector('.top');if(globalThis.ResizeObserver){new ResizeObserver(()=>home.style.setProperty('--home-header-height',header.getBoundingClientRect().height+'px')).observe(header)}
  return{
    categories:orderedCategories,
    remember(id){navigationRevision++;if(prefs().lastTool!==id)save({lastTool:id},false)},
    renderPersonal(){const id=prefs().lastTool;if(id&&Object.hasOwn(c.views,id)){const section=node('section',undefined,'home-continue');section.append(node('h2','Continue working'),button(c.views[id],()=>c.openTab(id)));personal.prepend(section)}},
    render(){renderProjects();renderCustomize();statusUpdate()}
  };
}
