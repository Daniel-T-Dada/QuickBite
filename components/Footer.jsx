import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Quick-Bite 🍔</h3>
          <p className="text-sm leading-relaxed">
            Fresh ingredients, delivered fast. Experience the best local flavors
            right at your fingertips.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Opening Hours</h4>
          <ul className="space-y-2 text-sm">
            <li>Mon - Fri: 8am - 10pm</li>
            <li>Sat: 9am - 11pm</li>
            <li>Sun: 9am - 9pm</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <Facebook className="hover:text-orange-500 cursor-pointer transition" />
            <Instagram className="hover:text-orange-500 cursor-pointer transition" />
            <Twitter className="hover:text-orange-500 cursor-pointer transition" />
          </div>
        </div>
      </div>
      
      <div className="text-center text-xs text-slate-500 mt-12 pt-8 border-t border-slate-800">
        © {new Date().getFullYear()} QuickBite Cafe. All rights reserved.
      </div>
    </footer>
  );
}
