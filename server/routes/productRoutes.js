const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authenticate = require("../middleware/authenticate");

// Only seller can manage their products
router.post("/add", authenticate(["seller"]), productController.addProduct);
router.get("/my-products", authenticate(["seller"]), productController.getMyProducts);
router.put("/update/:id", authenticate(["seller"]), productController.updateProduct);
router.delete("/delete/:id", authenticate(["seller"]), productController.deleteProduct);


// Vendor can view all products
router.get("/all", authenticate(["vendor"]), productController.getAllProducts);

router.post('/add', authenticate, async (req, res) => {
  // Now res will not be undefined
});

module.exports = router;
