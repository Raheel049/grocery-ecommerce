import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { ShoppingBag, Truck, CheckCircle2 } from "lucide-react";
const UserOverview = () => {
    // Static matrix visualization stats blocks
    const metrics = [
        { title: "Total Orders", value: "12", icon: _jsx(ShoppingBag, { className: "text-emerald-400", size: 22 }), bg: "bg-emerald-500/10 border-emerald-500/20" },
        { title: "In Transit", value: "01", icon: _jsx(Truck, { className: "text-teal-400", size: 22 }), bg: "bg-teal-500/10 border-teal-500/20" },
        { title: "Delivered Items", value: "11", icon: _jsx(CheckCircle2, { className: "text-sky-400", size: 22 }), bg: "bg-sky-500/10 border-sky-500/20" },
    ];
    return (_jsxs("div", { className: "space-y-8 animate-fadeIn", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-white tracking-tight", children: "Dashboard Overview" }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Monitor your recent account configurations and purchase lifecycle activity." })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: metrics.map((stat, idx) => (_jsxs("div", { className: `p-6 rounded-2xl border bg-slate-900/20 backdrop-blur-md flex items-center justify-between ${stat.bg}`, children: [_jsxs("div", { className: "space-y-2", children: [_jsx("span", { className: "text-xs font-medium text-slate-400 block uppercase tracking-wider", children: stat.title }), _jsx("span", { className: "text-3xl font-bold text-white font-mono tracking-tight", children: stat.value })] }), _jsx("div", { className: "p-3 bg-slate-950/40 rounded-xl border border-slate-800/40 shadow-inner", children: stat.icon })] }, idx))) }), _jsxs("div", { className: "bg-slate-900/30 border border-slate-800/60 p-6 rounded-2xl backdrop-blur-md", children: [_jsx("h3", { className: "text-sm font-semibold text-white tracking-tight mb-4", children: "Recent Shopping Traces" }), _jsx("div", { className: "text-center py-12 border border-dashed border-slate-800 rounded-xl bg-slate-950/20", children: _jsx("p", { className: "text-xs text-slate-500", children: "No active grocery processing queues active right now." }) })] })] }));
};
export default UserOverview;
