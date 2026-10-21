import { node } from "../advanced/ui.js";
import { clearDatasets } from "./data.js";
const groups = { developer: () => import("./developer.js"), data: () => import("./data.js"), planning: () => import("./planning.js"), review: () => import("./review.js"), files: () => import("./files.js"), projects: () => import("./projects.js") };
const task = (id, label, group, method = id) => ({ id, label, group, method });
const chains = task("chains", "Build a request chain", "developer"), failures = task("failures", "Experiment with API failures", "developer"), sf = task("salesforce", "Explore metadata & build Composite", "developer"), flow = task("flow", "Review Flow metadata", "developer"), permissions = task("permissions", "Compare permission changes", "developer"), data = task("dataWorkflow", "Transform a complete dataset", "data"), rehearsal = task("rehearsal", "Rehearse spreadsheet-to-API payloads", "data"), migration = task("migration", "Check migration acceptance", "data"), shared = task("handoff", "Use a shared dataset", "data"), planning = task("planning", "Plan project tasks & workload", "planning"), notebook = task("notebook", "Calculate with units & test formulas", "planning"), finance = task("finance", "Review repayment events & statements", "planning"), markdown = task("markdown", "Navigate outline & insert research links", "planning"), schemas = task("schemas", "Edit schema & review migration", "review"), testing = task("testing", "Execute tests & review fixtures", "review"), translations = task("translations", "Edit translations & terminology", "review"), research = task("research", "Link sources, notes & evidence", "review"), forms = task("forms", "Check form usability", "review"), bugs = task("bugs", "Prepare a bug reproduction pack", "review"), layers = task("layers", "Arrange image layers", "files"), ocr = task("ocr", "Correct OCR by image region", "files"), batches = task("batches", "Process images with per-file retry", "files"), documents = task("documents", "Inspect a document pack", "files"), projects = task("projects", "Bundle & selectively restore projects", "projects");
const workflows = { integrationstudio: [chains, failures, rehearsal, bugs], salesforce: [sf, flow, permissions, rehearsal], logs: [bugs], dataworkbench: [data, rehearsal, migration], qualitystudio: [shared, migration], querystudio: [shared, rehearsal], comparisonstudio: [shared, migration], migrationstudio: [migration, rehearsal], imagestudio: [layers, ocr, batches, documents], vectorstudio: [task("vectors", "Align & space vector selections", "files")], pdfworkspace: [documents], documentcompare: [documents], archives: [documents], kanban: [planning], decision: [planning], notebook: [notebook], financeworkspace: [finance], testcasestudio: [testing, bugs], fixturebuilder: [testing], coveragematrix: [testing], schemadesigner: [schemas], dependencyexplorer: [schemas], localizationstudio: [translations], texttoolkit: [translations], markdown: [markdown], researchnotebook: [research], citationmanager: [research], evidenceboard: [research], formsworkspace: [forms], projectworkspaces: [projects, planning], settings: [projects, bugs] };
window.addEventListener("toolstudio:guided-reset", (event) => {
  if (["cache", "all"].includes(event.detail?.scope)) clearGuidedMemory();
});
const mounted = /* @__PURE__ */ new WeakMap();
function mountGuided(api, panel, id) {
  if (!panel || !workflows[id] || mounted.has(panel)) return;
  const details = node("details", void 0, { class: "g36-launcher a34-extension", "data-guided-workflows": id }), summary = node("summary", "Guided workflows \xB7 " + workflows[id].length + " tasks"), label = node("label", "Choose a task "), select = node("select", void 0, { "aria-label": "Guided task in " + id }), area = node("div", void 0, { class: "g36-area", id: "guided-" + id }), status = node("p", "Choose a task to load its controls.", { role: "status" });
  select.append(new Option("Choose a task\u2026", ""), ...workflows[id].map((t) => new Option(t.label, t.id)));
  label.append(select);
  details.append(summary, label, status, area);
  panel.append(details);
  const shortcut=node("button","Guided workflows",{type:"button",class:"small g36-shortcut"});shortcut.onclick=()=>{details.open=true;details.scrollIntoView({block:"start"});select.focus()};const shortcuts=node("div",undefined,{class:"row"});shortcuts.append(shortcut);panel.prepend(shortcuts);
  let ticket = 0, current = null, selected = "";
  const instances = /* @__PURE__ */ new Map();
  select.onchange = async () => {
    const token = ++ticket, task2 = workflows[id].find((t) => t.id === select.value);
    if (!task2) {
      for (const p of area.children) p.hidden = true;
      status.textContent = "Choose a task to load its controls.";
      return;
    }
    try {
      if (current && selected !== task2.id) current.clearPreview?.();
      for (const p of area.children) p.hidden = true;
      if (!instances.has(task2.id)) {
        status.textContent = "Loading " + task2.label + "\u2026";
        const module = await groups[task2.group]();
        if (token !== ticket) return;
        const content = node("div", void 0, { id: "guided-" + id + "-" + task2.id });
        area.append(content);
        try {
          instances.set(task2.id, { root: content, ui: module[task2.method](api, content, id) });
        } catch (error) {
          content.remove();
          throw error;
        }
      }
      const instance = instances.get(task2.id);
      instance.root.hidden = false;
      current = instance.ui;
      selected = task2.id;
      status.textContent = "Your original tools remain above. Guided inputs are separate until you explicitly apply them.";
      panel.dispatchEvent(new Event("studio:controls-ready"));
    } catch (e) {
      status.textContent = e.message;
    }
  };
  panel.addEventListener("studio:clear-preview", () => {
    for (const i of instances.values()) i.ui.clearPreview?.();
  });
  panel.addEventListener("studio:release", () => {
    for (const i of instances.values()) i.ui.clearPreview?.();
  });
  window.addEventListener("toolstudio:guided-reset", (event) => {
    for (const i of instances.values()) i.ui.clearPreview?.();
    if (event.detail?.scope === "all") {
      ticket++;
      for (const i of instances.values()) i.ui.dispose?.();
      instances.clear();
      area.replaceChildren();
      select.value = "";
      current = null;
      selected = "";
      status.textContent = "Guided work cleared.";
    }
  });
  mounted.set(panel, { details, instances });
  return mounted.get(panel);
}
function clearGuidedMemory() {
  clearDatasets();
}
export {
  clearGuidedMemory,
  mountGuided,
  workflows
};
