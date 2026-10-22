import {ocrWords,mergeOCRRegion} from '../workflows/media.js';
import { guided, node, editor, field, download, projectControls, changed, readText, table } from "./ui.js";
import { clone, documentInspection } from "./model.js";
async function digest(bytes) {
  return [...new Uint8Array(await crypto.subtle.digest("SHA-256", bytes))].map((n) => n.toString(16).padStart(2, "0")).join("");
}
function arrangeObjects(rows, selected, mode) {
  const result = clone(rows), items = selected.map((i) => ({ i, row: result[i] })).filter((x) => !x.row.locked);
  if (items.length < 2) throw Error("Select at least two unlocked objects");
  for (const { row } of items) if (!["x", "y", "width", "height"].every((k) => Number.isFinite(Number(row[k])))) throw Error("Object bounds must be finite");
  const left = Math.min(...items.map((x) => x.row.x)), top = Math.min(...items.map((x) => x.row.y)), right = Math.max(...items.map((x) => Number(x.row.x) + Number(x.row.width))), bottom = Math.max(...items.map((x) => Number(x.row.y) + Number(x.row.height)));
  if (mode.startsWith("space-")) {
    if (items.length < 3) throw Error("Select at least three unlocked objects for equal spacing");
    const axis = mode === "space-x" ? "x" : "y", size = axis === "x" ? "width" : "height", start = axis === "x" ? left : top, end = axis === "x" ? right : bottom;
    items.sort((a, b) => a.row[axis] - b.row[axis]);
    const gap = (end - start - items.reduce((n, x) => n + Number(x.row[size]), 0)) / (items.length - 1);
    let position = start;
    for (const x of items) {
      x.row[axis] = position;
      position += Number(x.row[size]) + gap;
    }
  } else for (const { row } of items) {
    if (mode === "left") row.x = left;
    if (mode === "center") row.x = (left + right - Number(row.width)) / 2;
    if (mode === "right") row.x = right - Number(row.width);
    if (mode === "top") row.y = top;
    if (mode === "middle") row.y = (top + bottom - Number(row.height)) / 2;
    if (mode === "bottom") row.y = bottom - Number(row.height);
  }
  return result;
}
function layers(api, root) {
  const ui = guided(api, root, "Visual image layers & alignment", "Capture the current photo, add shapes/text and arrange selected layers. Hidden layers are omitted from output; locked layers cannot be edited, removed or aligned until unlocked. Existing Image Studio Undo is retained when applying.");
  const rows = editor(ui, "Layers", [{ type: "image", text: "", x: 0, y: 0, width: 100, height: 100, color: "#ffffff", opacity: 1, visible: true, locked: true }], [field("type", "Type", "text", ["image", "text", "rect", "ellipse"]), field("text", "Text"), field("x", "X", "number"), field("y", "Y", "number"), field("width", "Width", "number"), field("height", "Height / font size", "number"), field("color", "Color", "color"), field("opacity", "Opacity (0\u20131)", "number"), field("visible", "Visible", "checkbox"), field("locked", "Locked", "checkbox")], { max: 40 });
  const align = ui.field("Align selected layers", "left", "select", ["left", "center", "right", "top", "middle", "bottom", "space-x", "space-y"]);
  let base = null, canvas = null, baseRevision = -1, reviewRevision = -1;
  ui.action("Capture current image", () => {
    const src = api.c.ciNeed();
    if (src.width * src.height > 6e6) throw Error("Resize image to six megapixels or less");
    if (base) base.width = base.height = 0;
    if (canvas) canvas.width = canvas.height = 0;
    canvas = null;
    reviewRevision = -1;
    base = api.c.ciClone(src);
    baseRevision = api.c.ci.revision;
    rows.set(rows.get().map(r=>r.type==="image"&&r.locked?{...r,width:base.width,height:base.height}:r));
    return { width: base.width, height: base.height };
  });
  ui.action("Arrange selected layers", () => {
    const indices = rows.selectedIndices();
    rows.set(arrangeObjects(rows.get(), indices, align.value));
    return { $inputsUpdated: true, arranged: indices.length };
  });
  ui.action("Review layered image", () => {
    if (!base) throw Error("Capture current image first");
    if(canvas)canvas.width=canvas.height=0;
    canvas = api.c.ciCanvas(base.width, base.height);
    const ctx = canvas.getContext("2d");
    for (const r of rows.get()) {
      if (!r.visible) continue;
      for (const k of ["x", "y", "width", "height", "opacity"]) if (!Number.isFinite(Number(r[k]))) throw Error("Layer " + k + " must be finite");
      if (r.width < 0 || r.height < 0) throw Error("Layer bounds must be nonnegative");
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, r.opacity));
      ctx.fillStyle = r.color;
      ctx.translate(r.x, r.y);
      if (r.type === "image") ctx.drawImage(base, 0, 0, r.width, r.height);
      else if (r.type === "text") {
        ctx.font = Math.min(1e3, r.height || 24) + "px sans-serif";
        ctx.fillText(r.text, 0, 0);
      } else if (r.type === "rect") ctx.fillRect(0, 0, r.width, r.height);
      else {
        ctx.beginPath();
        ctx.ellipse(r.width / 2, r.height / 2, r.width / 2, r.height / 2, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
    reviewRevision = ui.revision;
    ui.afterReport(() => ui.output.append(api.c.ciClone(canvas)));
    return { layers: rows.get().length, width: canvas.width, height: canvas.height };
  });
  ui.action("Apply reviewed image with Undo", async (signal, task) => {
    if (!canvas || reviewRevision !== ui.revision || baseRevision !== api.c.ci.revision) throw Error("Image or layers changed; capture and review again");
    if (!confirm("Apply the reviewed layers to Image Studio? Existing Undo remains available.")) return { $cancelled: true };
    await api.c.ciEdit(() => api.c.ciClone(canvas), "Guided layer stack");
    baseRevision = -1;
    return { applied: true };
  });
  ui.action("Export reviewed PNG", async (signal, task) => {
    if (!canvas || reviewRevision !== ui.revision) throw Error("Review current image first");
    const blob = await api.c.ciEncode(canvas);
    if (task.current()) download("guided-layers.png", blob, "image/png");
  });
  ui.onRelease(() => {
    if (base) base.width = base.height = 0;
    if (canvas) canvas.width = canvas.height = 0;
    base = canvas = null;
    baseRevision = reviewRevision = -1;
  });
  projectControls(api, ui, "image-layers", () => ({ layers: rows.get() }), (v) => rows.set(v.layers));
  return ui;
}
function ocr(api, root) {
  const ui = guided(api, root, "OCR correction by source region", "Use Image Studio\u2019s recognized word locations to select the matching region and correct its text. The image revision must still match the OCR extraction.");
  const words = node("div", void 0, { class: "a34-wide" });
  ui.body.append(words);
  ui.action("Show recognized regions", () => {
    const c = api.c;
    if (c.ci25.ocrRevision !== c.ci.revision || !c.ci25.ocr.length) throw Error("Extract text from the current image in Image Studio first");
    words.replaceChildren(...c.ci25.ocr.slice(0, 500).map((w, i) => {
      const b = node("button", w.text + " \xB7 (" + w.x + "," + w.y + ")", { type: "button" });
      b.onclick = () => {
        if (c.ci25.ocrRevision !== c.ci.revision) {
          ui.status.textContent = "Image changed; extract again";
          return;
        }
        const image=c.ci.canvas,words=c.ci25.ocr;
        c.openTab("camerastudio");
        if(c.ci.mode!=="extract"){
          c.ciMode("extract");
          // Switching modes cancels jobs and increments the revision without
          // changing pixels. Rebase word positions only for the identical source.
          if(c.ci.canvas!==image||c.ci25.ocr!==words){ui.status.textContent="Source image changed; extract again";return}
          c.ci25.ocrRevision=c.ci.revision;
        }
        c.ci25OCRSelect(i);
        c.$("ci25OCRReview").open = true;
        c.$("ci25OCRCorrection").focus();
        c.$("ci25OCRReview").scrollIntoView({ block: "center" });
      };
      return b;
    }));
    return { regions: c.ci25.ocr.length, interactiveRegions: Math.min(500, c.ci25.ocr.length), note: "Select a word to review its source bounding box and use the existing correction control" };
  });
  const regionX=ui.field('OCR region X','0','number'),regionY=ui.field('OCR region Y','0','number'),regionW=ui.field('OCR region width','100','number'),regionH=ui.field('OCR region height','100','number');let reviewed=null;
  ui.action('Reprocess selected OCR region',async(signal,task)=>{
    const c=api.c;c.ciNeedIdle();const source=c.ciNeed(),revision=c.ci.revision,original=structuredClone(c.ci25.ocr),text=c.$('ciOCRText').value;
    if(c.ci25.ocrRevision!==revision||text!==c.ci25.ocrText)throw Error('Extract the current image first; apply word corrections before reprocessing');
    const area={x:Number(regionX.value),y:Number(regionY.value),w:Number(regionW.value),h:Number(regionH.value)};if(!Object.values(area).every(Number.isInteger)||area.x<0||area.y<0||area.w<1||area.h<1||area.x+area.w>source.width||area.y+area.h>source.height||area.w*area.h>6e6)throw Error('Choose an integer region inside the image, up to six megapixels');
    const canvas=c.ciCanvas(area.w,area.h);canvas.getContext('2d').drawImage(source,area.x,area.y,area.w,area.h,0,0,area.w,area.h);const cancel=()=>{const worker=c.editionWorkers.get('ci-ocr');if(worker){c.stopEditionWorker('ci-ocr');worker.failure?.()}};signal.addEventListener('abort',cancel,{once:true});c.ci.busy=true;c.ciButtons();
    try{const data=await c.ciOCRRecognize(canvas,revision);if(!task.current()||revision!==c.ci.revision||JSON.stringify(original)!==JSON.stringify(c.ci25.ocr)||text!==c.$('ciOCRText').value)throw Error('Image or OCR text changed; reprocess again');const parsed=ocrWords(data,{...area,width:area.w,height:area.h});reviewed={...mergeOCRRegion(original,parsed.words,area),original,text,revision,uiRevision:ui.revision};return{region:area,replacedWords:reviewed.replaced,preservedWords:reviewed.preserved,recognized:parsed.words,preview:reviewed.text,note:'Outside words and their corrections are retained. Overlapping words are replaced only after Apply; review reconstructed spacing.'}}finally{signal.removeEventListener('abort',cancel);canvas.width=canvas.height=0;c.ci.busy=false;c.ciButtons()}
  });
  ui.action('Apply reviewed OCR region',()=>{const c=api.c;if(!reviewed||reviewed.revision!==c.ci.revision||reviewed.uiRevision!==ui.revision||JSON.stringify(reviewed.original)!==JSON.stringify(c.ci25.ocr)||reviewed.text!==c.$('ciOCRText').value)throw Error('OCR inputs changed; reprocess and review again');if(!confirm('Replace reviewed overlapping words and reconstruct OCR spacing? Outside word corrections are retained.'))return{$cancelled:true};c.ci25.ocr=reviewed.words;c.ci25.ocrText=reviewed.text;c.$('ciOCRText').value=reviewed.text;changed(c.$('ciOCRText'));c.ci25OCRList();c.ci25OCRSelect(0);reviewed=null;return{applied:true,undo:'OCR text input Undo remains available'}});
  ui.onRelease(()=>{reviewed=null;words.replaceChildren()});
  return ui;
}
function batches(api, root) {
  const ui = guided(api, root, "Image batch results & retry", "Process each image with the current Image Studio batch settings. Successful results stay available if another file fails; retry an individual file after fixing it or changing settings.");
  const input = ui.field("Batch image files", "", "file");
  input.multiple = true;
  input.accept = "image/png,image/jpeg,image/webp";
  const list = node("div", void 0, { class: "a34-wide" });
  ui.body.append(list);
  let records = [],generation=0,active=false;
  const run = async (record, task) => {
    if(record.state==="running")throw Error("This file is already processing");
    record.state = "running";render();
    try {
      if (record.file.size > 2e7 || records.length > 30 || records.reduce((n, r) => n + r.file.size, 0) > 6e7) throw Error("Batch limits: 30 files, 20 MB per file, 60 MB total");
      const settings = api.c.ci25BatchSettings(), signature = JSON.stringify(settings), current = () => task.current() && records.includes(record) && signature === JSON.stringify(api.c.ci25BatchSettings()), result = await api.c.ci25BatchProcess(record.file, settings, current);
      if (!current()) throw Error("Batch inputs changed; run again");
      const blob=result.blob||result;if(records.reduce((n,r)=>n+(r===record?0:r.blob?.size||0),0)+blob.size>64*1048576)throw Error("Combined output exceeds 64 MiB");
      record.blob = blob;
      record.state = "ready";
      record.error = "";
      record.settings = clone(settings);
    } catch (e) {
      record.state = e.name==="AbortError"||!task.current()?"cancelled":"failed";
      record.error = e.message;
    }
    render();
  };
  function render() {
    list.replaceChildren(...records.map((r, i) => {
      const row = node("article");
      row.append(node("strong", r.file.name), node("p", r.state + (r.error ? " \xB7 " + r.error : "")));
      const retry = node("button", "Retry " + r.file.name, { type: "button" });
      retry.onclick = async () => {
        if(active)return;active=true;const ticket=generation;retry.disabled=true;try{await run(r,{current:()=>generation===ticket&&records.includes(r)})}finally{active=false;render()}
      };
      retry.disabled=active||r.state==="running";row.append(retry);
      if (r.state === "ready") {
        const save = node("button", "Download " + r.file.name, { type: "button" });
        save.onclick = () => download(r.file.name.replace(/\.[^.]+$/, "") + "-processed." + (r.blob.type === "image/png" ? "png" : r.blob.type === "image/webp" ? "webp" : "jpg"), r.blob, r.blob.type);
        row.append(save);
      }
      return row;
    }));
  }
  input.onchange = () => {
    generation++;
    records = [...input.files].map((file) => ({ file, state: "pending", error: "", blob: null }));
    render();
  };
  const process=async(onlyFailed,signal,task)=>{
    if(active)throw Error('A batch is already processing');
    if (!records.length || records.length > 30 || records.reduce((n,r)=>n+r.file.size,0)>6e7)throw Error('Choose 1–30 images totaling at most 60 MB');
    const pending=records.filter(r=>!onlyFailed||['failed','cancelled'].includes(r.state)),ticket=generation;active=true;render();
    try{for(const r of pending){if(signal.aborted||!task.current()||generation!==ticket)throw new DOMException('Batch cancelled or inputs changed','AbortError');await run(r,{current:()=>!signal.aborted&&task.current()&&generation===ticket})}}finally{active=false;render()}
    return records.map(r=>({file:r.file.name,state:r.state,error:r.error,bytes:r.blob?.size||0}));
  };
  ui.action('Process all batch files',(signal,task)=>process(false,signal,task));
  ui.action('Retry failed batch files only',(signal,task)=>process(true,signal,task));
  const stop=node('button','Stop current batch',{type:'button'});stop.onclick=()=>{generation++;ui.status.textContent='Cancellation requested; successful outputs retained'};ui.body.append(stop);
  ui.onRelease(() => {
    generation++;records = [];
    input.value = "";
    render();
  });
  return ui;
}
function documents(api, root) {
  const ui = guided(api, root, "Document Pack Inspector", "Check expected files, duplicate content, file order, PDF page counts and size limits. Move entries into the desired order before reviewing. Files remain local.");
  const input = ui.field("Document pack files", "", "file");
  input.multiple = true;
  const expected = ui.field("Expected filenames (one per line)", ""), max = ui.field("Maximum bytes per file", "20000000", "number"), list = node("div", void 0, { class: "a34-wide" });
  ui.body.append(list);
  let records = [];
  const pagePlans = editor(ui, "PDF page plans", [], [field("name", "PDF filename"), field("pages", "Reviewed page order (comma-separated)")], { max: 30 });
  function render() {
    list.replaceChildren(...records.map((r, i) => {
      const row = node("div", void 0, { class: "row" });
      row.append(node("span", i + 1 + ". " + r.name + " \xB7 " + r.state));
      for (const [label, delta] of [["Move earlier", -1], ["Move later", 1]]) {
        const b = node("button", label, { type: "button", "aria-label": label + " " + r.name });
        b.onclick = () => {
          const j = i + delta;
          if (j < 0 || j >= records.length) return;
          [records[i], records[j]] = [records[j], records[i]];
          changed(input);
          render();
        };
        row.append(b);
      }
      return row;
    }));
  }
  input.onchange = () => {
    records = [...input.files].map((file) => ({ file, name: file.name, size: file.size, state: "pending" }));
    render();
  };
  ui.action("Inspect complete document pack", async (signal, task) => {
    if (!records.length || records.length > 30 || records.reduce((n, r) => n + r.size, 0) > 6e7) throw Error("Choose 1\u201330 files totaling at most 60 MB");
    if (!Number.isFinite(Number(max.value)) || Number(max.value) < 1) throw Error("Enter a positive file size limit");
    for (const r of records) {
      if (!task.current()) return;
      try {
        if (r.size > 2e7) throw Error("Inspection limit: 20 MB per file");
        const bytes = await r.file.arrayBuffer();
        r.sha256 = await digest(bytes);
        r.pages = "";
        if (/\.pdf$/i.test(r.name)) {
          const doc = await (await api.pdfEditor()).PDFDocument.load(bytes);
          r.pages = doc.getPageCount();
        }
        r.state = "ready";
      } catch (e) {
        r.state = "failed";
        r.error = e.message;
      }
      render();
    }
    if (!task.current()) return;
    const pageOrder = pagePlans.get().map((plan) => {
      const file = records.find((r) => r.name === plan.name), pages = plan.pages.split(",").map((v) => Number(v.trim()));
      return { file: plan.name, pages, issues: [!file ? "Missing file" : "", file && !Number.isInteger(file.pages) ? "PDF page count unavailable" : "", file && pages.some((p) => !Number.isInteger(p) || p < 1 || p > file.pages) ? "Page outside document bounds" : "", new Set(pages).size !== pages.length ? "Duplicate page in plan" : "", file && new Set(pages).size < file.pages ? "Some source pages omitted; review before assembly" : ""].filter(Boolean) };
    });
    return { ...documentInspection(records.map(({ file, ...r }) => r), expected.value.split(/\r?\n/).filter(Boolean), Number(max.value)), pageOrder, note: "Page plans are reviewed instructions; use existing PDF assembly tools to apply them." };
  });
  ui.onRelease(() => {
    records = [];
    input.value = "";
    render();
  });
  return ui;
}
function vectors(api, root) {
  const ui = guided(api, root, "Vector multi-selection & spacing", "Select shapes in the current Vector Studio canvas, then review alignment offsets. Apply updates the existing SVG source; load/sanitize it in Vector Studio to continue using its controls.");
  const choices = node("fieldset", void 0, { class: "a34-wide" });
  choices.append(node("legend", "Selected vector shapes"));
  ui.body.append(choices);
  const mode = ui.field("Align vector objects", "left", "select", ["left", "center", "right", "top", "middle", "bottom", "space-x", "space-y"]);
  let elements = [], checks = [], candidate = null, signature = "", revision = -1;
  const original = () => api.c.$("vectorstudio")?.querySelector(".a34-svg-stage svg");
  ui.action("Refresh vector selection", () => {
    const svg = original();
    if (!svg) throw Error("Load an SVG in Vector Studio first");
    elements = [...svg.children].filter((e) => !["defs", "title", "desc"].includes(e.localName));
    checks = [];
    choices.replaceChildren(node("legend", "Selected vector shapes"));
    for (const [i, e] of elements.entries()) {
      const wrap = node("label"), check = node("input", void 0, { type: "checkbox", "aria-label": "Select vector " + (i + 1) });
      wrap.append(check, node("span", e.localName + " " + (i + 1)));
      choices.append(wrap);
      checks.push(check);
    }
    return { shapes: elements.length };
  });
  ui.action("Review vector alignment", () => {
    const svg = original();
    if (!svg || elements.some((e) => e.parentElement !== svg)) throw Error("Canvas changed; refresh vector selection");
    const selected = checks.flatMap((c, i) => c.checked ? [i] : []), bounds = elements.map((e) => {
      const box = e.getBBox(), matrix = e.transform.baseVal.consolidate()?.matrix;
      if (matrix && (Math.abs(matrix.b) > 1e-8 || Math.abs(matrix.c) > 1e-8 || matrix.a < 0 || matrix.d < 0)) throw Error("Flatten rotations, skews and reflections before multi-alignment");
      return { x: box.x * (matrix?.a ?? 1) + (matrix?.e ?? 0), y: box.y * (matrix?.d ?? 1) + (matrix?.f ?? 0), width: box.width * (matrix?.a ?? 1), height: box.height * (matrix?.d ?? 1) };
    }), arranged = arrangeObjects(bounds, selected, mode.value);
    signature = new XMLSerializer().serializeToString(svg);
    candidate = selected.map((i) => ({ i, dx: arranged[i].x - bounds[i].x, dy: arranged[i].y - bounds[i].y }));
    revision = ui.revision;
    return candidate.map(({ i, dx, dy }) => ({ shape: i + 1, dx, dy }));
  });
  ui.action("Apply reviewed vector alignment to source", () => {
    const svg = original(), source = api.c.$("vectorstudio").querySelector('[aria-label="SVG source"]');
    if (!candidate || revision !== ui.revision || new XMLSerializer().serializeToString(svg) !== signature) throw Error("Vector selection or canvas changed; review again");
    if (!confirm("Replace SVG source with the reviewed alignment? Load/sanitize the source in Vector Studio to update its canvas.")) return { $cancelled: true };
    const copy = svg.cloneNode(true);
    for (const { i, dx, dy } of candidate) {
      const e = copy.children[[...svg.children].indexOf(elements[i])], transform = e.getAttribute("transform") || "";
      e.setAttribute("transform", `translate(${dx} ${dy}) ${transform}`);
    }
    source.value = new XMLSerializer().serializeToString(copy);
    changed(source);
    candidate = null;
    return { updatedSource: true, note: "Choose Load / sanitize SVG in the existing editor. Its original source remains available in input undo." };
  });
  return ui;
}
export {
  arrangeObjects,
  batches,
  digest,
  documents,
  layers,
  ocr,
  vectors
};
