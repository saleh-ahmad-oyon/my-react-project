import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/redux/features/counter";
import cartReducer from "@/redux/features/cart";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;