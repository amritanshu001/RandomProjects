import { createSlice } from "@reduxjs/toolkit";

const initialState = { allQuotes: [] };

const quoteSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    addQuote: (state, action) => {
      state.allQuotes.push(action.payload.quote);
    }
  },
});

export const quoteActions = quoteSlice.actions;

export default quoteSlice.reducer;
