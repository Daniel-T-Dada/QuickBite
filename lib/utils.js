// lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ✅ NEW: Naira Formatter with Multiplier
export function formatNaira(amount) {
  // Conversion rate: 1 unit in DB = 1500 Naira
  const EXCHANGE_RATE = 1500; 
  
  // Handle case where amount might be undefined/null
  if (!amount && amount !== 0) return "₦0";

  const value = amount * EXCHANGE_RATE;

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0, // No Kobo (cleaner look)
    maximumFractionDigits: 0,
  }).format(value);
}
