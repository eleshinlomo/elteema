import React, { ChangeEvent, useState, useContext, useEffect } from 'react';
import { GeneralContext } from '../../contextProviders/GeneralProvider';
import { CartContext } from '../../contextProviders/cartcontext';
import { checkCategoryWithClothSize, checkCategoryWithShoeSize } from '../utils';
import { ProductContext } from '../../contextProviders/ProductContext';

interface ProductSizeProps {
  targetId: number;
  isAdded: boolean;
  setIsAdded: (value: boolean) => void;
  setError: (value: string) => void;
  error: string;
  showClotheSizeInput: boolean;
  setShowClotheSizeInput: (value: boolean) => void;
  showShoeSizeInput: boolean;
  setShowShoeSizeInput: (value: boolean) => void;
}

const ProductSize: React.FC<ProductSizeProps> = ({
  targetId, 
  isAdded, 
  setIsAdded, 
  error, 
  setError,
  showClotheSizeInput,
  setShowClotheSizeInput,
  showShoeSizeInput,
  setShowShoeSizeInput,
}) => {
  const { user } = useContext(GeneralContext);
  const { cart} = useContext(CartContext);
  const { productSizes, setProductSize , Products} = useContext(ProductContext);
  const [color, setColor] = useState('gray');
  const [productToUpdate, setProductToUpdate] = useState(null);
  const oldSize = productSizes[targetId] || '';

  useEffect(() => {
    if (error) {
      setColor('red');
    } else {
      setColor('gray');
    }

    const productExist: any = Products.find((item) => item.id === targetId);
    if (productExist) {
      setProductToUpdate(productExist);
      if (checkCategoryWithClothSize(productExist.id, Products)) {
        setShowClotheSizeInput(true);
      }
      if (checkCategoryWithShoeSize(productExist.id, Products)) {
        setShowShoeSizeInput(true);
      }
    }
  }, [cart, error, user, isAdded, targetId, Products]);

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setProductSize(targetId, e.target.value);
    setError('');
  };

  return (
    <div className='text-sm'>
      {showClotheSizeInput && (
        <div>
          <select value={oldSize} onChange={onChange} className='text-sm'>
            <option>Choose size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
          <p className={`py-2 text-${color}-600 font-bold`}>
            {oldSize ? `You chose ${oldSize} size.` : error || 'You chose None size.'}
          </p>
        </div>
      )}

      {showShoeSizeInput && (
        <div>
          <select value={oldSize} onChange={onChange} className='text-sm'>
            <option>Choose size</option>
            <option value="40">NG-40 EU-40 US-7</option>
            <option value="41">NG-41 EU-41 US-8</option>
            <option value="42">NG-42 EU-42 US-9</option>
            <option value="43">NG-43 EU-43 US-10</option>
            <option value="44">NG-44 EU-44 US-11</option>
            <option value="45">NG-45 EU-45 US-12</option>
            <option value="46">NG-46 EU-46 US-13</option>
          </select>
          <p className={`py-2 text-${color}-600 font-bold`}>
            {oldSize ? `Size ${oldSize}` : error || 'Size: None'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductSize;