import {workspace,node,check,download,releaseOnLeave} from './shared.js';
export function screenRecorder(api,root){
 const ui=workspace(root,'Screen Recording Studio','Choose a screen, window or tab to record. Recording starts only after you press Start and approve the browser picker.'),mic=check(ui,'Include microphone'),system=check(ui,'Request shared-screen audio'),preview=node('video',undefined,{controls:true,playsInline:true,'aria-label':'Recording preview'}),status=node('p','Not recording',{role:'status'});
 preview.style.cssText='width:100%;max-height:65vh;background:#111';ui.body.append(preview,status);
 let active=null,generation=0,url=null,blob=null;
 const supported=!!(navigator.mediaDevices?.getDisplayMedia&&window.MediaRecorder),start=node('button','Start screen recording',{type:'button',disabled:!supported}),stop=node('button','Stop recording',{type:'button',disabled:true}),pause=node('button','Pause / resume recording',{type:'button',disabled:true}),save=node('button','Download reviewed recording',{type:'button',disabled:true});ui.body.append(start,stop,pause,save);
 if(!supported)status.textContent='Screen capture or MediaRecorder is unavailable here. Open this tool in a supported secure browser.';
 const current=session=>active===session&&session.ticket===generation;
 const tracks=session=>{for(const stream of session.streams)for(const track of stream.getTracks())track.stop();session.streams=[];if(session.audio){void session.audio.close().catch(()=>{});session.audio=null}};
 const resumeAudio=async context=>{let timer;try{await Promise.race([context.resume(),new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('Audio could not start. Check browser sound permissions or record without a microphone.')),5000)})])}finally{clearTimeout(timer)}};
 const resetControls=()=>{delete root.dataset.busy;start.disabled=!supported;stop.disabled=pause.disabled=true};
 const finish=(session,incomplete=false)=>{
  if(session.finished)return;session.finished=true;clearTimeout(session.flushTimer);tracks(session);
  if(!current(session))return;active=null;resetControls();
  if(session.chunks.length){blob=new Blob(session.chunks,{type:session.recorder.mimeType||session.type||'video/webm'});session.chunks=[];if(url)URL.revokeObjectURL(url);url=URL.createObjectURL(blob);preview.srcObject=null;preview.src=url;preview.muted=false;save.disabled=false;status.textContent=incomplete?'Recorder finalization timed out; the review file may be incomplete.':`Recording ready for review · ${blob.type} · ${(blob.size/1048576).toFixed(2)} MiB`;ui.report({finalization:incomplete?'timed-out':'complete',mimeType:blob.type,bytes:blob.size,elapsedSeconds:(Date.now()-session.started)/1000,microphone:session.usedMic,sharedAudioTracks:session.sharedAudioTracks})}
  else status.textContent='Recording stopped without output. Try another supported capture source.';
 };
 const stopRecording=()=>{const session=active;if(!session||session.pending||session.stopping)return;session.stopping=true;stop.disabled=pause.disabled=true;status.textContent='Finishing recording…';try{if(session.recorder.state!=='inactive')session.recorder.stop();else finish(session);if(!session.finished)session.flushTimer=setTimeout(()=>{tracks(session);finish(session,true)},3000)}catch(e){tracks(session);finish(session);ui.fail(e)}};
 start.onclick=async()=>{
  if(active)return;const session={ticket:++generation,streams:[],audio:null,recorder:null,chunks:[],bytes:0,pending:true,stopping:false,finished:false,flushTimer:null,usedMic:mic.checked,sharedAudioTracks:0};active=session;root.dataset.busy='true';start.disabled=true;save.disabled=true;status.textContent='Waiting for browser capture approval…';
  try{
   const display=await navigator.mediaDevices.getDisplayMedia({video:true,audio:system.checked});session.streams.push(display);if(!current(session)){tracks(session);return}session.sharedAudioTracks=display.getAudioTracks().length;let output=display;
   if(session.usedMic){const microphone=await navigator.mediaDevices.getUserMedia({audio:true});session.streams.push(microphone);if(!current(session)){tracks(session);return}session.audio=new AudioContext();const destination=session.audio.createMediaStreamDestination();for(const stream of session.streams)if(stream.getAudioTracks().length)session.audio.createMediaStreamSource(new MediaStream(stream.getAudioTracks())).connect(destination);await resumeAudio(session.audio);if(!current(session)){tracks(session);return}output=new MediaStream([...display.getVideoTracks(),...destination.stream.getAudioTracks()])}
   const audioCodec=output.getAudioTracks().length?',opus':'';session.type=['video/webm;codecs=vp9'+audioCodec,'video/webm;codecs=vp8'+audioCodec,'video/webm','video/mp4'].find(t=>MediaRecorder.isTypeSupported(t));session.recorder=new MediaRecorder(output,session.type?{mimeType:session.type}:undefined);session.started=Date.now();blob=null;
   session.recorder.ondataavailable=e=>{if(!current(session)||session.finished)return;if(e.data.size){session.chunks.push(e.data);session.bytes+=e.data.size;if(!session.stopping)status.textContent=`Recording · ${Math.round((Date.now()-session.started)/1000)} seconds · ${(session.bytes/1048576).toFixed(1)} MiB`;if(session.bytes>150*1048576)stopRecording()}};
   session.recorder.onerror=e=>{if(!current(session))return;ui.fail(e.error||Error('Recording failed'));stopRecording()};session.recorder.onstop=()=>finish(session);
   display.getVideoTracks()[0].addEventListener('ended',()=>{if(current(session))stopRecording()},{once:true});preview.srcObject=display;preview.muted=true;void preview.play().catch(()=>{});session.recorder.start(1000);session.pending=false;stop.disabled=pause.disabled=false;status.textContent='Recording started. Use Stop to review the file.';
  }catch(e){tracks(session);if(current(session)){active=null;resetControls();status.textContent='Recording could not start.';ui.fail(e)}}
 };
 stop.onclick=stopRecording;pause.onclick=()=>{const recorder=active?.recorder;if(recorder?.state==='recording'){recorder.pause();status.textContent='Recording paused'}else if(recorder?.state==='paused'){recorder.resume();status.textContent='Recording resumed'}};
 save.onclick=()=>{if(blob)download('screen-recording.'+(blob.type.includes('mp4')?'mp4':'webm'),blob)};
 const release=()=>{const session=active;if(session?.pending){generation++;active=null;tracks(session);resetControls();status.textContent='Recording request cancelled'}else if(session){stopRecording();tracks(session)}preview.pause();preview.srcObject=null};
 const dispose=releaseOnLeave(root,release);
 const discard=()=>{const session=active;generation++;active=null;if(session){clearTimeout(session.flushTimer);if(session.recorder?.state&&session.recorder.state!=='inactive')session.recorder.stop();tracks(session);session.chunks=[];session.finished=true}resetControls();preview.pause();preview.srcObject=null;if(url)URL.revokeObjectURL(url);url=null;blob=null;save.disabled=true;preview.removeAttribute('src');status.textContent='Not recording'};
 ui.onRelease(discard);return{dispose(){dispose();discard();ui.dispose()}};
}
