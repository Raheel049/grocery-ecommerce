const CartSkeleton = () => {
    return (
      <div className="max-w-7xl mx-auto p-6">
  
        <div className="animate-pulse space-y-6">
  
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl shadow p-5 flex gap-5"
            >
              <div className="w-28 h-28 bg-gray-200 rounded-lg"></div>
  
              <div className="flex-1 space-y-4">
  
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
  
                <div className="h-4 bg-gray-200 rounded w-24"></div>
  
                <div className="h-4 bg-gray-200 rounded w-20"></div>
  
                <div className="flex gap-3">
  
                  <div className="w-10 h-10 bg-gray-200 rounded"></div>
  
                  <div className="w-12 h-10 bg-gray-200 rounded"></div>
  
                  <div className="w-10 h-10 bg-gray-200 rounded"></div>
  
                </div>
  
              </div>
            </div>
          ))}
  
        </div>
      </div>
    );
  };
  
  export default CartSkeleton;