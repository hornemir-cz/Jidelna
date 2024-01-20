const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const Meal = require('../models/meal');

const checkAdmin = async (req) => {
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL;
    req.isAdmin = req.isAuthenticated() && req.user && req.user.email === adminEmail;
    console.log('isAdmin:', req.isAdmin);
    console.log('user:', req.user);
    console.log('request:', req.isAuthenticated());
    console.log('email:', adminEmail);
    return req.isAdmin;
  };

router.use(async (req, res, next) => {
    res.locals.auth = req.isAuthenticated();
  
    try {
      if (req.user) {
        const user = await User.findById(req.user._id).exec();
        const adminEmail = process.env.DEFAULT_ADMIN_EMAIL;
  
        // Nastavení res.locals.isAdmin
        res.locals.isAdmin = req.isAuthenticated() && user && user.email === adminEmail;
  
        console.log('isAdmin:', res.locals.isAdmin);
        console.log('user:', user);
        console.log('request:', req.isAuthenticated());
        console.log('email req:', user ? user.email : null);
        console.log('email:', adminEmail);
      } else {
        res.locals.isAdmin = false;
      }
    } catch (error) {
      console.error(error);
      res.locals.isAdmin = false; 
    }
  
    next();
});  
  

router.get('/', async (req, res) => {
  let meals;
  let datum = new Date();
  try {
    meals = await Meal.find({
      date: { $gte: datum.setDate(datum.getDate() - 1) },
    })
      .sort({ date: 'asc' })
      .limit(10)
      .exec();
  } catch (error) {
    console.error(error);
    meals = [];
  }
  res.render('login/index', {
    meals: meals,
    auth: req.isAuthenticated(),
    email: req.user ? req.user.email : null,
    hash: req.user ? req.user.hash : null,
    isAdmin: checkAdmin(req) 
  });
});

// Middleware pro kontrolu přihlášení a admin práv
router.use((req, res, next) => {
  res.locals.auth = req.isAuthenticated();
  res.locals.isAdmin = req.isAuthenticated() && req.user && checkAdmin(req);
  next();
});

router.get('/login', (req, res) => {
  res.render('login/index');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

// Middleware pro kontrolu přihlášení
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

router.use(['/userTypes', '/meals', '/mealMenus', '/users'], ensureAuthenticated);

router.use(['/userTypes', '/users', '/meals'], (req, res, next) => {
  if (checkAdmin(req)) {
    return next();
  }
  res.redirect('/');
});

router.use((req, res, next) => {
    res.locals.auth = req.isAuthenticated();
    res.locals.isAdmin = req.isAuthenticated() && checkAdmin(req);
    next();
  });

module.exports = router;
