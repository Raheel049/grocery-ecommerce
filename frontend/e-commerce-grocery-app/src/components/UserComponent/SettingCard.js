import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FiChevronRight } from "react-icons/fi";
const SettingCard = ({ title, description, icon, onClick, }) => {
    return (_jsxs("div", { onClick: onClick, className: "w-full bg-[#111827] border border-gray-800 rounded-xl p-5 flex items-center justify-between cursor-pointer hover:border-violet-500 hover:shadow-lg transition-all duration-300", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-14 h-14 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 text-2xl", children: icon }), _jsxs("div", { children: [_jsx("h2", { className: "text-white text-lg font-semibold", children: title }), _jsx("p", { className: "text-gray-400 text-sm mt-1", children: description })] })] }), _jsx(FiChevronRight, { size: 22, className: "text-gray-500" })] }));
};
export default SettingCard;
