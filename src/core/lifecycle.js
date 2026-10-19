/** Workspace transitions expose a bounded lifecycle and retain original cancellation. */
export function installLifecycle(context, registry, resources) {
  // Folder labels change presentation without changing bookmarks or saved data keys.
  for (const category of registry.categories) if(context.n28Categories[category.id]) context.n28Categories[category.id].label = category.label;
  for (const module of registry.modules) if(Object.hasOwn(context.views,module.id)) context.views[module.id] = module.label;
  context.n28Index = null; context.u23MenuApply();
  const modules = new Map(registry.modules.map(module => [module.id, module]));
  let controller = new AbortController(), current = context.u23Home(context.activeView), generation = 0;
  const timings = new Map(),longTasks=[],actions=[],inputs=[];const startup=performance.now();try{new PerformanceObserver(list=>{for(const e of list.getEntries()){longTasks.push(Math.round(e.duration));if(longTasks.length>100)longTasks.shift()}}).observe({type:'longtask',buffered:true})}catch{}window.addEventListener('toolstudio:action',event=>{actions.push(event.detail);if(actions.length>50)actions.shift()});document.addEventListener('input',()=>{const start=performance.now();requestAnimationFrame(()=>{inputs.push(performance.now()-start);if(inputs.length>100)inputs.shift()})});
  const originalOpen = context.openTab;
  context.openTab = function openWorkspace(id) {
    if (!Object.hasOwn(context.views, id)) return;
    const next = context.u23Home(id), start = performance.now();
    if (next !== current) {controller.abort(); controller = new AbortController(); generation++;}
    originalOpen(id); current = context.u23Home(context.activeView);

    timings.set(current, performance.now() - start);
    window.dispatchEvent(new CustomEvent('toolstudio:workspace', {detail: {id: current, generation}}));
    return context.activeView;
  };
  const publicAPI = window.calcStudio;
  window.calcStudio = Object.freeze({...publicAPI,
    performanceDiagnostics:()=>({startupReadyMs:startup,longTasks:[...longTasks],actions:[...actions],inputFramesMs:[...inputs],workspaceSwitches:Object.fromEntries(timings),domNodes:document.querySelectorAll('*').length,heapBytes:performance.memory?.usedJSHeapSize??null,workers:context.$advanced?.jobs.status(),storageWrites:context.$advanced?.store.writes}),
    architecture: () => ({version: registry.version, categories: registry.categories.length, workspaces: registry.modules.length,
      sourceModules: registry.sourceModules, resources: resources?.status() || {mode: 'embedded'},
      current, generation, initialized: [...timings.keys()]}),
    ensureToolResources: (id, target = '') => resources ? resources.ensure(context.$requirements(context.u23Home(id), target)) : Promise.resolve(),
    modules: () => [...modules.values()].map(({id, label, category, routes}) => ({id, label, category, routes: [...routes]}))
  });
  window.addEventListener('pagehide', () => controller.abort());
}
