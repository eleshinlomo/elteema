import { useContext } from "react"
import { ProductContext } from "../../contextProviders/ProductContext"
import ProductDetails from "./productdetails"

const OtherProducts = ()=>{

    const {Products} = useContext(ProductContext)
    
     const otherItems = Products?.filter((item)=>item.category !== 'fabrics & textiles' &&
     item.category !==  'vegetable & spice' &&
     item.category !== 'processed foods' &&
     item.category !== 'fruits'
    )
      return (

        <div>
            {Products?.length > 0 && <ProductDetails productArray={otherItems} text='Others' />}
        </div>
      )
}

export default OtherProducts