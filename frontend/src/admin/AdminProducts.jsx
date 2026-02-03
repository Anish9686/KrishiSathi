import React, { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { Plus, Trash2, Package, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    mainCategory: "",
    subCategory: "",
    price: "",
    unit: "",
    stock: "",
    cropType: "",
    tags: "",
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  /* ================= FETCH PRODUCTS ================= */
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      setProducts(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ================= FORM HANDLING ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= CREATE PRODUCT ================= */
  const createProduct = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        name: form.name,
        description: form.description,
        mainCategory: form.mainCategory,
        subCategory: form.subCategory,
        price: Number(form.price),
        unit: form.unit,
        stock: Number(form.stock),
        cropType: form.cropType,
        tags: form.tags.split(",").map((t) => t.trim()),
      };

      await api.post("/products", payload);
      toast.success("Product added successfully! 🎉");

      setForm({
        name: "",
        description: "",
        mainCategory: "",
        subCategory: "",
        price: "",
        unit: "",
        stock: "",
        cropType: "",
        tags: "",
      });

      fetchProducts();
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Failed to add product");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= DELETE PRODUCT ================= */
  const deleteProduct = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This action cannot be undone.`)) return;

    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  /* ================= UI ================= */
  return (
    <motion.div
      style={{ padding: isMobile ? 16 : 40 }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: isMobile ? 20 : 32,
          flexWrap: "wrap",
          gap: 16
        }}
      >
        <div>
          <h1 style={{ margin: 0, color: "var(--primary-dark)", fontSize: isMobile ? "1.5rem" : "2rem" }}>Product Inventory</h1>
          <p style={{ margin: "8px 0 0", color: "var(--text-muted)", fontSize: isMobile ? 13 : 14 }}>Manage your marketplace catalog</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => fetchProducts()}
          style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: isMobile ? "10px 14px" : "12px 20px", borderRadius: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: isMobile ? 13 : 14 }}
        >
          <RefreshCw size={16} />
          Refresh
        </motion.button>
      </motion.div>

      {/* ADD PRODUCT FORM */}
      <motion.div
        variants={itemVariants}
        className="premium-card"
        style={{ padding: isMobile ? 20 : 32, marginBottom: isMobile ? 20 : 32 }}
      >
        <h3 style={{ margin: "0 0 20px", color: "var(--text-main)", display: "flex", alignItems: "center", gap: 10, fontSize: isMobile ? "1rem" : "1.1rem" }}>
          <Plus size={20} color="var(--primary)" />
          Add New Product
        </h3>
        <form onSubmit={createProduct}>
          {/* Row 1: Name, Category */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 12 : 16, marginBottom: isMobile ? 12 : 20 }}>
            <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required style={inputStyle} />
            <input name="mainCategory" placeholder="Main Category" value={form.mainCategory} onChange={handleChange} required style={inputStyle} />
            <input name="subCategory" placeholder="Sub Category" value={form.subCategory} onChange={handleChange} required style={inputStyle} />
          </div>
          {/* Description */}
          <div style={{ marginBottom: isMobile ? 12 : 20 }}>
            <input name="description" placeholder="Product Description" value={form.description} onChange={handleChange} required style={{ ...inputStyle, width: "100%" }} />
          </div>
          {/* Row 2: Price, Unit, Stock, Crop, Tags */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)", gap: isMobile ? 12 : 16, marginBottom: isMobile ? 16 : 24 }}>
            <input name="price" type="number" placeholder="Price (₹)" value={form.price} onChange={handleChange} required style={inputStyle} />
            <input name="unit" placeholder="Unit (kg/L)" value={form.unit} onChange={handleChange} required style={inputStyle} />
            <input name="stock" type="number" placeholder="Stock Qty" value={form.stock} onChange={handleChange} required style={inputStyle} />
            <input name="cropType" placeholder="Crop Type" value={form.cropType} onChange={handleChange} required style={inputStyle} />
            <input name="tags" placeholder="Tags (comma sep)" value={form.tags} onChange={handleChange} required style={{ ...inputStyle, gridColumn: isMobile ? "span 2" : "auto" }} />
          </div>
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(45, 106, 79, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={submitting}
            className="gradient-button"
            style={{
              background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
              color: "white",
              padding: isMobile ? "12px 20px" : "14px 28px",
              borderRadius: 12,
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              opacity: submitting ? 0.7 : 1,
              fontSize: isMobile ? 14 : 15,
              boxShadow: "0 4px 16px rgba(45, 106, 79, 0.25)"
            }}
          >
            <Plus size={18} />
            {submitting ? "Adding..." : "Add Product"}
          </motion.button>
        </form>
      </motion.div>

      {/* PRODUCT LIST */}
      <motion.div variants={itemVariants} className="premium-card" style={{ overflow: "hidden" }}>
        <div style={{ padding: isMobile ? "16px" : "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: 10, fontSize: isMobile ? "1rem" : "1.1rem" }}>
            <Package size={20} color="var(--primary)" />
            All Products
          </h3>
          <span style={{ background: "var(--primary)", color: "white", padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
            {products.length} Items
          </span>
        </div>

        {loading ? (
          <div style={{ padding: 60, textAlign: "center", color: "var(--text-muted)" }}>
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
              Loading inventory...
            </motion.div>
          </div>
        ) : products.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: isMobile ? 600 : "auto" }}>
              <thead>
                <tr style={{ background: "var(--background)", textAlign: "left" }}>
                  <th style={thStyle}>Product Name</th>
                  <th style={thStyle}>Category</th>
                  <th style={thStyle}>Price</th>
                  <th style={thStyle}>Stock</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, index) => (
                  <motion.tr
                    key={p._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <td style={{ ...tdStyle, fontWeight: 600, color: "var(--text-main)" }}>{p.name}</td>
                    <td style={tdStyle}>
                      <span style={{ background: "var(--surface)", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, color: "var(--primary)" }}>
                        {p.mainCategory}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, fontWeight: 700, color: "var(--primary-dark)" }}>₹{p.price}</td>
                    <td style={tdStyle}>
                      <span style={{
                        background: p.stock > 20 ? "#e8f5e9" : p.stock > 0 ? "#fff3e0" : "#ffebee",
                        color: p.stock > 20 ? "#2e7d32" : p.stock > 0 ? "#ef6c00" : "#c62828",
                        padding: "4px 12px",
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 600
                      }}>
                        {p.stock} units
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => deleteProduct(p._id, p.name)}
                        style={{
                          background: "rgba(220, 53, 69, 0.1)",
                          color: "#dc3545",
                          border: "none",
                          padding: "8px 14px",
                          borderRadius: 8,
                          fontWeight: 600,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 6
                        }}
                      >
                        <Trash2 size={14} />
                        Delete
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ padding: 60, textAlign: "center", color: "var(--text-muted)" }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>📦</div>
            <p style={{ fontSize: "1.2rem", fontWeight: 600 }}>No products in inventory</p>
            <p style={{ fontSize: "0.9rem" }}>Add your first product using the form above.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

const inputStyle = {
  padding: "12px 16px",
  borderRadius: 12,
  border: "1.5px solid var(--border)",
  outline: "none",
  fontSize: 14,
  fontWeight: 500,
  background: "var(--background)",
  width: "100%",
  boxSizing: "border-box"
};

const thStyle = {
  padding: "14px 16px",
  color: "var(--text-muted)",
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: 0.5,
  fontWeight: 700,
  whiteSpace: "nowrap"
};

const tdStyle = {
  padding: "14px 16px",
  whiteSpace: "nowrap"
};

export default AdminProducts;
