'use client'
import { useContext, useState, useEffect } from "react"
import { CartContext } from "../../contextProviders/cartcontext"
import { ProductProps } from "../data/productsdata"
import { GeneralContext } from "../../contextProviders/GeneralProvider";
import { updateProductSize } from "../utils";


interface AddToCartBtnProps {
    targetid: number,
    isAdded: boolean;
    setIsAdded: (value: boolean)=>void
    setError: (value: string)=>void
    oldSize: string;
    showClotheSizeInput: boolean
     showShoeSizeInput: boolean

    
}

const AddToCartButton = ({ 
    targetid, 
    oldSize, 
    isAdded, 
    setIsAdded, 
    setError,
    showClotheSizeInput,
    showShoeSizeInput,
}: AddToCartBtnProps) => {
    const [buttonText, setButtonText] = useState('Add To Cart')
    const [isAnimating, setIsAnimating] = useState(false)
    const { addToCart, cart} = useContext(CartContext)
    const {user} = useContext(GeneralContext)
     

    
   

    const handleAddToCart = () => {
    
         if(!oldSize && showClotheSizeInput || !oldSize && showShoeSizeInput){
            setError('Please choose a size')
            return
        }
       
        setError('')
        addToCart(targetid, cart, oldSize)
        setError('')
        setIsAdded(true)
        setButtonText('Added ✓')
        
    }

  

    useEffect(() => {
      const added = cart?.find((item) => item.id === targetid && item.isAdded)
           console.log('IS ADDED', added?.isAdded)
        if (added && added?.isAdded) {
            setIsAdded(added.isAdded)
            setButtonText('Added ✓')
        } else {
            setButtonText('Add To Cart')
        }
    }, [targetid, isAdded, cart])

    return (
        <div>
           
        <button
            onClick={handleAddToCart}
            className={`
               text-xs py-1 px-2 rounded bg-green-600 hover:bg-green-700 text-white`}>
               
            <span className=''>
                {buttonText}
            </span>
          
        </button>
        
        </div>
    )
}

export default AddToCartButton