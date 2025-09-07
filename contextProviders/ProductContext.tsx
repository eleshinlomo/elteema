'use client'
import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { ProductProps, getAllProducts } from '../components/api/product';

interface ProductContextProps {
    children: ReactNode;
}

interface LocationDataProps {
    city: string;
    state: string;
    country: string
    regionName: string;
    ip: string
}

interface InitialValuesProps {
    Products: ProductProps[];
    setProducts: (value: [])=>void;
    locationData: LocationDataProps | null;
    setLocationData: (value: null)=>void
   
}

const initialValues: InitialValuesProps = {
    Products: [],
    setProducts: (value: [])=>{},
    locationData: null,
    setLocationData: (value: null)=>{},

};

export const ProductContext = createContext<InitialValuesProps>(initialValues);

export const ProductContextProvider = ({ children }: ProductContextProps) => {
    const [Products, setProducts] = useState<ProductProps[]>([]);
    const [locationData, setLocationData] = useState<LocationDataProps | null>(null)
    

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
        const {response, geoData} = data
        setLocationData(geoData)
        const products: any = response?.message
        if(products?.length > 0){
        const filteredProducts = products.filter((p: any)=>!p.isHidden)
        setProducts(filteredProducts)
        }
        
    }

    useEffect(() => {
        handleGetAllProducts()
    }, [Products.length]);
    
    const values: InitialValuesProps = {
        Products, 
        setProducts,
        locationData,
        setLocationData
    
    };
    
    return (
        <ProductContext.Provider value={values}>
            {children}
        </ProductContext.Provider>
    );
};