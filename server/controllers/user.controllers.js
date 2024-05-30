const bcryptjs = require("bcryptjs");
const { userService } = require("../services");
const isEmailTaken = require("../utils/isEmailTaken");

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
    userService.createUser(payload);
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

const checkMail = async (req, res) => {
  try {
    const { email } = req.body;
    const checkMail = await userService.checkUserEmail(email);

    if (checkMail.length === 0) {
      return res.status(400).json({
        message: "User not exist",
        success: false,
      });
    }

    return res.status(200).json({
      message: "email verified successfully!!",
      data: checkMail,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

module.exports = { registerUser, checkMail };
