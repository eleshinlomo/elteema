import React, { useState, useEffect } from 'react';

const PurchaseAlert = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  // Simulate receiving new purchase notifications
  useEffect(() => {
    const sampleProducts: string[] = [
      "Ankara Shanti",
      "African Drum",
      "Woman Portrait by Fiko",
      "Woman Bead",
      "Chima red shoe"
    ];
    
    const sampleLocations: string[] = [
      "Ikorodu, USA",
      "London, UK",
      "Lekki, Lagos",
      "Maryland, US",
      "Ibadan, Oyo State",
    ];

    const interval = setInterval(() => {
      const randomProduct = sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
      const randomLocation = sampleLocations[Math.floor(Math.random() * sampleLocations.length)];
      const minutesAgo = Math.floor(Math.random() * 10) + 1;
      
      const newNotification = {
        id: Date.now(),
        message: `${randomProduct} was purchased ${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago from ${randomLocation}`,
      };

      setNotifications(prev => [newNotification, ...prev].slice(0, 1));
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  if (!isVisible || notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 w-80">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-green-600 to-blue-500 p-3 flex justify-between items-center">
          <h3 className="text-white font-semibold text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Recent Purchases
          </h3>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="max-h-60 overflow-y-auto">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className="p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">New Purchase!</p>
                  <p className="text-sm text-gray-500">{notification.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-50 px-4 py-2 text-right">
          <button 
            onClick={() => setNotifications([])}
            className="text-xs text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseAlert;