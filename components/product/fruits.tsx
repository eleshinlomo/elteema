import { useContext } from "react"
import { ProductContext } from "../../contextProviders/ProductContext"
import ProductDetails from "./productdetails"

const FruitProducts = ()=>{

    const {Products} = useContext(ProductContext)
    const filterFabrics = Products?.filter((product)=> product.category === 'fruits')

      return (

        <div>
            {filterFabrics?.length > 0 && <ProductDetails productArray={filterFabrics} text='Fruits' productsPerPage={6} />}
        </div>
      )
}

export default FruitProducts