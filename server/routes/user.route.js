const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");

router.post("/register", userController.registerUser);
router.post("/email", userController.checkMail);

module.exports = router;
