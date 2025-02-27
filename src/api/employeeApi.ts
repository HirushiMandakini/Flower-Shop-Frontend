import axios from "axios";
import { Employee } from "../types/types";

const API_URL = "http://localhost:4000/employee"; // Backend API URL

// Fetch all employees
export const fetchEmployees = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};

// Add new employee (Backend generates the ID)
export const addEmployee = async (employee: Omit<Employee, "id">) => {
  const response = await axios.post(`${API_URL}/add`, employee);
  return response.data;
};

// Update employee
export const updateEmployee = async (employee: Employee) => {
  const response = await axios.put(`${API_URL}/update/${employee.id}`, employee);
  return response.data;
};

// Delete employee
export const deleteEmployee = async (id: string) => {
  await axios.delete(`${API_URL}/delete/${id}`);
};