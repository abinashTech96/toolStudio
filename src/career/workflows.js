import {clone, profile, uid, quality} from './model.js';

export function splitImportText(text) {
  if (!text.trim()) throw Error('Paste or extract resume text first');
  if (text.length > 250000) throw Error('Resume text exceeds 250,000 characters; keep the source file and import smaller sections');
  const parts=[];
  for (let at=0; at<text.length;) {
    let end=Math.min(at+12000,text.length);
    if (end<text.length) {const line=text.lastIndexOf('\n',end-1);if(line>at+6000) end=line+1;}
    if(end<text.length&&/[\uD800-\uDBFF]/.test(text[end-1])&&/[\uDC00-\uDFFF]/.test(text[end]))end--;
    parts.push({id:uid(),text:text.slice(at,end),destination:'experience'});at=end;
  }
  return parts;
}
export function assembleImport(parts, contact={}) {
  const doc={...profile(),...clone(contact),experience:[],education:[],projects:[],credentials:[]};
  for (const part of parts) {
    if (!part.text.trim()) continue;
    if (part.text.length>12000) throw Error('Each reviewed part must be at most 12,000 characters');
    if (['summary','skills','custom'].includes(part.destination)) {
      doc[part.destination]+=(doc[part.destination]?'\n':'')+part.text;
      if(doc[part.destination].length>12000) throw Error('Combined '+part.destination+' exceeds 12,000 characters; assign parts to separate experience or education entries');
    } else if (part.destination==='experience') doc.experience.push({id:uid(),role:'',company:'',start:'',end:'',current:false,dates:'',bullets:part.text});
    else if (part.destination==='education') doc.education.push({id:uid(),degree:'',school:'',dates:'',details:part.text});
    else throw Error('Choose a destination for every imported part');
  }
  return doc;
}
export function importFindings(text,doc) {
  const findings=quality(doc).map(x=>x.message), seen=new Set(), repeated=new Set();
  for (const line of text.split(/\r?\n/).map(s=>s.trim()).filter(Boolean)) {if(seen.has(line)) repeated.add(line);seen.add(line);}
  if(repeated.size) findings.push(repeated.size+' repeated source lines; review them before deleting anything.');
  if(doc.custom) findings.push('Additional information contains unstructured text. Review roles, dates and education manually.');
  return findings;
}
/** Observable preparation steps. This is not a hiring-readiness score. */
export function applicationChecklist(p,a,asOf) {
  const resume=a.resumeId==='master'?{doc:p.profile}:p.resumes.find(r=>r.id===a.resumeId),doc=resume?.doc;
  const supported=a.requirements.filter(r=>r.status==='Supported'&&(r.evidenceId||r.notes.trim())).length;
  return [
    {id:'details',label:'Company and role entered',done:!!a.company.trim()&&!!a.role.trim(),target:'tracker'},
    {id:'requirements',label:'Review job requirements and supporting evidence',done:a.requirements.length>0&&supported===a.requirements.length,detail:supported+' / '+a.requirements.length+' requirements supported',target:'requirements'},
    {id:'resume',label:'Review the selected resume',done:!!doc&&quality(doc).length===0,detail:doc?quality(doc).length+' completeness findings':'No resume selected',target:'resume'},
    {id:'documents',label:'Prepare an application document',done:p.documents.some(d=>d.applicationId===a.id&&d.body.trim()),target:'documents'},
    {id:'submission',label:'Retain the exact submitted resume',done:!!a.submitted,target:'tracker'},
    {id:'followup',label:'Set a follow-up or finish the application',done:['Closed','Accepted'].includes(a.status)||!!a.followUp,detail:a.followUp&&a.followUp<asOf&&!['Closed','Accepted'].includes(a.status)?'Follow-up date has passed':'',target:'tracker'},
    {id:'interview',label:'Add interview notes or a scheduled round',done:!!a.interviewDate||a.rounds.some(r=>r.date||r.notes.trim()),target:'interview'}
  ];
}
