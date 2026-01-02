import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, ClipboardList, LogOut, Leaf } from "lucide-react";
import toast from "react-hot-toast";

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{
        width: 260,
        background: "linear-gradient(180deg, #1a3c34 0%, #0d2820 100%)",
        color: "white",
        padding: 0,
        display: "flex",
        flexDirection: "column"
      }}>
        {/* Brand Header */}
        <div style={{
          padding: "28px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.1)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              background: "rgba(255,255,255,0.15)",
              padding: 10,
              borderRadius: 12
            }}>
              <Leaf size={24} color="white" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 800 }}>
                Krishi<span style={{ color: "#4caf50" }}>Sathi</span>
              </h2>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 600, letterSpacing: 1 }}>ADMIN PORTAL</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ padding: "24px 16px", flex: 1 }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 18px",
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
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: "16px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 18px",
              borderRadius: 12,
              width: "100%",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.8)",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1,
        background: "var(--background)",
        minHeight: "100vh",
        overflowY: "auto"
      }}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
