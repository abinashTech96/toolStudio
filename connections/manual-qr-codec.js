// Server-free transport for the existing offer/answer JSON. Payloads stay in memory.
const manualQREncoder = new TextEncoder(), manualQRDecoder = new TextDecoder('utf-8',{fatal:true});
export const MANUAL_QR_LIMIT = 65536, MANUAL_QR_PART_SIZE = 800, MANUAL_QR_MAX_PARTS = 128;
export function parseManualPairing(text,expected='') {
 if(typeof text!=='string'||manualQREncoder.encode(text).length>MANUAL_QR_LIMIT)throw Error('Connection details exceed the 64 KiB limit.');
 let data;try{data=JSON.parse(text)}catch{throw Error('This QR does not contain valid connection JSON.')}
 const d=data?.description;
 if(data?.format!=='calc-studio-connection'||data.version!==1||!['offer','answer'].includes(d?.type)||typeof d.sdp!=='string'||!d.sdp||d.sdp.length>60000)throw Error('Use a ToolStudio connection-details QR containing an offer or answer.');
 if(expected&&d.type!==expected)throw Error(expected==='offer'?'Scan the first device’s offer QR.':'Scan the second device’s answer QR.');
 return {format:'calc-studio-connection',version:1,description:{type:d.type,sdp:d.sdp}};
}
function manualQRBase64(bytes) {let raw='';for(let at=0;at<bytes.length;at+=8192)raw+=String.fromCharCode(...bytes.subarray(at,at+8192));return btoa(raw).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}
function manualQRUnbase64(text) {if(!/^[A-Za-z0-9_-]+$/.test(text)||text.length%4===1)throw Error('Invalid QR data.');let raw;try{raw=atob(text.replace(/-/g,'+').replace(/_/g,'/'))}catch{throw Error('Invalid QR data.')}return Uint8Array.from(raw,c=>c.charCodeAt(0))}
async function manualQRRead(stream,limit) {const reader=stream.getReader(),parts=[];let size=0;try{while(true){const{done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>limit){void reader.cancel().catch(()=>{});throw Error('Decoded QR exceeds the connection-details limit.')}parts.push(value)}const bytes=new Uint8Array(size);let at=0;for(const part of parts){bytes.set(part,at);at+=part.byteLength}return bytes}finally{reader.releaseLock()}}
async function manualQRHash(text) {if(!globalThis.crypto?.subtle)throw Error('Connection QR requires HTTPS or localhost.');return [...new Uint8Array(await crypto.subtle.digest('SHA-256',manualQREncoder.encode(text)))].map(n=>n.toString(16).padStart(2,'0')).join('')}
export async function encodeManualQR(text,{compress=true}={}) {
 const data=parseManualPairing(text),json=JSON.stringify(data),raw=manualQREncoder.encode(json);
 if(raw.length<=MANUAL_QR_PART_SIZE)return {type:data.description.type,frames:[json]};
 let bytes=raw,codec='R';
 if(compress&&typeof CompressionStream==='function'){
  const packed=await manualQRRead(new Blob([raw]).stream().pipeThrough(new CompressionStream('deflate')),MANUAL_QR_LIMIT+1024);
  if(packed.length<raw.length){bytes=packed;codec='D'}
 }
 const payload=manualQRBase64(bytes),hash=await manualQRHash(codec+'.'+payload),count=Math.ceil(payload.length/MANUAL_QR_PART_SIZE);
 if(count>MANUAL_QR_MAX_PARTS)throw Error('Connection QR is too large. Use copy/paste or the pairing file.');
 return {type:data.description.type,frames:Array.from({length:count},(_,i)=>'TSQR1.'+codec+'.'+hash+'.'+(i+1)+'.'+count+'.'+payload.slice(i*MANUAL_QR_PART_SIZE,(i+1)*MANUAL_QR_PART_SIZE))};
}
export class ManualQRCollector {
 constructor(){this.reset()}
 reset(){this.revision=(this.revision||0)+1;this.id='';this.parts=new Map();this.total=0;this.codec=''}
 async accept(text,expected='') {
  if(typeof text!=='string'||text.length>MANUAL_QR_LIMIT)throw Error('QR data is too large.');
  if(text.trimStart().startsWith('{')){
   if(this.parts.size)throw Error('A different QR was detected. Reset scan progress before starting another code.');
   return {received:1,total:1,data:parseManualPairing(text,expected)};
  }
  const m=/^TSQR1\.([RD])\.([a-f0-9]{64})\.([1-9]\d{0,2})\.([1-9]\d{0,2})\.([A-Za-z0-9_-]{1,800})$/.exec(text);
  if(!m)throw Error('Use a ToolStudio connection-details QR. Server pairing links and other QR codes cannot be inserted here.');
  const[,codec,id,partText,totalText,payload]=m,part=Number(partText),total=Number(totalText);
  if(total>MANUAL_QR_MAX_PARTS||part>total)throw Error('Invalid connection QR part.');
  if(this.id&&(id!==this.id||codec!==this.codec||total!==this.total))throw Error('A different QR was detected. Reset scan progress before starting another code.');
  if(this.parts.has(part)&&this.parts.get(part)!==payload)throw Error('Conflicting QR part. Reset scan progress and scan again.');
  this.id=id;this.codec=codec;this.total=total;this.parts.set(part,payload);
  const progress={received:this.parts.size,total};if(this.parts.size!==total)return progress;
  const revision=this.revision,joined=Array.from({length:total},(_,i)=>this.parts.get(i+1)).join('');
  if(joined.length>Math.ceil((MANUAL_QR_LIMIT+1024)*4/3))throw Error('QR data is too large.');
  if(await manualQRHash(codec+'.'+joined)!==id)throw Error('QR integrity check failed. Reset scan progress and scan again.');
  let bytes=manualQRUnbase64(joined);
  if(codec==='D'){
   if(typeof DecompressionStream!=='function')throw Error('This browser cannot read compact QR data. Use copy/paste or a pairing file.');
   try{bytes=await manualQRRead(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate')),MANUAL_QR_LIMIT)}catch{throw Error('Compact QR is damaged or exceeds the connection-details limit.')}
  }
  if(bytes.length>MANUAL_QR_LIMIT)throw Error('Decoded QR exceeds the connection-details limit.');
  let json;try{json=manualQRDecoder.decode(bytes)}catch{throw Error('Invalid QR text encoding.')}
  const data=parseManualPairing(json,expected);
  return revision===this.revision?{...progress,data}:{cancelled:true};
 }
}
