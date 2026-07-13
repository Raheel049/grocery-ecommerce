import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


// Khizex Strict API Response Contract mapping
interface LoginResponse {
  accessToken: string;  // Explicitly expected properties
  refreshToken: string;
  role: "Admin" | "Customer";
  message?: string;
}

const Login: React.FC = () => {
  const API: string = (import.meta.env.VITE_API_URL as string) || "";
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const URL = `${API}/api/auth/login`;
      
      // Enforcing type contract on standard data parameters
      const res = await axios.post<LoginResponse>(URL, { email, password }, {
        withCredentials: true // 👈 Yeh line login request ke sath bhi honi chahiye taake response cookies browser capture kar sake
      });

      
      
      // Kuch cases ya older configurations ke liye role ko browser state storage me rakhein
      localStorage.setItem("userRole", res.data.role);
      localStorage.setItem("isLoggedIn", "true");
      console.log(res)
      
      // Safe invocation of toast.success
      toast.success(res.data.message || "Welcome back!");

      const role = res.data.role;

      // Role-Based Redirection matched exactly with criteria
      if (role === "Admin") {
        navigate("/AdminDashboard"); // Protected Admin View
      } else {
        navigate("/UserDashboard/UserOverview"); // Main Public Grocery Catalogs
      }
      
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data?.message;
        toast.error(typeof serverMessage === "string" ? serverMessage : "Invalid credentials");
      } else {
        toast.error("An unexpected validation failure occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] px-4 selection:bg-emerald-500 selection:text-slate-900 relative overflow-hidden">
      
      {/* Background Tech Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Premium Glassmorphic Card Container */}
      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 p-8 rounded-2xl shadow-2xl z-10">
        <h2 className="text-2xl font-bold text-white tracking-tight text-center">
          Ecommerce Grocery Platform
        </h2>
        <p className="text-sm text-slate-400 text-center mt-2 mb-8">
          Sign in to access your dashboard
        </p>

        <form onSubmit={loginHandler} className="space-y-5">
          {/* Email Input Field */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              placeholder="Email Address"
              className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-xl focus:outline-none focus:border-emerald-500/80 transition-colors text-sm"
            />
          </div>

          {/* Password Input Field */}
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-xl focus:outline-none focus:border-emerald-500/80 transition-colors text-sm"
            />
          </div>

          {/* Premium Animated-looking Tech Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
          >
            {loading ? "Verifying..." : "Login"}
          </button>

          {/* Footer Auth Links */}
          <div className="flex items-center justify-between pt-2 text-xs">
            <Link to="/signUp" className="text-slate-400 hover:text-emerald-400 transition-colors">
              New here? <span className="underline decoration-emerald-500/40">Create Account</span>
            </Link>
            <Link to="/forgotPassword" className="text-slate-500 hover:text-slate-300 transition-colors">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;