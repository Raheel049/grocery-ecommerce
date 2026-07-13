import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-hot-toast"; // Strict destructured import declaration
const OtpVerify = () => {
    const API = import.meta.env.VITE_API_URL || "";
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const navigate = useNavigate();
    const location = useLocation();
    // Safely cast router contextual states
    const state = location.state;
    useEffect(() => {
        if (!state?.email) {
            navigate("/");
        }
    }, [state, navigate]);
    useEffect(() => {
        let interval = null;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => {
            if (interval)
                clearInterval(interval);
        };
    }, [timer]);
    const verifyOtpHandler = async (e) => {
        e.preventDefault();
        if (!otp || otp.length !== 6) {
            toast.error("Please enter 6 digit OTP");
            return;
        }
        if (!state?.email) {
            toast.error("Session identity validation failed");
            return;
        }
        setLoading(true);
        try {
            const URL = `${API}/api/auth/verify-otp`;
            const body = {
                otp,
                email: state.email,
            };
            // Enforcing type contract on standard data parameters
            const res = await axios.post(URL, body);
            toast.success(res.data.message || "OTP Verified Successfully");
            // Target validation redirection logic
            if (state.from === "forgotPassword") {
                navigate(`/change-password?q=${otp}`);
            }
            else {
                navigate("/login");
            }
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                const serverMessage = error.response?.data?.message;
                toast.error(typeof serverMessage === "string" ? serverMessage : "Invalid OTP or Server Error");
            }
            else {
                toast.error("An unexpected execution validation fault occurred");
            }
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen flex items-center justify-center bg-[#0B0F19] px-4 selection:bg-emerald-500 selection:text-slate-900 relative overflow-hidden", children: [_jsx("div", { className: "absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" }), _jsxs("div", { className: "w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 p-8 rounded-2xl shadow-2xl z-10", children: [_jsx("h2", { className: "text-2xl font-bold text-white tracking-tight text-center", children: "OTP Verification" }), _jsxs("p", { className: "text-sm text-slate-400 text-center mt-2 mb-8 leading-relaxed", children: ["Enter the 6 digit code sent to: ", _jsx("br", {}), _jsx("span", { className: "text-emerald-400 font-medium break-all", children: state?.email })] }), _jsxs("form", { onSubmit: verifyOtpHandler, className: "space-y-6", children: [_jsx("div", { className: "relative", children: _jsx("input", { type: "text", maxLength: 6, value: otp, onChange: (e) => setOtp(e.target.value), placeholder: "0 0 0 0 0 0", className: "w-full text-center tracking-[0.5em] font-mono px-4 py-3 bg-slate-950/50 border border-slate-800 text-slate-100 placeholder:text-slate-600 rounded-xl focus:outline-none focus:border-emerald-500/80 transition-colors text-lg" }) }), _jsx("div", { className: "text-xs text-center text-slate-400", children: timer > 0 ? (_jsxs("span", { children: ["Resend code in ", _jsxs("b", { className: "text-emerald-400 font-semibold", children: [timer, "s"] })] })) : (_jsx(Link, { to: "/otpReset", className: "text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors font-medium", children: "Resend OTP" })) }), _jsx("button", { type: "submit", disabled: loading, className: "w-full py-3 px-4 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer shadow-lg shadow-emerald-500/10", children: loading ? "Verifying..." : "Verify OTP" })] }), _jsx("div", { className: "pt-5 text-center text-xs", children: _jsx(Link, { to: "/login", className: "text-slate-500 hover:text-slate-300 transition-colors", children: "Back to Login" }) })] })] }));
};
export default OtpVerify;
