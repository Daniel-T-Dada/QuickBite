

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full md:w-96 mb-6">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
      <Input
        type="text"
        placeholder="Search for food..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 bg-white border-slate-200 focus-visible:ring-orange-600"
      />
    </div>
  );
}
