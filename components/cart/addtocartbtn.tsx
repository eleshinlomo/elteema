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
     setShowClotheSizeInput: (value: boolean)=>void
     showShoeSizeInput: boolean
     setShowShoeSizeInput: (value: boolean)=>void
    
}

const AddToCartButton = ({ 
    targetid, 
    oldSize, 
    isAdded, 
    setIsAdded, 
    setError,
    showClotheSizeInput,
    setShowClotheSizeInput,
    showShoeSizeInput,
    setShowShoeSizeInput,
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
        
        const isProductInCart = cart?.find((item) => item.isAdded)

        
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
                w-full
                px-8 py-2 rounded-full
                font-medium text-white
                bg-gradient-to-r from-green-500 to-emerald-600
                hover:from-green-600 hover:to-emerald-700
                active:scale-95 transition-all duration-200
                shadow-md hover:shadow-lg
                ${buttonText === 'Added ✓' ? 'bg-emerald-600 from-emerald-600 to-emerald-700' : ''}
            `}
        >
            <span className={`relative z-10 ${isAnimating ? 'animate-pulse' : ''}`}>
                {buttonText}
            </span>
            
          
        </button>
        
        </div>
    )
}

export default AddToCartButton