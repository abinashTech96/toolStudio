/** Registry metadata owns labels and membership; legacy aliases retain their IDs. */
export function navigationCatalog(registry) {
  return [...registry.categories.map(category => ({...category, tools: registry.modules.filter(module => module.category === category.id).map(module => module.id)})),
    {id:'saved',label:'My Work & Settings',tools:registry.modules.filter(module=>module.category==='shared').map(module=>module.id)}];
}
export function installCatalog(c,registry) {
  const groups=navigationCatalog(registry);
  c.n28Categories=Object.fromEntries(groups.filter(group=>group.id!=='saved').map(group=>[group.id,{label:group.label,tools:[...group.tools]}]));
  c.n28Shared=groups.find(group=>group.id==='saved').tools;
  c.u23Catalog=Object.fromEntries(groups.map(group=>[group.id,{label:group.label,tools:[...group.tools]}]));
  c.n28HomeCategory=Object.fromEntries(groups.filter(group=>group.id!=='saved').flatMap(group=>group.tools.map(id=>[id,group.id])));
  for(const module of registry.modules){c.views[module.id]=module.label;c.u23Homes.add(module.id)}
  c.syncToolNavigation=function(id){
    const home=c.u23Home(id),category=c.u23Category(id),picker=c.$('categoryPicker'),workspace=c.$('workspacePicker');
    picker.querySelector('option[value=""]')?.remove();picker.value=category;
    const catalog=c.toolCategories[category],ids=catalog.tools.includes(home)?catalog.tools:[...catalog.tools,home],fragment=document.createDocumentFragment(),groups=new Map();
    for(const tool of ids){const label=c.cs30GroupLabels[tool]||catalog.label;if(!groups.has(label)){const group=document.createElement('optgroup');group.label=label;groups.set(label,group);fragment.append(group)}groups.get(label).append(new Option(c.views[tool]+(c.u23State.hidden.includes(tool)?' · optional':''),tool))}
    workspace.replaceChildren(fragment);workspace.value=home;workspace.setAttribute('aria-label','Workspace or tool');
  };
  c.cs30BaseMenuApply=function(){
    for(const key of Object.keys(c.toolCategories))delete c.toolCategories[key];
    for(const[key,group]of Object.entries(c.u23Catalog))c.toolCategories[key]={label:group.label,tools:group.tools.filter(id=>!c.u23State.hidden.includes(id))};
    c.$('categoryPicker').replaceChildren(...Object.entries(c.toolCategories).map(([key,group])=>{const option=new Option(group.label,key);option.disabled=!group.tools.length;return option}));
    c.u23CurlShell.value=c.u23State.shell;c.syncToolNavigation(c.activeView);c.renderFavorites();c.renderRecents();if(!c.$('commandOverlay').hidden)c.renderCommands();
  };
  c.n28Index=null;c.u23MenuApply();
}
