// 'use client'

// import { useParams } from "next/navigation"
// import { useEffect, useState } from "react"
// import { getStore, StoreProps } from "../api/store"
// import Image from "next/image"
// import { capitalize } from "../utils"
// import { TruckIcon } from "lucide-react"
// import { ProductProps } from "../api/product"

// interface DisplayProps {
//     Products: ProductProps[]
// }

// const DisplayProductss = ({Products}: DisplayProps) => {
//   const params: any = useParams()
//   const storeName = decodeURIComponent(params?.storeName?.toString()) || ''
//   const [store, setStore] = useState<StoreProps | null>(null)
//   const [error, setError] = useState('')




//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
//           <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
//           <p className="text-gray-600">{error}</p>
//         </div>
//       </div>
//     )
//   }



//   return (
//     <div className="min-h-screen bg-gray-50 py-16">
  

//       {/* Products Section */}
//       <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
//         {Products?.length > 0 ? (
//           <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             {Products.map((product: any, index) => (
//               <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
         
//                   {/* Product Image */}
//                   <div className="relative aspect-square">
//                     <Image 
//                       src={product.images[0]} 
//                       alt={product.productName} 
//                       fill 
//                       className="object-cover"
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     />
//                   </div>
                  
//                   {/* Product Info */}
//                   <div className="p-4">
//                     <div className="flex items-center justify-between mb-1">
//                       <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
//                         <a href={`/categorypage/${product.category}`} className="hover:underline">
//                           {product.category}
//                         </a>
//                       </span>
//                       <div className="flex gap-1">
//                          <TruckIcon />
//                         <span className="text-sm text-green-500">
//                             {product.deliveryMethod === 'elteema delivery' ? 'Elteema Delivery': 'Owner Delivery'}
//                         </span>
//                       </div>
//                     </div>
                    
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.productName}</h3>
                    
//                     <div className="flex items-center justify-between mt-4">
//                       <span className="text-xl font-bold text-gray-900">₦{product.price.toLocaleString()}</span>
//                       <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300">
//                         Add to Cart
//                       </button>
//                     </div>
//                   </div>
        
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//             </svg>
//             <h3 className="mt-2 text-lg font-medium text-gray-900">No products available</h3>
//             <p className="mt-1 text-gray-500">This store hasn&apos;t added any products yet.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default DisplayProductss