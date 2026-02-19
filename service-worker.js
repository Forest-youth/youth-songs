const CACHE_NAME = "songbook-v2";
const urlsToCache = [
  "index.html",
  "manifest.json",
  "icon.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

fetch(event.request)
  .then(response => {
    return caches.open(CACHE_NAME).then(cache => {
      cache.put(event.request, response.clone());
      return response;
    });
  })
  .catch(() => caches.match(event.request));
