const mongoose = require("mongoose")

const UserTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  servingPerUserType: {
    type: Number,
    required: true
  }

})

module.exports = mongoose.model("UserType", UserTypeSchema)