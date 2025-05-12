'use client'
import TestimonialsPage from "../../../../components/Testimonials";
import Search from "../../../../components/product/search";
import ScrollTopButton from "../../../../components/scrollTopButton";
import Bestsellers from "../../../../components/product/bestseller";
import Trending from "../../../../components/product/trending";
import New from "../../../../components/product/new";
import CookiePolicy from "../../../../components/cookieAcceptPage";
import Cart from "../../../../components/cart/cart";
import PurchaseAlert from "../../../../components/product/purchaseAlert";

export default function Home() {
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