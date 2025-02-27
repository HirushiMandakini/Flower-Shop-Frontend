import axios from "axios";
import { FlowerBoquet } from "../types/types";

const API_URL = "http://localhost:4000/flowerBouquet"; // Replace with correct backend URL

// Fetch all flower bouquets
export const fetchFlowerBoquets = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};

// Add a new flower bouquet
export const addFlowerBoquet = async (flowerBoquet: Omit<FlowerBoquet, "id">) => {
  const response = await axios.post(`${API_URL}/add`, flowerBoquet);
  return response.data;
};

// Update an existing flower bouquet
export const updateFlowerBoquet = async (flowerBoquet: FlowerBoquet) => {
  const response = await axios.put(`${API_URL}/update/${flowerBoquet.id}`, flowerBoquet);
  return response.data;
};

// Delete a flower bouquet
export const deleteFlowerBoquet = async (id: string) => {
  await axios.delete(`${API_URL}/delete/${id}`);
};