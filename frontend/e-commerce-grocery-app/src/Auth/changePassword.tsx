import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast"; // Strict destructured import declaration

// Khizex Auth Response Contract mapping
interface ChangePasswordResponse {
  message?: string;
}

const ChangePassword: React.FC = () => {
  const API: string = (import.meta.env.VITE_API_URL as string) || "";

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token: string | null = searchParams.get("q");

  const validatePassword = (pwd: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pwd);
  };

  const changeHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!validatePassword(password)) {
      toast.error("Password must include: Uppercase, Lowercase, Number & Special Char (Min 8)");
      return;
    }
    if (!token) {
      toast.error("Invalid or expired reset token link");
      return;
    }

    setLoading(true);
    try {
      const URL = `${API}/api/auth/change-password`;
      // Enforcing type contract on dynamic post execution data parameters
      const res = await axios.post<ChangePasswordResponse>(URL, { password, token });
      
      toast.success(res.data.message || "Password changed successfully!");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data?.message;
        toast.error(typeof serverMessage === "string" ? serverMessage : "Server not responding");
      } else {
        toast.error("An unexpected engine validation fault occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] px-4 selection:bg-emerald-500 selection:text-slate-900 relative overflow-hidden">
      
      {/* Background Deep Overlay Tech Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Premium Visual Frame Glassmorphic Card Container */}
      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 p-8 rounded-2xl shadow-2xl z-10">
        <h2 className="text-2xl font-bold text-white tracking-tight text-center">
          Secure Reset
        </h2>
        <p className="text-sm text-slate-400 text-center mt-2 mb-8">
          Enter your new credentials below
        </p>

        <form onSubmit={changeHandler} className="space-y-5">
          {/* New Password Input Field */}
          <div className="relative">
            <input
              type="password"
              required
              placeholder="New Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-xl focus:outline-none focus:border-emerald-500/80 transition-colors text-sm"
            />
          </div>

          {/* Confirm Password Input Field */}
          <div className="relative">
            <input
              type="password"
              required
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-xl focus:outline-none focus:border-emerald-500/80 transition-colors text-sm"
            />
          </div>

          {/* Premium Animated-looking Tech Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;