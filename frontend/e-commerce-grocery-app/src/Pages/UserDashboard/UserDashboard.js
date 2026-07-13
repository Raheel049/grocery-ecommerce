import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/UserComponent/Sidebar.js";
import Navbar from "../../components/UserComponent/Navbar.js";
const UserDashboard = () => {
    // 🚀 Mobile toggle open/close state logic
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (_jsxs("div", { className: "h-screen w-screen bg-[#060813] text-slate-100 flex overflow-hidden relative selection:bg-violet-500 selection:text-white", children: [_jsx("div", { className: "absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[160px] pointer-events-none" }), _jsx("div", { className: "absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-[160px] pointer-events-none" }), _jsx(Sidebar, { isOpen: sidebarOpen, onClose: () => setSidebarOpen(false) }), _jsxs("div", { className: "flex-1 flex flex-col min-w-0 h-screen overflow-hidden", children: [_jsx(Navbar, { onMenuClick: () => setSidebarOpen(true) }), _jsx("main", { className: "flex-1 p-6 md:p-8 overflow-y-auto overflow-x-hidden custom-scrollbar", children: _jsx("div", { className: "max-w-7xl mx-auto w-full", children: _jsx(Outlet, {}) }) })] })] }));
};
export default UserDashboard;
