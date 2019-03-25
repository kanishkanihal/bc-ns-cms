const BigCommerce = require("node-bigcommerce");
const crypto = require("crypto");
const db = require("../models/index");
const site = db.Site;
const client = db.Client;

module.exports = {
  findByCategoryId: async (req, res, next) => {
    var storeHash = req.params.storehash;
    //Get the site info
    var siteInfo = await site.findOne({
      where: {
        store_hash: storeHash
      }
    });
    //console.log(siteInfo.site_info);
    var decoded = Buffer.from(siteInfo.site_info, "base64").toString();
    var objx = JSON.parse(decoded);

    //Getting the access token from the site.
    var accessToken = objx.access_token;

    var clientInfo = await client.findOne({
      where: {
        id: siteInfo.client_id
      }
    });
    //Getting the Client id from the Client.
    var clientId = clientInfo.bcClientId;

    //Big commerce API
    const bigCommerce = new BigCommerce({
      clientId: clientId,
      accessToken: accessToken,
      storeHash: storeHash,
      responseType: "json",
      apiVersion: "v3"
    });
    var categoryId = escape(req.params.id);
    var limit =
      typeof req.params.limit !== "undefined" && req.params.limit !== null
        ? req.params.limit
        : 6;
    //Getting the category By ID
    bigCommerce
      .get(
        `/catalog/products/?limit=${limit}&categories:in=${categoryId}&include=images,primary_image`
      )
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      });
  }
};
