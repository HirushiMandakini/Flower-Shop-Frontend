import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchOrders, addOrder, updateOrder, deleteOrder } from "../../api/orderApi";
import { Order } from "../../types/types";

// Fetch orders from backend
export const fetchOrdersThunk = createAsyncThunk("order/fetchOrders", async () => {
  return await fetchOrders();
});

// Add new order (without `id`, since backend auto-generates)
export const addOrderThunk = createAsyncThunk("order/addOrder", async (order: Omit<Order, "id">) => {
  return await addOrder(order);
});

// Update order
export const updateOrderThunk = createAsyncThunk("order/updateOrder", async (order: Order) => {
  return await updateOrder(order);
});

// Delete order
export const deleteOrderThunk = createAsyncThunk("order/deleteOrder", async (id: string) => {
  await deleteOrder(id);
  return id;
});

// Order state interface
interface OrderState {
  orders: Order[];
  status: "idle" | "loading" | "failed";
}

const initialState: OrderState = {
  orders: [],
  status: "idle",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersThunk.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.orders = action.payload;
      })
      .addCase(addOrderThunk.fulfilled, (state, action: PayloadAction<Order>) => {
        state.orders.push(action.payload);
      })
      .addCase(updateOrderThunk.fulfilled, (state, action: PayloadAction<Order>) => {
        const index = state.orders.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(deleteOrderThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.orders = state.orders.filter((o) => o.id !== action.payload);
      });
  },
});

export default orderSlice.reducer;