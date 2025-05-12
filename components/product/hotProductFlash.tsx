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
    { name: 'Handcrafted Leather Bags', href: '/collections/bags' },
    { name: 'Authentic African Shoes', href: '/collections/shoes' },
    { name: 'Colorful Ankara Dresses', href: '/collections/dresses' },
    { name: 'Tribal Wooden Masks', href: '/collections/masks' },
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
    <div className="relative  min-h-[40px] flex items-center justify-center px-8">
      <div className={`flex items-center transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}>
      
        <div className="text-center">
          <span className="text-sm font-medium text-gray-600">Hot Item: </span>
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
      <div className={`absolute inset-0 rounded-full bg-yellow-50 opacity-0 ${isAnimating ? 'animate-ping' : ''}`}></div>
    </div>
  );
};

export default HotProductFlash;