import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/* ================= STORAGE KEY ================= */
const CART_KEY = "kisan_cart";

/* ================= CONTEXT ================= */
const CartContext = createContext(null);

/* ================= PROVIDER ================= */
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  /* ================= LOAD CART (SAFE) ================= */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Cart load failed", err);
      localStorage.removeItem(CART_KEY);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  /* ================= SAVE CART ================= */
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems, isLoaded]);

  /* ================= ACTIONS ================= */

  const addToCart = (product, qty = 1) => {
    if (!product?._id) return;

    setCartItems((prev) => {
      const exists = prev.find((i) => i._id === product._id);

      if (exists) {
        return prev.map((i) =>
          i._id === product._id
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }

      return [
        ...prev,
        {
          _id: product._id,
          name: product.name,
          price: Number(product.price) || 0,
          image: product.image || product.imageUrl,
          qty,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i._id !== id));
  };

  const updateQty = (id, qty) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i._id === id
          ? { ...i, qty: Math.max(1, Number(qty)) }
          : i
      )
    );
  };

  const clearCart = () => setCartItems([]);

  /* ================= DERIVED DATA (MEMOIZED) ================= */

  const cartCount = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.qty, 0),
    [cartItems]
  );

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, i) => sum + Number(i.price) * i.qty,
        0
      ),
    [cartItems]
  );

  /* ================= CONTEXT VALUE ================= */

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    cartCount,
    cartTotal,
    isLoaded, // VERY IMPORTANT for checkout
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

/* ================= HOOK ================= */
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
};
