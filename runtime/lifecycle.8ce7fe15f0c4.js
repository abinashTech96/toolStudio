// src/core/workspace-ui.js
function installWorkspaceUI() {
  const enhanced = /* @__PURE__ */ new WeakMap();
  function searchable(select) {
    if (select.options.length < 20 || select.multiple || select.size > 1 || enhanced.has(select) || select.closest(".pdf-review")) return;
    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "studio-select-search";
    trigger.textContent = "\u2315";
    trigger.setAttribute("aria-label", "Find option for " + (select.getAttribute("aria-label") || select.labels?.[0]?.textContent.trim().slice(0, 80) || select.id || "selection"));
    const picker = document.createElement("span");
    picker.className = "studio-searchable-picker";
    select.before(picker);
    picker.append(select, trigger);
    trigger.title = "Search available choices";
    enhanced.set(select, trigger);
    trigger.onclick = () => {
      const dialog = document.createElement("dialog");
      dialog.className = "studio-dialog studio-option-dialog";
      dialog.setAttribute("aria-label", trigger.getAttribute("aria-label"));
      const title = document.createElement("h3");
      title.textContent = "Find an option";
      const search = document.createElement("input");
      search.type = "search";
      search.placeholder = "Type to filter choices";
      search.setAttribute("aria-label", "Search available options");
      const info = document.createElement("p");
      info.setAttribute("role", "status");
      const list = document.createElement("div");
      list.className = "studio-option-list";
      const next = document.createElement("button");
      next.type = "button";
      next.textContent = "Next choices";
      const close = document.createElement("button");
      close.type = "button";
      close.textContent = "Cancel";
      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        dialog.close();
        dialog.remove();
        if (select.isConnected && !select.disabled) select.focus();
        else if (trigger.isConnected) trigger.focus();
      };
      close.onclick = finish;
      let offset = 0;
      function render() {
        const term = search.value.toLocaleLowerCase(), options = [...select.options].map((o, index) => ({ o, index, label: (o.parentElement.tagName === "OPTGROUP" ? o.parentElement.label + " \xB7 " : "") + o.text })).filter((x) => x.label.toLocaleLowerCase().includes(term));
        list.replaceChildren();
        for (const { o, index, label } of options.slice(offset, offset + 80)) {
          const b = document.createElement("button");
          b.type = "button";
          b.textContent = label;
          b.disabled = select.disabled || o.disabled || o.parentElement.disabled === true;
          b.setAttribute("aria-pressed", String(index === select.selectedIndex));
          b.onclick = () => {
            if (!select.isConnected) return finish();
            select.selectedIndex = index;
            select.dispatchEvent(new Event("input", { bubbles: true }));
            select.dispatchEvent(new Event("change", { bubbles: true }));
            finish();
          };
          list.append(b);
        }
        info.textContent = options.length ? `${offset + 1}\u2013${Math.min(offset + 80, options.length)} of ${options.length} choices` : "No matching options. Change the search text.";
        next.hidden = options.length <= 80;
        next.onclick = () => {
          offset = offset + 80 >= options.length ? 0 : offset + 80;
          render();
        };
      }
      search.oninput = () => {
        offset = 0;
        render();
      };
      search.onkeydown = (e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          list.querySelector("button:not(:disabled)")?.focus();
        }
      };
      dialog.append(title, search, info, list, next, close);
      document.body.append(dialog);
      dialog.addEventListener("cancel", (event) => {
        event.preventDefault();
        finish();
      });
      dialog.addEventListener("close", finish, { once: true });
      render();
      dialog.showModal();
      search.focus();
    };
  }
  function enhance(root) {
    if (root.nodeType !== 1) return;
    if (root.matches("select")) searchable(root);
    root.querySelectorAll("select").forEach(searchable);
    if (root.closest("select")) searchable(root.closest("select"));
    for (const b of root.querySelectorAll("button")) {
      if (!b.dataset.actionKind) b.dataset.actionKind = /^(delete|discard|remove|reset|clear all)\b/i.test(b.textContent.trim()) ? "destructive" : b.dataset.primary === "true" ? "primary" : "secondary";
    }
  }
  enhance(document.body);
  const queue = /* @__PURE__ */ new Set();
  let scheduled = false;
  const observer = new MutationObserver((records) => {
    for (const record of records) for (const added of record.addedNodes) if (added.nodeType === 1) queue.add(added);
    if (scheduled || !queue.size) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      for (const e of queue) if (e.isConnected && !e.closest(".studio-option-dialog")) enhance(e);
      queue.clear();
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
  const focusBefore = /* @__PURE__ */ new WeakMap();
  document.addEventListener("beforetoggle", (event) => {
    const d = event.target;
    if (d.tagName !== "DIALOG" || d.classList.contains("studio-option-dialog")) return;
    if (event.newState === "open") focusBefore.set(d, document.activeElement);
    else {
      const previous = focusBefore.get(d);
      if (previous?.isConnected) queueMicrotask(() => previous.focus());
    }
  }, true);
  window.addEventListener("pagehide", () => observer.disconnect(), { once: true });
  const viewport = () => {
    document.documentElement.style.setProperty("--studio-visual-height", (window.visualViewport?.height || innerHeight) + "px");
    document.documentElement.style.setProperty("--studio-visual-top", (window.visualViewport?.offsetTop || 0) + "px");
    if (document.activeElement?.matches("input,textarea,select") && window.visualViewport && window.visualViewport.height < innerHeight * 0.8) requestAnimationFrame(() => document.activeElement?.scrollIntoView({ block: "nearest", inline: "nearest" }));
  };
  window.visualViewport?.addEventListener("resize", viewport);
  window.visualViewport?.addEventListener("scroll", viewport);
  window.addEventListener("resize", viewport);
  viewport();
  document.addEventListener("keydown", (event) => {
    if (document.documentElement.dataset.deviceLayout !== "tv" || event.defaultPrevented) return;
    const active = document.activeElement;
    if (active?.matches("input,textarea,select,[contenteditable=true]")) return;
    const dialog = [...document.querySelectorAll("dialog[open]")].at(-1);
    if (["BrowserBack", "GoBack"].includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();
      if (dialog) dialog.close();
      else {
        const exit = document.getElementById("u19Exit");
        if (exit && !exit.hidden) exit.click();
        else document.getElementById("homeButton")?.click();
      }
      return;
    }
    if (!active?.matches("button,summary,a,[role=tab]") || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    const box = active.getBoundingClientRect(), x = box.x + box.width / 2, y = box.y + box.height / 2, horizontal = /Left|Right/.test(event.key), sign = /Right|Down/.test(event.key) ? 1 : -1, candidates = [...(dialog || document).querySelectorAll("button:not(:disabled),summary,a[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled)")].filter((e) => e !== active && e.getClientRects().length && !e.closest("[inert]")).map((e) => {
      const r = e.getBoundingClientRect(), dx = r.x + r.width / 2 - x, dy = r.y + r.height / 2 - y, forward = (horizontal ? dx : dy) * sign, side = Math.abs(horizontal ? dy : dx);
      return { e, forward, score: forward + side * 3 };
    }).filter((r) => r.forward > 2).sort((a, b) => a.score - b.score);
    if (candidates.length) {
      event.preventDefault();
      event.stopPropagation();
      candidates[0].e.focus();
      candidates[0].e.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  }, true);
  return { enhance };
}

// src/core/catalog.js
var isEarlierWorkspace = (registry, module) => !!module.supersededBy && registry.modules.some((m) => m.id === module.supersededBy);
function navigationCatalog(registry) {
  return [
    ...registry.categories.map((category) => ({ ...category, tools: registry.modules.filter((module) => module.category === category.id).map((module) => module.id) })),
    { id: "saved", label: "My Work & Settings", tools: registry.modules.filter((module) => module.category === "shared").map((module) => module.id) }
  ];
}
function installCatalog(c, registry) {
  const groups = navigationCatalog(registry);
  const earlierModules = registry.modules.filter((m) => isEarlierWorkspace(registry, m)), earlier = new Set(earlierModules.map((m) => m.id)), earlierRoutes = new Set(earlierModules.flatMap((m) => m.routes));
  c.n28Categories = Object.fromEntries(groups.filter((group) => group.id !== "saved").map((group) => [group.id, { label: group.label, tools: group.tools.filter((id) => !earlier.has(id)) }]));
  c.n28Shared = groups.find((group) => group.id === "saved").tools;
  c.u23Catalog = Object.fromEntries(groups.map((group) => [group.id, { label: group.label, tools: [...group.tools] }]));
  c.n28HomeCategory = Object.fromEntries(groups.filter((group) => group.id !== "saved").flatMap((group) => group.tools.map((id) => [id, group.id])));
  for (const module of registry.modules) {
    c.views[module.id] = module.label;
    c.u23Homes.add(module.id);
    if (module.searchTerms) c.n28Tags[module.id] = [c.n28Tags[module.id] || module.description || module.label, ...module.searchTerms].join(" ");
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
      groups2.get(label).append(new Option(c.views[tool] + (earlier.has(tool) ? " \xB7 earlier tool" : c.u23State.hidden.includes(tool) ? " \xB7 optional" : ""), tool));
    }
    workspace.replaceChildren(fragment);
    workspace.value = home;
    workspace.setAttribute("aria-label", "Workspace or tool");
  };
  c.cs30BaseMenuApply = function() {
    for (const key of Object.keys(c.toolCategories)) delete c.toolCategories[key];
    for (const [key, group] of Object.entries(c.u23Catalog)) c.toolCategories[key] = { label: group.label, tools: group.tools.filter((id) => !earlier.has(id) && !c.u23State.hidden.includes(id)) };
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
  const manage = c.u23ManageRender;
  c.u23ManageRender = () => {
    manage();
    for (const id of earlier) {
      const input = c.$("u23Show-" + id);
      if (!input) continue;
      input.disabled = true;
      input.checked = true;
      const note = input.closest("label")?.querySelector("small");
      if (note) note.textContent = "Earlier editor \xB7 available inside Career Studio";
    }
  };
  if (typeof c.cs30ManageCount === "function") {
    const count = c.cs30ManageCount;
    c.cs30ManageCount = () => {
      count();
      c.u23ManageCount.textContent = c.u23ManageCount.textContent.replace("main workspaces", "workspaces including earlier editors");
    };
  }
  const buildIndex = c.n28BuildIndex;
  c.n28BuildIndex = () => buildIndex().filter((entry) => !earlierRoutes.has(entry.id));
  c.n28Index = null;
  c.u23MenuApply();
}

// src/core/lifecycle.js
function installLifecycle(context, registry, resources) {
  installCatalog(context, registry);
  installWorkspaceUI();
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
