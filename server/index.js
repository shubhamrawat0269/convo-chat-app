const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "HOME PAGE ~~~" });
});

app.listen(process.env.PORT, () =>
  console.log(`Server Started at PORT ${process.env.PORT}`)
);
