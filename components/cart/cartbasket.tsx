import { ShoppingBasketIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contextProviders/cartcontext";
import { fetchCart } from "../utils";
import { ProductProps } from "../data/productsdata";

const CartBasket = () => {
    const { totalItems } = useContext(CartContext);
    



    return (
        <div>
            <a className="relative cursor-pointer ">
                <p className="absolute top-[-29px] md:top-[-20px]  right-[-35px] lg:right-[3px] bg-red-500 text-white text-xs rounded-full  px-2 py-1 z-10">
                    {totalItems ? totalItems : 0}
                </p>
                <ShoppingBasketIcon className="absolute top-[-20px] md:top-[-15px] right-[-35px] md:right-[-1px]   mt-2  lg:h-8 lg:w-8" />
            </a>
        </div>
    );
};

export default CartBasket;