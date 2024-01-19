const mongoose = require("mongoose")

const UserTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }

})

UserTypeSchema.pre("remove", function(next) {
  meal.find({ userType: this.id }, (err, meals) => {
    if (err) {
      next(err)
    } else if (meals.length > 0) {
      next(new Error("Toto jídlo má stále Strávníky"))
    } else {
      next()
    }
  })
})

module.exports = mongoose.model("UserType", UserTypeSchema)