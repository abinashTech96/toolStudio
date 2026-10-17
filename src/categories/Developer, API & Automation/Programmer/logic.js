// programmer · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
export const id="programmer";
export function register(__studio33){
__studio33.renderProgrammer = __studio33.$fn((function renderProgrammer(){const op=__studio33.$('programOperation').value;__studio33.$('programBField').hidden=['identity','not'].includes(op);__studio33.$('programBLabel').textContent=['shl','shr'].includes(op)?'B (decimal shift count)':'B (same input base)';try{const width=Number(__studio33.$('programWidth').value),v=__studio33.programmerCompute(__studio33.$('programA').value,__studio33.$('programB').value,Number(__studio33.$('programBase').value),width,op);__studio33.metricList('programResults',[['Decimal',v.toString()],['Hexadecimal','0x'+v.toString(16).toUpperCase().padStart(width/4,'0')],['Binary',v.toString(2).padStart(width,'0').replace(/(.{4})(?=.)/g,'$1 ')],['Octal','0o'+v.toString(8)]])}catch(e){__studio33.errorMetric('programResults',e)}}),"function renderProgrammer(){const op=$('programOperation').value;$('programBField').hidden=['identity','not'].includes(op);$('programBLabel').textContent=['shl','shr'].includes(op)?'B (decimal shift count)':'B (same input base)';try{const width=Number($('programWidth').value),v=programmerCompute($('programA').value,$('programB').value,Number($('programBase').value),width,op);metricList('programResults',[['Decimal',v.toString()],['Hexadecimal','0x'+v.toString(16).toUpperCase().padStart(width/4,'0')],['Binary',v.toString(2).padStart(width,'0').replace(/(.{4})(?=.)/g,'$1 ')],['Octal','0o'+v.toString(8)]])}catch(e){errorMetric('programResults',e)}}","renderProgrammer");
}
export const steps=[
[178,function initialize_178(__studio33){
for(const id of ['programA','programB'])__studio33.$(id).oninput=__studio33.renderProgrammer;
}],
[179,function initialize_179(__studio33){
for(const id of ['programBase','programWidth','programOperation'])__studio33.$(id).onchange=__studio33.renderProgrammer;
}]
];
