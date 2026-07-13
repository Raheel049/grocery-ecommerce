import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const DeviceCard = ({ session, onLogout }) => {
    return (_jsxs("div", { className: "border rounded-lg p-4", children: [_jsx("h2", { children: session.device }), _jsx("p", { children: session.browser }), _jsx("p", { children: session.ip }), _jsx("p", { children: session.lastActive }), session.current
                ?
                    _jsx("span", { children: "Current Device" })
                :
                    _jsx("button", { onClick: onLogout, children: "Logout" })] }));
};
export default DeviceCard;
