const express = require("express")
const router = express.Router()
const UserType = require("../models/userType")

// All UserTypes Routy
router.get("/", async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i")  //i - bez ohledu na velikost písmen (case-insensitive)
  }
  try {
    const userTypes = await UserType.find(searchOptions)
    res.render("userTypes/index", {
      userTypes: userTypes,
      searchOptions: req.query
    })
  } catch {
    res.redirect("/")
  }
})

// New UserType Routa
router.get("/new", (req, res) => {
  res.render("userTypes/new", { userType: new UserType() })
})

// Create UserType Routu
router.post("/", async (req, res) => {
  const userType = new UserType({
    name: req.body.name,
    price: req.body.price,
    servingPerUserType: req.body.servingPerUserType
  })
  try {
    const newUserType = await userType.save()
    res.redirect(`userTypes`)
  } catch {
    res.render("userTypes/new", {
      userType: userType,
      errorMessage: "Chyba ve vytváření Strávníka"
    })
  }
})

module.exports = router