const express = require("express");
const router = express.Router();
const { placeOrder, getSellerOrders } = require("../controllers/orderController");
const authenticate = require("../middleware/authMiddleware");

// Add this:
router.get("/seller", authenticate, getSellerOrders);
router.post("/place", authenticate, placeOrder);

module.exports = router;
