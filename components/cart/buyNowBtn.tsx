
'use client'
import { useContext, useState, useEffect } from "react"
import { CartContext } from "../../contextProviders/cartcontext"
import { ProductProps } from "../data/productsdata"
import { useRouter } from "next/navigation"

interface AddToCartBtnProps {
    targetid: number,
    setError: (value: string)=>void
    oldSize: string;
    showClotheSizeInput: boolean
     setShowClotheSizeInput: (value: boolean)=>void
     showShoeSizeInput: boolean
     setShowShoeSizeInput: (value: boolean)=>void
    
}

const BuyNowButton = ({ 
    targetid, 
    oldSize, 
    setError, 
    showClotheSizeInput,
    setShowClotheSizeInput,
    showShoeSizeInput,
    setShowShoeSizeInput, 
}: AddToCartBtnProps) => {
    const [buttonText, setButtonText] = useState('Buy Now')
    const [isAdded, setIsAdded] = useState<ProductProps | null>(null)
    const [isAnimating, setIsAnimating] = useState(false)
    const cartContext = useContext(CartContext)
    const { addToCart, cart } = cartContext

    const router = useRouter()

    const handleBuyNow = () => {
        if(!oldSize && showClotheSizeInput || !oldSize && showShoeSizeInput){
          setError('Please choose a size')
          return
        }

        setError('')
        addToCart(targetid, cart, oldSize)
        setError('')
        router.push('/checkoutpage')
    }

   

    return (
        <div>
            
        <button
            onClick={handleBuyNow}
            className={`
                w-full
               
                px-8 py-2 rounded-full
                font-medium text-white
                bg-gradient-to-r from-green-500 to-emerald-600
                hover:from-green-600 hover:to-emerald-700
                active:scale-95 transition-all duration-200
                shadow-md hover:shadow-lg
                ${isAnimating ? 'ring-2 ring-green-400' : ''}
               
            `}
        >
            <span className={`relative z-10 ${isAnimating ? 'animate-pulse' : ''}`}>
                {buttonText}
            </span>
            
            {/* Ripple effect */}
            {isAnimating && (
                <span className="absolute inset-0 bg-white opacity-30 rounded-full scale-0 animate-ripple" />
            )}
        </button>
       
        </div>
    )
}

export default BuyNowButton