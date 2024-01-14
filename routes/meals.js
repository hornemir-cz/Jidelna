const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const Meal = require("../models/meal")
const UserType = require("../models/userType")
const uploadPath = path.join("public", Meal.coverImageBasePath)
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"]
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype))
  }
})

// All Meals Route
router.get("/", async (req, res) => {
  let query = Meal.find()
  if (req.query.title != null && req.query.title != "") {
    query = query.regex("title", new RegExp(req.query.title, "i"))
  }
  if (req.query.publishedBefore != null && req.query.publishedBefore != "") {
    query = query.lte("date", req.query.publishedBefore)
  }
  if (req.query.publishedAfter != null && req.query.publishedAfter != "") {
    query = query.gte("date", req.query.publishedAfter)
  }
  try {
    const meals = await query.exec()
    res.render("meals/index", {
      meals: meals,
      searchOptions: req.query
    })
  } catch {
    res.redirect("/")
  }
})

// New Meal Route
router.get("/new", async (req, res) => {
  renderNewPage(res, new Meal())
})

// Create Meal Route
router.post("/", upload.single("cover"), async (req, res) => {
  const fileName = req.file != null ? req.file.filename : null
  const meal = new Meal({
    title: req.body.title,
    userType: req.body.userType,
    date: new Date(req.body.date),
    servingNumber: req.body.servingNumber,
    coverImageName: fileName,
    description: req.body.description
  })

  try {
    const newMeal = await meal.save()
    // res.redirect(`meals/${newMeal.id}`)
    res.redirect(`meals`)
  } catch {
    if (meal.coverImageName != null) {
      removeMealCover(meal.coverImageName)
    }
    renderNewPage(res, meal, true)
  }
})

function removeMealCover(fileName) {
  fs.unlink(path.join(uploadPath, fileName), err => {
    if (err) console.error(err)
  })
}

async function renderNewPage(res, meal, hasError = false) {
  try {
    const userTypes = await UserType.find({})
    console.log(userTypes)
    console.log(meal)
    const params = {
      userTypes: userTypes,
      meal: meal
    }
    if (hasError) params.errorMessage = "Chyba ve přidání jídla :cry:"
    res.render("meals/new", params)
  } catch {
    res.redirect("/meals")
  }
}

module.exports = router