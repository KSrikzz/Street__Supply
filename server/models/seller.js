const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  deliveryDate: { type: Date, required: true },
  deliveryAddress: { type: String, required: true },
  phoneNumber: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
