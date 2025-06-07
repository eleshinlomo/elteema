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

const RecentOrders = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const rawOrders: Order[] = [
    {
      id: '#ORD-001',
      customer: 'John Smith',
      date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      amount: 125.99,
      status: 'pending',
      items: 3,
    },
    {
      id: '#ORD-002',
      customer: 'Sarah Johnson',
      date: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
      amount: 89.50,
      status: 'completed',
      items: 2,
    },
    {
      id: '#ORD-003',
      customer: 'Michael Brown',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      amount: 215.75,
      status: 'shipped',
      items: 5,
    },
    {
      id: '#ORD-004',
      customer: 'Emily Davis',
      date: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), // 1 day 2 hours ago
      amount: 45.99,
      status: 'cancelled',
      items: 1,
    },
    {
      id: '#ORD-005',
      customer: 'Robert Wilson',
      date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
      amount: 199.99,
      status: 'completed',
      items: 4,
    },
  ];

  const formatDate = (dateString: string) => {
    if(typeof window === 'undefined') return
    if (!isMounted) return 'Loading...';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffInHours < 48) {
      return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const orders = rawOrders.map(order => ({
    ...order,
    date: formatDate(order.date)
  }));

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

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
        <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
          View All
        </button>
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
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">${order.amount.toFixed(2)}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
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
    </div>
  );
};

export default RecentOrders;