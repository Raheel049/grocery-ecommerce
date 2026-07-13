import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const AuthRoute = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    // Agar user logged in hai toh use home/dashboard par bypass karein
    return !isLoggedIn ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "/", replace: true });
};
export default AuthRoute;
