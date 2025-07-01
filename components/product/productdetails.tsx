'use client';

import { useState, useEffect, useContext } from "react";
import Image from 'next/image';
import AddToCartButton from "../cart/addtocartbtn";
import { CartContext } from "../../contextProviders/cartcontext";
import { capitalize, formatCurrency, getItemQuantity, getSingleProduct } from "../utils";
import ProductSize from "./productSize";
import BuyNowButton from "../cart/buyNowBtn";
import { ProductProps } from '../api/product'
import { GeneralContext } from "../../contextProviders/GeneralProvider";
import { ProductContext } from "../../contextProviders/ProductContext";
import PopularBadge from "./popularBadge";
import DisplayProducts from "./displayProducts";

interface DetailsProps {
  id: number;
  
}

const ProductDetails = ({ id}: DetailsProps) => {
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [error, setError] = useState('');
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false)
  const { cart } = useContext(CartContext);
  const { user } = useContext(GeneralContext);
  const {
    Products,
    oldSize,
    setOldSize,
    showClotheSizeInput,
    setShowClotheSizeInput,
    showShoeSizeInput,
    setShowShoeSizeInput
  } = useContext(ProductContext);

  useEffect(() => {
    const p: any = getSingleProduct(id, Products);
    if (p) {
      setProduct(p);
    } else {
      setError('Product not found');
    }

    const item = cart.find((item) => item.productId === p?.productId);
    setIsAdded(!!item?.isAdded);

    // Lock scroll on modal open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [id, Products, cart]);

  const onClose = ()=>{
     setIsOpen(false)
  }

  if (!product) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="animate-pulse bg-white p-8 rounded-xl shadow-lg">
          <p className="text-gray-500 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  const productImages = Array.isArray(product.images)
    ? product.images.map((img, index) => ({
        src: img,
        label: ['Front View', 'Back View', 'Side View', 'Detail View'][index] || 'Product Image'
      }))
    : [{ src: product.images, label: 'Product Image' }];

  const mainImage = productImages[selectedImage]?.src || productImages[0]?.src;

  return (
    <div>
     
      {/* Modal Preview */}
      <div onClick={()=>setIsOpen(true)} className="cursor">
        <DisplayProducts productArray={Products} numPerPage={2} />
      </div>
      
      

    {isOpen && <div className=" z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

       <div className="relative max-w-5xl w-full bg-white rounded-2xl shadow-lg overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl font-bold z-10"
        >
          &times;
        </button>

        <div className="md:flex p-6 gap-8">
          {/* Image Section */}
          <div className="md:w-1/2">
            <div
              className="relative h-80 w-full rounded-xl overflow-hidden bg-gray-100 cursor-zoom-in"
              onClick={() => setOpenImageModal(true)}
            >
              <Image
                src={mainImage}
                alt={product.productName}
                fill
                className="object-contain hover:scale-105 transition-transform duration-300"
                quality={100}
              />
            </div>
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`h-16 w-16 relative rounded-md overflow-hidden border ${
                    selectedImage === index ? 'border-green-500' : 'border-gray-300'
                  }`}
                >
                  <Image src={img.src} alt={img.label} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="md:w-1/2 flex flex-col gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{product.productName} <PopularBadge item={product} /></h2>
              <a href={`/storefront/${product.storeName}`} className="text-sm text-blue-600 underline">Visit {product.storeName}</a>
            </div>

            <p className="text-xl text-green-600 font-semibold">{formatCurrency('NGN', product.price)}</p>
            <p className="text-gray-600">{product.description || 'No description available'}</p>

            {/* Size Selector */}
            <ProductSize
              targetId={product.productId}
              isAdded={isAdded}
              setIsAdded={setIsAdded}
              error={error}
              setError={setError}
              showClotheSizeInput={showClotheSizeInput}
              setShowClotheSizeInput={setShowClotheSizeInput}
              showShoeSizeInput={showShoeSizeInput}
              setShowShoeSizeInput={setShowShoeSizeInput}
            />

            {/* Action Buttons */}
            <div className="flex gap-4 flex-wrap mt-4">
              {!isAdded ? (
                <>
                  <AddToCartButton
                    targetid={product.productId}
                    oldSize={oldSize}
                    isAdded={isAdded}
                    setIsAdded={setIsAdded}
                    setError={setError}
                    showClotheSizeInput={showClotheSizeInput}
                    showShoeSizeInput={showShoeSizeInput}
                  />
                  <BuyNowButton
                    targetid={product.productId}
                    oldSize={oldSize}
                    setError={setError}
                    showClotheSizeInput={showClotheSizeInput}
                    showShoeSizeInput={showShoeSizeInput}
                  />
                </>
              ) : (
                <a href="/checkoutpage" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
                  Go to Checkout
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Extras */}
        <div className="border-t p-6 text-sm text-gray-600">
          <p><strong>Sold by:</strong> {capitalize(product.storeName)}</p>
          <p><strong>Returns:</strong> No returns</p>
          <p className="mt-3 font-bold">Customer Reviews</p>
          <p>No reviews yet.</p>
        </div>
      </div>
    </div>
    } 
    </div>
  );
};

export default ProductDetails;
