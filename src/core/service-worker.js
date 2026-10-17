const VERSION=/* CACHE_VERSION */;
const PRECACHE=/* PRECACHE */;
const PREFIX='toolstudio-'+encodeURIComponent(self.registration.scope)+'-';
const CACHE=PREFIX+VERSION;
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);await cache.addAll(PRECACHE);await self.skipWaiting()})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith(PREFIX)&&key!==CACHE)await caches.delete(key);await self.clients.claim()})()));
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url),scope=new URL(self.registration.scope);
 if(request.method!=='GET'||url.origin!==scope.origin||!url.pathname.startsWith(scope.pathname))return;
 const relative=url.pathname.slice(scope.pathname.length);
 if(!/^(?:$|index\.html$|guide\.html$|registry\.generated\.json$|manifest\.webmanifest$|runtime\/|assets\/|connections\/|Calc_Studio)/.test(relative))return;
 event.respondWith((async()=>{const cache=await caches.open(CACHE);if(request.mode==='navigate'){
  try{const result=await fetch(request);if(result.ok)await cache.put(request,result.clone());return result}catch{const found=await cache.match(request,{ignoreSearch:true})||await cache.match(relative.startsWith('connections/')?'./connections/index.html':'./index.html');if(found)return found;return new Response('Offline resource not cached yet',{status:503})}
 }const found=await cache.match(request);if(found)return found;const response=await fetch(request);if(response.ok)await cache.put(request,response.clone());return response})());
});
