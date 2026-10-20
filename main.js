
import { fetchData } from "./js/fetch.js";
import { header } from "./js/header.js"

const app = document.getElementById("app")

const data = await fetchData()



const img = document.createElement("img")
img.src = data.message;
img.className = "dog"


app.append(header, img);