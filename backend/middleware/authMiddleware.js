const jwt = require("jsonwebtoken");

/* ================= PROTECT ================= */
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Contains id and role (if added)
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token expired or invalid" });
  }
};

/* ================= ADMIN ONLY ================= */
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Admin only" });
  }
};

module.exports = { protect, adminOnly };
