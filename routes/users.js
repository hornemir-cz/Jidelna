const express = require("express")
const router = express.Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")
const Meal = require("../models/meal")

// Všechny routy pro uživatele
router.get("/", async (req, res) => {
  let searchOptions = {}
  if (req.query.lname != null && req.query.lname !== "") {
    searchOptions.lname = new RegExp(req.query.lname, "i") // i - bez ohledu na velikost písmen (case-insensitive)
  }
  try {
    const users = await User.find(searchOptions).sort({lname: "asc", credit: "asc"})
    res.render("users/index", {
      users: users,
      searchOptions: req.query
    })
  } catch (error) {
    console.error(error)
    res.redirect("/")
  }
})

// Nová routa pro vytvoření nového uživatele
router.get("/new", (req, res) => {
  res.render("users/new", { user: new User() })
})

// Vytvoření nového uživatele
router.post("/", async (req, res) => {
  const hashedPasswd = await bcrypt.hash(req.body.password, 10)
  const user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    hash: hashedPasswd,
    credit: req.body.credit
  })
  try {
    const newUser = await user.save()
    res.redirect("/users")
  } catch (error) {
    console.error(error)
    res.render("users/new", {
      user: user,
      errorMessage: "Chyba při vytváření uživatele"
    })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const meals = await Meal.find({ user: user.id }).limit(6).exec()
    res.render("users/show", {
      user: user,
      mealsOrderByUser: meals
    })
  } catch {
    res.redirect("/")
  }
})

router.get("/:id/edit", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.render("users/edit", { user: user })
  } catch {
    res.redirect("/users")
  }
})

router.put("/:id", async (req, res) => {
  let user
  try {
    user = await User.findById(req.params.id)
    user.lname = req.body.lname
    await userType.save()
    res.redirect(`/users/${user.id}`)
  } catch {
    if (user == null) {
      res.redirect("/")
    } else {
      res.render("users/edit", {
        user: user,
        errorMessage: "Chyba v úpravě Strávníka"
      })
    }
  }
})

router.delete("/:id", async (req, res) => {
  let user
  try {
    user = await User.findById(req.params.id)
    await user.remove()
    res.redirect("/users")
  } catch {
    if (user == null) {
      res.redirect("/")
    } else {
      res.redirect(`/users/${user.id}`)
    }
  }
})

module.exports = router
