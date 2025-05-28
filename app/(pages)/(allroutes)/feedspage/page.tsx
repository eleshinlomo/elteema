import Feeds from "../../../../components/feed/feeds"
import Bestsellers from "../../../../components/product/bestseller"
import Featured from "../../../../components/product/featured"
import New from "../../../../components/product/new"
import SwipeProduct from "../../../../components/product/swipeProduct"
import Trending from "../../../../components/product/trending"

const FeedsPage = ()=>{

    return (

        <div>
           <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 py-8">
                {/* NEW */}
                <div className="hidden sm:block">
                 <Featured />

                </div>

                 {/* POSTS */}
                <div>
                   <Feeds /> 
                </div>

                 {/* POPULAR */}
                <div className="hidden sm:block">
                     <Trending />
                    
                </div>
            </div>
           </div>
        </div>
    )
}

export default FeedsPage