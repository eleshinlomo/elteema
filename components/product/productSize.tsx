'use client'
import {useState} from 'react'



const ProductSize = ()=> {

    const [size, setSize] = useState('')

    return (

        <div className='md:flex gap-4 mb-3'>
            <select onChange={(e)=>setSize(e.target.value)}>
                <option>Please choose your size</option>
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