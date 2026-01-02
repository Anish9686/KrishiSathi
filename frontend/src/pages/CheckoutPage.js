import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useCart } from "../context/CartContext";
import { getProductImage } from "../utils/imageUtils";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("ONLINE");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleRazorpay = async () => {
    try {
      setLoading(true);
      // 1. Fetch Razorpay Key and Create Order ID in Backend
      const { data: keyData } = await api.get("/orders/razorpay-key");

      if (keyData.demoMode) {
        // Show realistic payment simulation
        toast.loading("🔐 Connecting to Razorpay Secure Gateway...", { duration: 1500 });

        setTimeout(() => {
          toast.loading("💳 Initializing Payment Terminal...", { duration: 1500 });
        }, 1500);

        setTimeout(() => {
          toast.loading("🔄 Processing Transaction...", { duration: 2000 });
        }, 3000);

        setTimeout(async () => {
          try {
            const verifyRes = await api.post("/orders", {
              items: cartItems.map(item => ({
                productId: item._id,
                name: item.name,
                price: item.price,
                qty: item.qty,
                image: item.image
              })),
              shippingAddress: address,
              totalAmount: cartTotal,
              paymentMethod: "ONLINE (Razorpay)"
            });

            if (verifyRes.status === 201) {
              clearCart();
              toast.dismiss();
              toast.success("✅ Payment Successful! Order Confirmed.", { duration: 4000 });
              navigate("/order-success");
            }
          } catch (error) {
            toast.dismiss();
            toast.error("Transaction failed. Please retry.");
          } finally {
            setLoading(false);
          }
        }, 5500);
        return;
      }

      if (!window.Razorpay) {
        toast.error("Razorpay script not loaded. Check your internet connection.");
        setLoading(false);
        return;
      }

      const { data: order } = await api.post("/orders/razorpay", { amount: cartTotal });

      // 2. Configure Razorpay Options
      const options = {
        key: keyData.key,
        amount: order.amount,
        currency: order.currency,
        name: "KrishiSathi",
        description: "Premium Agricultural Marketplace",
        image: "/logo192.png",
        order_id: order.id,
        handler: async (response) => {
          try {
            // 3. Verify Payment
            const verifyRes = await api.post("/orders/verify", {
              ...response,
              orderData: {
                items: cartItems.map(item => ({
                  productId: item._id,
                  name: item.name,
                  price: item.price,
                  qty: item.qty,
                  image: item.image
                })),
                shippingAddress: address,
                totalAmount: cartTotal,
                paymentMethod: "ONLINE"
              }
            });

            if (verifyRes.status === 200) {
              clearCart();
              toast.success("Payment successful! Order confirmed. 🚜");
              navigate("/order-success");
            }
          } catch (error) {
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: address.fullName,
          contact: address.phone,
        },
        notes: {
          address: address.address,
        },
        theme: {
          color: "#2d6a4f",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Failed to initialize payment gateway");
    } finally {
      if (!loading) setLoading(false); // Only unset if not handled by timeout
    }
  };

  const placeOrder = async () => {
    if (
      !address.fullName ||
      !address.phone ||
      !address.address ||
      !address.city ||
      !address.pincode
    ) {
      toast.error("Please provide a valid delivery address");
      return;
    }

    if (!token) {
      toast.error("Security check failed. Please login.");
      navigate("/login");
      return;
    }

    if (paymentMethod === "ONLINE") {
      handleRazorpay();
    } else {
      // COD Logic
      setLoading(true);
      try {
        const res = await api.post("/orders", {
          items: cartItems.map(item => ({
            productId: item._id,
            name: item.name,
            price: item.price,
            qty: item.qty,
            image: item.image
          })),
          shippingAddress: address,
          totalAmount: cartTotal,
          paymentMethod: "COD",
        });

        if (res.status === 201) {
          clearCart();
          toast.success("Order received! Farmer strategy prepared. 🚜");
          navigate("/order-success");
        }
      } catch (err) {
        toast.error("Transactional error. Please retry.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="page-container" style={{ padding: "60px 24px" }}>
      <header style={{ marginBottom: 48, textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", color: "var(--primary-dark)", margin: "0 0 12px" }}>Finalize Purchase</h1>
        <p style={{ color: "var(--text-muted)", margin: 0 }}>Securely complete your transaction with KrishiSathi.</p>
      </header>

      <div
        className="checkout-grid"
        style={{
          display: "grid",
          gap: "48px",
          maxWidth: 1200,
          margin: "auto"
        }}
      >
        {/* ADDRESS */}
        <div className="premium-card" style={{ padding: 40 }}>
          <h3 style={{ margin: "0 0 24px", color: "var(--primary-dark)" }}>Shipping Logistics</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <input name="fullName" placeholder="Full Name" onChange={handleChange} style={inputStyle} />
            <input name="phone" placeholder="Contact Number" onChange={handleChange} style={inputStyle} />
          </div>
          <input name="address" placeholder="Residential/Farm Address" onChange={handleChange} style={{ ...inputStyle, marginTop: 16 }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 16 }}>
            <input name="city" placeholder="City" onChange={handleChange} style={inputStyle} />
            <input name="state" placeholder="State" onChange={handleChange} style={inputStyle} />
            <input name="pincode" placeholder="Pincode" onChange={handleChange} style={inputStyle} />
          </div>

          <div style={{ marginTop: 40, padding: "24px 0", borderTop: "1px solid var(--border)" }}>
            <h3 style={{ margin: "0 0 20px", color: "var(--primary-dark)" }}>Operational Mode</h3>
            <div style={{ display: "flex", gap: 20 }}>
              <label style={{ ...radioStyle, borderColor: paymentMethod === "ONLINE" ? "var(--primary)" : "var(--border)", background: paymentMethod === "ONLINE" ? "var(--background)" : "transparent" }}>
                <input
                  type="radio"
                  checked={paymentMethod === "ONLINE"}
                  onChange={() => setPaymentMethod("ONLINE")}
                  style={{ display: "none" }}
                />
                <span style={{ fontWeight: 700 }}>Secure Online Payment</span>
                <small style={{ fontSize: 11, color: "var(--text-muted)" }}>UPI, Cards, EMI, Pay Later</small>
              </label>
              <label style={{ ...radioStyle, borderColor: paymentMethod === "COD" ? "var(--primary)" : "var(--border)", background: paymentMethod === "COD" ? "var(--background)" : "transparent" }}>
                <input
                  type="radio"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                  style={{ display: "none" }}
                />
                <span style={{ fontWeight: 700 }}>Cash on Delivery</span>
                <small style={{ fontSize: 11, color: "var(--text-muted)" }}>Pay at your doorstep</small>
              </label>
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <aside>
          <div className="premium-card" style={{ padding: 32, position: "sticky", top: 120 }}>
            <h3 style={{ margin: "0 0 24px" }}>Order Summary</h3>
            <div style={{ maxHeight: 300, overflowY: "auto", marginBottom: 24, paddingRight: 8 }}>
              {cartItems.map(item => (
                <div key={item._id} style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "center" }}>
                  <img src={getProductImage(item.name, item.image)} alt={item.name} style={{ width: 60, height: 60, borderRadius: 12, objectFit: "cover", background: "var(--background)" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{item.name}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{item.qty} units × ₹{item.price}</div>
                  </div>
                  <div style={{ fontWeight: 800 }}>₹{item.qty * item.price}</div>
                </div>
              ))}
            </div>

            <div style={{ padding: "20px 0", borderTop: "1.5px dashed var(--border)", marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, color: "var(--text-muted)" }}>
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, color: "var(--primary)" }}>
                <span>Delivery</span>
                <span style={{ fontWeight: 700 }}>FREE</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem", fontWeight: 900, marginTop: 12, color: "var(--primary-dark)" }}>
                <span>Total Amount</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>

            <button
              onClick={placeOrder}
              disabled={loading}
              style={{
                width: "100%",
                padding: 18,
                background: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: 16,
                fontWeight: 800,
                fontSize: 16,
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 10px 25px rgba(45, 106, 79, 0.25)",
                transition: "transform 0.2s"
              }}
              onMouseEnter={(e) => !loading && (e.target.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => !loading && (e.target.style.transform = "scale(1)")}
            >
              {loading ? "Processing Securely..." : paymentMethod === "ONLINE" ? "Proceed to Payment" : "Confirm COD Order"}
            </button>
            <p style={{ textAlign: "center", fontSize: 11, color: "var(--text-muted)", marginTop: 16 }}>
              🛡️ Encrypted SSL Secure Transaction
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "14px 18px",
  borderRadius: 12,
  border: "1.5px solid var(--border)",
  outline: "none",
  background: "var(--background)",
  fontSize: 14,
  fontWeight: 500
};

const radioStyle = {
  flex: 1,
  padding: 16,
  borderRadius: 16,
  border: "2px solid",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  gap: 4,
  transition: "all 0.2s ease"
};

export default CheckoutPage;
