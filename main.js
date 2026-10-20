
import { fetchData } from "./js/fetch.js";
import { header } from "./js/header.js"

// REGISTERER SERVICE WORKER
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js")
    console.log("App: service worker registered");

}


const app = document.getElementById("app")
app.append(header)

const data = await fetchData()

if (data) {
    const img = document.createElement("img")
    img.src = data.message;
    img.className = "dog"
    app.append(header, img);
} else {
    const errorMsg = document.createElement("p")
    errorMsg.textContent = "Vi kunne ikke finde en hund lige nu 🐶💩"
    errorMsg.className = "error"
    app.append(header, errorMsg);
}





