const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = (roles = []) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Access token missing" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user || (roles.length && !roles.includes(user.role))) {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      req.user = { id: user._id, role: user.role };
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid or expired token" });
    }
  };
};

module.exports = authenticate;
