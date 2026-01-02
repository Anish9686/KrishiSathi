import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";
import { getToken, clearToken } from "../utils/auth";
import { getProductImage } from "../utils/imageUtils";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import Footer from "../components/Footer";
import { Heart, ShoppingCart, Eye, Star, Package, X, Share2, Clock } from "lucide-react";

/* ================= CONSTANTS ================= */

const CATEGORIES = [
  "All",
  "Fertilizers",
  "Pesticides",
  "Seeds",
  "Organic Products",
  "Tools",
  "Accessories",
];



/* ================= COMPONENT ================= */

const SkeletonCard = () => (
  <div style={{ background: "#f0f0f0", borderRadius: 18, height: 280, width: "100%", position: "relative", overflow: "hidden" }}>
    <motion.div
      animate={{ x: ["-100%", "100%"] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }}
    />
  </div>
);

function HomeWrapper() {
  const navigate = useNavigate();
  const { addToCart, cartCount } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [page, setPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());

  const [activeProduct, setActiveProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [addingToCart, setAddingToCart] = useState(null);

  // Helper function to get stock status
  const getStockStatus = (stock) => {
    if (stock === 0) return { label: "Out of Stock", class: "badge-danger", icon: Package };
    if (stock < 10) return { label: "Low Stock", class: "badge-warning", icon: Package };
    return { label: "In Stock", class: "badge-success", icon: Package };
  };

  // Quick add to cart with animation
  const handleQuickAdd = async (e, product) => {
    e.stopPropagation();
    setAddingToCart(product._id);
    addToCart({ ...product, image: getProductImage(product.name, product.imageUrl) }, 1);
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => setAddingToCart(null), 500);
  };


  /* ================= FETCH PRODUCTS ================= */
  const fetchProducts = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) setLoading(true);
      console.log("Fetching products from API...");
      const res = await api.get("/products");
      console.log("Products received:", res.data);
      setProducts(Array.isArray(res.data) ? res.data : []);
      if (isRefresh) toast.success("Market inventory updated!");
    } catch (err) {
      console.error("Product fetch failed:", err);
      toast.error("Network communication error.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  /* ================= FILTER LOGIC ================= */
  const filteredProducts = products.filter((p) => {
    if (!p) return false;

    const matchCategory =
      selectedCategory === "All" ||
      p.mainCategory?.toLowerCase() === selectedCategory.toLowerCase();

    const matchSearch = p.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchMin = minPrice === "" || p.price >= Number(minPrice);
    const matchMax = maxPrice === "" || p.price <= Number(maxPrice);

    return matchCategory && matchSearch && matchMin && matchMax;
  });

  /* ================= HELPERS ================= */
  const handleLogout = () => {
    clearToken();
    setIsLoggedIn(false);
    setPage("home");
  };



  const NavButton = ({ label, onClick, active }) => (
    <button
      onClick={onClick}
      style={{
        padding: "8px 18px",
        borderRadius: 999,
        border: "none",
        fontWeight: 600,
        cursor: "pointer",
        background: active ? "white" : "transparent",
        color: active ? "#2e7d32" : "white",
        boxShadow: active
          ? "0 6px 18px rgba(0,0,0,0.25)"
          : "none",
      }}
    >
      {label}
    </button>
  );

  /* ================= UI ================= */
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eef7ec 0%, #e3f2df 100%)",
      }}
    >
      {/* ================= MAIN ================= */}
      <main className="page-container">
        <header className="animate-fade-in" style={{ marginBottom: 48, textAlign: "center" }}>
          <h1 style={{ fontSize: "3.8rem", color: "var(--primary-dark)", marginBottom: 12 }}>
            Krishi<span style={{ color: "var(--primary)", fontWeight: 900 }}>Sathi</span> Market
          </h1>
          <p style={{ fontSize: "1.3rem", color: "var(--text-muted)", maxWidth: 700, margin: "0 auto", lineHeight: 1.6 }}>
            Modern technology bridging traditional excellence. <br />
            Premium farming solutions for Bharat's future.
          </p>
        </header>

        <>
          {/* SEARCH + PRICE FILTER */}
          <div className="glass-effect" style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 32, padding: 24, borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <label style={{ display: "block", marginBottom: 8, fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)" }}>Search</label>
              <input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: "100%", padding: "14px 18px" }} />
            </div>
            <div style={{ width: 150 }}>
              <label style={{ display: "block", marginBottom: 8, fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)" }}>Min Price</label>
              <input placeholder="₹ 0" type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} style={{ width: "100%", padding: "14px 18px" }} />
            </div>
            <div style={{ width: 150 }}>
              <label style={{ display: "block", marginBottom: 8, fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)" }}>Max Price</label>
              <input placeholder="₹ 10000" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} style={{ width: "100%", padding: "14px 18px" }} />
            </div>
          </div>

          {/* CATEGORY FILTER */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48, justifyContent: "center" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "12px 24px",
                  borderRadius: "var(--radius-lg)",
                  background: selectedCategory === cat ? "var(--primary)" : "var(--surface)",
                  color: selectedCategory === cat ? "white" : "var(--primary)",
                  border: selectedCategory === cat ? "none" : "1px solid var(--border)",
                  boxShadow: selectedCategory === cat ? "var(--shadow-md)" : "var(--shadow-sm)",
                  fontSize: 14
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* PRODUCTS GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 28 }}>
            {loading ? (
              [1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((p, idx) => {
                const stockStatus = getStockStatus(p.stock || 50);
                const StockIcon = stockStatus.icon;
                const isWishlisted = isInWishlist(p._id);
                const rating = 4.5; // Fixed rating for performance

                return (
                  <motion.div
                    key={p._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                    className="premium-card"
                    onClick={() => {
                      setActiveProduct(p);
                      addToRecentlyViewed(p);
                    }}
                    style={{ cursor: "pointer", overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}
                  >
                    {/* Wishlist Heart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(p);
                        toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist ❤️");
                      }}
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        zIndex: 10,
                        background: "rgba(255,255,255,0.95)",
                        border: "none",
                        borderRadius: "50%",
                        width: 36,
                        height: 36,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                      }}
                    >
                      <Heart
                        size={18}
                        fill={isWishlisted ? "#ef4444" : "none"}
                        color={isWishlisted ? "#ef4444" : "#9ca3af"}
                        style={{ transition: "all 0.2s ease" }}
                      />
                    </button>

                    {/* Product Image */}
                    <div className="product-image-container" style={{ position: "relative", height: 200, overflow: "hidden", background: "#f8faf8" }}>
                      <img
                        src={getProductImage(p.name, p.imageUrl)}
                        alt={p.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      {/* Category Badge */}
                      <div style={{ position: "absolute", bottom: 12, left: 12, background: "var(--primary)", padding: "5px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, color: "white", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        {p.mainCategory}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                      {/* Title & Rating */}
                      <div>
                        <h3 style={{ margin: "0 0 6px", fontSize: "1.1rem", color: "var(--text-main)", lineHeight: 1.3 }}>{p.name}</h3>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={14}
                              fill={star <= Math.floor(rating) ? "#fbbf24" : "none"}
                              color="#fbbf24"
                            />
                          ))}
                          <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: 4 }}>({Math.floor(Math.random() * 50 + 10)})</span>
                        </div>
                      </div>

                      {/* Stock Status */}
                      <div className={`badge ${stockStatus.class}`} style={{ alignSelf: "flex-start" }}>
                        <StockIcon size={12} style={{ marginRight: 4 }} />
                        {stockStatus.label}
                        {p.stock !== undefined && p.stock > 0 && p.stock < 10 && (
                          <span style={{ marginLeft: 4 }}>• Only {p.stock} left!</span>
                        )}
                      </div>

                      {/* Price & Actions */}
                      <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                        <div>
                          <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary)" }}>₹{p.price}</span>
                          <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: 4 }}>/{p.unit || "kg"}</span>
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button
                            onClick={(e) => { e.stopPropagation(); setActiveProduct(p); addToRecentlyViewed(p); }}
                            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--primary)", padding: "10px", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={(e) => handleQuickAdd(e, p)}
                            disabled={p.stock === 0}
                            className={addingToCart === p._id ? "animate-bounce" : ""}
                            style={{
                              background: p.stock === 0 ? "#ccc" : "var(--primary)",
                              color: "white",
                              padding: "10px 16px",
                              borderRadius: 10,
                              fontSize: 13,
                              fontWeight: 600,
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              cursor: p.stock === 0 ? "not-allowed" : "pointer"
                            }}
                          >
                            <ShoppingCart size={16} />
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div style={{ textAlign: "center", gridColumn: "1/-1", padding: "60px 0" }}>
                <p style={{ color: "var(--text-muted)", marginBottom: 20 }}>No products found matching your criteria.</p>
                <button
                  onClick={() => fetchProducts(true)}
                  style={{ background: "var(--primary)", color: "white", padding: "12px 24px", borderRadius: 12, fontWeight: 700 }}
                >
                  Reload Inventory
                </button>
              </div>
            )}
          </div>
        </>
      </main>

      {/* ================= PRODUCT MODAL ================= */}
      <AnimatePresence>
        {activeProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setActiveProduct(null); setQty(1); }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: 20 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-modal"
              style={{ width: "100%", maxWidth: 900, maxHeight: "90vh", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative" }}
            >
              {/* Close Button */}
              <button
                onClick={() => { setActiveProduct(null); setQty(1); }}
                style={{ position: "absolute", top: 16, right: 16, zIndex: 10, background: "rgba(0,0,0,0.1)", border: "none", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              >
                <X size={20} color="#666" />
              </button>

              {/* Product Image */}
              <div style={{ background: "#f8faf8", padding: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  src={getProductImage(activeProduct.name, activeProduct.imageUrl)}
                  alt={activeProduct.name}
                  style={{ width: "100%", maxHeight: 400, objectFit: "contain", borderRadius: 12 }}
                />
              </div>

              {/* Product Details */}
              <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
                {/* Category Badge */}
                <span style={{ background: "var(--primary)", color: "white", padding: "6px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700, textTransform: "uppercase", alignSelf: "flex-start" }}>
                  {activeProduct.mainCategory}
                </span>

                {/* Title */}
                <h2 style={{ margin: 0, fontSize: "1.8rem", color: "var(--text-main)", lineHeight: 1.3 }}>{activeProduct.name}</h2>

                {/* Rating */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ display: "flex", gap: 2 }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={16} fill="#fbbf24" color="#fbbf24" />
                    ))}
                  </div>
                  <span style={{ fontSize: 14, color: "var(--text-muted)" }}>4.8 (124 reviews)</span>
                </div>

                {/* Description */}
                <p style={{ margin: 0, color: "var(--text-muted)", lineHeight: 1.7, fontSize: 15 }}>
                  {activeProduct.description || "Premium quality agricultural product sourced directly from trusted suppliers. Designed for optimal crop yield and sustainable farming practices."}
                </p>

                {/* Stock Status */}
                <div className={`badge ${getStockStatus(activeProduct.stock || 50).class}`} style={{ alignSelf: "flex-start", padding: "8px 14px" }}>
                  <Package size={14} style={{ marginRight: 6 }} />
                  {getStockStatus(activeProduct.stock || 50).label} ({activeProduct.stock || 50} units available)
                </div>

                {/* Price */}
                <div style={{ background: "var(--background)", padding: 16, borderRadius: 12, display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontSize: "2rem", fontWeight: 800, color: "var(--primary)" }}>₹{activeProduct.price}</span>
                  <span style={{ fontSize: 14, color: "var(--text-muted)" }}>per {activeProduct.unit || "kg"}</span>
                </div>

                {/* Quantity Selector */}
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ fontWeight: 600, color: "var(--text-muted)" }}>Quantity:</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 0, border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      style={{ width: 44, height: 44, background: "var(--surface)", border: "none", fontSize: 20, cursor: "pointer", color: "var(--text-main)" }}
                    >−</button>
                    <span style={{ width: 50, textAlign: "center", fontWeight: 700, fontSize: 16 }}>{qty}</span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      style={{ width: 44, height: 44, background: "var(--surface)", border: "none", fontSize: 20, cursor: "pointer", color: "var(--text-main)" }}
                    >+</button>
                  </div>
                  <span style={{ fontSize: 14, color: "var(--text-muted)" }}>Total: ₹{(activeProduct.price * qty).toLocaleString()}</span>
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: 12, marginTop: "auto" }}>
                  <button
                    onClick={() => {
                      addToCart({ ...activeProduct, image: getProductImage(activeProduct.name, activeProduct.imageUrl) }, qty);
                      toast.success(`Added ${qty} ${activeProduct.name} to cart!`);
                      setActiveProduct(null);
                      setQty(1);
                    }}
                    style={{ flex: 1, padding: 16, background: "var(--primary)", color: "white", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(activeProduct);
                      toast.success(isInWishlist(activeProduct._id) ? "Removed from wishlist" : "Added to wishlist ❤️");
                    }}
                    style={{ width: 54, height: 54, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                  >
                    <Heart size={22} fill={isInWishlist(activeProduct._id) ? "#ef4444" : "none"} color={isInWishlist(activeProduct._id) ? "#ef4444" : "#9ca3af"} />
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Link copied to clipboard!");
                    }}
                    style={{ width: 54, height: 54, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                  >
                    <Share2 size={20} color="#9ca3af" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= STICKY CART ================= */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            onClick={() => navigate("/cart")}
            style={{
              position: "fixed",
              bottom: 24,
              left: 24,
              background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
              color: "white",
              padding: "16px 24px",
              borderRadius: 50,
              boxShadow: "0 10px 40px rgba(45, 106, 79, 0.4)",
              cursor: "pointer",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 10,
              zIndex: 100
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 15px 50px rgba(45, 106, 79, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <div style={{ position: "relative" }}>
              <ShoppingCart size={22} />
              <span className="notification-badge">{cartCount}</span>
            </div>
            <span>View Cart</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= RECENTLY VIEWED ================= */}
      {recentlyViewed.length > 0 && (
        <section style={{ padding: "48px 24px", background: "var(--surface)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <Clock size={24} color="var(--primary)" />
              <h2 style={{ margin: 0, fontSize: "1.6rem", color: "var(--text-main)" }}>Recently Viewed</h2>
            </div>
            <div style={{ display: "flex", gap: 20, overflowX: "auto", paddingBottom: 16 }}>
              {recentlyViewed.map((p) => (
                <motion.div
                  key={p._id}
                  whileHover={{ y: -4 }}
                  onClick={() => { setActiveProduct(p); }}
                  style={{
                    minWidth: 200,
                    background: "white",
                    borderRadius: 16,
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: "var(--shadow-sm)",
                    border: "1px solid var(--border)"
                  }}
                >
                  <img
                    src={getProductImage(p.name, p.imageUrl)}
                    alt={p.name}
                    style={{ width: "100%", height: 120, objectFit: "cover" }}
                  />
                  <div style={{ padding: 12 }}>
                    <h4 style={{ margin: "0 0 4px", fontSize: 14, color: "var(--text-main)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</h4>
                    <span style={{ fontSize: 16, fontWeight: 700, color: "var(--primary)" }}>₹{p.price}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

export default HomeWrapper;
