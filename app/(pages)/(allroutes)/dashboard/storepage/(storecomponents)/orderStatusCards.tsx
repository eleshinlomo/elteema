// components/OrderStatusCards.tsx
import { useContext } from 'react';
import { FiPackage, FiShoppingCart, FiCheckCircle, FiTruck } from 'react-icons/fi';
import { GeneralContext } from '../../../../../../contextProviders/GeneralProvider';
import { ProductContext } from '../../../../../../contextProviders/ProductContext';
import DisplayStoreProducts from './displayStoreProducts';

type StatusCardProps = {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  color: string;
};

// This is a 2 in 1 components

const StatusCard  = ({ title, value, change, icon, color } : StatusCardProps) => {

 

  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${color}`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
          <p className={`text-xs mt-1 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change >= 0 ? `↑ ${change}%` : `↓ ${Math.abs(change)}%`} from last week
          </p>
        </div>
        <div className="p-3 rounded-full bg-opacity-20 bg-gray-500">
          {icon}
        </div>
      </div>
    </div>
  );
};

const OrderStatusCards = () => {
  const cards = [
    {
      title: 'Pending Orders',
      value: 24,
      change: 12,
      icon: <FiPackage className="text-blue-500 text-xl" />,
      color: 'border-blue-500'
    },
    {
      title: 'Processing',
      value: 8,
      change: -2,
      icon: <FiShoppingCart className="text-yellow-500 text-xl" />,
      color: 'border-yellow-500'
    },
     {
      title: 'Shipped',
      value: 15,
      change: 8,
      icon: <FiTruck className="text-purple-500 text-xl" />,
      color: 'border-purple-500'
    },
    {
      title: 'Completed',
      value: 42,
      change: 5,
      icon: <FiCheckCircle className="text-green-500 text-xl" />,
      color: 'border-green-500'
    },
   
  ];


   const {user} = useContext(GeneralContext)
  const {Products} = useContext(ProductContext)

  return (
    <div className=''>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <StatusCard key={index} {...card} />
      ))}
       
       {/* Store products */}
    </div>
      <DisplayStoreProducts productArray={Products} />
    </div>
  );
};

export default OrderStatusCards;