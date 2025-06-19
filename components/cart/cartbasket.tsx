import { ShoppingBasketIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contextProviders/cartcontext";
import { GeneralContext } from "../../contextProviders/GeneralProvider";


interface BasketProps {
    sticky: boolean
}

const CartBasket = () => {
    const { totalItems, cart, totalPrice } = useContext(CartContext);
    const {sticky} = useContext(GeneralContext)
    

useEffect(()=>{

}, [totalItems, cart, totalPrice])

    return (
        <div>
            <a className="relative cursor-pointer mx-4">
                <p className={`absolute  ${sticky ? 'top-[6px]': 'top-[10px]'}  right-[-14px] md:right-[-12px] bg-red-500 text-white text-xs rounded-full  px-2 py-1 z-10`}>
                    {totalItems ? totalItems : 0}
                </p>
                <ShoppingBasketIcon className={`absolute ${sticky ? 'top-[8px]': 'top-[10px]'} right-[-20px] md:right-[-18px]   mt-2  h-10 w-10`} />
            </a>
        </div>
    );
};

export default CartBasket;