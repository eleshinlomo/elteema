'use client'
import AllItems from "@/components/product/allitems"
import BestsellerProducts from "@/components/product/bestseller"
import Trending from "@/components/product/trending"
import { ArrowRightCircleIcon } from "lucide-react"

const AllItemsPage = ()=>{

    return (
        <div className="  pb-4">
            <div className="flex justify-between px-10 py-8">
                <h3 className="font-extrabold text-md md:text-2xl lg:text-3xl ">SEARCH ALL OUR FARMS</h3>
                <div className="flex">
                  
                    <ArrowRightCircleIcon className="mt-1" />
                </div>
            </div>

             {/* Data */}
            <div>
             <AllItems />
            </div>
        </div>
    )
}

export default AllItemsPage