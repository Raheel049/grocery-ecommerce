import React from "react";
import Login from "../src/Auth/login";
import SignUp from "../src/Auth/signUp";
import OtpVerify from "../src/Auth/otp";
import ForgotPassword from "../src/Auth/forgotPassword";
import OtpReset from "../src/Auth/otpReset";
import ChangePassword from "../src/Auth/changePassword";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home";
import { Toaster } from "react-hot-toast";
import UserDashboard from "../src/Pages/UserDashboard/UserDashboard";
import AuthRoute from "../src/routes/AuthRoute";
import PrivateRoute from "../src/routes/PrivateRoute";
import UserOverview from "../src/Pages/UserDashboard/UserOverview";
import UserProfile from "../src/Pages/UserDashboard/UserProfile";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminProducts from "./Pages/Admin/AdminProduct";
import UserSettings from "../src/Pages/UserDashboard/UserSettings";
import DeviceManagement from "../src/Pages/Settings/DeviceManagement";

// ... baqi imports same rahenge

const App = () => {
  return (
    <div>
      <Toaster position="top-left" />
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Guest Routes */}
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/otp" element={<OtpVerify />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/otpReset" element={<OtpReset />} />
          <Route path="/changePassword" element={<ChangePassword />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          
          {/* USER DASHBOARD PARENT */}
          <Route path="/UserDashboard" element={<UserDashboard />}>
            <Route index element={<UserOverview />} />
            <Route path="UserOverview" element={<UserOverview />} />
            <Route path="UserProfile" element={<UserProfile />} />
            
            {/* 1. Settings Menu ka path */}
            <Route path="UserSettings" element={<UserSettings />} />
            
            {/* 2. Device Management ka direct path (No complex nesting) */}
            <Route path="DeviceManagement" element={<DeviceManagement />} />
          </Route>

          {/* ADMIN DASHBOARD */}
          <Route path="/AdminDashboard" element={<AdminDashboard />}>
            <Route index element={<AdminProducts />} />
          </Route>

        </Route>
      </Routes>
    </div>
  );
};

export default App;