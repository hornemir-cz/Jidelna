const mongoose = require("mongoose")
const path = require("path")

const coverImageBasePath = "uploads/mealCovers"

const mealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
  servingNumber: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  coverImageName: {
    type: String,
    required: true
  }
  
})

mealSchema.virtual("coverImagePath").get(function() {
  if (this.coverImageName != null) {
    return path.join("/", coverImageBasePath, this.coverImageName)
  }
})

mealSchema.methods.formatDayOfWeek = function () {
  const daysOfWeek = ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"]
  return daysOfWeek[this.date.getDay()]
}

module.exports = mongoose.model("Meal", mealSchema)
module.exports.coverImageBasePath = coverImageBasePath
