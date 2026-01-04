"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatNaira } from "@/lib/utils"; 
import { ShoppingCart, Trash2, ArrowRight } from "lucide-react";

// ✅ Import your new Modal
import CheckoutModal from "@/components/CheckoutModal"; 

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function CartSheet() {
  const { cart, removeFromCart, clearCart } = useCart();
  
  // ✅ We only need this one state now. 
  // The loading state is handled inside the CheckoutModal itself.
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Calculate Total
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <div className="relative cursor-pointer p-2 hover:bg-slate-100 rounded-full transition-colors group">
            <ShoppingCart className="text-slate-600 group-hover:text-orange-600 transition w-6 h-6" />
            {/* Badge Count */}
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full ring-2 ring-white">
                {cart.length}
              </span>
            )}
          </div>
        </SheetTrigger>
        
        <SheetContent className="flex flex-col h-full w-full sm:max-w-md p-0 gap-0"> 
          
          {/* 1. HEADER */}
          <SheetHeader className="p-6 border-b bg-white">
            <SheetTitle className="text-xl flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-orange-600" />
              Your Order 
              <span className="text-slate-400 text-sm font-normal ml-auto">
                ({cart.length} items)
              </span>
            </SheetTitle>
          </SheetHeader>

          {/* 2. SCROLLABLE LIST */}
          <div className="flex-1 overflow-y-auto px-6 py-4 bg-slate-50/50">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
                <div className="bg-slate-100 p-6 rounded-full">
                  <ShoppingCart size={48} className="text-slate-300" />
                </div>
                <p className="text-lg font-medium text-slate-600">Your cart is empty.</p>
                
                <SheetClose asChild>
                  <Link href="/menu">
                    <Button variant="outline" className="mt-2">
                      Browse Menu
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            ) : (
              <ul className="space-y-4 pb-4">
                {cart.map((item, index) => (
                  <li 
                    key={`${item.id}-${index}`} 
                    className="group flex gap-4 items-start bg-white p-3 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between h-20 py-1">
                      <div>
                        <h4 className="font-semibold text-slate-900 truncate pr-4">
                          {item.title}
                        </h4>
                        <p className="text-sm text-slate-500">{item.category}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-orange-600 font-bold">
                           {formatNaira(item.price)}
                        </span>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeFromCart(index)} 
                          className="h-8 w-8 text-slate-300 hover:text-red-500 hover:bg-red-50 -mr-2"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 3. FOOTER */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
              <div className="space-y-4">
                
                <div className="flex justify-between items-end">
                  <span className="text-slate-500 text-sm font-medium">Subtotal</span>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-slate-900">
                       {formatNaira(total)}
                    </span>
                  </div>
                </div>
                
                {/* ✅ Button simply opens the Modal now */}
                <Button 
                  onClick={() => setIsCheckoutOpen(true)} 
                  className="w-full h-14 text-lg bg-slate-900 hover:bg-orange-600 shadow-lg hover:shadow-orange-600/20 transition-all rounded-xl"
                >
                  <div className="flex items-center justify-between w-full px-4">
                    <span>Checkout</span>
                    <ArrowRight className="h-5 w-5 opacity-80" />
                  </div>
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* ✅ The Modal lives here, outside the Sheet structure but inside the Fragment */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)}
        totalAmount={total}
        onClearCart={clearCart} 
      />
    </>
  );
}
