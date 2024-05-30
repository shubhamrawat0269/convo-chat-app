const UserModel = require("../models/user.model");

/**
 * Function to check email exist in DB.
 * @param  {String} email i.e. rawatshubam269@gmail.com
 * @return {Object} user details stored in mongodb with given emailId.
 */

const isEmailTaken = async (email) => {
  const userDetails = await UserModel.findOne({ email });
  return userDetails;
};

module.exports = isEmailTaken;
