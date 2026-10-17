// matrices · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
export const id="matrices";
export function register(__studio33){
__studio33.renderMatrices = __studio33.$fn((function renderMatrices(){if(__studio33.u26Booting&&__studio33.$("matrices").closest("[hidden]"))return;const op=__studio33.$('matrixOperation').value;__studio33.$('matrixBField').hidden=['transpose','determinant','inverse'].includes(op);try{const a=__studio33.parseMatrix(__studio33.$('matrixA').value),b=__studio33.$('matrixBField').hidden?null:__studio33.parseMatrix(__studio33.$('matrixB').value),result=__studio33.matrixOperation(a,b,op);__studio33.$('matrixResults').replaceChildren();if(typeof result==='number'){__studio33.matrixText=String(result);const pre=document.createElement('pre');pre.textContent='Result: '+__studio33.fmt(result);__studio33.$('matrixResults').append(pre)}else{__studio33.matrixText=result.map(row=>row.map(String).join('\t')).join('\n');const table=document.createElement('table');for(const row of result){const tr=document.createElement('tr');for(const v of row){const td=document.createElement('td');td.textContent=__studio33.fmt(v);tr.append(td)}table.append(tr)}__studio33.$('matrixResults').append(table)}__studio33.$('matrixCopy').disabled=false}catch(e){__studio33.matrixText='';__studio33.$('matrixResults').textContent=e.message;__studio33.$('matrixCopy').disabled=true}}),"function renderMatrices(){if(u26Booting&&$(\"matrices\").closest(\"[hidden]\"))return;const op=$('matrixOperation').value;$('matrixBField').hidden=['transpose','determinant','inverse'].includes(op);try{const a=parseMatrix($('matrixA').value),b=$('matrixBField').hidden?null:parseMatrix($('matrixB').value),result=matrixOperation(a,b,op);$('matrixResults').replaceChildren();if(typeof result==='number'){matrixText=String(result);const pre=document.createElement('pre');pre.textContent='Result: '+fmt(result);$('matrixResults').append(pre)}else{matrixText=result.map(row=>row.map(String).join('\\t')).join('\\n');const table=document.createElement('table');for(const row of result){const tr=document.createElement('tr');for(const v of row){const td=document.createElement('td');td.textContent=fmt(v);tr.append(td)}table.append(tr)}$('matrixResults').append(table)}$('matrixCopy').disabled=false}catch(e){matrixText='';$('matrixResults').textContent=e.message;$('matrixCopy').disabled=true}}","renderMatrices");
}
export const steps=[
[289,function initialize_289(__studio33){
__studio33.$('matrixOperation').onchange=__studio33.renderMatrices;
}],
[290,function initialize_290(__studio33){
__studio33.$('matrixA').oninput=__studio33.renderMatrices;
}],
[291,function initialize_291(__studio33){
__studio33.$('matrixB').oninput=__studio33.renderMatrices;
}],
[292,function initialize_292(__studio33){
__studio33.$('matrixCopy').onclick=__studio33.$fn(()=>{if(__studio33.matrixText)__studio33.copyText(__studio33.matrixText)},"()=>{if(matrixText)copyText(matrixText)}","");
}]
];
