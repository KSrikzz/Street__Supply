const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: existingUser.role,
      email: existingUser.username
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.registerUser = async (req, res) => {
  const { name, username, email, password, role } = req.body;

  console.log("📥 Registration request received:", req.body);

  if (!name || !username || !email || !password || !role) {
    console.log("❌ Missing required fields");
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const existing = await User.findOne({ username });
    if (existing) {
      console.log("⚠️ Username already exists");
      return res.status(400).json({ message: "Username already taken" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ name, username, email, password: hashed, role });

    await newUser.save();

    console.log("✅ New user saved:", newUser.username);
    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ message: "Registration error" });
  }
};
