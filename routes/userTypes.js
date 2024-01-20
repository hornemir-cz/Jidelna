const express = require("express")
const router = express.Router()
const UserType = require("../models/userType")
const Meal = require("../models/meal")

// Routy pro typy strávníků
router.get("/", async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i") //i - (case-insensitive)
  }
  try {
    const userTypes = await UserType.find(searchOptions)
    res.render("userTypes/index", { userTypes, searchOptions: req.query })
  } catch {
    res.redirect("/")
  }
})

// Nový typ strávníka
router.get("/new", (req, res) => {
  res.render("userTypes/new", { userType: new UserType() })
})

// Vytvoření nového typu strávníka
router.post("/", async (req, res) => {
  const userType = new UserType({
    name: req.body.name,
    price: req.body.price,
  })
  try {
    await userType.save()
    res.redirect(`userTypes`)
  } catch {
    res.render("userTypes/new", {
      userType,
      errorMessage: "Chyba ve vytváření typu Strávníka"
    })
  }
})

// Detail typu strávníka
router.get("/:id", async (req, res) => {
  try {
    const userType = await UserType.findById(req.params.id)
    const meals = await Meal.find({ userType: userType.id }).limit(6).exec()
    res.render("userTypes/show", { userType, mealsByUserType: meals })
  } catch {
    res.redirect("/")
  }
})

// Úprava typu strávníka
router.get("/:id/edit", async (req, res) => {
  try {
    const userType = await UserType.findById(req.params.id)
    res.render("userTypes/edit", { userType })
  } catch {
    res.redirect("/userTypes")
  }
})

router.put("/:id", async (req, res) => {
  let userType
  try {
    userType = await UserType.findById(req.params.id)
    userType.name = req.body.name
    await userType.save()
    res.redirect(`/userTypes/${userType.id}`)
  } catch {
    if (userType == null) {
      res.redirect("/")
    } else {
      res.render("userTypes/edit", {
        userType,
        errorMessage: "Chyba v úpravě Strávníka"
      })
    }
  }
})

// Smazání typu strávníka
router.delete("/:id", async (req, res) => {
  let userType
  try {
    userType = await UserType.findById(req.params.id)
    await userType.remove()
    res.redirect("/userTypes")
  } catch {
    if (userType == null) {
      res.redirect("/")
    } else {
      res.redirect(`/userTypes/${userType.id}`)
    }
  }
})

module.exports = router