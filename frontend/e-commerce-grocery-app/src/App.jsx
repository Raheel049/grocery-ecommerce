import React from "react";
import Login from '../src/Auth/login'
import SignUp from '../src/Auth/signUp'
import OtpVerify from '../src/Auth/otp'
import ForgotPassword from '../src/Auth/forgotPassword'
import OtpReset from '../src/Auth/otpReset'
import ChangePassword from '../src/Auth/changePassword'
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home";
import { Toaster } from "react-hot-toast";
import UserDashboard from '../src/Pages/UserDashboard/UserDashboard'
import AuthRoute from '../src/routes/AuthRoute'
import PrivateRoute from '../src/routes/PrivateRoute'
import UserOverview from '../src/Pages/UserDashboard/UserOverview'
import UserProfile from '../src/Pages/UserDashboard/UserProfile'
import AdminDashboard from '../src/Pages/Admin/adminDashboard'
import AdminProducts from '../src/Pages/Admin/adminProduct'

const App = () => {
  return(
    <div>
      <Toaster position="top-left" />
      <Routes>
        <Route path="/" element={<HomePage />} />
      <Route element={<AuthRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/otp" element={<OtpVerify />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/otpReset" element={<OtpReset />} />
        <Route path="/changePassword" element={<ChangePassword />} />
      </Route>

      <Route element={<PrivateRoute />}>
          <Route path="/UserDashboard" element={<UserDashboard />}>
            {/* Jab user /UserDashboard par aaye toh automatic Overview khule */}
            <Route index element={<UserOverview />} /> 
            <Route path="Overview" element={<UserOverview />} />
            {/* <Route path="orders" element={<OrdersPlaceholder />} /> */}
            <Route path="profile" element={<UserProfile />} />
          </Route>

          <Route path="/adminDashboard" element={<AdminDashboard />}>
            <Route index element={<AdminProducts />} /> {/* Default load */}
            {/* <Route path="Overview" element={<AdminOverviewPlaceholder />} />
            <Route path="adminProducts" element={<AdminProducts />} />
            <Route path="Users" element={<AdminUsersPlaceholder />} /> */}
          </Route>
        </Route>
      </Routes>
    </div>
  )
}



export default App