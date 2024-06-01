const express = require("express");
var cors = require("cors");
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

app.use(cors());
app.use(express.json());
app.use(cookiesParser());

app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);

module.exports = app;
