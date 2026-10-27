import fs from 'node:fs';
import {spawn} from 'node:child_process';
const args=new Set(process.argv.slice(2)),npm=process.platform==='win32'?'npm.cmd':'npm';
const suites=[...(!args.has('--skip-build')?[['build',npm,['run','publish:root']]]:[]),['check',npm,['run','check']],['smoke',npm,['test']],...['home','home-extras','games','connection','guided','workflows','v39','v40','coverage','pdf-ui','career','navigation','advanced','reliability','updates','budgets','compatibility'].map(name=>[name,npm,['run','test:'+name]]),['connection-server','python3',['tests/server.py']],['published',process.execPath,['scripts/check.mjs','--published']]];
fs.mkdirSync('test-results',{recursive:true});const results=[];
for(const[name,command,parameters]of suites){
 const start=Date.now(),log=fs.createWriteStream('test-results/regression-'+name+'.log');process.stdout.write('Running '+name+'…\n');
 const exitCode=await new Promise(resolve=>{const child=spawn(command,parameters,{stdio:['ignore','pipe','pipe'],env:process.env});child.stdout.pipe(log,{end:false});child.stderr.pipe(log,{end:false});child.on('error',e=>{log.write(e.stack);resolve(1)});child.on('close',code=>resolve(code??1))});log.end();results.push({name,command:[command,...parameters],exitCode,durationMs:Date.now()-start,log:'test-results/regression-'+name+'.log'});console.log((exitCode===0?'PASS ':'FAIL ')+name);
 if(name==='build'&&exitCode!==0)break;
}
const report={appVersion:JSON.parse(fs.readFileSync('package.json')).version,createdAt:new Date().toISOString(),environment:{node:process.version,browserMatrix:process.env.BROWSER_MATRIX||'default',connectionRealRTCSkipped:process.env.CONNECTION_SKIP_REAL_RTC==='1'},suites:results,passed:results.length===suites.length&&results.every(r=>r.exitCode===0)};
fs.writeFileSync('test-results/regression-summary.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({suites:results.length,failed:results.filter(r=>r.exitCode!==0).map(r=>r.name),passed:report.passed}));if(!report.passed)process.exitCode=1;
