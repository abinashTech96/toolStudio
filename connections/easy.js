import{connectionGuides,connectionCapabilities}from'./guides.js';
export function installEasyConnection(api){
 const{state,$,node,button,page}=api,nav=document.querySelector('nav'),header=document.querySelector('header .row');
 let selected='wifi',peerSetup,chooser;
 const text=(e,v)=>{if(e.textContent!==v)e.textContent=v};
 const detail=(title,nodes,id)=>{const d=node('details');if(id)d.id=id;d.append(node('summary',title));for(const n of nodes)if(n)d.append(n);return d};
 const labels={devices:'Connect',transfer:'Send & receive',remote:'Remote',help:'Guides'};
 const moreList=node('div',undefined,'more-tools-list'),more=detail('More tools',[moreList],'connectionMore');
 for(const b of [...nav.querySelectorAll('button')]){if(labels[b.dataset.page])b.textContent=labels[b.dataset.page];else{b.textContent=b.textContent.replace(/^\d+\s*·\s*/,'');moreList.append(b)}}nav.append(more);more.addEventListener('click',event=>{if(event.target.closest('button'))more.open=false});
 function goto(name,focus){page(name);if(name==='devices'){peerSetup.hidden=false;chooser.hidden=true}let e=$(focus);for(let p=e?.parentElement;p;p=p.parentElement)if(p.tagName==='DETAILS')p.open=true;e?.focus();e?.scrollIntoView({block:'nearest'})}
 const start=button('Change connection',()=>{page('devices');peerSetup.hidden=true;chooser.hidden=false;chooser.querySelector('button')?.focus();api.notice('Choose a connection method. Read its guide before connecting.')});start.id='connectionStart';
 const guideButton=button('How to connect',()=>showGuide(selected));guideButton.id='connectionGuide';header.prepend(start,guideButton);
 const display=detail('Display',[],'connectionDisplay'),displayActions=node('div',undefined,'display-actions');displayActions.append($('theme'),$('expand'),$('layoutTV'));display.append(displayActions);header.append(display);display.addEventListener('click',event=>{if(event.target.closest('button'))display.open=false});document.querySelector('header>div').append($('peerState'));
 const devices=$('devices'),title=devices.querySelector('h2');title.textContent='What would you like to connect?';devices.querySelector('p').textContent='Choose a method. The guide shows each step before you connect.';
 peerSetup=node('div');peerSetup.id='peerSetup';
 for(const child of [...devices.children].slice(2))peerSetup.append(child);peerSetup.hidden=true;
 const methodNames={wifi:['Phone or computer','Wi-Fi / network · share files and results'],bluetooth:['Bluetooth device','Compatible BLE sensors and peripherals'],usb:['USB hardware','A documented USB device interface'],websocket:['WebSocket server','Connect to an endpoint you choose']};
 chooser=node('div',undefined,'connection-chooser');chooser.id='connectionChooser';
 for(const[k,[name,desc]]of Object.entries(methodNames)){const card=node('article',undefined,'method-card'),open=button(name,()=>{selected=k;goto(connectionGuides[k].target,connectionGuides[k].focus)});open.dataset.connectKind=k;open.className='method-open';open.append(node('small',desc));const available=node('p','','method-support');available.dataset.support=k;const help=button('Read '+name+' guide',()=>showGuide(k));help.className='method-guide';card.append(open,available,help);chooser.append(card)}
 devices.append(chooser,peerSetup);nav.querySelector('[data-page=devices]').onclick=()=>{page('devices');peerSetup.hidden=true;chooser.hidden=false};
 const steps=node('ol',undefined,'connection-progress');steps.setAttribute('aria-label','Pairing progress');for(const s of['Set up','Connect','Verify & test'])steps.append(node('li',s));peerSetup.prepend(steps);
 const pairGrid=peerSetup.querySelector('.grid'),sessionCard=pairGrid.children[0],codeCard=pairGrid.children[1];pairGrid.prepend(codeCard);
 const allowHeading=[...sessionCard.querySelectorAll('h3')].find(h=>h.textContent.startsWith('Allow'));
 if(allowHeading){const nodes=[];let n=allowHeading;while(n){const next=n.nextSibling;nodes.push(n);n=next}sessionCard.append(detail('Permissions · review what the other device may do',nodes,'peerPermissions'))}
 const manualCard=[...peerSetup.children].find(c=>c.classList.contains('card'));
 if(manualCard){const d=detail('Advanced / manual pairing',[],'manualPairing');d.className='card';manualCard.replaceWith(d);for(const n of [...manualCard.childNodes])d.append(n)}
 const pairLinkLabel=$('pairLink').closest('label'),scanLabel=$('scanPair').closest('label');
 const pairExtras=detail('Pairing link, QR and scanning',[$('pairQR'),pairLinkLabel,$('copyPairLink'),scanLabel],'pairingLinkDetails');codeCard.append(pairExtras);
 // Keep every existing hardware field and event binding; expose the common read path first.
 const bleCard=$('bleService').closest('.card'),profileLabel=node('label','Device profile'),profile=node('select');profile.id='bleProfile';
 for(const[v,label]of[['battery','Battery level · read-only example'],['manufacturer','Device manufacturer · read-only example'],['custom','Custom service / characteristic']]){const o=node('option',label);o.value=v;profile.append(o)}profileLabel.append(profile);bleCard.prepend(profileLabel);
 const bleSetup=detail('Custom BLE service and characteristic',[$('bleService').closest('label'),$('bleCharacteristic').closest('label')],'bleSetup');profileLabel.after(bleSetup);
 function setProfile(){if(profile.value==='battery'){$('bleService').value='battery_service';$('bleCharacteristic').value='battery_level'}else if(profile.value==='manufacturer'){$('bleService').value='device_information';$('bleCharacteristic').value='manufacturer_name_string'}bleSetup.open=profile.value==='custom'}
 profile.onchange=()=>{if(state.ble)void api.closeBLE();setProfile()};setProfile();
 const bleAdvanced=detail('Advanced controls · notifications and writes',[],'bleAdvanced');
 for(const id of['bleNotify','bleStopNotify','blePayload','bleEncoding','bleMethod','bleWrite'])bleAdvanced.append($(id).closest('label')||$(id));bleCard.insertBefore(bleAdvanced,$('bleLog'));
 const usbCard=$('usbVendor').closest('.card'),usbGrid=$('usbVendor').closest('.grid'),usbSetup=detail('Device interface settings · confirm the documented values',[],'usbSetup');
 const ids=node('div',undefined,'grid');for(const id of['usbVendor','usbProduct'])ids.append($(id).closest('label'));usbGrid.before(ids,usbSetup);for(const child of [...usbGrid.children])usbSetup.append(child);usbGrid.remove();
 const usbAdvanced=detail('Advanced controls · write a documented payload',[$('usbPayload').closest('label'),$('usbEncoding').closest('label'),$('usbWrite')],'usbAdvanced');usbCard.insertBefore(usbAdvanced,$('usbLog'));
 // The familiar endpoint and payload remain in place; subprotocols are optional.
 const wsProtocols=$('wsProtocols').closest('label'),wsAdvanced=detail('Optional subprotocol settings',[wsProtocols],'websocketAdvanced');$('wsURL').closest('label').after(wsAdvanced);
 for(const method of['wifi','bluetooth','usb','websocket']){
  const target=method==='wifi'?peerSetup:$(connectionGuides[method].target),box=node('div',undefined,'connection-assist'),h=node('h3',method==='wifi'?'Pair two browsers':connectionGuides[method].title),support=node('p','','readiness'),live=node('p','','connection-live'),actions=node('div',undefined,'row');
  support.id='support-'+method;live.id='live-'+method;live.setAttribute('role','status');actions.append(button('Step-by-step guide',()=>showGuide(method)),button('What can I do next?',()=>showGuide('workflows')));box.append(h,support,live,actions);target.prepend(box);
 }
 // Full instructions stay readable before a connection or browser permission prompt.
 const help=$('help'),oldHelp=help.querySelector('.card'),hosting=node('div',undefined,'guide-needs');
 hosting.append(node('h3','Run the optional helper on a computer'),node('p','This setup is for the person hosting the connection. Other people can use the supplied pairing-server address or use manual pairing. Install Node 22.13+ and Python 3.11+, download the repository and run these commands from its root.'));
 hosting.append(node("pre","npm ci\nnpm run build\npython3 -m venv .venv"),node("h4","Windows"),node("pre",".venv\\Scripts\\python.exe -m pip install -r Connection_Server/requirements.txt\n.venv\\Scripts\\python.exe Connection_Server/server.py"),node("h4","macOS / Linux"),node("pre",".venv/bin/python -m pip install -r Connection_Server/requirements.txt\n.venv/bin/python Connection_Server/server.py"),node("p","Open http://127.0.0.1:8765/ on the hosting computer, then Options \u2192 Connection. A phone needs the computer\u2019s reachable address and trusted HTTPS/WSS; 127.0.0.1 on the phone means the phone itself."));
 const hostingLink=node('a','Read the helper’s LAN, TLS and origin setup');hostingLink.href='https://github.com/abinashTech96/toolStudio/blob/main/Connection_Server/README.md';hostingLink.target='_blank';hostingLink.rel='noopener noreferrer';hosting.append(hostingLink);
 const archive=detail('Helper hosting, compatibility and privacy details',[hosting,oldHelp],'connectionHosting');
 const intro=node('p','Read the requirements and numbered steps for your chosen connection. Opening a guide does not connect or request device permission.','muted'),pickLabel=node('label','Connection guide'),pick=node('select');pick.id='connectionGuidePicker';for(const[k,g]of Object.entries(connectionGuides)){const o=node('option',g.title);o.value=k;pick.append(o)}pickLabel.append(pick);const content=node('div');content.id='connectionGuideContent';help.replaceChildren(node('h2','How to connect'),intro,pickLabel,content,archive);
 function showGuide(method){selected=method;more.open=false;page('help');pick.value=method;renderGuide(method);pick.focus()}
 function renderGuide(method){const g=connectionGuides[method];content.replaceChildren(node('h3',g.title),node('p',g.summary));const needs=node('div',undefined,'guide-needs'),ul=node('ul');for(const item of g.needs)ul.append(node('li',item));needs.append(node('h4','Before you start'),ul);content.append(needs);const ol=node('ol',undefined,'guide-steps');for(const[heading,body]of g.steps){const li=node('li');li.append(node('h4',heading),node('p',body));ol.append(li)}content.append(ol);const success=node('div',undefined,'guide-success');success.append(node('h4','You are connected when…'),node('p',g.success));content.append(success);const fixes=detail('If it does not work',[],'guideTroubleshooting');for(const[problem,solution]of g.issues){const row=detail(problem,[node('p',solution)]);fixes.append(row)}content.append(fixes,button('Go to '+(method==='workflows'?'Send & receive':'setup'),()=>{selected=method==='manual'?'wifi':method;goto(g.target,g.focus)}));if(method==='wifi')content.append(button('No pairing server? Use manual pairing',()=>showGuide('manual')));if(['wifi','manual'].includes(method))content.append(button('Helper server setup',()=>{archive.open=true;archive.scrollIntoView({block:'start'})}))}
 pick.onchange=()=>{selected=pick.value;renderGuide(selected)};renderGuide('wifi');
 for(const name of['bluetooth','usb','websocket'])nav.querySelector('[data-page='+name+']')?.addEventListener('click',()=>{selected=name});
 const connectionState=node('p','','connection-status-summary');connectionState.id='connectionStateSummary';connectionState.setAttribute('role','status');$('notice').after(connectionState);
 function renderSupport(){
  const caps=connectionCapabilities({rtc:window.RTCPeerConnection,crypto:crypto.subtle,secure:isSecureContext,ble:navigator.bluetooth,usb:navigator.usb,ws:window.WebSocket});
  const support={wifi:caps.wifi?'Browser pairing is available. A server or manual exchange is still required.':'Secure browser pairing is unavailable here. Use a supporting browser on HTTPS or localhost.',bluetooth:caps.bluetooth?'Web Bluetooth is available. Check that your BLE device is powered on and advertising.':'Bluetooth API unavailable here. Read the guide or choose Wi-Fi/network for two browsers.',usb:caps.usb?'WebUSB is available. Confirm your device interface from its documentation.':'USB API unavailable here. Read the guide for requirements and alternatives.',websocket:caps.websocket?'WebSocket client is available. You need a reachable endpoint supplied by its owner.':'WebSocket API is unavailable in this browser.'};
  for(const k of Object.keys(support)){text($('support-'+k),support[k]);text(chooser.querySelector('[data-support='+k+']'),caps[k]?'Available in this browser':'Not available here');chooser.querySelector('[data-support='+k+']').classList.toggle('unavailable',!caps[k])}
  const paired=state.approved&&state.peerApproved,ble=!!state.ble?.gatt?.connected&&!!state.characteristic,usb=!!state.usb?.opened;
  text($('live-wifi'),paired?'Connected to '+state.peer+' · pairing approved on both screens':state.dc?.readyState==='open'?'Connection open · compare codes and approve on both screens':state.pc?'Pairing in progress · follow the code or manual exchange steps':'Not connected · read the guide, then create or join a pairing');
  text($('live-bluetooth'),ble?'Connected to '+(state.ble.name||'BLE device')+' · choose a supported operation':'Not connected · choose a profile, then select a matching BLE device');
  text($('live-usb'),usb?'Connected to '+(state.usb.productName||'USB device')+' · interface '+state.usbInterface:'Not connected · review identifiers and interface settings first');
  text($('live-websocket'),'Server status: '+$('wsState').textContent);
  connectionState.hidden=!(state.pc||state.ble||state.usb||state.ws);text(connectionState,'Device pairing: '+(paired?'Connected · '+state.peer:state.pc?'Connecting / awaiting verification':'Not paired')+' · Bluetooth: '+(ble?'Connected':'Not connected')+' · USB: '+(usb?'Connected':'Not connected')+' · WebSocket: '+$('wsState').textContent);
  [...steps.children].forEach((li,i)=>li.classList.toggle('done',i===0?!!state.pc:i===1?state.dc?.readyState==='open':paired));
  for(const[id,enabled]of[['bleRead',ble&&state.characteristic?.properties.read],['bleWrite',ble&&(state.characteristic?.properties.write||state.characteristic?.properties.writeWithoutResponse)],['bleNotify',ble&&(state.characteristic?.properties.notify||state.characteristic?.properties.indicate)],['bleStopNotify',ble&&(state.characteristic?.properties.notify||state.characteristic?.properties.indicate)],['usbRead',usb],['usbWrite',usb]])$(id).disabled=!enabled;
  if($('pairLink').value)pairExtras.open=true;
 }
 const observer=new MutationObserver(renderSupport);for(const id of['peerState','bleLog','usbLog','wsState','roomStatus','notice'])observer.observe($(id),{childList:true,characterData:true,subtree:true});renderSupport();
 const refresh=button('Check browser support again',renderSupport);refresh.id='refreshConnectionSupport';chooser.after(refresh);
 if($('roomCode').value&&$('signalURL').value){peerSetup.hidden=false;chooser.hidden=true;selected='wifi'}
 window.addEventListener('pagehide',()=>observer.disconnect(),{once:true});
 return{showGuide};
}
