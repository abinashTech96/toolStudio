import {parseDelimited} from '../workflows/csv.js';
import { guided, node, editor, field, download, projectControls, changed, readText, table } from "./ui.js";
import { parse, clone, bounded, columns, transformRows, apiRehearsal, acceptanceReport } from "./model.js";
import {bundleDatasets,clearDatasets,datasetEntries,getDataset,putDataset,deleteDataset,datasetUsage} from './dataset-store.js';
function datasetPicker(api, ui, { label = "Shared dataset", load = () => {
} } = {}) {
  const select = ui.field(label, "", "select", []), row = ui.row(), refresh = () => {
    const value = select.value;
    select.replaceChildren(...datasetEntries().map((d) => new Option(`${d.name} \xB7 ${d.rows} rows`, d.id)));
    if ([...select.options].some((o) => o.value === value)) select.value = value;
  };
  const button = (name, run) => {
    const b = node("button", name, { type: "button" });
    b.onclick = () => {
      try {
        run();
      } catch (e) {
        ui.status.textContent = e.message;
      }
    };
    row.append(b);
  };
  button("Refresh shared datasets", refresh);
  button("Inspect dataset lineage & memory",()=>{const{rows,...dataset}=getDataset(select.value);ui.report({dataset,rows:rows.length,usage:datasetUsage()})});
  button("Replace selected with Data Workbench",()=>{const rows=api.getRows();if(!rows.length)throw Error('Load Data Workbench first');if(!confirm('Replace selected shared dataset? Export it first if you need the old rows.'))return;putDataset(getDataset(select.value).name,rows,{replace:select.value,operation:'replace from Workbench'});refresh()});
  button("Delete selected shared dataset",()=>{const d=getDataset(select.value);if(confirm('Delete shared dataset '+d.name+'? Other editors keep their loaded copies.')){deleteDataset(select.value);refresh()}});
  button("Load selected dataset", () => {
    const d = getDataset(select.value);
    load(d.rows, d);
    ui.status.textContent = "Loaded all " + d.rows.length + " rows from " + d.name;
  });
  button("Share current Data Workbench", () => {
    const rows = api.getRows();
    if (!rows.length) throw Error("Load data into Data Workbench first");
    const id = putDataset("Data Workbench", rows);
    refresh();
    select.value = id;
    ui.status.textContent = "Shared all " + rows.length + " rows; original Workbench data retained";
  });
  refresh();
  return { select, refresh };
}
function parseCSV(text){return parseDelimited(text)}
function dataWorkflow(api, root) {
  const ui = guided(api, root, "Shared datasets & transformation steps", "Load a complete dataset, build transformation steps and review counts before applying. Only the result preview is limited; operations use every loaded row.");
  const name = ui.field("Dataset name", "Working dataset"), file = ui.field("Upload CSV or JSON dataset", "", "file"), count = node("p", "No dataset loaded.", { class: "a34-wide", role: "status" });
  ui.body.append(count);
  let source = [], candidate = null, reviewRevision = -1;
  const preview = node("div", void 0, { class: "a34-wide" });
  ui.body.append(preview);
  const load = (rows) => {
    source = clone(bounded(rows, 5e4));
    count.textContent = `Complete dataset: ${source.length} rows. Preview: first ${Math.min(100, source.length)} rows. All operations use ${source.length} rows.`;
    preview.replaceChildren();
    table(preview, source.slice(0, 100));
    changed(name);
    candidate = null;
  };
  datasetPicker(api, ui, { load });
  file.accept = ".csv,.json";
  file.onchange = async () => {
    try {
      const text = await readText(file.files[0], 4e6), rows = file.files[0].name.toLowerCase().endsWith(".csv") ? parseCSV(text) : bounded(parse(text), 5e4);
      load(rows);
      name.value = file.files[0].name;
      const id = putDataset(name.value, rows);
      ui.status.textContent = "Loaded and shared " + rows.length + " rows";
    } catch (e) {
      ui.status.textContent = e.message;
    }
  };
  ui.action("Load complete Data Workbench", () => {
    load(api.getRows());
    return { $inputsUpdated: true, fullRows: source.length, previewRows: Math.min(100, source.length) };
  });
  const steps = editor(ui, "Steps", [], [field("operation", "Operation", "text", ["trim", "number", "rename", "filter-equals", "drop-empty", "deduplicate"]), field("column", "Column"), field("value", "Value / new column name")], { max: 100 });
  ui.action("Review transformation on full dataset", () => {
    if (!source.length) throw Error("Load a dataset first");
    candidate = transformRows(source, steps.get());
    reviewRevision = ui.revision;
    return { beforeRows: candidate.beforeRows, afterRows: candidate.afterRows, history: candidate.history, previewRows: candidate.rows.slice(0, 100), previewLimit: 100, operationScope: "Complete loaded dataset" };
  });
  ui.action("Apply reviewed rows to Data Workbench", () => {
    if (!candidate || reviewRevision !== ui.revision) throw Error("Review the current full-dataset result first");
    if (api.applyRows(candidate.rows)) return { appliedRows: candidate.rows.length, undo: "Use existing Workbench Undo" };
    return { $cancelled: true };
  });
  ui.action("Share reviewed result", () => {
    if (!candidate || reviewRevision !== ui.revision) throw Error("Review the current result first");
    return { shared: putDataset(name.value + " result", candidate.rows,{operation:JSON.stringify(candidate.history).slice(0,160)}), rows: candidate.rows.length };
  });
  ui.action("Export complete reviewed dataset", () => {
    if (!candidate || reviewRevision !== ui.revision) throw Error("Review the current result first");
    download("transformed-dataset.json", candidate.rows);
    return { exportedRows: candidate.rows.length };
  });
  projectControls(api, ui, "data-steps", () => ({ name: name.value, source, steps: steps.get() }), (v) => {
    name.value = v.name;
    load(v.source);
    steps.set(v.steps);
  });
  return ui;
}
function rehearsal(api, root) {
  const ui = guided(api, root, "Spreadsheet-to-API Rehearsal", "Map CSV columns to payload fields and validate every row. This prepares batches and never sends API requests.");
  let rows = [];
  const count = node("p", "No data loaded.", { role: "status" });
  ui.body.append(count);
  const load = (value) => {
    rows = clone(value);
    count.textContent = rows.length + " complete rows loaded";
    changed(count);
  };
  datasetPicker(api, ui, { load });
  const file = ui.field("Upload source CSV", "", "file");
  file.accept = ".csv";
  file.onchange = async () => {
    try {
      load(parseCSV(await readText(file.files[0], 4e6)));
    } catch (e) {
      ui.status.textContent = e.message;
    }
  };
  const maps = editor(ui, "Column mappings", [{ source: "name", target: "Name", type: "string", required: true }], [field("source", "CSV column"), field("target", "Payload field"), field("type", "Type", "text", ["string", "number", "boolean"]), field("required", "Required", "checkbox")], { max: 100 }), path = ui.field("Relative API endpoint", "/items"), method = ui.field("Payload method", "POST", "select", ["POST", "PATCH", "PUT"]), size = ui.field("Rows per batch", "25", "number");
  let report = null, revision = -1;
  ui.action("Validate rows and preview batches", () => {
    if (!rows.length) throw Error("Load a complete source dataset");
    for (const m of maps.get()) if (!columns(rows).includes(m.source)) throw Error("Unknown CSV column " + m.source);
    report = apiRehearsal(rows, maps.get(), { path: path.value, method: method.value, batchSize: size.value });
    revision = ui.revision;
    return report;
  });
  ui.action("Export reviewed payload batches", () => {
    if (!report || revision !== ui.revision) throw Error("Validate current mappings first");
    if (!report.valid) throw Error("Resolve row validation failures before exporting payloads");
    download("api-rehearsal.json", report);
    return { exportedRows: rows.length, requestsSent: 0 };
  });
  return ui;
}
function migration(api, root) {
  const ui = guided(api, root, "Migration Acceptance Report", "Match source and target IDs, compare values and numeric totals, and find relationships missing from the supplied target dataset.");
  let source = [], target = [];
  const a = node("p", "Source: none", { role: "status" }), b = node("p", "Target: none", { role: "status" });
  ui.body.append(a, b);
  const load = (side, rows) => {
    if (side === "source") {
      source = rows;
      a.textContent = "Source: " + rows.length + " complete rows";
    } else {
      target = rows;
      b.textContent = "Target: " + rows.length + " complete rows";
    }
    changed(a);
  };
  datasetPicker(api, ui, { label: "Source shared dataset", load: (rows) => load("source", rows) });
  datasetPicker(api, ui, { label: "Target shared dataset", load: (rows) => load("target", rows) });
  for (const side of ["source", "target"]) {
    const file = ui.field("Upload " + side + " CSV/JSON", "", "file");
    file.accept = ".csv,.json";
    file.onchange = async () => {
      try {
        const text = await readText(file.files[0], 4e6);
        load(side, file.files[0].name.endsWith(".csv") ? parseCSV(text) : bounded(parse(text), 5e4));
      } catch (e) {
        ui.status.textContent = e.message;
      }
    };
  }
  const key = ui.field("Match ID column", "id"), numeric = ui.field("Optional numeric total column", ""), relations = editor(ui, "Relationships", [], [field("column", "Reference column"), field("targetKey", "Target ID column")], { max: 100 });
  ui.action("Generate acceptance report", () => {
    if (!source.length || !target.length) throw Error("Load both complete datasets");
    return acceptanceReport(source, target, { key: key.value, numeric: numeric.value, relationships: relations.get() });
  });
  return ui;
}
function handoff(api, root, id) {
  const ui = guided(api, root, "Use a shared dataset", "Choose complete data from the same in-memory shelf used by Data Workbench, Query, Quality and Comparison. Review before replacing another editor.");
  let rows = [];
  datasetPicker(api, ui, { load: (value) => {
    rows = value;
    ui.report({ completeRows: rows.length, preview: rows.slice(0, 100) });
  } });
  ui.action("Copy complete dataset to existing editor", async (signal, task) => {
    if (!rows.length) throw Error("Load a shared dataset");
    const labels = id === "qualitystudio" ? ["Row objects"] : id === "comparisonstudio" ? ["Left revision", "Left JSON", "Left records"] : ["Tables as JSON"];
    const panel = api.c.$(id);
    if (id === "comparisonstudio") {
      const extension = panel.querySelector("[data-advanced-feature]");
      if (extension) {
        extension.open = true;
        for (let n = 0; n < 100 && !extension.querySelector('[aria-label="Left revision"]'); n++) {
          await new Promise((resolve) => setTimeout(resolve, 30));
          if (!task.current()) throw Error("Selection changed; load the dataset again");
        }
      }
    }
    const target = [...panel.querySelectorAll("textarea")].find((t) => labels.includes(t.getAttribute("aria-label")));
    if (!target) throw Error("Open the existing editor and choose its JSON input; use Export complete dataset if this tool is using a different format");
    if (!confirm("Replace " + target.getAttribute("aria-label") + " with all " + rows.length + " shared rows?")) return { $cancelled: true };
    target.value = JSON.stringify(id === "querystudio" ? { shared: rows } : rows, null, 2);
    changed(target);
    return { copiedRows: rows.length };
  });
  ui.action("Export complete selected dataset", () => {
    if (!rows.length) throw Error("Load a shared dataset");
    download("shared-dataset.json", rows);
    return { exportedRows: rows.length };
  });
  return ui;
}
export {
  bundleDatasets,
  clearDatasets,
  dataWorkflow,
  datasetEntries,
  datasetPicker,
  getDataset,
  handoff,
  migration,
  parseCSV,
  putDataset,
  rehearsal
};
