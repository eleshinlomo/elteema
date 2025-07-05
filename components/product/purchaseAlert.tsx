import React, { useState, useEffect } from 'react';

const PurchaseAlert = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      "Agric, Ikorodu",
      "London, UK",
      "Lekki, Lagos",
      "Maryland, US",
      "Ibadan, Oyo State",
    ];

    // Show first notification immediately
    const showFirstNotification = () => {
      const randomProduct = sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
      const randomLocation = sampleLocations[Math.floor(Math.random() * sampleLocations.length)];
      const minutesAgo = Math.floor(Math.random() * 10) + 1;
      
      const newNotification = {
        id: Date.now(),
        message: `${randomProduct} was purchased ${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago from ${randomLocation}`,
      };

      setNotifications([newNotification]);
      setIsLoading(false);
    };

    showFirstNotification();

    // Then set up interval for subsequent notifications
    const interval = setInterval(() => {
      const randomProduct = sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
      const randomLocation = sampleLocations[Math.floor(Math.random() * sampleLocations.length)];
      const minutesAgo = Math.floor(Math.random() * 10) + 1;
      
      const newNotification = {
        id: Date.now(),
        message: `${randomProduct} was purchased ${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago from ${randomLocation}`,
      };

      setNotifications([newNotification]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-sm flex flex-col justify-center items-center min-h-[60px]">
      <div className="rounded-lg overflow-hidden border border-gray-200 w-full">
        <div className="max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-3 flex items-center justify-center">
              <div className="animate-pulse flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 mr-3"></div>
                <div>
                  <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-48 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                className="p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200 animate-fadeIn"
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseAlert;