import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // Strict destructured import declaration
const SignUp = () => {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handlePasswordChange = (val) => {
        setPassword(val);
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!val) {
            setPasswordError("");
        }
        else if (!passwordRegex.test(val)) {
            setPasswordError("8+ chars, Uppercase, Lowercase, Number & Special Character");
        }
        else {
            setPasswordError("");
        }
    };
    const signUpHandler = async (e) => {
        e.preventDefault(); // Prevents layout page flashes on dynamic post execution
        if (passwordError || !password) {
            toast.error("Please enter a valid password first!");
            return;
        }
        const API = import.meta.env.VITE_API_URL || "";
        setLoading(true);
        const userObj = { name, phoneNumber, email, password };
        const URL = `${API}/api/auth/signup`;
        try {
            // API call with dynamic execution mappings contract
            const res = await axios.post(URL, userObj);
            toast.success(res.data.message || "SignUp Successful!");
            if (res.data.status === true) {
                navigate("/otp", { state: { email } });
            }
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                const serverMessage = error.response?.data?.message;
                toast.error(typeof serverMessage === "string" ? serverMessage : "SignUp failed");
            }
            else {
                toast.error("An unexpected engine fault validation occurred");
            }
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen flex items-center justify-center bg-[#0B0F19] px-4 selection:bg-emerald-500 selection:text-slate-900 relative overflow-hidden", children: [_jsx("div", { className: "absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" }), _jsx("div", { className: "absolute bottom-1/4 right-1/3 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" }), _jsxs("div", { className: "w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 p-8 rounded-2xl shadow-2xl z-10", children: [_jsx("h2", { className: "text-2xl font-bold text-white tracking-tight text-center", children: "Create Account" }), _jsx("p", { className: "text-sm text-slate-400 text-center mt-2 mb-8", children: "Join our premium e-commerce grocery network" }), _jsxs("form", { onSubmit: signUpHandler, className: "space-y-5", children: [_jsx("div", { children: _jsx("input", { type: "text", required: true, placeholder: "Full Name", onChange: (e) => setName(e.target.value), value: name, className: "w-full px-4 py-3 bg-slate-950/50 border border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-xl focus:outline-none focus:border-emerald-500/80 transition-colors text-sm" }) }), _jsx("div", { children: _jsx("input", { type: "text", required: true, placeholder: "Phone Number", onChange: (e) => setPhoneNumber(e.target.value), value: phoneNumber, className: "w-full px-4 py-3 bg-slate-950/50 border border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-xl focus:outline-none focus:border-emerald-500/80 transition-colors text-sm" }) }), _jsx("div", { children: _jsx("input", { type: "email", required: true, placeholder: "Email Address", onChange: (e) => setEmail(e.target.value), value: email, className: "w-full px-4 py-3 bg-slate-950/50 border border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-xl focus:outline-none focus:border-emerald-500/80 transition-colors text-sm" }) }), _jsxs("div", { children: [_jsx("input", { type: "password", required: true, placeholder: "Password", onChange: (e) => handlePasswordChange(e.target.value), value: password, className: `w-full px-4 py-3 bg-slate-950/50 border text-slate-100 placeholder:text-slate-500 rounded-xl focus:outline-none transition-colors text-sm ${passwordError ? "border-rose-500/50 focus:border-rose-500" : "border-slate-800 focus:border-emerald-500/80"}` }), passwordError && (_jsx("p", { className: "text-[11px] text-rose-400 mt-1.5 ml-1 font-medium leading-normal animate-pulse", children: passwordError }))] }), _jsx("div", { className: "pt-1 text-xs text-center", children: _jsxs(Link, { to: "/login", className: "text-slate-400 hover:text-emerald-400 transition-colors", children: ["Already have an account? ", _jsx("span", { className: "underline decoration-emerald-500/40 font-medium", children: "Login" })] }) }), _jsx("button", { type: "submit", disabled: loading || !!passwordError, className: "w-full py-3 px-4 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer shadow-lg shadow-emerald-500/10", children: loading ? "Creating..." : "SignUp" })] })] })] }));
};
export default SignUp;
