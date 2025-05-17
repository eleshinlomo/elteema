'use client'
import {ChangeEvent, useState, useContext, useEffect, FormEvent} from 'react'
import { GeneralContext } from '../../contextProviders/GeneralProvider';
import { CartContext, CartProps } from '../../contextProviders/cartcontext';
import { getSingleProduct, updateCart, updateProductSize } from '../utils';
import { getLocalUser, saveUser } from '../data/userdata';

interface ProductSizeProps {
    size: string;
    setSize: (value: string)=>void;
    itemId: number;
    isAdded: boolean;
    setIsAdded: (value: boolean)=>void;
    setError: (value: string)=>void;
     error: string;

}


const ProductSize = ({setSize, size, itemId, isAdded, setIsAdded, error, setError}: ProductSizeProps, )=> {
 
    const {user}= useContext(GeneralContext)
     console.log('USER', user)
    const {cart, setCart, Products} = useContext(CartContext)
    const [item, setItem] = useState<any>(null)
    const [value, setValue] = useState('')

    useEffect(()=>{
        
        
        
        if(size){
            setSize(size)
            
        }

    }, [size, cart, error, user, isAdded])

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = e.target.value;
    setSize(newSize);
    
    const updatedCart = cart?.map((item)=>
        item.id === itemId ? {...item, size: newSize} : item
    )
    setCart(updatedCart)
    const updatedUser = {...user, cart: updatedCart}
    saveUser(updatedUser)
    setIsAdded(false)
    setError('');
};
    

    return (

        <div className='md:flex gap-4 mb-3'>
            <select value={size} onChange={onChange}>
                <option>{item ? item.size : 'No size'}</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
            </select>

            <p className='py-2'>{user && user.cart[0]?.size ? `You chose ${user.cart[0].size} size.` :
             `You chose ${size ? size : 'None'} size.`}</p>
        </div>
    )
}
export default ProductSize