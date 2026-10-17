// jwtworkspace · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
export const id="jwtworkspace";
export function register(__studio33){
__studio33.invalidateJWT = __studio33.$fn((function invalidateJWT(){__studio33.jwtReport=null;__studio33.$('jwtHeader').value=__studio33.$('jwtPayload').value='';__studio33.$('jwtMetrics').replaceChildren();__studio33.outputButtons(['jwtCopy','jwtDownload'],false);__studio33.newToolStatus('jwtStatus','Press Inspect to decode the edited token.')}),"function invalidateJWT(){jwtReport=null;$('jwtHeader').value=$('jwtPayload').value='';$('jwtMetrics').replaceChildren();outputButtons(['jwtCopy','jwtDownload'],false);newToolStatus('jwtStatus','Press Inspect to decode the edited token.')}","invalidateJWT");

__studio33.invalidateVerification = __studio33.$fn((function invalidateVerification(){__studio33.verifyRevision++;__studio33.verifyReady=false;__studio33.$('verifyOutput').value='';__studio33.outputButtons(['verifyCopy','verifyDownload'],false);__studio33.newToolStatus('verifyStatus','Press Verify signature to check the edited token/key.')}),"function invalidateVerification(){verifyRevision++;verifyReady=false;$('verifyOutput').value='';outputButtons(['verifyCopy','verifyDownload'],false);newToolStatus('verifyStatus','Press Verify signature to check the edited token/key.')}","invalidateVerification");

__studio33.u23SyncToken = __studio33.$fn((function u23SyncToken(value,origin=''){if(__studio33.u23TokenSyncing)return;__studio33.u23TokenSyncing=true;__studio33.u23Token.value=value;for(const id of ['jwtInput','verifyToken'])if(id!==origin&&__studio33.$(id).value!==value){__studio33.$(id).value=value;__studio33.$(id).dispatchEvent(new Event('input',{bubbles:true}))}__studio33.u23TokenSyncing=false}),"function u23SyncToken(value,origin=''){if(u23TokenSyncing)return;u23TokenSyncing=true;u23Token.value=value;for(const id of ['jwtInput','verifyToken'])if(id!==origin&&$(id).value!==value){$(id).value=value;$(id).dispatchEvent(new Event('input',{bubbles:true}))}u23TokenSyncing=false}","u23SyncToken");
}
export const steps=[
[573,function initialize_573(__studio33){
__studio33.jwtReport = null;

}],
[575,function initialize_575(__studio33){
__studio33.$('jwtInspect').onclick=__studio33.$fn(()=>{__studio33.invalidateJWT();try{const r=__studio33.inspectJWT(__studio33.$('jwtInput').value);__studio33.$('jwtHeader').value=r.header;__studio33.$('jwtPayload').value=r.payload;__studio33.jwtReport='{\n"header":'+r.header+',\n"payload":'+r.payload+',\n"inspection":'+JSON.stringify({algorithm:r.algorithm,claims:r.claims,signaturePresent:r.signaturePresent,signatureVerified:false,notice:r.notice},null,2)+'\n}';for(const text of ['Algorithm: '+r.algorithm,'Signature: NOT verified',...r.claims.map(c=>c.name+': '+c.utc+' · '+c.state)]){const item=document.createElement('div');item.className='metric';item.textContent=text;__studio33.$('jwtMetrics').append(item)}__studio33.outputButtons(['jwtCopy','jwtDownload'],true);__studio33.newToolStatus('jwtStatus',r.notice)}catch(e){__studio33.newToolStatus('jwtStatus',e.message,true)}},"()=>{invalidateJWT();try{const r=inspectJWT($('jwtInput').value);$('jwtHeader').value=r.header;$('jwtPayload').value=r.payload;jwtReport='{\\n\"header\":'+r.header+',\\n\"payload\":'+r.payload+',\\n\"inspection\":'+JSON.stringify({algorithm:r.algorithm,claims:r.claims,signaturePresent:r.signaturePresent,signatureVerified:false,notice:r.notice},null,2)+'\\n}';for(const text of ['Algorithm: '+r.algorithm,'Signature: NOT verified',...r.claims.map(c=>c.name+': '+c.utc+' · '+c.state)]){const item=document.createElement('div');item.className='metric';item.textContent=text;$('jwtMetrics').append(item)}outputButtons(['jwtCopy','jwtDownload'],true);newToolStatus('jwtStatus',r.notice)}catch(e){newToolStatus('jwtStatus',e.message,true)}}","");
}],
[576,function initialize_576(__studio33){
__studio33.$('jwtInput').oninput=__studio33.invalidateJWT;
}],
[577,function initialize_577(__studio33){
__studio33.$('jwtClear').onclick=__studio33.$fn(()=>{__studio33.$('jwtInput').value='';__studio33.invalidateJWT()},"()=>{$('jwtInput').value='';invalidateJWT()}","");
}],
[578,function initialize_578(__studio33){
__studio33.$('jwtCopy').onclick=__studio33.$fn(()=>{if(__studio33.jwtReport)__studio33.copyText(__studio33.jwtReport)},"()=>{if(jwtReport)copyText(jwtReport)}","");
}],
[579,function initialize_579(__studio33){
__studio33.$('jwtDownload').onclick=__studio33.$fn(()=>{if(__studio33.jwtReport)__studio33.downloadFile('decoded-jwt.json',__studio33.jwtReport,'application/json')},"()=>{if(jwtReport)downloadFile('decoded-jwt.json',jwtReport,'application/json')}","");
}],
[688,function initialize_688(__studio33){
__studio33.$('verifyRun').onclick=__studio33.$fn(async()=>{__studio33.invalidateVerification();const revision=__studio33.verifyRevision;__studio33.newToolStatus('verifyStatus','Verifying…');try{const r=await __studio33.verifyJWTPublicKey(__studio33.$('verifyToken').value,__studio33.$('verifyKey').value,__studio33.$('verifyAlgorithm').value,__studio33.$('verifyIssuer').value,__studio33.$('verifyAudience').value);if(revision!==__studio33.verifyRevision)return;__studio33.$('verifyOutput').value=JSON.stringify(r,null,2);__studio33.verifyReady=true;__studio33.outputButtons(['verifyCopy','verifyDownload'],true);__studio33.newToolStatus('verifyStatus',(r.signatureVerified?'Signature matches supplied key. ':'Signature does NOT match supplied key. ')+r.notice,!r.signatureVerified)}catch(e){if(revision===__studio33.verifyRevision)__studio33.newToolStatus('verifyStatus',e.message,true)}},"async()=>{invalidateVerification();const revision=verifyRevision;newToolStatus('verifyStatus','Verifying…');try{const r=await verifyJWTPublicKey($('verifyToken').value,$('verifyKey').value,$('verifyAlgorithm').value,$('verifyIssuer').value,$('verifyAudience').value);if(revision!==verifyRevision)return;$('verifyOutput').value=JSON.stringify(r,null,2);verifyReady=true;outputButtons(['verifyCopy','verifyDownload'],true);newToolStatus('verifyStatus',(r.signatureVerified?'Signature matches supplied key. ':'Signature does NOT match supplied key. ')+r.notice,!r.signatureVerified)}catch(e){if(revision===verifyRevision)newToolStatus('verifyStatus',e.message,true)}}","");
}],
[689,function initialize_689(__studio33){
for(const id of ['verifyToken','verifyKey','verifyAlgorithm','verifyIssuer','verifyAudience'])__studio33.$(id).addEventListener('input',__studio33.invalidateVerification);
}],
[690,function initialize_690(__studio33){
__studio33.$('jwtverifyClear').onclick=__studio33.$fn(()=>{__studio33.$('verifyToken').value=__studio33.$('verifyKey').value=__studio33.$('verifyIssuer').value=__studio33.$('verifyAudience').value='';__studio33.invalidateVerification()},"()=>{$('verifyToken').value=$('verifyKey').value=$('verifyIssuer').value=$('verifyAudience').value='';invalidateVerification()}","");
}],
[691,function initialize_691(__studio33){
__studio33.$('verifyCopy').onclick=__studio33.$fn(()=>{if(__studio33.verifyReady)__studio33.copyText(__studio33.$('verifyOutput').value)},"()=>{if(verifyReady)copyText($('verifyOutput').value)}","");
}],
[692,function initialize_692(__studio33){
__studio33.$('verifyDownload').onclick=__studio33.$fn(()=>{if(__studio33.verifyReady)__studio33.downloadFile('jwt-verification.json',__studio33.$('verifyOutput').value,'application/json')},"()=>{if(verifyReady)downloadFile('jwt-verification.json',$('verifyOutput').value,'application/json')}","");
}],
[693,function initialize_693(__studio33){
__studio33.$('verifyKeyUpload').onclick=__studio33.$fn(()=>__studio33.$('verifyKeyFile').click(),"()=>$('verifyKeyFile').click()","");
}],
[694,function initialize_694(__studio33){
__studio33.uploadText('verifyKey','verifyKeyFile',['json','pem','txt'],__studio33.invalidateVerification,'verifyStatus');
}],
[695,function initialize_695(__studio33){
__studio33.jwtPublicExample = {"publicKey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoIpm0IxYZKwOYui3KB0b\nyNxtLznkiOYNLCcsI2Lt91UNmPYIczWipQ2EeTi7Q1YoIvMlClAjezfwmk3wCNE0\nEk3X0u3UkwR99hgxOHtnNjL74cEug3carOr7udqbxOwALeDaO6gBzpOIw3+YUwzM\n5+6+D0gKSzqiSQo9LQT3W1zIoFYFfgxR5vSP6ijCsHYiuKedvH0b+uym4eitUwID\n5ujEfNoOYz+AYfCieiy5hz6t7L98pwOx1LSkhqvmmlWYqsgZh4Zu9bqVu9NdION9\nkZEoIXFHrfreTXV5ROAP9M2C/4emRxaBKCtgib6cbfQlwKKC8wbwvA3K0LOqzZpP\nMQIDAQAB\n-----END PUBLIC KEY-----\n", "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRlbW8tcHVibGljIn0.eyJzdWIiOiJleGFtcGxlLXVzZXIiLCJpc3MiOiJodHRwczovL2V4YW1wbGUuY29tIiwiYXVkIjoiY2FsYy1zdHVkaW8tZGVtbyIsImV4cCI6MTg5MzQ1NjAwMH0.ZRcfP09UpuwIFbsRFDnDDpAQufEPqvO2JqFzwnfyrThvj8EOvWcwJEt6A_jo89Ty96SHjm5DmjxETXeGh5l0DPitauE1HY3Z2NicstWRHGplPJeUsjeG04ACBAgE6zTFwIpBvPmtCh3N_5d4DrTUQQcipcGSG6NwoW0rupybWGBLkHH-WT7p0S93DYwicmfQ2H5ftDAcCUKcP1xur4C9GoUYSp6QB0cCVCvm5D9t_JB-YkdJB4YUL1pa52ft1fllgU5gBE_jvcm32e5FWxKj3g-VqtaRqXNfQLc-yBnG2UECTlib9KWmJiaL96Ezw4YifB-gNnNmdY5dqipvxWQqGQ"};

}],
[696,function initialize_696(__studio33){
__studio33.$('verifyDemo').onclick=__studio33.$fn(()=>{__studio33.$('verifyToken').value=__studio33.jwtPublicExample.token;__studio33.$('verifyKey').value=__studio33.jwtPublicExample.publicKey;__studio33.$('verifyAlgorithm').value='RS256';__studio33.$('verifyIssuer').value='https://example.com';__studio33.$('verifyAudience').value='calc-studio-demo';__studio33.invalidateVerification()},"()=>{$('verifyToken').value=jwtPublicExample.token;$('verifyKey').value=jwtPublicExample.publicKey;$('verifyAlgorithm').value='RS256';$('verifyIssuer').value='https://example.com';$('verifyAudience').value='calc-studio-demo';invalidateVerification()}","");
}],
[2823,function initialize_2823(__studio33){
__studio33.u23TokenField = __studio33.csText('label','','field u23-shared-token');
__studio33.u23Token = document.createElement('textarea');

}],
[2828,function initialize_2828(__studio33){
__studio33.u23TokenField.append(__studio33.csText('span','Compact JWT · shared between Inspect and Verify'),__studio33.u23Token);
}],
[2829,function initialize_2829(__studio33){
__studio33.$('jwtworkspace').querySelector('.u23-tabs').after(__studio33.u23TokenField);
}],
[2830,function initialize_2830(__studio33){
for(const id of ['jwtInput','verifyToken'])__studio33.$(id).closest('.field').hidden=true;
}],
[2833,function initialize_2833(__studio33){
__studio33.u23TokenSyncing = false;

}],
[2835,function initialize_2835(__studio33){
__studio33.u23TokenClear = __studio33.u19Button('Clear token',__studio33.$fn(()=>__studio33.u23SyncToken(''),"()=>u23SyncToken('')",""),'u23JWTClear');

}],
[2836,function initialize_2836(__studio33){
__studio33.u23TokenField.append(__studio33.u23TokenClear);
}],
[2837,function initialize_2837(__studio33){
__studio33.u23Token.oninput=__studio33.$fn(()=>__studio33.u23SyncToken(__studio33.u23Token.value),"()=>u23SyncToken(u23Token.value)","");
}],
[2838,function initialize_2838(__studio33){
for(const id of ['jwtInput','verifyToken'])__studio33.$(id).addEventListener('input',__studio33.$fn(()=>__studio33.u23SyncToken(__studio33.$(id).value,id),"()=>u23SyncToken($(id).value,id)",""));
}],
[2839,function initialize_2839(__studio33){
for(const[id,source]of [['jwtClear','jwtInput'],['jwtverifyClear','verifyToken'],['verifyDemo','verifyToken']]){const old=__studio33.$(id).onclick;__studio33.$(id).onclick=__studio33.$fn(function(...args){const out=old.apply(this,args);if(out?.finally)return out.finally(__studio33.$fn(()=>__studio33.u23SyncToken(__studio33.$(source).value,source),"()=>u23SyncToken($(source).value,source)",""));__studio33.u23SyncToken(__studio33.$(source).value,source);return out},"function(...args){const out=old.apply(this,args);if(out?.finally)return out.finally(()=>u23SyncToken($(source).value,source));u23SyncToken($(source).value,source);return out}","")}
}],
[2840,function initialize_2840(__studio33){
__studio33.u23SyncToken(__studio33.$('jwtInput').value||__studio33.$('verifyToken').value);
}]
];
