import axios from "axios";
import { Order } from "../types/types";

const API_URL = "http://localhost:4000/order"; // Replace with backend API URL

// Fetch all orders
export const fetchOrders = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};

// Add new order (Backend generates the ID)
export const addOrder = async (order: Omit<Order, "id">) => {
  const response = await axios.post(`${API_URL}/add`, order);
  return response.data;
};

// Update order
export const updateOrder = async (order: Order) => {
  const response = await axios.put(`${API_URL}/update/${order.id}`, order);
  return response.data;
};

// Delete order
export const deleteOrder = async (id: string) => {
  await axios.delete(`${API_URL}/delete/${id}`);
};