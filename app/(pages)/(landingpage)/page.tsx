'use client'

import Hero from "@/components/hero";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import TrendingPage from "../trendingpage/page";
import BestsellerPage from "../bestseller/page";
import Testimonials from "@/components/Testimonials";
import CookieWarningPage from "@/components/cookiewarning";
import Proposition from "@/components/proposition";
import FeaturedPage from "../featuredpage/page";

export default function Home() {

  
  
  const [isHome, setIsHome] = useState<boolean>(true)
  


  return (
    
    
      <div className=" text-center ">
        <Hero  />
        <FeaturedPage />
        <Proposition />
        <TrendingPage />
        <BestsellerPage />
        <Testimonials />
        {/* <CookieWarningPage /> */}
    </div>
  );
}
