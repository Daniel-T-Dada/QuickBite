import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
const Hero = () => {
  return(
    <div>
      <section className="relative animate-fade-in mt-6" >
        <div className="relative overflow rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 accent/10 p-6 md:p-8" >
          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full mb-4" >Nigerian Delicacies</span>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3" >Freshness in<br/>
          <span className="text-primary text-4xl font-extrabold" >Every Bite</span></h1>
          
          <p className="text-muted-foreground text-sm md:text-base max-w-xs mb-6" >
            Experience a curated selection of gourmet breakfast, lunch, and desserts. Freshly prepared, locally sourced, and delivered to your table in minutes.
          </p>
          <Button asChild className="group">
            <Link href={"/menu"} >
              Explore Menu
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
    )
}
export default Hero