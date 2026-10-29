import {loadQR} from './qr.js';
import {encodeManualQR,ManualQRCollector,parseManualPairing} from './manual-qr-codec.js';

export function installManualQR(api) {
 const {state,$,node,button,notice,importSignal,pairingTask}=api;
 const remote=$('remoteSignal'),local=$('localSignal'),collector=new ManualQRCollector();
 let busy=false,disposed=false,stream=null,cameraTicket=0,timer=null,decodeBusy=false,scanContext=null,displayContext=null,reviewContext=null,frameIndex=0,frames=[],displayValue='';
 const second=()=>$('pairRoleSecond').getAttribute('aria-pressed')==='true';
 const context=()=>({pc:state.pc,local:local.value,remote:remote.value,role:second(),method:$('pairingMethod').value});
 const current=c=>!disposed&&c&&c.pc===state.pc&&c.local===local.value&&c.role===second()&&c.method===$('pairingMethod').value;
 const valid=(text,type='')=>{try{return parseManualPairing(text,type)}catch{return null}};
 const active=()=>$('pairingMethod').value==='manual'&&!$('devices').hidden&&!$('peerSetup').hidden&&!$('pairingWorkspace').hidden;
 const dialog=(id,title)=>{const d=node('dialog');d.id=id;d.className='manual-qr-dialog';const h=node('h2',title);h.id=id+'Title';d.setAttribute('aria-labelledby',h.id);d.append(h);document.body.append(d);return d};
 const showLocal=button('Show connection QR',()=>showCurrentQR());showLocal.id='showConnectionQR';$('copySignal').parentElement.append(showLocal);
 const actions=node('div',undefined,'row manual-qr-actions');$('applySignal').before(actions);actions.append($('applySignal'));
 const scan=button('Scan connection QR',()=>openScanner());scan.id='scanConnectionQR';
 const answer=button('Generate answer QR',()=>generateAnswerQR());answer.id='generateAnswerQR';actions.append(scan,answer);

 const display=dialog('connectionQRDisplay','Connection QR');
 const displayInfo=node('p'),canvas=node('canvas');canvas.id='connectionQRCanvas';canvas.setAttribute('role','img');canvas.setAttribute('aria-label','Connection details QR');
 const frameInfo=node('p');frameInfo.id='connectionQRFrame';frameInfo.setAttribute('role','status');
 const frameActions=node('div',undefined,'row');
 const previous=button('Previous QR',()=>drawFrame(frameIndex-1)),next=button('Next QR',()=>drawFrame(frameIndex+1));previous.id='connectionQRPrevious';next.id='connectionQRNext';frameActions.append(previous,next);
 display.append(displayInfo,canvas,frameInfo,frameActions,button('Close',()=>display.close()));
 display.addEventListener('close',()=>{if(display.open)return;displayContext=null;frames=[];displayValue='';canvas.width=canvas.height=1});

 const scanner=dialog('connectionQRScanner','Scan connection QR');
 const scanHelp=node('p','Point the camera at the other device’s connection QR. You will review the JSON before inserting it.');
 const video=node('video');video.id='connectionQRVideo';video.muted=true;video.autoplay=true;video.playsInline=true;video.setAttribute('aria-label','Camera preview for connection QR');
 const scanStatus=node('p','');scanStatus.id='connectionQRScanStatus';scanStatus.setAttribute('role','status');
 const restart=button('Start camera',()=>startCamera());restart.id='connectionQRCamera';
 const imageLabel=node('label','Or scan a QR image'),imageInput=node('input');imageInput.type='file';imageInput.accept='image/*';imageInput.id='connectionQRImage';imageLabel.append(imageInput);
 const reset=button('Reset scan progress',()=>{collector.reset();scanStatus.textContent='Scan progress cleared. Scan the first QR.'});reset.id='connectionQRReset';
 const cancelScan=button('Cancel',()=>scanner.close());cancelScan.id='connectionQRScanCancel';
 const scanActions=node('div',undefined,'row');scanActions.append(restart,reset,cancelScan);scanner.append(scanHelp,video,scanStatus,imageLabel,scanActions);
 scanner.addEventListener('close',()=>{if(scanner.open)return;stopCamera();collector.reset();scanContext=null;imageInput.value=''});

 const preview=dialog('connectionQRReview','Review connection details');
 const previewInfo=node('p'),jsonPreview=node('pre');jsonPreview.id='connectionQRJSON';jsonPreview.tabIndex=0;
 const insert=button('Insert',()=>insertDetails());insert.id='insertConnectionQR';
 const cancelPreview=button('Cancel',()=>preview.close());cancelPreview.id='cancelConnectionQR';
 const previewActions=node('div',undefined,'row');previewActions.append(insert,cancelPreview);preview.append(previewInfo,jsonPreview,previewActions);
 preview.addEventListener('close',()=>{if(preview.open)return;reviewContext=null;jsonPreview.textContent=''});

 function stopCamera() {cameraTicket++;clearTimeout(timer);timer=null;const held=stream;stream=null;for(const track of held?.getTracks()||[])track.stop();video.srcObject=null;video.hidden=true;restart.disabled=false;restart.textContent='Start camera'}
 function closeAll() {stopCamera();for(const d of [scanner,preview,display])if(d.open)d.close();scanContext=displayContext=reviewContext=null;frames=[];displayValue='';collector.reset();jsonPreview.textContent='';canvas.width=canvas.height=1}
 function refresh() {
  const available=active()&&!state.pairingBusy&&!busy&&!state.peerFailure;
  const outgoing=valid(local.value),incoming=valid(remote.value,'offer');
  showLocal.disabled=!available||!state.pc||!outgoing;
  scan.disabled=!available;answer.hidden=!second();
  answer.disabled=!available||(!incoming&&!(remote.value.trim()===''&&state.pc&&outgoing?.description.type==='answer'));
  if((scanner.open&&(!active()||!current(scanContext)))||(preview.open&&(!active()||!current(reviewContext)))||(display.open&&(!active()||!current(displayContext)||displayValue!==local.value)))closeAll();
 }
 async function drawFrame(index) {
  if(index<0||index>=frames.length||!display.open)return;
  const ticket=displayContext,value=frames[index],engine=await loadQR('qrencode');
  if(!display.open||ticket!==displayContext||!current(ticket))return;
  const qr=engine.QRCode.create(value,{errorCorrectionLevel:'M'}),n=qr.modules.size,scale=4;
  canvas.width=canvas.height=(n+8)*scale;const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#000';for(let y=0;y<n;y++)for(let x=0;x<n;x++)if(qr.modules.get(y,x))ctx.fillRect((x+4)*scale,(y+4)*scale,scale,scale);
  frameIndex=index;frameInfo.textContent=frames.length===1?'One QR · scan on the other device':'QR '+(index+1)+' of '+frames.length+' · scan every numbered QR';previous.hidden=next.hidden=frames.length===1;previous.disabled=index===0;next.disabled=index===frames.length-1;
 }
 async function showCurrentQR() {
  if(busy||state.pairingBusy)return;
  if(!state.pc||!valid(local.value))throw Error('Create current connection details before showing a QR.');
  busy=true;refresh();const before=context(),value=local.value;
  try{const encoded=await encodeManualQR(value);if(!current(before)||!active()||value!==local.value)return;
   closeAll();displayContext=before;displayValue=value;frames=encoded.frames;
   display.querySelector('h2').textContent=encoded.type==='offer'?'First device · offer QR':'Second device · answer QR';displayInfo.textContent='Scan with the intended device. '+(frames.length>1?'Use Next QR after each part is scanned.':'The other device will review the connection JSON.');
   display.showModal();await drawFrame(0);
  }finally{busy=false;refresh()}
 }
 async function generateAnswerQR() {
  if(busy||state.pairingBusy||!second())return;
  const existing=valid(local.value,'answer');
  if(remote.value.trim()===''&&existing&&state.pc){await showCurrentQR();return}
  const data=parseManualPairing(remote.value,'offer');
  busy=true;refresh();let result;
  try{result=await pairingTask(()=>importSignal(data))}finally{busy=false;refresh()}
  if(result&&state.pc&&active()&&valid(local.value,'answer'))await showCurrentQR();
 }
 async function openScanner() {
  if(!active()||busy||state.pairingBusy)return;
  closeAll();collector.reset();scanContext=context();scanner.querySelector('h2').textContent=second()?'Scan the first device’s offer QR':'Scan the second device’s answer QR';
  scanStatus.textContent='Opening camera…';scanner.showModal();await startCamera();
 }
 async function startCamera() {
  if(!scanner.open||!current(scanContext))return;
  stopCamera();const ticket=++cameraTicket;restart.disabled=true;
  if(!navigator.mediaDevices?.getUserMedia){restart.disabled=false;scanStatus.textContent='Camera scanning is unavailable here. Choose a QR image or use copy/paste.';return}
  try{
   const held=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'},width:{ideal:1280},height:{ideal:720}},audio:false});
   if(ticket!==cameraTicket||!scanner.open||!current(scanContext)||document.hidden){for(const track of held.getTracks())track.stop();return}
   stream=held;video.srcObject=held;video.hidden=false;await video.play();
   if(ticket!==cameraTicket||!scanner.open||!current(scanContext))return;
   restart.textContent='Restart camera';restart.disabled=false;scanStatus.textContent=collector.parts.size?'Continue scanning the remaining numbered QR codes.':'Hold the other device’s QR steady inside the camera preview.';
   tick(ticket);
  }catch(error){if(ticket!==cameraTicket)return;stopCamera();scanStatus.textContent=error?.name==='NotAllowedError'?'Camera access was not granted. Choose a QR image or use copy/paste.':'Camera could not start. Choose a QR image or try Start camera again.'}
 }
 async function decodeCanvas(c) {
  if(typeof BarcodeDetector==='function'){
   try{const found=await new BarcodeDetector({formats:['qr_code']}).detect(c);if(found[0]?.rawValue)return found[0].rawValue}catch{}
  }
  const pixels=c.getContext('2d',{willReadFrequently:true}).getImageData(0,0,c.width,c.height),result=(await loadQR('qrdecode')).jsQR(pixels.data,c.width,c.height,{inversionAttempts:'attemptBoth'});
  return result?.data||'';
 }
 async function acceptText(text,before,ticket) {
  if(!scanner.open||ticket!==cameraTicket||!current(before)||before!==scanContext)return;
  const result=await collector.accept(text,before.role?'offer':'answer');
  if(!scanner.open||ticket!==cameraTicket||before!==scanContext||!current(before)||result.cancelled)return;
  scanStatus.textContent='Scanned '+result.received+' of '+result.total+' QR'+(result.total>1?' parts. Show the next numbered QR.':'.');
  if(!result.data)return;
  const selected={...before,data:result.data,remote:remote.value};stopCamera();scanner.close();
  reviewContext=selected;previewInfo.textContent='Review this '+result.data.description.type+' JSON. Insert fills the pairing field; the connection still requires your next action and approval.';jsonPreview.textContent=JSON.stringify(result.data,null,2);preview.showModal();insert.focus();
 }
 async function tick(ticket) {
  if(ticket!==cameraTicket||!scanner.open||document.hidden||!current(scanContext))return;
  if(!decodeBusy&&video.videoWidth&&video.videoHeight){
   decodeBusy=true;const before=scanContext;
   try{const c=document.createElement('canvas'),ratio=Math.min(1,960/Math.max(video.videoWidth,video.videoHeight));c.width=Math.max(1,Math.round(video.videoWidth*ratio));c.height=Math.max(1,Math.round(video.videoHeight*ratio));c.getContext('2d',{willReadFrequently:true}).drawImage(video,0,0,c.width,c.height);const text=await decodeCanvas(c);if(text&&ticket===cameraTicket)await acceptText(text,before,ticket)}catch(error){if(ticket===cameraTicket&&scanner.open)scanStatus.textContent=error.message}finally{decodeBusy=false}
  }
  if(ticket===cameraTicket&&scanner.open)timer=setTimeout(()=>tick(ticket),450);
 }
 imageInput.onchange=async()=>{
  const file=imageInput.files[0],before=scanContext;if(!file)return;
  stopCamera();const ticket=cameraTicket;
  try{if(file.size>16*1024*1024)throw Error('QR image limit: 16 MiB.');const bitmap=await createImageBitmap(file);
   try{if(!scanner.open||ticket!==cameraTicket||before!==scanContext||!current(before))return;const c=document.createElement('canvas'),ratio=Math.min(1,1600/Math.max(bitmap.width,bitmap.height));c.width=Math.max(1,Math.round(bitmap.width*ratio));c.height=Math.max(1,Math.round(bitmap.height*ratio));c.getContext('2d',{willReadFrequently:true}).drawImage(bitmap,0,0,c.width,c.height);const text=await decodeCanvas(c);if(!text)throw Error('No QR found. Choose a clearer image.');if(ticket===cameraTicket)await acceptText(text,before,ticket)}finally{bitmap.close()}
  }catch(error){if(scanner.open&&ticket===cameraTicket)scanStatus.textContent=error.message}finally{imageInput.value=''}
 };
 function insertDetails() {
  const selected=reviewContext;
  if(!current(selected)||selected.remote!==remote.value){preview.close();notice('Pairing changed while reviewing. Scan the current connection details again.',true);return}
  remote.value=JSON.stringify(selected.data);remote.dispatchEvent(new Event('input',{bubbles:true}));preview.close();remote.focus();notice('Scanned JSON inserted. '+(second()?'Choose Generate answer QR or Use pasted details.':'Choose Use pasted details to continue.'));
 }
 remote.addEventListener('input',refresh);local.addEventListener('input',refresh);$('pairingMethod').addEventListener('change',refresh);
 window.addEventListener('connection:state',refresh);
 const observer=new MutationObserver(refresh);for(const id of ['notice','peerState'])observer.observe($(id),{childList:true,subtree:true,characterData:true});observer.observe($('pairRoleFirst'),{attributes:true,attributeFilter:['aria-pressed']});for(const section of document.querySelectorAll('main>section'))observer.observe(section,{attributes:true,attributeFilter:['hidden']});
 const reviews=new MutationObserver(()=>{if($('review').open)closeAll()});reviews.observe($('review'),{attributes:true,attributeFilter:['open']});
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&scanner.open){stopCamera();scanStatus.textContent='Camera paused. Tap Start camera to continue.'}});
 window.addEventListener('pagehide',()=>{disposed=true;closeAll();observer.disconnect();reviews.disconnect();window.removeEventListener('connection:state',refresh)},{once:true});
 refresh();
}
