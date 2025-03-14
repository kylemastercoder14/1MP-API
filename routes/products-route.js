const router = require("express").Router();
const productController = require("../controllers/products-controller");

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/random", productController.getRandomProducts);

// Routes for category & subcategory filtering
router.get(
  "/categories/:categorySlug",
  productController.getProductsByCategoryAndSubCategory
);
router.get(
  "/categories/:categorySlug/sub-categories/:subCategorySlug",
  productController.getProductsByCategoryAndSubCategory
);

// Routes for product lookup by slug or ID
router.get("/slug/:slug", productController.getProductBySlug);
router.get("/:id", productController.getProductBySlug);

module.exports = router;
