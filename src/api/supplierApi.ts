import axios from "axios";
import { Supplier } from "../types/types";

const API_URL = "http://localhost:4000/supplier"; // Backend API URL

// Fetch all suppliers
export const fetchSuppliers = async () => {
  const response = await axios.get(`${API_URL}/getall`);
  return response.data;
};

// Add new supplier (Backend generates the ID)
export const addSupplier = async (supplier: Omit<Supplier, "id">) => {
  const response = await axios.post(`${API_URL}/add`, supplier);
  return response.data;
};

// Update supplier
export const updateSupplier = async (supplier: Supplier) => {
  const response = await axios.put(`${API_URL}/update/${supplier.id}`, supplier);
  return response.data;
};

// Delete supplier
export const deleteSupplier = async (id: string) => {
  await axios.delete(`${API_URL}/delete/${id}`);
};