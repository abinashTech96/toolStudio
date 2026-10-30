// The same QR/verification implementation as Connections, in a Games-only frame.
export function installGameConnection({onStatus,onPacket,onNotice}){
 const $=id=>document.getElementById(id),dock=$('playersDock'),dialog=$('gamePairing');
 const opaque=location.protocol==='file:'||location.origin==='null';
 const token=[...crypto.getRandomValues(new Uint8Array(32))].map(n=>n.toString(16).padStart(2,'0')).join('');
 let frame=null,port=null,approved=false,lastPeer='Other device',pendingOpen=false;
 function send(message){port?.postMessage(message);}
 function open(){pendingOpen=true;if(!frame){frame=document.createElement('iframe');frame.title='Connect Games via QR';frame.id='gameConnectionFrame';frame.allow='camera';if(globalThis.__toolStudioGameConnection){frame.srcdoc=globalThis.__toolStudioGameConnection.replace('<head>','<head><script>globalThis.__toolStudioGamesToken='+JSON.stringify(token)+';<\/script>');}else{const url=new URL('../connections/index.html',location.href);url.hash='games='+token;frame.src=url.href;}$('gamePairingBody').append(frame);}if(!dialog.open)dialog.showModal();send({type:'show'});}
 function update(m){
  approved=!!m.approved;lastPeer=m.peer||lastPeer;const status=approved?'Connected':m.state==='failed'?'Connection failed':m.state==='closed'?'Not connected':'Pairing…';
  $('playersStatus').textContent=status;$('disconnectPlayers').disabled=!approved&&m.state==='closed';
  const list=$('connectedPlayers');list.replaceChildren();const self=document.createElement('li');self.textContent='This device · You';list.append(self);
  if(approved||m.state!=='closed'||lastPeer!=='Other device'){const peer=document.createElement('li');peer.textContent=lastPeer+' · '+(approved?'Connected':status);list.append(peer);}
  onStatus(m);if(approved&&dialog.open)dialog.close();
 }
 window.addEventListener('message',event=>{
  if(!frame||event.source!==frame.contentWindow||port||event.data?.type!=='toolstudio-games-ready'||event.data.token!==token||(!opaque&&event.origin!==location.origin))return;
  const channel=new MessageChannel();port=channel.port1;port.onmessage=event=>{const m=event.data;if(!m||typeof m!=='object')return;if(m.type==='status')update(m);else if(m.type==='packet')onPacket(m.text);else if(m.type==='send-error')onNotice('The connection is not ready. Reconnect before playing.');else if(m.type==='closed')update({approved:false,state:'closed',peer:lastPeer});else if(m.type==='ready'&&pendingOpen)send({type:'show'});};port.start();frame.contentWindow.postMessage({type:'toolstudio-games-port',token},opaque?'*':location.origin,[channel.port2]);
 });
 $('connectGamesQR').onclick=open;$('closeGamePairing').onclick=()=>dialog.close();dialog.addEventListener('close',()=>{pendingOpen=false;send({type:'pause'});$('connectGamesQR').focus();});
 $('disconnectPlayers').onclick=()=>{send({type:'disconnect'});};
 function dockState(open){dock.dataset.open=String(open);$('playersToggle').setAttribute('aria-expanded',String(open));$('playersToggle').textContent=open?'Close players':'Players';document.body.classList.toggle('players-open',open);}
 $('playersToggle').onclick=()=>dockState(dock.dataset.open!=='true');dockState(matchMedia('(min-width:1250px)').matches);matchMedia('(min-width:1250px)').addEventListener('change',e=>dockState(e.matches));
 dock.addEventListener('keydown',e=>{if(e.key==='Escape')dockState(false);});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)send({type:'pause'});});
 window.addEventListener('pagehide',()=>{send({type:'disconnect'});port?.close();});
 return {send:text=>send({type:'send',text}),open,disconnect:()=>send({type:'disconnect'})};
}
