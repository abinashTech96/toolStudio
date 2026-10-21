import {layoutSettings, blockLayout, alignments, validateLayout} from "./layout.js";
import {splitImportText, assembleImport, importFindings, applicationChecklist} from "./workflows.js";
import { node, download } from "../advanced/ui.js";
import { emptyProject, validateProject, profile, clone, uid, today, lines, sections, sectionNames, paths, templates, settings, activeDocument, newVariant, newApplication, newEvidence, bullet, experienceMonths, quality, safeURL, sectionDiff, applySection, offerSummary, extractRequirements, migrateLegacy, sampleProfile, stages } from "./model.js";
import { documentBlocks, documentHTML, resumeText, createPDFExporter, docxBytes, extractResume, suggestImport, bundle, escape } from "./documents.js";
const draftKey = "toolstudio-career-project-v2", enabledKey = "toolstudio-career-recovery-v2";
const questionPack = [["Behavioural", "Describe a difficult project and your contribution.", "What changed because of your actions?"], ["Behavioural", "Tell me about a disagreement with a stakeholder.", "What would you do differently?"], ["Leadership", "How did you help a teammate improve?", "How did you know your support helped?"], ["Delivery", "Describe how you prioritized competing deadlines.", "What trade-offs did you make?"], ["Technical", "Explain an architecture decision and its alternatives.", "How did you validate the decision?"], ["Salesforce", "Describe an Apex bulk-processing design you implemented.", "How did you test limits and failure cases?"], ["Salesforce", "Explain an integration failure you diagnosed.", "How did you handle retries and duplicate processing?"], ["Salesforce", "Describe a Lightning Web Component you delivered.", "How did you handle state and accessibility?"], ["Salesforce", "How would you review permissions for an Agentforce workflow?", "Which actions require explicit authorization?"], ["Leadership", "Describe a code review that changed the solution.", "How did you communicate the trade-off?"]];
function mount(api, root) {
  let p = emptyProject(), area = "overview", tab = "resume", active = "master", application = "", editId = "", history = [], future = [], lastEdit = "", lastEditAt = 0, previewTimer, autosaveTimer, disposed = false, sequence = 0, practice = null, timer = null, sourceCompare = "master", applicationView = "Kanban", questionIndex = 0;
  const pdfExport = createPDFExporter(api), urls = /* @__PURE__ */ new Set();
  let refreshChecklist=null;
  let savedSignature = JSON.stringify(p), lastRaw = null, blocked = false, enabled = false, readOnlyDraft = null;
  try {
    enabled = localStorage.getItem(enabledKey) === "1";
    lastRaw = localStorage.getItem(draftKey);
    blocked = !!lastRaw;
  } catch {
  }
  root.classList.add("career-studio");
  root.replaceChildren();
  const top = node("div", void 0, { class: "career-heading" }), head = node("div");
  head.append(node("span", "YOUR NEXT CHAPTER", { class: "career-eyebrow" }), node("h2", "Career Studio"), node("p", "Build your story. Prepare your next move."));
  const topActions = node("div", void 0, { class: "career-actions" });
  top.append(head, topActions);
  root.append(top);
  const saveState = node("p", "Session only \xB7 export your project to keep it", { role: "status", class: "career-save-state" }), nav = node("nav", void 0, { "aria-label": "Career Studio areas", class: "career-nav" }), subnav = node("nav", void 0, { "aria-label": "Career Studio tasks", class: "career-subnav" }), body = node("div", void 0, { class: "career-body" }), status = node("p", "Ready", { role: "status", "aria-live": "polite", class: "career-status" });
  root.append(saveState, nav, subnav, body, status);
  const areas = [["overview", "Overview"], ["profile", "Resume"], ["applications", "Applications"], ["interview", "Interview"], ["growth", "Growth"]];
  const tabs = { overview: [], profile: [["resume", "Resume builder"], ["versions", "Versions & content"], ["evidence", "Achievements"], ["portfolio", "Portfolio"], ["documents", "Documents"], ["exports", "Export center"]], applications: [["tracker", "Tracker"], ["requirements", "Job requirements"], ["offers", "Offers"]], interview: [["practice", "Practise"], ["questions", "Question library"], ["attempts", "Practice history"]], growth: [["roadmap", "Growth plan"], ["reviews", "Appraisals & promotion"]] };
  function restoreInPlace(target, source) {
    for (const key of Object.keys(target)) if (!Object.hasOwn(source, key)) delete target[key];
    for (const [key, value] of Object.entries(source)) {
      if (Array.isArray(value) && Array.isArray(target[key])) {
        const previous = target[key];
        const next = value.map((v, i) => {
          const old = v && typeof v === "object" ? v.id ? previous.find((x) => x?.id === v.id) : previous[i] : null;
          if (old && typeof old === "object") {
            restoreInPlace(old, v);
            return old;
          }
          return clone(v);
        });
        previous.splice(0, previous.length, ...next);
      } else if (value && typeof value === "object" && target[key] && typeof target[key] === "object") restoreInPlace(target[key], value);
      else target[key] = clone(value);
    }
  }
  const say = (message, error = false) => {
    status.textContent = message;
    status.dataset.error = String(error);
  };
  const safe = (fn) => async (...args) => {
    try {
      await fn(...args);
    } catch (e) {
      say(e.message || String(e), true);
    }
  };
  function button(parent, label, fn, attrs = {}) {
    const b = node("button", label, { type: "button", ...attrs });
    b.onclick = safe(fn);
    parent.append(b);
    return b;
  }
  function row(parent) {
    const e = node("div", void 0, { class: "career-actions" });
    parent.append(e);
    return e;
  }
  function card(parent, title, intro) {
    const c = node("section", void 0, { class: "career-card" });
    c.append(node("h3", title));
    if (intro) c.append(node("p", intro, { class: "career-muted" }));
    parent.append(c);
    return c;
  }
  function details(parent, title, open = false) {
    const d = node("details", void 0, { open });
    d.append(node("summary", title));
    parent.append(d);
    return d;
  }
  function field(parent, label, value = "", type = "text", change, opts) {
    const l = node("label", void 0, { class: "career-field" });
    l.append(node("span", label));
    let e;
    if (type === "select") {
      e = node("select", void 0, { "aria-label": label });
      for (const option of opts || []) {
        const [v, t] = Array.isArray(option) ? option : [option, option];
        e.append(new Option(t, v));
      }
      e.value = value;
    } else if (type === "checkbox") e = node("input", void 0, { type, checked: !!value, "aria-label": label });
    else e = node(type === "textarea" ? "textarea" : "input", void 0, type === "textarea" ? { value, rows: 4, "aria-label": label } : { value, type, "aria-label": label });
    if (type === "text" || type === "textarea") e.maxLength = label === "Job description" ? 1e5 : 12e3;
    l.append(e);
    parent.append(l);
    if (change) e.addEventListener(type === "select" || type === "checkbox" || type === "file" ? "change" : "input", () => safe(() => change(type === "checkbox" ? e.checked : type === "number" || type === "range" ? Number(e.value) : e.value, e))());
    return e;
  }
  function select(parent, label, value, options, change) {
    return field(parent, label, value, "select", change, options);
  }
  function textArea(parent, label, value, change) {
    return field(parent, label, value, "textarea", change);
  }
  function note(parent, text) {
    parent.append(node("p", text, { class: "career-muted" }));
  }
  function link(parent, label, url) {
    if (!safeURL(url)) return;
    const a = node("a", label, { href: safeURL(url), target: "_blank", rel: "noopener noreferrer" });
    parent.append(a);
  }
  function current() {
    return activeDocument(p, active);
  }
  function pushHistory(before, key) {
    const now = Date.now();
    if (lastEdit !== key || now - lastEditAt > 900) {
      history.push(before);
      while (history.length > 30 || history.reduce((n, x) => n + x.length, 0) > 24e6) history.shift();
    }
    lastEdit = key;
    lastEditAt = now;
    future = [];
  }
  function changed(fn, key = "action") {
    const before = JSON.stringify(p);
    try {
      fn();
      validateProject(p);
    } catch (e) {
      restoreInPlace(p, JSON.parse(before));
      throw e;
    }
    if (before !== JSON.stringify(p)) {
      pushHistory(before, key);
      updateSavedState();
      refreshChecklist?.();
      if (status.dataset.error === "true") say("Changes applied. Review the document before sharing.");
      clearTimeout(autosaveTimer);
      if (enabled && !blocked) autosaveTimer = setTimeout(saveLocal, 500);
    }
    return p;
  }
  function updateSavedState() {
    const dirty = JSON.stringify(p) !== savedSignature;
    saveState.textContent = (dirty ? "Unsaved changes" : "Session unchanged / project exported") + " \xB7 " + (enabled ? blocked ? "Recovery needs review" : "Local recovery enabled" : "Session only");
  }
  function saveLocal() {
    if (!enabled || blocked || disposed) return;
    try {
      const raw = localStorage.getItem(draftKey);
      if (raw !== lastRaw) {
        blocked = true;
        updateSavedState();
        say("Recovery changed in another tab. Review it under Project & recovery before saving.", true);
        return;
      }
      const next = JSON.stringify({ format: "toolstudio-career-recovery", version: 1, at: (/* @__PURE__ */ new Date()).toISOString(), data: validateProject(p) });
      localStorage.setItem(draftKey, next);
      lastRaw = next;
      saveState.textContent = "Local recovery saved \xB7 " + (/* @__PURE__ */ new Date()).toLocaleTimeString() + " \xB7 export a project for a portable copy";
    } catch (e) {
      say("Local recovery could not save: " + e.message, true);
    }
  }
  function recover(raw) {
    const x = JSON.parse(raw || "null");
    if (x?.format !== "toolstudio-career-recovery" || x.version !== 1) throw Error("Invalid recovery record");
    return validateProject(x.data);
  }
  function undo() {
    if (!history.length) return;
    future.push(JSON.stringify(p));
    p = validateProject(JSON.parse(history.pop()));
    lastEdit = "";
    render();
    updateSavedState();
    if (enabled && !blocked) saveLocal();
  }
  function redo() {
    if (!future.length) return;
    history.push(JSON.stringify(p));
    p = validateProject(JSON.parse(future.pop()));
    lastEdit = "";
    render();
    updateSavedState();
    if (enabled && !blocked) saveLocal();
  }
  function modal(title, build) {
    const dialog = node("dialog", void 0, { class: "career-dialog", "aria-label": title }), content = node("div"), actions = row(dialog);
    dialog.prepend(node("h3", title), content);
    button(actions, "Close", () => dialog.close());
    dialog.addEventListener("close", () => dialog.remove(), { once: true });
    root.append(dialog);
    build(content, actions, dialog);
    dialog.showModal();
    return dialog;
  }
  function reviewProject(candidate, label) {
    const next = validateProject(candidate), baseline = JSON.stringify(p);
    modal("Review " + label, (content, actions, d) => {
      note(content, "This replaces the Career Studio project. Your original career tools keep their data. Undo restores this Studio session.");
      content.append(node("pre", JSON.stringify({ name: next.profile.name, resumes: next.resumes.length, applications: next.applications.length, evidence: next.evidence.length, questions: next.questions.length, skills: next.growth.length, retainedOriginal: !!next.legacy }, null, 2)));
      button(actions, "Use reviewed project", () => {
        if (JSON.stringify(p) !== baseline) throw Error("Current project changed; review again");
        pushHistory(baseline, "import");
        p = clone(next);
        active = "master";
        application = "";
        editId = "";
        d.close();
        render();
        updateSavedState();
        if (enabled && !blocked) saveLocal();
        say("Reviewed project loaded. Export it to retain a portable copy.");
      });
    });
  }
  function chooseArea(next, nextTab) {
    area = next;
    tab = nextTab || tabs[next]?.[0]?.[0] || "";
    editId = "";
    render();
  }
  function render() {
    if (disposed) return;
    refreshChecklist=null;
    nav.replaceChildren();
    for (const [id, label] of areas) button(nav, label, () => chooseArea(id), { "aria-current": area === id ? "page" : "false" });
    subnav.replaceChildren();
    if(tabs[area].length) select(subnav,'Career task',tab,tabs[area],v=>{tab=v;editId='';render();});
    subnav.hidden = !tabs[area].length;
    body.replaceChildren();
    const title = areas.find((a) => a[0] === area)[1];
    body.append(node("h3", tabs[area].find((t) => t[0] === tab)?.[1] || title, { class: "career-page-title" }));
    ({ overview, resume, versions, evidence, portfolio, documents, exports: exportsView, tracker, requirements, offers, practice: practiceView, questions, attempts, roadmap, reviews }[area === "overview" ? "overview" : tab] || overview)();
    for (const table of [...body.querySelectorAll("table")]) {
      const wrap = node("div", void 0, { class: "career-table-wrap", tabIndex: 0, role: "region", "aria-label": "Scrollable data table" });
      table.replaceWith(wrap);
      wrap.append(table);
    }
    manageSelected();
    root.dispatchEvent(new Event("studio:controls-ready"));
  }
  function manageSelected() {
    const collection = { evidence: "evidence", documents: "documents", offers: "offers", questions: "questions", roadmap: "growth", reviews: "reviews", tracker: "applications" }[tab], id = tab === "tracker" ? application : editId;
    if (!collection || !p[collection].some((r) => r.id === id)) return;
    const tools = details(body, "Manage selected record");
    button(tools, "Remove selected record", () => {
      if (collection === "evidence" && (p.applications.some((a) => a.requirements.some((r) => r.evidenceId === id)) || p.reviews.some((r) => r.evidence.includes(id)))) throw Error("Unlink this achievement from requirements and reviews before removing it");
      modal("Remove selected record", (c, a, d) => {
        note(c, "Remove this record from the Studio project? Linked document drafts and saved practice answers remain available. Undo can restore the record.");
        button(a, "Remove reviewed record", () => {
          changed(() => {
            p[collection] = p[collection].filter((r) => r.id !== id);
            if (collection === "applications") {
              for (const doc of p.documents) if (doc.applicationId === id) doc.applicationId = "";
            }
          });
          if (collection === "applications") application = "";
          editId = "";
          d.close();
          render();
        });
      });
    });
  }
  function openApplication(id, task = "tracker") {
    application = id;
    chooseArea("applications", task);
  }
  function overview() {
    const welcome = card(body, "One profile. Many next steps.", "Start with your facts, tailor a resume, then keep each application and its preparation together.");
    const actions = row(welcome);
    button(actions, "Build my resume", () => chooseArea("profile", "resume"), { "data-primary": "true" });
    button(actions, "Track an application", () => chooseArea("applications", "tracker"));
    button(actions, "Prepare for an interview", () => chooseArea("interview","practice"));
    button(actions, "How Career Studio works", guide);
    const metrics = node("div", void 0, { class: "career-metrics" });
    body.append(metrics);
    for (const [label, count, target, t] of [["Resume variants", p.resumes.length, "profile", "versions"], ["Active applications", p.applications.filter((a) => !["Accepted", "Closed"].includes(a.status)).length, "applications", "tracker"], ["Achievements", p.evidence.length, "profile", "evidence"], ["Practice attempts", p.attempts.length, "interview", "attempts"]]) button(metrics, label + " \xB7 " + count, () => chooseArea(target, t));
    const due = card(body, "Next actions");
    const pending = p.applications.filter((a) => a.followUp && a.followUp <= today() && !["Closed", "Accepted"].includes(a.status));
    if (!pending.length) note(due, "No overdue application follow-ups.");
    for (const a of pending) button(due, "Follow up: " + a.company + " \xB7 " + a.followUp, () => openApplication(a.id));
    const upcoming = p.applications.filter((a) => a.interviewDate && a.interviewDate >= today()).sort((a, b) => a.interviewDate.localeCompare(b.interviewDate));
    for (const a of upcoming.slice(0, 8)) button(due, "Interview: " + a.company + " \xB7 " + a.interviewDate, () => openApplication(a.id));
    for (const g of p.growth.filter((g2) => g2.actions.some((a) => !a.done)).slice(0, 5)) button(due, "Continue learning: " + g.skill, () => chooseArea("growth", "roadmap"));
    const q = quality(p.profile);
    if (q.length) button(due, "Review " + q.length + " master profile findings", () => chooseArea("profile", "resume"));
    const links = details(body, "Earlier tools & import");
    note(links,"These earlier editors keep their original data and links. Use the reviewed import to bring a v1 project into Studio. The original keyword matcher, preparation statuses and JSON portfolio remain available here.");
    button(links,"Import earlier career data",()=>recovery.querySelector('[data-import-original]').click());
    const r = row(links);
    for (const [id, label] of [["careerresume", "Original resume builder"], ["careermatcher", "Original job matcher"], ["careerinterview", "Original interview notes"], ["careerskills", "Original skills matrix"], ["careerachievements", "Original achievements"], ["careertemplates", "Original professional templates"], ["portfoliobuilder", "Original portfolio builder"]]) button(r, label, () => api.c.openTab(id));
  }
  function resumePicker(parent) {
    select(parent, "Editing resume", active, [["master", "Master profile"], ...p.resumes.map((r) => [r.id, r.label])], (v) => {
      active = v;
      render();
    });
    note(parent, active === "master" ? "The master profile holds reusable facts. Variants keep their own editable copies." : "This variant has its own content. Review master updates under Versions & content.");
  }
  function resume() {
    const tools = card(body, "Your resume workspace");
    resumePicker(tools);
    const actions = row(tools);
    button(actions,"Preview & export",()=>chooseArea('profile','exports'),{'data-primary':'true'});
    const more=details(tools,'More resume actions');more.classList.add('career-more');
    button(more, "Undo", undo, { disabled: !history.length });
    button(more, "Redo", redo, { disabled: !future.length });
    button(more, "Start with guidance", starter);
    button(more, "Import a resume", importResume);
    const workspace=p.workspace||{view:'both',split:48};
    const mode=select(tools,'Resume workspace view',workspace.view,[['both','Edit & preview'],['edit','Edit'],['preview','Preview']],v=>{changed(()=>{p.workspace={view:v,split:p.workspace?.split||48}});layout.dataset.view=v;split.closest('label').hidden=v!=='both';splitValue.hidden=v!=='both'});
    const split=field(tools,'Editor width (%)',workspace.split,'range',v=>{changed(()=>{p.workspace={view:mode.value,split:v}});layout.style.setProperty('--career-editor',v+'%');splitValue.textContent=v+'% editor / '+(100-v)+'% preview'});
    Object.assign(split,{min:30,max:70,step:1});const splitValue=node('output',workspace.split+'% editor / '+(100-workspace.split)+'% preview');splitValue.className='career-split-label';split.after(splitValue);split.closest('label').hidden=workspace.view!=='both';splitValue.hidden=workspace.view!=='both';
    const layout=node('div',undefined,{class:'career-editor-layout'}),edit=node('div',undefined,{class:'career-editor'}),preview=node('div',undefined,{class:'career-preview'});
    layout.dataset.view=workspace.view;layout.style.setProperty('--career-editor',workspace.split+'%');layout.append(edit,preview);body.append(layout);
    const {doc}=current(),s=current().settings,sectionInputs=new Map();
    const advanced=details(edit,'Advanced design & sections');advanced.classList.add('career-advanced');
    const contact = details(edit, "Contact & headline", true);
    sectionInputs.set("contact", contact);
    for (const [k, label] of [["name", "Full name"], ["headline", "Role / headline"], ["email", "Email"], ["phone", "Phone"], ["location", "Location"]]) field(contact, label, doc[k], k === "email" ? "email" : "text", (v) => {
      changed(() => doc[k] = v, "profile-" + k);
      refreshPreview();
    });
    textArea(contact, "Profile links \xB7 one URL or Label | URL per line", doc.links, (v) => {
      changed(() => doc.links = v, "profile-links");
      refreshPreview();
    });
    for (const section of s.order) {
      const d = details(edit, sectionNames[section], section === "summary");
      d.dataset.resumeSection = section;
      sectionInputs.set(section, d);
      if (typeof doc[section] === "string") {
        textArea(d, sectionNames[section], doc[section], (v) => {
          changed(() => doc[section] = v, section);
          refreshPreview();
        });
        note(d, { summary: "Describe your role, strengths and relevant experience using your own facts.", skills: "Group related skills, for example Development: Apex, JavaScript. Use one group per line.", custom: "Optional additional facts. Imported text can be organized into structured sections." }[section] || "Optional section. Include relevant facts and evidence.");
      } else {
        let entries = function() {
          list.replaceChildren();
          for (const record of doc[section]) {
            const c = card(list, record.title || record.role || record.degree || "New entry");
            const schema = { experience: [["role", "Role"], ["company", "Company"], ["start", "Start month", "month"], ["end", "End month", "month"], ["current", "Current role", "checkbox"], ["dates", "Original dates / alternate label"], ["bullets", "Achievement bullets \xB7 one per line", "textarea"]], education: [["degree", "Degree / qualification"], ["school", "Institution"], ["dates", "Dates / graduation"], ["details", "Education details", "textarea"]], projects: [["title", "Project title"], ["role", "Project role"], ["problem", "Problem", "textarea"], ["contribution", "My contribution", "textarea"], ["outcome", "Actual outcome", "textarea"], ["skills", "Project technologies"], ["link", "Project evidence URL"]], credentials: [["title", "Credential"], ["issuer", "Issuer"], ["date", "Issued"], ["expiry", "Expires"], ["link", "Credential URL"]] }[section];
            for (const [k, label, type = "text"] of schema) field(c, label, record[k], type, (v) => {
              changed(() => record[k] = v, record.id + "-" + k);
              refreshPreview();
            });
            const a = row(c);
            button(a, "Move entry up", () => {
              const i = doc[section].indexOf(record);
              if (i > 0) changed(() => [doc[section][i - 1], doc[section][i]] = [record, doc[section][i - 1]]);
              entries();
              refreshPreview();
            });
            button(a, "Remove entry", () => {
              changed(() => {
                doc[section] = doc[section].filter((r) => r.id !== record.id);
                if (section === "projects" && active === "master") p.portfolio.projects = p.portfolio.projects.filter((id) => id !== record.id);
              });
              entries();
              refreshPreview();
            });
          }
        };
        const list = node("div");
        d.append(list);
        entries();
        button(d, "Add " + { experience: "experience", education: "education", projects: "project", credentials: "certification" }[section], () => {
          const base = { experience: { role: "", company: "", start: "", end: "", current: false, dates: "", bullets: "" }, education: { degree: "", school: "", dates: "", details: "" }, projects: { title: "", role: "", problem: "", contribution: "", outcome: "", skills: "", link: "", image: "" }, credentials: { title: "", issuer: "", date: "", expiry: "", link: "" } }[section];
          changed(() => doc[section].push({ id: uid(), ...base }));
          entries();
          refreshPreview();
        });
      }
    }
    const design = details(advanced, "Design, language & public-copy controls");
    layoutControls(design,doc,s);
    button(design, "Preview template gallery", () => modal("Template gallery", (c, actions2, d) => {
      let candidate = s.template;
      const frame = node("iframe", void 0, { title: "Resume template preview", sandbox: "", class: "career-export-frame" });
      select(c, "Preview template", candidate, templates, (v) => {
        candidate = v;
        frame.srcdoc = documentHTML(doc, { ...s, template: v });
      });
      frame.srcdoc = documentHTML(doc, s);
      c.append(frame);
      button(actions2, "Apply previewed template", () => {
        d.close();
        reviewResumeChange('Apply template',doc,{...s,template:candidate},()=>{s.template=candidate});
      });
    }));
    select(design, "Template", s.template, templates, (v) => {
      changed(() => s.template = v);
      refreshPreview();
    });
    select(design, "Target length", String(s.targetPages ?? 2), [["1", "One page"], ["2", "Two pages"], ["0", "Longer CV"]], (v) => changed(() => s.targetPages = Number(v)));
    button(design, "Compact spacing preset", () => {
      changed(() => {Object.assign(s,{size:10,spacing:1.2,margin:15});if(s.layout)Object.assign(s.layout,{paragraphGap:2.5,margins:{top:15,right:15,bottom:15,left:15}});});
      render();
    });
    button(design, "Comfortable spacing preset", () => {
      changed(() => {Object.assign(s,{size:11,spacing:1.35,margin:18});if(s.layout)Object.assign(s.layout,{paragraphGap:2.75,margins:{top:18,right:18,bottom:18,left:18}});});
      render();
    });
    select(design, "Paper size", s.page, ["A4", "Letter"], (v) => {
      changed(() => s.page = v);
      refreshPreview();
    });
    select(design, "Font family", s.font, ["Sans", "Serif"], (v) => {
      changed(() => s.font = v);
      refreshPreview();
    });
    for (const [k, label, min, max, step] of [["size", "Font size (pt)", 9, 18, 1], ["spacing", "Line spacing", 1.05, 2, 0.05], ["margin", "Page margins (mm)", 10, 30, 1]]) {
      const e = field(design, label, s[k], "number", (v) => {
        changed(() => {s[k]=v;if(k==='margin'&&s.layout?.margins)s.layout.margins={top:v,right:v,bottom:v,left:v};});
        refreshPreview();
      });
      Object.assign(e, { min, max, step });
    }
    field(design, "Resume language code", s.language, "text", (v) => {
      changed(() => s.language = v, "language");
      refreshPreview();
    });
    select(design, "Text direction", s.direction, [["ltr", "Left to right"], ["rtl", "Right to left"]], (v) => {
      changed(() => s.direction = v);
      refreshPreview();
    });
    const languageLabels = details(design, "Translated document labels");
    for (const [k, label] of [["present", "Present"], ["problem", "Problem"], ["contribution", "Contribution"], ["outcome", "Outcome"], ["projectSkills", "Technologies"]]) field(languageLabels, "Translation for " + label, s.labels?.[k] || label, "text", (v) => {
      changed(() => {
        s.labels ||= {};
        s.labels[k] = v;
      }, "label-" + k);
      refreshPreview();
    });
    for (const k of ["name", "email", "phone", "location", "links", "company"]) field(design, "Hide " + k + " in this copy", s.hiddenFields.includes(k), "checkbox", (v) => {
      changed(() => s.hiddenFields = v ? [.../* @__PURE__ */ new Set([...s.hiddenFields, k])] : s.hiddenFields.filter((x) => x !== k));
      refreshPreview();
    });
    const order = details(advanced, "Section order & page breaks");
    let drag = null;
    for (const k of s.order) {
      const r = node("div", void 0, { class: "career-order", draggable: true });
      r.append(node("strong", sectionNames[k]));
      field(r, "Heading for " + sectionNames[k], s.labels?.[k] || sectionNames[k], "text", (v) => {
        changed(() => {
          s.labels ||= {};
          s.labels[k] = v;
        }, "heading-" + k);
        refreshPreview();
      });
      r.ondragstart = () => drag = k;
      r.ondragover = (e) => e.preventDefault();
      r.ondrop = (e) => {
        e.preventDefault();
        if (drag && drag !== k) {
          changed(() => {
            s.order.splice(s.order.indexOf(drag), 1);
            s.order.splice(s.order.indexOf(k), 0, drag);
          });
          render();
        }
      };
      order.append(r);
      for (const [delta, label] of [[-1, "Move up"], [1, "Move down"]]) button(r, label, () => {
        const i = s.order.indexOf(k), j = i + delta;
        if (j < 0 || j >= s.order.length) return;
        changed(() => [s.order[i], s.order[j]] = [s.order[j], s.order[i]]);
        render();
      }, { "aria-label": label + " " + sectionNames[k] });
      field(r, "Show " + sectionNames[k], !s.hidden.includes(k), "checkbox", (v) => {
        changed(() => s.hidden = v ? s.hidden.filter((x) => x !== k) : [.../* @__PURE__ */ new Set([...s.hidden, k])]);
        refreshPreview();
      });
      field(r, "New page before " + sectionNames[k], s.breaks.includes(k), "checkbox", (v) => {
        changed(() => s.breaks = v ? [.../* @__PURE__ */ new Set([...s.breaks, k])] : s.breaks.filter((x) => x !== k));
        refreshPreview();
      });
    }
    edit.append(advanced);
    function jump(k) {
      const d = sectionInputs.get(k);
      if (d) {
        d.open = true;
        layout.dataset.view = "edit";
        mode.value = "edit";
        d.querySelector("input,textarea")?.focus();
        d.scrollIntoView({ block: "nearest" });
      }
    }
    function refreshPreview() {
      clearTimeout(previewTimer);
      previewTimer = setTimeout(() => {
        if (!preview.isConnected) return;
        preview.replaceChildren(node("h3", "Live preview"));
        note(preview, "Click a section to edit it. Export center shows the actual direct-PDF pages; browser print determines Word/HTML print breaks.");
        const paper = node("article", void 0, { class: "career-paper", lang: s.language, dir: s.direction }), parsed = new DOMParser().parseFromString(documentHTML(doc, s), "text/html");
        for (const block of parsed.querySelector("main").children) {
          const b = document.importNode(block, true);
          for (const a of b.querySelectorAll("a")) a.replaceWith(node("span", a.textContent));
          if (b.classList.contains("page-break")) {
            paper.append(b);
            continue;
          }
          b.tabIndex = 0;
          b.setAttribute("role", "button");
          b.setAttribute("aria-label", "Edit " + (sectionNames[b.dataset.section] || "contact"));
          b.onclick = () => jump(b.dataset.section);
          b.onkeydown = (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              jump(b.dataset.section);
            }
          };
          paper.append(b);
        }
        const margins=layoutSettings(s).margins;
        paper.style.cssText = "font-size:" + s.size + "pt;line-height:" + s.spacing + ";font-family:" + (s.font === "Serif" ? "Georgia,serif" : "Arial,sans-serif") + ";padding:"+[margins.top,margins.right,margins.bottom,margins.left].map(v=>v+'mm').join(' ');
        paper.dataset.template = s.template;
        preview.append(paper);
        const findings = details(preview, "Quality review \xB7 " + quality(doc).length + " findings", true);
        const timeline = experienceMonths(doc.experience);
        note(findings, "Structured experience: " + timeline.years + " years " + timeline.remaining + " months; overlapping months counted once. " + timeline.unparsed.length + " roles need structured dates. " + timeline.gaps.length + " intervals have no listed role; add context only if you want it shown.");
        for (const q of quality(doc)) button(findings, q.message, () => jump(q.section));
        if (!quality(doc).length) note(findings, "No built-in completeness findings. Review the facts and exported document.");
        const text = details(preview, "Plain-text reading order");
        text.append(node("pre", resumeText(doc, s)));
        note(text, "This is the document\u2019s linear text order, not a hiring prediction or universal ATS score.");
      }, 100);
    }
    refreshPreview();
  }
  function reviewResumeChange(title, nextDoc, nextSettings, apply, beforeOverride) {
    const before=clone(beforeOverride||current()), candidate={doc:clone(nextDoc),settings:clone(nextSettings)}, proof=JSON.stringify(p), selected=active;
    modal(title,(content,actions,d)=>{
      note(content,'Review the content, visibility and layout before applying. Close keeps the current document.');
      const changes=sectionDiff(before.doc,candidate.doc);
      content.append(node('pre',changes.length?changes.map(x=>(sectionNames[x.section]||'Contact')+'\nCURRENT\n'+JSON.stringify(x.before,null,2)+'\nPROPOSED\n'+JSON.stringify(x.after,null,2)).join('\n\n'):'Resume facts are unchanged.'));
      content.append(node('pre',JSON.stringify({current:{hiddenFields:before.settings.hiddenFields,hiddenSections:before.settings.hidden,layout:layoutSettings(before.settings)},proposed:{hiddenFields:candidate.settings.hiddenFields,hiddenSections:candidate.settings.hidden,layout:layoutSettings(candidate.settings)}},null,2)));
      const previews=node('div',undefined,{class:'career-compare'});content.append(previews);
      for(const[label,document,settings]of[['Current',before.doc,before.settings],['Proposed',candidate.doc,candidate.settings]]){
        const section=card(previews,label),frame=node('iframe',undefined,{title:label+' resume preview',sandbox:'',srcdoc:documentHTML(document,settings),class:'career-export-frame'});section.append(frame);
      }
      const pages=node('p','Checking actual PDF page counts…',{role:'status','data-page-impact':'pending'});content.append(pages);
      const accept=button(actions,'Apply reviewed change',()=>{
        if(active!==selected||JSON.stringify(p)!==proof)throw Error('The project changed; review the change again');
        changed(apply);d.close();render();say('Reviewed change applied. Undo is available under More resume actions.');
      },{disabled:true,'data-primary':'true'});
      (async()=>{
        try{const oldPDF=await pdfExport(before.doc,before.settings),newPDF=await pdfExport(candidate.doc,candidate.settings);if(!d.isConnected)return;pages.textContent='Actual PDF pages: '+oldPDF.pages+' → '+newPDF.pages+'. Word and browser print may paginate differently.';pages.dataset.pageImpact='ready';}
        catch(e){if(!d.isConnected)return;pages.textContent='Direct PDF comparison unavailable: '+e.message+' Review the HTML previews and use browser print preview for these scripts.';pages.dataset.pageImpact='unavailable';}
        if(d.isConnected)accept.disabled=false;
      })();
    });
  }
  function layoutControls(parent,doc,s,applySettings) {
    const getDoc=()=>typeof doc==='function'?doc():doc;
    const commit=next=>{if(applySettings)applySettings(next);else{for(const k of Object.keys(s))delete s[k];Object.assign(s,clone(next));}};
    const panel=details(parent,'Custom alignment & spacing'),draft=clone(s);draft.layout=layoutSettings(s);
    let scope='whole';const controls=node('div');
    select(panel,'Alignment scope',scope,[['whole','Whole resume'],...sections.map(k=>[k,sectionNames[k]])],v=>{scope=v;draw();});panel.append(controls);
    function draw(){
      controls.replaceChildren();const l=draft.layout,overrides=scope==='whole'?l:(l.sections[scope]||{}),v={...l,...overrides};
      function set(k,value){if(scope==='whole')l[k]=value;else{l.sections[scope]||={};l.sections[scope][k]=value;}}
      for(const[k,label]of [['body','Body alignment'],...(scope==='whole'?[['name','Name alignment'],['contact','Contact alignment']]:[]),['headings','Heading alignment'],['dates','Date alignment']]){
        select(controls,label,v[k],alignments.filter(a=>k==='body'||a!=='justify').map(a=>[a,a==='start'?'Follow text direction':a[0].toUpperCase()+a.slice(1)]),value=>set(k,value));
      }
      for(const[k,label,max]of [['paragraphGap','Paragraph spacing (pt)',24],['bulletIndent','Bullet indentation (pt)',48]]){const e=field(controls,label,v[k],'number',value=>set(k,value));Object.assign(e,{min:0,max,step:.25});}
      if(scope==='whole')for(const edge of ['top','right','bottom','left']){const e=field(controls,'Margin '+edge+' (mm)',l.margins[edge],'number',value=>l.margins[edge]=value);Object.assign(e,{min:10,max:40,step:1});}
      else button(controls,'Use whole-resume alignment for this section',()=>{delete l.sections[scope];draw();});
    }
    draw();
    note(panel,'Settings here are a draft until reviewed. Dates stay on their own line. Section overrides take precedence over whole-resume settings.');
    button(panel,'Review layout changes',()=>{validateLayout(draft.layout);const next={...s,layout:clone(draft.layout)};reviewResumeChange('Review layout changes',getDoc(),next,()=>commit(next),{doc:getDoc(),settings:s});});
    button(panel,'Reset layout',()=>{const next={...s,size:11,spacing:1.35,margin:18};delete next.layout;reviewResumeChange('Reset layout',getDoc(),next,()=>commit(next),{doc:getDoc(),settings:s});});
  }
  function checklistView(parent,a) {
    const box=details(parent,'Application checklist',true),content=node('div');box.classList.add('career-checklist');box.append(content);
    function draw(){
      const steps=applicationChecklist(p,a,today()),done=steps.filter(x=>x.done).length;
      box.querySelector('summary').textContent='Application checklist · '+done+' / '+steps.length;content.replaceChildren();
      note(content,'Preparation steps based on entered information, not a hiring-readiness score. Documents and interview steps may be optional for your application.');
      for(const step of steps){const r=row(content);r.dataset.check=step.id;r.dataset.complete=String(step.done);r.append(node('span',step.done?'✓':'○',{'aria-label':step.done?'Complete':'To review'}));button(r,step.label,()=>{
        if(step.target==='resume'){active=a.resumeId;chooseArea('profile','resume');}
        else if(step.target==='documents')chooseArea('profile','documents');
        else if(step.target==='interview')chooseArea('interview','practice');
        else if(step.target==='tracker')body.querySelector('.career-application-editor')?.scrollIntoView({block:'start'});
        else openApplication(a.id,step.target);
      });if(step.detail)r.append(node('small',step.detail));}
    }
    refreshChecklist=draw;draw();
  }
  function starter() {
    modal("Start your resume", (c, a, d) => {
      const path = select(c, "Career stage", paths[0], paths), help = node("p");
      c.append(help);
      const show = () => help.textContent = { Student: "Lead with education, internships, coursework, projects and volunteering.", Leader: "Describe team scope, decisions, delivery and mentoring using actual evidence.", "Career switcher": "Connect transferable experience to your target role; include relevant projects.", "Returning professional": "Choose relevant experience and current skills. Add a career break only if you want it shown.", "Experienced professional": "Prioritize relevant contributions, outcomes and recent experience." }[path.value];
      path.onchange = show;
      show();
      note(c, "Examples are fictional. Blank setup preserves your existing content.");
      button(a, "Continue with my content", () => {
        d.close();
        say(help.textContent);
      });
      button(a, "Create fictional example variant", () => {
        changed(() => {
          const r = newVariant(p, active, "Example \u2014 " + path.value);
          r.doc = sampleProfile(path.value);
          r.settings.template = path.value === "Student" ? "Graduate" : path.value === "Leader" ? "Management" : "Technical";
          active = r.id;
        });
        d.close();
        render();
        say("Fictional sample created in a separate variant. Replace its facts before use.");
      });
    });
  }
  function importResume() {
    modal('Review resume import',(c,a,d)=>{
      const file=field(c,'Resume file','','file');file.accept='.pdf,.docx,.txt';
      const columns=node('div',undefined,{class:'career-import-columns'}),source=card(columns,'Source text'),mapping=card(columns,'Reviewed fields');c.append(columns);
      const raw=textArea(source,'Original / pasted resume text','');raw.removeAttribute('maxlength');raw.rows=12;
      note(source,'The original text is retained in the imported variant. Mapping does not change your current project.');
      const tools=row(c),findings=node('div',undefined,{class:'career-import-findings',role:'status'});c.append(findings);
      let candidate=null,parts=null,reviewedSource='';
      const invalidate=()=>{candidate=null;parts=null;reviewedSource='';mapping.replaceChildren(node('h3','Reviewed fields'));findings.replaceChildren();};
      const previewFindings=()=>{
        const doc=parts?assembleImport(parts,candidate):candidate;if(!doc)throw Error('Review field mapping first');
        findings.replaceChildren(node('h4','Review before importing'));
        for(const issue of importFindings(raw.value,doc))note(findings,issue);
        if(parts)note(findings,parts.length+' parts retain the complete source text. Add role, institution and date fields after importing; no dates are inferred.');
      };
      button(tools,'Extract selected file',async()=>{
        const ticket=++sequence,text=await extractResume(file.files[0],api);if(ticket!==sequence||!d.isConnected)return;
        raw.value=text;invalidate();say('Text extracted. Review mapping, or split long sections into reviewable parts.');
      });
      button(tools,'Open scanned-document OCR',()=>{api.c.openTab('camerastudio');d.close();});
      button(tools,'Review field mapping',()=>{
        if(!raw.value.trim())throw Error('Paste or extract resume text first');
        invalidate();candidate=suggestImport(raw.value);reviewedSource=raw.value;
        note(mapping,'Suggestions need review. Ambiguous text remains in Additional information.');
        for(const k of ['name','email','phone','links','summary','skills','custom'])field(mapping,'Imported '+k,candidate[k],['name','email','phone'].includes(k)?'text':'textarea',v=>candidate[k]=v);
        previewFindings();
      });
      button(tools,'Split into reviewable parts',()=>{
        const next=splitImportText(raw.value);invalidate();candidate=profile();parts=next;reviewedSource=raw.value;
        note(mapping,'Assign each part to a destination. Experience and education destinations create separate editable entries. No source text is automatically removed.');
        for(const k of ['name','email','phone','links'])field(mapping,'Imported '+k,'',k==='links'?'textarea':'text',v=>candidate[k]=v);
        parts.forEach((part,i)=>{const box=details(mapping,'Part '+(i+1)+' · '+part.text.length+' characters',i===0);select(box,'Destination for part '+(i+1),part.destination,[['experience','Separate experience entry'],['education','Separate education entry'],['summary','Professional summary'],['skills','Skills'],['custom','Additional information']],v=>part.destination=v);textArea(box,'Import part '+(i+1),part.text,v=>part.text=v);});
        previewFindings();
      });
      button(tools,'Check imported fields',previewFindings);raw.oninput=invalidate;
      button(a,'Create reviewed resume variant',()=>{
        if(!candidate||reviewedSource!==raw.value)throw Error('Review the current field mapping first');
        const doc=parts?assembleImport(parts,candidate):clone(candidate);
        changed(()=>{const r=newVariant(p,active,'Imported resume');r.doc=doc;r.importSource={text:raw.value,at:new Date().toISOString()};active=r.id;});
        d.close();render();say('Imported as a separate variant. Original text is retained under Versions & content. Review roles, dates and reading order.');
      },{'data-primary':'true'});
    });
  }
  function versions() {
    const box = card(body, "Resume variants & master updates");
    resumePicker(box);
    const name = field(box, "New variant name", "");
    button(box, "Create variant from current", () => {
      changed(() => {
        active = newVariant(p, active, name.value).id;
      });
      render();
    });
    if (active !== "master") button(box, "Remove this variant", () => {
      if (p.applications.some((a) => a.resumeId === active)) throw Error("Choose another resume for linked applications before removing this variant");
      modal("Remove resume variant", (c, a, d) => {
        note(c, "Remove " + current().label + " from this Studio project? Undo remains available.");
        button(a, "Remove reviewed variant", () => {
          changed(() => p.resumes = p.resumes.filter((r) => r.id !== active));
          active = "master";
          d.close();
          render();
        });
      });
    });
    if(current().importSource){const source=details(box,'Original imported text');source.append(node('pre',current().importSource.text));}
    const checkpoint = field(box, "Checkpoint name", "");
    button(box, "Save checkpoint", () => {
      if (!checkpoint.value.trim()) throw Error("Name the checkpoint");
      changed(() => {
        const a = current();
        p.checkpoints.push({ id: uid(), label: checkpoint.value.trim(), at: (/* @__PURE__ */ new Date()).toISOString(), doc: clone(a.doc), settings: clone(a.settings) });
        if (p.checkpoints.length > 12) p.checkpoints.shift();
      });
      render();
    });
    for (const cp of p.checkpoints) {
      const r = row(box);
      r.append(node("span", cp.label + " \xB7 " + cp.at.slice(0, 10)));
      button(r, "Review restore", () => modal("Restore checkpoint", (c, a, d) => {
        c.append(node("pre", JSON.stringify(sectionDiff(current().doc, cp.doc), null, 2)));
        button(a, "Restore reviewed checkpoint", () => {
          d.close();
          reviewResumeChange('Restore checkpoint',cp.doc,cp.settings,()=>{const a2=current();for(const k of Object.keys(a2.doc))a2.doc[k]=clone(cp.doc[k]);for(const k of Object.keys(a2.settings))delete a2.settings[k];Object.assign(a2.settings,clone(cp.settings))});
        });
      }));
    }
    const compare = card(body, "Compare and apply individual sections", "Review content before updating a variant or the master. A public copy keeps its own display settings.");
    select(compare, "Compare against", sourceCompare, [["master", "Master profile"], ...p.resumes.map((r) => [r.id, r.label])], (v) => {
      sourceCompare = v;
      render();
    });
    const src = activeDocument(p, sourceCompare);
    const diffs = sectionDiff(current().doc, src.doc);
    if (!diffs.length) note(compare, "No content differences.");
    for (const diff of diffs) {
      const d = details(compare, sectionNames[diff.section] || "Contact");
      d.append(node("pre", "CURRENT\n" + JSON.stringify(diff.before, null, 2) + "\nSOURCE\n" + JSON.stringify(diff.after, null, 2)));
      button(d, "Apply source " + diff.section, () => {
        const next=clone(current().doc);applySection(next,src.doc,diff.section);
        reviewResumeChange('Apply source '+diff.section,next,current().settings,()=>applySection(current().doc,src.doc,diff.section));
      });
    }
    const library = card(body, "Select achievements for this resume", "Insert a reviewed bullet into an experience entry, or append it to Additional information.");
    for (const e of p.evidence) {
      const r = card(library, e.title || "Achievement");
      note(r, bullet(e));
      button(r, "Review insertion", () => insertEvidence(e));
    }
  }
  function insertEvidence(e) {
    modal("Review achievement insertion", (c, a, d) => {
      c.append(node("p", bullet(e)));
      const target = select(c, "Destination", "custom", [["custom", "Additional information"], ...current().doc.experience.map((r) => [r.id, r.role + " \xB7 " + r.company])]);
      button(a, "Insert reviewed bullet", () => {
        changed(() => {
          const doc = current().doc;
          if (target.value === "custom") doc.custom += "\n" + bullet(e);
          else {
            const r = doc.experience.find((x) => x.id === target.value);
            if (!r) throw Error("Destination no longer exists");
            r.bullets += "\n" + bullet(e);
          }
        });
        d.close();
        say("Achievement added. Undo is available in the resume builder.");
      });
    });
  }
  function evidence() {
    const box = card(body, "Your achievement library", "Record facts once, then reuse them in resumes, interviews, portfolios and reviews.");
    button(box, "Add achievement", () => {
      changed(() => {
        const e2 = newEvidence();
        p.evidence.push(e2);
        editId = e2.id;
      });
      render();
    });
    const search = field(box, "Search achievements", "", "search"), list = node("div", void 0, { class: "career-grid" });
    box.append(list);
    function show() {
      list.replaceChildren();
      for (const e2 of p.evidence.filter((e3) => JSON.stringify(e3).toLowerCase().includes(search.value.toLowerCase()))) {
        const c = card(list, e2.title || "Untitled achievement");
        note(c, bullet(e2));
        note(c, e2.skills);
        button(c, "Edit achievement", () => {
          editId = e2.id;
          render();
        });
        button(c, "Add to current resume", () => insertEvidence(e2));
      }
    }
    search.oninput = show;
    show();
    const e = p.evidence.find((e2) => e2.id === editId);
    if (e) {
      const c = card(body, "Achievement bullet workshop", "Use actual outcomes and metrics. Wording suggestions do not verify a claim.");
      for (const [k, label] of [["title", "Achievement title"], ["action", "Action / deliverable"], ["scope", "Scope / audience"], ["method", "Approach"], ["outcome", "Actual outcome"], ["metric", "Verified metric"], ["period", "Measurement period"], ["skills", "Skill tags"], ["date", "Achievement date"], ["notes", "Supporting evidence notes"], ["appreciation", "Appreciation / feedback"]]) field(c, label, e[k], ["notes", "appreciation", "outcome"].includes(k) ? "textarea" : k === "date" ? "date" : "text", (v) => {
        changed(() => e[k] = v, e.id + k);
        preview.textContent = bullet(e);
      });
      const preview = node("p", bullet(e), { class: "career-callout" });
      c.append(preview);
      button(c, "Review wording", () => {
        const advice = [];
        if (!e.action) advice.push("Describe your own action.");
        if (!e.outcome) advice.push("Describe the actual outcome, including a qualitative outcome when no metric exists.");
        if (e.metric && !e.notes) advice.push("Add the source or context for the metric.");
        if (/responsible for|worked on|helped with/i.test(e.action)) advice.push("Use a specific action, for example Built, Analyzed, Resolved or Led.");
        say(advice.join(" ") || "The structured fields are filled. Review the factual accuracy.");
      });
      button(c, "Done editing", () => {
        editId = "";
        render();
      });
    }
  }
  function portfolio() {
    const c = card(body, "Portfolio case studies", "Uses projects from your master profile. Add projects in the resume builder while editing Master profile.");
    field(c, "Portfolio title", p.portfolio.title, "text", (v) => changed(() => p.portfolio.title = v, "portfolio-title"));
    field(c, "Portfolio author", p.portfolio.name, "text", (v) => changed(() => p.portfolio.name = v, "portfolio-name"));
    const selected = p.portfolio.projects;
    for (const project of p.profile.projects) {
      const r = card(c, project.title || "Untitled project");
      field(r, "Include " + (project.title || project.id), p.portfolio.projects.includes(project.id), "checkbox", (v) => changed(() => p.portfolio.projects = v ? [.../* @__PURE__ */ new Set([...p.portfolio.projects, project.id])] : p.portfolio.projects.filter((x) => x !== project.id)));
      const image = field(r, "Screenshot for " + (project.title || project.id), "", "file");
      image.accept = "image/png,image/jpeg,image/webp";
      image.onchange = safe(async () => {
        const f = image.files[0];
        if (!f) return;
        if (f.size > 15e4 || !["image/png", "image/jpeg", "image/webp"].includes(f.type)) throw Error("Use a PNG/JPEG/WebP screenshot up to 150 KB");
        const data = await new Promise((resolve, reject) => {
          const r2 = new FileReader();
          r2.onload = () => resolve(r2.result);
          r2.onerror = () => reject(Error("Screenshot could not be read"));
          r2.readAsDataURL(f);
        });
        changed(() => project.image = data);
        say("Screenshot attached to this project.");
      });
      button(r, "Move portfolio project up", () => {
        const i = p.portfolio.projects.indexOf(project.id);
        if (i > 0) changed(() => [p.portfolio.projects[i - 1], p.portfolio.projects[i]] = [project.id, p.portfolio.projects[i - 1]]);
        render();
      });
    }
    let built = null;
    const preview = node("div");
    c.append(preview);
    button(c, "Build portfolio preview", () => {
      built = JSON.stringify({ portfolio: p.portfolio, projects: p.profile.projects });
      const html = portfolioHTML();
      preview.replaceChildren(node("iframe", void 0, { title: "Career portfolio preview", sandbox: "", srcdoc: html, class: "career-export-frame" }));
    });
    button(c, "Export portfolio HTML", () => {
      if (!built || built !== JSON.stringify({ portfolio: p.portfolio, projects: p.profile.projects })) throw Error("Build a current portfolio preview first");
      download("career-portfolio.html", portfolioHTML(), "text/html");
    });
  }
  function portfolioHTML() {
    const projects = p.portfolio.projects.map((id) => p.profile.projects.find((r) => r.id === id)).filter(Boolean);
    if (!projects.length) throw Error("Select at least one master-profile project");
    return '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>' + escape(p.portfolio.title) + "</title><style>body{font:17px/1.6 system-ui;max-width:920px;margin:40px auto;padding:24px;color:#22312d}article{border-top:1px solid #ccd5cf;padding:24px 0;break-inside:avoid}img{max-width:100%;max-height:400px}h1{font-size:40px}a{color:#16405d}</style><h1>" + escape(p.portfolio.title) + "</h1><p>" + escape(p.portfolio.name || p.profile.name) + "</p>" + projects.map((r) => "<article><h2>" + escape(r.title) + "</h2>" + (r.image ? '<img alt="' + escape(r.title) + '" src="' + r.image + '">' : "") + ["role", "problem", "contribution", "outcome", "skills"].map((k) => r[k] ? "<h3>" + escape(k[0].toUpperCase() + k.slice(1)) + "</h3><p>" + escape(r[k]) + "</p>" : "").join("") + (safeURL(r.link) ? '<a rel="noreferrer" href="' + escape(safeURL(r.link)) + '">Project evidence</a>' : "") + "</article>").join("") + "</html>";
  }
  const documentKinds = ["Professional introduction", "Cover letter", "Referral request", "Recruiter reply", "Interview follow-up", "Offer clarification", "Resignation", "Handover", "Project update", "Project summary", "Recruiter email", "Appreciation", "Appraisal"];
  function documents() {
    const c = card(body, "Professional document library");
    button(c, "New document", () => {
      changed(() => {
        const d2 = { id: uid(), title: "New document", kind: "Cover letter", body: "", applicationId: "", versions: [] };
        p.documents.push(d2);
        editId = d2.id;
      });
      render();
    });
    for (const d2 of p.documents) {
      const r = row(c);
      r.append(node("span", d2.title + " \xB7 " + d2.kind));
      button(r, "Edit " + d2.title, () => {
        editId = d2.id;
        render();
      });
    }
    const d = p.documents.find((d2) => d2.id === editId);
    if (!d) return;
    const editor = card(body, "Write and review");
    field(editor, "Document title", d.title, "text", (v) => changed(() => d.title = v, d.id + "title"));
    select(editor, "Document type", d.kind, documentKinds, (v) => changed(() => d.kind = v));
    select(editor, "Linked application", d.applicationId, [["", "No application"], ...p.applications.map((a) => [a.id, a.company + " \xB7 " + a.role])], (v) => changed(() => d.applicationId = v));
    const recipient = field(editor, "Recipient", ""), context = textArea(editor, "Facts / context to include", ""), closing = field(editor, "Closing / next step", "");
    const draft = textArea(editor, "Editable document", d.body, (v) => changed(() => d.body = v, d.id + "body"));
    button(editor, "Build a structured draft", () => {
      const name = p.profile.name, app = p.applications.find((a) => a.id === d.applicationId), heading = d.kind === "Cover letter" ? "Application for " + (app?.role || p.profile.headline) : d.kind, parts = [heading, recipient.value ? "Hello " + recipient.value + "," : "", d.kind === "Professional introduction" ? "My name is " + name + (p.profile.headline ? ", and I work as " + p.profile.headline : "") + "." : "", context.value, closing.value, name].filter(Boolean);
      if (!context.value.trim()) throw Error("Enter the facts/context to include");
      modal("Review structured draft", (c2, a, dialog) => {
        c2.append(node("pre", parts.join("\n\n")));
        button(a, "Use reviewed draft", () => {
          changed(() => d.body = parts.join("\n\n"));
          dialog.close();
          render();
        });
      });
    });
    button(editor, "Save document version", () => {
      if (!d.body.trim()) throw Error("Enter document content");
      changed(() => {
        d.versions.push({ at: (/* @__PURE__ */ new Date()).toISOString(), body: d.body });
        if (d.versions.length > 20) d.versions.shift();
      });
      render();
      say("Document version saved in this project.");
    });
    const saved = select(editor, "Saved document version", "", d.versions.map((v, i) => [String(i), v.at]));
    button(editor, "Review saved document version", () => {
      const v = d.versions[Number(saved.value)];
      if (!v) throw Error("Choose a saved version");
      modal("Review document version", (c2, a, dialog) => {
        c2.append(node("pre", v.body));
        button(a, "Restore reviewed document", () => {
          changed(() => d.body = v.body);
          dialog.close();
          render();
        });
      });
    });
    button(editor, "Download document text", () => download(slug(d.title) + ".txt", d.body, "text/plain"));
    const documentSettings=clone(d.settings||{...settings(),page:p.settings.page,size:p.settings.size,spacing:p.settings.spacing,margin:p.settings.margin,font:p.settings.font,language:p.settings.language,direction:p.settings.direction,...(p.settings.layout?{layout:clone(p.settings.layout)}:{})});
    documentSettings.hiddenFields=['email','phone','location','links'];documentSettings.hidden=[];documentSettings.order=[...sections];documentSettings.labels={summary:'Message'};
    const asDocument=()=>{const doc=profile();doc.name=d.title;doc.summary=d.body;return doc;};
    const design=details(editor,'Document design & alignment');
    layoutControls(design,asDocument,documentSettings,next=>{d.settings=clone(next);});
    note(design,'This document keeps its own reviewed layout. Other documents and the master resume are unchanged.');
    button(editor,'Download document Word',()=>download(slug(d.title)+'.docx',docxBytes(asDocument(),documentSettings),'application/vnd.openxmlformats-officedocument.wordprocessingml.document'));
    button(editor,'Download document HTML',()=>download(slug(d.title)+'.html',documentHTML(asDocument(),documentSettings),'text/html'));
    button(editor,'Download document PDF',async()=>{const proof=JSON.stringify(d),result=await pdfExport(asDocument(),documentSettings);if(proof!==JSON.stringify(d))throw Error('Document changed during export; try again');download(slug(d.title)+'.pdf',result.bytes,'application/pdf');});
  }

  function slug(s) {
    return String(s || "resume").normalize("NFKC").replace(/[^\p{L}\p{N}._-]+/gu, "-").slice(0, 90) || "resume";
  }
  function exportsView() {
    const c = card(body, "Review your export", "Select the exact document and check its content and pages before sharing it.");
    resumePicker(c);
    const a = current(), name = field(c, "Export filename", slug(a.settings.hiddenFields.includes("name") ? "Anonymous" : a.doc.name) + "-" + slug(a.label)), reading = details(c, "Plain-text reading order", true);
    reading.append(node("pre", resumeText(a.doc, a.settings)));
    const metadata = details(c, "Document metadata & privacy review");
    metadata.append(node("pre", JSON.stringify({ title: a.settings.hiddenFields.includes("name") ? "Anonymous resume" : a.doc.name || "Resume", pdfCreator: "Tool Studio Career Studio", wordAuthor: "No author property included", language: a.settings.language, direction: a.settings.direction, hiddenFields: a.settings.hiddenFields, hiddenSections: a.settings.hidden }, null, 2)));
    const view = node("div", void 0, { class: "career-export-preview" });
    c.append(view);
    let built = null;
    const signature = () => JSON.stringify(current());
    const actions = row(c);
    button(actions, "Preview actual PDF pages", async () => {
      const proof = signature(), ticket = ++sequence, result = await pdfExport(a.doc, a.settings);
      if (disposed || ticket !== sequence || proof !== signature() || !view.isConnected) return;
      const engine = await api.pdf(), task = engine.getDocument({ data: result.bytes.slice(), isEvalSupported: false });
      let pdf;
      try {
        pdf = await task.promise;
        view.replaceChildren(node("p", pdf.numPages + " actual PDF pages \xB7 showing up to 6 below" + (a.settings.targetPages && pdf.numPages > a.settings.targetPages ? " \xB7 exceeds your " + a.settings.targetPages + "-page target; adjust content or spacing, then preview again. No content was trimmed." : "")));
        for (let i = 1; i <= Math.min(pdf.numPages, 6); i++) {
          const page = await pdf.getPage(i), viewport = page.getViewport({ scale: 0.9 }), canvas = node("canvas", void 0, { "aria-label": "PDF page " + i, role: "img", width: Math.ceil(viewport.width), height: Math.ceil(viewport.height) });
          await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
          if (!view.isConnected) return;
          view.append(canvas);
        }
        built = { proof, bytes: result.bytes };
        say("Actual PDF pages rendered. The PDF download uses these bytes.");
      } finally {
        await task.destroy();
      }
    });
    button(actions, "Download PDF", async () => {
      const proof = signature(), result = built?.proof === proof ? built : await pdfExport(a.doc, a.settings);
      if (proof !== signature()) throw Error("Resume changed during export; try again");
      download(slug(name.value) + ".pdf", result.bytes, "application/pdf");
    });
    button(actions, "Download Word", () => download(slug(name.value) + ".docx", docxBytes(a.doc, a.settings), "application/vnd.openxmlformats-officedocument.wordprocessingml.document"));
    button(actions, "Download HTML", () => download(slug(name.value) + ".html", documentHTML(a.doc, a.settings), "text/html"));
    button(actions, "Download plain text", () => download(slug(name.value) + ".txt", resumeText(a.doc, a.settings), "text/plain"));
    button(actions, "Print / Save as PDF", () => {
      const popup = window.open("", "_blank");
      if (!popup) throw Error("Allow the print window to open");
      popup.opener = null;
      popup.document.open();
      popup.document.write(documentHTML(a.doc, a.settings));
      popup.document.close();
      setTimeout(() => {
        if (!popup.closed) popup.print();
      }, 700);
    });
    note(c, "Direct PDF embeds DejaVu Sans and supports its covered left-to-right characters. Use browser Print / Save as PDF or Word/HTML for RTL and other scripts. Word and browser printing can paginate differently; review their print preview.");
    const bundleBox = card(body, "Application document bundle", "Uses the submitted resume snapshot when available, keeping the application\u2019s exact copy. Drafts remain editable in Documents.");
    const app = select(bundleBox, "Bundle application", application, p.applications.map((a2) => [a2.id, a2.company + " \xB7 " + a2.role]));
    const content = node("pre");
    bundleBox.append(content);
    let reviewed = null;
    const get = () => {
      const a2 = p.applications.find((a3) => a3.id === app.value);
      if (!a2) throw Error("Choose an application");
      return { app: a2, resume: a2.submitted || activeDocument(p, a2.resumeId), docs: p.documents.filter((d) => d.applicationId === a2.id) };
    };
    button(bundleBox, "Review bundle contents", () => {
      const data = get();
      reviewed = JSON.stringify(data);
      content.textContent = ["Application: " + data.app.company + " \xB7 " + data.app.role, "Resume: " + (data.app.submitted ? "Submitted snapshot" : "Current selected resume"), "resume.html", "resume.txt", "resume.docx", ...data.docs.map((d) => slug(d.title) + "-" + d.id.slice(0, 8) + ".txt"), "application-summary.txt"].join("\n");
    });
    button(bundleBox, "Download reviewed bundle", () => {
      const data = get();
      if (!reviewed || reviewed !== JSON.stringify(data)) throw Error("Review the current bundle contents first");
      const { doc, settings: s } = data.resume;
      const files = { "resume.html": documentHTML(doc, s), "resume.txt": resumeText(doc, s), "resume.docx": docxBytes(doc, s), "application-summary.txt": JSON.stringify({ company: data.app.company, role: data.app.role, status: data.app.status, notes: data.app.notes }, null, 2) };
      for (const d of data.docs) files[slug(d.title) + "-" + d.id.slice(0, 8) + ".txt"] = d.body;
      download(slug(data.app.company) + "-application.zip", bundle(files), "application/zip");
    });
  }
  function tracker() {
    const c = card(body, "Your applications");
    const controls = row(c);
    button(controls, "Add application", () => {
      changed(() => {
        const a2 = newApplication();
        p.applications.push(a2);
        application = a2.id;
      });
      render();
    });
    select(c, "Application view", applicationView, ["Kanban", "Table", "Calendar"], (v) => {
      applicationView = v;
      render();
    });
    const search = field(c, "Search companies and roles", "", "search"), results = node("div");
    c.append(results);
    function show() {
      results.replaceChildren();
      const apps = p.applications.filter((a2) => (a2.company + " " + a2.role + " " + a2.recruiter).toLowerCase().includes(search.value.toLowerCase()));
      if (applicationView === "Kanban") {
        const board = node("div", void 0, { class: "career-board", "aria-label": "Application stages" });
        results.append(board);
        for (const stage of stages) {
          const column = card(board, stage);
          column.ondragover = (e) => e.preventDefault();
          column.ondrop = (e) => {
            e.preventDefault();
            const id = e.dataTransfer.getData("text/plain"), a2 = p.applications.find((a3) => a3.id === id);
            if (a2) {
              changed(() => a2.status = stage);
              show();
            }
          };
          for (const a2 of apps.filter((a3) => a3.status === stage)) {
            const b = button(column, (a2.company || "New company") + " \xB7 " + (a2.role || "New role"), () => openApplication(a2.id), { draggable: true });
            b.ondragstart = (e) => e.dataTransfer.setData("text/plain", a2.id);
          }
        }
      } else if (applicationView === "Table") {
        const table = node("table"), head2 = node("tr");
        for (const t of ["Company / role", "Stage", "Follow-up", "Interview"]) head2.append(node("th", t, { scope: "col" }));
        table.append(head2);
        for (const a2 of apps) {
          const tr = node("tr"), td = node("td");
          button(td, (a2.company || "New company") + " \xB7 " + a2.role, () => openApplication(a2.id));
          tr.append(td, node("td", a2.status), node("td", a2.followUp), node("td", a2.interviewDate));
          table.append(tr);
        }
        results.append(table);
      } else calendar(results, apps);
    }
    search.oninput = show;
    show();
    const a = p.applications.find((a2) => a2.id === application);
    if (!a) return;
    checklistView(body,a);
    const editor = card(body, (a.company || "New application") + " workspace", "The selected resume is editable. Mark submitted records a separate copy of the exact content/settings at that point.");
    editor.classList.add("career-application-editor");
    for (const [k, label, type = "text"] of [["company", "Company"], ["role", "Applied role"], ["recruiter", "Recruiter / contact"], ["email", "Recruiter email", "email"], ["url", "Job URL"], ["applied", "Application date", "date"], ["followUp", "Follow-up date", "date"], ["interviewDate", "Next interview", "date"], ["jobDescription", "Job description", "textarea"], ["notes", "Application notes", "textarea"]]) field(editor, label, a[k], type, (v) => changed(() => a[k] = v, a.id + k));
    select(editor, "Application stage", a.status, stages, (v) => {
      changed(() => a.status = v);
      show();
    });
    select(editor, "Application resume", a.resumeId, [["master", "Master profile"], ...p.resumes.map((r) => [r.id, r.label])], (v) => changed(() => a.resumeId = v));
    const actions = row(editor);
    button(actions, "Tailor a resume for this job", () => {
      changed(() => {
        const r = newVariant(p, a.resumeId, (a.company || "Company") + " \u2014 " + (a.role || "Role"));
        r.targetRole = a.role;
        a.resumeId = r.id;
        active = r.id;
      });
      chooseArea("profile", "resume");
    });
    button(actions, "Review submitted snapshot", () => {
      const chosen = activeDocument(p, a.resumeId), proof = JSON.stringify(chosen);
      modal("Review submitted resume", (c2, actions2, d) => {
        c2.append(node("pre", resumeText(chosen.doc, chosen.settings)));
        button(actions2, "Mark this copy submitted", () => {
          if (proof !== JSON.stringify(activeDocument(p, a.resumeId))) throw Error("Selected resume changed; review again");
          changed(() => {
            a.submitted = { doc: clone(chosen.doc), settings: clone(chosen.settings), label: chosen.label, at: (/* @__PURE__ */ new Date()).toISOString() };
            if (a.status === "Saved") a.status = "Applied";
            if (!a.applied) a.applied = today();
          });
          d.close();
          render();
        });
      });
    });
    if (a.submitted) {
      const d = details(editor, "Submitted copy \xB7 " + a.submitted.at.slice(0, 10));
      d.append(node("pre", resumeText(a.submitted.doc, a.submitted.settings)));
    }
    button(actions, "Review job requirements", () => openApplication(a.id, "requirements"));
    button(actions, "Prepare interview", () => chooseArea("interview", "practice"));
    button(actions, "Application documents", () => chooseArea("profile", "documents"));
    const rounds = details(editor, "Interview rounds");
    button(rounds, "Add interview round", () => {
      changed(() => a.rounds.push({ id: uid(), title: "New round", date: "", notes: "" }));
      render();
    });
    for (const r of a.rounds) {
      const row2 = card(rounds, r.title);
      for (const [k, label, type] of [["title", "Round title", "text"], ["date", "Round date", "date"], ["notes", "Round notes", "textarea"]]) field(row2, label, r[k], type, (v) => changed(() => r[k] = v, r.id + k));
    }
  }
  function calendar(parent, apps) {
    const month = field(parent, "Calendar month", today().slice(0, 7), "month"), grid = node("div", void 0, { class: "career-calendar" });
    parent.append(grid);
    function draw() {
      grid.replaceChildren();
      if (!/^\d{4}-\d{2}$/.test(month.value)) return;
      const [y, m] = month.value.split("-").map(Number), start = new Date(y, m - 1, 1).getDay(), days = new Date(y, m, 0).getDate();
      for (const label of ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]) grid.append(node("strong", label));
      for (let n = 0; n < start; n++) grid.append(node("div"));
      for (let day = 1; day <= days; day++) {
        const date = month.value + "-" + String(day).padStart(2, "0"), cell = node("div", void 0, { class: "career-day" });
        cell.append(node("strong", day));
        for (const a of apps) for (const [k, label] of [["followUp", "Follow up"], ["interviewDate", "Interview"]]) if (a[k] === date) button(cell, label + ": " + a.company, () => openApplication(a.id));
        grid.append(cell);
      }
    }
    month.oninput = draw;
    draw();
  }
  function requirements() {
    const c = card(body, "Job requirements & evidence", "Extracted lines are editable requirements, not inferred qualifications. Mark a requirement supported only after reviewing the evidence.");
    if (!p.applications.length) {
      note(c, "Add an application and its job description first.");
      return;
    }
    if (!p.applications.some((a2) => a2.id === application)) application = p.applications[0].id;
    select(c, "Requirements application", application, p.applications.map((a2) => [a2.id, a2.company + " \xB7 " + a2.role]), (v) => {
      application = v;
      render();
    });
    const a = p.applications.find((a2) => a2.id === application);
    note(c, a.jobDescription || "No job description entered.");
    button(c, "Review extracted requirements", () => {
      const extracted = extractRequirements(a.jobDescription);
      if (!extracted.length) throw Error("Enter a job description in the application first");
      modal("Review requirement lines", (content, actions, d) => {
        content.append(node("pre", extracted.map((r) => r.text).join("\n")));
        note(content, "This appends lines. Existing statuses and evidence links are preserved.");
        button(actions, "Add reviewed requirements", () => {
          changed(() => {
            const existing = new Set(a.requirements.map((r) => r.text));
            a.requirements.push(...extracted.filter((r) => !existing.has(r.text)));
          });
          d.close();
          render();
        });
      });
    });
    button(c, "Add requirement manually", () => {
      changed(() => a.requirements.push({ id: uid(), text: "New requirement", status: "Not covered", evidenceId: "", notes: "" }));
      render();
    });
    for (const r of a.requirements) {
      const cardEl = card(c, r.text);
      textArea(cardEl, "Requirement", r.text, (v) => changed(() => r.text = v, r.id + "text"));
      select(cardEl, "Coverage", r.status, ["Not covered", "Needs clarification", "Supported"], (v) => {
        if (v === "Supported" && !r.evidenceId && !r.notes.trim()) throw Error("Link evidence or enter support notes before marking Supported");
        changed(() => r.status = v);
      });
      select(cardEl, "Supporting achievement", r.evidenceId, [["", "No achievement selected"], ...p.evidence.map((e) => [e.id, e.title || e.action.slice(0, 60)])], (v) => changed(() => r.evidenceId = v));
      textArea(cardEl, "Requirement evidence / clarification notes", r.notes, (v) => changed(() => r.notes = v, r.id + "notes"));
      const evidence2 = p.evidence.find((e) => e.id === r.evidenceId);
      if (evidence2) note(cardEl, bullet(evidence2));
      button(cardEl, "Create a learning gap", () => {
        changed(() => p.growth.push({ id: uid(), skill: r.text.slice(0, 150), role: a.role, current: 0, target: 3, priority: 3, deadline: "", evidence: r.notes, actions: [{ id: uid(), text: "Define a practice task and evidence for this requirement", done: false }] }));
        say("Learning item added under Growth.");
      });
      button(cardEl, "Remove requirement", () => {
        changed(() => a.requirements = a.requirements.filter((x) => x.id !== r.id));
        render();
      });
    }
  }
  function offers() {
    const c = card(body, "Compare offers", "Annual values use the same currency within each offer. Recurring fixed pay, assumed variable pay, one-time joining pay and benefits stay separate. This is a gross comparison; it does not calculate tax or take-home pay.");
    button(c, "Add offer", () => {
      changed(() => {
        const o2 = { id: uid(), company: "New offer", currency: "INR", fixed: 0, variable: 0, variablePct: 100, joining: 0, benefits: 0, location: "", workMode: "", notice: "", notes: "", ratings: { growth: 3, balance: 3, location: 3 }, weights: { growth: 1, balance: 1, location: 1 } };
        p.offers.push(o2);
        editId = o2.id;
      });
      render();
    });
    const table = node("table"), head2 = node("tr");
    for (const t of ["Offer", "Fixed recurring", "Expected variable", "First-year value", "Preference / 5"]) head2.append(node("th", t, { scope: "col" }));
    table.append(head2);
    for (const o2 of p.offers) {
      const s = offerSummary(o2), tr = node("tr"), cell = node("td");
      button(cell, o2.company, () => {
        editId = o2.id;
        render();
      });
      tr.append(cell, node("td", o2.currency + " " + s.guaranteedRecurring.toLocaleString()), node("td", s.expectedVariable.toLocaleString()), node("td", s.firstYear.toLocaleString()), node("td", s.preferenceScore === null ? "No weights" : s.preferenceScore.toFixed(2)));
      table.append(tr);
    }
    c.append(table);
    if (new Set(p.offers.map((o2) => o2.currency)).size > 1) note(c, "Different currencies are displayed separately. No currency conversion or monetary ranking is applied.");
    const o = p.offers.find((o2) => o2.id === editId);
    if (!o) return;
    const e = card(body, "Offer details & assumptions");
    for (const [k, label] of [["company", "Offer company"], ["currency", "Currency code"], ["location", "Location"], ["workMode", "Work arrangement"], ["notice", "Notice period"], ["notes", "Offer notes"]]) field(e, label, o[k], k === "notes" ? "textarea" : "text", (v) => changed(() => o[k] = v, o.id + k));
    for (const [k, label, max] of [["fixed", "Annual fixed pay", 1e12], ["variable", "Annual variable at full payout", 1e12], ["variablePct", "Assumed variable payout (%)", 100], ["joining", "One-time joining bonus", 1e12], ["benefits", "Annual benefits value", 1e12]]) {
      const input = field(e, label, o[k], "number", (v) => changed(() => o[k] = v, o.id + k));
      input.min = 0;
      input.max = max;
    }
    for (const key of ["growth", "balance", "location"]) {
      const rating = field(e, key + " rating (0\u20135)", o.ratings[key], "number", (v) => changed(() => o.ratings[key] = v, o.id + key));
      rating.min = 0;
      rating.max = 5;
      const weight = field(e, key + " weight (0\u201310)", o.weights[key], "number", (v) => changed(() => o.weights[key] = v, o.id + key + "weight"));
      weight.min = 0;
      weight.max = 10;
    }
    button(e, "Refresh offer comparison", render);
    note(e, "Expected variable = full variable \xD7 assumed payout / 100. First year = fixed + expected variable + joining bonus + benefits. Preference score = weighted mean of your ratings. Benefits may be non-cash; review your valuation.");
  }
  function questionOptions() {
    return p.questions.map((q) => [q.id, q.topic + " \xB7 " + q.question.slice(0, 70)]);
  }
  function addQuestionPack() {
    changed(() => {
      for (const [topic, question, followUp] of questionPack) if (!p.questions.some((q) => q.question === question)) p.questions.push({ id: uid(), topic, question, answer: "", example: "", followUp });
    });
    render();
  }
  function questions() {
    const c = card(body, "Your interview question library");
    button(c, "Add starter / Salesforce questions", addQuestionPack);
    button(c, "Add question", () => {
      changed(() => {
        const q2 = { id: uid(), topic: "", question: "", answer: "", example: "", followUp: "" };
        p.questions.push(q2);
        editId = q2.id;
      });
      render();
    });
    const search = field(c, "Search interview questions", "", "search"), list = node("div");
    c.append(list);
    const show = () => {
      list.replaceChildren();
      for (const q2 of p.questions.filter((q3) => (q3.topic + " " + q3.question).toLowerCase().includes(search.value.toLowerCase()))) button(list, q2.topic + " \xB7 " + q2.question, () => {
        editId = q2.id;
        render();
      });
    };
    search.oninput = show;
    show();
    const q = p.questions.find((q2) => q2.id === editId);
    if (q) {
      const editor = card(body, "Question & preparation");
      for (const [k, label] of [["topic", "Question topic"], ["question", "Interview question"], ["answer", "Reference answer / notes"], ["example", "Project example / evidence"], ["followUp", "Follow-up question"]]) field(editor, label, q[k], k === "topic" ? "text" : "textarea", (v) => changed(() => q[k] = v, q.id + k));
      button(editor, "Practise this question", () => {
        questionIndex = p.questions.indexOf(q);
        chooseArea("interview", "practice");
      });
    }
  }
  function practiceView() {
    const c = card(body, "Practise one answer at a time", "Use Situation \u2192 Task \u2192 Action \u2192 Result. Ratings are your self-review against visible criteria, not a proficiency or hiring assessment.");
    if (!p.questions.length) {
      note(c, "Add your own questions or load the starter pack.");
      button(c, "Load starter questions", addQuestionPack);
      return;
    }
    questionIndex = Math.min(questionIndex, p.questions.length - 1);
    const q = p.questions[questionIndex];
    select(c, "Practice question", q.id, questionOptions(), (v) => {
      questionIndex = p.questions.findIndex((q2) => q2.id === v);
      practice = null;
      render();
    });
    const question = node("h4", q.question);
    c.append(question);
    const clock = node("p", "Not started", { role: "timer" });
    c.append(clock);
    const target = field(c, "Practice target (minutes)", 3, "number");
    target.min = 1;
    target.max = 60;
    const response = textArea(c, "Your practice answer", practice?.questionId === q.id ? practice.response : "", (v) => {
      if (!practice || practice.questionId !== q.id) practice = { questionId: q.id, response: v, started: null, elapsed: 0 };
      else practice.response = v;
    });
    button(c, "Start / restart timer", () => {
      if (timer) clearInterval(timer);
      const minutes = Number(target.value);
      if (!Number.isFinite(minutes) || minutes < 1 || minutes > 60) throw Error("Choose 1\u201360 minutes");
      practice = { questionId: q.id, response: response.value, started: Date.now(), elapsed: 0 };
      timer = setInterval(() => {
        if (!practice?.started || !clock.isConnected) {
          clearInterval(timer);
          timer = null;
          return;
        }
        practice.elapsed = Math.min(86400, Math.floor((Date.now() - practice.started) / 1e3));
        clock.textContent = practice.elapsed + " seconds elapsed" + (practice.elapsed >= minutes * 60 ? " \xB7 target reached" : "");
      }, 1e3);
    });
    field(c, "Mark for more practice", !!q.needsPractice, "checkbox", (v) => changed(() => q.needsPractice = v));
    button(c, "Next marked question", () => {
      const candidates = p.questions.filter((item) => item.needsPractice);
      if (!candidates.length) throw Error("Mark a question for more practice first");
      const i = candidates.findIndex((item) => item.id === q.id), next = candidates[(i + 1) % candidates.length];
      questionIndex = p.questions.indexOf(next);
      practice = null;
      render();
    });
    const reference = details(c, "Reveal preparation notes & follow-up");
    reference.append(node("p", q.answer || "No reference answer entered."), node("p", q.example || "No project example entered."), node("p", q.followUp || "What would you do differently?"));
    const ratings = { relevance: 0, structure: 0, evidence: 0, clarity: 0 };
    for (const [key, description] of [["relevance", "Did I answer the actual question?"], ["structure", "Did I explain context, action and result?"], ["evidence", "Did I give a specific example?"], ["clarity", "Could someone follow the answer?"]]) {
      const input = field(c, description + " (0\u20135)", 0, "number", (v) => ratings[key] = v);
      input.min = 0;
      input.max = 5;
    }
    const notes = textArea(c, "What I will improve next", "");
    button(c, "Save reviewed practice attempt", () => {
      if (!response.value.trim()) throw Error("Enter your practice answer");
      changed(() => p.attempts.push({ id: uid(), question: q.question, response: response.value, at: (/* @__PURE__ */ new Date()).toISOString(), seconds: practice?.started ? Math.min(86400, Math.floor((Date.now() - practice.started) / 1e3)) : 0, ratings: clone(ratings), notes: notes.value }));
      clearInterval(timer);
      timer = null;
      practice = null;
      say("Practice attempt saved. Compare attempts in Practice history.");
    });
    button(c, "Next question", () => {
      questionIndex = (questionIndex + 1) % p.questions.length;
      practice = null;
      render();
    });
  }
  function attempts() {
    const c = card(body, "Practice history", "Compare your actual answers and self-review notes over time.");
    if (p.attempts.length >= 2) {
      const options = p.attempts.map((a) => [a.id, a.at.slice(0, 16) + " \xB7 " + a.question.slice(0, 50)]), left = select(c, "First practice attempt", p.attempts[0].id, options), right = select(c, "Second practice attempt", p.attempts.at(-1).id, options), comparison = node("div", void 0, { class: "career-grid" });
      c.append(comparison);
      button(c, "Compare practice attempts", () => {
        comparison.replaceChildren();
        for (const id of [left.value, right.value]) {
          const a = p.attempts.find((a2) => a2.id === id);
          if (!a) throw Error("Choose two saved attempts");
          const item = card(comparison, a.question);
          note(item, a.at + " \xB7 " + a.seconds + " seconds");
          item.append(node("p", a.response), node("pre", JSON.stringify(a.ratings, null, 2)), node("p", a.notes));
        }
      });
    }
    const repeat = /* @__PURE__ */ new Map();
    for (const a of [...p.attempts].reverse()) {
      const d = details(c, a.at.slice(0, 16).replace("T", " ") + " \xB7 " + a.question);
      d.append(node("p", a.response), node("p", "Duration: " + a.seconds + " seconds"), node("pre", JSON.stringify(a.ratings, null, 2)), node("p", a.notes));
      const previous = repeat.get(a.question);
      if (previous) note(d, "A later attempt exists for this question; compare its answer and ratings above.");
      repeat.set(a.question, a);
    }
    if (!p.attempts.length) note(c, "Your saved attempts will appear here.");
  }
  function roadmap() {
    const c = card(body, "Your growth roadmap", "Levels are your own 0\u20135 self-assessment. Track completed learning actions and evidence, rather than assuming completion proves proficiency.");
    button(c, "Add growth goal", () => {
      changed(() => {
        const g2 = { id: uid(), skill: "New skill", role: "", current: 0, target: 3, priority: 3, deadline: "", evidence: "", actions: [] };
        p.growth.push(g2);
        editId = g2.id;
      });
      render();
    });
    const grid = node("div", void 0, { class: "career-grid" });
    c.append(grid);
    for (const g2 of [...p.growth].sort((a, b) => b.priority - a.priority)) {
      const r = card(grid, g2.skill);
      note(r, g2.current + " \u2192 " + g2.target + " \xB7 " + g2.role + " \xB7 " + (g2.deadline || "No deadline"));
      const progress = node("progress", void 0, { value: g2.actions.filter((a) => a.done).length, max: g2.actions.length || 1, "aria-label": g2.skill + " action completion" });
      r.append(progress);
      for (const a of g2.actions) field(r, a.text, a.done, "checkbox", (v) => {
        changed(() => a.done = v);
        progress.value = g2.actions.filter((a2) => a2.done).length;
      });
      button(r, "Edit growth goal", () => {
        editId = g2.id;
        render();
      });
    }
    const g = p.growth.find((g2) => g2.id === editId);
    if (!g) return;
    const e = card(body, "Learning goal details");
    for (const [k, label, type] of [["skill", "Skill / goal", "text"], ["role", "Target role", "text"], ["current", "Current level (0\u20135)", "number"], ["target", "Target level (0\u20135)", "number"], ["priority", "Priority (0\u20135)", "number"], ["deadline", "Goal deadline", "date"], ["evidence", "Progress evidence", "textarea"]]) {
      const input = field(e, label, g[k], type, (v) => changed(() => g[k] = v, g.id + k));
      if (type === "number") {
        input.min = 0;
        input.max = 5;
      }
    }
    const action = field(e, "New learning action", "");
    button(e, "Add learning action", () => {
      if (!action.value.trim()) throw Error("Enter a learning action");
      changed(() => g.actions.push({ id: uid(), text: action.value.trim(), done: false }));
      render();
    });
    button(e, "Download learning checklist", () => download("learning-checklist.txt", p.growth.map((g2) => g2.skill + " \xB7 " + g2.current + " \u2192 " + g2.target + "\n" + g2.actions.map((a) => (a.done ? "[x] " : "[ ] ") + a.text).join("\n") + "\nEvidence: " + g2.evidence).join("\n\n"), "text/plain"));
  }
  function reviews() {
    const c = card(body, "Appraisals & promotion cases", "Choose the review period and evidence. Build an editable draft from the facts you select.");
    button(c, "New review", () => {
      changed(() => {
        const r2 = { id: uid(), title: "Performance review", start: "", end: today(), goals: "", leadership: "", feedback: "", next: "", body: "", evidence: [] };
        p.reviews.push(r2);
        editId = r2.id;
      });
      render();
    });
    for (const r2 of p.reviews) button(c, r2.title + " \xB7 " + r2.start + " \u2013 " + r2.end, () => {
      editId = r2.id;
      render();
    });
    const r = p.reviews.find((r2) => r2.id === editId);
    if (!r) return;
    const e = card(body, "Review workspace");
    for (const [k, label, type] of [["title", "Review title", "text"], ["start", "Review period start", "date"], ["end", "Review period end", "date"], ["goals", "Goals delivered", "textarea"], ["leadership", "Leadership & collaboration", "textarea"], ["feedback", "Stakeholder feedback", "textarea"], ["next", "Next-period objectives", "textarea"]]) field(e, label, r[k], type, (v) => changed(() => r[k] = v, r.id + k));
    button(e, "Refresh period evidence", render);
    const candidates = details(e, "Choose supporting achievements", true);
    for (const achievement of p.evidence) {
      if (r.start && achievement.date && achievement.date < r.start || r.end && achievement.date && achievement.date > r.end) continue;
      field(candidates, achievement.title || achievement.action.slice(0, 60), r.evidence.includes(achievement.id), "checkbox", (v) => changed(() => r.evidence = v ? [.../* @__PURE__ */ new Set([...r.evidence, achievement.id])] : r.evidence.filter((id) => id !== achievement.id)));
    }
    const draft = textArea(e, "Editable review document", r.body, (v) => changed(() => r.body = v, r.id + "body"));
    button(e, "Build review draft", () => {
      if (r.start && r.end && r.end < r.start) throw Error("Review end precedes its start");
      const text = [r.title, r.start + " \u2013 " + r.end, "Goals delivered", r.goals, "Selected achievements", ...p.evidence.filter((a) => r.evidence.includes(a.id)).map((a) => bullet(a) + (a.notes ? "\nEvidence: " + a.notes : "")), "Leadership & collaboration", r.leadership, "Stakeholder feedback", r.feedback, "Next-period objectives", r.next].filter(Boolean).join("\n\n");
      changed(() => r.body = text);
      draft.value = text;
      say("Review draft built from the selected facts. Edit and verify it before sharing.");
    });
    button(e, "Download review", () => download(slug(r.title) + ".txt", r.body, "text/plain"));
    button(e, "Add as professional document", () => {
      changed(() => p.documents.push({ id: uid(), title: r.title, kind: "Appraisal", body: r.body, applicationId: "", versions: [] }));
      say("Review added to the document library.");
    });
  }
  function guide() {
    modal("Career Studio guide", (c) => {
      for (const [title, text] of [["1 \xB7 Start with your facts", "Edit the master profile or import a resume into a separate variant. Review fictional examples and imported mappings before using them."], ["2 \xB7 Tailor with evidence", "Save an achievement, create a variant and compare it with your master. Apply individual sections after reviewing the differences."], ["3 \xB7 Track the exact application", "Add the job, link its resume and mark a reviewed copy submitted. Later edits do not alter that snapshot."], ["4 \xB7 Prepare and grow", "Turn uncovered requirements into learning goals, practise questions, save self-review attempts and select evidence for appraisals."], ["5 \xB7 Review and export", "Check text order and quality findings. Preview actual PDF pages. Export the project to retain all linked data; Word and browser print layouts need their own print preview."], ["6 \xB7 Save deliberately", "Recovery is opt-in and stays in this browser. Review a saved draft before using it. Project exports include entered personal details and notes."]]) {
        c.append(node("h4", title), node("p", text));
      }
    });
  }
  const recovery = details(root, "Project & recovery");
  const projectFile = field(recovery, "Open Career Studio / original career project", "", "file");
  projectFile.accept = ".json";
  projectFile.onchange = safe(async () => {
    const file = projectFile.files[0];
    if (!file || file.size > 12e6) throw Error("Choose a JSON project up to 12 MB");
    const raw = JSON.parse(await file.text()), candidate = raw.format === "calc-studio-career-project" ? migrateLegacy(raw) : validateProject(raw);
    reviewProject(candidate, raw.format === "calc-studio-career-project" ? "original career migration" : "Career Studio project");
    projectFile.value = "";
  });
  button(recovery, "Review current original career data", async () => {
    await api.ensure("careerdocuments");
    const legacy = api.c.crCheck(api.c.cr);
    reviewProject(migrateLegacy({ format: "calc-studio-career-project", version: 1, data: legacy }), "current original career data");
  },{'data-import-original':'true'});
  button(recovery, "Download retained original project", () => {
    if (!p.legacy) throw Error("No migrated original project is retained");
    download("original-career-project.json", p.legacy);
  });
  const autosave = field(recovery, "Enable local project recovery", enabled, "checkbox", (v) => {
    enabled = v;
    localStorage.setItem(enabledKey, v ? "1" : "0");
    if (v && !blocked) saveLocal();
    updateSavedState();
  });
  button(recovery, "Review saved recovery", () => {
    const raw = localStorage.getItem(draftKey);
    if (!raw) throw Error("No saved project recovery");
    const candidate = recover(raw);
    readOnlyDraft = raw;
    modal("Review local recovery", (c, a, d) => {
      note(c, "Saved profile: " + (candidate.profile.name || "Unnamed") + " \xB7 " + candidate.resumes.length + " variants \xB7 " + candidate.applications.length + " applications");
      button(a, "Restore reviewed recovery", () => {
        if (localStorage.getItem(draftKey) !== readOnlyDraft) throw Error("Recovery changed; review again");
        pushHistory(JSON.stringify(p), "recovery");
        p = candidate;
        lastRaw = readOnlyDraft;
        blocked = false;
        active = "master";
        application = "";
        editId = "";
        d.close();
        render();
        updateSavedState();
        say("Reviewed recovery restored. Export project for a portable copy.");
      });
      button(a, "Keep this session and replace reviewed recovery", () => {
        if (localStorage.getItem(draftKey) !== readOnlyDraft) throw Error("Recovery changed; review again");
        lastRaw = readOnlyDraft;
        blocked = false;
        d.close();
        saveLocal();
        updateSavedState();
        say("This session replaced the reviewed recovery.");
      });
    });
  });
  button(recovery, "Clear saved recovery", () => modal("Clear local recovery", (c, a, d) => {
    note(c, "This removes the saved recovery copy and turns recovery off. Current session data remains available for export.");
    button(a, "Clear reviewed recovery", () => {
      localStorage.removeItem(draftKey);
      localStorage.removeItem(enabledKey);
      lastRaw = null;
      enabled = false;
      blocked = false;
      autosave.checked = false;
      d.close();
      updateSavedState();
    });
  }));
  button(recovery, "Clear Career Studio session", () => modal("Clear Career Studio session", (c, a, d) => {
    note(c, "Export your project first if needed. Undo can restore the current session. Your original career tools are separate.");
    button(a, "Clear this Studio session", () => {
      pushHistory(JSON.stringify(p), "clear");
      p = emptyProject();
      active = "master";
      application = "";
      editId = "";
      d.close();
      render();
      updateSavedState();
      if (enabled && !blocked) saveLocal();
    });
  }));
  button(topActions, "Export project", () => {
    const valid = validateProject(p);
    download("career-studio-project.json", valid);
    savedSignature = JSON.stringify(p);
    updateSavedState();
  }, { "data-primary": "true" });
  const topMore=details(topActions,"More");topMore.classList.add("career-more");
  button(topMore, "How to use", guide);
  button(topMore, "Project & recovery", () => {
    recovery.open = true;
    recovery.scrollIntoView({ block: "start" });
  });
  const storageEvent = (e) => {
    if (e.key === draftKey && e.newValue !== lastRaw) {
      blocked = true;
      updateSavedState();
      say("Recovery changed in another tab. Review the saved recovery before replacing it.", true);
    }
  };
  window.addEventListener("storage", storageEvent);
  const pageHide = () => saveLocal();
  window.addEventListener("pagehide", pageHide);
  const owned = api.c.u22OwnedKeys;
  api.c.u22OwnedKeys = () => [.../* @__PURE__ */ new Set([...owned(), draftKey, enabledKey])];
  api.c.u24StorageGroups.push(["careerStudio", "Career Studio opt-in recovery", [draftKey, enabledKey]]);
  const reset = api.c.$("u22ResetConfirm"), oldReset = reset.onclick;
  reset.onclick = function(...args) {
    const scope = api.c.u22ResetScope.value;
    if (scope === "all" && api.c.u22ResetInput.value.trim() !== "RESET") return oldReset.apply(this, args);
    const result = oldReset.apply(this, args);
    if (scope === "cache" || scope === "all") {
      clearTimeout(autosaveTimer);
      enabled = false;
      blocked = false;
      lastRaw = null;
      try {
        localStorage.removeItem(draftKey);
        localStorage.removeItem(enabledKey);
      } catch {
      }
      autosave.checked = false;
      updateSavedState();
    }
    return result;
  };
  root.careerStudio = { snapshot: () => clone(p), get active() {
    return active;
  }, get area() {
    return area;
  } };
  render();
  updateSavedState();
  if (blocked) say("A saved recovery exists. Review it under Project & recovery before enabling new saves.");
  return { dispose() {
    saveLocal();
    disposed = true;
    clearTimeout(previewTimer);
    clearTimeout(autosaveTimer);
    clearInterval(timer);
    window.removeEventListener("storage", storageEvent);
    window.removeEventListener("pagehide", pageHide);
    for (const url of urls) URL.revokeObjectURL(url);
  } };
}
export {
  mount
};
