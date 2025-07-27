const Product = require("../models/Product");

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const sellerId = req.user.id;

    const newProduct = new Product({ name, quantity, price, sellerId });
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    res.status(500).json({ error: "Failed to add product" });
  }
};

// Get All Products (for vendor)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("sellerId", "name email");
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Get Products of Logged-in Seller
exports.getMyProducts = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const products = await Product.find({ sellerId });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch your products" });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, price } = req.body;

    const product = await Product.findById(id);
    if (product.sellerId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    product.name = name;
    product.quantity = quantity;
    product.price = price;
    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (err) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (product.sellerId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
