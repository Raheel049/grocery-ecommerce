import axiosInstance from "../api/axiosInstance.js";
export const getSessions = async () => {
    const response = await axiosInstance.get("/api/session/get-all-session");
    return response.data;
};
export const logoutDevice = async (id) => {
    const response = await axiosInstance.delete(`/api/session/logout-device/${id}`);
    return response.data;
};
export const logoutAllDevices = async () => {
    const response = await axiosInstance.delete("/api/session/logout-all-device");
    return response.data;
};
