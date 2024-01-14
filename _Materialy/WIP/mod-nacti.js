const fs = require("fs")
const util = require("util")

const readFileMoje = util.promisify(fs.readFile)

module.exports = function nactiStranku() {
    console.log("nacitam stranku...")
    return readFileMoje("main.html")
    /*fs.readFile("main.html", function(err, data) {
        if (err) {
            console.log("Moc se omlouvám! Udělal jsem chybu: ", err)
            throw err
        }
        return data
    })*/
}