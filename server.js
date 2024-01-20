///SERVER dev START - "npm run devStart"
///SERVER START - "npm run start"

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const User = require('./models/user')

const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
// const bcrypt = require('bcrypt')
// const passport = require('passport')
// const flash = require('express-flash')
// const session = require('express-session')

//Routy
const indexRouter = require("./routes/index")
const userTypeRouter = require("./routes/userTypes")
const mealRouter = require("./routes/meals")
const mealMenuRouter = require("./routes/mealMenus")
const userRouter = require("./routes/users")
// const loginRouter = require("./routes/login")

//Settings
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout")
app.use("/stylesheets", express.static("public/stylesheets", { "extensions": ["css"] }))
app.use(expressLayouts)
app.use(methodOverride("_method"))
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }))
// app.use(flash())
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// }))
// app.use(passport.initialize())
// app.use(passport.session())

//Database connect
const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on("error", error => console.error(error))
db.once("open", () => console.log("Mongoose DB připojena!"))

app.use("/", indexRouter)
app.use("/userTypes", userTypeRouter)
app.use("/meals", mealRouter)
app.use("/mealMenus", mealMenuRouter)
app.use("/users", userRouter)
//app.use("/login", loginRouter)

app.listen(process.env.PORT || 8080)
