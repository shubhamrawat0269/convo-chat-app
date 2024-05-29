const bcryptjs = require("bcryptjs");
const isEmailTaken = require("../utils/isEmailTaken");
const { createUser } = require("../services/user.service");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, profile } = req.body;

    /* checking if the recieved email is exist in Database or not */
    const userDetail = await isEmailTaken(email);
    // console.log(userDetail);

    if (userDetail) {
      return res.status(400).json({
        message: "Already Exist User",
      });
    }

    /* encrypting password via bcryptjs & create obj payload */
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
      profile,
    };

    /* use service layer to create user & return response */
    createUser(payload);
    return res.status(200).json({
      message: "User Created Successfully",
      data: payload,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
    });
  }
};

module.exports = { registerUser };
