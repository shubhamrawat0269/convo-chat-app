const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URI}`);
    console.log(`Connected to DB at ${process.env.DB_URI}`);
  } catch (error) {
    console.log(`Failed to connect to MongoDB`, error);
  }
};

module.exports = connectToDb;
