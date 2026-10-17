// texttoolkit · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
export const id="texttoolkit";
export function register(__studio33){
__studio33.renderCharacters = __studio33.$fn((function renderCharacters(){if(__studio33.u26Booting&&__studio33.$("characters").closest("[hidden]"))return;try{const text=__studio33.$('charInput').value,s=__studio33.characterStats(text);__studio33.metricList('charResults',[[s.graphemeSupported?'Characters (graphemes)':'Characters (code-point fallback)',s.characters],['Without whitespace',s.noWhitespace],['Words',s.words],['Lines',s.lines],['Unicode code points',s.codePoints],['UTF-16 units',s.utf16],['UTF-8 bytes',s.bytes]]);__studio33.$('charStatus').textContent='Counts include spaces and line breaks unless stated otherwise. '+(s.graphemeSupported?'Emoji sequences and combining marks count as one grapheme.':'This browser lacks grapheme segmentation; character count falls back to code points.');__studio33.renderCharSelection()}catch(e){__studio33.errorMetric('charResults',e);__studio33.$('charStatus').textContent=e.message}}),"function renderCharacters(){if(u26Booting&&$(\"characters\").closest(\"[hidden]\"))return;try{const text=$('charInput').value,s=characterStats(text);metricList('charResults',[[s.graphemeSupported?'Characters (graphemes)':'Characters (code-point fallback)',s.characters],['Without whitespace',s.noWhitespace],['Words',s.words],['Lines',s.lines],['Unicode code points',s.codePoints],['UTF-16 units',s.utf16],['UTF-8 bytes',s.bytes]]);$('charStatus').textContent='Counts include spaces and line breaks unless stated otherwise. '+(s.graphemeSupported?'Emoji sequences and combining marks count as one grapheme.':'This browser lacks grapheme segmentation; character count falls back to code points.');renderCharSelection()}catch(e){errorMetric('charResults',e);$('charStatus').textContent=e.message}}","renderCharacters");

__studio33.renderCharSelection = __studio33.$fn((function renderCharSelection(){const el=__studio33.$('charInput'),s=el.selectionStart??0,e=el.selectionEnd??0;if(s===e){__studio33.$('charSelection').textContent='';return}try{const count=__studio33.characterStats(el.value.slice(s,e));__studio33.$('charSelection').textContent='Selection: '+count.characters+' characters · '+count.words+' words · '+count.bytes+' UTF-8 bytes'}catch{__studio33.$('charSelection').textContent='Selection is too large'}}),"function renderCharSelection(){const el=$('charInput'),s=el.selectionStart??0,e=el.selectionEnd??0;if(s===e){$('charSelection').textContent='';return}try{const count=characterStats(el.value.slice(s,e));$('charSelection').textContent='Selection: '+count.characters+' characters · '+count.words+' words · '+count.bytes+' UTF-8 bytes'}catch{$('charSelection').textContent='Selection is too large'}}","renderCharSelection");

__studio33.encodingButtons = __studio33.$fn((function encodingButtons(){for(const id of ['encodingCopy','encodingUse'])__studio33.$(id).disabled=!__studio33.encodingReady}),"function encodingButtons(){for(const id of ['encodingCopy','encodingUse'])$(id).disabled=!encodingReady}","encodingButtons");

__studio33.invalidateEncoding = __studio33.$fn((function invalidateEncoding(){__studio33.encodingReady=false;__studio33.$('encodingOutput').value='';__studio33.encodingButtons();__studio33.newToolStatus('encodingStatus','Press Encode or Decode to process the input.')}),"function invalidateEncoding(){encodingReady=false;$('encodingOutput').value='';encodingButtons();newToolStatus('encodingStatus','Press Encode or Decode to process the input.')}","invalidateEncoding");

__studio33.runEncoding = __studio33.$fn((function runEncoding(decode){try{__studio33.$('encodingOutput').value=__studio33.transformEncoding(__studio33.$('encodingInput').value,__studio33.$('encodingMode').value,decode);__studio33.encodingReady=true;__studio33.encodingButtons();__studio33.newToolStatus('encodingStatus',(decode?'Decoded':'Encoded')+' · '+__studio33.$('encodingOutput').value.length+' UTF-16 units')}catch(e){__studio33.invalidateEncoding();__studio33.newToolStatus('encodingStatus',e.message,true)}}),"function runEncoding(decode){try{$('encodingOutput').value=transformEncoding($('encodingInput').value,$('encodingMode').value,decode);encodingReady=true;encodingButtons();newToolStatus('encodingStatus',(decode?'Decoded':'Encoded')+' · '+$('encodingOutput').value.length+' UTF-16 units')}catch(e){invalidateEncoding();newToolStatus('encodingStatus',e.message,true)}}","runEncoding");

__studio33.invalidateTextUtil = __studio33.$fn((function invalidateTextUtil(){ __studio33.$('textUtilOutput').value='';__studio33.outputButtons(['textUtilCopy','textUtilUse','textUtilDownload'],false);__studio33.newToolStatus('textUtilStatus','Press Apply to transform text.')}),"function invalidateTextUtil(){ $('textUtilOutput').value='';outputButtons(['textUtilCopy','textUtilUse','textUtilDownload'],false);newToolStatus('textUtilStatus','Press Apply to transform text.')}","invalidateTextUtil");
}
export const steps=[
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
