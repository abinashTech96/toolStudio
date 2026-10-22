import {hasRTL,visualRuns,shapedWidth,drawShapedLine} from './rtl.js';
import {textLinks} from './links.js';
import {readPDFText} from '../advanced/assets.js';
import {layoutSettings, blockLayout} from "./layout.js";
import { zipSync, unzipSync, strToU8, strFromU8 } from "fflate";
import { lines, sections, sectionNames, safeURL, profile } from "./model.js";
const escape = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
function documentBlocks(doc, s) {
  const out = [], add = (text, kind = "paragraph", section = "contact") => {
    if (String(text || "").trim()) out.push({ text: String(text), kind, section });
  };
  if (!s.hiddenFields.includes("name")) add(doc.name, "name");
  add(doc.headline, "headline");
  add(["email", "phone", "location"].filter((k) => !s.hiddenFields.includes(k)).map((k) => doc[k]).filter(Boolean).join(" \xB7 "), "contact");
  if (!s.hiddenFields.includes("links")) for (const l of lines(doc.links)) add(l, "contact");
  for (const k of s.order) {
    if (s.hidden.includes(k)) continue;
    const value = doc[k];
    if (!value || (Array.isArray(value) ? !value.length : !value.trim())) continue;
    if (s.breaks.includes(k)) out.push({ text: "", kind: "break", section: k });
    add(s.labels?.[k] || sectionNames[k], "heading", k);
    if (typeof value === "string") {
      for (const l of lines(value)) add(l, "paragraph", k);
      continue;
    }
    for (const r of value) {
      if (k === "experience") {
        add([r.role, s.hiddenFields.includes("company") ? "" : r.company].filter(Boolean).join(" \xB7 "), "subheading", k);
        add(r.start ? [r.start, r.current ? s.labels?.present || "Present" : r.end].filter(Boolean).join(" \u2013 ") : r.dates, "date", k);
        for (const l of lines(r.bullets)) add(l, "bullet", k);
      } else if (k === "education") {
        add([r.degree, r.school].filter(Boolean).join(" \xB7 "), "subheading", k);
        add(r.dates, "date", k);
        add(r.details, "paragraph", k);
      } else if (k === "projects") {
        add([r.title, r.role].filter(Boolean).join(" \xB7 "), "subheading", k);
        for (const [key, label] of [["problem", "Problem"], ["contribution", "Contribution"], ["outcome", "Outcome"], ["skills", "Technologies"]]) if (r[key]) add((s.labels?.[key === "skills" ? "projectSkills" : key] || label) + ": " + r[key], "paragraph", k);
        if (r.link) add(r.link, "contact", k);
      } else if (k === "credentials") {
        add([r.title, r.issuer].filter(Boolean).join(" \xB7 "), "subheading", k);
        add([r.date, r.expiry ? "Expires " + r.expiry : ""].filter(Boolean).join(" \xB7 "), "date", k);
        add(r.link, "contact", k);
      }
    }
  }
  return out;
}
function resumeText(doc, s) {
  return documentBlocks(doc, s).map((b) => (b.kind === "bullet" ? "\u2022 " : "") + b.text).join("\n");
}
function documentHTML(doc, s) {
  const blocks = documentBlocks(doc, s), body = blocks.map((b) => {
    if (b.kind === "break") return '<div class="page-break"></div>';
    const tag = { name: "h1", headline: "p", heading: "h2", subheading: "h3", bullet: "p" }[b.kind] || "p";
    const url = b.kind === "contact" ? safeURL(b.text.split("|").at(-1).trim()) : null;
    const text = url ? '<a href="' + escape(url) + '">' + escape(b.text) + "</a>" : escape((b.kind === "bullet" ? "\u2022 " : "") + b.text);
    const l=blockLayout(b,s), style='text-align:'+l.align+';margin-bottom:'+l.paragraphGap+'pt;'+(b.kind==='bullet'?'padding-inline-start:'+l.bulletIndent+'pt;text-indent:0;':'');
    return "<" + tag + ' class="' + b.kind + '" data-section="' + b.section + '" style="'+style+'">' + text + "</" + tag + ">";
  }).join("");
  return '<!doctype html><html lang="' + escape(s.language) + '" dir="' + s.direction + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>' + escape(s.hiddenFields.includes("name") ? "Anonymous resume" : doc.name || "Resume") + "</title><style>" + documentCSS(s) + "</style></head><body><main>" + body + "</main></body></html>";
}
function documentCSS(s) {
  const margins=layoutSettings(s).margins, padding=[margins.top,margins.right,margins.bottom,margins.left].map(v=>v+"mm").join(" ");
  const accent = { Minimal: "#24332f", Technical: "#16405d", Graduate: "#3b365b", Management: "#243d32", Academic: "#242424" }[s.template];
  return `@page{size:${s.page};margin:${padding}}*{box-sizing:border-box}body{margin:0;color:#202b29;background:#fff;font:${s.size}pt/${s.spacing} ${s.font === "Serif" ? "Georgia,serif" : "Arial,system-ui,sans-serif"};overflow-wrap:anywhere}main{max-width:100%;margin:auto}h1{font-size:2em;line-height:1.15;margin:0 0 .3em;color:${accent}}h2{font-size:1.13em;margin:1em 0 .45em;color:${accent};border-bottom:1px solid #cad2cf;padding-bottom:.18em;break-after:avoid}h3{font-size:1em;margin:.7em 0 .2em;break-after:avoid}p{margin:.25em 0;white-space:pre-wrap;orphans:2;widows:2}.headline{font-size:1.15em}.contact,.date{font-size:.92em;color:#44534d}.bullet{padding-inline-start:1em;text-indent:-1em}.page-break{break-before:page}a{color:inherit;text-decoration:underline}@media screen{body{padding:${padding};max-width:${s.page === "A4" ? 210 : 216}mm;margin:auto}h2{letter-spacing:${s.template === "Technical" ? ".04em" : "normal"}}`;
}
function layoutBlocks(blocks, s, measure) {
  const width=s.page==='A4'?595.28:612,height=s.page==='A4'?841.89:792;
  const m=layoutSettings(s).margins, margins=Object.fromEntries(Object.entries(m).map(([k,v])=>[k,v*72/25.4])), available=width-margins.left-margins.right,pages=[[]];
  let y=height-margins.top;
  const next=()=>{if(pages.at(-1).length)pages.push([]);y=height-margins.top;if(pages.length>80)throw Error('Resume exceeds 80 pages')};
  function wrap(text,size,max) {
    const result=[];
    for(const paragraph of String(text).split('\n')) {
      let line='';
      for(const word of paragraph.split(/\s+/)) {
        if(!word)continue;
        if(measure(word,size)>max) {
          if(line){result.push({text:line,last:false});line='';}
          let part='';for(const c of word){if(part&&measure(part+c,size)>max){result.push({text:part,last:false});part='';}part+=c;}line=part;
        } else if(line&&measure(line+' '+word,size)>max){result.push({text:line,last:false});line=word;}
        else line+=(line?' ':'')+word;
      }
      if(line) result.push({text:line,last:true});else if(result.length) result.at(-1).last=true;
    }
    return result.length?result:[{text:'',last:true}];
  }
  for(const b of blocks) {
    if(b.kind==='break'){next();continue;}
    const l=blockLayout(b,s),size=s.size*({name:2,headline:1.15,heading:1.13,date:.92,contact:.92}[b.kind]||1),leading=size*s.spacing;
    const gap=b.kind==='heading'?s.size*.8:l.paragraphGap,indent=b.kind==='bullet'?l.bulletIndent:0,max=available-indent;
    const rows=wrap((b.kind==='bullet'?'• ':'')+b.text,size,max);
    if(y-gap-leading*(['heading','subheading'].includes(b.kind)?Math.min(rows.length+2,4):1)<margins.bottom)next();
    y-=gap;
    for(const row of rows) {
      if(y-leading<margins.bottom)next();y-=leading;
      const measured=measure(row.text,size),base=margins.left+indent;
      let x=base+(l.align==='center'?(max-measured)/2:l.align==='right'?max-measured:0),runs;
      if(l.align==='justify'&&!row.last&&row.text.includes(' ')) {
        const words=s.direction==='rtl'?visualRuns(row.text,'rtl').flatMap(run=>run.level%2?run.text.split(' ').reverse():run.text.split(' ')).filter(Boolean):row.text.split(' '),total=words.reduce((n,w)=>n+measure(w,size),0),space=(max-total)/(words.length-1);let at=base;
        runs=words.map(word=>{const run={text:word,x:at};at+=measure(word,size)+space;return run;});
      }
      pages.at(-1).push({...b,text:row.text,x,y,size,...(runs?{runs}:{})});
    }
  }
  return {width,height,margin:margins.left,margins,pages:pages.filter(p=>p.length)};
}
const xml = (s) => escape(String(s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g, "")).replace(/&#39;/g, "&apos;");
function docxBytes(doc,s){
 const ns='http://schemas.openxmlformats.org/wordprocessingml/2006/main',rel='http://schemas.openxmlformats.org/package/2006/relationships',relationships=[];
 const body=documentBlocks(doc,s).map(b=>{if(b.kind==='break')return'<w:p><w:r><w:br w:type="page"/></w:r></w:p>';const l=blockLayout(b,s),align=l.align==='justify'?'both':l.align,heading=['name','heading','subheading'].includes(b.kind),size=Math.round(s.size*2*({name:2,headline:1.15,heading:1.13,date:.92,contact:.92}[b.kind]||1));const properties=(heading?'<w:b/>':'')+'<w:rFonts w:ascii="'+(s.font==='Serif'?'Georgia':'Arial')+'" w:hAnsi="'+(s.font==='Serif'?'Georgia':'Arial')+'"/><w:sz w:val="'+size+'"/><w:szCs w:val="'+size+'"/><w:lang w:val="'+xml(s.language)+'"/>'+(s.direction==='rtl'?'<w:rtl/>':'');
 const runs=textLinks((b.kind==='bullet'?'• ':'')+b.text).map(segment=>{const run='<w:r><w:rPr>'+properties+(segment.url?'<w:u w:val="single"/>':'')+'</w:rPr><w:t xml:space="preserve">'+xml(segment.text)+'</w:t></w:r>';if(!segment.url)return run;const id='link'+(relationships.length+1);relationships.push({id,url:segment.url});return'<w:hyperlink r:id="'+id+'">'+run+'</w:hyperlink>'}).join('');return'<w:p><w:pPr><w:jc w:val="'+align+'"/>'+(b.kind==='bullet'?'<w:ind w:'+ (s.direction==='rtl'?'right':'left')+'="'+Math.round(l.bulletIndent*20)+'"/>':'')+(heading?'<w:keepNext/><w:keepLines/>':'')+(s.direction==='rtl'?'<w:bidi/>':'')+'<w:spacing w:after="'+Math.round(l.paragraphGap*20)+'" w:line="'+Math.round(s.spacing*240)+'" w:lineRule="auto"/>'+(b.kind==='heading'?'<w:outlineLvl w:val="0"/>':'')+'</w:pPr>'+runs+'</w:p>'}).join('');
 const margins=Object.fromEntries(Object.entries(layoutSettings(s).margins).map(([k,v])=>[k,Math.round(v*1440/25.4)])),width=s.page==='A4'?11906:12240,height=s.page==='A4'?16838:15840;
 return zipSync({'[Content_Types].xml':strToU8('<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>'),'_rels/.rels':strToU8('<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="'+rel+'"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'),'word/_rels/document.xml.rels':strToU8('<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="'+rel+'">'+relationships.map(r=>'<Relationship Id="'+r.id+'" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="'+xml(r.url)+'" TargetMode="External"/>').join('')+'</Relationships>'),'word/document.xml':strToU8('<?xml version="1.0" encoding="UTF-8"?><w:document xmlns:w="'+ns+'" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>'+body+'<w:sectPr><w:pgSz w:w="'+width+'" w:h="'+height+'"/><w:pgMar w:top="'+margins.top+'" w:right="'+margins.right+'" w:bottom="'+margins.bottom+'" w:left="'+margins.left+'"/></w:sectPr></w:body></w:document>')},{level:6});
}
function extractDocx(bytes) {
  let size = 0;
  const files = unzipSync(bytes, { filter: (f) => {
    if (f.originalSize > 4e6) throw Error("DOCX part exceeds 4 MB");
    size += f.originalSize;
    if (size > 12e6) throw Error("DOCX expansion exceeds 12 MB");
    return /^word\/(document|header\d+|footer\d+)\.xml$/.test(f.name);
  } });
  if (!files["word/document.xml"]) throw Error("No Word document text found");
  return Object.entries(files).sort(([a], [b]) => a === "word/document.xml" ? -1 : b === "word/document.xml" ? 1 : a.localeCompare(b)).map(([, b]) => {
    const source = strFromU8(b);
    if (/<!DOCTYPE|<!ENTITY/i.test(source)) throw Error("Unsupported XML declarations");
    const dom = new DOMParser().parseFromString(source, "application/xml");
    if (dom.querySelector("parsererror")) throw Error("Invalid Word XML");
    return [...dom.getElementsByTagNameNS("*", "p")].map((p) => [...p.getElementsByTagNameNS("*", "t")].map((t) => t.textContent).join("")).join("\n");
  }).join("\n");
}
async function extractResume(file, api, {signal,readingOrder='source'}={}) {
  if (!file || file.size > 1e7) throw Error("Choose a resume up to 10 MB");
  if(signal?.aborted)throw new DOMException('Cancelled','AbortError');
  const bytes = new Uint8Array(await file.arrayBuffer()), ext = file.name.split(".").at(-1).toLowerCase();
  if (ext === "docx") return extractDocx(bytes);
  if (ext === "pdf") {
    const engine = await api.pdf(), task = engine.getDocument({ data: bytes, isEvalSupported: false });
    const abort=()=>void task.destroy();signal?.addEventListener('abort',abort,{once:true});let pdf;
    try {
      if(signal?.aborted)throw new DOMException('Cancelled','AbortError');pdf = await task.promise;
      if (pdf.numPages > 50) throw Error("Import at most 50 PDF pages");
      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        if(signal?.aborted)throw new DOMException('Cancelled','AbortError');const p = await pdf.getPage(i), content = await readPDFText(p);
        if(readingOrder!=='source'){const middle=p.getViewport({scale:1}).width/2,compare=(a,b)=>Math.abs(a.transform[5]-b.transform[5])>3?b.transform[5]-a.transform[5]:a.transform[4]-b.transform[4];content.items=readingOrder==='columns'?[...content.items.filter(v=>v.transform[4]<middle).sort(compare),...content.items.filter(v=>v.transform[4]>=middle).sort(compare)]:content.items.slice().sort(compare)}
        let previousY = null;
        for (const item of content.items) {
          const y = item.transform?.[5];
          if (previousY !== null && Math.abs(y - previousY) > 3) text += "\n";
          text += item.str + (item.hasEOL ? "\n" : " ");
          previousY = y;
        }
        text += "\n";
        if (text.length > 25e4) throw Error("Extracted text exceeds 250,000 characters");
      }
      if (!text.trim()) throw Error("No selectable text found. Use Camera & Image Studio OCR for a scanned document, then paste and review its text.");
      return text;
    } finally {
      signal?.removeEventListener('abort',abort);await task.destroy();
    }
  }
  if (["txt", "md"].includes(ext)) return new TextDecoder().decode(bytes);
  throw Error("Use PDF, DOCX or TXT; use Project & recovery for JSON projects");
}
function suggestImport(text) {
  if (text.length > 25e4) throw Error("Resume text exceeds 250,000 characters");
  const p = profile(), all = lines(text), email = text.match(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i), phone = text.match(/(?:\+\d[\d ()-]{7,}\d)/);
  p.name = all[0] || "";
  p.email = email?.[0] || "";
  p.phone = phone?.[0] || "";
  p.links = [...new Set(text.match(/https?:\/\/[^\s<>]+/g) || [])].join("\n");
  const known = { summary: /^(professional summary|summary|profile|objective)\s*:?$/i, skills: /^(technical skills|skills|competencies)\s*:?$/i, custom: /^(experience|work experience|education|projects|certifications|awards|employment history)\s*:?$/i };
  let current = "custom";
  const buckets = { summary: [], skills: [], custom: [] };
  for (const l of all.slice(1)) {
    const heading = Object.entries(known).find(([, re]) => re.test(l));
    if (heading) {
      current = heading[0];
      if (current === "custom") buckets[current].push(l);
      continue;
    }
    buckets[current].push(l);
  }
  for (const k of Object.keys(buckets)) {
    const value = buckets[k].join("\n");
    if (value.length > 12e3) throw Error("Imported " + k + " exceeds 12,000 characters. Split or shorten the extracted text before reviewing the mapping; no project data was changed.");
    p[k] = value;
  }
  return p;
}
function createPDFExporter(api) {
  let engine, fontkit;
  const fontBytes = {};
  return async (doc, s) => {

    engine ||= await api.pdfEditor();
    if (!fontkit) {
      const bytes = await api.asset("careerFontkit"), url = URL.createObjectURL(new Blob([bytes], { type: "text/javascript" }));
      try {
        fontkit = (await import(url)).default;
      } finally {
        URL.revokeObjectURL(url);
      }
    }
    const fontName = s.font === "Serif" && s.direction!=="rtl" ? "careerSerif" : "careerFont";
    fontBytes[fontName] ||= await api.asset(fontName);
    const pdf = await engine.PDFDocument.create();
    pdf.registerFontkit(fontkit);
    const selectedBytes=api.careerFontOverride||fontBytes[fontName],raw=fontkit.create(selectedBytes),font = await pdf.embedFont(selectedBytes, { subset: true }), supported = new Set(font.getCharacterSet()), blocks = documentBlocks(doc, s);
    for (const b of blocks) for (const c of b.text) if (c !== "\n" && c !== "\r" && !supported.has(c.codePointAt(0))) throw Error("Direct PDF font does not cover \u201C" + c + "\u201D. Use Print / Save as PDF or Word/HTML for this script.");
    const measure=(t,n)=>s.direction==='rtl'||hasRTL(t)?shapedWidth(raw,t,n,s.direction):font.widthOfTextAtSize(t,n);const layout = layoutBlocks(blocks, s, measure);
    if (!layout.pages.length) throw Error("Add resume content before exporting");
    for (const rows of layout.pages) {
      const page = pdf.addPage([layout.width, layout.height]);
      for(const r of rows)for(const run of r.runs||[{text:r.text,x:r.x}]){if(s.direction==='rtl'||hasRTL(run.text))drawShapedLine(engine,pdf,page,font,raw,run.text,{x:run.x,y:r.y,size:r.size,direction:s.direction});else page.drawText(run.text,{x:run.x,y:r.y,size:r.size,font});for(const link of textLinks(run.text).filter(v=>v.url)){const prefix=run.text.slice(0,run.text.indexOf(link.text)),left=s.direction==='rtl'||hasRTL(run.text)?run.x:run.x+measure(prefix,r.size),width=s.direction==='rtl'||hasRTL(run.text)?measure(run.text,r.size):measure(link.text,r.size),annotation=pdf.context.obj({Type:'Annot',Subtype:'Link',Rect:[left,r.y-r.size*.2,left+width,r.y+r.size],Border:[0,0,0],A:{Type:'Action',S:'URI',URI:engine.PDFString.of(link.url)}});page.node.addAnnot(pdf.context.register(annotation))}}

    }
    pdf.setTitle((s.hiddenFields.includes("name") ? "Anonymous" : doc.name || "Professional") + " \u2014 Resume");
    pdf.setCreator("Tool Studio Career Studio");
    return { bytes: await pdf.save(), pages: layout.pages.length };
  };
}
function bundle(files) {
  return zipSync(Object.fromEntries(Object.entries(files).map(([k, v]) => [k, typeof v === "string" ? strToU8(v) : v])), { level: 6 });
}
export {
  bundle,
  createPDFExporter,
  documentBlocks,
  documentCSS,
  documentHTML,
  docxBytes,
  escape,
  extractDocx,
  extractResume,
  layoutBlocks,
  resumeText,
  suggestImport
};
