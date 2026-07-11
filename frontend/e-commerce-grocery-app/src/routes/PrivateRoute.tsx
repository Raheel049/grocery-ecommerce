import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const location = useLocation();
  
  // Local storage se verification check karein
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;