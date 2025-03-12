import { ShoppingBasketIcon } from "lucide-react"
import { useContext } from "react"
import { CartContext } from "@/contextproviders/cartcontext"

const CartBasket = ()=>{
    
    const {totalItems} = useContext(CartContext)

    return (
        <div>
      <a className="relative ">
                  <p className="absolute top-[-15px] left-[-7px] lg:top-[-15px] lg:right-2.5 
                  text-xl text-green-800 font-extrabold">{totalItems}</p>
                <ShoppingBasketIcon className="mt-2 lg:h-8 lg:w-8" />
          </a>
        </div>
    )
}

export default CartBasket