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
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
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

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
