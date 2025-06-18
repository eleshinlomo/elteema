import React from "react";
import { Home, Search, BarChart2, ShoppingBag } from "lucide-react";

const FeedFooter = () => {
  const [activeTab, setActiveTab] = React.useState("home");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    // Add navigation logic here
  };

  return (
    <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 flex justify-around items-center z-50">
      <button
        onClick={() => handleTabClick("home")}
        className={`flex flex-col items-center p-2 ${
          activeTab === "home" ? "text-blue-600" : "text-gray-500"
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-xs mt-1">Home</span>
      </button>

      <button
        onClick={() => handleTabClick("search")}
        className={`flex flex-col items-center p-2 ${
          activeTab === "search" ? "text-blue-600" : "text-gray-500"
        }`}
      >
        <Search className="w-5 h-5" />
        <span className="text-xs mt-1">Search</span>
      </button>

      <button
        onClick={() => handleTabClick("dashboard")}
        className={`flex flex-col items-center p-2 ${
          activeTab === "dashboard" ? "text-blue-600" : "text-gray-500"
        }`}
      >
        <BarChart2 className="w-5 h-5" />
        <span className="text-xs mt-1">Dashboard</span>
      </button>

      <button
        onClick={() => handleTabClick("marketplace")}
        className={`flex flex-col items-center p-2 ${
          activeTab === "marketplace" ? "text-blue-600" : "text-gray-500"
        }`}
      >
        <ShoppingBag className="w-5 h-5" />
        <span className="text-xs mt-1">Marketplace</span>
      </button>
    </footer>
  );
};

export default FeedFooter;