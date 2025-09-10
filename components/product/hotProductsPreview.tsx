'use client';

import { useState, useContext, useEffect, useRef, ChangeEvent, useMemo } from 'react';
import { ProductContext } from '../../contextProviders/ProductContext';
import Image from 'next/image';
import AddToCartButton from '../cart/addtocartbtn';
import { CartContext } from '../../contextProviders/cartcontext';
import { calculateETA, capitalize, formatCurrency } from '../utils';
import { ProductProps, updateProductViewsAndLikes } from '../api/product';
import BuyNowButton from '../cart/buyNowBtn';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import CheckoutButton from '../cart/checkoutButton';
import { clothingCategories, fabricAndTextileCategories, foodCategories, shoeCategories } from '../data/categories';
import { GeneralContext } from '../../contextProviders/GeneralProvider';
import SimilarProducts from './SimilarProducts';

const HotProductsPreview = () => {
  const { cart } = useContext(CartContext);
  const {user} = useContext(GeneralContext);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [hotProducts, setHotProducts] = useState<ProductProps[]>([]);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [hasCondition, setHasCondition] = useState(false);
  const [hasYard, setHasYard] = useState(false);
  const [hasColor, setHasColor] = useState(false)
  const [hasClothingSize, setHasClothingSize] = useState(false);
  const [hasShoeSize, setHasShoeSize] = useState(false);
  const [selectedClotheSize, setSelectedClotheSize] = useState('');
  const [selectedShoeSize, setSelectedShoeSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [eta, setEta] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [views, setViews] = useState(0)
  const [likes, setLikes] = useState(0)

  const { Products, locationData } = useContext(ProductContext);



 



  useEffect(() => {
    if (selectedProduct) {
      const productInCart = cart?.some(item => item._id === selectedProduct._id);
      setIsAdded(productInCart);
    }
  }, [cart, selectedProduct]);

  

  const shuffledProducts = useMemo(() => {
      if (!Products || Products.length === 0) return []
      return [...Products].sort(() => 0.5 - Math.random())
    }, [Products.length])

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };

  // Handle Change
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { value, name } = e.target;

  if (name === 'clotheSize') {
    setSelectedClotheSize(value);
    setSelectedShoeSize('');
    setSelectedSize(value);
  } 
  
  else if (name === 'ShoeSize') {
    setSelectedShoeSize(value);
    setSelectedClotheSize('');
    setSelectedSize(value);
  } 
  
   else if (name === 'color') {
    setSelectedColor(value);
  }
};



   // Reset selections when product changes
useEffect(() => {
  if (selectedProduct) {
    setSelectedClotheSize('');
    setSelectedShoeSize('');
    setSelectedColor('');
    setSelectedSize('');

    const isClothing = clothingCategories.includes(selectedProduct.category);
    const isShoe = shoeCategories.includes(selectedProduct.category);

    if (isClothing && selectedProduct.clotheSizes?.length > 0) {
      const firstSize = selectedProduct.clotheSizes[0];
      setSelectedClotheSize(firstSize);
      setSelectedSize(firstSize);
    } else if (isShoe && selectedProduct.shoeSizes?.length > 0) {
      const firstSize = selectedProduct.shoeSizes[0];
      setSelectedShoeSize(firstSize);
      setSelectedSize(firstSize);
    }

    if (selectedProduct.colors?.length > 0) {
      setSelectedColor(selectedProduct.colors[0]);
    }
  }
}, [selectedProduct?.length, Products?.length]);



  

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollPosition, 300);
    }
  };


  const handleViews = async ()=>{
    const id = selectedProduct._id
    const updatedProduct = {...selectedProduct, views: views + 1} //Just for local update
    setSelectedProduct(updatedProduct)
    const payload = {
      id,
      likes,
      views
    }
  const response = await updateProductViewsAndLikes(payload)
  
   if(response.ok){
    console.log(response)
   }else{
      console.log(response)
   }
   return
 }


  const openModal = async (product: any) => {
    
    setSelectedProduct(product);
    setSelectedImage(0);
    setIsOpen(true);
    setIsAdded(cart.some(item => item._id === product._id));
    await handleViews()
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedProduct(null);
    setSelectedImage(0);
    setIsAdded(false);
  };

  const nextImage = () => {
    if (!selectedProduct) return;
    const nextIndex = (selectedImage + 1) % selectedProduct.imageUrls.length;
    setSelectedImage(nextIndex);
  };

  const prevImage = () => {
    if (!selectedProduct) return;
    const prevIndex = (selectedImage - 1 + selectedProduct.imageUrls.length) % selectedProduct.imageUrls.length;
    setSelectedImage(prevIndex);
  };

  useEffect(() => {
    if (!selectedProduct) return;
    
    const isFoundInFood = foodCategories.includes(selectedProduct?.category);
    const isFoundInClothing = clothingCategories.includes(selectedProduct?.category);
    const isFoundInShoes = shoeCategories.includes(selectedProduct?.category);
    const isFoundInFabric = fabricAndTextileCategories.includes(selectedProduct?.category);

    // Clothing
    if (isFoundInClothing) {
      setHasClothingSize(true);
      setHasShoeSize(false);
      setHasYard(false);
      setHasCondition(true);
      setHasColor(true)
    }
    // Food
    else if (isFoundInFood) {
      setHasShoeSize(false);
      setHasClothingSize(false);
      setHasYard(false);
      setHasCondition(false);
    }
    // Shoe
    else if (isFoundInShoes) {
      setHasShoeSize(true);
      setHasClothingSize(false);
      setHasYard(false);
      setHasCondition(true);
      setHasColor(true)
    }
    // Textile & fabric
    else if (isFoundInFabric) {
      setHasYard(true);
      setHasShoeSize(false);
      setHasCondition(true);
      setHasColor(true)
    } else {
      setHasShoeSize(false);
      setHasClothingSize(false);
      setHasYard(false);
      setHasCondition(false);
      setHasColor(false)
    }
  }, [selectedProduct?.category]);


  // Handle ETA
  useEffect(() => {
    const handleEta = () => {
      const etaValue: any = calculateETA(user, selectedProduct, locationData);
      if (etaValue) {
        setEta(etaValue);
      }
    };
    handleEta();
  }, [user, selectedProduct, locationData]);

  return (
    <>
      {/* Horizontal product scroll preview */}
      <div className="px-2 pt-4 relative">
        <h3 className="text-2xl text-center font-bold text-gray-800 mb-2">New products</h3>
        
        <div className="relative group">
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Scroll left"
            >
              <FiChevronLeft className="text-gray-700" size={20} />
            </button>
          )}
          
          <div
            ref={scrollContainerRef}
            className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
            onScroll={checkScrollPosition}
          >
            {shuffledProducts
           .map((product, index) => (
              <div
                key={index}
                className="min-w-[150px] rounded-lg border bg-white shadow cursor-pointer snap-start hover:shadow-md transition-shadow relative"
                onClick={() => openModal(product)}
              >
                {index < 10  && (
                  <div className="absolute top-1 left-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
                    New
                  </div>
                )}
                <div className="relative w-full h-28 rounded-t-lg overflow-hidden">
                  <Image
                    src={product.imageUrls[0]}
                    alt={product.productName}
                    fill
                    loading='lazy'
                    className="object-cover"
                  />
                </div>
                <div className="p-2 text-xs flex flex-col gap-1">
                  <h4 className="text-xs font-semibold text-gray-800 truncate">
                    {product.productName}
                  </h4>
                 
                  <p>Min.order: {product.unitCost} {product.unitCost > 1 ? 'Pieces' : 'Piece'}</p>
                  <p className="text-xs text-green-600 font-bold">
                    {formatCurrency('NGN', product.price)}
                  </p>
                   
                  <div className='flex justify-between'>
                    <p className="text-xs pt-1 font-bold">
                    {product.storeCity}
                  </p>
                   <p className="text-xs pt-1 font-bold">
                    {product.storeState}
                  </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Scroll right"
            >
              <FiChevronRight className="text-gray-700" size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Combined Modal - Responsive for both mobile and desktop */}
      {isOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 md:p-8">
          <div className={`
            relative w-full max-w-sm md:max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden 
            ${window.innerWidth >= 768 ? 'flex max-h-[90vh]' : 'max-h-[90vh] overflow-y-auto'}
          `}>
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-50 bg-white text-gray-600 border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center hover:text-red-600 transition-colors"
              aria-label="Close"
            >
              <FiX size={20} />
            </button>

            {/* Image Gallery - Responsive layout */}
            <div className={`
              ${window.innerWidth >= 768 ? 'w-1/2 h-[500px]' : 'w-full aspect-square'} 
              bg-gray-100 relative flex flex-col
            `}>
              {/* Main Image */}
              <div className="relative flex-1 flex items-center justify-center p-4">
                <Image
                  src={selectedProduct.imageUrls[selectedImage]}
                  alt={selectedProduct.productName}
                  fill
                  className="object-contain"
                  priority
                />
                
                {/* Navigation arrows */}
                {selectedProduct.imageUrls.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className={`
                        absolute ${window.innerWidth >= 768 ? 'left-4' : 'left-2'} top-1/2 transform -translate-y-1/2 
                        bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors
                      `}
                      aria-label="Previous image"
                    >
                      <FiChevronLeft size={window.innerWidth >= 768 ? 24 : 20} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className={`
                        absolute ${window.innerWidth >= 768 ? 'right-4' : 'right-2'} top-1/2 transform -translate-y-1/2 
                        bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors
                      `}
                      aria-label="Next image"
                    >
                      <FiChevronRight size={window.innerWidth >= 768 ? 24 : 20} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {selectedProduct.imageUrls.length > 1 && (
                <div className="flex gap-2 md:gap-3 p-2 md:p-4 border-t overflow-x-auto scrollbar-hide">
                  {selectedProduct.imageUrls.map((url: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`
                        flex-shrink-0 ${window.innerWidth >= 768 ? 'w-20 h-20' : 'w-16 h-16'} rounded-md overflow-hidden border-2 
                        ${selectedImage === index ? 'border-green-500' : 'border-transparent'} 
                        hover:border-gray-300 transition-colors
                      `}
                    >
                      <Image
                        src={url}
                        alt={`Thumbnail ${index + 1}`}
                        width={window.innerWidth >= 768 ? 80 : 64}
                        height={window.innerWidth >= 768 ? 80 : 64}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info - Responsive layout */}
            <div className={`
              ${window.innerWidth >= 768 ? 'w-1/2 p-6' : 'p-4'} 
              overflow-y-auto
            `}>
              <div className="space-y-3 md:space-y-4">
                <span className='flex gap-3 items-center flex-wrap'>
                  <h2 className={`${window.innerWidth >= 768 ? 'text-xl' : 'text-base'} font-bold text-gray-900`}>
                    {selectedProduct.productName}
                  </h2>
                  <a 
                    href={`/categorypage/${selectedProduct.category}`} 
                    className={`${window.innerWidth >= 768 ? 'text-sm px-2 py-1' : 'text-xs px-1 py-0.5'} bg-green-100 text-green-800 rounded`}
                  >
                    in {selectedProduct.category}
                  </a>
                  <p>Views: {selectedProduct.views}</p>
                </span>
                
                <p className={`text-green-600 font-semibold ${window.innerWidth >= 768 ? 'text-lg' : 'text-sm'}`}>
                  {formatCurrency('NGN', selectedProduct.price)}
                </p>
                
                <p className={`text-gray-600 ${window.innerWidth >= 768 ? 'text-sm' : 'text-xs'}`}>
                  {selectedProduct.description || 'No description available.'}
                </p>

                {/* Sizes and Colors - Responsive layout */}
                <div className="space-y-3 my-3">
                  {/* Clothing Sizes */}
                  {hasClothingSize && selectedProduct.clotheSizes?.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Select Size:</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.clotheSizes.map((size: string, index: number) => (
                          <label key={index} className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="clotheSize"
                              value={size}
                              checked={selectedClotheSize === size}
                              onChange={handleChange}
                              className="h-4 w-4"
                            />
                            <span className={window.innerWidth >= 768 ? 'text-sm' : 'text-xs'}>{size}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Shoe Sizes */}
                  {hasShoeSize && selectedProduct.shoeSizes?.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Select Size:</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.shoeSizes.map((size: string, index: number) => (
                          <label key={index} className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="shoeSize"
                              value={size}
                              checked={selectedShoeSize === size}
                              onChange={handleChange}
                              className="h-4 w-4"
                            />
                            <span className={window.innerWidth >= 768 ? 'text-sm' : 'text-xs'}>{size}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Colors */}
                  {hasColor && selectedProduct.colors?.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Select Color:</h3>
                      <div className="flex flex-wrap gap-3">
                        {selectedProduct.colors.map((color: string, index: number) => (
                          <label key={index} className="flex flex-col items-center gap-1 cursor-pointer">
                            <input
                              type="radio"
                              name="color"
                              value={color}
                              checked={selectedColor === color}
                              onChange={handleChange}
                              className="hidden"
                            />
                            <span 
                              className={`w-6 h-6 rounded-full ${
                                selectedColor === color ? 'ring-2 ring-offset-1 ring-blue-500' : ''
                              }`}
                              style={{ backgroundColor: color.toLowerCase() }}
                            />
                            <span className={`text-center ${window.innerWidth >= 768 ? 'text-xs' : 'text-xxs'}`}>
                              {color}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Condition and ETA */}
                <div className="flex flex-col space-y-2 p-3 bg-gray-50 rounded-lg">
                  {hasCondition && (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-sm text-gray-700">
                        <span className="font-medium">Condition:</span> 
                        <span className="text-green-600 ml-1">{capitalize(selectedProduct.condition)}</span>
                      </span>
                    </div>
                  )}
    
                  {eta && (
                    <div>
                     
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      </div>
                      
                      
                       
                      <span className="text-sm text-gray-700">
                        <span className="font-medium">Est. Delivery:</span> 
                        <span className="text-blue-600 ml-1">{eta}</span>
                      </span>
                      </div>
                    <p className=' py-2 bg-green-100  text-green-900 text-center'>Ships from {selectedProduct.storeCity} </p>
                    </div>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 md:gap-4 pt-4">
                  {!isAdded ? (
                    <>
                      <AddToCartButton
                        targetid={selectedProduct._id}
                        isAdded={isAdded}
                        setIsAdded={setIsAdded}
                        setError={setError}
                        selectedSize={selectedSize}
                        selectedColor={selectedColor}
                        eta={eta}
                      />
                      <BuyNowButton
                        targetId={selectedProduct._id}
                        setError={setError}
                        selectedSize={selectedSize}
                        selectedColor={selectedColor}
                        eta={eta}
                      />
                    </>
                  ) : (
                    <CheckoutButton />
                  )}
                </div>

                {/* Additional Info */}
                <div className="border-t border-gray-200 pt-4 md:pt-6 mt-4 md:mt-6 space-y-3 md:space-y-4">
                  {/* Seller Info */}
                  <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 text-blue-600 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-bold">
                          S
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Sold by</p>
                          <p className="text-gray-900 font-semibold">{capitalize(selectedProduct.storeName)}</p>
                        </div>
                      </div>
                      <a
                        href={`/storefront/${selectedProduct.storeId}`}
                        className="px-3 py-1.5 md:px-4 md:py-2 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors font-medium text-xs md:text-sm"
                      >
                        Visit Store
                      </a>
                    </div>
                  </div>

                  {/* Return Policy */}
                  <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2 md:mb-3">
                      <div className="bg-purple-100 text-purple-600 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-bold">
                        R
                      </div>
                      <p className="font-medium text-gray-700">Return Policy</p>
                    </div>
                    <p className="text-gray-700 pl-11">{selectedProduct?.return || 'No returns accepted'}</p>
                  </div>

                  {/* Reviews */}
                  <div className="bg-gray-50 p-3 md:p-4 rounded-lg  ">
                    <div className="flex items-center gap-3 mb-2 md:mb-3">
                      <div className="bg-amber-100 text-amber-600 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-bold">
                        ★
                      </div>
                      <p className="font-medium text-gray-700">Customer Reviews</p>
                    </div>
                    <p className="text-gray-500 pl-11 mb-12">No reviews yet. Be the first to review!</p>
                  </div>
                </div>
              </div>
              <SimilarProducts product={selectedProduct} productPerPage={6} />
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default HotProductsPreview;