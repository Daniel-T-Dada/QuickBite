
import { Button } from "@/components/ui/button";

const categories = ["All", "Breakfast", "Lunch", "Beverages", "Desserts"];

const FilterBar = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => setActiveCategory(category)}
          variant={activeCategory === category ? "default" : "outline"}
          className={`rounded-full px-6 transition-all ${
            activeCategory === category 
              ? "bg-primary text-white hover:bg-destructive" 
              : "border-slate-300 text-slate-600 hover:border-secondary hover:text-orange-600"
          }`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}

export default FilterBar