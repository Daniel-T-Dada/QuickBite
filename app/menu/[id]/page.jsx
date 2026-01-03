import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ENDPOINTS } from "@/lib/api";
// We will create this Component in Part 2
import ItemControls from "@/components/ItemControls"; 
import { formatNaira } from "@/lib/utils"; // 👈 Import

async function getDish(id) {
  try {
    const res = await fetch(ENDPOINTS.SINGLE_ITEM(id), {
      cache: "no-store",
    });
    if (!res.ok) return undefined;
    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return undefined;
  }
}

export default async function MenuDetailPage({ params }) {
  const { id } = await params;
  const item = await getDish(id);

  if (!item) return notFound();

  return (
    // changed: py-0 on mobile to remove whitespace at top
    <main className="min-h-screen bg-white md:bg-slate-50 md:py-12 md:px-4 flex items-center justify-center">
      
      {/* Container: Full width on mobile (rounded-none), Card on desktop (rounded-2xl) */}
      <div className="bg-white md:rounded-2xl md:shadow-xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row shadow-none rounded-none">
        
        {/* Left: Full Image */}
        {/* h-72 on mobile makes it feel substantial */}
        <div className="w-full md:w-1/2 h-72 md:h-auto relative shrink-0">
          <img 
            src={item.img} 
            alt={item.title} 
            className="w-full h-full object-cover"
          />
          
          {/* Back Button (Mobile Overlay) - Only shows on mobile */}
          <Link href="/menu" className="md:hidden absolute top-4 left-4 bg-white/90 p-2 rounded-full shadow-sm text-slate-700">
             <ArrowLeft size={20} />
          </Link>

           {item.price > 20 && (
            <Badge className="absolute bottom-4 left-4 bg-orange-600 text-white border-none px-3 py-1 shadow-lg">
              Chef's Choice
            </Badge>
          )}
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center h-full">
          
          {/* Back Button (Desktop) - Hidden on mobile */}
          <Link href="/menu" className="hidden md:flex text-slate-500 hover:text-orange-600 items-center gap-2 mb-6 transition-colors">
            <ArrowLeft size={18} /> Back to Menu
          </Link>

          <div className="flex justify-between items-start mb-4">
            <div>
              <Badge variant="secondary" className="mb-3 text-orange-600 bg-orange-50 hover:bg-orange-100">
                {item.category}
              </Badge>
              <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-2">
                {item.title}
              </h1>
            </div>
            <span className="text-2xl font-bold text-orange-600"> {formatNaira(item.price)}</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-500 mb-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
               <Star size={18} className="text-amber-500 fill-current" />
               <span className="font-semibold text-slate-900">4.8</span> (120+)
            </div>
            <div className="flex items-center gap-1.5">
               <Clock size={18} className="text-slate-400" />
               15-20 min
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed mb-8 text-base md:text-lg">
            {item.desc}
          </p>

          {/* 👇 THIS IS THE MAGIC PART FOR INTERACTIVITY */}
          {/* We pass the whole item to the client component */}
          <ItemControls item={item} />
          

        </div>
      </div>
    </main>
  );
}
