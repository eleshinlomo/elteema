'use client'

import Hero from "@/components/hero";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import Testimonials from "@/components/Testimonials";
import Search from "@/components/product/search";
import ScrollTopButton from "@/components/scrollTopButton";
import Bestsellers from "@/components/product/bestseller";
import Trending from "@/components/product/trending";
import New from "@/components/product/new";


export default function Home() {

  
  

  return (
    
    
      <div className="id='top">
        <Search />
        <New />
        <Trending />
       <Bestsellers />
        <Testimonials />
        <ScrollTopButton />
      
        {/* <CookieWarningPage /> */}
    </div>
  );
}
