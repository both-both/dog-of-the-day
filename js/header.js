export const header = document.createElement("header")

const logo = document.createElement("img")
logo.src = "./assets/dog-api-logo.svg"
logo.alt = "Dog API logo"


const h1 = document.createElement("h1")
h1.textContent = "My dog"


header.append(logo, h1)
