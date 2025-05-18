'use client'
import {ChangeEvent, useState, useContext, useEffect, FormEvent} from 'react'
import { GeneralContext } from '../../contextProviders/GeneralProvider';
import { CartContext, CartProps } from '../../contextProviders/cartcontext';
import { checkCategoryWithClothSize, checkCategoryWithShoeSize, getSingleProduct, updateCart, updateProductSize } from '../utils';
import { getLocalUser, saveUser } from '../data/userdata';

interface ProductSizeProps {
    itemId: number;
    isAdded: boolean;
    setIsAdded: (value: boolean)=>void;
    setError: (value: string)=>void;
     error: string;
     oldSize: string;
     setOldSize: (value: string)=>void
     showClotheSizeInput: boolean
     setShowClotheSizeInput: (value: boolean)=>void
     showShoeSizeInput: boolean
     setShowShoeSizeInput: (value: boolean)=>void

}


const ProductSize = ({itemId, 
    isAdded, 
    setIsAdded, 
    error, setError, 
    oldSize, 
    setOldSize,
    showClotheSizeInput,
    setShowClotheSizeInput,
    showShoeSizeInput,
    setShowShoeSizeInput,
    
    
    }: ProductSizeProps)=> {
 
    const {user}= useContext(GeneralContext)
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

        const productExist = Products.find((item)=>item.id === itemId)
        //    Show Clothe Input
            if(productExist){
            const hasClotheSize = checkCategoryWithClothSize(productExist.category)
            console.log(hasClotheSize)
            if(hasClotheSize){
                setShowClotheSizeInput(true)
            }

            
          //  Show Clothe Input
            const hasShoeSize = checkCategoryWithShoeSize(productExist.category)
            console.log(hasShoeSize)
            if(hasShoeSize){
                setShowShoeSizeInput(true)
            }
        }


        

    }, [oldSize, cart, error, user, isAdded, oldSize, itemId, color, showClotheSizeInput, showShoeSizeInput])

    // Onchange
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

            {/* Clothe input */}
            {showClotheSizeInput ? 
            <div className=''>
            <select value={oldSize} onChange={onChange}>
                <option>{oldSize ? oldSize : 'No size'}</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
            </select>

            <p className={`py-2 text-${color}-600 font-bold`}>{oldSize ? `You chose ${oldSize} size.`: `${error ? error : 'You chose None size.'}`}</p> 
        </div>: null}

           {/* Shoe input */}
            {showShoeSizeInput ? 
            <div className=''>
            <select value={oldSize} onChange={onChange}>
                <option>{oldSize ? oldSize : 'No size'}</option>
                <option value="40">NG-40 EU-40 US-7</option>
                <option value="41">NG-41 EU-41 US-8</option>
                <option value="42">NG-42 EU-42 US-9</option>
                <option value="43">NG-43 EU-43 US-10</option>
                <option value="44">NG-44 EU-44 US-11</option>
                <option value="45">NG-45 EU-45 US-12</option>
                <option value="46">NG-46 EU-46 US-13</option>
            </select>

            <p className={`py-2 text-${color}-600 font-bold`}>{oldSize ? `You chose ${oldSize} size.`: `${error ? error : 'You chose None size.'}`}</p> 
        </div>: null}
        </div>
    )
}
export default ProductSize