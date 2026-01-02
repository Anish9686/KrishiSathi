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
router.get("/seed", async (req, res) => {
  try {
    const professionalProducts = [
      // FERTILIZERS
      {
        name: "Urea 46% Nitrogen Fertilizer (50kg)",
        description: "High-quality nitrogen fertilizer for optimal crop growth. Ideal for paddy, wheat, and vegetables. Promotes lush green foliage and increased yield.",
        mainCategory: "Fertilizers",
        subCategory: "Nitrogen",
        price: 580,
        stock: 150,
        imageUrl: "/products/products_urea_fertilizer_1767295182892.png"
      },
      {
        name: "DAP Fertilizer - Di-Ammonium Phosphate (50kg)",
        description: "Premium DAP fertilizer rich in phosphorus and nitrogen. Perfect for root development and early plant growth. Suitable for all soil types.",
        mainCategory: "Fertilizers",
        subCategory: "Phosphate",
        price: 1350,
        stock: 120,
        imageUrl: "/products/products_dap_fertilizer_1767295197980.png"
      },
      {
        name: "NPK 19:19:19 Balanced Fertilizer (50kg)",
        description: "Complete balanced fertilizer with equal NPK ratio. Provides all essential nutrients for healthy plant growth. Water-soluble formula.",
        mainCategory: "Fertilizers",
        subCategory: "Balanced",
        price: 1200,
        stock: 100,
        imageUrl: "/products/products_npk_fertilizer_1767295213330.png"
      },
      {
        name: "Potash - Muriate of Potash (50kg)",
        description: "High potassium content fertilizer for improved fruit quality and disease resistance. Essential for flowering and fruiting stages.",
        mainCategory: "Fertilizers",
        subCategory: "Potash",
        price: 950,
        stock: 90,
        imageUrl: "/products/products_potash_fertilizer_1767295391704.png"
      },
      {
        name: "Zinc Sulphate Micronutrient (1kg)",
        description: "Essential micronutrient for preventing zinc deficiency in crops. Improves plant immunity and grain quality. Water-soluble formula.",
        mainCategory: "Fertilizers",
        subCategory: "Micronutrients",
        price: 125,
        stock: 200,
        imageUrl: "/products/products_zinc_sulphate_1767295410477.png"
      },
      // ORGANIC PRODUCTS
      {
        name: "Organic Compost Fertilizer (25kg)",
        description: "100% organic compost enriched with beneficial microorganisms. Improves soil structure and water retention. Eco-friendly farming solution.",
        mainCategory: "Organic Products",
        subCategory: "Compost",
        price: 450,
        stock: 80,
        imageUrl: "/products/products_organic_compost_1767295227360.png"
      },
      {
        name: "Vermicompost Premium Grade (10kg)",
        description: "Premium quality vermicompost rich in nutrients and beneficial bacteria. Excellent for organic farming. Enhances soil fertility naturally.",
        mainCategory: "Organic Products",
        subCategory: "Vermicompost",
        price: 350,
        stock: 110,
        imageUrl: "/products/products_vermicompost_1767295364026.png"
      },
      // SEEDS
      {
        name: "Premium Wheat Seeds - HD 2967 (5kg)",
        description: "High-yielding wheat variety suitable for irrigated conditions. Disease-resistant with excellent grain quality. Certified seeds.",
        mainCategory: "Seeds",
        subCategory: "Cereals",
        price: 420,
        stock: 60,
        imageUrl: "/products/products_wheat_seeds_1767295243413.png"
      },
      {
        name: "Basmati Rice Seeds - Pusa 1121 (5kg)",
        description: "Premium Basmati rice seeds with extra-long grain. High yield potential with excellent aroma. Government certified variety.",
        mainCategory: "Seeds",
        subCategory: "Cereals",
        price: 890,
        stock: 45,
        imageUrl: "/products/products_rice_seeds_1767295259208.png"
      },
      {
        name: "Hybrid Tomato Seeds - Arka Rakshak (50g)",
        description: "Disease-resistant hybrid tomato seeds. Ideal for both open field and greenhouse cultivation. High yield with uniform fruiting.",
        mainCategory: "Seeds",
        subCategory: "Vegetables",
        price: 280,
        stock: 150,
        imageUrl: "/products/products_tomato_seeds_1767295428377.png"
      },
      // PESTICIDES & ORGANIC PROTECTION
      {
        name: "Organic Pesticide Spray (1L)",
        description: "Eco-friendly organic pesticide for effective pest control. Safe for beneficial insects. Certified for organic farming.",
        mainCategory: "Pesticides",
        subCategory: "Organic",
        price: 320,
        stock: 75,
        imageUrl: "/products/products_pesticide_spray_1767295332273.png"
      },
      {
        name: "Pure Neem Oil - Natural Pesticide (500ml)",
        description: "100% pure neem oil for organic pest management. Controls aphids, whiteflies, and mites. Non-toxic to beneficial insects.",
        mainCategory: "Pesticides",
        subCategory: "Organic",
        price: 250,
        stock: 95,
        imageUrl: "/products/products_neem_oil_1767295348781.png"
      },
      // TOOLS & EQUIPMENT
      {
        name: "Premium Garden Spade - Heavy Duty",
        description: "Professional-grade spade with ergonomic wooden handle. Rust-resistant steel blade. Perfect for digging and transplanting.",
        mainCategory: "Tools",
        subCategory: "Hand Tools",
        price: 450,
        stock: 40,
        imageUrl: "/products/products_spade_tool_1767295284801.png"
      },
      {
        name: "Manual Agriculture Sprayer Pump (16L)",
        description: "High-capacity manual sprayer with adjustable nozzle. Durable tank with comfortable shoulder strap. Multi-purpose agricultural use.",
        mainCategory: "Tools",
        subCategory: "Sprayers",
        price: 1150,
        stock: 35,
        imageUrl: "/products/products_sprayer_pump_1767295301485.png"
      },
      {
        name: "Drip Irrigation Kit - Complete Set",
        description: "Complete drip irrigation system for 1-acre coverage. Water-saving technology with adjustable drippers. Easy installation.",
        mainCategory: "Tools",
        subCategory: "Irrigation",
        price: 2850,
        stock: 25,
        imageUrl: "/products/products_drip_irrigation_1767295318884.png"
      },
      // ACCESSORIES
      {
        name: "Heavy-Duty Farming Gloves",
        description: "Reinforced farming gloves with excellent grip. Protects hands during farm work. Breathable and comfortable for long use.",
        mainCategory: "Accessories",
        subCategory: "Safety",
        price: 180,
        stock: 120,
        imageUrl: "/products/products_garden_gloves_1767295442726.png"
      },
      {
        name: "Digital Soil pH Meter with LCD",
        description: "Professional soil testing device with accurate pH measurement. LCD display for easy reading. Battery-operated with durable probe.",
        mainCategory: "Accessories",
        subCategory: "Testing",
        price: 680,
        stock: 50,
        imageUrl: "/products/products_soil_tester_1767295458634.png"
      }
    ];

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
