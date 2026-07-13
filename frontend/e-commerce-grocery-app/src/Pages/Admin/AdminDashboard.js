import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminComponents/AdminSidebar.js";
import AdminNavbar from "../../components/AdminComponents/AdminNavbar.js";
const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (_jsxs("div", { className: "h-screen w-screen bg-[#090507] text-slate-100 flex overflow-hidden relative selection:bg-rose-600 selection:text-white", children: [_jsx("div", { className: "absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-600/5 rounded-full blur-[160px] pointer-events-none" }), _jsx("div", { className: "absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[160px] pointer-events-none" }), _jsx(AdminSidebar, { isOpen: sidebarOpen, onClose: () => setSidebarOpen(false) }), _jsxs("div", { className: "flex-1 flex flex-col min-w-0 h-screen overflow-hidden", children: [_jsx(AdminNavbar, { onMenuClick: () => setSidebarOpen(true) }), _jsx("main", { className: "flex-1 p-6 md:p-8 overflow-y-auto", children: _jsxs("div", { className: "max-w-7xl mx-auto w-full", children: [_jsx(Outlet, {}), " "] }) })] })] }));
};
export default AdminDashboard;
