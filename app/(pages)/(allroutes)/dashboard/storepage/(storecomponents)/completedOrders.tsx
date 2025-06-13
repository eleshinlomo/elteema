'use client';

import { FiClock, FiCheckCircle, FiTruck, FiXCircle } from 'react-icons/fi';
import { useEffect, useState } from 'react';

type Order = {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: 'pending' | 'completed' | 'shipped' | 'cancelled';
  items: number;
};

const CompletedOrders = () => {
  const [mounted, setMounted] = useState(false);
  const [ordersWithFormattedDate, setOrdersWithFormattedDate] = useState<Order[]>([]);

  const orders: Order[] = [
    {
      id: '#ORD-001',
      customer: 'Bola Sodipe',
      date: '2023-05-15T10:30:00Z',
      amount: 1250.99,
      status: 'pending',
      items: 3,
    },
    {
      id: '#ORD-002',
      customer: 'Sarah Johnson',
      date: '2023-05-15T09:15:00Z',
      amount: 890.5,
      status: 'completed',
      items: 2,
    },
    {
      id: '#ORD-003',
      customer: 'Michael Brown',
      date: '2023-05-14T08:45:00Z',
      amount: 2150.75,
      status: 'shipped',
      items: 5,
    },
    {
      id: '#ORD-004',
      customer: 'Emily Davis',
      date: '2023-05-14T07:30:00Z',
      amount: 4500.99,
      status: 'cancelled',
      items: 1,
    },
    {
      id: '#ORD-005',
      customer: 'Robert Wilson',
      date: '2023-05-12T14:20:00Z',
      amount: 1999.99,
      status: 'completed',
      items: 4,
    },
  ];

  useEffect(() => {
   
    const formatDate = (dateString: string) => {
       if(typeof window !== 'undefined'){
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

      if (diffInHours < 24) {
        return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      } else if (diffInHours < 48) {
        return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      }

      return date.toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    };
  }

    const updated = orders.map((order) => ({
      ...order,
      formattedDate: formatDate(order.date),
    }));

    setOrdersWithFormattedDate(updated);
    setMounted(true);
  
  }, []);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <FiClock className="text-yellow-500" />;
      case 'completed':
        return <FiCheckCircle className="text-green-500" />;
      case 'shipped':
        return <FiTruck className="text-blue-500" />;
      case 'cancelled':
        return <FiXCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  if (!mounted) {
    // Prevent rendering until client has mounted to avoid hydration errors
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Completed Orders</h2>
        <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ordersWithFormattedDate?.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-4 py-4 text-sm text-gray-500">{order.customer}</td>
                <td className="px-4 py-4 text-sm text-gray-500">{(order as any).formattedDate}</td>
                <td className="px-4 py-4 text-sm text-gray-500">N{order.amount.toFixed(2)}</td>
                <td className="px-4 py-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    {getStatusIcon(order.status)}
                    <span className="ml-2 capitalize">{order.status}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       <a href='/dashboard/addproductpage'>
      <button className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-200">
        Delete Store
      </button>
      </a>
    </div>
  );
};

export default CompletedOrders;
