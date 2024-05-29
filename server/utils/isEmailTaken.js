const userModel = require("../models/user.model");

const isEmailTaken = async (email) => {
  const userDetails = await userModel.findOne({ email });
  return userDetails;
};

module.exports = isEmailTaken;
