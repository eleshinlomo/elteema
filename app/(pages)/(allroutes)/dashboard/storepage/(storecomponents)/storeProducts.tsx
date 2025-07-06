'use client';

import { useContext, useState, useEffect } from "react";
import { GeneralContext } from "../../../../../../contextProviders/GeneralProvider";
import { deleteProduct, ProductProps } from "../../../../../../components/api/product";
import { updateLocalUser } from "../../../../../../components/data/userdata";
import { Store } from "lucide-react";
import ProductSize from "../../../../../../components/product/productSize";
import { ProductContext } from "../../../../../../contextProviders/ProductContext";

const StoreProducts = () => {
  const [errors, setErrors] = useState<Record<number, string>>({}); // Changed to track errors per product
  const {user, setUser} = useContext(GeneralContext)
  const {Products, setProducts} = useContext(ProductContext)
  
  const [storeProducts, setStoreProducts] = useState<ProductProps[]>(user?.store?.items)
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 5

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = storeProducts?.slice(indexOfFirstProduct, indexOfLastProduct) || []
  const totalPages = Math.ceil((storeProducts?.length || 0) / productsPerPage)

  const handleDeleteProduct = async (productId: number)=>{
    // Clear any previous error for this product
    setErrors(prev => {
      const newErrors = {...prev};
      delete newErrors[productId];
      return newErrors;
    });

    const items: any[] = user?.store?.items
    const productIndex = items?.findIndex((item)=>item.id === productId)
    const hasPendingOrders = items[productIndex]?.orderStatus
    
    if(hasPendingOrders && hasPendingOrders !== ''){
      setErrors(prev => ({
        ...prev,
        [productId]: 'You cannot delete a product with pending orders'
      }));
      return
    }
    
    const userId = user.id
    const response = await deleteProduct(userId, productId)
    if(response.ok){
      const {updatedUser, products} = response.data
      if(updatedUser){
        updateLocalUser(updatedUser)
        setUser(updatedUser)
        setStoreProducts(updatedUser.store.items)
      }

      // We also update all products to reflect the removed product
      if(products?.length > 0){
        setProducts(products)
      }
    }
    console.log(response)
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">All Products</h2>
        <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {currentProducts?.length > 0 ? currentProducts.map((product) => 
        <div key={product.productId}>
          {/* Show error only for this specific product if it exists */}
          {errors[product.productId] && (
            <p className="text-xs text-red-600 font-bold">{errors[product.productId]}</p>
          )}
          <div  className="flex items-center">
            <img
              src={product?.images[0]}
              alt={product.productName}
              className="w-12 h-12 rounded-md object-cover"
              loading="lazy"
              width={48}
              height={48}
            />
            <div className="ml-4 flex-1">
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-gray-800">{product.productName}</h3>
                <span className="text-sm font-medium text-gray-800">₦{product.price.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-500">{product.category}</p>
              <div className="mt-1 flex justify-between">
                <span className="text-xs text-gray-500">{product.numOfItemsSold} sold</span>
                <span className="text-xs font-medium text-blue-500">Total Sales: ₦{product.totalSales.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-2">
            <a href={`/dashboard/updateproductpage/${product.productId}`}>
              <button className='text-xs py-1 px-2 rounded bg-green-600 hover:bg-green-700 text-white'>
                View or Edit
              </button>
            </a>
            <button 
              className='text-xs py-1 px-2 rounded bg-red-600 hover:bg-red-700 text-white'
              onClick={()=>handleDeleteProduct(product.productId)}
            >
              Delete
            </button>
          </div>
        </div>
        ) : 
        <div>
          You have no product in your store.
        </div>
        }
      </div>

      {/* Pagination remains the same */}
      {storeProducts?.length > productsPerPage && (
        <div className="flex justify-center mt-6">
          <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <span className="sr-only">Previous</span>
              &larr; Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === number ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
              >
                {number}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <span className="sr-only">Next</span>
              Next &rarr;
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default StoreProducts;