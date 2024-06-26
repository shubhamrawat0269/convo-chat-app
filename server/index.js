const app = require("./app");
const connectToDb = require("./db/connectToDb");
const { server } = require("./socket/index");

/**
 * [mongodb connection]
 * [app listening PORT comes from .env]
 */
connectToDb();

server.listen(process.env.PORT, () =>
  console.log(`Server Started at PORT ${process.env.PORT}`)
);
