import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchFlowerBoquets, addFlowerBoquet, updateFlowerBoquet, deleteFlowerBoquet } from "../../api/FlowerBoquetApi";
import { FlowerBoquet } from "../../types/types";

// Async Thunks for API Calls
export const fetchFlowerBoquetsThunk = createAsyncThunk("flowerBoquet/fetchFlowerBoquets", async () => {
  return await fetchFlowerBoquets();
});

export const addFlowerBoquetThunk = createAsyncThunk("flowerBoquet/addFlowerBoquet", async (flowerBoquet: Omit<FlowerBoquet, "id">) => {
  return await addFlowerBoquet(flowerBoquet);
});

export const updateFlowerBoquetThunk = createAsyncThunk("flowerBoquet/updateFlowerBoquet", async (flowerBoquet: FlowerBoquet) => {
  return await updateFlowerBoquet(flowerBoquet);
});

export const deleteFlowerBoquetThunk = createAsyncThunk("flowerBoquet/deleteFlowerBoquet", async (id: string) => {
  await deleteFlowerBoquet(id);
  return id;
});

// Define Initial State
interface FlowerBoquetState {
  flowerBoquets: FlowerBoquet[];
  status: "idle" | "loading" | "failed";
}

const initialState: FlowerBoquetState = {
  flowerBoquets: [],
  status: "idle",
};

// Create Redux Slice
const flowerBoquetSlice = createSlice({
  name: "flowerBoquet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlowerBoquetsThunk.fulfilled, (state, action: PayloadAction<FlowerBoquet[]>) => {
        state.flowerBoquets = action.payload;
      })
      .addCase(addFlowerBoquetThunk.fulfilled, (state, action: PayloadAction<FlowerBoquet>) => {
        state.flowerBoquets.push(action.payload);
      })
      .addCase(updateFlowerBoquetThunk.fulfilled, (state, action: PayloadAction<FlowerBoquet>) => {
        const index = state.flowerBoquets.findIndex((f) => f.id === action.payload.id);
        if (index !== -1) {
          state.flowerBoquets[index] = action.payload;
        }
      })
      .addCase(deleteFlowerBoquetThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.flowerBoquets = state.flowerBoquets.filter((f) => f.id !== action.payload);
      });
  },
});

export default flowerBoquetSlice.reducer;