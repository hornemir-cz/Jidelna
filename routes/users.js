const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Všechny routy pro uživatele
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i"); // i - bez ohledu na velikost písmen (case-insensitive)
  }
  try {
    const users = await User.find(searchOptions);
    res.render("users/index", {
      users: users,
      searchOptions: req.query
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

// Nová routa pro vytvoření nového uživatele
router.get("/new", (req, res) => {
  res.render("users/new", { user: new User() });
});

// Vytvoření nového uživatele
router.post("/", async (req, res) => {
  const hashedPasswd = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    hash: hashedPasswd
  });
  try {
    const newUser = await user.save();
    res.redirect("/users");
  } catch (error) {
    console.error(error);
    res.render("users/new", {
      user: user,
      errorMessage: "Chyba při vytváření uživatele"
    });
  }
});

module.exports = router;
