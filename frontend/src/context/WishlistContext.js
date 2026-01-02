import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem("krishisathi_wishlist");
        return saved ? JSON.parse(saved) : [];
    });

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem("krishisathi_wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (product) => {
        setWishlist((prev) => {
            if (prev.find((p) => p._id === product._id)) return prev;
            return [...prev, product];
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlist((prev) => prev.filter((p) => p._id !== productId));
    };

    const isInWishlist = (productId) => {
        return wishlist.some((p) => p._id === productId);
    };

    const toggleWishlist = (product) => {
        if (isInWishlist(product._id)) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                wishlistCount: wishlist.length,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                toggleWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
}
