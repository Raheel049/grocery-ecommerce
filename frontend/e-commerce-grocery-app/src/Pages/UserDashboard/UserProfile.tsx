import React, { useState, useEffect } from "react";
import { User, Mail, ShieldAlert, CheckCircle, Phone, Globe, Clock, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance.js";

// Backend API response contracts matching mapping
interface ProfileData {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  avatar?: string;
  provider?: string;
  language?: string;
  timezone?: string;
}

interface ApiResponse<T> {
  message: string;
  data: T;
  status?: boolean;
}

const UserProfile: React.FC = () => {
  // Main form and visual states
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [timezone, setTimezone] = useState<string>("");
  
  const [fetching, setFetching] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);

  // 🚀 1. Fetch Profile Data on view mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosInstance.get<ApiResponse<ProfileData>>("/api/profile/get-profile");
        const userData = response.data.data;
        
        setProfile(userData);
        setName(userData.name || "");
        setPhoneNumber(userData.phoneNumber || "");
        setLanguage(userData.language || "English");
        setTimezone(userData.timezone || "GMT+5");
        
        // Dynamic state mapping back to client headers
        if (userData.name) localStorage.setItem("userName", userData.name);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to load user profile variables.");
      } finally {
        setFetching(false);
      }
    };

    fetchProfileData();
  }, []);

  // 🚀 2. Update Profile Data Handler
  const updateProfileHandler = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setUpdating(true);

    try {
      const payload = {
        name,
        phoneNumber,
        language,
        timezone
      };

      const response = await axiosInstance.patch<ApiResponse<ProfileData>>("/api/profile/update-profile", payload);
      
      toast.success(response.data.message || "Profile configurations optimized!");
      setProfile(response.data.data);
      
      // Update top navbar dynamically
      localStorage.setItem("userName", name);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Validation criteria injection failed.");
    } finally {
      setUpdating(false);
    }
  };

  // Skeleton Loader screen state wrapper
  if (fetching) {
    return (
      <div className="h-96 flex items-center justify-center text-slate-400 font-medium text-sm gap-2">
        <Loader2 className="animate-spin text-violet-500" size={20} />
        Syncing Identity Framework...
      </div>
    );
  }

  return (
    <div className="space-y-8 relative">
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* View Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white via-slate-200 to-slate-400 tracking-tight">
          Account Control
        </h2>
        <p className="text-xs text-slate-400 mt-1.5 font-medium tracking-wide">
          Manage your dynamic security settings parameters and personal grocery addresses.
        </p>
      </div>

      {/* Main Grid Splitting Layout Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Side: Input Form Module */}
        <div className="lg:col-span-2 bg-slate-950/40 border border-slate-800/60 p-6 md:p-8 rounded-2xl backdrop-blur-xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-violet-500/40 via-cyan-500/40 to-transparent" />
          <h3 className="text-base font-bold text-white tracking-tight mb-6">Profile Settings</h3>
          
          <form onSubmit={updateProfileHandler} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input 
                    type="text" value={name} onChange={(e) => setName(e.target.value)} required
                    className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-800 text-white placeholder:text-slate-600 rounded-xl focus:outline-none focus:border-violet-500/80 transition-colors text-sm font-medium" 
                  />
                </div>
              </div>
              
              {/* Email (Disabled/Read-Only) */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input 
                    type="email" value={profile?.email || ""} disabled
                    className="w-full pl-11 pr-4 py-3 bg-slate-950/40 border border-slate-900/80 text-slate-500 rounded-xl focus:outline-none text-sm font-medium cursor-not-allowed shadow-inner" 
                  />
                </div>
              </div>

              {/* Phone Number Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input 
                    type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Add Phone Number"
                    className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-800 text-white placeholder:text-slate-600 rounded-xl focus:outline-none focus:border-violet-500/80 transition-colors text-sm font-medium" 
                  />
                </div>
              </div>

              {/* Language Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Preferred Language</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input 
                    type="text" value={language} onChange={(e) => setLanguage(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-800 text-white placeholder:text-slate-600 rounded-xl focus:outline-none focus:border-violet-500/80 transition-colors text-sm font-medium" 
                  />
                </div>
              </div>

            </div>

            {/* Timezone Input */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Timezone Cluster</label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="text" value={timezone} onChange={(e) => setTimezone(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-800 text-white placeholder:text-slate-600 rounded-xl focus:outline-none focus:border-violet-500/80 transition-colors text-sm font-medium" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={updating}
              className="mt-4 px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-pink-600 hover:opacity-95 active:scale-[0.98] disabled:opacity-50 transition-all cursor-pointer shadow-lg shadow-violet-500/10 flex items-center gap-2"
            >
              {updating && <Loader2 className="animate-spin" size={14} />}
              {updating ? "Saving Changes..." : "Save Configuration Settings"}
            </button>
          </form>
        </div>

        {/* Right Side: Identity Verification Cards Display Panel */}
        <div className="bg-slate-950/40 border border-slate-800/60 p-6 rounded-2xl backdrop-blur-xl shadow-xl space-y-5">
          <h3 className="text-sm font-bold text-white tracking-tight">Verification Badges</h3>
          
          <div className="p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 flex items-start gap-3">
            <CheckCircle className="text-cyan-400 shrink-0 mt-0.5" size={16} />
            <div>
              <h4 className="text-xs font-bold text-cyan-400">KYC Clearance Pass</h4>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">Your primary authentication level is certified for fast grocery checkouts.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-start gap-3">
            <ShieldAlert className="text-amber-400 shrink-0 mt-0.5" size={16} />
            <div>
              <h4 className="text-xs font-bold text-amber-400">Auth Method</h4>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed uppercase tracking-wider font-semibold">
                Provider: <span className="text-white font-mono">{profile?.provider || "local"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;