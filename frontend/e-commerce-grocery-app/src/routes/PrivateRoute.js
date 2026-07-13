import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
const PrivateRoute = () => {
    const location = useLocation();
    // Local storage se verification check karein
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    return isLoggedIn ? (_jsx(Outlet, {})) : (_jsx(Navigate, { to: "/login", state: { from: location }, replace: true }));
};
export default PrivateRoute;
