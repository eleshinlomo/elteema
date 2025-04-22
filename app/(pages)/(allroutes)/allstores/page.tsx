'use client'

import Bestsellers from "../../../../components/product/bestseller"
import New from "../../../../components/product/new"
import Trending from "../../../../components/product/trending"

const AllStores = ()=>{

    return (

        <div className="pt-16 pb-4">
            <New />
            <Trending />
            <Bestsellers />
           
        </div>
    )
}

export default AllStores