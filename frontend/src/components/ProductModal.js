import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { getProductImage } from "../utils/imageUtils";
import { X, Minus, Plus, ShoppingCart, Star, Package } from "lucide-react";
import toast from "react-hot-toast";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1592997571659-0b21ff64313b";

export default function ProductModal({ product, onClose }) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({ ...product, qty });
    toast.success(`${product.name} added to cart!`);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="animate-fade-in"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-scale-in glass-effect"
        style={{
          background: "white",
          width: "100%",
          maxWidth: 900,
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
          border: "1px solid var(--border)",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.05)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10,
            transition: "all 0.2s"
          }}
        >
          <X size={20} />
        </button>

        {/* IMAGE */}
        <div style={{ padding: 32, background: "var(--background)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src={getProductImage(product.name, product.imageUrl) || FALLBACK_IMAGE}
            alt={product.name}
            onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
            style={{
              width: "100%",
              maxHeight: 380,
              objectFit: "contain",
              borderRadius: "var(--radius-md)",
            }}
          />
        </div>

        {/* DETAILS */}
        <div style={{ padding: 40, display: "flex", flexDirection: "column" }}>
          {/* Category Badge */}
          <span style={{
            background: "rgba(46, 125, 50, 0.1)",
            color: "var(--primary)",
            padding: "6px 14px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 700,
            display: "inline-block",
            width: "fit-content",
            marginBottom: 16
          }}>
            {product.mainCategory || "General"}
          </span>

          <h2 style={{ margin: "0 0 12px", fontSize: "1.8rem", color: "var(--text-main)", lineHeight: 1.3 }}>
            {product.name}
          </h2>

          {/* Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 2 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < 4 ? "#ffc107" : "transparent"} color="#ffc107" />
              ))}
            </div>
            <span style={{ color: "var(--text-muted)", fontSize: 14 }}>(4.5 rating)</span>
          </div>

          <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 24, flex: 1 }}>
            {product.description || "High quality agricultural product trusted by farmers across India."}
          </p>

          {/* Stock Status */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <Package size={18} color={product.stock > 0 ? "var(--primary)" : "#c62828"} />
            <span style={{
              color: product.stock > 0 ? "var(--primary)" : "#c62828",
              fontWeight: 600,
              fontSize: 14
            }}>
              {product.stock > 0 ? `${product.stock} units in stock` : "Out of Stock"}
            </span>
          </div>

          {/* Price */}
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--primary-dark)" }}>
              ₹{product.price}
            </span>
            <span style={{ fontSize: 14, color: "var(--text-muted)", marginLeft: 8 }}>
              / {product.unit || "unit"}
            </span>
          </div>

          {/* QTY Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
            <span style={{ fontWeight: 600, color: "var(--text-muted)" }}>Quantity:</span>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: "var(--background)",
              padding: 6,
              borderRadius: 12,
              border: "1px solid var(--border)"
            }}>
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "white",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer"
                }}
              >
                <Minus size={16} />
              </button>
              <span style={{ width: 48, textAlign: "center", fontWeight: 700, fontSize: "1.1rem" }}>{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "white",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer"
                }}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            style={{
              width: "100%",
              padding: 18,
              background: product.stock > 0 ? "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "var(--radius-md)",
              fontWeight: 700,
              fontSize: "1.1rem",
              cursor: product.stock > 0 ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              boxShadow: product.stock > 0 ? "0 10px 30px rgba(46, 125, 50, 0.3)" : "none",
              transition: "all 0.3s ease"
            }}
          >
            <ShoppingCart size={20} />
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
