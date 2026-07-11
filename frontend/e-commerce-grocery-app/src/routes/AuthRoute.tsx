import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute: React.FC = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Agar user logged in hai toh use home/dashboard par bypass karein
  return !isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default AuthRoute;