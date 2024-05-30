const userModel = require("../models/user.model");

const createUser = async (user) => {
  await userModel.create(user);
};

const checkUserEmail = async (email) => {
  const getUserEmail = await userModel.find({ email }).select("-password");
  // console.log(getUserEmail);
  return getUserEmail;
};

const getUserById = async (userId) => {
  const userData = await userModel.findById(userId);
  return userData;
};

module.exports = { createUser, checkUserEmail, getUserById };
