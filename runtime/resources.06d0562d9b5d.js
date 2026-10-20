// src/core/resources.js
function createResources(context, config, baseURL) {
  const pending = /* @__PURE__ */ new Map(), loaded = /* @__PURE__ */ new Set(), bytes = /* @__PURE__ */ new Map();
  const url = (path) => new URL(path, baseURL).href;
  async function response(path) {
    const r = await fetch(url(path));
    if (!r.ok) throw new Error("Resource could not load (" + r.status + ")");
    return r;
  }
  function ensure(key) {
    if (loaded.has(key)) return Promise.resolve();
    if (pending.has(key)) return pending.get(key);
    const job = (async () => {
      if (config.vendors[key]) context.studioLibraryFactories[key] = (await import(url(config.vendors[key]))).default;
      else if (config.workers[key]) context[key] = await (await response(config.workers[key])).text();
      else if (key === "wordlist") context.studioWordlist = await (await response(config.wordlist)).json();
      else if (key === "ocr") {
        const data = await Promise.all(config.ocr.map(async (asset) => [asset.id, new Uint8Array(await (await response(asset.path)).arrayBuffer())]));
        for (const [name, value] of data) bytes.set(name, value);
      } else throw new Error("Unknown optional resource: " + key);
      loaded.add(key);
    })().finally(() => pending.delete(key));
    pending.set(key, job);
    return job;
  }
  const originalAsset = context.ciAsset;
  context.ciAsset = (name) => bytes.get(name) || originalAsset(name);
  return Object.freeze({
    ensure: (keys) => Promise.all([...new Set(keys)].map(ensure)),
    ready: (keys) => keys.every((key) => loaded.has(key)),
    status: () => ({ loaded: [...loaded], pending: [...pending.keys()] }),
    all: () => Promise.all([...Object.keys(config.vendors), ...Object.keys(config.workers), "wordlist", "ocr"].map(ensure))
  });
}
function resourceRequirements(home, targetId = "") {
  const tools = {
    pdfworkspace: ["pdf"],
    archives: ["archive"],
    qr: ["qrencode", "qrdecode", "barcode"],
    comparisonstudio: ["excel"],
    dataworkbench: ["excel"],
    markdown: ["markdownBundleSource"],
    jsonstudio: ["schemaBundleSource"],
    workflows: ["schemaBundleSource"],
    integrationstudio: ["schemaBundleSource"],
    passwords: ["wordlist"]
  };
  let keys = [...tools[home] || []];
  if (targetId) {
    if (home === "jsonstudio") keys = /schemaValidate/i.test(targetId) ? ["schemaBundleSource"] : [];
    if (home === "qr") keys = /Scan|Decode|Read/i.test(targetId) ? ["qrdecode"] : /Barcode/i.test(targetId) ? ["barcode"] : /Generate|Make|Build|Download|Print/i.test(targetId) ? ["qrencode"] : [];
    if (["dataworkbench", "comparisonstudio"].includes(home) && !/XLS|Excel|File|Upload|Sheet/i.test(targetId)) keys = [];
    if (["integrationstudio", "workflows"].includes(home) && !/Schema|Validate|Run|Test/i.test(targetId)) keys = [];
  }
  if (home === "imagestudio") {
    if (/OCR|Extract/.test(targetId) && !/Whole|Copy|Undo|Redo|Download|Clear|Layout|Numbers/.test(targetId)) keys.push("ocr");
    if (/PDF|BuildPDF/.test(targetId)) keys.push("pdf");
    if (/Batch/.test(targetId)) keys.push("archive");
    if (/QR|Scan/.test(targetId)) keys.push("qrencode", "qrdecode");
  }
  return [...new Set(keys)];
}
function guardResourceActions(context, resources) {
  const replay = /* @__PURE__ */ new WeakSet(), waiting = /* @__PURE__ */ new WeakSet();
  let inputRevision = 0;
  document.addEventListener("input", () => inputRevision++, true);
  async function guard(event) {
    const target = event.target.closest?.("button,input,select");
    if (!target || replay.has(target) || event.defaultPrevented) return;
    if (target.closest(".a34")) return;
    const home = context.u23Home(context.activeView), keys = resourceRequirements(home, target.id);
    if (!context.$(home)?.contains(target)) return;
    if (event.type === "click" && (target.matches("input[type=file],select") || /Upload|Files|FileButton|Photo|Camera/.test(target.id))) return;
    if (!keys.length || resources.ready(keys)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (waiting.has(target)) return;
    waiting.add(target);
    target.setAttribute("aria-busy", "true");
    const revision = inputRevision;
    try {
      await resources.ensure(keys);
      if (context.u23Home(context.activeView) !== home || !target.isConnected) return;
      if (revision !== inputRevision) {
        context.toast("Feature ready. Review your edited input and run it again.");
        return;
      }
      replay.add(target);
      if (event.type === "click") target.click();
      else target.dispatchEvent(new Event(event.type, { bubbles: true }));
      replay.delete(target);
    } catch (error) {
      context.toast("Could not load this feature. Check the connection and try again.");
      console.error(error);
    } finally {
      waiting.delete(target);
      target.removeAttribute("aria-busy");
    }
  }
  document.addEventListener("click", guard, true);
  document.addEventListener("change", guard, true);
}
export {
  createResources,
  guardResourceActions,
  resourceRequirements
};
