import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-hot-toast"; // Strict destructured import declaration

// Khizex API Validation Response Contract definition
interface OtpResponse {
  message?: string;
}

// React Router location state dynamic explicit definition
interface LocationState {
  email?: string;
  from?: string;
}

const OtpVerify: React.FC = () => {
  const API: string = (import.meta.env.VITE_API_URL as string) || "";

  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);

  const navigate = useNavigate();
  const location = useLocation();
  
  // Safely cast router contextual states
  const state = location.state as LocationState | null;

  useEffect(() => {
    if (!state?.email) {
      navigate("/");
    }
  }, [state, navigate]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const verifyOtpHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Please enter 6 digit OTP");
      return;
    }
    if (!state?.email) {
      toast.error("Session identity validation failed");
      return;
    }

    setLoading(true);
    try {
      const URL = `${API}/api/auth/verify-otp`;
      const body = {
        otp,
        email: state.email,
      };

      // Enforcing type contract on standard data parameters
      const res = await axios.post<OtpResponse>(URL, body);
      toast.success(res.data.message || "OTP Verified Successfully");
      
      // Target validation redirection logic
      if (state.from === "forgotPassword") {
        navigate(`/change-password?q=${otp}`);
      } else {
        navigate("/login");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data?.message;
        toast.error(typeof serverMessage === "string" ? serverMessage : "Invalid OTP or Server Error");
      } else {
        toast.error("An unexpected execution validation fault occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] px-4 selection:bg-emerald-500 selection:text-slate-900 relative overflow-hidden">
      
      {/* Tech Overlay Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Premium Visual Frame Glassmorphic Card Container */}
      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 p-8 rounded-2xl shadow-2xl z-10">
        <h2 className="text-2xl font-bold text-white tracking-tight text-center">
          OTP Verification
        </h2>
        
        <p className="text-sm text-slate-400 text-center mt-2 mb-8 leading-relaxed">
          Enter the 6 digit code sent to: <br />
          <span className="text-emerald-400 font-medium break-all">{state?.email}</span>
        </p>

        <form onSubmit={verifyOtpHandler} className="space-y-6">
          {/* OTP Processing Control Field */}
          <div className="relative">
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
              placeholder="0 0 0 0 0 0"
              className="w-full text-center tracking-[0.5em] font-mono px-4 py-3 bg-slate-950/50 border border-slate-800 text-slate-100 placeholder:text-slate-600 rounded-xl focus:outline-none focus:border-emerald-500/80 transition-colors text-lg"
            />
          </div>

          {/* Real-time Dynamic Countdown Area */}
          <div className="text-xs text-center text-slate-400">
            {timer > 0 ? (
              <span>
                Resend code in <b className="text-emerald-400 font-semibold">{timer}s</b>
              </span>
            ) : (
              <Link to="/otpReset" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors font-medium">
                Resend OTP
              </Link>
            )}
          </div>

          {/* Action Execution Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Back Link Wrapper Layout */}
        <div className="pt-5 text-center text-xs">
          <Link to="/login" className="text-slate-500 hover:text-slate-300 transition-colors">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;