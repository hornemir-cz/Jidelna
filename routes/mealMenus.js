const express = require("express")
const router = express.Router()
const MealMenu = require("../models/mealMenu")
const Meal = require("../models/meal")
const User = require("../models/user")

// Všechny routy pro uživatele
router.get("/", async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i")  //i - bez ohledu na velikost písmen (case-insensitive)
  }
  try {
    const mealMenus = await MealMenu.find(searchOptions)
    res.render("mealMenus/index", {
      mealMenus: mealMenus,
      searchOptions: req.query
    })
  } catch {
    res.redirect("/")
  }
})


// Nová routa pro vytvoření nového mealMenu
router.get("/new", (req, res) => {
  res.render("mealMenus/new", { mealMenu: new MealMenu() })
})

// Vytvoření nového uživatele
router.post("/", async (req, res) => {
  const mealMenu = new MealMenu({
    user: req.body.user,
    meal: req.body.meal
  })
  try {
    const newMealMenu = await mealMenu.save()
    res.redirect(`mealMenus`)
  } catch {
    res.render("mealMenus/new", {
      mealMenu: mealMenu,
      errorMessage: "Chyba ve vytváření Menu"
    })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const mealMenu = await MealMenu.findById(req.params.id)
    const meals = await Meal.find({ mealMenu: mealMenu.id }).limit(6).exec()
    res.render("mealMenus/show", {
      mealMenu: mealMenu,
      mealsByMealMenu: meals
    })
  } catch {
    res.redirect("/")
  }
})

router.get("/:id/edit", async (req, res) => {
  try {
    const mealMenu = await MealMenu.findById(req.params.id)
    res.render("mealMenus/edit", { mealMenu: mealMenu })
  } catch {
    res.redirect("/mealMenus")
  }
})

router.put("/:id", async (req, res) => {
  let mealMenu
  try {
    mealMenu = await MealMenu.findById(req.params.id)
    mealMenu.name = req.body.name
    await mealMenu.save()
    res.redirect(`/mealMenus/${mealMenu.id}`)
  } catch {
    if (mealMenu == null) {
      res.redirect("/")
    } else {
      res.render("mealMenus/edit", {
        mealMenu: mealMenu,
        errorMessage: "Chyba v úpravě Strávníka"
      })
    }
  }
})

router.delete("/:id", async (req, res) => {
  let mealMenu
  try {
    mealMenu = await MealMenu.findById(req.params.id)
    await mealMenu.remove()
    res.redirect("/mealMenus")
  } catch {
    if (mealMenu == null) {
      res.redirect("/")
    } else {
      res.redirect(`/mealMenus/${mealMenu.id}`)
    }
  }
})


module.exports = router