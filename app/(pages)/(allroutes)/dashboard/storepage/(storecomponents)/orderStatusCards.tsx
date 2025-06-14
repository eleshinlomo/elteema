'use client';



import { useContext } from 'react';
import { FiPackage, FiShoppingCart, FiCheckCircle, FiTruck } from 'react-icons/fi';
import { GeneralContext } from '../../../../../../contextProviders/GeneralProvider';
import { ProductContext } from '../../../../../../contextProviders/ProductContext';
import DisplayStoreProducts from './displayStoreProducts';
import StatusCard from './statusCard';



const OrderStatusCards = () => {
  const cards = [
    {
      title: 'Pending Orders',
      text: 'Buyer can cancel order',
      value: 24,
      change: 12,
      Icon: FiPackage,
      color: 'border-blue-500',
      iconColor: 'text-blue-500',
    },
    {
      title: 'Processing orders',
      text: 'Buyer can cancel order',
      value: 8,
      change: -2,
      Icon: FiShoppingCart,
      color: 'border-yellow-500',
      iconColor: 'text-yellow-500',
    },
        {
      title: 'Waiting for pick-up',
      text: 'Buyer can cancel order',
      value: 15,
      change: 8,
      Icon: FiTruck,
      color: 'border-purple-500',
      iconColor: 'text-purple-500',
    },
    {
      title: 'Shipped orders',
      text: 'Buyer cannot cancel order',
      value: 15,
      change: 8,
      Icon: FiTruck,
      color: 'border-purple-500',
      iconColor: 'text-purple-500',
    },
  
  ];

  const { user } = useContext(GeneralContext);
  const { Products } = useContext(ProductContext);

  return (
    <div>
       <p className="text-gray-600 font-bold text-xl">Order Status</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards?.map((card, index) => (
          <StatusCard key={index} {...card} />
        ))}
      </div>
      {Products?.length > 0 &&  <DisplayStoreProducts productArray={Products} />}
    </div>
  );
};

export default OrderStatusCards;
