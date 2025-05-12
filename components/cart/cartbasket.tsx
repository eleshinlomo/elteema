import { ShoppingBasketIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contextProviders/cartcontext";


interface BasketProps {
    sticky: boolean
}

const CartBasket = () => {
    const { totalItems } = useContext(CartContext);
    

useEffect(()=>{

}, [totalItems])

    return (
        <div>
            <a className="relative cursor-pointer ">
                <p className="absolute top-4  right-[-30px] lg:right-[3px] bg-red-500 text-white text-xs rounded-full  px-2 py-1 z-10">
                    {totalItems ? totalItems : 0}
                </p>
                <ShoppingBasketIcon className="absolute top-5 right-[-30px] md:right-[-1px]   mt-2  lg:h-8 lg:w-8" />
            </a>
        </div>
    );
};

export default CartBasket;