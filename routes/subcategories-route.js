const router = require("express").Router();
const subCategoryController = require("../controllers/subcategories-controller");

router.post("/", subCategoryController.createSubCategories);
router.get(
  "/:categorySlug",
  subCategoryController.getAllSubCategoriesByCategorySlug
);

module.exports = router;
