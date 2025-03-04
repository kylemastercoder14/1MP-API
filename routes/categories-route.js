const router = require("express").Router();
const categoryController = require("../controllers/categories-controller");

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.get("/:slug", categoryController.getCategoryBySlug);

module.exports = router;
