const router = require("express-promise-router")();
const CMSController = require("../controllers/cmsController");

router.use("/", function(req, res, next) {
  //Check the auth
  next();
});
router.get("/:hash?", CMSController.findAll);
router.get("/:id", CMSController.findById);
router.post("/", CMSController.create);
router.put("/:id", CMSController.update);
router.delete("/", CMSController.delete);

module.exports = router;
