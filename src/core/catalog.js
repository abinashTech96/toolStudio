/** A replacement changes presentation only while that workspace is installed. */
export const isEarlierWorkspace=(registry,module)=>!!module.supersededBy&&registry.modules.some(m=>m.id===module.supersededBy);
/** Registry metadata owns labels and membership; legacy aliases retain their IDs. */
export function navigationCatalog(registry) {
  return [...registry.categories.map(category => ({...category, tools: registry.modules.filter(module => module.category === category.id).map(module => module.id)})),
    {id:'saved',label:'My Work & Settings',tools:registry.modules.filter(module=>module.category==='shared').map(module=>module.id)}];
}
export function installCatalog(c,registry) {
  const groups=navigationCatalog(registry);
  const earlierModules=registry.modules.filter(m=>isEarlierWorkspace(registry,m)),earlier=new Set(earlierModules.map(m=>m.id)),earlierRoutes=new Set(earlierModules.flatMap(m=>m.routes));
  c.n28Categories=Object.fromEntries(groups.filter(group=>group.id!=='saved').map(group=>[group.id,{label:group.label,tools:group.tools.filter(id=>!earlier.has(id))}]));
  c.n28Shared=groups.find(group=>group.id==='saved').tools;
  c.u23Catalog=Object.fromEntries(groups.map(group=>[group.id,{label:group.label,tools:[...group.tools]}]));
  c.n28HomeCategory=Object.fromEntries(groups.filter(group=>group.id!=='saved').flatMap(group=>group.tools.map(id=>[id,group.id])));
  for(const module of registry.modules){c.views[module.id]=module.label;c.u23Homes.add(module.id);if(module.searchTerms)c.n28Tags[module.id]=[c.n28Tags[module.id]||module.description||module.label,...module.searchTerms].join(' ')}
  c.syncToolNavigation=function(id){
    const home=c.u23Home(id),category=c.u23Category(id),picker=c.$('categoryPicker'),workspace=c.$('workspacePicker');
    picker.querySelector('option[value=""]')?.remove();picker.value=category;
    const catalog=c.toolCategories[category],ids=catalog.tools.includes(home)?catalog.tools:[...catalog.tools,home],fragment=document.createDocumentFragment(),groups=new Map();
    for(const tool of ids){const label=c.cs30GroupLabels[tool]||catalog.label;if(!groups.has(label)){const group=document.createElement('optgroup');group.label=label;groups.set(label,group);fragment.append(group)}groups.get(label).append(new Option(c.views[tool]+(earlier.has(tool)?' · earlier tool':c.u23State.hidden.includes(tool)?' · optional':''),tool))}
    workspace.replaceChildren(fragment);workspace.value=home;workspace.setAttribute('aria-label','Workspace or tool');
  };
  c.cs30BaseMenuApply=function(){
    for(const key of Object.keys(c.toolCategories))delete c.toolCategories[key];
    for(const[key,group]of Object.entries(c.u23Catalog))c.toolCategories[key]={label:group.label,tools:group.tools.filter(id=>!earlier.has(id)&&!c.u23State.hidden.includes(id))};
    c.$('categoryPicker').replaceChildren(...Object.entries(c.toolCategories).map(([key,group])=>{const option=new Option(group.label,key);option.disabled=!group.tools.length;return option}));
    c.u23CurlShell.value=c.u23State.shell;c.syncToolNavigation(c.activeView);c.renderFavorites();c.renderRecents();if(!c.$('commandOverlay').hidden)c.renderCommands();
  };
  // Earlier editors stay available through Studio; their main-menu toggles would be misleading.
  const manage=c.u23ManageRender;
  c.u23ManageRender=()=>{manage();for(const id of earlier){const input=c.$('u23Show-'+id);if(!input)continue;input.disabled=true;input.checked=true;const note=input.closest('label')?.querySelector('small');if(note)note.textContent='Earlier editor · available inside Career Studio';}};
  if(typeof c.cs30ManageCount==='function'){const count=c.cs30ManageCount;c.cs30ManageCount=()=>{count();c.u23ManageCount.textContent=c.u23ManageCount.textContent.replace('main workspaces','workspaces including earlier editors');};}
  const buildIndex=c.n28BuildIndex;
  c.n28BuildIndex=()=>buildIndex().filter(entry=>!earlierRoutes.has(entry.id));
  c.n28Index=null;c.u23MenuApply();
}
