'use client'

import { useContext, useState, useEffect, useMemo } from "react";
import { GeneralContext } from "../../../../../../contextProviders/GeneralProvider";
import { ProductProps } from "../../../../../../components/api/product";
import { capitalize, formatCurrency, updateLocalUser } from "../../../../../../components/utils";
import { deleteUserOrder } from "../../../../../../components/api/users";

const OrderPage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { user, setUser, userOrders, setUserOrders, isLoading, setIsLoading } = useContext(GeneralContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<ProductProps | null>(null);
  const itemsPerPage = 6;
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('Are you sure you want to cancel your order? This action cannot be undone.');
  const [reason, setReason] = useState('')

  // Calculate pagination data
  const { currentOrders, totalPages, indexOfFirstItem, indexOfLastItem } = useMemo(() => {
    const total = userOrders.length;
    const totalPages = Math.ceil(total / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    let currentOrders = userOrders.slice(indexOfFirstItem, indexOfLastItem);
    
    return {
      currentOrders,
      totalPages,
      indexOfFirstItem,
      indexOfLastItem
    };
  }, [userOrders, currentPage, itemsPerPage]);

  useEffect(() => {
    if (user) {
      const userOrders = user.orders || [];
      if(userOrders?.length > 0){
        setUserOrders(userOrders);
        setIsLoading(false);
      }
    }
  }, [user, userOrders?.length]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleCancel = async (order: ProductProps) => {
    setSelectedOrder(order);
    setIsDeleteModalOpen(true);
  };
  
  const handleDeleteOrder = async () => {
    setErrorMessage('');
    setIsDeleting(true);
    try {
      if(!reason){
        setErrorMessage('Please give a reason')
        return
      }
      if (selectedOrder) {
        const response = await deleteUserOrder(user._id, selectedOrder._id, reason);
        if (response.ok) {
          const updatedUser = response.data;
          setUser(updatedUser);
          updateLocalUser(updatedUser);
          setUserOrders(updatedUser.orders);

          if (userOrders.length % itemsPerPage === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }

          setMessage(response.message);
          setIsDeleteModalOpen(false);
          setSelectedOrder(null);
        } else {
          setErrorMessage(response.error);
          setIsError(true);
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Something went wrong.');
      setIsError(true);
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="pt-16 overflow-hidden">
        <div className="max-w-sm md:max-w-7xl mx-auto">
          <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-6 overflow-hidden">
      {/* Payment warning */}
      {currentOrders?.length > 0 && (
        <div className="p-4 mb-6 bg-red-500 text-white rounded-lg mx-4 md:mx-0">
          <p className="text-sm">
            We are currently unable to process card payments. Please wait for the store to contact 
            you directly or you may contact them to complete your order by phone.
          </p>
        </div>
      )}

      <div className="max-w-sm md:max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Your Orders</h2>
          <p className="text-sm text-gray-600">Items you bought from other stores</p>
        </div>

        {currentOrders.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentOrders.map((order, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{order.productName}</h3>
                        <p className="text-sm text-gray-500 mt-1">{order.storeName}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </div>

                    <div className="mt-4">
                      <p className="text-xl font-bold text-gray-900">{formatCurrency('NGN', order.price)}</p>
                      
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>ETA: {order.eta || 'Not specified'}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>{order.storePhone || 'No phone'}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{capitalize(order?.storeAddress)}, {capitalize(order.storeCity)}, {capitalize(order.storeState)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex items-center">
                        {order.colors?.[0] && (
                          <div className="flex items-center mr-4">
                            <div 
                              className="w-4 h-4 rounded-full mr-2 border border-gray-300" 
                              style={{ backgroundColor: order.colors[0] }} 
                            />
                            <span className="text-xs text-gray-600">{order.colors[0] || 'NA'}</span>
                          </div>
                        )}
                        {(order.shoeSizes?.[0] || order.clotheSizes?.[0]) && (
                          <div className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                            Size: {order.shoeSizes?.[0] || order.clotheSizes?.[0]}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleCancel(order)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between">
                <div className="mb-4 sm:mb-0">
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(indexOfLastItem, userOrders.length)}</span> of{' '}
                    <span className="font-medium">{userOrders.length}</span> orders
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium ${currentPage === number ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <div className="mx-auto h-24 w-24 text-gray-400">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No orders yet</h3>
            <p className="mt-2 text-sm text-gray-500">Your order history will appear here once you make purchases.</p>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 mx-4 transform transition-all">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">Cancel Order</h3>
                <div className="mt-2">
                  <p className={`text-md ${errorMessage ? 'text-red-500' : 'text-gray-500'}`}>
                    {errorMessage ? errorMessage : message}
                  </p>

                    {/* Reason for cancellation */}
                        <select value={reason} onChange={(e)=>setReason(e.target.value)} className="mt-4">
                          <option>Reason for cancellation</option>
                           <option value='Changed my mind'>Changed my mind</option>
                           <option value='Found a cheaper one'>Found a cheaper one</option>
                           <option value='Delivery date too long'>Delivery date too long</option>
                            <option value='No communication from seller'>No communication from seller</option>
                           <option value='Seller was rude'>Seller was rude</option>
                            <option value='Nothing! Just window shopping'>Nothing! Just window shopping</option>
                        </select>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  onClick={handleDeleteOrder}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm disabled:opacity-50"
                  disabled={isError || isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Yes, cancel order'}
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