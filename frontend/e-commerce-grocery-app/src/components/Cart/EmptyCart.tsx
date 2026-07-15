import { ShoppingCart } from "lucide-react";

const EmptyCart = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">

      <ShoppingCart
        size={80}
        className="text-gray-400"
      />

      <h2 className="text-3xl font-bold mt-4">
        Your Cart is Empty
      </h2>

      <p className="text-gray-500 mt-2">
        Add products to start shopping.
      </p>

    </div>
  );
};

export default EmptyCart;