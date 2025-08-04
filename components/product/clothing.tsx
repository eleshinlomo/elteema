
import { useContext } from "react"
import { ProductContext } from "../../contextProviders/ProductContext"
import ProductDetails from "./productdetails"

const Clothing = ()=>{

    const {Products} = useContext(ProductContext)
    const filterClothing = Products?.filter((product)=> product.category === 'clothing')

      return (

        <div>
            {filterClothing?.length > 0 && <ProductDetails productArray={filterClothing} text='Clothing' />}
        </div>
      )
}

export default Clothing