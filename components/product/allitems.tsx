'use client'
import React, {useState, useEffect} from 'react'
import AddToCartButton from "../../app/(pages)/cartpage/addtocartbtn"
import { Products, ProductProps } from "./productdata/products"
import Image from 'next/image'
import { searchSingleProduct } from '../utils'
import ContactSeller from '../contactseller'



const AllItems = ()=>{
    
    const [allProducts, setAllProducts] = useState<ProductProps[]>([])
    const [itemToSearch, setItemToSearch ] = useState<string>('')
    const [searchedItemList, setSearchItemList] = useState<any[]>([])
    const [searchedItemFound, setSearchedItemFound] = useState(false)
   //  const originalItems = Products.filter((item)=>item.bestseller === true)
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
       setItemToSearch(e.target.value)
    }


    const getSearchedItems  = ()=>{
        if(itemToSearch === '') {
         setSearchItemList([])
         return
        }
      
        setSearchItemList(Products.filter((item)=>item.name.toLowerCase().includes(itemToSearch.toLowerCase())))
        setSearchedItemFound(true)
        return
       
     }

     useEffect(()=>{
        getSearchedItems()
     }, [itemToSearch])

     useEffect(()=>{
        setAllProducts(Products)
     },[])

   //   useEffect(()=>{
   //    setSearchItemList(Products)
   // },[itemToSearch])

     


    return (
        <div className='text-center flex flex-col justify-center items-center'>
        
         <div>
            {/* Search */}
            <input value={itemToSearch} onChange={handleChange}
            placeholder='Search for farm produce '
             className='border border-green-900  rounded-2xl my-2 px-2 '  />
         </div>

        {searchedItemFound && searchedItemList.length > 0 ?
        <div className="grid md:grid-cols-3 items-center  pb-2  gap-5 px-4 ">

        {searchedItemList.slice(0, 3).map((item, index)=>
        <div  key={index} className="shadow-2xl w-full   rounded-2xl">
        <div className="relative h-[150px] w-[300px] border border-green-900">
        <Image src={item.src} alt='woman image' fill />
        </div>
         <p className="font-semibold text-2xl">{item.name}</p>
         <p>${item.price}</p>
         <AddToCartButton targetid={item.id}  />
         <p><span className='font-bold'>Supplier</span>: {item.supplierName}</p>
         <p className='text-green-800 text-xl'>{item.star + item.star + item.star + item.star + item.star}</p>
         <ContactSeller />
        </div>
           )}

        </div>: 

         <div className="grid  md:grid-cols-2 lg:grid-cols-4 pb-2 items-center gap-5 px-4 ">

         {allProducts.slice(0, 4).map((item, index)=>
         <div  key={index} className="shadow-2xl w-full md:w-[300px] rounded-2xl">
         <div className="relative h-[150px] w-[300px] border border-green-900">
         <Image src={item.src} alt='woman image' fill />
         </div>
         <p className="font-semibold text-2xl">{item.name}</p>
         <p>${item.price}</p>
         <AddToCartButton targetid={item.id}  />
         <p><span className='font-bold'>Supplier</span>: {item.supplierName}</p>
         <p className='text-green-800 text-xl'>{item.star + item.star + item.star + item.star + item.star}</p>
         <ContactSeller />
         </div>
         )}
         </div>
   
         }


        </div>
    )
}

export default AllItems