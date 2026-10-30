// src/core/catalog.js
var isEarlierWorkspace = (registry, module) => !!module.supersededBy && registry.modules.some((m) => m.id === module.supersededBy);

// src/core/games-launcher.js
function installGamesLauncher(c) {
  const link = document.createElement("a");
  link.id = "studioGamesButton";
  link.className = "pill";
  link.textContent = "Games";
  link.href = new URL("Calc_Studio_Games.html", location.href).href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", "Games (opens in a new tab)");
  link.onclick = () => {
    c.u21Options.open = false;
  };
  c.cs32Button.after(link);
}

// src/core/home-discovery.js
function greetingFor(date = /* @__PURE__ */ new Date()) {
  const hour = date.getHours();
  return hour < 5 || hour >= 22 ? "Good night" : hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
}
function featurePinKey(entry, normalize) {
  return entry.detail ? "detail:" + entry.id + ":" + (entry.detail.id || normalize(entry.label)) : entry.key;
}
function discoveryResults(categories, modules, features, query, normalize, rank) {
  const text = normalize(query), tokens = text.split(" ").filter(Boolean);
  if (!tokens.length) return { categories: [], tools: [], features: [] };
  const matches = (value) => tokens.every((token) => normalize(value).includes(token));
  const toolResults = modules.filter((m) => matches([m.id, m.label, m.description, ...m.searchTerms || []].join(" ")));
  const featureResults = features.filter((feature) => !feature.detail || matches(feature.label)).map((feature) => ({ feature, rank: rank(feature, text, tokens) })).filter((item) => item.rank >= 0).sort((a, b) => b.rank - a.rank).map((item) => item.feature);
  return {
    categories: categories.filter((c) => matches(c.label + " " + c.id)),
    tools: toolResults.sort((a, b) => Number(normalize(b.label) === text) - Number(normalize(a.label) === text)),
    features: featureResults
  };
}

// src/core/home-state.js
function displayVersion(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);
  if (!match) return "v35.00";
  return "v" + match[1] + "." + match[2].padStart(2, "0") + (Number(match[3]) ? "." + match[3] : "");
}
function fileTargets(file) {
  if (!file || typeof file.name !== "string" || !Number.isFinite(file.size) || file.size < 0 || file.size > 20 * 1048576) throw Error("Choose one file up to 20 MiB.");
  const extension = file.name.split(".").at(-1).toLowerCase();
  const json = { route: "jsonformatter", input: "jsonFile", label: "JSON Formatter" }, table = { route: "dataworkbench", input: "dwFile", label: "Data Workbench" }, log = { route: "logs", input: "logFiles", label: "Apex Log Analyzer" }, text = { route: "characters", input: "charFile", label: "Text Toolkit" };
  if (extension === "json") return [json, table];
  if (["csv", "tsv", "xlsx", "xls", "ods"].includes(extension)) return [table];
  if (extension === "pdf") return [{ route: "pdf", input: "pdfFiles", label: "PDF Workspace" }];
  if (["png", "jpg", "jpeg", "webp", "gif", "bmp"].includes(extension)) return [{ route: "camerastudio", input: "ciFile", label: "Camera & Image Studio" }];
  if (extension === "log") return [log, text];
  if (extension === "txt") return [text, json, log];
  throw Error("Use JSON, CSV, TSV, spreadsheets, PDF, images, TXT or LOG files.");
}

// src/core/home-extras.js
function installHomeExtras({ c, registry, options, home, personal, browse, footer, search, grid, render }) {
  const node = (tag, text, className) => {
    const e = document.createElement(tag);
    if (text !== void 0) e.textContent = text;
    if (className) e.className = className;
    return e;
  };
  const button = (label, run, className = "home-chip") => {
    const e = node("button", label, className);
    e.type = "button";
    e.onclick = run;
    return e;
  };
  let inputRevision = 0, navigationRevision = 0;
  document.addEventListener("input", () => inputRevision++, true);
  const api = c.$advanced.api, prefs = () => api.homePreferences(), save = (change, immediate = true) => {
    try {
      api.saveHomePreferences({ ...prefs(), ...change }, { immediate });
      return true;
    } catch (e) {
      c.toast(e.message);
      return false;
    }
  };
  const version = displayVersion(registry.appVersion || "35.0.0");
  document.title = "ToolStudio \u2014 " + version;
  const openGuide = (fragment = "") => {
    if (options.guideHTML) {
      const url = URL.createObjectURL(new Blob([options.guideHTML], { type: "text/html" }));
      window.open(url + fragment, "_blank", "noopener");
      setTimeout(() => URL.revokeObjectURL(url), 6e4);
    } else window.open(new URL("./guide.html" + fragment, location.href), "_blank", "noopener");
  };
  const guide = button("Guide", () => openGuide());
  footer.append(button("What\u2019s new", () => openGuide("#edition48")));
  const headerGuide = c.$("u18GuideOpen");
  headerGuide?.addEventListener("click", (event) => {
    if (document.body.dataset.home === "true") {
      event.preventDefault();
      event.stopImmediatePropagation();
      guide.click();
    }
  }, true);
  guide.id = "homeGuide";
  guide.setAttribute("aria-label", "Open guide");
  const actions = node("div", void 0, "home-hero-actions");
  const versionLabel = node("span", version, "home-version");
  versionLabel.title = "Application version " + (registry.appVersion || "35.0.0");
  actions.append(guide, versionLabel);
  home.querySelector(".home-hero").append(actions);
  const tasks = node("section", void 0, "home-task-shortcuts");
  tasks.setAttribute("aria-label", "Task shortcuts");
  for (const [label, id] of [["Format JSON", "jsonformatter"], ["Analyze Apex log", "logs"], ["Compare files", "excel"], ["Calculate EMI", "tools"]]) tasks.append(button(label, () => {
    if (id === "tools") c.n28FeatureOpen(c.n28Entry("home:task:emi", "tools", "Loan / EMI", "", { loan: true }));
    else c.openTab(id);
  }));
  personal.after(tasks);
  const drop = node("section", void 0, "home-drop"), dropTitle = node("h2", "Drop a file to begin"), file = node("input");
  file.type = "file";
  file.id = "homeFile";
  file.accept = ".json,.csv,.tsv,.xlsx,.xls,.ods,.pdf,.png,.jpg,.jpeg,.webp,.gif,.bmp,.txt,.log";
  file.hidden = true;
  const choose = button("Choose file", () => file.click()), fileStatus = node("p", "JSON, spreadsheets, PDF, images or logs \xB7 up to 20 MiB", "home-file-status");
  fileStatus.setAttribute("role", "status");
  const review = node("div", void 0, "home-file-review"), target = node("select"), targetLabel = node("label", "Open with");
  target.id = "homeFileTarget";
  targetLabel.htmlFor = target.id;
  let pendingFile, targets = [], ticket = 0, busy = false;
  const clear = () => {
    ticket++;
    pendingFile = null;
    targets = [];
    file.value = "";
    review.hidden = true;
    fileStatus.textContent = "JSON, spreadsheets, PDF, images or logs \xB7 up to 20 MiB";
  };
  const open = button("Open selected file", async () => {
    if (busy || !pendingFile) return;
    const selected = pendingFile, chosen = targets[Number(target.value)], token = ++ticket;
    if (!confirm("Open " + selected.name + " in " + chosen.label + "? This replaces that tool\u2019s current file or input.")) return;
    busy = true;
    open.disabled = true;
    try {
      c.openTab(chosen.route);
      const navigation = navigationRevision, revision = inputRevision;
      await window.calcStudio.ensureToolResources(chosen.route, chosen.input);
      if (token !== ticket || pendingFile !== selected) return;
      if (navigation !== navigationRevision || revision !== inputRevision || c.activeView !== chosen.route || document.body.dataset.home === "true") {
        fileStatus.textContent = "Inputs or workspace changed. Review the file and open again.";
        return;
      }
      const input = c.$(chosen.input);
      if (!input) throw Error("This file input is unavailable. Open the file from inside the tool.");
      const transfer = new DataTransfer();
      transfer.items.add(selected);
      input.files = transfer.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
      clear();
    } catch (e) {
      fileStatus.textContent = e.message;
      c.toast(e.message);
    } finally {
      busy = false;
      open.disabled = false;
    }
  });
  open.id = "homeFileOpen";
  review.append(targetLabel, target, open, button("Cancel file", clear));
  review.hidden = true;
  drop.append(dropTitle, choose, file, fileStatus, review);
  tasks.after(drop);
  const accept = (files) => {
    clear();
    const drawer = drop.closest(".home-auxiliary");
    if (drawer) drawer.open = true;
    try {
      if (files.length !== 1) throw Error("Choose one file at a time.");
      targets = fileTargets(files[0]);
      pendingFile = files[0];
      target.replaceChildren(...targets.map((t, i) => new Option(t.label, String(i))));
      fileStatus.textContent = pendingFile.name + " \xB7 " + Math.ceil(pendingFile.size / 1024) + " KiB. Choose a tool to open it.";
      review.hidden = false;
    } catch (e) {
      fileStatus.textContent = e.message;
    }
  };
  file.onchange = () => accept([...file.files]);
  target.onchange = () => ticket++;
  drop.ondragover = (e) => {
    if (e.dataTransfer?.types.includes("Files")) {
      e.preventDefault();
      drop.classList.add("home-dragover");
    }
  };
  drop.ondragleave = () => drop.classList.remove("home-dragover");
  drop.ondrop = (e) => {
    e.preventDefault();
    drop.classList.remove("home-dragover");
    accept([...e.dataTransfer.files]);
  };
  const projects = node("section", void 0, "home-projects"), projectList = node("div", void 0, "home-project-list");
  projects.append(node("h2", "Recent saved projects"), projectList);
  footer.before(projects);
  const custom = node("details", void 0, "home-customize"), summary = node("summary", "Personalize Home"), customBody = node("div");
  custom.append(summary, customBody);
  footer.before(custom);
  const personalize = button("Personalize Home", () => {
    custom.open = !custom.open;
    if (custom.open) {
      custom.scrollIntoView({ block: "nearest" });
      summary.focus();
    }
  });
  footer.append(personalize);
  const status = node("span", void 0, "home-network-status"), update = button("Update ready", () => document.querySelector(".a35-update button")?.click());
  update.hidden = true;
  footer.firstElementChild.replaceWith(node("span", version, "home-footer-version"));
  footer.prepend(status);
  footer.append(update);
  const statusUpdate = () => {
    status.textContent = location.protocol === "file:" ? "Standalone \xB7 offline ready" : navigator.onLine ? "Online" + (navigator.serviceWorker?.controller ? " \xB7 offline cache active" : "") : "Offline \xB7 previously loaded tools available";
  };
  for (const type of ["online", "offline"]) window.addEventListener(type, statusUpdate);
  navigator.serviceWorker?.addEventListener("controllerchange", statusUpdate);
  window.addEventListener("toolstudio:update", () => {
    update.hidden = false;
  });
  statusUpdate();
  function renderProjects() {
    const snapshots = [...c.v12State.snapshots || []].sort((a, b) => Date.parse(b.updatedAt || b.createdAt) - Date.parse(a.updatedAt || a.createdAt)).slice(0, 3);
    projectList.replaceChildren();
    projects.hidden = !snapshots.length;
    for (const snap of snapshots) {
      const row = node("article"), date = new Date(snap.updatedAt || snap.createdAt), tools = Object.keys(snap.tools).map((id) => c.views[id] || id).slice(0, 3).join(", ");
      row.append(node("strong", snap.name), node("small", tools + " \xB7 " + (Number.isFinite(date.getTime()) ? date.toLocaleDateString() : "Saved snapshot")), button("Review " + snap.name, () => {
        c.openTab("projectworkspaces");
        c.$("wsSaved").value = snap.id;
        c.$("wsSaved").dispatchEvent(new Event("change", { bubbles: true }));
        c.$("wsSaved").focus();
      }));
      projectList.append(row);
    }
  }
  const orderedCategories = () => {
    const map = new Map(registry.categories.map((x) => [x.id, x]));
    return [...prefs().categories, ...registry.categories.map((x) => x.id)].filter((id, i, all) => all.indexOf(id) === i && map.has(id)).map((id) => map.get(id));
  };
  function renderCustomize() {
    customBody.replaceChildren(node("p", "Pin workspaces with the star on each card. Move favorites and categories into your preferred order."));
    for (const [kind, ids] of [["favorites", [...c.favorites]], ["categories", orderedCategories().map((x) => x.id)], ["pinnedCategories", prefs().pinnedCategories || []], ["pinnedFeatures", prefs().pinnedFeatures || []]]) {
      const list = node("div", void 0, "home-order-list");
      list.append(node("h3", { favorites: "Favorite tools", categories: "Categories", pinnedCategories: "Favorite categories", pinnedFeatures: "Favorite features" }[kind]));
      for (const [id, index] of ids.map((id2, index2) => [id2, index2])) {
        const label = kind === "favorites" ? c.views[id] : kind === "pinnedFeatures" ? c.n28GetIndex().find((e) => featurePinKey(e, c.n28Normalize) === id)?.label || { "home:emi": "Loan / EMI" }[id] : registry.categories.find((x) => x.id === id)?.label;
        if (!label) continue;
        const row = node("div");
        row.append(node("span", label));
        for (const [delta, word] of [[-1, "earlier"], [1, "later"]]) {
          const move = button("Move " + label + " " + word, () => {
            const next = [...ids];
            [next[index], next[index + delta]] = [next[index + delta], next[index]];
            let saved;
            if (kind !== "favorites") saved = save({ [kind]: next });
            else {
              saved = c.csPersist("calc-studio-favorites", next);
              if (saved) {
                c.favorites = next;
                c.renderFavorites();
              }
            }
            if (saved) {
              render();
              (customBody.querySelector('[data-order="' + kind + "-" + (index + delta) + "-" + delta + '"]:not([disabled])') || customBody.querySelector('[data-order="' + kind + "-" + (index + delta) + "-" + -delta + '"]'))?.focus();
            }
          });
          move.dataset.order = kind + "-" + index + "-" + delta;
          move.textContent = delta < 0 ? "\u2191" : "\u2193";
          move.setAttribute("aria-label", "Move " + label + " " + word);
          move.disabled = index + delta < 0 || index + delta >= ids.length;
          row.append(move);
        }
        list.append(row);
      }
      customBody.append(list);
    }
    const recent = node("label"), showRecent = node("input");
    showRecent.type = "checkbox";
    showRecent.checked = prefs().showRecent !== false;
    showRecent.onchange = () => {
      if (save({ showRecent: showRecent.checked })) render();
    };
    recent.append(showRecent, document.createTextNode("Show recent work"));
    customBody.append(recent);
    customBody.append(button("Reset category order", () => {
      if (save({ categories: [] })) render();
    }), button("Reset Home layout", () => {
      if (save({ categories: [], view: "grid", showRecent: true })) render();
    }));
  }
  const keydown = (e) => {
    if (document.body.dataset.home !== "true" || e.altKey || e.ctrlKey || e.metaKey || e.isComposing) return;
    const editing = e.target.closest?.("input,textarea,select,[contenteditable=true]");
    if (e.key === "/" && !editing) {
      e.preventDefault();
      search.focus();
      return;
    }
    const buttons = [...grid.querySelectorAll(".home-tool-open,.home-result-category")], index = buttons.indexOf(document.activeElement);
    if ((document.activeElement === search || index >= 0) && ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key) && buttons.length) {
      e.preventDefault();
      buttons[Math.max(0, Math.min(buttons.length - 1, index + (e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 1)))].focus();
    } else if (index >= 0 && e.key === "Escape") {
      e.preventDefault();
      search.focus();
    }
  };
  document.addEventListener("keydown", keydown);
  const header = document.querySelector(".top");
  if (globalThis.ResizeObserver) {
    new ResizeObserver(() => home.style.setProperty("--home-header-height", header.getBoundingClientRect().height + "px")).observe(header);
  }
  return {
    categories: orderedCategories,
    remember(id) {
      navigationRevision++;
      if (prefs().lastTool !== id) save({ lastTool: id }, false);
    },
    renderPersonal() {
      const id = prefs().lastTool;
      if (id && Object.hasOwn(c.views, id)) {
        const section = node("section", void 0, "home-continue");
        section.append(node("h2", "Continue working"), button(c.views[id], () => c.openTab(id)));
        personal.prepend(section);
      }
    },
    render() {
      renderProjects();
      renderCustomize();
      statusUpdate();
    }
  };
}

// src/core/home.js
function installHome(c, registry, options = {}) {
  installGamesLauncher(c);
  const node = (tag, text, className) => {
    const e = document.createElement(tag);
    if (text !== void 0) e.textContent = text;
    if (className) e.className = className;
    return e;
  };
  const button = (text, run, className = "home-chip") => {
    const e = node("button", text, className);
    e.type = "button";
    e.onclick = run;
    return e;
  };
  const categories = new Map(registry.categories.map((cat) => [cat.id, cat]));
  const modules = new Map(registry.modules.map((mod) => [mod.id, mod]));
  const owners = new Map(registry.modules.flatMap((mod) => mod.routes.map((id) => [id, mod])));
  const categoryLabel = (id) => categories.get(id)?.label || "My Work & Settings";
  const symbols = { math: "\u2211", json: "{}", developer: "</>", media: "\u25E9", finance: "%", productivity: "\u2713", text: "Aa", career: "\u2197", research: "\u2315", systems: "\u2318", testing: "\u2299", saved: "\u2606" };
  const summaries = { math: "Calculate, solve, graph and convert.", json: "Shape data and compare changes.", developer: "Build, inspect and automate.", media: "Edit images, documents and media.", finance: "Explore loans and everyday costs.", productivity: "Organize tasks, time and decisions.", text: "Write, transform and preview text.", career: "Prepare your next professional step.", research: "Collect sources and connect ideas.", systems: "Model systems and dependencies.", testing: "Plan tests and review coverage.", saved: "Projects and personal settings." };
  const savedFavorites = c.storage.get("calc-studio-favorites", c.favorites);
  if (Array.isArray(savedFavorites)) {
    c.favorites = [...new Set(savedFavorites)].filter((id) => typeof id === "string" && Object.hasOwn(c.views, id));
    c.renderFavorites();
  }
  const prefs = () => c.$advanced.api.homePreferences();
  const save = (change) => {
    try {
      c.$advanced.api.saveHomePreferences({ ...prefs(), ...change });
      return true;
    } catch (e) {
      c.toast(e.message);
      return false;
    }
  };
  let category = "", expanded = false, visible = false, clockTimer, resizeFrame, categorySignature = "";
  let limits = { categories: 24, tools: 24, features: 24 };
  let featureDrawer = null, featureSequence = 0;
  const home = node("section", void 0, "studio-home");
  home.id = "studioHome";
  home.hidden = true;
  home.setAttribute("aria-labelledby", "homeTitle");
  const hero = node("div", void 0, "home-hero"), intro = node("div");
  intro.append(node("p", "WELCOME TO TOOLSTUDIO", "home-eyebrow"));
  const title = node("h1", greetingFor());
  title.id = "homeTitle";
  title.tabIndex = -1;
  const clock = node("p", "", "home-local-time");
  clock.id = "homeLocalTime";
  intro.append(title, node("p", "A little space for everything you do.", "home-intro"), clock);
  hero.append(intro);
  home.append(hero);
  const searchBox = node("div", void 0, "home-search-box"), searchLabel = node("label", "Find a tool or a feature");
  searchLabel.htmlFor = "homeSearch";
  const searchRow = node("div", void 0, "home-search-row"), search = node("input");
  search.id = "homeSearch";
  search.type = "search";
  search.placeholder = "Search categories, tools and features\u2026";
  search.autocomplete = "off";
  search.setAttribute("aria-controls", "homeResults");
  const clearSearch = () => {
    search.value = "";
    limits = { categories: 24, tools: 24, features: 24 };
    render();
    search.focus();
  };
  searchRow.append(search, button("Clear", clearSearch, "home-clear"));
  searchBox.append(searchLabel, searchRow, node("small", "Try \u201CSOQL\u201D, \u201Cimage resize\u201D or \u201CEMI\u201D \xB7 Press / to search", "home-search-help"));
  home.append(searchBox);
  const favorites = node("section", void 0, "home-favorites");
  favorites.setAttribute("aria-label", "Favorites");
  home.append(favorites);
  const personal = node("div", void 0, "home-personal");
  home.append(personal);
  const browse = node("section", void 0, "home-browse"), browseHeading = node("div", void 0, "home-section-heading"), browseTitle = node("div");
  browseTitle.append(node("h2", "Explore your categories"), node("p", "Choose a tile to discover its tools.", "home-count"));
  const browseActions = node("div", void 0, "home-browse-actions"), optionalLabel = node("label", void 0, "home-optional"), optional = node("input");
  optional.type = "checkbox";
  optional.id = "homeOptional";
  optionalLabel.append(optional, document.createTextNode("Include optional tools"));
  browseActions.append(optionalLabel, button("All tools", () => {
    search.value = "";
    category = "";
    expanded = true;
    render();
  }));
  browseHeading.append(browseTitle, browseActions);
  const categoryGrid = node("div", void 0, "home-category-grid");
  browse.append(browseHeading, categoryGrid);
  home.append(browse);
  const results = node("section", void 0, "home-results");
  results.id = "homeResults";
  results.hidden = true;
  results.setAttribute("aria-labelledby", "homeResultTitle");
  const resultsHeading = node("div", void 0, "home-section-heading"), resultTitle = node("h2");
  resultTitle.id = "homeResultTitle";
  resultTitle.tabIndex = -1;
  const resultActions = node("div", void 0, "home-result-actions"), views = node("div", void 0, "home-view-controls");
  views.setAttribute("role", "group");
  views.setAttribute("aria-label", "Tool display");
  for (const [value, label] of [["grid", "Grid"], ["list", "List"]]) {
    const control = button(label, () => {
      if (save({ view: value })) {
        applyView();
        control.focus();
      }
    });
    control.dataset.view = value;
    views.append(control);
  }
  const closeCategory = button("Close", () => {
    const id = category;
    category = "";
    expanded = false;
    render();
    categoryGrid.querySelector('.home-category[data-category="' + CSS.escape(id) + '"]')?.focus();
  });
  resultActions.append(views, closeCategory);
  resultsHeading.append(resultTitle, resultActions);
  const count = node("p", "", "home-count");
  count.setAttribute("role", "status");
  count.setAttribute("aria-live", "polite");
  const grid = node("div", void 0, "home-tool-grid");
  results.append(resultsHeading, count, grid);
  home.append(results);
  const footer = node("div", void 0, "home-footer");
  footer.append(node("span", "Your tools. Your pace."), button("Saved projects", () => c.openTab("projectworkspaces")), button("Manage tools", () => c.u23ManageButton.click()));
  for (const [label, href] of [["Connection", "./connections/index.html"], ["Games", "./games/index.html"]]) {
    const link = node("a", label, "home-chip");
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener";
    footer.append(link);
  }
  home.append(footer);
  document.querySelector(".main-card").prepend(home);
  const homeButton = button("Home", () => showHome(true), "pill home-button");
  homeButton.id = "homeButton";
  document.querySelector(".brand").after(homeButton);
  const extras = installHomeExtras({ c, registry, options, home, personal, browse, footer, search, grid, render });
  const auxiliary = node("details", void 0, "home-auxiliary");
  auxiliary.append(node("summary", "Recent work, quick actions & files"));
  auxiliary.append(personal, home.querySelector(".home-task-shortcuts"), home.querySelector(".home-drop"), home.querySelector(".home-projects"));
  footer.before(auxiliary);
  footer.append(button("Open a file", () => {
    auxiliary.open = true;
    home.querySelector("#homeFile").click();
  }));
  home.addEventListener("dragenter", (event) => {
    if (event.dataTransfer?.types.includes("Files")) auxiliary.open = true;
  });
  function availableModules() {
    return registry.modules.filter((mod) => !isEarlierWorkspace(registry, mod) && (optional.checked || !c.u23IsExtra(mod.id)));
  }
  function availableFeatures(includeOptional = optional.checked) {
    const list = c.n28GetIndex().filter((e) => !e.root && (!modules.has(e.id) || e.key !== "tool:" + e.id) && (includeOptional || !c.u23IsExtra(e.id)));
    list.unshift(c.n28Entry("home:emi", "tools", "Loan / EMI", "calculate emi calculator loan repayment", { loan: true }));
    return list;
  }
  function launch(entry) {
    if (entry.feature) c.n28FeatureOpen(entry.feature);
    else c.openTab(entry.id);
  }
  function animateReveal(element) {
    element.getAnimations?.().forEach((a) => a.cancel());
    if (!visible || c.u19Motion() !== "full" || matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    element.animate?.([{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 150, easing: "cubic-bezier(.2,.8,.2,1)" });
  }
  function animateContent() {
    animateReveal(grid);
  }
  function pinControl(kind, id, label) {
    const current = () => kind === "tool" ? c.favorites : prefs()[kind === "category" ? "pinnedCategories" : "pinnedFeatures"] || [];
    const star = button("", () => {
      const next = current().includes(id) ? current().filter((key) => key !== id) : [...current(), id];
      let saved;
      if (kind === "tool") {
        saved = c.csPersist("calc-studio-favorites", next);
        if (saved) {
          c.favorites = next;
          c.renderFavorites();
        }
      } else saved = save({ [kind === "category" ? "pinnedCategories" : "pinnedFeatures"]: next });
      if (saved) {
        update();
        renderFavorites();
        extras.render();
      }
    }, "home-star");
    function update() {
      const pinned = current().includes(id);
      star.textContent = pinned ? "\u2605" : "\u2606";
      star.setAttribute("aria-pressed", String(pinned));
      star.setAttribute("aria-label", (pinned ? "Remove " : "Add ") + label + (pinned ? " from favorites" : " to favorites"));
    }
    update();
    return star;
  }
  function toolCard(entry) {
    const card = node("article", void 0, "home-tool-card");
    card.dataset.tool = entry.id;
    card.dataset.kind = entry.feature ? "feature" : "tool";
    const open = button("", () => launch(entry), "home-tool-open");
    if (!category || search.value.trim()) open.append(node("small", categoryLabel(entry.category)));
    open.append(node("strong", entry.label));
    const description = entry.description || c.studioDescription(entry.id) || "";
    const generic = description.replace(/\.$/, "") === entry.label + " advanced workspace" || description.replace(/\.$/, "") === entry.label + " \xB7 local interactive workspace";
    if (description && !generic) {
      open.append(node("span", description));
      open.title = description;
    }
    card.append(open, pinControl(entry.feature ? "feature" : "tool", entry.feature ? featurePinKey(entry.feature, c.n28Normalize) : entry.id, entry.label));
    if (!entry.feature) {
      const mod = modules.get(entry.id), features = availableFeatures().filter((e) => mod?.routes.includes(e.id));
      if (features.length) {
        const detail = node("details", void 0, "home-tool-features"), summary = node("summary", features.length + " features"), drawer = node("section", void 0, "home-feature-drawer"), list = node("div", void 0, "home-feature-list");
        drawer.id = "homeFeatures-" + ++featureSequence;
        const heading = node("div", void 0, "home-feature-heading"), headingTitle = node("h3", entry.label + " features");
        headingTitle.id = drawer.id + "-title";
        drawer.setAttribute("aria-labelledby", headingTitle.id);
        heading.append(headingTitle, button("Close features", () => {
          detail.open = false;
          summary.focus({ preventScroll: true });
        }));
        list.tabIndex = 0;
        list.setAttribute("role", "group");
        list.setAttribute("aria-label", entry.label + " features");
        drawer.append(heading, list);
        detail.append(summary);
        summary.addEventListener("keydown", (event) => {
          if (event.key === "ArrowDown" && detail.open) {
            event.preventDefault();
            event.stopPropagation();
            list.querySelector("button")?.focus();
          }
        });
        drawer.addEventListener("keydown", (event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            detail.open = false;
            summary.focus({ preventScroll: true });
          }
        });
        detail.addEventListener("toggle", () => {
          if (detail.open && detail.isConnected) {
            if (featureDrawer?.detail !== detail) closeFeatureDrawer();
            if (!list.childElementCount) for (const feature of features) list.append(featureRow(feature));
            featureDrawer = { detail, drawer, list, card };
            placeFeatureDrawer();
            summary.setAttribute("aria-controls", drawer.id);
            animateReveal(list);
          } else {
            summary.removeAttribute("aria-controls");
            list.getAnimations?.().forEach((a) => a.cancel());
            drawer.remove();
            if (featureDrawer?.detail === detail) featureDrawer = null;
          }
        });
        card.append(detail);
      }
    }
    return card;
  }
  function featureRow(feature) {
    const row = node("div", void 0, "home-feature-row");
    row.append(button(feature.label, () => c.n28FeatureOpen(feature)), pinControl("feature", featurePinKey(feature, c.n28Normalize), feature.label));
    return row;
  }
  function renderFavorites() {
    favorites.replaceChildren();
    const heading = node("div", void 0, "home-section-heading");
    heading.append(node("h2", "Your favorites"), node("small", "Tools \xB7 categories \xB7 features"));
    favorites.append(heading);
    const row = node("div", void 0, "home-quick-links");
    function append(label, kind, run, remove) {
      const item = node("span", void 0, "home-favorite-item"), open = button("", run);
      open.append(node("span", label));
      open.setAttribute("aria-label", label);
      open.setAttribute("aria-description", kind);
      const unpin = button("\xD7", remove, "home-unpin");
      unpin.setAttribute("aria-label", "Unpin " + label);
      item.append(node("small", kind), open, unpin);
      row.append(item);
    }
    function removed() {
      render();
      favorites.querySelector("button")?.focus();
    }
    for (const id of c.favorites) if (owners.has(id)) append(c.views[id] || modules.get(id)?.label || id, "Tool", () => c.openTab(id), () => {
      const next = c.favorites.filter((value) => value !== id);
      if (c.csPersist("calc-studio-favorites", next)) {
        c.favorites = next;
        c.renderFavorites();
        removed();
      }
    });
    for (const id of prefs().pinnedCategories || []) if (categories.has(id)) append(categories.get(id).label, "Category", () => selectCategory(id), () => {
      if (save({ pinnedCategories: prefs().pinnedCategories.filter((value) => value !== id) })) removed();
    });
    const features = new Map(availableFeatures(true).map((e) => [featurePinKey(e, c.n28Normalize), e]));
    for (const id of prefs().pinnedFeatures || []) if (features.has(id)) append(features.get(id).label, "Feature", () => c.n28FeatureOpen(features.get(id)), () => {
      if (save({ pinnedFeatures: prefs().pinnedFeatures.filter((value) => value !== id) })) removed();
    });
    favorites.append(row.childElementCount ? row : node("p", "Use \u2606 on a category, tool or feature to keep it here.", "home-count"));
  }
  function renderPersonal() {
    personal.replaceChildren();
    const entries = [...new Set(c.recentTools)].filter((id) => owners.has(id)).slice(0, 6);
    if (entries.length) {
      const section = node("section"), row = node("div", void 0, "home-quick-links");
      section.append(node("h2", "Recently opened"));
      for (const id of entries) row.append(button(c.views[id], () => c.openTab(id)));
      section.append(row);
      personal.append(section);
    }
    extras.renderPersonal();
    personal.hidden = prefs().showRecent === false;
  }
  function selectCategory(id) {
    search.value = "";
    expanded = false;
    category = category === id ? "" : id;
    render();
    categoryGrid.querySelector('.home-category[data-category="' + CSS.escape(id) + '"]')?.focus({ preventScroll: true });
    animateContent();
  }
  function renderCategories() {
    const list = extras.categories(), signature = list.map((cat) => cat.id).join("|") + ":" + optional.checked + ":" + (prefs().pinnedCategories || []).join("|");
    if (signature !== categorySignature) {
      categorySignature = signature;
      categoryGrid.replaceChildren();
      for (const cat of list) {
        const item = node("div", void 0, "home-category-tile");
        item.dataset.categoryTile = cat.id;
        const card = button("", () => selectCategory(cat.id), "home-category");
        card.id = "homeCategory-" + cat.id;
        card.title = summaries[cat.id] || "Explore this category.";
        card.dataset.category = cat.id;
        card.setAttribute("aria-controls", "homeResults");
        const available = availableModules().filter((mod) => mod.category === cat.id).length;
        const icon = node("span", symbols[cat.id] || "\u25C7", "home-category-icon");
        icon.setAttribute("aria-hidden", "true");
        card.append(icon, node("strong", cat.label), node("small", available + " tool" + (available === 1 ? "" : "s")), node("p", summaries[cat.id] || "Explore this category."));
        item.append(card, pinControl("category", cat.id, cat.label));
        categoryGrid.append(item);
      }
    }
    for (const card of categoryGrid.querySelectorAll(".home-category")) {
      const selected = category === card.dataset.category && !search.value.trim();
      card.setAttribute("aria-pressed", String(selected));
      card.setAttribute("aria-expanded", String(selected));
    }
  }
  function placeResults() {
    if (search.value.trim()) {
      searchBox.after(results);
      return;
    }
    if (!category) {
      browse.after(results);
      return;
    }
    const tiles = [...categoryGrid.querySelectorAll(".home-category-tile")], index = tiles.findIndex((tile) => tile.dataset.categoryTile === category);
    if (index < 0) return;
    const columns = getComputedStyle(categoryGrid).gridTemplateColumns.split(" ").length, rowEnd = Math.min(tiles.length - 1, Math.floor(index / columns) * columns + columns - 1);
    if (tiles[rowEnd].nextElementSibling !== results) {
      const focus = results.contains(document.activeElement) ? document.activeElement : null;
      tiles[rowEnd].after(results);
      focus?.focus({ preventScroll: true });
    }
  }
  function closeFeatureDrawer() {
    if (!featureDrawer) return;
    const previous = featureDrawer;
    featureDrawer = null;
    previous.list.getAnimations?.().forEach((a) => a.cancel());
    previous.detail.querySelector("summary").removeAttribute("aria-controls");
    previous.drawer.remove();
    previous.detail.open = false;
  }
  function placeFeatureDrawer() {
    if (!featureDrawer) return;
    const { card, drawer, list } = featureDrawer, host = card.parentElement;
    if (!host || !card.isConnected) {
      closeFeatureDrawer();
      return;
    }
    const cards = [...host.children].filter((child) => child.classList.contains("home-tool-card")), index = cards.indexOf(card), columns = getComputedStyle(host).gridTemplateColumns.split(" ").length;
    if (index < 0) return;
    const last = cards[Math.min(cards.length - 1, Math.floor(index / columns) * columns + columns - 1)];
    if (last.nextElementSibling !== drawer) {
      const focus = drawer.contains(document.activeElement) ? document.activeElement : null, top = list.scrollTop;
      last.after(drawer);
      list.scrollTop = top;
      focus?.focus({ preventScroll: true });
    }
  }
  function applyView() {
    grid.dataset.view = prefs().view || "grid";
    for (const control of views.children) control.setAttribute("aria-pressed", String(control.dataset.view === grid.dataset.view));
    placeFeatureDrawer();
  }
  function renderSearch() {
    const found = discoveryResults(extras.categories(), availableModules(), availableFeatures(), search.value, c.n28Normalize, c.n28Rank), total = found.categories.length + found.tools.length + found.features.length;
    count.textContent = total + " results \xB7 " + found.categories.length + " categories \xB7 " + found.tools.length + " tools \xB7 " + found.features.length + " features";
    grid.replaceChildren();
    grid.classList.add("home-grouped-results");
    for (const [kind, label] of [["categories", "Categories"], ["tools", "Tools"], ["features", "Features"]]) {
      const entries = found[kind];
      if (!entries.length) continue;
      const section = node("section", void 0, "home-search-group");
      section.dataset.group = kind;
      section.append(node("h3", label + " (" + entries.length + ")"));
      const list = node("div", void 0, "home-group-items");
      for (const entry of entries.slice(0, limits[kind])) {
        if (kind === "categories") {
          const card = node("article", void 0, "home-tool-card");
          card.append(button(entry.label, () => selectCategory(entry.id), "home-result-category"), pinControl("category", entry.id, entry.label));
          list.append(card);
        } else if (kind === "tools") list.append(toolCard(entry));
        else {
          const mod = owners.get(entry.id);
          list.append(toolCard({ id: entry.id, label: entry.label, category: mod?.category, description: mod?.label || "Workspace", feature: entry }));
        }
      }
      section.append(list);
      if (entries.length > limits[kind]) section.append(button("Show more " + label.toLowerCase(), () => {
        const previous = limits[kind];
        limits[kind] += 24;
        renderSearch();
        grid.querySelector('[data-group="' + kind + '"] .home-group-items')?.children[previous]?.querySelector("button")?.focus({ preventScroll: true });
      }, "home-more"));
      grid.append(section);
    }
    if (!total) {
      const empty = node("div", void 0, "home-empty");
      empty.append(node("h3", "No tools found"), node("p", "Try a shorter search or include optional tools."), button("Reset filters", () => {
        optional.checked = false;
        clearSearch();
      }));
      grid.append(empty);
    }
  }
  function render() {
    closeFeatureDrawer();
    renderFavorites();
    renderPersonal();
    renderCategories();
    const searching = !!search.value.trim();
    const optionalHost = searching ? resultActions : browseActions;
    if (optionalLabel.parentElement !== optionalHost) optionalHost.prepend(optionalLabel);
    browse.hidden = searching;
    results.hidden = !searching && !category && !expanded;
    closeCategory.hidden = searching;
    resultTitle.textContent = searching ? "Search results" : category ? categoryLabel(category) : "All tools";
    if (searching) renderSearch();
    else {
      grid.classList.remove("home-grouped-results");
      const entries = availableModules().filter((mod) => !category || mod.category === category);
      grid.replaceChildren(...!results.hidden ? entries.map(toolCard) : []);
      count.textContent = entries.length + " workspaces";
      if (!results.hidden && !entries.length) grid.append(node("p", "Enable optional tools to explore this category.", "home-count"));
    }
    placeResults();
    applyView();
    homeButton.setAttribute("aria-current", visible ? "page" : "false");
    extras.render();
  }
  function updateClock() {
    clearTimeout(clockTimer);
    if (!visible || document.hidden) return;
    const now = /* @__PURE__ */ new Date();
    title.textContent = greetingFor(now);
    clock.textContent = new Intl.DateTimeFormat(void 0, { weekday: "long", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(now) + " \xB7 " + Intl.DateTimeFormat().resolvedOptions().timeZone;
    clockTimer = setTimeout(updateClock, 6e4 - now.getSeconds() * 1e3 - now.getMilliseconds());
  }
  function address(id) {
    const url = new URL(location.href);
    url.hash = new URLSearchParams({ tool: id }).toString();
    try {
      history.pushState(null, "", url);
    } catch {
      try {
        if (location.hash !== url.hash) location.hash = url.hash;
      } catch {
      }
    }
  }
  function showHome(focus = false, write = true) {
    if (!visible) {
      c.cs29RememberScroll(c.activeView);
      c.cs29Observer.disconnect();
      c.cs31Leave("home");
      c.beforeStudioToolChange("home");
      c.u22StopInspect();
      c.u19StopEditing();
      c.v13CloseEditor();
      c.$advanced?.release(c.u23Home(c.activeView));
      if (c.activeView === "audioeditor") {
        c.$("audPlayer").pause();
        if (c.audContext?.state === "running") c.audContext.suspend().catch(() => {
        });
      }
      if (c.activeView === "videoframes") {
        c.vidGeneration++;
        c.$("vidPlayer").pause();
      }
      c.kbKeys.forEach((el) => el.classList.remove("pressed"));
    }
    visible = true;
    home.hidden = false;
    document.body.dataset.home = "true";
    updateClock();
    render();
    if (write && new URLSearchParams(location.hash.slice(1)).get("tool") !== "home") address("home");
    if (focus) {
      title.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }
  const previousOpen = c.openTab;
  c.openTab = function(id) {
    if (id === "home") {
      showHome(true);
      return "home";
    }
    if (!Object.hasOwn(c.views, id)) return;
    if (visible) home.getAnimations?.({ subtree: true }).forEach((a) => a.cancel());
    closeFeatureDrawer();
    visible = false;
    clearTimeout(clockTimer);
    home.hidden = true;
    delete document.body.dataset.home;
    homeButton.setAttribute("aria-current", "false");
    const result = previousOpen(id);
    extras.remember(c.activeView);
    const linked = new URLSearchParams(location.hash.slice(1)).get("tool");
    if (linked !== id && linked !== c.activeView) address(c.activeView);
    return result;
  };
  function readAddress() {
    const id = new URLSearchParams(location.hash.slice(1)).get("tool");
    if (!id || id === "home" || !Object.hasOwn(c.views, id)) showHome(false, false);
    else if (visible || c.activeView !== id) c.openTab(id);
  }
  search.oninput = () => {
    limits = { categories: 24, tools: 24, features: 24 };
    render();
  };
  search.onkeydown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      clearSearch();
    }
    if (e.key === "Enter") {
      const first = grid.querySelector(".home-tool-open,.home-result-category");
      if (first) {
        e.preventDefault();
        first.click();
      }
    }
  };
  optional.onchange = () => {
    render();
    animateContent();
  };
  window.addEventListener("popstate", readAddress);
  window.addEventListener("hashchange", readAddress);
  document.addEventListener("visibilitychange", updateClock);
  window.addEventListener("pageshow", updateClock);
  window.addEventListener("focus", updateClock);
  if (globalThis.ResizeObserver) {
    let width = 0;
    new ResizeObserver((entries) => {
      const next = entries[0].contentRect.width;
      if (Math.abs(next - width) < 1) return;
      width = next;
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        placeResults();
        placeFeatureDrawer();
      });
    }).observe(categoryGrid);
  }
  window.addEventListener("resize", () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => {
      placeResults();
      placeFeatureDrawer();
    });
  });
  window.calcStudio = Object.freeze({ ...window.calcStudio, home: () => showHome(true), homeVisible: () => visible });
  readAddress();
}
export {
  installHome
};
