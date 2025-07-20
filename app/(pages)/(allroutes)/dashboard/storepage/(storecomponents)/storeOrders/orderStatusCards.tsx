'use client';



import { useContext, useState, useEffect } from 'react';
import { FiPackage, FiShoppingCart, FiCheckCircle, FiTruck } from 'react-icons/fi';
import { GeneralContext } from '../../../../../../../contextProviders/GeneralProvider';
import { ProductContext } from '../../../../../../../contextProviders/ProductContext';
import StatusCard, { StatusCardProps } from './statusCard';



const OrderStatusCards = () => {
  const {user} = useContext(GeneralContext)
  const [items, setItems] = useState<any[]>([])

  useEffect(()=>{
    const userStore = user?.store
    if(userStore){
      const storeItems = userStore.items
      console.log('STPRE ITEMS', storeItems)
    }

    let pendingOrders = []
    let processingOrders = []
    let waitingForPickUp = []
    let shippedOrders = []

    items?.forEach((item)=>{
       if(item.orderStatus === 'pending'){
        pendingOrders.push(item)
       }else if(item.orderStatus === 'processing'){
        processingOrders.push(item)
       }
       else if(item.orderStatus === 'awaiting pick-up'){
        processingOrders.push(item)
       }else if(item.orderStatus === 'shipped'){
        processingOrders.push(item)
       }
    })

    const cards = [
    {
      title: 'Pending Orders',
      text: 'Buyer can cancel order',
      value: pendingOrders.length,
      change: 12,
      Icon: FiPackage,
      color: 'border-blue-500',
      iconColor: 'text-blue-500',
    },
    {
      title: 'Processing orders',
      text: 'Buyer can cancel order',
      value: processingOrders.length,
      change: -2,
      Icon: FiShoppingCart,
      color: 'border-yellow-500',
      iconColor: 'text-yellow-500',
    },
        {
      title: 'Waiting for pick-up',
      text: 'Buyer can cancel order',
      value: waitingForPickUp.length,
      change: 8,
      Icon: FiTruck,
      color: 'border-purple-500',
      iconColor: 'text-purple-500',
    },
    {
      title: 'Shipped orders',
      text: 'Buyer cannot cancel order',
      value: shippedOrders.length,
      change: 8,
      Icon: FiTruck,
      color: 'border-purple-500',
      iconColor: 'text-purple-500',
    },
  
  ];

  setItems(cards)
  }, [user?.store, items.length])

  

 
  

  return (
    <div>
       <p className="text-green-800 font-bold text-xl py-2 ">Recent Order Status</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items?.map((item, index) => (
          <StatusCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default OrderStatusCards;
