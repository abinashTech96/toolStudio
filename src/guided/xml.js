const child = (n, name) => [...n.children].find((c) => c.localName === name);
const text = (n, name) => child(n, name)?.textContent.trim() || "";
function metadataXML(source, root) {
  if (source.length > 4e6 || /<!DOCTYPE|<!ENTITY/i.test(source)) throw Error("XML limit: 4 MB; DTD and entities are unsupported");
  const doc = new DOMParser().parseFromString(source, "application/xml");
  if (doc.querySelector("parsererror") || !root.includes(doc.documentElement.localName)) throw Error("Expected " + root.join(" or ") + " metadata XML");
  if (doc.querySelectorAll("*").length > 2e4) throw Error("XML limit: 20,000 elements");
  return doc.documentElement;
}
function reviewFlow(source) {
  const root = metadataXML(source, ["Flow"]), types = /* @__PURE__ */ new Set(["start", "decisions", "assignments", "actionCalls", "recordCreates", "recordUpdates", "recordDeletes", "recordLookups", "screens", "loops", "subflows", "waits", "collectionProcessors", "transforms", "customErrors"]), nodes = [], edges = [];
  for (const item of root.children) {
    if (!types.has(item.localName)) continue;
    const id = text(item, "name") || (item.localName === "start" ? "$start" : "");
    if (!id) continue;
    const connectors = [...item.querySelectorAll("*")].filter((e) => e.localName === "targetReference").map((e) => ({ target: e.textContent.trim(), kind: e.parentElement.localName, label: text(e.parentElement.parentElement, "label") || text(e.parentElement.parentElement, "name") }));
    const needsFault = ["actionCalls", "recordCreates", "recordUpdates", "recordDeletes", "recordLookups", "subflows"].includes(item.localName);
    nodes.push({ id, label: text(item, "label") || id, type: item.localName, issues: needsFault && !child(item, "faultConnector") ? ["No fault connector supplied; review error handling"] : [] });
    edges.push(...connectors.map((c) => ({ from: id, to: c.target, kind: c.kind, label: c.label })));
  }
  if (nodes.length > 500) throw Error("Flow review limit: 500 elements");
  if (new Set(nodes.map((n) => n.id)).size !== nodes.length) throw Error("Flow has duplicate element names");
  const ids = new Set(nodes.map((n) => n.id)), start = nodes.find((n) => n.type === "start")?.id || text(root, "startElementReference"), reachable = /* @__PURE__ */ new Set(), queue = start ? [start] : [];
  while (queue.length) {
    const id = queue.shift();
    if (reachable.has(id)) continue;
    reachable.add(id);
    queue.push(...edges.filter((e) => e.from === id).map((e) => e.to));
  }
  for (const n of nodes) {
    if (!start) n.issues.push("Start element not supplied; reachability unknown");
    else if (!reachable.has(n.id)) n.issues.push("Disconnected from supplied start");
    for (const e of edges.filter((e2) => e2.from === n.id)) if (!ids.has(e.to)) n.issues.push("Missing target " + e.to);
  }
  return { nodes, edges, start: start || null, note: "Static review of supplied XML only. Conditions, permissions, record-trigger behavior and transactions are not executed." };
}
function readPermissions(source, name = "Uploaded metadata") {
  const root = metadataXML(source, ["PermissionSet", "Profile"]), rows = [];
  const groups = { objectPermissions: ["object", ["allowRead", "allowCreate", "allowEdit", "allowDelete", "viewAllRecords", "modifyAllRecords"]], fieldPermissions: ["field", ["readable", "editable"]], userPermissions: ["name", ["enabled"]], classAccesses: ["apexClass", ["enabled"]], pageAccesses: ["apexPage", ["enabled"]], customPermissions: ["name", ["enabled"]] };
  for (const g of root.children) {
    const cfg = groups[g.localName];
    if (!cfg) continue;
    const target = text(g, cfg[0]);
    if (!target) throw Error("Permission target missing");
    for (const right of cfg[1]) {
      const value = text(g, right);
      if (value === "") continue;
      if (!["true", "false"].includes(value)) throw Error("Invalid permission boolean");
      rows.push({ kind: g.localName, target, right, enabled: value === "true", source: name });
    }
  }
  return rows;
}
export {
  metadataXML,
  readPermissions,
  reviewFlow
};
