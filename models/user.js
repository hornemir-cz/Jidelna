const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  credit: {
    type: Number,
    required: true
  }

})

module.exports = mongoose.model("User", UserSchema)