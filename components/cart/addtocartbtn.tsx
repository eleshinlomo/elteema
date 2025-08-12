'use client'
import { useContext, useState, useEffect } from "react"
import { CartContext } from "../../contextProviders/cartcontext"
import { GeneralContext } from "../../contextProviders/GeneralProvider";



interface AddToCartBtnProps {
    targetid: string,
    isAdded: boolean;
    selectedSize: string;
    selectedColor: string;
    eta: string;
    setIsAdded: (value: boolean)=>void
    setError: (value: string)=>void
  

}

const AddToCartButton = ({ targetid, isAdded, setIsAdded, setError, selectedSize, selectedColor, eta}: AddToCartBtnProps) => {


    const [buttonText, setButtonText] = useState('Add To Cart')
    const [isAnimating, setIsAnimating] = useState(false)
    const { addToCart, cart} = useContext(CartContext)
    const {user} = useContext(GeneralContext)
     

    const handleAddToCart = () => {
    
        setError('')
        addToCart(targetid, selectedSize, selectedColor, eta)
        setError('')
        setIsAdded(true)
        setButtonText('Added ✓')
        
    }

  

    useEffect(() => {
      const added = cart?.find((item) => item._id === targetid && item.isAdded)
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