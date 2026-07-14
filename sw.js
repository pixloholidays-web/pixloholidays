const CACHE_NAME = 'pixlo-holidays-cache-v2';
const PRECACHE_URLS = [
  './',
  'index.html',
  'domestic.html',
  'international.html',
  'contact.html',
  'privacy.html',
  'refund.html',
  'terms.html',
  '404.html',
  'css/pixlo-theme.css',
  'js/main.js',
  'manifest.json',
  'assets/icons/favicon.svg',
  'assets/icons/favicon.ico',
  'pixlo-logo.png'
];

const IMAGE_EXTS = /\.(webp|png|jpg|jpeg|gif|svg)$/i;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  if (req.method !== 'GET') return;

  if (IMAGE_EXTS.test(url.pathname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        fetch(req).then(res => {
          cache.put(req, res.clone());
          return res;
        }).catch(() => cache.match(req))
      )
    );
    return;
  }

  if (req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(req).then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
        return res;
        }).catch(() => caches.match(req).then(cached => cached || caches.match('./404.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      const clone = res.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
      return res;
    }))
  );
});