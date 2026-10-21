import fs from 'node:fs';
import{transformSync,buildSync}from'esbuild';
import {createSourcePool} from './serialized-sources.mjs';
import {buildAdvanced} from './build-advanced.mjs';
import {gzipSync} from 'node:zlib';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),out=path.join(root,'dist');
const read=p=>fs.readFileSync(path.join(root,p),'utf8'),json=p=>JSON.parse(read(p));
const hash=data=>crypto.createHash('sha256').update(data).digest('hex');
function write(name,data){const p=path.join(out,name);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,data)}
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)])}
if(fs.existsSync(out))fs.rmSync(out,{recursive:true});fs.mkdirSync(out,{recursive:true});
const seed=json('src/registry-seed.json'),plan=json('src/initialization.json'),modules=[],categories=[];
for(const folder of fs.readdirSync(path.join(root,'src/categories'),{withFileTypes:true}).filter(d=>d.isDirectory())){
 const rel='src/categories/'+folder.name,category=json(rel+'/category.json');category.label=folder.name;
 const owned=[];for(const entry of fs.readdirSync(path.join(root,rel),{withFileTypes:true}).filter(d=>d.isDirectory())){
  const at=rel+'/'+entry.name;if(!fs.existsSync(path.join(root,at,'module.json')))continue;
  const module=json(at+'/module.json');module.label=entry.name;module.category=category.id;module.path=at;
  if(!/^[a-z][a-z0-9-]*$/i.test(module.id))throw Error('Invalid stable module ID: '+module.id);
  if(modules.some(m=>m.id===module.id))throw Error('Duplicate workspace ID: '+module.id);
  if(!Array.isArray(module.routes)||!module.routes.includes(module.id))throw Error(module.id+' must include its stable ID in routes');
  owned.push(module);modules.push(module);
 }
 owned.sort((a,b)=>(a.order??999)-(b.order??999)||a.label.localeCompare(b.label));
 category.workspaces=owned.map(m=>m.id);categories.push(category);
}
categories.sort((a,b)=>a.order-b.order);const moduleMap=new Map(modules.map(m=>[m.id,m]));
// A migrated module may supply helpers to other workspaces. Validate dependencies explicitly.
for(const planned of plan.modules)if(seed.modules.some(m=>m.id===planned.id)&&!moduleMap.has(planned.id))throw Error('Missing migrated workspace '+planned.id+'. Disable it in Manage tools, or migrate its shared dependencies before removing its source.');
const moduleRecords=plan.modules.map(record=>({...record,path:moduleMap.has(record.id)?moduleMap.get(record.id).path+'/logic.js':record.path}));
const fragments=new Map();for(const module of modules){const view=read(module.path+'/view.html');for(const match of view.matchAll(/<!-- fragment:([a-z0-9-]+) -->\n([\s\S]*?)\n<!-- \/fragment:\1 -->/gi)){if(fragments.has(match[1]))throw Error('Duplicate view fragment '+match[1]);fragments.set(match[1],match[2])}}
let shell=read('src/shell/index.html').replace(/<!-- studio-view:([a-z0-9-]+) -->/gi,(_,id)=>{if(!fragments.has(id))throw Error('Missing view '+id);return fragments.get(id)});
const styles=[...seed.styles,{id:'homeStyles',path:'src/shared/styles/homeStyles.css'}].map(style=>{let source=style.path;const oldModule=seed.modules.find(m=>source.startsWith(m.path+'/'));if(oldModule)source=moduleMap.get(oldModule.id).path+source.slice(oldModule.path.length);const css=read(source),href='assets/styles/'+style.id+'.'+hash(css).slice(0,12)+'.css';write(href,css);return{...style,css,href}});
let hosted=shell,offline=shell;
const workspaceCSS=read('src/shared/styles/workspace.css'),workspaceStyle='assets/styles/workspace.'+hash(workspaceCSS).slice(0,12)+'.css';write(workspaceStyle,workspaceCSS);
for(const style of styles){hosted=hosted.replace('<!-- studio-style:'+style.id+' -->','<link rel="stylesheet" id="'+style.id+'" href="./'+style.href+'">');offline=offline.replace('<!-- studio-style:'+style.id+' -->','<style id="'+style.id+'">'+style.css+'</style>')}
for(const asset of plan.resources.ocr){const data=fs.readFileSync(path.join(root,'public',asset.path));if(hash(data)!==asset.sha256)throw Error('OCR asset changed: '+asset.id);hosted=hosted.replace('<!-- studio-ocr:'+asset.id+' -->','<script type="application/octet-stream" id="'+asset.id+'"></script>');offline=offline.replace('<!-- studio-ocr:'+asset.id+' -->','<script type="application/octet-stream" id="'+asset.id+'">'+data.toString('base64')+'</script>')}
// Real ES modules keep tool ownership separate; compact category chunks reduce startup requests.
function factory(record){const source=read(record.path);if(/^import\s/m.test(source)){const text=buildSync({entryPoints:[path.join(root,record.path)],bundle:true,format:'iife',globalName:'SharedModule',platform:'browser',target:'es2022',write:false}).outputFiles[0].text;return'(()=>{\n'+text+'\nreturn SharedModule;\n})()'}const text=source.replace(/^export\s+/gm,'');return'(()=>{\n'+text+'\nreturn {id,register,steps};\n})()'}
const groups=new Map();for(const record of moduleRecords){const key=moduleMap.has(record.id)?moduleMap.get(record.id).category:record.id.startsWith('core/')?'core':'shared';if(!groups.has(key))groups.set(key,[]);groups.get(key).push(record)}
const sourcePool=createSourcePool();
const chunks=[];for(const[key,records]of groups){const raw=sourcePool.transform('export const modules=[\n'+records.map(factory).join(',\n')+'\n];\n'),text=transformSync(raw,{minifyWhitespace:true,minifyIdentifiers:false,minifySyntax:false,target:'es2022',legalComments:'none'}).code,href='runtime/'+key+'.'+hash(text).slice(0,12)+'.js';write(href,text);chunks.push(href)}
const sourceBytes=gzipSync(JSON.stringify(sourcePool.sources)),sourceURL='runtime/helper-sources.'+hash(sourceBytes).slice(0,12)+'.bin';write(sourceURL,sourceBytes);chunks.push(sourceURL);
const advanced=await buildAdvanced(root,out,modules);
const registry={version:35,appVersion:json('package.json').version,categories:categories.filter(c=>c.id!=='shared'),modules:modules.map(({path,...m})=>m),sourceModules:moduleRecords.length+modules.filter(m=>m.kind==='native').length,legacyRoutes:seed.tools.length,totalRoutes:modules.reduce((n,m)=>n+m.routes.length,0)};
write('registry.generated.json',JSON.stringify(registry,null,2)+'\n');
const runtimeFiles={};for(const name of ['context','resources','lifecycle','home']){const text=buildSync({entryPoints:[path.join(root,'src/core/'+name+'.js')],bundle:true,format:'esm',platform:'browser',target:'es2022',write:false}).outputFiles[0].text,href='runtime/'+name+'.'+hash(text).slice(0,12)+'.js';write(href,text);runtimeFiles[name]=href}
const config={registry,chunks:chunks.filter(p=>p.endsWith('.js')),serializedSources:sourceURL,advancedRuntime:advanced.runtime,advancedAssets:advanced.assets,resourceConfig:plan.resources,bindings:plan.bindings,context:runtimeFiles.context,resourceRuntime:runtimeFiles.resources,lifecycle:runtimeFiles.lifecycle,home:runtimeFiles.home};
let boot=read('src/core/bootstrap.js').replace('/* BUILD_CONFIG */',JSON.stringify(config));
const bootURL='runtime/bootstrap.'+hash(boot).slice(0,12)+'.js';write(bootURL,boot);
hosted=hosted.replace('<!-- studio-runtime -->','<script type="module" src="./'+bootURL+'"></script>');
hosted=hosted.replace('</head>','<link rel="manifest" href="./manifest.webmanifest"><meta name="theme-color" content="#253d32"></head>');
hosted=hosted.replace('<body','<body data-loading="true"');hosted=hosted.replace('</head>','<style>body[data-loading]>.shell{visibility:hidden!important}body[data-loading] .studio-header,body[data-loading] .main-card{visibility:hidden!important}</style></head>');hosted=hosted.replace('</body>','<div id="studioBoot" role="status" style="position:fixed;inset:0;z-index:99999;display:grid;place-content:center;background:#f4f7f0;color:#253d32;font:18px system-ui;text-align:center"><p id="studioBootText">Opening Tool Studio…</p><button id="studioBootRetry" hidden onclick="location.reload()">Retry</button></div></body>');
hosted=hosted.replace('</head>','<link rel="stylesheet" href="./'+advanced.style+'"><link rel="stylesheet" href="./'+workspaceStyle+'"></head>');
write('index.html',hosted);
// The offline build comes from the same source modules, with assets embedded for file:// use.
const runtimeInline=['context','lifecycle','home'].map(name=>{const globalName='StudioCore_'+name;return buildSync({entryPoints:[path.join(root,'src/core/'+name+'.js')],bundle:true,format:'iife',globalName,platform:'browser',target:'es2022',write:false}).outputFiles[0].text+'\nconst {'+({context:'createContext,initializeModules',lifecycle:'installLifecycle',home:'installHome'}[name])+'}='+globalName+';'}).join('\n');
const inlineVendors=Object.entries(plan.resources.vendors).map(([key,href])=>'__studio33.studioLibraryFactories['+JSON.stringify(key)+']=('+read('public/'+href).replace(/^\/\/[^\n]*\n/,'').replace(/^export default /,'').replace(/;\s*$/,'')+');').join('\n');
const inlineWorkers=Object.entries(plan.resources.workers).map(([key,href])=>'__studio33['+JSON.stringify(key)+']='+JSON.stringify(read('public/'+href))+';').join('\n');
const aliases='let '+plan.bindings.join(',')+';\nconst __studio33=createContext('+JSON.stringify(plan.bindings)+');\n'+plan.bindings.map(name=>'Object.defineProperty(__studio33,'+JSON.stringify(name)+',{get:()=>'+name+',set:value=>{'+name+'=value},configurable:true});').join('\n');
const code="'use strict';\n(()=>{\n"+runtimeInline+'\n'+aliases+'\nconst modules=['+moduleRecords.map(factory).join(',\n')+'];\ninitializeModules(__studio33,modules);\n'+inlineVendors+'\n'+inlineWorkers+'\n__studio33.studioWordlist='+read('public/'+plan.resources.wordlist)+';\n'+advanced.offline+'\nStudioAdvanced.install(__studio33,'+JSON.stringify(registry)+',{assets:'+JSON.stringify(advanced.assets)+',embedded:'+JSON.stringify(advanced.embedded)+'});\ninstallLifecycle(__studio33,'+JSON.stringify(registry)+',null);\ninstallHome(__studio33,'+JSON.stringify(registry)+',{guideHTML:'+JSON.stringify(read('public/guide.html'))+'});\nwindow.__toolStudioReady=true;\n})();';
offline=offline.replace('<!-- studio-runtime -->',()=>'<script>\n'+code.replace(/<\/script/gi,'<\\/script')+'\n</script>');offline=offline.replace('</head>',()=>'<style>'+advanced.css+'\n'+workspaceCSS+'</style></head>');write('offline/Calc_Studio_Offline.html',offline);
for(const file of files(path.join(root,'public'))){const rel=path.relative(path.join(root,'public'),file);write(rel,fs.readFileSync(file))}
for(const file of files(path.join(root,'src/connections')))write('connections/'+path.basename(file),fs.readFileSync(file));
write('connections/styles.css',read('src/connections/styles.css')+'\n'+workspaceCSS);
const connectionShell=read('src/connections/index.html').replace('<link rel="stylesheet" href="./styles.css">','<style>'+read('src/connections/styles.css')+'\n'+workspaceCSS+'</style>');
write('connections/packet.js',advanced.packet);
const connectionParts=['protocol','websocket','bluetooth','usb','signaling','guides','doctor','easy','connection'].map(name=>read('src/connections/'+name+'.js').replace(/^import[^\n]*\n/gm,'').replace(/^export\s+/gm,''));
const qrInline='const inlineQREngines={'+['qrencode','qrdecode'].map(key=>JSON.stringify(key)+':('+read('public/'+plan.resources.vendors[key]).replace(/^\/\/[^\n]*\n/,'').replace(/^export default /,'').replace(/;\s*$/,'')+')').join(',')+'};\nconst inlineQRCache={};async function loadQR(kind){return inlineQRCache[kind]||(inlineQRCache[kind]=inlineQREngines[kind]())}\n';
write('offline/Calc_Studio_Connection.html',connectionShell.replace('<script type="module" src="./connection.js"></script>',()=>'<script>\n'+(advanced.packetInline+'\nconst {packetEncode,packetDecode}=PacketEngine;\n'+qrInline+connectionParts.join('\n')).replace(/<\/script/gi,'<\\/script')+'\n</script>'));
// Games are a separate page; only a small Options link is bundled into the main app.
for(const file of files(path.join(root,'src/games')))write('games/'+path.basename(file),fs.readFileSync(file));
write('games/styles.css',read('src/games/styles.css')+'\n'+workspaceCSS);
const gameWorker=buildSync({entryPoints:[path.join(root,'src/games/analysis-worker.js')],bundle:true,format:'iife',platform:'browser',target:'es2022',minify:true,write:false}).outputFiles[0].text;write('games/analysis-worker.bundle.js',gameWorker);
const gameCode=buildSync({entryPoints:[path.join(root,'src/games/app.js')],bundle:true,format:'iife',platform:'browser',target:'es2022',write:false}).outputFiles[0].text;
write('offline/Calc_Studio_Games.html',read('src/games/index.html').replace('<link rel="stylesheet" href="./styles.css">',()=>'<style>'+read('src/games/styles.css')+'\n'+workspaceCSS+'</style>').replace('<script type="module" src="./app.js"></script>',()=>'<script>globalThis.__toolStudioGameWorker='+JSON.stringify(gameWorker).replace(/<\/script/gi,'<\\/script')+';'+gameCode.replace(/<\/script/gi,'<\\/script')+'</script>'));
// Old bookmarks and filenames remain valid after deploying the modular build.
const redirect=to=>'<!doctype html><meta charset="utf-8"><title>Tool Studio</title><script>location.replace('+JSON.stringify(to)+'+location.search+location.hash)</script><a href="'+to+'">Open Tool Studio</a>';
write('Calc_Studio_Games.html',redirect('./games/index.html'));write('Calc_Studio(1).html',redirect('./index.html'));write('Calc_Studio_Connection.html',redirect('./connections/index.html'));write('Calc_Studio_Guide_Tool.html',redirect('./guide.html'));write('Calc_Studio_Guide(2).html',redirect('./guide.html'));write('.nojekyll','');
const precache=['./','./index.html','./registry.generated.json','./manifest.webmanifest','./assets/icon.svg','./guide.html',...chunks.map(p=>'./'+p),'./'+bootURL,...Object.values(runtimeFiles).map(p=>'./'+p),...styles.map(p=>'./'+p.href),'./'+advanced.style,'./'+workspaceStyle,...files(path.join(out,'runtime/advanced')).map(p=>'./'+path.relative(out,p)),...files(path.join(out,'connections')).map(p=>'./'+path.relative(out,p))];
const revision=hash(hosted+files(out).filter(p=>!p.includes(path.sep+'offline'+path.sep)).sort().map(p=>path.relative(out,p)+':'+hash(fs.readFileSync(p))).join('\n')).slice(0,16);let worker=read('src/core/service-worker.js').replace("'APP_VERSION_TOKEN'",JSON.stringify(registry.appVersion)).replace('/* CACHE_VERSION */',JSON.stringify(revision)).replace('/* PRECACHE */',JSON.stringify(precache)).replace('/* ASSET_HASHES */',JSON.stringify(Object.fromEntries(files(out).filter(p=>!p.includes(path.sep+'offline'+path.sep)).map(p=>['./'+path.relative(out,p),hash(fs.readFileSync(p))]))));write('sw.js',worker);
const report={version:35,appVersion:registry.appVersion,categories:registry.categories.length,workspaces:modules.length,sourceModules:moduleRecords.length+modules.filter(m=>m.kind==='native').length,legacyRoutes:seed.tools.length,totalRoutes:registry.totalRoutes,initialHTMLBytes:Buffer.byteLength(hosted),runtimeChunkBytes:chunks.reduce((n,p)=>n+fs.statSync(path.join(out,p)).size,0),offlineBytes:Buffer.byteLength(offline),ocrAssetsVerified:plan.resources.ocr.length,revision};write('build-report.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
