'use client'
import Image from "next/image";
import TestimonialsPage from "../../../../components/Testimonials";
import Search from "../../../../components/product/search";
import ScrollTopButton from "../../../../components/scrollTopButton";
import Bestsellers from "../../../../components/product/bestseller";
import Trending from "../../../../components/product/trending";
import New from "../../../../components/product/new";
import CookiePolicy from "../../../../components/cookieAcceptPage";

export default function Home() {
  return (
    <div id='top' className="overflow-hidden min-h-screen" style={{
      background: 'linear-gradient(135deg, #e6f4ea 0%, #f0f8f2 100%)', // Light green gradient
      backgroundAttachment: 'fixed', // Ensures the background stays fixed while scrolling
    }}>
      <Search />
      <New />
      <Trending />
      <Bestsellers />
      <TestimonialsPage />
      <ScrollTopButton />
      <CookiePolicy />
    </div>
  );
}