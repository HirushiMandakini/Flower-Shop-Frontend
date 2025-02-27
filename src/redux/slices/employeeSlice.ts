import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchEmployees, addEmployee, updateEmployee, deleteEmployee } from "../../api/employeeApi";
import { Employee } from "../../types/types";

// Fetch employees from backend
export const fetchEmployeesThunk = createAsyncThunk("employee/fetchEmployees", async () => {
  return await fetchEmployees();
});

// Add new employee
export const addEmployeeThunk = createAsyncThunk("employee/addEmployee", async (employee: Omit<Employee, "id">) => {
  return await addEmployee(employee);
});

// Update employee
export const updateEmployeeThunk = createAsyncThunk("employee/updateEmployee", async (employee: Employee) => {
  return await updateEmployee(employee);
});

// Delete employee
export const deleteEmployeeThunk = createAsyncThunk("employee/deleteEmployee", async (id: string) => {
  await deleteEmployee(id);
  return id;
});

// Employee state interface
interface EmployeeState {
  employees: Employee[];
  status: "idle" | "loading" | "failed";
}

const initialState: EmployeeState = {
  employees: [],
  status: "idle",
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeesThunk.fulfilled, (state, action: PayloadAction<Employee[]>) => {
        state.employees = action.payload;
      })
      .addCase(addEmployeeThunk.fulfilled, (state, action: PayloadAction<Employee>) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployeeThunk.fulfilled, (state, action: PayloadAction<Employee>) => {
        const index = state.employees.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(deleteEmployeeThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.employees = state.employees.filter((e) => e.id !== action.payload);
      });
  },
});

export default employeeSlice.reducer;