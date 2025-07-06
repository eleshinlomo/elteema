'use client';

import { useState, useEffect, useContext } from "react";
import Image from 'next/image';
import AddToCartButton from "../cart/addtocartbtn";
import { CartContext } from "../../contextProviders/cartcontext";
import { capitalize, formatCurrency, getItemQuantity } from "../utils";
import ProductSize from "./productSize";
import BuyNowButton from "../cart/buyNowBtn";
import { ProductProps } from '../api/product'
import { GeneralContext } from "../../contextProviders/GeneralProvider";
import { ProductContext } from "../../contextProviders/ProductContext";
import PopularBadge from "./popularBadge";

interface ProductDetailsProps {
  productArray: ProductProps[];
  text: string;
}

const ProductDetails = ({ productArray, text }: ProductDetailsProps) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(null);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const { user } = useContext(GeneralContext);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [isLoading, setIsLoading] = useState(false);

  const {
    oldSize,
    setOldSize,
    showClotheSizeInput,
    setShowClotheSizeInput,
    showShoeSizeInput,
    setShowShoeSizeInput
  } = useContext(ProductContext);

  useEffect(() => {
    if (selectedProduct) {
      const item = cart.find((item) => item.productId === selectedProduct.productId);
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

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productArray.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productArray.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50">
        <div className="animate-pulse bg-white p-8 rounded-xl shadow-lg">
          <p className="text-gray-500 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  const productImages = selectedProduct 
    ? Array.isArray(selectedProduct.images)
      ? selectedProduct.images.map((img, index) => ({
          src: img,
          label: ['Front View', 'Back View', 'Side View', 'Detail View'][index] || 'Product Image'
        }))
      : [{ src: selectedProduct.images, label: 'Product Image' }]
    : [];

  const mainImage = productImages[selectedImage]?.src || productImages[0]?.src;

  return (
    <>
      {/* Product Preview Section - Compact Cards */}
      <div className="mb-24 w-full px-4 ">
        {/* TEXT */}
        <h2 className="text-2xl font-semibold mb-2 text-center py-4">{text}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {currentProducts?.map((item) => (
            <div
              key={item.productId}
              onClick={() => onOpen(item)}
              className="cursor-pointer border rounded-md overflow-hidden hover:shadow-md transition-all flex flex-col h-full min-w-0 p-2 sm:p-3 md:p-2 lg:p-1.5 text-sm md:text-xs"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={Array.isArray(item.images) ? item.images[0] : item.images}
                  alt={item.productName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
              </div>
              
              <div className="flex flex-col justify-between flex-1">
                <h3 className="text-xs sm:text-sm font-extrabold text-gray-900 line-clamp-2 h-10">
                  {item?.productName?.toUpperCase()}
                </h3>
                <div className="flex flex-wrap items-center justify-between gap-y-1 mt-2">
                  <span className="text-sm font-bold text-gray-900 max-w-[60%]">
                    ₦{item?.price?.toLocaleString()}
                  </span>
                  <button className="bg-green-600 text-white text-xs sm:text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 px-2 py-1 whitespace-nowrap">
                    In Stock
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {productArray.length > productsPerPage && (
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

      {/* Full Page Modal Overlay */}
      {isOpen && selectedProduct && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto ">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          ></div>

          <div className="relative z-10 min-h-screen flex items-center justify-center p-2 sm:p-4">
            <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-6xl mx-auto my-4 sm:my-8 overflow-hidden">
              <button
                onClick={onClose}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 text-gray-600 hover:text-red-500 text-xl sm:text-2xl font-bold bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-md"
                aria-label="Close product details"
              >
                &times;
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="w-full md:w-1/2 bg-gray-50 p-3 sm:p-6">
                  <div className="relative aspect-square w-full max-w-full md:max-w-[95%] mx-auto">
                    <Image
                      src={mainImage}
                      alt={selectedProduct.productName}
                      fill
                      className="object-contain"
                      quality={100}
                      priority
                    />
                  </div>
                  <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 overflow-x-auto pb-1 sm:pb-2">
                    {productImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 h-14 w-14 sm:h-20 sm:w-20 relative rounded-md overflow-hidden border-2 ${
                          selectedImage === index ? 'border-green-500' : 'border-gray-200'
                        }`}
                        aria-label={`View ${img.label}`}
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
                <div className="w-full md:w-1/2 p-3 sm:p-6 md:p-4 lg:p-6 xl:p-8 flex flex-col">
                  <div className="mb-3 sm:mb-4">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                      {selectedProduct.productName} <PopularBadge item={selectedProduct} />
                    </h2>
                    <a
                      href={`/storefront/${selectedProduct.storeName}`}
                      className="text-xs sm:text-sm text-blue-600 underline hover:text-blue-800"
                    >
                      Visit {selectedProduct.storeName}
                    </a>
                  </div>

                  <p className="text-xl sm:text-2xl text-green-600 font-semibold mb-3 sm:mb-4">
                    {formatCurrency('NGN', Number(selectedProduct.price))}
                  </p>
                  <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                    {selectedProduct.description || 'No description available'}
                  </p>

                  {/* Size Selector */}
                  <div className="mb-4 sm:mb-6">
                    <ProductSize
                      targetId={Number(selectedProduct.productId)}
                      isAdded={isAdded}
                      setIsAdded={setIsAdded}
                      error={error}
                      setError={setError}
                      showClotheSizeInput={showClotheSizeInput}
                      setShowClotheSizeInput={setShowClotheSizeInput}
                      showShoeSizeInput={showShoeSizeInput}
                      setShowShoeSizeInput={setShowShoeSizeInput}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 sm:gap-3 flex-wrap mt-auto">
                    {!isAdded ? (
                      <>
                        <AddToCartButton
                          targetid={Number(selectedProduct.productId)}
                          oldSize={oldSize}
                          isAdded={isAdded}
                          setIsAdded={setIsAdded}
                          setError={setError}
                          showClotheSizeInput={showClotheSizeInput}
                          showShoeSizeInput={showShoeSizeInput}
                        />
                        <BuyNowButton
                          targetid={Number(selectedProduct.productId)}
                          oldSize={oldSize}
                          setError={setError}
                          showClotheSizeInput={showClotheSizeInput}
                          showShoeSizeInput={showShoeSizeInput}
                        />
                      </>
                    ) : (
                      <a
                        href="/checkoutpage"
                        className="bg-green-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-green-700 text-xs sm:text-sm transition-colors"
                      >
                        Go to Checkout
                      </a>
                    )}
                  </div>

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
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;