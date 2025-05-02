'use client'
import { useState, useEffect, useContext } from "react";
import Image from 'next/image';
import AddToCartButton from "../cart/addtocartbtn";
import { CartContext } from "../../contextProviders/cartcontext";
import { getProduct } from "../utils";
import ProductSize from "./productSize";
import BuyNowButton from "../cart/buyNowBtn";

interface DetailsProps {
  id: number;
}

const ProductDetails = ({ id }: DetailsProps) => {
  const [product, setProduct] = useState<any | null>(null);
  const [error, setError] = useState('');
  const [openWarning, setOpenWarning] = useState(false);
  const cartContext = useContext(CartContext);
  const { Products } = cartContext;

  useEffect(() => {
    const fetchProduct = () => {
      const p = getProduct(id, Products);
      if (p) {
        setProduct(p);
      } else {
        setError('Product not found');
        console.log('Product not found');
      }
    };

    fetchProduct();
  }, [id, Products]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-500">Loading product...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Product Alert Modal */}
        {openWarning && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden">
              <div className="bg-green-600 p-4 flex justify-between items-center">
                <h3 className="text-white text-xl font-bold">Product Images</h3>
                <button
                  onClick={() => setOpenWarning(false)}
                  className="text-white hover:text-gray-200 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4 text-center font-bold text-2xl">{product.name}</p>
              {/* Images */}
              <div className="flex gap-4 w-full justify-center py-8">
                <div>
                  <p>Front</p>
                  <div className="relative h-16 w-16 ">
                    <Image src={product.src} alt='no image' fill />
                  </div>
                </div>
                <div>
                  <p>Back</p>
                  <div className="relative h-16 w-16">
                    <Image src={product.src} alt='no image' fill />
                  </div>
                </div>
                <div>
                  <p>Right</p>
                  <div className="relative h-16 w-16">
                    <Image src={product.src} alt='no image' fill />
                  </div>
                </div>
                <div>
                  <p>Left</p>
                  <div className="relative h-16 w-16 ">
                    <Image src='' alt='no image' fill />
                  </div>
                </div>
                
              </div>
                <button
                  onClick={() => setOpenWarning(false)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Main Content */}
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2 p-6">
            <div className="relative h-96 w-full rounded-xl overflow-hidden bg-gray-100">
              <Image 
                src={product.src} 
                alt={product.name} 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-green-600">N{product.price}</span>
              </div>
              <p className="text-gray-600 mb-6">{product.description || 'No description available'}</p>
            </div>
            
            {/* Size */}
            <ProductSize />
            
            <div className="space-y-4 ">
              <div className="flex gap-4">
              <AddToCartButton targetid={product.id} />
              <BuyNowButton targetid={product.id} />
              </div>
              
              <button
                onClick={() => setOpenWarning(true)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
              >
                <span>More Images</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;