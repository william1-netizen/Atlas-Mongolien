// Atlas Dawn Flight: keeps every file of the game on the device so it runs with no internet.
const V='adf-v2';
const FILES=["assets/basket.json", "assets/people.json", "assets/vehicles.json", "fonts/ibm-plex-mono-latin-500-normal.woff2", "fonts/ibm-plex-mono-latin-600-normal.woff2", "fonts/instrument-sans-latin-400-normal.woff2", "fonts/instrument-sans-latin-600-normal.woff2", "fonts/rakkas-latin-400-normal.woff2", "icon-180.png", "icon-192.png", "icon-512.png", "index.html", "manifest.json", "three.min.js"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(['./'].concat(FILES))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>{
    if(res.ok&&new URL(r.url).origin===location.origin){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>r.mode==='navigate'?caches.match('index.html'):Response.error())))});
