import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchCustomers, addCustomer, updateCustomer, deleteCustomer } from "../../api/customerApi";
import { Customer } from "../../types/types";

// ✅ Fetch customers from backend
export const fetchCustomersThunk = createAsyncThunk("customer/fetchCustomers", async () => {
  return await fetchCustomers();
});

// ✅ Add new customer (without `id`, since backend auto-generates)
export const addCustomerThunk = createAsyncThunk("customer/addCustomer", async (customer: Omit<Customer, "id">) => {
  return await addCustomer(customer);
});

// ✅ Update customer
export const updateCustomerThunk = createAsyncThunk("customer/updateCustomer", async (customer: Customer) => {
  return await updateCustomer(customer);
});

// ✅ Delete customer
export const deleteCustomerThunk = createAsyncThunk("customer/deleteCustomer", async (id: string) => {
  await deleteCustomer(id);
  return id;
});

// Redux State Interface
interface CustomerState {
  customers: Customer[];
  status: "idle" | "loading" | "failed";
}

const initialState: CustomerState = {
  customers: [],
  status: "idle",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomersThunk.fulfilled, (state, action: PayloadAction<Customer[]>) => {
        state.customers = action.payload;
      })
      .addCase(addCustomerThunk.fulfilled, (state, action: PayloadAction<Customer>) => {
        state.customers.push(action.payload);
      })
      .addCase(updateCustomerThunk.fulfilled, (state, action: PayloadAction<Customer>) => {
        const index = state.customers.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.customers[index] = action.payload;
        }
      })
      .addCase(deleteCustomerThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.customers = state.customers.filter((c) => c.id !== action.payload);
      });
  },
});

// ✅ Ensure all thunks are exported properly
export default customerSlice.reducer;