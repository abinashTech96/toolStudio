/** Metadata only: Home preferences never contain files, editor text or credentials. */
export const defaultHomePreferences=()=>({version:1,lastTool:'',categories:[]});
export function validateHomePreferences(value,routeIds){
  if(value==null)return defaultHomePreferences();
  if(typeof value!=='object'||Array.isArray(value)||Object.keys(value).some(key=>!['version','lastTool','categories'].includes(key))||value.version!==1||typeof value.lastTool!=='string'||value.lastTool&&!routeIds.has(value.lastTool)||!Array.isArray(value.categories)||value.categories.length>30||new Set(value.categories).size!==value.categories.length||value.categories.some(id=>typeof id!=='string'||!/^[a-z][a-z0-9-]{0,60}$/.test(id)))throw Error('Invalid Home preferences');
  return{version:1,lastTool:value.lastTool,categories:[...value.categories]};
}
export function displayVersion(version){const match=/^(\d+)\.(\d+)\.(\d+)$/.exec(version);if(!match)return 'v35.00';return 'v'+match[1]+'.'+match[2].padStart(2,'0')+(Number(match[3])?'.'+match[3]:'')}
export function fileTargets(file){
  if(!file||typeof file.name!=='string'||!Number.isFinite(file.size)||file.size<0||file.size>20*1048576)throw Error('Choose one file up to 20 MiB.');
  const extension=file.name.split('.').at(-1).toLowerCase();
  const json={route:'jsonformatter',input:'jsonFile',label:'JSON Formatter'},table={route:'dataworkbench',input:'dwFile',label:'Data Workbench'},log={route:'logs',input:'logFiles',label:'Apex Log Analyzer'},text={route:'characters',input:'charFile',label:'Text Toolkit'};
  if(extension==='json')return[json,table];
  if(['csv','tsv','xlsx','xls','ods'].includes(extension))return[table];
  if(extension==='pdf')return[{route:'pdf',input:'pdfFiles',label:'PDF Workspace'}];
  if(['png','jpg','jpeg','webp','gif','bmp'].includes(extension))return[{route:'camerastudio',input:'ciFile',label:'Camera & Image Studio'}];
  if(extension==='log')return[log,text];
  if(extension==='txt')return[text,json,log];
  throw Error('Use JSON, CSV, TSV, spreadsheets, PDF, images, TXT or LOG files.');
}
