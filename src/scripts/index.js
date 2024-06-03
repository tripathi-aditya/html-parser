import app from "./initalise";

app.init();
document.addEventListener("DOMContentLoaded", app.hydrate(), {once: true})

