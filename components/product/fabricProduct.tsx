import { useContext } from "react"
import { ProductContext } from "../../contextProviders/ProductContext"
import ProductDetails from "./productdetails"

const FabricProducts = ()=>{

    const {Products} = useContext(ProductContext)
    const filterFabrics = Products?.filter((product)=> product.category === 'fabrics & textiles')

      return (

        <div>
            {filterFabrics?.length > 0 && <ProductDetails productArray={filterFabrics} text='fabrics & textiles' />}
        </div>
      )
}

export default FabricProducts