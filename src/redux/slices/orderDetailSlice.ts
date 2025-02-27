import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchOrderDetails, addOrderDetail, updateOrderDetail, deleteOrderDetail } from "../../api/orderDetailApi";
import { OrderDetail } from "../../types/types";

// Fetch order details from backend
export const fetchOrderDetailsThunk = createAsyncThunk("orderDetail/fetchOrderDetails", async () => {
  return await fetchOrderDetails();
});

// Add new order detail (without `id`, since backend auto-generates)
export const addOrderDetailThunk = createAsyncThunk("orderDetail/addOrderDetail", async (orderDetail: Omit<OrderDetail, "id">) => {
  return await addOrderDetail(orderDetail);
});

// Update order detail
export const updateOrderDetailThunk = createAsyncThunk("orderDetail/updateOrderDetail", async (orderDetail: OrderDetail) => {
  return await updateOrderDetail(orderDetail);
});

// Delete order detail
export const deleteOrderDetailThunk = createAsyncThunk("orderDetail/deleteOrderDetail", async (id: string) => {
  await deleteOrderDetail(id);
  return id;
});

// Order Detail state interface
interface OrderDetailState {
  orderDetails: OrderDetail[];
  status: "idle" | "loading" | "failed";
}

const initialState: OrderDetailState = {
  orderDetails: [],
  status: "idle",
};

const orderDetailSlice = createSlice({
  name: "orderDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDetailsThunk.fulfilled, (state, action: PayloadAction<OrderDetail[]>) => {
        state.orderDetails = action.payload;
      })
      .addCase(addOrderDetailThunk.fulfilled, (state, action: PayloadAction<OrderDetail>) => {
        state.orderDetails.push(action.payload);
      })
      .addCase(updateOrderDetailThunk.fulfilled, (state, action: PayloadAction<OrderDetail>) => {
        const index = state.orderDetails.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) {
          state.orderDetails[index] = action.payload;
        }
      })
      .addCase(deleteOrderDetailThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.orderDetails = state.orderDetails.filter((o) => o.id !== action.payload);
      });
  },
});

export default orderDetailSlice.reducer;