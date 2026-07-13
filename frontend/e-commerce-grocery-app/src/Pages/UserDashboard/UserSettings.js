import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FiGlobe, FiLock, FiMonitor, FiKey, FiCreditCard, } from "react-icons/fi";
import { Link } from "react-router-dom";
import SettingCard from "../../components/UserComponent/SettingCard.js";
const UserSettings = () => {
    return (_jsxs("div", { className: "max-w-5xl mx-auto p-8", children: [_jsx("h1", { className: "text-3xl font-bold text-white mb-2", children: "Settings" }), _jsx("p", { className: "text-gray-400 mb-8", children: "Manage your account settings." }), _jsxs("div", { className: "space-y-5", children: [_jsx(SettingCard, { title: "Preferences", description: "Language & Timezone", icon: _jsx(FiGlobe, {}), onClick: () => console.log("Preferences") }), _jsx(SettingCard, { title: "Change Password", description: "Update your account password", icon: _jsx(FiLock, {}), onClick: () => console.log("Password") }), _jsx("div", { children: _jsx(Link, { to: '/DeviceManagement', children: _jsx(SettingCard, { title: "Device Management", description: "Manage logged in devices", icon: _jsx(FiMonitor, {}), onClick: () => console.log("Devices") }) }) }), _jsx(SettingCard, { title: "API Keys", description: "Create and manage API keys", icon: _jsx(FiKey, {}), onClick: () => console.log("API") }), _jsx(SettingCard, { title: "Subscription", description: "Manage your subscription", icon: _jsx(FiCreditCard, {}), onClick: () => console.log("Subscription") })] })] }));
};
export default UserSettings;
