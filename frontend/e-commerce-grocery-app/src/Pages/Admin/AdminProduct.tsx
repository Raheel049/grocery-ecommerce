import React, { useState, useEffect } from "react";
import { PlusCircle, ShoppingBag, DollarSign, Layers, Package, Image, Loader2, ListPlus } from "lucide-react";
import { toast } from "react-hot-toast";
import privateAPI from "../../api/axiosInstance.js"; // Aapka custom private cookie axios instance

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
}

const AdminProducts: React.FC = () => {
  // Form Input States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Groceries");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // 🚀 1. Fetch live active products from DB
  const fetchProducts = async () => {
    try {
      const response = await privateAPI.get("/api/products/list");
      setProducts(response.data.data || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load product list.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🚀 2. Form Submission Handler to add product in DB
  const addProductHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name,
        description,
        price: Number(price),
        category,
        stock: Number(stock),
        imageUrl
      };

      const response = await privateAPI.post("/api/products/add", payload);
      toast.success(response.data.message || "Product injected into database!");
      
      // Reset Form fields
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setImageUrl("");
      
      // Refresh current table logs
      fetchProducts();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to structure product parameters.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060813] text-slate-100 p-6 md:p-10 space-y-10 relative overflow-hidden">
      {/* Visual Background Lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Branding Header */}
      <div className="border-b border-slate-900 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
            ADMIN CENTRAL PORTAL
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium tracking-wide">
            Add new items directly into the system database to display live on user terminals.
          </p>
        </div>
      </div>

      {/* Layout Splitting: Top Form, Bottom Table Display */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        
        {/* Form Box Module Container */}
        <div className="xl:col-span-1 bg-slate-950/40 border border-slate-900/80 p-6 rounded-2xl backdrop-blur-xl relative shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500/40 via-pink-500/40 to-transparent" />
          <h2 className="text-base font-bold text-white mb-6 flex items-center gap-2">
            <ListPlus className="text-violet-400" size={18} /> Catalog New Product
          </h2>

          <form onSubmit={addProductHandler} className="space-y-4">
            {/* Name input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Product Title</label>
              <div className="relative">
                <ShoppingBag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input 
                  type="text" placeholder="Organic Strawberries" value={name} onChange={(e) => setName(e.target.value)} required
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-900/40 border border-slate-800 text-white placeholder:text-slate-600 rounded-xl focus:outline-none focus:border-violet-500/80 transition-all text-xs font-medium" 
                />
              </div>
            </div>

            {/* Price & Stock Twin Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Price ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={15} />
                  <input 
                    type="number" step="0.01" placeholder="4.99" value={price} onChange={(e) => setPrice(e.target.value)} required
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900/40 border border-slate-800 text-white placeholder:text-slate-600 rounded-xl focus:outline-none focus:border-violet-500/80 transition-all text-xs font-medium" 
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Stock Inventory</label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={15} />
                  <input 
                    type="number" placeholder="150" value={stock} onChange={(e) => setStock(e.target.value)} required
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900/40 border border-slate-800 text-white placeholder:text-slate-600 rounded-xl focus:outline-none focus:border-violet-500/80 transition-all text-xs font-medium" 
                  />
                </div>
              </div>
            </div>

            {/* Category selection */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Category Department</label>
              <div className="relative">
                <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <select 
                  value={category} onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-900/40 border border-slate-800 text-slate-300 rounded-xl focus:outline-none focus:border-violet-500/80 transition-all text-xs font-medium cursor-pointer"
                >
                  <option value="Groceries" className="bg-slate-950">Groceries</option>
                  <option value="Fruits" className="bg-slate-950">Fruits & Vegetables</option>
                  <option value="Beverages" className="bg-slate-950">Beverages</option>
                  <option value="Dairy" className="bg-slate-950">Dairy & Eggs</option>
                </select>
              </div>
            </div>

            {/* Image URL String input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Product Image Source URL</label>
              <div className="relative">
                <Image className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input 
                  type="url" placeholder="https://images.unsplash.com/photo-..." value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-900/40 border border-slate-800 text-white placeholder:text-slate-600 rounded-xl focus:outline-none focus:border-violet-500/80 transition-all text-xs font-medium" 
                />
              </div>
            </div>

            {/* Description Textarea */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Description</label>
              <textarea 
                rows={3} placeholder="Provide unique item metrics and health benefits parameters..." value={description} onChange={(e) => setDescription(e.target.value)} required
                className="w-full p-4 bg-slate-900/40 border border-slate-800 text-white placeholder:text-slate-600 rounded-xl focus:outline-none focus:border-violet-500/80 transition-all text-xs font-medium resize-none leading-relaxed" 
              />
            </div>

            {/* Submission Action Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-pink-600 hover:opacity-95 disabled:opacity-50 transition-all cursor-pointer shadow-lg shadow-violet-500/10 flex items-center justify-center gap-2 active:scale-98"
            >
              {loading ? <Loader2 className="animate-spin" size={14} /> : <PlusCircle size={14} />}
              {loading ? "Injecting Data..." : "Publish Product Data"}
            </button>
          </form>
        </div>

        {/* Live Active Listings Display Panel (Table layout) */}
        <div className="xl:col-span-2 bg-slate-950/40 border border-slate-900/80 rounded-2xl backdrop-blur-xl shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-500/40 via-cyan-500/40 to-transparent" />
          <div className="p-5 border-b border-slate-900/80 bg-slate-900/20">
            <h3 className="text-sm font-bold text-white tracking-tight">Active Database Store Inventory</h3>
          </div>

          {fetching ? (
            <div className="h-64 flex items-center justify-center text-slate-400 text-xs font-medium gap-2">
              <Loader2 className="animate-spin text-pink-500" size={16} /> Data stream loading...
            </div>
          ) : products.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-slate-500 text-xs font-medium">
              No product found inside current cluster schemas.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs font-medium">
                <thead>
                  <tr className="border-b border-slate-900 text-slate-400 font-bold uppercase tracking-wider bg-slate-900/40">
                    <th className="p-4 pl-6">Preview</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/40">
                  {products.map((prod) => (
                    <tr key={prod._id} className="hover:bg-slate-900/10 transition-colors">
                      <td className="p-4 pl-6">
                        <img src={prod.imageUrl} alt={prod.name} className="w-10 h-10 rounded-xl object-cover border border-slate-800 shadow-inner" />
                      </td>
                      <td className="p-4 font-bold text-white max-w-[150px] truncate">{prod.name}</td>
                      <td className="p-4 text-slate-400">
                        <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-semibold text-slate-300">
                          {prod.category}
                        </span>
                      </td>
                      <td className="p-4 text-pink-400 font-mono font-bold">${prod.price.toFixed(2)}</td>
                      <td className="p-4 text-slate-300 font-mono">{prod.stock} units</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;