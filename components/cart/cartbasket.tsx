import { ShoppingBasketIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contextProviders/cartcontext";
import { fetchCart } from "../utils";
import { ProductProps } from "../data/productsdata";

const CartBasket = () => {
    const { totalItems } = useContext(CartContext);
    



    return (
        <div>
            <a className="relative cursor-pointer">
                <p className="absolute top-[-12px] right-[-2px] lg:right-[3px] bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {totalItems}
                </p>
                <ShoppingBasketIcon className="mt-2 lg:h-8 lg:w-8" />
            </a>
        </div>
    );
};

export default CartBasket;