const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");

// create user
router.post("/register", userController.registerUser);
// check email of user
router.post("/email", userController.checkMail);
// check user password
router.post("/password", userController.checkPassword);
// login user details
router.get("/user-details", userController.userDetails);
// logout user
router.get("/logout", userController.logout);

module.exports = router;
