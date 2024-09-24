'use client'
import {useState, useEffect} from 'react'
import FeaturedProducts from "@/components/product/featured"
import { ArrowRightCircleIcon } from "lucide-react"

const FeaturedPage = ()=>{
    const [sticky, setSticky] = useState(false)

    // Sticky Navbar
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

    return (
        <div className=" pb-4 ">
            <div className="flex justify-between px-4 py-4 ">
                <h3 className="font-extrabold text-2xl lg:text-3xl">NEW & FRESH</h3>
                <div className="flex">
                    <ArrowRightCircleIcon className="mt-1" />
                </div>
            </div>

             {/* Data */}
            <div>
             <FeaturedProducts />
            </div>
        </div>
    )
}

export default FeaturedPage