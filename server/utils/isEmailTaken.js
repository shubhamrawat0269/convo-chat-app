const UserModel = require("../models/user.model");

const isEmailTaken = async (email) => {
  const userDetails = await UserModel.findOne({ email });
  return userDetails;
};

module.exports = isEmailTaken;
