import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

interface HotItemProps {
  name: string;
  href: string;
}

const HotProductFlash = () => {
  const [showItem, setShowItem] = useState<HotItemProps | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const hotItems: HotItemProps[] = [
    { name: 'online transactions are safe', href: '#' },
    // { name: 'Seller gets paid when order is received', href: '#' },
    { name: 'Shop faster in your city', href: '#' },
    { name: 'Old takers dey shop here.', href: '#' },
    {name: 'Everybody dey shop here', href: '#' },
    {name: 'Shop like a true prince', href: '#' },

  ];

  useEffect(() => {
    
    setShowItem(hotItems[Math.floor(Math.random() * hotItems.length)]);
    
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      // Change item after animation starts
      setTimeout(() => {
        setShowItem(hotItems[Math.floor(Math.random() * hotItems.length)]);
        setIsAnimating(false);
      }, 500);
      
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" flex items-center justify-center px-8">
      <div className={`flex items-center transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}>
      
        <div className="text-center">
          <span className="text-sm font-medium text-gray-600">Pro tip: </span>
          {showItem ? (
            <a 
              href={showItem.href} 
              className="text-sm font-semibold text-green-600 hover:text-blue-800 hover:underline transition-colors"
            >
              {showItem.name}
            </a>
          ) : (
            <span className="text-sm text-gray-400">Loading...</span>
          )}
        </div>
      </div>
      
      {/* Glowing background effect */}
      <div className={` rounded-full bg-yellow-50 opacity-0 ${isAnimating ? 'animate-ping' : ''}`}></div>
    </div>
  );
};

export default HotProductFlash;