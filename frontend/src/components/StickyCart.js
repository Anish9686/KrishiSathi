import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

function StickyCart({ onOpen }) {
  const { cartItems } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const count = cartItems?.reduce((s, i) => s + i.qty, 0) || 0;

  useEffect(() => {
    if (count > 0) {
      setIsVisible(true);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    } else {
      setIsVisible(false);
    }
  }, [count]);

  if (!isVisible) return null;

  return (
    <div
      onClick={onOpen}
      className="animate-scale-in"
      style={{
        position: "fixed",
        bottom: 30,
        left: 30,
        background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
        color: "white",
        padding: "16px 24px",
        borderRadius: 16,
        boxShadow: "0 12px 35px rgba(46, 125, 50, 0.35)",
        cursor: "pointer",
        fontWeight: 700,
        zIndex: 1500,
        display: "flex",
        alignItems: "center",
        gap: 12,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isAnimating ? "scale(1.05)" : "scale(1)",
        border: "1px solid rgba(255,255,255,0.2)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05) translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 16px 45px rgba(46, 125, 50, 0.45)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 12px 35px rgba(46, 125, 50, 0.35)";
      }}
    >
      <div style={{
        background: "rgba(255,255,255,0.2)",
        padding: 8,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <ShoppingCart size={20} />
      </div>
      <span style={{ fontSize: 15 }}>
        {count} item{count > 1 ? "s" : ""} in cart
      </span>
      <span style={{
        background: "rgba(255,255,255,0.25)",
        padding: "4px 12px",
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 800
      }}>
        View
      </span>
    </div>
  );
}

export default StickyCart;
