import React, { useEffect, useState } from "react";
import api from "../api/client";
import { AuthContext } from "./useAuth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const response = await api.get("/auth/get-me");
        if (response.data?.status && response.data?.user) {
          setUser(response.data.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{user, isLoading, isAuthenticated: !!user, login, logout}}>
        {children}
    </AuthContext.Provider>
  )
};
