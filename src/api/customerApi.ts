import axios from "axios";
import { Customer } from "../types/types";

const API_URL = "http://localhost:4000/customer"; // Replace with backend URL

export const fetchCustomers = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};

// ✅ Do NOT send `id`, backend generates it
export const addCustomer = async (customer: Omit<Customer, "id">) => {
  const response = await axios.post(`${API_URL}/add`, customer);
  return response.data; // Backend returns the customer object with an auto-generated ID
};

export const updateCustomer = async (customer: Customer) => {
  const response = await axios.put(`${API_URL}/update/${customer.id}`, customer);
  return response.data;
};

export const deleteCustomer = async (id: string) => {
  await axios.delete(`${API_URL}/delete/${id}`);
};