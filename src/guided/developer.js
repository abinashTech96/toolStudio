import { guided, node, editor, field, download, projectControls, responseSelector, changed, readText, table } from "./ui.js";
import { parse, inspectChain, leaves, jsonPointer, compositePlan, mappingReview, failurePlayground, compareRuns, permissionDiff, graphDependencies, maskSecrets } from "./model.js";
import { reviewFlow, readPermissions } from "./xml.js";
function chains(api, root) {
  const ui = guided(api, root, "Request chain builder", "Add requests in execution order. Inspect variables, select response assertions and hand the reviewed plan to the existing request runner. Credentials are excluded from saved runs.");
  const requests = editor(ui, "Requests", [{ id: "items", method: "GET", url: "https://example.com/items", body: "" }], [field("id", "Request ID"), field("method", "Method", "text", ["GET", "POST", "PATCH", "PUT", "DELETE", "HEAD", "OPTIONS"]), field("url", "URL"), field("body", "Body", "textarea")], { max: 30 });
  const env = editor(ui, "Variables", [], [field("name", "Name"), field("value", "Value")], { max: 100 });
  const extract = editor(ui, "Extractions", [], [field("request", "Request ID"), field("name", "Variable name"), field("pointer", "Response JSON pointer")], { max: 200 });
  const assertions = editor(ui, "Assertions", [], [field("request", "Request ID"), field("pointer", "JSON pointer"), field("equals", "Expected JSON value")], { max: 300 });
  const response = ui.field("Response sample", '{"items":[{"id":1,"name":"Example"}]}'), request = ui.field("Response belongs to request", "items"), selector = responseSelector(ui, response), name = ui.field("Extracted variable name", "firstId");
  ui.action("Inspect response fields", () => {
    const values = leaves(parse(response.value));
    selector.set(values);
    return values;
  });
  ui.action("Add selected assertion", () => {
    if(!requests.get().some(r=>r.id===request.value))throw Error("Select an existing request ID for this response");const value = jsonPointer(parse(response.value), selector.select.value);
    if (value === void 0) throw Error("Inspect and select a current response field");
    assertions.set([...assertions.get(), { request: request.value, pointer: selector.select.value, equals: JSON.stringify(value) }]);
    return { $inputsUpdated: true, added: selector.select.value };
  });
  ui.action("Extract selected field", () => {
    extract.set([...extract.get(), { request: request.value, name: name.value, pointer: selector.select.value }]);
    return { $inputsUpdated: true, added: name.value };
  });
  const collection = () => {const ids=new Set(requests.get().map(r=>r.id));for(const item of [...extract.get(),...assertions.get()])if(!ids.has(item.request))throw Error("Extraction/assertion refers to an unknown request: "+item.request);return requests.get().map((r) => ({ ...r, extract: extract.get().filter((e) => e.request === r.id).map((e) => ({ name: e.name, pointer: e.pointer })), assertions: assertions.get().filter((a) => a.request === r.id).map((a) => ({ pointer: a.pointer, equals: parse(a.equals) })) }));};
  ui.action("Review chain and variable origins", () => {
    const rows = collection(), origins = inspectChain(rows, env.get());
    return { order: rows.map((r, i) => ({ step: i + 1, id: r.id, method: r.method, url: maskSecrets(r.url) })), variables: origins, unresolved: origins.filter((v) => v.issue).length };
  });
  ui.action("Open plan in existing request runner", async (signal, task) => {
    const rows = collection(), origins = inspectChain(rows, env.get());
    if (origins.some((v) => v.issue)) throw Error("Resolve all variables before opening the runner");
    const extension = api.c.$("integrationstudio").querySelector('[data-advanced-feature="integrationstudio"]');
    if (!extension) throw Error("Open Integration Studio first");
    extension.open = true;
    for (let n = 0; n < 100 && !extension.querySelector('[aria-label="Request collection"]'); n++) {
      await new Promise((resolve) => setTimeout(resolve, 30));
      if (!task.current()) throw Error("Inputs changed; review the chain again");
    }
    const apply = () => {
      const input = extension.querySelector('[aria-label="Request collection"]'), vars = extension.querySelector('[aria-label="Environment variables"]');
      if (!input || !vars) throw Error("Request runner is still loading; try again");
      if (!confirm("Replace the request runner\u2019s collection and environment with this reviewed chain?")) return;
      input.value = JSON.stringify(rows.map((r) => ({ ...r, extract: Object.fromEntries(r.extract.map((e) => [e.name, e.pointer])) })), null, 2);
      vars.value = JSON.stringify(Object.fromEntries(env.get().map((v) => [v.name, v.value])));
      changed(input);
      changed(vars);
      extension.scrollIntoView({ block: "start" });
      return { copied: rows.length, note: "Preview endpoints and approve inside the existing runner before any requests are sent" };
    };
    return apply();
  });
  const runLabel = ui.field("Run name", "Run 1"), saved = ui.field("Baseline run", "", "select", []), latest = ui.field("Current run", "", "select", []);
  let runs = [];
  const refresh = () => {
    for (const select of [saved, latest]) select.replaceChildren(...runs.map((r, i) => new Option(r.name, String(i))));
  };
  ui.action("Save latest runner result", () => {
    const ext = api.c.$("integrationstudio").querySelector("[data-advanced-feature]"), pre = ext?.querySelector(".a34-output pre");
    let result = ext?.__guidedRun;
    if (!result && api.latestRequestRun) result = api.latestRequestRun();
    if (!result) throw Error("Run a reviewed sequence in the existing runner first");
    const rows = Array.isArray(result) ? result : result.results;
    if (!Array.isArray(rows)) throw Error("No request results available");
    if (runs.length >= 20) throw Error("Save at most 20 runs");
    runs.push({ name: runLabel.value, rows: rows.map(({ request: request2, page, status, durationMs, assertions: assertions2 }) => ({ request: request2, page:page??1,status, durationMs, assertions: assertions2 })) });
    refresh();
    latest.value = String(runs.length - 1);
    return { saved: runLabel.value, requests: rows.length };
  });
  ui.action("Compare saved runs", () => {
    if (!runs[Number(saved.value)] || !runs[Number(latest.value)]) throw Error("Save and select two runs");
    return compareRuns(runs[Number(saved.value)].rows, runs[Number(latest.value)].rows);
  });
  projectControls(api, ui, "api-chains", () => ({ requests: requests.get(), environment: env.get(), extractions: extract.get(), assertions: assertions.get(), runs }), (v) => {
    requests.set(v.requests);
    env.set(v.environment);
    extract.set(v.extractions);
    assertions.set(v.assertions);
    runs = v.runs || [];
    refresh();
  });
  return ui;
}
function failures(api, root) {
  const ui = guided(api, root, "API Failure Playground", "Experiment with failure handling without sending network requests. The timeline shows only the retry policy you configure."), scenario = ui.field("Failure scenario", "timeout", "select", ["timeout", "rate-limit", "malformed", "duplicate"]), method = ui.field("HTTP method", "GET", "select", ["GET", "POST", "PATCH", "PUT", "DELETE"]), attempts = ui.field("Maximum attempts", "3", "number"), base = ui.field("Initial backoff (ms)", "500", "number"), retryAfter = ui.field("Retry-After (ms)", "2000", "number"), unsafe = ui.field("Allow retry of unsafe methods", "", "checkbox");
  ui.action("Simulate failure policy", () => failurePlayground({ scenario: scenario.value, method: method.value, attempts: attempts.value, baseMs: base.value, retryAfterMs: retryAfter.value, retryUnsafe: unsafe.checked }));
  return ui;
}
function salesforce(api, root) {
  const ui = guided(api, root, "Salesforce metadata & Composite builder", "Search supplied describe metadata, review field mappings and assemble Composite references. Nothing is sent to an org.");
  const metadata = ui.field("Describe metadata", '[{"name":"Account","fields":[{"name":"Name","type":"string","createable":true}]}]'), upload = ui.field("Upload describe metadata", "", "file"), search = ui.field("Search objects and fields", "", "search");
  upload.accept = ".json";
  upload.onchange = async () => {
    try {
      metadata.value = await readText(upload.files[0], 4e6);
      changed(metadata);
    } catch (e) {
      ui.status.textContent = e.message;
    }
  };
  const get = () => {
    const x = parse(metadata.value);
    const rows = Array.isArray(x) ? x : x.sobjects || [x];
    if (rows.length > 300 || rows.some((r) => !r.name || !Array.isArray(r.fields))) throw Error("Use object describe records with fields");
    return rows;
  };
  ui.action("Search metadata", () => get().flatMap((o) => o.fields.map((f) => ({ object: o.name, field: f.name, label: f.label || "", type: f.type, required: f.nillable === false, write: f.createable ?? "not supplied" }))).filter((f) => JSON.stringify(f).toLowerCase().includes(search.value.toLowerCase())));
  const object = ui.field("Mapping target object", "Account"), source = editor(ui, "Source fields", [{ name: "Name", type: "string" }], [field("name", "Name"), field("type", "Type")]), mappings = editor(ui, "Field mappings", [{ source: "Name", target: "Name" }], [field("source", "Source field"), field("target", "Target field")]);
  ui.action("Review field compatibility", () => {
    const target = get().find((o) => o.name === object.value);
    if (!target) throw Error("Select a supplied target object");
    return mappingReview(mappings.get(), source.get(), target.fields);
  });
  const requests = editor(ui, "Composite requests", [{ referenceId: "account", method: "GET", url: "/services/data/v62.0/sobjects/Account/001Example", body: "" }], [field("referenceId", "Reference ID"), field("method", "Method", "text", ["GET", "POST", "PATCH", "DELETE", "HEAD"]), field("url", "Relative URL"), field("body", "Body JSON", "textarea")], { max: 25, validate: (r, i, rows) => compositePlan(rows)[i].issues });
  let candidate = null, revision = -1;
  ui.action("Review Composite connections", () => {
    candidate = compositePlan(requests.get());
    revision = ui.revision;
    return candidate;
  });
  ui.action("Export reviewed Composite payload", () => {
    if (revision !== ui.revision || !candidate) throw Error("Review current Composite connections first");
    if (candidate.some((r) => r.issues.length)) throw Error("Fix the inline request issues before exporting");
    const compositeRequest = candidate.map(({ referenceId, method, url, body }) => ({ referenceId, method, url, ...body ? { body: parse(body) } : {} }));
    download("composite-request.json", { allOrNone: false, compositeRequest });
    return { exported: compositeRequest.length };
  });
  const error = ui.field("Composite error response", '{"compositeResponse":[{"referenceId":"account","httpStatusCode":400,"body":[{"errorCode":"INVALID_FIELD","message":"Review field name","fields":["Name"]}]}]}');
  ui.action("Explain response errors", () => {
    const x = parse(error.value);
    return (x.compositeResponse || []).flatMap((r) => (Array.isArray(r.body) ? r.body : [r.body]).filter((b) => b?.errorCode).map((b) => ({ request: r.referenceId, field: (b.fields || []).join(", "), status: r.httpStatusCode, code: b.errorCode, message: b.message, review: r.httpStatusCode === 401 || r.httpStatusCode === 403 ? "Review authentication and supplied permissions" : "Review field names, required values and reference ordering in this request" })));
  });
  projectControls(api, ui, "salesforce-builder", () => ({ metadata: metadata.value, source: source.get(), mappings: mappings.get(), requests: requests.get() }), (v) => {
    metadata.value = v.metadata;
    changed(metadata);
    source.set(v.source);
    mappings.set(v.mappings);
    requests.set(v.requests);
  });
  return ui;
}
function flow(api, root) {
  const ui = guided(api, root, "Salesforce Flow Reviewer", "Upload Flow metadata XML to inspect decision connections, disconnected elements and missing fault paths. This is a static review, not a Flow execution engine.");
  const file = ui.field("Flow metadata file", "", "file"), input = ui.field("Flow metadata XML", '<Flow xmlns="http://soap.sforce.com/2006/04/metadata"><start><connector><targetReference>Choose</targetReference></connector></start><decisions><name>Choose</name><label>Choose route</label><defaultConnector><targetReference>Save</targetReference></defaultConnector><rules><name>Skip</name><label>Skip save</label><connector><targetReference>Finish</targetReference></connector></rules></decisions><recordUpdates><name>Save</name><connector><targetReference>Finish</targetReference></connector></recordUpdates><assignments><name>Finish</name></assignments></Flow>');
  file.accept = ".xml,.flow";
  file.onchange = async () => {
    try {
      input.value = await readText(file.files[0], 4e6);
      changed(input);
    } catch (e) {
      ui.status.textContent = e.message;
    }
  };
  ui.action("Review Flow paths", () => {
    const report = reviewFlow(input.value);
    ui.afterReport(() => {
      const map = node("div", void 0, { class: "g36-flow", "aria-label": "Flow decision paths" });
      for (const n of report.nodes) {
        const card = node("article");
        card.append(node("strong", n.label + " \xB7 " + n.type));
        for (const e of report.edges.filter((e2) => e2.from === n.id)) card.append(node("p", (e.label || e.kind) + " \u2192 " + e.to));
        for (const issue of n.issues) card.append(node("p", issue, { class: "g36-issue" }));
        map.append(card);
      }
      ui.output.append(map);
    });
    return report;
  });
  return ui;
}
function permissions(api, root) {
  const ui = guided(api, root, "Permission Change Review", "Compare exported Profile or PermissionSet XML. Results describe supplied rights and source files; omitted metadata is shown as not supplied. Effective org access also depends on assignments, licenses and other metadata.");
  const before = ui.field("Before permissions XML", "<PermissionSet><userPermissions><name>ApiEnabled</name><enabled>false</enabled></userPermissions></PermissionSet>"), after = ui.field("After permissions XML", "<PermissionSet><userPermissions><name>ApiEnabled</name><enabled>true</enabled></userPermissions></PermissionSet>");
  for (const [label, target] of [["Before", before], ["After", after]]) {
    const file = ui.field(label + " permissions file", "", "file");
    file.accept = ".xml";
    file.onchange = async () => {
      try {
        target.value = await readText(file.files[0], 4e6);
        target.dataset.source = file.files[0].name;
        changed(target);
      } catch (e) {
        ui.status.textContent = e.message;
      }
    };
  }
  ui.action("Compare supplied permissions", () => permissionDiff(readPermissions(before.value, before.dataset.source || "Before editor"), readPermissions(after.value, after.dataset.source || "After editor")));
  return ui;
}
export {
  chains,
  failures,
  flow,
  permissions,
  salesforce
};
