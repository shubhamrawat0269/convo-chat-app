const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { userService } = require("../services");
const isEmailTaken = require("../utils/isEmailTaken");
const { getUserDetailsFromToken } = require("../utils/getUserDetailsFromToken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, profile } = req.body;

    const userDetail = await isEmailTaken(email);
    // console.log(userDetail);

    if (userDetail) {
      return res.status(400).json({
        message: "Already Exist User",
      });
    }

    /* decrypt password via bcryptjs & create obj payload */
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

const checkPassword = async (req, res) => {
  try {
    const { password, userId } = req.body;
    // console.log(req.headers);
    const userDetail = await userService.getUserById(userId);
    // console.log(userDetail);

    const verifyPassowrd = await bcryptjs.compare(
      password,
      userDetail.password
    );
    // console.log(verifyPassowrd);

    if (!verifyPassowrd) {
      return res.status(400).json({
        message: "Please Check Password!!",
        error: true,
      });
    }

    const tokenData = {
      id: userDetail._id,
      email: userDetail.email,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECREAT_KEY, {
      expiresIn: "1d",
    });

    const cookieOption = {
      httpOnly: true,
      secure: true,
    };

    return res.cookie("token", token, cookieOption).status(200).json({
      message: "login successfully!!",
      token: token,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

const userDetails = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    // const token = req.cookies.token || "";
    const user = await getUserDetailsFromToken(token);
    // console.log(user);
    return res.status(200).json({
      message: "user detail",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

const searchUser = async (req, res) => {
  try {
    const { search } = req.body;
    const query = new RegExp(search, "i", "g");

    const userDetail = await userService.getUserByNameOrEmail(query);

    return res.status(200).json({
      message: "all user",
      data: userDetail,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

const logout = async (req, res) => {
  try {
    const cookieOption = {
      http: true,
      secure: true,
    };

    return res.cookie("token", "", cookieOption).status(200).json({
      message: "logout successfully!!!",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    // const { name, profile } = req.body;
    const token = req.cookies.token || "";
    const userDetail = await getUserDetailsFromToken(token);

    await userService.updateUserInfo(userDetail._id, req.body);

    const user = await userService.getUserById(userDetail._id);
    console.log(user);
    return res.json({
      message: "user info updated successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

module.exports = {
  registerUser,
  checkMail,
  checkPassword,
  userDetails,
  logout,
  updateUserDetails,
  searchUser,
};
