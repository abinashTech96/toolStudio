import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium,firefox,webkit} from 'playwright';
import {startFixtureServer} from './fixture-server.mjs';
const kind=process.env.REVIEW_BROWSER||'chromium',server=await startFixtureServer(4209),passed=[],errors=[];
const test=async(name,run)=>{await run();passed.push(name);console.log('PASS',name)};
// Explicit lifecycle fault injection, separate from the native RTC scenarios.
// No successful connection or physical-device compatibility is claimed here.
const inject=()=>{
 window.copied='';Object.defineProperty(navigator,'clipboard',{value:{writeText:async text=>window.copied=text}});
 window.failureMode='none';window.testPeers=[];
 const sdp='v=0\r\na=ice-ufrag:DO-NOT-EXPORT\r\na=ice-pwd:SECRET-ICE-PASSWORD\r\na=candidate:1 1 UDP 1 192.0.2.123 12345 typ host\r\na=fingerprint:sha-256 PRIVATE-FINGERPRINT\r\n';
 class Peer {
  connectionState='new';iceConnectionState='new';iceGatheringState='complete';signalingState='stable';localDescription=null;remoteDescription=null;
  sctp={state:'connecting',transport:{state:'new'}};
  constructor(){window.testPeers.push(this)}
  createDataChannel(){return this.channel={readyState:'connecting',close(){this.readyState='closed'},send(){}}}
  async createOffer(){return {type:'offer',sdp:window.emptyCandidates?sdp.replace(/^a=candidate:.*\r?\n/gm,''):sdp}}
  async createAnswer(){return {type:'answer',sdp}}
  async setLocalDescription(d){this.localDescription=d;this.signalingState=d.type==='offer'?'have-local-offer':'stable'}
  async setRemoteDescription(d){this.remoteDescription=d;this.signalingState=d.type==='offer'?'have-remote-offer':'stable';if(d.type==='answer'){
   this.connectionState='connecting';this.iceConnectionState='checking';this.onconnectionstatechange?.();
   if(window.failureMode==='during-import')this.fail();
   if(window.failureMode==='defer')await new Promise(resolve=>window.finishImport=resolve);
  }}
  fail(){this.connectionState='failed';this.iceConnectionState='failed';this.onconnectionstatechange?.()}
  close(){this.connectionState=this.iceConnectionState=this.signalingState='closed';this.channel?.close()}
  addEventListener(){}removeEventListener(){}
 }
 window.RTCPeerConnection=Peer;
};
const browser=await ({chromium,firefox,webkit})[kind].launch({headless:true,...(kind==='chromium'?{args:['--no-sandbox'],...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})}:{})});
try{
 const context=await browser.newContext({viewport:{width:390,height:844}});await context.addInitScript(inject);const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4209/toolStudio/connections/index.html');await page.waitForFunction(()=>window.connectionStudio);await page.locator('[data-connect-kind=wifi]').click();
 const start=async()=>{await page.locator('#createOffer').click();await page.waitForFunction(()=>!!document.querySelector('#localSignal').value);const data=await page.locator('#localSignal').inputValue();await page.locator('#remoteSignal').fill(JSON.stringify({...JSON.parse(data),description:{...JSON.parse(data).description,type:'answer'}}))};
 await test('An injected connection failure leaves a visible failure instead of resetting to the first step',async()=>{await start();await page.locator('#applySignal').click();await page.evaluate(()=>testPeers.at(-1).fail());await page.locator('#pairingFailure').waitFor();assert.match(await page.locator('#live-wifi').innerText(),/Connection failed/);assert.match(await page.locator('#notice').innerText(),/Connection failed/);assert(!await page.locator('#connectedActions').isVisible());assert(!await page.locator('#pairingWorkspace').isVisible());assert(await page.locator('#sendMessage').isDisabled());assert.equal(await page.locator('#review[open]').count(),0)});
 await test('The copied report retains the failed state and contains no pairing or user data',async()=>{await page.locator('#copyPeerReport').click();const text=await page.evaluate(()=>copied),report=JSON.parse(text);assert.equal(report.connection,'failed');assert.equal(report.ice,'failed');assert.equal(report.stage,'network-path');assert.equal(report.local.total,1);assert.equal(report.remote.total,1);assert(report.events.some(e=>e.event==='answer-imported'));for(const secret of ['192.0.2.123','SECRET-ICE-PASSWORD','DO-NOT-EXPORT','PRIVATE-FINGERPRINT','ice-pwd','sdp','My device'])assert(!text.includes(secret),secret);await page.locator('#connectionMore').evaluate(e=>e.open=true);await page.locator('nav [data-page=messages]').click();await page.locator('nav [data-page=devices]').click();assert(await page.locator('#pairingFailure').isVisible())});
 await test('Starting again is explicit and enables a fresh attempt',async()=>{await page.locator('#retryPeerPairing').click();assert(!await page.locator('#pairingFailure').isVisible());assert.equal(await page.locator('#pairingReport').textContent(),'');assert(await page.locator('#createOffer').isEnabled());assert.equal(await page.locator('#localSignal').inputValue(),'')});
 await test('Failure during asynchronous answer import cannot display an approval instruction',async()=>{await page.evaluate(()=>window.failureMode='during-import');await start();await page.locator('#applySignal').click();await page.locator('#pairingFailure').waitFor();assert.match(await page.locator('#notice').innerText(),/Connection failed/);assert.doesNotMatch(await page.locator('#notice').innerText(),/Answer imported|Verify and approve/)});
 await test('A late answer from a cancelled attempt cannot overwrite the new attempt',async()=>{await page.locator('#retryPeerPairing').click();await page.evaluate(()=>window.failureMode='defer');await start();await page.locator('#applySignal').click();await page.waitForFunction(()=>window.finishImport);await page.evaluate(()=>connectionStudio.disconnect());const fresh=await page.evaluate(()=>connectionStudio.createOffer());await page.evaluate(()=>finishImport());await page.waitForFunction(()=>document.querySelector('#applySignal').disabled===true);assert.equal(await page.locator('#localSignal').inputValue(),JSON.stringify(fresh));assert.doesNotMatch(await page.locator('#notice').innerText(),/Answer imported|Verify and approve/);assert.equal(await page.locator('#review[open]').count(),0)});
 await test('A delayed verification digest cannot create a review after disconnect',async()=>{await page.evaluate(async()=>{connectionStudio.disconnect();await connectionStudio.createOffer();const peer=testPeers.at(-1),channel=peer.channel;channel.readyState='open';channel.send=()=>{};const digest=crypto.subtle.digest.bind(crypto.subtle);crypto.subtle.digest=()=>new Promise(resolve=>window.finishDigest=async()=>resolve(await digest('SHA-256',new Uint8Array([1]))));channel.onmessage({data:JSON.stringify({t:'hello',v:1,nonce:'a'.repeat(24),name:'Other phone'})});await Promise.resolve();connectionStudio.disconnect();await finishDigest();await Promise.resolve()});assert.equal(await page.locator('#review[open]').count(),0);assert.equal(await page.locator('#identity').textContent(),'No verification code.')});
 await test('Stale failure and close callbacks cannot clear a newer attempt',async()=>{await page.evaluate(async()=>{connectionStudio.disconnect();await connectionStudio.createOffer();const old=testPeers.at(-1);connectionStudio.disconnect();await connectionStudio.createOffer();window.expectedOffer=document.querySelector('#localSignal').value;old.fail();old.channel.onclose()});assert.equal(await page.locator('#localSignal').inputValue(),await page.evaluate(()=>expectedOffer));assert(!await page.locator('#pairingFailure').isVisible())});
 await test('Empty candidate gathering stops before offering unusable pairing details',async()=>{await page.evaluate(()=>{connectionStudio.disconnect();window.emptyCandidates=true});await page.locator('#createOffer').click();await page.locator('#pairingFailure').waitFor();await page.locator('#copyPeerReport').click();const report=JSON.parse(await page.evaluate(()=>copied));assert.equal(report.reason,'no-local-candidates');assert.equal(report.stage,'local-candidates');assert.equal(await page.locator('#localSignal').inputValue(),'');assert(!await page.locator('#pairingLocal').isVisible());await page.evaluate(()=>window.emptyCandidates=false)});
 await test('Failure panel and report fit a phone viewport',async()=>{await page.reload();await page.waitForFunction(()=>window.connectionStudio);await page.locator('[data-connect-kind=wifi]').click();await start();await page.locator('#applySignal').click();await page.evaluate(()=>testPeers.at(-1).fail());for(const width of [320,390,768]){await page.setViewportSize({width,height:844});await page.locator('#pairingFailure details').evaluate(e=>e.open=true);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),String(width))}});
 await test('No lifecycle runtime errors',()=>assert.deepEqual(errors,[]));
 await context.close();
}finally{await browser.close();await server.close();fs.mkdirSync('test-results',{recursive:true});fs.writeFileSync('test-results/connection-failure-'+kind+'.json',JSON.stringify({passed,errors,faultInjection:true,physicalDevices:false},null,2))}
