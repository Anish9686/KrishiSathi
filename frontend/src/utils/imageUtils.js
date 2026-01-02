export const IMAGE_MAP = {
    "Urea 46% Nitrogen Fertilizer": "/images/urea.jpg",
    "DAP 18-46-0 Fertilizer": "/images/dap.jpg",
    "NPK 19-19-19 Water Soluble": "/images/npk.jpg",
    "Vermicompost Organic Manure": "/images/vermicompost.jpg",
    "Neem Cake Organic Fertilizer": "/images/neem-cake.jpg",
    "Imidacloprid 17.8% SL": "/images/imidacloprid.jpg",
    "Mancozeb 75% WP Fungicide": "/images/mancozeb.jpg",
    "Hybrid Tomato Seeds (High Yield)": "/images/tomato-seeds.jpg",
    "Wheat Seeds – HD 2967": "/images/wheat-seeds.jpg",
    "Manual Knapsack Sprayer 16L": "/images/sprayer.jpg",
    "Drip Irrigation Kit (1000 sq.ft.)": "/images/drip-kit.jpg",
    "Soil Testing Kit (NPK + pH)": "/images/soil-kit.jpg",
    "Heavy Duty Farmer Gloves": "/images/farmer-gloves.jpg",
};

export const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1592997571659-0b21ff64313b";

export const getProductImage = (name, imageUrl) => {
    return IMAGE_MAP[name] || imageUrl || FALLBACK_IMAGE;
};
