import { logoutUser, logoutAdmin } from "../utils/auth";
import { useCart } from "../context/CartContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Leaf, ShoppingCart, User, LogOut, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const isUser = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("adminToken");
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    if (isAdmin) logoutAdmin();
    if (isUser) logoutUser();
    window.location.href = "/";
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass-effect" style={{
      position: "sticky",
      top: 0,
      zIndex: 1000,
      padding: "16px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid var(--border)",
      marginBottom: 0,
      flexWrap: "wrap",
      gap: "16px"
    }}>
      <div
        onClick={() => navigate("/")}
        style={{
          fontSize: "1.8rem",
          fontWeight: 800,
          cursor: "pointer",
          color: "var(--primary-dark)",
          display: "flex",
          alignItems: "center",
          gap: "6px"
        }}
      >
        <div style={{ background: "var(--primary)", padding: "6px 10px", borderRadius: 12, color: "white", display: "flex", alignItems: "center" }}>
          <Leaf size={24} fill="white" />
        </div>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span style={{ color: "var(--primary-dark)", letterSpacing: "-0.5px" }}>Krishi</span>
          <span style={{
            color: "var(--primary)",
            fontWeight: 900,
          }}>Sathi</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", justifyContent: "flex-end" }}>
        <Link to="/" style={getLinkStyle(isActive("/"))}>Shop</Link>
        <Link to="/recommendation" style={getLinkStyle(isActive("/recommendation"))}>AI Advisory</Link>
        <Link to="/advisory" style={getLinkStyle(isActive("/advisory"))}>Weather Dashboard</Link>

        {isUser && (
          <Link to="/my-orders" style={getLinkStyle(isActive("/my-orders"))}>My Orders</Link>
        )}

        <Link to="/cart" style={{
          ...getLinkStyle(isActive("/cart")),
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: isActive("/cart") ? "var(--primary)" : "rgba(46, 125, 50, 0.08)",
          color: isActive("/cart") ? "white" : "var(--primary)",
          padding: "10px 20px",
          borderRadius: 99
        }}>
          <ShoppingCart size={18} />
          <span>{cartCount}</span>
        </Link>

        {isAdmin && (
          <Link to="/admin" style={{ ...getLinkStyle(location.pathname.startsWith("/admin")), display: "flex", alignItems: "center", gap: 8 }}>
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
        )}

        {isUser || isAdmin ? (
          <button style={{
            background: "rgba(255, 0, 0, 0.05)",
            color: "#dc3545",
            border: "none",
            padding: "10px 20px",
            borderRadius: 99,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8
          }} onClick={logout}>
            <LogOut size={18} />
            Exit
          </button>
        ) : (
          <Link to="/login" style={{
            background: "var(--primary)",
            color: "white",
            padding: "10px 24px",
            borderRadius: 99,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 8
          }}>
            <User size={18} />
            Partner Login
          </Link>
        )}
      </div>
    </nav>
  );
}

const getLinkStyle = (active) => ({
  color: active ? "var(--primary)" : "var(--text-muted)",
  textDecoration: "none",
  fontWeight: active ? 700 : 600,
  fontSize: 15,
  padding: "10px 16px",
  borderRadius: 12,
  transition: "all 0.2s ease",
  background: active ? "rgba(46, 125, 50, 0.05)" : "transparent"
});
