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
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require("method-override")

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => User.findOne({ email: email }),
  id => User.findById(id)
)

//Routy
const indexRouter = require("./routes/index")
const userTypeRouter = require("./routes/userTypes")
const mealRouter = require("./routes/meals")
const mealMenuRouter = require("./routes/mealMenus")
const userRouter = require("./routes/users")
const auth = require('./routes/auth')
const loginRouter = require('./routes/login')

//Settings
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout")
app.use("/stylesheets", express.static("public/stylesheets", { "extensions": ["css"] }))
app.use(expressLayouts)
app.use(methodOverride("_method"))
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.addMiddleware && app.use(passport.addMiddleware)

app.use((req, res, next) => {
  res.locals.auth = req.isAuthenticated();
  res.locals.isAdmin = req.isAuthenticated() && req.user && req.user.isAdmin;
  next();
});

//Database connect
const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on("error", error => console.error(error))
db.once("open", () => console.log("Mongoose DB připojena!"))

app.use("/", indexRouter)
app.use("/userTypes", auth, userTypeRouter)
app.use("/meals", auth, mealRouter)
app.use("/mealMenus", auth, mealMenuRouter)
app.use("/users", auth, userRouter)
app.use("/login", auth, loginRouter)

app.listen(process.env.PORT || 8080)
