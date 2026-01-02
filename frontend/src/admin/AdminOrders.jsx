import React, { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const adminToken = localStorage.getItem("adminToken");

    const fetchOrders = async () => {
        try {
            const res = await api.get("/orders");
            const data = res.data;

            if (Array.isArray(data)) {
                setOrders(data);
            } else {
                setOrders([]);
            }
        } catch (err) {
            console.error("Failed to fetch orders", err);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (adminToken) fetchOrders();
    }, [adminToken]);

    const updateStatus = async (orderId, newStatus) => {
        try {
            const res = await api.put(`/orders/${orderId}/status`, { orderStatus: newStatus });
            if (res.status === 200) {
                toast.success(`Order status updated to ${newStatus}`);
                fetchOrders();
            }
        } catch (err) {
            console.error("Failed to update status", err);
            toast.error("Status update failed");
        }
    };

    if (loading) return <div style={{ padding: 40, textAlign: "center", color: "var(--text-muted)" }}>Synchronizing with order database...</div>;

    return (
        <div style={{ padding: 40 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <h1 style={{ margin: 0, color: "var(--primary-dark)" }}>Order Inventory</h1>
                <div style={{ background: "var(--surface)", padding: "10px 20px", borderRadius: 12, border: "1px solid var(--border)", fontSize: 14, fontWeight: 600 }}>
                    Total Processing: {orders.length}
                </div>
            </div>

            <div className="premium-card" style={{ overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "var(--background)", textAlign: "left" }}>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>Market Customer</th>
                            <th style={thStyle}>Transaction Total</th>
                            <th style={thStyle}>Fulfillment Status</th>
                            <th style={thStyle}>Operational Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} style={{ borderBottom: "1.5px solid var(--border)", transition: "background 0.2s" }}>
                                <td style={{ ...tdStyle, fontWeight: 700, color: "var(--text-muted)" }}>#{order._id.slice(-6).toUpperCase()}</td>
                                <td style={tdStyle}>
                                    <div style={{ fontWeight: 700, color: "var(--text-main)" }}>{order.user?.name || "Premium User"}</div>
                                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{order.user?.email || "user@example.com"}</div>
                                </td>
                                <td style={{ ...tdStyle, fontWeight: 800, color: "var(--primary-dark)" }}>₹{order.totalAmount}</td>
                                <td style={tdStyle}>
                                    <span style={statusBadge(order.orderStatus)}>
                                        {order.orderStatus}
                                    </span>
                                </td>
                                <td style={tdStyle}>
                                    <select
                                        value={order.orderStatus}
                                        onChange={(e) => updateStatus(order._id, e.target.value)}
                                        style={{ ...selectStyle, background: "var(--background)", border: "1px solid var(--border)", fontWeight: 600 }}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && (
                    <div style={{ padding: 60, textAlign: "center", color: "var(--text-muted)" }}>
                        <div style={{ fontSize: "3rem", marginBottom: 16 }}>📦</div>
                        <p style={{ fontSize: "1.2rem", fontWeight: 600 }}>No orders currently in the queue.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const thStyle = { padding: "20px 24px", color: "var(--text-muted)", fontSize: 13, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 };
const tdStyle = { padding: "20px 24px" };
const selectStyle = { padding: "10px 14px", borderRadius: "10px", outline: "none", cursor: "pointer" };

const statusBadge = (status) => ({
    padding: "6px 14px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "800",
    textTransform: "uppercase",
    display: "inline-block",
    background: status === "Delivered" ? "#e8f5e9" : status === "Shipped" ? "#e3f2fd" : status === "Cancelled" ? "#ffebee" : "#fff3e0",
    color: status === "Delivered" ? "#2e7d32" : status === "Shipped" ? "#1976d2" : status === "Cancelled" ? "#c62828" : "#ef6c00",
    border: `1px solid ${status === "Delivered" ? "#c8e6c9" : status === "Shipped" ? "#bbdefb" : status === "Cancelled" ? "#ffcdd2" : "#ffe0b2"}`,
});

export default AdminOrders;
