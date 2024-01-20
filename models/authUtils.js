const User = require('../models/user')

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email }).exec();
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findById(id).exec();
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = {
  getUserByEmail,
  getUserById,
};
