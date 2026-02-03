const professionalProducts = [
    // ==================== FERTILIZERS (18 products) ====================
    // Using AI-generated product images for fertilizers
    {
        name: "Urea 46% Nitrogen Fertilizer (50kg)",
        description: "High-quality nitrogen fertilizer for optimal crop growth. Ideal for paddy, wheat, and vegetables. Promotes lush green foliage and increased yield.",
        mainCategory: "Fertilizers",
        subCategory: "Nitrogen",
        price: 580,
        stock: 150,
        imageUrl: "/products/urea_fertilizer_1767725462896.png"
    },
    {
        name: "DAP Fertilizer - Di-Ammonium Phosphate (50kg)",
        description: "Premium DAP fertilizer rich in phosphorus and nitrogen. Perfect for root development and early plant growth. Suitable for all soil types.",
        mainCategory: "Fertilizers",
        subCategory: "Phosphate",
        price: 1350,
        stock: 120,
        imageUrl: "/products/dap_fertilizer_1767725478757.png"
    },
    {
        name: "NPK 19:19:19 Balanced Fertilizer (50kg)",
        description: "Complete balanced fertilizer with equal NPK ratio. Provides all essential nutrients for healthy plant growth. Water-soluble formula.",
        mainCategory: "Fertilizers",
        subCategory: "Balanced",
        price: 1200,
        stock: 100,
        imageUrl: "/products/npk_fertilizer_1767725496596.png"
    },
    {
        name: "Potash - Muriate of Potash (50kg)",
        description: "High potassium content fertilizer for improved fruit quality and disease resistance. Essential for flowering and fruiting stages.",
        mainCategory: "Fertilizers",
        subCategory: "Potash",
        price: 950,
        stock: 90,
        imageUrl: "/products/potash_fertilizer_1767725514019.png"
    },
    {
        name: "Zinc Sulphate Micronutrient (1kg)",
        description: "Essential micronutrient for preventing zinc deficiency in crops. Improves plant immunity and grain quality. Water-soluble formula.",
        mainCategory: "Fertilizers",
        subCategory: "Micronutrients",
        price: 125,
        stock: 200,
        imageUrl: "/products/zinc_sulphate_1767725552612.png"
    },
    {
        name: "Super Phosphate Single (50kg)",
        description: "Excellent source of phosphorus and calcium. Promotes strong root system and early maturity. Ideal for legumes and pulses.",
        mainCategory: "Fertilizers",
        subCategory: "Phosphate",
        price: 480,
        stock: 85,
        imageUrl: "/products/super_phosphate_1767725568681.png"
    },
    {
        name: "Ammonium Sulphate (50kg)",
        description: "Nitrogen and sulphur fertilizer for crops requiring both nutrients. Excellent for tea, coffee, and sugarcane cultivation.",
        mainCategory: "Fertilizers",
        subCategory: "Nitrogen",
        price: 620,
        stock: 110,
        imageUrl: "/products/ammonium_sulphate_1767725584784.png"
    },
    {
        name: "Calcium Nitrate (25kg)",
        description: "Fast-acting calcium and nitrogen source. Prevents blossom end rot in tomatoes and peppers. Water-soluble for fertigation.",
        mainCategory: "Fertilizers",
        subCategory: "Calcium",
        price: 890,
        stock: 75,
        imageUrl: "/products/calcium_nitrate_1767725603972.png"
    },
    {
        name: "Bio-NPK Biofertilizer (5kg)",
        description: "Consortium of nitrogen-fixing, phosphate-solubilizing, and potash-mobilizing bacteria. Eco-friendly soil enrichment solution.",
        mainCategory: "Fertilizers",
        subCategory: "Biofertilizer",
        price: 450,
        stock: 95,
        imageUrl: "/products/bio_npk_1767725622701.png"
    },
    {
        name: "Boron 20% Micronutrient (1kg)",
        description: "Essential for cell wall development and pollen germination. Prevents hollow heart in brassicas. Suitable for foliar application.",
        mainCategory: "Fertilizers",
        subCategory: "Micronutrients",
        price: 320,
        stock: 130,
        imageUrl: "/products/boron_micronutrient_1767725650232.png"
    },
    {
        name: "Iron Chelate EDDHA 6% (1kg)",
        description: "Highly effective iron supplement for alkaline soils. Corrects iron chlorosis quickly. Long-lasting effect in soil.",
        mainCategory: "Fertilizers",
        subCategory: "Micronutrients",
        price: 1450,
        stock: 45,
        imageUrl: "/products/iron_chelate_1767725668713.png"
    },
    {
        name: "Manganese Sulphate (5kg)",
        description: "Essential for photosynthesis and enzyme activation. Corrects manganese deficiency symptoms. Water-soluble formulation.",
        mainCategory: "Fertilizers",
        subCategory: "Micronutrients",
        price: 280,
        stock: 88,
        imageUrl: "/products/manganese_sulphate_1767725691538.png"
    },
    {
        name: "Copper Sulphate Pentahydrate (1kg)",
        description: "Micronutrient for healthy plant growth and disease prevention. Also used as fungicide in Bordeaux mixture. High purity grade.",
        mainCategory: "Fertilizers",
        subCategory: "Micronutrients",
        price: 190,
        stock: 150,
        imageUrl: "/products/copper_sulphate_1767725713529.png"
    },
    {
        name: "Sulphur 90% Granules (25kg)",
        description: "Essential secondary nutrient for oilseeds and pulses. Improves protein content and oil yield. Slow-release formulation.",
        mainCategory: "Fertilizers",
        subCategory: "Secondary Nutrients",
        price: 750,
        stock: 65,
        imageUrl: "/products/sulphur_granules_1767725733306.png"
    },
    {
        name: "Agricultural Gypsum (50kg)",
        description: "Calcium and sulphur source for soil amendment. Improves soil structure in sodic soils. Enhances groundnut pod filling.",
        mainCategory: "Fertilizers",
        subCategory: "Soil Amendment",
        price: 320,
        stock: 180,
        imageUrl: "/products/gypsum_fertilizer_1767725756307.png"
    },
    {
        name: "Humic Acid 98% Flakes (1kg)",
        description: "Organic soil conditioner that improves nutrient uptake. Enhances soil microbial activity. Increases water retention capacity.",
        mainCategory: "Fertilizers",
        subCategory: "Organic Enhancer",
        price: 680,
        stock: 70,
        imageUrl: "/products/humic_acid_1767725830621.png"
    },
    {
        name: "Seaweed Extract Concentrate (1L)",
        description: "Natural bio-stimulant from marine algae. Promotes root growth and stress tolerance. Rich in cytokinins and auxins.",
        mainCategory: "Fertilizers",
        subCategory: "Bio-stimulant",
        price: 540,
        stock: 90,
        imageUrl: "/products/seaweed_extract_1767725788658.png"
    },
    {
        name: "Fish Amino Acid Fertilizer (5L)",
        description: "Organic liquid fertilizer rich in amino acids and proteins. Improves plant vigor and yield. Suitable for all crops.",
        mainCategory: "Fertilizers",
        subCategory: "Organic Liquid",
        price: 890,
        stock: 55,
        imageUrl: "/products/fish_amino_acid_1767725805234.png"
    },

    // ==================== SEEDS (20 products) ====================
    {
        name: "Premium Wheat Seeds - HD 2967 (5kg)",
        description: "High-yielding wheat variety suitable for irrigated conditions. Disease-resistant with excellent grain quality. Certified seeds.",
        mainCategory: "Seeds",
        subCategory: "Cereals",
        price: 420,
        stock: 60,
        imageUrl: "/products/wheat_seeds_1767725848721.png"
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
    {
        name: "Hybrid Maize Seeds - Pioneer P3396 (5kg)",
        description: "High-yielding hybrid maize for grain and fodder. Excellent standability and drought tolerance. Superior grain quality.",
        mainCategory: "Seeds",
        subCategory: "Cereals",
        price: 1250,
        stock: 40,
        imageUrl: "/products/hybrid_maize_seeds_1768197216992.png"
    },
    {
        name: "Yellow Mustard Seeds - Pusa Bold (2kg)",
        description: "High oil content mustard variety. Early maturing with good yield potential. Resistant to white rust disease.",
        mainCategory: "Seeds",
        subCategory: "Oilseeds",
        price: 180,
        stock: 80,
        imageUrl: "/products/mustard_seeds_pack_1768197232816.png"
    },
    {
        name: "Bt Cotton Hybrid Seeds (450g)",
        description: "Bollworm resistant cotton hybrid. High ginning percentage with superior fiber quality. Suitable for irrigated conditions.",
        mainCategory: "Seeds",
        subCategory: "Cash Crops",
        price: 950,
        stock: 35,
        imageUrl: "/products/cotton_seeds_hybrid_1768197250528.png"
    },
    {
        name: "Soybean Seeds - JS 335 (10kg)",
        description: "High-yielding soybean variety with good oil content. Resistant to major diseases. Suitable for both kharif and rabi seasons.",
        mainCategory: "Seeds",
        subCategory: "Pulses",
        price: 750,
        stock: 55,
        imageUrl: "/products/soybean_seeds_pack_1768197267228.png"
    },
    {
        name: "Groundnut Seeds - TAG 24 (10kg)",
        description: "Spanish bunch type groundnut variety. High oil content and good shelling percentage. Short duration variety.",
        mainCategory: "Seeds",
        subCategory: "Oilseeds",
        price: 680,
        stock: 48,
        imageUrl: "/products/groundnut_seeds_pack_1768197288471.png"
    },
    {
        name: "Onion Seeds - Pusa Red (500g)",
        description: "Deep red colored onion variety with good storage quality. High pungency and excellent market demand. Certified seeds.",
        mainCategory: "Seeds",
        subCategory: "Vegetables",
        price: 450,
        stock: 65,
        imageUrl: "/products/onion_seeds_pack_1768197310773.png"
    },
    {
        name: "Green Chilli Seeds - Pusa Jwala (100g)",
        description: "High yielding chilli variety with pungent fruits. Long green fruits suitable for fresh market. Disease tolerant.",
        mainCategory: "Seeds",
        subCategory: "Vegetables",
        price: 320,
        stock: 120,
        imageUrl: "/products/green_chilli_seeds.png"
    },
    {
        name: "Brinjal Seeds - Pusa Purple Long (50g)",
        description: "Long purple brinjal variety with glossy skin. High productivity and good cooking quality. Resistant to bacterial wilt.",
        mainCategory: "Seeds",
        subCategory: "Vegetables",
        price: 180,
        stock: 140,
        imageUrl: "/products/brinjal_seeds.png"
    },
    {
        name: "Capsicum Seeds - California Wonder (25g)",
        description: "Large blocky sweet pepper variety. Bright green turning red at maturity. Perfect for salads and stuffing.",
        mainCategory: "Seeds",
        subCategory: "Vegetables",
        price: 390,
        stock: 85,
        imageUrl: "/products/capsicum_seeds.png"
    },
    {
        name: "Cauliflower Seeds - Pusa Snowball (50g)",
        description: "White, compact curd cauliflower variety. Suitable for main season cultivation. High vitamin C content.",
        mainCategory: "Seeds",
        subCategory: "Vegetables",
        price: 420,
        stock: 75,
        imageUrl: "/products/cauliflower_seeds.png"
    },
    {
        name: "Cabbage Seeds - Pride of India (50g)",
        description: "Round head cabbage with tight wrapper leaves. Excellent for fresh market and processing. Good shelf life.",
        mainCategory: "Seeds",
        subCategory: "Vegetables",
        price: 350,
        stock: 90,
        imageUrl: "/products/cabbage_seeds.png"
    },
    {
        name: "Spinach Seeds - All Green (500g)",
        description: "Quick growing leafy vegetable with dark green leaves. Rich in iron and vitamins. Multiple harvests possible.",
        mainCategory: "Seeds",
        subCategory: "Leafy Vegetables",
        price: 120,
        stock: 200,
        imageUrl: "/products/spinach_seeds.png"
    },
    {
        name: "Carrot Seeds - Nantes (100g)",
        description: "Sweet cylindrical carrot variety with orange-red color. Smooth skin with small core. High beta-carotene content.",
        mainCategory: "Seeds",
        subCategory: "Root Vegetables",
        price: 280,
        stock: 110,
        imageUrl: "/products/carrot_seeds.png"
    },
    {
        name: "Radish Seeds - Pusa Chetki (500g)",
        description: "Fast maturing radish variety suitable for summer. Mild pungency with crisp texture. Ready in 25-30 days.",
        mainCategory: "Seeds",
        subCategory: "Root Vegetables",
        price: 95,
        stock: 180,
        imageUrl: "/products/radish_seeds.png"
    },
    {
        name: "Okra Seeds - Pusa A-4 (500g)",
        description: "High yielding bhindi variety with dark green pods. Tender and non-fibrous. Resistant to yellow vein mosaic virus.",
        mainCategory: "Seeds",
        subCategory: "Vegetables",
        price: 240,
        stock: 130,
        imageUrl: "/products/okra_seeds.png"
    },
    {
        name: "Cucumber Seeds - Poinsette (100g)",
        description: "Dark green slicing cucumber variety. Uniform fruit with excellent taste. Disease tolerant and high yielding.",
        mainCategory: "Seeds",
        subCategory: "Vegetables",
        price: 195,
        stock: 95,
        imageUrl: "/products/cucumber_seeds.png"
    },
    {
        name: "Pumpkin Seeds - Arka Suryamukhi (50g)",
        description: "Medium sized orange pumpkin variety. Sweet flesh excellent for cooking. Good storage quality.",
        mainCategory: "Seeds",
        subCategory: "Vegetables",
        price: 145,
        stock: 105,
        imageUrl: "/products/pumpkin_seeds.png"
    },

    // ==================== PESTICIDES (15 products) ====================
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
    {
        name: "Imidacloprid 17.8% SL (250ml)",
        description: "Systemic insecticide for sucking pest control. Effective against aphids, jassids, and whiteflies. Long residual activity.",
        mainCategory: "Pesticides",
        subCategory: "Insecticide",
        price: 380,
        stock: 120,
        imageUrl: "/products/pesticide_insecticide_bottle_1768197327186.png"
    },
    {
        name: "Chlorpyrifos 20% EC (1L)",
        description: "Broad-spectrum contact insecticide. Controls termites, cutworms, and soil insects. Suitable for soil application.",
        mainCategory: "Pesticides",
        subCategory: "Insecticide",
        price: 420,
        stock: 85,
        imageUrl: "/products/chlorpyrifos_pesticide.png"
    },
    {
        name: "Mancozeb 75% WP (500g)",
        description: "Contact fungicide for control of various fungal diseases. Protective action on leaf surface. Multi-site mode of action.",
        mainCategory: "Pesticides",
        subCategory: "Fungicide",
        price: 280,
        stock: 150,
        imageUrl: "/products/fungicide_powder_pack_1768197348108.png"
    },
    {
        name: "Carbendazim 50% WP (500g)",
        description: "Systemic fungicide for wide range of diseases. Controls powdery mildew, anthracnose, and rust. Seed treatment compatible.",
        mainCategory: "Pesticides",
        subCategory: "Fungicide",
        price: 350,
        stock: 110,
        imageUrl: "/products/carbendazim_fungicide.png"
    },
    {
        name: "Glyphosate 41% SL (1L)",
        description: "Non-selective systemic herbicide. Controls annual and perennial weeds. For pre-planting or directed application only.",
        mainCategory: "Pesticides",
        subCategory: "Herbicide",
        price: 520,
        stock: 70,
        imageUrl: "/products/herbicide_bottle_1768197369630.png"
    },
    {
        name: "2,4-D Amine Salt 58% SL (1L)",
        description: "Selective herbicide for broad-leaf weed control. Safe for cereal crops like wheat and paddy. Systemic action.",
        mainCategory: "Pesticides",
        subCategory: "Herbicide",
        price: 380,
        stock: 90,
        imageUrl: "/products/herbicide_2_4d.png"
    },
    {
        name: "Beauveria bassiana Bio-pesticide (1kg)",
        description: "Entomopathogenic fungus for biological pest control. Controls whitefly, aphids, and thrips. Safe for organic farming.",
        mainCategory: "Pesticides",
        subCategory: "Bio-pesticide",
        price: 650,
        stock: 55,
        imageUrl: "/products/biopesticide_beauveria.png"
    },
    {
        name: "Zinc Phosphide Rodenticide (100g)",
        description: "Effective rodent control for agricultural fields. Controls rats and field mice. Use with bait materials.",
        mainCategory: "Pesticides",
        subCategory: "Rodenticide",
        price: 85,
        stock: 200,
        imageUrl: "/products/rodenticide_zinc_phosphide.png"
    },
    {
        name: "Metaldehyde Snail Bait (500g)",
        description: "Effective control of snails and slugs in gardens. Pellet formulation for easy application. Weather resistant.",
        mainCategory: "Pesticides",
        subCategory: "Molluscicide",
        price: 220,
        stock: 80,
        imageUrl: "/products/snail_bait_metaldehyde.png"
    },
    {
        name: "Pendimethalin 30% EC (1L)",
        description: "Pre-emergence herbicide for annual grass and broadleaf weeds. Suitable for vegetables and field crops.",
        mainCategory: "Pesticides",
        subCategory: "Herbicide",
        price: 680,
        stock: 65,
        imageUrl: "/products/pendimethalin_herbicide.png"
    },
    {
        name: "Fipronil 5% SC (100ml)",
        description: "Broad-spectrum insecticide for stem borer and leaf folder control. Effective at low doses. Systemic and contact action.",
        mainCategory: "Pesticides",
        subCategory: "Insecticide",
        price: 290,
        stock: 140,
        imageUrl: "/products/fipronil_insecticide.png"
    },
    {
        name: "Abamectin 1.9% EC (250ml)",
        description: "Effective miticide and insecticide for mites and leaf miners. Translaminar action for hidden pests.",
        mainCategory: "Pesticides",
        subCategory: "Miticide",
        price: 450,
        stock: 75,
        imageUrl: "/products/abamectin_miticide.png"
    },
    {
        name: "Thiamethoxam 25% WG (100g)",
        description: "Second generation neonicotinoid insecticide. Excellent aphid and whitefly control. Seed treatment and foliar use.",
        mainCategory: "Pesticides",
        subCategory: "Insecticide",
        price: 420,
        stock: 100,
        imageUrl: "/products/thiamethoxam_insecticide.png"
    },

    // ==================== ORGANIC PRODUCTS (12 products) ====================
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
    {
        name: "Cow Dung Manure - Dried (25kg)",
        description: "Traditional organic manure rich in nitrogen and beneficial microbes. Improves soil texture and water holding capacity.",
        mainCategory: "Organic Products",
        subCategory: "Animal Manure",
        price: 180,
        stock: 150,
        imageUrl: "/products/cow_dung_manure.png"
    },
    {
        name: "Green Manure Seeds - Dhaincha (5kg)",
        description: "Fast growing green manure crop seeds. Fixes atmospheric nitrogen in soil. Excellent for soil improvement before paddy.",
        mainCategory: "Organic Products",
        subCategory: "Green Manure",
        price: 220,
        stock: 70,
        imageUrl: "https://images.pexels.com/photos/7728083/pexels-photo-7728083.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        name: "Bone Meal Organic Fertilizer (5kg)",
        description: "Slow-release phosphorus source for organic gardens. Promotes root development and flowering. High calcium content.",
        mainCategory: "Organic Products",
        subCategory: "Organic Fertilizer",
        price: 380,
        stock: 65,
        imageUrl: "https://images.pexels.com/photos/6231818/pexels-photo-6231818.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        name: "Blood Meal High Nitrogen (2kg)",
        description: "Organic nitrogen source for leafy vegetables. Quick-release formulation. 100% natural and eco-friendly.",
        mainCategory: "Organic Products",
        subCategory: "Organic Fertilizer",
        price: 290,
        stock: 55,
        imageUrl: "https://images.pexels.com/photos/6231818/pexels-photo-6231818.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        name: "Fish Meal Fertilizer (5kg)",
        description: "Organic fertilizer rich in nitrogen and phosphorus. Slow-release nutrients for sustained plant growth. Oceanic origin.",
        mainCategory: "Organic Products",
        subCategory: "Organic Fertilizer",
        price: 520,
        stock: 45,
        imageUrl: "https://images.pexels.com/photos/6231834/pexels-photo-6231834.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        name: "Mustard Cake Organic (10kg)",
        description: "Nitrogen-rich organic manure from mustard oil extraction. Natural pest repellent properties. Excellent for vegetables.",
        mainCategory: "Organic Products",
        subCategory: "Oil Cake",
        price: 320,
        stock: 90,
        imageUrl: "https://images.pexels.com/photos/7457171/pexels-photo-7457171.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        name: "Neem Cake Organic (10kg)",
        description: "Multi-purpose organic input with fertilizer and pest control properties. Rich in NPK. Controls soil-borne pests.",
        mainCategory: "Organic Products",
        subCategory: "Oil Cake",
        price: 380,
        stock: 85,
        imageUrl: "https://images.pexels.com/photos/4750270/pexels-photo-4750270.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        name: "Panchagavya Organic Solution (5L)",
        description: "Traditional five-cow product organic input. Enhances plant immunity and growth. Certified for organic farming.",
        mainCategory: "Organic Products",
        subCategory: "Organic Enhancer",
        price: 450,
        stock: 40,
        imageUrl: "https://images.pexels.com/photos/5677730/pexels-photo-5677730.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        name: "Jeevamrit Liquid Concentrate (10L)",
        description: "Fermented organic liquid for soil and plant health. Rich in beneficial microorganisms. Improves nutrient availability.",
        mainCategory: "Organic Products",
        subCategory: "Organic Enhancer",
        price: 280,
        stock: 60,
        imageUrl: "https://images.pexels.com/photos/5677730/pexels-photo-5677730.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        name: "Bio-compost Enriched (25kg)",
        description: "Enriched compost with added beneficial microbes and humic substances. Premium quality for organic cultivation.",
        mainCategory: "Organic Products",
        subCategory: "Compost",
        price: 580,
        stock: 50,
        imageUrl: "https://images.pexels.com/photos/6231828/pexels-photo-6231828.jpeg?auto=compress&cs=tinysrgb&w=400"
    },

    // ==================== TOOLS (18 products) ====================
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
    {
        name: "Professional Pruning Shears",
        description: "Sharp bypass pruning shears for clean cuts. Ergonomic grip with safety lock. Suitable for branches up to 20mm.",
        mainCategory: "Tools",
        subCategory: "Cutting Tools",
        price: 380,
        stock: 85,
        imageUrl: "/products/pruning_shears_1768197399142.png"
    },
    {
        name: "Garden Fork - 4 Prong Steel",
        description: "Heavy-duty garden fork for soil aeration and composting. Rust-resistant steel with wooden handle. Professional quality.",
        mainCategory: "Tools",
        subCategory: "Hand Tools",
        price: 520,
        stock: 45,
        imageUrl: "/products/garden_tools_set_1768197383843.png"
    },
    {
        name: "Adjustable Garden Rake",
        description: "Lightweight aluminum rake with adjustable head width. Perfect for leaves and debris collection. Telescopic handle.",
        mainCategory: "Tools",
        subCategory: "Hand Tools",
        price: 290,
        stock: 70,
        imageUrl: "/products/garden_rake_1768197414071.png"
    },
    {
        name: "Heavy Duty Khurpi - Weeding Tool",
        description: "Traditional Indian weeding tool with carbon steel blade. Comfortable wooden grip. Essential for vegetable gardens.",
        mainCategory: "Tools",
        subCategory: "Hand Tools",
        price: 120,
        stock: 150,
        imageUrl: "/products/khurpi_weeding_tool_1768197437337.png"
    },
    {
        name: "Steel Garden Trowel",
        description: "Stainless steel trowel for planting and transplanting. Graduated blade for measuring depth. Ergonomic soft grip.",
        mainCategory: "Tools",
        subCategory: "Hand Tools",
        price: 180,
        stock: 120,
        imageUrl: "/products/garden_trowel_1768197457469.png"
    },
    {
        name: "Wheelbarrow - Heavy Duty (100L)",
        description: "Large capacity wheelbarrow with pneumatic tire. Rust-resistant steel tray. Perfect for farm and garden transport.",
        mainCategory: "Tools",
        subCategory: "Transport",
        price: 2200,
        stock: 20,
        imageUrl: "/products/wheelbarrow_heavy_duty.png"
    },
    {
        name: "Professional Grafting Knife",
        description: "Sharp folding grafting knife with wood handle. Precision blade for clean grafts. Essential for tree propagation.",
        mainCategory: "Tools",
        subCategory: "Cutting Tools",
        price: 350,
        stock: 55,
        imageUrl: "/products/grafting_knife_1768197473876.png"
    },
    {
        name: "Manual Seed Drill - Row Planter",
        description: "Hand-operated seed drill for uniform row planting. Adjustable seed spacing. Reduces planting time significantly.",
        mainCategory: "Tools",
        subCategory: "Planting Equipment",
        price: 1850,
        stock: 30,
        imageUrl: "https://images.pexels.com/photos/7728088/pexels-photo-7728088.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        name: "Hand Cultivator - 3 Prong",
        description: "Mini cultivator for loosening soil in tight spaces. Chrome-plated steel with wooden handle. Ideal for container gardening.",
        mainCategory: "Tools",
        subCategory: "Hand Tools",
        price: 150,
        stock: 100,
        imageUrl: "/products/hand_cultivator_1768197491409.png"
    },
    {
        name: "Stand-up Weeder Tool",
        description: "Ergonomic stand-up weeder for removing weeds without bending. Stainless steel head with foot pedal. Back-friendly design.",
        mainCategory: "Tools",
        subCategory: "Weeding Tools",
        price: 680,
        stock: 40,
        imageUrl: "/products/stand_up_weeder_1768197516042.png"
    },
    {
        name: "Soil Aerator Sandals",
        description: "Strap-on aerator sandals with steel spikes. Aerates soil while walking. Simple and effective lawn care.",
        mainCategory: "Tools",
        subCategory: "Lawn Care",
        price: 420,
        stock: 35,
        imageUrl: "/products/soil_aerator_sandals.png"
    },
    {
        name: "Battery Sprayer Pump (20L)",
        description: "Rechargeable battery-operated sprayer. Saves labor with 4-hour continuous operation. Adjustable pressure with multiple nozzles.",
        mainCategory: "Tools",
        subCategory: "Sprayers",
        price: 3500,
        stock: 25,
        imageUrl: "/products/battery_sprayer_pump.png"
    },
    {
        name: "Hedge Trimmer - Manual",
        description: "Long-handled hedge shears for shaping bushes. Carbon steel blades with shock-absorbing bumpers. Lightweight design.",
        mainCategory: "Tools",
        subCategory: "Cutting Tools",
        price: 580,
        stock: 30,
        imageUrl: "/products/hedge_trimmer_manual_1768197532149.png"
    },
    {
        name: "Bow Saw - Pruning (24 inch)",
        description: "Heavy-duty bow saw for cutting branches and logs. Replaceable blade with comfortable grip. Quick-release blade change.",
        mainCategory: "Tools",
        subCategory: "Cutting Tools",
        price: 320,
        stock: 50,
        imageUrl: "/products/bow_saw_1768197551307.png"
    },
    {
        name: "Farmer's Axe - Wood Handle",
        description: "Traditional axe for chopping and splitting wood. Drop-forged steel head with lacquered wood handle. Well-balanced design.",
        mainCategory: "Tools",
        subCategory: "Cutting Tools",
        price: 480,
        stock: 45,
        imageUrl: "/products/farmers_axe_wood.png"
    },

    // ==================== ACCESSORIES (10 products) ====================
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
    },
    {
        name: "Farmer's Knee Pads - Gel Cushion",
        description: "Comfortable knee pads with gel cushioning. Adjustable straps for secure fit. Essential for transplanting and weeding.",
        mainCategory: "Accessories",
        subCategory: "Safety",
        price: 350,
        stock: 65,
        imageUrl: "/products/knee_pads_farming_1768197568892.png"
    },
    {
        name: "Wide Brim Sun Hat",
        description: "UV protective sun hat with wide brim. Breathable mesh panels with chin strap. Perfect for long hours in the field.",
        mainCategory: "Accessories",
        subCategory: "Protection",
        price: 220,
        stock: 100,
        imageUrl: "/products/sun_hat_farming_1768197594824.png"
    },
    {
        name: "Water-Resistant Garden Apron",
        description: "Durable canvas apron with multiple pockets. Water-resistant coating for wet work. Adjustable neck and waist straps.",
        mainCategory: "Accessories",
        subCategory: "Protection",
        price: 280,
        stock: 75,
        imageUrl: "https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        name: "Safety Goggles - Anti-Fog",
        description: "Clear safety goggles with anti-fog coating. Protects eyes during spraying operations. Comfortable soft seal.",
        mainCategory: "Accessories",
        subCategory: "Safety",
        price: 150,
        stock: 140,
        imageUrl: "/products/safety_goggles_antifog.png"
    },
    {
        name: "Seedling Trays - 72 Cell (Pack of 5)",
        description: "Durable plastic seedling trays for propagation. Optimal cell size for vegetable seedlings. Drainage holes in each cell.",
        mainCategory: "Accessories",
        subCategory: "Propagation",
        price: 320,
        stock: 90,
        imageUrl: "/products/seedling_trays_72cell.png"
    },
    {
        name: "Plant Labels - Plastic (100 pcs)",
        description: "White T-type plant labels for marking varieties. Weather-resistant plastic. Write with permanent marker.",
        mainCategory: "Accessories",
        subCategory: "Garden Accessories",
        price: 85,
        stock: 200,
        imageUrl: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        name: "Metal Watering Can (10L)",
        description: "Galvanized steel watering can with rose head. Balanced design for easy pouring. Rust-resistant finish.",
        mainCategory: "Accessories",
        subCategory: "Watering",
        price: 450,
        stock: 55,
        imageUrl: "https://images.pexels.com/photos/6231747/pexels-photo-6231747.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        name: "NPK Soil Test Kit - Complete",
        description: "Home soil testing kit for NPK analysis. Easy-to-read color chart included. 40 tests per kit.",
        mainCategory: "Accessories",
        subCategory: "Testing",
        price: 520,
        stock: 45,
        imageUrl: "https://images.pexels.com/photos/6231825/pexels-photo-6231825.jpeg?auto=compress&cs=tinysrgb&w=400"
    },

    // ==================== EQUIPMENT (7 products) ====================
    {
        name: "Power Tiller - 7HP Diesel",
        description: "Heavy-duty power tiller for land preparation. 7HP diesel engine with easy start. Multiple attachments available.",
        mainCategory: "Equipment",
        subCategory: "Land Preparation",
        price: 85000,
        stock: 8,
        imageUrl: "/products/power_tiller_machine.png"
    },
    {
        name: "Chaff Cutter - Manual",
        description: "Manual chaff cutter for fodder preparation. Steel blades with adjustable cutting length. Suitable for small farms.",
        mainCategory: "Equipment",
        subCategory: "Post Harvest",
        price: 4500,
        stock: 15,
        imageUrl: "https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        name: "Paddy Thresher - Pedal Operated",
        description: "Foot-operated paddy thresher for small farmers. Efficient grain separation. Low maintenance design.",
        mainCategory: "Equipment",
        subCategory: "Post Harvest",
        price: 6800,
        stock: 12,
        imageUrl: "https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        name: "Mini Rotavator Attachment",
        description: "Rotavator attachment for power tillers. Excellent for seedbed preparation. Adjustable tilling depth.",
        mainCategory: "Equipment",
        subCategory: "Land Preparation",
        price: 12500,
        stock: 10,
        imageUrl: "https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?w=400&h=400&fit=crop"
    },
    {
        name: "Brush Cutter - 4 Stroke Engine",
        description: "Powerful brush cutter for clearing vegetation. 4-stroke engine for fuel efficiency. Multiple cutting heads included.",
        mainCategory: "Equipment",
        subCategory: "Clearing",
        price: 9500,
        stock: 18,
        imageUrl: "https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        name: "Submersible Water Pump - 1HP",
        description: "Electric submersible pump for irrigation. Stainless steel construction. High discharge rate for deep wells.",
        mainCategory: "Equipment",
        subCategory: "Irrigation",
        price: 5200,
        stock: 25,
        imageUrl: "https://images.pexels.com/photos/3846076/pexels-photo-3846076.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        name: "Portable Generator - 2KVA",
        description: "Portable petrol generator for farm power needs. Low noise operation. Suitable for pump and equipment operation.",
        mainCategory: "Equipment",
        subCategory: "Power",
        price: 18500,
        stock: 6,
        imageUrl: "https://images.pexels.com/photos/5691592/pexels-photo-5691592.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
];

module.exports = professionalProducts;