const express = require('express')
const router = express.Router()
const UserType = require('../models/userType')
const Meal = require('../models/meal')

router.get('/', async (req, res) => {
  let searchOptions = {}

  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }

  try {
    const userTypes = await UserType.find(searchOptions)
    res.render('userTypes/index', { userTypes, searchOptions: req.query })
  } catch {
    res.redirect('/')
  }
})

router.get('/new', (req, res) => {
  renderNewPage(res, new UserType())
})

router.post('/', async (req, res) => {
  const userType = new UserType({
    name: req.body.name,
    price: req.body.price,
  })

  try {
    await userType.save()
    res.redirect(`userTypes/${userType.id}`)
  } catch {
    renderNewPage(res, userType, true)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const userType = await UserType.findById(req.params.id)
    const meals = await Meal.find({ userType: userType.id }).limit(6).exec()
    res.render('userTypes/show', { userType, mealsByUserType: meals })
  } catch {
    res.redirect('/')
  }
})

router.get('/:id/edit', async (req, res) => {
  try {
    const userType = await UserType.findById(req.params.id)
    renderEditPage(res, userType)
  } catch {
    res.redirect('/userTypes')
  }
})

router.put('/:id', async (req, res) => {
  let userType

  try {
    userType = await UserType.findById(req.params.id)
    userType.name = req.body.name
    userType.price = req.body.price

    await userType.save()
    res.redirect(`/userTypes/${userType.id}`)
  } catch {
    if (userType != null) {
      renderEditPage(res, userType, true)
    } else {
      res.redirect('/')
    }
  }
})

router.delete('/:id', async (req, res) => {
  let userType

  try {
    userType = await UserType.findById(req.params.id)
    await userType.remove()
    res.redirect('/userTypes')
  } catch {
    if (userType != null) {
      res.render('userTypes/show', {
        userType: userType,
        errorMessage: 'Nelze odstranit typ strávníka',
      })
    } else {
      res.redirect('/userTypes')
    }
  }
})

async function renderNewPage(res, userType, hasError = false) {
  try {
    res.render('userTypes/new', { userType: userType, hasError })
  } catch {
    res.redirect('/userTypes')
  }
}

async function renderEditPage(res, userType, hasError = false) {
  try {
    res.render('userTypes/edit', { userType: userType, hasError })
  } catch {
    res.redirect('/userTypes')
  }
}

module.exports = router
