// paymentids · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
export const id="paymentids";
export function register(__studio33){

}
export const steps=[
[807,function initialize_807(__studio33){
__studio33.$('paymentValidate').onclick=__studio33.$fn(()=>{__studio33.$('paymentResults').replaceChildren();try{const r=__studio33.validatePaymentIdentifier(__studio33.$('paymentKind').value,__studio33.$('paymentInput').value);__studio33.v9Output('paymentResults',r);__studio33.v9Status('paymentStatus',(r.valid?'Checks passed. ':'Checks failed. ')+r.message,!r.valid)}catch(e){__studio33.v9Status('paymentStatus',e.message,true)}},"()=>{$('paymentResults').replaceChildren();try{const r=validatePaymentIdentifier($('paymentKind').value,$('paymentInput').value);v9Output('paymentResults',r);v9Status('paymentStatus',(r.valid?'Checks passed. ':'Checks failed. ')+r.message,!r.valid)}catch(e){v9Status('paymentStatus',e.message,true)}}","");
}],
[808,function initialize_808(__studio33){
__studio33.v9Watch(['paymentKind','paymentInput'],__studio33.$fn(()=>{__studio33.$('paymentResults').replaceChildren();__studio33.v9Status('paymentStatus','Press Validate to check the identifier.')},"()=>{$('paymentResults').replaceChildren();v9Status('paymentStatus','Press Validate to check the identifier.')}",""));
}],
[809,function initialize_809(__studio33){
__studio33.$('paymentClear').onclick=__studio33.$fn(()=>{__studio33.$('paymentInput').value='';__studio33.$('paymentResults').replaceChildren();__studio33.v9Status('paymentStatus','Cleared.')},"()=>{$('paymentInput').value='';$('paymentResults').replaceChildren();v9Status('paymentStatus','Cleared.')}","");
}]
];
