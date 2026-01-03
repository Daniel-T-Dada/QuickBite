"use client"; // 👈 Required for onClick events

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Star } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext"; // ✅ Import Context
import { toast } from "sonner"; // ✅ Import Sonner
import { formatNaira } from "@/lib/utils"; // 👈 Import

export default function MenuCard({ item }) {
  const { addToCart } = useCart(); // ✅ Get the function

  if (!item) return null;

  // This handles the click WITHOUT navigating to the page
  const handleAddToCart = (e) => {
    e.preventDefault(); // 🛑 STOP the Link navigation
    e.stopPropagation(); // Double safety
    
    addToCart(item);
    
    // Premium Toast Feedback
    toast.success(`${item.title} added`, {
      description: "Check your cart to checkout",
      duration: 2000, // Disappears quickly
    });
  };

  return (
    <Link href={`/menu/${item.id}`} className="block h-full">
      <Card className="flex flex-col h-full overflow-hidden border-slate-200 p-0 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group bg-white rounded-lg md:rounded-xl">
        
        {/* 1. Image Section */}
        <div className="relative h-32 md:h-48 w-full overflow-hidden bg-slate-100">
          <img
            src={item.img}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {item.price > 20 && (
            <Badge className="absolute top-2 right-2 bg-orange-600 text-white border-none shadow-md px-1.5 py-0.5 text-[10px] md:text-xs md:px-2.5 md:py-0.5">
              Chef's Choice
            </Badge>
          )}
        </div>

        {/* 2. Header: Title & Price */}
        <CardHeader className="p-2 pb-0 md:p-4 md:pb-2">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
            <h3 className="text-sm md:text-lg font-bold text-slate-900 leading-tight line-clamp-1 md:line-clamp-2">
              {item.title}
            </h3>
            <span className="text-sm md:text-lg font-bold text-orange-600">
               {formatNaira(item.price)}
            </span>
          </div>
          
          <div className="mt-1 md:block">
               <Badge variant="outline" className="text-[10px] md:text-xs font-medium bg-slate-50 text-slate-600 border-slate-200">
                {item.category}
              </Badge>
          </div>
        </CardHeader>

        {/* 3. Body */}
        <CardContent className="p-2 pt-1 md:p-4 md:pt-0 flex-grow">
          <p className="hidden md:block text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">
            {item.desc}
          </p>

          <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs font-medium mt-1 md:mt-0 md:border-t md:border-slate-100 md:pt-3">
            <div className="flex items-center gap-1 text-slate-700">
              <Star className="w-3 h-3 md:w-3.5 md:h-3.5 text-amber-500 fill-current" />
              <span className="font-semibold">4.8</span>
              <span className="text-slate-400 font-normal hidden md:inline">(120+)</span>
            </div>
          </div>
        </CardContent>

        {/* 4. Footer: Action Button */}
        <CardFooter className="p-2 pt-0 md:p-4 md:pt-0 mt-auto pb-2 md:pb-4">
          <Button 
            onClick={handleAddToCart} // ✅ Connected here
            className="w-full h-8 text-xs md:h-10 md:text-sm bg-primary hover:bg-chart-4 text-white transition-all cursor-pointer rounded-lg md:rounded-lg shadow-sm active:scale-95"
          >
            <Plus className="mr-1 h-3 w-3 md:h-4 md:w-4" /> 
            <span className="md:inline">Add</span>
            <span className="hidden md:inline ml-1">to Order</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
