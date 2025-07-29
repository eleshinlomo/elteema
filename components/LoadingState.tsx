const LoadingState = () => {
  return (
    <div className="flex items-center space-x-4">
      {/* Spinner */}
      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      
      {/* Text with skeleton effect */}
      <div className="space-y-2">
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-3 w-16 bg-gray-100 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingState;