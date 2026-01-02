import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { saveToken } from "../utils/auth";
import { syncCartAfterLogin } from "../utils/cartsync";
import toast from "react-hot-toast";
import { Leaf, LogIn, UserPlus, Shield, Eye, EyeOff } from "lucide-react";

export default function LoginSignup({ onAuthSuccess }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = isLogin ? "/auth/login" : "/auth/register";

      const payload = isLogin
        ? { email: form.email, password: form.password }
        : form;

      const res = await api.post(url, payload);

      saveToken(res.data.token);
      await syncCartAfterLogin();
      toast.success(isLogin ? "Welcome back to KrishiSathi!" : "Account created! Welcome to the family. 🌱");
      onAuthSuccess && onAuthSuccess();
      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.message || "Something went wrong. Please check your details.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ minHeight: "calc(100vh - 80px)", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="premium-card" style={{ width: 440, padding: 48, boxShadow: "var(--shadow-lg)", position: "relative", overflow: "hidden" }}>
        {/* Subtle Decorative Element */}
        <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, background: "var(--primary-light)", opacity: 0.1, borderRadius: "50%" }}></div>

        <header style={{ textAlign: "center", marginBottom: 32, position: "relative" }}>
          <div style={{ background: "var(--primary)", width: 72, height: 72, borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: "white", boxShadow: "0 12px 24px rgba(45, 106, 79, 0.2)" }}>
            <Leaf size={36} />
          </div>
          <h1 style={{ fontSize: "2.8rem", color: "var(--primary-dark)", marginBottom: 16 }}>
            Krishi<span style={{ color: "var(--primary)", fontWeight: 900 }}>Sathi</span> Partner
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: 40, lineHeight: 1.6 }}>
            Modernizing Bharat's agriculture through smart procurement. Your technology-first companion in the fields.
          </p>
        </header>

        {error && (
          <div style={{ background: "#fff5f5", color: "#c53030", padding: "14px 20px", borderRadius: 16, fontSize: 14, marginBottom: 24, textAlign: "center", border: "1px solid #fed7d7", fontWeight: 500 }}>
            <Shield size={16} style={{ verticalAlign: "middle", marginRight: 8 }} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {!isLogin && (
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "16px 20px" }}
            />
          )}

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "16px 20px" }}
          />

          <div style={{ position: "relative" }}>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "16px 20px", paddingRight: form.password.length > 0 ? "50px" : "20px" }}
            />
            {form.password.length > 0 && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-muted)",
                  transition: "all 0.2s ease",
                  opacity: 1,
                  animation: "fadeIn 0.2s ease-out"
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "18px",
              background: "var(--primary)",
              color: "white",
              borderRadius: "var(--radius-md)",
              fontSize: 17,
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "var(--shadow-md)",
              marginTop: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10
            }}
          >
            {loading ? "Verifying..." : (
              <>
                {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                {isLogin ? "Login to Account" : "Register as Partner"}
              </>
            )}
          </button>
        </form>

        <div style={{ display: "flex", alignItems: "center", margin: "36px 0", gap: 16 }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }}></div>
          <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 700 }}>OR</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }}></div>
        </div>

        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{
            width: "100%",
            background: "white",
            border: "2px solid var(--border)",
            color: "var(--primary-dark)",
            padding: "16px",
            borderRadius: "var(--radius-md)",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontSize: 15
          }}
          onMouseEnter={(e) => e.target.style.background = "var(--background)"}
          onMouseLeave={(e) => e.target.style.background = "white"}
        >
          {isLogin ? "Create New Account" : "Sign In to Existing"}
        </button>
      </div>
    </div>
  );
}
