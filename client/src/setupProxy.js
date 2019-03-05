const proxy = require("http-proxy-middleware");
const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://944cd93b.ngrok.io";

module.exports = function(app) {
  app.use(proxy("/api", { target: url }));
};
