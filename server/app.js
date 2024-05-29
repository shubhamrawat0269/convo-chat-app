const express = require("express");
const app = express();
require("dotenv").config();

/* routes path */
const userRoutes = require("./routes/user.route");

/* parse json request body */
app.use(express.json());

/* parse urlencoded request body */
app.use(express.urlencoded({ extended: true }));

/* routing */
app.use("/user", userRoutes);

module.exports = app;
