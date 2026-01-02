const express = require("express");
const Order = require("../models/Order");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "placeholder_secret",
});

/* ================= GET RAZORPAY KEY ================= */
router.get("/razorpay-key", protect, (req, res) => {
  const isDummy = !process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID === "rzp_test_placeholder";
  res.json({
    key: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
    demoMode: isDummy
  });
});

/* ================= CREATE RAZORPAY ORDER ================= */
router.post("/razorpay", protect, async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // amount in the smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Razorpay Order Error", err);
    res.status(500).json({ message: "Razorpay order creation failed" });
  }
});

/* ================= VERIFY RAZORPAY PAYMENT ================= */
router.post("/verify", protect, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment Verified -> Create Order in DB
      const newOrder = new Order({
        ...orderData,
        user: req.user.id,
        paymentStatus: "Completed",
        paymentId: razorpay_payment_id,
        orderStatus: "Pending", // Or 'Processing'
      });
      const savedOrder = await newOrder.save();
      res.json({ message: "Payment verified and order created", order: savedOrder });
    } else {
      res.status(400).json({ message: "Invalid signature" });
    }
  } catch (err) {
    console.error("Verification Error", err);
    res.status(500).json({ message: "Payment verification failed" });
  }
});

/* ================= CREATE COD ORDER ================= */
router.post("/", protect, async (req, res) => {
  try {
    const { items, shippingAddress, totalAmount, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = new Order({
      user: req.user.id,
      items,
      shippingAddress,
      totalAmount,
      paymentMethod: paymentMethod || "COD",
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Completed",
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order creation failed" });
  }
});

/* ================= MY ORDERS ================= */
router.get("/mine", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort("-createdAt");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* ================= ADMIN: GET ALL ORDERS ================= */
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").sort("-createdAt");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* ================= ADMIN: UPDATE STATUS ================= */
router.put("/:id/status", protect, adminOnly, async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // If changing to Delivered and wasn't Delivered before, deduct stock
    if (orderStatus === "Delivered" && order.orderStatus !== "Delivered") {
      const Product = require("../models/Product");

      for (const item of order.items) {
        if (item.productId) {
          await Product.findByIdAndUpdate(
            item.productId,
            { $inc: { stock: -item.qty } },
            { new: true }
          );
        }
      }
    }

    // If changing from Delivered to something else (rare), restore stock
    if (order.orderStatus === "Delivered" && orderStatus !== "Delivered") {
      const Product = require("../models/Product");

      for (const item of order.items) {
        if (item.productId) {
          await Product.findByIdAndUpdate(
            item.productId,
            { $inc: { stock: item.qty } },
            { new: true }
          );
        }
      }
    }

    order.orderStatus = orderStatus;
    await order.save();

    res.json(order);
  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;
