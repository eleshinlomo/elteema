'use client'
import {ChangeEvent, useState, useContext, useEffect} from 'react'
import { GeneralContext } from '../../contextProviders/GeneralProvider';

interface ProductSizeProps {
    size: string;
    setSize: (value: string)=>void;
}


const ProductSize = ({setSize, size}: ProductSizeProps)=> {
 
    const {user}= useContext(GeneralContext)

    useEffect(()=>{

    }, [user])

    return (

        <div className='md:flex gap-4 mb-3'>
            <select onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>setSize(e.target.value)}>
                <option>No size</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
            </select>

            <p className='py-2'>{user?.size ? `You chose ${user.size} size.` : 'Choose your size'}</p>
        </div>
    )
}
export default ProductSize