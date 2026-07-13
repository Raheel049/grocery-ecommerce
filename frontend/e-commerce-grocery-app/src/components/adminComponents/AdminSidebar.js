import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { NavLink } from "react-router-dom";
import { ShieldAlert, PlusCircle, Users, LogOut, X, BarChart3 } from "lucide-react";
const AdminSidebar = ({ isOpen, onClose }) => {
    const menuItems = [
        { name: "Admin Overview", path: "/AdminDashboard/Overview", icon: _jsx(BarChart3, { size: 18 }) },
        { name: "Manage Products", path: "/AdminDashboard/Products", icon: _jsx(PlusCircle, { size: 18 }) },
        { name: "Users List", path: "/AdminDashboard/Users", icon: _jsx(Users, { size: 18 }) },
    ];
    const logoutHandler = () => {
        localStorage.clear();
        window.location.href = "/login";
    };
    return (_jsxs(_Fragment, { children: [isOpen && (_jsx("div", { onClick: onClose, className: "fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 md:hidden transition-opacity duration-300" })), _jsxs("aside", { className: `fixed md:sticky top-0 left-0 h-screen w-64 min-w-[260px] bg-[#0d090b] border-r border-rose-950/40 flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`, children: [_jsxs("div", { className: "h-16 px-6 border-b border-rose-950/40 flex items-center justify-between shrink-0", children: [_jsxs("span", { className: "text-sm font-black bg-gradient-to-r from-rose-400 via-orange-400 to-amber-300 bg-clip-text text-transparent tracking-widest flex items-center gap-1.5", children: [_jsx(ShieldAlert, { size: 16, className: "text-rose-400" }), " REEL FORGE CORPS"] }), _jsx("button", { onClick: onClose, className: "md:hidden text-slate-500 hover:text-white transition-colors cursor-pointer", children: _jsx(X, { size: 20 }) })] }), _jsx("nav", { className: "flex-1 px-4 py-6 space-y-1.5 overflow-y-auto", children: menuItems.map((item) => (_jsxs(NavLink, { to: item.path, onClick: onClose, className: ({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group border ${isActive
                                ? "bg-gradient-to-r from-rose-500/15 to-transparent text-rose-400 border-rose-500/20 font-semibold shadow-lg shadow-rose-500/5"
                                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border-transparent"}`, children: [item.icon, _jsx("span", { children: item.name })] }, item.path))) }), _jsx("div", { className: "p-4 border-t border-rose-950/40 shrink-0", children: _jsxs("button", { onClick: logoutHandler, className: "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-rose-400/80 hover:text-rose-400 hover:bg-rose-500/5 rounded-xl border border-transparent hover:border-rose-500/10 transition-all cursor-pointer", children: [_jsx(LogOut, { size: 18 }), "Sign Out"] }) })] })] }));
};
export default AdminSidebar;
