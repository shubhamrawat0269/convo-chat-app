const express = require("express");
const app = express();
const cookiesParser = require("cookie-parser");
require("dotenv").config();

/* routes path */
const userRoutes = require("./routes/user.route");

/* parse json request body */
app.use(express.json());
app.use(cookiesParser());

/* parse urlencoded request body */
app.use(express.urlencoded({ extended: true }));

/* routing */
app.use("/user", userRoutes);

module.exports = app;
