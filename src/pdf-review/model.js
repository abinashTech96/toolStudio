// Review records contain references and decisions, never original PDF bytes.
const object = v => v && typeof v === 'object' && !Array.isArray(v);
const text = (v, max, label) => { if (typeof v !== 'string' || v.length > max) throw Error('Invalid '+label); return v; };
const integer = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;
export const decisions = ['not-reviewed', 'needs-changes', 'approved'];
export async function digest(bytes) { return [...new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))].map(x=>x.toString(16).padStart(2,'0')).join(''); }
export function validateReference(v) {
  if (!object(v) || !/^[a-f0-9]{64}$/.test(v.sha256) || !integer(v.pages,1,1000) || !integer(v.size,1,30*1048576)) throw Error('Invalid PDF reference');
  text(v.name,500,'document name'); return v;
}
export function validateSession(value) {
  if (!object(value) || value.format !== 'toolstudio-pdf-review' || value.version !== 1 || JSON.stringify(value).length > 500000) throw Error('Invalid PDF review session (limit 500 KB)');
  validateReference(value.document); text(value.id,100,'session ID'); text(value.title,200,'session title');
  for (const key of ['comments','stamps','changes']) if (!Array.isArray(value[key]) || value[key].length > 1000) throw Error('Invalid review '+key);
  if (!Array.isArray(value.pages) || value.pages.length !== value.document.pages || value.pages.some(x=>!decisions.includes(x))) throw Error('Invalid page decisions');
  const ids=new Set();
  for (const item of [...value.comments,...value.stamps]) {
    text(item.id,100,'annotation ID'); if(ids.has(item.id)) throw Error('Duplicate annotation ID'); ids.add(item.id);
    if (!integer(item.page,1,value.document.pages) || !Array.isArray(item.rect) || item.rect.length!==4 || item.rect.some(x=>!Number.isFinite(x)||Math.abs(x)>200000) || item.rect[2]<=item.rect[0] || item.rect[3]<=item.rect[1]) throw Error('Invalid annotation coordinates');
    if (!/^[a-f0-9]{64}$/.test(item.source) || typeof item.needsReview!=='boolean') throw Error('Invalid annotation source');
    for(const anchor of [item.originalAnchor,item.previousAnchor].filter(v=>v!==undefined))if(!anchor||!integer(anchor.page,1,10000)||!/^[a-f0-9]{64}$/.test(anchor.source)||!Array.isArray(anchor.rect)||anchor.rect.length!==4||anchor.rect.some(n=>!Number.isFinite(n)||Math.abs(n)>200000)||anchor.rect[2]<=anchor.rect[0]||anchor.rect[3]<=anchor.rect[1])throw Error('Invalid original annotation anchor');
    text(item.text,4000,'annotation text');
  }
  for (const c of value.comments) { text(c.quote,4000,'selected text'); if(typeof c.resolved!=='boolean') throw Error('Invalid comment status'); }
  for (const s of value.stamps) if(!integer(s.size,8,72)) throw Error('Stamp size must be 8–72 points');
  for(const c of value.changes) if(!integer(c.page,1,1000)||!['added','removed','changed','unchanged'].includes(c.status)||typeof c.resolved!=='boolean') throw Error('Invalid version change');
  if(value.comparison) { validateReference(value.comparison.original);validateReference(value.comparison.revised); }
  return structuredClone(value);
}
export function validateReviews(value) {
  if(!object(value)||!Array.isArray(value.sessions)||value.sessions.length>10) throw Error('Save up to 10 PDF reviews');
  const ids=new Set();for(const s of value.sessions){validateSession(s);if(ids.has(s.id))throw Error('Duplicate review session');ids.add(s.id)}return structuredClone(value);
}
export function createSession(reference) {
  validateReference(reference);return {format:'toolstudio-pdf-review',version:1,id:crypto.randomUUID(),title:reference.name,document:structuredClone(reference),pages:Array(reference.pages).fill('not-reviewed'),comments:[],stamps:[],changes:[]};
}
export function sourceStatus(session, reference) { return !reference ? 'missing' : session.document.sha256 === reference.sha256 ? 'matched' : 'replaced'; }
export function remapSession(session, reference, mappings) {
  validateSession(session); validateReference(reference);
  const next=structuredClone(session), annotations=[...next.comments,...next.stamps];
  if(!Array.isArray(mappings)||mappings.length!==annotations.length) throw Error('Review every annotation mapping');
  for(const item of annotations) {
    const map=mappings.find(m=>m.id===item.id);
    if(!map||!integer(map.page,1,reference.pages)||map.reviewed!==true) throw Error('Approve a valid target page for every annotation');
    item.originalAnchor ||= {page:item.page,source:item.source,rect:item.rect.slice()};item.previousAnchor={page:item.page,source:item.source,rect:item.rect.slice()};item.page=map.page;item.source=reference.sha256;item.needsReview=true;
  }
  next.document=structuredClone(reference);next.pages=Array(reference.pages).fill('not-reviewed');next.changes=[];delete next.comparison;
  return validateSession(next);
}
export function rectangle(points) { const [a,b]=points;return [Math.min(a[0],b[0]),Math.min(a[1],b[1]),Math.max(a[0],b[0]),Math.max(a[1],b[1])]; }
export function counts(session) { return Object.fromEntries(decisions.map(d=>[d,session.pages.filter(x=>x===d).length])); }
export function exportable(session, reference) {
  validateSession(session);if(sourceStatus(session,reference)!=='matched') throw Error('Relink the exact source PDF or review replacement mapping first');
  if([...session.comments,...session.stamps].some(x=>x.needsReview||x.source!==reference.sha256))throw Error('Verify all remapped annotations on their target pages before PDF export');
}
