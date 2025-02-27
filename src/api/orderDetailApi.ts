import axios from "axios";
import { OrderDetail } from "../types/types";

const API_URL = "http://localhost:4000/orderDetails"; // Replace with backend API URL

// Fetch all order details
export const fetchOrderDetails = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};

// Add new order detail (Backend generates the ID)
export const addOrderDetail = async (orderDetail: Omit<OrderDetail, "id">) => {
  const response = await axios.post(`${API_URL}/add`, orderDetail);
  return response.data;
};

// Update order detail
export const updateOrderDetail = async (orderDetail: OrderDetail) => {
  const response = await axios.put(`${API_URL}/update/${orderDetail.id}`, orderDetail);
  return response.data;
};

// Delete order detail
export const deleteOrderDetail = async (id: string) => {
  await axios.delete(`${API_URL}/delete/${id}`);
};