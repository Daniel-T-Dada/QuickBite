'use client'

import Link from "next/link";
import { Home, Coffee, Menu, MenuSquare, X, Heart, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useState } from "react"
import CartSheet from "@/components/CartSheet"; 

const Header = () => {
  const [show, setShow] = useState(false)
  
  const handleClick = () => {
    setShow(!show)
  }
  
  const pathname = usePathname();
  
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/menu", icon: MenuSquare, label: "Menu" },
    { to: "/favorites", icon: Heart, label: "Favorites" },
    { to: "/about", icon: Coffee, label: "About" },
  ];

  return(
    <>
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
          
          <Link href={"/"} className="flex items-center gap-2" onClick={() => setShow(false)}>
            <span className="text-xl font-heading font-bold text-foreground tracking-tight">
              Quick<span className="text-primary font-extrabold">Bite</span>
            </span>
          </Link>
        
          <div className="flex items-center gap-3">
            <Link href="/favorites" className="text-muted-foreground hover:text-red-500 transition-colors">
              <Heart className="w-6 h-6" />
            </Link>

            <CartSheet />

            <button 
              onClick={handleClick}
              className="p-1 rounded-full hover:bg-muted transition-colors md:hidden focus:outline-none"
            >
              {show ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" /> }
            </button>
          </div>
        </div>
      </header>

      {/* ✨ REDESIGNED MOBILE MENU OVERLAY */}
      {show && (
        <nav className="fixed inset-0 top-14 z-40 bg-background flex flex-col p-4 gap-3 md:hidden animate-in slide-in-from-top-5 duration-200">
          
          {navItems.map(({to, icon: Icon, label}) => {
            const isActive = pathname === to;
            
            return (
              <Link 
                key={to}
                href={to}
                onClick={handleClick}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border transition-all duration-200",
                  isActive 
                    ? "bg-primary/5 border-primary shadow-sm" // Active State
                    : "bg-card border-border hover:bg-muted/50" // Inactive State
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-2 rounded-full",
                    isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={cn(
                    "font-medium text-lg",
                    isActive ? "text-primary" : "text-foreground"
                  )}>
                    {label}
                  </span>
                </div>
                
                {/* Chevron indicates this is clickable */}
                <ChevronRight className={cn(
                  "w-5 h-5",
                  isActive ? "text-primary" : "text-muted-foreground/50"
                )} />
              </Link>
            )
          })}

          {/* Optional: Add a subtle text at bottom */}
          <div className="mt-auto pb-8 text-center text-sm text-muted-foreground">
             © 2024 QuickBite App
          </div>

        </nav>
      )}
    </>
  )
}

export default Header
