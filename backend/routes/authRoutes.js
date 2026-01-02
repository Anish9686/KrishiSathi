const express = require("express");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const User = require("../models/User");
const validate = require("../middleware/validationMiddleware");
const { registerSchema, loginSchema } = require("../schemas/authSchema");

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per 15 minutes
  message: "Too many attempts, please try again in 15 minutes",
});

// =======================
// Generate Tokens
// =======================
const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const sendTokens = (user, res, statusCode = 200) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  res.status(statusCode).json({
    token: accessToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

// =======================
// REGISTER
// =======================
router.post("/register", authLimiter, validate(registerSchema), async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    sendTokens(user, res, 201);
  } catch (error) {
    console.error("REGISTER ERROR 👇");
    console.error(error); // 🔥 THIS WAS MISSING
    res.status(500).json({ message: error.message });
  }
});

// =======================
// LOGIN
// =======================
router.post("/login", authLimiter, validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    sendTokens(user, res, 200);
  } catch (error) {
    console.error("LOGIN ERROR 👇");
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// =======================
// REFRESH TOKEN
// =======================
router.get("/refresh", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const accessToken = generateAccessToken(user);
    res.json({ token: accessToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
});

// =======================
// LOGOUT
// =======================
router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
});

// =======================
// SEED TEST USERS (Development Only)
// =======================
router.get("/seed", async (req, res) => {
  try {
    // Check if users already exist
    const existingAdmin = await User.findOne({ email: "admin@krishisathi.com" });
    const existingUser = await User.findOne({ email: "user@krishisathi.com" });

    const created = [];

    // Create admin user if not exists
    if (!existingAdmin) {
      await User.create({
        name: "Admin User",
        email: "admin@krishisathi.com",
        password: "admin123",
        role: "admin"
      });
      created.push({ email: "admin@krishisathi.com", password: "admin123", role: "admin" });
    }

    // Create regular user if not exists
    if (!existingUser) {
      await User.create({
        name: "Test Farmer",
        email: "user@krishisathi.com",
        password: "user123",
        role: "user"
      });
      created.push({ email: "user@krishisathi.com", password: "user123", role: "user" });
    }

    if (created.length === 0) {
      return res.json({
        message: "Test users already exist",
        users: [
          { email: "admin@krishisathi.com", password: "admin123", role: "admin" },
          { email: "user@krishisathi.com", password: "user123", role: "user" }
        ]
      });
    }

    res.json({
      message: "Test users created successfully",
      created
    });
  } catch (error) {
    console.error("SEED ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

