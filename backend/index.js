require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(helmet());
app.use(cookieParser());

// CORS Configuration for production and development
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins in demo mode
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

// Rate Limiting (Disabled for development)
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, 
//   max: 100,
//   message: "Too many requests from this IP, please try again later",
// });
// app.use("/api/", limiter);

/* ================= DATABASE ================= */
connectDB();

/* ================= ROUTES ================= */
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/ai", aiRoutes);

// Auto-seeding products and users if database is empty
const Product = require("./models/Product");
const User = require("./models/user");
const professionalProducts = require("./config/seedData");

const autoSeed = async () => {
  try {
    // Auto-seed products
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log("Database empty. Auto-seeding products...");
      await Product.insertMany(professionalProducts);
      console.log(`Successfully seeded ${professionalProducts.length} products.`);
    }

    // Auto-seed test users
    const existingAdmin = await User.findOne({ email: "anish.k.m9661@gmail.com" });
    const existingUser = await User.findOne({ email: "user@krishisathi.com" });

    if (!existingAdmin) {
      await User.create({
        name: "Admin User",
        email: "anish.k.m9661@gmail.com",
        password: "Anish@9661",
        role: "admin"
      });
      console.log("Created admin test user: anish.k.m9661@gmail.com / Anish@9661");
    }

    if (!existingUser) {
      await User.create({
        name: "Test Farmer",
        email: "user@krishisathi.com",
        password: "user123",
        role: "user"
      });
      console.log("Created regular test user: user@krishisathi.com / user123");
    }
  } catch (err) {
    console.error("Auto-seeding failed:", err);
  }
};
autoSeed();

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
