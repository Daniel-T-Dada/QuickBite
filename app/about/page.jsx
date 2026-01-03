import { CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero Section for About */}
      <section className="relative py-20 bg-slate-900 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Story</h1>
        <p className="text-slate-300 max-w-2xl mx-auto px-4">
          From a small food truck to the city's favorite spot. We believe in fast food that doesn't taste fast.
        </p>
      </section>

      {/* Content Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Image */}
        <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=600" 
            alt="Chefs cooking" 
            className="object-cover w-full h-full"
          />
        </div>

        {/* Text */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Passionate about <span className="text-orange-600">Freshness.</span></h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Quick-Bite started with a simple mission: to serve gourmet-quality burgers and breakfast without the wait. 
            We source our vegetables from local farms and our meat is 100% organic grass-fed beef.
          </p>
          
          <ul className="space-y-4">
            {[
              "Locally Sourced Ingredients",
              "100% Organic Meat",
              "Zero Artificial Preservatives"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-800 font-medium">
                <CheckCircle className="text-orange-600 w-5 h-5" /> {item}
              </li>
            ))}
          </ul>
        </div>

      </section>
    </main>
  );
}
