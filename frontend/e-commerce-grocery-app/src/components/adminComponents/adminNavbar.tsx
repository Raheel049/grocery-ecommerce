import React from "react";
import { Bell, Menu, ShieldCheck } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

const AdminNavbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const adminName = localStorage.getItem("userName") || "System Admin";

  return (
    <header className="h-16 border-b border-rose-950/30 bg-[#0d090b]/40 backdrop-blur-xl flex items-center justify-between px-6 z-20 shrink-0 sticky top-0">
      
      {/* Mobile Hamburger toggle */}
      <button 
        onClick={onMenuClick}
        className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white hover:bg-slate-900/50 rounded-xl transition-all cursor-pointer"
      >
        <Menu size={20} />
      </button>

      {/* Security Status clearance indicators */}
      <div className="hidden md:block">
        <h1 className="text-xs font-semibold text-slate-400 tracking-wide uppercase flex items-center gap-2">
          Root Active: <span className="text-rose-400 font-bold normal-case text-sm tracking-normal">{adminName}</span>
        </h1>
      </div>

      {/* Dynamic Profile Elements */}
      <div className="flex items-center gap-4 ml-auto md:ml-0">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-[10px] font-black tracking-widest text-rose-400 uppercase">
          <ShieldCheck size={12} /> SECURE SHELL
        </div>
        
        <div className="h-6 w-px bg-slate-800" />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-rose-500/20 uppercase">
            {adminName.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;