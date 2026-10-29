export function boundedOperation(operation,{timeout=10000,signal,onTimeout=()=>{},onLate=()=>{}}={}){
 return new Promise((resolve,reject)=>{let done=false,timer;const finish=(error,value)=>{if(done){if(!error)Promise.resolve(onLate(value)).catch(()=>{});return}done=true;clearTimeout(timer);signal?.removeEventListener('abort',abort);error?reject(error):resolve(value)},abort=()=>finish(new DOMException('Operation cancelled','AbortError'));
 if(signal?.aborted){abort();return}signal?.addEventListener('abort',abort,{once:true});timer=setTimeout(()=>{if(done)return;finish(Object.assign(Error('Device operation timed out. Reconnect and check its interface parameters.'),{name:'TimeoutError'}));try{void Promise.resolve(onTimeout()).catch(()=>{})}catch{}},timeout);
 try{Promise.resolve(typeof operation==='function'?operation():operation).then(v=>finish(null,v),e=>finish(e))}catch(e){finish(e)}
 });
}
export function connectionError(error){const next={NotAllowedError:'Allow the browser permission, then choose the intended device again.',SecurityError:'Use HTTPS or localhost and a browser that permits this device API.',NotFoundError:'No device was selected or its service was unavailable. Check the documented service and device power.',NetworkError:'Check device power, range and other apps using the interface; then reconnect.',InvalidStateError:'Disconnect and reconnect before trying this operation.',TimeoutError:'Check device parameters and power. Reconnect before retrying.',AbortError:'Operation cancelled. Existing tools and received results remain available.'};return(error.message||String(error))+(next[error.name]?' '+next[error.name]:'')}

// A received channel can already be open when its handler is installed.
// Rechecking readiness and a later open event must start only one handshake.
export function channelOpenOnce(channel,isCurrent,action){let started=false;return()=>{if(started||!isCurrent()||channel.readyState!=='open')return;started=true;action()}}

// Repeated greetings acknowledge a ready receiver; they never repeat approval.
export function validatePeerHello(message,remoteNonce='',peer=''){
 if(message?.v!==1||typeof message.nonce!=='string'||!/^[-a-zA-Z0-9]{20,64}$/.test(message.nonce)||(message.ack!==undefined&&typeof message.ack!=='boolean'))throw Error('Invalid connection handshake');
 const name=String(message.name||'Other device').slice(0,40);
 if(remoteNonce&&(message.nonce!==remoteNonce||name!==peer))throw Error('Connection identity changed; disconnect and pair again');
 return{name,duplicate:!!remoteNonce};
}
