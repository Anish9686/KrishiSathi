import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Home, Leaf } from "lucide-react";
import api from "../utils/api";
import toast from "react-hot-toast";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", { email, password });

      if (data.user.role !== "admin") {
        toast.error("Access Denied: Admin account required");
        return;
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.user));

      toast.success("Admin Session Verified 🔐");
      window.location.href = "/admin";
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#f8faf8", padding: 20 }}>

      {/* Back to Store Link - Fixed at Top */}
      <Link
        to="/"
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: "var(--primary)",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: 14,
          padding: "10px 16px",
          background: "white",
          borderRadius: 25,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          transition: "all 0.2s ease"
        }}
      >
        <Home size={18} />
        Back to Store
      </Link>

      <div style={{ background: "white", padding: 40, borderRadius: 24, boxShadow: "0 20px 50px rgba(0,0,0,0.1)", width: "100%", maxWidth: 400 }}>

        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div style={{
            background: "linear-gradient(135deg, #1a3c34, #0d2820)",
            padding: 12,
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            gap: 10
          }}>
            <Leaf size={24} color="white" />
          </div>
        </div>

        <h2 style={{ color: "#1b5e20", textAlign: "center", marginBottom: 8 }}>Admin Portal</h2>
        <p style={{ textAlign: "center", color: "#666", marginBottom: 32 }}>Secure access for marketplace managers</p>

        <form onSubmit={submitHandler}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Email Address</label>
            <input
              type="email"
              placeholder="admin@krishisathi.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: "14px 18px", borderRadius: 12, border: "1.5px solid #e0e0e0", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: 32 }}>
            <label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "14px 18px", borderRadius: 12, border: "1.5px solid #e0e0e0", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: 16,
              background: "linear-gradient(135deg, #2e7d32, #4caf50)",
              color: "white",
              border: "none",
              borderRadius: 12,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.3s ease",
              opacity: loading ? 0.7 : 1,
              boxShadow: "0 4px 16px rgba(46, 125, 50, 0.3)"
            }}
          >
            {loading ? "Verifying..." : "Sign In to Dashboard"}
          </button>
        </form>

        {/* Alternative link at bottom */}
        <div style={{ textAlign: "center", marginTop: 24, paddingTop: 24, borderTop: "1px solid #eee" }}>
          <Link
            to="/"
            style={{
              color: "#666",
              textDecoration: "none",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6
            }}
          >
            <Home size={16} />
            Return to KrishiSathi Store
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
