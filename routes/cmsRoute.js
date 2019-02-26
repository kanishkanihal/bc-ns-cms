const router = require("express-promise-router")();
const CMSController = require("../controllers/cmsController");

router.route("/").get(CMSController.getAllCMSBlocks);

module.exports = router;
