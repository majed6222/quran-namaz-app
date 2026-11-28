/* sw.js — পবিত্র আল-কুরআন ও নামাজ শিক্ষা: শুধু অ্যাপ-শেল (HTML) ক্যাশ। কুরআন-ডেটা ও অডিও অ্যাপ নিজে IndexedDB-তে রাখে। */
var V='hqn-shell-v2',F='hqn-fonts-v1';
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(V).then(function(c){return c.add(self.registration.scope).catch(function(){})}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V&&x!==F}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('message',function(e){var d=e.data||{};if(d.type==='precache'&&d.url){e.waitUntil(caches.open(V).then(function(c){return c.add(d.url).catch(function(){})}))}});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET')return;var u=new URL(r.url);
 if(u.origin===location.origin){e.respondWith(caches.open(V).then(function(c){return c.match(r,{ignoreSearch:true}).then(function(hit){var net=fetch(r).then(function(res){if(res&&res.ok)c.put(r,res.clone());return res}).catch(function(){return hit});return hit||net.then(function(res){return res||(r.mode==='navigate'?c.match(self.registration.scope):res)})})}));return}
 if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){e.respondWith(caches.open(F).then(function(c){return c.match(r).then(function(hit){var net=fetch(r).then(function(res){if(res&&(res.ok||res.type==='opaque'))c.put(r,res.clone());return res}).catch(function(){return hit});return hit||net})}))}
});
self.addEventListener('notificationclick',function(e){e.notification.close();e.waitUntil(self.clients.matchAll({type:'window'}).then(function(l){if(l.length)return l[0].focus();return self.clients.openWindow(self.registration.scope)}))});
