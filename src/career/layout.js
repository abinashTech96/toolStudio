/** Shared geometry for HTML, Word, PDF and the live editor. Old v2 settings remain valid. */
export const alignments = ['start', 'left', 'center', 'right', 'justify'];
export function layoutSettings(s) {
  const l = s.layout || {};
  return {body:'start', name:'start', contact:'start', headings:'start', dates:'start',
    paragraphGap:s.size * .25, bulletIndent:s.size, sections:{}, ...l,
    margins:{top:s.margin, right:s.margin, bottom:s.margin, left:s.margin, ...l.margins}};
}
export function blockLayout(b, s) {
  const l = layoutSettings(s), section = l.sections[b.section] || {}, v = {...l, ...section};
  let align = b.kind === 'name' ? l.name : b.kind === 'headline' || b.section === 'contact' ? l.contact :
    b.kind === 'heading' || b.kind === 'subheading' ? v.headings : b.kind === 'date' ? v.dates : v.body;
  if (align === 'start') align = s.direction === 'rtl' ? 'right' : 'left';
  return {align, paragraphGap:v.paragraphGap, bulletIndent:v.bulletIndent};
}
export function validateLayout(l) {
  const object = x => x && typeof x === 'object' && !Array.isArray(x);
  const finite = (v, min, max) => typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max;
  if (!object(l)) throw Error('Invalid document layout');
  const check = (x, section = false) => {
    if (!object(x)) throw Error('Invalid section layout');
    for (const [k,v] of Object.entries(x)) {
      if (['body','name','contact','headings','dates'].includes(k)) {
        if (section && ['name','contact'].includes(k) || !alignments.includes(v) || k !== 'body' && v === 'justify') throw Error('Invalid '+k+' alignment');
      } else if (k === 'paragraphGap') {if (!finite(v,0,24)) throw Error('Paragraph spacing must be 0–24 pt');}
      else if (k === 'bulletIndent') {if (!finite(v,0,48)) throw Error('Bullet indentation must be 0–48 pt');}
      else if (!section && ['margins','sections'].includes(k)) continue;
      else throw Error('Unknown layout setting: '+k);
    }
  };
  check(l);
  if (l.margins !== undefined) {
    if (!object(l.margins)) throw Error('Invalid page margins');
    for (const [k,v] of Object.entries(l.margins)) if (!['top','right','bottom','left'].includes(k) || !finite(v,10,40)) throw Error('Individual margins must be 10–40 mm');
  }
  if (l.sections !== undefined) {
    if (!object(l.sections)) throw Error('Invalid section layouts');
    const sections = ['summary','experience','education','skills','projects','credentials','awards','publications','volunteering','leadership','custom'];
    for (const [k,v] of Object.entries(l.sections)) {if (!sections.includes(k)) throw Error('Unknown layout section');check(v,true);}
  }
  return l;
}
