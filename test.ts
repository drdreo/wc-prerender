const http = require("http");
const url = "http://localhost:3002/ssr";

setInterval(() => {
    http.get(url, res => {});
}, 100);

