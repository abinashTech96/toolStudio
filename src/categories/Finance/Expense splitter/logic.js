// expenses · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
export const id="expenses";
export function register(__studio33){
__studio33.invalidateExpenses = __studio33.$fn((function invalidateExpenses(){__studio33.expenseResult=null;__studio33.$('expenseResults').replaceChildren();__studio33.v9Invalidate(['expenseDownload'],'expenseStatus')}),"function invalidateExpenses(){expenseResult=null;$('expenseResults').replaceChildren();v9Invalidate(['expenseDownload'],'expenseStatus')}","invalidateExpenses");
}
export const steps=[
[818,function initialize_818(__studio33){
__studio33.$('expenseRun').onclick=__studio33.$fn(()=>{__studio33.invalidateExpenses();try{__studio33.expenseResult=__studio33.splitExpenses(__studio33.ordinaryJSON(__studio33.$('expenseInput').value));__studio33.v9Table('expenseResults',['From','To','Amount'],__studio33.expenseResult.settlements.map(s=>[s.from,s.to,s.amount.toFixed(2)]));const box=document.createElement('pre');box.className='source-preview';box.textContent='Total: '+__studio33.expenseResult.total.toFixed(2)+'\nBalances (positive receives / negative owes):\n'+__studio33.expenseResult.balances.map(x=>x.person+': '+x.net.toFixed(2)).join('\n');__studio33.$('expenseResults').append(box);__studio33.$('expenseDownload').disabled=false;__studio33.v9Status('expenseStatus',__studio33.expenseResult.settlements.length?'Settlements calculated. All cents allocated.':'No settlements needed.')}catch(e){__studio33.v9Status('expenseStatus',e.message,true)}},"()=>{invalidateExpenses();try{expenseResult=splitExpenses(ordinaryJSON($('expenseInput').value));v9Table('expenseResults',['From','To','Amount'],expenseResult.settlements.map(s=>[s.from,s.to,s.amount.toFixed(2)]));const box=document.createElement('pre');box.className='source-preview';box.textContent='Total: '+expenseResult.total.toFixed(2)+'\\nBalances (positive receives / negative owes):\\n'+expenseResult.balances.map(x=>x.person+': '+x.net.toFixed(2)).join('\\n');$('expenseResults').append(box);$('expenseDownload').disabled=false;v9Status('expenseStatus',expenseResult.settlements.length?'Settlements calculated. All cents allocated.':'No settlements needed.')}catch(e){v9Status('expenseStatus',e.message,true)}}","");
}],
[819,function initialize_819(__studio33){
__studio33.$('expenseInput').oninput=__studio33.invalidateExpenses;
}],
[820,function initialize_820(__studio33){
__studio33.$('expenseDownload').onclick=__studio33.$fn(()=>{if(__studio33.expenseResult)__studio33.v9SaveJSON('expense-settlements.json',__studio33.expenseResult)},"()=>{if(expenseResult)v9SaveJSON('expense-settlements.json',expenseResult)}","");
}],
[821,function initialize_821(__studio33){
__studio33.$('expenseUpload').onclick=__studio33.$fn(()=>__studio33.$('expenseFile').click(),"()=>$('expenseFile').click()","");
}],
[822,function initialize_822(__studio33){
__studio33.uploadText('expenseInput','expenseFile',['json','txt'],__studio33.invalidateExpenses,'expenseStatus');
}]
];
