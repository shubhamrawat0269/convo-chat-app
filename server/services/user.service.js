const UserModel = require("../models/user.model");

const createUser = async (user) => {
  await UserModel.create(user);
};

const checkUserEmail = async (email) => {
  const getUserEmail = await UserModel.find({ email }).select("-password");
  // console.log(getUserEmail);
  return getUserEmail;
};

const getUserById = async (userId) => {
  const userData = await UserModel.findById(userId);
  return userData;
};

module.exports = { createUser, checkUserEmail, getUserById };
