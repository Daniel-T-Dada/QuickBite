"use client";

import { createContext, useContext, useState, useEffect } from "react";
// We do NOT import toast here. We let the components handle the UI.

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Load from LocalStorage
  useEffect(() => {
    // Only run in browser
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      const savedFavs = localStorage.getItem("favorites");
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedFavs) setFavorites(JSON.parse(savedFavs));
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Actions

  // ✅ REMOVED ALERT: This function is now "silent". 
  // The component calling it (ItemControls) is responsible for showing the Toast.
  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        favorites, 
        addToCart, 
        removeFromCart, 
        clearCart,
        toggleFavorite 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
