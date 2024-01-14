const mongoose = require("mongoose")
const path = require("path")


const mealMenuSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  meal: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Meal"
  }
})

module.exports = mongoose.model("MealMenu", mealMenuSchema)