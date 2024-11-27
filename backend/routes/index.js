const authRouter = require("./authRoute");
const pointRouter = require("./pointRoute");
const orderRouter = require("./orderRoute");

function route(app) {
  app.use("/api/user", authRouter);
  app.use("/api/point", pointRouter);
  app.use("/api/order", orderRouter);
}

module.exports = route;
