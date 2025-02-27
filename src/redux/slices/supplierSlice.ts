// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// // Define the Supplier interface
// interface Supplier {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
// }

// // Define the SupplierState interface
// interface SupplierState {
//   suppliers: Supplier[];
// }

// // Retrieve suppliers from local storage
// const loadSuppliersFromLocalStorage = (): Supplier[] => {
//   const storedSuppliers = localStorage.getItem("suppliers");
//   return storedSuppliers ? JSON.parse(storedSuppliers) : [];
// };

// // Initial state with local storage support
// const initialState: SupplierState = {
//   suppliers: loadSuppliersFromLocalStorage(),
// };

// // Save suppliers to local storage
// const saveSuppliersToLocalStorage = (suppliers: Supplier[]) => {
//   localStorage.setItem("suppliers", JSON.stringify(suppliers));
// };

// const supplierSlice = createSlice({
//   name: "supplier",
//   initialState,
//   reducers: {
//     addSupplier: (state, action: PayloadAction<Supplier>) => {
//       state.suppliers.push(action.payload);
//       saveSuppliersToLocalStorage(state.suppliers);
//     },
//     updateSupplier: (state, action: PayloadAction<Supplier>) => {
//       const index = state.suppliers.findIndex((s) => s.id === action.payload.id);
//       if (index !== -1) {
//         state.suppliers[index] = action.payload;
//         saveSuppliersToLocalStorage(state.suppliers);
//       }
//     },
//     deleteSupplier: (state, action: PayloadAction<number>) => {
//       state.suppliers = state.suppliers.filter((s) => s.id !== action.payload);
//       saveSuppliersToLocalStorage(state.suppliers);
//     },
//   },
// });

// export const { addSupplier, updateSupplier, deleteSupplier } = supplierSlice.actions;
// export default supplierSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchSuppliers, addSupplier, updateSupplier, deleteSupplier } from "../../api/supplierApi";
import { Supplier } from "../../types/types";

// ✅ Fetch suppliers from backend
export const fetchSuppliersThunk = createAsyncThunk("supplier/fetchSuppliers", async () => {
  return await fetchSuppliers();
});

// ✅ Add new supplier (without `id`, since backend auto-generates)
export const addSupplierThunk = createAsyncThunk("supplier/addSupplier", async (supplier: Omit<Supplier, "id">) => {
  return await addSupplier(supplier);
});

// ✅ Update supplier
export const updateSupplierThunk = createAsyncThunk("supplier/updateSupplier", async (supplier: Supplier) => {
  return await updateSupplier(supplier);
});

// ✅ Delete supplier
export const deleteSupplierThunk = createAsyncThunk("supplier/deleteSupplier", async (id: string) => {
  await deleteSupplier(id);
  return id;
});

// Redux State Interface
interface SupplierState {
  suppliers: Supplier[];
  status: "idle" | "loading" | "failed";
}

const initialState: SupplierState = {
  suppliers: [],
  status: "idle",
};

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliersThunk.fulfilled, (state, action: PayloadAction<Supplier[]>) => {
        state.suppliers = action.payload;
      })
      .addCase(addSupplierThunk.fulfilled, (state, action: PayloadAction<Supplier>) => {
        state.suppliers.push(action.payload);
      })
      .addCase(updateSupplierThunk.fulfilled, (state, action: PayloadAction<Supplier>) => {
        const index = state.suppliers.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.suppliers[index] = action.payload;
        }
      })
      .addCase(deleteSupplierThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.suppliers = state.suppliers.filter((s) => s.id !== action.payload);
      });
  },
});

// ✅ Export the reducer
export default supplierSlice.reducer;
