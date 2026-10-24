import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Yeh cross-domain cookies bhejne ke liye lazmi hai
  headers: {
    "Content-Type": "application/json"
  }
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // 401 Unauthorized check aur verify karna ke yeh refresh ya login route nahi hai
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/api/auth/login") &&
      !originalRequest.url?.includes("/api/auth/refresh-token")
    ) {
      originalRequest._retry = true;

      try {
        await axiosInstance.post("/api/auth/refresh-token", {});
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        
        if (typeof window !== "undefined") {
          localStorage.clear();
          
          // Loop se bachne ke liye: Agar user pehle se login page par nahi hai, sirf tabhi redirect karein
          if (!window.location.pathname.includes("/login")) {
            window.location.href = "/login"; 
          }
        }
        
        return Promise.reject(refreshError);
      }

    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
