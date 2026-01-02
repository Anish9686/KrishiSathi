import React, { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { Plus, Trash2, Package, RefreshCw } from "lucide-react";

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

  /* ================= UI ================= */
  return (
    <div style={{ padding: 40 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ margin: 0, color: "var(--primary-dark)", fontSize: "2rem" }}>Product Inventory</h1>
          <p style={{ margin: "8px 0 0", color: "var(--text-muted)" }}>Manage your marketplace catalog</p>
        </div>
        <button
          onClick={() => fetchProducts()}
          style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "12px 20px", borderRadius: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* ADD PRODUCT FORM */}
      <div className="premium-card" style={{ padding: 32, marginBottom: 32 }}>
        <h3 style={{ margin: "0 0 24px", color: "var(--text-main)", display: "flex", alignItems: "center", gap: 10 }}>
          <Plus size={20} color="var(--primary)" />
          Add New Product
        </h3>
        <form onSubmit={createProduct}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 20 }}>
            <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required style={inputStyle} />
            <input name="mainCategory" placeholder="Main Category" value={form.mainCategory} onChange={handleChange} required style={inputStyle} />
            <input name="subCategory" placeholder="Sub Category" value={form.subCategory} onChange={handleChange} required style={inputStyle} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <input name="description" placeholder="Product Description" value={form.description} onChange={handleChange} required style={{ ...inputStyle, width: "100%" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 24 }}>
            <input name="price" type="number" placeholder="Price (₹)" value={form.price} onChange={handleChange} required style={inputStyle} />
            <input name="unit" placeholder="Unit (kg/L)" value={form.unit} onChange={handleChange} required style={inputStyle} />
            <input name="stock" type="number" placeholder="Stock Qty" value={form.stock} onChange={handleChange} required style={inputStyle} />
            <input name="cropType" placeholder="Crop Type" value={form.cropType} onChange={handleChange} required style={inputStyle} />
            <input name="tags" placeholder="Tags (comma sep)" value={form.tags} onChange={handleChange} required style={inputStyle} />
          </div>
          <button
            type="submit"
            disabled={submitting}
            style={{
              background: "var(--primary)",
              color: "white",
              padding: "14px 28px",
              borderRadius: 12,
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              opacity: submitting ? 0.7 : 1
            }}
          >
            <Plus size={18} />
            {submitting ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>

      {/* PRODUCT LIST */}
      <div className="premium-card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
            <Package size={20} color="var(--primary)" />
            All Products
          </h3>
          <span style={{ background: "var(--primary)", color: "white", padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
            {products.length} Items
          </span>
        </div>

        {loading ? (
          <div style={{ padding: 60, textAlign: "center", color: "var(--text-muted)" }}>
            Loading inventory...
          </div>
        ) : products.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
              {products.map((p) => (
                <tr key={p._id} style={{ borderBottom: "1px solid var(--border)", transition: "background 0.2s" }}>
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
                    <button
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
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: 60, textAlign: "center", color: "var(--text-muted)" }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>📦</div>
            <p style={{ fontSize: "1.2rem", fontWeight: 600 }}>No products in inventory</p>
            <p style={{ fontSize: "0.9rem" }}>Add your first product using the form above.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "14px 18px",
  borderRadius: 12,
  border: "1.5px solid var(--border)",
  outline: "none",
  fontSize: 14,
  fontWeight: 500,
  background: "var(--background)"
};

const thStyle = {
  padding: "16px 20px",
  color: "var(--text-muted)",
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: 0.5,
  fontWeight: 700
};

const tdStyle = {
  padding: "16px 20px"
};

export default AdminProducts;
