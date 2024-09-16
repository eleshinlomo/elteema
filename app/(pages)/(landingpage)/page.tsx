'use client'

import Hero from "@/components/hero";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import TrendingNowPage from "../trendingnow/page";
import BestsellerPage from "../bestseller/page";
import Testimonials from "@/components/Testimonials";
import CookieWarningPage from "@/components/cookiewarning";
import Proposition from "@/components/proposition";

export default function Home() {

  
  
  const [isHome, setIsHome] = useState<boolean>(true)
  


  return (
    
    
      <div className=" text-center ">
        <Hero  />
        <Proposition />
        <TrendingNowPage />
        <BestsellerPage />
        <Testimonials />
        {/* <CookieWarningPage /> */}
    </div>
  );
}
