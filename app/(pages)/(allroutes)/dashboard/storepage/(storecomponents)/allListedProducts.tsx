'use client';

import { useContext, useState, useEffect } from "react";
import { GeneralContext } from "../../../../../../contextProviders/GeneralProvider";
import { deleteProduct, modifyProduct, ProductProps } from "../../../../../../components/api/product";
import { updateLocalUser } from "../../../../../../components/utils";
import { ProductContext } from "../../../../../../contextProviders/ProductContext";

const AllListedProducts = () => {
  const [error, setError] = useState('');
  const { user, setUser } = useContext(GeneralContext);
  const { Products, setProducts } = useContext(ProductContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  
  const [storeProducts, setStoreProducts] = useState<ProductProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  let currentProducts = storeProducts?.slice(indexOfFirstProduct, indexOfLastProduct) || [];
  const totalPages = Math.ceil((storeProducts?.length || 0) / productsPerPage);

  useEffect(() => {
    if (Products?.length > 0 && user?.store) {
      const products = Products.filter((p)=>p.storeId === user.store?._id)
      setStoreProducts([...products.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())]); // Create a new array to ensure reactivity
    }
  }, [user]);

  const confirmDelete = (productId: string) => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    
    setError('');
    setIsDeleting(true);
    const userId = user._id;
    
    try {
      const response = await deleteProduct(userId, productToDelete);
      if (response.ok) {
        const { updatedUser, updatedProducts } = response.data;
        if (updatedUser) {
          updateLocalUser(updatedUser);
          setUser(updatedUser);
          setStoreProducts(updatedUser.store.items);
          currentProducts = (updatedUser.store.items);
          setProducts(updatedProducts);
        }
      } else {
        setError(response.error);
      }
    } catch (err) {
      console.log('Error deleting', err);
      setError('Error deleting your product');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Reset to first page when products change
  useEffect(() => {
    setCurrentPage(1);
  }, [storeProducts]);


  const handleHideProduct = async (productId: string)=>{
    const isHidden = true
    const payload: any = {
       isHidden,
       productId,
       userId: user?._id
    }

    const response = await modifyProduct(payload)
    console.log('RESPONSE', response)
    const {updatedProducts, updatedUser} = response.data
    if(response.ok){
      setProducts(updatedProducts)
      setUser(updatedUser)
    }else{
      console.log(response)
    }
     
  }


  const handleUnhideProduct = async (productId: string)=>{
    const isHidden = false
    const payload: any = {
       isHidden,
       productId,
       userId: user?._id
    }

    const response = await modifyProduct(payload)
    console.log('RESPONSE', response)
        const {updatedProducts, updatedUser} = response.data
    if(response.ok){
      setProducts(updatedProducts)
      setUser(updatedUser)
    }else{
      console.log(response)
    }
     
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
        {/* Error */}
        <p className="font-xs text-red-500">{error}</p>
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
              <div key={product._id}>
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
                      <span className="text-sm font-medium text-gray-800">₦{Number(product.price).toFixed(2)}</span>
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
                    onClick={() => confirmDelete(product._id)}
                  >
                    Delete
                  </button>

                    <button 
                    className={`text-xs py-1 px-2 rounded ${product.isHidden ? 'bg-red-300' : 'bg-gray-600'} hover:bg-red-700 text-white`}
                    onClick={() => product.isHidden ? handleUnhideProduct(product._id) : handleHideProduct(product._id)}
                  >
                     {product.isHidden ? 'Display in store' : 'Hide in store'}
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-3">Delete Product</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this product? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="button"
                onClick={handleDeleteProduct}
                disabled={isDeleting}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </>
                ) : 'Delete'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setProductToDelete(null);
                }}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllListedProducts;