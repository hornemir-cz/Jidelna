//SPUSTÍM SERVER příkaz => node main.js
const http = require("http")
const nacitac = require("./mod-nacti.js")

const app = http.createServer(async function(req, resp) {
    //console.log("REQUEST: ", JSON.stringify(req.headers))
    console.log("REQUEST: ", req.url)
    resp.writeHead(200, {"Content-Type": "text/html"})
    //resp.write("Ahoj Kiwi! Mám tě moc rád:)")

    if(req.url == "/kiwi") {
        const data = await nacitac()
        resp.write(data)
    } else {
        resp.write("Noooooooooooooooooooooooooooooooooooooo!")
    }    
    resp.end()
})

app.listen(8000)