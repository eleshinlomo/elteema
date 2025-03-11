'use client'
import React, { useState, useEffect } from 'react';
import AddToCartButton from "../cartpage/addtocartbtn";
import { Products, ProductProps } from "./productsdata";
import Image from 'next/image';
import ContactSeller from './details';
import Hero from '../hero';
import { SkeletonPage } from '../skeleton';

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
                <div className="flex justify-center">
                    <div className="w-sm max-w-md my-4">
                        <input
                            value={itemToSearch}
                            onChange={handleChange}
                            placeholder="Search african products"
                            className="w-full px-4 py-1 border border-green-500 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>
                
                {searchedItemFound && searchedItemList.length > 0 ? (
                    <div>
                        <p className='text-center text-lg font-bold mb-4'>Search results</p>
                        <div className="grid md:grid-cols-3 gap-6 ">
                            {searchedItemList.map((item, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform">
                                    <div className="relative h-48 w-full">
                                        <Image src={item.src} alt={item.name} layout="fill" objectFit="cover" />
                                    </div>
                                    <div className="p-4">
                                        <p className="font-semibold text-xl mb-2">{item.name}</p>
                                        <p className="text-green-600 text-lg font-bold">N{item.price}</p>
                                        <p className="text-sm text-gray-600"><span className="font-bold">Supplier</span>: {item.supplierName}</p>
                                        <div className="flex items-center mt-2">
                                            {Array(5).fill(null).map((_, i) => (
                                            <span key={i} className="text-yellow-400">★</span>
                                            ))}
                                        </div>
                                    <div className="mt-4">
                                        <AddToCartButton targetid={item.id} />
                                    </div>
                                    <div className="mt-2">
                                        <ContactSeller />
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                ) : (
                    // Defualt display
                    <div>
                        {}
                        <div  className="">
                            <Hero />
                        </div>
                        {allProducts.length > 0 ?
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 ">
                                {allProducts.slice(0, 4).map((item, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform">
                                        <div className="relative h-48 w-full">
                                            <Image src={item.src} alt={item.name} fill objectFit='cover' />
                                        </div>
                                        <div className="p-4">
                                            <p className="font-semibold text-xl mb-2">{item.name}</p>
                                            <p className="text-green-600 text-lg font-bold">N{item.price}</p>
                                            <p className="text-sm text-gray-600"><span className="font-bold">Supplier</span>: {item.supplierName}</p>
                                        <div className="flex items-center mt-2">
                                            {Array(5).fill(null).map((_, i) => (
                                                <span key={i} className="text-yellow-400">★</span>
                                            ))}
                                        </div>
                                        <div className="mt-4">
                                            <AddToCartButton targetid={item.id} />
                                        </div>
                                        <div className="mt-2">
                                            <ContactSeller />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>: 
                        <div className='text-center'>
                            <p>Loading...</p>
                            <SkeletonPage />
                        </div>}
                        
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;