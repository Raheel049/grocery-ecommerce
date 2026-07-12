import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/adminComponents/adminSidebar.js";
import AdminNavbar from "../../components/adminComponents/adminNavbar.js";

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="h-screen w-screen bg-[#090507] text-slate-100 flex overflow-hidden relative selection:bg-rose-600 selection:text-white">
      
      {/* Admin Specific Crimson/Orange Cyber Ambient Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* 1. Admin Sidebar Component Connected with Toggle State */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 2. Main Area Frame Layout */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Integrated Management Top Bar */}
        <AdminNavbar onMenuClick={() => setSidebarOpen(true)} />

        {/* 3. Independent Content Scroll Body */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet /> {/* 👈 Yahan aapka AdminProducts render hoga */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;