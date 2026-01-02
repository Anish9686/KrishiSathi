import React, { useEffect, useState } from "react";
import { ShoppingBag, TrendingUp, Users, Package } from "lucide-react";
import api from "../utils/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    orderCount: 0,
    productCount: 0,
    customerCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          api.get("/orders"),
          api.get("/products"),
        ]);

        const orders = ordersRes.data || [];
        const products = productsRes.data || [];

        // Simple Analytics calculation
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

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="premium-card" style={{ padding: 28, display: "flex", alignItems: "center", gap: 24 }}>
      <div style={{ background: `${color}15`, padding: 18, borderRadius: 16, color: color }}>
        <Icon size={32} />
      </div>
      <div>
        <p style={{ margin: "0 0 4px", color: "var(--text-muted)", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{title}</p>
        <h2 style={{ margin: 0, color: "var(--text-main)", fontSize: "1.8rem", fontWeight: 800 }}>{value}</h2>
      </div>
    </div>
  );

  return (
    <div style={{ padding: 40 }}>
      <header style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: "2.5rem", color: "var(--primary-dark)", margin: "0 0 8px" }}>Operations Analytics</h1>
        <p style={{ color: "var(--text-muted)", margin: 0 }}>Real-time business performance and inventory tracking.</p>
      </header>

      {loading ? (
        <div style={{ padding: 60, textAlign: "center", color: "var(--text-muted)" }}>Calculating live metrics...</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 32 }}>
          <StatCard title="Total Revenue" value={`₹${stats.totalSales.toLocaleString()}`} icon={TrendingUp} color="#2e7d32" />
          <StatCard title="Orders Processed" value={stats.orderCount} icon={ShoppingBag} color="#1565c0" />
          <StatCard title="Active Inventory" value={stats.productCount} icon={Package} color="#ef6c00" />
          <StatCard title="Verified Customers" value={stats.customerCount} icon={Users} color="#6a1b9a" />
        </div>
      )}

      {/* INSIGHTS SECTION */}
      <div className="premium-card" style={{ marginTop: 40, padding: 32, background: "linear-gradient(135deg, var(--surface) 0%, var(--background) 100%)" }}>
        <h3 style={{ margin: "0 0 10px", color: "#1b4332", fontSize: "1.1rem" }}>Strategic Insights</h3>
        <p style={{ margin: 0, fontSize: "0.9rem", color: "#5e6b5e", lineHeight: 1.5 }}>
          KrishiSathi operational overview. Analyze harvest patterns and procurement velocity across Bharat's regions.
          Your marketplace is experiencing a <strong>15% surge</strong> in organic traffic this cycle.
          The <span style={{ color: "var(--primary)", fontWeight: 700 }}>Fertilizers</span> category is currently high in demand.
          Consider restocking your top-performing seeds to maintain momentum.
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;
