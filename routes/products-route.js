const router = require("express").Router();
const productController = require("../controllers/products-controller");

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.get("/slug/:slug", productController.getProductBySlug);
router.get("/categories/:slug", productController.getProductByCategorySlug);
router.get(
  "/sub-categories/:slug",
  productController.getProductBySubCategorySlug
);

module.exports = router;
