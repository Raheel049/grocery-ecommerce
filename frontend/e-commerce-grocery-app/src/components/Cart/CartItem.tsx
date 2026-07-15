import { Minus, Plus, Trash2 } from "lucide-react";

type Props = {
  item: any;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onRemove?: () => void;
};

const CartItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) => {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 flex gap-6 backdrop-blur-md">

      {/* Product Image */}

      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-32 h-32 rounded-xl object-cover border border-slate-700"
      />

      {/* Product Details */}

      <div className="flex-1 flex flex-col justify-between">

        <div>

          <h2 className="text-xl font-bold text-white">
            {item.name}
          </h2>

          <p className="text-emerald-400 text-lg font-semibold mt-2">
            ${item.price.toFixed(2)}
          </p>

          <span className="inline-flex mt-3 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
            In Stock
          </span>

        </div>

        {/* Quantity */}

        <div className="flex items-center justify-between mt-6">

          <div className="flex items-center gap-3">

            <button
              onClick={onDecrease}
              className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition"
            >
              <Minus size={18} className="text-white" />
            </button>

            <span className="text-lg font-semibold text-white w-8 text-center">
              {item.quantity}
            </span>

            <button
              onClick={onIncrease}
              className="w-10 h-10 rounded-lg bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center transition"
            >
              <Plus size={18} className="text-white" />
            </button>

          </div>

          <button
            onClick={onRemove}
            className="text-red-500 hover:text-red-400 transition"
          >
            <Trash2 size={22} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default CartItem;