import { Button } from "../ui/button"
import { useContext, useState, useEffect } from "react"
import { CartContext } from "../../contextproviders/cartcontext"
import { ProductProps } from "../data/productsdata"

interface AddToCartBtnProps {
    targetid: number,
}

const AddToCartButton = ({targetid}: AddToCartBtnProps)=>{


   const [productAdded, setProductAdded] = useState<boolean>(false)
   const [buttonText, setButtonText] = useState('Add To Cart')
   const [isAdded,setIsAdded] = useState<ProductProps | null>(null)
   const cartContext = useContext(CartContext)
   const {addToCart, cart} = cartContext

   const handleAddToCart = ()=>{
       addToCart(targetid)
       const isProductInCart = cart.find((item)=> item.isAdded)
       if(isProductInCart){
        setIsAdded(isProductInCart)
       }
      return
   }

   useEffect(()=>{
    const itemAdded = cart.some((item)=> item.id === targetid && item.isAdded)
    if(itemAdded){
        setButtonText('Added')
    }else{
        setButtonText('Add To Cart')
    }
   }, [isAdded, cart])



    
    return (
        <div>
            
             <p></p>
            <button className="bg-green-600 hover:bg-green-600 rounded-2xl text-white p-2"
            onClick={handleAddToCart}
            >{buttonText}</button>
            
           
        </div>
    )
}

export default AddToCartButton