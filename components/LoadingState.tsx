const LoadingState = () => {
  return (
    <div className="flex justify-center items-center space-x-4 py-32">
      {/* Spinner */}
      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      
      {/* Text with skeleton effect */}
      <div className="space-y-2"> 
        <p className="text-xl">Loading page...</p>
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-3 w-16 bg-gray-100 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingState;