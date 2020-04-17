var cacheName = 'hello-pwa';
var filesToCache = [
  '/',
  '/index.html',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
  '/css/normalize.css',
  '/css/main.css',
  'js/vendor/modernizr-3.8.0.min.js',
  'https://cdn.jsdelivr.net/npm/vue@2.6.11',
  'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js',
  '/js/main.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});