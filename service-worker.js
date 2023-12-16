const cacheName = "MyCache_1";
const precachedResources = [
  "/", 
  "/index.js", 
  "/index.html",
  "/404.html",
  "/manifest.json",
  "/offline.html",
];

async function precache() {
  const cache = await caches.open(cacheName);
  return cache.addAll(precachedResources);
}

self.addEventListener("install", (event) => {
  event.waitUntil(precache());
});

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open("MyCache_1");
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return Response.error();
  }
}

self.addEventListener("fetch", async (event) => {
  const url = new URL(event.request.url); 
  if (precachedResources.includes(url.pathname)) {
    try {
      event.respondWith(await cacheFirst(event.request));
    } catch (error) {
      return caches.match("/offline.html");
    }
  }
});
