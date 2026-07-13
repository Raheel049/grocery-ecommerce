import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const Login = () => {
    const API = import.meta.env.VITE_API_URL || "";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const loginHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const URL = `${API}/api/auth/login`;
            // Enforcing type contract on standard data parameters
            const res = await axios.post(URL, { email, password }, {
                withCredentials: true // 👈 Yeh line login request ke sath bhi honi chahiye taake response cookies browser capture kar sake
            });
            // Kuch cases ya older configurations ke liye role ko browser state storage me rakhein
            localStorage.setItem("userRole", res.data.role);
            localStorage.setItem("isLoggedIn", "true");
            console.log(res);
            // Safe invocation of toast.success
            toast.success(res.data.message || "Welcome back!");
            const role = res.data.role;
            // Role-Based Redirection matched exactly with criteria
            if (role === "Admin") {
                navigate("/AdminDashboard"); // Protected Admin View
            }
            else {
                navigate("/UserDashboard/UserOverview"); // Main Public Grocery Catalogs
            }
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                const serverMessage = error.response?.data?.message;
                toast.error(typeof serverMessage === "string" ? serverMessage : "Invalid credentials");
            }
            else {
                toast.error("An unexpected validation failure occurred");
            }
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen flex items-center justify-center bg-[#0B0F19] px-4 selection:bg-emerald-500 selection:text-slate-900 relative overflow-hidden", children: [_jsx("div", { className: "absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" }), _jsxs("div", { className: "w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 p-8 rounded-2xl shadow-2xl z-10", children: [_jsx("h2", { className: "text-2xl font-bold text-white tracking-tight text-center", children: "Ecommerce Grocery Platform" }), _jsx("p", { className: "text-sm text-slate-400 text-center mt-2 mb-8", children: "Sign in to access your dashboard" }), _jsxs("form", { onSubmit: loginHandler, className: "space-y-5", children: [_jsx("div", { className: "relative", children: _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, placeholder: "Email Address", className: "w-full px-4 py-3 bg-slate-950/50 border border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-xl focus:outline-none focus:border-emerald-500/80 transition-colors text-sm" }) }), _jsx("div", { className: "relative", children: _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, placeholder: "Password", className: "w-full px-4 py-3 bg-slate-950/50 border border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-xl focus:outline-none focus:border-emerald-500/80 transition-colors text-sm" }) }), _jsx("button", { type: "submit", disabled: loading, className: "w-full py-3 px-4 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer shadow-lg shadow-emerald-500/10", children: loading ? "Verifying..." : "Login" }), _jsxs("div", { className: "flex items-center justify-between pt-2 text-xs", children: [_jsxs(Link, { to: "/signUp", className: "text-slate-400 hover:text-emerald-400 transition-colors", children: ["New here? ", _jsx("span", { className: "underline decoration-emerald-500/40", children: "Create Account" })] }), _jsx(Link, { to: "/forgotPassword", className: "text-slate-500 hover:text-slate-300 transition-colors", children: "Forgot Password?" })] })] })] })] }));
};
export default Login;
