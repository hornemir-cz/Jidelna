const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const Meal = require('../models/meal');

router.get('/', async (req, res) => {
    let meals;
    let datum = new Date();
    try {
      meals = await Meal.find({
        date: { $gte: datum.setDate(datum.getDate() - 1) }
      })
      .sort({ date: "asc" })
      .limit(10)
      .exec();
    } catch (error) {
      console.error(error);
      meals = [];
    }
    res.render('login/index', { meals: meals, auth: req.isAuthenticated(), email: req.user ? req.user.email : null, hash: req.user ? req.user.hash : null, isAdmin: req.isAdmin });
});  

// Middleware pro kontrolu přihlášení a admin práv
router.use((req, res, next) => {
  res.locals.auth = req.isAuthenticated();
  res.locals.isAdmin = req.isAuthenticated() && req.user && req.user.isAdmin;
  next();
});

router.get('/login', (req, res) => {
  res.render('login/index');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

const checkAdmin = (req, res, next) => {
  req.isAdmin = req.isAuthenticated() && req.user && req.user.isAdmin;
  next();
};
  
// Middleware pro kontrolu přihlášení
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};
  
router.use(['/userTypes', '/meals', '/mealMenus', '/users'], ensureAuthenticated);

router.use(['/userTypes', '/users', '/meals'], checkAdmin, (req, res, next) => {
  if (req.isAdmin) {
    return next();
  }
  res.redirect('/');
});

module.exports = router;
