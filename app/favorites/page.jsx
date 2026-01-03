"use client";

import { useCart } from "@/context/CartContext";
import MenuCard from "@/components/MenuCard";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FavoritesPage() {
  const { favorites } = useCart();

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-full shadow-sm mb-6">
          <Heart size={48} className="text-slate-300" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">No Favorites Yet</h1>
        <p className="text-slate-500 mb-8">Start exploring and save your top picks!</p>
        <Link href="/menu">
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
            Browse Menu
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Heart className="text-red-500 fill-current" /> Your Favorites
        </h1>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {favorites.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
