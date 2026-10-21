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


// 3. FETCH: to caching strategier - dog.ceo (api + billeder): NETWORK FIRST -> ny hund når vi er online, sidste hund når vi er offline - alt andet (statiske filer): CACHE FIRST

self.addEventListener("fetch", (event) => {

    if (event.request.url.includes("dog.ceo")) {
        event.respondWith(networkFirst(event.request));
        console.log("Service worker: network first", event.request.url);
    } else {
        event.respondWith(cacheFirst(event.request));
        console.log("Service worker: network first", event.request.url);
    }
});


// CACHE FIRST: kig i cachen først, ellers hent fra netværket
function cacheFirst(request) {
    return caches.match(request).then((response) => {
        if (response) {
            // Fundet i cachen
            return response;
        } else {
            // Ikke i cachen, hent fra netværket
            return fetch(request);
        }
    });
}



// NETWORK FIRST: hent fra netværket først, ellers brug cachen
function networkFirst(request) {
    return fetch(request)
        .then((response) => {
            // Vi er online: gem en kopi i cachen og send svaret videre
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
            return response;
        })
        .catch(() => {
            // Vi er offline: hent den sidste hund fra cachen
            return caches.match(request);
        });
}







/*

// 5. NOTIFICATIONCLICK: brugeren klikker på notifikationen -> åbn appen
self.addEventListener("notificationclick", (event) => {
  console.log("Service worker: notification click");

  event.notification.close();
  event.waitUntil(clients.openWindow("./"));
});

*/

/* hvis du vil teste push notifikationer i DevTools, så skal du først have registreret service workeren og givet lov til notifikationer. Derefter kan du i DevTools -> Application -> Service Workers -> Push en besked til service workeren.

hvis du vil prøve uden en side åben kan du finde service workeren i devtools, og inspecte den og skrive self.registration.showNotification("My dog", { body: "Hej fra service workeren!", icon: "./assets/img/dog.png" })  husk at ændre info så det passer til din kode...*/