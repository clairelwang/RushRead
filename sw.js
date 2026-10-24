const CACHE='rushread-v1.2';
const CORE=['./','./index.html','./styles.css','./app.js','./data.js','./icon.svg','./manifest.webmanifest'];
self.addEventListener('install', e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate', e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch', e=>{if(e.request.method==='GET'&&new URL(e.request.url).origin===self.location.origin){e.respondWith(fetch(e.request).then(res=>{if(res.ok){let copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return res;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));}});
