import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/UserComponent/Sidebar.js";
import Navbar from "../../components/UserComponent/Navbar.js";

const UserDashboard: React.FC = () => {
  // 🚀 Mobile toggle open/close state logic
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="h-screen w-screen bg-[#060813] text-slate-100 flex overflow-hidden relative selection:bg-violet-500 selection:text-white">
      
      {/* Ambient Cyber Background Visuals */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* 1. Sidebar Frame Connected with Toggle State */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 2. Main Area Frame */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* 🚀 Connected Navbar with Menu Click State */}
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        {/* 3. Independent Content Scroll Body (100vh Fix) */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;