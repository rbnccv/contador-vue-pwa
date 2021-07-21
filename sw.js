const CACHE_NAME = "V1_CACHE_CONTADOR_APP";
const urlsToCache = [
  "./",
  "./img/favicon.png",
  "./img/icon32.png",
  "./img/icon64.png",
  "./img/icon128.png",
  "./img/icon256.png",
  "./img/icon512.png",
  "./img/icon1024.png",
  "./js/main.js",
  "https://unpkg.com/vue@next",
  "./css/style.css",
  "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
];

self.addEventListener("install", (e) =>
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        cache
          .addAll(urlsToCache)
          .then(() => self.skipWaiting())
          .catch((err) => console.log(`ERROR en install: ${err}`))
      )
      .catch((err) => console.log(err))
  )
);

self.addEventListener("activate", (e) => {
  const cacheWhiteList = [CACHE_NAME];

  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhiteList.indexOf(cacheName) === -1)
              return caches.delete(cacheName);
          })
        )
      )
      .then(() => self.clients.claim())
      .catch((err) => console.log())
  );
});

self.addEventListener("fetch", (e) =>
  e.respondWith(
    caches
      .match(e.request)
      .then((res) => {
        if (res) return res;
        return fetch(e.request);
      })
      .catch((err) => console.log(err))
  )
);
