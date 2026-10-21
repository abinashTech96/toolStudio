import { guided, node, editor, field, download, projectControls, changed, readText } from "./ui.js";
import { parse, workload, calculateNotebook, formulaTests, repayment, reconcile, markdownOutline } from "./model.js";
import { parseCSV } from "./data.js";
function planning(api, root) {
  const ui = guided(api, root, "Project tasks & weekly workload", "Connect tasks to a project, notes, decisions and due dates. Estimates are entered hours, so the workload reflects your own assumptions. Select records for bulk status changes; Alt+Insert adds a record.");
  const project = ui.field("Project name", "My project"), notes = editor(ui, "Project notes", [], [field("id", "Note ID"), field("text", "Note", "textarea")], { max: 500 }), decisions = editor(ui, "Decisions", [], [field("id", "Decision ID"), field("text", "Decision", "textarea"), field("date", "Date", "date")], { max: 500 });
  const tasks = editor(ui, "Tasks", [], [field("id", "Task ID"), field("title", "Title"), { ...field("status", "Status", "text", ["todo", "in-progress", "blocked", "done"]), bulk: true }, field("due", "Due date", "date"), field("hours", "Estimated hours", "number"), field("blockedReason", "Blocked reason"), field("noteId", "Linked note ID"), field("decisionId", "Linked decision ID")], { max: 1e3 });
  const week = ui.field("Week beginning", (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), "date"), capacity = ui.field("Weekly capacity (hours)", "40", "number");
  ui.action("Review project and workload", () => {
    const ns = new Set(notes.get().map((n) => n.id)), ds = new Set(decisions.get().map((d) => d.id));
    return { project: project.value, ...workload(tasks.get(), { weekStart: week.value, capacity: capacity.value }), links: tasks.get().map((t) => ({ task: t.id, issues: [t.noteId && !ns.has(t.noteId) ? "Missing note " + t.noteId : "", t.decisionId && !ds.has(t.decisionId) ? "Missing decision " + t.decisionId : "", t.status === "blocked" && !t.blockedReason ? "Add a blocked reason" : ""].filter(Boolean) })) };
  });
  ui.action("Import current Kanban tasks", () => {
    const cards = api.c.knCurrent?.()?.tasks;
    if (!Array.isArray(cards)) throw Error("Open a board in Kanban. You can also enter project tasks directly.");
    if (!confirm("Replace guided tasks with " + cards.length + " Kanban tasks?")) return { $cancelled: true };
    tasks.set(cards.map((c, i) => ({ id: c.id || "task-" + (i + 1), title: c.title || c.text || "", status: "todo", due: c.due || "", hours: 0, blockedReason: "", noteId: "", decisionId: "" })));
    return { $inputsUpdated: true, imported: cards.length, note: "Review statuses and enter estimates" };
  });
  projectControls(api, ui, "project-planning", () => ({ name: project.value, notes: notes.get(), decisions: decisions.get(), tasks: tasks.get(), week: week.value, capacity: capacity.value }), (v) => {
    project.value = v.name;
    notes.set(v.notes);
    decisions.set(v.decisions);
    tasks.set(v.tasks);
    week.value = v.week;
    capacity.value = v.capacity;
  });
  return ui;
}
const calculationFields = [field("name", "Variable"), field("value", "Input value", "number"), field("unit", "Input / display unit"), field("formula", "Formula (leave blank for input)")];
function notebook(api, root) {
  const ui = guided(api, root, "Unit-aware notebook & Formula Test Bench", "Use linked variables and + \u2212 \xD7 / ^ with parentheses. Supported units: m, cm, mm, km, s, min, h, kg, g, N, Pa, J and W, including compounds such as km/h. Results include dependency links.");
  const calculations = editor(ui, "Calculations", [{ name: "distance", value: 100, unit: "m", formula: "" }, { name: "time", value: 10, unit: "s", formula: "" }, { name: "speed", value: 0, unit: "m/s", formula: "distance / time" }], calculationFields, { max: 200 });
  const tests = editor(ui, "Formula tests", [{ name: "speed", expected: 10, tolerance: 1e-6 }], [field("name", "Variable under test"), field("expected", "Expected displayed value", "number"), field("tolerance", "Absolute tolerance", "number")], { max: 500 });
  ui.action("Calculate and inspect dependencies", () => calculateNotebook(calculations.get()));
  ui.action("Run formula regression", () => {
    const cases = formulaTests(calculations.get(), tests.get());
    return { passed: cases.filter((c) => c.passed).length, failed: cases.filter((c) => !c.passed).length, cases };
  });
  projectControls(api, ui, "unit-notebook", () => ({ calculations: calculations.get(), tests: tests.get() }), (v) => {
    calculations.set(v.calculations);
    tests.set(v.tests);
  });
  return ui;
}
function finance(api, root) {
  const ui = guided(api, root, "Repayment events & statement reconciliation", "Build a monthly projection with entered rate changes, extra payments and fees. The report states timing and rounding assumptions; compare it against actual statement payments.");
  const principal = ui.field("Opening principal", "10000", "number"), rate = ui.field("Annual interest rate (%)", "6", "number"), payment = ui.field("Monthly payment", "300", "number"), start = ui.field("Opening date", "2026-01-31", "date"), months = ui.field("Maximum months", "60", "number");
  const events = editor(ui, "Repayment events", [], [field("month", "Payment month", "number"), field("type", "Event type", "text", ["rate", "extra", "fee"]), field("amount", "Rate (%) or amount", "number")], { max: 600 }), statements = editor(ui, "Statement payments", [], [field("date", "Posted date", "date"), field("payment", "Payment amount", "number")], { max: 600 });
  const file = ui.field("Import statement CSV (date,payment)", "", "file");
  file.accept = ".csv";
  file.onchange = async () => {
    try {
      const rows = parseCSV(await readText(file.files[0], 1e6));
      statements.set(rows.map((r) => ({ date: r.date, payment: Number(r.payment) })));
    } catch (e) {
      ui.status.textContent = e.message;
    }
  };
  const calc = () => repayment({ principal: principal.value, annualRate: rate.value, payment: payment.value, startDate: start.value, months: months.value }, events.get());
  ui.action("Review repayment timeline", calc);
  ui.action("Compare statement payments", () => {
    const report = calc();
    return { assumptions: report.assumptions, comparison: reconcile(report.schedule, statements.get()) };
  });
  projectControls(api, ui, "repayment-events", () => ({ principal: principal.value, rate: rate.value, payment: payment.value, start: start.value, months: months.value, events: events.get(), statements: statements.get() }), (v) => {
    for (const [k, e] of Object.entries({ principal, rate, payment, start, months })) {
      e.value = v[k];
      changed(e);
    }
    events.set(v.events);
    statements.set(v.statements);
  });
  return ui;
}
function markdown(api, root) {
  const ui = guided(api, root, "Markdown outline & research links", "Navigate headings in the current Markdown source and insert a reviewed citation with its source note.");
  const outline = node("nav", void 0, { "aria-label": "Markdown heading outline", class: "a34-wide" });
  ui.body.append(outline);
  ui.action("Refresh heading outline", () => {
    const source = api.c.$("mdInput");
    if (!source) throw Error("Open Markdown preview first");
    const headings = markdownOutline(source.value);
    outline.replaceChildren(...headings.map((h) => {
      const b = node("button", "H" + h.level + " \xB7 " + h.title, { type: "button" });
      b.onclick = () => {
        const lines = source.value.split("\n"), position = lines.slice(0, h.line - 1).reduce((n, s) => n + s.length + 1, 0);
        source.focus();
        source.setSelectionRange(position, position + lines[h.line - 1].length);
      };
      return b;
    }));
    return headings;
  });
  const select = ui.field("Research source", "", "select", []), note = ui.field("Linked research note", "", "select", []);
  ui.action("Load saved research sources", () => {
    const research = api.guidedState().workspaces.research || { sources: [], notes: [] };
    select.replaceChildren(...research.sources.map((s) => new Option(s.id + " \xB7 " + s.title, s.id)));
    note.replaceChildren(...research.notes.map((n) => new Option(n.id + " \xB7 " + n.text.slice(0, 80), n.id)));
    return { sources: research.sources.length, notes: research.notes.length, note: "Save guided Research work first to share these references" };
  });
  ui.action("Insert reviewed citation at cursor", () => {
    const research = api.guidedState().workspaces.research, s = research?.sources.find((s2) => s2.id === select.value), n = research?.notes.find((n2) => n2.id === note.value);
    if (!s) throw Error("Select a saved source");
    if (n && n.sourceId !== s.id) throw Error("Selected note belongs to another source");
    if (!confirm("Insert this source citation and selected note into Markdown?")) return { $cancelled: true };
    const source = api.c.$("mdInput"), url = /^https?:\/\//i.test(s.url) ? s.url : "", text = "\n" + (n ? n.text + " (" + n.locator + ")\n" : "") + "[" + s.title.replace(/[\[\]]/g, "") + "]" + (url ? "(" + url.replace(/[()\s]/g, encodeURIComponent) + ")" : "") + " [source: " + s.id + "]\n";
    source.setRangeText(text, source.selectionStart, source.selectionEnd, "end");
    changed(source);
    return { inserted: s.id };
  });
  return ui;
}
export {
  calculationFields,
  finance,
  markdown,
  notebook,
  planning
};
