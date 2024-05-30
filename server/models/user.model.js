const mongoose = require("mongoose");
const userSchema = require("../schema/user.schema");

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
