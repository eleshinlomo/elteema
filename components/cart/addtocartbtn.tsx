'use client'
import { useContext, useState, useEffect } from "react"
import { CartContext } from "../../contextProviders/cartcontext"
import { ProductProps } from "../data/productsdata"

interface AddToCartBtnProps {
    targetid: number,
    size: string;
}

const AddToCartButton = ({ targetid, size }: AddToCartBtnProps) => {
    const [buttonText, setButtonText] = useState('Add To Cart')
    const [error, setError] = useState('')
    const [color, setColor] = useState('black')
    const [isAdded, setIsAdded] = useState<boolean>(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const cartContext = useContext(CartContext)
    const { addToCart, cart } = cartContext

    const handleAddToCart = () => {
        setIsAnimating(true)
        if(!size){
            setError('Please choose a size')
            return
        }
        addToCart(targetid)
        const isProductInCart = cart?.find((item) => item.isAdded)
        // if (isProductInCart) {
        //     setIsAdded(isProductInCart)
        // }
        setTimeout(() => setIsAnimating(false), 1000)
    }

    useEffect(() => {
        const isAdded = cart?.some((item) => item.id === targetid && item.isAdded)
        if (isAdded) {
            setIsAdded(true)
            setError('')
            setButtonText('Added ✓')
        } else {
            setButtonText('Add To Cart')
        }
    }, [isAdded, cart, error])

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
                ${isAnimating ? 'ring-2 ring-green-400' : ''}
                ${buttonText === 'Added ✓' ? 'bg-emerald-600 from-emerald-600 to-emerald-700' : ''}
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
        <p className={`text-center text-red-500 font-bold py-2`}>{error}</p>
        </div>
    )
}

export default AddToCartButton