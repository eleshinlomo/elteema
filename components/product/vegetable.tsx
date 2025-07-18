import { useContext } from "react"
import { ProductContext } from "../../contextProviders/ProductContext"
import ProductDetails from "./productdetails"

const VegetableProducts = ()=>{

    const {Products} = useContext(ProductContext)
    const filteredProducts = Products?.filter((product)=> product.category === 'vegetable & spice')

      return (

        <div>
            {filteredProducts?.length > 0 && <ProductDetails productArray={filteredProducts} text={`Shop for ${'vegetable & spice'}`} />}
        </div>
      )
}

export default VegetableProducts