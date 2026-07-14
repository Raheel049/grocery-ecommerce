import React, { useEffect, useState } from "react";
import { ShoppingBag, Truck, CheckCircle2, ShoppingCart, Tag } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance.js";

// 1. Product interface mapping as per your MongoDB response contract
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
  adminId: string;
  isDeleted: boolean;
}

const UserOverview: React.FC = () => {
  const API: string = (import.meta.env.VITE_API_URL as string) || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 2. Fetch products from database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Apni API ka endpoint yahan target karein (Adjust endpoint if needed e.g. /api/products)
        const res = await axiosInstance.get(`${API}/api/product/list`, {
          withCredentials: true,
        });
        
        // Agar backend response directly array nahi balki { data: [...] } bhejta hai:
        const productsData = Array.isArray(res.data) ? res.data : res.data.products || res.data.data || [];
        
        // Sirf wahi products show karenge jo delete nahi hui hain
        const activeProducts = productsData.filter((p: Product) => !p.isDeleted);
        setProducts(activeProducts);
      } catch (error: any) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load dynamic grocery catalogs");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API]);

  // 3. Dynamic metrics calculations based on database
  const totalProducts = products.length.toString().padStart(2, "0");
  const totalStock = products.reduce((acc, curr) => acc + curr.stock, 0).toString().padStart(2, "0");

  const metrics = [
    { title: "Total Items Available", value: totalProducts, icon: <ShoppingBag className="text-emerald-400" size={22} />, bg: "bg-emerald-500/10 border-emerald-500/20" },
    { title: "Total Units In Stock", value: totalStock, icon: <Truck className="text-teal-400" size={22} />, bg: "bg-teal-500/10 border-teal-500/20" },
    { title: "Active Categories", value: "01", icon: <CheckCircle2 className="text-sky-400" size={22} />, bg: "bg-sky-500/10 border-sky-500/20" },
  ];

  const handleAddToCart = (productId: string) => {
    toast.success("Added to cart! (Cart logic upcoming)");
    // Yahan aap apna cart handler link kar sakte hain
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-100">
      {/* Welcome Banner */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h2>
        <p className="text-xs text-slate-400 mt-1">Monitor your recent account configurations and purchase lifecycle activity.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {metrics.map((stat, idx) => (
          <div key={idx} className={`p-6 rounded-2xl border bg-slate-900/20 backdrop-blur-md flex items-center justify-between ${stat.bg}`}>
            <div className="space-y-2">
              <span className="text-xs font-medium text-slate-400 block uppercase tracking-wider">{stat.title}</span>
              <span className="text-3xl font-bold text-white font-mono tracking-tight">{stat.value}</span>
            </div>
            <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800/40 shadow-inner">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Products Catalog Grid */}
      <div className="bg-slate-900/30 border border-slate-800/60 p-6 rounded-2xl backdrop-blur-md">
        <h3 className="text-lg font-bold text-white tracking-tight mb-6 flex items-center gap-2">
          <Tag className="text-emerald-400" size={20} />
          Premium Grocery Catalogs
        </h3>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="text-xs text-slate-500 mt-3">Loading fresh groceries...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl bg-slate-950/20">
            <p className="text-xs text-slate-500">No active grocery products active right now.</p>
          </div>
        ) : (
          /* Products Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div 
                key={product._id} 
                className="bg-slate-950/40 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Product Image Wrapper */}
                <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback image in case url fails
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=500";
                    }}
                  />
                  <span className="absolute top-3 left-3 bg-slate-950/80 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest rounded-md backdrop-blur-md">
                    {product.category}
                  </span>
                </div>

                {/* Product Info Block */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white leading-tight group-hover:text-emerald-400 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-900/80">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest">Price</span>
                      <span className="text-xl font-black text-white font-mono">${product.price.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest">Stock</span>
                      <span className={`text-xs font-semibold ${product.stock > 0 ? "text-emerald-400/90" : "text-rose-500"}`}>
                        {product.stock > 0 ? `${product.stock} units` : "Out of Stock"}
                      </span>
                    </div>
                  </div>

                  {/* Add To Cart Action Trigger */}
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    disabled={product.stock === 0}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-95 active:scale-[0.98] disabled:from-slate-800 disabled:to-slate-900 disabled:text-slate-500 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/5"
                  >
                    <ShoppingCart size={14} />
                    {product.stock > 0 ? "Add to Cart" : "Sold Out"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOverview;