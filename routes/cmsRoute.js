const router = require("express-promise-router")();
const CMSController = require("../controllers/cmsController");

router.get('/',CMSController.findAll)
router.get('/:id',CMSController.findById)
router.post('/',CMSController.create)
router.put('/:id',CMSController.update)
router.delete('/',CMSController.delete)

module.exports = router;
