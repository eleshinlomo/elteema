'use client';

import { useContext, useState, useEffect, useCallback, ChangeEvent } from "react";
import { ProductProps } from "../../../../../../../components/api/product";
import { GeneralContext } from "../../../../../../../contextProviders/GeneralProvider";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { formatCurrency, updateLocalUser } from "../../../../../../../components/utils";
import { deleteStoreOrder } from "../../../../../../../components/api/store";

interface RecentOrdersProps {
  currentOrders: any[]
}

ModuleRegistry.registerModules([AllCommunityModule]);

const RecentStoreOrders = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { user, setUser, setUserOrders } = useContext(GeneralContext);
  const [selectedOrder, setSelectedOrder] = useState<ProductProps | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newOrderStatus, setNewOrderStatus] = useState('');
  const [currentOrders, setCurrentOrders] = useState<ProductProps[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('')
  const [reason, setReason] = useState('')

  useEffect(() => {
    if (user && user.store) {
      setCurrentOrders(user?.store?.orders.currentOrders)
    }
  }, [user]);

  const orderStatusOptions = [
    'processing',
    'awaiting pick-up',
    'shipped',
  ];

  const handleEdit = useCallback((order: ProductProps) => {
    setSelectedOrder(order);
    setIsEditing(true);
    console.log("Editing order:", order);
  }, []);

  const handleModalOpen = (order: ProductProps) => {
    setSelectedOrder(order);
    setIsDeleteModalOpen(true);
  };

  const handleCancel = async () => {
    if (!selectedOrder) return;
    
    try {
      setIsDeleting(true);
      const store = user.store;
      const orderId = selectedOrder._id;
      const buyerId = user?._id;
      
      const response = await deleteStoreOrder(store.storeName, orderId, buyerId, reason);
      
      if(response.ok){
        const updatedUser = response.data
        setUser(updatedUser)
        updateLocalUser(updatedUser)
        setIsDeleteModalOpen(false)
      }else{
        setError(response.error)
      }
       
    } catch (error) {
      console.error('Error deleting order:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateStoreOrder = (orderId: string, e: ChangeEvent<HTMLSelectElement>) => {
    const orderStatusValue = e.target.value;
    // Implement your order status update logic here
    console.log(`Updating order ${orderId} to status: ${orderStatusValue}`);
  };

  const defaultColDef = {
    flex: 1,
    minWidth: 180,
    resizable: true,
    sortable: true,
    filter: true,
    wrapText: true,
    autoHeight: true,
    cellStyle: { 
      'white-space': 'normal',
      'line-height': '1.5',
      'display': 'flex',
      'align-items': 'center'
    }
  };


 console.log('ORDERS', currentOrders)
  const columnDefs: any = [
    { 
      field: 'productName', 
      headerName: 'Product', 
      minWidth: 250,
      cellStyle: { 'white-space': 'normal' }
    },
    { 
      field: 'orderStatus', 
      headerName: 'Status',
      minWidth: 150,
      cellStyle: (params: any) => ({
        fontWeight: 'bold',
        color: params.value === 'processing' ? '#d97706' : 
              params.value === 'awaiting pick-up' ? '#2563eb' : 
              '#059669',
        'white-space': 'normal'
      })
    },
    { 
      field: 'price', 
      headerName: 'Price', 
      minWidth: 120,
      valueFormatter: (params: any) => `${formatCurrency('NGN', params.value)}` 
    },
    { 
      field: 'buyerName', 
      headerName: 'Buyer', 
      minWidth: 150,
      valueFormatter: (params: any) => `${params.value}` || '' 
    },
    { 
      field: 'buyerPhone', 
      headerName: 'Phone', 
      minWidth: 150,
      valueFormatter: (params: any) => `${params.value}` || '' 
    },
    { 
      field: 'buyerAddress', 
      headerName: 'Address', 
      minWidth: 250,
      valueFormatter: (params: any) => params.value || '',
      cellStyle: { 'white-space': 'normal' }
    },
    { 
      field: 'size', 
      headerName: 'Size', 
      minWidth: 120,
      valueFormatter: (params: any) => params.value ? params.value : 'NA' 
    },
    { 
      field: 'color', 
      headerName: 'Color',
      minWidth: 150,
      cellRenderer: (params: any) => {
        return (
          <div className="flex items-center">
            <div 
              className="w-4 h-4 rounded-full mr-2" 
              style={{ backgroundColor: params.value || 'transparent' }} 
            />
            {params.value ? params.value : 'NA'}
          </div>
        );
      }
    },
    { 
      field: 'eta', 
      headerName: 'ETA',
      minWidth: 150,
      valueFormatter: (params: any) => params.value ? params.value : 'Unknown' 
    },
    { 
      field: 'actions', 
      headerName: 'Actions',
      minWidth: 200,
      cellRenderer: (params: any) => {
        const order = params.data;
        return (
          <div className="flex flex-col space-y-1">
            <select 
              onChange={(e) => handleUpdateStoreOrder(order._id, e)}
              className="text-sm p-1 border rounded"
              defaultValue=""
            >
              <option value="" disabled>Update status</option>
              {orderStatusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <button
              onClick={() => handleModalOpen(order)}
              className="text-red-600 hover:text-red-900 text-sm"
            >
              Cancel
            </button>
          </div>
        );
      }
    }
  ];

  return (
    <div className="pt-4 ">
      <div className="w-full md:max-w-7xl mx-auto">
        <h6 className="text-xl font-bold text-gray-800 mb-6">Your Recent Store Orders</h6>

         {/* Payment warning */}
      {currentOrders?.length > 0 && (
        <div className="p-4 mb-6 bg-red-500 text-white rounded-lg mx-4 md:mx-0">
          <p className="text-sm">
            We are currently unable to process card payments. Please contact 
            the customers directly to complete your orders by phone.
          </p>
        </div>
      )}

        {currentOrders?.length > 0 ? (
          <div 
            className="ag-theme-alpine" 
            style={{ 
              width: '100%',
              '--ag-cell-horizontal-padding': '16px',
              '--ag-cell-vertical-padding': '12px',
              '--ag-grid-height': '100%',
            } as React.CSSProperties}
          >
            <AgGridReact
              rowData={currentOrders}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={10}
              suppressCellFocus={true}
              domLayout='autoHeight'
              headerHeight={50}
              rowHeight={60}
              onGridReady={(params) => params.api.sizeColumnsToFit()}
              suppressRowHoverHighlight={false}
            />
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
            <p className="mt-1 text-sm text-gray-500">No one bought from your store yet.</p>
          </div>
        )}
        
        {/* Modal open */}
        {isDeleteModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Cancel Order</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500"> 
                        {error ? error : 'Are you sure you want to cancel this order? This action cannot be undone.'}
                        </p>
                        {/* Reason for cancellation */}
                        <select value={reason} onChange={(e)=>setReason(e.target.value)} className="mt-4">
                           <option value='Out of stock'>Out of stock</option>
                           <option value='Payment declined'>Payment declined</option>
                           <option value='Cannot find a Driver for Delivery'>Cannot find a Driver for Delivery</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button 
                    type="button" 
                    onClick={handleCancel}
                    disabled={isDeleting}
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isDeleting ? 'Canceling...' : 'Confirm Cancel'}
                  </button>
                  <button 
                    onClick={() => setIsDeleteModalOpen(false)} 
                    type="button" 
                    disabled={isDeleting}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentStoreOrders;