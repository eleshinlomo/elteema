import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getProductData, ProductProps } from '../components/data/productsdata';

interface ProductContextProps {
    children: ReactNode;
}

interface InitialValuesProps {
    Products: ProductProps[];
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
        // Maintain backward compatibility
        setOldSize(size);
    };

    useEffect(() => {
        const handleGetProducts = async () => {
            const products = await getProductData();
            console.log('PRODUCTS', Products);
            if(products?.length > 0){
                setProducts(products);
            }
        }
        handleGetProducts();
    }, []);
    
    const values: InitialValuesProps = {
        Products,
        oldSize, // Still provided for backward compatibility
        setOldSize, // Still provided for backward compatibility
        productSizes, // New
        setProductSize, // New
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