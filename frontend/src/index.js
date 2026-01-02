import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { RecentlyViewedProvider } from "./context/RecentlyViewedContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
      <WishlistProvider>
        <RecentlyViewedProvider>
          <App />
        </RecentlyViewedProvider>
      </WishlistProvider>
    </CartProvider>
  </React.StrictMode>
);

reportWebVitals();
