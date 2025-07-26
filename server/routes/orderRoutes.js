const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authenticate = require("../middleware/authenticate");

// Vendor places an order to a seller
router.post("/place", authenticate(["vendor"]), orderController.placeOrder);

// Seller views orders placed on them
router.get("/seller-orders", authenticate(["seller"]), orderController.getSellerOrders);

module.exports = router;
