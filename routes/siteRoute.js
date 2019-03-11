const router = require("express-promise-router")();
const SiteController = require("../controllers/siteController");

router.use("/", function(req, res, next) {
  //Check the auth
  next();
});
router.get("/", SiteController.findAll);
router.get("/:id", SiteController.findById);
router.post("/", SiteController.create);
router.put("/:id", SiteController.update);
router.delete("/", SiteController.delete);

module.exports = router;
