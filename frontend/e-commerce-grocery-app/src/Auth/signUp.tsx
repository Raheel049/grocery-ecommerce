import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // Strict destructured import declaration

// Khizex API Sign-Up Response structural layout definition
interface SignUpResponse {
  status: boolean;
  message?: string;
}

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handlePasswordChange = (val: string): void => {
    setPassword(val);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!val) {
      setPasswordError("");
    } else if (!passwordRegex.test(val)) {
      setPasswordError("8+ chars, Uppercase, Lowercase, Number & Special Character");
    } else {
      setPasswordError("");
    }
  };

  const signUpHandler = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault(); // Prevents layout page flashes on dynamic post execution

    if (passwordError || !password) {
      toast.error("Please enter a valid password first!");
      return;
    }

    const API: string = (import.meta.env.VITE_API_URL as string) || "";
    setLoading(true);

    const userObj = { name, phoneNumber, email, password };
    const URL = `${API}/api/auth/signup`;

    try {
      // API call with dynamic execution mappings contract
      const res = await axios.post<SignUpResponse>(URL, userObj);
      toast.success(res.data.message || "SignUp Successful!");

      if (res.data.status === true) {
        navigate("/otp", { state: { email } });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data?.message;
        toast.error(typeof serverMessage === "string" ? serverMessage : "SignUp failed");
      } else {
        toast.error("An unexpected engine fault validation occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] px-4 selection:bg-emerald-500 selection:text-slate-900 relative overflow-hidden">
      
      {/* Background Dynamic Blur Effect */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Agency-Grade Premium Glassmorphic Layout Container */}
      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 p-8 rounded-2xl shadow-2xl z-10">
        <h2 className="text-2xl font-bold text-white tracking-tight text-center">
          Create Account
        </h2>
        <p className="text-sm text-slate-400 text-center mt-2 mb-8">
          Join our premium e-commerce grocery network
        </p>

        <form onSubmit={signUpHandler} className="space-y-5">
          {/* Full Name Input */}
          <div>
            <input
              type="text"
              required
              placeholder="Full Name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              value={name}
              className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-xl focus:outline-none focus:border-emerald-500/80 transition-colors text-sm"
            />
          </div>

          {/* Phone Number Input */}
          <div>
            <input
              type="text"
              required
              placeholder="Phone Number"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-xl focus:outline-none focus:border-emerald-500/80 transition-colors text-sm"
            />
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              required
              placeholder="Email Address"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              value={email}
              className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-xl focus:outline-none focus:border-emerald-500/80 transition-colors text-sm"
            />
          </div>

          {/* Password Input with Dynamic Validation Framework */}
          <div>
            <input
              type="password"
              required
              placeholder="Password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePasswordChange(e.target.value)}
              value={password}
              className={`w-full px-4 py-3 bg-slate-950/50 border text-slate-100 placeholder:text-slate-500 rounded-xl focus:outline-none transition-colors text-sm ${
                passwordError ? "border-rose-500/50 focus:border-rose-500" : "border-slate-800 focus:border-emerald-500/80"
              }`}
            />
            {passwordError && (
              <p className="text-[11px] text-rose-400 mt-1.5 ml-1 font-medium leading-normal animate-pulse">
                {passwordError}
              </p>
            )}
          </div>

          {/* Switch View Trigger Layout Link */}
          <div className="pt-1 text-xs text-center">
            <Link to="/login" className="text-slate-400 hover:text-emerald-400 transition-colors">
              Already have an account? <span className="underline decoration-emerald-500/40 font-medium">Login</span>
            </Link>
          </div>

          {/* Action Trigger Button */}
          <button 
            type="submit" 
            disabled={loading || !!passwordError}
            className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
          >
            {loading ? "Creating..." : "SignUp"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;