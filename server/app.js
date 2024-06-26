const express = require("express");
var cors = require("cors");

const { app } = require("./socket/index");

// const app = express();
const cookiesParser = require("cookie-parser");
require("dotenv").config();

/**
 * 1. [routes path added here]
 * 2. [Parse JSON request body]
 * 3. [parse urlencoded request body]
 * 4. [routing add here]
 */
const userRoutes = require("./routes/user.route");

const corsOption = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOption));
app.use(express.json());
app.use(cookiesParser());

app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);

module.exports = app;
