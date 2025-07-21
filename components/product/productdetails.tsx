'use client';

import { useState, useEffect, useContext } from "react";
import Image from 'next/image';
import AddToCartButton from "../cart/addtocartbtn";
import { CartContext } from "../../contextProviders/cartcontext";
import { capitalize, formatCurrency, getItemQuantity } from "../utils";
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
  const productsPerPage = 12;
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
      const item = cart?.find((item) => item._id === selectedProduct._id);
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
  const currentProducts = productArray?.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productArray?.length / productsPerPage);

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
    ? Array.isArray(selectedProduct.imageUrls)
      ? selectedProduct.imageUrls.map((img, index) => ({
          src: img,
          label: ['Front View', 'Back View', 'Side View', 'Detail View'][index] || 'Product Image'
        }))
      : [{ src: selectedProduct.imageUrls, label: 'Product Image' }]
    : [];

  const mainImage = productImages[selectedImage]?.src || productImages[0]?.src;

  return (
    <>
      {/* Product Preview Section */}
       <div className="mb-4 w-full px-4">
  <h2 className="text-2xl font-semibold mb-2 text-center py-4">{text}</h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3">
    {currentProducts?.sort((a,b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((item, index) => (
      <div
        key={item._id}
        onClick={() => onOpen(item)}
        className="cursor-pointer border rounded-md overflow-hidden hover:shadow-md transition-all flex flex-col h-full relative"
      >
        {index < 5 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
            New
          </div>
        )}
        <div className="relative aspect-square w-full">
          <Image
            src={Array.isArray(item.imageUrls) ? item.imageUrls[0] : item.imageUrls}
            alt={item.productName}
            fill
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
        </div>
      </div>
    ))}
  </div>



        {/* Pagination */}
        {productArray?.length > productsPerPage && (
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
        <div className="fixed inset-0 z-[100]">
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
                    {productImages.map((img, index) => (
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
                    <a
                      href={`/storefront/${selectedProduct.storeName}`}
                      className="text-xs sm:text-sm text-blue-600 underline hover:text-blue-800 block"
                    >
                      Visit {selectedProduct.storeName}
                    </a>
                    <p className="text-lg sm:text-xl text-green-600 font-semibold">
                      {formatCurrency('NGN', Number(selectedProduct.price))}
                    </p>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {selectedProduct.description || 'No description available'}
                    </p>
                  </div>

                  {/* Size Selector */}
                
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
                  <div className="border-t mt-2 sm:mt-3 pt-2 sm:pt-3 text-xs sm:text-sm text-gray-600 space-y-1">
                    <p><strong>Sold by:</strong> {capitalize(selectedProduct.storeName)}</p>
                    <p><strong>Returns:</strong> No returns</p>
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

export default ProductDetails;