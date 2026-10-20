// src/core/home.js
function installHome(c, registry) {
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
    personal.hidden = !personal.childElementCount || !!search.value.trim() || !!category;
  }
  function render() {
    renderPersonal();
    categoryGrid.replaceChildren();
    for (const cat of registry.categories) {
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
