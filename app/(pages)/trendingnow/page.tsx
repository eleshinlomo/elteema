import TrendingProducts from "@/components/product/trending"
import Trending from "@/components/product/trending"
import { ArrowRightCircleIcon } from "lucide-react"

const TrendingNowPage = ()=>{

    return (
        <div>
             <div className="flex justify-between px-10 py-8 bg-green-300">
                <h3 className="font-extrabold text-2xl lg:text-3xl">TRENDING NOW</h3>
                <div className="flex">
                    <a href='' className="font-extrabold text-sm lg:text-xl">SEE ALL</a>
                    <ArrowRightCircleIcon className="mt-1" />
                </div>
            </div>

             {/* Data */}
            <div>
             <TrendingProducts />
            </div>
        </div>
    )
}

export default TrendingNowPage