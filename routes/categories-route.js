const router = require("express").Router();
const categoryController = require("../controllers/categories-controller");

router.get("/", categoryController.getAllCategories);

module.exports = router;
