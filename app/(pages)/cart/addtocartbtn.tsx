import { Button } from "../../../components/ui/button"
import { useContext } from "react"
import { CartContext } from "../../../components/contextproviders/cartcontext"

interface AddToCartBtnProps {
    targetid: number
}

const AddToCartButton = ({targetid}: AddToCartBtnProps)=>{

   const {addToCart, cartButtonText} = useContext(CartContext)

    
    return (
        <div>
            
             <p></p>
            <Button className="bg-green-600 hover:bg-green-600 rounded-2xl text-white"
            onClick={()=>addToCart(targetid)}
            >{cartButtonText}</Button>
            
           
        </div>
    )
}

export default AddToCartButton