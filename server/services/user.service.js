const userModel = require("../models/user.model");

const createUser = async (user) => {
  await userModel.create(user);
};

module.exports = { createUser };
