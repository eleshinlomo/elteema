'use client'
import {ChangeEvent, useState, useContext, useEffect, FormEvent} from 'react'
import { GeneralContext } from '../../contextProviders/GeneralProvider';
import { CartContext, CartProps } from '../../contextProviders/cartcontext';
import { getSingleProduct, updateCart, updateProductSize } from '../utils';
import { getLocalUser, saveUser } from '../data/userdata';

interface ProductSizeProps {
    itemId: number;
    isAdded: boolean;
    setIsAdded: (value: boolean)=>void;
    setError: (value: string)=>void;
     error: string;
     oldSize: string;
     setOldSize: (value: string)=>void

}


const ProductSize = ({itemId, isAdded, setIsAdded, error, setError, oldSize, setOldSize}: ProductSizeProps)=> {
 
    const {user}= useContext(GeneralContext)
     console.log('USER', user)
    const {cart, setCart, Products} = useContext(CartContext)
    const [item, setItem] = useState<any>(null)
    const [value, setValue] = useState('')
    const [color, setColor] = useState('gray')
    

   

    useEffect(()=>{
  
          if(error){
           setColor('red')
          }else{
            setColor('gray')
          }

        const cartIndex = cart?.findIndex((item)=>item.id === itemId)
        if(cartIndex !== -1){
            setOldSize(cart[cartIndex].size)
            
            
        }

    }, [oldSize, cart, error, user, isAdded, oldSize, itemId, color])

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = e.target.value;
    setOldSize(newSize);
    
    const updatedCart = cart?.map((item)=>
        item.id === itemId ? {...item, size: newSize} : item
    )
    setCart(updatedCart)
    const updatedUser = {...user, cart: updatedCart}
    saveUser(updatedUser)
    setError('');
};
    
   

    return (

        <div className='md:flex gap-4 mb-3'>
            <select value={oldSize} onChange={onChange}>
                <option>{oldSize ? oldSize : 'No size'}</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
            </select>

            <p className={`py-2 text-${color}-600 font-bold`}>{oldSize ? `You chose ${oldSize} size.`: `${error ? error : 'You chose None size.'}`}</p> 
        </div>
    )
}
export default ProductSize