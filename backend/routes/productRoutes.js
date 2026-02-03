const express = require("express");
const Product = require("../models/Product");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/* ================= PUBLIC ================= */
// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= ADMIN ================= */
// CREATE product (ADMIN)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to add product" });
  }
});

// DELETE product (ADMIN)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed" });
  }
});

// SEED PRODUCTS (CONVENIENCE)
const professionalProducts = require("../config/seedData");

router.get("/seed", async (req, res) => {
  try {

    await Product.deleteMany({});
    await Product.insertMany(professionalProducts);
    res.json({
      message: "Professional product catalog seeded successfully",
      count: professionalProducts.length
    });
  } catch (err) {
    console.error("Product seeding error:", err);
    res.status(500).json({ message: "Seeding failed", error: err.message });
  }
});

module.exports = router;
