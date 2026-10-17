// shared/tool-components · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
export const id="shared/tool-components";
export function register(__studio33){
__studio33.v12Safe = __studio33.$fn((function v12Safe(id,fn){return __studio33.$fn(async function(...args){try{return await fn.apply(this,args)}catch(e){__studio33.csStatus(id,e.message,true);__studio33.v12ErrorTarget(id,e.message)}},"async function(...args){try{return await fn.apply(this,args)}catch(e){csStatus(id,e.message,true);v12ErrorTarget(id,e.message)}}","")}),"function v12Safe(id,fn){return async function(...args){try{return await fn.apply(this,args)}catch(e){csStatus(id,e.message,true);v12ErrorTarget(id,e.message)}}}","v12Safe");

__studio33.v12ErrorTarget = __studio33.$fn((function v12ErrorTarget(id,message){const host=__studio33.$(id+'Status');if(!host)return;host.querySelectorAll('button').forEach(x=>x.remove());const input=__studio33.$(id).querySelector('textarea:not([readonly])');if(!input)return;const m=message.match(/(?:position|character)\s+(\d+)/i)||message.match(/line\s+(\d+)/i);const b=__studio33.csButton(m?'Go to error':'Review input',()=>{input.focus();let p=m?Number(m[1])-1:0;if(m&&/line/i.test(m[0]))p=input.value.split('\n').slice(0,p).join('\n').length+1;input.setSelectionRange(Math.max(0,p),Math.max(0,p)+1);input.scrollIntoView({block:'center'})});b.classList.add('v12-error-link');host.append(' ',b)}),"function v12ErrorTarget(id,message){const host=$(id+'Status');if(!host)return;host.querySelectorAll('button').forEach(x=>x.remove());const input=$(id).querySelector('textarea:not([readonly])');if(!input)return;const m=message.match(/(?:position|character)\\s+(\\d+)/i)||message.match(/line\\s+(\\d+)/i);const b=csButton(m?'Go to error':'Review input',()=>{input.focus();let p=m?Number(m[1])-1:0;if(m&&/line/i.test(m[0]))p=input.value.split('\\n').slice(0,p).join('\\n').length+1;input.setSelectionRange(Math.max(0,p),Math.max(0,p)+1);input.scrollIntoView({block:'center'})});b.classList.add('v12-error-link');host.append(' ',b)}","v12ErrorTarget");

__studio33.v12CSV = (function v12CSV(rows,protect=true,delimiter=','){return rows.map(row=>row.map(v=>{let t=String(v??'');if(protect&&/^[\s\uFEFF]*[=+\-@]/u.test(t))t="'"+t;return t.includes(delimiter)||/["\r\n]/.test(t)?'"'+t.replace(/"/g,'""')+'"':t}).join(delimiter)).join('\r\n')+'\r\n'});

__studio33.v12Fields = (function v12Fields(html,parent){const div=document.createElement('div');div.className='fields v12-extra-task';div.innerHTML=html;parent.append(div);return div});

__studio33.v12Date = (function v12Date(s){return typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&Number.isFinite(Date.parse(s+'T12:00:00Z'))&&new Date(s+'T12:00:00Z').toISOString().slice(0,10)===s});

__studio33.v12Shift = (function v12Shift(s,days){const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+days);return d.toISOString().slice(0,10)});

__studio33.v12TaskFields = __studio33.$fn((function v12TaskFields(existing){return {start:__studio33.$('ktStart').value,milestone:__studio33.$('ktMilestone').checked,recurrence:__studio33.$('ktRecurrence').value,links:__studio33.$('ktLinks').value.split(/\r?\n/).map(s=>s.trim()).filter(Boolean),nextCreated:existing?.nextCreated||false}}),"function v12TaskFields(existing){return {start:$('ktStart').value,milestone:$('ktMilestone').checked,recurrence:$('ktRecurrence').value,links:$('ktLinks').value.split(/\\r?\\n/).map(s=>s.trim()).filter(Boolean),nextCreated:existing?.nextCreated||false}}","v12TaskFields");

__studio33.v12Remember = __studio33.$fn((function v12Remember(e){if(!__studio33.v12Edits.has(e.id))__studio33.v12Edits.set(e.id,{undo:[],redo:[],last:e.value});const h=__studio33.v12Edits.get(e.id);if(h.undo.at(-1)!==e.value){h.undo.push(e.value);h.undo=h.undo.slice(-20)}h.redo=[];h.last=e.value}),"function v12Remember(e){if(!v12Edits.has(e.id))v12Edits.set(e.id,{undo:[],redo:[],last:e.value});const h=v12Edits.get(e.id);if(h.undo.at(-1)!==e.value){h.undo.push(e.value);h.undo=h.undo.slice(-20)}h.redo=[];h.last=e.value}","v12Remember");

__studio33.v12Route = __studio33.$fn((function v12Route(){const params=new URLSearchParams(location.hash.slice(1)),id=params.get('tool');if(id&&Object.hasOwn(__studio33.views,id))__studio33.openTab(id)}),"function v12Route(){const params=new URLSearchParams(location.hash.slice(1)),id=params.get('tool');if(id&&Object.hasOwn(views,id))openTab(id)}","v12Route");

__studio33.u15Box = __studio33.$fn((function u15Box(id,title,parent,open=false){const box=document.createElement('details');box.id=id;box.className='u15-box';box.open=open;box.append(__studio33.csText('summary',title));parent.append(box);return box}),"function u15Box(id,title,parent,open=false){const box=document.createElement('details');box.id=id;box.className='u15-box';box.open=open;box.append(csText('summary',title));parent.append(box);return box}","u15Box");

__studio33.u15Field = __studio33.$fn((function u15Field(parent,id,label,value='',type='text',options){const wrap=__studio33.csText('label','','field'),input=document.createElement(options?'select':type==='textarea'?'textarea':'input');input.id=id;if(options){for(const [val,name]of options)input.append(new Option(name,val))}else if(type!=='textarea')input.type=type;input.value=value;wrap.append(__studio33.csText('span',label),input);parent.append(wrap);return input}),"function u15Field(parent,id,label,value='',type='text',options){const wrap=csText('label','','field'),input=document.createElement(options?'select':type==='textarea'?'textarea':'input');input.id=id;if(options){for(const [val,name]of options)input.append(new Option(name,val))}else if(type!=='textarea')input.type=type;input.value=value;wrap.append(csText('span',label),input);parent.append(wrap);return input}","u15Field");

__studio33.u15Button = __studio33.$fn((function u15Button(parent,id,label,fn){const b=__studio33.csButton(label,__studio33.$fn(async()=>{const currentStatus=parent.querySelector('.u15-status');if(currentStatus)currentStatus.dataset.error='false';try{await fn()}catch(e){const status=parent.querySelector('.u15-status')||parent.closest('.u15-box')?.querySelector('.u15-status');if(status){status.textContent=e.message;status.dataset.error='true'}else __studio33.toast(e.message)}},"async()=>{const currentStatus=parent.querySelector('.u15-status');if(currentStatus)currentStatus.dataset.error='false';try{await fn()}catch(e){const status=parent.querySelector('.u15-status')||parent.closest('.u15-box')?.querySelector('.u15-status');if(status){status.textContent=e.message;status.dataset.error='true'}else toast(e.message)}}",""));b.id=id;parent.append(b);return b}),"function u15Button(parent,id,label,fn){const b=csButton(label,async()=>{const currentStatus=parent.querySelector('.u15-status');if(currentStatus)currentStatus.dataset.error='false';try{await fn()}catch(e){const status=parent.querySelector('.u15-status')||parent.closest('.u15-box')?.querySelector('.u15-status');if(status){status.textContent=e.message;status.dataset.error='true'}else toast(e.message)}});b.id=id;parent.append(b);return b}","u15Button");

__studio33.u15Table = __studio33.$fn((function u15Table(host,headers,rows){const table=document.createElement('table');table.className='u15-table';const head=document.createElement('thead'),tr=document.createElement('tr');for(const h of headers)tr.append(__studio33.csText('th',h));head.append(tr);table.append(head);const body=document.createElement('tbody');for(const r of rows){const row=document.createElement('tr');for(const v of r){const c=document.createElement('td');if(v instanceof Node)c.append(v);else c.textContent=String(v??'');row.append(c)}body.append(row)}table.append(body);const scroll=__studio33.csText('div','','table-scroll');scroll.append(table);host.replaceChildren(scroll);return table}),"function u15Table(host,headers,rows){const table=document.createElement('table');table.className='u15-table';const head=document.createElement('thead'),tr=document.createElement('tr');for(const h of headers)tr.append(csText('th',h));head.append(tr);table.append(head);const body=document.createElement('tbody');for(const r of rows){const row=document.createElement('tr');for(const v of r){const c=document.createElement('td');if(v instanceof Node)c.append(v);else c.textContent=String(v??'');row.append(c)}body.append(row)}table.append(body);const scroll=csText('div','','table-scroll');scroll.append(table);host.replaceChildren(scroll);return table}","u15Table");

__studio33.u15Change = (function u15Change(e,value){e.value=value;e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}))});

__studio33.u15SafeTextJSON = __studio33.$fn((function u15SafeTextJSON(s){return JSON.parse(__studio33.prepareSchemaJSON(s))}),"function u15SafeTextJSON(s){return JSON.parse(prepareSchemaJSON(s))}","u15SafeTextJSON");

__studio33.u15DecimalCompare = __studio33.$fn((function u15DecimalCompare(a,b){const x=__studio33.rcDecimal(String(a)),y=__studio33.rcDecimal(String(b));if(!x||!y)throw Error('Use supported decimal values');const scale=Math.max(x.scale,y.scale),left=x.n*10n**BigInt(scale-x.scale),right=y.n*10n**BigInt(scale-y.scale);return left===right?0:left<right?-1:1}),"function u15DecimalCompare(a,b){const x=rcDecimal(String(a)),y=rcDecimal(String(b));if(!x||!y)throw Error('Use supported decimal values');const scale=Math.max(x.scale,y.scale),left=x.n*10n**BigInt(scale-x.scale),right=y.n*10n**BigInt(scale-y.scale);return left===right?0:left<right?-1:1}","u15DecimalCompare");

__studio33.u15Inputs = __studio33.$fn((function u15Inputs(parent){const d=__studio33.csText('div','','fields');parent.append(d);return d}),"function u15Inputs(parent){const d=csText('div','','fields');parent.append(d);return d}","u15Inputs");

__studio33.u15InvalidateReview = __studio33.$fn((function u15InvalidateReview(id){const ui=__studio33.v13Reviews.get(id);if(ui){ui.summary.textContent='Inputs changed. Run again to refresh the result.';ui.json.disabled=ui.csv.disabled=true}}),"function u15InvalidateReview(id){const ui=v13Reviews.get(id);if(ui){ui.summary.textContent='Inputs changed. Run again to refresh the result.';ui.json.disabled=ui.csv.disabled=true}}","u15InvalidateReview");

__studio33.u15ShellWords = (function u15ShellWords(source){if(source.length>2097152)throw Error('cURL input exceeds 2 MiB');source=source.replace(/\\\r?\n/g,'');const words=[];let word='',quote='',active=false;for(let i=0;i<source.length;i++){const c=source[i];if(quote){if(c===quote){quote='';active=true}else if(c==='\\'&&quote==='"'&&['"','\\','$','`'].includes(source[i+1]))word+=source[++i];else word+=c;continue}if(c==='"'||c==="'"){quote=c;active=true}else if(c==='\\'){if(i+1>=source.length)throw Error('Trailing escape in command');word+=source[++i];active=true}else if(/\s/.test(c)){if(active){words.push(word);word='';active=false}}else if(/[;&|<>`]/.test(c)||c==='$'&&source[i+1]==='(')throw Error('Import one literal cURL command without shell operators');else{word+=c;active=true}}if(quote)throw Error('Unclosed quote in cURL');if(active)words.push(word);return words});

__studio33.u15Leaves = __studio33.$fn((function u15Leaves(root,limit=250){const out=[];function walk(n,path){if(out.length>=limit)return;if(n.type==='object'){for(const[k,v]of n.entries)walk(v,path+'/'+__studio33.jsonPointerSegment(k))}else if(n.type==='array'){n.items.forEach((v,i)=>walk(v,path+'/'+i))}else out.push({path,node:n})}walk(root,'');return out}),"function u15Leaves(root,limit=250){const out=[];function walk(n,path){if(out.length>=limit)return;if(n.type==='object'){for(const[k,v]of n.entries)walk(v,path+'/'+jsonPointerSegment(k))}else if(n.type==='array'){n.items.forEach((v,i)=>walk(v,path+'/'+i))}else out.push({path,node:n})}walk(root,'');return out}","u15Leaves");

__studio33.u15SuggestSchema = __studio33.$fn((function u15SuggestSchema(nodes,depth=0){if(depth>20)return {};const types=[...new Set(nodes.map(n=>n.type))];if(types.length>1)return {anyOf:types.map(__studio33.$fn(type=>__studio33.u15SuggestSchema(nodes.filter(n=>n.type===type),depth+1),"type=>u15SuggestSchema(nodes.filter(n=>n.type===type),depth+1)",""))};const type=types[0]||'null';if(type==='object'){const keys=[...new Set(nodes.flatMap(n=>n.entries.map(e=>e[0])))],properties=Object.create(null);for(const k of keys.slice(0,200)){const values=nodes.flatMap(n=>n.entries.filter(e=>e[0]===k).map(e=>e[1]));properties[k]=__studio33.u15SuggestSchema(values,depth+1)}const required=keys.filter(k=>nodes.every(n=>n.entries.some(e=>e[0]===k)));return {type:'object',properties,...(required.length?{required}:{}),additionalProperties:true}}if(type==='array'){const items=nodes.flatMap(n=>n.items).slice(0,1000);return {type:'array',items:items.length?__studio33.u15SuggestSchema(items,depth+1):{}}}return {type}}),"function u15SuggestSchema(nodes,depth=0){if(depth>20)return {};const types=[...new Set(nodes.map(n=>n.type))];if(types.length>1)return {anyOf:types.map(type=>u15SuggestSchema(nodes.filter(n=>n.type===type),depth+1))};const type=types[0]||'null';if(type==='object'){const keys=[...new Set(nodes.flatMap(n=>n.entries.map(e=>e[0])))],properties=Object.create(null);for(const k of keys.slice(0,200)){const values=nodes.flatMap(n=>n.entries.filter(e=>e[0]===k).map(e=>e[1]));properties[k]=u15SuggestSchema(values,depth+1)}const required=keys.filter(k=>nodes.every(n=>n.entries.some(e=>e[0]===k)));return {type:'object',properties,...(required.length?{required}:{}),additionalProperties:true}}if(type==='array'){const items=nodes.flatMap(n=>n.items).slice(0,1000);return {type:'array',items:items.length?u15SuggestSchema(items,depth+1):{}}}return {type}}","u15SuggestSchema");

__studio33.u15WordParts = (function u15WordParts(a,b){const x=a.match(/\s+|[^\s]+/g)||[],y=b.match(/\s+|[^\s]+/g)||[];if(x.length*y.length>40000)return {a:[{text:a,changed:true}],b:[{text:b,changed:true}]};const matrix=Array.from({length:x.length+1},()=>new Uint16Array(y.length+1));for(let i=x.length-1;i>=0;i--)for(let j=y.length-1;j>=0;j--)matrix[i][j]=x[i]===y[j]?1+matrix[i+1][j+1]:Math.max(matrix[i+1][j],matrix[i][j+1]);let i=0,j=0;const before=[],after=[];while(i<x.length||j<y.length){if(i<x.length&&j<y.length&&x[i]===y[j]){before.push({text:x[i++],changed:false});after.push({text:y[j++],changed:false})}else if(j<y.length&&(i===x.length||matrix[i][j+1]>matrix[i+1][j]))after.push({text:y[j++],changed:true});else before.push({text:x[i++],changed:true})}return {a:before,b:after}});

__studio33.u15ValidateTable = __studio33.$fn((function u15ValidateTable(table,rules){if(!Array.isArray(rules)||rules.length>100)throw Error('Maximum 100 validation rules');const errors=[];let errorCount=0;const add=(row,column,message)=>{errorCount++;if(errors.length<2000)errors.push({row:row+2,column,message})};for(const rule of rules){if(!rule||!table.columns.includes(rule.column))throw Error('Unknown validation column');if(rule.type&&!['string','number','boolean','date'].includes(rule.type))throw Error('Unsupported validation type');if(rule.enum&&(!Array.isArray(rule.enum)||rule.enum.length>200))throw Error('enum must be an array of up to 200 values');for(const k of ['min','max'])if(rule[k]!==undefined&&!__studio33.rcDecimal(String(rule[k])))throw Error(k+' must be a decimal');const j=table.columns.indexOf(rule.column),seen=new Map();table.rows.forEach(__studio33.$fn((row,i)=>{const c=row[j],blank=['null','missing'].includes(c.type)||!c.value.trim();if(blank){if(rule.required)add(i,rule.column,'Required value missing');return}if(rule.unique){const k=c.type+':'+c.value;if(seen.has(k))add(i,rule.column,'Duplicate of row '+(seen.get(k)+2));else seen.set(k,i)}if(rule.type==='number'&&!__studio33.rcDecimal(c.value))add(i,rule.column,'Not a decimal');if(rule.type==='boolean'&&!['true','false'].includes(c.value))add(i,rule.column,'Not true/false');if(rule.type==='date'&&!__studio33.v12Date(c.value))add(i,rule.column,'Invalid YYYY-MM-DD date');if(rule.type==='string'&&c.type!=='string')add(i,rule.column,'Stored type is '+c.type+', expected string');if(rule.enum&&!rule.enum.map(String).includes(c.value))add(i,rule.column,'Value outside allowed choices');if(__studio33.rcDecimal(c.value)){if(rule.min!==undefined&&__studio33.u15DecimalCompare(c.value,String(rule.min))<0)add(i,rule.column,'Below minimum '+rule.min);if(rule.max!==undefined&&__studio33.u15DecimalCompare(c.value,String(rule.max))>0)add(i,rule.column,'Above maximum '+rule.max)}},"(row,i)=>{const c=row[j],blank=['null','missing'].includes(c.type)||!c.value.trim();if(blank){if(rule.required)add(i,rule.column,'Required value missing');return}if(rule.unique){const k=c.type+':'+c.value;if(seen.has(k))add(i,rule.column,'Duplicate of row '+(seen.get(k)+2));else seen.set(k,i)}if(rule.type==='number'&&!rcDecimal(c.value))add(i,rule.column,'Not a decimal');if(rule.type==='boolean'&&!['true','false'].includes(c.value))add(i,rule.column,'Not true/false');if(rule.type==='date'&&!v12Date(c.value))add(i,rule.column,'Invalid YYYY-MM-DD date');if(rule.type==='string'&&c.type!=='string')add(i,rule.column,'Stored type is '+c.type+', expected string');if(rule.enum&&!rule.enum.map(String).includes(c.value))add(i,rule.column,'Value outside allowed choices');if(rcDecimal(c.value)){if(rule.min!==undefined&&u15DecimalCompare(c.value,String(rule.min))<0)add(i,rule.column,'Below minimum '+rule.min);if(rule.max!==undefined&&u15DecimalCompare(c.value,String(rule.max))>0)add(i,rule.column,'Above maximum '+rule.max)}}",""))}return {rows:table.rows.length,errorCount,errors,truncated:errorCount>errors.length}}),"function u15ValidateTable(table,rules){if(!Array.isArray(rules)||rules.length>100)throw Error('Maximum 100 validation rules');const errors=[];let errorCount=0;const add=(row,column,message)=>{errorCount++;if(errors.length<2000)errors.push({row:row+2,column,message})};for(const rule of rules){if(!rule||!table.columns.includes(rule.column))throw Error('Unknown validation column');if(rule.type&&!['string','number','boolean','date'].includes(rule.type))throw Error('Unsupported validation type');if(rule.enum&&(!Array.isArray(rule.enum)||rule.enum.length>200))throw Error('enum must be an array of up to 200 values');for(const k of ['min','max'])if(rule[k]!==undefined&&!rcDecimal(String(rule[k])))throw Error(k+' must be a decimal');const j=table.columns.indexOf(rule.column),seen=new Map();table.rows.forEach((row,i)=>{const c=row[j],blank=['null','missing'].includes(c.type)||!c.value.trim();if(blank){if(rule.required)add(i,rule.column,'Required value missing');return}if(rule.unique){const k=c.type+':'+c.value;if(seen.has(k))add(i,rule.column,'Duplicate of row '+(seen.get(k)+2));else seen.set(k,i)}if(rule.type==='number'&&!rcDecimal(c.value))add(i,rule.column,'Not a decimal');if(rule.type==='boolean'&&!['true','false'].includes(c.value))add(i,rule.column,'Not true/false');if(rule.type==='date'&&!v12Date(c.value))add(i,rule.column,'Invalid YYYY-MM-DD date');if(rule.type==='string'&&c.type!=='string')add(i,rule.column,'Stored type is '+c.type+', expected string');if(rule.enum&&!rule.enum.map(String).includes(c.value))add(i,rule.column,'Value outside allowed choices');if(rcDecimal(c.value)){if(rule.min!==undefined&&u15DecimalCompare(c.value,String(rule.min))<0)add(i,rule.column,'Below minimum '+rule.min);if(rule.max!==undefined&&u15DecimalCompare(c.value,String(rule.max))>0)add(i,rule.column,'Above maximum '+rule.max)}})}return {rows:table.rows.length,errorCount,errors,truncated:errorCount>errors.length}}","u15ValidateTable");

__studio33.u15Reconcile = __studio33.$fn((function u15Reconcile(a,b,keys,columns,config){const rules=config.rules;if(!rules||typeof rules!=='object'||Array.isArray(rules)||Object.keys(rules).length>200)throw Error('Rules must be a column-keyed object');for(const [k,r]of Object.entries(rules)){if(!a.columns.includes(k)||!r||typeof r!=='object'||r.mode&&!['text','decimal'].includes(r.mode)||r.blank&&!['exact','equivalent','ignore'].includes(r.blank)||r.tolerance!==undefined&&(!__studio33.rcDecimal(String(r.tolerance))||__studio33.rcDecimal(String(r.tolerance)).n<0n))throw Error('Invalid reconciliation rule for '+k)}const normal=v=>config.ignoreCase?(config.trim?v.trim():v).toLowerCase():config.trim?v.trim():v;function index(t,side){const map=new Map(),invalid=[];t.rows.forEach((row,i)=>{const parts=keys.map(k=>normal(row[t.columns.indexOf(k[side])].value));if(parts.some(p=>!p)){invalid.push(i);return}const key=JSON.stringify(parts);if(!map.has(key))map.set(key,[]);map.get(key).push(i)});return {map,invalid}}const left=index(a,0),right=index(b,1),results=[],rowObject=(t,i)=>i===undefined?null:Object.fromEntries(t.columns.map((c,j)=>[c,['null','missing'].includes(t.rows[i][j].type)?null:t.rows[i][j].value]));for(const [side,x]of [[0,left],[1,right]])for(const i of x.invalid)results.push({kind:'invalid-key',key:'',referenceRows:side?[]:[i+2],currentRows:side?[i+2]:[],reference:side?null:rowObject(a,i),current:side?rowObject(b,i):null,changes:[]});for(const key of new Set([...left.map.keys(),...right.map.keys()])){const li=left.map.get(key)||[],ri=right.map.get(key)||[],base={key:JSON.parse(key).join(' / '),referenceRows:li.map(i=>i+2),currentRows:ri.map(i=>i+2),reference:rowObject(a,li[0]),current:rowObject(b,ri[0]),changes:[]};if(li.length>1||ri.length>1){results.push({...base,kind:'duplicate',referenceRecords:li.map(i=>({row:i+2,values:rowObject(a,i)})),currentRecords:ri.map(i=>({row:i+2,values:rowObject(b,i)}))});continue}if(!li.length){results.push({...base,kind:'missing-reference'});continue}if(!ri.length){results.push({...base,kind:'missing-current'});continue}for(const[l,r]of columns){const x=a.rows[li[0]][a.columns.indexOf(l)],y=b.rows[ri[0]][b.columns.indexOf(r)],rule=rules[l]||{},blank=c=>['null','missing'].includes(c.type)||!c.value.trim(),xb=blank(x),yb=blank(y),policy=rule.blank||'exact';if(policy==='ignore'&&(xb||yb)||policy==='equivalent'&&xb&&yb)continue;let equal;if(xb||yb)equal=policy==='exact'?x.type===y.type&&x.value===y.value:xb===yb;else{const nx=normal(x.value),ny=normal(y.value),near=(rule.mode||config.mode)==='decimal'?__studio33.rcNear(nx,ny,String(rule.tolerance??config.tolerance)):null;equal=near===null?nx===ny:near}if(!equal)base.changes.push({referenceColumn:l,currentColumn:r,before:x.value,after:y.value,beforeType:x.type,afterType:y.type})}results.push({...base,kind:base.changes.length?'changed':'matched'})}return {app:'calc-studio-reconciliation',version:2,createdAt:new Date().toISOString(),rules:{keys,columns,...config},sourceCounts:[a.rows.length,b.rows.length],results}}),"function u15Reconcile(a,b,keys,columns,config){const rules=config.rules;if(!rules||typeof rules!=='object'||Array.isArray(rules)||Object.keys(rules).length>200)throw Error('Rules must be a column-keyed object');for(const [k,r]of Object.entries(rules)){if(!a.columns.includes(k)||!r||typeof r!=='object'||r.mode&&!['text','decimal'].includes(r.mode)||r.blank&&!['exact','equivalent','ignore'].includes(r.blank)||r.tolerance!==undefined&&(!rcDecimal(String(r.tolerance))||rcDecimal(String(r.tolerance)).n<0n))throw Error('Invalid reconciliation rule for '+k)}const normal=v=>config.ignoreCase?(config.trim?v.trim():v).toLowerCase():config.trim?v.trim():v;function index(t,side){const map=new Map(),invalid=[];t.rows.forEach((row,i)=>{const parts=keys.map(k=>normal(row[t.columns.indexOf(k[side])].value));if(parts.some(p=>!p)){invalid.push(i);return}const key=JSON.stringify(parts);if(!map.has(key))map.set(key,[]);map.get(key).push(i)});return {map,invalid}}const left=index(a,0),right=index(b,1),results=[],rowObject=(t,i)=>i===undefined?null:Object.fromEntries(t.columns.map((c,j)=>[c,['null','missing'].includes(t.rows[i][j].type)?null:t.rows[i][j].value]));for(const [side,x]of [[0,left],[1,right]])for(const i of x.invalid)results.push({kind:'invalid-key',key:'',referenceRows:side?[]:[i+2],currentRows:side?[i+2]:[],reference:side?null:rowObject(a,i),current:side?rowObject(b,i):null,changes:[]});for(const key of new Set([...left.map.keys(),...right.map.keys()])){const li=left.map.get(key)||[],ri=right.map.get(key)||[],base={key:JSON.parse(key).join(' / '),referenceRows:li.map(i=>i+2),currentRows:ri.map(i=>i+2),reference:rowObject(a,li[0]),current:rowObject(b,ri[0]),changes:[]};if(li.length>1||ri.length>1){results.push({...base,kind:'duplicate',referenceRecords:li.map(i=>({row:i+2,values:rowObject(a,i)})),currentRecords:ri.map(i=>({row:i+2,values:rowObject(b,i)}))});continue}if(!li.length){results.push({...base,kind:'missing-reference'});continue}if(!ri.length){results.push({...base,kind:'missing-current'});continue}for(const[l,r]of columns){const x=a.rows[li[0]][a.columns.indexOf(l)],y=b.rows[ri[0]][b.columns.indexOf(r)],rule=rules[l]||{},blank=c=>['null','missing'].includes(c.type)||!c.value.trim(),xb=blank(x),yb=blank(y),policy=rule.blank||'exact';if(policy==='ignore'&&(xb||yb)||policy==='equivalent'&&xb&&yb)continue;let equal;if(xb||yb)equal=policy==='exact'?x.type===y.type&&x.value===y.value:xb===yb;else{const nx=normal(x.value),ny=normal(y.value),near=(rule.mode||config.mode)==='decimal'?rcNear(nx,ny,String(rule.tolerance??config.tolerance)):null;equal=near===null?nx===ny:near}if(!equal)base.changes.push({referenceColumn:l,currentColumn:r,before:x.value,after:y.value,beforeType:x.type,afterType:y.type})}results.push({...base,kind:base.changes.length?'changed':'matched'})}return {app:'calc-studio-reconciliation',version:2,createdAt:new Date().toISOString(),rules:{keys,columns,...config},sourceCounts:[a.rows.length,b.rows.length],results}}","u15Reconcile");

__studio33.u15RcSignatureRefresh = __studio33.$fn((function u15RcSignatureRefresh(){if(__studio33.rcReport)__studio33.u15RcRulesSignature=__studio33.$('u15RcRules').value}),"function u15RcSignatureRefresh(){if(rcReport)u15RcRulesSignature=$('u15RcRules').value}","u15RcSignatureRefresh");

__studio33.u15ProcessStep = __studio33.$fn((async function u15ProcessStep(input,step,token){try{const when=step.options.$when;if(when){const root=__studio33.strictJSON(input);let value;try{value=__studio33.nodeAtJSONPointer(root,when.path)}catch{}const matches=when.test==='exists'?!!value:when.test==='missing'?!value:!!value&&__studio33.u15BaseCompare(__studio33.emitDeveloperJSON(value),JSON.stringify(when.value)).changes.length===0;if(!matches)return {action:step.action,output:input,skipped:true}}const output=await __studio33.u15BaseWfApply(input,step,token);return {action:step.action,output}}catch(e){if(token!==__studio33.wfToken)throw Error('Cancelled');if(step.options.$onError==='continue')return {action:step.action,output:input,error:e.message,recovered:true};throw e}}),"async function u15ProcessStep(input,step,token){try{const when=step.options.$when;if(when){const root=strictJSON(input);let value;try{value=nodeAtJSONPointer(root,when.path)}catch{}const matches=when.test==='exists'?!!value:when.test==='missing'?!value:!!value&&u15BaseCompare(emitDeveloperJSON(value),JSON.stringify(when.value)).changes.length===0;if(!matches)return {action:step.action,output:input,skipped:true}}const output=await u15BaseWfApply(input,step,token);return {action:step.action,output}}catch(e){if(token!==wfToken)throw Error('Cancelled');if(step.options.$onError==='continue')return {action:step.action,output:input,error:e.message,recovered:true};throw e}}","u15ProcessStep");

__studio33.u15LoanScenario = (function u15LoanScenario(c){for(const k of ['principal','rate','fee','extra','lump','newRate'])if(!Number.isFinite(c[k])||c[k]<0)throw Error('Amounts and rates must be finite and nonnegative');if(c.principal<0.01||[c.principal,c.fee,c.extra,c.lump].some(x=>x>1e12)||c.rate>1000||c.newRate>1000||!Number.isInteger(c.months)||c.months<1||c.months>1200||!Number.isInteger(c.lumpMonth)||c.lumpMonth<1||c.lumpMonth>c.months||!Number.isInteger(c.rateMonth)||c.rateMonth<0||c.rateMonth>c.months||!['recast','keep'].includes(c.policy))throw Error('Use principal ≤ 1 trillion, rates ≤ 1,000%, 1–1,200 months and payment/change months within the term');const round=x=>Math.round((x+Number.EPSILON)*100)/100,emi=(p,r,n)=>round(r===0?p/n:p*(r/1200)/(-Math.expm1(-n*Math.log1p(r/1200))));let balance=round(c.principal),rate=c.rate,payment=emi(balance,rate,c.months),interestTotal=0,paid=0;const rows=[];for(let month=1;month<=c.months&&balance>0;month++){if(c.rateMonth===month){rate=c.newRate;if(c.policy==='recast')payment=emi(balance,rate,c.months-month+1)}const interest=round(balance*rate/1200);if(payment<=interest&&balance>0.01)throw Error('Regular payment does not cover interest at month '+month+'; choose recalculate or adjust the loan');let regular=Math.min(round(balance+interest),payment);if(month===c.months){if(c.policy==='keep'&&round(balance+interest)>payment+0.02&&c.rateMonth>0)throw Error('Keeping this payment leaves a balance at the end of the term. Choose recalculate or add repayments.');regular=round(balance+interest)}const capital=round(regular-interest),extra=Math.min(round(balance-capital),round(c.extra+(month===c.lumpMonth?c.lump:0)));balance=Math.max(0,round(balance-capital-extra));const totalPayment=round(regular+extra);interestTotal=round(interestTotal+interest);paid=round(paid+totalPayment);rows.push({month,annualRate:rate,payment:regular,extra,totalPayment,interest,principal:round(capital+extra),balance})}return {configuration:c,months:rows.length,interest:interestTotal,totalPayments:paid,fees:round(c.fee),totalCost:round(paid+c.fee),rows,notice:'Monthly reducing-balance estimate with amounts rounded to two decimals. Fees are upfront and not financed. No lender, tax or regulatory rules are inferred.'}});

__studio33.u15FindRoots = (function u15FindRoots(fn,a,b){if(!Number.isFinite(a)||!Number.isFinite(b)||a>=b)throw Error('Use increasing finite bounds');const roots=[];const f=x=>{try{const v=fn(x);return Number.isFinite(v)?v:null}catch{return null}},add=x=>{if(!roots.some(r=>Math.abs(r-x)<=Math.max(1e-8,(b-a)*1e-7))&&roots.length<100)roots.push(x)};let x0=a,y0=f(a);if(y0===0)add(a);for(let i=1;i<=2000;i++){const x1=a+(b-a)*i/2000,y1=f(x1);if(y1===0)add(x1);if(y0!==null&&y1!==null&&Math.sign(y0)!==Math.sign(y1)&&y0!==0&&y1!==0){let lo=x0,hi=x1,fl=y0,candidate=null;for(let j=0;j<70;j++){const mid=(lo+hi)/2,fm=f(mid);if(fm===null){candidate=null;break}if(Math.abs(fm)<=1e-9){candidate=mid;break}if(Math.sign(fl)===Math.sign(fm)){lo=mid;fl=fm}else hi=mid;if(mid===lo&&hi-lo<=Math.max(1e-12,Math.abs(mid)*1e-14)){candidate=(lo+hi)/2;break}}if(candidate!==null){const residual=f(candidate);if(residual!==null&&Math.abs(residual)<=1e-7)add(candidate)}}x0=x1;y0=y1}return roots.sort((a,b)=>a-b)});

__studio33.u15SVG = (function u15SVG(width,height,label){const s=document.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('viewBox','0 0 '+width+' '+height);s.setAttribute('role','img');s.setAttribute('aria-label',label);s.classList.add('u15-chart');return s});

__studio33.u15SVGNode = (function u15SVGNode(svg,tag,attrs,text){const n=document.createElementNS(svg.namespaceURI,tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,v);if(text!==undefined)n.textContent=text;svg.append(n);return n});

__studio33.u15ReattachGutters = __studio33.$fn((function u15ReattachGutters(){for(const {editor,wrap,render}of __studio33.u15Gutters.values()){if(!editor.closest('#editorFocusDialog')&&editor.parentElement!==wrap&&wrap.isConnected)wrap.append(editor);render()}}),"function u15ReattachGutters(){for(const {editor,wrap,render}of u15Gutters.values()){if(!editor.closest('#editorFocusDialog')&&editor.parentElement!==wrap&&wrap.isConnected)wrap.append(editor);render()}}","u15ReattachGutters");

__studio33.u15MarkError = __studio33.$fn((function u15MarkError(status,message,error){if(!error)return;const match=message.match(/line\s+(\d+)/i),position=message.match(/(?:position|character)\s+(\d+)/i),section=status?.closest('section'),editor=section?.querySelector('textarea:not([readonly])');if(!editor||!__studio33.u15Gutters.has(editor.id))return;let line=match?Number(match[1]):position?editor.value.slice(0,Math.max(0,Number(position[1])-1)).split('\n').length:0;if(line>0)__studio33.u15Gutters.get(editor.id).mark(line)}),"function u15MarkError(status,message,error){if(!error)return;const match=message.match(/line\\s+(\\d+)/i),position=message.match(/(?:position|character)\\s+(\\d+)/i),section=status?.closest('section'),editor=section?.querySelector('textarea:not([readonly])');if(!editor||!u15Gutters.has(editor.id))return;let line=match?Number(match[1]):position?editor.value.slice(0,Math.max(0,Number(position[1])-1)).split('\\n').length:0;if(line>0)u15Gutters.get(editor.id).mark(line)}","u15MarkError");

__studio33.u16Text = (function u16Text(value){return typeof value==='string'?value:JSON.stringify(value)});

__studio33.u16JSON = __studio33.$fn((function u16JSON(text){return __studio33.u15SafeTextJSON(text)}),"function u16JSON(text){return u15SafeTextJSON(text)}","u16JSON");

__studio33.u16Array = __studio33.$fn((function u16Array(text,max=100){const a=__studio33.u16JSON(text);if(!Array.isArray(a)||a.length>max)throw Error('Use a JSON array with at most '+max+' entries');return a}),"function u16Array(text,max=100){const a=u16JSON(text);if(!Array.isArray(a)||a.length>max)throw Error('Use a JSON array with at most '+max+' entries');return a}","u16Array");

__studio33.u16Preview = __studio33.$fn((function u16Preview(parent,id){const el=__studio33.csText('div','','u16-preview');el.id=id;parent.append(el);return el}),"function u16Preview(parent,id){const el=csText('div','','u16-preview');el.id=id;parent.append(el);return el}","u16Preview");

__studio33.u16Fresh = (function u16Fresh(signature,current){if(signature!==current)throw Error('Inputs changed. Preview again before applying or exporting.')});

__studio33.u16Field = __studio33.$fn((function u16Field(host,id,label,value='',type='text',options){return __studio33.u15Field(host,id,label,value,type,options)}),"function u16Field(host,id,label,value='',type='text',options){return u15Field(host,id,label,value,type,options)}","u16Field");

__studio33.u16Button = __studio33.$fn((function u16Button(host,id,label,fn){return __studio33.u15Button(host,id,label,fn)}),"function u16Button(host,id,label,fn){return u15Button(host,id,label,fn)}","u16Button");

__studio33.u16DecimalSum = __studio33.$fn((function u16DecimalSum(values){let scale=0,n=0n;for(const v of values){const d=__studio33.rcDecimal(v);if(!d)throw Error('Expected decimal: '+v);const next=Math.max(scale,d.scale);n=n*10n**BigInt(next-scale)+d.n*10n**BigInt(next-d.scale);scale=next}if(scale<0)return String(n*10n**BigInt(-scale));const negative=n<0n;n=negative?-n:n;let str=String(n).padStart(scale+1,'0');if(scale)str=str.slice(0,-scale)+'.'+str.slice(-scale);return (negative?'-':'')+str.replace(/(\.\d*?)0+$/,'$1').replace(/\.$/,'')}),"function u16DecimalSum(values){let scale=0,n=0n;for(const v of values){const d=rcDecimal(v);if(!d)throw Error('Expected decimal: '+v);const next=Math.max(scale,d.scale);n=n*10n**BigInt(next-scale)+d.n*10n**BigInt(next-d.scale);scale=next}if(scale<0)return String(n*10n**BigInt(-scale));const negative=n<0n;n=negative?-n:n;let str=String(n).padStart(scale+1,'0');if(scale)str=str.slice(0,-scale)+'.'+str.slice(-scale);return (negative?'-':'')+str.replace(/(\\.\\d*?)0+$/,'$1').replace(/\\.$/,'')}","u16DecimalSum");

__studio33.u16DecimalAverage = __studio33.$fn((function u16DecimalAverage(total,count){if(!count)return '';const d=__studio33.rcDecimal(total),precision=8;let n=d.n*10n**BigInt(Math.max(0,precision-d.scale)),div=BigInt(count)*10n**BigInt(Math.max(0,d.scale-precision));let q=n/div;const rem=n%div;if((rem<0n?-rem:rem)*2n>=div)q+=n<0n?-1n:1n;const sign=q<0n?'-':'';let s=String(q<0n?-q:q).padStart(precision+1,'0');return sign+(s.slice(0,-precision)+'.'+s.slice(-precision)).replace(/0+$/,'').replace(/\.$/,'')}),"function u16DecimalAverage(total,count){if(!count)return '';const d=rcDecimal(total),precision=8;let n=d.n*10n**BigInt(Math.max(0,precision-d.scale)),div=BigInt(count)*10n**BigInt(Math.max(0,d.scale-precision));let q=n/div;const rem=n%div;if((rem<0n?-rem:rem)*2n>=div)q+=n<0n?-1n:1n;const sign=q<0n?'-':'';let s=String(q<0n?-q:q).padStart(precision+1,'0');return sign+(s.slice(0,-precision)+'.'+s.slice(-precision)).replace(/0+$/,'').replace(/\\.$/,'')}","u16DecimalAverage");

__studio33.u16ExtractResponse = __studio33.$fn((function u16ExtractResponse(res,rules){if(!Array.isArray(rules)||rules.length>100)throw Error('Use at most 100 extraction rules');if(!rules.length)return [];if(!res?.json||res.incomplete)throw Error('Extraction requires a complete JSON response');const root=__studio33.strictJSON(res.text),names=new Set();return rules.map(__studio33.$fn(r=>{if(!r||!/^[A-Za-z_][\w.-]*$/.test(r.name)||names.has(r.name))throw Error('Extraction names must be valid and unique');names.add(r.name);const n=__studio33.nodeAtJSONPointer(root,r.path),value=n.type==='string'?n.value:__studio33.emitDeveloperJSON(n);if(/[\r\n\0]/.test(value))throw Error('Extracted variables cannot contain line breaks');return {name:r.name,value}},"r=>{if(!r||!/^[A-Za-z_][\\w.-]*$/.test(r.name)||names.has(r.name))throw Error('Extraction names must be valid and unique');names.add(r.name);const n=nodeAtJSONPointer(root,r.path),value=n.type==='string'?n.value:emitDeveloperJSON(n);if(/[\\r\\n\\0]/.test(value))throw Error('Extracted variables cannot contain line breaks');return {name:r.name,value}}",""))}),"function u16ExtractResponse(res,rules){if(!Array.isArray(rules)||rules.length>100)throw Error('Use at most 100 extraction rules');if(!rules.length)return [];if(!res?.json||res.incomplete)throw Error('Extraction requires a complete JSON response');const root=strictJSON(res.text),names=new Set();return rules.map(r=>{if(!r||!/^[A-Za-z_][\\w.-]*$/.test(r.name)||names.has(r.name))throw Error('Extraction names must be valid and unique');names.add(r.name);const n=nodeAtJSONPointer(root,r.path),value=n.type==='string'?n.value:emitDeveloperJSON(n);if(/[\\r\\n\\0]/.test(value))throw Error('Extracted variables cannot contain line breaks');return {name:r.name,value}})}","u16ExtractResponse");

__studio33.u16TableSignature = __studio33.$fn((function u16TableSignature(){return JSON.stringify([__studio33.dwTable,...['u16JoinRight','u16JoinKeys','u16JoinMode','u16JoinDuplicates','u16GroupColumns','u16GroupMetrics'].map(__studio33.$fn(id=>__studio33.$(id).value,"id=>$(id).value",""))])}),"function u16TableSignature(){return JSON.stringify([dwTable,...['u16JoinRight','u16JoinKeys','u16JoinMode','u16JoinDuplicates','u16GroupColumns','u16GroupMetrics'].map(id=>$(id).value)])}","u16TableSignature");

__studio33.u16ShowTablePending = __studio33.$fn((function u16ShowTablePending(table,label,unmatched=[]){__studio33.u16TablePending={signature:__studio33.u16TableSignature(),table,label,unmatched};__studio33.u15Table(__studio33.u16TablePreview,table.columns,table.rows.slice(0,50).map(r=>r.map(c=>c.type==='missing'?'(missing)':c.type==='null'?'(null)':c.value)));if(unmatched.length){const h=__studio33.csText('div','');__studio33.u16TablePreview.append(__studio33.csText('h4','Unmatched source records'),h);__studio33.u15Table(h,['Side','Source row','Reason'],unmatched.slice(0,100))}__studio33.u16TablesStatus.textContent=table.rows.length+' proposed rows; first 50 shown. '+unmatched.length+' unmatched records. Average rounds to 8 decimal places. Keys match exact text values; blank keys do not match.'}),"function u16ShowTablePending(table,label,unmatched=[]){u16TablePending={signature:u16TableSignature(),table,label,unmatched};u15Table(u16TablePreview,table.columns,table.rows.slice(0,50).map(r=>r.map(c=>c.type==='missing'?'(missing)':c.type==='null'?'(null)':c.value)));if(unmatched.length){const h=csText('div','');u16TablePreview.append(csText('h4','Unmatched source records'),h);u15Table(h,['Side','Source row','Reason'],unmatched.slice(0,100))}u16TablesStatus.textContent=table.rows.length+' proposed rows; first 50 shown. '+unmatched.length+' unmatched records. Average rounds to 8 decimal places. Keys match exact text values; blank keys do not match.'}","u16ShowTablePending");

__studio33.u16Parent = __studio33.$fn((function u16Parent(root,path){const parts=__studio33.u15PointerParts(path);if(!parts.length)return {root:true};const key=parts.pop(),parent=__studio33.nodeAtJSONPointer(root,parts.length?'/'+parts.map(__studio33.jsonPointerSegment).join('/'):'');return {parent,key}}),"function u16Parent(root,path){const parts=u15PointerParts(path);if(!parts.length)return {root:true};const key=parts.pop(),parent=nodeAtJSONPointer(root,parts.length?'/'+parts.map(jsonPointerSegment).join('/'):'');return {parent,key}}","u16Parent");

__studio33.u16Index = (function u16Index(key,length,insert=false){if(insert&&key==='-')return length;if(!/^(0|[1-9]\d*)$/.test(key))throw Error('Array index must be a nonnegative whole number');const n=Number(key);if(!Number.isSafeInteger(n)||n>length-(insert?0:1))throw Error('Array index is outside the branch');return n});

__studio33.u16NodeModify = __studio33.$fn((function u16NodeModify(root,op,path,value){const p=__studio33.u16Parent(root,path);if(p.root){if(op==='remove')throw Error('The root cannot be deleted');return value}if(p.parent.type==='object'){const i=p.parent.entries.findIndex(([k])=>k===p.key);if(op==='add'&&i>=0)throw Error('Property already exists; select Replace');if(op!=='add'&&i<0)throw Error('Property not found');if(op==='remove')p.parent.entries.splice(i,1);else if(op==='add')p.parent.entries.push([p.key,value]);else p.parent.entries[i][1]=value}else if(p.parent.type==='array'){const i=__studio33.u16Index(p.key,p.parent.items.length,op==='add');if(op==='add')p.parent.items.splice(i,0,value);else if(op==='remove')p.parent.items.splice(i,1);else p.parent.items[i]=value}else throw Error('Target parent must be an object or array');return root}),"function u16NodeModify(root,op,path,value){const p=u16Parent(root,path);if(p.root){if(op==='remove')throw Error('The root cannot be deleted');return value}if(p.parent.type==='object'){const i=p.parent.entries.findIndex(([k])=>k===p.key);if(op==='add'&&i>=0)throw Error('Property already exists; select Replace');if(op!=='add'&&i<0)throw Error('Property not found');if(op==='remove')p.parent.entries.splice(i,1);else if(op==='add')p.parent.entries.push([p.key,value]);else p.parent.entries[i][1]=value}else if(p.parent.type==='array'){const i=u16Index(p.key,p.parent.items.length,op==='add');if(op==='add')p.parent.items.splice(i,0,value);else if(op==='remove')p.parent.items.splice(i,1);else p.parent.items[i]=value}else throw Error('Target parent must be an object or array');return root}","u16NodeModify");

__studio33.u16Structure = __studio33.$fn((function u16Structure(source,op,path,from,name,valueText){let root=__studio33.strictJSON(source);__studio33.u15PointerParts(path);if(op==='rename'){const p=__studio33.u16Parent(root,path);if(p.root||p.parent.type!=='object')throw Error('Rename an object property');const entry=p.parent.entries.find(e=>e[0]===p.key);if(!entry)throw Error('Property not found');if(!name||p.parent.entries.some(e=>e[0]===name&&e!==entry))throw Error('Enter a new unique nonempty name');entry[0]=name}else if(op==='move'){__studio33.u15PointerParts(from);if(!from||path===from||path.startsWith(from+'/'))throw Error('Move a non-root branch outside itself');const node=__studio33.csClone(__studio33.nodeAtJSONPointer(root,from));root=__studio33.u16NodeModify(root,'remove',from);root=__studio33.u16NodeModify(root,'add',path,node)}else if(['add','replace','remove'].includes(op)){if(op==='replace')__studio33.nodeAtJSONPointer(root,path);root=__studio33.u16NodeModify(root,op,path,op==='remove'?null:__studio33.strictJSON(valueText))}else throw Error('Unknown structural operation');return __studio33.emitDeveloperJSON(root,'  ')}),"function u16Structure(source,op,path,from,name,valueText){let root=strictJSON(source);u15PointerParts(path);if(op==='rename'){const p=u16Parent(root,path);if(p.root||p.parent.type!=='object')throw Error('Rename an object property');const entry=p.parent.entries.find(e=>e[0]===p.key);if(!entry)throw Error('Property not found');if(!name||p.parent.entries.some(e=>e[0]===name&&e!==entry))throw Error('Enter a new unique nonempty name');entry[0]=name}else if(op==='move'){u15PointerParts(from);if(!from||path===from||path.startsWith(from+'/'))throw Error('Move a non-root branch outside itself');const node=csClone(nodeAtJSONPointer(root,from));root=u16NodeModify(root,'remove',from);root=u16NodeModify(root,'add',path,node)}else if(['add','replace','remove'].includes(op)){if(op==='replace')nodeAtJSONPointer(root,path);root=u16NodeModify(root,op,path,op==='remove'?null:strictJSON(valueText))}else throw Error('Unknown structural operation');return emitDeveloperJSON(root,'  ')}","u16Structure");

__studio33.u16ResolutionSignature = __studio33.$fn((function u16ResolutionSignature(){return JSON.stringify([__studio33.v13RcInputs(),__studio33.$('u15RcRules').value,__studio33.rcReport])}),"function u16ResolutionSignature(){return JSON.stringify([v13RcInputs(),$('u15RcRules').value,rcReport])}","u16ResolutionSignature");

__studio33.u16ResolutionDecisions = __studio33.$fn((function u16ResolutionDecisions(){return JSON.stringify(__studio33.u16ResolutionState?.items.map(x=>[x.choice,x.manual]))}),"function u16ResolutionDecisions(){return JSON.stringify(u16ResolutionState?.items.map(x=>[x.choice,x.manual]))}","u16ResolutionDecisions");

__studio33.u16ResolvedReady = __studio33.$fn((function u16ResolvedReady(){if(!__studio33.u16Resolved)throw Error('Preview the resolved dataset first');__studio33.u16Fresh(__studio33.u16Resolved.signature,__studio33.u16ResolutionSignature());__studio33.u16Fresh(__studio33.u16Resolved.decisions,__studio33.u16ResolutionDecisions());return __studio33.u16Resolved}),"function u16ResolvedReady(){if(!u16Resolved)throw Error('Preview the resolved dataset first');u16Fresh(u16Resolved.signature,u16ResolutionSignature());u16Fresh(u16Resolved.decisions,u16ResolutionDecisions());return u16Resolved}","u16ResolvedReady");

__studio33.u16AnalyzeHotspots = (function u16AnalyzeHotspots(result){const ops=result.operations||[],byParent=new Map();for(const o of ops){if(!byParent.has(o.parentId))byParent.set(o.parentId,[]);byParent.get(o.parentId).push(o)}const groups=new Map();for(const o of ops){const label=o.kind==='query'?o.label.replace(/'(?:\\.|[^'])*'/g,'?').replace(/\b\d+(?:\.\d+)?\b/g,'?').replace(/\s+/g,' ').trim():o.kind==='dml'?o.label.replace(/Rows:\d+/g,'Rows:?'):o.label.replace(/\s+/g,' ').trim(),key=o.kind+'|'+label;if(!groups.has(key))groups.set(key,{kind:o.kind,label,count:0,timed:0,totalMs:0,maxMs:0,selfMs:0,selfKnown:0,locations:[]});const g=groups.get(key);g.count++;if(g.locations.length<10)g.locations.push({file:o.file,line:o.line,transaction:o.transaction});if(!Number.isFinite(o.durationMs)||!Number.isFinite(o.startMs)||!o.endLine)continue;g.timed++;g.totalMs+=o.durationMs;g.maxMs=Math.max(g.maxMs,o.durationMs);const children=byParent.get(o.id)||[],finish=o.startMs+o.durationMs;let reliable=children.every(c=>c.file===o.file&&c.transaction===o.transaction&&Number.isFinite(c.startMs)&&Number.isFinite(c.durationMs)&&c.endLine&&c.line>o.line&&c.endLine<o.endLine&&c.startMs>=o.startMs&&c.startMs+c.durationMs<=finish+0.000001);const intervals=children.map(c=>[c.startMs,c.startMs+c.durationMs]).sort((a,b)=>a[0]-b[0]);let covered=0,end=o.startMs;for(const [a,b]of intervals){if(a<end-0.000001)reliable=false;covered+=Math.max(0,b-Math.max(a,end));end=Math.max(end,b)}if(reliable){g.selfKnown++;g.selfMs+=Math.max(0,o.durationMs-covered)}}return {app:'calc-studio-log-hotspots',version:1,createdAt:new Date().toISOString(),groups:[...groups.values()],notice:'Inclusive elapsed durations can overlap and must not be added across nested groups. Self time subtracts complete direct-child intervals only; it is recorded elapsed time, not CPU time. Missing log events can hide work.'}});

__studio33.u16HotspotsDraw = __studio33.$fn((function u16HotspotsDraw(){if(!__studio33.u16HotspotReport)return;const key={total:'totalMs',count:'count',max:'maxMs',self:'selfMs'}[__studio33.$('u16HotspotSort').value],rows=[...__studio33.u16HotspotReport.groups].sort((a,b)=>b[key]-a[key]);__studio33.u15Table(__studio33.u16HotspotRows,['Operation / pattern','Count / timed','Total inclusive ms','Max ms','Self ms / eligible','Source evidence'],rows.slice(0,100).map(__studio33.$fn(g=>{const links=__studio33.csText('div','');for(const loc of g.locations.slice(0,5))links.append(__studio33.csButton(loc.file+':'+loc.line,__studio33.$fn(()=>__studio33.showLogContext(loc),"()=>showLogContext(loc)","")));return [g.kind+' · '+g.label.slice(0,400),g.count+' / '+g.timed,g.totalMs.toFixed(3),g.maxMs.toFixed(3),g.selfKnown?g.selfMs.toFixed(3)+' / '+g.selfKnown:'Unavailable',links]},"g=>{const links=csText('div','');for(const loc of g.locations.slice(0,5))links.append(csButton(loc.file+':'+loc.line,()=>showLogContext(loc)));return [g.kind+' · '+g.label.slice(0,400),g.count+' / '+g.timed,g.totalMs.toFixed(3),g.maxMs.toFixed(3),g.selfKnown?g.selfMs.toFixed(3)+' / '+g.selfKnown:'Unavailable',links]}","")));__studio33.u16HotspotStatus.textContent=rows.length+' patterns; top 100 shown. '+__studio33.u16HotspotReport.notice}),"function u16HotspotsDraw(){if(!u16HotspotReport)return;const key={total:'totalMs',count:'count',max:'maxMs',self:'selfMs'}[$('u16HotspotSort').value],rows=[...u16HotspotReport.groups].sort((a,b)=>b[key]-a[key]);u15Table(u16HotspotRows,['Operation / pattern','Count / timed','Total inclusive ms','Max ms','Self ms / eligible','Source evidence'],rows.slice(0,100).map(g=>{const links=csText('div','');for(const loc of g.locations.slice(0,5))links.append(csButton(loc.file+':'+loc.line,()=>showLogContext(loc)));return [g.kind+' · '+g.label.slice(0,400),g.count+' / '+g.timed,g.totalMs.toFixed(3),g.maxMs.toFixed(3),g.selfKnown?g.selfMs.toFixed(3)+' / '+g.selfKnown:'Unavailable',links]}));u16HotspotStatus.textContent=rows.length+' patterns; top 100 shown. '+u16HotspotReport.notice}","u16HotspotsDraw");

__studio33.u16ReviewDraw = __studio33.$fn((function u16ReviewDraw(id){const s=__studio33.u16Reviews.get(id);s.host.replaceChildren();s.page=Math.max(0,Math.min(s.page,Math.max(0,Math.ceil(s.items.length/50)-1)));for(const item of s.items.slice(s.page*50,s.page*50+50)){const row=__studio33.csText('div','','u16-review-row'),select=document.createElement('select'),note=document.createElement('input');for(const [v,label]of [['investigate','Needs investigation'],['accepted','Accepted difference'],['rejected','Rejected difference']])select.append(new Option(label,v));select.value=item.decision;select.setAttribute('aria-label','Decision '+item.record.key);note.value=item.note;note.maxLength=1000;note.placeholder='Review note';note.setAttribute('aria-label','Note '+item.record.key);select.onchange=()=>item.decision=select.value;note.oninput=()=>item.note=note.value;row.append(__studio33.csText('code',item.record.kind+' · '+item.record.key),select,note);s.host.append(row)}s.status.textContent=s.items.length+' differences · page '+(s.page+1)+' of '+Math.max(1,Math.ceil(s.items.length/50))+' · Decisions do not change either source.'}),"function u16ReviewDraw(id){const s=u16Reviews.get(id);s.host.replaceChildren();s.page=Math.max(0,Math.min(s.page,Math.max(0,Math.ceil(s.items.length/50)-1)));for(const item of s.items.slice(s.page*50,s.page*50+50)){const row=csText('div','','u16-review-row'),select=document.createElement('select'),note=document.createElement('input');for(const [v,label]of [['investigate','Needs investigation'],['accepted','Accepted difference'],['rejected','Rejected difference']])select.append(new Option(label,v));select.value=item.decision;select.setAttribute('aria-label','Decision '+item.record.key);note.value=item.note;note.maxLength=1000;note.placeholder='Review note';note.setAttribute('aria-label','Note '+item.record.key);select.onchange=()=>item.decision=select.value;note.oninput=()=>item.note=note.value;row.append(csText('code',item.record.kind+' · '+item.record.key),select,note);s.host.append(row)}s.status.textContent=s.items.length+' differences · page '+(s.page+1)+' of '+Math.max(1,Math.ceil(s.items.length/50))+' · Decisions do not change either source.'}","u16ReviewDraw");

__studio33.u16RawPatch = __studio33.$fn((function u16RawPatch(a,b,path='',ops=[]){if(a.type!==b.type){ops.push({op:'replace',path,value:b});return ops}if(a.type==='object'){const am=new Map(a.entries),bm=new Map(b.entries);for(const [k]of a.entries)if(!bm.has(k))ops.push({op:'remove',path:path+'/'+__studio33.jsonPointerSegment(k)});for(const [k,v]of b.entries){const p=path+'/'+__studio33.jsonPointerSegment(k);if(!am.has(k))ops.push({op:'add',path:p,value:v});else __studio33.u16RawPatch(am.get(k),v,p,ops)}}else if(a.type==='array'){for(let i=0;i<Math.min(a.items.length,b.items.length);i++)__studio33.u16RawPatch(a.items[i],b.items[i],path+'/'+i,ops);for(let i=a.items.length-1;i>=b.items.length;i--)ops.push({op:'remove',path:path+'/'+i});for(let i=a.items.length;i<b.items.length;i++)ops.push({op:'add',path:path+'/-',value:b.items[i]})}else if(__studio33.u15BaseCompare(__studio33.emitDeveloperJSON(a),__studio33.emitDeveloperJSON(b)).changes.length)ops.push({op:'replace',path,value:b});if(ops.length>10000)throw Error('Patch limit: 10,000 operations');return ops}),"function u16RawPatch(a,b,path='',ops=[]){if(a.type!==b.type){ops.push({op:'replace',path,value:b});return ops}if(a.type==='object'){const am=new Map(a.entries),bm=new Map(b.entries);for(const [k]of a.entries)if(!bm.has(k))ops.push({op:'remove',path:path+'/'+jsonPointerSegment(k)});for(const [k,v]of b.entries){const p=path+'/'+jsonPointerSegment(k);if(!am.has(k))ops.push({op:'add',path:p,value:v});else u16RawPatch(am.get(k),v,p,ops)}}else if(a.type==='array'){for(let i=0;i<Math.min(a.items.length,b.items.length);i++)u16RawPatch(a.items[i],b.items[i],path+'/'+i,ops);for(let i=a.items.length-1;i>=b.items.length;i--)ops.push({op:'remove',path:path+'/'+i});for(let i=a.items.length;i<b.items.length;i++)ops.push({op:'add',path:path+'/-',value:b.items[i]})}else if(u15BaseCompare(emitDeveloperJSON(a),emitDeveloperJSON(b)).changes.length)ops.push({op:'replace',path,value:b});if(ops.length>10000)throw Error('Patch limit: 10,000 operations');return ops}","u16RawPatch");

__studio33.u16PatchText = __studio33.$fn((function u16PatchText(ops){return __studio33.emitDeveloperJSON({type:'array',items:ops.map(o=>({type:'object',entries:[['op',{type:'string',value:o.op}],['path',{type:'string',value:o.path}],...(o.value?[['value',o.value]]:[])]}))},'  ')}),"function u16PatchText(ops){return emitDeveloperJSON({type:'array',items:ops.map(o=>({type:'object',entries:[['op',{type:'string',value:o.op}],['path',{type:'string',value:o.path}],...(o.value?[['value',o.value]]:[])]}))},'  ')}","u16PatchText");

__studio33.u16Get = (function u16Get(n,key){if(n?.type==='object')return n.entries.find(e=>e[0]===key)?.[1];if(n?.type==='array'&&/^\d+$/.test(key))return n.items[Number(key)];return undefined});

__studio33.u16String = (function u16String(n){return n?.type==='string'?n.value:n?.type==='number'?n.raw:n?.type==='boolean'?String(n.value):''});

__studio33.u16RetryReady = __studio33.$fn((function u16RetryReady(){if(!__studio33.u16Retry)throw Error('Preview a retry payload first');__studio33.u16Fresh(__studio33.u16Retry.signature,__studio33.u16CompositeSignature());__studio33.u16Fresh(__studio33.u16Retry.selection,__studio33.$('u16RetrySelection').value);return __studio33.u16Retry.text}),"function u16RetryReady(){if(!u16Retry)throw Error('Preview a retry payload first');u16Fresh(u16Retry.signature,u16CompositeSignature());u16Fresh(u16Retry.selection,$('u16RetrySelection').value);return u16Retry.text}","u16RetryReady");

__studio33.u16ValidateCapacity = (function u16ValidateCapacity(x){if(!x||typeof x!=='object'||Array.isArray(x)||Object.keys(x).length>200||Object.entries(x).some(([k,v])=>!k.trim()||k.length>100||!Number.isFinite(v)||v<0||v>168))throw Error('Capacity needs up to 200 assignee names with 0–168 weekly hours');return x});

__studio33.u16Monday = __studio33.$fn((function u16Monday(date){const d=new Date(date+'T12:00:00Z');return __studio33.v12Shift(date,-((d.getUTCDay()+6)%7))}),"function u16Monday(date){const d=new Date(date+'T12:00:00Z');return v12Shift(date,-((d.getUTCDay()+6)%7))}","u16Monday");

__studio33.u16PlanningReport = __studio33.$fn((function u16PlanningReport(board){const tasks=board.tasks.filter(__studio33.$fn(t=>!t.archived&&!__studio33.knDone(board,t),"t=>!t.archived&&!knDone(board,t)","")),capacity=board.weeklyCapacity||{},weeks=new Map(),unplanned=[];for(const t of tasks){const name=t.assignee||'Unassigned',start=t.start||t.due,end=t.due||t.start;if(!start||!end){unplanned.push({id:t.id,title:t.title,assignee:name,hours:t.estimate});continue}const span=Math.round((Date.parse(end)-Date.parse(start))/86400000);if(span>3650)throw Error('Planning supports task spans up to 3,650 calendar days');const dates=[];for(let i=0;i<=span;i++){const date=__studio33.v12Shift(start,i);if(__studio33.v13TaskSchedule(t,board)!=='working'||__studio33.v13IsWorking(date,__studio33.v13CalendarFor(board)))dates.push(date)}if(!dates.length){unplanned.push({id:t.id,title:t.title,assignee:name,hours:t.estimate});continue}for(const date of dates){const week=__studio33.u16Monday(date),key=JSON.stringify([name,week]);if(!weeks.has(key))weeks.set(key,{assignee:name,week,hours:0,capacity:Object.hasOwn(capacity,name)?capacity[name]:null,tasks:new Set()});const w=weeks.get(key);w.hours+=t.estimate/dates.length;w.tasks.add(t.id)}}const map=new Map(tasks.map(t=>[t.id,t])),durations=new Map(tasks.map(__studio33.$fn(t=>[t.id,t.milestone?0:t.start&&t.due?(__studio33.v13TaskSchedule(t,board)==='working'?__studio33.v13WorkingDuration(t.start,t.due,__studio33.v13CalendarFor(board)):Math.round((Date.parse(t.due)-Date.parse(t.start))/86400000)+1):1],"t=>[t.id,t.milestone?0:t.start&&t.due?(v13TaskSchedule(t,board)==='working'?v13WorkingDuration(t.start,t.due,v13CalendarFor(board)):Math.round((Date.parse(t.due)-Date.parse(t.start))/86400000)+1):1]",""))),early=new Map(),order=[],visiting=new Set();function visit(id){if(early.has(id))return early.get(id);if(visiting.has(id))throw Error('Dependency cycle detected');visiting.add(id);const t=map.get(id),deps=t.dependencies.filter(d=>map.has(d));const start=Math.max(0,...deps.map(visit)),finish=start+durations.get(id);early.set(id,finish);order.push(id);visiting.delete(id);return finish}for(const t of tasks)visit(t.id);const duration=Math.max(0,...early.values()),late=new Map();for(const id of [...order].reverse()){const successors=tasks.filter(t=>t.dependencies.includes(id));late.set(id,successors.length?Math.min(...successors.map(t=>late.get(t.id)))-durations.get(id):duration-durations.get(id))}const critical=tasks.filter(t=>{const es=early.get(t.id)-durations.get(t.id);return Math.abs(late.get(t.id)-es)<1e-9}).map(t=>({id:t.id,title:t.title,duration:durations.get(t.id),earlyStart:early.get(t.id)-durations.get(t.id)}));const baseline=board.scheduleBaseline,changes=[];if(baseline){const old=new Map(baseline.tasks.map(t=>[t.id,t]));for(const t of board.tasks.filter(t=>!t.archived)){const before=old.get(t.id);if(!before){changes.push({id:t.id,title:t.title,change:'Added',beforeStart:'',beforeDue:'',start:t.start||'',due:t.due||'',slipDays:null});continue}old.delete(t.id);if((before.start||'')!==(t.start||'')||(before.due||'')!==(t.due||''))changes.push({id:t.id,title:t.title,change:'Date changed',beforeStart:before.start,beforeDue:before.due,start:t.start||'',due:t.due||'',slipDays:before.due&&t.due?Math.round((Date.parse(t.due)-Date.parse(before.due))/86400000):null})}for(const t of old.values())changes.push({...t,change:'Removed / archived',beforeStart:t.start,beforeDue:t.due,start:'',due:'',slipDays:null})}return {app:'calc-studio-capacity-plan',version:1,board:board.name,createdAt:new Date().toISOString(),weeks:[...weeks.values()].map(w=>({...w,hours:Math.round(w.hours*100)/100,tasks:[...w.tasks],overloaded:w.capacity!==null&&w.hours>w.capacity+0.000001})).sort((a,b)=>a.week.localeCompare(b.week)||a.assignee.localeCompare(b.assignee)),unplanned,critical,dependencyDuration:duration,baselineAt:baseline?.at||null,changes,notice:'Hours are spread evenly over each task’s scheduled days. Critical paths use finish-to-start dependencies and normalized duration units, ignore calendar offsets/resource constraints, and assume one day for undated tasks. This is a planning estimate, not automatic scheduling.'}}),"function u16PlanningReport(board){const tasks=board.tasks.filter(t=>!t.archived&&!knDone(board,t)),capacity=board.weeklyCapacity||{},weeks=new Map(),unplanned=[];for(const t of tasks){const name=t.assignee||'Unassigned',start=t.start||t.due,end=t.due||t.start;if(!start||!end){unplanned.push({id:t.id,title:t.title,assignee:name,hours:t.estimate});continue}const span=Math.round((Date.parse(end)-Date.parse(start))/86400000);if(span>3650)throw Error('Planning supports task spans up to 3,650 calendar days');const dates=[];for(let i=0;i<=span;i++){const date=v12Shift(start,i);if(v13TaskSchedule(t,board)!=='working'||v13IsWorking(date,v13CalendarFor(board)))dates.push(date)}if(!dates.length){unplanned.push({id:t.id,title:t.title,assignee:name,hours:t.estimate});continue}for(const date of dates){const week=u16Monday(date),key=JSON.stringify([name,week]);if(!weeks.has(key))weeks.set(key,{assignee:name,week,hours:0,capacity:Object.hasOwn(capacity,name)?capacity[name]:null,tasks:new Set()});const w=weeks.get(key);w.hours+=t.estimate/dates.length;w.tasks.add(t.id)}}const map=new Map(tasks.map(t=>[t.id,t])),durations=new Map(tasks.map(t=>[t.id,t.milestone?0:t.start&&t.due?(v13TaskSchedule(t,board)==='working'?v13WorkingDuration(t.start,t.due,v13CalendarFor(board)):Math.round((Date.parse(t.due)-Date.parse(t.start))/86400000)+1):1])),early=new Map(),order=[],visiting=new Set();function visit(id){if(early.has(id))return early.get(id);if(visiting.has(id))throw Error('Dependency cycle detected');visiting.add(id);const t=map.get(id),deps=t.dependencies.filter(d=>map.has(d));const start=Math.max(0,...deps.map(visit)),finish=start+durations.get(id);early.set(id,finish);order.push(id);visiting.delete(id);return finish}for(const t of tasks)visit(t.id);const duration=Math.max(0,...early.values()),late=new Map();for(const id of [...order].reverse()){const successors=tasks.filter(t=>t.dependencies.includes(id));late.set(id,successors.length?Math.min(...successors.map(t=>late.get(t.id)))-durations.get(id):duration-durations.get(id))}const critical=tasks.filter(t=>{const es=early.get(t.id)-durations.get(t.id);return Math.abs(late.get(t.id)-es)<1e-9}).map(t=>({id:t.id,title:t.title,duration:durations.get(t.id),earlyStart:early.get(t.id)-durations.get(t.id)}));const baseline=board.scheduleBaseline,changes=[];if(baseline){const old=new Map(baseline.tasks.map(t=>[t.id,t]));for(const t of board.tasks.filter(t=>!t.archived)){const before=old.get(t.id);if(!before){changes.push({id:t.id,title:t.title,change:'Added',beforeStart:'',beforeDue:'',start:t.start||'',due:t.due||'',slipDays:null});continue}old.delete(t.id);if((before.start||'')!==(t.start||'')||(before.due||'')!==(t.due||''))changes.push({id:t.id,title:t.title,change:'Date changed',beforeStart:before.start,beforeDue:before.due,start:t.start||'',due:t.due||'',slipDays:before.due&&t.due?Math.round((Date.parse(t.due)-Date.parse(before.due))/86400000):null})}for(const t of old.values())changes.push({...t,change:'Removed / archived',beforeStart:t.start,beforeDue:t.due,start:'',due:'',slipDays:null})}return {app:'calc-studio-capacity-plan',version:1,board:board.name,createdAt:new Date().toISOString(),weeks:[...weeks.values()].map(w=>({...w,hours:Math.round(w.hours*100)/100,tasks:[...w.tasks],overloaded:w.capacity!==null&&w.hours>w.capacity+0.000001})).sort((a,b)=>a.week.localeCompare(b.week)||a.assignee.localeCompare(b.assignee)),unplanned,critical,dependencyDuration:duration,baselineAt:baseline?.at||null,changes,notice:'Hours are spread evenly over each task’s scheduled days. Critical paths use finish-to-start dependencies and normalized duration units, ignore calendar offsets/resource constraints, and assume one day for undated tasks. This is a planning estimate, not automatic scheduling.'}}","u16PlanningReport");

__studio33.u16PlanningDraw = __studio33.$fn((function u16PlanningDraw(report){__studio33.u16PlanningRows.replaceChildren();const capacity=__studio33.csText('div','');__studio33.u16PlanningRows.append(__studio33.csText('h4','Weekly allocation'),capacity);__studio33.u15Table(capacity,['Assignee','Week starts','Planned hours','Available','Status','Task count'],report.weeks.slice(0,200).map(w=>[w.assignee,w.week,w.hours,w.capacity??'Not configured',w.capacity===null?'Set capacity':w.overloaded?'OVER CAPACITY':'Within capacity',w.tasks.length]));const critical=__studio33.csText('div','');__studio33.u16PlanningRows.append(__studio33.csText('h4','Critical dependency paths'),critical);__studio33.u15Table(critical,['Task','Duration units','Earliest start unit'],report.critical.map(t=>[t.title,t.duration,t.earlyStart]));const changes=__studio33.csText('div','');__studio33.u16PlanningRows.append(__studio33.csText('h4','Changes from baseline'),changes);__studio33.u15Table(changes,['Task','Change','Baseline start / due','Current start / due','Due slip days'],report.changes.slice(0,200).map(c=>[c.title,c.change,(c.beforeStart||'—')+' / '+(c.beforeDue||'—'),(c.start||'—')+' / '+(c.due||'—'),c.slipDays??'—']));if(report.unplanned.length){__studio33.u16PlanningRows.append(__studio33.csText('h4','Unscheduled / no working dates'));for(const t of report.unplanned.slice(0,100))__studio33.u16PlanningRows.append(__studio33.csText('p',t.title+' · '+t.assignee+' · '+t.hours+' hours'))}__studio33.u16PlanningStatus.textContent=report.weeks.filter(w=>w.overloaded).length+' overloaded assignee-weeks · '+report.unplanned.length+' unallocated tasks. '+report.notice}),"function u16PlanningDraw(report){u16PlanningRows.replaceChildren();const capacity=csText('div','');u16PlanningRows.append(csText('h4','Weekly allocation'),capacity);u15Table(capacity,['Assignee','Week starts','Planned hours','Available','Status','Task count'],report.weeks.slice(0,200).map(w=>[w.assignee,w.week,w.hours,w.capacity??'Not configured',w.capacity===null?'Set capacity':w.overloaded?'OVER CAPACITY':'Within capacity',w.tasks.length]));const critical=csText('div','');u16PlanningRows.append(csText('h4','Critical dependency paths'),critical);u15Table(critical,['Task','Duration units','Earliest start unit'],report.critical.map(t=>[t.title,t.duration,t.earlyStart]));const changes=csText('div','');u16PlanningRows.append(csText('h4','Changes from baseline'),changes);u15Table(changes,['Task','Change','Baseline start / due','Current start / due','Due slip days'],report.changes.slice(0,200).map(c=>[c.title,c.change,(c.beforeStart||'—')+' / '+(c.beforeDue||'—'),(c.start||'—')+' / '+(c.due||'—'),c.slipDays??'—']));if(report.unplanned.length){u16PlanningRows.append(csText('h4','Unscheduled / no working dates'));for(const t of report.unplanned.slice(0,100))u16PlanningRows.append(csText('p',t.title+' · '+t.assignee+' · '+t.hours+' hours'))}u16PlanningStatus.textContent=report.weeks.filter(w=>w.overloaded).length+' overloaded assignee-weeks · '+report.unplanned.length+' unallocated tasks. '+report.notice}","u16PlanningDraw");

__studio33.u16StateValidate = __studio33.$fn((function u16StateValidate(s){if(!s||s.version!==1||!Array.isArray(s.loans)||s.loans.length>30||!Array.isArray(s.runs)||s.runs.length>20||JSON.stringify(s).length>8000000)throw Error('Invalid edition 16 saved state');for(const r of s.loans)if(!r||typeof r.id!=='string'||typeof r.name!=='string'||!r.name.trim()||r.name.length>100||!r.config||typeof r.config!=='object')throw Error('Invalid saved loan scenario');for(const r of s.runs)if(!r||typeof r.id!=='string'||typeof r.tool!=='string'||typeof r.name!=='string'||!r.inputs||typeof r.inputs!=='object'||!Number.isFinite(Date.parse(r.at)))throw Error('Invalid saved run');return __studio33.csClone(s)}),"function u16StateValidate(s){if(!s||s.version!==1||!Array.isArray(s.loans)||s.loans.length>30||!Array.isArray(s.runs)||s.runs.length>20||JSON.stringify(s).length>8000000)throw Error('Invalid edition 16 saved state');for(const r of s.loans)if(!r||typeof r.id!=='string'||typeof r.name!=='string'||!r.name.trim()||r.name.length>100||!r.config||typeof r.config!=='object')throw Error('Invalid saved loan scenario');for(const r of s.runs)if(!r||typeof r.id!=='string'||typeof r.tool!=='string'||typeof r.name!=='string'||!r.inputs||typeof r.inputs!=='object'||!Number.isFinite(Date.parse(r.at)))throw Error('Invalid saved run');return csClone(s)}","u16StateValidate");

__studio33.u16StateSave = __studio33.$fn((function u16StateSave(){__studio33.u16StateValidate(__studio33.u16State);if(!__studio33.csPersist(__studio33.u16StateKey,__studio33.u16State))throw Error('Could not save. Export the result or free browser storage.')}),"function u16StateSave(){u16StateValidate(u16State);if(!csPersist(u16StateKey,u16State))throw Error('Could not save. Export the result or free browser storage.')}","u16StateSave");

__studio33.u16LoanSignature = __studio33.$fn((function u16LoanSignature(){return JSON.stringify(__studio33.u16LoanInputs.map(__studio33.$fn(id=>__studio33.$(id).value,"id=>$(id).value","")))}),"function u16LoanSignature(){return JSON.stringify(u16LoanInputs.map(id=>$(id).value))}","u16LoanSignature");

__studio33.u16LoanConfig = __studio33.$fn((function u16LoanConfig(){return {principal:Number(__studio33.$('u16LoanPrincipal').value),rate:Number(__studio33.$('u16LoanAnnual').value),start:__studio33.$('u16LoanStart').value,first:__studio33.$('u16LoanFirst').value,payments:Number(__studio33.$('u16LoanPayments').value),fee:Number(__studio33.$('u16LoanFees').value),frequency:__studio33.$('u16LoanFrequency').value,policy:__studio33.$('u16LoanPolicy').value,events:__studio33.u16Array(__studio33.$('u16LoanEvents').value,200)}}),"function u16LoanConfig(){return {principal:Number($('u16LoanPrincipal').value),rate:Number($('u16LoanAnnual').value),start:$('u16LoanStart').value,first:$('u16LoanFirst').value,payments:Number($('u16LoanPayments').value),fee:Number($('u16LoanFees').value),frequency:$('u16LoanFrequency').value,policy:$('u16LoanPolicy').value,events:u16Array($('u16LoanEvents').value,200)}}","u16LoanConfig");

__studio33.u16MonthlyDate = (function u16MonthlyDate(first,offset){const [y,m,d]=first.split('-').map(Number),dt=new Date(Date.UTC(y,m-1+offset,1,12)),last=new Date(Date.UTC(dt.getUTCFullYear(),dt.getUTCMonth()+1,0)).getUTCDate();dt.setUTCDate(Math.min(d,last));return dt.toISOString().slice(0,10)});

__studio33.u16DatedSchedule = __studio33.$fn((function u16DatedSchedule(config){const c=__studio33.csClone(config);if(![c.principal,c.rate,c.fee].every(Number.isFinite)||c.principal<0.01||c.principal>1e12||c.rate<0||c.rate>1000||c.fee<0||c.fee>1e12||!Number.isInteger(c.payments)||c.payments<1||c.payments>1200||!__studio33.v12Date(c.start)||!__studio33.v12Date(c.first)||c.start>=c.first||!['monthly','weekly','fortnightly'].includes(c.frequency)||!['recast','keep'].includes(c.policy)||!Array.isArray(c.events)||c.events.length>200)throw Error('Use valid dates (start before first payment), principal 0.01–1 trillion, 1–1,200 payments and nonnegative fees/rates');const dates=Array.from({length:c.payments},__studio33.$fn((_,i)=>c.frequency==='monthly'?__studio33.u16MonthlyDate(c.first,i):__studio33.v12Shift(c.first,i*(c.frequency==='weekly'?7:14)),"(_,i)=>c.frequency==='monthly'?u16MonthlyDate(c.first,i):v12Shift(c.first,i*(c.frequency==='weekly'?7:14))","")),last=dates.at(-1);if(last>'9999-12-31')throw Error('Schedule date exceeds year 9999');const rateDates=new Set(),events=c.events.map(__studio33.$fn((e,i)=>{if(!e||!__studio33.v12Date(e.date)||e.date<c.start||e.date>last||!['rate','extra'].includes(e.type)||!Number.isFinite(e.value)||e.value<0||e.type==='rate'&&e.value>1000||e.type==='extra'&&e.value>1e12)throw Error('Events require type rate/extra, an in-term date and a bounded nonnegative numeric value');if(e.type==='rate'){if(rateDates.has(e.date))throw Error('Use only one rate change per date');rateDates.add(e.date)}return {...e,index:i}},"(e,i)=>{if(!e||!v12Date(e.date)||e.date<c.start||e.date>last||!['rate','extra'].includes(e.type)||!Number.isFinite(e.value)||e.value<0||e.type==='rate'&&e.value>1000||e.type==='extra'&&e.value>1e12)throw Error('Events require type rate/extra, an in-term date and a bounded nonnegative numeric value');if(e.type==='rate'){if(rateDates.has(e.date))throw Error('Use only one rate change per date');rateDates.add(e.date)}return {...e,index:i}}","")).sort((a,b)=>a.date.localeCompare(b.date)||a.index-b.index);const round=n=>Math.round((n+Number.EPSILON)*100)/100,periods=c.frequency==='monthly'?12:c.frequency==='fortnightly'?365/14:365/7,emi=(p,rate,n)=>round(rate===0?p/n:p*(rate/100/periods)/(-Math.expm1(-n*Math.log1p(rate/100/periods))));let balance=round(c.principal),rate=c.rate,payment=emi(balance,rate,c.payments),cursor=c.start,accrued=0,eventIndex=0,totalInterest=0,totalPaid=0,extraPaid=0;const rows=[],eventRows=[],initialPayment=payment;const accrue=to=>{const days=Math.round((Date.parse(to)-Date.parse(cursor))/86400000);if(days<0)throw Error('Dates are out of order');accrued+=balance*rate/100*days/365;cursor=to};for(let i=0;i<dates.length&&(balance>0||accrued>0);i++){const date=dates[i];while(eventIndex<events.length&&events[eventIndex].date<=date){const e=events[eventIndex++];accrue(e.date);if(e.type==='rate'){rate=e.value;if(c.policy==='recast')payment=emi(balance,rate,c.payments-i);eventRows.push({date:e.date,type:e.type,value:e.value,applied:e.value,balance})}else{const applied=Math.min(balance,round(e.value));balance=round(balance-applied);extraPaid=round(extraPaid+applied);totalPaid=round(totalPaid+applied);eventRows.push({date:e.date,type:e.type,value:e.value,applied,balance})}}accrue(date);const interest=round(accrued);accrued=0;if(payment<interest&&i<c.payments-1)throw Error('Scheduled payment does not cover accrued interest on '+date);const regular=i===c.payments-1?round(balance+interest):Math.min(round(balance+interest),payment),principal=round(regular-interest);balance=Math.max(0,round(balance-principal));totalInterest=round(totalInterest+interest);totalPaid=round(totalPaid+regular);rows.push({number:i+1,date,rate,payment:regular,interest,principal,balance})}return {configuration:c,initialPayment,finalPayment:rows.at(-1)?.payment||0,regularPayments:rows.length,interest:totalInterest,extraPrincipal:extraPaid,totalPayments:totalPaid,totalCost:round(totalPaid+c.fee),fees:round(c.fee),rows,eventRows,notice:'Actual/365 simple daily accrual, with interest rounded at each scheduled payment. Monthly dates retain the first-payment day with month-end clamping. Upfront fees are not financed. Final payment is adjusted to clear the balance and may be larger than the scheduled payment; this is an estimate.'}}),"function u16DatedSchedule(config){const c=csClone(config);if(![c.principal,c.rate,c.fee].every(Number.isFinite)||c.principal<0.01||c.principal>1e12||c.rate<0||c.rate>1000||c.fee<0||c.fee>1e12||!Number.isInteger(c.payments)||c.payments<1||c.payments>1200||!v12Date(c.start)||!v12Date(c.first)||c.start>=c.first||!['monthly','weekly','fortnightly'].includes(c.frequency)||!['recast','keep'].includes(c.policy)||!Array.isArray(c.events)||c.events.length>200)throw Error('Use valid dates (start before first payment), principal 0.01–1 trillion, 1–1,200 payments and nonnegative fees/rates');const dates=Array.from({length:c.payments},(_,i)=>c.frequency==='monthly'?u16MonthlyDate(c.first,i):v12Shift(c.first,i*(c.frequency==='weekly'?7:14))),last=dates.at(-1);if(last>'9999-12-31')throw Error('Schedule date exceeds year 9999');const rateDates=new Set(),events=c.events.map((e,i)=>{if(!e||!v12Date(e.date)||e.date<c.start||e.date>last||!['rate','extra'].includes(e.type)||!Number.isFinite(e.value)||e.value<0||e.type==='rate'&&e.value>1000||e.type==='extra'&&e.value>1e12)throw Error('Events require type rate/extra, an in-term date and a bounded nonnegative numeric value');if(e.type==='rate'){if(rateDates.has(e.date))throw Error('Use only one rate change per date');rateDates.add(e.date)}return {...e,index:i}}).sort((a,b)=>a.date.localeCompare(b.date)||a.index-b.index);const round=n=>Math.round((n+Number.EPSILON)*100)/100,periods=c.frequency==='monthly'?12:c.frequency==='fortnightly'?365/14:365/7,emi=(p,rate,n)=>round(rate===0?p/n:p*(rate/100/periods)/(-Math.expm1(-n*Math.log1p(rate/100/periods))));let balance=round(c.principal),rate=c.rate,payment=emi(balance,rate,c.payments),cursor=c.start,accrued=0,eventIndex=0,totalInterest=0,totalPaid=0,extraPaid=0;const rows=[],eventRows=[],initialPayment=payment;const accrue=to=>{const days=Math.round((Date.parse(to)-Date.parse(cursor))/86400000);if(days<0)throw Error('Dates are out of order');accrued+=balance*rate/100*days/365;cursor=to};for(let i=0;i<dates.length&&(balance>0||accrued>0);i++){const date=dates[i];while(eventIndex<events.length&&events[eventIndex].date<=date){const e=events[eventIndex++];accrue(e.date);if(e.type==='rate'){rate=e.value;if(c.policy==='recast')payment=emi(balance,rate,c.payments-i);eventRows.push({date:e.date,type:e.type,value:e.value,applied:e.value,balance})}else{const applied=Math.min(balance,round(e.value));balance=round(balance-applied);extraPaid=round(extraPaid+applied);totalPaid=round(totalPaid+applied);eventRows.push({date:e.date,type:e.type,value:e.value,applied,balance})}}accrue(date);const interest=round(accrued);accrued=0;if(payment<interest&&i<c.payments-1)throw Error('Scheduled payment does not cover accrued interest on '+date);const regular=i===c.payments-1?round(balance+interest):Math.min(round(balance+interest),payment),principal=round(regular-interest);balance=Math.max(0,round(balance-principal));totalInterest=round(totalInterest+interest);totalPaid=round(totalPaid+regular);rows.push({number:i+1,date,rate,payment:regular,interest,principal,balance})}return {configuration:c,initialPayment,finalPayment:rows.at(-1)?.payment||0,regularPayments:rows.length,interest:totalInterest,extraPrincipal:extraPaid,totalPayments:totalPaid,totalCost:round(totalPaid+c.fee),fees:round(c.fee),rows,eventRows,notice:'Actual/365 simple daily accrual, with interest rounded at each scheduled payment. Monthly dates retain the first-payment day with month-end clamping. Upfront fees are not financed. Final payment is adjusted to clear the balance and may be larger than the scheduled payment; this is an estimate.'}}","u16DatedSchedule");

__studio33.u16FinanceDraw = __studio33.$fn((function u16FinanceDraw(report){__studio33.u16FinanceRows.replaceChildren(__studio33.csText('p','Initial payment '+report.initialPayment.toFixed(2)+' · final payment '+report.finalPayment.toFixed(2)+' · interest '+report.interest.toFixed(2)+' · total including fees '+report.totalCost.toFixed(2)));const table=__studio33.csText('div','');__studio33.u16FinanceRows.append(table);__studio33.u15Table(table,['#','Due date','Annual %','Payment','Interest','Principal','Balance'],report.rows.slice(0,100).map(r=>[r.number,r.date,r.rate,r.payment.toFixed(2),r.interest.toFixed(2),r.principal.toFixed(2),r.balance.toFixed(2)]));if(report.eventRows.length){const events=__studio33.csText('div','');__studio33.u16FinanceRows.append(__studio33.csText('h4','Applied dated events'),events);__studio33.u15Table(events,['Date','Type','Requested','Applied','Balance'],report.eventRows.map(e=>[e.date,e.type,e.value,e.applied,e.balance]))}__studio33.u16FinanceStatus.textContent=report.rows.length+' scheduled payments; first 100 shown. '+report.notice}),"function u16FinanceDraw(report){u16FinanceRows.replaceChildren(csText('p','Initial payment '+report.initialPayment.toFixed(2)+' · final payment '+report.finalPayment.toFixed(2)+' · interest '+report.interest.toFixed(2)+' · total including fees '+report.totalCost.toFixed(2)));const table=csText('div','');u16FinanceRows.append(table);u15Table(table,['#','Due date','Annual %','Payment','Interest','Principal','Balance'],report.rows.slice(0,100).map(r=>[r.number,r.date,r.rate,r.payment.toFixed(2),r.interest.toFixed(2),r.principal.toFixed(2),r.balance.toFixed(2)]));if(report.eventRows.length){const events=csText('div','');u16FinanceRows.append(csText('h4','Applied dated events'),events);u15Table(events,['Date','Type','Requested','Applied','Balance'],report.eventRows.map(e=>[e.date,e.type,e.value,e.applied,e.balance]))}u16FinanceStatus.textContent=report.rows.length+' scheduled payments; first 100 shown. '+report.notice}","u16FinanceDraw");

__studio33.u16LoanSavedRender = __studio33.$fn((function u16LoanSavedRender(){__studio33.v12Opt(__studio33.$('u16LoanSaved'),[['','Choose saved scenario'],...__studio33.u16State.loans.map(s=>[s.id,s.name])],__studio33.$('u16LoanSaved').value)}),"function u16LoanSavedRender(){v12Opt($('u16LoanSaved'),[['','Choose saved scenario'],...u16State.loans.map(s=>[s.id,s.name])],$('u16LoanSaved').value)}","u16LoanSavedRender");

__studio33.u16CrossRulesValidate = __studio33.$fn((function u16CrossRulesValidate(rules,fields){if(!Array.isArray(rules)||rules.length>100)throw Error('Use up to 100 cross-field rules');const ids=new Map(fields.map(f=>[f.id,f]));for(const r of rules){if(!r||typeof r!=='object'||!ids.has(r.left)||!['equals','notEquals','lt','lte','gt','gte','requiredIf'].includes(r.op)||typeof r.message!=='string'||!r.message.trim()||r.message.length>500)throw Error('Each rule needs left field ID, a valid op and a message');if(r.op==='requiredIf'){if(!ids.has(r.when)||!['string','number','boolean'].includes(typeof r.equals))throw Error('requiredIf needs when field ID and scalar equals')}else{if(!ids.has(r.right))throw Error('Rule right field ID not found');if(['lt','lte','gt','gte'].includes(r.op)){const a=ids.get(r.left),b=ids.get(r.right);if(a.type!==b.type||!['number','date'].includes(a.type))throw Error('Ordered comparisons need two number fields or two date fields')}}}return __studio33.csClone(rules)}),"function u16CrossRulesValidate(rules,fields){if(!Array.isArray(rules)||rules.length>100)throw Error('Use up to 100 cross-field rules');const ids=new Map(fields.map(f=>[f.id,f]));for(const r of rules){if(!r||typeof r!=='object'||!ids.has(r.left)||!['equals','notEquals','lt','lte','gt','gte','requiredIf'].includes(r.op)||typeof r.message!=='string'||!r.message.trim()||r.message.length>500)throw Error('Each rule needs left field ID, a valid op and a message');if(r.op==='requiredIf'){if(!ids.has(r.when)||!['string','number','boolean'].includes(typeof r.equals))throw Error('requiredIf needs when field ID and scalar equals')}else{if(!ids.has(r.right))throw Error('Rule right field ID not found');if(['lt','lte','gt','gte'].includes(r.op)){const a=ids.get(r.left),b=ids.get(r.right);if(a.type!==b.type||!['number','date'].includes(a.type))throw Error('Ordered comparisons need two number fields or two date fields')}}}return csClone(rules)}","u16CrossRulesValidate");

__studio33.u16CrossCheck = (function u16CrossCheck(rules,answers,inactive=[]){const hidden=new Set(inactive),issues=[];for(const r of rules){if(hidden.has(r.left)||hidden.has(r.op==='requiredIf'?r.when:r.right))continue;const a=answers[r.left],b=answers[r.right],blank=v=>v===undefined||v===null||v==='';let pass=true;if(r.op==='requiredIf'){if(answers[r.when]===r.equals)pass=!blank(a)&&a!==false}else if(!blank(a)&&!blank(b)){if(r.op==='equals')pass=a===b;else if(r.op==='notEquals')pass=a!==b;else if(r.op==='lt')pass=a<b;else if(r.op==='lte')pass=a<=b;else if(r.op==='gt')pass=a>b;else if(r.op==='gte')pass=a>=b}if(!pass)issues.push({field:r.left,message:r.message})}return issues});

__studio33.u16MapResponses = __studio33.$fn((async function u16MapResponses(responses,target,mappings){if(target.version!==2)throw Error('Target must contain a versioned form definition');const targetFields=target.fields,ids=new Set(targetFields.map(f=>f.id)),sourceIds=new Set(__studio33.rdFields(responses).map(f=>f.id)),used=new Set();if(!Array.isArray(mappings)||mappings.length>100)throw Error('Use up to 100 field mappings');for(const m of mappings){if(!m||!sourceIds.has(m.from)||!ids.has(m.to)||used.has(m.to))throw Error('Mappings need existing source/target IDs and unique targets');used.add(m.to)}const results=responses.map(__studio33.$fn(r=>{const fields=__studio33.rdFields([r]),answers={};for(const m of mappings){const f=fields.find(f=>f.id===m.from),value=__studio33.rdAnswer(r,f);if(value!==undefined&&!r.inactiveFields?.includes(m.from))answers[m.to]=value}const inactive=[];for(const f of targetFields){if(f.condition&&(inactive.includes(f.condition.field)||String(answers[f.condition.field]??'')!==f.condition.value)){inactive.push(f.id);delete answers[f.id]}}const response=Object.fromEntries(targetFields.filter(f=>!inactive.includes(f.id)&&Object.hasOwn(answers,f.id)).map(f=>[f.label,answers[f.id]]));return __studio33.rdNormalize({app:'calc-studio-form-response',version:2,formId:target.formId,formVersion:target.formVersion,formTitle:target.formTitle,fields:__studio33.csClone(targetFields),crossRules:__studio33.csClone(target.crossRules||[]),answers,response,inactiveFields:inactive,submittedAt:r.submittedAt||new Date().toISOString(),migration:{sourceGroup:__studio33.rdGroup(r),mappedAt:new Date().toISOString()}})},"r=>{const fields=rdFields([r]),answers={};for(const m of mappings){const f=fields.find(f=>f.id===m.from),value=rdAnswer(r,f);if(value!==undefined&&!r.inactiveFields?.includes(m.from))answers[m.to]=value}const inactive=[];for(const f of targetFields){if(f.condition&&(inactive.includes(f.condition.field)||String(answers[f.condition.field]??'')!==f.condition.value)){inactive.push(f.id);delete answers[f.id]}}const response=Object.fromEntries(targetFields.filter(f=>!inactive.includes(f.id)&&Object.hasOwn(answers,f.id)).map(f=>[f.label,answers[f.id]]));return rdNormalize({app:'calc-studio-form-response',version:2,formId:target.formId,formVersion:target.formVersion,formTitle:target.formTitle,fields:csClone(targetFields),crossRules:csClone(target.crossRules||[]),answers,response,inactiveFields:inactive,submittedAt:r.submittedAt||new Date().toISOString(),migration:{sourceGroup:rdGroup(r),mappedAt:new Date().toISOString()}})}",""));const quality=await __studio33.u16ResponseQuality(results);for(const [i,r]of results.entries())for(const issue of __studio33.u16CrossCheck(r.crossRules,r.answers,r.inactiveFields)){quality.issueCount++;if(quality.errors.length<2000)quality.errors.push({response:i+1,field:issue.field,message:issue.message})}return {results,quality}}),"async function u16MapResponses(responses,target,mappings){if(target.version!==2)throw Error('Target must contain a versioned form definition');const targetFields=target.fields,ids=new Set(targetFields.map(f=>f.id)),sourceIds=new Set(rdFields(responses).map(f=>f.id)),used=new Set();if(!Array.isArray(mappings)||mappings.length>100)throw Error('Use up to 100 field mappings');for(const m of mappings){if(!m||!sourceIds.has(m.from)||!ids.has(m.to)||used.has(m.to))throw Error('Mappings need existing source/target IDs and unique targets');used.add(m.to)}const results=responses.map(r=>{const fields=rdFields([r]),answers={};for(const m of mappings){const f=fields.find(f=>f.id===m.from),value=rdAnswer(r,f);if(value!==undefined&&!r.inactiveFields?.includes(m.from))answers[m.to]=value}const inactive=[];for(const f of targetFields){if(f.condition&&(inactive.includes(f.condition.field)||String(answers[f.condition.field]??'')!==f.condition.value)){inactive.push(f.id);delete answers[f.id]}}const response=Object.fromEntries(targetFields.filter(f=>!inactive.includes(f.id)&&Object.hasOwn(answers,f.id)).map(f=>[f.label,answers[f.id]]));return rdNormalize({app:'calc-studio-form-response',version:2,formId:target.formId,formVersion:target.formVersion,formTitle:target.formTitle,fields:csClone(targetFields),crossRules:csClone(target.crossRules||[]),answers,response,inactiveFields:inactive,submittedAt:r.submittedAt||new Date().toISOString(),migration:{sourceGroup:rdGroup(r),mappedAt:new Date().toISOString()}})});const quality=await u16ResponseQuality(results);for(const [i,r]of results.entries())for(const issue of u16CrossCheck(r.crossRules,r.answers,r.inactiveFields)){quality.issueCount++;if(quality.errors.length<2000)quality.errors.push({response:i+1,field:issue.field,message:issue.message})}return {results,quality}}","u16MapResponses");

__studio33.u16ResponseQuality = __studio33.$fn((function u16ResponseQuality(responses){return new Promise(__studio33.$fn((resolve,reject)=>{const url=URL.createObjectURL(new Blob(['self.onmessage=e=>{try{self.postMessage({ok:true,result:('+__studio33.u15FormQualityJob.toString()+')(e.data)})}catch(error){self.postMessage({ok:false,error:error.message})}}'],{type:'text/javascript'}));let worker;try{worker=__studio33.u24CreateWorker(url)}catch(e){URL.revokeObjectURL(url);reject(Error('Response validation needs browser Worker support'));return}const timer=setTimeout(()=>finish(Error('Validation stopped after 3 seconds. Simplify field patterns or reduce responses.')),3000);function finish(error,result){clearTimeout(timer);worker.terminate();URL.revokeObjectURL(url);error?reject(error):resolve(result)}worker.onmessage=e=>e.data.ok?finish(null,e.data.result):finish(Error(e.data.error));worker.onerror=()=>finish(Error('Response validation worker failed'));worker.postMessage({responses})},"(resolve,reject)=>{const url=URL.createObjectURL(new Blob(['self.onmessage=e=>{try{self.postMessage({ok:true,result:('+u15FormQualityJob.toString()+')(e.data)})}catch(error){self.postMessage({ok:false,error:error.message})}}'],{type:'text/javascript'}));let worker;try{worker=u24CreateWorker(url)}catch(e){URL.revokeObjectURL(url);reject(Error('Response validation needs browser Worker support'));return}const timer=setTimeout(()=>finish(Error('Validation stopped after 3 seconds. Simplify field patterns or reduce responses.')),3000);function finish(error,result){clearTimeout(timer);worker.terminate();URL.revokeObjectURL(url);error?reject(error):resolve(result)}worker.onmessage=e=>e.data.ok?finish(null,e.data.result):finish(Error(e.data.error));worker.onerror=()=>finish(Error('Response validation worker failed'));worker.postMessage({responses})}",""))}),"function u16ResponseQuality(responses){return new Promise((resolve,reject)=>{const url=URL.createObjectURL(new Blob(['self.onmessage=e=>{try{self.postMessage({ok:true,result:('+u15FormQualityJob.toString()+')(e.data)})}catch(error){self.postMessage({ok:false,error:error.message})}}'],{type:'text/javascript'}));let worker;try{worker=u24CreateWorker(url)}catch(e){URL.revokeObjectURL(url);reject(Error('Response validation needs browser Worker support'));return}const timer=setTimeout(()=>finish(Error('Validation stopped after 3 seconds. Simplify field patterns or reduce responses.')),3000);function finish(error,result){clearTimeout(timer);worker.terminate();URL.revokeObjectURL(url);error?reject(error):resolve(result)}worker.onmessage=e=>e.data.ok?finish(null,e.data.result):finish(Error(e.data.error));worker.onerror=()=>finish(Error('Response validation worker failed'));worker.postMessage({responses})})}","u16ResponseQuality");

__studio33.u16HistoryRender = __studio33.$fn((function u16HistoryRender(){__studio33.v12Opt(__studio33.$('u16HistorySaved'),[['','Choose saved run'],...__studio33.u16State.runs.map(__studio33.$fn(r=>[r.id,r.name+' · '+__studio33.views[r.tool]],"r=>[r.id,r.name+' · '+views[r.tool]]",""))],__studio33.$('u16HistorySaved').value)}),"function u16HistoryRender(){v12Opt($('u16HistorySaved'),[['','Choose saved run'],...u16State.runs.map(r=>[r.id,r.name+' · '+views[r.tool]])],$('u16HistorySaved').value)}","u16HistoryRender");

__studio33.u16SelectedRun = __studio33.$fn((function u16SelectedRun(){const r=__studio33.u16State.runs.find(__studio33.$fn(r=>r.id===__studio33.$('u16HistorySaved').value,"r=>r.id===$('u16HistorySaved').value",""));if(!r)throw Error('Choose a saved run');return r}),"function u16SelectedRun(){const r=u16State.runs.find(r=>r.id===$('u16HistorySaved').value);if(!r)throw Error('Choose a saved run');return r}","u16SelectedRun");

__studio33.u17SetRole = (function u17SetRole(b,role){if(b.dataset.u17Role!==role)b.dataset.u17Role=role});

__studio33.u17Menu = __studio33.$fn((function u17Menu(summary,cls,items){const d=__studio33.csText('details','',cls),s=__studio33.csText('summary',summary),body=__studio33.csText('div','');d.append(s,body);body.append(...items);body.addEventListener('click',e=>{if(e.target.closest('button'))d.open=false});return d}),"function u17Menu(summary,cls,items){const d=csText('details','',cls),s=csText('summary',summary),body=csText('div','');d.append(s,body);body.append(...items);body.addEventListener('click',e=>{if(e.target.closest('button'))d.open=false});return d}","u17Menu");

__studio33.u17SuiteOptions = __studio33.$fn((function u17SuiteOptions(){for(const home of Object.keys(__studio33.v12Suites)){const record=__studio33.u17Panels.get(home),target=__studio33.u17Panels.get(__studio33.v12Last[home]);if(!record||!target)continue;const box=record.advanced;if(!box.isConnected)continue;if(record===target){box.classList.remove('u17-workspace-options');box.querySelector(':scope>summary').textContent='Advanced & help';if(box.parentElement!==record.panel)record.panel.append(box);continue}box.classList.add('u17-workspace-options');box.querySelector(':scope>summary').textContent='Workspace settings';if(!target.advanced.isConnected)target.panel.append(target.advanced);if(box.parentElement!==target.advanced)target.advanced.append(box)}}),"function u17SuiteOptions(){for(const home of Object.keys(v12Suites)){const record=u17Panels.get(home),target=u17Panels.get(v12Last[home]);if(!record||!target)continue;const box=record.advanced;if(!box.isConnected)continue;if(record===target){box.classList.remove('u17-workspace-options');box.querySelector(':scope>summary').textContent='Advanced & help';if(box.parentElement!==record.panel)record.panel.append(box);continue}box.classList.add('u17-workspace-options');box.querySelector(':scope>summary').textContent='Workspace settings';if(!target.advanced.isConnected)target.panel.append(target.advanced);if(box.parentElement!==target.advanced)target.advanced.append(box)}}","u17SuiteOptions");

__studio33.u17Reveal = (function u17Reveal(e){for(let d=e.closest('details');d;d=d.parentElement?.closest('details'))if(!d.open)d.open=true});

__studio33.u18Array = (function u18Array(x,max,label='items'){if(!Array.isArray(x)||x.length>max)throw Error('Use at most '+max+' '+label);return x});

__studio33.u18Read = __studio33.$fn((function u18Read(s){if(typeof s!=='string'||s.length>2097152)throw Error('Input limit: 2 MiB');return __studio33.u16JSON(s)}),"function u18Read(s){if(typeof s!=='string'||s.length>2097152)throw Error('Input limit: 2 MiB');return u16JSON(s)}","u18Read");

__studio33.u18NodeEqual = __studio33.$fn((function u18NodeEqual(a,b){return a===undefined||b===undefined?a===b:__studio33.emitDeveloperJSON(a,'',true)===__studio33.emitDeveloperJSON(b,'',true)}),"function u18NodeEqual(a,b){return a===undefined||b===undefined?a===b:emitDeveloperJSON(a,'',true)===emitDeveloperJSON(b,'',true)}","u18NodeEqual");

__studio33.u18Get = __studio33.$fn((function u18Get(root,path){if(typeof path!=='string')throw Error('A JSON Pointer is required');try{return __studio33.nodeAtJSONPointer(root,path)}catch(e){__studio33.u15PointerParts(path);return undefined}}),"function u18Get(root,path){if(typeof path!=='string')throw Error('A JSON Pointer is required');try{return nodeAtJSONPointer(root,path)}catch(e){u15PointerParts(path);return undefined}}","u18Get");

__studio33.u18Scalar = __studio33.$fn((function u18Scalar(n){if(!n||n.type==='null')return '';if(n.type==='string')return n.value;if(n.type==='number')return n.raw??__studio33.emitDeveloperJSON(n);if(n.type==='boolean')return String(n.value);throw Error('Expected a primitive value')}),"function u18Scalar(n){if(!n||n.type==='null')return '';if(n.type==='string')return n.value;if(n.type==='number')return n.raw??emitDeveloperJSON(n);if(n.type==='boolean')return String(n.value);throw Error('Expected a primitive value')}","u18Scalar");

__studio33.u18Decimal = (function u18Decimal(n,scale){const sign=n<0n?'-':'';let s=String(n<0n?-n:n);if(scale<0)return sign+s+'0'.repeat(-scale);s=s.padStart(scale+1,'0');return sign+(scale?s.slice(0,-scale)+'.'+s.slice(-scale):s)});

__studio33.u18Math = __studio33.$fn((function u18Math(op,values){if(!values.length)throw Error('Arithmetic needs operands');const a=values.map(__studio33.$fn(n=>{if(n?.type!=='number')throw Error('Arithmetic requires JSON numbers');const d=__studio33.rcDecimal(__studio33.u18Scalar(n));if(!d)throw Error('Unsupported decimal');return d},"n=>{if(n?.type!=='number')throw Error('Arithmetic requires JSON numbers');const d=rcDecimal(u18Scalar(n));if(!d)throw Error('Unsupported decimal');return d}",""));let scale=Math.max(...a.map(x=>x.scale)),n;if(op==='multiply'){n=1n;scale=0;for(const x of a){n*=x.n;scale+=x.scale}}else{n=a[0].n*10n**BigInt(scale-a[0].scale);for(const x of a.slice(1))n+=(op==='subtract'?-1n:1n)*x.n*10n**BigInt(scale-x.scale)}return __studio33.strictJSON(__studio33.u18Decimal(n,scale))}),"function u18Math(op,values){if(!values.length)throw Error('Arithmetic needs operands');const a=values.map(n=>{if(n?.type!=='number')throw Error('Arithmetic requires JSON numbers');const d=rcDecimal(u18Scalar(n));if(!d)throw Error('Unsupported decimal');return d});let scale=Math.max(...a.map(x=>x.scale)),n;if(op==='multiply'){n=1n;scale=0;for(const x of a){n*=x.n;scale+=x.scale}}else{n=a[0].n*10n**BigInt(scale-a[0].scale);for(const x of a.slice(1))n+=(op==='subtract'?-1n:1n)*x.n*10n**BigInt(scale-x.scale)}return strictJSON(u18Decimal(n,scale))}","u18Math");

__studio33.u18Put = __studio33.$fn((function u18Put(root,path,value){const parts=__studio33.u15PointerParts(path);if(!parts.length)throw Error('Target an object property, not the root');let node=root;for(const key of parts.slice(0,-1)){if(node.type!=='object')throw Error('Target paths traverse objects only');let next=node.entries.find(e=>e[0]===key)?.[1];if(!next){next={type:'object',entries:[]};node.entries.push([key,next])}node=next}if(node.type!=='object')throw Error('Target parent is not an object');const key=parts.at(-1);if(node.entries.some(e=>e[0]===key))throw Error('Duplicate or overlapping target '+path);node.entries.push([key,value])}),"function u18Put(root,path,value){const parts=u15PointerParts(path);if(!parts.length)throw Error('Target an object property, not the root');let node=root;for(const key of parts.slice(0,-1)){if(node.type!=='object')throw Error('Target paths traverse objects only');let next=node.entries.find(e=>e[0]===key)?.[1];if(!next){next={type:'object',entries:[]};node.entries.push([key,next])}node=next}if(node.type!=='object')throw Error('Target parent is not an object');const key=parts.at(-1);if(node.entries.some(e=>e[0]===key))throw Error('Duplicate or overlapping target '+path);node.entries.push([key,value])}","u18Put");

__studio33.u18Expr = __studio33.$fn((function u18Expr(expr,root,budget={left:20000},depth=0){if(depth>20||--budget.left<0)throw Error('Expression complexity limit');if(!expr||typeof expr!=='object'||Array.isArray(expr))throw Error('Use a declarative expression object');if(Object.hasOwn(expr,'literal'))return __studio33.strictJSON(JSON.stringify(expr.literal));if(Object.hasOwn(expr,'path'))return __studio33.u18Get(root,expr.path);const args=__studio33.u18Array(expr.args||[],50,'expression operands'),evalArg=__studio33.$fn(i=>__studio33.u18Expr(args[i],root,budget,depth+1),"i=>u18Expr(args[i],root,budget,depth+1)","evalArg"),boolean=value=>({type:'boolean',value});
 if(expr.op==='if'){if(args.length!==3)throw Error('If needs condition, true and false expressions');const n=evalArg(0);if(n?.type!=='boolean')throw Error('If condition must be boolean');return evalArg(n.value?1:2)}
 if(expr.op==='coalesce'){for(let i=0;i<args.length;i++){const n=evalArg(i);if(n&&n.type!=='null'&&!(n.type==='string'&&!n.value))return n}return {type:'null',value:null}}
 if(expr.op==='exists')return boolean(!!evalArg(0));
 if(expr.op==='map'){const source=__studio33.u18Get(root,expr.from);if(source?.type!=='array')throw Error('Map source must be an array');__studio33.u18Array(source.items,500,'array items');return {type:'array',items:source.items.map(__studio33.$fn(n=>__studio33.u18MapNode(n,expr.rules,budget,depth+1),"n=>u18MapNode(n,expr.rules,budget,depth+1)",""))}}
 const values=args.map((_,i)=>evalArg(i));if(['sum','subtract','multiply'].includes(expr.op))return __studio33.u18Math(expr.op,values);
 if(expr.op==='concat')return {type:'string',value:values.map(__studio33.u18Scalar).join(expr.separator??'')};
 if(['upper','lower','trim'].includes(expr.op)){if(values.length!==1)throw Error('Text operation needs one argument');const s=__studio33.u18Scalar(values[0]);return {type:'string',value:expr.op==='upper'?s.toUpperCase():expr.op==='lower'?s.toLowerCase():s.trim()}}
 if(expr.op==='date'){const s=__studio33.u18Scalar(values[0]);if(!__studio33.v12Date(s))throw Error('Date expression requires YYYY-MM-DD');const [y,m,d]=s.split('-');if(!['YYYY-MM-DD','DD/MM/YYYY','MM/DD/YYYY'].includes(expr.format))throw Error('Unsupported date format');return {type:'string',value:expr.format==='DD/MM/YYYY'?d+'/'+m+'/'+y:expr.format==='MM/DD/YYYY'?m+'/'+d+'/'+y:s}}
 if(expr.op==='eq')return boolean(__studio33.u18NodeEqual(values[0],values[1]));
 if(['gt','gte','lt','lte'].includes(expr.op)){const a=values[0],b=values[1];if(!a||!b||a.type!==b.type||!['number','string'].includes(a.type))throw Error('Compare matching number or string types');const c=a.type==='number'?__studio33.u15DecimalCompare(__studio33.u18Scalar(a),__studio33.u18Scalar(b)):a.value<b.value?-1:a.value>b.value?1:0;return boolean(expr.op==='gt'?c>0:expr.op==='gte'?c>=0:expr.op==='lt'?c<0:c<=0)}
 if(expr.op==='not'){if(values[0]?.type!=='boolean')throw Error('Not needs a boolean');return boolean(!values[0].value)}
 throw Error('Unsupported expression operation '+expr.op)
}),"function u18Expr(expr,root,budget={left:20000},depth=0){if(depth>20||--budget.left<0)throw Error('Expression complexity limit');if(!expr||typeof expr!=='object'||Array.isArray(expr))throw Error('Use a declarative expression object');if(Object.hasOwn(expr,'literal'))return strictJSON(JSON.stringify(expr.literal));if(Object.hasOwn(expr,'path'))return u18Get(root,expr.path);const args=u18Array(expr.args||[],50,'expression operands'),evalArg=i=>u18Expr(args[i],root,budget,depth+1),boolean=value=>({type:'boolean',value});\n if(expr.op==='if'){if(args.length!==3)throw Error('If needs condition, true and false expressions');const n=evalArg(0);if(n?.type!=='boolean')throw Error('If condition must be boolean');return evalArg(n.value?1:2)}\n if(expr.op==='coalesce'){for(let i=0;i<args.length;i++){const n=evalArg(i);if(n&&n.type!=='null'&&!(n.type==='string'&&!n.value))return n}return {type:'null',value:null}}\n if(expr.op==='exists')return boolean(!!evalArg(0));\n if(expr.op==='map'){const source=u18Get(root,expr.from);if(source?.type!=='array')throw Error('Map source must be an array');u18Array(source.items,500,'array items');return {type:'array',items:source.items.map(n=>u18MapNode(n,expr.rules,budget,depth+1))}}\n const values=args.map((_,i)=>evalArg(i));if(['sum','subtract','multiply'].includes(expr.op))return u18Math(expr.op,values);\n if(expr.op==='concat')return {type:'string',value:values.map(u18Scalar).join(expr.separator??'')};\n if(['upper','lower','trim'].includes(expr.op)){if(values.length!==1)throw Error('Text operation needs one argument');const s=u18Scalar(values[0]);return {type:'string',value:expr.op==='upper'?s.toUpperCase():expr.op==='lower'?s.toLowerCase():s.trim()}}\n if(expr.op==='date'){const s=u18Scalar(values[0]);if(!v12Date(s))throw Error('Date expression requires YYYY-MM-DD');const [y,m,d]=s.split('-');if(!['YYYY-MM-DD','DD/MM/YYYY','MM/DD/YYYY'].includes(expr.format))throw Error('Unsupported date format');return {type:'string',value:expr.format==='DD/MM/YYYY'?d+'/'+m+'/'+y:expr.format==='MM/DD/YYYY'?m+'/'+d+'/'+y:s}}\n if(expr.op==='eq')return boolean(u18NodeEqual(values[0],values[1]));\n if(['gt','gte','lt','lte'].includes(expr.op)){const a=values[0],b=values[1];if(!a||!b||a.type!==b.type||!['number','string'].includes(a.type))throw Error('Compare matching number or string types');const c=a.type==='number'?u15DecimalCompare(u18Scalar(a),u18Scalar(b)):a.value<b.value?-1:a.value>b.value?1:0;return boolean(expr.op==='gt'?c>0:expr.op==='gte'?c>=0:expr.op==='lt'?c<0:c<=0)}\n if(expr.op==='not'){if(values[0]?.type!=='boolean')throw Error('Not needs a boolean');return boolean(!values[0].value)}\n throw Error('Unsupported expression operation '+expr.op)\n}","u18Expr");

__studio33.u18MapNode = __studio33.$fn((function u18MapNode(root,rules,budget={left:20000},depth=0){const out={type:'object',entries:[]};for(const r of __studio33.u18Array(rules,100,'mapping rules')){if(!r||typeof r.to!=='string')throw Error('Each mapping needs a target pointer');const value=__studio33.u18Expr(r.value,root,budget,depth);if(value===undefined){if(r.required)throw Error('Required value is missing for '+r.to);continue}__studio33.u18Put(out,r.to,value)}return out}),"function u18MapNode(root,rules,budget={left:20000},depth=0){const out={type:'object',entries:[]};for(const r of u18Array(rules,100,'mapping rules')){if(!r||typeof r.to!=='string')throw Error('Each mapping needs a target pointer');const value=u18Expr(r.value,root,budget,depth);if(value===undefined){if(r.required)throw Error('Required value is missing for '+r.to);continue}u18Put(out,r.to,value)}return out}","u18MapNode");

__studio33.u18MapText = __studio33.$fn((function u18MapText(source,rules){if(typeof source!=='string'||source.length>2097152)throw Error('Mapping input limit: 2 MiB');const root=__studio33.strictJSON(source),result=__studio33.u18MapNode(root,rules),text=__studio33.emitDeveloperJSON(result,'  ');if(text.length>8388608)throw Error('Mapping output limit: 8 MiB');return text}),"function u18MapText(source,rules){if(typeof source!=='string'||source.length>2097152)throw Error('Mapping input limit: 2 MiB');const root=strictJSON(source),result=u18MapNode(root,rules),text=emitDeveloperJSON(result,'  ');if(text.length>8388608)throw Error('Mapping output limit: 8 MiB');return text}","u18MapText");

__studio33.u18ReadTable = __studio33.$fn((function u18ReadTable(text){return __studio33.dwParse(text,text.trim().startsWith('[')?'json':'csv')}),"function u18ReadTable(text){return dwParse(text,text.trim().startsWith('[')?'json':'csv')}","u18ReadTable");

__studio33.u18Column = (function u18Column(t,name){const i=t.columns.indexOf(name);if(i<0)throw Error('Unknown column '+name);return i});

__studio33.u18ExprPaths = __studio33.$fn((function u18ExprPaths(x,out=new Set()){if(x&&typeof x==='object'){if(typeof x.path==='string')out.add(__studio33.u15PointerParts(x.path)[0]);if(typeof x.from==='string')out.add(__studio33.u15PointerParts(x.from)[0]);for(const v of Object.values(x))if(v&&typeof v==='object')__studio33.u18ExprPaths(v,out)}return out}),"function u18ExprPaths(x,out=new Set()){if(x&&typeof x==='object'){if(typeof x.path==='string')out.add(u15PointerParts(x.path)[0]);if(typeof x.from==='string')out.add(u15PointerParts(x.from)[0]);for(const v of Object.values(x))if(v&&typeof v==='object')u18ExprPaths(v,out)}return out}","u18ExprPaths");

__studio33.u18ThreeWay = __studio33.$fn((function u18ThreeWay(base,local,remote,choices={}){const conflicts=[];function merge(b,l,r,path){if(__studio33.u18NodeEqual(l,r))return l;if(__studio33.u18NodeEqual(l,b))return r;if(__studio33.u18NodeEqual(r,b))return l;if(l?.type==='object'&&r?.type==='object'&&(!b||b.type==='object')){const bm=new Map(b?.entries||[]),lm=new Map(l.entries),rm=new Map(r.entries),entries=[];for(const k of new Set([...bm.keys(),...lm.keys(),...rm.keys()])){const v=merge(bm.get(k),lm.get(k),rm.get(k),path+'/'+__studio33.jsonPointerSegment(k));if(v!==undefined)entries.push([k,v])}return {type:'object',entries}}const c={path,base:b,local:l,remote:r},choice=choices[path];conflicts.push(c);if(!choice)return b;if(choice.side==='manual')return __studio33.strictJSON(choice.value);if(!['base','local','remote'].includes(choice.side))throw Error('Invalid merge decision');return c[choice.side]}
 const result=merge(base,local,remote,'');if(conflicts.length>500)throw Error('Merge limit: 500 conflicts');return {result,conflicts,unresolved:conflicts.filter(c=>!choices[c.path]).length}
}),"function u18ThreeWay(base,local,remote,choices={}){const conflicts=[];function merge(b,l,r,path){if(u18NodeEqual(l,r))return l;if(u18NodeEqual(l,b))return r;if(u18NodeEqual(r,b))return l;if(l?.type==='object'&&r?.type==='object'&&(!b||b.type==='object')){const bm=new Map(b?.entries||[]),lm=new Map(l.entries),rm=new Map(r.entries),entries=[];for(const k of new Set([...bm.keys(),...lm.keys(),...rm.keys()])){const v=merge(bm.get(k),lm.get(k),rm.get(k),path+'/'+jsonPointerSegment(k));if(v!==undefined)entries.push([k,v])}return {type:'object',entries}}const c={path,base:b,local:l,remote:r},choice=choices[path];conflicts.push(c);if(!choice)return b;if(choice.side==='manual')return strictJSON(choice.value);if(!['base','local','remote'].includes(choice.side))throw Error('Invalid merge decision');return c[choice.side]}\n const result=merge(base,local,remote,'');if(conflicts.length>500)throw Error('Merge limit: 500 conflicts');return {result,conflicts,unresolved:conflicts.filter(c=>!choices[c.path]).length}\n}","u18ThreeWay");

__studio33.u18TextMerge = __studio33.$fn((function u18TextMerge(base,local,remote,choices={}){if([base,local,remote].some(s=>typeof s!=='string'||s.length>2097152))throw Error('Text merge input limit: 2 MiB per document');const a=base.split('\n'),b=local.split('\n'),c=remote.split('\n');if(a.length===b.length&&a.length===c.length){const n=x=>({type:'string',value:x}),rows=[],conflicts=[];for(let i=0;i<a.length;i++){const r=__studio33.u18ThreeWay(n(a[i]),n(b[i]),n(c[i]),{'':choices['/'+i]});rows.push(r.result?.value??'');conflicts.push(...r.conflicts.map(x=>({...x,path:'/'+i})));if(conflicts.length>500)throw Error('Merge limit: 500 conflicts')}return {text:rows.join('\n'),conflicts,unresolved:conflicts.filter(c=>!choices[c.path]).length}}const n=x=>({type:'string',value:x}),r=__studio33.u18ThreeWay(n(base),n(local),n(remote),{'':choices['']});return {...r,text:r.result?.value??''}}),"function u18TextMerge(base,local,remote,choices={}){if([base,local,remote].some(s=>typeof s!=='string'||s.length>2097152))throw Error('Text merge input limit: 2 MiB per document');const a=base.split('\\n'),b=local.split('\\n'),c=remote.split('\\n');if(a.length===b.length&&a.length===c.length){const n=x=>({type:'string',value:x}),rows=[],conflicts=[];for(let i=0;i<a.length;i++){const r=u18ThreeWay(n(a[i]),n(b[i]),n(c[i]),{'':choices['/'+i]});rows.push(r.result?.value??'');conflicts.push(...r.conflicts.map(x=>({...x,path:'/'+i})));if(conflicts.length>500)throw Error('Merge limit: 500 conflicts')}return {text:rows.join('\\n'),conflicts,unresolved:conflicts.filter(c=>!choices[c.path]).length}}const n=x=>({type:'string',value:x}),r=u18ThreeWay(n(base),n(local),n(remote),{'':choices['']});return {...r,text:r.result?.value??''}}","u18TextMerge");

__studio33.u18Dice = (function u18Dice(a,b){a=String(a).normalize('NFKC').toLowerCase().replace(/\s+/g,' ').trim().slice(0,200);b=String(b).normalize('NFKC').toLowerCase().replace(/\s+/g,' ').trim().slice(0,200);if(!a||!b)return 0;if(a===b)return 1;if(a.length<2||b.length<2)return 0;const counts=new Map();for(let i=0;i<a.length-1;i++)counts.set(a.slice(i,i+2),(counts.get(a.slice(i,i+2))||0)+1);let shared=0;for(let i=0;i<b.length-1;i++){const key=b.slice(i,i+2),n=counts.get(key)||0;if(n){shared++;counts.set(key,n-1)}}return 2*shared/(a.length+b.length-2)});

__studio33.u18MatchJob = __studio33.$fn((function u18MatchJob(data){const {left,right,rules,threshold}=data;if(!Array.isArray(left)||!Array.isArray(right)||left.length>500||right.length>500||left.length*right.length>250000||!Array.isArray(rules)||!rules.length||rules.length>10||!Number.isFinite(threshold)||threshold<0||threshold>1)throw Error('Match limit: 500 rows each, 1–10 rules, score 0–1');for(const r of rules)if(!['text','decimal','date'].includes(r.mode)||!Number.isInteger(r.left)||!Number.isInteger(r.right)||!Number.isFinite(r.weight)||r.weight<=0||!Number.isFinite(r.tolerance)||r.tolerance<0||r.tolerance>1e12||r.mode==='decimal'&&(r.tolerance!==0&&r.tolerance<0.000001||!/^\d+(?:\.\d{1,6})?$/.test(String(r.tolerance))))throw Error('Invalid match rule');const matches=[];for(let i=0;i<left.length;i++){const candidates=[];for(let j=0;j<right.length;j++){let total=0,weight=0;const reasons=[];for(const r of rules){const a=left[i][r.left]??'',b=right[j][r.right]??'';let score=0;if(a!==''&&b!==''){if(r.mode==='text')score=__studio33.u18Dice(a,b);else if(r.mode==='date'){const valid=s=>/^\d{4}-\d\d-\d\d$/.test(s)&&Number.isFinite(Date.parse(s))&&new Date(s+'T00:00:00Z').toISOString().slice(0,10)===s;if(valid(a)&&valid(b)){const d=Math.abs(Date.parse(a)-Date.parse(b))/86400000;score=d===0?1:d<=r.tolerance?1-d/(r.tolerance+1):0}}else{const dec=s=>/^[+-]?\d+(?:\.\d+)?$/.test(s);if(dec(a)&&dec(b)&&a.length<40&&b.length<40){const parse=s=>{const sign=s[0]==='-'?-1n:1n;const [x,y='']=s.replace(/^[+-]/,'').split('.');return {n:sign*BigInt(x+y),scale:y.length}},x=parse(a),y=parse(b),t=parse(r.tolerance.toFixed(6).replace(/0+$/,'').replace(/\.$/,'')||'0'),scale=Math.max(x.scale,y.scale,t.scale),diff=x.n*10n**BigInt(scale-x.scale)-y.n*10n**BigInt(scale-y.scale),d=diff<0n?-diff:diff,tol=t.n*10n**BigInt(scale-t.scale);score=d===0n?1:tol>0n&&d<=tol?Math.max(0,1-Number(d)/Number(tol)):0}}}total+=score*r.weight;weight+=r.weight;reasons.push({rule:r.label||r.mode,score:Math.round(score*10000)/100})}const score=total/weight;if(score>=threshold)candidates.push({left:i,right:j,score:Math.round(score*10000)/100,reasons})}candidates.sort((a,b)=>b.score-a.score||a.right-b.right);matches.push(...candidates.slice(0,3))}return matches}),"function u18MatchJob(data){const {left,right,rules,threshold}=data;if(!Array.isArray(left)||!Array.isArray(right)||left.length>500||right.length>500||left.length*right.length>250000||!Array.isArray(rules)||!rules.length||rules.length>10||!Number.isFinite(threshold)||threshold<0||threshold>1)throw Error('Match limit: 500 rows each, 1–10 rules, score 0–1');for(const r of rules)if(!['text','decimal','date'].includes(r.mode)||!Number.isInteger(r.left)||!Number.isInteger(r.right)||!Number.isFinite(r.weight)||r.weight<=0||!Number.isFinite(r.tolerance)||r.tolerance<0||r.tolerance>1e12||r.mode==='decimal'&&(r.tolerance!==0&&r.tolerance<0.000001||!/^\\d+(?:\\.\\d{1,6})?$/.test(String(r.tolerance))))throw Error('Invalid match rule');const matches=[];for(let i=0;i<left.length;i++){const candidates=[];for(let j=0;j<right.length;j++){let total=0,weight=0;const reasons=[];for(const r of rules){const a=left[i][r.left]??'',b=right[j][r.right]??'';let score=0;if(a!==''&&b!==''){if(r.mode==='text')score=u18Dice(a,b);else if(r.mode==='date'){const valid=s=>/^\\d{4}-\\d\\d-\\d\\d$/.test(s)&&Number.isFinite(Date.parse(s))&&new Date(s+'T00:00:00Z').toISOString().slice(0,10)===s;if(valid(a)&&valid(b)){const d=Math.abs(Date.parse(a)-Date.parse(b))/86400000;score=d===0?1:d<=r.tolerance?1-d/(r.tolerance+1):0}}else{const dec=s=>/^[+-]?\\d+(?:\\.\\d+)?$/.test(s);if(dec(a)&&dec(b)&&a.length<40&&b.length<40){const parse=s=>{const sign=s[0]==='-'?-1n:1n;const [x,y='']=s.replace(/^[+-]/,'').split('.');return {n:sign*BigInt(x+y),scale:y.length}},x=parse(a),y=parse(b),t=parse(r.tolerance.toFixed(6).replace(/0+$/,'').replace(/\\.$/,'')||'0'),scale=Math.max(x.scale,y.scale,t.scale),diff=x.n*10n**BigInt(scale-x.scale)-y.n*10n**BigInt(scale-y.scale),d=diff<0n?-diff:diff,tol=t.n*10n**BigInt(scale-t.scale);score=d===0n?1:tol>0n&&d<=tol?Math.max(0,1-Number(d)/Number(tol)):0}}}total+=score*r.weight;weight+=r.weight;reasons.push({rule:r.label||r.mode,score:Math.round(score*10000)/100})}const score=total/weight;if(score>=threshold)candidates.push({left:i,right:j,score:Math.round(score*10000)/100,reasons})}candidates.sort((a,b)=>b.score-a.score||a.right-b.right);matches.push(...candidates.slice(0,3))}return matches}","u18MatchJob");

__studio33.u18Worker = __studio33.$fn((function u18Worker(fn,data,helpers=[]){return new Promise(__studio33.$fn((resolve,reject)=>{const url=URL.createObjectURL(new Blob([helpers.map(f=>f.toString()).join('\n')+'\nself.onmessage=e=>{try{self.postMessage({ok:true,result:('+fn.toString()+')(e.data)})}catch(error){self.postMessage({ok:false,error:error.message})}}'],{type:'text/javascript'})),worker=__studio33.u24CreateWorker(url);let done=false;const timer=setTimeout(()=>finish(Error('Analysis stopped after 5 seconds. Reduce the input.')),5000);function finish(error,result){if(done)return;done=true;clearTimeout(timer);worker.terminate();URL.revokeObjectURL(url);error?reject(error):resolve(result)}worker.onmessage=e=>e.data.ok?finish(null,e.data.result):finish(Error(e.data.error));worker.onerror=()=>finish(Error('Analysis worker failed'));worker.postMessage(data)},"(resolve,reject)=>{const url=URL.createObjectURL(new Blob([helpers.map(f=>f.toString()).join('\\n')+'\\nself.onmessage=e=>{try{self.postMessage({ok:true,result:('+fn.toString()+')(e.data)})}catch(error){self.postMessage({ok:false,error:error.message})}}'],{type:'text/javascript'})),worker=u24CreateWorker(url);let done=false;const timer=setTimeout(()=>finish(Error('Analysis stopped after 5 seconds. Reduce the input.')),5000);function finish(error,result){if(done)return;done=true;clearTimeout(timer);worker.terminate();URL.revokeObjectURL(url);error?reject(error):resolve(result)}worker.onmessage=e=>e.data.ok?finish(null,e.data.result):finish(Error(e.data.error));worker.onerror=()=>finish(Error('Analysis worker failed'));worker.postMessage(data)}",""))}),"function u18Worker(fn,data,helpers=[]){return new Promise((resolve,reject)=>{const url=URL.createObjectURL(new Blob([helpers.map(f=>f.toString()).join('\\n')+'\\nself.onmessage=e=>{try{self.postMessage({ok:true,result:('+fn.toString()+')(e.data)})}catch(error){self.postMessage({ok:false,error:error.message})}}'],{type:'text/javascript'})),worker=u24CreateWorker(url);let done=false;const timer=setTimeout(()=>finish(Error('Analysis stopped after 5 seconds. Reduce the input.')),5000);function finish(error,result){if(done)return;done=true;clearTimeout(timer);worker.terminate();URL.revokeObjectURL(url);error?reject(error):resolve(result)}worker.onmessage=e=>e.data.ok?finish(null,e.data.result):finish(Error(e.data.error));worker.onerror=()=>finish(Error('Analysis worker failed'));worker.postMessage(data)})}","u18Worker");

__studio33.u18ProgramCheck = __studio33.$fn((function u18ProgramCheck(p){if(!p||typeof p.entry!=='string')throw Error('Program needs an entry node');const nodes=__studio33.u18Array(p.nodes,50,'program nodes'),map=new Map();for(const n of nodes){if(!n||typeof n.id!=='string'||!n.id||n.id.length>80||map.has(n.id)||!['action','if','call','end'].includes(n.kind))throw Error('Program nodes need unique IDs and a supported kind');if(n.kind==='action')__studio33.wfValidate({name:'Node',steps:[{action:n.action,options:n.options||{}}]});if(n.kind==='if'){__studio33.u15PointerParts(n.test?.path);if(!['exists','missing','equals'].includes(n.test?.op))throw Error('Condition needs exists/missing/equals')}if(n.kind==='call'&&(typeof n.program!=='string'||!n.program))throw Error('Call needs a saved program name');map.set(n.id,n)}if(!map.has(p.entry))throw Error('Entry node is missing');const active=new Set(),visited=new Set();function visit(id){if(!id)return;if(!map.has(id))throw Error('Unknown branch target '+id);if(active.has(id))throw Error('Program graph contains a cycle');if(visited.has(id))return;active.add(id);const n=map.get(id);for(const target of n.kind==='if'?[n.then,n.else]:n.kind==='end'?[]:[n.next]){if(typeof target!=='string'||!target)throw Error('A branch/next target is required');visit(target)}active.delete(id);visited.add(id)}for(const id of map.keys())visit(id);return __studio33.csClone(p)}),"function u18ProgramCheck(p){if(!p||typeof p.entry!=='string')throw Error('Program needs an entry node');const nodes=u18Array(p.nodes,50,'program nodes'),map=new Map();for(const n of nodes){if(!n||typeof n.id!=='string'||!n.id||n.id.length>80||map.has(n.id)||!['action','if','call','end'].includes(n.kind))throw Error('Program nodes need unique IDs and a supported kind');if(n.kind==='action')wfValidate({name:'Node',steps:[{action:n.action,options:n.options||{}}]});if(n.kind==='if'){u15PointerParts(n.test?.path);if(!['exists','missing','equals'].includes(n.test?.op))throw Error('Condition needs exists/missing/equals')}if(n.kind==='call'&&(typeof n.program!=='string'||!n.program))throw Error('Call needs a saved program name');map.set(n.id,n)}if(!map.has(p.entry))throw Error('Entry node is missing');const active=new Set(),visited=new Set();function visit(id){if(!id)return;if(!map.has(id))throw Error('Unknown branch target '+id);if(active.has(id))throw Error('Program graph contains a cycle');if(visited.has(id))return;active.add(id);const n=map.get(id);for(const target of n.kind==='if'?[n.then,n.else]:n.kind==='end'?[]:[n.next]){if(typeof target!=='string'||!target)throw Error('A branch/next target is required');visit(target)}active.delete(id);visited.add(id)}for(const id of map.keys())visit(id);return csClone(p)}","u18ProgramCheck");

__studio33.u18Cents = __studio33.$fn((function u18Cents(value){const d=__studio33.rcDecimal(String(value));if(!d||d.n<0n||d.scale>2)throw Error('Amounts need nonnegative values with at most two decimals');const n=d.n*10n**BigInt(2-d.scale);if(n>100000000000000n)throw Error('Amount exceeds 1 trillion');return n}),"function u18Cents(value){const d=rcDecimal(String(value));if(!d||d.n<0n||d.scale>2)throw Error('Amounts need nonnegative values with at most two decimals');const n=d.n*10n**BigInt(2-d.scale);if(n>100000000000000n)throw Error('Amount exceeds 1 trillion');return n}","u18Cents");

__studio33.u18Round = (function u18Round(n,d){return (n*2n+d)/(2n*d)});

__studio33.u18Actual = __studio33.$fn((function u18Actual(config,payments,asOf,rounding='payment'){const plan=__studio33.u16DatedSchedule(config);if(!__studio33.v12Date(asOf)||asOf<config.start||Math.round((Date.parse(asOf)-Date.parse(config.start))/86400000)>3650||!['payment','daily'].includes(rounding))throw Error('Use an as-of date within 3,650 days and payment/daily rounding');let balance=__studio33.u18Cents(config.principal),interestN=0n,interestD=1n,rate=__studio33.rcDecimal(String(config.rate)),cursor=config.start,paid=0n;const gcd=(a,b)=>{while(b){[a,b]=[b,a%b]}return a};function accrue(to){const days=BigInt(Math.round((Date.parse(to)-Date.parse(cursor))/86400000));if(days<0n)throw Error('Events are out of order');const denom=100n*365n*10n**BigInt(rate.scale),n=balance*rate.n;if(rounding==='daily'){interestN+=__studio33.u18Round(n,denom)*days*interestD}else{interestN=interestN*denom+n*days*interestD;interestD*=denom;const g=gcd(interestN,interestD);if(g){interestN/=g;interestD/=g}}cursor=to}
 const events=[...config.events.filter(e=>e.type==='rate'&&e.date<=asOf).map(e=>({...e,kind:'rate'})),...__studio33.u18Array(payments,2000,'actual payments').map(__studio33.$fn((p,i)=>{if(!p||!__studio33.v12Date(p.date)||p.date<config.start||p.date>asOf||!['payment','principal'].includes(p.type||'payment'))throw Error('Each payment needs an in-range date, amount and payment/principal type');return {...p,kind:p.type||'payment',cents:__studio33.u18Cents(p.amount),order:i}},"(p,i)=>{if(!p||!v12Date(p.date)||p.date<config.start||p.date>asOf||!['payment','principal'].includes(p.type||'payment'))throw Error('Each payment needs an in-range date, amount and payment/principal type');return {...p,kind:p.type||'payment',cents:u18Cents(p.amount),order:i}}",""))].sort((a,b)=>a.date.localeCompare(b.date)||(a.kind==='rate'?-1:b.kind==='rate'?1:(a.order??0)-(b.order??0)));const rows=[];for(const e of events){accrue(e.date);if(e.kind==='rate'){rate=__studio33.rcDecimal(String(e.value));continue}const interestDue=__studio33.u18Round(interestN,interestD),interestPaid=e.kind==='principal'?0n:e.cents<interestDue?e.cents:interestDue,remaining=e.cents-interestPaid,principalPaid=remaining<balance?remaining:balance;if(e.kind!=='principal'){interestN=interestDue-interestPaid;interestD=1n}balance-=principalPaid;paid+=interestPaid+principalPaid;rows.push({date:e.date,type:e.kind,paid:__studio33.u18Decimal(e.cents,2),interest:__studio33.u18Decimal(interestPaid,2),principal:__studio33.u18Decimal(principalPaid,2),unallocated:__studio33.u18Decimal(e.cents-interestPaid-principalPaid,2),balance:__studio33.u18Decimal(balance,2)})}accrue(asOf);const scheduled=plan.rows.filter(r=>r.date<=asOf),planned=scheduled.at(-1)?.balance??config.principal;return {asOf,rounding,basis:'actual/365',principal:__studio33.u18Decimal(balance,2),accruedInterest:__studio33.u18Decimal(__studio33.u18Round(interestN,interestD),2),paid:__studio33.u18Decimal(paid,2),plannedPrincipal:planned.toFixed(2),rows,notice:'Actual payments pay rounded accrued interest first, then principal. Principal-only events retain accrued interest. Fees are upfront and excluded from balances. Planned comparison uses the existing actual/365 schedule; daily rounding can produce a different actual balance.'}}),"function u18Actual(config,payments,asOf,rounding='payment'){const plan=u16DatedSchedule(config);if(!v12Date(asOf)||asOf<config.start||Math.round((Date.parse(asOf)-Date.parse(config.start))/86400000)>3650||!['payment','daily'].includes(rounding))throw Error('Use an as-of date within 3,650 days and payment/daily rounding');let balance=u18Cents(config.principal),interestN=0n,interestD=1n,rate=rcDecimal(String(config.rate)),cursor=config.start,paid=0n;const gcd=(a,b)=>{while(b){[a,b]=[b,a%b]}return a};function accrue(to){const days=BigInt(Math.round((Date.parse(to)-Date.parse(cursor))/86400000));if(days<0n)throw Error('Events are out of order');const denom=100n*365n*10n**BigInt(rate.scale),n=balance*rate.n;if(rounding==='daily'){interestN+=u18Round(n,denom)*days*interestD}else{interestN=interestN*denom+n*days*interestD;interestD*=denom;const g=gcd(interestN,interestD);if(g){interestN/=g;interestD/=g}}cursor=to}\n const events=[...config.events.filter(e=>e.type==='rate'&&e.date<=asOf).map(e=>({...e,kind:'rate'})),...u18Array(payments,2000,'actual payments').map((p,i)=>{if(!p||!v12Date(p.date)||p.date<config.start||p.date>asOf||!['payment','principal'].includes(p.type||'payment'))throw Error('Each payment needs an in-range date, amount and payment/principal type');return {...p,kind:p.type||'payment',cents:u18Cents(p.amount),order:i}})].sort((a,b)=>a.date.localeCompare(b.date)||(a.kind==='rate'?-1:b.kind==='rate'?1:(a.order??0)-(b.order??0)));const rows=[];for(const e of events){accrue(e.date);if(e.kind==='rate'){rate=rcDecimal(String(e.value));continue}const interestDue=u18Round(interestN,interestD),interestPaid=e.kind==='principal'?0n:e.cents<interestDue?e.cents:interestDue,remaining=e.cents-interestPaid,principalPaid=remaining<balance?remaining:balance;if(e.kind!=='principal'){interestN=interestDue-interestPaid;interestD=1n}balance-=principalPaid;paid+=interestPaid+principalPaid;rows.push({date:e.date,type:e.kind,paid:u18Decimal(e.cents,2),interest:u18Decimal(interestPaid,2),principal:u18Decimal(principalPaid,2),unallocated:u18Decimal(e.cents-interestPaid-principalPaid,2),balance:u18Decimal(balance,2)})}accrue(asOf);const scheduled=plan.rows.filter(r=>r.date<=asOf),planned=scheduled.at(-1)?.balance??config.principal;return {asOf,rounding,basis:'actual/365',principal:u18Decimal(balance,2),accruedInterest:u18Decimal(u18Round(interestN,interestD),2),paid:u18Decimal(paid,2),plannedPrincipal:planned.toFixed(2),rows,notice:'Actual payments pay rounded accrued interest first, then principal. Principal-only events retain accrued interest. Fees are upfront and excluded from balances. Planned comparison uses the existing actual/365 schedule; daily rounding can produce a different actual balance.'}}","u18Actual");

__studio33.u18StateCheck = __studio33.$fn((function u18StateCheck(s){if(!s||s.version!==1||JSON.stringify(s).length>3000000)throw Error('Invalid edition 18 state');const names=new Set();for(const r of __studio33.u18Array(s.recipes,30,'saved recipes')){if(!r||typeof r.name!=='string'||!r.name.trim()||r.name.length>100||names.has(r.name))throw Error('Recipe names must be unique');names.add(r.name);__studio33.u18Array(r.steps,50,'recipe steps')}names.clear();for(const p of __studio33.u18Array(s.programs,30,'saved programs')){if(!p||typeof p.name!=='string'||!p.name.trim()||p.name.length>100||names.has(p.name))throw Error('Program names must be unique');names.add(p.name);__studio33.u18ProgramCheck(p.program)}return __studio33.csClone(s)}),"function u18StateCheck(s){if(!s||s.version!==1||JSON.stringify(s).length>3000000)throw Error('Invalid edition 18 state');const names=new Set();for(const r of u18Array(s.recipes,30,'saved recipes')){if(!r||typeof r.name!=='string'||!r.name.trim()||r.name.length>100||names.has(r.name))throw Error('Recipe names must be unique');names.add(r.name);u18Array(r.steps,50,'recipe steps')}names.clear();for(const p of u18Array(s.programs,30,'saved programs')){if(!p||typeof p.name!=='string'||!p.name.trim()||p.name.length>100||names.has(p.name))throw Error('Program names must be unique');names.add(p.name);u18ProgramCheck(p.program)}return csClone(s)}","u18StateCheck");

__studio33.u18SaveState = __studio33.$fn((function u18SaveState(){__studio33.u18StateCheck(__studio33.u18State);if(!__studio33.csPersist(__studio33.u18StateKey,__studio33.u18State))throw Error('Could not save; export the configuration')}),"function u18SaveState(){u18StateCheck(u18State);if(!csPersist(u18StateKey,u18State))throw Error('Could not save; export the configuration')}","u18SaveState");

__studio33.u18SpecRef = __studio33.$fn((function u18SpecRef(doc,value,depth=0){if(depth>20)throw Error('Reference depth limit');if(value&&typeof value==='object'&&value.$ref){if(typeof value.$ref!=='string'||!value.$ref.startsWith('#/'))throw Error('Only bundled local references are supported');let node=doc;for(const key of __studio33.u15PointerParts(value.$ref.slice(1))){if(!node||!Object.hasOwn(node,key))throw Error('Unknown reference '+value.$ref);node=node[key]}return __studio33.u18SpecRef(doc,node,depth+1)}return value}),"function u18SpecRef(doc,value,depth=0){if(depth>20)throw Error('Reference depth limit');if(value&&typeof value==='object'&&value.$ref){if(typeof value.$ref!=='string'||!value.$ref.startsWith('#/'))throw Error('Only bundled local references are supported');let node=doc;for(const key of u15PointerParts(value.$ref.slice(1))){if(!node||!Object.hasOwn(node,key))throw Error('Unknown reference '+value.$ref);node=node[key]}return u18SpecRef(doc,node,depth+1)}return value}","u18SpecRef");

__studio33.u18Schema30 = __studio33.$fn((function u18Schema30(schema,doc,depth=0,seen=new Set()){if(depth>30)throw Error('Schema nesting limit');if(schema===true||schema===false)return schema;if(!schema||typeof schema!=='object'||Array.isArray(schema))throw Error('Schema must be an object');if(schema.$ref){const ref=schema.$ref;if(seen.has(ref))throw Error('Recursive schemas require a simpler local contract');const next=new Set(seen);next.add(ref);return __studio33.u18Schema30(__studio33.u18SpecRef(doc,schema),doc,depth+1,next)}const out={};const copied=['type','enum','const','required','minLength','maxLength','pattern','minimum','maximum','multipleOf','minItems','maxItems','uniqueItems','minProperties','maxProperties','format'];for(const k of copied)if(Object.hasOwn(schema,k))out[k]=__studio33.csClone(schema[k]);if(schema.exclusiveMinimum===true){out.exclusiveMinimum=out.minimum;delete out.minimum}if(schema.exclusiveMaximum===true){out.exclusiveMaximum=out.maximum;delete out.maximum}if(schema.nullable&&out.type)out.type=Array.isArray(out.type)?[...out.type,'null']:[out.type,'null'];if(schema.properties){out.properties=Object.create(null);for(const [k,v]of Object.entries(schema.properties))if(!__studio33.u18SpecRef(doc,v)?.writeOnly)out.properties[k]=__studio33.u18Schema30(v,doc,depth+1,seen);if(out.required)out.required=out.required.filter(__studio33.$fn(k=>!__studio33.u18SpecRef(doc,schema.properties[k])?.writeOnly,"k=>!u18SpecRef(doc,schema.properties[k])?.writeOnly",""))}if(schema.items)out.items=__studio33.u18Schema30(schema.items,doc,depth+1,seen);if(Object.hasOwn(schema,'additionalProperties'))out.additionalProperties=typeof schema.additionalProperties==='boolean'?schema.additionalProperties:__studio33.u18Schema30(schema.additionalProperties,doc,depth+1,seen);for(const k of ['allOf','anyOf','oneOf'])if(schema[k])out[k]=__studio33.u18Array(schema[k],50,'schema alternatives').map(__studio33.$fn(s=>__studio33.u18Schema30(s,doc,depth+1,seen),"s=>u18Schema30(s,doc,depth+1,seen)",""));if(schema.not)out.not=__studio33.u18Schema30(schema.not,doc,depth+1,seen);return out}),"function u18Schema30(schema,doc,depth=0,seen=new Set()){if(depth>30)throw Error('Schema nesting limit');if(schema===true||schema===false)return schema;if(!schema||typeof schema!=='object'||Array.isArray(schema))throw Error('Schema must be an object');if(schema.$ref){const ref=schema.$ref;if(seen.has(ref))throw Error('Recursive schemas require a simpler local contract');const next=new Set(seen);next.add(ref);return u18Schema30(u18SpecRef(doc,schema),doc,depth+1,next)}const out={};const copied=['type','enum','const','required','minLength','maxLength','pattern','minimum','maximum','multipleOf','minItems','maxItems','uniqueItems','minProperties','maxProperties','format'];for(const k of copied)if(Object.hasOwn(schema,k))out[k]=csClone(schema[k]);if(schema.exclusiveMinimum===true){out.exclusiveMinimum=out.minimum;delete out.minimum}if(schema.exclusiveMaximum===true){out.exclusiveMaximum=out.maximum;delete out.maximum}if(schema.nullable&&out.type)out.type=Array.isArray(out.type)?[...out.type,'null']:[out.type,'null'];if(schema.properties){out.properties=Object.create(null);for(const [k,v]of Object.entries(schema.properties))if(!u18SpecRef(doc,v)?.writeOnly)out.properties[k]=u18Schema30(v,doc,depth+1,seen);if(out.required)out.required=out.required.filter(k=>!u18SpecRef(doc,schema.properties[k])?.writeOnly)}if(schema.items)out.items=u18Schema30(schema.items,doc,depth+1,seen);if(Object.hasOwn(schema,'additionalProperties'))out.additionalProperties=typeof schema.additionalProperties==='boolean'?schema.additionalProperties:u18Schema30(schema.additionalProperties,doc,depth+1,seen);for(const k of ['allOf','anyOf','oneOf'])if(schema[k])out[k]=u18Array(schema[k],50,'schema alternatives').map(s=>u18Schema30(s,doc,depth+1,seen));if(schema.not)out.not=u18Schema30(schema.not,doc,depth+1,seen);return out}","u18Schema30");

__studio33.u18SchemaSample = __studio33.$fn((function u18SchemaSample(s,doc,depth=0){s=__studio33.u18SpecRef(doc,s);if(depth>15)throw Error('Sample nesting limit');if(!s)return null;if(Object.hasOwn(s,'example'))return __studio33.csClone(s.example);if(Object.hasOwn(s,'default'))return __studio33.csClone(s.default);if(s.enum?.length)return __studio33.csClone(s.enum[0]);if(s.allOf)return Object.assign(Object.create(null),...s.allOf.map(__studio33.$fn(x=>__studio33.u18SchemaSample(x,doc,depth+1),"x=>u18SchemaSample(x,doc,depth+1)","")));if(s.oneOf||s.anyOf)return __studio33.u18SchemaSample((s.oneOf||s.anyOf)[0],doc,depth+1);if(s.type==='object'||s.properties){const out=Object.create(null);for(const name of s.required||Object.keys(s.properties||{}))if(s.properties?.[name]&&!s.properties[name].readOnly)out[name]=__studio33.u18SchemaSample(s.properties[name],doc,depth+1);return out}if(s.type==='array')return s.minItems>0?[__studio33.u18SchemaSample(s.items,doc,depth+1)]:[];if(s.type==='boolean')return false;if(s.type==='integer'||s.type==='number')return s.minimum??0;return s.format==='date'?'2026-01-01':s.format==='date-time'?'2026-01-01T00:00:00Z':''}),"function u18SchemaSample(s,doc,depth=0){s=u18SpecRef(doc,s);if(depth>15)throw Error('Sample nesting limit');if(!s)return null;if(Object.hasOwn(s,'example'))return csClone(s.example);if(Object.hasOwn(s,'default'))return csClone(s.default);if(s.enum?.length)return csClone(s.enum[0]);if(s.allOf)return Object.assign(Object.create(null),...s.allOf.map(x=>u18SchemaSample(x,doc,depth+1)));if(s.oneOf||s.anyOf)return u18SchemaSample((s.oneOf||s.anyOf)[0],doc,depth+1);if(s.type==='object'||s.properties){const out=Object.create(null);for(const name of s.required||Object.keys(s.properties||{}))if(s.properties?.[name]&&!s.properties[name].readOnly)out[name]=u18SchemaSample(s.properties[name],doc,depth+1);return out}if(s.type==='array')return s.minItems>0?[u18SchemaSample(s.items,doc,depth+1)]:[];if(s.type==='boolean')return false;if(s.type==='integer'||s.type==='number')return s.minimum??0;return s.format==='date'?'2026-01-01':s.format==='date-time'?'2026-01-01T00:00:00Z':''}","u18SchemaSample");

__studio33.u18ImportSpec = __studio33.$fn((function u18ImportSpec(doc){if(!doc||!/^3\.0\.\d+$/.test(doc.openapi)||!doc.paths||typeof doc.paths!=='object')throw Error('Import an OpenAPI 3.0.x JSON document; YAML and other versions are not supported');const operations=[];for(const [path,itemValue]of Object.entries(doc.paths)){if(!path.startsWith('/'))throw Error('Paths must start with /');const item=__studio33.u18SpecRef(doc,itemValue);for(const method of ['get','post','put','patch','delete','head','options'])if(item[method]){const op=item[method],parameters=new Map();for(const pValue of [...(item.parameters||[]),...(op.parameters||[])]){const p=__studio33.u18SpecRef(doc,pValue);if(!p||!['path','query','header','cookie'].includes(p.in)||typeof p.name!=='string')throw Error('Invalid parameter');parameters.set(p.in+'|'+p.name,p)}const server=(op.servers||item.servers||doc.servers||[])[0];let base=server?.url||'{{base_url}}';if(server)base=base.replace(/\{([^{}]+)\}/g,(_,name)=>{const v=server.variables?.[name]?.default;if(v===undefined)throw Error('Server variable lacks a default: '+name);return String(v)});const body=op.requestBody?__studio33.u18SpecRef(doc,op.requestBody):null;const bodyMedia=body?.content?.['application/json'];const responses=Object.create(null);for(const [code,value]of Object.entries(op.responses||{})){const res=__studio33.u18SpecRef(doc,value);responses[code]={...res,...(res.content?.['application/json']?.schema?{contract:__studio33.u18Schema30(res.content['application/json'].schema,doc)}:{})}}operations.push({id:method.toUpperCase()+' '+path,method:method.toUpperCase(),path,name:op.summary||op.operationId||path,parameters:[...parameters.values()],base,bodyMedia,responses,security:op.security??doc.security??[],doc});if(operations.length>200)throw Error('Specification limit: 200 operations')}}if(!operations.length)throw Error('No supported operations');return operations}),"function u18ImportSpec(doc){if(!doc||!/^3\\.0\\.\\d+$/.test(doc.openapi)||!doc.paths||typeof doc.paths!=='object')throw Error('Import an OpenAPI 3.0.x JSON document; YAML and other versions are not supported');const operations=[];for(const [path,itemValue]of Object.entries(doc.paths)){if(!path.startsWith('/'))throw Error('Paths must start with /');const item=u18SpecRef(doc,itemValue);for(const method of ['get','post','put','patch','delete','head','options'])if(item[method]){const op=item[method],parameters=new Map();for(const pValue of [...(item.parameters||[]),...(op.parameters||[])]){const p=u18SpecRef(doc,pValue);if(!p||!['path','query','header','cookie'].includes(p.in)||typeof p.name!=='string')throw Error('Invalid parameter');parameters.set(p.in+'|'+p.name,p)}const server=(op.servers||item.servers||doc.servers||[])[0];let base=server?.url||'{{base_url}}';if(server)base=base.replace(/\\{([^{}]+)\\}/g,(_,name)=>{const v=server.variables?.[name]?.default;if(v===undefined)throw Error('Server variable lacks a default: '+name);return String(v)});const body=op.requestBody?u18SpecRef(doc,op.requestBody):null;const bodyMedia=body?.content?.['application/json'];const responses=Object.create(null);for(const [code,value]of Object.entries(op.responses||{})){const res=u18SpecRef(doc,value);responses[code]={...res,...(res.content?.['application/json']?.schema?{contract:u18Schema30(res.content['application/json'].schema,doc)}:{})}}operations.push({id:method.toUpperCase()+' '+path,method:method.toUpperCase(),path,name:op.summary||op.operationId||path,parameters:[...parameters.values()],base,bodyMedia,responses,security:op.security??doc.security??[],doc});if(operations.length>200)throw Error('Specification limit: 200 operations')}}if(!operations.length)throw Error('No supported operations');return operations}","u18ImportSpec");

__studio33.u18Contract = (function u18Contract(op,status,mime){const response=op.responses[String(status)]||op.responses[String(status)[0]+'XX']||op.responses.default;if(!response)throw Error('Status '+status+' is not declared for the selected operation');if(response.contract&&mime.split(';')[0].trim().toLowerCase()!=='application/json')throw Error('Expected application/json, received '+mime);return response.contract||null});

__studio33.u18Metadata = (function u18Metadata(input){const docs=Array.isArray(input)?input:input?.name?[input]:Object.values(input||{}),out=new Map();if(!docs.length||docs.length>100)throw Error('Import 1–100 sObject Describe JSON objects');for(const d of docs){if(!d||typeof d.name!=='string'||!Array.isArray(d.fields)||d.fields.length>2000||out.has(d.name))throw Error('Describe objects need unique names and fields');const names=new Set();for(const f of d.fields)if(!f||typeof f.name!=='string'||names.has(f.name)){throw Error('Describe fields need unique names')}else names.add(f.name);out.set(d.name,d)}return out});

__studio33.u18StripApex = (function u18StripApex(source){let out='',mode='',escape=false;for(let i=0;i<source.length;i++){const c=source[i],n=source[i+1];if(mode==='line'){if(c==='\n'){mode='';out+='\n'}else out+=' ';continue}if(mode==='block'){if(c==='*'&&n==='/'){out+='  ';i++;mode=''}else out+=c==='\n'?'\n':' ';continue}if(mode==='string'){if(escape)escape=false;else if(c==='\\')escape=true;else if(c==="'")mode='';out+=c==='\n'?'\n':' ';continue}if(c==='/'&&n==='/'){out+='  ';i++;mode='line'}else if(c==='/'&&n==='*'){out+='  ';i++;mode='block'}else if(c==="'"){out+=' ';mode='string'}else out+=c}return out});

__studio33.u18ApexLoops = __studio33.$fn((function u18ApexLoops(source){const lines=__studio33.u18StripApex(source).split('\n'),stack=[],ranges=[];let pending=null;for(let i=0;i<lines.length;i++){const tokens=lines[i].matchAll(/\b(?:for|while)\s*\(|[{}]/g);for(const token of tokens){if(token[0]==='{'){stack.push({start:pending??i+1,loop:pending!==null});pending=null}else if(token[0]==='}'){const entry=stack.pop();if(entry?.loop)ranges.push({start:entry.start,end:i+1})}else pending=i+1}if(pending!==null&&/;\s*$/.test(lines[i])){ranges.push({start:pending,end:i+1,approximate:true});pending=null}}return ranges}),"function u18ApexLoops(source){const lines=u18StripApex(source).split('\\n'),stack=[],ranges=[];let pending=null;for(let i=0;i<lines.length;i++){const tokens=lines[i].matchAll(/\\b(?:for|while)\\s*\\(|[{}]/g);for(const token of tokens){if(token[0]==='{'){stack.push({start:pending??i+1,loop:pending!==null});pending=null}else if(token[0]==='}'){const entry=stack.pop();if(entry?.loop)ranges.push({start:entry.start,end:i+1})}else pending=i+1}if(pending!==null&&/;\\s*$/.test(lines[i])){ranges.push({start:pending,end:i+1,approximate:true});pending=null}}return ranges}","u18ApexLoops");

__studio33.u18LinkLogs = __studio33.$fn((function u18LinkLogs(log,files){if(log.length>2097152||files.length>100||files.reduce((n,f)=>n+f.source.length,0)>5000000)throw Error('Use logs ≤2 MiB and up to 100 classes / 5 MB');const classes=new Map();for(const file of files){const name=file.source.match(/\b(?:class|trigger)\s+(\w+)/)?.[1]||file.name.replace(/\.(cls|trigger)$/i,'');if(classes.has(name))throw Error('Duplicate source class '+name);classes.set(name,{...file,name,lines:file.source.split('\n'),loops:__studio33.u18ApexLoops(file.source),stripped:__studio33.u18StripApex(file.source).split('\n')})}const stack=[],events=[];for(const [index,line]of log.split('\n').entries()){const parts=line.split('|'),kind=parts[1],method=parts.slice(2).find(p=>/^\w+(?:\.\w+)+\([^)]*\)/.test(p)),className=method?.split('.')[0];if(kind==='METHOD_ENTRY'){stack.push({className,method});continue}if(kind==='METHOD_EXIT'){if(method){const i=stack.map(x=>x.method).lastIndexOf(method);if(i>=0)stack.splice(i)}else stack.pop();continue}if(kind==='EXECUTION_STARTED'||kind==='EXECUTION_FINISHED')stack.length=0;if(!['SOQL_EXECUTE_BEGIN','DML_BEGIN'].includes(kind))continue;const sourceLine=Number(parts.find(p=>/^\[\d+\]$/.test(p))?.slice(1,-1)),explicit=stack.at(-1)?.className,source=classes.get(explicit),candidate=source||(!explicit&&classes.size===1?[...classes.values()][0]:null),loop=candidate?.loops.find(r=>sourceLine>=r.start&&sourceLine<=r.end);events.push({logLine:index+1,event:kind,className:explicit||candidate?.name||'Unknown',sourceLine:sourceLine||null,confidence:source?'Class from recorded method stack':candidate?'Candidate: only uploaded class':'No source match',inLoop:!!loop,loop:loop?{start:loop.start,end:loop.end,approximate:!!loop.approximate}:null,source:sourceLine?candidate?.lines[sourceLine-1]||'':'',detail:parts.slice(3).join('|').slice(0,1000)})}if(events.length>10000)throw Error('Source analysis limit: 10,000 query/DML events');const counts=new Map();for(const e of events){const key=e.className+'|'+e.sourceLine+'|'+e.event;counts.set(key,(counts.get(key)||0)+1)}for(const e of events)e.repeated=counts.get(e.className+'|'+e.sourceLine+'|'+e.event);return {events,classes:[...classes.values()],notice:'Source matches depend on recorded method events and matching source versions. Loop ranges are lexical candidates, not proof of a defect. Unbraced and complex multiline loops may not be recognized.'}}),"function u18LinkLogs(log,files){if(log.length>2097152||files.length>100||files.reduce((n,f)=>n+f.source.length,0)>5000000)throw Error('Use logs ≤2 MiB and up to 100 classes / 5 MB');const classes=new Map();for(const file of files){const name=file.source.match(/\\b(?:class|trigger)\\s+(\\w+)/)?.[1]||file.name.replace(/\\.(cls|trigger)$/i,'');if(classes.has(name))throw Error('Duplicate source class '+name);classes.set(name,{...file,name,lines:file.source.split('\\n'),loops:u18ApexLoops(file.source),stripped:u18StripApex(file.source).split('\\n')})}const stack=[],events=[];for(const [index,line]of log.split('\\n').entries()){const parts=line.split('|'),kind=parts[1],method=parts.slice(2).find(p=>/^\\w+(?:\\.\\w+)+\\([^)]*\\)/.test(p)),className=method?.split('.')[0];if(kind==='METHOD_ENTRY'){stack.push({className,method});continue}if(kind==='METHOD_EXIT'){if(method){const i=stack.map(x=>x.method).lastIndexOf(method);if(i>=0)stack.splice(i)}else stack.pop();continue}if(kind==='EXECUTION_STARTED'||kind==='EXECUTION_FINISHED')stack.length=0;if(!['SOQL_EXECUTE_BEGIN','DML_BEGIN'].includes(kind))continue;const sourceLine=Number(parts.find(p=>/^\\[\\d+\\]$/.test(p))?.slice(1,-1)),explicit=stack.at(-1)?.className,source=classes.get(explicit),candidate=source||(!explicit&&classes.size===1?[...classes.values()][0]:null),loop=candidate?.loops.find(r=>sourceLine>=r.start&&sourceLine<=r.end);events.push({logLine:index+1,event:kind,className:explicit||candidate?.name||'Unknown',sourceLine:sourceLine||null,confidence:source?'Class from recorded method stack':candidate?'Candidate: only uploaded class':'No source match',inLoop:!!loop,loop:loop?{start:loop.start,end:loop.end,approximate:!!loop.approximate}:null,source:sourceLine?candidate?.lines[sourceLine-1]||'':'',detail:parts.slice(3).join('|').slice(0,1000)})}if(events.length>10000)throw Error('Source analysis limit: 10,000 query/DML events');const counts=new Map();for(const e of events){const key=e.className+'|'+e.sourceLine+'|'+e.event;counts.set(key,(counts.get(key)||0)+1)}for(const e of events)e.repeated=counts.get(e.className+'|'+e.sourceLine+'|'+e.event);return {events,classes:[...classes.values()],notice:'Source matches depend on recorded method events and matching source versions. Loop ranges are lexical candidates, not proof of a defect. Unbraced and complex multiline loops may not be recognized.'}}","u18LinkLogs");

__studio33.u18Panel = __studio33.$fn((function u18Panel(tool,id,title,description){const parent=__studio33.$('u17Advanced-'+tool)||__studio33.$(tool),box=__studio33.u15Box(id,title,parent);box.classList.add('u18-feature');box.append(__studio33.csText('p',description,'hint'));const status=__studio33.u15Status(box,id+'Status'),report=__studio33.csText('div','','u18-report');report.id=id+'Report';box.append(report);return {box,status,report}}),"function u18Panel(tool,id,title,description){const parent=$('u17Advanced-'+tool)||$(tool),box=u15Box(id,title,parent);box.classList.add('u18-feature');box.append(csText('p',description,'hint'));const status=u15Status(box,id+'Status'),report=csText('div','','u18-report');report.id=id+'Report';box.append(report);return {box,status,report}}","u18Panel");

__studio33.u18Field = __studio33.$fn((function u18Field(p,id,label,value='',type='textarea',options){const e=__studio33.u15Field(p.box,id,label,value,type,options);e.setAttribute('aria-label',label);return e}),"function u18Field(p,id,label,value='',type='textarea',options){const e=u15Field(p.box,id,label,value,type,options);e.setAttribute('aria-label',label);return e}","u18Field");

__studio33.u18Button = __studio33.$fn((function u18Button(p,id,label,fn,primary=false,help=''){const b=__studio33.csButton(label,async()=>{if(b.disabled)return;b.disabled=true;p.status.dataset.error='false';try{await fn()}catch(e){p.status.textContent=e.message;p.status.dataset.error='true'}finally{b.disabled=false}});b.id=id;b.dataset.u18Help=help||label;if(primary)b.classList.add('u15-primary');p.box.append(b);__studio33.u17Classify(b);return b}),"function u18Button(p,id,label,fn,primary=false,help=''){const b=csButton(label,async()=>{if(b.disabled)return;b.disabled=true;p.status.dataset.error='false';try{await fn()}catch(e){p.status.textContent=e.message;p.status.dataset.error='true'}finally{b.disabled=false}});b.id=id;b.dataset.u18Help=help||label;if(primary)b.classList.add('u15-primary');p.box.append(b);u17Classify(b);return b}","u18Button");

__studio33.u18File = __studio33.$fn((function u18File(p,id,label,accept,fn,max=2097152,multiple=false){const wrap=__studio33.csText('label','','field'),input=document.createElement('input');input.type='file';input.id=id;input.accept=accept;input.multiple=multiple;input.setAttribute('aria-label',label);input.onchange=async()=>{p.status.dataset.error='false';try{const files=[...input.files];if(!files.length)return;if(files.reduce((n,f)=>n+f.size,0)>max)throw Error('Selected files exceed the size limit');await fn(files)}catch(e){p.status.textContent=e.message;p.status.dataset.error='true'}finally{input.value=''}};wrap.append(__studio33.csText('span',label),input);p.box.append(wrap);return input}),"function u18File(p,id,label,accept,fn,max=2097152,multiple=false){const wrap=csText('label','','field'),input=document.createElement('input');input.type='file';input.id=id;input.accept=accept;input.multiple=multiple;input.setAttribute('aria-label',label);input.onchange=async()=>{p.status.dataset.error='false';try{const files=[...input.files];if(!files.length)return;if(files.reduce((n,f)=>n+f.size,0)>max)throw Error('Selected files exceed the size limit');await fn(files)}catch(e){p.status.textContent=e.message;p.status.dataset.error='true'}finally{input.value=''}};wrap.append(csText('span',label),input);p.box.append(wrap);return input}","u18File");

__studio33.u18Signature = __studio33.$fn((function u18Signature(ids,extra){return JSON.stringify([ids.map(__studio33.$fn(id=>__studio33.$(id).value,"id=>$(id).value","")),extra])}),"function u18Signature(ids,extra){return JSON.stringify([ids.map(id=>$(id).value),extra])}","u18Signature");

__studio33.u18Fresh = (function u18Fresh(value,current){if(!value||value.signature!==current)throw Error('Inputs changed or no reviewed result. Preview again before applying/exporting')});

__studio33.u18Export = __studio33.$fn((function u18Export(name,data){__studio33.downloadFile(name,JSON.stringify(data,null,2),'application/json')}),"function u18Export(name,data){downloadFile(name,JSON.stringify(data,null,2),'application/json')}","u18Export");

__studio33.u18LoadSpec = __studio33.$fn((function u18LoadSpec(doc){__studio33.u18Operations=__studio33.u18ImportSpec(doc);__studio33.v12Opt(__studio33.$('u18Operation'),__studio33.u18Operations.map(o=>[o.id,o.method+' '+o.path+' · '+o.name]),__studio33.u18Operations[0].id);__studio33.u18APIBinding=null;__studio33.u18API.status.textContent='Imported '+__studio33.u18Operations.length+' operations. No request sent.'}),"function u18LoadSpec(doc){u18Operations=u18ImportSpec(doc);v12Opt($('u18Operation'),u18Operations.map(o=>[o.id,o.method+' '+o.path+' · '+o.name]),u18Operations[0].id);u18APIBinding=null;u18API.status.textContent='Imported '+u18Operations.length+' operations. No request sent.'}","u18LoadSpec");

__studio33.u18RecipeChoices = __studio33.$fn((function u18RecipeChoices(){__studio33.v12Opt(__studio33.$('u18RecipeSaved'),[['','Choose a recipe'],...__studio33.u18State.recipes.map(r=>[r.name,r.name])],__studio33.$('u18RecipeSaved').value)}),"function u18RecipeChoices(){v12Opt($('u18RecipeSaved'),[['','Choose a recipe'],...u18State.recipes.map(r=>[r.name,r.name])],$('u18RecipeSaved').value)}","u18RecipeChoices");

__studio33.u18ReviewedPairs = __studio33.$fn((function u18ReviewedPairs(){__studio33.u18Fresh(__studio33.u18MatchPreview,__studio33.u18MatchSig());const used=new Set(),pairs=[];for(let i=0;i<__studio33.u18MatchPreview.left.rows.length;i++){const choice=__studio33.u18MatchChoices.get(i);if(!choice)throw Error('Review reference row '+(i+1));if(choice==='none')continue;const j=Number(choice),match=__studio33.u18MatchPreview.matches.find(m=>m.left===i&&m.right===j);if(!match||used.has(j))throw Error('A current row was selected twice or is not a candidate');used.add(j);pairs.push(match)}return pairs}),"function u18ReviewedPairs(){u18Fresh(u18MatchPreview,u18MatchSig());const used=new Set(),pairs=[];for(let i=0;i<u18MatchPreview.left.rows.length;i++){const choice=u18MatchChoices.get(i);if(!choice)throw Error('Review reference row '+(i+1));if(choice==='none')continue;const j=Number(choice),match=u18MatchPreview.matches.find(m=>m.left===i&&m.right===j);if(!match||used.has(j))throw Error('A current row was selected twice or is not a candidate');used.add(j);pairs.push(match)}return pairs}","u18ReviewedPairs");

__studio33.u18ProgramChoices = __studio33.$fn((function u18ProgramChoices(){__studio33.v12Opt(__studio33.$('u18ProgramSaved'),[['','Choose a program'],...__studio33.u18State.programs.map(r=>[r.name,r.name])],__studio33.$('u18ProgramSaved').value)}),"function u18ProgramChoices(){v12Opt($('u18ProgramSaved'),[['','Choose a program'],...u18State.programs.map(r=>[r.name,r.name])],$('u18ProgramSaved').value)}","u18ProgramChoices");

__studio33.u18ProgramDraw = __studio33.$fn((function u18ProgramDraw(program){const p=__studio33.u18ProgramCheck(program),svg=document.createElementNS('http://www.w3.org/2000/svg','svg'),ns=svg.namespaceURI,height=p.nodes.length*90+30;svg.classList.add('u18-program-svg');svg.setAttribute('viewBox','0 0 600 '+height);svg.setAttribute('role','img');svg.setAttribute('aria-label','Workflow branches and node connections');const pos=new Map(p.nodes.map((n,i)=>[n.id,45+i*90]));for(const n of p.nodes){for(const [to,label]of n.kind==='if'?[[n.then,'then'],[n.else,'else']]:n.kind==='end'?[]:[[n.next,'next']]){const line=document.createElementNS(ns,'path');line.setAttribute('d','M 390 '+pos.get(n.id)+' C 540 '+pos.get(n.id)+' 540 '+pos.get(to)+' 390 '+pos.get(to));line.setAttribute('fill','none');line.setAttribute('stroke','currentColor');const text=document.createElementNS(ns,'text');text.setAttribute('x','460');text.setAttribute('y',String((pos.get(n.id)+pos.get(to))/2));text.textContent=label;svg.append(line,text)}const rect=document.createElementNS(ns,'rect');rect.setAttribute('x','20');rect.setAttribute('y',String(pos.get(n.id)-25));rect.setAttribute('width','370');rect.setAttribute('height','50');rect.setAttribute('rx','8');rect.setAttribute('fill','var(--surface)');rect.setAttribute('stroke','var(--accent)');const text=document.createElementNS(ns,'text');text.setAttribute('x','32');text.setAttribute('y',String(pos.get(n.id)+5));text.setAttribute('fill','currentColor');text.textContent=n.id+' · '+n.kind+(n.action?' '+n.action:n.program?' '+n.program:'');svg.append(rect,text)}__studio33.u18Flow.report.replaceChildren(svg)}),"function u18ProgramDraw(program){const p=u18ProgramCheck(program),svg=document.createElementNS('http://www.w3.org/2000/svg','svg'),ns=svg.namespaceURI,height=p.nodes.length*90+30;svg.classList.add('u18-program-svg');svg.setAttribute('viewBox','0 0 600 '+height);svg.setAttribute('role','img');svg.setAttribute('aria-label','Workflow branches and node connections');const pos=new Map(p.nodes.map((n,i)=>[n.id,45+i*90]));for(const n of p.nodes){for(const [to,label]of n.kind==='if'?[[n.then,'then'],[n.else,'else']]:n.kind==='end'?[]:[[n.next,'next']]){const line=document.createElementNS(ns,'path');line.setAttribute('d','M 390 '+pos.get(n.id)+' C 540 '+pos.get(n.id)+' 540 '+pos.get(to)+' 390 '+pos.get(to));line.setAttribute('fill','none');line.setAttribute('stroke','currentColor');const text=document.createElementNS(ns,'text');text.setAttribute('x','460');text.setAttribute('y',String((pos.get(n.id)+pos.get(to))/2));text.textContent=label;svg.append(line,text)}const rect=document.createElementNS(ns,'rect');rect.setAttribute('x','20');rect.setAttribute('y',String(pos.get(n.id)-25));rect.setAttribute('width','370');rect.setAttribute('height','50');rect.setAttribute('rx','8');rect.setAttribute('fill','var(--surface)');rect.setAttribute('stroke','var(--accent)');const text=document.createElementNS(ns,'text');text.setAttribute('x','32');text.setAttribute('y',String(pos.get(n.id)+5));text.setAttribute('fill','currentColor');text.textContent=n.id+' · '+n.kind+(n.action?' '+n.action:n.program?' '+n.program:'');svg.append(rect,text)}u18Flow.report.replaceChildren(svg)}","u18ProgramDraw");

__studio33.u18GuideDraw = __studio33.$fn((function u18GuideDraw(){const query=__studio33.u18GuideSearch.value.toLowerCase(),rows=__studio33.u18GuideRows().filter(r=>(r.name+' '+r.location+' '+r.meaning+' '+r.choices).toLowerCase().includes(query));__studio33.u15Table(__studio33.u18GuideBody,['Control','What it does','Location / choices'],rows.map(r=>[r.name,r.meaning,r.location+(r.choices?'\nChoices: '+r.choices:'')]))}),"function u18GuideDraw(){const query=u18GuideSearch.value.toLowerCase(),rows=u18GuideRows().filter(r=>(r.name+' '+r.location+' '+r.meaning+' '+r.choices).toLowerCase().includes(query));u15Table(u18GuideBody,['Control','What it does','Location / choices'],rows.map(r=>[r.name,r.meaning,r.location+(r.choices?'\\nChoices: '+r.choices:'')]))}","u18GuideDraw");

__studio33.u26Stats = __studio33.$fn((function u26Stats(values){
 function sum(items){let s=0,c=0;for(const x of items){const t=s+x;c+=Math.abs(s)>=Math.abs(x)?(s-t)+x:(x-t)+s;s=t}return s+c}
 let scale=0;for(const x of values)scale=Math.max(scale,Math.abs(x));
 /* Accumulate the decimal representations of finite input Numbers without losing a
    small remainder even when normalizing by the largest value would underflow. */
 let integerSum=0n,exponent=0;const powers=new Map([[0,1n]]),power=k=>{if(!powers.has(k))powers.set(k,10n**BigInt(k));return powers.get(k)};
 for(const x of values){const m=String(x).match(/^(-?)(\d+)(?:\.(\d+))?(?:e([+-]?\d+))?$/),e=Number(m[4]||0)-(m[3]||'').length,integer=BigInt(m[1]+m[2]+(m[3]||''));if(e<exponent){integerSum*=power(exponent-e);exponent=e}integerSum+=integer*power(e-exponent)}
 const value=__studio33.$fn(divisor=>__studio33.rationalDecimal({n:exponent>=0?integerSum*power(exponent):integerSum,d:BigInt(divisor)*(exponent>=0?1n:power(-exponent))}),"divisor=>rationalDecimal({n:exponent>=0?integerSum*power(exponent):integerSum,d:BigInt(divisor)*(exponent>=0?1n:power(-exponent))})","value"),n=values.length,
 preciseMean=value(n),normal=scale?values.map(x=>x/scale):values.map(()=>0),mean=scale?preciseMean/scale:0,
 variance=sum(normal.map(x=>(x-mean)**2))/n,sorted=[...values].sort((a,b)=>a-b),
 safe=x=>Number.isFinite(x)?x:'Outside finite number range';
 let total;try{total=value(1)}catch{total='Outside finite number range'}
 const lo=sorted[Math.floor((n-1)/2)],hi=sorted[Math.floor(n/2)],median=n%2?lo:Math.max(Math.abs(lo),Math.abs(hi))>Number.MAX_VALUE/2?lo/2+hi/2:(lo+hi)/2;
 return {mean:preciseMean,sum:total,median,
 min:sorted[0],max:sorted[n-1],population:safe(Math.sqrt(Math.max(0,variance))*scale),
 sample:n>1?safe(Math.sqrt(Math.max(0,variance)*n/(n-1))*scale):'Needs 2 values'};
}),"function u26Stats(values){\n function sum(items){let s=0,c=0;for(const x of items){const t=s+x;c+=Math.abs(s)>=Math.abs(x)?(s-t)+x:(x-t)+s;s=t}return s+c}\n let scale=0;for(const x of values)scale=Math.max(scale,Math.abs(x));\n /* Accumulate the decimal representations of finite input Numbers without losing a\n    small remainder even when normalizing by the largest value would underflow. */\n let integerSum=0n,exponent=0;const powers=new Map([[0,1n]]),power=k=>{if(!powers.has(k))powers.set(k,10n**BigInt(k));return powers.get(k)};\n for(const x of values){const m=String(x).match(/^(-?)(\\d+)(?:\\.(\\d+))?(?:e([+-]?\\d+))?$/),e=Number(m[4]||0)-(m[3]||'').length,integer=BigInt(m[1]+m[2]+(m[3]||''));if(e<exponent){integerSum*=power(exponent-e);exponent=e}integerSum+=integer*power(e-exponent)}\n const value=divisor=>rationalDecimal({n:exponent>=0?integerSum*power(exponent):integerSum,d:BigInt(divisor)*(exponent>=0?1n:power(-exponent))}),n=values.length,\n preciseMean=value(n),normal=scale?values.map(x=>x/scale):values.map(()=>0),mean=scale?preciseMean/scale:0,\n variance=sum(normal.map(x=>(x-mean)**2))/n,sorted=[...values].sort((a,b)=>a-b),\n safe=x=>Number.isFinite(x)?x:'Outside finite number range';\n let total;try{total=value(1)}catch{total='Outside finite number range'}\n const lo=sorted[Math.floor((n-1)/2)],hi=sorted[Math.floor(n/2)],median=n%2?lo:Math.max(Math.abs(lo),Math.abs(hi))>Number.MAX_VALUE/2?lo/2+hi/2:(lo+hi)/2;\n return {mean:preciseMean,sum:total,median,\n min:sorted[0],max:sorted[n-1],population:safe(Math.sqrt(Math.max(0,variance))*scale),\n sample:n>1?safe(Math.sqrt(Math.max(0,variance)*n/(n-1))*scale):'Needs 2 values'};\n}","u26Stats");
}
export const steps=[
[1150,function initialize_1150(__studio33){
__studio33.v12Key = 'calc-studio-workspaces-v12';

}],
[1151,function initialize_1151(__studio33){
__studio33.v12Defaults = ()=>({version:1,workflows:[],responses:[],snapshots:[],templates:[],recovery:{enabled:false,tools:[],values:{}}});

}],
[1153,function initialize_1153(__studio33){
__studio33.v12State = undefined;

}],
[1155,function initialize_1155(__studio33){
__studio33.v12Save = __studio33.$fn(()=>{__studio33.v12Validate(__studio33.v12State);__studio33.csPersist(__studio33.v12Key,__studio33.v12State)},"()=>{v12Validate(v12State);csPersist(v12Key,v12State)}","v12Save");

}],
[1158,function initialize_1158(__studio33){
__studio33.v12Tick = ()=>new Promise(r=>setTimeout(r,0));

}],
[1159,function initialize_1159(__studio33){
__studio33.v12Opt = (host,options,value)=>{host.replaceChildren(...options.map(([v,t])=>new Option(t,v)));if(options.some(x=>x[0]===value))host.value=value};

}],
[1335,function initialize_1335(__studio33){
__studio33.v12PreviousValidateBackup = __studio33.validateBackup;

}],
[1337,function initialize_1337(__studio33){
__studio33.v12PreviousSnapshot = __studio33.backupSnapshot;

}],
[1339,function initialize_1339(__studio33){
__studio33.v12PreviousRestore = __studio33.csRestoreSavedWork;

}],
[1363,function initialize_1363(__studio33){
__studio33.v12OriginalCategory = __studio33.categoryForTool;

}],
[1634,function initialize_1634(__studio33){
__studio33.u15Version = 15;

}],
[1635,function initialize_1635(__studio33){
__studio33.u15Style = document.createElement('style');

}],
[1654,function initialize_1654(__studio33){
__studio33.u15CurlStatus = __studio33.u15Status(__studio33.u15Curl,'u15CurlStatus');

}],
[1655,function initialize_1655(__studio33){
__studio33.u15Pairs = new Map();

}],
[1657,function initialize_1657(__studio33){
__studio33.u15OldSanitize = __studio33.lcSanitize;

}],
[1660,function initialize_1660(__studio33){
__studio33.u15OldExportState = __studio33.lcExportState;

}],
[1664,function initialize_1664(__studio33){
__studio33.u15PrivacyOutput = __studio33.u15Field(__studio33.u15Privacy,'u15PrivacyOutput','Exact sanitized request preview','','textarea');

}],
[1667,function initialize_1667(__studio33){
__studio33.u15PrivacyStatus = __studio33.u15Status(__studio33.u15Privacy,'u15PrivacyStatus');

}],
[1672,function initialize_1672(__studio33){
__studio33.u15CheckResults = __studio33.csText('div','');

}],
[1674,function initialize_1674(__studio33){
__studio33.u15Extracted = [];

}],
[1679,function initialize_1679(__studio33){
__studio33.u15ChecksStatus = __studio33.u15Status(__studio33.u15Checks,'u15ChecksStatus');

}],
[1681,function initialize_1681(__studio33){
__studio33.u15OldResponseRender = __studio33.lcResponseRender;

}],
[1686,function initialize_1686(__studio33){
__studio33.u15TreeRows = __studio33.csText('div','');

}],
[1688,function initialize_1688(__studio33){
__studio33.u15TreePage = 0;

}],
[1689,function initialize_1689(__studio33){
__studio33.u15TreeSignature = '';

}],
[1697,function initialize_1697(__studio33){
__studio33.u15TreeStatus = __studio33.u15Status(__studio33.u15Tree,'u15TreeStatus');

}],
[1699,function initialize_1699(__studio33){
__studio33.u15MapRows = __studio33.csText('div','');

}],
[1701,function initialize_1701(__studio33){
__studio33.u15MapState = [];

}],
[1706,function initialize_1706(__studio33){
__studio33.u15MapPreview = __studio33.csText('div','');

}],
[1710,function initialize_1710(__studio33){
__studio33.u15MapStatus = __studio33.u15Status(__studio33.u15Map,'u15MapStatus');

}],
[1712,function initialize_1712(__studio33){
__studio33.u15DiffFields = __studio33.u15Inputs(__studio33.u15Diff);

}],
[1718,function initialize_1718(__studio33){
__studio33.u15BaseCompare = __studio33.compareDeveloperJSON;

}],
[1721,function initialize_1721(__studio33){
__studio33.u15OldDiffReport = __studio33.jsonDiffReport;

}],
[1724,function initialize_1724(__studio33){
__studio33.u15OldRecords = __studio33.v13CompareRecords;

}],
[1727,function initialize_1727(__studio33){
__studio33.u15OldReviewRender = __studio33.v13ReviewRender;

}],
[1730,function initialize_1730(__studio33){
__studio33.u15Profile = __studio33.csText('div','');

}],
[1734,function initialize_1734(__studio33){
__studio33.u15TypeFields = __studio33.u15Inputs(__studio33.u15Data);

}],
[1741,function initialize_1741(__studio33){
__studio33.u15OldVisible = __studio33.dwVisible;

}],
[1747,function initialize_1747(__studio33){
__studio33.u15ValidationHost = __studio33.csText('div','');

}],
[1750,function initialize_1750(__studio33){
__studio33.u15ValidationReport = null;

}],
[1754,function initialize_1754(__studio33){
__studio33.u15DataStatus = __studio33.u15Status(__studio33.u15Data,'u15DataStatus');

}],
[1755,function initialize_1755(__studio33){
__studio33.u15DataSignature = __studio33.dwTable;

}],
[1756,function initialize_1756(__studio33){
__studio33.u15OldDWRender = __studio33.dwRender;

}],
[1758,function initialize_1758(__studio33){
__studio33.u15OldCommit = __studio33.dwCommit;

}],
[1763,function initialize_1763(__studio33){
__studio33.u15RcDetail = __studio33.csText('div','');

}],
[1767,function initialize_1767(__studio33){
__studio33.u15OldRcRun = __studio33.rcRun;

}],
[1769,function initialize_1769(__studio33){
__studio33.u15OldRcRender = __studio33.rcRender;

}],
[1771,function initialize_1771(__studio33){
__studio33.u15RcRulesSignature = '';

}],
[1773,function initialize_1773(__studio33){
__studio33.u15OldReady = __studio33.v13CompareReady;

}],
[1777,function initialize_1777(__studio33){
__studio33.u15EditingStep = null;

}],
[1779,function initialize_1779(__studio33){
__studio33.u15WorkflowFields = __studio33.u15Inputs(__studio33.u15Workflow);

}],
[1785,function initialize_1785(__studio33){
__studio33.u15WorkflowStatus = __studio33.u15Status(__studio33.u15Workflow,'u15WorkflowStatus');

}],
[1791,function initialize_1791(__studio33){
__studio33.u15OldWfValidate = __studio33.wfValidate;

}],
[1794,function initialize_1794(__studio33){
__studio33.u15OldWfRender = __studio33.wfRender;

}],
[1796,function initialize_1796(__studio33){
__studio33.u15PresetFields = __studio33.u15Inputs(__studio33.u15Workflow);

}],
[1799,function initialize_1799(__studio33){
__studio33.u15BaseWfApply = __studio33.wfApply;

}],
[1803,function initialize_1803(__studio33){
__studio33.u15OldBatch = __studio33.wfRunBatch;

}],
[1806,function initialize_1806(__studio33){
__studio33.u15LoanFields = __studio33.u15Inputs(__studio33.u15Loan);

}],
[1809,function initialize_1809(__studio33){
__studio33.u15LoanResults = __studio33.csText('div','');

}],
[1812,function initialize_1812(__studio33){
__studio33.u15LoanReport = null;

}],
[1817,function initialize_1817(__studio33){
__studio33.u15LoanStatus = __studio33.u15Status(__studio33.u15Loan,'u15LoanStatus');

}],
[1820,function initialize_1820(__studio33){
__studio33.u15GraphFields = __studio33.u15Inputs(__studio33.u15Graph);

}],
[1822,function initialize_1822(__studio33){
__studio33.u15PointHost = __studio33.csText('div','');

}],
[1829,function initialize_1829(__studio33){
__studio33.u15RootHost = __studio33.csText('div','');

}],
[1834,function initialize_1834(__studio33){
__studio33.u15GraphStatus = __studio33.u15Status(__studio33.u15Graph,'u15GraphStatus');

}],
[1836,function initialize_1836(__studio33){
__studio33.u15CalcFields = __studio33.u15Inputs(__studio33.u15Calculus);

}],
[1839,function initialize_1839(__studio33){
__studio33.u15CalcRootHost = __studio33.csText('div','');

}],
[1842,function initialize_1842(__studio33){
__studio33.u15CalcStatus = __studio33.u15Status(__studio33.u15Calculus,'u15CalcStatus');

}],
[1846,function initialize_1846(__studio33){
__studio33.u15LogFields = __studio33.u15Inputs(__studio33.u15Logs);

}],
[1848,function initialize_1848(__studio33){
__studio33.u15LogTimeline = __studio33.csText('div','');
__studio33.u15LogLimits = __studio33.csText('div','');
__studio33.u15LogPairs = __studio33.csText('div','');

}],
[1853,function initialize_1853(__studio33){
__studio33.u15LogStatus = __studio33.u15Status(__studio33.u15Logs,'u15LogStatus');

}],
[1856,function initialize_1856(__studio33){
__studio33.u15OldRenderLogs = __studio33.renderLogs;

}],
[1859,function initialize_1859(__studio33){
__studio33.u15OldInvalidateLogs = __studio33.invalidateLogs;

}],
[1862,function initialize_1862(__studio33){
__studio33.u15CompositeHost = __studio33.csText('div','');

}],
[1866,function initialize_1866(__studio33){
__studio33.u15CompositeStatus = __studio33.u15Status(__studio33.u15Composite,'u15CompositeStatus');

}],
[1868,function initialize_1868(__studio33){
__studio33.u15KanbanStats = __studio33.csText('div','');

}],
[1870,function initialize_1870(__studio33){
__studio33.u15KanbanPreview = __studio33.csText('div','');

}],
[1873,function initialize_1873(__studio33){
__studio33.u15PendingSchedule = null;

}],
[1874,function initialize_1874(__studio33){
__studio33.u15OldTransaction = __studio33.knTransaction;

}],
[1881,function initialize_1881(__studio33){
__studio33.u15KanbanStatus = __studio33.u15Status(__studio33.u15Kanban,'u15KanbanStatus');

}],
[1883,function initialize_1883(__studio33){
__studio33.u15ImportHost = __studio33.csText('div','');

}],
[1885,function initialize_1885(__studio33){
__studio33.u15PendingDesign = null;

}],
[1886,function initialize_1886(__studio33){
__studio33.u15OldFDValidate = __studio33.fdValidate;

}],
[1891,function initialize_1891(__studio33){
__studio33.u15ConditionHost = __studio33.csText('div','');

}],
[1900,function initialize_1900(__studio33){
__studio33.u15QualityHost = __studio33.csText('div','');

}],
[1903,function initialize_1903(__studio33){
__studio33.u15QualityReport = null;

}],
[1906,function initialize_1906(__studio33){
__studio33.u15QualityStatus = __studio33.u15Status(__studio33.u15Quality,'u15QualityStatus');

}],
[1907,function initialize_1907(__studio33){
__studio33.u15OldRDRender = __studio33.rdRender;

}],
[1909,function initialize_1909(__studio33){
__studio33.u15Gutters = new Map();

}],
[1913,function initialize_1913(__studio33){
__studio33.u15OldCloseEditor = __studio33.v13CloseEditor;

}],
[1918,function initialize_1918(__studio33){
__studio33.u15OldStatus = __studio33.newToolStatus;

}],
[1920,function initialize_1920(__studio33){
__studio33.u15OldJSONState = __studio33.jsonState;

}],
[1925,function initialize_1925(__studio33){
__studio33.u15LoanCalculateAction = __studio33.$('u15LoanCalculate').onclick;

}],
[1929,function initialize_1929(__studio33){
__studio33.u15OldKNValidate = __studio33.knValidate;

}],
[1938,function initialize_1938(__studio33){
__studio33.u16Style = document.createElement('style');

}],
[1963,function initialize_1963(__studio33){
__studio33.u16OldSend = __studio33.lcSend;

}],
[1966,function initialize_1966(__studio33){
__studio33.u16OldBusy = __studio33.lcBusy;

}],
[1979,function initialize_1979(__studio33){
__studio33.u16TablePreview = __studio33.u16Preview(__studio33.u16Tables,'u16TablePreview');

}],
[1980,function initialize_1980(__studio33){
__studio33.u16TablePending = null;

}],
[1981,function initialize_1981(__studio33){
__studio33.u16TablesStatus = __studio33.u15Status(__studio33.u16Tables,'u16TablesStatus');

}],
[1997,function initialize_1997(__studio33){
__studio33.u16JSONPreview = __studio33.u16Preview(__studio33.u16JSONBox,'u16JSONPreview');

}],
[1998,function initialize_1998(__studio33){
__studio33.u16JSONPending = null;

}],
[1999,function initialize_1999(__studio33){
__studio33.u16JSONStatus = __studio33.u15Status(__studio33.u16JSONBox,'u16JSONStatus');

}],
[2010,function initialize_2010(__studio33){
__studio33.u16ResolutionState = null;
__studio33.u16ResolutionPage = 0;
__studio33.u16Resolved = null;

}],
[2011,function initialize_2011(__studio33){
__studio33.u16ResolutionStatus = __studio33.u15Status(__studio33.u16Resolution,'u16ResolutionStatus');

}],
[2028,function initialize_2028(__studio33){
__studio33.u16HotspotRows = __studio33.u16Preview(__studio33.u16Hotspots,'u16HotspotRows');

}],
[2029,function initialize_2029(__studio33){
__studio33.u16HotspotReport = null;

}],
[2030,function initialize_2030(__studio33){
__studio33.u16HotspotStatus = __studio33.u15Status(__studio33.u16Hotspots,'u16HotspotStatus');

}],
[2036,function initialize_2036(__studio33){
__studio33.u16OldInvalidateLogs = __studio33.invalidateLogs;

}],
[2038,function initialize_2038(__studio33){
__studio33.u16OldRenderLogs = __studio33.renderLogs;

}],
[2039,function initialize_2039(__studio33){
__studio33.u16HotspotSource = null;

}],
[2041,function initialize_2041(__studio33){
__studio33.u16Reviews = new Map();

}],
[2047,function initialize_2047(__studio33){
__studio33.u16PatchPreview = __studio33.u16Preview(__studio33.u16PatchBox,'u16PatchPreview');

}],
[2048,function initialize_2048(__studio33){
__studio33.u16Patch = null;

}],
[2049,function initialize_2049(__studio33){
__studio33.u16PatchStatus = __studio33.u15Status(__studio33.u16PatchBox,'u16PatchStatus');

}],
[2060,function initialize_2060(__studio33){
__studio33.u16CompositeMapped = null;
__studio33.u16Retry = null;

}],
[2061,function initialize_2061(__studio33){
__studio33.u16CompositeStatus = __studio33.u15Status(__studio33.u16Composite,'u16CompositeStatus');

}],
[2077,function initialize_2077(__studio33){
__studio33.u16WorkflowStatus = __studio33.u15Status(__studio33.u16Workflow,'u16WorkflowStatus');

}],
[2079,function initialize_2079(__studio33){
__studio33.u16OldWFValidate = __studio33.wfValidate;

}],
[2081,function initialize_2081(__studio33){
__studio33.u16OldEditWF = __studio33.u15EditWorkflow;

}],
[2083,function initialize_2083(__studio33){
__studio33.u16BaseProcess = __studio33.u15ProcessStep;

}],
[2087,function initialize_2087(__studio33){
__studio33.u16OldWFRender = __studio33.wfRender;

}],
[2093,function initialize_2093(__studio33){
__studio33.u16PlanningRows = __studio33.u16Preview(__studio33.u16Planning,'u16PlanningRows');

}],
[2094,function initialize_2094(__studio33){
__studio33.u16PlanReport = null;

}],
[2095,function initialize_2095(__studio33){
__studio33.u16PlanningStatus = __studio33.u15Status(__studio33.u16Planning,'u16PlanningStatus');

}],
[2097,function initialize_2097(__studio33){
__studio33.u16OldKNValidate = __studio33.knValidate;

}],
[2106,function initialize_2106(__studio33){
__studio33.u16OldKNRender = __studio33.knRender;

}],
[2107,function initialize_2107(__studio33){
__studio33.u16CapacityBoard = '';
__studio33.u16CapacityValue = '';

}],
[2110,function initialize_2110(__studio33){
__studio33.u16FinanceFields = __studio33.u15Inputs(__studio33.u16Finance);

}],
[2117,function initialize_2117(__studio33){
__studio33.u16FinanceRows = __studio33.u16Preview(__studio33.u16Finance,'u16FinanceRows');

}],
[2118,function initialize_2118(__studio33){
__studio33.u16DatedLoan = null;

}],
[2119,function initialize_2119(__studio33){
__studio33.u16FinanceStatus = __studio33.u15Status(__studio33.u16Finance,'u16FinanceStatus');

}],
[2120,function initialize_2120(__studio33){
__studio33.u16StateKey = 'calc-studio-edition-16';

}],
[2122,function initialize_2122(__studio33){
__studio33.u16State = undefined;

}],
[2125,function initialize_2125(__studio33){
__studio33.u16LoanInputs = ['u16LoanPrincipal','u16LoanAnnual','u16LoanStart','u16LoanFirst','u16LoanPayments','u16LoanFees','u16LoanFrequency','u16LoanPolicy','u16LoanEvents'];

}],
[2146,function initialize_2146(__studio33){
__studio33.u16OldFDValidate = __studio33.fdValidate;

}],
[2151,function initialize_2151(__studio33){
__studio33.u16OldFDRender = __studio33.fdRender;

}],
[2153,function initialize_2153(__studio33){
__studio33.u16OldFDHTML = __studio33.fdHTML;

}],
[2155,function initialize_2155(__studio33){
__studio33.u16OldRDNormalize = __studio33.rdNormalize;

}],
[2158,function initialize_2158(__studio33){
__studio33.u16ResponseFields = __studio33.u16Preview(__studio33.u16ResponseRules,'u16ResponseFields');

}],
[2161,function initialize_2161(__studio33){
__studio33.u16ResponsePreview = __studio33.u16Preview(__studio33.u16ResponseRules,'u16ResponsePreview');

}],
[2162,function initialize_2162(__studio33){
__studio33.u16Migration = null;

}],
[2163,function initialize_2163(__studio33){
__studio33.u16ResponseStatus = __studio33.u15Status(__studio33.u16ResponseRules,'u16ResponseStatus');

}],
[2171,function initialize_2171(__studio33){
__studio33.u16MigrationGeneration = 0;

}],
[2173,function initialize_2173(__studio33){
__studio33.u16PreviousRDRender = __studio33.rdRender;

}],
[2175,function initialize_2175(__studio33){
__studio33.u16Splits = new Map();

}],
[2183,function initialize_2183(__studio33){
__studio33.u16HistoryPreview = __studio33.u16Preview(__studio33.u16History,'u16HistoryPreview');

}],
[2184,function initialize_2184(__studio33){
__studio33.u16HistoryStatus = __studio33.u15Status(__studio33.u16History,'u16HistoryStatus');

}],
[2193,function initialize_2193(__studio33){
__studio33.u16RunRestoreUndo = null;

}],
[2199,function initialize_2199(__studio33){
__studio33.u16PreviousValidateBackup = __studio33.validateBackup;

}],
[2201,function initialize_2201(__studio33){
__studio33.u16PreviousBackup = __studio33.backupSnapshot;

}],
[2203,function initialize_2203(__studio33){
__studio33.u16PreviousRestore = __studio33.csRestoreSavedWork;

}],
[2214,function initialize_2214(__studio33){
__studio33.u17Style = document.createElement('style');

}],
[2218,function initialize_2218(__studio33){
__studio33.u17Panels = new Map();

}],
[2249,function initialize_2249(__studio33){
__studio33.u17Mobile = __studio33.csText('nav','','u17-mobile-actions');

}],
[2253,function initialize_2253(__studio33){
__studio33.u17MobileKey = '';

}],
[2287,function initialize_2287(__studio33){
__studio33.u18StateKey = 'calc-studio-edition-18';

}],
[2289,function initialize_2289(__studio33){
__studio33.u18State = undefined;

}],
[2305,function initialize_2305(__studio33){
__studio33.u18PreviousFDHTML = __studio33.fdHTML;

}],
[2307,function initialize_2307(__studio33){
__studio33.u18PreviousFDValidate = __studio33.fdValidate;

}],
[2309,function initialize_2309(__studio33){
__studio33.u18PreviousRDNormalize = __studio33.rdNormalize;

}],
[2311,function initialize_2311(__studio33){
__studio33.u18Style = document.createElement('style');

}],
[2324,function initialize_2324(__studio33){
__studio33.u18Operations = [];
__studio33.u18APIBinding = null;
__studio33.u18SentBinding = null;

}],
[2330,function initialize_2330(__studio33){
__studio33.u18OldSend = __studio33.lcSend;

}],
[2338,function initialize_2338(__studio33){
__studio33.u18MetaReport = null;

}],
[2343,function initialize_2343(__studio33){
__studio33.u18SourceFiles = [];
__studio33.u18SourceReport = null;

}],
[2350,function initialize_2350(__studio33){
__studio33.u18MapPreview = null;

}],
[2360,function initialize_2360(__studio33){
__studio33.u18RecipePreview = null;

}],
[2363,function initialize_2363(__studio33){
__studio33.u18RecipeSig = __studio33.$fn(()=>__studio33.u18Signature(['u18RecipeSteps'],__studio33.dwTable),"()=>u18Signature(['u18RecipeSteps'],dwTable)","u18RecipeSig");

}],
[2374,function initialize_2374(__studio33){
__studio33.u18MatchPreview = null;
__studio33.u18MatchChoices = new Map();

}],
[2386,function initialize_2386(__studio33){
__studio33.u18ProgramJob = null;
__studio33.u18ProgramTestReport = null;

}],
[2401,function initialize_2401(__studio33){
__studio33.u18LevelPreview = null;

}],
[2402,function initialize_2402(__studio33){
__studio33.u18LevelSig = __studio33.$fn(()=>__studio33.u18Signature(['u18AvailabilityJSON','u18LevelStart'],__studio33.knCurrent()),"()=>u18Signature(['u18AvailabilityJSON','u18LevelStart'],knCurrent())","u18LevelSig");

}],
[2418,function initialize_2418(__studio33){
__studio33.u18ActualPreview = null;

}],
[2419,function initialize_2419(__studio33){
__studio33.u18ActualSig = __studio33.$fn(()=>__studio33.u18Signature(['u18ActualPayments','u18ActualDate','u18Rounding'],__studio33.u16LoanConfig()),"()=>u18Signature(['u18ActualPayments','u18ActualDate','u18Rounding'],u16LoanConfig())","u18ActualSig");

}],
[2422,function initialize_2422(__studio33){
__studio33.u18Guide = document.createElement('dialog');

}],
[2426,function initialize_2426(__studio33){
__studio33.u18GuideHeader = __studio33.csText('header','');
__studio33.u18GuideTitle = __studio33.csText('h2','Tool Guide');
__studio33.u18GuideSearch = document.createElement('input');
__studio33.u18GuideBody = __studio33.csText('div','');

}],
[2432,function initialize_2432(__studio33){
__studio33.u18GuideDescriptions = {jsonPretty:'Formats JSON using the selected indentation and sorting settings.',jsonMinify:'Removes formatting whitespace while preserving JSON values.',jsonValidate:'Checks JSON syntax without transforming the input.',jsonClear:'Clears the JSON working editors.',lcSend:'Sends the current HTTP request using reviewed URL, authentication and settings.',lcMethod:'Selects the HTTP method for the request.',lcEnvironment:'Selects variables for resolving request placeholders.',lcCancel:'Aborts the active browser request; it cannot undo server-side effects.',rcRun:'Compares the two sources using the selected keys, mappings and rules.',dwLoad:'Parses the source into the working table.',wfRun:'Runs the existing linear workflow from the beginning.',fdAdd:'Adds or saves a field in the form design.',knAdd:'Opens a new task editor.',jsonIndent:'Chooses the number of spaces used for JSON formatting.'};

}],
[2436,function initialize_2436(__studio33){
__studio33.u18GuideButton = __studio33.csButton('Guide',__studio33.$fn(()=>{__studio33.u18GuideTitle.textContent=(__studio33.views[__studio33.activeView]||'Tool')+' · Guide';__studio33.u18GuideSearch.value='';__studio33.u18GuideDraw();__studio33.u18Guide.showModal();__studio33.u18GuideSearch.focus()},"()=>{u18GuideTitle.textContent=(views[activeView]||'Tool')+' · Guide';u18GuideSearch.value='';u18GuideDraw();u18Guide.showModal();u18GuideSearch.focus()}",""));

}],
[2442,function initialize_2442(__studio33){
__studio33.u18OldBackup = __studio33.backupSnapshot;

}],
[2444,function initialize_2444(__studio33){
__studio33.u18OldValidateBackup = __studio33.validateBackup;

}],
[2446,function initialize_2446(__studio33){
__studio33.u18OldRestore = __studio33.csRestoreSavedWork;

}],
[3314,function initialize_3314(__studio33){
__studio33.u26JSONWorkerSource = null;
__studio33.u26CellEdit = null;

}],
[3315,function initialize_3315(__studio33){
__studio33.u26BackupTicket = 0;
__studio33.u26RecordsTicket = 0;

}],
[3319,function initialize_3319(__studio33){
__studio33.u26ScientificEvaluate = __studio33.evaluate;

}],
[3322,function initialize_3322(__studio33){
__studio33.u26VisibleOld = __studio33.dwVisible;

}],
[3323,function initialize_3323(__studio33){
__studio33.u26VisibleCache = null;

}],
[3325,function initialize_3325(__studio33){
__studio33.u26RenderOld = __studio33.dwRender;

}],
[3328,function initialize_3328(__studio33){
__studio33.u26FilterTimer = 0;

}],
[3330,function initialize_3330(__studio33){
__studio33.u26TextPage = 0;
__studio33.u26TextRef = null;
__studio33.u26TextSame = null;

}],
[3331,function initialize_3331(__studio33){
__studio33.u26TextPager = __studio33.csText('div','','u24-pager');
__studio33.u26TextPageLabel = __studio33.csText('span','');

}],
[3338,function initialize_3338(__studio33){
__studio33.u26Polished = new WeakSet();
__studio33.u26PolishOld = __studio33.u24PolishEditor;

}],
[3341,function initialize_3341(__studio33){
__studio33.u26PerformanceFrame = 0;

}]
];
