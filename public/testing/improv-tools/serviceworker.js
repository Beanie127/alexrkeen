self.addEventListener("install", (event) => {
  console.log("[Service worker] installed");
  caches
    .open("appData")
    .then((cache) => {
      console.log("[Service worker] Caching...");
      cache.addAll([
        "./",
        "./suggestions.js",
        "./prompts.js",
        "./games.js",
        "./utilities.js",
        "./style.css",
      ]);
    })
    .catch((error) => {
      console.log(error);
    });
});

self.addEventListener("fetch", (event) => {
  console.log("[Service worker] Requesting docs from server");
  event.respondWith(
    fetch(event.request).catch((error) => {
      console.log(error);
      console.log(
        "[Service worker] No response from server, loading from cache."
      );
      return caches.match(event.request);
    })
  );
});
