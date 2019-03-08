const env = process.env.NODE_ENV || "development";
const BigCommerce = require("node-bigcommerce");
const axios = require("axios");

const bcSetting = {
  logLevel: "info",
  callback: process.env.BC_CALLBACK,
  responseType: "json"
};
//Get user by hash code.
var getClient = async (host, hashCode) => {
  try {
    var path = `${host}/api/client/get-by-hash/${hashCode}`;
    var client = await axios.get(path);
    if (client.data.count === 1) {
      //Client exist
      return client.data.rows[0];
    } else {
      //Client does not exist
      return false;
    }
  } catch (error) {
    //error
    console.log(error);
    return false;
  }
};

var appOptions = {
  root: __dirname + "/../public/"
};
var options = {
  root: __dirname + "/../client/build"
};
//auth
var auth = async (req, res, next) => {
  var host = `${req.headers["x-forwarded-proto"]}://${req.headers.host}`;
  var client = await getClient(host, req.params.hashCode); //get the client
  if (client) {
    //Set client specific parameters.
    bcSetting.clientId = client.bcClientId;
    bcSetting.secret = client.bcClientSecret;
    bcSetting.callback = `${host}/bc/auth/${req.params.hashCode}`;
  }
  try {
    const bigCommerce = new BigCommerce(bcSetting); //Craete Bigcomerce object
    var data = await bigCommerce.authorize(req.query); //Bigcommerce authorize
    var storehash = data.context.split("/")[1]; //Getting the store hash

    //Update client by inserting the Bigcommerce User ID
    await axios.put(`${host}/api/client/${client.id}`, {
      storeHash: storehash
    });
    //Set sessions
    req.session.access_token = data.access_token;
    req.session.clientId = client.id;

    //Show instalation success message.
    res.sendFile("images/success.png", appOptions);
  } catch (error) {
    console.log(error);
    //Show unsuccessfull message.
    res.sendFile("images/error.png", appOptions);
  }
};
//load
var load = async (req, res, next) => {
  try {
    res.sendFile("index.html", options);
  } catch (error) {
    res.sendFile("images/error.png", appOptions);
  }
};

module.exports = { auth, load };
