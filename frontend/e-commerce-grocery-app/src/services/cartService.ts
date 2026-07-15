import axiosInstance from "../api/axiosInstance.js";
import type { Cart } from "../types/cart.js";

export const getCart = async (): Promise<Cart> => {
    const response = await axiosInstance.get(
      `/api/cart/get-cart`
    );
  
    return response.data.data;
  };

export const addToCart = async (
  productId: string,
  quantity: number
) => {
  const response = await axiosInstance.post("/api/cart/add-to-cart", {
    productId,
    quantity,
  });

  return response.data;
};

export const increaseItem = async (productId: string) => {
    const response = await axiosInstance.patch(
      `/api/cart/increase-item/${productId}`
    );
  
    return response.data;
  };
  
  export const decreaseItem = async (productId: string) => {
    const response = await axiosInstance.patch(
      `/api/cart/decrease-item/${productId}`
    );
  
    return response.data;
  };
  
  export const removeItem = async (productId: string) => {
    const response = await axiosInstance.delete(
      `/api/cart/remove-item/${productId}`
    );
  
    return response.data;
  };