import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      navigate("/admin");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f8faf8" }}>
      <div style={{ background: "white", padding: 40, borderRadius: 24, boxShadow: "0 20px 50px rgba(0,0,0,0.1)", width: "100%", maxWidth: 400 }}>
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
              style={{ width: "100%", padding: "14px 18px", borderRadius: 12, border: "1.5px solid #e0e0e0", outline: "none" }}
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
              style={{ width: "100%", padding: "14px 18px", borderRadius: 12, border: "1.5px solid #e0e0e0", outline: "none" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", padding: 16, background: "#2e7d32", color: "white", border: "none", borderRadius: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.3s ease", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Verifying..." : "Sign In to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
