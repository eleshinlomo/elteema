'use client';

import { useContext, useState, useEffect } from "react";
import { GeneralContext } from "../../../../../../contextProviders/GeneralProvider";
import { deleteProduct, ProductProps } from "../../../../../../components/api/product";
import { updateLocalUser } from "../../../../../../components/utils";
import { ProductContext } from "../../../../../../contextProviders/ProductContext";

const AllListedProducts = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { user, setUser } = useContext(GeneralContext);
  const { Products, setProducts } = useContext(ProductContext);
  
  const [storeProducts, setStoreProducts] = useState<ProductProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = storeProducts?.slice(indexOfFirstProduct, indexOfLastProduct) || [];
  const totalPages = Math.ceil((storeProducts?.length || 0) / productsPerPage);

  useEffect(() => {
    if (user?.store?.items) {
      setStoreProducts([...user.store.items]); // Create a new array to ensure reactivity
    }
  }, [user]);

  const handleDeleteProduct = async (productId: string) => {
    setErrors(prev => {
      const newErrors = {...prev};
      delete newErrors[productId];
      return newErrors;
    });

    const items: any[] = user?.store?.items || [];
    const productIndex = items.findIndex((item) => item._id === productId);
    const hasPendingOrders = items[productIndex]?.orderStatus;
    
    if (hasPendingOrders && hasPendingOrders !== '') {
      setErrors(prev => ({
        ...prev,
        [productId]: 'You cannot delete a product with pending orders'
      }));
      return;
    }
    
    const userId = user._id;
    const response = await deleteProduct(userId, productId);
    if (response.ok) {
      const { updatedUser, updatedProducts } = response.data;
      if (updatedUser) {
        updateLocalUser(updatedUser);
        setUser(updatedUser);
        setStoreProducts(updatedUser.store.items);
      }

      if (updatedProducts?.length > 0) {
        setProducts(updatedProducts);
      }
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Reset to first page when products change
  useEffect(() => {
    setCurrentPage(1);
  }, [storeProducts]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">All Products</h2>
        <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {currentProducts.length > 0 ? (
          currentProducts
            .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((product) => (
              <div key={product._id}>
                {errors[product._id] && (
                  <p className="text-xs text-red-600 font-bold">{errors[product._id]}</p>
                )}
                <div className="flex items-center">
                  <img
                    src={product?.imageUrls[0]}
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

                <div className="flex gap-2 pt-2">
                  <a href={`/dashboard/updateproductpage/${product._id}`}>
                    <button className='text-xs py-1 px-2 rounded bg-green-600 hover:bg-green-700 text-white'>
                      View or Edit
                    </button>
                  </a>
                  <button 
                    className='text-xs py-1 px-2 rounded bg-red-600 hover:bg-red-700 text-white'
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
        ) : (
          <div>You have no products in your store.</div>
        )}
      </div>

      {/* Improved Pagination */}
      {storeProducts.length > productsPerPage && (
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Previous
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-8 h-8 rounded flex items-center justify-center text-sm ${currentPage === i + 1 ? 'bg-green-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllListedProducts;