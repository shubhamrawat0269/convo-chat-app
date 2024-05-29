const app = require("./app");
const connectToDb = require("./db/connectToDb");

/* mongodb connection */
connectToDb();

/* app listen to special PORT */
app.listen(process.env.PORT, () =>
  console.log(`Server Started at PORT ${process.env.PORT}`)
);
