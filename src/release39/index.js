const mounted=new WeakMap();
export async function installImprovements(api,root,id){
 if(!root)return;if(!mounted.has(root))mounted.set(root,new Set());const done=mounted.get(root),groups=[];
 const install=(key,load)=>{if(!done.has(key))groups.push(load().then(()=>done.add(key)))};
 if(id==='imagestudio')install('image',()=>import('../workflows/image-batch.js').then(m=>m.installImageBatchAdapter(api.c)));
 if(['integrationstudio','logs'].includes(id))install('developer',()=>import('./developer.js').then(m=>m.installDeveloper(api,root,id)));
 if(['dataworkbench','comparisonstudio','querystudio','localizationstudio'].includes(id))install('data',()=>import('./data.js').then(m=>m.installData(api,root,id)));
 if(id==='citationmanager')install('research',()=>import('./research.js').then(m=>m.installResearch(api,root,id)));
 await Promise.all(groups);const {installRelease40}=await import('../release40/index.js');installRelease40(api,root,id);if(!done.has('v50')){const {installDeveloper50}=await import('../release50/developer-ui.js');installDeveloper50(api,root,id);const {installMedia50}=await import('../release50/media-ui.js');installMedia50(root,id);done.add('v50');}
}
