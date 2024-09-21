
import FeaturedProducts from "@/components/product/featured"
import { ArrowRightCircleIcon } from "lucide-react"

const FeaturedPage = ()=>{

    return (
        <div className="bg-green-100 pb-4">
            <div className="flex justify-between px-4 py-4 ">
                <h3 className="font-extrabold text-2xl lg:text-3xl">NEW & FRESH</h3>
                <div className="flex">
                    <a href='' className="font-extrabold text-sm lg:text-xl">SEE ALL</a>
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