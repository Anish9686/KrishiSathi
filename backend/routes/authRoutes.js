const express = require("express");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const User = require("../models/user");
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
    expiresIn: "1d", // Extended from 15m to 1d for better UX
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
    sameSite: "lax", // Changed from "strict" for cross-origin compatibility
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
    const existingAdmin = await User.findOne({ email: "anish.k.m9661@gmail.com" });
    const existingUser = await User.findOne({ email: "user@krishisathi.com" });

    const created = [];

    // Create admin user if not exists
    if (!existingAdmin) {
      await User.create({
        name: "Admin User",
        email: "anish.k.m9661@gmail.com",
        password: "Anish@9661",
        role: "admin"
      });
      created.push({ email: "anish.k.m9661@gmail.com", password: "Anish@9661", role: "admin" });
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
          { email: "anish.k.m9661@gmail.com", password: "Anish@9661", role: "admin" },
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

// =======================
// UPDATE ADMIN (One-time use)
// =======================
router.get("/update-admin", async (req, res) => {
  try {
    // Find and delete old admin
    await User.deleteOne({ email: "admin@krishisathi.com" });

    // Check if new admin exists
    const existingNewAdmin = await User.findOne({ email: "anish.k.m9661@gmail.com" });
    if (existingNewAdmin) {
      return res.json({ message: "New admin already exists", email: "anish.k.m9661@gmail.com" });
    }

    // Create new admin
    await User.create({
      name: "Admin User",
      email: "anish.k.m9661@gmail.com",
      password: "Anish@9661",
      role: "admin"
    });

    res.json({ message: "Admin updated successfully", email: "anish.k.m9661@gmail.com", password: "Anish@9661" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// =======================
// FIX ALL PRODUCT IMAGES (One-time use)
// =======================
router.get("/fix-images", async (req, res) => {
  try {
    const Product = require("../models/Product");

    // Image mapping: product name pattern -> local image path
    const imageMapping = [
      // Seeds - Vegetables
      { pattern: /green chilli/i, image: "/products/green_chilli_seeds.png" },
      { pattern: /brinjal/i, image: "/products/brinjal_seeds.png" },
      { pattern: /capsicum/i, image: "/products/capsicum_seeds.png" },
      { pattern: /cauliflower/i, image: "/products/cauliflower_seeds.png" },
      { pattern: /cabbage/i, image: "/products/cabbage_seeds.png" },
      { pattern: /spinach/i, image: "/products/spinach_seeds.png" },
      { pattern: /carrot/i, image: "/products/carrot_seeds.png" },
      { pattern: /radish/i, image: "/products/radish_seeds.png" },
      { pattern: /okra|bhindi/i, image: "/products/okra_seeds.png" },
      { pattern: /cucumber/i, image: "/products/cucumber_seeds.png" },
      { pattern: /pumpkin/i, image: "/products/pumpkin_seeds.png" },

      // Pesticides
      { pattern: /chlorpyrifos|insecticide/i, image: "/products/pesticide_insecticide_bottle_1768197327186.png" },
      { pattern: /carbendazim|fungicide/i, image: "/products/fungicide_powder_pack_1768197348108.png" },
      { pattern: /glyphosate|herbicide|2,4-d|pendimethalin/i, image: "/products/herbicide_bottle_1768197369630.png" },
      { pattern: /beauveria|bio.*pesticide/i, image: "/products/products_pesticide_spray_1767295332273.png" },
      { pattern: /zinc phosphide|rodenticide/i, image: "/products/products_pesticide_spray_1767295332273.png" },
      { pattern: /metaldehyde|snail|molluscicide/i, image: "/products/products_pesticide_spray_1767295332273.png" },
      { pattern: /fipronil/i, image: "/products/pesticide_insecticide_bottle_1768197327186.png" },
      { pattern: /abamectin|miticide/i, image: "/products/pesticide_insecticide_bottle_1768197327186.png" },
      { pattern: /thiamethoxam/i, image: "/products/pesticide_insecticide_bottle_1768197327186.png" },

      // Organic Products
      { pattern: /cow dung|manure/i, image: "/products/products_organic_compost_1767295227360.png" },
      { pattern: /green manure|dhaincha/i, image: "/products/generic_vegetable_seeds.png" },
      { pattern: /bone meal/i, image: "/products/bone_meal_fertilizer.png" },
      { pattern: /blood meal/i, image: "/products/blood_meal_fertilizer.png" },
      { pattern: /fish meal/i, image: "/products/fish_amino_acid_1767725805234.png" },
      { pattern: /mustard cake/i, image: "/products/products_organic_compost_1767295227360.png" },
      { pattern: /neem cake/i, image: "/products/neem_cake_organic.png" },
      { pattern: /panchagavya/i, image: "/products/panchagavya_organic.png" },
      { pattern: /jeevamrit/i, image: "/products/products_organic_compost_1767295227360.png" },
      { pattern: /bio.*compost/i, image: "/products/products_organic_compost_1767295227360.png" },

      // Tools
      { pattern: /hoe|weeding/i, image: "/products/hand_cultivator_1768197491409.png" },
      { pattern: /watering can/i, image: "/products/products_sprayer_pump_1767295301485.png" },
      { pattern: /hand fork/i, image: "/products/garden_trowel_1768197457469.png" },
      { pattern: /soil ph/i, image: "/products/products_soil_tester_1767295458634.png" },
      { pattern: /wheelbarrow/i, image: "/products/garden_tools_set_1768197383843.png" },
      { pattern: /fruit picker/i, image: "/products/pruning_shears_1768197399142.png" },
      { pattern: /post hole/i, image: "/products/products_spade_tool_1767295284801.png" },

      // Accessories
      { pattern: /rubber boots|gum boot/i, image: "/products/products_garden_gloves_1767295442726.png" },
      { pattern: /apron/i, image: "/products/products_garden_gloves_1767295442726.png" },
      { pattern: /seed tray/i, image: "/products/generic_vegetable_seeds.png" },
      { pattern: /plant label/i, image: "/products/garden_tools_set_1768197383843.png" },
      { pattern: /twine|jute/i, image: "/products/garden_tools_set_1768197383843.png" },
      { pattern: /mesh|bird net/i, image: "/products/garden_tools_set_1768197383843.png" },
      { pattern: /mulch|film/i, image: "/products/garden_tools_set_1768197383843.png" },
      { pattern: /shade net/i, image: "/products/products_drip_irrigation_1767295318884.png" },
      { pattern: /micro sprinkler/i, image: "/products/products_drip_irrigation_1767295318884.png" },

      // Equipment
      { pattern: /chaff cutter/i, image: "/products/power_tiller_machine.png" },
      { pattern: /power tiller/i, image: "/products/power_tiller_machine.png" },
      { pattern: /grain moisture/i, image: "/products/products_soil_tester_1767295458634.png" },
      { pattern: /winnowing/i, image: "/products/power_tiller_machine.png" },
      { pattern: /seed drill/i, image: "/products/power_tiller_machine.png" },
      { pattern: /reaper/i, image: "/products/power_tiller_machine.png" },
      { pattern: /paddy|thresher/i, image: "/products/power_tiller_machine.png" },
      { pattern: /rotavator/i, image: "/products/power_tiller_machine.png" },
      { pattern: /sprayer.*battery|battery.*sprayer/i, image: "/products/products_sprayer_pump_1767295301485.png" },
      { pattern: /brush cutter/i, image: "/products/power_tiller_machine.png" },
      { pattern: /water pump|submersible/i, image: "/products/products_drip_irrigation_1767295318884.png" },
      { pattern: /generator/i, image: "/products/power_tiller_machine.png" },
      { pattern: /npk.*soil.*kit|soil.*test/i, image: "/products/products_soil_tester_1767295458634.png" },
    ];

    // Find all products with external URLs (https://)
    const productsToFix = await Product.find({
      imageUrl: { $regex: /^https?:\/\// }
    });

    let updatedCount = 0;
    const updates = [];

    for (const product of productsToFix) {
      let newImageUrl = "/products/generic_vegetable_seeds.png"; // default fallback

      // Find matching pattern
      for (const mapping of imageMapping) {
        if (mapping.pattern.test(product.name)) {
          newImageUrl = mapping.image;
          break;
        }
      }

      await Product.updateOne(
        { _id: product._id },
        { $set: { imageUrl: newImageUrl } }
      );

      updates.push({
        name: product.name,
        oldUrl: product.imageUrl.substring(0, 50) + "...",
        newUrl: newImageUrl
      });
      updatedCount++;
    }

    res.json({
      message: `Fixed ${updatedCount} product images`,
      updates
    });
  } catch (error) {
    console.error("FIX IMAGES ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// =======================
// FIX ALL PRODUCT IMAGES (Apply mapping to ALL products)
// =======================
router.get("/fix-all-products", async (req, res) => {
  try {
    const Product = require("../models/Product");

    // Comprehensive image mapping - unique image for each product
    const imageMapping = [
      // Seeds - Vegetables (each gets unique image)
      { pattern: /green chilli/i, image: "/products/green_chilli_seeds.png" },
      { pattern: /brinjal/i, image: "/products/brinjal_seeds.png" },
      { pattern: /capsicum/i, image: "/products/capsicum_seeds.png" },
      { pattern: /cauliflower/i, image: "/products/cauliflower_seeds.png" },
      { pattern: /cabbage/i, image: "/products/cabbage_seeds.png" },
      { pattern: /spinach/i, image: "/products/spinach_seeds.png" },
      { pattern: /carrot/i, image: "/products/carrot_seeds.png" },
      { pattern: /radish/i, image: "/products/radish_seeds.png" },
      { pattern: /okra|bhindi/i, image: "/products/okra_seeds.png" },
      { pattern: /cucumber/i, image: "/products/cucumber_seeds.png" },
      { pattern: /pumpkin/i, image: "/products/pumpkin_seeds.png" },
      { pattern: /tomato/i, image: "/products/products_tomato_seeds_1767295428377.png" },
      { pattern: /onion/i, image: "/products/onion_seeds_pack_1768197310773.png" },
      { pattern: /soybean/i, image: "/products/soybean_seeds_pack_1768197267228.png" },
      { pattern: /groundnut/i, image: "/products/groundnut_seeds_pack_1768197288471.png" },
      { pattern: /maize|corn/i, image: "/products/hybrid_maize_seeds_1768197216992.png" },
      { pattern: /wheat/i, image: "/products/wheat_seeds_1767725848721.png" },
      { pattern: /rice|paddy seed/i, image: "/products/products_rice_seeds_1767295259208.png" },
      { pattern: /mustard.*seed/i, image: "/products/mustard_seeds_pack_1768197232816.png" },
      { pattern: /cotton/i, image: "/products/cotton_seeds_hybrid_1768197250528.png" },

      // Organic Products (unique images)
      { pattern: /bone meal/i, image: "/products/bone_meal_fertilizer.png" },
      { pattern: /blood meal/i, image: "/products/blood_meal_fertilizer.png" },
      { pattern: /neem cake/i, image: "/products/neem_cake_organic.png" },
      { pattern: /panchagavya/i, image: "/products/panchagavya_organic.png" },
      { pattern: /cow dung/i, image: "/products/products_organic_compost_1767295227360.png" },
      { pattern: /green manure|dhaincha/i, image: "/products/generic_vegetable_seeds.png" },
      { pattern: /fish meal/i, image: "/products/fish_amino_acid_1767725805234.png" },
      { pattern: /mustard cake/i, image: "/products/humic_acid_1767725830621.png" },
      { pattern: /jeevamrit/i, image: "/products/seaweed_extract_1767725788658.png" },
      { pattern: /bio.*compost/i, image: "/products/products_vermicompost_1767295364026.png" },
      { pattern: /vermicompost/i, image: "/products/products_vermicompost_1767295364026.png" },
      { pattern: /organic.*compost/i, image: "/products/products_organic_compost_1767295227360.png" },

      // Equipment (each gets unique image from available tools/equipment)
      { pattern: /chaff cutter/i, image: "/products/stand_up_weeder_1768197516042.png" },
      { pattern: /power tiller/i, image: "/products/power_tiller_machine.png" },
      { pattern: /thresher/i, image: "/products/hand_cultivator_1768197491409.png" },
      { pattern: /rotavator/i, image: "/products/khurpi_weeding_tool_1768197437337.png" },
      { pattern: /reaper/i, image: "/products/garden_rake_1768197414071.png" },
      { pattern: /seed drill/i, image: "/products/garden_tools_set_1768197383843.png" },
      { pattern: /winnowing/i, image: "/products/bow_saw_1768197551307.png" },
      { pattern: /brush cutter/i, image: "/products/hedge_trimmer_manual_1768197532149.png" },
      { pattern: /generator/i, image: "/products/products_sprayer_pump_1767295301485.png" },
      { pattern: /water pump|submersible/i, image: "/products/products_drip_irrigation_1767295318884.png" },
      { pattern: /grain moisture/i, image: "/products/products_soil_tester_1767295458634.png" },
      { pattern: /npk.*soil|soil.*test/i, image: "/products/products_soil_tester_1767295458634.png" },

      // Tools (each unique)
      { pattern: /spade/i, image: "/products/products_spade_tool_1767295284801.png" },
      { pattern: /sprayer|pump/i, image: "/products/products_sprayer_pump_1767295301485.png" },
      { pattern: /hoe|weeding tool/i, image: "/products/khurpi_weeding_tool_1768197437337.png" },
      { pattern: /watering can/i, image: "/products/products_drip_irrigation_1767295318884.png" },
      { pattern: /hand fork/i, image: "/products/garden_trowel_1768197457469.png" },
      { pattern: /pruning.*shear/i, image: "/products/pruning_shears_1768197399142.png" },
      { pattern: /rake/i, image: "/products/garden_rake_1768197414071.png" },
      { pattern: /trowel/i, image: "/products/garden_trowel_1768197457469.png" },
      { pattern: /cultivator/i, image: "/products/hand_cultivator_1768197491409.png" },
      { pattern: /grafting/i, image: "/products/grafting_knife_1768197473876.png" },
      { pattern: /saw/i, image: "/products/bow_saw_1768197551307.png" },
      { pattern: /hedge.*trimmer/i, image: "/products/hedge_trimmer_manual_1768197532149.png" },
      { pattern: /weeder/i, image: "/products/stand_up_weeder_1768197516042.png" },

      // Accessories (unique)
      { pattern: /gloves/i, image: "/products/products_garden_gloves_1767295442726.png" },
      { pattern: /knee.*pad/i, image: "/products/knee_pads_farming_1768197568892.png" },
      { pattern: /sun.*hat/i, image: "/products/sun_hat_farming_1768197594824.png" },
      { pattern: /rubber boots|gum boot/i, image: "/products/knee_pads_farming_1768197568892.png" },
      { pattern: /apron/i, image: "/products/sun_hat_farming_1768197594824.png" },
      { pattern: /drip.*irrigation/i, image: "/products/products_drip_irrigation_1767295318884.png" },

      // Pesticides (each unique)
      { pattern: /chlorpyrifos/i, image: "/products/pesticide_insecticide_bottle_1768197327186.png" },
      { pattern: /carbendazim/i, image: "/products/fungicide_powder_pack_1768197348108.png" },
      { pattern: /glyphosate/i, image: "/products/herbicide_bottle_1768197369630.png" },
      { pattern: /2,4-d/i, image: "/products/products_pesticide_spray_1767295332273.png" },
      { pattern: /pendimethalin/i, image: "/products/products_neem_oil_1767295348781.png" },
      { pattern: /beauveria|bio.*pesticide/i, image: "/products/bio_npk_1767725622701.png" },
      { pattern: /zinc phosphide|rodenticide/i, image: "/products/products_zinc_sulphate_1767295410477.png" },
      { pattern: /metaldehyde|snail|molluscicide/i, image: "/products/gypsum_fertilizer_1767725756307.png" },
      { pattern: /fipronil/i, image: "/products/iron_chelate_1767725668713.png" },
      { pattern: /abamectin|miticide/i, image: "/products/manganese_sulphate_1767725691538.png" },
      { pattern: /thiamethoxam/i, image: "/products/copper_sulphate_1767725713529.png" },
      { pattern: /imidacloprid/i, image: "/products/boron_micronutrient_1767725650232.png" },
      { pattern: /mancozeb/i, image: "/products/sulphur_granules_1767725733306.png" },

      // Fertilizers (unique)
      { pattern: /urea/i, image: "/products/urea_fertilizer_1767725462896.png" },
      { pattern: /dap/i, image: "/products/dap_fertilizer_1767725478757.png" },
      { pattern: /npk/i, image: "/products/npk_fertilizer_1767725496596.png" },
      { pattern: /potash/i, image: "/products/potash_fertilizer_1767725514019.png" },
      { pattern: /super.*phosphate/i, image: "/products/super_phosphate_1767725568681.png" },
      { pattern: /ammonium.*sulphate/i, image: "/products/ammonium_sulphate_1767725584784.png" },
      { pattern: /calcium.*nitrate/i, image: "/products/calcium_nitrate_1767725603972.png" },
      { pattern: /zinc.*sulphate/i, image: "/products/zinc_sulphate_1767725552612.png" },
      { pattern: /humic.*acid/i, image: "/products/humic_acid_1767725830621.png" },
      { pattern: /seaweed/i, image: "/products/seaweed_extract_1767725788658.png" },
    ];

    // Get ALL products
    const allProducts = await Product.find({});
    let updatedCount = 0;
    const updates = [];

    for (const product of allProducts) {
      let matchedImage = null;

      // Find matching pattern
      for (const mapping of imageMapping) {
        if (mapping.pattern.test(product.name)) {
          matchedImage = mapping.image;
          break;
        }
      }

      // Only update if we found a match and it's different from current
      if (matchedImage && product.imageUrl !== matchedImage) {
        await Product.updateOne(
          { _id: product._id },
          { $set: { imageUrl: matchedImage } }
        );

        updates.push({
          name: product.name,
          oldUrl: product.imageUrl?.substring(0, 40) + "...",
          newUrl: matchedImage
        });
        updatedCount++;
      }
    }

    res.json({
      message: `Fixed ${updatedCount} product images out of ${allProducts.length} total products`,
      updates
    });
  } catch (error) {
    console.error("FIX ALL PRODUCTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
