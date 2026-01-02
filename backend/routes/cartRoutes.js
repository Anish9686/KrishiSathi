const express = require("express");
const Cart = require("../models/Cart");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * GET /api/cart
 * Get logged-in user's cart
 */
router.get("/", auth, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );
  res.json(cart || { items: [] });
});

/**
 * POST /api/cart/sync
 * Sync local cart → DB cart after login
 */
router.post("/sync", auth, async (req, res) => {
  const localItems = req.body.items || [];

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }

  localItems.forEach((localItem) => {
    const existing = cart.items.find(
      (i) => i.product.toString() === localItem.productId
    );

    if (existing) {
      existing.qty += localItem.qty;
    } else {
      cart.items.push({
        product: localItem.productId,
        qty: localItem.qty,
        price: localItem.price,
      });
    }
  });

  await cart.save();
  res.json({ message: "Cart synced successfully" });
});

module.exports = router;
