const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const Meal = require("../models/meal");

// Hledání uživatelů
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.lname != null && req.query.lname !== "") {
    searchOptions.lname = new RegExp(req.query.lname, "i"); // i - bez ohledu na velikost písmen (case-insensitive)
  }
  try {
    const users = await User.find(searchOptions).sort({ lname: "asc", credit: "asc" });
    res.render("users/index", { users, searchOptions: req.query });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

// Routa pro vytvoření nového uživatele
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
    hash: hashedPasswd,
    userType: req.body.userType,
    credit: req.body.credit,
  });
  try {
    const newUser = await user.save();
    res.redirect("/users");
  } catch (error) {
    console.error(error);
    res.render("users/new", { user, errorMessage: "Chyba při vytváření uživatele" });
  }
});

// Výpis uživatelů
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const meals = await Meal.find({ user: user.id }).limit(6).exec();
    res.render("users/show", { user, mealsOrderByUser: meals });
  } catch {
    res.redirect("/");
  }
});

// Routa pro Edit uživatele
router.get("/:id/edit", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("users/edit", { user });
  } catch {
    res.redirect("/users");
  }
});

// Uložení úpravy uživatele
router.put("/:id", async (req, res) => {
  let user;
  try {
    user = await User.findById(req.params.id);
    user.lname = req.body.lname;
    await user.save();
    res.redirect(`/users/${user.id}`);
  } catch {
    if (user == null) {
      res.redirect("/");
    } else {
      res.render("users/edit", { user, errorMessage: "Chyba v úpravě Strávníka" });
    }
  }
});

// Smazání uživatele
router.delete("/:id", async (req, res) => {
  let user;
  try {
    user = await User.findById(req.params.id);
    await user.remove();
    res.redirect("/users");
  } catch {
    if (user == null) {
      res.redirect("/");
    } else {
      res.redirect(`/users/${user.id}`);
    }
  }
});

module.exports = router;