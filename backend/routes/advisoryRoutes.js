// backend/routes/advisoryRoutes.js
const express = require("express");
const Advisory = require("../models/Advisory");
const router = express.Router();

// GET /api/advisories
router.get("/", async (req, res) => {
  try {
    const advisories = await Advisory.find().sort({ createdAt: -1 }).limit(50);
    res.json(advisories);
  } catch (err) {
    console.error("Get advisories error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// (optional) POST /api/advisories/seed - to seed demo advisories
router.get("/seed", async (req, res) => {
  try {
    const demo = [
      {
        title: "Paddy Sow Timing — North India (Rabi)",
        content:
          "Recommended sowing window for HD 2967 is late Oct–early Nov. Use recommended seed rate and seed treatment with Azospirillum.",
        tags: ["paddy", "sowing"],
        region: "North",
      },
      {
        title: "Soil pH correction before planting",
        content:
          "If pH < 6.0, apply lime at recommended rate from soil test. Use 50% of full dose 2 weeks before sowing.",
        tags: ["soil", "pH"],
        region: "All",
      },
    ];
    await Advisory.deleteMany({});
    await Advisory.insertMany(demo);
    res.json({ message: "Advisories seeded", count: demo.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Seed failed" });
  }
});

module.exports = router;
