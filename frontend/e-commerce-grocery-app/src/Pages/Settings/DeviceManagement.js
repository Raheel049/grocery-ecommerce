import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeviceCard from "../../components/SessionManagement/DeviceCard.js";
import { getSessions, logoutDevice, logoutAllDevices } from "../../services/sessionService.js";
const DeviceManagement = () => {
    const navigate = useNavigate();
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadSessions = async () => {
        try {
            setLoading(true);
            const response = await getSessions();
            console.log(response);
            setSessions(response.data);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadSessions();
    }, []);
    const handleLogoutDevice = async (id) => {
        try {
            const confirmLogout = window.confirm("Are you sure you want to logout this device?");
            if (!confirmLogout)
                return;
            await logoutDevice(id);
            await loadSessions();
        }
        catch (error) {
            console.log(error);
        }
    };
    const handleLogoutAllDevices = async () => {
        try {
            const confirmLogout = window.confirm("Logout from all devices?");
            if (!confirmLogout)
                return;
            await logoutAllDevices();
            localStorage.clear();
            navigate("/login");
        }
        catch (error) {
            console.log(error);
        }
    };
    const currentDevice = sessions.find((session) => session.current === true);
    const otherDevices = sessions.filter((session) => session.current === false);
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center h-screen text-lg", children: "Loading Devices..." }));
    }
    return (_jsxs("div", { className: "max-w-5xl mx-auto p-6", children: [_jsx("h1", { className: "text-3xl font-bold mb-2", children: "Device Management" }), _jsx("p", { className: "text-gray-500 mb-8", children: "Manage all devices currently logged into your account." }), currentDevice && (_jsxs(_Fragment, { children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Current Device" }), _jsx(DeviceCard, { session: currentDevice, onLogout: () => { } })] })), _jsxs("div", { className: "mt-10", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Other Devices" }), otherDevices.length === 0 ? (_jsx("div", { className: "border rounded-lg p-6 text-center text-gray-500", children: "No other active devices found." })) : (_jsx("div", { className: "space-y-4", children: otherDevices.map((session) => (_jsx(DeviceCard, { session: session, onLogout: () => handleLogoutDevice(session._id) }, session._id))) }))] }), otherDevices.length > 0 && (_jsx("div", { className: "mt-10", children: _jsx("button", { onClick: handleLogoutAllDevices, className: "bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg", children: "Logout All Devices" }) }))] }));
};
export default DeviceManagement;
