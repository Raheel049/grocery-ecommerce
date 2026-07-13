import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { User, Mail, ShieldAlert, CheckCircle, Phone, Globe, Clock, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance.js";
const UserProfile = () => {
    // Main form and visual states
    const [profile, setProfile] = useState(null);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [language, setLanguage] = useState("");
    const [timezone, setTimezone] = useState("");
    const [fetching, setFetching] = useState(true);
    const [updating, setUpdating] = useState(false);
    // 🚀 1. Fetch Profile Data on view mount
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axiosInstance.get("/api/profile/get-profile");
                const userData = response.data.data;
                setProfile(userData);
                setName(userData.name || "");
                setPhoneNumber(userData.phoneNumber || "");
                setLanguage(userData.language || "English");
                setTimezone(userData.timezone || "GMT+5");
                // Dynamic state mapping back to client headers
                if (userData.name)
                    localStorage.setItem("userName", userData.name);
            }
            catch (error) {
                toast.error(error.response?.data?.message || "Failed to load user profile variables.");
            }
            finally {
                setFetching(false);
            }
        };
        fetchProfileData();
    }, []);
    // 🚀 2. Update Profile Data Handler
    const updateProfileHandler = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const payload = {
                name,
                phoneNumber,
                language,
                timezone
            };
            const response = await axiosInstance.patch("/api/profile/update-profile", payload);
            toast.success(response.data.message || "Profile configurations optimized!");
            setProfile(response.data.data);
            // Update top navbar dynamically
            localStorage.setItem("userName", name);
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Validation criteria injection failed.");
        }
        finally {
            setUpdating(false);
        }
    };
    // Skeleton Loader screen state wrapper
    if (fetching) {
        return (_jsxs("div", { className: "h-96 flex items-center justify-center text-slate-400 font-medium text-sm gap-2", children: [_jsx(Loader2, { className: "animate-spin text-violet-500", size: 20 }), "Syncing Identity Framework..."] }));
    }
    return (_jsxs("div", { className: "space-y-8 relative", children: [_jsx("div", { className: "absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none -z-10" }), _jsxs("div", { className: "border-b border-slate-800/80 pb-6", children: [_jsx("h2", { className: "text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white via-slate-200 to-slate-400 tracking-tight", children: "Account Control" }), _jsx("p", { className: "text-xs text-slate-400 mt-1.5 font-medium tracking-wide", children: "Manage your dynamic security settings parameters and personal grocery addresses." })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 items-start", children: [_jsxs("div", { className: "lg:col-span-2 bg-slate-950/40 border border-slate-800/60 p-6 md:p-8 rounded-2xl backdrop-blur-xl shadow-xl relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-violet-500/40 via-cyan-500/40 to-transparent" }), _jsx("h3", { className: "text-base font-bold text-white tracking-tight mb-6", children: "Profile Settings" }), _jsxs("form", { onSubmit: updateProfileHandler, className: "space-y-5", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-xs font-semibold text-slate-400 uppercase tracking-wider", children: "Full Name" }), _jsxs("div", { className: "relative", children: [_jsx(User, { className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-500", size: 16 }), _jsx("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), required: true, className: "w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-800 text-white placeholder:text-slate-600 rounded-xl focus:outline-none focus:border-violet-500/80 transition-colors text-sm font-medium" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-xs font-semibold text-slate-400 uppercase tracking-wider", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-500", size: 16 }), _jsx("input", { type: "email", value: profile?.email || "", disabled: true, className: "w-full pl-11 pr-4 py-3 bg-slate-950/40 border border-slate-900/80 text-slate-500 rounded-xl focus:outline-none text-sm font-medium cursor-not-allowed shadow-inner" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-xs font-semibold text-slate-400 uppercase tracking-wider", children: "Phone Number" }), _jsxs("div", { className: "relative", children: [_jsx(Phone, { className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-500", size: 16 }), _jsx("input", { type: "text", value: phoneNumber, onChange: (e) => setPhoneNumber(e.target.value), placeholder: "Add Phone Number", className: "w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-800 text-white placeholder:text-slate-600 rounded-xl focus:outline-none focus:border-violet-500/80 transition-colors text-sm font-medium" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-xs font-semibold text-slate-400 uppercase tracking-wider", children: "Preferred Language" }), _jsxs("div", { className: "relative", children: [_jsx(Globe, { className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-500", size: 16 }), _jsx("input", { type: "text", value: language, onChange: (e) => setLanguage(e.target.value), className: "w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-800 text-white placeholder:text-slate-600 rounded-xl focus:outline-none focus:border-violet-500/80 transition-colors text-sm font-medium" })] })] })] }), _jsxs("div", { className: "space-y-2 pt-1", children: [_jsx("label", { className: "text-xs font-semibold text-slate-400 uppercase tracking-wider", children: "Timezone Cluster" }), _jsxs("div", { className: "relative", children: [_jsx(Clock, { className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-500", size: 16 }), _jsx("input", { type: "text", value: timezone, onChange: (e) => setTimezone(e.target.value), className: "w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-800 text-white placeholder:text-slate-600 rounded-xl focus:outline-none focus:border-violet-500/80 transition-colors text-sm font-medium" })] })] }), _jsxs("button", { type: "submit", disabled: updating, className: "mt-4 px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-pink-600 hover:opacity-95 active:scale-[0.98] disabled:opacity-50 transition-all cursor-pointer shadow-lg shadow-violet-500/10 flex items-center gap-2", children: [updating && _jsx(Loader2, { className: "animate-spin", size: 14 }), updating ? "Saving Changes..." : "Save Configuration Settings"] })] })] }), _jsxs("div", { className: "bg-slate-950/40 border border-slate-800/60 p-6 rounded-2xl backdrop-blur-xl shadow-xl space-y-5", children: [_jsx("h3", { className: "text-sm font-bold text-white tracking-tight", children: "Verification Badges" }), _jsxs("div", { className: "p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 flex items-start gap-3", children: [_jsx(CheckCircle, { className: "text-cyan-400 shrink-0 mt-0.5", size: 16 }), _jsxs("div", { children: [_jsx("h4", { className: "text-xs font-bold text-cyan-400", children: "KYC Clearance Pass" }), _jsx("p", { className: "text-[11px] text-slate-400 mt-0.5 leading-relaxed", children: "Your primary authentication level is certified for fast grocery checkouts." })] })] }), _jsxs("div", { className: "p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-start gap-3", children: [_jsx(ShieldAlert, { className: "text-amber-400 shrink-0 mt-0.5", size: 16 }), _jsxs("div", { children: [_jsx("h4", { className: "text-xs font-bold text-amber-400", children: "Auth Method" }), _jsxs("p", { className: "text-[11px] text-slate-400 mt-0.5 leading-relaxed uppercase tracking-wider font-semibold", children: ["Provider: ", _jsx("span", { className: "text-white font-mono", children: profile?.provider || "local" })] })] })] })] })] })] }));
};
export default UserProfile;
