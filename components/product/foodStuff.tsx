
import { useContext } from "react"
import { ProductContext } from "../../contextProviders/ProductContext"
import ProductDetails from "./productdetails"

const FoodStuff = ()=>{

    const {Products} = useContext(ProductContext)
    const filterFoodStuff = Products?.filter((product)=> product.category === 'foodstuff' || product.category === 'others')

      return (

        <div>
            {filterFoodStuff?.length > 0 && <ProductDetails productArray={filterFoodStuff} text='Food stuff' />}
        </div>
      )
}

export default FoodStuff