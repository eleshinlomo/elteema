'use client'
import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { ProductProps, getAllProducts } from '../components/api/product';

interface ProductContextProps {
    children: ReactNode;
}

interface InitialValuesProps {
    Products: ProductProps[];
    setProducts: (value: [])=>void;
    oldSize: string; 
    setOldSize: (value: string) => void; 
    showClotheSizeInput: boolean;
    setShowClotheSizeInput: (value: boolean) => void;
    showShoeSizeInput: boolean;
    setShowShoeSizeInput: (value: boolean) => void;
}

const initialValues: InitialValuesProps = {
    Products: [],
    setProducts: (value: [])=>{},
    oldSize: '',
    setOldSize: () => {},
    showClotheSizeInput: false,
    setShowClotheSizeInput: () => {},
    showShoeSizeInput: false,
    setShowShoeSizeInput: () => {}
};

export const ProductContext = createContext<InitialValuesProps>(initialValues);

export const ProductContextProvider = ({ children }: ProductContextProps) => {
    const [Products, setProducts] = useState<ProductProps[]>([]);
    const [oldSize, setOldSize] = useState<string>(''); 
    const [showClotheSizeInput, setShowClotheSizeInput] = useState(false);
    const [showShoeSizeInput, setShowShoeSizeInput] = useState(false);

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
    }, []);
    
    const values: InitialValuesProps = {
        Products, 
        setProducts,
        oldSize, 
        setOldSize, 
        showClotheSizeInput,
        setShowClotheSizeInput,
        showShoeSizeInput,
        setShowShoeSizeInput
    };
    
    return (
        <ProductContext.Provider value={values}>
            {children}
        </ProductContext.Provider>
    );
};