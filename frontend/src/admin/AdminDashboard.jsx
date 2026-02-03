import React, { useEffect, useState } from "react";
import { ShoppingBag, TrendingUp, Users, Package, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import api from "../utils/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    orderCount: 0,
    productCount: 0,
    customerCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          api.get("/orders"),
          api.get("/products"),
        ]);

        const orders = ordersRes.data || [];
        const products = productsRes.data || [];

        const revenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
        const uniqueCustomers = new Set(orders.map(o => o.user)).size;

        setStats({
          totalSales: revenue,
          orderCount: orders.length,
          productCount: products.length,
          customerCount: uniqueCustomers || 0,
        });
      } catch (err) {
        console.error("Dashboard Fetch Error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, trend, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1 }}
      whileHover={{ y: -5, boxShadow: "0 15px 35px rgba(0,0,0,0.1)" }}
      className="premium-card"
      style={{
        padding: isMobile ? 20 : 28,
        display: "flex",
        alignItems: "center",
        gap: isMobile ? 16 : 24,
        cursor: "pointer"
      }}
    >
      <div style={{
        background: `${color}15`,
        padding: isMobile ? 14 : 18,
        borderRadius: 16,
        color: color
      }}>
        <Icon size={isMobile ? 26 : 32} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{
          margin: "0 0 4px",
          color: "var(--text-muted)",
          fontSize: isMobile ? 11 : 13,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 0.5
        }}>
          {title}
        </p>
        <h2 style={{
          margin: 0,
          color: "var(--text-main)",
          fontSize: isMobile ? "1.4rem" : "1.8rem",
          fontWeight: 800
        }}>
          {value}
        </h2>
        {trend && (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginTop: 6,
            fontSize: isMobile ? 11 : 13,
            fontWeight: 600,
            color: "#22c55e"
          }}>
            <ArrowUpRight size={14} />
            {trend}
          </div>
        )}
      </div>
    </motion.div>
  );

  const SkeletonCard = () => (
    <div className="premium-card" style={{ padding: isMobile ? 20 : 28, display: "flex", alignItems: "center", gap: isMobile ? 16 : 24 }}>
      <div style={{
        width: isMobile ? 54 : 68,
        height: isMobile ? 54 : 68,
        borderRadius: 16,
        background: "var(--border)",
        animation: "pulse 1.5s infinite"
      }} />
      <div style={{ flex: 1 }}>
        <div style={{ width: 80, height: 12, borderRadius: 6, background: "var(--border)", marginBottom: 10 }} />
        <div style={{ width: 120, height: 24, borderRadius: 8, background: "var(--border)" }} />
      </div>
    </div>
  );

  return (
    <motion.div
      style={{ padding: isMobile ? 16 : 40 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <header style={{ marginBottom: isMobile ? 24 : 40 }}>
        <motion.h1
          style={{
            fontSize: isMobile ? "1.6rem" : "2.5rem",
            color: "var(--primary-dark)",
            margin: "0 0 8px"
          }}
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          Operations Analytics
        </motion.h1>
        <motion.p
          style={{ color: "var(--text-muted)", margin: 0, fontSize: isMobile ? 13 : 16 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Real-time business performance and inventory tracking.
        </motion.p>
      </header>

      {loading ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(260px, 1fr))",
          gap: isMobile ? 16 : 32
        }}>
          {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(260px, 1fr))",
          gap: isMobile ? 16 : 32
        }}>
          <StatCard title="Total Revenue" value={`₹${stats.totalSales.toLocaleString()}`} icon={TrendingUp} color="#2e7d32" trend="+12.5%" delay={1} />
          <StatCard title="Orders Processed" value={stats.orderCount} icon={ShoppingBag} color="#1565c0" trend="+8.2%" delay={2} />
          <StatCard title="Active Inventory" value={stats.productCount} icon={Package} color="#ef6c00" trend="In Stock" delay={3} />
          <StatCard title="Verified Customers" value={stats.customerCount} icon={Users} color="#6a1b9a" trend="+24 this week" delay={4} />
        </div>
      )}

      {/* Insights Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="premium-card"
        style={{
          marginTop: isMobile ? 24 : 40,
          padding: isMobile ? 20 : 32,
          background: "linear-gradient(135deg, var(--surface) 0%, var(--background) 100%)"
        }}
      >
        <h3 style={{ margin: "0 0 12px", color: "#1b4332", fontSize: isMobile ? "1rem" : "1.1rem" }}>
          🎯 Strategic Insights
        </h3>
        <p style={{ margin: 0, fontSize: isMobile ? "0.85rem" : "0.95rem", color: "#5e6b5e", lineHeight: 1.6 }}>
          KrishiSathi operational overview. Analyze harvest patterns and procurement velocity across Bharat's regions.
          Your marketplace is experiencing a <strong>15% surge</strong> in organic traffic this cycle.
          The <span style={{ color: "var(--primary)", fontWeight: 700 }}>Fertilizers</span> category is currently high in demand.
        </p>
      </motion.div>
    </motion.div>
  );
}

export default AdminDashboard;
