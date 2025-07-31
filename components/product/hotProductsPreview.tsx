'use client';

import { useState, useContext, useEffect, useRef } from 'react';
import { ProductContext } from '../../contextProviders/ProductContext';
import Image from 'next/image';
import AddToCartButton from '../cart/addtocartbtn';
import { CartContext } from '../../contextProviders/cartcontext';
import { capitalize, formatCurrency } from '../utils';
import { ProductProps } from '../api/product';
import BuyNowButton from '../cart/buyNowBtn';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import CheckoutButton from '../cart/checkoutButton';

const HotProductsPreview = () => {
  const { cart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [hotProducts, setHotProducts] = useState<ProductProps[]>([]);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  const {
    oldSize,
    setOldSize,
    showClotheSizeInput,
    setShowClotheSizeInput,
    showShoeSizeInput,
    setShowShoeSizeInput,
    Products
  } = useContext(ProductContext);

  useEffect(() => {
    if (selectedProduct) {
      const productInCart = cart?.some(item => item._id === selectedProduct._id);
      setIsAdded(productInCart);
    }
  }, [cart, selectedProduct]);

  useEffect(() => {
    setHotProducts(Products);
    checkScrollPosition();
  }, [Products?.length]);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };

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

  const openModal = (product: any) => {
    setSelectedProduct(product);
    setSelectedImage(0);
    setIsOpen(true);
    setIsAdded(cart.some(item => item._id === product._id));
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

  return (
    <>
      {/* Horizontal product scroll preview */}
      <div className="px-4 pt-4 relative ">
        <h3 className="text-2xl text-center font-bold text-gray-800 mb-2">Super Deals</h3>
        
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
            {hotProducts?.sort((a,b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((product, index) => (
              <div
                key={index}
                className="min-w-[150px] rounded-lg border bg-white shadow cursor-pointer snap-start hover:shadow-md transition-shadow relative"
                onClick={() => openModal(product)}
              >
                {index < 5 && (
                  <div className="absolute top-1 left-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
                    New
                  </div>
                )}
                <div className="relative w-full h-28 rounded-t-lg overflow-hidden">
                  <Image
                    src={product.imageUrls[0]}
                    alt={product.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-2">
                  <h4 className="text-xs font-semibold text-gray-800 truncate">
                    {product.productName}
                  </h4>
                  <p className="text-xs text-green-600 font-bold">
                    {formatCurrency('NGN', product.price)}
                  </p>
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

      {/* Mobile Modal */}
      {isOpen && selectedProduct && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center px-4 py-6">
          <div className="relative w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-50 bg-white text-gray-600 border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center hover:text-red-600 transition-colors"
              aria-label="Close"
            >
              <FiX size={20} />
            </button>

            {/* Main Image */}
            <div className="relative w-full aspect-square bg-gray-100">
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
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md"
                    aria-label="Previous image"
                  >
                    <FiChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md"
                    aria-label="Next image"
                  >
                    <FiChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {selectedProduct.imageUrls.length > 1 && (
              <div className="flex gap-2 p-2 overflow-x-auto scrollbar-hide">
                {selectedProduct.imageUrls.map((url: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-green-500' : 'border-transparent'}`}
                  >
                    <Image
                      src={url}
                      alt={`Thumbnail ${index + 1}`}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="p-4">
              <span className='flex gap-3 items-center flex-wrap'>
                <h2 className="text-base font-bold text-gray-900 mb-1">
                  {selectedProduct.productName}
                </h2>
                <a href={`/categorypage/${selectedProduct.category}`} className="text-[12px] bg-green-100 text-green-800 px-1 py-0.5 rounded">
                  in {selectedProduct.category}
                </a>
              </span>
              <p className="text-green-600 font-semibold text-sm mb-2">
                {formatCurrency('NGN', selectedProduct.price)}
              </p>
              <p className="text-xs text-gray-600 mb-4 ">
                {selectedProduct.description || 'No description available.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-2 mt-auto pt-2 sm:pt-3">
                {!isAdded ? (
                  <>
                    <AddToCartButton
                      targetid={selectedProduct._id}
                      oldSize={oldSize}
                      isAdded={isAdded}
                      setIsAdded={setIsAdded}
                      setError={setError}
                      showClotheSizeInput={showClotheSizeInput}
                      showShoeSizeInput={showShoeSizeInput}
                    />
                    <BuyNowButton
                      targetid={selectedProduct._id}
                      oldSize={oldSize}
                      setError={setError}
                      showClotheSizeInput={showClotheSizeInput}
                      showShoeSizeInput={showShoeSizeInput}
                    />
                  </>
                ) : (
                <CheckoutButton />
                )}
              </div>

              <div className="border-t mt-4 sm:mt-6 pt-3 pb-12 sm:pt-4 text-xs sm:text-sm text-gray-600">
                <span className='flex gap-3 flex-wrap'>
                  <p><strong>Sold by:</strong> {capitalize(selectedProduct.storeName)}</p>
                  <a
                    href={`/storefront/${selectedProduct.storeName}`}
                    className="text-xs sm:text-sm text-blue-600 underline hover:text-blue-800 transition-colors"
                  >
                    Visit {selectedProduct.storeName}
                  </a>
                </span>
                <p className="mt-1 sm:mt-2"><strong>Returns:</strong> No returns</p>
                <p className="mt-2 sm:mt-3 font-bold">Customer Reviews</p>
                <p>No reviews yet.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Modal */}
      {isOpen && selectedProduct && (
        <div className="hidden md:flex fixed inset-0 z-50 bg-black/70 backdrop-blur-sm justify-center items-center p-8">
          <div className="relative w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden flex max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-50 bg-white text-gray-600 border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center hover:text-red-600 transition-colors"
              aria-label="Close"
            >
              <FiX size={20} />
            </button>

            {/* Image Gallery */}
            <div className="w-1/2 h-[500px] bg-gray-100 relative flex flex-col">
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
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
                      aria-label="Previous image"
                    >
                      <FiChevronLeft size={24} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
                      aria-label="Next image"
                    >
                      <FiChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {selectedProduct.imageUrls.length > 1 && (
                <div className="flex gap-3 p-4 border-t overflow-x-auto scrollbar-hide">
                  {selectedProduct.imageUrls.map((url: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-green-500' : 'border-transparent'} hover:border-gray-300 transition-colors`}
                    >
                      <Image
                        src={url}
                        alt={`Thumbnail ${index + 1}`}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="w-1/2 p-6 overflow-y-auto">
              <div className="space-y-4">
                <span className='flex gap-3 items-center flex-wrap'>
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedProduct.productName}
                  </h2>
                  <a href={`/categorypage/${selectedProduct.category}`} className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    in {selectedProduct.category}
                  </a>
                </span>
                
                <p className="text-green-600 font-semibold text-lg">
                  {formatCurrency('NGN', selectedProduct.price)}
                </p>
                
                <p className="text-sm text-gray-600">
                  {selectedProduct.description || 'No description available.'}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {!isAdded ? (
                    <>
                      <AddToCartButton
                        targetid={selectedProduct._id}
                        oldSize={oldSize}
                        isAdded={isAdded}
                        setIsAdded={setIsAdded}
                        setError={setError}
                        showClotheSizeInput={showClotheSizeInput}
                        showShoeSizeInput={showShoeSizeInput}
                      />
                      <BuyNowButton
                        targetid={selectedProduct._id}
                        oldSize={oldSize}
                        setError={setError}
                        showClotheSizeInput={showClotheSizeInput}
                        showShoeSizeInput={showShoeSizeInput}
                      />
                    </>
                  ) : (
                    <CheckoutButton />
                  )}
                </div>

                <div className="border-t pt-4 mt-4 space-y-3 text-sm text-gray-600">
                  <div className='flex gap-3 flex-wrap items-center'>
                    <p><strong>Sold by:</strong> {capitalize(selectedProduct.storeName)}</p>
                    <a
                      href={`/storefront/${selectedProduct.storeName}`}
                      className="text-blue-600 underline hover:text-blue-800 transition-colors"
                    >
                      Visit Store
                    </a>
                  </div>
                  <p><strong>Returns:</strong> No returns</p>
                  <div>
                    <p className="font-bold">Customer Reviews</p>
                    <p>No reviews yet.</p>
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

export default HotProductsPreview;