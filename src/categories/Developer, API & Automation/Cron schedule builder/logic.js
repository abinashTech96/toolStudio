// cron · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
export const id="cron";
export function register(__studio33){
__studio33.invalidateCron = __studio33.$fn((function invalidateCron(){__studio33.stopEditionWorker('cron');__studio33.$('cronResults').replaceChildren();__studio33.newToolStatus('cronStatus','Build or edit an expression, then preview.')}),"function invalidateCron(){stopEditionWorker('cron');$('cronResults').replaceChildren();newToolStatus('cronStatus','Build or edit an expression, then preview.')}","invalidateCron");
}
export const steps=[
[588,function initialize_588(__studio33){
__studio33.$('cronBuild').onclick=__studio33.$fn(()=>{__studio33.invalidateCron();try{__studio33.$('cronExpression').value=__studio33.buildCronPreset(__studio33.$('cronMode').value,__studio33.$('cronPreset').value,Number(__studio33.$('cronHour').value),Number(__studio33.$('cronMinute').value),Number(__studio33.$('cronDay').value),Number(__studio33.$('cronWeekday').value));__studio33.newToolStatus('cronStatus','Expression built. Preview to inspect nominal runs.')}catch(e){__studio33.newToolStatus('cronStatus',e.message,true)}},"()=>{invalidateCron();try{$('cronExpression').value=buildCronPreset($('cronMode').value,$('cronPreset').value,Number($('cronHour').value),Number($('cronMinute').value),Number($('cronDay').value),Number($('cronWeekday').value));newToolStatus('cronStatus','Expression built. Preview to inspect nominal runs.')}catch(e){newToolStatus('cronStatus',e.message,true)}}","");
}],
[589,function initialize_589(__studio33){
__studio33.$('cronPreview').onclick=__studio33.$fn(()=>{__studio33.invalidateCron();try{const start=__studio33.$('cronStart').value.trim()?__studio33.parseUTCDate(__studio33.$('cronStart').value.trim()):Date.now();__studio33.runEditionWorker('cron','self.job='+__studio33.cronPreviewJob.toString(),{mode:__studio33.$('cronMode').value,expression:__studio33.$('cronExpression').value,zone:__studio33.$('cronZone').value,start},__studio33.$fn(r=>{for(const run of r.runs){const row=document.createElement('div');row.className='diff-row';row.textContent=run.local+' · '+r.zone+'\nUTC: '+run.utc;__studio33.$('cronResults').append(row)}__studio33.newToolStatus('cronStatus',r.runs.length+' runs found within '+r.horizonDays+' days. '+r.notice)},"r=>{for(const run of r.runs){const row=document.createElement('div');row.className='diff-row';row.textContent=run.local+' · '+r.zone+'\\nUTC: '+run.utc;$('cronResults').append(row)}newToolStatus('cronStatus',r.runs.length+' runs found within '+r.horizonDays+' days. '+r.notice)}",""),'cronStatus',5000)}catch(e){__studio33.newToolStatus('cronStatus',e.message,true)}},"()=>{invalidateCron();try{const start=$('cronStart').value.trim()?parseUTCDate($('cronStart').value.trim()):Date.now();runEditionWorker('cron','self.job='+cronPreviewJob.toString(),{mode:$('cronMode').value,expression:$('cronExpression').value,zone:$('cronZone').value,start},r=>{for(const run of r.runs){const row=document.createElement('div');row.className='diff-row';row.textContent=run.local+' · '+r.zone+'\\nUTC: '+run.utc;$('cronResults').append(row)}newToolStatus('cronStatus',r.runs.length+' runs found within '+r.horizonDays+' days. '+r.notice)},'cronStatus',5000)}catch(e){newToolStatus('cronStatus',e.message,true)}}","");
}],
[590,function initialize_590(__studio33){
for(const id of ['cronMode','cronPreset','cronHour','cronMinute','cronDay','cronWeekday','cronExpression','cronZone','cronStart'])__studio33.$(id).addEventListener('input',__studio33.invalidateCron);
}],
[591,function initialize_591(__studio33){
__studio33.$('cronClear').onclick=__studio33.$fn(()=>{__studio33.$('cronExpression').value=__studio33.$('cronStart').value='';__studio33.invalidateCron()},"()=>{$('cronExpression').value=$('cronStart').value='';invalidateCron()}","");
}],
[592,function initialize_592(__studio33){
__studio33.$('cronCopy').onclick=__studio33.$fn(()=>{if(__studio33.$('cronExpression').value.trim())__studio33.copyText(__studio33.$('cronExpression').value);else __studio33.newToolStatus('cronStatus','Build or enter an expression first.',true)},"()=>{if($('cronExpression').value.trim())copyText($('cronExpression').value);else newToolStatus('cronStatus','Build or enter an expression first.',true)}","");
}]
];
