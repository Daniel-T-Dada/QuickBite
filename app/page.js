import Image from "next/image";
import Hero from "@/components/Hero"
import Featured from "@/components/Featured"
import DailySpecials from "@/components/DailySpecials";


export default function Home() {
  return (
    <div>
      <Hero/>
       {/* 2. The Live Data Section */}
      <DailySpecials />
      <Featured />
    </div>
  );
}
