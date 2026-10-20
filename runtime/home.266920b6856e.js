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
  document.title = "Tool Studio \u2014 " + version;
  const guide = button("Guide", () => {
    if (options.guideHTML) {
      const url = URL.createObjectURL(new Blob([options.guideHTML], { type: "text/html" }));
      window.open(url, "_blank", "noopener");
      setTimeout(() => URL.revokeObjectURL(url), 6e4);
    } else window.open(new URL("./guide.html", location.href), "_blank", "noopener");
  });
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
    for (const [kind, ids] of [["favorites", [...c.favorites]], ["categories", orderedCategories().map((x) => x.id)]]) {
      const list = node("div", void 0, "home-order-list");
      list.append(node("h3", kind === "favorites" ? "Favorites" : "Categories"));
      for (const [id, index] of ids.map((id2, index2) => [id2, index2])) {
        const label = kind === "favorites" ? c.views[id] : registry.categories.find((x) => x.id === id)?.label;
        if (!label) continue;
        const row = node("div");
        row.append(node("span", label));
        for (const [delta, word] of [[-1, "earlier"], [1, "later"]]) {
          const move = button("Move " + label + " " + word, () => {
            const next = [...ids];
            [next[index], next[index + delta]] = [next[index + delta], next[index]];
            let saved;
            if (kind === "categories") saved = save({ categories: next });
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
    customBody.append(button("Reset category order", () => {
      if (save({ categories: [] })) render();
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
    const buttons = [...grid.querySelectorAll(".home-tool-open")], index = buttons.indexOf(document.activeElement);
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
    const el = document.createElement(tag);
    if (text !== void 0) el.textContent = text;
    if (className) el.className = className;
    return el;
  };
  const button = (text, action, className = "home-chip") => {
    const el = node("button", text, className);
    el.type = "button";
    el.onclick = action;
    return el;
  };
  const categories = new Map(registry.categories.map((cat) => [cat.id, cat]));
  const modules = new Map(registry.modules.map((mod) => [mod.id, mod]));
  const owner = (id) => registry.modules.find((mod) => mod.routes.includes(id));
  const categoryLabel = (id) => categories.get(id)?.label || "My Work & Settings";
  const descriptions = {
    portfoliobuilder: "Build a portfolio and export a standalone page.",
    qualitystudio: "Profile records and review data quality rules.",
    querystudio: "Query local tables with SQL and inspect the results.",
    contractstudio: "Review API contracts and validate responses.",
    migrationstudio: "Plan code changes and review a migration before export.",
    documentcompare: "Compare PDF text and page images.",
    vectorstudio: "Create, inspect and export SVG artwork.",
    citationmanager: "Organize sources and prepare citations.",
    evidenceboard: "Connect claims with supporting evidence.",
    researchnotebook: "Collect research notes and link sources.",
    simulationstudio: "Explore distributions and repeatable simulations.",
    capacityplanner: "Estimate capacity, utilization and waiting time.",
    dependencyexplorer: "Inspect dependencies, ordering and cycles.",
    schemadesigner: "Design entities, fields and relationships.",
    coveragematrix: "Map requirements to tests and review coverage.",
    fixturebuilder: "Generate structured test data and fixtures.",
    testcasestudio: "Write and organize test cases.",
    localizationstudio: "Compare translation keys and find missing entries."
  };
  const savedFavorites = c.storage.get("calc-studio-favorites", c.favorites);
  if (Array.isArray(savedFavorites)) {
    c.favorites = [...new Set(savedFavorites)].filter((id) => typeof id === "string" && Object.hasOwn(c.views, id));
    c.renderFavorites();
  }
  const symbols = { math: "\u2211", json: "{}", developer: "</>", media: "\u25E9", finance: "%", productivity: "\u2713", text: "Aa", career: "\u2197", research: "\u2315", systems: "\u2318", testing: "\u2299", saved: "\u2606" };
  const summaries = {
    math: "Calculate, solve, graph and convert.",
    json: "Shape data and compare changes.",
    developer: "Build, inspect and automate.",
    media: "Edit images, documents and media.",
    finance: "Work through loans and everyday costs.",
    productivity: "Organize tasks, time and decisions.",
    text: "Write, transform and preview text.",
    career: "Prepare your next professional step.",
    research: "Collect sources and connect ideas.",
    systems: "Model systems and dependencies.",
    testing: "Plan tests and review coverage.",
    saved: "Return to projects and personal settings."
  };
  let category = "", expanded = false, visible = false;
  const home = node("section", void 0, "studio-home");
  home.id = "studioHome";
  home.hidden = true;
  home.setAttribute("aria-labelledby", "homeTitle");
  const hero = node("div", void 0, "home-hero"), intro = node("div");
  intro.append(node("p", "YOUR EVERYDAY WORKSPACE", "home-eyebrow"));
  const title = node("h1", "What would you like to work on?");
  title.id = "homeTitle";
  title.tabIndex = -1;
  intro.append(title, node("p", "A place to calculate, build, organize and create. Pick a tool and make a little progress.", "home-intro"));
  const badge = node("div", void 0, "home-stat");
  badge.append(node("strong", String(registry.modules.length)), node("span", "workspaces"), node("small", registry.categories.length + " categories \xB7 one studio"));
  hero.append(intro, badge);
  home.append(hero);
  const searchBox = node("div", void 0, "home-search-box"), searchLabel = node("label", "Find your next tool");
  searchLabel.htmlFor = "homeSearch";
  const searchRow = node("div", void 0, "home-search-row"), search = node("input");
  search.id = "homeSearch";
  search.type = "search";
  search.placeholder = "Try JSON, EMI, SOQL, image resize\u2026";
  search.autocomplete = "off";
  searchRow.append(search, button("Clear", () => {
    search.value = "";
    category = "";
    expanded = false;
    render();
    search.focus();
  }, "home-clear"));
  searchBox.append(searchLabel, searchRow, node("small", "Search workspaces and the features inside them.", "home-search-help"));
  home.append(searchBox);
  const personal = node("div", void 0, "home-personal");
  home.append(personal);
  const browse = node("section", void 0, "home-browse"), browseHeading = node("div", void 0, "home-section-heading");
  browseHeading.append(node("h2", "Explore by category"), button("All tools", () => {
    category = "";
    search.value = "";
    expanded = true;
    render();
    results.scrollIntoView({ block: "start" });
  }));
  const categoryGrid = node("div", void 0, "home-category-grid");
  browse.append(browseHeading, categoryGrid);
  home.append(browse);
  const results = node("section", void 0, "home-results"), resultsHeading = node("div", void 0, "home-section-heading"), resultTitle = node("h2", "A good place to start");
  const optionalLabel = node("label", void 0, "home-optional"), optional = node("input");
  optional.type = "checkbox";
  optional.id = "homeOptional";
  optionalLabel.append(optional, document.createTextNode("Include optional tools"));
  resultsHeading.append(resultTitle, optionalLabel);
  const count = node("p", "", "home-count");
  count.setAttribute("role", "status");
  count.setAttribute("aria-live", "polite");
  const grid = node("div", void 0, "home-tool-grid"), more = button("Browse all tools", () => {
    expanded = true;
    render();
  }, "home-more");
  results.append(resultsHeading, count, grid, more);
  home.append(results);
  const footer = node("div", void 0, "home-footer");
  footer.append(node("span", "Your tools. Your pace."), button("Saved projects", () => c.openTab("projectworkspaces")), button("Manage tools", () => c.u23ManageButton.click()));
  home.append(footer);
  document.querySelector(".main-card").prepend(home);
  const homeButton = button("Home", () => showHome(true), "pill home-button");
  homeButton.id = "homeButton";
  document.querySelector(".brand").after(homeButton);
  const extras = installHomeExtras({ c, registry, options, home, personal, browse, footer, search, grid, render });
  function launch(entry) {
    if (entry.feature) c.n28FeatureOpen(entry.feature);
    else c.openTab(entry.id);
  }
  function toolCard(entry) {
    const card = node("article", void 0, "home-tool-card");
    card.dataset.tool = entry.id;
    const open = button("", () => launch(entry), "home-tool-open");
    open.append(node("small", categoryLabel(entry.category)), node("strong", entry.label), node("span", entry.description || c.studioDescription(entry.id) || "Open this workspace."));
    const star = button("", () => {
      c.favorites = c.favorites.includes(entry.id) ? c.favorites.filter((id) => id !== entry.id) : [...c.favorites, entry.id];
      c.storage.set("calc-studio-favorites", c.favorites);
      c.renderFavorites();
      render();
      grid.querySelector('[data-tool="' + CSS.escape(entry.id) + '"] .home-star')?.focus({ preventScroll: true });
    }, "home-star");
    const isFavorite = c.favorites.includes(entry.id);
    star.textContent = isFavorite ? "\u2605" : "\u2606";
    star.setAttribute("aria-label", (isFavorite ? "Remove " : "Add ") + entry.label + (isFavorite ? " from favorites" : " to favorites"));
    star.setAttribute("aria-pressed", String(isFavorite));
    card.append(open, star);
    return card;
  }
  const record = (id) => {
    const mod = owner(id);
    return mod ? { id, label: c.views[id] || mod.label, category: mod.category, description: descriptions[mod.id] || mod.description } : null;
  };
  function renderPersonal() {
    personal.replaceChildren();
    for (const [label, ids] of [["Your favorites", c.favorites], ["Recently opened", c.recentTools]]) {
      const entries = [...new Set(ids)].map(record).filter(Boolean).filter((e) => !c.u23IsExtra(e.id)).slice(0, 6);
      if (!entries.length) continue;
      const section = node("section"), row = node("div", void 0, "home-quick-links");
      section.append(node("h2", label));
      for (const entry of entries) row.append(button(entry.label, () => c.openTab(entry.id)));
      section.append(row);
      personal.append(section);
    }
    extras.renderPersonal();
    personal.hidden = !personal.childElementCount || !!search.value.trim() || !!category;
  }
  function render() {
    renderPersonal();
    categoryGrid.replaceChildren();
    for (const cat of extras.categories()) {
      const available = registry.modules.filter((m) => m.category === cat.id && (optional.checked || !c.u23IsExtra(m.id))).length;
      if (!available) continue;
      const card = button("", () => {
        category = category === cat.id ? "" : cat.id;
        expanded = true;
        render();
        results.scrollIntoView({ block: "start" });
      }, "home-category");
      card.dataset.category = cat.id;
      card.setAttribute("aria-pressed", String(category === cat.id));
      card.append(node("span", symbols[cat.id] || "\u25C7", "home-category-icon"), node("strong", cat.label), node("small", available + " tools"), node("p", summaries[cat.id] || "Explore tools in this category."));
      categoryGrid.append(card);
    }
    const query = c.n28Normalize(search.value), tokens = query.split(" ").filter(Boolean);
    let entries = registry.modules.filter((mod) => (!category || mod.category === category) && (optional.checked || !c.u23IsExtra(mod.id))).map((mod) => ({ id: mod.id, label: mod.label, category: mod.category, description: descriptions[mod.id] || mod.description }));
    if (query) {
      const features = c.n28GetIndex().filter((e) => !e.root && (!c.u23IsExtra(e.id) || optional.checked));
      if (tokens.includes("emi")) features.unshift(c.n28Entry("home:emi", "tools", "Loan / EMI", "calculate emi calculator loan repayment", { loan: true }));
      entries = entries.flatMap((entry) => {
        const mod = modules.get(entry.id), text = c.n28Normalize([entry.label, entry.description, categories.get(entry.category)?.label, ...mod.routes.map((id) => c.n28Tags[id] || id)].join(" "));
        const matches = features.filter((e) => mod.routes.includes(e.id)).map((feature) => ({ feature, rank: c.n28Rank(feature, query, tokens) })).filter((e) => e.rank >= 0).sort((a, b) => b.rank - a.rank);
        if (!tokens.every((token) => text.includes(token)) && !matches.length) return [];
        const match = matches[0];
        if (match && !c.n28Normalize(entry.label).includes(query)) return [{ ...entry, id: match.feature.id, label: match.feature.label, description: entry.label + " \xB7 " + (entry.description || "Open this feature."), feature: match.feature }];
        return [entry];
      });
    }
    const recommended = ["jsonstudio", "integrationstudio", "calculator", "imagestudio", "dataworkbench", "kanban", "pdfworkspace", "conversionworkspace"];
    const total = entries.length, limited = !query && !category && !expanded;
    if (limited) entries.sort((a, b) => {
      const rank = (id) => recommended.includes(id) ? recommended.indexOf(id) : 100;
      return rank(a.id) - rank(b.id);
    });
    if (limited) entries = entries.slice(0, 8);
    resultTitle.textContent = query ? "Search results" : category ? categories.get(category).label : expanded ? "All tools" : "A good place to start";
    count.textContent = query ? total + " matching workspaces" : limited ? "A few useful tools for your next task." : total + " workspaces";
    grid.replaceChildren(...entries.map(toolCard));
    if (!total) {
      const empty = node("div", void 0, "home-empty");
      empty.append(node("h3", "No tools found"), node("p", "Try a shorter search or include optional tools."), button("Reset filters", () => {
        search.value = "";
        category = "";
        expanded = false;
        optional.checked = false;
        render();
        search.focus();
      }));
      grid.append(empty);
    }
    more.hidden = !limited || total <= 8;
    homeButton.setAttribute("aria-current", visible ? "page" : "false");
    extras.render();
    browse.hidden = !!search.value.trim();
    if (search.value.trim()) searchBox.after(results);
    else browse.after(results);
  }
  function address(id) {
    const url = new URL(location.href);
    url.hash = new URLSearchParams({ tool: id }).toString();
    try {
      history.pushState(null, "", url);
    } catch {
      if (location.hash !== url.hash) location.hash = url.hash;
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
    render();
    if (write && new URLSearchParams(location.hash.slice(1)).get("tool") !== "home") address("home");
    if (focus) title.focus({ preventScroll: true });
  }
  const previousOpen = c.openTab;
  c.openTab = function(id) {
    if (id === "home") {
      showHome(true);
      return "home";
    }
    if (!Object.hasOwn(c.views, id)) return;
    visible = false;
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
    expanded = true;
    render();
  };
  search.onkeydown = (e) => {
    if (e.key === "Escape") {
      search.value = "";
      category = "";
      render();
    }
    if (e.key === "Enter") {
      const first = grid.querySelector(".home-tool-open");
      if (first) {
        e.preventDefault();
        first.click();
      }
    }
  };
  optional.onchange = render;
  window.addEventListener("popstate", readAddress);
  window.addEventListener("hashchange", readAddress);
  window.calcStudio = Object.freeze({ ...window.calcStudio, home: () => showHome(true), homeVisible: () => visible });
  readAddress();
}
export {
  installHome
};
