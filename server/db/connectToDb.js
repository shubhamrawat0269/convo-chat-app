const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose
    .connect(`${process.env.DB_URI}`)
    .then(() => console.log(`Connected to DB at ${process.env.DB_URI}`))
    .catch((e) => console.log("Failed to connect to DB", e));
};

module.exports = connectToDb;
