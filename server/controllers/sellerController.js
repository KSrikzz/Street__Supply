const Order = require("../models/Order");
const Product = require("../models/Product");
// Place an Order
exports.placeOrder = async (req, res) => {
  try {
    const vendorId = req.user.id;
    const { sellerId, productId, quantity, deliveryDate, deliveryAddress, phoneNumber } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    if (product.quantity < quantity) {
      return res.status(400).json({ error: "Not enough stock" });
    }

    // Reduce stock
    product.quantity -= quantity;
    await product.save();

    const order = new Order({
      vendorId,
      sellerId,
      productId,
      quantity,
      deliveryDate,
      deliveryAddress,
      phoneNumber,
    });

    await order.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ error: "Failed to place order" });
  }
};

// Get Orders for a Seller
exports.getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const orders = await Order.find({ sellerId })
      .populate("productId", "name price")
      .populate("vendorId", "name email");

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to get orders" });
  }
};
