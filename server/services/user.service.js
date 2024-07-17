const UserModel = require("../models/user.model");

const createUser = async (user) => {
  await UserModel.create(user);
};

const checkUserEmail = async (email) => {
  const getUserEmail = await UserModel.find({ email });
  // console.log(getUserEmail);
  return getUserEmail;
};

const getUserById = async (userId) => {
  const userData = await UserModel.findById(userId);
  return userData;
};

const getUserByNameOrEmail = async (query) => {
  const userData = await UserModel.find({
    $or: [{ name: query }, { email: query }],
  });
  return userData;
};

const updateUserInfo = async (userId, updatedDetails) => {
  const updatedUserData = await UserModel.updateOne(
    { _id: userId },
    updatedDetails
  );
  return updatedUserData;
};

module.exports = {
  createUser,
  checkUserEmail,
  getUserById,
  updateUserInfo,
  getUserByNameOrEmail,
};
