import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // Strict destructured import declaration

// Khizex Recovery API Response contract definition
interface ForgotPasswordResponse {
  message?: string;
}

const ForgotPassword: React.FC = () => {
  const API: string = (import.meta.env.VITE_API_URL as string) || "";

  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const forgotHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    setLoading(true);
    try {
      const URL = `${API}/api/auth/forgot-password`;
      // Enforcing structural type safety on data metrics responses
      const res = await axios.post<ForgotPasswordResponse>(URL, { email });

      toast.success(res.data.message || "OTP sent to your email");
      
      // Verification target routing flow:
      // navigate("/otp", { state: { email, from: "forgotPassword" } });

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data?.message;
        toast.error(typeof serverMessage === "string" ? serverMessage : "Server not responding");
      } else {
        toast.error("An unexpected validation failure occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] px-4 selection:bg-emerald-500 selection:text-slate-900 relative overflow-hidden">
      
      {/* Tech Ambiance Deep Overlay Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Premium Visual Frame Card Container */}
      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 p-8 rounded-2xl shadow-2xl z-10">
        <h2 className="text-2xl font-bold text-white tracking-tight text-center">
          Recovery
        </h2>
        <p className="text-sm text-slate-400 text-center mt-2 mb-8">
          Enter your email to receive a password reset OTP 
        </p>

        <form onSubmit={forgotHandler} className="space-y-5">
          {/* Email Processing Control Field */}
          <div className="relative">
            <input
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-xl focus:outline-none focus:border-emerald-500/80 transition-colors text-sm"
            />
          </div>

          {/* Action Execution Trigger Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>

          {/* Core Auth Redirection Link */}
          <div className="pt-2 text-xs text-center">
            <Link to="/login" className="text-slate-400 hover:text-emerald-400 transition-colors">
              Back to <span className="underline decoration-emerald-500/40 font-medium">Login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;