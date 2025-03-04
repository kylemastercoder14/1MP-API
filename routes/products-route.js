const router = require("express").Router();
const productController = require("../controllers/products-controller");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.get("/:slug", productController.getProductBySlug);
router.get("/:categorySlug", productController.getProductByCategorySlug);

module.exports = router;
