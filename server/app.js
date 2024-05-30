const express = require("express");
const app = express();
const cookiesParser = require("cookie-parser");
require("dotenv").config();

/**
 * 1. [routes path added here]
 * 2. [Parse JSON request body]
 * 3. [parse urlencoded request body]
 * 4. [routing add here]
 */
const userRoutes = require("./routes/user.route");

app.use(express.json());
app.use(cookiesParser());

app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);

module.exports = app;
