import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, LogOut, X, User, Settings } from "lucide-react";
const Sidebar = ({ isOpen, onClose }) => {
    const menuItems = [
        { name: "Overview", path: "/UserDashboard/UserOverview", icon: _jsx(LayoutDashboard, { size: 18 }) },
        { name: "My Orders", path: "/UserDashboard/orders", icon: _jsx(ShoppingBag, { size: 18 }) },
        { name: "Account Profile", path: "/UserDashboard/UserProfile", icon: _jsx(User, { size: 18 }) },
        { name: "Settings", path: "/UserDashboard/UserSettings", icon: _jsx(Settings, { size: 18 }) },
    ];
    const logoutHandler = () => {
        localStorage.clear();
        window.location.href = "/login";
    };
    return (_jsxs(_Fragment, { children: [isOpen && (_jsx("div", { onClick: onClose, className: "fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 md:hidden transition-opacity duration-300" })), _jsxs("aside", { className: `fixed md:sticky top-0 left-0 h-screen w-64 min-w-[260px] bg-slate-950 border-r border-slate-900 flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`, children: [_jsxs("div", { className: "h-16 px-6 border-b border-slate-900 flex items-center justify-between shrink-0", children: [_jsx("span", { className: "text-base font-black bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent tracking-widest", children: "Ecommerce Grocery" }), _jsx("button", { onClick: onClose, className: "md:hidden text-slate-500 hover:text-white transition-colors cursor-pointer", children: _jsx(X, { size: 20 }) })] }), _jsx("nav", { className: "flex-1 px-4 py-6 space-y-1.5 overflow-y-auto", children: menuItems.map((item) => (_jsxs(NavLink, { to: item.path, onClick: onClose, className: ({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group border ${isActive
                                ? "bg-gradient-to-r from-violet-500/15 to-transparent text-violet-400 border-violet-500/20 font-semibold shadow-lg shadow-violet-500/5"
                                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border-transparent"}`, children: [item.icon, _jsx("span", { children: item.name })] }, item.path))) }), _jsx("div", { className: "p-4 border-t border-slate-900 shrink-0", children: _jsxs("button", { onClick: logoutHandler, className: "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-rose-400/80 hover:text-rose-400 hover:bg-rose-500/5 rounded-xl border border-transparent hover:border-rose-500/10 transition-all cursor-pointer", children: [_jsx(LogOut, { size: 18 }), "Sign Out"] }) })] })] }));
};
export default Sidebar;
