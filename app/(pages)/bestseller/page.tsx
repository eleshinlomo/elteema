import BestsellerProducts from "@/components/product/bestseller"
import Trending from "@/components/product/trending"
import { ArrowRightCircleIcon } from "lucide-react"

const BestsellerPage = ()=>{

    return (
        <div className="bg-white/30  pb-4">
            <div className="flex justify-between px-10 py-8">
                <h3 className="font-extrabold text-2xl lg:text-3xl shadow-2xl">BESTSELLER</h3>
                <div className="flex">
                    <a href='' className="font-extrabold text-sm lg:text-xl">SEE ALL</a>
                    <ArrowRightCircleIcon className="mt-1" />
                </div>
            </div>

             {/* Data */}
            <div>
             <BestsellerProducts />
            </div>
        </div>
    )
}

export default BestsellerPage