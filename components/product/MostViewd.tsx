

import { useContext } from "react"
import { ProductContext } from "../../contextProviders/ProductContext"
import ProductDetails from "./productdetails"

const MostViewedProducts = ()=>{

    const {Products} = useContext(ProductContext)
    const filteredProducts = Products?.sort((a, b)=>b.views - a.views).slice(0, 8)

      return (

        <div>
            {filteredProducts?.length > 0 && <ProductDetails productArray={filteredProducts} 
            text={'Top 8 Most Viewed'} 
            productsPerPage={8}
            />}
        </div>
      )
}

export default MostViewedProducts