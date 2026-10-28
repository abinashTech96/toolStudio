import {installConnectionDoctor} from './doctor.js';
import {connectionGuides, connectionCapabilities} from './guides.js';
import {pairingView} from './pairing.js';

export function installEasyConnection(api) {
 const {state, $, node, button, page} = api;
 const nav = document.querySelector('nav'), header = document.querySelector('header .row');
 let selected = 'wifi', role = 'first', previousLocal = '';
 const text = (e, v) => {if (e.textContent !== v) e.textContent = v};
 const detail = (title, nodes, id) => {const d = node('details');if (id) d.id = id;d.append(node('summary', title));for (const n of nodes) if (n) d.append(n);return d};
 const labels = {devices:'Connect', transfer:'Files & photos', messages:'Messages', help:'Guides'};
 const moreList = node('div', undefined, 'more-tools-list');
 const more = detail('Advanced', [moreList], 'connectionMore');
 for (const b of [...nav.querySelectorAll('button')]) {
  if (labels[b.dataset.page]) b.textContent = labels[b.dataset.page];
  else {b.textContent = b.textContent.replace(/^\d+\s*·\s*/, '');moreList.append(b)}
 }
 nav.append(more);
 more.addEventListener('click', event => {if (event.target.closest('button')) more.open = false});
 const devices = $('devices');
 devices.querySelector('h2').textContent = 'Connect & share';
 devices.querySelector('p').textContent = 'Send messages, photos and files between your phone and another phone or computer.';
 const peerSetup = node('div');peerSetup.id = 'peerSetup';peerSetup.hidden = true;
 for (const child of [...devices.children].slice(2)) peerSetup.append(child);
 const chooser = node('div', undefined, 'connection-chooser');chooser.id = 'connectionChooser';
 const primary = node('article', undefined, 'method-card connection-primary');
 const openPeer = button('Connect another phone or computer', () => goto('devices', 'pairRoleFirst'));
 openPeer.dataset.connectKind = 'wifi';openPeer.className = 'primary';
 const peerSupport = node('p', '', 'method-support');peerSupport.dataset.support = 'wifi';
 primary.append(node('h3', 'Phone-to-phone sharing'), node('p', 'Start here for messages, photos and files. Put both devices on the same Wi-Fi for the simplest setup.', 'muted'), openPeer, peerSupport, button('Read sharing guide', () => showGuide('wifi')));
 chooser.append(primary);
 const advancedCards = node('div', undefined, 'advanced-methods');
 const advanced = detail('Advanced connections', [node('p', 'For server endpoints and compatible USB hardware. These are separate from phone-to-phone sharing.', 'muted'), advancedCards], 'advancedConnections');
 for (const [kind, name, description] of [['websocket', 'WebSocket server', 'Send text or bytes to a server address.'], ['usb', 'USB hardware', 'Use a documented hardware interface. Phone-to-phone cable sharing is not supported.']]) {
  const card = node('article', undefined, 'method-card');
  const open = button(name, () => {selected = kind;goto(connectionGuides[kind].target, connectionGuides[kind].focus)});
  open.dataset.connectKind = kind;open.className = 'method-open';open.append(node('small', description));
  const available = node('p', '', 'method-support');available.dataset.support = kind;
  card.append(open, available, button('Read ' + name + ' guide', () => showGuide(kind)));advancedCards.append(card);
 }
 chooser.append(advanced);devices.append(chooser, peerSetup);
 function goto(name, focus) {
  page(name);more.open = false;
  if (name === 'devices') {selected = 'wifi';peerSetup.hidden = false;chooser.hidden = true}
  const e = $(focus);for (let p = e?.parentElement; p; p = p.parentElement) if (p.tagName === 'DETAILS') p.open = true;
  e?.focus();e?.scrollIntoView({block:'nearest'});
 }
 function start() {selected = 'wifi';page('devices');peerSetup.hidden = true;chooser.hidden = false;openPeer.focus()}
 nav.querySelector('[data-page=devices]').onclick = () => {selected = 'wifi';page('devices');peerSetup.hidden = !state.pc;chooser.hidden = !!state.pc};
 const startButton = button('Connections home', start);startButton.id = 'connectionStart';
 const guideButton = button('How to connect', () => showGuide(selected));guideButton.id = 'connectionGuide';header.prepend(startButton, guideButton);
 const display = detail('Display', [], 'connectionDisplay'), displayActions = node('div', undefined, 'display-actions');
 displayActions.append($('theme'), $('expand'), $('layoutTV'));display.append(displayActions);header.append(display);
 display.addEventListener('click', event => {if (event.target.closest('button')) display.open = false});
 document.querySelector('header>div').append($('peerState'));

 const pairGrid = peerSetup.querySelector('.grid'), sessionCard = pairGrid.children[0], codeCard = pairGrid.children[1];
 const manualCard = [...peerSetup.children].find(c => c.classList.contains('card'));
 peerSetup.append(sessionCard, codeCard);pairGrid.remove();
 const workspace = node('div');workspace.id = 'pairingWorkspace';
 const steps = node('ol', undefined, 'connection-progress');steps.setAttribute('aria-label', 'Pairing progress');
 for (const label of ['Create', 'Exchange details', 'Approve', 'Share']) steps.append(node('li', label));
 const guideStatus = node('div', undefined, 'pairing-next');guideStatus.setAttribute('role', 'status');
 const nextTitle = node('h3'), nextText = node('p');guideStatus.append(nextTitle, nextText);
 const roles = node('div', undefined, 'row pairing-roles');roles.setAttribute('role', 'group');roles.setAttribute('aria-label', 'Choose this device’s role');
 const first = button('First device · start here', () => chooseRole('first')), second = button('Second device · join', () => chooseRole('second'));
 first.id = 'pairRoleFirst';second.id = 'pairRoleSecond';roles.append(first, second);
 function chooseRole(value) {role = value;renderSupport()}
 const nameLabel = $('deviceName').closest('label');nameLabel.className = 'pairing-device-name';
 const methodLabel = node('label', 'Pairing method'), method = node('select');method.id = 'pairingMethod';
 for (const [value, label] of [['manual', 'Copy & paste · no pairing server'], ['server', 'Pairing code · server required']]) {const o = node('option', label);o.value = value;method.append(o)}
 methodLabel.append(method);
 const manual = detail('Exchange pairing details', [], 'manualPairing');manual.open = true;manual.className = 'card';
 const createBlock = node('div');createBlock.id = 'pairingCreate';
 $('createOffer').textContent = 'Create connection details';createBlock.append($('createOffer'));
 const remoteBlock = node('div');remoteBlock.id = 'pairingRemote';
 const signalFile = $('signalFile'), remoteLabel = $('remoteSignal').closest('label');remoteLabel.firstChild.textContent = 'Pairing details from the other device';
 $('remoteSignal').placeholder = 'Paste the complete pairing text received from the other device';
 $('remoteSignal').maxLength = 65536;
 $('applySignal').textContent = 'Use pasted details';remoteBlock.append(remoteLabel, $('applySignal'));
 const fileLabel = node('label', 'Or load the pairing JSON file');fileLabel.append(signalFile);remoteBlock.append(fileLabel);
 const localBlock = node('div');localBlock.id = 'pairingLocal';
 const localLabel = $('localSignal').closest('label');localLabel.firstChild.textContent = 'Your pairing details · send to the other device';
 $('copySignal').textContent = 'Copy connection details';
 const copyActions = node('div', undefined, 'row');copyActions.append($('copySignal'), $('saveSignal'));
 localBlock.append(localLabel, copyActions, node('p', 'Send these details directly to the intended person. Keep both ToolStudio pages open without refreshing.', 'muted'));
 const exchange = node('div', undefined, 'pairing-exchange');exchange.append(createBlock, localBlock, remoteBlock);
 const network = $('iceServers').closest('details');network.id = 'pairingNetwork';
 manual.append(exchange);
 manualCard.remove();
 codeCard.id = 'pairingServer';codeCard.querySelector('h3').textContent = 'Pair with a code';
 codeCard.querySelector('p').textContent = 'Use the same pairing-server address on both devices. GitHub Pages does not provide one. Without a server, choose Copy & paste above.';
 const pairLinkLabel = $('pairLink').closest('label'), scanLabel = $('scanPair').closest('label');
 const pairExtras = detail('Pairing link, QR and scanning', [$('pairQR'), pairLinkLabel, $('copyPairLink'), scanLabel], 'pairingLinkDetails');codeCard.append(pairExtras);
 const allowHeading = [...sessionCard.querySelectorAll('h3')].find(h => h.textContent.startsWith('Allow'));
 if (allowHeading) {const nodes = [];let n = allowHeading;while (n) {const next = n.nextSibling;nodes.push(n);n = next}sessionCard.append(detail('Sharing permissions', nodes, 'peerPermissions'))}
 sessionCard.querySelector('h3').textContent = 'Session & verification';
 const support = node('p', '', 'readiness');support.id = 'support-wifi';
 const live = node('p', '', 'connection-live');live.id = 'live-wifi';live.setAttribute('role', 'status');
 const share = node('div', undefined, 'card connected-actions');share.id = 'connectedActions';share.hidden = true;
 const shareTitle = node('h3'), shareButtons = node('div', undefined, 'row');
 for (const [id, label, target, focus] of [['shareMessage', 'Send message', 'messages', 'message'], ['sharePhoto', 'Send photo', 'transfer', 'photoFile'], ['shareFile', 'Send file', 'transfer', 'sendFile']]) {const b = button(label, () => goto(target, focus));b.id = id;shareButtons.append(b)}
 share.append(shareTitle, node('p', 'Ready to share. The other device reviews each photo, file or text offer.', 'muted'), shareButtons, button('Disconnect', () => $('disconnect').click()));
 workspace.append(roles, methodLabel, guideStatus, manual, codeCard, network);sessionCard.querySelector('h3').after(nameLabel);
 const sessionDetails = detail('Device name, permissions & session', [sessionCard], 'sessionDetails');
 const wifiHelp = detail('Connection help & network requirements', [support, button('Read sharing guide', () => showGuide('wifi')), button('Read copy & paste guide', () => showGuide('manual'))], 'pairingHelp');
 peerSetup.append(steps, live, share, workspace, sessionDetails, wifiHelp);
 method.onchange = () => renderSupport();
 $('remoteSignal').addEventListener('input', () => renderSupport());

 for (const target of ['messages', 'transfer']) {
  const status = node('div', undefined, 'sharing-readiness');status.id = target + 'Readiness';
  const label = node('p');label.setAttribute('role', 'status');status.append(label, button('Connect a device', () => goto('devices', 'pairRoleFirst')));
  $(target).querySelector('h2').after(status);
 }
 // Existing hardware controls and their event bindings are retained under Advanced.
 const usbCard = $('usbVendor').closest('.card'), usbGrid = $('usbVendor').closest('.grid');
 const usbSetup = detail('Device interface settings · confirm the documented values', [], 'usbSetup');
 const ids = node('div', undefined, 'grid');for (const id of ['usbVendor', 'usbProduct']) ids.append($(id).closest('label'));
 usbGrid.before(ids, usbSetup);for (const child of [...usbGrid.children]) usbSetup.append(child);usbGrid.remove();
 const usbAdvanced = detail('Advanced controls · write a documented payload', [$('usbPayload').closest('label'), $('usbEncoding').closest('label'), $('usbWrite')], 'usbAdvanced');usbCard.insertBefore(usbAdvanced, $('usbLog'));
 $('usb').querySelector('h2').textContent = 'USB hardware';
 $('usb').querySelector('.card>p').textContent = 'For compatible hardware with a documented USB interface. Connecting two phones with a cable does not enable ToolStudio sharing.';
 const wsAdvanced = detail('Optional subprotocol settings', [$('wsProtocols').closest('label')], 'websocketAdvanced');$('wsURL').closest('label').after(wsAdvanced);
 for (const kind of ['usb', 'websocket']) {
  const g = connectionGuides[kind], box = node('div', undefined, 'connection-assist'), readiness = node('p', '', 'readiness'), current = node('p', '', 'connection-live');
  readiness.id = 'support-' + kind;current.id = 'live-' + kind;current.setAttribute('role', 'status');
  box.append(node('h3', g.title), readiness, current, button('Step-by-step guide', () => showGuide(kind)));$(g.target).prepend(box);
 }
 for (const b of nav.querySelectorAll('[data-page]')) b.addEventListener('click', () => {
  const name = b.dataset.page;if (name !== 'devices') selected = ['usb','websocket'].includes(name) ? name : 'wifi';
 });
 // Full instructions stay readable before a connection or browser permission prompt.
 const help=$('help'),oldHelp=help.querySelector('.card'),hosting=node('div',undefined,'guide-needs');
 hosting.append(node('h3','Run the optional helper on a computer'),node('p','This setup is for the person hosting the connection. Other people can use the supplied pairing-server address or use manual pairing. Install Node 22.13+ and Python 3.11+, download the repository and run these commands from its root.'));
 hosting.append(node("pre","npm ci\nnpm run build\npython3 -m venv .venv"),node("h4","Windows"),node("pre",".venv\\Scripts\\python.exe -m pip install -r Connection_Server/requirements.txt\n.venv\\Scripts\\python.exe Connection_Server/server.py"),node("h4","macOS / Linux"),node("pre",".venv/bin/python -m pip install -r Connection_Server/requirements.txt\n.venv/bin/python Connection_Server/server.py"),node("p","Open http://127.0.0.1:8765/ on the hosting computer, then Options \u2192 Connection. A phone needs the computer\u2019s reachable address and trusted HTTPS/WSS; 127.0.0.1 on the phone means the phone itself."));
 const hostingLink=node('a','Read the helper’s LAN, TLS and origin setup');hostingLink.href='https://github.com/abinashTech96/toolStudio/blob/main/Connection_Server/README.md';hostingLink.target='_blank';hostingLink.rel='noopener noreferrer';hosting.append(hostingLink);
 const archive=detail('Helper hosting, compatibility and privacy details',[hosting,oldHelp],'connectionHosting');
 const intro=node('p','Read the requirements and numbered steps for your chosen connection. Opening a guide does not connect or request device permission.','muted'),pickLabel=node('label','Connection guide'),pick=node('select');pick.id='connectionGuidePicker';for(const[k,g]of Object.entries(connectionGuides)){const o=node('option',g.title);o.value=k;pick.append(o)}pickLabel.append(pick);const content=node('div');content.id='connectionGuideContent';help.replaceChildren(node('h2','How to connect'),intro,pickLabel,content,archive);
 function showGuide(method){selected=['usb','websocket'].includes(method)?method:'wifi';more.open=false;page('help');pick.value=method;renderGuide(method);pick.focus()}
 function renderGuide(method){const g=connectionGuides[method];content.replaceChildren(node('h3',g.title),node('p',g.summary));const needs=node('div',undefined,'guide-needs'),ul=node('ul');for(const item of g.needs)ul.append(node('li',item));needs.append(node('h4','Before you start'),ul);content.append(needs);const ol=node('ol',undefined,'guide-steps');for(const[heading,body]of g.steps){const li=node('li');li.append(node('h4',heading),node('p',body));ol.append(li)}content.append(ol);const success=node('div',undefined,'guide-success');success.append(node('h4','You are connected when…'),node('p',g.success));content.append(success);const fixes=detail('If it does not work',[],'guideTroubleshooting');for(const[problem,solution]of g.issues){const row=detail(problem,[node('p',solution)]);fixes.append(row)}content.append(fixes,button('Go to '+(method==='workflows'?'Send & receive':'setup'),()=>{selected=method==='manual'?'wifi':method;if(method==='manual')methodSelectManual();goto(g.target,g.focus)}));if(method==='wifi')content.append(button('No pairing server? Use manual pairing',()=>showGuide('manual')));if(['wifi','manual'].includes(method))content.append(button('Helper server setup',()=>{archive.open=true;archive.scrollIntoView({block:'start'})}))}
 pick.onchange=()=>{selected=pick.value;renderGuide(selected)};renderGuide('wifi');
 for(const name of['usb','websocket'])nav.querySelector('[data-page='+name+']')?.addEventListener('click',()=>{selected=name});
 function methodSelectManual() {method.value = 'manual';renderSupport()}
 const doctor = installConnectionDoctor(api);wifiHelp.append(doctor);
 const connectionState = node('p', '', 'connection-status-summary');connectionState.id = 'connectionStateSummary';connectionState.setAttribute('role', 'status');$('notice').after(connectionState);
 function renderSupport() {
  const caps = connectionCapabilities({rtc:window.RTCPeerConnection, crypto:crypto.subtle, secure:isSecureContext, usb:navigator.usb, ws:window.WebSocket});
  const available = {wifi:caps.wifi ? 'Browser sharing supported. Choose a role and exchange pairing details.' : 'Secure browser sharing unavailable. Use a supporting browser on HTTPS or localhost.', usb:caps.usb ? 'WebUSB available. A compatible hardware interface is still required.' : 'USB API unavailable here. Read the guide for browser and hardware requirements.', websocket:caps.websocket ? 'Enter your server address below, then choose Connect. Wait for Open before sending.' : 'WebSocket unavailable in this browser.'};
  for (const kind of Object.keys(available)) {
   text($('support-' + kind), available[kind]);
   const message = chooser.querySelector('[data-support=' + kind + ']');
   text(message, kind === 'wifi' ? available[kind] : caps[kind] ? 'Browser supported · setup required' : 'Not available here');
   message.classList.toggle('unavailable', !caps[kind]);
  }
  let localType = '';try {localType = JSON.parse($('localSignal').value).description.type} catch {}
  if (previousLocal !== $('localSignal').value) {previousLocal = $('localSignal').value;if (localType === 'answer') role = 'second';else if (localType === 'offer') role = 'first'}
  const view = pairingView(state, {method:method.value, role, localType});
  text(nextTitle, view.title);text(nextText, view.instruction);text(live, view.connected ? 'Connected to ' + state.peer + ' · approved on both devices' : state.pc || role === 'second' ? view.title : 'Not connected');
  for (const [i, li] of [...steps.children].entries()) {li.classList.toggle('done', i < view.completed);if (i === view.step) li.setAttribute('aria-current', 'step');else li.removeAttribute('aria-current')}
  first.setAttribute('aria-pressed', String(role === 'first'));second.setAttribute('aria-pressed', String(role === 'second'));
  first.disabled = second.disabled = method.disabled = !!state.pairingBusy;
  manual.hidden = method.value !== 'manual';codeCard.hidden = method.value !== 'server';
  $('hostRoom').hidden = role !== 'first';$('joinRoom').hidden = role !== 'second';
  createBlock.hidden = role !== 'first';localBlock.hidden = !localType;remoteBlock.hidden = role === 'first' && !localType;
  if (role === 'second') exchange.append(remoteBlock, localBlock);else exchange.append(createBlock, localBlock, remoteBlock);
  $('createOffer').disabled = !caps.wifi || !!state.pairingBusy;
  $('applySignal').disabled = !caps.wifi || !!state.pairingBusy || !$('remoteSignal').value.trim();
  $('copySignal').disabled = $('saveSignal').disabled = !localType || !!state.pairingBusy;
  share.hidden = !view.connected;workspace.hidden = view.connected;text(shareTitle, 'Connected to ' + state.peer);
  for (const id of ['sendMessage', 'offerFile', 'offerText']) $(id).disabled = !view.connected;
  for (const target of ['messages', 'transfer']) {
   const box = $(target + 'Readiness');text(box.querySelector('p'), view.connected ? 'Connected to ' + state.peer : 'Connect and approve both devices before sharing.');box.querySelector('button').hidden = view.connected;
  }
  text($('live-usb'), state.usb?.opened ? 'Connected to ' + (state.usb.productName || 'USB device') : 'Not connected · check the documented device settings');
  text($('live-websocket'), 'Server status: ' + $('wsState').textContent);
  connectionState.hidden = !(state.pc || state.usb || state.ws);
  text(connectionState, 'Sharing: ' + (view.connected ? 'Connected · ' + state.peer : state.pc ? 'Pairing / approval pending' : 'Not connected') + ' · USB: ' + (state.usb?.opened ? 'Connected' : 'Not connected') + ' · WebSocket: ' + $('wsState').textContent);
  if ($('pairLink').value) pairExtras.open = true;
 }
 const observer = new MutationObserver(renderSupport);
 for (const id of ['peerState', 'usbLog', 'wsState', 'roomStatus', 'notice']) observer.observe($(id), {childList:true, characterData:true, subtree:true});
 window.addEventListener('connection:state', renderSupport);
 const refresh = button('Check browser support again', renderSupport);refresh.id = 'refreshConnectionSupport';chooser.append(refresh);
 if ($('roomCode').value && $('signalURL').value) {peerSetup.hidden = false;chooser.hidden = true;method.value = 'server';role = 'second'}
 renderSupport();
 window.addEventListener('pagehide', () => {observer.disconnect();window.removeEventListener('connection:state', renderSupport)}, {once:true});
 return {showGuide};
}
