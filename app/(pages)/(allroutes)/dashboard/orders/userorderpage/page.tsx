'use client'

import { useContext, useState, useEffect, useMemo } from "react";
import { GeneralContext } from "../../../../../../contextProviders/GeneralProvider";
import { ProductProps } from "../../../../../../components/api/product";
import { capitalize, formatCurrency, updateLocalUser } from "../../../../../../components/utils";
import { deleteUserOrder } from "../../../../../../components/api/users";

interface OrderProps {
  title: string;
  value: string;
}

const OrderPage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { user, setUser, userOrders, setUserOrders, isLoading, setIsLoading } = useContext(GeneralContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<ProductProps | null>(null);
  const itemsPerPage = 10;
  const [isEditing, setIsEditing] = useState(false);
  const [isClotheSize, setIsClotheSize] = useState(false);
  const [isShoeSize, setIsShoeSize] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState('Are you sure you want to cancel your order? This action cannot be undone.')
 

  useEffect(() => {
   
    if (user) {
      const userOrders = user.orders || [];
      if(userOrders?.length > 0){
        setUserOrders(userOrders);
        setIsLoading(false);
      }
    }
  }, [user, userOrders?.length]);

  // Calculate pagination data
  const { currentOrders, totalPages, indexOfFirstItem, indexOfLastItem } = useMemo(() => {
    const total = userOrders.length;
    const totalPages = Math.ceil(total / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = userOrders.slice(indexOfFirstItem, indexOfLastItem);
    
    return {
      currentOrders,
      totalPages,
      indexOfFirstItem,
      indexOfLastItem
    };
  }, [userOrders, currentPage, itemsPerPage]);

  // Check for sizes to display appropriate table headers
  useEffect(() => {
    if (userOrders.length > 0) {
      const hasShoeSizes = userOrders.some(order => order.shoeSizes?.length > 0);
      const hasClotheSizes = userOrders.some(order => order.clotheSizes?.length > 0);
      
      setIsShoeSize(hasShoeSizes);
      setIsClotheSize(hasClotheSizes);
    }
  }, [userOrders?.length]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleEdit = (order: ProductProps) => {
    setSelectedOrder(order);
    setIsEditing(true);
    console.log("Editing order:", order);
  };
   

  // Handle Cancel
  const handleCancel = async (order: ProductProps) => {
    
    setSelectedOrder(order);
    setIsDeleteModalOpen(true);
  };
  
  // Handle Delete
  const handleDeleteOrder = async () => {
    try{
    setErrorMessage('');
    setIsDeleting(true)
    if (selectedOrder) {
      const response = await deleteUserOrder(user._id, selectedOrder._id);
    
      if (response.ok) {
        const updatedUser = response.data
        setUser(updatedUser)
        updateLocalUser(updatedUser)

        setMessage(response.message);
        setIsDeleteModalOpen(false);
        setSelectedOrder(null);
      } else {
        setErrorMessage(response.error);
        setIsError(true);
      }
    }
  }catch(err){
   console.log(err)
  }finally{
    setIsDeleting(false)
  }
  };

  if (isLoading) {
    return (
      <div className="pt-16 overflow-hidden">
        <div className="max-w-sm md:max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 overflow-hidden">
      <div className="max-w-sm md:max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800">Your Orders</h2>
        <p className="text-xs mb-6">Items you bought from other stores</p>

        {userOrders.length > 0 ? (
          <div className="bg-white rounded-lg shadow">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ETA</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store Location</th>
                    {isClotheSize && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>}
                    {isShoeSize && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentOrders.map((order, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.productName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency('NGN', order.price)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.storeName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.storePhone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.eta}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{`${capitalize(order.storeCity)}, ${capitalize(order.storeState)}`}</td>
                      {isShoeSize && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.shoeSizes?.[0] || 'NA'}</td>}
                      {isClotheSize && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.clotheSizes?.[0] || 'NA'}</td>}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: order.colors?.[0] || 'transparent' }} />
                          {order.colors?.[0] || 'NA'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleCancel(order)}
                          className="text-red-600 hover:text-red-900 mr-2"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 border-t border-gray-200">
                <div className="flex-1 flex flex-col sm:flex-row items-center justify-between">
                  <div className="mb-4 sm:mb-0">
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                      <span className="font-medium">{Math.min(indexOfLastItem, userOrders.length)}</span> of{' '}
                      <span className="font-medium">{userOrders.length}</span> results
                    </p>
                  </div>
                  <div className="w-full sm:w-auto">
                    <nav className="relative inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Previous</span>
                        &larr;
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium 
                            ${currentPage === number ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                        >
                          {number}
                        </button>
                      ))}
                      <button
                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Next</span>
                        &rarr;
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No orders</h3>
            <p className="mt-1 text-sm text-gray-500">You haven&apos;t placed any orders yet.</p>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 mx-4 transform transition-all">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">Cancel Order</h3>
                <p className="mt-2 text-sm text-gray-500">
                  {errorMessage ? errorMessage : message}
                </p>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  onClick={handleDeleteOrder}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                  disabled={isError}
                >
                  {isDeleting ? 'Deleting...' : `Yes, cancel order`}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setErrorMessage('');
                    setIsError(false);
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  No, keep order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;