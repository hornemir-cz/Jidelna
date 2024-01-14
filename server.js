///SERVER START - "npm run devStart"

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require("body-parser")
const methodOverride = require('method-override')

//Routy
const indexRouter = require("./routes/index")
const userTypeRouter = require("./routes/userTypes")
const mealRouter = require("./routes/meals")
const userRouter = require("./routes/users")

//Settings
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout")
app.use("/stylesheets", express.static("public/stylesheets", { "extensions": ["css"] }));
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }))

//Database connect
const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on("error", error => console.error(error))
db.once("open", () => console.log("Mongoose DB připojena!"))

app.use("/", indexRouter)
app.use("/userTypes", userTypeRouter)
app.use("/meals", mealRouter)
app.use("/users", userRouter);

app.listen(process.env.PORT || 3000)