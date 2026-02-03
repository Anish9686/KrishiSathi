import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, ClipboardList, LogOut, Leaf, Menu, X, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const navItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/products", icon: Package, label: "Products" },
    { path: "/admin/orders", icon: ClipboardList, label: "Orders" },
  ];

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <aside style={{
      width: 250,
      minWidth: 250,
      background: "linear-gradient(180deg, #1a3c34 0%, #0d2820 100%)",
      color: "white",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      position: "sticky",
      top: 0
    }}>
      {/* Brand Header */}
      <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ background: "rgba(255,255,255,0.15)", padding: 10, borderRadius: 12 }}>
            <Leaf size={22} color="white" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800, color: "white" }}>
              Krishi<span style={{ color: "#4caf50" }}>Sathi</span>
            </h2>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontWeight: 600, letterSpacing: 1 }}>ADMIN PORTAL</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: "20px 12px", flex: 1 }}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 16px",
              borderRadius: 12,
              marginBottom: 8,
              textDecoration: "none",
              color: isActive(item.path) ? "white" : "rgba(255,255,255,0.7)",
              background: isActive(item.path) ? "rgba(76, 175, 80, 0.25)" : "transparent",
              fontWeight: isActive(item.path) ? 700 : 500,
              fontSize: 15,
              transition: "all 0.2s ease",
              border: isActive(item.path) ? "1px solid rgba(76, 175, 80, 0.3)" : "1px solid transparent"
            }}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", margin: "20px 0" }} />

        {/* Back to Store */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "14px 16px",
            borderRadius: 12,
            textDecoration: "none",
            color: "rgba(255,255,255,0.6)",
            fontSize: 14,
            fontWeight: 500
          }}
        >
          <Home size={18} />
          <span>Back to Store</span>
        </Link>
      </nav>

      {/* Logout */}
      <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "14px 16px",
            borderRadius: 12,
            width: "100%",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.8)",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );

  // Mobile Header
  const MobileHeader = () => (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: "linear-gradient(135deg, #1a3c34, #0d2820)",
      padding: "14px 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ background: "rgba(255,255,255,0.15)", padding: 8, borderRadius: 10 }}>
          <Leaf size={18} color="white" />
        </div>
        <span style={{ color: "white", fontWeight: 700, fontSize: "1.1rem" }}>
          Krishi<span style={{ color: "#4caf50" }}>Sathi</span>
        </span>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontWeight: 600, marginLeft: 4 }}>ADMIN</span>
      </div>
      <button
        onClick={() => setMobileMenuOpen(true)}
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "none",
          borderRadius: 10,
          padding: "10px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Menu size={22} color="white" />
      </button>
    </div>
  );

  // Mobile Drawer
  const MobileDrawer = () => (
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
            background: "rgba(0,0,0,0.6)",
            zIndex: 1000
          }}
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "85%",
              maxWidth: 300,
              height: "100%",
              background: "linear-gradient(180deg, #1a3c34 0%, #0d2820 100%)",
              display: "flex",
              flexDirection: "column",
              boxShadow: "4px 0 20px rgba(0,0,0,0.3)"
            }}
          >
            {/* Drawer Header */}
            <div style={{
              padding: "20px",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Leaf size={20} color="white" />
                <span style={{ color: "white", fontWeight: 700 }}>Admin Panel</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: "transparent", border: "none", padding: 8, cursor: "pointer" }}
              >
                <X size={24} color="white" />
              </button>
            </div>

            {/* Drawer Nav */}
            <nav style={{ padding: "20px 12px", flex: 1 }}>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "16px 18px",
                      borderRadius: 12,
                      marginBottom: 10,
                      textDecoration: "none",
                      color: isActive(item.path) ? "white" : "rgba(255,255,255,0.7)",
                      background: isActive(item.path) ? "rgba(76, 175, 80, 0.25)" : "transparent",
                      fontWeight: isActive(item.path) ? 700 : 500,
                      fontSize: 16
                    }}
                  >
                    <item.icon size={22} />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", margin: "20px 0" }} />

              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "16px 18px",
                  borderRadius: 12,
                  textDecoration: "none",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 15
                }}
              >
                <Home size={20} />
                <span>Back to Store</span>
              </Link>
            </nav>

            {/* Drawer Logout */}
            <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <button
                onClick={handleLogout}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  padding: "16px",
                  borderRadius: 12,
                  width: "100%",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                <LogOut size={20} />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Desktop Sidebar - Only show on desktop */}
      {!isMobile && <DesktopSidebar />}

      {/* Mobile Header - Only show on mobile */}
      {isMobile && <MobileHeader />}

      {/* Mobile Drawer */}
      <MobileDrawer />

      {/* Main Content */}
      <main style={{
        flex: 1,
        background: "var(--background)",
        minHeight: "100vh",
        overflowY: "auto",
        paddingTop: isMobile ? 60 : 0
      }}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
