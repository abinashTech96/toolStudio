import {validateLayout} from "./layout.js";
const sections = ["summary", "experience", "education", "skills", "projects", "credentials", "awards", "publications", "volunteering", "leadership", "custom"];
const sectionNames = { summary: "Professional summary", experience: "Experience", education: "Education", skills: "Skills", projects: "Projects", credentials: "Certifications", awards: "Awards", publications: "Publications", volunteering: "Volunteering", leadership: "Leadership", custom: "Additional information" };
const stages = ["Saved", "Applied", "Screening", "Interview", "Offer", "Accepted", "Closed"];
const templates = ["Minimal", "Technical", "Graduate", "Management", "Academic"];
const paths = ["Student", "Experienced professional", "Career switcher", "Returning professional", "Leader"];
const today = () => {
  const d = /* @__PURE__ */ new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
};
const uid = () => globalThis.crypto.randomUUID();
const clone = (value) => JSON.parse(JSON.stringify(value));
const lines = (s) => String(s || "").split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
function profile() {
  return { name: "", headline: "", email: "", phone: "", location: "", links: "", summary: "", skills: "", experience: [], education: [], projects: [], credentials: [], awards: "", publications: "", volunteering: "", leadership: "", custom: "" };
}
function settings() {
  return { template: "Minimal", page: "A4", size: 11, spacing: 1.35, margin: 18, language: "en", direction: "ltr", font: "Sans", targetPages: 2, order: [...sections], hidden: [], hiddenFields: [], breaks: [] };
}
function emptyProject() {
  return { format: "toolstudio-career", version: 2, profile: profile(), settings: settings(), resumes: [], applications: [], evidence: [], questions: [], attempts: [], growth: [], documents: [], offers: [], portfolio: { title: "My project portfolio", name: "", projects: [] }, reviews: [], checkpoints: [], legacy: null };
}
const plain = (o) => o && typeof o === "object" && !Array.isArray(o) && [Object.prototype, null].includes(Object.getPrototypeOf(o));
function safeTree(x, depth = 0) {
  if (depth > 24) throw Error("Project nesting limit exceeded");
  if (Array.isArray(x)) {
    if (x.length > 500) throw Error("Too many project records");
    x.forEach((v) => safeTree(v, depth + 1));
  } else if (plain(x)) {
    for (const [k, v] of Object.entries(x)) {
      if (["__proto__", "prototype", "constructor"].includes(k)) throw Error("Unsafe project key");
      safeTree(v, depth + 1);
    }
  } else if (!["string", "number", "boolean"].includes(typeof x) && x !== null) throw Error("Unsupported project value");
  else if (typeof x === "string" && x.length > 25e4) throw Error("Project text exceeds 250,000 characters");
  else if (typeof x === "number" && !Number.isFinite(x)) throw Error("Invalid project number");
}
const text = (x, key, max = 12e3) => {
  if (typeof x[key] !== "string" || x[key].length > max) throw Error("Invalid " + key);
  return x[key];
};
const list = (x, key, max = 200) => {
  if (!Array.isArray(x[key]) || x[key].length > max) throw Error("Invalid " + key + " list");
  return x[key];
};
const range = (v, a, b, label) => {
  if (typeof v !== "number" || !Number.isFinite(v) || v < a || v > b) throw Error("Invalid " + label);
  return v;
};
function records(rows, label) {
  const ids = /* @__PURE__ */ new Set();
  for (const r of rows) {
    if (!plain(r) || typeof r.id !== "string" || !r.id || r.id.length > 100 || ids.has(r.id)) throw Error("Duplicate or invalid " + label + " ID");
    ids.add(r.id);
  }
  return rows;
}
function checkProfile(p) {
  if (!plain(p)) throw Error("Invalid profile");
  for (const k of Object.keys(profile()).filter((k2) => !["experience", "education", "projects", "credentials"].includes(k2))) text(p, k);
  for (const kind of ["experience", "education", "projects", "credentials"]) {
    records(list(p, kind, 50), kind);
    for (const r of p[kind]) {
      const fields = { experience: ["role", "company", "start", "end", "dates", "bullets"], education: ["degree", "school", "dates", "details"], projects: ["title", "role", "problem", "contribution", "outcome", "skills", "link", "image"], credentials: ["title", "issuer", "date", "expiry", "link"] }[kind];
      for (const k of fields) text(r, k, k === "image" ? 45e4 : 12e3);
      if (kind === "experience" && typeof r.current !== "boolean") throw Error("Invalid current-role flag");
      if (kind === "experience") {
        for (const k of ["start", "end"]) if (r[k] && !/^\d{4}-(0[1-9]|1[0-2])$/.test(r[k])) throw Error("Use YYYY-MM experience dates");
        if (r.start && r.end && !r.current && r.end < r.start) throw Error("Experience ends before it starts");
      }
      if (kind === "projects" && r.image && !/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(r.image)) throw Error("Invalid project screenshot");
    }
  }
  return p;
}
function checkSettings(s) {
  if (s?.layout !== undefined) validateLayout(s.layout);
  if (!plain(s) || !templates.includes(s.template) || !["A4", "Letter"].includes(s.page) || !["ltr", "rtl"].includes(s.direction) || !["Sans", "Serif"].includes(s.font)) throw Error("Invalid resume settings");
  range(s.size, 9, 18, "font size");
  range(s.spacing, 1.05, 2, "line spacing");
  range(s.margin, 10, 30, "page margin");
  if (s.labels !== void 0) {
    if (!plain(s.labels)) throw Error("Invalid document labels");
    for (const [k, v] of Object.entries(s.labels)) if (![...sections, "present", "problem", "contribution", "outcome", "projectSkills"].includes(k) || typeof v !== "string" || !v.trim() || v.length > 100) throw Error("Invalid translated heading/label");
  }
  if (s.targetPages !== void 0) range(s.targetPages, 0, 2, "target pages");
  text(s, "language", 30);
  if (!/^[a-zA-Z]{2,3}(?:-[a-zA-Z0-9]{2,8})*$/.test(s.language)) throw Error("Use a language code such as en, hi or ar");
  if (!Array.isArray(s.order) || s.order.length !== sections.length || new Set(s.order).size !== sections.length || !s.order.every((k) => sections.includes(k))) throw Error("Invalid section order");
  for (const k of ["hidden", "breaks"]) if (!Array.isArray(s[k]) || !s[k].every((v) => sections.includes(v))) throw Error("Invalid section selection");
  if (!Array.isArray(s.hiddenFields) || !s.hiddenFields.every((v) => ["name", "email", "phone", "location", "links", "company"].includes(v))) throw Error("Invalid public-copy settings");
  return s;
}
function validateProject(raw) {
  if (!plain(raw) || raw.format !== "toolstudio-career" || raw.version !== 2) throw Error("Unsupported Career Studio project format/version");
  if (JSON.stringify(raw).length > 12e6) throw Error("Project exceeds 12 MB");
  safeTree(raw);
  const p = clone(raw);
  if (p.workspace !== undefined && (!plain(p.workspace) || !["both","edit","preview"].includes(p.workspace.view) || !Number.isFinite(p.workspace.split) || p.workspace.split < 30 || p.workspace.split > 70)) throw Error("Invalid editor layout");
  if(p.fontAsset!==undefined){if(!plain(p.fontAsset)||typeof p.fontAsset.name!=="string"||p.fontAsset.name.length>150||!/^([a-f0-9]{64})$/.test(p.fontAsset.sha256)||!Array.isArray(p.fontAsset.chunks)||p.fontAsset.chunks.length>60||p.fontAsset.chunks.some(c=>typeof c!=="string"||c.length>200000)||p.fontAsset.chunks.join("").length>11e6)throw Error("Invalid portable font");}
  checkProfile(p.profile);
  checkSettings(p.settings);
  for (const k of ["resumes", "applications", "evidence", "questions", "attempts", "growth", "documents", "offers", "reviews", "checkpoints"]) records(list(p, k, k === "checkpoints" ? 12 : 200), k);
  if (p.resumes.length > 30) throw Error("At most 30 resume variants");
  for (const r of p.resumes) {
    if (r.importSource !== undefined) {if (!plain(r.importSource)) throw Error("Invalid import source");text(r.importSource,"text",250000);text(r.importSource,"at",100);}
    text(r, "label", 150);
    checkProfile(r.doc);
    if(r.baseDoc!==undefined)checkProfile(r.baseDoc);
    checkSettings(r.settings);
    text(r, "targetRole", 150);
  }
  const resumeIds = /* @__PURE__ */ new Set(["master", ...p.resumes.map((r) => r.id)]), evidenceIds = new Set(p.evidence.map((e) => e.id));
  for (const a of p.applications) {
    for (const k of ["company", "role", "jobDescription", "recruiter", "email", "url", "applied", "followUp", "interviewDate", "notes", "resumeId"]) text(a, k, k === "jobDescription" ? 1e5 : 12e3);
    if (!stages.includes(a.status) || !resumeIds.has(a.resumeId)) throw Error("Invalid application stage/resume");
    records(list(a, "requirements"), "requirement");
    records(list(a, "rounds", 30), "round");
    for (const r of a.requirements) {
      text(r, "text");
      text(r, "notes");
      text(r, "evidenceId", 100);
      if (!["Not covered", "Needs clarification", "Supported"].includes(r.status) || r.evidenceId && !evidenceIds.has(r.evidenceId)) throw Error("Invalid requirement evidence/status");
    }
    for (const r of a.rounds) for (const k of ["title", "date", "notes"]) text(r, k);
    if (a.submitted) {
      checkProfile(a.submitted.doc);
      checkSettings(a.submitted.settings);
      text(a.submitted, "at");
      text(a.submitted, "label");
    }
  }
  for (const e of p.evidence) for (const k of ["title", "action", "scope", "method", "outcome", "metric", "period", "skills", "notes", "date", "appreciation"]) text(e, k);
  for (const q of p.questions) for (const k of ["topic", "question", "answer", "example", "followUp"]) text(q, k);
  for (const q of p.questions) if (q.needsPractice !== void 0 && typeof q.needsPractice !== "boolean") throw Error("Invalid practice queue flag");
  for (const a of p.attempts) {
    for (const k of ["question", "response", "at", "notes"]) text(a, k);
    range(a.seconds, 0, 86400, "practice duration");
    for (const k of ["relevance", "structure", "evidence", "clarity"]) range(a.ratings?.[k], 0, 5, "self rating");
  }
  for (const g of p.growth) {
    for (const k of ["skill", "role", "evidence", "deadline"]) text(g, k);
    for (const k of ["current", "target", "priority"]) range(g[k], 0, 5, "skill level/priority");
    records(list(g, "actions", 100), "learning action");
    for (const a of g.actions) {
      text(a, "text");
      if (typeof a.done !== "boolean") throw Error("Invalid learning checkbox");
    }
  }
  for (const d of p.documents) {
    if (d.settings !== undefined) checkSettings(d.settings);
    for (const k of ["title", "kind", "body", "applicationId"]) text(d, k);
    list(d, "versions", 20).forEach((v) => {
      text(v, "body");
      text(v, "at");
    });
  }
  for (const o of p.offers) {
    for (const k of ["company", "currency", "location", "workMode", "notice", "notes"]) text(o, k);
    if (!/^[A-Z]{3}$/.test(o.currency)) throw Error("Currency needs a three-letter code");
    for (const k of ["fixed", "variable", "joining", "benefits"]) range(o[k], 0, 1e12, k);
    range(o.variablePct, 0, 100, "variable assumption");
    for (const k of ["growth", "balance", "location"]) {
      range(o.ratings?.[k], 0, 5, "offer rating");
      range(o.weights?.[k], 0, 10, "preference weight");
    }
  }
  if (!plain(p.portfolio)) throw Error("Invalid portfolio");
  text(p.portfolio, "title");
  text(p.portfolio, "name");
  if (!Array.isArray(p.portfolio.projects) || !p.portfolio.projects.every((id) => p.profile.projects.some((r) => r.id === id))) throw Error("Invalid portfolio project selection");
  for (const r of p.reviews) {
    for (const k of ["title", "start", "end", "goals", "leadership", "feedback", "next", "body"]) text(r, k);
    if (!Array.isArray(r.evidence) || !r.evidence.every((id) => evidenceIds.has(id))) throw Error("Invalid appraisal evidence");
  }
  for (const c of p.checkpoints) {
    text(c, "label", 150);
    text(c, "at");
    checkProfile(c.doc);
    checkSettings(c.settings);
  }
  return p;
}
function activeDocument(p, id) {
  return id === "master" ? { doc: p.profile, settings: p.settings, label: "Master profile" } : p.resumes.find((r) => r.id === id) || { doc: p.profile, settings: p.settings, label: "Master profile" };
}
function newVariant(p, id, label) {
  if (!label.trim()) throw Error("Enter a variant name");
  if (p.resumes.length >= 30) throw Error("At most 30 resume variants");
  const a = activeDocument(p, id);
  const r = { id: uid(), label: label.trim(), targetRole: a.doc.headline, doc: clone(a.doc), settings: clone(a.settings), baseDoc: clone(p.profile) };
  p.resumes.push(r);
  return r;
}
function newApplication() {
  return { id: uid(), company: "", role: "", status: "Saved", jobDescription: "", recruiter: "", email: "", url: "", applied: "", followUp: "", interviewDate: "", notes: "", resumeId: "master", requirements: [], rounds: [], submitted: null };
}
function newEvidence() {
  return { id: uid(), title: "", action: "", scope: "", method: "", outcome: "", metric: "", period: "", skills: "", notes: "", date: "", appreciation: "" };
}
function bullet(e) {
  return [e.action, e.scope ? "for " + e.scope : "", e.method ? "by " + e.method : "", e.outcome ? "; " + e.outcome : "", e.metric ? "(" + e.metric + (e.period ? " over " + e.period : "") + ")" : e.period ? "during " + e.period : ""].filter(Boolean).join(" ").replace(/\s+;/g, ";").replace(/[.\s]+$/, "") + ".";
}
function experienceMonths(rows, asOf = today().slice(0, 7)) {
  const month = (s) => {
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(s)) return null;
    return Number(s.slice(0, 4)) * 12 + Number(s.slice(5)) - 1;
  }, intervals = [], unparsed = [];
  for (const r of rows) {
    const start = month(r.start), end = month(r.current ? asOf : r.end);
    if (start === null || end === null) {
      unparsed.push(r.id);
      continue;
    }
    if (end < start) throw Error("Experience ends before it starts");
    intervals.push([start, end]);
  }
  intervals.sort((a, b) => a[0] - b[0]);
  let total = 0, current = null;
  const overlaps = [], gaps = [];
  for (const [a, b] of intervals) {
    if (!current) current = [a, b];
    else if (a <= current[1] + 1) {
      if (a <= current[1]) overlaps.push([a, Math.min(b, current[1])]);
      current[1] = Math.max(current[1], b);
    } else {
      gaps.push({ from: current[1] + 1, to: a - 1, months: a - current[1] - 1 });
      total += current[1] - current[0] + 1;
      current = [a, b];
    }
  }
  if (current) total += current[1] - current[0] + 1;
  return { months: total, years: Math.floor(total / 12), remaining: total % 12, unparsed, overlaps, gaps };
}
function quality(doc) {
  const issues = [], add = (section, message) => issues.push({ section, message });
  if (!doc.name.trim()) add("contact", "Add your name");
  if (!doc.email && !doc.phone) add("contact", "Add a way to contact you");
  if (doc.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(doc.email)) add("contact", "Check the email format");
  if (!doc.headline) add("contact", "Add a target role or headline");
  for (const link of lines(doc.links)) if (!safeURL(link.split("|").at(-1).trim())) add("contact", "Use a full HTTP/HTTPS link: " + link);
  const seen = /* @__PURE__ */ new Set();
  for (const s of sections) {
    const value = doc[s], text2 = typeof value === "string" ? value : JSON.stringify(value);
    if (/\[(?:name|company|insert|your)|\b(?:TODO|TBD|lorem ipsum)\b/i.test(text2)) add(s, "Replace unfinished placeholders");
    if (Array.isArray(value)) for (const row of value) {
      for (const b of lines(row.bullets)) {
        const normal = b.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
        if (seen.has(normal)) add(s, "Repeated bullet: " + b.slice(0, 90));
        seen.add(normal);
        if (/^(responsible for|worked on|helped with)/i.test(b)) add(s, "Describe your specific contribution: " + b.slice(0, 90));
      }
      if (s === "experience") {
        const bs = lines(row.bullets);
        if (bs.some((b) => /^(built|led|developed|implemented|improved|delivered|resolved|automated|supported)\b/i.test(b)) && bs.some((b) => /^(build|lead|develop|implement|improve|deliver|resolve|automate|support)\b/i.test(b))) add(s, "Bullets mix past and present openings; review whether the tense is intentional.");
      }
      if ((s === "projects" || s === "credentials") && row.link && !safeURL(row.link)) add(s, "Check the evidence/credential URL for " + (row.title || "this entry"));
      if (s === "experience" && (!row.start || !row.current && !row.end) && !row.dates) add(s, "Add dates for " + (row.role || "this role"));
      if (s === "projects" && !row.outcome) add(s, "Describe the outcome of " + (row.title || "this project"));
    }
  }
  try {
    const t = experienceMonths(doc.experience);
    if (t.overlaps.length) add("experience", "Roles overlap; review dates. Total experience counts each calendar month once.");
  } catch (e) {
    add("experience", e.message);
  }
  return issues;
}
function safeURL(v) {
  try {
    const u = new URL(v);
    return ["http:", "https:"].includes(u.protocol) ? u.href : null;
  } catch {
    return null;
  }
}
function sectionDiff(a, b) {
  return ["contact", ...sections].map((section) => {
    const value = (d) => section === "contact" ? Object.fromEntries(["name", "headline", "email", "phone", "location", "links"].map((k) => [k, d[k]])) : d[section];
    return { section, before: value(a), after: value(b), changed: JSON.stringify(value(a)) !== JSON.stringify(value(b)) };
  }).filter((r) => r.changed);
}
function applySection(target, source, section) {
  if (section === "contact") for (const k of ["name", "headline", "email", "phone", "location", "links"]) target[k] = source[k];
  else if (sections.includes(section)) target[section] = clone(source[section]);
  else throw Error("Unknown resume section");
}
function offerSummary(o) {
  const expectedVariable = o.variable * o.variablePct / 100, weight = Object.values(o.weights).reduce((a, b) => a + b, 0);
  return { currency: o.currency, guaranteedRecurring: o.fixed, expectedVariable, expectedRecurring: o.fixed + expectedVariable, firstYear: o.fixed + expectedVariable + o.joining + o.benefits, preferenceScore: weight ? Object.keys(o.weights).reduce((n, k) => n + o.weights[k] * o.ratings[k], 0) / weight : null };
}
function extractRequirements(text2) {
  return lines(text2).filter((x) => x.length > 8).slice(0, 80).map((text3) => ({ id: uid(), text: text3.replace(/^[-•*\d.)\s]+/, ""), status: "Not covered", evidenceId: "", notes: "" }));
}
function migrateLegacy(wrapper) {
  if (wrapper?.format !== "calc-studio-career-project" || wrapper.version !== 1 || !plain(wrapper.data) || wrapper.data.version !== 1) throw Error("Unsupported original career project");
  const d = wrapper.data, p = emptyProject();
  safeTree(d);
  for (const k of ["name", "headline", "email", "phone", "location", "summary", "skills"]) p.profile[k] = typeof d.profile?.[k] === "string" ? d.profile[k] : "";
  p.profile.links = d.profile?.link || "";
  p.profile.custom = d.profile?.projects || "";
  p.profile.experience = (d.experience || []).map((r) => ({ ...r, start: "", end: "", current: false }));
  p.profile.education = d.education || [];
  p.evidence = (d.achievements || []).map((r) => ({ ...newEvidence(), id: r.id, title: r.text.slice(0, 100), action: r.text, notes: r.evidence }));
  p.questions = (d.interviews || []).map((r) => ({ id: r.id, topic: r.topic, question: r.question, answer: r.answer, example: r.example, followUp: "" }));
  p.growth = (d.skills || []).map((r) => ({ id: r.id, skill: r.name, role: r.targetRole, current: r.current, target: r.target, priority: 3, deadline: "", evidence: r.notes, actions: lines(r.plan).map((text2) => ({ id: uid(), text: text2, done: false })) }));
  p.legacy = clone(wrapper);
  return validateProject(p);
}
function sampleProfile(path = "Experienced professional") {
  const p = profile();
  p.name = "Alex Example";
  p.headline = path === "Student" ? "Graduate software developer" : path === "Leader" ? "Engineering team lead" : "Software developer";
  p.summary = "FICTIONAL EXAMPLE \u2014 replace every sample fact before exporting. Describe your role, strengths and relevant experience.";
  p.skills = "Development: JavaScript, APIs\nDelivery: Testing, documentation";
  p.projects = [{ id: uid(), title: "Sample workflow project", role: "Developer", problem: "A repetitive review process", contribution: "Built a reviewed workflow and tests", outcome: "Replace this with your actual outcome", skills: "JavaScript, testing", link: "", image: "" }];
  if (path !== "Student") p.experience = [{ id: uid(), role: p.headline, company: "Example Company \u2014 fictional", start: "2023-01", end: "2025-12", current: false, dates: "", bullets: "Built a reviewed workflow for the support team; replace this with your own contribution." }];
  if (path === "Student") p.education = [{ id: uid(), degree: "Your degree", school: "Your institution", dates: "Your graduation year", details: "Relevant coursework, activities or distinctions" }];
  return p;
}
export {
  activeDocument,
  applySection,
  bullet,
  clone,
  emptyProject,
  experienceMonths,
  extractRequirements,
  lines,
  migrateLegacy,
  newApplication,
  newEvidence,
  newVariant,
  offerSummary,
  paths,
  profile,
  quality,
  safeURL,
  sampleProfile,
  sectionDiff,
  sectionNames,
  sections,
  settings,
  stages,
  templates,
  today,
  uid,
  validateProject
};
