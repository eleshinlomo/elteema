'use client'
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import TestimonialsPage from "../../../components/Testimonials";
import Search from "../../../components/product/search";
import ScrollTopButton from "../../../components/scrollTopButton";
import Bestsellers from "../../../components/product/bestseller";
import Trending from "../../../components/product/trending";
import New from "../../../components/product/new";


export default function Home() {

  
  

  return (
    
    
      <div className="id='top">
        <Search />
        <New />
        <Trending />
       <Bestsellers />
        <TestimonialsPage />
        <ScrollTopButton />
      
        {/* <CookieWarningPage /> */}
    </div>
  );
}
