import fs from 'node:fs';
import {unpackOffline} from './pack-offline.mjs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const registry=JSON.parse(fs.readFileSync('dist/registry.generated.json','utf8'));
assert.equal(registry.legacyRoutes,105);assert.equal(registry.modules.length,68);assert.equal(registry.categories.length,11);
const routes=registry.modules.flatMap(m=>m.routes);assert.equal(new Set(routes).size,routes.length);assert.equal(routes.length,123);
const legacy=JSON.parse(fs.readFileSync('src/registry-seed.json','utf8')).tools;for(const tool of legacy)assert(routes.includes(tool.id),'Missing legacy route '+tool.id);
for(const file of [...walk('src'),...walk('dist/runtime'),...walk('dist/connections'),...walk('dist/assets/vendor')].filter(p=>/\.(?:m?js)$/.test(p)&&!/(?:bootstrap|service-worker)\.js$/.test(p)))execFileSync(process.execPath,['--check',file],{stdio:'pipe'});
const html=fs.readFileSync('dist/index.html','utf8'),offline=fs.readFileSync('dist/offline/Calc_Studio_Offline.html','utf8');
assert(!html.includes('<!-- studio-'));assert(!offline.includes('<!-- studio-'));
assert.equal((offline.match(/window\.__toolStudioReady=true;/g)||[]).length,1);
assert(offline.lastIndexOf('\n})();')<offline.lastIndexOf('</script>'));
assert(Buffer.byteLength(html)<350000,'Hosted HTML size regression');
for(const match of html.matchAll(/(?:href|src)="\.\/([^"?#]+)"/g))assert(fs.existsSync(path.join('dist',match[1])),'Missing asset '+match[1]);
if(process.argv.includes('--published')){
 const names=JSON.parse(fs.readFileSync('.generated-files.json','utf8'));
 for(const name of names){const actual=fs.readFileSync(name),expected=fs.readFileSync(path.join('dist',name));assert(name==='offline/Calc_Studio_Offline.html'?unpackOffline(actual.toString())===expected.toString():actual.equals(expected),'Published output is stale: '+name);}
}
console.log('Source syntax, 123 routes including all 105 legacy routes, registry, assets and generated output checks passed.');
