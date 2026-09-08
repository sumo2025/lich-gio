// Lich Gio Dong Ho - Service Worker
// File THAT, deploy cung thu muc voi index.html. KHONG sinh bang Blob URL.
// Moi lan bump APP_VERSION trong index.html, PHAI sua dong duoi day khop
// dung version moi roi deploy lai CA HAI file cung luc.
const APP_VERSION = '1.5.15'; // <-- khop dung version hien tai cua index.html
const CACHE = 'lichgio-cache-v' + APP_VERSION;

// Danh sach domain font ngoai can cache rieng (Cach B - xem upgrade-offline-guide.md)
function isFontRequest(url) {
  return url.indexOf('fonts.gstatic.com') !== -1 || url.indexOf('fonts.googleapis.com') !== -1;
}

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.add(self.registration.scope); })
      .catch(function () {})
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.filter(function (k) { return k !== CACHE; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  const url = e.request.url;

  if (e.request.mode === 'navigate') {
    // App shell: network-first, fallback ve ban cache khi mat mang
    e.respondWith(
      fetch(e.request).then(function (r) {
        if (r && r.ok) {
          const clone = r.clone();
          e.waitUntil(caches.open(CACHE).then(function (c) { return c.put(self.registration.scope, clone); }));
        }
        return r;
      }).catch(function () { return caches.match(self.registration.scope); })
    );
  } else if (isFontRequest(url)) {
    // Font Google Fonts (Playfair Display, Lora) - cache-first
    // Luu y: request cross-origin qua <link> thuong tra ve opaque response
    // (khong doc duoc status), van cache va phat lai binh thuong. Can it
    // nhat 1 lan mo app luc co mang de SW kip cache font lan dau.
    e.respondWith(
      caches.match(e.request).then(function (cached) {
        if (cached) return cached;
        return fetch(e.request).then(function (r) {
          if (r) {
            const clone = r.clone();
            e.waitUntil(caches.open(CACHE).then(function (c) { return c.put(e.request, clone); }));
          }
          return r;
        }).catch(function () { return cached; });
      })
    );
  } else {
    // Asset cung origin (CSS/JS inline khong ap dung, day la du phong cho
    // request GET khac neu co) - cache-first, cap nhat lai cache khi co mang
    e.respondWith(
      caches.match(e.request).then(function (cached) {
        const fresh = fetch(e.request).then(function (r) {
          if (r && r.ok) {
            const clone = r.clone();
            e.waitUntil(caches.open(CACHE).then(function (c) { return c.put(e.request, clone); }));
          }
          return r;
        }).catch(function () { return cached; });
        return cached || fresh;
      })
    );
  }
});
