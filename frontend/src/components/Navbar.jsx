import { useState, useEffect } from "react";
import { logoutUser, logoutAdmin } from "../utils/auth";
import { useCart } from "../context/CartContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Leaf, ShoppingCart, User, LogOut, LayoutDashboard, Menu, X, Home, Cloud, Brain, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isUser = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("adminToken");
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    if (isAdmin) logoutAdmin();
    if (isUser) logoutUser();
    window.location.href = "/";
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Shop", icon: Home },
    { path: "/recommendation", label: "AI Advisory", icon: Brain },
    { path: "/advisory", label: "Weather", icon: Cloud },
  ];

  if (isUser) {
    navItems.push({ path: "/my-orders", label: "Orders", icon: Package });
  }

  // CONSISTENT button style for ALL nav items including Cart
  const getButtonStyle = (active) => ({
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "10px 16px",
    borderRadius: 25,
    fontSize: "14px",
    fontWeight: active ? 700 : 600,
    color: active ? "white" : "var(--text-main)",
    background: active ? "linear-gradient(135deg, var(--primary), var(--primary-light))" : "rgba(0,0,0,0.03)",
    textDecoration: "none",
    transition: "all 0.2s ease",
    border: active ? "none" : "1px solid var(--border)",
    boxShadow: active ? "0 4px 12px rgba(45, 106, 79, 0.25)" : "none",
    whiteSpace: "nowrap"
  });

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="glass-effect"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          padding: scrolled ? "10px 24px" : "14px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid var(--border)",
          transition: "all 0.3s ease",
          backdropFilter: scrolled ? "blur(20px)" : "blur(12px)",
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.08)" : "none"
        }}
      >
        {/* Logo */}
        <motion.div
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            fontSize: "1.4rem",
            fontWeight: 800,
            cursor: "pointer",
            color: "var(--primary-dark)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexShrink: 0
          }}
        >
          <div style={{
            background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
            padding: "6px 10px",
            borderRadius: 12,
            color: "white",
            display: "flex",
            alignItems: "center",
            boxShadow: "0 4px 12px rgba(45, 106, 79, 0.25)"
          }}>
            <Leaf size={20} fill="white" />
          </div>
          <span>Krishi<span style={{ color: "var(--primary)", fontWeight: 900 }}>Sathi</span></span>
        </motion.div>

        {/* Desktop Navigation - ALL BUTTONS SAME STYLE */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "nowrap" }} className="desktop-only">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.path} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to={item.path} style={getButtonStyle(isActive(item.path))}>
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            );
          })}

          {/* Cart - SAME STYLE AS OTHER BUTTONS */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/cart" style={getButtonStyle(isActive("/cart"))}>
              <ShoppingCart size={16} />
              <span>{cartCount}</span>
            </Link>
          </motion.div>

          {/* Admin - SAME STYLE */}
          {isAdmin && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/admin" style={getButtonStyle(location.pathname.startsWith("/admin"))}>
                <LayoutDashboard size={16} />
                <span>Admin</span>
              </Link>
            </motion.div>
          )}

          {/* Auth Button - SAME STYLE */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {isUser || isAdmin ? (
              <button onClick={logout} style={{
                ...getButtonStyle(false),
                background: "rgba(220, 53, 69, 0.08)",
                color: "#dc3545",
                border: "1px solid rgba(220, 53, 69, 0.2)",
                cursor: "pointer"
              }}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            ) : (
              <button onClick={() => navigate("/login")} style={{
                ...getButtonStyle(true),
                cursor: "pointer",
                border: "none"
              }}>
                <User size={16} />
                <span>Login</span>
              </button>
            )}
          </motion.div>
        </div>

        {/* Mobile: Cart + Menu */}
        <div className="mobile-only" style={{ display: "none", alignItems: "center", gap: "10px" }}>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link to="/cart" style={{
              position: "relative",
              background: "rgba(45, 106, 79, 0.08)",
              padding: "10px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <ShoppingCart size={20} color="var(--primary)" />
              {cartCount > 0 && (
                <span style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  background: "#dc2626",
                  color: "white",
                  borderRadius: "50%",
                  width: 18,
                  height: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  fontWeight: 700
                }}>
                  {cartCount}
                </span>
              )}
            </Link>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(true)}
            style={{
              background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
              color: "white",
              border: "none",
              padding: "10px",
              borderRadius: 12,
              cursor: "pointer",
              display: "flex",
              boxShadow: "0 4px 12px rgba(45, 106, 79, 0.25)"
            }}
          >
            <Menu size={20} />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 9999,
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "white",
                width: "80%",
                maxWidth: 300,
                height: "100%",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                overflowY: "auto",
                boxShadow: "-4px 0 20px rgba(0, 0, 0, 0.1)"
              }}
            >
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{ alignSelf: "flex-end", background: "transparent", border: "none", padding: 8, cursor: "pointer", marginBottom: 16 }}
              >
                <X size={24} color="var(--text-main)" />
              </button>

              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "14px 16px",
                      borderRadius: 12,
                      fontSize: "15px",
                      fontWeight: isActive(item.path) ? 700 : 600,
                      color: isActive(item.path) ? "var(--primary)" : "var(--text-main)",
                      background: isActive(item.path) ? "rgba(45, 106, 79, 0.1)" : "transparent",
                      textDecoration: "none"
                    }}
                  >
                    <Icon size={20} />
                    {item.label}
                  </Link>
                );
              })}

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 16px",
                    borderRadius: 12,
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "var(--text-main)",
                    textDecoration: "none"
                  }}
                >
                  <LayoutDashboard size={20} />
                  Admin Dashboard
                </Link>
              )}

              <div style={{ borderTop: "1px solid var(--border)", marginTop: "auto", paddingTop: "16px" }}>
                {isUser || isAdmin ? (
                  <button onClick={logout} style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "14px",
                    borderRadius: 12,
                    fontSize: "15px",
                    fontWeight: 700,
                    background: "rgba(220, 53, 69, 0.08)",
                    color: "#dc3545",
                    border: "none",
                    cursor: "pointer"
                  }}>
                    <LogOut size={18} />
                    Logout
                  </button>
                ) : (
                  <button onClick={() => { setMobileMenuOpen(false); navigate("/login"); }} style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "14px",
                    borderRadius: 12,
                    fontSize: "15px",
                    fontWeight: 700,
                    background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(45, 106, 79, 0.25)"
                  }}>
                    <User size={18} />
                    Partner Login
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
