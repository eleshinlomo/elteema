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
            <a className="relative cursor-pointer ">
                <p className={`absolute  top-[-26px] right-[-12px]  md:top-[-30px]  md:right-[1px]  bg-red-500 text-white text-xs rounded-full  px-2 py-1 z-10`}>
                    {totalItems ? totalItems : 0}
                </p>
                <ShoppingBasketIcon className={`absolute top-[-24px]  right-[-16px] md:top-[-30px] md:right-[-1px]    mt-2  h-8 w-8`} />
            </a>
        </div>
    );
};

export default CartBasket;