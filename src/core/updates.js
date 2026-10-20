import{displayVersion}from'./home-state.js';
/** Updates stay explicit so open editors and jobs cannot be replaced silently. */
export function installUpdateNotice({version,canUpdate}){
 let requested=false,registration,notice,text,button,requestId;
 const node=(tag,value)=>{const n=document.createElement(tag);if(value)n.textContent=value;return n};
 const label=v=>/^\d+\.\d+\.\d+$/.test(v||'')?displayVersion(v):'new release';
 window.addEventListener('toolstudio:update',event=>{
  registration=event.detail.registration;
  if(!notice){notice=node('section');notice.className='a34-extension a35-update';notice.setAttribute('role','status');text=node('span');button=node('button','Update and reload');button.type='button';notice.append(text,button);document.querySelector('.main-card').prepend(notice);
   button.onclick=()=>{
    const reason=canUpdate();if(reason){text.textContent=reason;return}
    if(!registration.waiting){requested=false;text.textContent='No waiting update remains. Refresh to check the active release.';return}
    if(!confirm('Have you saved or downloaded your current work? Reload to use the new version?'))return;
    requested=true;button.disabled=true;text.textContent='Checking other Tool Studio tabs before activating…';registration.waiting.postMessage({type:'ACTIVATE_WHEN_ALONE'});
   };
  }
  text.textContent='Current '+label(version)+' → new release ready. Refresh alone keeps your offline build. Save your work, close other Tool Studio tabs/windows, then choose Update and reload. ';
  requestId=crypto.randomUUID();registration.waiting?.postMessage({type:'QUERY_RELEASE',requestId});
 });
 if(navigator.serviceWorker){
  navigator.serviceWorker.addEventListener('controllerchange',()=>{if(requested)location.reload()});
  navigator.serviceWorker.addEventListener('message',event=>{
   const data=event.data;if(data?.type==='RELEASE_INFO'&&data.requestId===requestId&&event.source===registration?.waiting){
    text.textContent='Current '+label(version)+' → available '+label(data.appVersion)+(data.revision?' (build '+String(data.revision).slice(0,8)+')':'')+'. Refresh alone keeps your offline build. Save your work, close other Tool Studio tabs/windows, then choose Update and reload. ';
   }
   if(data?.type==='UPDATE_BLOCKED'){requested=false;button&&(button.disabled=false);if(text)text.textContent=data.reason+' '+(data.openTabs?'Detected '+data.openTabs+' open tabs/windows. ':'')+'Close the others, then click Update and reload again. Your current work has not been reloaded.'}
  });
 }
}
