
import { useCallback, useContext, useEffect, useState } from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { GeneralContext } from '../../../../../../contextProviders/GeneralProvider';

interface SalesProps {
  lastOrders: any[];
  currentOrders: any[]
}

const SalesSummary = ({lastOrders, currentOrders}: SalesProps) => {
  const [salesStats, setSalesStats] = useState([])
  const {user} = useContext(GeneralContext)
  const [conversion, setConversion] = useState('3.2%')
  const [store, setStore] = useState<any | null>(null)

  

 useEffect(()=>{
  if(user){
     const userStore = user.store
     if(userStore){
      setStore(userStore)
     }
  }
 },[user, store])

  const calculateChange = (lastValue: number, currentValue: number)=>{
      const change = lastValue || 0 - currentValue || 0
      return change.toFixed(2)
  }

    
    const calculateIsUp = (lastValue: number, currentValue: number)=>{
      let isUp = false
     if(currentValue > lastValue){
      isUp = true
     }else{
      isUp = false
     }
     return isUp
  }



const avgOrder = () => {
  const orders = store?.orders || {};
  const currentOrders = orders?.currentOrders || [];
  
  // Calculate sum properly
  const currentSum = currentOrders.reduce((total: any, item: any) => {
    // Ensure item.revenue is a number (fallback to 0 if undefined/NaN)
    const revenue = Number(item?.revenue) || 0;
    return total + revenue;
  }, 0); // Start with 0 as initial value

  // Calculate average (divide by number of orders, or return 0 if no orders)
  const avgSales = currentOrders.length > 0 
    ? currentSum / currentOrders.length 
    : 0;

  return `N${avgSales.toFixed(2)}`; // Format to 2 decimal places
}

  const stats = [
    {
      title: 'Total Revenue',
      value: store?.revenue[1] || 0, //[0, 0] Fist is lastSales and Second is Current sales
      change: calculateChange(store?.revenue[0], store?.revenue[1]) || 0,
      isUp: calculateIsUp(store?.revenue[0], store?.revenue[1]) || 0
    },
    {
      title: 'Total Orders',
      value: currentOrders.length || 0,
      change: calculateChange(lastOrders.length || 0, currentOrders.length || 0),
      isUp: calculateIsUp(store?.lastOrders, store?.currentOrders)
    },
    {
      title: 'Conversion Rate',
      value: store?.conversion[1] || 0,
      change: -1.1,
      isUp: calculateIsUp(store?.conversion[0], store?.conversion[1])
    },
    {
      title: 'Avg. Order Value',
      value: avgOrder(),
      change: calculateChange(0, 0),
      isUp: true
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Sales Summary</h2>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
            <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-800">{stat.value}</p>
              <div className={`flex items-center ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                {stat.isUp ? <FiTrendingUp className="mr-1" /> : <FiTrendingDown className="mr-1" />}
                <span className="text-sm">{stat.change}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesSummary;