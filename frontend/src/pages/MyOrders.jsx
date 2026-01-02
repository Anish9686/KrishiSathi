import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { Package, Clock, CheckCircle, XCircle, Truck } from "lucide-react";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get("/orders/mine");
                setOrders(res.data);
            } catch (err) {
                console.error("Failed to fetch orders", err);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchOrders();
    }, [token]);

    const getStatusIcon = (status) => {
        switch (status) {
            case "Delivered": return <CheckCircle size={18} />;
            case "Shipped": return <Truck size={18} />;
            case "Cancelled": return <XCircle size={18} />;
            default: return <Clock size={18} />;
        }
    };

    const getStatusStyle = (status) => ({
        padding: "8px 16px",
        borderRadius: 12,
        background: status === "Delivered" ? "rgba(46, 125, 50, 0.1)" :
            status === "Shipped" ? "rgba(25, 118, 210, 0.1)" :
                status === "Cancelled" ? "rgba(198, 40, 40, 0.1)" : "rgba(239, 108, 0, 0.1)",
        color: status === "Delivered" ? "#2e7d32" :
            status === "Shipped" ? "#1976d2" :
                status === "Cancelled" ? "#c62828" : "#ef6c00",
        fontWeight: 700,
        fontSize: 13,
        display: "flex",
        alignItems: "center",
        gap: 8,
        border: `1px solid ${status === "Delivered" ? "rgba(46, 125, 50, 0.2)" :
            status === "Shipped" ? "rgba(25, 118, 210, 0.2)" :
                status === "Cancelled" ? "rgba(198, 40, 40, 0.2)" : "rgba(239, 108, 0, 0.2)"}`
    });

    if (loading) {
        return (
            <div className="page-container" style={{ textAlign: "center", padding: "100px 24px" }}>
                <div className="animate-pulse" style={{ width: 60, height: 60, background: "var(--primary)", borderRadius: "50%", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Package size={28} color="white" />
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>Loading your orders...</p>
            </div>
        );
    }

    return (
        <div className="page-container animate-fade-in">
            <header style={{ marginBottom: 40, textAlign: "center" }}>
                <h1 style={{ fontSize: "2.5rem", color: "var(--primary-dark)", margin: "0 0 12px" }}>My Orders</h1>
                <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>Track your KrishiSathi purchases</p>
            </header>

            {orders.length === 0 ? (
                <div className="glass-effect" style={{ textAlign: "center", padding: "80px 40px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
                    <div style={{ fontSize: "4rem", marginBottom: 20 }}>📦</div>
                    <h2 style={{ fontSize: "1.8rem", color: "var(--text-main)", marginBottom: 12 }}>No Orders Yet</h2>
                    <p style={{ color: "var(--text-muted)", marginBottom: 32 }}>Start shopping to see your orders here!</p>
                    <a href="/" style={{ background: "var(--primary)", color: "white", padding: "14px 32px", borderRadius: "var(--radius-md)", fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
                        Explore Products
                    </a>
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="premium-card"
                            style={{ padding: 28, borderRadius: "var(--radius-md)" }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: "1.3rem", color: "var(--primary-dark)" }}>
                                        Order #{order._id.slice(-6).toUpperCase()}
                                    </h3>
                                    <p style={{ margin: "8px 0 0", color: "var(--text-muted)", fontSize: 14 }}>
                                        Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                                    </p>
                                </div>
                                <div style={getStatusStyle(order.orderStatus)}>
                                    {getStatusIcon(order.orderStatus)}
                                    {order.orderStatus}
                                </div>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {order.items.map((item, idx) => (
                                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: idx < order.items.length - 1 ? "1px dashed var(--border)" : "none" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                            <div style={{ width: 50, height: 50, background: "var(--background)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
                                                🌾
                                            </div>
                                            <div>
                                                <p style={{ margin: 0, fontWeight: 600, color: "var(--text-main)" }}>{item.name}</p>
                                                <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--text-muted)" }}>Qty: {item.qty} × ₹{item.price}</p>
                                            </div>
                                        </div>
                                        <span style={{ fontWeight: 700, color: "var(--primary-dark)" }}>₹{item.price * item.qty}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20, paddingTop: 20, borderTop: "2px solid var(--border)" }}>
                                <span style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text-muted)" }}>Total Amount</span>
                                <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary-dark)" }}>₹{order.totalAmount}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
