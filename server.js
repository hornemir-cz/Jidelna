const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const passport = require("passport")

const users = []

app.set("view-engine")
app.use(express.urlencoded({ extended: false}))

app.get("/", (req, res) => {
    res.render("index.ejs", { name: "Franta" })
})

app.get("/login", (req, res) => {
    res.render("login.ejs")
})

app.post("/login", (req, res) => {

})

app.get("/register", (req, res) => {
    res.render("register.ejs")
})

app.post("/register", async (req, res) => {
    try {
        const hashedPasswd = await bcrypt.hash(req.body.password, 10)
        users.push( {
            id: Date.now().toString(),
            jmeno: req.body.jmeno,
            prijmeni: req.body.prijmeni,
            email: req.body.email,
            password: hashedPasswd
        })
        res.redirect("/login")
    } catch {
        res.redirect("/register")
    }
    console.log(users)
})

app.listen(3000)
