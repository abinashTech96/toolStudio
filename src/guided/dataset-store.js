// Explicit in-memory capacity: never silently evict user data.
const shelf=new Map();let generation=0;
export const DATASET_LIMITS=Object.freeze({count:20,bytes:8000000,itemBytes:4000000,rows:50000,columns:200});
const copy=v=>structuredClone(v),size=v=>new TextEncoder().encode(JSON.stringify(v)).length;
export function validateDataset(rows){if(!Array.isArray(rows)||rows.length>DATASET_LIMITS.rows||rows.some(r=>!r||typeof r!=='object'||Array.isArray(r)))throw Error('Dataset needs up to 50,000 row objects');if(new Set(rows.flatMap(Object.keys)).size>200||size(rows)>DATASET_LIMITS.itemBytes)throw Error('Dataset limits: 4 MB, 50,000 rows, 200 columns');return rows}
export function datasetUsage(){return{count:shelf.size,bytes:[...shelf.values()].reduce((n,v)=>n+v.bytes,0),limits:DATASET_LIMITS}}
export function preflightDatasets(items,{replace}={}){let count=shelf.size-(replace&&shelf.has(replace)?1:0),bytes=datasetUsage().bytes-(shelf.get(replace)?.bytes||0);for(const item of items){validateDataset(item.rows);count++;bytes+=size(item.rows)}if(count>20||bytes>DATASET_LIMITS.bytes)throw Error('Shared dataset capacity: 20 datasets / 8 MB total. Export, replace or delete a dataset first.');return{count,bytes}}
export function putDataset(name,rows,{replace,parent,operation='import'}={}){if(replace&&!shelf.has(replace))throw Error('Dataset to replace no longer exists');preflightDatasets([{rows}],{replace});const previous=shelf.get(replace),id=replace||'dataset-'+(generation+1),revision=++generation;shelf.set(id,{name:String(name||id).slice(0,160),rows:copy(rows),bytes:size(rows),revision,lineage:[...(previous?.lineage||[]),{revision,parent:parent||null,operation:String(operation).slice(0,160),time:new Date().toISOString()}].slice(-50)});if(typeof window!=='undefined')window.dispatchEvent(new Event('studio:datasets-changed'));return id}
export function deleteDataset(id){if(!shelf.delete(id))throw Error('Dataset no longer exists');generation++;if(typeof window!=='undefined')window.dispatchEvent(new Event('studio:datasets-changed'))}
export function clearDatasets(){shelf.clear();generation++;if(typeof window!=='undefined')window.dispatchEvent(new Event('studio:datasets-changed'))}
export function datasetEntries(){return[...shelf].map(([id,v])=>({id,name:v.name,rows:v.rows.length,bytes:v.bytes,revision:v.revision,lineage:copy(v.lineage)}))}
export function getDataset(id){if(!shelf.has(id))throw Error('Select an available shared dataset');return copy(shelf.get(id))}
export function bundleDatasets(ids=[...shelf.keys()]){return ids.map(id=>({id,...getDataset(id)}))}
