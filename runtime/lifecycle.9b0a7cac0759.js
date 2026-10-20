// src/core/catalog.js
function navigationCatalog(registry) {
  return [
    ...registry.categories.map((category) => ({ ...category, tools: registry.modules.filter((module) => module.category === category.id).map((module) => module.id) })),
    { id: "saved", label: "My Work & Settings", tools: registry.modules.filter((module) => module.category === "shared").map((module) => module.id) }
  ];
}
function installCatalog(c, registry) {
  const groups = navigationCatalog(registry);
  c.n28Categories = Object.fromEntries(groups.filter((group) => group.id !== "saved").map((group) => [group.id, { label: group.label, tools: [...group.tools] }]));
  c.n28Shared = groups.find((group) => group.id === "saved").tools;
  c.u23Catalog = Object.fromEntries(groups.map((group) => [group.id, { label: group.label, tools: [...group.tools] }]));
  c.n28HomeCategory = Object.fromEntries(groups.filter((group) => group.id !== "saved").flatMap((group) => group.tools.map((id) => [id, group.id])));
  for (const module of registry.modules) {
    c.views[module.id] = module.label;
    c.u23Homes.add(module.id);
  }
  c.syncToolNavigation = function(id) {
    const home = c.u23Home(id), category = c.u23Category(id), picker = c.$("categoryPicker"), workspace = c.$("workspacePicker");
    picker.querySelector('option[value=""]')?.remove();
    picker.value = category;
    const catalog = c.toolCategories[category], ids = catalog.tools.includes(home) ? catalog.tools : [...catalog.tools, home], fragment = document.createDocumentFragment(), groups2 = /* @__PURE__ */ new Map();
    for (const tool of ids) {
      const label = c.cs30GroupLabels[tool] || catalog.label;
      if (!groups2.has(label)) {
        const group = document.createElement("optgroup");
        group.label = label;
        groups2.set(label, group);
        fragment.append(group);
      }
      groups2.get(label).append(new Option(c.views[tool] + (c.u23State.hidden.includes(tool) ? " \xB7 optional" : ""), tool));
    }
    workspace.replaceChildren(fragment);
    workspace.value = home;
    workspace.setAttribute("aria-label", "Workspace or tool");
  };
  c.cs30BaseMenuApply = function() {
    for (const key of Object.keys(c.toolCategories)) delete c.toolCategories[key];
    for (const [key, group] of Object.entries(c.u23Catalog)) c.toolCategories[key] = { label: group.label, tools: group.tools.filter((id) => !c.u23State.hidden.includes(id)) };
    c.$("categoryPicker").replaceChildren(...Object.entries(c.toolCategories).map(([key, group]) => {
      const option = new Option(group.label, key);
      option.disabled = !group.tools.length;
      return option;
    }));
    c.u23CurlShell.value = c.u23State.shell;
    c.syncToolNavigation(c.activeView);
    c.renderFavorites();
    c.renderRecents();
    if (!c.$("commandOverlay").hidden) c.renderCommands();
  };
  c.n28Index = null;
  c.u23MenuApply();
}

// src/core/lifecycle.js
function installLifecycle(context, registry, resources) {
  installCatalog(context, registry);
  const modules = new Map(registry.modules.map((module) => [module.id, module]));
  let controller = new AbortController(), current = context.u23Home(context.activeView), generation = 0;
  const timings = /* @__PURE__ */ new Map(), longTasks = [], actions = [], inputs = [];
  const startup = performance.now();
  try {
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) {
        longTasks.push(Math.round(e.duration));
        if (longTasks.length > 100) longTasks.shift();
      }
    }).observe({ type: "longtask", buffered: true });
  } catch {
  }
  window.addEventListener("toolstudio:action", (event) => {
    actions.push(event.detail);
    if (actions.length > 50) actions.shift();
  });
  document.addEventListener("input", () => {
    const start = performance.now();
    requestAnimationFrame(() => {
      inputs.push(performance.now() - start);
      if (inputs.length > 100) inputs.shift();
    });
  });
  const originalOpen = context.openTab;
  context.openTab = function openWorkspace(id) {
    if (!Object.hasOwn(context.views, id)) return;
    const next = context.u23Home(id), start = performance.now();
    if (next !== current) {
      controller.abort();
      controller = new AbortController();
      generation++;
    }
    originalOpen(id);
    current = context.u23Home(context.activeView);
    timings.set(current, performance.now() - start);
    window.dispatchEvent(new CustomEvent("toolstudio:workspace", { detail: { id: current, generation } }));
    return context.activeView;
  };
  const publicAPI = window.calcStudio;
  window.calcStudio = Object.freeze({
    ...publicAPI,
    performanceDiagnostics: () => ({ startupReadyMs: startup, longTasks: [...longTasks], actions: [...actions], inputFramesMs: [...inputs], workspaceSwitches: Object.fromEntries(timings), domNodes: document.querySelectorAll("*").length, heapBytes: performance.memory?.usedJSHeapSize ?? null, workers: context.$advanced?.jobs.status(), storageWrites: context.$advanced?.store.writes }),
    architecture: () => ({
      version: registry.version,
      categories: registry.categories.length,
      workspaces: registry.modules.length,
      sourceModules: registry.sourceModules,
      resources: resources?.status() || { mode: "embedded" },
      current,
      generation,
      initialized: [...timings.keys()]
    }),
    ensureToolResources: (id, target = "") => resources ? resources.ensure(context.$requirements(context.u23Home(id), target)) : Promise.resolve(),
    modules: () => [...modules.values()].map(({ id, label, category, routes }) => ({ id, label, category, routes: [...routes] }))
  });
  window.addEventListener("pagehide", () => controller.abort());
}
export {
  installLifecycle
};
