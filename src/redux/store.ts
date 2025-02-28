import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slices/customerSlice";
import employeeReducer from "./slices/employeeSlice";
import flowerBoquetReducer from "./slices/flowerBoquetSlice";
import orderReducer from "./slices/orderSlice";
import orderDetailReducer from "./slices/orderDetailSlice";
import supplierReducer from "./slices/supplierSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    employee: employeeReducer,
    flowerBoquet: flowerBoquetReducer,
    order: orderReducer,
    orderDetail: orderDetailReducer,
    supplier: supplierReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
