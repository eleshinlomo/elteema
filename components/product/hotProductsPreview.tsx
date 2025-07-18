'use client';

import { useState, useContext, useEffect } from 'react';
import { ProductContext } from '../../contextProviders/ProductContext';
import Image from 'next/image';
import AddToCartButton from '../cart/addtocartbtn';
import { CartContext } from '../../contextProviders/cartcontext';
import { capitalize, formatCurrency } from '../utils';
import { ProductProps } from '../api/product';
import BuyNowButton from '../cart/buyNowBtn';

const HotProductsPreview = () => {
  const { cart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [hotProducts, setHotProducts] = useState<ProductProps[]>([]);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  
  const {
    oldSize,
    setOldSize,
    showClotheSizeInput,
    setShowClotheSizeInput,
    showShoeSizeInput,
    setShowShoeSizeInput,
    Products
  } = useContext(ProductContext);

  // Watch cart changes and update isAdded state
  useEffect(() => {
    if (selectedProduct) {
      const productInCart = cart.some(item => item._id === selectedProduct._id);
      setIsAdded(productInCart);
    }
  }, [cart, selectedProduct]);

  const openModal = (product: any) => {
    setSelectedProduct(product);
    setSelectedImage(0);
    setIsOpen(true);
    // Check if product is in cart when opening modal
    setIsAdded(cart.some(item => item._id === product._id));
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedProduct(null);
    setSelectedImage(0);
    setIsAdded(false);
  };

  useEffect(() => {
    setHotProducts(Products?.slice(0, 10)); // Show first 6
  }, [Products?.length]);

  return (
    <>
      {/* Horizontal product scroll preview */}
      <div className="px-4 pt-4">
        <h3 className="text-2xl text-center font-bold text-gray-800 mb-2">Super Deals</h3>
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {hotProducts?.map((product, index) => (
            <div
              key={index}
              className="min-w-[150px] rounded-lg border bg-white shadow cursor-pointer"
              onClick={() => openModal(product)}
            >
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
      </div>

      {/* Modal */}
      {isOpen && selectedProduct && (
        <div className="absolute top-[-10px] left-0 right-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center px-4 py-6">
          <div className="relative w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-50 bg-white text-gray-600 border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center hover:text-red-600"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Product Image */}
            <div className="relative w-full aspect-square bg-gray-100">
              <Image
                src={
                  Array.isArray(selectedProduct.imageUrls)
                    ? selectedProduct.imageUrls[selectedImage]
                    : selectedProduct.imageUrls
                }
                alt={selectedProduct.productName}
                fill
                className="object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="p-4">
              <span className='flex gap-3'>
                <h2 className="text-base font-bold text-gray-900 mb-1">
                  {selectedProduct.productName}
                </h2>
                {/* Category link */}
                 <a href={`/categorypage/${selectedProduct.category}`} className="text-[12px]  bg-green-100 text-green-800 px-1 py-0.5 rounded">
                    in {selectedProduct.category}
                  </a>
              </span>
              <p className="text-green-600 font-semibold text-sm mb-2">
                {formatCurrency('NGN', selectedProduct.price)}
              </p>
              <p className="text-xs text-gray-600 mb-4 line-clamp-3">
                {selectedProduct.description || 'No description available.'}
              </p>

              {/* Action Buttons */}
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
                  <a
                    href="/checkoutpage"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm text-center"
                  >
                    Go to Checkout
                  </a>
                )}
              </div>

              {/* Additional Product Info */}
              <div className="border-t mt-4 sm:mt-6 pt-3 sm:pt-4 text-xs sm:text-sm text-gray-600">
                <span className='flex gap-3'>
                    <p><strong>Sold by:</strong> {capitalize(selectedProduct.storeName)}</p>
                    <a
                      href={`/storefront/${selectedProduct.storeName}`}
                      className="text-xs sm:text-sm text-blue-600 underline hover:text-blue-800 block"
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
    </>
  );
};

export default HotProductsPreview;