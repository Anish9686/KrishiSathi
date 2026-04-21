import api from "./api";
import { getCart, clearCart } from "./cart";
import { getToken } from "./auth";

export const syncCartAfterLogin = async () => {
  const token = getToken();
  if (!token) return;

  const cart = getCart();
  if (cart.length === 0) return;

  try {
    await api.post(
      "/cart/sync",
      { items: cart },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    clearCart(); // local → server sync success
  } catch (err) {
    console.error("Cart sync failed", err.message);
  }
};
