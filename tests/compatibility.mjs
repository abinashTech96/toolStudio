import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
fs.mkdirSync('test-results',{recursive:true});
const app=fs.readFileSync('dist/offline/Calc_Studio_Offline.html','utf8'),at=app.lastIndexOf('\n})();');
if(at<0)throw Error('Offline runtime wrapper missing');
fs.writeFileSync('test-results/compatibility.html',app.slice(0,at)+fs.readFileSync('tests/compatibility-hook.txt','utf8')+app.slice(at));
for(const suite of ['engines31','workflows31','media31','documents31','edges31','hardware']){
 const result=spawnSync(process.execPath,['tests/compatibility/'+suite+'.cjs'],{stdio:'inherit',env:process.env});
 if(result.status!==0)process.exit(result.status||1);
}
