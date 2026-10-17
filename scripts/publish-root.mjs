// Keep existing main/root GitHub Pages hosting working without changing site settings.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const names=walk(path.join(root,'dist')).map(p=>path.relative(path.join(root,'dist'),p).split(path.sep).join('/')).sort();
const manifest=path.join(root,'.generated-files.json');
const previous=fs.existsSync(manifest)?JSON.parse(fs.readFileSync(manifest,'utf8')):[];
for(const name of previous){if(name.includes('..')||path.isAbsolute(name))throw Error('Unsafe generated manifest entry');if(!names.includes(name))fs.rmSync(path.join(root,name),{force:true});}
for(const name of names){const to=path.join(root,name);fs.mkdirSync(path.dirname(to),{recursive:true});fs.copyFileSync(path.join(root,'dist',name),to);}
fs.writeFileSync(manifest,JSON.stringify(names,null,2)+'\n');
console.log('Prepared '+names.length+' generated GitHub Pages files in repository root.');
