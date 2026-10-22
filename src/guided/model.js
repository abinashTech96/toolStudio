import {messageArguments} from '../advanced/icu.js';
// Offline workflow models. These never send requests or mutate a workspace.
import { validateReviews } from '../pdf-review/model.js';
import { jsonPointer, differences, maskSecrets, graphDependencies } from "../advanced/algorithms.js";
import { parseStructuredJSON, exactNumber } from "../advanced/safety.js";
const parse = parseStructuredJSON;
const clone = (value) => structuredClone(value);
const own = (value, key) => Object.hasOwn(value, key);
function bounded(rows, max = 5e3, label = "Records") {
  if (!Array.isArray(rows) || rows.length > max || rows.some((r) => !r || typeof r !== "object" || Array.isArray(r))) throw Error(`${label}: use at most ${max} object records`);
  return rows;
}
function unique(rows, key = "id") {
  const ids = rows.map((r) => String(r[key] ?? "").trim());
  if (ids.some((x) => !x) || new Set(ids).size !== ids.length) throw Error(`Each ${key} must be nonempty and unique`);
  return rows;
}
const columns = (rows) => [...new Set(rows.flatMap(Object.keys))];
const pathEscape = (s) => String(s).replaceAll("~", "~0").replaceAll("/", "~1");
function leaves(value, path = "", out = [], depth = 0) {
  if (depth > 30 || out.length >= 2e3) throw Error("Response selector limit: 2,000 fields and 30 levels");
  if (value && typeof value === "object" && Object.keys(value).length) {
    for (const [k, v] of Object.entries(value)) leaves(v, path + "/" + pathEscape(k), out, depth + 1);
  } else out.push({ pointer: path, value });
  return out;
}
const variables = (value) => [...JSON.stringify(value).matchAll(/\{\{\s*([\w.-]+)\s*\}\}/g)].map((m) => m[1]);
function inspectChain(requests, environment) {
  unique(bounded(requests, 30, "Requests"));
  unique(bounded(environment, 100, "Variables"), "name");
  const origins = new Map(environment.map((v) => [v.name, "Environment"])), seen = /* @__PURE__ */ new Set(), out = [];
  for (const r of requests) {
    if (!/^[A-Za-z][\w-]*$/.test(r.id)) throw Error("Request IDs must start with a letter and use letters, numbers, _ or -");
    for (const name of new Set(variables([r.url, r.body, r.headers]))) out.push({ request: r.id, variable: name, origin: origins.get(name) || "Unresolved", issue: origins.has(name) ? "" : "Define this variable or extract it from an earlier response" });
    for (const e of r.extract || []) {
      if (!e.name || !String(e.pointer).startsWith("/")) throw Error(`${r.id}: extraction needs a name and JSON pointer`);
      origins.set(e.name, `${r.id} response ${e.pointer}`);
    }
    if (seen.has(r.id)) throw Error("Duplicate request ID");
    seen.add(r.id);
  }
  return out;
}
function failurePlayground({ scenario = "timeout", attempts = 3, baseMs = 500, retryUnsafe = false, method = "GET", retryAfterMs = 2e3 }) {
  attempts = Number(attempts);
  baseMs = Number(baseMs);
  retryAfterMs = Number(retryAfterMs);
  if (!Number.isInteger(attempts) || attempts < 1 || attempts > 10 || !Number.isFinite(baseMs) || baseMs < 0 || baseMs > 6e4 || !Number.isFinite(retryAfterMs) || retryAfterMs < 0 || retryAfterMs > 6e5) throw Error("Use 1\u201310 attempts, base delay 0\u201360,000 ms and retry-after 0\u2013600,000 ms");
  if (!["timeout", "rate-limit", "malformed", "duplicate"].includes(scenario)) throw Error("Unknown failure scenario");
  const retryable = ["timeout", "rate-limit"].includes(scenario), safe = ["GET", "HEAD", "OPTIONS"].includes(method) || retryUnsafe;
  let elapsed = 0;
  const timeline = [];
  for (let n = 1; n <= attempts; n++) {
    const retry = n < attempts && retryable && safe, delayMs = retry ? Math.min(6e5, Math.max(baseMs * 2 ** (n - 1), scenario === "rate-limit" ? retryAfterMs : 0)) : 0;
    timeline.push({ attempt: n, atMs: elapsed, outcome: { timeout: "No response before configured deadline", "rate-limit": "429 rate limit", malformed: "JSON parse failure", duplicate: "Duplicate event ID" }[scenario], retry, delayMs, explanation: retry ? "Configured exponential backoff" : scenario === "duplicate" ? "Deduplicate by event ID; do not process twice" : !safe ? "Unsafe method: retry disabled without explicit opt-in" : "Stop and review the failure" });
    elapsed += delayMs;
    if (!retry) break;
  }
  return { simulation: true, requestsSent: 0, timeline };
}
function compareRuns(before, after) {
  const key=r=>String(r.request||r.id)+":"+(r.page??1);const old = new Map(before.map((r) => [key(r), r]));
  return after.map((r) => {
    const b = old.get(key(r)), failed = r.passed === false || (r.assertions || []).some((a) => !a.passed) || Number(r.status) >= 400;
    const wasFailed = b && (b.passed === false || (b.assertions || []).some((a) => !a.passed) || Number(b.status) >= 400);
    return { id: r.request || r.id, page:r.page??1, newFailure: failed && !wasFailed, failed, durationMs: r.durationMs ?? null, slowerByMs: b && Number.isFinite(r.durationMs) && Number.isFinite(b.durationMs) ? r.durationMs - b.durationMs : null, previous: b ? "Matched" : "New request" };
  });
}
function compositePlan(requests) {
  unique(bounded(requests, 25, "Composite requests"), "referenceId");
  const seen = /* @__PURE__ */ new Set();
  return requests.map((r) => {
    const issues = [], refs = [...JSON.stringify([r.url, r.body]).matchAll(/@\{([\w-]+)\.[^}]+\}/g)].map((m) => m[1]);
    if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(r.referenceId)) issues.push("Use a letter followed by letters, numbers or underscores for referenceId");
    for (const ref of refs) if (!seen.has(ref)) issues.push("Reference must identify an earlier request: " + ref);
    if (!String(r.url).startsWith("/services/data/")) issues.push("Use a relative /services/data/ URL");
    if (!["GET", "POST", "PATCH", "DELETE", "HEAD"].includes(r.method)) issues.push("Unsupported Composite method");
    seen.add(r.referenceId);
    return { ...r, references: [...new Set(refs)], issues };
  });
}
function mappingReview(mappings, sourceFields, targetFields) {
  const numeric = /* @__PURE__ */ new Set(["number", "int", "integer", "double", "currency", "percent", "decimal", "float"]), text = /* @__PURE__ */ new Set(["string", "text", "textarea", "email", "phone", "url", "id", "reference"]);
  return mappings.map((m) => {
    const s = sourceFields.find((f) => f.name === m.source), t = targetFields.find((f) => f.name === m.target);
    return { ...m, sourceType: s?.type || "missing", targetType: t?.type || "missing", issue: !s ? "Missing source field" : !t ? "Missing target field" : t.createable === false ? "Target field is read-only" : s.type === t.type ? "" : numeric.has(s.type) && numeric.has(t.type) ? "Review numeric range/precision" : text.has(s.type) && text.has(t.type) ? "Review length/reference constraints" : "Incompatible types; explicit conversion required" };
  });
}
function permissionDiff(before, after) {
  const key = (r) => [r.kind, r.target, r.right].join(" / "), a = new Map(before.map((r) => [key(r), r])), b = new Map(after.map((r) => [key(r), r]));
  return [.../* @__PURE__ */ new Set([...a.keys(), ...b.keys()])].flatMap((k) => {
    const x = a.get(k), y = b.get(k);
    return x?.enabled === y?.enabled ? [] : [{ permission: k, before: x?.enabled ?? "not supplied", after: y?.enabled ?? "not supplied", change: y?.enabled === true ? "Added" : x?.enabled === true ? "Removed" : "Changed", beforeSource: x?.source || "", afterSource: y?.source || "" }];
  });
}
function transformRows(source, steps) {
  bounded(source, 5e4, "Dataset");
  bounded(steps, 100, "Steps");
  let rows = clone(source), history = [];
  for (const [i, s] of steps.entries()) {
    const before = rows.length;
    if (!["trim", "number", "rename", "filter-equals", "drop-empty", "deduplicate"].includes(s.operation)) throw Error("Unknown transformation " + s.operation);
    if (!columns(rows).includes(s.column)) throw Error(`Step ${i + 1}: unknown column ${s.column}`);
    if (s.operation === "rename" && (!s.value || columns(rows).includes(s.value) || ["__proto__", "constructor", "prototype"].includes(s.value))) throw Error("Choose an unused, nonempty target column");
    if (s.operation === "filter-equals") rows = rows.filter((r) => String(r[s.column] ?? "") === s.value);
    else if (s.operation === "drop-empty") rows = rows.filter((r) => r[s.column] !== "" && r[s.column] !== null && r[s.column] !== void 0);
    else if (s.operation === "deduplicate") {
      const seen = /* @__PURE__ */ new Set();
      rows = rows.filter((r) => {
        const k = JSON.stringify(r[s.column]);
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });
    } else rows = rows.map((r, j) => {
      const n = { ...r }, v = r[s.column];
      if (s.operation === "trim" && typeof v === "string") n[s.column] = v.trim();
      if (s.operation === "number") {
        if (v === null || v === void 0 || String(v).trim() === "" || !exactNumber(String(v).trim())) throw Error(`Step ${i + 1}, row ${j + 1}: ${s.column} is not a finite number`);
        n[s.column] = Number(v);
      }
      if (s.operation === "rename") {
        delete n[s.column];
        Object.defineProperty(n, s.value, { value: v, enumerable: true, writable: true, configurable: true });
      }
      return n;
    });
    history.push({ step: i + 1, operation: s.operation, column: s.column, beforeRows: before, afterRows: rows.length });
  }
  return { rows, history, beforeRows: source.length, afterRows: rows.length };
}
function apiRehearsal(rows, mappings, { batchSize = 25, path = "/items", method = "POST" } = {}) {
  bounded(rows, 1e4);
  bounded(mappings, 100);
  batchSize = Number(batchSize);
  if (!Number.isInteger(batchSize) || batchSize < 1 || batchSize > 200) throw Error("Batch size: 1\u2013200");
  if (!["POST", "PATCH", "PUT"].includes(method) || !String(path).startsWith("/")) throw Error("Choose POST/PATCH/PUT and a relative endpoint");
  unique(mappings, "target");
  const results = rows.map((r, i) => {
    const payload = /* @__PURE__ */ Object.create(null), issues = [];
    for (const m of mappings) {
      let v = r[m.source];
      if (m.required && (v === null || v === void 0 || v === "")) issues.push(m.target + ": required");
      if(m.type === "string" && v !== undefined && v !== null) v=String(v);
      if (m.type === "number" && v !== void 0 && v !== null && v !== "") {
        if (!exactNumber(String(v).trim())) issues.push(m.target + ": number cannot round-trip exactly; preserve it as text");
        else v = Number(v);
      }
      if (m.type === "boolean" && v !== void 0 && v !== "") {
        if (!["true", "false", true, false].includes(v)) issues.push(m.target + ": invalid boolean");
        else v = v === true || v === "true";
      }
      if (v !== void 0) payload[m.target] = v;
    }
    return { row: i + 1, batch: Math.floor(i / batchSize) + 1, valid: issues.length === 0, issues, payload };
  });
  return { rehearsal: true, requestsSent: 0, endpoint: path, method, rows: results, batches: Math.ceil(rows.length / batchSize), valid: results.every((r) => r.valid) };
}
function acceptanceReport(source, target, { key = "id", numeric = "", relationships = [] } = {}) {
  bounded(source, 5e4);
  bounded(target, 5e4);
  unique(source, key);
  unique(target, key);
  const a = new Map(source.map((r) => [String(r[key]), r])), b = new Map(target.map((r) => [String(r[key]), r]));
  const records = [.../* @__PURE__ */ new Set([...a.keys(), ...b.keys()])].map((id) => ({ id, status: !a.has(id) ? "Target only" : !b.has(id) ? "Missing target" : differences(a.get(id), b.get(id)).length ? "Changed" : "Match", differences: a.has(id) && b.has(id) ? differences(a.get(id), b.get(id)) : [] }));
  const total = (rows) => {
    if (!numeric) return null;
    let sum = 0;
    for (const [i, r] of rows.entries()) {
      if (r[numeric] === null || r[numeric] === void 0 || r[numeric] === "" || !Number.isFinite(Number(r[numeric]))) throw Error(`Row ${i + 1}: ${numeric} is not numeric`);
      sum += Number(r[numeric]);
    }
    return sum;
  };
  const missingRelationships = relationships.flatMap((rel) => {
    const ids = new Set(target.map((r) => String(r[rel.targetKey || key])));
    return target.flatMap((r, i) => r[rel.column] !== null && r[rel.column] !== void 0 && r[rel.column] !== "" && !ids.has(String(r[rel.column])) ? [{ row: i + 1, column: rel.column, value: r[rel.column] }] : []);
  });
  return { sourceRows: source.length, targetRows: target.length, sourceTotal: total(source), targetTotal: total(target), records, missingRelationships, validationFailures: records.filter((r) => r.status !== "Match").length + missingRelationships.length };
}
function workload(tasks, { weekStart, capacity = 40 } = {}) {
  unique(bounded(tasks, 1e3));
  const start = /* @__PURE__ */ new Date(weekStart + "T00:00:00Z");
  if (!Number.isFinite(+start) || !Number.isFinite(Number(capacity)) || Number(capacity) < 0) throw Error("Enter a valid week start and nonnegative capacity");
  const end = new Date(+start + 7 * 864e5), active = tasks.filter((t) => t.status !== "done" && t.due && /* @__PURE__ */ new Date(t.due + "T00:00:00Z") >= start && /* @__PURE__ */ new Date(t.due + "T00:00:00Z") < end);
  const hours = active.reduce((n, t) => {
    if (!Number.isFinite(Number(t.hours)) || Number(t.hours) < 0) throw Error("Task estimates must be nonnegative hours");
    return n + Number(t.hours);
  }, 0);
  return { weekStart, weekEnd: new Date(+end - 864e5).toISOString().slice(0, 10), hours, capacity: Number(capacity), remaining: Number(capacity) - hours, overCapacity: hours > Number(capacity), tasks: active.map((t) => ({ ...t, issue: t.status === "blocked" && !t.blockedReason ? "Add a blocked reason" : "" })) };
}
const units = { "": { factor: 1, d: {} }, m: { factor: 1, d: { L: 1 } }, cm: { factor: 0.01, d: { L: 1 } }, mm: { factor: 1e-3, d: { L: 1 } }, km: { factor: 1e3, d: { L: 1 } }, s: { factor: 1, d: { T: 1 } }, min: { factor: 60, d: { T: 1 } }, h: { factor: 3600, d: { T: 1 } }, kg: { factor: 1, d: { M: 1 } }, g: { factor: 1e-3, d: { M: 1 } }, N: { factor: 1, d: { M: 1, L: 1, T: -2 } }, Pa: { factor: 1, d: { M: 1, L: -1, T: -2 } }, J: { factor: 1, d: { M: 1, L: 2, T: -2 } }, W: { factor: 1, d: { M: 1, L: 2, T: -3 } } };
const cleanDim = (d) => Object.fromEntries(Object.entries(d).filter(([, n]) => n).sort(([a], [b]) => a.localeCompare(b)));
const combine = (a, b, sign) => cleanDim(Object.fromEntries([.../* @__PURE__ */ new Set([...Object.keys(a), ...Object.keys(b)])].map((k) => [k, (a[k] || 0) + sign * (b[k] || 0)])));
function unitValue(value, unit = "") {
  let result = { value: Number(value), dim: {} };
  if (!Number.isFinite(result.value)) throw Error("Enter a finite number");
  if (!unit) return result;
  let divide = false;
  for (const token of unit.match(/\/?[A-Za-z]+(?:\^-?\d+)?|\*/g) || []) {
    if (token === "*") continue;
    const m = token.match(/^(\/)?([A-Za-z]+)(?:\^(-?\d+))?$/);
    if (!m) throw Error("Invalid unit");
    if (m[1]) divide = true;
    const u = units[m[2]], p = Number(m[3] || 1) * (divide ? -1 : 1);
    if (!u || Math.abs(p) > 6) throw Error("Unsupported unit " + m[2]);
    result.value *= u.factor ** p;
    result.dim = combine(result.dim, Object.fromEntries(Object.entries(u.d).map(([k, v]) => [k, v * p])), 1);
  }
  if (!/^[A-Za-z]+(?:\^-?\d+)?(?:[*/][A-Za-z]+(?:\^-?\d+)?)*$/.test(unit)) throw Error("Use units such as m, km/h or m/s^2");
  return result;
}
function calculateNotebook(rows) {
  unique(bounded(rows, 200), "name");
  const byName = new Map(rows.map((r) => [r.name, r])), cache = /* @__PURE__ */ new Map(), visiting = /* @__PURE__ */ new Set(), edges = [];
  function solve(name) {
    if (cache.has(name)) return cache.get(name);
    if (visiting.has(name)) throw Error("Circular dependency at " + name);
    const row = byName.get(name);
    if (!row) throw Error("Unknown input " + name);
    if (!/^[A-Za-z][\w]*$/.test(name)) throw Error("Use variable names starting with a letter");
    visiting.add(name);
    let result;
    if (!String(row.formula || "").trim()) result = unitValue(row.value, row.unit || "");
    else {
      let atom = function() {
        const t = tokens[i++];
        if (t === "-" || t === "+") {
          const v = expr(2);
          return { ...v, value: t === "-" ? -v.value : v.value };
        }
        if (t === "(") {
          const v = expr(0);
          if (tokens[i++] !== ")") throw Error("Missing closing parenthesis");
          return v;
        }
        if (/^\d|^\./.test(t || "")) return { value: Number(t), dim: {} };
        if (/^[A-Za-z]/.test(t || "")) {
          edges.push({ input: t, dependent: name });
          return solve(t);
        }
        throw Error("Expected a number, variable or parenthesis");
      }, expr = function(min) {
        let a = atom();
        while ((priority[tokens[i]] || 0) > min) {
          const op = tokens[i++], b = expr(op === "^" ? priority[op] - 1 : priority[op]);
          if (op === "+" || op === "-") {
            if (JSON.stringify(a.dim) !== JSON.stringify(b.dim)) throw Error("Incompatible dimensions in " + name + "; convert or correct the formula");
            a = { value: op === "+" ? a.value + b.value : a.value - b.value, dim: a.dim };
          } else if (op === "^") {
            if (Object.keys(b.dim).length || !Number.isInteger(b.value) || Math.abs(b.value) > 6) throw Error("Powers require a dimensionless integer from -6 to 6");
            a = { value: a.value ** b.value, dim: cleanDim(Object.fromEntries(Object.entries(a.dim).map(([k, v]) => [k, v * b.value]))) };
          } else {
            if (op === "/" && b.value === 0) throw Error("Division by zero in " + name);
            a = { value: op === "*" ? a.value * b.value : a.value / b.value, dim: combine(a.dim, b.dim, op === "*" ? 1 : -1) };
          }
        }
        return a;
      };
      const src = String(row.formula);
      if (src.length > 2e3) throw Error("Formula limit: 2,000 characters");
      let nesting = 0;
      for (const c of src) {
        if (c === "(" && ++nesting > 40) throw Error("Formula nesting limit: 40");
        if (c === ")") nesting--;
      }
      const tokens = src.match(/(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|[A-Za-z]\w*|[()+\-*/^]/gi) || [];
      if (tokens.join("") !== src.replace(/\s/g, "")) throw Error(name + ": unsupported formula token");
      let i = 0;
      const priority = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 3 };
      result = expr(0);
      if (i !== tokens.length) throw Error("Unexpected formula token in " + name);
      if (row.unit) {
        const display = unitValue(1, row.unit);
        if (JSON.stringify(display.dim) !== JSON.stringify(result.dim)) throw Error(name + ": result does not match output unit " + row.unit);
      }
    }
    if (!Number.isFinite(result.value)) throw Error(name + ": result is not finite");
    visiting.delete(name);
    cache.set(name, result);
    return result;
  }
  const results = rows.map((r) => {
    const v = solve(r.name), factor = r.unit ? unitValue(1, r.unit).value : 1;
    return { name: r.name, value: v.value / factor, unit: r.unit || "SI base units", siValue: v.value, dimensions: v.dim };
  });
  return { results, dependencies: edges.filter((e, i, a) => a.findIndex((x) => x.input === e.input && x.dependent === e.dependent) === i) };
}
function formulaTests(rows, cases) {
  const notebook = calculateNotebook(rows), map = new Map(notebook.results.map((r) => [r.name, r]));
  return cases.map((c) => {
    const r = map.get(c.name), expected = Number(c.expected), tolerance = Number(c.tolerance);
    if (!Number.isFinite(expected) || !Number.isFinite(tolerance) || tolerance < 0) throw Error("Use finite expected values and nonnegative tolerances");
    return { ...c, actual: r?.value ?? null, passed: !!r && Math.abs(r.value - expected) <= tolerance, issue: r ? "" : "Unknown calculation" };
  });
}
function repayment({ principal, annualRate, payment, startDate, months = 360 }, events = []) {
  principal = Number(principal);
  annualRate = Number(annualRate);
  payment = Number(payment);
  months = Number(months);
  if (!Number.isFinite(principal) || principal <= 0 || !Number.isFinite(annualRate) || annualRate < 0 || annualRate > 100 || !Number.isFinite(payment) || payment <= 0 || !Number.isInteger(months) || months < 1 || months > 600 || !/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !Number.isFinite(Date.parse(startDate)) || (/* @__PURE__ */ new Date(startDate + "T00:00:00Z")).toISOString().slice(0, 10) !== startDate) throw Error("Enter positive principal/payment, annual rate 0\u2013100, valid start date, and 1\u2013600 months");
  bounded(events, 600);
  for (const e of events) if (!Number.isInteger(Number(e.month)) || Number(e.month) < 1 || Number(e.month) > months || !["rate", "extra", "fee"].includes(e.type) || !Number.isFinite(Number(e.amount)) || Number(e.amount) < 0 || e.type === "rate" && Number(e.amount) > 100) throw Error("Invalid repayment event");
  const cents = (n) => Math.round((n + Number.EPSILON) * 100) / 100, base = /* @__PURE__ */ new Date(startDate + "T00:00:00Z"), schedule = [];
  let balance = cents(principal), rate = annualRate;
  for (let month = 1; month <= months && balance > 0; month++) {
    const current = events.filter((e) => Number(e.month) === month), rateEvents = current.filter((e) => e.type === "rate");
    if (rateEvents.length > 1) throw Error("Use only one rate event per month");
    if (rateEvents.length) rate = Number(rateEvents[0].amount);
    const extra = current.filter((e) => e.type === "extra").reduce((n, e) => n + Number(e.amount), 0), fee = cents(current.filter((e) => e.type === "fee").reduce((n, e) => n + Number(e.amount), 0)), interest = cents(balance * rate / 1200), opening = balance, paid = cents(Math.min(balance + interest + fee, payment + extra));
    balance = cents(balance + interest + fee - paid);
    const date = new Date(base);date.setUTCDate(1);date.setUTCMonth(base.getUTCMonth()+month);const lastDate=new Date(date);lastDate.setUTCMonth(lastDate.getUTCMonth()+1);lastDate.setUTCDate(0);const last=lastDate.getUTCDate();
    date.setUTCDate(Math.min(base.getUTCDate(), last));
    schedule.push({ month, date: date.toISOString().slice(0, 10), opening, annualRate: rate, interest, fee, extra: cents(extra), payment: paid, balance });
  }
  return { assumptions: "Monthly interest = opening balance \xD7 annual rate / 12. Rate changes precede interest; fees and extra payments occur on the due date. Each amount rounds to two decimal places. No daily accrual or lender-specific rules.", schedule, remainingBalance: balance, totalInterest: cents(schedule.reduce((n, r) => n + r.interest, 0)) };
}
function reconcile(schedule, statements) {
  return statements.map((s) => {
    const expected = schedule.find((r) => r.date === s.date);
    if (!expected) return { ...s, issue: "No projected payment on this date; review posting date/accrual assumptions" };
    const delta = Number(s.payment) - expected.payment;
    if (!Number.isFinite(delta)) throw Error("Statement payments must be finite numbers");
    return { date: s.date, projected: expected.payment, actual: Number(s.payment), difference: Math.round(delta * 100) / 100, projectedFee: expected.fee, issue: Math.abs(delta) < 5e-3 ? "Matches rounded payment" : "Review entered fees, posting date and rounding; daily lender accrual is not modeled" };
  });
}
function schemaReview(before, after, dependencies = [], renames = []) {
  bounded(before, 500);
  bounded(after, 500);
  unique(before, "path");
  unique(after, "path");
  const a = new Map(before.map((f) => [f.path, f])), b = new Map(after.map((f) => [f.path, f]));
  return [.../* @__PURE__ */ new Set([...a.keys(), ...b.keys()])].flatMap((path) => {
    const old = a.get(path), next = b.get(path);
    if (JSON.stringify(old) === JSON.stringify(next)) return [];
    const rename = renames.find((r) => r.from === path), uses = dependencies.filter((d) => d.field === path);
    return [{ path, change: !old ? "Added" : !next ? rename ? "Renamed to " + rename.to : "Deleted" : "Changed", before: old ?? null, after: next ?? null, impacted: uses.map((d) => d.consumer), preparation: !old && next.required ? "Backfill required values before adding constraint" : !next ? "Back up values and update dependent consumers before removing the field" : old.type !== next.type ? "Validate and convert existing values; review rejected rows" : "Review constraints against existing data", review: "Human review required; no migration executed" }];
  });
}
function testExecution(cases, runs) {
  unique(bounded(cases, 1e3));
  return cases.map((c) => {
    const history = runs.filter((r) => r.caseId === c.id);
    return { ...c, latest: history.at(-1)?.outcome || "not-run", failures: history.filter((r) => r.outcome === "fail").length, repeatedFailure: history.filter((r) => r.outcome === "fail").length >= 2 };
  });
}
function selectedAssertions(before, after, paths) {
  return paths.map((pointer) => ({ pointer, expected: jsonPointer(after, pointer), previous: jsonPointer(before, pointer), operator: "equals", issue: jsonPointer(after, pointer) === void 0 ? "Selected path missing from current response" : "" }));
}
const placeholders = (text) => [...String(text || "").matchAll(/\{\{\s*([\w.]+)\s*\}\}|\{([A-Za-z_]\w*)\}|%(\d+\$)?[sdif]/g)].map((m) => m[1] || m[2] || m[0]).sort();
function translationReview(rows, terms = []) {
 return rows.map(r=>{let issue='';try{const args=text=>/\{\{|%(?:\d+\$)?[sdif]/.test(text)?placeholders(text):messageArguments(text);if(JSON.stringify(args(r.source))!==JSON.stringify(args(r.translation)))issue='Placeholders differ'}catch(e){issue='Invalid ICU message: '+e.message}return{...r,issue,suggestions:terms.filter(t=>String(r.source).toLowerCase().includes(String(t.source).toLowerCase())&&!String(r.translation).toLowerCase().includes(String(t.translation).toLowerCase())).map(t=>t.source+' → '+t.translation)}});
}
function markdownOutline(text) {
  let fenced = false;
  return String(text).split(/\r?\n/).flatMap((line, i) => {
    if (/^\s*(```|~~~)/.test(line)) {
      fenced = !fenced;
      return [];
    }
    const m = !fenced && line.match(/^(#{1,6})\s+(.+?)\s*#*$/);
    return m ? [{ line: i + 1, level: m[1].length, title: m[2] }] : [];
  });
}
function researchReview(sources, notes, claims, today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)) {
  unique(bounded(sources, 500));
  unique(bounded(notes, 1e3));
  bounded(claims, 1e3);
  const ids = new Set(sources.map((s) => s.id));
  return { sourceReminders: sources.filter((s) => !s.reviewedOn || s.reviewDue && s.reviewDue <= today).map((s) => ({ source: s.id, issue: !s.reviewedOn ? "Source has not been reviewed" : "Review due" })), notes: notes.map((n) => ({ ...n, issue: !ids.has(n.sourceId) ? "Missing source" : !n.locator ? "Add document page or section locator" : "" })), claims: claims.map((c) => ({ ...c, issue: !ids.has(c.sourceId) ? "Missing source" : !c.passage || !c.locator ? "Add exact passage and page/section" : "", contradiction: claims.some((other) => other.claim === c.claim && other.relation !== c.relation && ["supports", "contradicts"].includes(other.relation)) })) };
}
function documentInspection(files, expected = [], maxBytes = 2e7) {
  const names = new Set(files.map((f) => f.name)), hashes = /* @__PURE__ */ new Map();
  return { missing: expected.filter((name) => name && !names.has(name)), files: files.map((f, i) => {
    const duplicate = f.sha256 && hashes.get(f.sha256);
    if (f.sha256 && !duplicate) hashes.set(f.sha256, f.name);
    return { ...f, order: i + 1, issue: [f.size > Number(maxBytes) ? "Over size limit" : "", duplicate ? "Duplicate content of " + duplicate : ""].filter(Boolean).join("; ") };
  }) };
}
function formReview(fields) {
  const ids = /* @__PURE__ */ new Set();
  return fields.map((f, i) => {
    const issues = [];
    if (!String(f.label || "").trim()) issues.push("Missing label");
    if (!f.id || ids.has(f.id)) issues.push("Missing or duplicate ID");
    ids.add(f.id);
    if (Number(f.tabIndex) < 0) issues.push("Excluded from keyboard order");
    if (Number(f.tabIndex) > 0) issues.push("Positive tabindex can disrupt natural keyboard order");
    if (f.required && !f.message) issues.push("Add a clear required-field message");
    if (f.type === "select" && !String(f.options || "").trim()) issues.push("Select has no options");
    return { ...f, keyboardPosition: i + 1, issues };
  });
}
function bugPack({ version, steps, expected, actual, inputs }) {
  if (!steps?.trim() || !expected?.trim() || !actual?.trim()) throw Error("Enter reproduction steps and expected/actual results");
  return { format: "toolstudio-bug-pack", version: 1, appVersion: version, createdAt: (/* @__PURE__ */ new Date()).toISOString(), steps: maskSecrets(steps), expected: maskSecrets(expected), actual: maskSecrets(actual), inputs: maskSecrets(typeof inputs === "string" ? inputs : JSON.stringify(inputs)), review: "Review all contents before sharing; automatic masking cannot identify every personal value" };
}
const savedShapes = {
  "api-chains": { requests: 30, environment: 100, extractions: 200, assertions: 300, runs: 20 },
  "salesforce-builder": { source: 500, mappings: 500, requests: 25 },
  "data-steps": { source: 5e3, steps: 100 },
  "project-planning": { notes: 500, decisions: 500, tasks: 1e3 },
  "unit-notebook": { calculations: 200, tests: 500 },
  "repayment-events": { events: 600, statements: 600 },
  "schema-review": { before: 500, after: 500, dependencies: 500, renames: 500 },
  "guided-testing": { cases: 1e3, runs: 5e3, assertions: 2e3 },
  translations: { strings: 2e3, terms: 500 },
  research: { sources: 500, notes: 1e3, claims: 1e3 },
  "image-layers": { layers: 40 }
};
function validateWorkflow(id, value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw Error("Invalid saved workflow " + id);
  if (id === 'pdf-review') validateReviews(value);
  const shape = savedShapes[id];
  if (shape) for (const [key, max] of Object.entries(shape)) bounded(value[key], max, id + " " + key);
  if (id === "salesforce-builder" && typeof value.metadata !== "string") throw Error("Describe metadata must be text");
  if (id === "data-steps" && typeof value.name !== "string") throw Error("Dataset name must be text");
  for (const key of id === "repayment-events" ? ["principal", "rate", "payment", "start", "months"] : id === "project-planning" ? ["name", "week", "capacity"] : []) if (typeof value[key] !== "string") throw Error(id + " " + key + " must be text");
  return value;
}
function validateGuidedState(value) {
  if (!value || value.version !== 1 || !value.workspaces || typeof value.workspaces !== "object" || Array.isArray(value.workspaces) || JSON.stringify(value).length > 75e4) throw Error("Guided saved work limit: 750 KB");
  let nodes = 0;
  const walk = (v, depth = 0) => {
    if (++nodes > 1e5 || depth > 35) throw Error("Saved work is too complex");
    if (v && typeof v === "object") {
      if (Array.isArray(v) && v.length > 5e3) throw Error("Saved record limit: 5,000 rows");
      for (const [k, x] of Object.entries(v)) {
        if (["__proto__", "constructor", "prototype"].includes(k)) throw Error("Unsafe saved-work key");
        walk(x, depth + 1);
      }
    } else if (typeof v === "number" && !Number.isFinite(v)) throw Error("Saved numbers must be finite");
    else if (v !== null && !["string", "number", "boolean"].includes(typeof v)) throw Error("Invalid saved value");
  };
  walk(value);
  for (const [id, work] of Object.entries(value.workspaces)) {
    if (!/^[a-z][a-z0-9-]{0,80}$/.test(id)) throw Error("Invalid workflow ID");
    validateWorkflow(id, work);
  }
  return clone(value);
}
function reviewBundle(bundle, current) {
  if (bundle?.format !== "toolstudio-work-bundle" || bundle.version !== 1) throw Error("Unsupported project bundle");
  const state = validateGuidedState(bundle.state);
  bounded(bundle.files || [], 30, "Documents");
  bounded(bundle.datasets || [], 20, "Datasets");
  for (const d of bundle.datasets || []) {
    if (typeof d.name !== "string") throw Error("Dataset needs a name");
    bounded(d.rows, 5e4, "Bundled dataset");
    if (columns(d.rows).length > 200 || JSON.stringify(d.rows).length > 4e6) throw Error("Bundled dataset limits: 4 MB, 200 columns");
  }
  if (!Array.isArray(bundle.references || []) || (bundle.references || []).length > 100 || (bundle.references || []).some((name) => typeof name !== "string" || name.length > 500)) throw Error("Invalid document references");
  for (const f of bundle.files || []) if (typeof f.name !== "string" || !f.name.trim() || f.name.length>500 || typeof f.type !== "string" || !Number.isInteger(f.size) || f.size < 0 || f.size > 6e6 || typeof f.content !== "string" || f.content.length > 14e6 || !/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(f.content) || !/^[a-f0-9]{64}$/.test(f.sha256)) throw Error("Invalid bundled document");
  if (JSON.stringify(bundle).length > 32e6) throw Error("Project bundle limit: 32 MB");
  return { state, workspaces: Object.keys(state.workspaces).map((id) => ({ id, conflict: own(current.workspaces, id), action: own(current.workspaces, id) ? "Review replacement" : "New" })), missing: (bundle.references || []).filter((name) => !(bundle.files || []).some((f) => f.name === name)) };
}
export {
  acceptanceReport,
  apiRehearsal,
  bounded,
  bugPack,
  calculateNotebook,
  clone,
  columns,
  compareRuns,
  compositePlan,
  differences,
  documentInspection,
  failurePlayground,
  formReview,
  formulaTests,
  graphDependencies,
  inspectChain,
  jsonPointer,
  leaves,
  mappingReview,
  markdownOutline,
  maskSecrets,
  own,
  parse,
  pathEscape,
  permissionDiff,
  placeholders,
  reconcile,
  repayment,
  researchReview,
  reviewBundle,
  schemaReview,
  selectedAssertions,
  testExecution,
  transformRows,
  translationReview,
  unique,
  unitValue,
  validateGuidedState,
  validateWorkflow,
  workload
};
