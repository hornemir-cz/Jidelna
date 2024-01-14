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
  },
  userType: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "UserType"
  }
})

mealSchema.virtual("coverImagePath").get(function() {
  if (this.coverImageName != null) {
    return path.join("/", coverImageBasePath, this.coverImageName)
  }
})

module.exports = mongoose.model("Meal", mealSchema)
module.exports.coverImageBasePath = coverImageBasePath