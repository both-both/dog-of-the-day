// the name of our cache
const CACHE = "static-v1";

// static files til offline brug
const FILES = [
    "./",
    "./index.html",
    "./style.css",
    "./main.js",
    "./js/fetch.js",
    "./js/header.js",
    "./manifest.json",
    "./assets/dog-api-logo.svg"

]

// 1. INSTALL: gem filerne i cache
self.addEventListener("install", (event) => {
    console.log("Service worker: install");

    event.waitUntil(
        caches.open(CACHE).then((cache) => cache.addAll(FILES))

    );
});



// ACTIVATE: Service Worker aktiveres og den er klat til brug - husk at lukke åbne tabs i browseren
self.addEventListener("activate", () => {
    console.log("Service worker: activate");
});


// FETCH: strategi cache first, hvor vi først tjekker om filen findes i cache, hvis ikke henter vi
self.addEventListener("fetch", (event) => {
    console.log("Service worker: event", event);
    console.log("Service worker: fetch", event.request.url);

    event.respondWith(

        caches.match(event.request).then((response) => {
            if (response) {
                // Found in the cahce
                return response;
            } else {
                // Not in the cache, get it from the network
                return fetch(event.request)
            }
        })
    )

})

