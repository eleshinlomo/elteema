'use client'
import { useState, useEffect, useContext } from "react";
import Image from 'next/image';
import AddToCartButton from "../cart/addtocartbtn";
import { CartContext } from "../../contextProviders/cartcontext";
import { formatCurrency, getItemQuantity, getSingleProduct} from "../utils";
import ProductSize from "./productSize";
import BuyNowButton from "../cart/buyNowBtn";
import { ProductProps } from "../data/productsdata";
import { GeneralContext } from "../../contextProviders/GeneralProvider";


interface DetailsProps {
  id: number;
}

const ProductDetails = ({ id }: DetailsProps) => {
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [error, setError] = useState('');
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [oldSize, setOldSize] = useState('')
  const [isAdded, setIsAdded] = useState<boolean>(false)
   const { Products, cart }  = useContext(CartContext);
   const {user} = useContext(GeneralContext)
 

  useEffect(() => {
    const handlegetSingleProduct = () => {
      const p: any = getSingleProduct(id, Products);
      if (p) {
        setProduct(p);
      } else {
        setError('Product not found');
      }
    };

    handlegetSingleProduct();
  }, [id, Products, oldSize, error, user]);


  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
          <p className="text-gray-500 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Sample images - replace with your actual image array
  const productImages = [
    { src: product.src, label: 'Front View' },
    { src: product.src, label: 'Back View' },
    { src: product.src, label: 'Side View' },
    { src: product.src, label: 'Detail View' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      {/* Image Modal */}
      {openImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-xl overflow-hidden shadow-2xl">
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setOpenImageModal(false)}
                className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="relative h-72 mt-4 w-full bg-gray-100">
              <Image
                src={productImages[selectedImage].src}
                alt={productImages[selectedImage].label}
                fill
                className="object-contain"
                quality={100}
              />
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{productImages[selectedImage].label}</h3>
              
              <div className="flex gap-4 mt-6 overflow-x-auto py-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 relative h-20 w-20 rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-green-500' : 'border-transparent'}`}
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
          </div>
        </div>
      )}

      {/* Product Main Content */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Product Image Gallery */}
          <div className="md:w-1/2 p-6">
            <div 
              className="relative h-96 w-full rounded-xl overflow-hidden bg-gray-50 cursor-zoom-in"
              onClick={() => setOpenImageModal(true)}
            >
              <Image 
                src={product.src} 
                alt={product.name} 
                fill
                className="object-contain hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={100}
              />
              <div className="absolute bottom-4 right-4 bg-white/80 rounded-full p-2 shadow-sm">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
            
            <div className="flex gap-4 mt-4 overflow-x-auto py-2">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className="flex-shrink-0 relative h-16 w-16 rounded-md overflow-hidden border border-gray-200 hover:border-green-500 transition-colors"
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

          {/* Product Info */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex px-4 gap-2 mb-4 text-center">
                {product?.category?.map((cat, index) => (
                  <a 
                    key={index}
                    href={`/categorypage/${encodeURIComponent(cat)}`}
                    className="text-md   text-green-800 mx-0 py-1   hover:bg-green-200 transition-colors"
                  >
                    {cat}
                  </a>
                ))}
              </div>
              
              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-green-600">{formatCurrency('NGN', product.price)}</span>
              </div>
              
              <div className="prose max-w-none text-gray-600 mb-8">
                <p>{product.description || 'No description available'}</p>
              </div>
            </div>
            
            {/* Size Selector */}
            <div className="mb-8">
              <ProductSize 
              setOldSize={setOldSize} 
              oldSize={oldSize}
              itemId={product.id} 
              isAdded={isAdded} 
              setIsAdded={setIsAdded} 
              error={error}
              setError={setError}   
              />
            </div>
            
            {/* Action Buttons */}
            <div className="mt-auto space-y-4">
              <div className="flex gap-4">
                <AddToCartButton targetid={product.id}  
                oldSize={oldSize}
                isAdded={isAdded} 
                setIsAdded={setIsAdded} 
                error={error}
                setError={setError}
                 />
                <BuyNowButton 
                targetid={product.id} 
                oldSize={oldSize}
                 setError={setError} 
                 />
              </div>
              
              <button
                onClick={() => setOpenImageModal(true)}
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:border-green-500 text-gray-700 py-3 px-6 rounded-lg font-medium transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                View All Images
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;