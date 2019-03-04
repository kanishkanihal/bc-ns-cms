const env = process.env.NODE_ENV || "development";
const BigCommerce = require("node-bigcommerce");

const bigCommerce = new BigCommerce({
  logLevel: "info",
  clientId: process.env.BC_CLIENT_ID,
  secret: process.env.BC_SECRET,
  callback: process.env.BC_CALLBACK,
  responseType: "json"
});
var options = {
  root: __dirname + "/../public/"
};

var auth = async (req, res, next) => {
  var data = await bigCommerce.authorize(req.query);
  var storehash = data.context.split("/")[1];

  res.cookie(`access_token`, data.access_token);
  res.cookie(`storehash`, storehash);

  res.sendFile("images/success.png", options);
};
var load = async (req, res, next) => {
  const data = bigCommerce.verify(req.query["signed_payload"]);
  res.json(data);
};

module.exports = { auth, load, index };
