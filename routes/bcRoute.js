const router = require("express-promise-router")();
const BcController = require("../controllers/bcController");

router.get("/auth", BcController.auth);
router.get("/load", BcController.load);

module.exports = router;
