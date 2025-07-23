const CACHE_NAME = 'finance-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/revenue.html',
  '/expenses.html',
  '/tips.html',
  '/feedback.php',
  '/style.css',
  '/scripts.js',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
});