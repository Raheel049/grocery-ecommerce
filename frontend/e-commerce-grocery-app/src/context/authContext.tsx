import React, { useEffect, useState, } from "react";
import type { UserType } from "./useAuth.js";
import { AuthContext } from "./useAuth.js";
import axiosInstance from "../api/axiosInstance.js";
import type { ReactNode } from "react";

const API = import.meta.env.VITE_API_URL;

// Children prop ke liye type define karien
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // States ko sahi types assign karein
  const [user, setUser] = useState<UserType | null>(null);
  // Initial loading ko true rakhein taaki checkAuthState chalne tak app wait kare
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const response = await axiosInstance.get(`${API}/api/auth/get-me`);
        
        // Response data check aur state update
        if (response.data?.status && response.data?.user) {
          // Note: Agar aapka backend user data response.data.user mein bhejta hai to use set karein
          setUser(response.data.user || response.data.data);
        } else {
          setUser(null);
        }
      } catch (error: any) {
        setUser(null);
        console.error("Auth state check failed:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const login = (userData: UserType): void => {
    setUser(userData);
  };

  const logout = async (): Promise<void> => {
    try {
      await axiosInstance.post(`${API}/auth/logout`);
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        isAuthenticated: !!user, 
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
