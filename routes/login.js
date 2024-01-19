const express = require('express');
const router = express.Router();
const passport = require("passport")

router.get('/login', (req, res) => {
  res.render('login/index');
});

router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = router;
