import {loadQR} from './qr.js';
import {encodeManualQR,ManualQRCollector} from './manual-qr-codec.js';

// A separate guided view. The manual JSON fields and peer protocol remain shared.
export function installManualQR(api) {
 const {state,$,node,button,page,pairingTask,importSignal,offer,disconnect,review,copy}=api;
 const collector=new ManualQRCollector();
 let role='',phase='choice',working=false,ownedPC=null,generation=0,errorText='',disposed=false;
 let frames=[],frameIndex=0,stream=null,cameraTicket=0,timer=null,decodeBusy=false,scanContext=null;
 const section=node('section');section.id='qrConnect';section.hidden=true;
 const intro=node('p','Two scans, then confirm the security code. Keep both devices on the same Wi-Fi or hotspot.','muted');
 const status=node('div',undefined,'qr-guided-status');status.setAttribute('role','status');
 const step=node('small'),title=node('h3'),instruction=node('p');title.id='qrStepTitle';status.append(step,title,instruction);
 const choices=node('div',undefined,'qr-guided-choices');choices.id='qrChoices';
 const create=button('Create connection',()=>begin('create')),join=button('Join connection',()=>begin('join'));create.id='qrCreate';join.id='qrJoin';create.className='primary';choices.append(create,join);
 const code=node('div',undefined,'qr-guided-code');code.id='qrCode';
 const canvas=node('canvas');canvas.id='connectionQRCanvas';canvas.setAttribute('role','img');canvas.setAttribute('aria-label','Connection details QR');
 const frameInfo=node('p');frameInfo.id='connectionQRFrame';frameInfo.setAttribute('role','status');
 const partActions=node('div',undefined,'row');
 const previous=button('Previous QR',()=>drawFrame(frameIndex-1)),next=button('Next QR',()=>drawFrame(frameIndex+1));previous.id='connectionQRPrevious';next.id='connectionQRNext';partActions.append(previous,next);code.append(canvas,frameInfo,partActions);
 const action=button('Scan connection QR',()=>openScanner());action.id='qrMain';action.className='primary';
 const failure=node('div',undefined,'qr-guided-failure');failure.id='qrFailure';failure.setAttribute('role','alert');
 const failureMessage=node('p'),retry=button('Try again',()=>begin(role));retry.id='qrRetry';failure.append(failureMessage,retry);
 const connected=node('div',undefined,'qr-guided-share');connected.id='qrConnected';
 for(const[id,label,target,focus]of[['qrSendMessage','Send message','messages','message'],['qrSendFiles','Send files','transfer','sendFile']]){const b=button(label,()=>{page(target);$(focus).focus()});b.id=id;b.className='primary';connected.append(b)}
 const cancel=button('Cancel connection',()=>cancelFlow());cancel.id='qrCancel';
 const advanced=node('details');advanced.id='qrAdvanced';advanced.append(node('summary','Advanced'));
 const report=node('pre');report.id='qrReport';
 const copyReport=button('Copy connection report',()=>copy(JSON.stringify(state.peerReport,null,2)));copyReport.id='qrCopyReport';
 const manual=button('Copy/paste & network settings',()=>{closeScanner();$('connectionMore').open=false;document.querySelector('[data-connect-kind=wifi]').click();$('pairingOptions').open=true;$('pairingNetwork').open=true;});
 manual.id='qrManualSetup';
 advanced.append(node('p','Use the original manual setup or inspect a connection failure report.','muted'),manual,copyReport,report);
 const card=node('div',undefined,'card qr-guided-card');card.append(status,choices,code,action,failure,connected,cancel);section.append(node('h2','Connect via QR'),intro,card,advanced);document.querySelector('main').append(section);
 function open(){page('qrConnect');$('connectionMore').open=false;refresh();(phase==='choice'?create:title).focus();}
 title.tabIndex=-1;
 const navigation=button('Connect via QR',open);navigation.id='connectViaQR';navigation.dataset.page='qrConnect';$('connectionMore').querySelector('.more-tools-list').prepend(navigation);
 const homeEntry=node('article',undefined,'method-card');homeEntry.append(button('Connect via QR',open),node('p','Create or join with two scans. No pairing server.','muted'));$('advancedConnections').querySelector('.advanced-methods').prepend(homeEntry);

 const scanner=node('dialog');scanner.id='connectionQRScanner';scanner.className='manual-qr-dialog';scanner.setAttribute('aria-labelledby','connectionQRScannerTitle');
 const scanTitle=node('h2');scanTitle.id='connectionQRScannerTitle';
 const scanHelp=node('p','Point the camera at the other device’s QR. A valid scan advances automatically; both devices must still confirm the security code.');
 const video=node('video');video.id='connectionQRVideo';video.muted=true;video.autoplay=true;video.playsInline=true;video.setAttribute('aria-label','Camera preview for connection QR');
 const scanStatus=node('p');scanStatus.id='connectionQRScanStatus';scanStatus.setAttribute('role','status');
 const restart=button('Start camera',()=>startCamera());restart.id='connectionQRCamera';
 const imageLabel=node('label','Or scan a QR image'),imageInput=node('input');imageInput.type='file';imageInput.accept='image/*';imageInput.id='connectionQRImage';imageLabel.append(imageInput);
 const reset=button('Reset scan progress',()=>{collector.reset();scanStatus.textContent='Scan progress cleared. Scan the first QR.'});reset.id='connectionQRReset';
 const cancelScan=button('Cancel scan',()=>scanner.close());cancelScan.id='connectionQRScanCancel';
 const scanActions=node('div',undefined,'row');scanActions.append(restart,reset,cancelScan);scanner.append(scanTitle,scanHelp,video,scanStatus,imageLabel,scanActions);document.body.append(scanner);
 scanner.addEventListener('close',()=>{if(scanner.open)return;stopCamera();collector.reset();scanContext=null;imageInput.value=''});
 const visible=()=>!disposed&&!section.hidden;
 const current=c=>c&&visible()&&c.generation===generation&&c.role===role&&c.pc===state.pc;
 const text=(element,value)=>{if(element.textContent!==value)element.textContent=value};
 function closeScanner(){stopCamera();if(scanner.open)scanner.close();collector.reset();scanContext=null;imageInput.value=''}
 function clearQR(){frames=[];frameIndex=0;canvas.width=canvas.height=1;}
 function cancelFlow(){const pc=ownedPC||(working?state.pc:null);generation++;working=false;role='';phase='choice';ownedPC=null;errorText='';closeScanner();clearQR();if((pc&&pc===state.pc)||state.peerFailure)disconnect();refresh();if(visible())create.focus()}
 async function begin(nextRole){
  if(!nextRole||working||state.pairingBusy)return;
  const before=generation,peer=state.pc;
  if(peer&&(peer!==ownedPC||(state.approved&&state.peerApproved))){const accepted=await review('Start a new connection?','This disconnects the current device and clears this session.','Start new connection');if(!accepted||generation!==before||state.pc!==peer||!visible())return;}
  generation++;const ticket=generation;working=true;closeScanner();clearQR();role=nextRole;phase='preparing';ownedPC=null;errorText='';disconnect();refresh();
  try{
   if(nextRole==='create'){
    await pairingTask(offer);if(ticket!==generation||disposed)return;ownedPC=state.pc;
    if(!ownedPC||state.peerFailure)throw Error('Connection could not be created.');
    await prepareQR(ticket,ownedPC);if(ticket!==generation||state.pc!==ownedPC)return;phase='offer';
   }else phase='scan';
  }catch(error){if(ticket===generation){phase='failed';errorText=error.message;}}
  finally{if(ticket===generation){working=false;refresh();if(visible()&&!$('review').open)title.focus();}}
  if(ticket===generation&&phase==='scan'&&visible())await openScanner();
 }
 async function prepareQR(ticket,pc){const encoded=await encodeManualQR($('localSignal').value);if(ticket!==generation||state.pc!==pc||disposed)return;frames=encoded.frames;frameIndex=0;await drawFrame(0);}
 async function drawFrame(index){
  if(index<0||index>=frames.length)return;const ticket=generation,value=frames[index],engine=await loadQR('qrencode');
  if(ticket!==generation||frames[index]!==value||disposed)return;
  const qr=engine.QRCode.create(value,{errorCorrectionLevel:'M'}),n=qr.modules.size,scale=4;
  canvas.width=canvas.height=(n+8)*scale;const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#000';for(let y=0;y<n;y++)for(let x=0;x<n;x++)if(qr.modules.get(y,x))ctx.fillRect((x+4)*scale,(y+4)*scale,scale,scale);
  frameIndex=index;frameInfo.textContent=frames.length===1?'Scan this QR on the other device':'QR '+(index+1)+' of '+frames.length+' · scan every part';previous.hidden=next.hidden=frames.length===1;previous.disabled=index===0;next.disabled=index===frames.length-1;
 }
 function refresh(){
  document.body.classList.toggle('qr-guided-view',visible());
  if(role&&!working){
   if(state.peerFailure){phase='failed';errorText=state.peerFailure.instruction;}
   else if(ownedPC&&state.pc!==ownedPC){phase='failed';errorText='The connection ended. Keep both pages open and try again.';}
   else if(ownedPC&&state.dc?.readyState==='open')phase=state.approved&&state.peerApproved?'connected':'verify';
  }
  if(scanner.open&&(!visible()||!current(scanContext)||state.peerFailure||$('review').open))closeScanner();
  const views={choice:['','Connect another device','Choose Create on one device and Join on the other.'],preparing:['','Preparing connection…','Keep this page open. Your next step will appear automatically.'],offer:['1 of 3','Let the other device scan this QR',state.gamesOnly?'On the other device: Games → Connect via QR → Join connection.':'On the other device: Advanced → Connect via QR → Join connection.'],scan:['1 of 3','Scan the first device’s QR','The reply QR will appear automatically after a valid scan.'],reply:['2 of 3','Let the first device scan your reply','On the first device, tap Scan reply QR and point its camera at this screen.'],connecting:['3 of 3','Connecting the devices…','Keep both pages open. The security code will appear when the connection opens.'],verify:['3 of 3',state.approved?'Waiting for the other device':'Confirm the matching security code','Compare the code on both devices. Both people must approve before sharing.'],connected:['','Connected to '+state.peer,state.gamesOnly?'Return to Games and choose Remote player in Game settings.':'You can now send messages and files.'],failed:['','Connection could not complete','Your connection has not been reset. Read the problem below, then try again.']};
  const v=views[phase];text(step,v[0]);text(title,v[1]);text(instruction,v[2]);step.hidden=!v[0];
  choices.hidden=phase!=='choice';create.disabled=join.disabled=working||!!state.pairingBusy;
  code.hidden=!['offer','reply'].includes(phase)||!frames.length;
  action.hidden=!['offer','scan'].includes(phase);action.disabled=working||!!state.pairingBusy;text(action,phase==='offer'?'Scan reply QR':'Scan connection QR');
  failure.hidden=phase!=='failed';text(failureMessage,errorText);retry.disabled=working||!!state.pairingBusy;
  connected.hidden=phase!=='connected';cancel.hidden=phase==='choice';text(cancel,phase==='connected'?'Disconnect':'Cancel connection');cancel.disabled=false;
  report.hidden=copyReport.hidden=!state.peerReport;text(report,state.peerReport?JSON.stringify(state.peerReport,null,2):'');
 }
 function stopCamera(){cameraTicket++;clearTimeout(timer);timer=null;const held=stream;stream=null;for(const track of held?.getTracks()||[])track.stop();video.srcObject=null;video.hidden=true;restart.disabled=false;restart.textContent='Start camera';}
 async function openScanner(){
  if(!visible()||working||state.pairingBusy||!['offer','scan'].includes(phase))return;
  closeScanner();scanContext={generation,role,pc:state.pc};scanTitle.textContent=role==='create'?'Scan reply QR':'Scan connection QR';scanStatus.textContent='Opening camera…';scanner.showModal();await startCamera();
 }
 async function startCamera(){
  if(!scanner.open||!current(scanContext))return;stopCamera();const ticket=++cameraTicket;restart.disabled=true;
  if(!navigator.mediaDevices?.getUserMedia){restart.disabled=false;scanStatus.textContent='Camera scanning is unavailable. Choose a QR image below or use manual setup under Advanced.';return;}
  try{
   const held=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'},width:{ideal:1280},height:{ideal:720}},audio:false});
   if(ticket!==cameraTicket||!scanner.open||!current(scanContext)||document.hidden){for(const track of held.getTracks())track.stop();return;}
   stream=held;video.srcObject=held;video.hidden=false;await video.play();if(ticket!==cameraTicket||!scanner.open||!current(scanContext))return;
   restart.textContent='Restart camera';restart.disabled=false;scanStatus.textContent=collector.parts.size?'Continue scanning the remaining numbered QR codes.':'Hold the other device’s QR steady inside the camera preview.';tick(ticket);
  }catch(error){if(ticket!==cameraTicket)return;stopCamera();scanStatus.textContent=error?.name==='NotAllowedError'?'Camera access was not granted. Choose a QR image below or try Start camera.':'Camera could not start. Choose a QR image below or try Start camera again.';}
 }
 async function decodeCanvas(c){
  if(typeof BarcodeDetector==='function'){try{const found=await new BarcodeDetector({formats:['qr_code']}).detect(c);if(found[0]?.rawValue)return found[0].rawValue;}catch{}}
  const pixels=c.getContext('2d',{willReadFrequently:true}).getImageData(0,0,c.width,c.height),result=(await loadQR('qrdecode')).jsQR(pixels.data,c.width,c.height,{inversionAttempts:'attemptBoth'});return result?.data||'';
 }
 async function acceptText(value,before,ticket){
  if(!scanner.open||ticket!==cameraTicket||before!==scanContext||!current(before))return;
  const result=await collector.accept(value,before.role==='join'?'offer':'answer');
  if(!scanner.open||ticket!==cameraTicket||before!==scanContext||!current(before)||result.cancelled)return;
  scanStatus.textContent='Scanned '+result.received+' of '+result.total+' QR'+(result.total>1?' parts. Show the next numbered QR.':'.');if(!result.data)return;
  closeScanner();working=true;phase='preparing';refresh();
  try{
   await pairingTask(()=>importSignal(result.data));if(before.generation!==generation||disposed)return;ownedPC=state.pc;
   if(!ownedPC||state.peerFailure)throw Error('Connection could not complete.');
   if(role==='join'){await prepareQR(generation,ownedPC);if(before.generation!==generation||state.pc!==ownedPC)return;phase='reply';}else phase='connecting';
  }catch(error){if(before.generation===generation){phase='failed';errorText=error.message;}}
  finally{if(before.generation===generation){working=false;refresh();if(visible()&&!$('review').open)title.focus();}}
 }
 async function tick(ticket){
  if(ticket!==cameraTicket||!scanner.open||document.hidden||!current(scanContext))return;
  if(!decodeBusy&&video.videoWidth&&video.videoHeight){decodeBusy=true;const before=scanContext;
   try{const c=document.createElement('canvas'),ratio=Math.min(1,960/Math.max(video.videoWidth,video.videoHeight));c.width=Math.max(1,Math.round(video.videoWidth*ratio));c.height=Math.max(1,Math.round(video.videoHeight*ratio));c.getContext('2d',{willReadFrequently:true}).drawImage(video,0,0,c.width,c.height);const value=await decodeCanvas(c);if(value&&ticket===cameraTicket)await acceptText(value,before,ticket);}catch(error){if(ticket===cameraTicket&&scanner.open)scanStatus.textContent=error.message;}finally{decodeBusy=false;}}
  if(ticket===cameraTicket&&scanner.open)timer=setTimeout(()=>tick(ticket),450);
 }
 imageInput.onchange=async()=>{
  const file=imageInput.files[0],before=scanContext;if(!file)return;stopCamera();const ticket=cameraTicket;
  try{if(file.size>16*1024*1024)throw Error('QR image limit: 16 MiB.');const bitmap=await createImageBitmap(file);
   try{if(!scanner.open||ticket!==cameraTicket||before!==scanContext||!current(before))return;const c=document.createElement('canvas'),ratio=Math.min(1,1600/Math.max(bitmap.width,bitmap.height));c.width=Math.max(1,Math.round(bitmap.width*ratio));c.height=Math.max(1,Math.round(bitmap.height*ratio));c.getContext('2d',{willReadFrequently:true}).drawImage(bitmap,0,0,c.width,c.height);const value=await decodeCanvas(c);if(!value)throw Error('No QR found. Choose a clearer image.');if(ticket===cameraTicket)await acceptText(value,before,ticket);}finally{bitmap.close();}
  }catch(error){if(scanner.open&&ticket===cameraTicket)scanStatus.textContent=error.message;}finally{imageInput.value='';}
 };
 const observer=new MutationObserver(()=>{if(!visible()||$('review').open)closeScanner();refresh();});observer.observe(section,{attributes:true,attributeFilter:['hidden']});observer.observe($('review'),{attributes:true,attributeFilter:['open']});
 window.addEventListener('connection:state',refresh);
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&scanner.open){stopCamera();scanStatus.textContent='Camera paused. Tap Start camera to continue.';}});
 window.addEventListener('pagehide',event=>{if(!event.persisted){disposed=true;generation++;}closeScanner();});
 window.addEventListener('pageshow',()=>refresh());
 refresh();
 return {open,pause:closeScanner,reset:cancelFlow};
}
