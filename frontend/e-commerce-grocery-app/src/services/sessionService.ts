import axiosInstance from "../api/axiosInstance.js";

export const getSessions = async () => {

    const response = await axiosInstance.get("/api/session/get-all-session");

    return response.data;
};

export const logoutDevice = async (id:string) => {

    const response = await axiosInstance.delete(`/api/session/${id}`);

    return response.data;
};

export const logoutAllDevices = async () => {

    const response = await axiosInstance.delete("/api/session/logout-all");

    return response.data;
};