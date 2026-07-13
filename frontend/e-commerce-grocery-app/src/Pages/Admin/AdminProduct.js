import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { PlusCircle, ShoppingBag, DollarSign, Layers, Package, Image, Loader2, ListPlus } from "lucide-react";
import { toast } from "react-hot-toast";
import privateAPI from "../../api/axiosInstance.js"; // Aapka custom private cookie axios instance
const AdminProducts = () => {
    // Form Input States
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Groceries");
    const [stock, setStock] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    // 🚀 1. Fetch live active products from DB
    const fetchProducts = async () => {
        try {
            const response = await privateAPI.get("/api/products/list");
            setProducts(response.data.data || []);
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Failed to load product list.");
        }
        finally {
            setFetching(false);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);
    // 🚀 2. Form Submission Handler to add product in DB
    const addProductHandler = async (e) => {
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
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Failed to structure product parameters.");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-[#060813] text-slate-100 p-6 md:p-10 space-y-10 relative overflow-hidden", children: [_jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-600/5 rounded-full blur-[160px] pointer-events-none" }), _jsx("div", { className: "absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[160px] pointer-events-none" }), _jsx("div", { className: "border-b border-slate-900 pb-6 flex items-center justify-between", children: _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight", children: "ADMIN CENTRAL PORTAL" }), _jsx("p", { className: "text-xs text-slate-400 mt-1 font-medium tracking-wide", children: "Add new items directly into the system database to display live on user terminals." })] }) }), _jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8 items-start", children: [_jsxs("div", { className: "xl:col-span-1 bg-slate-950/40 border border-slate-900/80 p-6 rounded-2xl backdrop-blur-xl relative shadow-2xl", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500/40 via-pink-500/40 to-transparent" }), _jsxs("h2", { className: "text-base font-bold text-white mb-6 flex items-center gap-2", children: [_jsx(ListPlus, { className: "text-violet-400", size: 18 }), " Catalog New Product"] }), _jsxs("form", { onSubmit: addProductHandler, className: "space-y-4", children: [_jsxs("div", { className: "space-y-1.5", children: [_jsx("label", { className: "text-[11px] font-bold text-slate-400 uppercase tracking-wider", children: "Product Title" }), _jsxs("div", { className: "relative", children: [_jsx(ShoppingBag, { className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-600", size: 16 }), _jsx("input", { type: "text", placeholder: "Organic Strawberries", value: name, onChange: (e) => setName(e.target.value), required: true, className: "w-full pl-11 pr-4 py-2.5 bg-slate-900/40 border border-slate-800 text-white placeholder:text-slate-600 rounded-xl focus:outline-none focus:border-violet-500/80 transition-all text-xs font-medium" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-1.5", children: [_jsx("label", { className: "text-[11px] font-bold text-slate-400 uppercase tracking-wider", children: "Price ($)" }), _jsxs("div", { className: "relative", children: [_jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-600", size: 15 }), _jsx("input", { type: "number", step: "0.01", placeholder: "4.99", value: price, onChange: (e) => setPrice(e.target.value), required: true, className: "w-full pl-9 pr-3 py-2.5 bg-slate-900/40 border border-slate-800 text-white placeholder:text-slate-600 rounded-xl focus:outline-none focus:border-violet-500/80 transition-all text-xs font-medium" })] })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsx("label", { className: "text-[11px] font-bold text-slate-400 uppercase tracking-wider", children: "Stock Inventory" }), _jsxs("div", { className: "relative", children: [_jsx(Package, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-600", size: 15 }), _jsx("input", { type: "number", placeholder: "150", value: stock, onChange: (e) => setStock(e.target.value), required: true, className: "w-full pl-9 pr-3 py-2.5 bg-slate-900/40 border border-slate-800 text-white placeholder:text-slate-600 rounded-xl focus:outline-none focus:border-violet-500/80 transition-all text-xs font-medium" })] })] })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsx("label", { className: "text-[11px] font-bold text-slate-400 uppercase tracking-wider", children: "Category Department" }), _jsxs("div", { className: "relative", children: [_jsx(Layers, { className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-600", size: 16 }), _jsxs("select", { value: category, onChange: (e) => setCategory(e.target.value), className: "w-full pl-11 pr-4 py-2.5 bg-slate-900/40 border border-slate-800 text-slate-300 rounded-xl focus:outline-none focus:border-violet-500/80 transition-all text-xs font-medium cursor-pointer", children: [_jsx("option", { value: "Groceries", className: "bg-slate-950", children: "Groceries" }), _jsx("option", { value: "Fruits", className: "bg-slate-950", children: "Fruits & Vegetables" }), _jsx("option", { value: "Beverages", className: "bg-slate-950", children: "Beverages" }), _jsx("option", { value: "Dairy", className: "bg-slate-950", children: "Dairy & Eggs" })] })] })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsx("label", { className: "text-[11px] font-bold text-slate-400 uppercase tracking-wider", children: "Product Image Source URL" }), _jsxs("div", { className: "relative", children: [_jsx(Image, { className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-600", size: 16 }), _jsx("input", { type: "url", placeholder: "https://images.unsplash.com/photo-...", value: imageUrl, onChange: (e) => setImageUrl(e.target.value), required: true, className: "w-full pl-11 pr-4 py-2.5 bg-slate-900/40 border border-slate-800 text-white placeholder:text-slate-600 rounded-xl focus:outline-none focus:border-violet-500/80 transition-all text-xs font-medium" })] })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsx("label", { className: "text-[11px] font-bold text-slate-400 uppercase tracking-wider", children: "Description" }), _jsx("textarea", { rows: 3, placeholder: "Provide unique item metrics and health benefits parameters...", value: description, onChange: (e) => setDescription(e.target.value), required: true, className: "w-full p-4 bg-slate-900/40 border border-slate-800 text-white placeholder:text-slate-600 rounded-xl focus:outline-none focus:border-violet-500/80 transition-all text-xs font-medium resize-none leading-relaxed" })] }), _jsxs("button", { type: "submit", disabled: loading, className: "w-full mt-2 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-pink-600 hover:opacity-95 disabled:opacity-50 transition-all cursor-pointer shadow-lg shadow-violet-500/10 flex items-center justify-center gap-2 active:scale-98", children: [loading ? _jsx(Loader2, { className: "animate-spin", size: 14 }) : _jsx(PlusCircle, { size: 14 }), loading ? "Injecting Data..." : "Publish Product Data"] })] })] }), _jsxs("div", { className: "xl:col-span-2 bg-slate-950/40 border border-slate-900/80 rounded-2xl backdrop-blur-xl shadow-2xl overflow-hidden relative", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-500/40 via-cyan-500/40 to-transparent" }), _jsx("div", { className: "p-5 border-b border-slate-900/80 bg-slate-900/20", children: _jsx("h3", { className: "text-sm font-bold text-white tracking-tight", children: "Active Database Store Inventory" }) }), fetching ? (_jsxs("div", { className: "h-64 flex items-center justify-center text-slate-400 text-xs font-medium gap-2", children: [_jsx(Loader2, { className: "animate-spin text-pink-500", size: 16 }), " Data stream loading..."] })) : products.length === 0 ? (_jsx("div", { className: "h-64 flex items-center justify-center text-slate-500 text-xs font-medium", children: "No product found inside current cluster schemas." })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full border-collapse text-left text-xs font-medium", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-900 text-slate-400 font-bold uppercase tracking-wider bg-slate-900/40", children: [_jsx("th", { className: "p-4 pl-6", children: "Preview" }), _jsx("th", { className: "p-4", children: "Name" }), _jsx("th", { className: "p-4", children: "Category" }), _jsx("th", { className: "p-4", children: "Price" }), _jsx("th", { className: "p-4", children: "Stock" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-900/40", children: products.map((prod) => (_jsxs("tr", { className: "hover:bg-slate-900/10 transition-colors", children: [_jsx("td", { className: "p-4 pl-6", children: _jsx("img", { src: prod.imageUrl, alt: prod.name, className: "w-10 h-10 rounded-xl object-cover border border-slate-800 shadow-inner" }) }), _jsx("td", { className: "p-4 font-bold text-white max-w-[150px] truncate", children: prod.name }), _jsx("td", { className: "p-4 text-slate-400", children: _jsx("span", { className: "px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-semibold text-slate-300", children: prod.category }) }), _jsxs("td", { className: "p-4 text-pink-400 font-mono font-bold", children: ["$", prod.price.toFixed(2)] }), _jsxs("td", { className: "p-4 text-slate-300 font-mono", children: [prod.stock, " units"] })] }, prod._id))) })] }) }))] })] })] }));
};
export default AdminProducts;
