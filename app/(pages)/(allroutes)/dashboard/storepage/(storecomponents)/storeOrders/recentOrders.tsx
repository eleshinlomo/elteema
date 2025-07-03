'use client';

import { useContext, useState, useEffect, useCallback } from "react";
import { ProductProps } from "../../../../../../../components/api/product";
import { GeneralContext } from "../../../../../../../contextProviders/GeneralProvider";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { formatCurrency } from "../../../../../../../components/utils";


interface RecentOrdersProps {
  currentOrders: any[]
}

ModuleRegistry.registerModules([AllCommunityModule]);




const RecentStoreOrders = ({currentOrders}: RecentOrdersProps) => {

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { user } = useContext(GeneralContext);
  const [selectedOrder, setSelectedOrder] = useState<ProductProps | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState('');

  const handleDeleteAccount = () => {
    setIsDeleteModalOpen(false);
  };

 

  // Status Options
  const orderStatusOptions = [
    'processing',
    'awaiting pick-up',
    'shipped',
    'cancel'
  ];

  const handleEdit = useCallback((order: ProductProps) => {
    setSelectedOrder(order);
    setIsEditing(true);
    console.log("Editing order:", order);
  }, []);

  const handleCancel = useCallback((order: ProductProps) => {
    setSelectedOrder(order);
    setIsDeleteModalOpen(true);
  }, []);

  

  const columnDefs: any = [
    { field: 'productName', headerName: 'Product', sortable: true, filter: true },
    { 
      field: 'orderStatus', 
      headerName: 'Status', 
      cellStyle: (params: any) => {
        return { 
          fontWeight: 'bold',
          color: params.value === 'processing' ? '#d97706' : 
                params.value === 'awaiting pick-up' ? '#2563eb' : 
                '#059669'
        };
      }
    },
    { field: 'price', headerName: 'Price', valueFormatter: (params: any) => `${formatCurrency('NGN', params.value)}` },
    { field: 'storeName', headerName: 'Store' },
    { field: 'storeCity', headerName: 'Origin' },
    { 
      field: 'destination', 
      headerName: 'Destination', 
      valueGetter: () => user?.city || '' 
    },
    { 
      field: 'size', 
      headerName: 'Size', 
      valueFormatter: (params: any) => params.value ? params.value : 'NA' 
    },
    { 
      field: 'color', 
      headerName: 'Color', 
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
      valueFormatter: (params: any) => params.value ? params.value : 'Unknown' 
    },
    { 
      field: 'actions', 
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        const order = params.data;
        return (
          <div className="flex flex-col space-y-1">
            <select 
              onChange={(e) => setStatus(e.target.value)}
              className="text-sm p-1 border rounded"
            >
              <option>Update status</option>
              {orderStatusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <button
              onClick={() => handleCancel(order)}
              className="text-red-600 hover:text-red-900 text-sm"
            >
              Cancel
            </button>
          </div>
        );
      }
    }
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
    sortable: true,
    filter: true,
  };

  return (
    <div className="pt-4 overflow-hidden">
      <div className="w-full md:max-w-7xl mx-auto">
        <h6 className="text-xl font-bold text-gray-800 mb-6">Your Recent Store Orders</h6>

        {currentOrders.length > 0 ? (
          <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
            <AgGridReact
              rowData={currentOrders}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={10}
              suppressCellFocus={true}
              domLayout='autoHeight'
            
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

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            {/* Modal content remains the same */}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentStoreOrders;