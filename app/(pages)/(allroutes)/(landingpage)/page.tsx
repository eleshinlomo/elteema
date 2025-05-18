'use client'
import {useState, useEffect} from 'react'
import TestimonialsPage from "../../../../components/Testimonials";
import Search from "../../../../components/product/search";
import Bestsellers from "../../../../components/product/bestseller";
import Trending from "../../../../components/product/trending";
import New from "../../../../components/product/new";
import CookiePolicy from "../../../../components/cookieAcceptPage";

export default function Home() {

  useEffect(()=>{

  }, [])
  return (
    <div id='top' className="">
      
      <Search />
      <Bestsellers />
      <New />
      <Trending />
      <TestimonialsPage />
      <CookiePolicy />
    </div>
  );
}