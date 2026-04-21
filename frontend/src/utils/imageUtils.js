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

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1592997571659-0b21ff64313b";
const BACKEND_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.replace('/api', '') : "http://localhost:5000";

export const getProductImage = (name, imageUrl) => {
    // 1. Prioritize specific imageUrl from database (the "related" bag/bottle images)
    if (imageUrl && !imageUrl.includes("placeholder")) {
        if (imageUrl.startsWith('http')) return imageUrl;
        if (imageUrl.startsWith('/')) return `${BACKEND_URL}${imageUrl}`;
    }

    // 2. Only use IMAGE_MAP as a fallback if database image is missing or a placeholder
    if (IMAGE_MAP[name]) return `${BACKEND_URL}${IMAGE_MAP[name]}`;

    // 3. Fuzzy match fallback
    const fuzzyMatch = Object.keys(IMAGE_MAP).find(key =>
        name.toLowerCase().startsWith(key.toLowerCase()) ||
        key.toLowerCase().startsWith(name.toLowerCase())
    );
    if (fuzzyMatch) return `${BACKEND_URL}${IMAGE_MAP[fuzzyMatch]}`;

    // 4. Final fallback to Unsplash/Default
    return (imageUrl && !imageUrl.includes("placeholder")) ? imageUrl : FALLBACK_IMAGE;
};
