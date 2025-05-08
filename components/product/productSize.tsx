'use client'
import {ChangeEvent, useState} from 'react'

interface ProductSizeProps {
    size: string;
    setSize: (value: string)=>void;
}


const ProductSize = ({setSize, size}: ProductSizeProps)=> {

    

    return (

        <div className='md:flex gap-4 mb-3'>
            <select onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>setSize(e.target.value)}>
                <option>Choose your size</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
            </select>

            {size && <p className='py-2'>You chose <span className='font-extrabold text-green-600'>{size}</span> size.</p>}
        </div>
    )
}
export default ProductSize