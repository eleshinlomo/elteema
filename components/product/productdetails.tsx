'use client';

import { useState, useEffect, useContext, ChangeEvent } from "react";
import Image from 'next/image';
import AddToCartButton from "../cart/addtocartbtn";
import { CartContext } from "../../contextProviders/cartcontext";
import { calculateETA, capitalize, formatCurrency, getItemQuantity } from "../utils";
import BuyNowButton from "../cart/buyNowBtn";
import { ProductProps } from '../api/product'
import { GeneralContext } from "../../contextProviders/GeneralProvider";
import { ProductContext } from "../../contextProviders/ProductContext";
import PopularBadge from "./popularBadge";
import CheckoutButton from "../cart/checkoutButton";
import ContinueShoppingButton from "../cart/continueShoppingBtn";
import { clothingCategories, fabricAndTextileCategories, foodCategories, shoeCategories } from "../data/categories";

interface ProductDetailsProps {
  productArray: ProductProps[];
  text: string;
  productsPerPage: number;
}

const ProductDetails = ({ productArray, text, productsPerPage }: ProductDetailsProps) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | any>(null);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const { user } = useContext(GeneralContext);
  const {locationData} = useContext(ProductContext)
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasColor, setHasColor] = useState(false)
  const [hasCondition, setHasCondition] = useState(false)
  const [hasYard, setHasYard] = useState(false)
  const [hasClothingSize, setHasClothingSize] = useState(false)
  const [hasShoeSize, setHasShoeSize] = useState(false)
  const [category, setCategory] = useState('')
  const [selectedClotheSize, setSelectedClotheSize] = useState('')
  const [selectedShoeSize, setSelectedShoeSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [eta, setEta] = useState('')
  const [selectedSize, setSelectedSize] = useState('')

  // Filter out hidden products and sort by latest first
  const visibleProducts = productArray
    .filter(p => !p.isHidden)
    // .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  

  useEffect(() => {
    if (selectedProduct) {
      const item = cart?.find((item) => item._id === selectedProduct._id && !selectedProduct.isHidden);
      setIsAdded(!!item?.isAdded);
    }
  }, [cart, productArray, selectedProduct]);

  const onClose = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const onOpen = (product: ProductProps) => {
    setIsOpen(true);
    setSelectedProduct(product);
    setSelectedImage(0);
    document.body.style.overflow = 'hidden';
  };

  // Pagination logic using visibleProducts
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = visibleProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(visibleProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const productImages = selectedProduct 
    ? Array.isArray(selectedProduct.imageUrls)
      ? selectedProduct.imageUrls.map((img: any, index: any) => ({
          src: img,
          label: ['Front View', 'Back View', 'Side View', 'Detail View'][index] || 'Product Image'
        }))
      : [{ src: selectedProduct.imageUrls, label: 'Product Image' }]
    : [];

  const mainImage = productImages[selectedImage]?.src || productImages[0]?.src;

  useEffect(()=>{
    const isFoundInFood = foodCategories.includes(selectedProduct?.category)
    const isFoundInClothing = clothingCategories.includes(selectedProduct?.category)
    const isFoundInShoes = shoeCategories.includes(selectedProduct?.category)
    const isFoundInFabric = fabricAndTextileCategories.includes(selectedProduct?.category)

    // Clothing
    if(isFoundInClothing){
      setHasClothingSize(true)
      setHasColor(true)
      setHasShoeSize(false)
      setHasYard(false)
      setHasCondition(true)
    }
    // food
    else if(isFoundInFood){
      setHasShoeSize(false)
      setHasColor(false)
      setHasClothingSize(false)
      setHasYard(false)
      setHasCondition(false)
    }// Shoe
    else if(isFoundInShoes){
      setHasShoeSize(true)
      setHasColor(true)
      setHasClothingSize(false)
      setHasYard(false)
      setHasCondition(true)
    }
    // Textile & fabric
    else if(isFoundInFabric){
      setHasYard(true)
      setHasColor(true)
      setHasShoeSize(false)
      setHasCondition(true)
    }else{
      setHasShoeSize(false)
      setHasColor(false)
      setHasClothingSize(false)
      setHasYard(false)
      setHasCondition(false)
    }
  }, [selectedProduct?.category])

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

  // Handle ETA
  useEffect(()=>{
    const handleEta = ()=>{
      const etaValue = calculateETA(user, selectedProduct, locationData)
      if(etaValue){
      setEta(etaValue)
      }
    }
    handleEta()
  }, [user, selectedProduct])

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50">
        <div className="animate-pulse bg-white p-8 rounded-xl shadow-lg">
          <p className="text-gray-500 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Product Preview Section */}
      <div className="mb-4 w-full px-2">
        <h2 className="text-2xl font-semibold mb-2 text-center py-4">{text}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3">
          {currentProducts.map((item, index) => (
            <div
              key={item._id}
              onClick={() => onOpen(item)}
              className="cursor-pointer border rounded-md overflow-hidden hover:shadow-md transition-all flex flex-col h-full relative"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={Array.isArray(item.imageUrls) ? item.imageUrls[0] : item.imageUrls}
                  alt={item.productName}
                  fill
                  loading='lazy'
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
              </div>
              
              <div className="flex flex-col justify-between flex-1 p-2">
                <h3 className="text-xs md:text-sm font-medium text-gray-900 line-clamp-2">
                  {item?.productName?.toUpperCase()}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs md:text-sm font-bold text-gray-900">
                    ₦{item?.price?.toLocaleString()}
                  </span>
                  <span className="text-[10px] md:text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded">
                    in {item.category}
                  </span>
                </div>

                  <div className='flex justify-between'>
                    <p className="text-xs pt-1 font-bold">
                    {item.storeCity}
                  </p>
                   <p className="text-xs pt-1 font-bold">
                    {item.storeState}
                  </p>
                  </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {visibleProducts.length > productsPerPage && (
          <div className="flex justify-center mt-4">
            <nav className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className="px-2 py-1 rounded-l-md border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-2 py-1 border-t border-b border-gray-300 bg-white text-xs font-medium ${
                    currentPage === number
                      ? 'bg-blue-50 text-blue-600 border-blue-500'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 rounded-r-md border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Responsive Modal */}
      {isOpen && selectedProduct && (
        <div className="fixed inset-0 z-[50]">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          ></div>

          <div className="relative z-10 flex items-center justify-center p-2 sm:p-4 h-full w-full">
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto flex flex-col h-[95dvh] sm:h-auto sm:max-h-[90vh]">
              <button
                onClick={onClose}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 text-gray-600 hover:text-red-500 text-xl font-bold bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
                aria-label="Close product details"
              >
                &times;
              </button>

              <div className="flex flex-col md:flex-row h-full overflow-y-auto">
                {/* Image Section */}
                <div className="w-full md:w-1/2 bg-gray-50 p-3 sm:p-4 flex flex-col">
                  <div className="relative aspect-square w-full">
                    <Image
                      src={mainImage}
                      alt={selectedProduct.productName}
                      fill
                      className="object-contain"
                      quality={100}
                      priority
                    />
                  </div>
                  <div className="flex gap-2 mt-3 overflow-x-auto py-1">
                    {productImages.map((img: any, index: any) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 h-12 w-12 sm:h-14 sm:w-14 relative rounded-md overflow-hidden border-2 ${
                          selectedImage === index ? 'border-green-500' : 'border-gray-200'
                        }`}
                      >
                        <Image
                          src={img.src}
                          alt={img.label}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Info Section */}
                <div className="w-full md:w-1/2 p-3 sm:p-4 flex flex-col">
                  <div className="space-y-1 sm:space-y-2">
                    <span className="flex gap-3">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                        {selectedProduct.productName} <PopularBadge item={selectedProduct} />
                      </h2>
                      {/* Cartogory link */}
                      <a href={`/categorypage/${selectedProduct.category}`} className="text-[12px]  bg-green-100 text-green-800 px-1 py-0.5 rounded">
                    in {selectedProduct.category}
                  </a>
                    </span>
                 
                    <p className="text-lg sm:text-xl text-green-600 font-semibold">
                      {formatCurrency('NGN', Number(selectedProduct.price))}
                    </p>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {selectedProduct.description || 'No description available'}
                    </p>
                  </div>

                    {/* Sizes */}
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
                                 <span>{size}</span>
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
                                 <span>{size}</span>
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
             <span className="text-xs text-center">{color}</span>
           </label>
         ))}
       </div>
     </div>
   )}
      </div>
   
                  
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
           <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
           </svg>
         </div>
         <span className="text-sm text-gray-700">
           <span className="font-medium">Est. Delivery:</span> 
           <span className="text-blue-600 ml-1">{eta}</span>
         </span>
       </div>
       <p className=' py-2 bg-green-100  text-green-900'>Ships from {selectedProduct.storeCity} to your location in <span className='text-blue-500'>{locationData?.state}</span></p>
       </div>
     )}
   </div>
                
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 mt-auto pt-2 sm:pt-3">
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

                  
                  <div className="border-t border-gray-200 pt-6 mt-6 space-y-4">
  {/* Seller Info */}
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 text-blue-600 w-9 h-9 rounded-full flex items-center justify-center font-bold">
          S
        </div>
        <div>
          <p className="font-medium text-gray-700">Sold by</p>
          <p className="text-gray-900 font-semibold">{capitalize(selectedProduct.storeName)}</p>
        </div>
      </div>
      <a
        href={`/storefront/${selectedProduct.storeId}`}
        className="px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors font-medium text-sm"
      >
        Visit Store
      </a>
    </div>
  </div>

  {/* Return Policy */}
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="flex items-center gap-3 mb-3">
      <div className="bg-purple-100 text-purple-600 w-9 h-9 rounded-full flex items-center justify-center font-bold">
        R
      </div>
      <p className="font-medium text-gray-700">Return Policy</p>
    </div>
    <p className="text-gray-700 pl-12">{selectedProduct?.return || 'No returns accepted'}</p>
  </div>

  {/* Reviews */}
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="flex items-center gap-3 mb-3">
      <div className="bg-amber-100 text-amber-600 w-9 h-9 rounded-full flex items-center justify-center font-bold">
        ★
      </div>
      <p className="font-medium text-gray-700">Customer Reviews</p>
    </div>
    <p className="text-gray-500 pl-12">No reviews yet. Be the first to review!</p>
  </div>
</div>


                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;