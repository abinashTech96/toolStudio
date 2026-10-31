// A dedicated, authenticated parent port for Games. It exposes no main-tab controls.
export function installGameBridge({state,$,send,disconnect,qr}) {
 const token=globalThis.__toolStudioGamesToken||new URLSearchParams(location.hash.slice(1)).get('games');
 if(window.parent===window||!token||!/^[a-f0-9]{64}$/.test(token))return null;
 const parent=window.parent,origin=location.protocol==='file:'||location.origin==='null'?'*':location.origin;
 let port=null,last='',disposed=false;
 state.gamesOnly=true;document.body.classList.add('games-embed');
 function status(){if(!port||disposed)return;const value={type:'status',approved:!!(state.approved&&state.peerApproved),state:state.peerFailure?'failed':state.pc?.connectionState||'closed',peer:String(state.peer).slice(0,40),pair:state.pairID||'',local:$('deviceName').value.slice(0,40)};const signature=JSON.stringify(value);if(signature!==last){last=signature;port.postMessage(value);}}
 function pause(){qr.pause();}
 window.addEventListener('connection:state',status);
 window.addEventListener('message',event=>{
  if(port||disposed||event.source!==parent||(origin!=='*'&&event.origin!==origin)||event.data?.type!=='toolstudio-games-port'||event.data.token!==token||!event.ports[0])return;
  port=event.ports[0];port.onmessage=event=>{const m=event.data;if(!m||typeof m!=='object')return;
   if(m.type==='send'&&typeof m.text==='string'&&new TextEncoder().encode(m.text).length<=32768){try{send({t:'game',v:1,text:m.text});}catch{port.postMessage({type:'send-error'});}}
   else if(m.type==='name'&&!state.pc&&typeof m.name==='string'&&m.name.trim()&&m.name.length<=24){$('deviceName').value=m.name.replace(/[\u0000-\u001f\u007f]/g,'').trim();last='';status();}
   else if(m.type==='show')qr.open();else if(m.type==='pause')pause();else if(m.type==='disconnect'){qr.reset();disconnect();status();}
  };port.start();port.postMessage({type:'ready'});last='';status();qr.open();
 });
 parent.postMessage({type:'toolstudio-games-ready',token},origin);
 window.addEventListener('pagehide',()=>{disposed=true;port?.postMessage({type:'closed'});port?.close();window.removeEventListener('connection:state',status);});
 return {receive(m){if(!port||disposed||m.v!==1||typeof m.text!=='string'||new TextEncoder().encode(m.text).length>32768)return;port.postMessage({type:'packet',text:m.text});}};
}
