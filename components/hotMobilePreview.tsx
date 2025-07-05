'use client';

import { useState, useContext } from 'react';
import { ProductContext } from '../contextProviders/ProductContext';
import Image from 'next/image';
import AddToCartButton from './cart/addtocartbtn';
import { CartContext } from '../contextProviders/cartcontext';
import { capitalize, formatCurrency } from './utils';

const HotMobilePreview = () => {
  const { Products } = useContext(ProductContext);
  const { cart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const openModal = (product: any) => {
    setSelectedProduct(product);
    setSelectedImage(0);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedProduct(null);
    setSelectedImage(0);
  };

  const mobileProducts = Products.slice(0, 6); // Show first 6

  return (
    <>
      {/* Horizontal product scroll preview */}
      <div className="px-4 pt-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Super Deals</h3>
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {mobileProducts.map((product) => (
            <div
              key={product.productId}
              className="min-w-[150px] rounded-lg border bg-white shadow cursor-pointer"
              onClick={() => openModal(product)}
            >
              <div className="relative w-full h-28 rounded-t-lg overflow-hidden">
                <Image
                  src={Array.isArray(product.images) ? product.images[0] : product.images}
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
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center px-4 py-6">
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
                  Array.isArray(selectedProduct.images)
                    ? selectedProduct.images[selectedImage]
                    : selectedProduct.images
                }
                alt={selectedProduct.productName}
                fill
                className="object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h2 className="text-base font-bold text-gray-900 mb-1">
                {selectedProduct.productName}
              </h2>
              <p className="text-green-600 font-semibold text-sm mb-2">
                {formatCurrency('NGN', selectedProduct.price)}
              </p>
              <p className="text-xs text-gray-600 mb-4 line-clamp-3">
                {selectedProduct.description || 'No description available.'}
              </p>

              <AddToCartButton
                targetid={selectedProduct.productId}
                oldSize=""
                isAdded={cart.some((i) => i.productId === selectedProduct.productId)}
                setIsAdded={() => {}}
                setError={() => {}}
                showClotheSizeInput={false}
                showShoeSizeInput={false}
              />

               {/* Additional Product Info */}
                    <div className="border-t mt-4 sm:mt-6 pt-3 sm:pt-4 text-xs sm:text-sm text-gray-600">
                        <p><strong>Sold by:</strong> {capitalize(selectedProduct.storeName)}</p>
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

export default HotMobilePreview;
