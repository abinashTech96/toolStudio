import { guided, node, editor, field, download, projectControls, responseSelector, changed, readText, table } from "./ui.js";
import { parse, clone, leaves, differences, schemaReview, testExecution, selectedAssertions, translationReview, researchReview, formReview, bugPack } from "./model.js";
function schemas(api, root) {
  const ui = guided(api, root, "Visual schema & migration review", "Edit fields in a form, compare versions and trace consumers before changing a schema. Migration plans require human review and do not execute SQL.");
  const fields = [field("path", "Table.field"), field("type", "SQL type", "text", ["TEXT", "INTEGER", "REAL", "BOOLEAN", "DATE", "TIMESTAMP", "BLOB", "NUMERIC"]), field("required", "Required", "checkbox"), field("primary", "Primary key", "checkbox"), field("reference", "References table.field")];
  const before = editor(ui, "Baseline fields", [{ path: "customers.id", type: "INTEGER", required: true, primary: true, reference: "" }, { path: "customers.name", type: "TEXT", required: false, primary: false, reference: "" }], fields);
  const after = editor(ui, "Proposed fields", before.get(), fields), deps = editor(ui, "Field consumers", [], [field("field", "Table.field"), field("consumer", "Report / API / component")]), renames = editor(ui, "Field renames", [], [field("from", "Old table.field"), field("to", "New table.field")]);
  ui.action("Copy baseline into proposal", () => {
    if (!confirm("Replace proposed fields with the baseline?")) return { $cancelled: true };
    after.set(before.get());
    return { $inputsUpdated: true, copied: before.get().length };
  });
  let plan = null, revision = -1;
  ui.action("Review schema changes and migration plan", () => {
    for (const f of [...before.get(), ...after.get()]) if (!/^[A-Za-z_]\w*\.[A-Za-z_]\w*$/.test(f.path)) throw Error("Field paths must use table.field identifiers");
    for (const r of renames.get()) if (!before.get().some((f) => f.path === r.from) || !after.get().some((f) => f.path === r.to)) throw Error("Rename endpoints must exist in baseline/proposal");
    plan = schemaReview(before.get(), after.get(), deps.get(), renames.get());
    revision = ui.revision;
    return plan;
  });
  ui.action("Export reviewed migration plan", () => {
    if (!plan || revision !== ui.revision) throw Error("Review current schema changes first");
    download("migration-review.json", { changes: plan, checklist: ["Back up existing data", "Validate conversion and required values on a copy", "Update all listed consumers", "Review rollback and recovery", "Execute through your normal migration process"] });
    return { exportedChanges: plan.length };
  });
  ui.action("Open proposal in existing Schema Designer", () => {
    const panel = api.c.$("schemadesigner"), target = panel?.querySelector('[aria-label="Entities and fields"]');
    if (!target) throw Error("Open Schema Designer first");
    const entities = /* @__PURE__ */ new Map();
    for (const f of after.get()) {
      const [table2, name] = f.path.split(".");
      if (!table2 || !name) throw Error("Use table.field paths");
      if (!entities.has(table2)) entities.set(table2, { id: table2, fields: [] });
      const reference = f.reference ? f.reference.split(".") : null;
      entities.get(table2).fields.push({ name, type: f.type, required: f.required, primary: f.primary, ...reference ? { references: { table: reference[0], field: reference[1] } } : {} });
    }
    if (!confirm("Replace existing Schema Designer input with this proposal?")) return { $cancelled: true };
    target.value = JSON.stringify([...entities.values()], null, 2);
    changed(target);
    return { copiedTables: entities.size };
  });
  projectControls(api, ui, "schema-review", () => ({ before: before.get(), after: after.get(), dependencies: deps.get(), renames: renames.get() }), (v) => {
    before.set(v.before);
    after.set(v.after);
    deps.set(v.dependencies);
    renames.set(v.renames);
  });
  return ui;
}
function testing(api, root) {
  const ui = guided(api, root, "Guided test execution & failure history", "Enter a test\u2019s steps and expected behavior, record actual results, then compare failures over repeated runs. API fixtures and assertions require review before export.");
  const cases = editor(ui, "Test cases", [{ id: "T1", title: "Homepage opens", steps: "Open the app", expected: "Homepage is visible" }], [field("id", "Case ID"), field("title", "Title"), field("steps", "Steps", "textarea"), field("expected", "Expected result", "textarea")], { max: 1e3 });
  const selected = ui.field("Execute test case", "T1"), actual = ui.field("Actual result", ""), outcome = ui.field("Outcome", "pass", "select", ["pass", "fail", "blocked", "skipped"]);
  let runs = [];
  ui.action("Record test result", () => {
    const c = cases.get().find((c2) => c2.id === selected.value);
    if (!c) throw Error("Choose an existing case ID");
    if (!actual.value.trim()) throw Error("Enter the actual result");
    if (runs.length >= 5e3) throw Error("Run history limit: 5,000 entries");
    runs.push({ caseId: c.id, outcome: outcome.value, actual: actual.value, at: (/* @__PURE__ */ new Date()).toISOString() });
    return { case: c, outcome: outcome.value, actual: actual.value, history: testExecution(cases.get(), runs) };
  });
  ui.action("Review repeated failures", () => testExecution(cases.get(), runs));
  const baseline = ui.field("Baseline API response", '{"id":1,"status":"open"}'), current = ui.field("Current API response", '{"id":1,"status":"closed"}'), selector = responseSelector(ui, current, "Changed response field");
  let fixture = null, revision = -1, assertions = [];
  ui.action("Inspect JSON differences", () => {
    const a = parse(baseline.value), b = parse(current.value), diff = differences(a, b), items = leaves(b);
    selector.set(items.filter((x) => diff.some((d) => d.path === x.pointer || d.pointer === x.pointer || JSON.stringify(d).includes(x.pointer))));
    if (!selector.select.options.length) selector.set(items);
    return diff;
  });
  ui.action("Add assertion for selected difference", () => {
    const row = selectedAssertions(parse(baseline.value), parse(current.value), [selector.select.value])[0];
    if (row.issue) throw Error(row.issue);
    assertions.push(row);
    return { assertions };
  });
  ui.action("Review response fixture", () => {
    fixture = parse(current.value);
    revision = ui.revision;
    return { fixture, assertions, note: "Review values and remove personal information before exporting" };
  });
  ui.action("Export reviewed fixture and assertions", () => {
    if (!fixture || revision !== ui.revision) throw Error("Review current response fixture first");
    download("reviewed-api-fixture.json", { fixture, assertions });
    return { exported: true };
  });
  projectControls(api, ui, "guided-testing", () => ({ cases: cases.get(), runs, assertions }), (v) => {
    cases.set(v.cases);
    runs = v.runs || [];
    assertions = v.assertions || [];
  });
  return ui;
}
function translations(api, root) {
  const ui = guided(api, root, "Translation grid & terminology", "Edit source and translated strings side by side. Review simple {name}, {{name}} and printf placeholders and reusable terminology. For full ICU plural/select validation, use the existing Localization Studio checks.");
  let terms;
  const strings = editor(ui, "Translations", [{ key: "greeting", locale: "hi", source: "Hello {name}", translation: "Namaste {name}" }], [field("key", "Key"), field("locale", "Target locale"), field("source", "Source text", "textarea"), field("translation", "Translation", "textarea")], { max: 2e3, validate: (r) => {
    const x = translationReview([r], terms?.get() || [])[0];
    return [x.issue, ...x.suggestions];
  } });
  terms = editor(ui, "Terminology", [{ source: "Hello", translation: "Namaste" }], [field("source", "Source term"), field("translation", "Preferred translation")], { max: 500, changed: () => strings.refreshValidation() });
  ui.action("Check placeholders and terminology", () => translationReview(strings.get(), terms.get()));
  ui.action("Export translation grid", () => download("translation-grid.json", { strings: strings.get(), terminology: terms.get() }));
  projectControls(api, ui, "translations", () => ({ strings: strings.get(), terms: terms.get() }), (v) => {
    strings.set(v.strings);
    terms.set(v.terms);
  });
  return ui;
}
function research(api, root) {
  const ui = guided(api, root, "Research sources, notes & evidence", "Add sources and notes with forms. Link claims to exact passages and document pages, record contradictory evidence and review missing references. A citation does not automatically prove a claim.");
  const sources = editor(ui, "Sources", [], [field("id", "Source ID"), field("title", "Title"), field("url", "URL"), field("reviewedOn", "Reviewed on", "date"), field("reviewDue", "Review due", "date")], { max: 500 });
  const notes = editor(ui, "Notes", [], [field("id", "Note ID"), field("sourceId", "Source ID"), field("text", "Note", "textarea"), field("locator", "Page / section")], { max: 1e3 });
  const claims = editor(ui, "Evidence", [], [field("claim", "Claim"), field("sourceId", "Source ID"), field("passage", "Exact passage", "textarea"), field("locator", "Document page / section"), field("relation", "Relation", "text", ["supports", "contradicts", "context"]), field("review", "Human review", "text", ["needs-review", "reviewed", "rejected"])], { max: 1e3 });
  ui.action("Review evidence and references", () => researchReview(sources.get(), notes.get(), claims.get()));
  ui.action("Export linked research notes", () => download("research-notes.json", { sources: sources.get(), notes: notes.get(), claims: claims.get(), review: researchReview(sources.get(), notes.get(), claims.get()) }));
  projectControls(api, ui, "research", () => ({ sources: sources.get(), notes: notes.get(), claims: claims.get() }), (v) => {
    sources.set(v.sources);
    notes.set(v.notes);
    claims.set(v.claims);
  });
  return ui;
}
function forms(api, root) {
  const ui = guided(api, root, "Form Usability Tester", "Review labels, natural keyboard order, required-field messages and responsive layouts using a local preview. This checks the supplied form definition; manual keyboard and device testing is still needed.");
  const fields = editor(ui, "Form fields", [{ id: "email", label: "Email", type: "email", required: true, message: "Enter an email address", options: "", tabIndex: 0 }], [field("id", "ID"), field("label", "Label"), field("type", "Type", "text", ["text", "email", "number", "date", "select", "textarea"]), field("required", "Required", "checkbox"), field("message", "Validation message"), field("options", "Select choices (comma-separated)"), field("tabIndex", "Tab index", "number")], { max: 100 });
  const width = ui.field("Preview device", "mobile", "select", ["mobile", "desktop"]), preview = node("div", void 0, { class: "g36-form-preview a34-wide" });
  ui.body.append(preview);
  ui.action("Import existing form fields", () => {
    const values = api.c.fdData?.fields;
    if (!Array.isArray(values)) throw Error("Open the existing form designer and add fields first");
    if (!confirm("Replace tester fields with existing form fields?")) return { $cancelled: true };
    fields.set(values.map((f, i) => ({ id: f.id || "field-" + i, label: f.label || "", type: f.type || "text", required: !!f.required, message: f.message || "", options: Array.isArray(f.choices) ? f.choices.join(", ") : "", tabIndex: 0 })));
    return { $inputsUpdated: true, imported: values.length };
  });
  ui.action("Review and preview form", () => {
    const rows = formReview(fields.get());
    preview.replaceChildren();
    preview.dataset.device = width.value;
    const form = node("form");
    for (const [fIndex, f] of fields.get().entries()) {
      const label = node("label", void 0, { class: "field" }), input = node(f.type === "select" ? "select" : f.type === "textarea" ? "textarea" : "input", void 0, { id: root.id + "-preview-" + fIndex, required: f.required, tabIndex: f.tabIndex, "aria-label": f.label || "Unlabelled field" });
      if (!["select", "textarea"].includes(f.type)) input.type = f.type;
      if (f.type === "select") input.append(...f.options.split(",").map((s) => new Option(s.trim(), s.trim())));
      label.append(node("span", f.label + (f.required ? " *" : "")), input);
      const error = node("span", "", { role: "status" });
      input.oninvalid = () => error.textContent = f.message || "Complete this field";
      input.oninput = () => {
        input.setCustomValidity("");
        error.textContent = "";
      };
      form.append(label, error);
    }
    form.append(node("button", "Test validation", { type: "submit" }));
    form.onsubmit = (e) => {
      e.preventDefault();
      ui.status.textContent = "Preview form is valid. No data was sent.";
    };
    preview.append(form);
    return { fields: rows, device: width.value, manualChecks: ["Tab through fields and confirm focus is visible", "Try empty and invalid values", "Check labels and errors at mobile and desktop widths"] };
  });
  return ui;
}
function bugs(api, root) {
  const ui = guided(api, root, "Bug Reproduction Pack", "Prepare steps, expected/actual behavior, version and selected masked inputs. Review the entire pack before sharing it; masking cannot detect every personal value.");
  const steps = ui.field("Steps to reproduce", ""), expected = ui.field("Expected result", ""), actual = ui.field("Actual result", ""), inputs = ui.field("Selected inputs (optional)", "");
  let pack = null, revision = -1;
  ui.action("Review masked reproduction pack", () => {
    pack = bugPack({ version: api.appVersion, steps: steps.value, expected: expected.value, actual: actual.value, inputs: inputs.value });
    revision = ui.revision;
    return pack;
  });
  ui.action("Export reviewed reproduction pack", () => {
    if (!pack || revision !== ui.revision) throw Error("Review the current pack first");
    download("toolstudio-bug-pack.json", pack);
    return { exported: true };
  });
  return ui;
}
export {
  bugs,
  forms,
  research,
  schemas,
  testing,
  translations
};
