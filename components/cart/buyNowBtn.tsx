
'use client'
import { useContext, useState, useEffect } from "react"
import { CartContext } from "../../contextProviders/cartcontext"
import { ProductProps } from "../api/product"
import { useRouter } from "next/navigation"

interface AddToCartBtnProps {
    targetId: string;
    setError: (value: string)=>void;
    selectedSize: string;
    selectedColor: string;
    eta: string;
  
    
}

const BuyNowButton = ({ 
    targetId, 
    setError, 
    selectedSize, 
    selectedColor, 
    eta
}: AddToCartBtnProps) => {

    const [buttonText, setButtonText] = useState('Buy Now')
    const [isAdded, setIsAdded] = useState<ProductProps | null>(null)
    const [isAnimating, setIsAnimating] = useState(false)
    const cartContext = useContext(CartContext)
    const { addToCart, cart } = cartContext

    const router = useRouter()

   
    const handleBuyNow = ()=>{
        setError('')
        addToCart(targetId, selectedSize, selectedColor, eta)
        setError('')
        router.push('/dashboard/checkoutpage')
    }
    

    useEffect(() => {
      const added = cart?.find((item) => item._id === targetId && item.isAdded)

        if (added && added?.isAdded) {
            setButtonText('Checkout')
        } else {
            setButtonText('Buy now')
        }
    }, [targetId, isAdded, cart])
   

    return (
        <div>
            
        <button
            onClick={handleBuyNow}
            className={`
            text-xs py-1 px-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800
               
            `}
        >
            <span className=''>
                {buttonText}
            </span>
            
        </button>
       
        </div>
    )
}

export default BuyNowButton