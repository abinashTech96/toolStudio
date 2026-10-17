export const modules=[
(()=>{
// texttoolkit · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
const id="texttoolkit";
function register(__studio33){
__studio33.renderCharacters = __studio33.$fn((function renderCharacters(){if(__studio33.u26Booting&&__studio33.$("characters").closest("[hidden]"))return;try{const text=__studio33.$('charInput').value,s=__studio33.characterStats(text);__studio33.metricList('charResults',[[s.graphemeSupported?'Characters (graphemes)':'Characters (code-point fallback)',s.characters],['Without whitespace',s.noWhitespace],['Words',s.words],['Lines',s.lines],['Unicode code points',s.codePoints],['UTF-16 units',s.utf16],['UTF-8 bytes',s.bytes]]);__studio33.$('charStatus').textContent='Counts include spaces and line breaks unless stated otherwise. '+(s.graphemeSupported?'Emoji sequences and combining marks count as one grapheme.':'This browser lacks grapheme segmentation; character count falls back to code points.');__studio33.renderCharSelection()}catch(e){__studio33.errorMetric('charResults',e);__studio33.$('charStatus').textContent=e.message}}),"function renderCharacters(){if(u26Booting&&$(\"characters\").closest(\"[hidden]\"))return;try{const text=$('charInput').value,s=characterStats(text);metricList('charResults',[[s.graphemeSupported?'Characters (graphemes)':'Characters (code-point fallback)',s.characters],['Without whitespace',s.noWhitespace],['Words',s.words],['Lines',s.lines],['Unicode code points',s.codePoints],['UTF-16 units',s.utf16],['UTF-8 bytes',s.bytes]]);$('charStatus').textContent='Counts include spaces and line breaks unless stated otherwise. '+(s.graphemeSupported?'Emoji sequences and combining marks count as one grapheme.':'This browser lacks grapheme segmentation; character count falls back to code points.');renderCharSelection()}catch(e){errorMetric('charResults',e);$('charStatus').textContent=e.message}}","renderCharacters");

__studio33.renderCharSelection = __studio33.$fn((function renderCharSelection(){const el=__studio33.$('charInput'),s=el.selectionStart??0,e=el.selectionEnd??0;if(s===e){__studio33.$('charSelection').textContent='';return}try{const count=__studio33.characterStats(el.value.slice(s,e));__studio33.$('charSelection').textContent='Selection: '+count.characters+' characters · '+count.words+' words · '+count.bytes+' UTF-8 bytes'}catch{__studio33.$('charSelection').textContent='Selection is too large'}}),"function renderCharSelection(){const el=$('charInput'),s=el.selectionStart??0,e=el.selectionEnd??0;if(s===e){$('charSelection').textContent='';return}try{const count=characterStats(el.value.slice(s,e));$('charSelection').textContent='Selection: '+count.characters+' characters · '+count.words+' words · '+count.bytes+' UTF-8 bytes'}catch{$('charSelection').textContent='Selection is too large'}}","renderCharSelection");

__studio33.encodingButtons = __studio33.$fn((function encodingButtons(){for(const id of ['encodingCopy','encodingUse'])__studio33.$(id).disabled=!__studio33.encodingReady}),"function encodingButtons(){for(const id of ['encodingCopy','encodingUse'])$(id).disabled=!encodingReady}","encodingButtons");

__studio33.invalidateEncoding = __studio33.$fn((function invalidateEncoding(){__studio33.encodingReady=false;__studio33.$('encodingOutput').value='';__studio33.encodingButtons();__studio33.newToolStatus('encodingStatus','Press Encode or Decode to process the input.')}),"function invalidateEncoding(){encodingReady=false;$('encodingOutput').value='';encodingButtons();newToolStatus('encodingStatus','Press Encode or Decode to process the input.')}","invalidateEncoding");

__studio33.runEncoding = __studio33.$fn((function runEncoding(decode){try{__studio33.$('encodingOutput').value=__studio33.transformEncoding(__studio33.$('encodingInput').value,__studio33.$('encodingMode').value,decode);__studio33.encodingReady=true;__studio33.encodingButtons();__studio33.newToolStatus('encodingStatus',(decode?'Decoded':'Encoded')+' · '+__studio33.$('encodingOutput').value.length+' UTF-16 units')}catch(e){__studio33.invalidateEncoding();__studio33.newToolStatus('encodingStatus',e.message,true)}}),"function runEncoding(decode){try{$('encodingOutput').value=transformEncoding($('encodingInput').value,$('encodingMode').value,decode);encodingReady=true;encodingButtons();newToolStatus('encodingStatus',(decode?'Decoded':'Encoded')+' · '+$('encodingOutput').value.length+' UTF-16 units')}catch(e){invalidateEncoding();newToolStatus('encodingStatus',e.message,true)}}","runEncoding");

__studio33.invalidateTextUtil = __studio33.$fn((function invalidateTextUtil(){ __studio33.$('textUtilOutput').value='';__studio33.outputButtons(['textUtilCopy','textUtilUse','textUtilDownload'],false);__studio33.newToolStatus('textUtilStatus','Press Apply to transform text.')}),"function invalidateTextUtil(){ $('textUtilOutput').value='';outputButtons(['textUtilCopy','textUtilUse','textUtilDownload'],false);newToolStatus('textUtilStatus','Press Apply to transform text.')}","invalidateTextUtil");
}
const steps=[
[348,function initialize_348(__studio33){
__studio33.$('charInput').oninput=__studio33.$fn(()=>{clearTimeout(__studio33.charDebounce);__studio33.charDebounce=setTimeout(__studio33.renderCharacters,180)},"()=>{clearTimeout(charDebounce);charDebounce=setTimeout(renderCharacters,180)}","");
}],
[349,function initialize_349(__studio33){
__studio33.$('charInput').onselect=__studio33.renderCharSelection;
}],
[350,function initialize_350(__studio33){
__studio33.$('charInput').onkeyup=__studio33.renderCharSelection;
}],
[351,function initialize_351(__studio33){
__studio33.$('charUpload').onclick=__studio33.$fn(()=>__studio33.$('charFile').click(),"()=>$('charFile').click()","");
}],
[352,function initialize_352(__studio33){
__studio33.$('charFile').onchange=__studio33.$fn(async()=>{try{__studio33.$('charInput').value=await __studio33.readDeveloperFile(__studio33.$('charFile').files[0]);__studio33.renderCharacters()}catch(e){__studio33.$('charStatus').textContent=e.message}finally{__studio33.$('charFile').value=''}},"async()=>{try{$('charInput').value=await readDeveloperFile($('charFile').files[0]);renderCharacters()}catch(e){$('charStatus').textContent=e.message}finally{$('charFile').value=''}}","");
}],
[353,function initialize_353(__studio33){
__studio33.$('charClear').onclick=__studio33.$fn(()=>{__studio33.$('charInput').value='';__studio33.renderCharacters()},"()=>{$('charInput').value='';renderCharacters()}","");
}],
[354,function initialize_354(__studio33){
__studio33.$('charCopy').onclick=__studio33.$fn(()=>{try{const s=__studio33.characterStats(__studio33.$('charInput').value);__studio33.copyText('Characters: '+s.characters+'\nWithout whitespace: '+s.noWhitespace+'\nWords: '+s.words+'\nLines: '+s.lines+'\nUnicode code points: '+s.codePoints+'\nUTF-16 units: '+s.utf16+'\nUTF-8 bytes: '+s.bytes)}catch(e){__studio33.toast(e.message)}},"()=>{try{const s=characterStats($('charInput').value);copyText('Characters: '+s.characters+'\\nWithout whitespace: '+s.noWhitespace+'\\nWords: '+s.words+'\\nLines: '+s.lines+'\\nUnicode code points: '+s.codePoints+'\\nUTF-16 units: '+s.utf16+'\\nUTF-8 bytes: '+s.bytes)}catch(e){toast(e.message)}}","");
}],
[403,function initialize_403(__studio33){
__studio33.$('encodingInput').oninput=__studio33.invalidateEncoding;
}],
[404,function initialize_404(__studio33){
__studio33.$('encodingMode').onchange=__studio33.invalidateEncoding;
}],
[405,function initialize_405(__studio33){
__studio33.$('encodingEncode').onclick=__studio33.$fn(()=>__studio33.runEncoding(false),"()=>runEncoding(false)","");
}],
[406,function initialize_406(__studio33){
__studio33.$('encodingDecode').onclick=__studio33.$fn(()=>__studio33.runEncoding(true),"()=>runEncoding(true)","");
}],
[407,function initialize_407(__studio33){
__studio33.$('encodingCopy').onclick=__studio33.$fn(()=>{if(__studio33.encodingReady)__studio33.copyText(__studio33.$('encodingOutput').value)},"()=>{if(encodingReady)copyText($('encodingOutput').value)}","");
}],
[408,function initialize_408(__studio33){
__studio33.$('encodingUse').onclick=__studio33.$fn(()=>{if(__studio33.encodingReady){__studio33.$('encodingInput').value=__studio33.$('encodingOutput').value;__studio33.invalidateEncoding()}},"()=>{if(encodingReady){$('encodingInput').value=$('encodingOutput').value;invalidateEncoding()}}","");
}],
[409,function initialize_409(__studio33){
__studio33.$('encodingClear').onclick=__studio33.$fn(()=>{__studio33.$('encodingInput').value='';__studio33.invalidateEncoding()},"()=>{$('encodingInput').value='';invalidateEncoding()}","");
}],
[536,function initialize_536(__studio33){
__studio33.$('textUtilRun').onclick=__studio33.$fn(()=>{try{__studio33.$('textUtilOutput').value=__studio33.transformText(__studio33.$('textUtilInput').value,__studio33.$('textUtilMode').value,__studio33.$('textUtilIgnoreCase').checked,__studio33.$('textUtilFind').value,__studio33.$('textUtilReplace').value);__studio33.outputButtons(['textUtilCopy','textUtilUse','textUtilDownload'],true);__studio33.newToolStatus('textUtilStatus','Ready · '+__studio33.$('textUtilOutput').value.length+' UTF-16 units')}catch(e){__studio33.invalidateTextUtil();__studio33.newToolStatus('textUtilStatus',e.message,true)}},"()=>{try{$('textUtilOutput').value=transformText($('textUtilInput').value,$('textUtilMode').value,$('textUtilIgnoreCase').checked,$('textUtilFind').value,$('textUtilReplace').value);outputButtons(['textUtilCopy','textUtilUse','textUtilDownload'],true);newToolStatus('textUtilStatus','Ready · '+$('textUtilOutput').value.length+' UTF-16 units')}catch(e){invalidateTextUtil();newToolStatus('textUtilStatus',e.message,true)}}","");
}],
[537,function initialize_537(__studio33){
for(const id of ['textUtilInput','textUtilFind','textUtilReplace'])__studio33.$(id).oninput=__studio33.invalidateTextUtil;
}],
[538,function initialize_538(__studio33){
for(const id of ['textUtilMode','textUtilIgnoreCase'])__studio33.$(id).onchange=__studio33.invalidateTextUtil;
}],
[539,function initialize_539(__studio33){
__studio33.$('textutilsClear').onclick=__studio33.$fn(()=>{__studio33.$('textUtilInput').value=__studio33.$('textUtilFind').value=__studio33.$('textUtilReplace').value='';__studio33.invalidateTextUtil()},"()=>{$('textUtilInput').value=$('textUtilFind').value=$('textUtilReplace').value='';invalidateTextUtil()}","");
}],
[540,function initialize_540(__studio33){
__studio33.$('textUtilCopy').onclick=__studio33.$fn(()=>__studio33.copyText(__studio33.$('textUtilOutput').value),"()=>copyText($('textUtilOutput').value)","");
}],
[541,function initialize_541(__studio33){
__studio33.$('textUtilUse').onclick=__studio33.$fn(()=>{__studio33.$('textUtilInput').value=__studio33.$('textUtilOutput').value;__studio33.invalidateTextUtil()},"()=>{$('textUtilInput').value=$('textUtilOutput').value;invalidateTextUtil()}","");
}],
[542,function initialize_542(__studio33){
__studio33.$('textUtilDownload').onclick=__studio33.$fn(()=>{if(!__studio33.$('textUtilDownload').disabled)__studio33.downloadFile('text.txt',__studio33.$('textUtilOutput').value)},"()=>{if(!$('textUtilDownload').disabled)downloadFile('text.txt',$('textUtilOutput').value)}","");
}]
];

return {id,register,steps};
})(),
(()=>{
// markdown · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
const id="markdown";
function register(__studio33){
__studio33.markdownDocument = (function markdownDocument(html){return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; style-src \'unsafe-inline\'; img-src \'none\'; connect-src \'none\'; form-action \'none\'; base-uri \'none\'"><title>Markdown export</title><style>body{font:16px/1.6 system-ui,sans-serif;max-width:850px;margin:24px auto;padding:0 20px;overflow-wrap:anywhere;color:#182334;background:#fff}pre{overflow:auto;background:#f2f4f8;padding:12px}code{font-family:monospace}table{border-collapse:collapse}th,td{border:1px solid #ccd3de;padding:6px}blockquote{border-left:3px solid #acb8cc;padding-left:12px}a{color:#2456b6}img{display:none}</style></head><body>'+html+'</body></html>'});

__studio33.invalidateMarkdown = __studio33.$fn((function invalidateMarkdown(){__studio33.stopEditionWorker('markdown');__studio33.mdDocument=null;__studio33.$('mdPreview').srcdoc=__studio33.markdownDocument('');__studio33.outputButtons(['mdCopy','mdDownload'],false);__studio33.newToolStatus('mdStatus','Press Preview to render the edited Markdown.')}),"function invalidateMarkdown(){stopEditionWorker('markdown');mdDocument=null;$('mdPreview').srcdoc=markdownDocument('');outputButtons(['mdCopy','mdDownload'],false);newToolStatus('mdStatus','Press Preview to render the edited Markdown.')}","invalidateMarkdown");

__studio33.cs31TextTools = __studio33.$fn((function cs31TextTools(owner){
 const sourceId=owner==='markdown'?'mdInput':'textUtilInput',prefix=owner==='markdown'?'cs31Markdown':'cs31Text';
 const{box,body}=__studio33.cs31Box(owner,prefix,'Invisible characters & reviewed cleanup','Uses the current source text. Zero-width joiners and directional controls are reported without removing them automatically. Browser textareas normalize restored line endings to LF.');
 const mode=__studio33.cs31Select(body,prefix+'Mode','Cleanup operation',[['trim','Trim spaces/tabs at each line edge'],['spaces','Normalize horizontal spaces'],['newlines','Normalize line endings'],['zerowidth','Remove zero-width space and BOM'],['replace','Literal find and replace']],'trim'),find=__studio33.cs31Field(body,prefix+'Find','Find literal text'),replacement=__studio33.cs31Field(body,prefix+'Replace','Replacement'),preview=__studio33.cs31Output(body,prefix+'Preview'),table=__studio33.csText('div');body.append(table);const actions=__studio33.cs31Actions(body);let candidate=null,previous=null,revision=0;
 const signature=__studio33.$fn(()=>JSON.stringify([__studio33.$(sourceId).value,mode.value,find.value,replacement.value]),"()=>JSON.stringify([$(sourceId).value,mode.value,find.value,replacement.value])","signature");
 __studio33.cs31Button(actions,prefix+'Inspect','Find invisible characters',__studio33.$fn(async()=>{const token=++revision,source=__studio33.$(sourceId).value,r=await __studio33.cs31Job(prefix+'inspect','invisible',[source],box);if(token!==revision||source!==__studio33.$(sourceId).value)return;__studio33.cs31Table(table,['Code','Name','Count'],r.counts.map(x=>[x.code,x.name,x.count]));preview.value=r.locations.map(x=>x.code+' · '+x.name+' · line '+x.line+', column '+x.column).join('\n');__studio33.cs31Status(box,r.notice+' First 200 non-space/control locations shown.');},"async()=>{const token=++revision,source=$(sourceId).value,r=await cs31Job(prefix+'inspect','invisible',[source],box);if(token!==revision||source!==$(sourceId).value)return;cs31Table(table,['Code','Name','Count'],r.counts.map(x=>[x.code,x.name,x.count]));preview.value=r.locations.map(x=>x.code+' · '+x.name+' · line '+x.line+', column '+x.column).join('\\n');cs31Status(box,r.notice+' First 200 non-space/control locations shown.');}",""));
 __studio33.cs31Button(actions,prefix+'Review','Preview cleanup',__studio33.$fn(async()=>{const token=++revision,sig=signature();candidate=null;apply.disabled=true;const r=await __studio33.cs31Job(prefix+'change','text',[__studio33.$(sourceId).value,mode.value,find.value,replacement.value],box);if(token!==revision||sig!==signature())return;candidate={sig,...r};preview.value=r.output;apply.disabled=!r.changed;__studio33.cs31Status(box,(r.matches===null?'':r.matches+' matches · ')+r.inputCharacters+' → '+r.outputCharacters+' characters. '+r.notice);},"async()=>{const token=++revision,sig=signature();candidate=null;apply.disabled=true;const r=await cs31Job(prefix+'change','text',[$(sourceId).value,mode.value,find.value,replacement.value],box);if(token!==revision||sig!==signature())return;candidate={sig,...r};preview.value=r.output;apply.disabled=!r.changed;cs31Status(box,(r.matches===null?'':r.matches+' matches · ')+r.inputCharacters+' → '+r.outputCharacters+' characters. '+r.notice);}",""),'primary');
 const apply=__studio33.cs31Button(actions,prefix+'Apply','Apply reviewed cleanup',__studio33.$fn(()=>{if(!candidate||candidate.sig!==signature())throw Error('Preview the current cleanup first');const output=candidate.output;previous={source:__studio33.$(sourceId).value};__studio33.cs31Set(sourceId,output);previous.applied=__studio33.$(sourceId).value;candidate=null;apply.disabled=true;undo.disabled=false;__studio33.cs31Status(box,'Reviewed cleanup applied. Undo restores the exact previous text.');},"()=>{if(!candidate||candidate.sig!==signature())throw Error('Preview the current cleanup first');const output=candidate.output;previous={source:$(sourceId).value};cs31Set(sourceId,output);previous.applied=$(sourceId).value;candidate=null;apply.disabled=true;undo.disabled=false;cs31Status(box,'Reviewed cleanup applied. Undo restores the exact previous text.');}",""));apply.disabled=true;
 const undo=__studio33.cs31Button(actions,prefix+'Undo','Undo cleanup',__studio33.$fn(()=>{if(!previous||__studio33.$(sourceId).value!==previous.applied)throw Error('The text changed after cleanup. Use the editor’s Undo to review intervening edits.');const source=previous.source;previous=null;__studio33.cs31Set(sourceId,source);undo.disabled=true;__studio33.cs31Status(box,'Previous text restored.');},"()=>{if(!previous||$(sourceId).value!==previous.applied)throw Error('The text changed after cleanup. Use the editor’s Undo to review intervening edits.');const source=previous.source;previous=null;cs31Set(sourceId,source);undo.disabled=true;cs31Status(box,'Previous text restored.');}",""));undo.disabled=true;
 __studio33.cs31Watch([sourceId,prefix+'Mode',prefix+'Find',prefix+'Replace'],__studio33.$fn(()=>{revision++;candidate=null;apply.disabled=true;preview.value='';table.replaceChildren();__studio33.cs31Cancel(prefix+'inspect');__studio33.cs31Cancel(prefix+'change');},"()=>{revision++;candidate=null;apply.disabled=true;preview.value='';table.replaceChildren();cs31Cancel(prefix+'inspect');cs31Cancel(prefix+'change');}",""));__studio33.cs31ReportActions(body,owner,()=>candidate?{inputCharacters:candidate.inputCharacters,outputCharacters:candidate.outputCharacters,matches:candidate.matches,output:candidate.output}:null);
}),"function cs31TextTools(owner){\n const sourceId=owner==='markdown'?'mdInput':'textUtilInput',prefix=owner==='markdown'?'cs31Markdown':'cs31Text';\n const{box,body}=cs31Box(owner,prefix,'Invisible characters & reviewed cleanup','Uses the current source text. Zero-width joiners and directional controls are reported without removing them automatically. Browser textareas normalize restored line endings to LF.');\n const mode=cs31Select(body,prefix+'Mode','Cleanup operation',[['trim','Trim spaces/tabs at each line edge'],['spaces','Normalize horizontal spaces'],['newlines','Normalize line endings'],['zerowidth','Remove zero-width space and BOM'],['replace','Literal find and replace']],'trim'),find=cs31Field(body,prefix+'Find','Find literal text'),replacement=cs31Field(body,prefix+'Replace','Replacement'),preview=cs31Output(body,prefix+'Preview'),table=csText('div');body.append(table);const actions=cs31Actions(body);let candidate=null,previous=null,revision=0;\n const signature=()=>JSON.stringify([$(sourceId).value,mode.value,find.value,replacement.value]);\n cs31Button(actions,prefix+'Inspect','Find invisible characters',async()=>{const token=++revision,source=$(sourceId).value,r=await cs31Job(prefix+'inspect','invisible',[source],box);if(token!==revision||source!==$(sourceId).value)return;cs31Table(table,['Code','Name','Count'],r.counts.map(x=>[x.code,x.name,x.count]));preview.value=r.locations.map(x=>x.code+' · '+x.name+' · line '+x.line+', column '+x.column).join('\\n');cs31Status(box,r.notice+' First 200 non-space/control locations shown.');});\n cs31Button(actions,prefix+'Review','Preview cleanup',async()=>{const token=++revision,sig=signature();candidate=null;apply.disabled=true;const r=await cs31Job(prefix+'change','text',[$(sourceId).value,mode.value,find.value,replacement.value],box);if(token!==revision||sig!==signature())return;candidate={sig,...r};preview.value=r.output;apply.disabled=!r.changed;cs31Status(box,(r.matches===null?'':r.matches+' matches · ')+r.inputCharacters+' → '+r.outputCharacters+' characters. '+r.notice);},'primary');\n const apply=cs31Button(actions,prefix+'Apply','Apply reviewed cleanup',()=>{if(!candidate||candidate.sig!==signature())throw Error('Preview the current cleanup first');const output=candidate.output;previous={source:$(sourceId).value};cs31Set(sourceId,output);previous.applied=$(sourceId).value;candidate=null;apply.disabled=true;undo.disabled=false;cs31Status(box,'Reviewed cleanup applied. Undo restores the exact previous text.');});apply.disabled=true;\n const undo=cs31Button(actions,prefix+'Undo','Undo cleanup',()=>{if(!previous||$(sourceId).value!==previous.applied)throw Error('The text changed after cleanup. Use the editor’s Undo to review intervening edits.');const source=previous.source;previous=null;cs31Set(sourceId,source);undo.disabled=true;cs31Status(box,'Previous text restored.');});undo.disabled=true;\n cs31Watch([sourceId,prefix+'Mode',prefix+'Find',prefix+'Replace'],()=>{revision++;candidate=null;apply.disabled=true;preview.value='';table.replaceChildren();cs31Cancel(prefix+'inspect');cs31Cancel(prefix+'change');});cs31ReportActions(body,owner,()=>candidate?{inputCharacters:candidate.inputCharacters,outputCharacters:candidate.outputCharacters,matches:candidate.matches,output:candidate.output}:null);\n}","cs31TextTools");
}
const steps=[
[556,function initialize_556(__studio33){
__studio33.markdownBundleSource="";

}],
[598,function initialize_598(__studio33){
__studio33.mdDocument = null;

}],
[600,function initialize_600(__studio33){
__studio33.$('mdRender').onclick=__studio33.$fn(()=>{__studio33.invalidateMarkdown();__studio33.runEditionWorker('markdown',__studio33.markdownBundleSource+'\nself.job=self.renderMarkdownJob;',{source:__studio33.$('mdInput').value,breaks:false},__studio33.$fn(r=>{__studio33.mdDocument=__studio33.markdownDocument(r.html);__studio33.$('mdPreview').srcdoc=__studio33.mdDocument;__studio33.outputButtons(['mdCopy','mdDownload'],true);__studio33.newToolStatus('mdStatus','Preview ready. Raw HTML is escaped; remote images are shown as text.')},"r=>{mdDocument=markdownDocument(r.html);$('mdPreview').srcdoc=mdDocument;outputButtons(['mdCopy','mdDownload'],true);newToolStatus('mdStatus','Preview ready. Raw HTML is escaped; remote images are shown as text.')}",""),'mdStatus',3000)},"()=>{invalidateMarkdown();runEditionWorker('markdown',markdownBundleSource+'\\nself.job=self.renderMarkdownJob;',{source:$('mdInput').value,breaks:false},r=>{mdDocument=markdownDocument(r.html);$('mdPreview').srcdoc=mdDocument;outputButtons(['mdCopy','mdDownload'],true);newToolStatus('mdStatus','Preview ready. Raw HTML is escaped; remote images are shown as text.')},'mdStatus',3000)}","");
}],
[601,function initialize_601(__studio33){
__studio33.$('mdInput').oninput=__studio33.invalidateMarkdown;
}],
[602,function initialize_602(__studio33){
__studio33.$('markdownClear').onclick=__studio33.$fn(()=>{__studio33.$('mdInput').value='';__studio33.invalidateMarkdown()},"()=>{$('mdInput').value='';invalidateMarkdown()}","");
}],
[603,function initialize_603(__studio33){
__studio33.$('mdUpload').onclick=__studio33.$fn(()=>__studio33.$('mdFile').click(),"()=>$('mdFile').click()","");
}],
[604,function initialize_604(__studio33){
__studio33.uploadText('mdInput','mdFile',['md','txt'],__studio33.invalidateMarkdown,'mdStatus');
}],
[605,function initialize_605(__studio33){
__studio33.$('mdCopy').onclick=__studio33.$fn(()=>{if(__studio33.mdDocument)__studio33.copyText(__studio33.mdDocument)},"()=>{if(mdDocument)copyText(mdDocument)}","");
}],
[606,function initialize_606(__studio33){
__studio33.$('mdDownload').onclick=__studio33.$fn(()=>{if(__studio33.mdDocument)__studio33.downloadFile('markdown-export.html',__studio33.mdDocument,'text/html')},"()=>{if(mdDocument)downloadFile('markdown-export.html',mdDocument,'text/html')}","");
}],
[3969,function initialize_3969(__studio33){
Object.assign(__studio33.n28Tags,{regex:'regular expression pattern matches captures replacement flags',uuid:'uuid guid cryptographically random identifier',sampledata:'sample mock synthetic data json csv records seed',markdown:'markdown md preview html export',matrices:'matrix vector determinant inverse transpose dot cross',calculus:'derivative integral integration differentiation zeros',measurements:'feet inches length area volume dimensions rooms',graph:'plot chart function curves roots intersections',statistics:'statistics mean median sum minimum maximum population sample standard deviation'});
}]
];

return {id,register,steps};
})()
];
