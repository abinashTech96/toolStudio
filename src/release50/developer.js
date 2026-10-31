// Local analysis only. No request is sent and no supplied expression is evaluated.
const object = x => x !== null && typeof x === 'object' && !Array.isArray(x);
const escape = s => s.replaceAll('~','~0').replaceAll('/','~1');
export function responseFields(value, {limit=2000}={}) {
  const rows=[], stack=[{value,pointer:'',path:'$'}];
  while(stack.length && rows.length<limit) {
    const item=stack.pop(), v=item.value;
    rows.push({...item,type:v===null?'null':Array.isArray(v)?'array':typeof v});
    if(item.pointer.split('/').length>40)continue;
    if(v && typeof v==='object') {
      const entries=Object.entries(v).slice(0,limit-rows.length);
      for(let i=entries.length-1;i>=0;i--){const[k,next]=entries[i];stack.push({value:next,pointer:item.pointer+'/'+escape(k),path:item.path+(Array.isArray(v)?'['+k+']':'['+JSON.stringify(k)+']')});}
    }
  }
  return {rows,truncated:stack.length>0};
}
export function atPointer(value,pointer) {
  if(pointer==='')return value;
  if(typeof pointer!=='string'||!pointer.startsWith('/')||/~(?![01])/u.test(pointer))throw Error('Use an RFC 6901 JSON pointer');
  let current=value;
  for(const key of pointer.slice(1).split('/').map(s=>s.replaceAll('~1','/').replaceAll('~0','~'))){if(!current||typeof current!=='object'||!Object.hasOwn(current,key))throw Error('Response field not found');current=current[key];}
  return current;
}
export function assertionFor(value,pointer) {const selected=atPointer(value,pointer);if(JSON.stringify(selected).length>16000)throw Error('Choose a smaller response field');return {pointer,equals:structuredClone(selected)};}
export function compositeGraphs(payload) {
  const graphs=Array.isArray(payload?.graphs)?payload.graphs:payload?.compositeRequest?[{graphId:'composite',compositeRequest:payload.compositeRequest}]:null;
  if(!graphs||graphs.length>75)throw Error('Use a Composite or Composite Graph JSON payload');
  let count=0;
  return graphs.map((graph,g)=>{
    if(!object(graph)||!Array.isArray(graph.compositeRequest)||graph.compositeRequest.length>500||(count+=graph.compositeRequest.length)>500)throw Error('Editor limit: 500 requests');
    const known=new Map(),nodes=graph.compositeRequest.map((r,index)=>{if(!object(r)||typeof r.referenceId!=='string'||!r.referenceId||r.referenceId.length>100)throw Error('Every request needs a referenceId');if(known.has(r.referenceId))throw Error('Duplicate referenceId in graph: '+r.referenceId);known.set(r.referenceId,index);return {id:r.referenceId,index,method:String(r.method||'GET'),url:String(r.url||''),dependsOn:[],issues:[]};});
    for(const n of nodes){const request=graph.compositeRequest[n.index],text=JSON.stringify([request.url,request.body]);for(const match of text.matchAll(/@\{([A-Za-z0-9_]+)(?:[.\[])[^}]*\}/g)){const dependency=match[1];if(!n.dependsOn.includes(dependency))n.dependsOn.push(dependency);if(!known.has(dependency))n.issues.push('Missing reference '+dependency);else if(known.get(dependency)>=n.index)n.issues.push('Reference must point to an earlier request: '+dependency);}}
    return {graphIndex:g,id:String(graph.graphId??g+1),nodes};
  });
}
export function editComposite(payload,graphIndex,requestIndex,patch) {
  compositeGraphs(payload);
  if(!Number.isInteger(graphIndex)||!Number.isInteger(requestIndex))throw Error('Select a graph and request');
  const copy=structuredClone(payload),requests=copy.graphs?copy.graphs[graphIndex]?.compositeRequest:graphIndex===0?copy.compositeRequest:null;
  if(!requests?.[requestIndex])throw Error('Select an existing request');
  if(!object(patch)||Object.keys(patch).some(k=>!['method','url','body'].includes(k)))throw Error('Only method, URL and body are editable here');
  if(patch.method!==undefined&&!['GET','POST','PATCH','PUT','DELETE','HEAD','OPTIONS'].includes(patch.method))throw Error('Choose a supported HTTP method');
  if(patch.url!==undefined&&(typeof patch.url!=='string'||patch.url.length>8000))throw Error('URL exceeds editor limit');
  Object.assign(requests[requestIndex],structuredClone(patch));return copy;
}
export function requestScenario(request,{kind='success',field='',expectedStatus=200}={}) {
  if(!object(request))throw Error('Select a request');
  if(!Number.isInteger(expectedStatus)||expectedStatus<100||expectedStatus>599)throw Error('Expected status must be 100–599');
  const out=structuredClone(request);out.id=String(request.id||'request').slice(0,80)+'-'+kind;
  if(['missing-field','invalid-value'].includes(kind)){
    if(!object(out.body)||!field||!Object.hasOwn(out.body,field))throw Error('Choose an existing top-level JSON body field');
    if(kind==='missing-field')delete out.body[field];else Object.defineProperty(out.body,field,{value:{invalidTestValue:true},enumerable:true,writable:true,configurable:true});
  }else if(kind==='invalid-token'){
    out.headers=Object.fromEntries(Object.entries(out.headers||{}).filter(([k])=>k.toLowerCase()!=='authorization'));out.headers.Authorization='Bearer deliberately-invalid-test-token';
  }else if(kind!=='success')throw Error('Choose a supported scenario');
  out.assertions=[{status:expectedStatus}];return out;
}
export function contractChanges(before,after) {
  if(!object(before)||!object(after))throw Error('Use schema or OpenAPI objects');
  const rows=[];let visited=0;
  const walk=(a,b,path,depth)=>{
    if(++visited>10000||depth>40)throw Error('Contract comparison exceeds its structural limit');
    if(!object(a)||!object(b))return;
    if(a.$ref!==b.$ref)rows.push({path,change:'reference changed',before:a.$ref??null,after:b.$ref??null,review:true});
    if(JSON.stringify(a.type)!==JSON.stringify(b.type))rows.push({path,change:'type changed',before:a.type??null,after:b.type??null,review:true});
    if(b.required!==undefined&&!Array.isArray(b.required)&&typeof b.required!=='boolean')throw Error('Invalid required declaration');if(b.required===true&&a.required!==true)rows.push({path,change:'parameter newly required',review:true});
    for(const name of Array.isArray(b.required)?b.required:[])if(!(Array.isArray(a.required)?a.required:[]).includes(name))rows.push({path:path+'/properties/'+escape(name),change:'newly required',review:true});
    for(const[name,value]of Object.entries(a.properties||{})){if(!Object.hasOwn(b.properties||{},name))rows.push({path:path+'/properties/'+escape(name),change:'field removed',review:true});else walk(value,b.properties[name],path+'/properties/'+escape(name),depth+1);}
    for(const name of Object.keys(b.properties||{}))if(!Object.hasOwn(a.properties||{},name))rows.push({path:path+'/properties/'+escape(name),change:'field added',review:false});
    for(const k of ['items','additionalProperties'])if(object(a[k])&&object(b[k]))walk(a[k],b[k],path+'/'+k,depth+1);
    const handled=new Set(['type','required','$ref','properties','items','additionalProperties']);
    for(const k of new Set([...Object.keys(a),...Object.keys(b)])){
      if(handled.has(k))continue;const av=a[k],bv=b[k],p=path+'/'+escape(k);
      if(!Object.hasOwn(b,k)&&object(av))rows.push({path:p,change:'entry removed',review:true});
      else if(!Object.hasOwn(a,k)&&object(bv))rows.push({path:p,change:'entry added',review:false});
      else if(object(av)&&object(bv))walk(av,bv,p,depth+1);
      else if(Array.isArray(av)&&Array.isArray(bv)&&['allOf','anyOf','oneOf','prefixItems','parameters'].includes(k)){for(let i=0;i<Math.max(av.length,bv.length);i++){if(i>=bv.length)rows.push({path:p+'/'+i,change:'entry removed',review:true});else if(i>=av.length)rows.push({path:p+'/'+i,change:'entry added',review:false});else walk(av[i],bv[i],p+'/'+i,depth+1);}}
    }
  };
  walk(before,after,'',0);return rows;
}
const explanations={
  INVALID_SESSION_ID:'The session or token was rejected. Review authentication and the intended org; obtain a valid token before retrying.',
  REQUIRED_FIELD_MISSING:'Salesforce reports missing required input. Review the returned fields and the applicable record requirements.',
  INVALID_FIELD:'Review the exact field API name and the supplied object/metadata. This report cannot determine live org access.',
  INSUFFICIENT_ACCESS_OR_READONLY:'Salesforce rejected access to this operation or record. Ask an administrator to review the integration user’s access.',
  FIELD_CUSTOM_VALIDATION_EXCEPTION:'A validation rule rejected this input. Review the returned message and correct the data.',
  DUPLICATES_DETECTED:'A duplicate rule rejected this record. Review existing records and the returned duplicate information.',
  PROCESSING_HALTED:'A dependent subrequest did not run. Inspect the earlier failed request and its references.'
};
export function explainSalesforceErrors(value) {
  const out=[],stack=[{value,request:null}];let visited=0;
  while(stack.length){if(++visited>10000)throw Error('Error report exceeds structural limit');const{value:v,request}=stack.pop();if(!v||typeof v!=='object')continue;const owner=typeof v.referenceId==='string'?v.referenceId:request;
    if(typeof v.errorCode==='string')out.push({request:owner,code:v.errorCode,message:String(v.message||''),fields:Array.isArray(v.fields)?v.fields.filter(f=>typeof f==='string'):[],suggestion:explanations[v.errorCode]||'Unrecognized error. Review the original response and the API documentation; no org-specific cause has been inferred.'});
    for(const next of Object.values(v))if(next&&typeof next==='object')stack.push({value:next,request:owner});
  }
  return out.reverse();
}
