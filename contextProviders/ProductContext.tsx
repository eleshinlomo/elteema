'use client'
import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { ProductProps, getAllProducts } from '../components/api/product';

interface ProductContextProps {
    children: ReactNode;
}

interface InitialValuesProps {
    Products: ProductProps[];
    setProducts: (value: [])=>void;
   
}

const initialValues: InitialValuesProps = {
    Products: [],
    setProducts: (value: [])=>{},

};

export const ProductContext = createContext<InitialValuesProps>(initialValues);

export const ProductContextProvider = ({ children }: ProductContextProps) => {
    const [Products, setProducts] = useState<ProductProps[]>([]);
    

    // New function to handle per-product sizes
    // const setProductSize = (productId: number, size: string) => {
    //     setProductSizes(prev => ({
    //         ...prev,
    //         [productId]: size
    //     }));
        
    //     setOldSize(size)
    // };

    const handleGetAllProducts = async ()=>{
        const data = await getAllProducts()
        
        const products = data?.message
        if(products?.length > 0){
        setProducts(products)
        }
        
    }

    useEffect(() => {
        handleGetAllProducts()
    }, [Products?.length]);
    
    const values: InitialValuesProps = {
        Products, 
        setProducts,
    
    };
    
    return (
        <ProductContext.Provider value={values}>
            {children}
        </ProductContext.Provider>
    );
};