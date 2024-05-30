const app = require("./app");
const connectToDb = require("./db/connectToDb");

/**
 * [mongodb connection]
 * [app listening PORT comes from .env]
 */
connectToDb();

app.listen(process.env.PORT, () =>
  console.log(`Server Started at PORT ${process.env.PORT}`)
);
