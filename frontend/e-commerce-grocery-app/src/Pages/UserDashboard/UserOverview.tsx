import React from "react";
import { ShoppingBag, Truck, CheckCircle2 } from "lucide-react";

const UserOverview: React.FC = () => {
  // Static matrix visualization stats blocks
  const metrics = [
    { title: "Total Orders", value: "12", icon: <ShoppingBag className="text-emerald-400" size={22} />, bg: "bg-emerald-500/10 border-emerald-500/20" },
    { title: "In Transit", value: "01", icon: <Truck className="text-teal-400" size={22} />, bg: "bg-teal-500/10 border-teal-500/20" },
    { title: "Delivered Items", value: "11", icon: <CheckCircle2 className="text-sky-400" size={22} />, bg: "bg-sky-500/10 border-sky-500/20" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner Text */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h2>
        <p className="text-xs text-slate-400 mt-1">Monitor your recent account configurations and purchase lifecycle activity.</p>
      </div>

      {/* Metric Visual Deck Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {metrics.map((stat, idx) => (
          <div key={idx} className={`p-6 rounded-2xl border bg-slate-900/20 backdrop-blur-md flex items-center justify-between ${stat.bg}`}>
            <div className="space-y-2">
              <span className="text-xs font-medium text-slate-400 block uppercase tracking-wider">{stat.title}</span>
              <span className="text-3xl font-bold text-white font-mono tracking-tight">{stat.value}</span>
            </div>
            <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800/40 shadow-inner">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder layout grid framework for tables */}
      <div className="bg-slate-900/30 border border-slate-800/60 p-6 rounded-2xl backdrop-blur-md">
        <h3 className="text-sm font-semibold text-white tracking-tight mb-4">Recent Shopping Traces</h3>
        <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl bg-slate-950/20">
          <p className="text-xs text-slate-500">No active grocery processing queues active right now.</p>
        </div>
      </div>
    </div>
  );
};

export default UserOverview;