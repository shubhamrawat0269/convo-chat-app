var cors = require("cors");
require("dotenv").config();
const express = require("express");
const connectToDb = require("./db/connectToDb");
const cookiesParser = require("cookie-parser");
const { app, server } = require("./socket/index");

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

/**
 * [mongodb connection]
 * [app listening PORT comes from .env]
 */
connectToDb();

server.listen(process.env.PORT, () =>
  console.log(`Server Started at PORT ${process.env.PORT}`)
);
