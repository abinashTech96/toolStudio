import * as project from '../workflows/project.js';
import {differences,maskSecrets} from '../advanced/algorithms.js';
import { guided, node, editor, field, download, readText, changed } from "./ui.js";
import { parse, clone, reviewBundle, validateGuidedState, bounded } from "./model.js";
import { bundleDatasets, putDataset } from "./data.js";
import {preflightDatasets,datasetEntries} from './dataset-store.js';
import { digest } from "./files.js";
const encode = (bytes) => {
  let value = "";
  for (let i = 0; i < bytes.length; i += 16384) value += String.fromCharCode(...bytes.subarray(i, i + 16384));
  return btoa(value);
};
const decode = (value) => Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
function projects(api, root) {
  const ui = guided(api, root, "Portable project bundles & selective restore", "Bundle saved guided work, shared datasets, selected documents and workspace layouts. Review conflicts and choose individual items before restoring. Existing legacy backups remain available in Settings.");
  const title = ui.field("Project title", "My Tool Studio project"), documents = ui.field("Attach local documents", "", "file");
  documents.multiple = true;
  const refs = editor(ui, "Document references", [], [field("name", "Expected linked filename")], { max: 100 }), includeData = ui.field("Include shared datasets", "", "checkbox"), includeLayouts = ui.field("Include workspace layouts", "", "checkbox");
  includeData.checked = true;
  includeLayouts.checked = true;
  const datasetChoice=node('fieldset',undefined,{class:'a34-wide'}),datasetChecks=new Map();
  function refreshDatasets(){const old=new Map([...datasetChecks].map(([id,c])=>[id,c.checked]));datasetChecks.clear();datasetChoice.replaceChildren(node('legend','Datasets to include in export'));for(const d of datasetEntries()){const label=node('label'),check=node('input',undefined,{type:'checkbox',checked:old.get(d.id)??true,'aria-label':'Export dataset '+d.id});datasetChecks.set(d.id,check);label.append(check,node('span',d.name+' · '+d.rows+' rows · '+d.bytes+' bytes'));datasetChoice.append(label)}}
  ui.action('Refresh export dataset choices',()=>{refreshDatasets();return{available:datasetChecks.size}});ui.body.append(datasetChoice);refreshDatasets();
  const sharedChoices=node('fieldset',undefined,{class:'a34-wide'}),sharedChecks=new Map(),reusableChecks=new Map();
  function refreshShared(){sharedChoices.replaceChildren(node('legend','Shared records and reusable files to include'));sharedChecks.clear();reusableChecks.clear();for(const record of project.listRecords()){const label=node('label'),check=node('input',undefined,{type:'checkbox','aria-label':'Bundle shared record '+record.id});label.append(check,node('span',record.kind+' · '+record.name));sharedChoices.append(label);sharedChecks.set(record.id,check)}for(const file of project.projectFiles()){const label=node('label'),check=node('input',undefined,{type:'checkbox','aria-label':'Bundle reusable file '+file.id});label.append(check,node('span',file.name+' · '+file.size+' bytes'));sharedChoices.append(label);reusableChecks.set(file.id,check)}}
  ui.action('Refresh shared project bundle choices',()=>{refreshShared();return{records:sharedChecks.size,files:reusableChecks.size}});ui.body.append(sharedChoices);refreshShared();
  const selection = node("fieldset", void 0, { class: "a34-wide" });
  selection.append(node("legend", "Choose items to restore"));
  ui.body.append(selection);
  let candidate = null, reviewRevision = -1, verifiedFiles = [], choices = [], importTicket = 0;
  const readDocuments = async () => {
    const files = [...documents.files];
    if (files.length > 30 || files.reduce((n, f) => n + f.size, 0) > 6e6) throw Error("Attach at most 30 documents totaling 6 MB");
    return Promise.all(files.map(async (file) => {
      const bytes = new Uint8Array(await file.arrayBuffer());
      return { name: file.name, type: file.type, size: file.size, sha256: await digest(bytes), content: encode(bytes) };
    }));
  };
  let bundle = null, exportRevision = -1, exportProjectRevision=-1;
  ui.action("Review project bundle for export", async (signal, task) => {
    const files = await readDocuments();
    const projectRevision=project.projectRevision();for(const[id,check]of reusableChecks)if(check.checked){const file=project.getFile(id);if(file.size>6e6||files.reduce((n,f)=>n+f.size,0)+file.size>6e6)throw Error('Portable documents total at most 6 MB; choose fewer reusable files');const bytes=new Uint8Array(await file.arrayBuffer());files.push({name:file.name,type:file.type,size:file.size,sha256:id,content:encode(bytes),reusable:true})}
    if(projectRevision!==project.projectRevision())throw Error('Shared project changed during export review');
    if (!task.current()) return;
    const nextBundle = { format: "toolstudio-work-bundle", version: 1, title: title.value, appVersion: api.appVersion, state: api.guidedState(), sharedRecords: project.listRecords().filter(r=>sharedChecks.get(r.id)?.checked).map(r=>({...r,value:project.redactProjectValue(r.value)})), datasets: includeData.checked ? bundleDatasets([...datasetChecks].filter(([,c])=>c.checked).map(([id])=>id)) : [], layouts: includeLayouts.checked ? api.guidedLayouts() : {}, files, references: [...new Set([...refs.get().map((r) => r.name),...(api.guidedState().workspaces['pdf-review']?.sessions||[]).map(s=>s.document.name)])] };
    const report = reviewBundle(nextBundle, api.guidedState());
    bundle=nextBundle;
    exportRevision = ui.revision;exportProjectRevision=project.projectRevision();
    return { title: bundle.title, savedWorkflows: Object.keys(bundle.state.workspaces), datasets: bundle.datasets.map((d) => ({ name: d.name, rows: d.rows.length })), documents: files.map(({ content, ...f }) => f), layoutCount: Object.keys(bundle.layouts).length, missingReferences: report.missing, pdfReviewSources: (bundle.state.workspaces['pdf-review']?.sessions||[]).map(s=>({review:s.title,source:s.document.name,sha256:s.document.sha256,attachedMatch:files.some(f=>f.sha256===s.document.sha256)})), note: "Review document contents and saved inputs before sharing this project" };
  });
  ui.action("Export reviewed project bundle", () => {
    if (!bundle || exportRevision !== ui.revision || exportProjectRevision!==project.projectRevision()) throw Error("Review the current project bundle first");
    download("toolstudio-project-bundle.json", bundle);
    return { exported: true, documents: bundle.files.length };
  });
  const input = ui.field("Import project bundle", "", "file");
  input.accept = ".json";
  input.onchange = async () => {
    const ticket = ++importTicket;
    try {
      candidate = null;
      verifiedFiles = [];
      selection.replaceChildren(node("legend", "Choose items to restore"));
      const sourceFile = input.files[0], text = await readText(sourceFile, 32e6);
      if (ticket !== importTicket) return;
      const x = parse(text), review = reviewBundle(x, api.guidedState()), files = [];
      for (const f of x.files || []) {
        const bytes = decode(f.content);
        if (bytes.length !== f.size || await digest(bytes) !== f.sha256) throw Error("Bundled document checksum mismatch: " + f.name);
        files.push({ ...f, bytes });
      }
      for (const d of x.datasets || []) {
        bounded(d.rows, 5e4, "Bundled dataset");
        if (JSON.stringify(d.rows).length > 4e6) throw Error("Bundled dataset exceeds 4 MB");
      }
      if ((x.datasets || []).length > 20) throw Error("Bundle dataset limit: 20");
      api.validateGuidedLayouts(x.layouts || {});project.validateRecords(x.sharedRecords||[]);
      if (ticket !== importTicket) return;
      verifiedFiles = files;
      candidate = clone(x);
      choices = [];
      const add = (kind, id, label, checked = false) => {
        const wrap = node("label"), check = node("input", void 0, { type: "checkbox", checked, "aria-label": "Restore " + kind + " " + id });
        wrap.append(check, node("span", label));
        selection.append(wrap);
        choices.push({ kind, id, check });
      };
      for(const r of x.sharedRecords||[])add('record',r.id,r.kind+' · '+r.name+' · reviewed shared record copy',false);
      for (const w of review.workspaces) add("workflow", w.id, w.id + " \xB7 " + (w.conflict ? "CONFLICT: replaces existing saved work" : "New saved workflow"), !w.conflict);
      for (const [dIndex, d] of (x.datasets || []).entries()) add("dataset", String(dIndex), d.name + " \xB7 " + d.rows.length + " rows (adds a shared copy)", true);
      for (const [id] of Object.entries(x.layouts || {})) add("layout", id, "Layout " + id + " \xB7 replaces any current layout");
      for (const [fIndex, f] of verifiedFiles.entries()) {
        add("document", String(fIndex), f.name + " \xB7 checksum verified", true);
        if(f.reusable)add('reusable',String(fIndex),'Add reusable file '+f.name,false);
        const button = node("button", "Download bundled " + f.name, { type: "button" });
        button.onclick = () => download(f.name, new Blob([f.bytes], { type: f.type || "application/octet-stream" }));
        selection.append(button);
      }
      reviewRevision = ui.revision;
      ui.report({ title: x.title, workspaces: review.workspaces, datasets: (x.datasets || []).map((d) => ({ name: d.name, rows: d.rows.length })), sharedRecords:(x.sharedRecords||[]).map(r=>({id:r.id,name:r.name,kind:r.kind})),differences:review.workspaces.filter(w=>w.conflict).map(w=>({workflow:w.id,changes:differences(api.guidedState().workspaces[w.id],x.state.workspaces[w.id]).slice(0,100)})),verifiedDocuments: verifiedFiles.length, missingReferences: review.missing }, "Selective restore preview");
    } catch (e) {
      if (ticket !== importTicket) return;
      candidate = null;
      verifiedFiles = [];
      ui.status.textContent = e.message;
    }
  };
  ui.action("Restore selected reviewed items", async (signal,task) => {
    if (!candidate || reviewRevision !== ui.revision) throw Error("Import and review a current bundle first");
    const selected = choices.filter((c) => c.check.checked);
    if (!selected.length) throw Error("Select at least one item");
    if (!confirm("Restore " + selected.length + " selected items? Selected existing saved workflows/layouts will be replaced. Unselected work remains available.")) return { $cancelled: true };
    const state = api.guidedState();
    for (const c of selected) if (c.kind === "workflow") state.workspaces[c.id] = clone(candidate.state.workspaces[c.id]);
    const layouts = api.guidedLayouts();
    for (const c of selected) if (c.kind === "layout") layouts[c.id] = clone(candidate.layouts[c.id]);
    preflightDatasets(selected.filter(c=>c.kind==='dataset').map(c=>candidate.datasets[Number(c.id)]));
    const projectRevision=project.projectRevision(),incomingRecords=selected.filter(c=>c.kind==='record').map(c=>candidate.sharedRecords.find(r=>r.id===c.id)),records=[...project.listRecords(),...incomingRecords.map(r=>({...r,id:'record-'+crypto.randomUUID(),name:(r.name+' (restored)').slice(0,120),revision:projectRevision+1}))],files=new Map(project.projectSnapshot().files.map(f=>[f.id,f]));for(const c of selected.filter(c=>c.kind==='reusable')){const f=verifiedFiles[Number(c.id)];files.set(f.sha256,{id:f.sha256,file:new File([f.bytes],f.name,{type:f.type})})}
    const prepared=await project.prepareProject({records,files:[...files.values()]});if(!task.current()||projectRevision!==project.projectRevision())throw Error('Project changed during restore review');
    preflightDatasets(selected.filter(c=>c.kind==='dataset').map(c=>candidate.datasets[Number(c.id)]));
    api.saveGuidedBundle(validateGuidedState(state), layouts);
    if(incomingRecords.length||selected.some(c=>c.kind==='reusable'))project.commitPreparedProject(prepared,{expected:projectRevision});
    for (const c of selected) if (c.kind === "dataset") {
      const d = candidate.datasets[Number(c.id)];
      putDataset(d.name + " (restored)", d.rows);
    }
    for (const c of selected) if (c.kind === "document") {
      const f = verifiedFiles[Number(c.id)];
      download(f.name, new Blob([f.bytes], { type: f.type || "application/octet-stream" }));
    }
    candidate = null;
    return { restored: selected.map((c) => ({ kind: c.kind, id: c.id })), note: "Load saved guided work in each workflow to review its inputs. Documents are downloaded as separate files." };
  });
  selection.addEventListener("input", (e) => e.stopPropagation());
  ui.onRelease(() => {
    importTicket++;
    candidate = bundle = null;
    verifiedFiles = [];
    documents.value = input.value = "";
    selection.replaceChildren(node("legend", "Choose items to restore"));
  });
  return ui;
}
export {
  projects
};
