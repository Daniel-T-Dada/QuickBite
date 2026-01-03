/*'use client'
import MenuCard from "@/components/MenuCard"
import { menuData } from "@/data/menu";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const Featured = () => {
  const router = useRouter()
  const featured = menuData.slice(0,4)
  
  const handleClick = () => {
    router.push("/menu")
  }
  return(
    
          <main className="">
      <div className=" sm:max-w-2xl mx-auto">
        <h1 className="text-xl text-center sm:text-3xl font-bold my-4">Featured Menu</h1>
        
        
       /* <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {featured.map((foodItem) => (
            <MenuCard key={foodItem.id} item={foodItem} />
          ))}
        </div>
        <div className="flex justify-center items-center my-5">
          <Button onClick={handleClick} >View More</Button>
        </div>
        
      </div>
    </main>
    
    )
}
export default Featured 
*/

'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import MenuCard from "@/components/MenuCard"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { ENDPOINTS } from "@/lib/api" // ✅ Import your API config

const Featured = () => {
  const router = useRouter()
  
  // 1. State to hold the data from the server
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  // 2. Fetch data when component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
         // 👇 ADD THIS LINE
        console.log("Fetching Featured from:", ENDPOINTS.SPECIALS);
        // Fetch the 4 random specials from your backend
        const res = await fetch(ENDPOINTS.SPECIALS)
        
        if (!res.ok) throw new Error("Failed to fetch")
        
        const data = await res.json()
        setFeatured(data)
      } catch (error) {
        console.error("Error fetching featured items:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleClick = () => {
    router.push("/menu")
  }

  return (
    <main className="">
      <div className="sm:max-w-2xl mx-auto">
        <h1 className="text-xl text-center sm:text-3xl font-bold my-4">Featured Menu</h1>

        {/* 3. Handle Loading State */}
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
          </div>
        ) : (
          /* The Grid */
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {featured.map((foodItem) => (
              <MenuCard key={foodItem.id} item={foodItem} />
            ))}
          </div>
        )}

        <div className="flex justify-center items-center my-5">
          <Button onClick={handleClick}>View More</Button>
        </div>
      </div>
    </main>
  )
}

export default Featured
