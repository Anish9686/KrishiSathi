import React, { createContext, useContext, useState, useEffect } from "react";

const RecentlyViewedContext = createContext();

const MAX_RECENT_ITEMS = 6;

export function RecentlyViewedProvider({ children }) {
    const [recentlyViewed, setRecentlyViewed] = useState(() => {
        const saved = localStorage.getItem("krishisathi_recent");
        return saved ? JSON.parse(saved) : [];
    });

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem("krishisathi_recent", JSON.stringify(recentlyViewed));
    }, [recentlyViewed]);

    const addToRecentlyViewed = (product) => {
        setRecentlyViewed((prev) => {
            // Remove if already exists (to move to front)
            const filtered = prev.filter((p) => p._id !== product._id);
            // Add to front and limit to MAX_RECENT_ITEMS
            return [product, ...filtered].slice(0, MAX_RECENT_ITEMS);
        });
    };

    const clearRecentlyViewed = () => {
        setRecentlyViewed([]);
    };

    return (
        <RecentlyViewedContext.Provider
            value={{
                recentlyViewed,
                addToRecentlyViewed,
                clearRecentlyViewed,
            }}
        >
            {children}
        </RecentlyViewedContext.Provider>
    );
}

export function useRecentlyViewed() {
    const context = useContext(RecentlyViewedContext);
    if (!context) {
        throw new Error("useRecentlyViewed must be used within a RecentlyViewedProvider");
    }
    return context;
}
