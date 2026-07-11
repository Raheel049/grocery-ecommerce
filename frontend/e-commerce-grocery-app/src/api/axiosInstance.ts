import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";

const API_BASE_URL: string = (import.meta.env.VITE_API_URL as string) || "http://localhost:5000";

const privateAPI: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

privateAPI.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🚀 FIX: In endpoints par refresh token trigger nahi hona chahiye
    const bypassEndpoints = ["/api/auth/login", "/api/auth/sign-up"];
    
    // Check karein agar request URL in bypass endpoints me se koi ek hai
    const isBypassRoute = bypassEndpoints.some(url => originalRequest.url?.includes(url));

    // Agar 401 error hai, pehle retry nahi hua, AUR yeh login/signup ki request NAHI hai
    if (error.response?.status === 401 && !originalRequest._retry && !isBypassRoute) {
      originalRequest._retry = true;

      try {
        // Silent refresh attempt
        await axios.post(`${API_BASE_URL}/api/auth/refresh-token`, {}, { withCredentials: true });
        
        // Main request retry karein
        return privateAPI(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userRole");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Agar login/signup par 401 aaya hai, toh direct error response components tak jaane dein (bina refresh chalaye)
    return Promise.reject(error);
  }
);

export default privateAPI;