'use client'
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { ProductProps, getAllProducts } from '../components/api/product';

interface ProductContextProps {
    children: ReactNode;
}

interface InitialValuesProps {
    Products: ProductProps[];
    setProducts: (value: [])=>void;
    oldSize: string; // Keeping this for backward compatibility
    setOldSize: (value: string) => void; // Keeping this for backward compatibility
    productSizes: Record<number, string>; // New: Tracks sizes per product
    setProductSize: (productId: number, size: string) => void; // New: Sets size for specific product
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
    productSizes: {}, // Initialize empty object
    setProductSize: () => {},
    showClotheSizeInput: false,
    setShowClotheSizeInput: () => {},
    showShoeSizeInput: false,
    setShowShoeSizeInput: () => {}
};

export const ProductContext = createContext<InitialValuesProps>(initialValues);

export const ProductContextProvider = ({ children }: ProductContextProps) => {
    const [Products, setProducts] = useState<ProductProps[]>([]);
    const [oldSize, setOldSize] = useState<string>(''); // Keeping this for backward compatibility
    const [productSizes, setProductSizes] = useState<Record<number, string>>({}); // New state
    const [showClotheSizeInput, setShowClotheSizeInput] = useState(false);
    const [showShoeSizeInput, setShowShoeSizeInput] = useState(false);

    // New function to handle per-product sizes
    const setProductSize = (productId: number, size: string) => {
        setProductSizes(prev => ({
            ...prev,
            [productId]: size
        }));
        
        setOldSize(size);
    };

    useEffect(() => {
        const handleGetProducts = async () => {
            const products = await getAllProducts();
            console.log('PRODUCTS', products.stores); //products.stores is array containing stores
            if(products){
                setProducts(products.stores[0].items);
            }
        }
        handleGetProducts();
    }, []);
    
    const values: InitialValuesProps = {
        Products, 
        setProducts,
        oldSize, 
        setOldSize, 
        productSizes, 
        setProductSize, 
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