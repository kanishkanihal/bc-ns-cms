const router = require("express-promise-router")();
const BcController = require("../controllers/bcController");
const axios = require("axios");
const BigCommerce = require("node-bigcommerce");

router.get("/auth/:hashCode", BcController.auth);
router.get(
  "/load",
  async (req, res, next) => {
    try {
      //Middleware
      var clientId = req.session.clientId;
      var host = `${req.headers["x-forwarded-proto"]}://${req.headers.host}`;
      //Get the client by id.
      var client = await axios.get(`${host}/api/client/${clientId}`);
      //Set client specific parameters.
      client = client.data.rows[0];
      const bcSetting = {
        logLevel: "info",
        responseType: "json",
        clientId: client.bcClientId,
        secret: client.bcClientSecret
      };
      //Craete Bigcomerce object
      const bigCommerce = new BigCommerce(bcSetting);
      //verify
      const data = bigCommerce.verify(req.query["signed_payload"]);
      req.session.storehash = data.store_hash;
    } catch (error) {
      console.log(error);
      next(error);
    }

    next();
  },
  BcController.load
);

module.exports = router;
