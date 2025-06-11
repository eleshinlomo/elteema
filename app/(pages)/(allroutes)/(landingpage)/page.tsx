'use client'
import {useState, useEffect} from 'react'
import TestimonialsPage from "../../../../components/Testimonials";
import Search from "../../../../components/product/search";
import Bestsellers from "../../../../components/product/bestseller";
import Trending from "../../../../components/product/trending";
import New from "../../../../components/product/new";
import CookiePolicy from "../../../../components/cookieAcceptPage";
import Feeds from '../feedspage/feeds';
import Featured from '../../../../components/product/featured';
import FeedsPage from '../feedspage/page';

export default function Home() {

 
  return (
    <div id='top' className="">
      
      {/* <Featured /> */}
      <FeedsPage />
      {/* <Bestsellers />
      <New />
      <Trending />
      <TestimonialsPage />
      <CookiePolicy /> */}
    </div>
  );
}