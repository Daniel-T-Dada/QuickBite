'use client'

import MenuCard from "@/components/MenuCard"
//import { menuData } from "@/data/menu";
import { useState, useEffect } from 'react'
import FilterBar from "@/components/FilterBar"
import SearchBar from "@/components/SearchBar"
import { Loader2 } from "lucide-react"
import { ENDPOINTS } from "@/lib/api"

const AllMenuPage = () => {
  //API from backend
  const [menuData, setMenuData] = useState([])
  const [loading, setLoading] = useState(true)
  
  const [category, setCategory]= useState("All")
  const [query, setQuery] = useState(""); // Holds the text user types
  
  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await fetch(ENDPOINTS.MENU)
        const data = await res.json()
        setMenuData(data)
      } catch(error){
        console.error("Error fetching menu:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  
  
  
  const filterData = category === "All" ? menuData : menuData.filter((item) => item.category === category)
  
  const filteredData = menuData.filter((item) => {
// Condition A: Does the category match? (Or is it "All"?)
    const categoryMatch = category === "All" || item.category === category 
// Condition B: Does the title include the search text? (Case insensitive)
const searchText = query.toLowerCase()
  const searchMatch = item.title.toLowerCase().includes(searchText) || item.desc.toLowerCase().includes(searchText)
    
// Return true only if BOTH are true
    return categoryMatch && searchMatch;
  })
  
  
  return(
    <main className="min-h-screen">
      <div className="">
        <h1 className="text-3xl font-bold mb-8 text-slate-900">Our Menu</h1>
        
         {/* 3. Add SearchBar here */}
  <SearchBar value={query} onChange={setQuery} />
        
  <FilterBar activeCategory={category} setActiveCategory={setCategory}
        />
        {loading ? (
        <div className="flex justify-center py-20" > Loading...
          <Loader2 className="animate-spin text-orange-600 h-10 w-10" />
        </div>
    ) : filteredData.length > 0 ? (
                //The Grid 
        <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {filteredData.map((foodItem) => (
            <MenuCard key={foodItem.id} item={foodItem} />
          ))}
        </div>
        ):(
         // Empty State: Show this if search matches nothing
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-slate-700">No items found</h3>
            <p className="text-slate-500">Try adjusting your search or category.</p>
          </div>
        )}
      </div>
    </main>
    )
}
export default AllMenuPage