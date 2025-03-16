'use client'
import React, { useState, useEffect } from 'react';
import AddToCartButton from "../cart/addtocartbtn";
import { Products, ProductProps } from "../data/productsdata";
import Image from 'next/image';
import Hero from '../hero';
import { SkeletonPage } from '../skeletonPage';
import ProductDetails from './productdetails';
import AllProductDisplay from './allProductDisplay';

const Search = () => {
    const [allProducts, setAllProducts] = useState<ProductProps[]>([]);
    const [itemToSearch, setItemToSearch] = useState<string>('');
    const [searchedItemList, setSearchItemList] = useState<ProductProps[]>([]);
    const [searchedItemFound, setSearchedItemFound] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemToSearch(e.target.value);
    };

    const getSearchedItems = () => {
        if (itemToSearch === '') {
            setSearchItemList([]);
            return;
        }

        setSearchItemList(Products.filter((item) => item.name.toLowerCase().includes(itemToSearch.toLowerCase())));
        setSearchedItemFound(true);
    };

    useEffect(() => {
        getSearchedItems();
    }, [itemToSearch]);

    useEffect(() => {
        setAllProducts(Products);
    }, []);

    return (
        <div id='search' className=" bg-gray-50 mt-32 ">
            <div className="container mx-auto px-4">
            
            <div className="flex justify-around items-center flex-1 bg-gray-50 p-4 shadow-sm rounded-lg">
    <a href="#new" className="hidden md:flex text-green-600 hover:text-green-700 font-semibold transition-colors duration-300">
        NEW ARRIVALS
    </a>
    <div className="w-sm max-w-md mx-4">
        <input
            value={itemToSearch}
            onChange={handleChange}
            placeholder="Search African products"
            className="w-full px-6 py-2 border-2 border-green-300 rounded-full focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all placeholder-gray-400 text-gray-700"
        />
    </div>
    <a href="#new" className="hidden md:flex text-green-600 hover:text-green-700 font-semibold transition-colors duration-300">
        BESTSELLERS
    </a>
</div>
                
                {searchedItemFound && searchedItemList.length > 0 ? (
                    <div>
                       <AllProductDisplay productArray={searchedItemList} />
                    </div>
                ) : (
                    // Defualt display
                    <div>
                        
                        <div  className="">
                            <Hero />
                        </div>
                        
                       <AllProductDisplay productArray={Products} />
                        
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;