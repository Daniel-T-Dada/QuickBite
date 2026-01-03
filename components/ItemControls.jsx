"use client";

import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner"; // 👈 Import Sonner

export default function ItemControls({ item }) {
  const { addToCart, toggleFavorite, favorites } = useCart();
  
  const isFav = favorites.some((fav) => fav.id === item.id);

  const handleAddToCart = () => {
    addToCart(item);
    // ✅ Replace alert with premium Toast
    toast.success(`${item.title} added to order`, {
      description: "Check your cart to checkout.",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  };

  const handleToggleFav = () => {
    toggleFavorite(item);
    // Optional: Toast for favorites too
    toast(isFav ? "Removed from favorites" : "Saved to favorites");
  };

  return (
    <div className="flex gap-4 mt-auto">
      <Button 
        onClick={handleAddToCart}
        className="flex-1 h-12 text-lg bg-slate-900 hover:bg-orange-600 transition-all gap-2"
      >
        <ShoppingBag size={20} />
        Add to Order
      </Button>

      <Button 
        variant="outline" 
        onClick={handleToggleFav}
        className={`h-12 w-12 p-0 border-slate-200 transition-colors ${
          isFav ? "bg-red-50 border-red-200 text-red-500" : "text-slate-400 hover:text-red-500"
        }`}
      >
        <Heart size={20} fill={isFav ? "currentColor" : "none"} />
      </Button>
    </div>
  );
}
