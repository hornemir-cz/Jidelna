const express = require("express")
const router = express.Router()
const User = require("../models/user")
const UserType = require("../models/userType")
const bcrypt = require("bcrypt")
const Meal = require("../models/meal")

// Hledání uživatelů
router.get("/", async (req, res) => {
  let searchOptions = {}

  if (req.query.name != null && req.query.name !== "") {
    const searchRegex = new RegExp(req.query.name, "i")
    searchOptions.$or = [
      { fname: searchRegex },
      { lname: searchRegex }
    ]
  }  
  if (req.query.userType != null && req.query.userType !== "") {
    searchOptions.userType = req.query.userType
  }

  try {
    const users = await User.find(searchOptions)
      .populate('userType')
      .sort({ lname: "asc", credit: "asc" })

    const userTypes = await UserType.find({})
    res.render("users/index", { users, userTypes, searchOptions: req.query })
  } catch (error) {
    console.error(error)
    res.redirect("/")
  }
})


// Routa pro vytvoření nového uživatele
router.get("/new", async (req, res) => {
  renderNewUserPage(res, new User())
})

// Vytvoření nového uživatele
router.post("/", async (req, res) => {
  const hashedPasswd = await bcrypt.hash(req.body.password, 10)
  const user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    hash: hashedPasswd,
    userType: req.body.userType,
    credit: req.body.credit,
  })
  try {
    const newUser = await user.save()
    res.redirect("/users")
  } catch (error) {
    console.error(error)
    renderNewUserPage(res, user, true)
  }
})

// Výpis uživatelů
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("userType")
    const meals = await Meal.find({ user: user.id }).limit(6).exec()
    res.render("users/show", { user, mealsOrderByUser: meals })
  } catch (error) {
    console.error(error)
    res.redirect("/")
  }
})

// Routa pro úpravu uživatele
router.get("/:id/edit", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.render("users/edit", { user })
  } catch {
    res.redirect("/users")
  }
})

// Uložení úprav uživatele
router.put("/:id", async (req, res) => {
  let user
  try {
    user = await User.findById(req.params.id)
    user.lname = req.body.lname
    await user.save()
    res.redirect(`/users/${user.id}`)
  } catch {
    if (user == null) {
      res.redirect("/")
    } else {
      res.render("users/edit", { user, errorMessage: "Chyba při uložení úprav uživatele" })
    }
  }
})

// Smazání uživatele
router.delete("/:id", async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id })
    if (result.deletedCount > 0) {
      res.redirect("/users")
    } else {
      res.redirect("/users")
    }
  } catch (error) {
    console.error(error)
    res.redirect(`/users/${user.id}`)
  }
})

async function renderNewUserPage(res, user, hasError = false) {
  try {
    const userTypes = await UserType.find({})
    const params = {
      userTypes: userTypes,
      user: user,
    }
    if (hasError) params.errorMessage = 'Chyba při vytváření uživatele :cry:'
    res.render('users/new', params)
  } catch {
    res.redirect('/users')
  }
}

module.exports = router
