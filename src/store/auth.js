import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { isLoggedIn: false };

const loggingSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const authActions = loggingSlice.actions;

export default loggingSlice.reducer;
