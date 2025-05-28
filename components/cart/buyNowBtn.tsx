
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
     showShoeSizeInput: boolean
  
    
}

const BuyNowButton = ({ 
    targetid, 
    oldSize, 
    setError, 
    showClotheSizeInput,
    showShoeSizeInput,
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
    

    useEffect(() => {
      const added = cart?.find((item) => item.id === targetid && item.isAdded)

        if (added && added?.isAdded) {
            setButtonText('Checkout')
        } else {
            setButtonText('Buy now')
        }
    }, [targetid, isAdded, cart])
   

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