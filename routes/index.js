const express = require("express")
const router = express.Router()
const Meal = require("../models/meal")

router.get("/", async (req, res) => {
  let meals
  let datum = new Date()
  try {
    meals = await Meal.find({
      date: { $gte: datum.setDate(datum.getDate() - 1) }
    })
    .sort({ date: "asc" })
    .limit(10)
    .exec()
    //console.log(datum)
  } catch (error) {
    console.error(error)
    meals = []
  }
  res.render("index", { meals: meals })
})

module.exports = router