
import { useContext } from "react"
import { ProductContext } from "../../contextProviders/ProductContext"
import ProductDetails from "./productdetails"

const FoodStuff = ()=>{

    const {Products} = useContext(ProductContext)
    const filterFoodStuff = Products

      return (

        <div>
            {filterFoodStuff?.length > 0 && <ProductDetails productArray={filterFoodStuff} text='Latest Products' productsPerPage={24} />}
        </div>
      )
}

export default FoodStuff