import { node, workspace, download, readText, table } from "../advanced/ui.js";
import { parse, clone, bounded, validateGuidedState, validateWorkflow } from "./model.js";
function editor(ui, label, initial, fields, { max = 500, changed: changed2 = () => {
}, validate = () => [] } = {}) {
  const box = node("fieldset", void 0, { class: "g36-editor a34-wide" }), legend = node("legend", label), controls = node("div", void 0, { class: "row" }), search = node("input", void 0, { type: "search", "aria-label": label + " search", placeholder: "Search records" }), list = node("div", void 0, { class: "g36-records" }), paging = node("div", void 0, { class: "row" }), advanced = node("details"), raw = node("textarea", void 0, { "aria-label": label + " JSON", rows: 6 });
  let rows = clone(initial), page = 0, selection = /* @__PURE__ */ new Set();
  bounded(rows, max, label);
  const visibleIssues = [];
  const errorsFor = (r, i) => {
    try {
      return validate(r, i, rows).filter(Boolean);
    } catch (e) {
      return [e.message];
    }
  };
  const refreshValidation = () => {
    for (const { r, i, p } of visibleIssues) p.textContent = errorsFor(r, i).join(" \xB7 ");
  };
  const notice = node("p", void 0, { role: "status" });
  box.append(legend, controls, list, paging, advanced, notice);
  ui.body.append(box);
  advanced.append(node("summary", "Advanced \xB7 import or edit JSON"), raw);
  const emit = () => {
    raw.value = JSON.stringify(rows, null, 2);
    changed2(clone(rows));
    refreshValidation();
    box.dispatchEvent(new Event("input", { bubbles: true }));
  };
  const button = (label2, fn, parent = controls) => {
    const b = node("button", label2, { type: "button" });
    b.onclick = () => {
      try {
        fn();
      } catch (e) {
        notice.textContent = e.message;
      }
    };
    parent.append(b);
    return b;
  };
  const blank = () => Object.fromEntries(fields.map((f) => [f.key, f.type === "checkbox" ? false : f.default ?? (f.type === "number" ? 0 : f.options?.[0] ?? "")]));
  button("Add " + label.replace(/s$/, ""), () => {
    if (rows.length >= max) throw Error("Limit: " + max + " records");
    rows.push(blank());
    page = Math.floor((rows.length - 1) / 25);
    search.value = "";
    emit();
    render();
    list.lastElementChild?.querySelector("details")?.setAttribute("open","");
    list.querySelector(".g36-record:last-child input:not([type=checkbox])")?.focus();
  });
  button("Expand visible records",()=>{for(const record of list.children)record.querySelector("details").open=true});button("Collapse visible records",()=>{for(const record of list.children)record.querySelector("details").open=false});
  controls.append(search);
  search.oninput = () => {
    page = 0;
    render();
  };
  button("Select all matching", () => {
    selection = new Set(filtered().map((x) => x.i));
    render();
  });
  button("Delete selected", () => {
    if (!selection.size) throw Error("Select records first");
    if (!confirm("Delete " + selection.size + " selected records from this guided editor?")) return;
    if ([...selection].some((i) => rows[i].locked)) throw Error("Unlock selected layers before deleting");
    rows = rows.filter((_, i) => !selection.has(i));
    selection.clear();
    emit();
    render();
  });
  const bulk = fields.find((f) => f.bulk && f.options);
  if (bulk) {
    const select = node("select", void 0, { "aria-label": label + " bulk " + bulk.label });
    select.append(...bulk.options.map((v) => new Option(v, v)));
    controls.append(select);
    button("Apply " + bulk.label + " to selected", () => {
      if (!selection.size) throw Error("Select records first");
      for (const i of selection) rows[i][bulk.key] = select.value;
      emit();
      render();
    });
  }
  button("Apply JSON to editor", () => {
    const next = bounded(parse(raw.value), max, label);
    for (const r of next) for (const f of fields) if (r[f.key] !== void 0 && typeof r[f.key] !== (f.type === "checkbox" ? "boolean" : f.type === "number" ? "number" : "string")) throw Error(f.label + ": invalid type");
    rows = clone(next);
    selection.clear();
    page = 0;
    emit();
    render();
  }, advanced);
  function filtered() {
    const q = search.value.toLowerCase();
    return rows.map((r, i) => ({ r, i })).filter(({ r }) => !q || JSON.stringify(r).toLowerCase().includes(q));
  }
  function render() {
    const matches = filtered(), pages = Math.max(1, Math.ceil(matches.length / 25));
    page = Math.min(page, pages - 1);
    list.replaceChildren();
    visibleIssues.length = 0;
    for (const { r, i } of matches.slice(page * 25, page * 25 + 25)) {
      const wrapper=node("article",undefined,{class:"g36-record"}),article = node("details", void 0, { class: "g36-record-details", open:i===page*25 }), issues = node("p", errorsFor(r, i).join(" \xB7 "), { class: "g36-inline-issues", role: "status" }), select = node("input", void 0, { type: "checkbox", checked: selection.has(i), "aria-label": label + " select record " + (i + 1) });
      select.onchange = () => {
        select.checked ? selection.add(i) : selection.delete(i);
      };
      const summary=node("summary");summary.append(node("strong","Record "+(i+1)+(r[fields[0]?.key]?" · "+String(r[fields[0].key]).slice(0,70):"")));article.append(summary);wrapper.append(select,article);
      for (const f of fields) {
        const wrap = node("label", void 0, { class: "field" }), input = node(f.options ? "select" : f.type === "textarea" ? "textarea" : "input", void 0, { "aria-label": label + " " + (i + 1) + " " + f.label });
        wrap.append(node("span", f.label), input);
        if (f.options) input.append(...f.options.map((v) => new Option(v, v)));
        else if (f.type !== "textarea") input.type = f.type || "text";
        if (f.type === "checkbox") input.checked = !!r[f.key];
        else input.value = r[f.key] ?? "";
        input.disabled = !!r.locked && f.key !== "locked";
        if (f.type === "number") {
          input.step = "any";
        }
        input.oninput = () => {
          if (r.locked && f.key !== "locked") return;
          r[f.key] = f.type === "checkbox" ? input.checked : f.type === "number" ? Number(input.value) : input.value;
          emit();
          if (f.key === "locked") render();
        };
        article.append(wrap);
      }
      for (const [label2, delta] of [["Move up", -1], ["Move down", 1]]) button(label2, () => {
        if (r.locked) throw Error("Unlock the layer before reordering");
        const j = i + delta;
        if (j < 0 || j >= rows.length) return;
        [rows[i], rows[j]] = [rows[j], rows[i]];
        selection.clear();
        emit();
        render();
      }, article);
      button("Remove record " + (i + 1), () => {
        if (r.locked) throw Error("Unlock the layer before removing");
        rows.splice(i, 1);
        selection.clear();
        emit();
        render();
      }, article);
      article.append(issues);
      visibleIssues.push({ r, i, p: issues });
      list.append(wrapper);
    }
    paging.replaceChildren();
    button("Previous records", () => {
      page = Math.max(0, page - 1);
      render();
    }, paging).disabled = page === 0;
    paging.append(node("span", `${matches.length} matching / ${rows.length} total \xB7 page ${page + 1} of ${pages} \xB7 ${selection.size} selected`));
    button("Next records", () => {
      page = Math.min(pages - 1, page + 1);
      render();
    }, paging).disabled = page === pages - 1;
  }
  box.onkeydown = (e) => {
    if (e.altKey && e.key === "Insert") {
      e.preventDefault();
      controls.querySelector("button").click();
    }
  };
  raw.value = JSON.stringify(rows, null, 2);
  render();
  return { get: () => clone(rows), set(next) {
    rows = clone(bounded(next, max, label));
    selection.clear();
    page = 0;
    emit();
    render();
  }, box, refreshValidation, selectedIndices: () => [...selection], selected: () => [...selection].map((i) => clone(rows[i])) };
}
const field = (key, label = key, type = "text", options) => ({ key, label, type, ...options ? { options } : {} });
function guided(api, root, title, intro) {
  const ui = workspace(root, title, intro);
  root.classList.add("g36");
  ui.body.addEventListener("input", (e) => {
    if (e.target.matches("input[type=search]")) e.stopPropagation();
  });
  return ui;
}
function projectControls(api, ui, id, get, set) {
  const row = ui.row(), status = node("p", void 0, { role: "status" });
  ui.body.append(status);
  const act = (label, fn) => {
    const b = node("button", label, { type: "button" });
    b.onclick = async () => {
      try {
        await fn();
      } catch (e) {
        status.textContent = e.message;
      }
    };
    row.append(b);
    return b;
  };
  act("Save guided work on this device", () => {
    const state = api.guidedState();
    state.workspaces[id] = get();
    api.saveGuidedState(validateGuidedState(state));
    status.textContent = "Saved on this device. Large datasets/documents stay in memory; export a project bundle to keep them.";
  });
  act("Load saved guided work", () => {
    const value = api.guidedState().workspaces[id];
    if (!value) throw Error("No saved work for this workflow");
    if (confirm("Replace the inputs in this guided workflow with saved work?")) set(clone(value));
  });
  act("Export guided project", () => download(id + "-project.json", { format: "toolstudio-guided-project", version: 1, id, work: get() }));
  const file = node("input", void 0, { type: "file", accept: ".json", "aria-label": "Import " + titleSafe(id) + " project" });
  row.append(file);
  let candidate = null, source = null, importTicket = 0;
  file.onchange = async () => {
    const ticket = ++importTicket;
    candidate = null;
    apply.disabled = true;
    try {
      const text = await readText(file.files[0], 75e4);
      if (ticket !== importTicket) return;
      source = text;
      const x = parse(source);
      if (x.format !== "toolstudio-guided-project" || x.version !== 1 || x.id !== id) throw Error("Project belongs to another workflow");
      validateGuidedState({ version: 1, workspaces: { [id]: x.work } });
      candidate = x.work;
      status.textContent = "Project validated. Review below before replacing inputs.";
      ui.report(candidate, "Project import preview");
      apply.disabled = false;
    } catch (e) {
      if (ticket !== importTicket) return;
      candidate = null;
      apply.disabled = true;
      status.textContent = e.message;
    }
  };
  ui.onRelease(() => {
    importTicket++;
    candidate = null;
    apply.disabled = true;
    file.value = "";
  });
  const apply = act("Apply reviewed project", () => {
    if (!candidate) throw Error("Choose and review a project first");
    if (confirm("Replace this workflow\u2019s inputs with the reviewed project?")) {
      set(clone(candidate));
      candidate = null;
      apply.disabled = true;
      file.value = "";
      status.textContent = "Project loaded; review inputs before running";
    }
  });
  apply.disabled = true;
}
const titleSafe = (id) => id.replaceAll("-", " ");
function responseSelector(ui, response, label = "Response fields") {
  const select = ui.field(label, "", "select", []);
  return { select, set(items) {
    select.replaceChildren(...items.map((x) => new Option(x.pointer + " = " + JSON.stringify(x.value).slice(0, 120), x.pointer)));
  } };
}
const changed = (element) => element.dispatchEvent(new Event("input", { bubbles: true }));
export {
  changed,
  download,
  editor,
  field,
  guided,
  node,
  projectControls,
  readText,
  responseSelector,
  table
};
