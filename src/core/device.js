// core/device · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
export const id="core/device";
export function register(__studio33){
__studio33.u19Check = __studio33.$fn((function u19Check(value){
 if(!value||value.version!==1||!['auto','desktop','mobile','tv'].includes(value.layout)||!['auto','full','reduced','off'].includes(value.motion)||!['auto','13','15','18','22','26'].includes(value.editorSize)||typeof value.wrap!=='boolean')throw Error('Invalid device preferences');
 if(!value.remote||typeof value.remote!=='object'||Array.isArray(value.remote)||JSON.stringify(value.remote).length>2000)throw Error('Invalid remote preferences');
 const tokens=new Set();for(const [name,key]of Object.entries(value.remote)){if(!['up','down','left','right','activate','normal'].includes(name)||!key||typeof key.key!=='string'||typeof key.code!=='string'||key.key.length>80||key.code.length>80||!Number.isInteger(key.keyCode)||key.keyCode<0||key.keyCode>65535||tokens.has(JSON.stringify(key)))throw Error('Invalid or duplicate remote key');tokens.add(JSON.stringify(key))}
 const boardViews=value.boardViews||{};for(const [layout,mode]of Object.entries(boardViews))if(!['desktop','mobile','tv'].includes(layout)||!['board','list'].includes(mode))throw Error('Invalid board view preference');
 return {version:1,layout:value.layout,motion:value.motion,editorSize:value.editorSize,wrap:value.wrap,remote:__studio33.csClone(value.remote),boardViews:{...boardViews}};
}),"function u19Check(value){\n if(!value||value.version!==1||!['auto','desktop','mobile','tv'].includes(value.layout)||!['auto','full','reduced','off'].includes(value.motion)||!['auto','13','15','18','22','26'].includes(value.editorSize)||typeof value.wrap!=='boolean')throw Error('Invalid device preferences');\n if(!value.remote||typeof value.remote!=='object'||Array.isArray(value.remote)||JSON.stringify(value.remote).length>2000)throw Error('Invalid remote preferences');\n const tokens=new Set();for(const [name,key]of Object.entries(value.remote)){if(!['up','down','left','right','activate','normal'].includes(name)||!key||typeof key.key!=='string'||typeof key.code!=='string'||key.key.length>80||key.code.length>80||!Number.isInteger(key.keyCode)||key.keyCode<0||key.keyCode>65535||tokens.has(JSON.stringify(key)))throw Error('Invalid or duplicate remote key');tokens.add(JSON.stringify(key))}\n const boardViews=value.boardViews||{};for(const [layout,mode]of Object.entries(boardViews))if(!['desktop','mobile','tv'].includes(layout)||!['board','list'].includes(mode))throw Error('Invalid board view preference');\n return {version:1,layout:value.layout,motion:value.motion,editorSize:value.editorSize,wrap:value.wrap,remote:csClone(value.remote),boardViews:{...boardViews}};\n}","u19Check");

__studio33.u19Save = __studio33.$fn((function u19Save(){__studio33.csPersist(__studio33.u19Key,__studio33.u19State)}),"function u19Save(){csPersist(u19Key,u19State)}","u19Save");

__studio33.u19AutoLayout = (function u19AutoLayout(){const ua=navigator.userAgent||'';if(/SmartTV|SMART-TV|Tizen|Web0S|WebOS|HbbTV|GoogleTV|Android TV|AFT[A-Z]/i.test(ua))return 'tv';const narrow=matchMedia('(max-width:750px)').matches,coarse=matchMedia('(pointer:coarse)').matches;return narrow||(coarse&&Math.min(screen.width||innerWidth,innerWidth)<=950)?'mobile':'desktop'});

__studio33.u19Motion = __studio33.$fn((function u19Motion(){return __studio33.u19State.motion==='off'?'off':__studio33.u19State.motion==='reduced'||matchMedia('(prefers-reduced-motion:reduce)').matches?'reduced':__studio33.u19State.motion==='full'?'full':__studio33.u19Layout==='tv'?'reduced':'full'}),"function u19Motion(){return u19State.motion==='off'?'off':u19State.motion==='reduced'||matchMedia('(prefers-reduced-motion:reduce)').matches?'reduced':u19State.motion==='full'?'full':u19Layout==='tv'?'reduced':'full'}","u19Motion");

__studio33.u19ScrollBehaviour = __studio33.$fn((function u19ScrollBehaviour(){return __studio33.u19Motion()==='full'?'smooth':'auto'}),"function u19ScrollBehaviour(){return u19Motion()==='full'?'smooth':'auto'}","u19ScrollBehaviour");

__studio33.u19Option = __studio33.$fn((function u19Option(parent,id,label,options){const wrap=__studio33.csText('label','','field'),select=document.createElement('select');select.id=id;select.setAttribute('aria-label',label);wrap.append(__studio33.csText('span',label),select);for(const [value,text]of options)select.append(new Option(text,value));parent.append(wrap);return select}),"function u19Option(parent,id,label,options){const wrap=csText('label','','field'),select=document.createElement('select');select.id=id;select.setAttribute('aria-label',label);wrap.append(csText('span',label),select);for(const [value,text]of options)select.append(new Option(text,value));parent.append(wrap);return select}","u19Option");

__studio33.u19Button = __studio33.$fn((function u19Button(label,fn,id){const b=__studio33.csButton(label,fn);if(id)b.id=id;__studio33.u17SetRole(b,'utility');return b}),"function u19Button(label,fn,id){const b=csButton(label,fn);if(id)b.id=id;u17SetRole(b,'utility');return b}","u19Button");

__studio33.u19Dialog = __studio33.$fn((function u19Dialog(id,title){const d=document.createElement('dialog');d.id=id;d.className='u19-dialog';d.setAttribute('aria-label',title);const header=__studio33.csText('header','');header.append(__studio33.csText('h2',title),__studio33.u19Button('Close',()=>d.close(),id+'Close'));d.append(header);document.body.append(d);return d}),"function u19Dialog(id,title){const d=document.createElement('dialog');d.id=id;d.className='u19-dialog';d.setAttribute('aria-label',title);const header=csText('header','');header.append(csText('h2',title),u19Button('Close',()=>d.close(),id+'Close'));d.append(header);document.body.append(d);return d}","u19Dialog");

__studio33.u19MappingLabels = __studio33.$fn((function u19MappingLabels(){for(const [action,e]of Object.entries(__studio33.u19RemoteText)){const k=__studio33.u19State.remote[action];e.textContent=k?((k.key&&k.key!=='Unidentified'?k.key:k.code||'Key code '+k.keyCode)+' · custom'):'Default'}}),"function u19MappingLabels(){for(const [action,e]of Object.entries(u19RemoteText)){const k=u19State.remote[action];e.textContent=k?((k.key&&k.key!=='Unidentified'?k.key:k.code||'Key code '+k.keyCode)+' · custom'):'Default'}}","u19MappingLabels");

__studio33.u19OpenDialog = __studio33.$fn((function u19OpenDialog(dialog,focus){__studio33.u19DialogFocus.set(dialog,document.activeElement);if(!dialog.open)dialog.showModal();(focus||dialog.querySelector('button,summary,select'))?.focus();__studio33.u19SyncExit()}),"function u19OpenDialog(dialog,focus){u19DialogFocus.set(dialog,document.activeElement);if(!dialog.open)dialog.showModal();(focus||dialog.querySelector('button,summary,select'))?.focus();u19SyncExit()}","u19OpenDialog");

__studio33.u19OpenSettings = __studio33.$fn((function u19OpenSettings(){__studio33.u19SyncSettings();__studio33.u19OpenDialog(__studio33.u19Settings,__studio33.u19LayoutPicker)}),"function u19OpenSettings(){u19SyncSettings();u19OpenDialog(u19Settings,u19LayoutPicker)}","u19OpenSettings");

__studio33.u19SyncSettings = __studio33.$fn((function u19SyncSettings(){__studio33.u19LayoutPicker.value=__studio33.u19State.layout;__studio33.u19MotionPicker.value=__studio33.u19State.motion;__studio33.u19TextPicker.value=__studio33.u19State.editorSize;__studio33.u19WrapPicker.value=__studio33.u19State.wrap?'on':'off';__studio33.u19MappingLabels();__studio33.u19DeviceStatus.textContent='Current layout: '+__studio33.u19Layout+'. '+(__studio33.u19State.layout==='auto'?'Auto uses display and input capabilities; wide desktops stay Desktop.':'Your layout choice is remembered.')}),"function u19SyncSettings(){u19LayoutPicker.value=u19State.layout;u19MotionPicker.value=u19State.motion;u19TextPicker.value=u19State.editorSize;u19WrapPicker.value=u19State.wrap?'on':'off';u19MappingLabels();u19DeviceStatus.textContent='Current layout: '+u19Layout+'. '+(u19State.layout==='auto'?'Auto uses display and input capabilities; wide desktops stay Desktop.':'Your layout choice is remembered.')}","u19SyncSettings");

__studio33.u19Apply = __studio33.$fn((function u19Apply(){const previous=__studio33.u19Layout;__studio33.u19Layout=__studio33.u19State.layout==='auto'?__studio33.u19AutoLayout():__studio33.u19State.layout;__studio33.u19Root.dataset.deviceLayout=__studio33.u19Layout;__studio33.u19Root.dataset.motion=__studio33.u19Motion();__studio33.u19Root.dataset.editorWrap=__studio33.u19State.wrap?'on':'off';__studio33.u19Root.style.setProperty('--u19-editor-size',(__studio33.u19State.editorSize==='auto'?(__studio33.u19Layout==='tv'?20:__studio33.u19Layout==='mobile'?15:14):Number(__studio33.u19State.editorSize))+'px');const title=__studio33.u19Layout[0].toUpperCase()+__studio33.u19Layout.slice(1);__studio33.u19DeviceButton.textContent=title+' · Display';__studio33.$('commandToggle').textContent=__studio33.u19Layout==='mobile'?'Find tool':'Find tool';__studio33.$('commandToggle').setAttribute('aria-label','Find a tool');
 if(previous!==__studio33.u19Layout){__studio33.$('knView').value=__studio33.u19State.boardViews[__studio33.u19Layout]||(__studio33.u19Layout==='mobile'?'list':'board');__studio33.knRender();__studio33.u19StopEditing();__studio33.u19InstallRowButtons();if(__studio33.u19Layout==='tv'&&!__studio33.u19IsEditable(document.activeElement))__studio33.u19DeviceButton.focus({preventScroll:true})}
 __studio33.u19SyncSettings();__studio33.u19Viewport();for(const wrap of document.querySelectorAll('.u19-wrap-toggle'))wrap.checked=__studio33.u19State.wrap;__studio33.u19SyncExit();__studio33.u19DirtyLayout=false;
}),"function u19Apply(){const previous=u19Layout;u19Layout=u19State.layout==='auto'?u19AutoLayout():u19State.layout;u19Root.dataset.deviceLayout=u19Layout;u19Root.dataset.motion=u19Motion();u19Root.dataset.editorWrap=u19State.wrap?'on':'off';u19Root.style.setProperty('--u19-editor-size',(u19State.editorSize==='auto'?(u19Layout==='tv'?20:u19Layout==='mobile'?15:14):Number(u19State.editorSize))+'px');const title=u19Layout[0].toUpperCase()+u19Layout.slice(1);u19DeviceButton.textContent=title+' · Display';$('commandToggle').textContent=u19Layout==='mobile'?'Find tool':'Find tool';$('commandToggle').setAttribute('aria-label','Find a tool');\n if(previous!==u19Layout){$('knView').value=u19State.boardViews[u19Layout]||(u19Layout==='mobile'?'list':'board');knRender();u19StopEditing();u19InstallRowButtons();if(u19Layout==='tv'&&!u19IsEditable(document.activeElement))u19DeviceButton.focus({preventScroll:true})}\n u19SyncSettings();u19Viewport();for(const wrap of document.querySelectorAll('.u19-wrap-toggle'))wrap.checked=u19State.wrap;u19SyncExit();u19DirtyLayout=false;\n}","u19Apply");

__studio33.u19Resize = __studio33.$fn((function u19Resize(){if(__studio33.u19ResizeFrame)return;__studio33.u19ResizeFrame=requestAnimationFrame(__studio33.$fn(()=>{__studio33.u19ResizeFrame=0;if(__studio33.u19State.layout==='auto'&&__studio33.u19AutoLayout()!==__studio33.u19Layout)__studio33.u19Apply();else __studio33.u19Viewport()},"()=>{u19ResizeFrame=0;if(u19State.layout==='auto'&&u19AutoLayout()!==u19Layout)u19Apply();else u19Viewport()}",""))}),"function u19Resize(){if(u19ResizeFrame)return;u19ResizeFrame=requestAnimationFrame(()=>{u19ResizeFrame=0;if(u19State.layout==='auto'&&u19AutoLayout()!==u19Layout)u19Apply();else u19Viewport()})}","u19Resize");

__studio33.u19Viewport = __studio33.$fn((function u19Viewport(){const viewport=window.visualViewport;__studio33.u19Root.style.setProperty('--u19-viewport',(viewport?.height||innerHeight)+'px');const typing=__studio33.u19IsEditable(document.activeElement),keyboard=__studio33.u19Layout==='mobile'&&typing&&!!viewport&&innerHeight-viewport.height>140;__studio33.u19Root.dataset.u19Keyboard=keyboard?'open':'closed';if(keyboard)requestAnimationFrame(()=>document.activeElement?.scrollIntoView({block:'nearest'}))}),"function u19Viewport(){const viewport=window.visualViewport;u19Root.style.setProperty('--u19-viewport',(viewport?.height||innerHeight)+'px');const typing=u19IsEditable(document.activeElement),keyboard=u19Layout==='mobile'&&typing&&!!viewport&&innerHeight-viewport.height>140;u19Root.dataset.u19Keyboard=keyboard?'open':'closed';if(keyboard)requestAnimationFrame(()=>document.activeElement?.scrollIntoView({block:'nearest'}))}","u19Viewport");

__studio33.u19Snapshot = __studio33.$fn((function u19Snapshot(){return {focus:document.activeElement,x:scrollX,y:scrollY,cardTop:__studio33.u19Card.scrollTop,cardLeft:__studio33.u19Card.scrollLeft,scrolls:[...document.querySelectorAll('.u19-media-viewport,#dwGrid,.json-editors,.v13-review')].map(e=>({e,top:e.scrollTop,left:e.scrollLeft}))}}),"function u19Snapshot(){return {focus:document.activeElement,x:scrollX,y:scrollY,cardTop:u19Card.scrollTop,cardLeft:u19Card.scrollLeft,scrolls:[...document.querySelectorAll('.u19-media-viewport,#dwGrid,.json-editors,.v13-review')].map(e=>({e,top:e.scrollTop,left:e.scrollLeft}))}}","u19Snapshot");

__studio33.u19Restore = __studio33.$fn((function u19Restore(s){if(!s)return;requestAnimationFrame(__studio33.$fn(()=>{let focus=s.focus;const closed=focus?.closest('details:not([open])');if(closed)focus=closed.querySelector(':scope>summary');if(focus?.isConnected&&__studio33.u19Visible(focus))focus.focus({preventScroll:true});window.scrollTo(s.x,s.y);__studio33.u19Card.scrollTop=s.cardTop;__studio33.u19Card.scrollLeft=s.cardLeft;for(const r of s.scrolls)if(r.e.isConnected){r.e.scrollTop=r.top;r.e.scrollLeft=r.left}},"()=>{let focus=s.focus;const closed=focus?.closest('details:not([open])');if(closed)focus=closed.querySelector(':scope>summary');if(focus?.isConnected&&u19Visible(focus))focus.focus({preventScroll:true});window.scrollTo(s.x,s.y);u19Card.scrollTop=s.cardTop;u19Card.scrollLeft=s.cardLeft;for(const r of s.scrolls)if(r.e.isConnected){r.e.scrollTop=r.top;r.e.scrollLeft=r.left}}",""))}),"function u19Restore(s){if(!s)return;requestAnimationFrame(()=>{let focus=s.focus;const closed=focus?.closest('details:not([open])');if(closed)focus=closed.querySelector(':scope>summary');if(focus?.isConnected&&u19Visible(focus))focus.focus({preventScroll:true});window.scrollTo(s.x,s.y);u19Card.scrollTop=s.cardTop;u19Card.scrollLeft=s.cardLeft;for(const r of s.scrolls)if(r.e.isConnected){r.e.scrollTop=r.top;r.e.scrollLeft=r.left}})}","u19Restore");

__studio33.u19Modal = (function u19Modal(){const dialogs=[...document.querySelectorAll('dialog[open]')];return dialogs.at(-1)||null});

__studio33.u19StageExit = __studio33.$fn((function u19StageExit(){const stage=__studio33.$('ptStage');stage.classList.remove('u19-stage-expanded');document.body.style.overflow=__studio33.editorFullScreen?'hidden':'';__studio33.u19Restore(__studio33.u19StageSnapshot);__studio33.u19StageSnapshot=null;__studio33.$('ptFull').textContent='Fullscreen';__studio33.$('ptFull').setAttribute('aria-pressed','false');__studio33.u19SyncExit()}),"function u19StageExit(){const stage=$('ptStage');stage.classList.remove('u19-stage-expanded');document.body.style.overflow=editorFullScreen?'hidden':'';u19Restore(u19StageSnapshot);u19StageSnapshot=null;$('ptFull').textContent='Fullscreen';$('ptFull').setAttribute('aria-pressed','false');u19SyncExit()}","u19StageExit");

__studio33.u19SyncExit = __studio33.$fn((function u19SyncExit(){const modal=__studio33.u19Modal(),native=document.fullscreenElement,expandedReader=typeof __studio33.u19Reader!=='undefined'&&__studio33.u19Reader.open&&__studio33.u19Reader.classList.contains('u19-expanded'),stage=__studio33.$('ptStage').classList.contains('u19-stage-expanded');const expanded=__studio33.editorFullScreen||!!__studio33.v13Focused||!!native||stage||expandedReader;const parent=modal||native||(stage?__studio33.$('ptStage'):__studio33.u19Card);if(__studio33.u19Exit.parentElement!==parent)parent.append(__studio33.u19Exit);if(__studio33.u19Exit.hidden===expanded)__studio33.u19Exit.hidden=!expanded;__studio33.u19Root.classList.toggle('u19-has-expanded',expanded);if(!expanded&&__studio33.u19Exit.parentElement!==__studio33.u19Card)__studio33.u19Card.append(__studio33.u19Exit)}),"function u19SyncExit(){const modal=u19Modal(),native=document.fullscreenElement,expandedReader=typeof u19Reader!=='undefined'&&u19Reader.open&&u19Reader.classList.contains('u19-expanded'),stage=$('ptStage').classList.contains('u19-stage-expanded');const expanded=editorFullScreen||!!v13Focused||!!native||stage||expandedReader;const parent=modal||native||(stage?$('ptStage'):u19Card);if(u19Exit.parentElement!==parent)parent.append(u19Exit);if(u19Exit.hidden===expanded)u19Exit.hidden=!expanded;u19Root.classList.toggle('u19-has-expanded',expanded);if(!expanded&&u19Exit.parentElement!==u19Card)u19Card.append(u19Exit)}","u19SyncExit");

__studio33.u19ExitCurrent = __studio33.$fn((async function u19ExitCurrent(){__studio33.u19StopEditing();if(__studio33.v13Focused){__studio33.v13CloseEditor();return}if(__studio33.u19Reader.open){__studio33.u19Reader.close();return}const modal=__studio33.u19Modal();if(modal){modal.close();__studio33.u19SyncExit();return}if(document.fullscreenElement){try{await document.exitFullscreen()}catch{__studio33.toast('Use the browser fullscreen exit control')}return}if(__studio33.$('ptStage').classList.contains('u19-stage-expanded')){__studio33.u19StageExit();return}if(__studio33.editorFullScreen)__studio33.setEditorFullScreen(false)}),"async function u19ExitCurrent(){u19StopEditing();if(v13Focused){v13CloseEditor();return}if(u19Reader.open){u19Reader.close();return}const modal=u19Modal();if(modal){modal.close();u19SyncExit();return}if(document.fullscreenElement){try{await document.exitFullscreen()}catch{toast('Use the browser fullscreen exit control')}return}if($('ptStage').classList.contains('u19-stage-expanded')){u19StageExit();return}if(editorFullScreen)setEditorFullScreen(false)}","u19ExitCurrent");

__studio33.u19IsEditable = (function u19IsEditable(e){return !!e&&(e.matches('textarea,select,input:not([type=checkbox]):not([type=radio]):not([type=button]):not([type=submit]):not([type=file]):not([type=color])')||e.isContentEditable)});

__studio33.u19StopEditing = __studio33.$fn((function u19StopEditing(){if(__studio33.u19Editing)delete __studio33.u19Editing.dataset.u19Editing;__studio33.u19Editing=null}),"function u19StopEditing(){if(u19Editing)delete u19Editing.dataset.u19Editing;u19Editing=null}","u19StopEditing");

__studio33.u19KeyToken = (function u19KeyToken(e){return {key:e.key||'',code:e.code||'',keyCode:e.keyCode||0}});

__studio33.u19Mapped = __studio33.$fn((function u19Mapped(e){for(const [action,key]of Object.entries(__studio33.u19State.remote)){if(key.code?e.code===key.code:key.key&&key.key!=='Unidentified'?e.key===key.key:(e.keyCode||0)===key.keyCode)return action}return null}),"function u19Mapped(e){for(const [action,key]of Object.entries(u19State.remote)){if(key.code?e.code===key.code:key.key&&key.key!=='Unidentified'?e.key===key.key:(e.keyCode||0)===key.keyCode)return action}return null}","u19Mapped");

__studio33.u19Visible = (function u19Visible(e){for(let d=e.closest('details');d;d=d.parentElement?.closest('details'))if(!d.open&&!d.querySelector(':scope>summary')?.contains(e))return false;return !e.disabled&&e.getAttribute('aria-disabled')!=='true'&&e.tabIndex>=0&&!e.closest('[hidden],[inert]')&&e.getClientRects().length>0&&getComputedStyle(e).visibility!=='hidden'});

__studio33.u19Scope = __studio33.$fn((function u19Scope(){return __studio33.u19Modal()||(!__studio33.$('commandOverlay').hidden?__studio33.$('commandOverlay'):document.fullscreenElement||(__studio33.$('ptStage').classList.contains('u19-stage-expanded')?__studio33.$('ptStage'):__studio33.editorFullScreen?__studio33.u19Card:document))}),"function u19Scope(){return u19Modal()||(!$('commandOverlay').hidden?$('commandOverlay'):document.fullscreenElement||($('ptStage').classList.contains('u19-stage-expanded')?$('ptStage'):editorFullScreen?u19Card:document))}","u19Scope");

__studio33.u19Focusable = __studio33.$fn((function u19Focusable(){return [...__studio33.u19Scope().querySelectorAll('button,input,select,textarea,summary,a[href],[tabindex]')].filter(__studio33.u19Visible)}),"function u19Focusable(){return [...u19Scope().querySelectorAll('button,input,select,textarea,summary,a[href],[tabindex]')].filter(u19Visible)}","u19Focusable");

__studio33.u19Navigate = __studio33.$fn((function u19Navigate(direction){const items=__studio33.u19Focusable();if(!items.length)return;const current=document.activeElement;if(!items.includes(current)){items[0].focus();return}const r=current.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;const vertical=direction==='up'||direction==='down',sign=direction==='up'||direction==='left'?-1:1;let winner=null,best=Infinity;for(const e of items){if(e===current)continue;const b=e.getBoundingClientRect(),x=b.left+b.width/2,y=b.top+b.height/2,primary=(vertical?y-cy:x-cx)*sign,secondary=Math.abs(vertical?x-cx:y-cy);if(primary<4)continue;const overlap=vertical?Math.min(r.right,b.right)-Math.max(r.left,b.left):Math.min(r.bottom,b.bottom)-Math.max(r.top,b.top);const score=primary+secondary*2.5+(overlap>0?0:200);if(score<best){winner=e;best=score}}if(winner){winner.focus({preventScroll:true});winner.scrollIntoView({block:'nearest',inline:'nearest',behavior:__studio33.u19ScrollBehaviour()})}else{const region=current.closest('.u19-media-viewport,#dwGrid,.v13-review,.cs-board');region?.scrollBy({left:vertical?0:sign*180,top:vertical?sign*180:0,behavior:__studio33.u19ScrollBehaviour()})}}),"function u19Navigate(direction){const items=u19Focusable();if(!items.length)return;const current=document.activeElement;if(!items.includes(current)){items[0].focus();return}const r=current.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;const vertical=direction==='up'||direction==='down',sign=direction==='up'||direction==='left'?-1:1;let winner=null,best=Infinity;for(const e of items){if(e===current)continue;const b=e.getBoundingClientRect(),x=b.left+b.width/2,y=b.top+b.height/2,primary=(vertical?y-cy:x-cx)*sign,secondary=Math.abs(vertical?x-cx:y-cy);if(primary<4)continue;const overlap=vertical?Math.min(r.right,b.right)-Math.max(r.left,b.left):Math.min(r.bottom,b.bottom)-Math.max(r.top,b.top);const score=primary+secondary*2.5+(overlap>0?0:200);if(score<best){winner=e;best=score}}if(winner){winner.focus({preventScroll:true});winner.scrollIntoView({block:'nearest',inline:'nearest',behavior:u19ScrollBehaviour()})}else{const region=current.closest('.u19-media-viewport,#dwGrid,.v13-review,.cs-board');region?.scrollBy({left:vertical?0:sign*180,top:vertical?sign*180:0,behavior:u19ScrollBehaviour()})}}","u19Navigate");

__studio33.u19MenuClose = __studio33.$fn((function u19MenuClose(){const find=[...document.querySelectorAll('.v13-find:not([hidden])')].at(-1);if(find){find.hidden=true;return true}const menus=[...document.querySelectorAll('.u17-editor-menu[open],.u17-view-menu[open],.studio-menu[open]')];if(menus.length){const d=menus.at(-1);d.open=false;d.querySelector('summary')?.focus();return true}if(!__studio33.$('themeMenu').hidden){__studio33.themeOpen(false);__studio33.$('themeToggle').focus();return true}return false}),"function u19MenuClose(){const find=[...document.querySelectorAll('.v13-find:not([hidden])')].at(-1);if(find){find.hidden=true;return true}const menus=[...document.querySelectorAll('.u17-editor-menu[open],.u17-view-menu[open],.studio-menu[open]')];if(menus.length){const d=menus.at(-1);d.open=false;d.querySelector('summary')?.focus();return true}if(!$('themeMenu').hidden){themeOpen(false);$('themeToggle').focus();return true}return false}","u19MenuClose");

__studio33.u19Back = __studio33.$fn((function u19Back(){if(__studio33.u19Editing){__studio33.u19StopEditing();return true}if(__studio33.u19MenuClose())return true;if(!__studio33.$('commandOverlay').hidden){__studio33.closeCommands();return true}const modal=__studio33.u19Modal();if(modal){if(modal===__studio33.v13EditorDialog)__studio33.v13CloseEditor();else modal.close();return true}if(document.fullscreenElement||__studio33.$('ptStage').classList.contains('u19-stage-expanded')||__studio33.editorFullScreen){__studio33.u19ExitCurrent();return true}return false}),"function u19Back(){if(u19Editing){u19StopEditing();return true}if(u19MenuClose())return true;if(!$('commandOverlay').hidden){closeCommands();return true}const modal=u19Modal();if(modal){if(modal===v13EditorDialog)v13CloseEditor();else modal.close();return true}if(document.fullscreenElement||$('ptStage').classList.contains('u19-stage-expanded')||editorFullScreen){u19ExitCurrent();return true}return false}","u19Back");

__studio33.u19Consume = (function u19Consume(e){e.preventDefault();e.stopImmediatePropagation()});

__studio33.u19CloneResult = __studio33.$fn((function u19CloneResult(node){if(node.tagName==='TEXTAREA'||node.tagName==='PRE'||node.tagName==='INPUT')return __studio33.csText('pre',node.value??node.textContent);if(node.tagName==='CANVAS'){const image=document.createElement('img');image.src=node.toDataURL();image.alt=node.getAttribute('aria-label')||'Result preview';image.style.maxWidth='100%';return image}const copy=node.cloneNode(true);for(const e of copy.querySelectorAll('input,select,textarea')){const value=e.type==='checkbox'?(e.checked?'Selected':'Not selected'):e.value||'';e.replaceWith(__studio33.csText('span',value))}copy.querySelectorAll('button,.v13-editor-tools,.u17-editor-controls,.u17-result-actions,.u19-view-actions,script,iframe').forEach(e=>e.remove());for(const e of [copy,...copy.querySelectorAll('*')]){e.removeAttribute('id');e.removeAttribute('tabindex');e.removeAttribute('hidden');for(const a of [...e.attributes])if(a.name.startsWith('on'))e.removeAttribute(a.name);if(e.tagName==='DETAILS')e.open=true}copy.style.maxHeight='none';return copy}),"function u19CloneResult(node){if(node.tagName==='TEXTAREA'||node.tagName==='PRE'||node.tagName==='INPUT')return csText('pre',node.value??node.textContent);if(node.tagName==='CANVAS'){const image=document.createElement('img');image.src=node.toDataURL();image.alt=node.getAttribute('aria-label')||'Result preview';image.style.maxWidth='100%';return image}const copy=node.cloneNode(true);for(const e of copy.querySelectorAll('input,select,textarea')){const value=e.type==='checkbox'?(e.checked?'Selected':'Not selected'):e.value||'';e.replaceWith(csText('span',value))}copy.querySelectorAll('button,.v13-editor-tools,.u17-editor-controls,.u17-result-actions,.u19-view-actions,script,iframe').forEach(e=>e.remove());for(const e of [copy,...copy.querySelectorAll('*')]){e.removeAttribute('id');e.removeAttribute('tabindex');e.removeAttribute('hidden');for(const a of [...e.attributes])if(a.name.startsWith('on'))e.removeAttribute(a.name);if(e.tagName==='DETAILS')e.open=true}copy.style.maxHeight='none';return copy}","u19CloneResult");

__studio33.u19ResultNodes = __studio33.$fn((function u19ResultNodes(id){const p=__studio33.$(id);if(!p)return [];const output=[...p.querySelectorAll('textarea[readonly]')].filter(e=>e.closest('section')===p&&!e.closest('details')&&e.id!=='lcCurlOutput');if(output.some(e=>e.value))return output.filter(e=>e.value);const ids={graph:['graphSvg','graphStatus'],calculator:['result','expression'],kanban:['knStats','knTasks'],dataworkbench:['dwSummary','dwGrid'],logs:['logSummary','logResults','logMetrics'],apiclient:['lcResponseMeta','lcResponseText'],finance:['financeResults','scheduleSummary','scheduleBody'],images:['imageSummary','imageCanvas'],annotation:['annCanvas'],contactsheet:['csCanvas'],colors:['colorResults']};const preferred=(ids[id]||[]).map(__studio33.$).filter(__studio33.$fn(e=>e&&__studio33.u19VisibleResult(e),"e=>e&&u19VisibleResult(e)",""));if(preferred.length)return preferred;return [...p.querySelectorAll('.metrics,.v13-review,.v9-results,.u18-report,.cs-stats,.cs-timer,canvas,svg')].filter(__studio33.$fn(e=>e.closest('section')===p&&!e.closest('details')&&__studio33.u19VisibleResult(e),"e=>e.closest('section')===p&&!e.closest('details')&&u19VisibleResult(e)","")).slice(0,6)}),"function u19ResultNodes(id){const p=$(id);if(!p)return [];const output=[...p.querySelectorAll('textarea[readonly]')].filter(e=>e.closest('section')===p&&!e.closest('details')&&e.id!=='lcCurlOutput');if(output.some(e=>e.value))return output.filter(e=>e.value);const ids={graph:['graphSvg','graphStatus'],calculator:['result','expression'],kanban:['knStats','knTasks'],dataworkbench:['dwSummary','dwGrid'],logs:['logSummary','logResults','logMetrics'],apiclient:['lcResponseMeta','lcResponseText'],finance:['financeResults','scheduleSummary','scheduleBody'],images:['imageSummary','imageCanvas'],annotation:['annCanvas'],contactsheet:['csCanvas'],colors:['colorResults']};const preferred=(ids[id]||[]).map($).filter(e=>e&&u19VisibleResult(e));if(preferred.length)return preferred;return [...p.querySelectorAll('.metrics,.v13-review,.v9-results,.u18-report,.cs-stats,.cs-timer,canvas,svg')].filter(e=>e.closest('section')===p&&!e.closest('details')&&u19VisibleResult(e)).slice(0,6)}","u19ResultNodes");

__studio33.u19VisibleResult = (function u19VisibleResult(e){return !e.closest('[hidden]')&&e.getClientRects().length>0&&(e.tagName==='CANVAS'||e.tagName==='SVG'||e.textContent.trim())});

__studio33.u19ReadResult = __studio33.$fn((function u19ReadResult(id){const nodes=__studio33.u19ResultNodes(id);__studio33.u19ReaderText.replaceChildren();if(!nodes.length){__studio33.toast('Generate a result first, then open Focus result.');return}__studio33.u19ReaderSnapshot=__studio33.u19Snapshot();__studio33.u19Reader.querySelector('h2').textContent=__studio33.views[id]+' · Result';let total=0;for(const node of nodes){total+=(node.value||node.textContent||'').length;if(total>200000){__studio33.u19ReaderText.append(__studio33.csText('p','This result is large. Use the original result/download for the complete content.'));break}try{const content=__studio33.u19CloneResult(node);if(content.matches('table')||content.querySelector('table')){const wrap=__studio33.csText('div','','u19-scroll-table');wrap.append(content);__studio33.u19ReaderText.append(wrap)}else __studio33.u19ReaderText.append(content)}catch{__studio33.u19ReaderText.append(__studio33.csText('p','This preview cannot be copied; inspect it in the original tool.'))}}const summary=__studio33.csText('div','Result from '+__studio33.views[id]+'. Viewing does not change your inputs or run the tool.','u19-result-summary');__studio33.u19ReaderText.prepend(summary);__studio33.u19OpenDialog(__studio33.u19Reader,__studio33.u19ReaderCopy);__studio33.u19SyncExit()}),"function u19ReadResult(id){const nodes=u19ResultNodes(id);u19ReaderText.replaceChildren();if(!nodes.length){toast('Generate a result first, then open Focus result.');return}u19ReaderSnapshot=u19Snapshot();u19Reader.querySelector('h2').textContent=views[id]+' · Result';let total=0;for(const node of nodes){total+=(node.value||node.textContent||'').length;if(total>200000){u19ReaderText.append(csText('p','This result is large. Use the original result/download for the complete content.'));break}try{const content=u19CloneResult(node);if(content.matches('table')||content.querySelector('table')){const wrap=csText('div','','u19-scroll-table');wrap.append(content);u19ReaderText.append(wrap)}else u19ReaderText.append(content)}catch{u19ReaderText.append(csText('p','This preview cannot be copied; inspect it in the original tool.'))}}const summary=csText('div','Result from '+views[id]+'. Viewing does not change your inputs or run the tool.','u19-result-summary');u19ReaderText.prepend(summary);u19OpenDialog(u19Reader,u19ReaderCopy);u19SyncExit()}","u19ReadResult");

__studio33.u19ShowRow = __studio33.$fn((function u19ShowRow(index,open=true){const row=__studio33.dwTable.rows[index];if(!row)return;__studio33.u19RowIndex=index;__studio33.u19RowOrder=__studio33.dwVisible().map(x=>x.i);__studio33.u19RowDialog.querySelector('h2').textContent='Table row '+(index+1);__studio33.u19RowFields.replaceChildren();for(let j=0;j<__studio33.dwTable.columns.length;j++){const dt=__studio33.csText('dt',__studio33.dwTable.columns[j]),dd=__studio33.csText('dd',row[j].value);dd.append(__studio33.csText('small','Stored type: '+row[j].type));__studio33.u19RowFields.append(dt,dd)}const at=__studio33.u19RowOrder.indexOf(index);__studio33.u19RowPrev.disabled=at<=0;__studio33.u19RowNext.disabled=at>=__studio33.u19RowOrder.length-1;if(open)__studio33.u19OpenDialog(__studio33.u19RowDialog,__studio33.u19RowDialog.querySelector('button'))}),"function u19ShowRow(index,open=true){const row=dwTable.rows[index];if(!row)return;u19RowIndex=index;u19RowOrder=dwVisible().map(x=>x.i);u19RowDialog.querySelector('h2').textContent='Table row '+(index+1);u19RowFields.replaceChildren();for(let j=0;j<dwTable.columns.length;j++){const dt=csText('dt',dwTable.columns[j]),dd=csText('dd',row[j].value);dd.append(csText('small','Stored type: '+row[j].type));u19RowFields.append(dt,dd)}const at=u19RowOrder.indexOf(index);u19RowPrev.disabled=at<=0;u19RowNext.disabled=at>=u19RowOrder.length-1;if(open)u19OpenDialog(u19RowDialog,u19RowDialog.querySelector('button'))}","u19ShowRow");

__studio33.u19InstallRowButtons = __studio33.$fn((function u19InstallRowButtons(){for(const row of document.querySelectorAll('#dwGrid tbody tr[data-row]')){if(row.querySelector('.u19-row-open'))continue;const cell=row.querySelector('td');if(!cell)continue;const b=__studio33.u19Button('Details',__studio33.$fn(()=>__studio33.u19ShowRow(Number(row.dataset.row)),"()=>u19ShowRow(Number(row.dataset.row))",""));b.className+=' u19-row-open';b.setAttribute('aria-label','Details for data row '+(Number(row.dataset.row)+1));cell.append(b)}}),"function u19InstallRowButtons(){for(const row of document.querySelectorAll('#dwGrid tbody tr[data-row]')){if(row.querySelector('.u19-row-open'))continue;const cell=row.querySelector('td');if(!cell)continue;const b=u19Button('Details',()=>u19ShowRow(Number(row.dataset.row)));b.className+=' u19-row-open';b.setAttribute('aria-label','Details for data row '+(Number(row.dataset.row)+1));cell.append(b)}}","u19InstallRowButtons");
}
export const steps=[
[2451,function initialize_2451(__studio33){
__studio33.u19Key = 'calc-studio-device-v19';

}],
[2452,function initialize_2452(__studio33){
__studio33.u19Defaults = {version:1,layout:'auto',motion:'auto',editorSize:'auto',wrap:true,remote:{},boardViews:{}};

}],
[2454,function initialize_2454(__studio33){
__studio33.u19State = undefined;

}],
[2456,function initialize_2456(__studio33){
__studio33.u19Root = document.documentElement;
__studio33.u19Card = document.querySelector('.main-card');

}],
[2457,function initialize_2457(__studio33){
__studio33.u19Layout = '';
__studio33.u19Learn = '';
__studio33.u19DirtyLayout = false;

}],
[2465,function initialize_2465(__studio33){
__studio33.u19Settings = __studio33.u19Dialog('u19Settings','Device & display');

}],
[2467,function initialize_2467(__studio33){
__studio33.u19LayoutPicker = __studio33.u19Option(__studio33.u19Settings,'u19Layout','Layout',[['auto','Auto — adapt to device'],['desktop','Desktop'],['mobile','Mobile'],['tv','TV — remote navigation']]);

}],
[2468,function initialize_2468(__studio33){
__studio33.u19MotionPicker = __studio33.u19Option(__studio33.u19Settings,'u19Motion','Motion',[['auto','Auto — animated; reduced on TV'],['full','Animated — full theme effects, including TV'],['reduced','Reduced — static effects'],['off','Off — no animation or transitions']]);

}],
[2469,function initialize_2469(__studio33){
__studio33.u19TextPicker = __studio33.u19Option(__studio33.u19Settings,'u19Text','Editor text size',[['auto','Auto — fit the selected layout'],['13','Compact · 13 px'],['15','Standard · 15 px'],['18','Large · 18 px'],['22','Extra large · 22 px'],['26','Presentation · 26 px']]);

}],
[2470,function initialize_2470(__studio33){
__studio33.u19WrapPicker = __studio33.u19Option(__studio33.u19Settings,'u19Wrap','Editor line wrapping',[['on','Wrap long lines'],['off','Keep lines; scroll horizontally']]);

}],
[2471,function initialize_2471(__studio33){
__studio33.u19DeviceStatus = __studio33.csText('p','','u19-settings-note');

}],
[2474,function initialize_2474(__studio33){
__studio33.u19RemoteBox = __studio33.csText('details','','details-box');

}],
[2476,function initialize_2476(__studio33){
__studio33.u19KeyStatus = __studio33.csText('p','Press a remote key while this panel is open.','u19-settings-note');

}],
[2480,function initialize_2480(__studio33){
__studio33.u19RemoteLabels = {up:'Move up',down:'Move down',left:'Move left',right:'Move right',activate:'OK / activate',normal:'Normal view'};

}],
[2481,function initialize_2481(__studio33){
__studio33.u19RemoteText = {};

}],
[2486,function initialize_2486(__studio33){
__studio33.u19DeviceButton = __studio33.u19Button('Device & display',__studio33.$fn(()=>__studio33.u19OpenSettings(),"()=>u19OpenSettings()",""),'u19DeviceButton');

}],
[2490,function initialize_2490(__studio33){
__studio33.u19DialogFocus = new WeakMap();

}],
[2498,function initialize_2498(__studio33){
__studio33.u19ResizeFrame = 0;

}],
[2507,function initialize_2507(__studio33){
__studio33.u19ThemePrevious = __studio33.setTheme;

}],
[2509,function initialize_2509(__studio33){
__studio33.u19Exit = __studio33.u19Button('↙ Normal view',__studio33.$fn(()=>__studio33.u19ExitCurrent(),"()=>u19ExitCurrent()",""),'u19Exit');

}],
[2514,function initialize_2514(__studio33){
__studio33.u19AppSnapshot = null;
__studio33.u19EditorSnapshot = null;
__studio33.u19StageSnapshot = null;
__studio33.u19ReaderSnapshot = null;
__studio33.u19NativeClosing = false;

}],
[2517,function initialize_2517(__studio33){
__studio33.u19OldAppFullscreen = __studio33.setEditorFullScreen;

}],
[2519,function initialize_2519(__studio33){
__studio33.u19OldCloseEditor = __studio33.v13CloseEditor;

}],
[2524,function initialize_2524(__studio33){
__studio33.u19OldEditorHeaderButton = __studio33.v13EditorHeader.querySelector('button');

}],
[2534,function initialize_2534(__studio33){
__studio33.u19Editing = null;

}],
[2548,function initialize_2548(__studio33){
__studio33.u19OldCommands = __studio33.showCommands;

}],
[2551,function initialize_2551(__studio33){
__studio33.u19Reader = __studio33.u19Dialog('u19Reader','Focused result');

}],
[2553,function initialize_2553(__studio33){
__studio33.u19ReaderActions = __studio33.csText('div','','u19-view-actions');

}],
[2554,function initialize_2554(__studio33){
__studio33.u19ReaderText = __studio33.csText('div','','u19-reading-content');

}],
[2557,function initialize_2557(__studio33){
__studio33.u19ReaderCopy = __studio33.u19Button('Copy result',__studio33.$fn(()=>__studio33.copyText(__studio33.u19ReaderText.innerText),"()=>copyText(u19ReaderText.innerText)",""),'u19ReaderCopy');

}],
[2565,function initialize_2565(__studio33){
__studio33.u19ZoomAreas = [];

}],
[2568,function initialize_2568(__studio33){
__studio33.u19RowDialog = __studio33.u19Dialog('u19RowDialog','Table row details');
__studio33.u19RowFields = document.createElement('dl');

}],
[2571,function initialize_2571(__studio33){
__studio33.u19RowTools = __studio33.csText('div','','u19-row-tools');

}],
[2572,function initialize_2572(__studio33){
__studio33.u19RowIndex = 0;
__studio33.u19RowOrder = [];

}],
[2573,function initialize_2573(__studio33){
__studio33.u19RowPrev = __studio33.u19Button('Previous row',__studio33.$fn(()=>__studio33.u19ShowRow(__studio33.u19RowOrder[Math.max(0,__studio33.u19RowOrder.indexOf(__studio33.u19RowIndex)-1)],false),"()=>u19ShowRow(u19RowOrder[Math.max(0,u19RowOrder.indexOf(u19RowIndex)-1)],false)",""),'u19RowPrev');
__studio33.u19RowNext = __studio33.u19Button('Next row',__studio33.$fn(()=>__studio33.u19ShowRow(__studio33.u19RowOrder[Math.min(__studio33.u19RowOrder.length-1,__studio33.u19RowOrder.indexOf(__studio33.u19RowIndex)+1)],false),"()=>u19ShowRow(u19RowOrder[Math.min(u19RowOrder.length-1,u19RowOrder.indexOf(u19RowIndex)+1)],false)",""),'u19RowNext');

}],
[2578,function initialize_2578(__studio33){
__studio33.u19OldDWRender = __studio33.dwRender;

}],
[2584,function initialize_2584(__studio33){
__studio33.u19PreviousBackup = __studio33.backupSnapshot;

}],
[2586,function initialize_2586(__studio33){
__studio33.u19PreviousValidation = __studio33.validateBackup;

}],
[2588,function initialize_2588(__studio33){
__studio33.u19PreviousRestore = __studio33.csRestoreSavedWork;

}],
[2590,function initialize_2590(__studio33){
__studio33.u19DialogWatch = new MutationObserver(__studio33.$fn(records=>{if(records.some(r=>r.type==='attributes'&&r.attributeName==='open'))__studio33.u19SyncExit()},"records=>{if(records.some(r=>r.type==='attributes'&&r.attributeName==='open'))u19SyncExit()}",""));

}]
];
