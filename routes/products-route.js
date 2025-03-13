const router = require("express").Router();
const productController = require("../controllers/products-controller");

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);

// Place these BEFORE the dynamic `/:id` route
router.get("/categories/:slug", productController.getProductByCategorySlug);
router.get(
  "/sub-categories/:slug",
  productController.getProductBySubCategorySlug
);

router.get("/slug/:slug", productController.getProductBySlug);
router.get("/:id", productController.getProductById);

module.exports = router;
