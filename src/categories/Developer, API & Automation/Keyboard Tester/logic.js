// keyboard · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
export const id="keyboard";
export function register(__studio33){
__studio33.kbEvent = __studio33.$fn((function kbEvent(e){if(__studio33.activeView!=='keyboard'||document.activeElement!==__studio33.$('kbStage'))return;if(e.key==='Escape'){e.preventDefault();__studio33.$('kbStage').blur();return}if(__studio33.$('kbPrevent').checked)e.preventDefault();e.stopImmediatePropagation();const down=e.type==='keydown';if(down){__studio33.kbPresses++;__studio33.kbTested.add(e.code)}__studio33.kbKeys.get(e.code)?.classList.toggle('pressed',down);__studio33.kbKeys.get(e.code)?.classList.add('tested');__studio33.metricList('kbInfo',[['Key',e.key],['Code',e.code],['Location',e.location],['Modifiers',[e.ctrlKey?'Ctrl':'',e.altKey?'Alt':'',e.shiftKey?'Shift':'',e.metaKey?'Meta':''].filter(Boolean).join(' + ')||'None'],['Repeat',String(e.repeat)],['Tested / presses',__studio33.kbTested.size+' / '+__studio33.kbPresses]]);__studio33.kbEvents.unshift(e.type+' · key='+e.key+' · code='+e.code+' · repeat='+e.repeat);__studio33.kbEvents=__studio33.kbEvents.slice(0,20);__studio33.$('kbLog').textContent=__studio33.kbEvents.join('\n')}),"function kbEvent(e){if(activeView!=='keyboard'||document.activeElement!==$('kbStage'))return;if(e.key==='Escape'){e.preventDefault();$('kbStage').blur();return}if($('kbPrevent').checked)e.preventDefault();e.stopImmediatePropagation();const down=e.type==='keydown';if(down){kbPresses++;kbTested.add(e.code)}kbKeys.get(e.code)?.classList.toggle('pressed',down);kbKeys.get(e.code)?.classList.add('tested');metricList('kbInfo',[['Key',e.key],['Code',e.code],['Location',e.location],['Modifiers',[e.ctrlKey?'Ctrl':'',e.altKey?'Alt':'',e.shiftKey?'Shift':'',e.metaKey?'Meta':''].filter(Boolean).join(' + ')||'None'],['Repeat',String(e.repeat)],['Tested / presses',kbTested.size+' / '+kbPresses]]);kbEvents.unshift(e.type+' · key='+e.key+' · code='+e.code+' · repeat='+e.repeat);kbEvents=kbEvents.slice(0,20);$('kbLog').textContent=kbEvents.join('\\n')}","kbEvent");
}
export const steps=[
[1082,function initialize_1082(__studio33){
for(const row of __studio33.kbRows){const r=__studio33.csText('div','','cs-key-row');for(const code of row){const el=__studio33.csText('div',code.replace(/^Key|^Digit|^Numpad/,'').replace('Left',' L').replace('Right',' R'),'cs-key'+(code==='Space'?' cs-key-wide':''));el.title=code;__studio33.kbKeys.set(code,el);r.append(el)}__studio33.$('kbStage').append(r)}
}],
[1086,function initialize_1086(__studio33){
__studio33.$('kbStage').onblur=__studio33.$fn(()=>__studio33.kbKeys.forEach(el=>el.classList.remove('pressed')),"()=>kbKeys.forEach(el=>el.classList.remove('pressed'))","");
}],
[1087,function initialize_1087(__studio33){
__studio33.$('kbFocus').onclick=__studio33.$fn(()=>__studio33.$('kbStage').focus(),"()=>$('kbStage').focus()","");
}],
[1088,function initialize_1088(__studio33){
__studio33.$('kbReset').onclick=__studio33.$fn(()=>{__studio33.kbTested.clear();__studio33.kbEvents=[];__studio33.kbPresses=0;__studio33.kbKeys.forEach(el=>el.classList.remove('tested','pressed'));__studio33.$('kbInfo').replaceChildren();__studio33.$('kbLog').textContent=''},"()=>{kbTested.clear();kbEvents=[];kbPresses=0;kbKeys.forEach(el=>el.classList.remove('tested','pressed'));$('kbInfo').replaceChildren();$('kbLog').textContent=''}","");
}],
[4120,function initialize_4120(__studio33){
__studio33.u23Optional.push('keyboard');
}]
];
