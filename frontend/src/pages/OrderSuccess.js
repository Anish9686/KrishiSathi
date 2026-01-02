import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ShoppingBag, Truck } from "lucide-react";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container animate-fade-in" style={{ textAlign: "center", padding: "80px 24px" }}>
      {/* Success Animation */}
      <div style={{
        width: 120,
        height: 120,
        background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
        borderRadius: "50%",
        margin: "0 auto 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 20px 40px rgba(46, 125, 50, 0.3)",
        animation: "scaleIn 0.5s ease-out"
      }}>
        <CheckCircle size={56} color="white" strokeWidth={2.5} />
      </div>

      <h1 style={{
        fontSize: "2.8rem",
        color: "var(--primary-dark)",
        marginBottom: 16,
        fontWeight: 800
      }}>
        Order Confirmed! 🎉
      </h1>

      <p style={{
        color: "var(--text-muted)",
        fontSize: "1.2rem",
        marginBottom: 40,
        maxWidth: 500,
        margin: "0 auto 40px"
      }}>
        Thank you for shopping with <strong style={{ color: "var(--primary)" }}>KrishiSathi</strong>.
        Your order has been placed successfully and will be processed shortly.
      </p>

      {/* Order Status Timeline */}
      <div className="glass-effect" style={{
        maxWidth: 500,
        margin: "0 auto 40px",
        padding: 32,
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ textAlign: "center", flex: 1 }}>
            <div style={{ width: 48, height: 48, background: "var(--primary)", borderRadius: "50%", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CheckCircle size={24} color="white" />
            </div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: "var(--primary)" }}>Confirmed</p>
          </div>
          <div style={{ width: 60, height: 2, background: "var(--border)" }}></div>
          <div style={{ textAlign: "center", flex: 1 }}>
            <div style={{ width: 48, height: 48, background: "var(--border)", borderRadius: "50%", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ShoppingBag size={24} color="var(--text-muted)" />
            </div>
            <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "var(--text-muted)" }}>Processing</p>
          </div>
          <div style={{ width: 60, height: 2, background: "var(--border)" }}></div>
          <div style={{ textAlign: "center", flex: 1 }}>
            <div style={{ width: 48, height: 48, background: "var(--border)", borderRadius: "50%", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Truck size={24} color="var(--text-muted)" />
            </div>
            <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "var(--text-muted)" }}>Delivered</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        <button
          onClick={() => navigate("/orders")}
          style={{
            padding: "16px 32px",
            background: "var(--primary)",
            color: "white",
            border: "none",
            borderRadius: "var(--radius-md)",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 10px 25px rgba(46, 125, 50, 0.3)",
            transition: "all 0.3s ease"
          }}
        >
          View My Orders
        </button>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "16px 32px",
            background: "transparent",
            color: "var(--primary)",
            border: "2px solid var(--primary)",
            borderRadius: "var(--radius-md)",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
        >
          Continue Shopping
        </button>
      </div>

      {/* Trust Badges */}
      <div style={{ marginTop: 48, color: "var(--text-muted)", fontSize: 14 }}>
        <p>🛡️ Your payment is secured • 📦 Fast dispatch • 🌱 Quality guaranteed</p>
      </div>
    </div>
  );
};

export default OrderSuccess;
