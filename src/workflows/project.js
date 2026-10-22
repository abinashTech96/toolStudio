const records=new Map(),files=new Map(),listeners=new Set(),secrets=new Map();let revision=0;
const bytes=v=>new TextEncoder().encode(JSON.stringify(v)).length;
export const kinds=['requests','environment','contract','metadata','sources','translations'];
export const projectLimits={records:30,recordBytes:2000000,totalRecordBytes:4000000,files:20,fileBytes:30000000,totalFileBytes:60000000};
const issue=(message,path)=>{const e=new Error(message+(path?' · '+path:''));e.path=path;throw e};
export function validateRecord(kind,value){
 if(!kinds.includes(kind))issue('Unknown project record type');if(bytes(value)>projectLimits.recordBytes)issue('Project record limit: 2 MB');
 if(['requests','metadata','sources'].includes(kind)){
  if(!Array.isArray(value)||value.length>1000)issue(kind+' must be an array with up to 1,000 records');const ids=new Set();
  for(const [i,r]of value.entries()){if(!r||typeof r!=='object'||Array.isArray(r))issue('Use an object',String(i));const id=kind==='metadata'?r.name:r.id;if(typeof id!=='string'||!id.trim()||id.length>200)issue(kind==='requests'?'Requests need id and URL; use a nonempty ID':'Use a nonempty '+(kind==='metadata'?'object name':'ID'),String(i));if(ids.has(id))issue('Duplicate '+kind+' ID: '+id,String(i));ids.add(id);if(kind==='requests'&&(typeof r.url!=='string'||!r.url.trim()||r.url.length>8192))issue('Requests need a URL',String(i));if(kind==='metadata'&&!Array.isArray(r.fields))issue('Metadata needs fields',String(i));if(kind==='sources'&&(typeof r.title!=='string'||!r.title.trim()))issue('Sources need titles',String(i));}
 }else if(!value||typeof value!=='object'||Array.isArray(value))issue(kind+' must be an object');
 if(kind==='contract'&&!/^3\./.test(value.openapi||''))issue('Use an OpenAPI 3 contract');return value;
}
function changed(){revision++;for(const fn of listeners)try{fn(revision)}catch{}if(typeof window!=='undefined')window.dispatchEvent(new Event('studio:project-changed'))}
export function subscribeProject(fn){listeners.add(fn);return()=>listeners.delete(fn)}
export function listRecords(kind){return [...records.values()].filter(r=>!kind||r.kind===kind).map(r=>structuredClone(r))}
export function projectUsage(){return{records:records.size,recordBytes:[...records.values()].reduce((n,r)=>n+bytes(r),0),files:files.size,fileBytes:[...files.values()].reduce((n,f)=>n+f.size,0),limits:{...projectLimits}}}
export function validateRecords(rows){if(!Array.isArray(rows)||rows.length>projectLimits.records)issue('Project limit: 30 records');const ids=new Set();for(const r of rows){if(!r||typeof r.id!=='string'||!r.id||ids.has(r.id))issue('Use unique project record IDs');ids.add(r.id);validateRecord(r.kind,r.value);if(typeof r.name!=='string'||r.name.length>120||!Number.isInteger(r.revision)||r.revision<0)issue('Invalid project record metadata',r.id)}if(rows.reduce((n,r)=>n+bytes(r),0)>projectLimits.totalRecordBytes)issue('Project records limit: 4 MB total');return structuredClone(rows)}
export function putRecord(kind,name,value,{id}={}){validateRecord(kind,value);if(id&&!records.has(id))issue('Record to replace is missing');const next={id:id||'record-'+(globalThis.crypto?.randomUUID?.()||String(revision+1)),kind,name:String(name||kind).slice(0,120),value:structuredClone(value),revision:revision+1,updated:new Date().toISOString()},candidate=[...records.values()].filter(r=>r.id!==id).concat(next);validateRecords(candidate);records.set(next.id,next);changed();return structuredClone(next)}
export function replaceRecords(rows,{expected=revision}={}){if(expected!==revision)issue('Project changed after review. Review again.');const next=validateRecords(rows);records.clear();for(const r of next)records.set(r.id,{...r,revision:revision+1});changed();return listRecords()}
export function deleteRecord(id){if(!records.delete(id))issue('Project record is missing');changed()}
export function projectRevision(){return revision}
export async function fileHash(file){return [...new Uint8Array(await crypto.subtle.digest('SHA-256',await file.arrayBuffer()))].map(n=>n.toString(16).padStart(2,'0')).join('')}
export async function addFile(file){if(!(file instanceof Blob)||file.size>projectLimits.fileBytes)issue('Reusable file limit: 30 MB each');const hash=await fileHash(file);if(files.has(hash))return hash;if(files.size>=projectLimits.files||[...files.values()].reduce((n,f)=>n+f.size,0)+file.size>projectLimits.totalFileBytes)issue('Reusable files limit: 20 files / 60 MB total. Remove a file first.');files.set(hash,file);changed();return hash}
export function projectFiles(){return [...files].map(([id,f])=>({id,name:f.name,size:f.size,type:f.type}))}
export function getFile(id){if(!files.has(id))issue('Reusable file no longer available');return files.get(id)}
export function deleteFile(id){if(files.delete(id))changed()}
export function setSecret(name,value){name=String(name).trim();if(!name||name.length>200||String(value).length>10000||secrets.size>=100&&!secrets.has(name))issue('Use up to 100 named secret variables');secrets.set(name,String(value))}
export function secretNames(){return [...secrets.keys()]}
export function secretEnvironment(){return Object.fromEntries(secrets)}
export function deleteSecret(name){secrets.delete(name)}
export function clearProject(){records.clear();files.clear();secrets.clear();changed()}
export function recordDifferences(local,incoming){const ids=new Set([...local,...incoming].map(r=>r.id));return [...ids].map(id=>{const a=local.find(r=>r.id===id),b=incoming.find(r=>r.id===id);return{id,name:b?.name||a?.name,kind:b?.kind||a?.kind,state:!a?'incoming only':!b?'this tab only':JSON.stringify(a.value)===JSON.stringify(b.value)&&a.name===b.name?'same':'conflict',local:a?structuredClone(a):null,incoming:b?structuredClone(b):null}})}
export async function validateFiles(rows){if(!Array.isArray(rows)||rows.length>projectLimits.files||rows.reduce((n,r)=>n+(r.file?.size||0),0)>projectLimits.totalFileBytes)issue('Reusable files exceed project capacity');const ids=new Set();for(const row of rows){if(!(row.file instanceof Blob)||row.file.size>projectLimits.fileBytes||ids.has(row.id)||await fileHash(row.file)!==row.id)issue('Reusable file checksum or capacity mismatch');ids.add(row.id)}return rows}
export async function restoreProject(snapshot,{expected=revision}={}){const next=validateRecords(snapshot.records),nextFiles=await validateFiles(snapshot.files||[]);if(expected!==revision)issue('Project changed while preparing restore. Review again.');records.clear();files.clear();for(const r of next)records.set(r.id,{...r,revision:revision+1});for(const f of nextFiles)files.set(f.id,f.file);changed()}
export function projectSnapshot(){return{version:1,records:listRecords(),files:projectFiles().map(f=>({id:f.id,file:getFile(f.id)}))}}
