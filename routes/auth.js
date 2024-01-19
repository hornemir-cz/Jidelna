const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
const User = require('../models/user')

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/")
  }
  console.log(req.isAuthenticated())
  return res.render('login/index')
}

router.get('/', checkAuthenticated, (req, res) => {
  res.render('index', { fname: req.user.fname })
})

router.get('/login', checkAuthenticated, (req, res) => {
  res.render('login/index')
})

router.post('/login', checkAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

router.get('/register', checkAuthenticated, (req, res) => {
  res.render('register')
})

router.post('/register', checkAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    await user.save()
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

router.delete('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})

module.exports = router
