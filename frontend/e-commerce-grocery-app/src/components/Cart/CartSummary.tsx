type Props = {
    cart: {
      totalItems: number;
      totalQuantity: number;
      totalPrice: number;
    };
  };
  
  const CartSummary = ({ cart }: Props) => {
    return (
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sticky top-5 backdrop-blur-md h-[350px]">
  
        <h2 className="text-2xl font-bold text-white mb-6">
          Order Summary
        </h2>
  
        <div className="space-y-5">
  
          <div className="flex justify-between text-slate-400">
            <span>Total Items</span>
            <span className="text-white font-semibold">
              {cart.totalItems}
            </span>
          </div>
  
          <div className="flex justify-between text-slate-400">
            <span>Total Quantity</span>
            <span className="text-white font-semibold">
              {cart.totalQuantity}
            </span>
          </div>
  
          <div className="border-t border-slate-700 pt-5 flex justify-between">
  
            <span className="text-lg text-white font-semibold">
              Total
            </span>
  
            <span className="text-3xl font-bold text-emerald-400">
              ${cart.totalPrice.toFixed(2)}
            </span>
  
          </div>
  
        </div>
  
        <button
          className="w-full mt-8 py-3 rounded-xl bg-gradient-to-r
          from-emerald-500 to-teal-500
          hover:opacity-90
          transition
          font-semibold
          text-slate-950"
        >
          Proceed To Checkout
        </button>
  
      </div>
    );
  };
  
  export default CartSummary;