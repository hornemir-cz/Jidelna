const express = require('express')
const router = express.Router()
const Meal = require('../models/meal')
const UserType = require('../models/userType')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const uploadPath = path.join('public', Meal.coverImageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype))
  },
})

router.get('/', async (req, res) => {
  let query = Meal.find()

  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'))
  }

  if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
    query = query.lte('date', req.query.publishedBefore)
  }

  if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
    query = query.gte('date', req.query.publishedAfter)
  }

  try {
    const meals = await query.sort({ date: 'asc' }).exec()
    res.render('meals/index', {
      meals: meals,
      searchOptions: req.query,
    })
  } catch {
    res.redirect('/')
  }
})

router.get('/new', async (req, res) => {
  renderNewPage(res, new Meal())
})

router.post('/', upload.single('cover'), async (req, res) => {
  const fileName = req.file != null ? req.file.filename : null
  const meal = new Meal({
    title: req.body.title,
    date: new Date(req.body.date),
    servingNumber: req.body.servingNumber,
    coverImageName: fileName,
    description: req.body.description,
    userType: req.body.userType
  })

  try {
    const newMeal = await meal.save()
    res.redirect(`meals/${newMeal.id}`)
  } catch {
    if (meal.coverImageName != null) {
      removeMealCover(meal.coverImageName)
    }
    renderNewPage(res, meal, true)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id)
    res.render('meals/show', { meal: meal })
  } catch {
    res.redirect('/meals')
  }
})

router.get('/:id/edit', async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id)
    renderEditPage(res, meal)
  } catch {
    res.redirect('/meals')
  }
})

router.put('/:id', async (req, res) => {
  let meal

  try {
    meal = await Meal.findById(req.params.id)
    meal.title = req.body.title
    meal.date = new Date(req.body.date)
    meal.servingNumber = req.body.servingNumber
    meal.description = req.body.description

    if (req.file != null) {
      meal.coverImageName = req.file.filename
    }

    await meal.save()
    res.redirect(`/meals/${meal.id}`)
  } catch {
    if (meal != null) {
      renderEditPage(res, meal, true)
    } else {
      res.redirect('/meals')
    }
  }
})

router.delete('/:id', async (req, res) => {
  let meal
  try {
    meal = await Meal.findById(req.params.id)
    await meal.remove()
    res.redirect('/meals')
  } catch {
    if (meal != null) {
      res.render('meals/show', {
        meal: meal,
        errorMessage: 'Nelze odstranit jídlo',
      })
    } else {
      res.redirect('/meals')
    }
  }
})

async function renderNewPage(res, meal, hasError = false) {
  try {
    const userTypes = await UserType.find({})
    const params = {
      userTypes: userTypes,
      meal: meal,
    }
    if (hasError) params.errorMessage = 'Chyba při přidávání jídla :cry:'
    res.render('meals/new', params)
  } catch {
    res.redirect('/meals')
  }
}

async function renderEditPage(res, meal, hasError = false) {
  try {
    const userTypes = await UserType.find({})
    const params = {
      userTypes: userTypes,
      meal: meal,
    }
    if (hasError) params.errorMessage = 'Chyba při aktualizaci jídla :cry:'
    res.render('meals/edit', params)
  } catch {
    res.redirect('/meals')
  }
}

function removeMealCover(fileName) {
  fs.unlink(path.join(uploadPath, fileName), (err) => {
    if (err) console.error(err)
  })
}

module.exports = router
