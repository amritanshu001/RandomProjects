import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartToggle: false, notificationData: null };

const showCartSlice = createSlice({
  name: "showCart",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.cartToggle = !state.cartToggle;
    },
    showNotification: (state, action) => {
      state.notificationData = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    clearNotification: (state) => {
      state.notificationData = null;
    },
  },
});

export const cartToggleActions = showCartSlice.actions;

export default showCartSlice.reducer;
