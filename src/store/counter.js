import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, toggle: true };

const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment: (state, action) => {
      state.counter = state.counter + +action.payload.step;
    },
    decrement: (state, action) => {
      state.counter = state.counter - +action.payload.step;
    },
    toggle: (state) => {
      state.toggle = !state.toggle;
    },
    initializeCounter: (state) => {
      state.counter = 0;
    },
  },
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
