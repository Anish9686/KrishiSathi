const CART_KEY = "kisan_cart";

/* ---------- HELPERS ---------- */
export const getCart = () => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  // 🔥 Notify app that cart changed
  window.dispatchEvent(new Event("cartUpdated"));
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("cartUpdated"));
};

/* ---------- CART ACTIONS ---------- */
export const addToCart = (product) => {
  const cart = getCart();
  const existing = cart.find((i) => i._id === product._id);

  if (existing) {
    existing.qty += product.qty || 1;
  } else {
    cart.push({ ...product, qty: product.qty || 1 });
  }

  saveCart(cart);
};

export const removeFromCart = (id) => {
  const cart = getCart().filter((i) => i._id !== id);
  saveCart(cart);
};

export const updateQty = (id, qty) => {
  const cart = getCart().map((item) =>
    item._id === id ? { ...item, qty: Math.max(1, qty) } : item
  );
  saveCart(cart);
};

export const cartTotal = () =>
  getCart().reduce((sum, i) => sum + i.price * i.qty, 0);

export const cartCount = () =>
  getCart().reduce((sum, i) => sum + i.qty, 0);
