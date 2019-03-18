const env = process.env.NODE_ENV || "development";
const BigCommerce = require("node-bigcommerce");
const axios = require("axios");
const db = require("../models/index");
const site = db.Site;
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
    var bigCommerce = new BigCommerce(bcSetting); //Craete Bigcomerce object
    var data = await bigCommerce.authorize(req.query); //Bigcommerce authorize
    var storehash = data.context.split("/")[1]; //Getting the store hash

    //Find of create site.
    const [clientSite, created] = await site.findOrCreate({
      where: {
        client_id: client.id,
        store_hash: storehash
      }
    });
    var siteId = clientSite.id;
    //Set sessions
    req.session.access_token = data.access_token;
    req.session.site_id = siteId;

    //Injecting a javascript
    bcSetting.accessToken = data.access_token;
    bcSetting.storeHash = storehash;
    bcSetting.apiVersion = "v3";

    var bc = new BigCommerce(bcSetting);
    var scriptData = {
      name: "Ns CMS Block",
      description: "CMS Block load the content from the API",
      html: `<script>
        fetch("https://bc-ns-cms.herokuapp.com/api/cms/${storehash}")
            .then(function (res) { return res.json(); })
            .then(function (blocks) { 
              blocks.forEach(function (block) { 
                var pid = block.page_id;
                var sid = block.section_id;
                    var ele = document.querySelector("#cms-block-"+pid+"-"+sid); 
                    ele.innerHTML = block.content; }); 
        }).catch(function (err) {
            return console.log(err); 
        });
        </script>`,
      src: "",
      auto_uninstall: true,
      load_method: "default",
      location: "footer",
      visibility: "all_pages",
      kind: "script_tag"
    };
    var response = await bc.post("/content/scripts", scriptData);
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
