import { Button } from "../ui/button"
import { useContext } from "react"
import { CartContext } from "@/contextproviders/cartcontext"

interface AddToCartBtnProps {
    targetid: number
}

const AddToCartButton = ({targetid}: AddToCartBtnProps)=>{

   const {addToCart, cartButtonText} = useContext(CartContext)

    
    return (
        <div>
            
             <p></p>
            <button className="bg-green-600 hover:bg-green-600 rounded-2xl text-white px-2"
            onClick={()=>addToCart(targetid)}
            >{cartButtonText}</button>
            
           
        </div>
    )
}

export default AddToCartButton