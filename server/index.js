const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const { PORT, DB_URI } = process.env;

/* routes path */
const userRoutes = require("./routes/user.route");

/* mongodb connection */
mongoose
  .connect(`${DB_URI}`)
  .then(() => console.log(`Connected to DB at ${DB_URI}`))
  .catch((e) => console.log("Failed to connect to DB", e));

app.get("/", (req, res) => {
  res.json({ message: "HOME PAGE ~~~" });
});

app.use(express.json());

app.use("/user", userRoutes);

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
