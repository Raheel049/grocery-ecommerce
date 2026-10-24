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
        // Apne customized axiosInstance se hi refresh call karein taaki base URL aur options standard rahein
        await axiosInstance.post("/api/auth/refresh-token", {});

        // Refresh kamyab hone ke baad purani request ko dobara run karein
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Agar refresh token bhi expire/invalid ho chuka hai to user ko logout karein
        console.error("Refresh token failed:", refreshError);
        
        // redirect to login safely
        if (typeof window !== "undefined") {
          localStorage.clear();
          window.location.href = "/login"; 
        }
        
        return Promise.reject(refreshError); // Console.log ki jagah reject lazmi hai
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
