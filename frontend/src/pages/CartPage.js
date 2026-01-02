import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { getProductImage } from "../utils/imageUtils";

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    updateQty,
    removeFromCart,
    cartTotal,
  } = useCart();

  /* ================= EMPTY CART ================= */
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="page-container" style={{ textAlign: "center", padding: "100px 24px" }}>
        <div style={{ fontSize: "5rem", marginBottom: 20 }}>🛒</div>
        <h2 style={{ fontSize: "2rem", color: "var(--text-main)", marginBottom: 12 }}>Your Cart is Empty</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: 32 }}>Explore our sustainable marketplace to find the best supplies for your farm.</p>
        <button
          onClick={() => navigate("/")}
          style={{ background: "var(--primary)", color: "white", padding: "14px 32px", borderRadius: "var(--radius-md)", fontWeight: 700 }}
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2 style={{ fontSize: "2.5rem", marginBottom: 32, color: "var(--primary-dark)" }}>Shopping Cart</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: 40,
        }}
      >
        {/* ================= LEFT: CART ITEMS ================= */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="premium-card"
              style={{
                display: "flex",
                gap: 24,
                padding: 24,
                alignItems: "center"
              }}
            >
              {/* IMAGE */}
              <div style={{ width: 140, height: 140, borderRadius: "var(--radius-sm)", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
                <img
                  src={getProductImage(item.name, item.image)}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* DETAILS */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <h3 style={{ margin: 0, fontSize: "1.4rem" }}>{item.name}</h3>
                  <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--primary)" }}>₹{item.price * item.qty}</span>
                </div>
                <p style={{ margin: "0 0 20px", color: "var(--text-muted)", fontSize: 14 }}>
                  Unit Price: ₹{item.price}
                </p>

                {/* QTY CONTROLS */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      background: "var(--background)",
                      padding: 4,
                      borderRadius: 12,
                      border: "1px solid var(--border)"
                    }}
                  >
                    <button
                      onClick={() => updateQty(item._id, item.qty - 1)}
                      style={{ width: 32, height: 32, borderRadius: 8, background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}
                    >−</button>
                    <span style={{ width: 40, textAlign: "center", fontWeight: 700 }}>{item.qty}</span>
                    <button
                      onClick={() => updateQty(item._id, item.qty + 1)}
                      style={{ width: 32, height: 32, borderRadius: 8, background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}
                    >+</button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    style={{
                      background: "rgba(255, 0, 0, 0.05)",
                      border: "none",
                      color: "#dc3545",
                      padding: "8px 16px",
                      borderRadius: 10,
                      fontWeight: 600,
                      fontSize: 14
                    }}
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= RIGHT: SUMMARY ================= */}
        <div>
          <div
            className="glass-effect"
            style={{
              borderRadius: "var(--radius-md)",
              padding: 32,
              height: "fit-content",
              boxShadow: "var(--shadow-lg)",
              position: "sticky",
              top: 30,
              border: "1px solid var(--border)"
            }}
          >
            <h3 style={{ fontSize: "1.6rem", marginBottom: 24, paddingBottom: 16, borderBottom: "1.5px solid var(--border)" }}>Order Summary</h3>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ color: "var(--text-muted)" }}>Subtotal</span>
              <strong style={{ fontSize: "1.1rem" }}>₹{cartTotal}</strong>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ color: "var(--text-muted)" }}>Estimated Tax</span>
              <span style={{ color: "var(--text-muted)" }}>Calculated at checkout</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <span style={{ color: "var(--text-muted)" }}>Delivery</span>
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>FREE</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1.5rem",
                marginTop: 24,
                paddingTop: 24,
                borderTop: "2px solid var(--border)"
              }}
            >
              <strong>Total</strong>
              <strong style={{ color: "var(--primary-dark)" }}>₹{cartTotal}</strong>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              style={{
                width: "100%",
                marginTop: 32,
                padding: "18px",
                background: "var(--primary)",
                color: "white",
                borderRadius: "var(--radius-md)",
                fontSize: "1.1rem",
                fontWeight: 800,
                boxShadow: "0 10px 25px rgba(46, 125, 50, 0.3)"
              }}
            >
              Secure Checkout
            </button>

            <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 13, marginTop: 20 }}>
              🛡️ Payment secured by 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
