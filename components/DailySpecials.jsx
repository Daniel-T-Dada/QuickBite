
"use client";

import { useEffect, useState } from "react";
import MenuCard from "@/components/MenuCard";
import { Loader2, Flame } from "lucide-react"; // Loading spinner icon
import { ENDPOINTS } from "@/lib/api"

export default function DailySpecials() {
  const [specials, setSpecials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
    //API from backend
  const [menuData, setMenuData] = useState([])


  useEffect(() => {
    // Define the fetch function
    const fetchSpecials = async () => {
      try {
        // 1. Fetch from a public testing API
        const res = await fetch(ENDPOINTS.SPECIALS);
        
        if (!res.ok) throw new Error("Failed to fetch specials");
        
        const data = await res.json();

        // 2. Transform the Data
        // The API only gives 'title' and 'body'. We add the missing food details manually.
      /*  const formattedData = rawData.map((post, index) => ({
          id: `special-${post.id}`, // Unique ID
          title: post.title.slice(0, 20) + "...", // Shorten the title
          desc: post.body.slice(0, 60) + "...",   // Shorten the description
          category: "Chef's Special",
          price: 19.99 + index, // Fake price variation
          // Use different images for each special
          img: [
            "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=500",
            "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=500",
            "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=500",
            "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=500",
          ][index]
        }));*/

       // setSpecials(formattedData);
       setSpecials(data);
      } catch (err) {
        setError("Could not load today's specials. Please try again.");
      } finally {
        setIsLoading(false); // Stop loading regardless of success/failure
      }
    };

    fetchSpecials();
  }, []); // Empty dependency array = Run once on mount

  // 3. Render Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
        <p className="text-slate-500 text-sm">Finding the freshest picks...</p>
      </div>
    );
  }

  // 4. Render Error State
  if (error) {
    return (
      <div className="text-center py-10 bg-red-50 rounded-lg border border-red-100 mx-4">
        <p className="text-red-600 mb-2">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="text-xs text-red-700 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  // 5. Render Success State
  return (
   /*<section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          🔥 Today's Chef Specials
          <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
            Live from Kitchen
          </span>
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {specials.map((item) => (
             <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>*/
    <section className="py-8 md:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-100 rounded-full">
              <Flame className="w-5 h-5 text-orange-600" fill="currentColor" />
            </div>
            <h2 className="text-xl md:text-3xl font-extrabold text-slate-900">
              Today's Specials
            </h2>
          </div>
          <p className="text-slate-500 text-sm md:text-base">
            Limited availability. Fresh from the kitchen.
          </p>
        </div>
        
        {/* ✅ THE GRID: Matches your compact mobile preference */}
        {/* grid-cols-2 on mobile, grid-cols-4 on desktop */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-1 gap-y-3 md:gap-6">
          {specials.map((item) => (
             <MenuCard key={item.id} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}
