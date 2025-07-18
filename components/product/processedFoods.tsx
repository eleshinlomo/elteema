import { useContext } from "react"
import { ProductContext } from "../../contextProviders/ProductContext"
import ProductDetails from "./productdetails"

const ProcessedFoodProducts = ()=>{

    const {Products} = useContext(ProductContext)
    const filteredProducts = Products?.filter((product)=> product.category === 'processed foods')

      return (

        <div>
            {filteredProducts?.length > 0 && <ProductDetails productArray={filteredProducts} text={`Shop for ${'processed foods'}`} />}
        </div>
      )
}

export default ProcessedFoodProducts