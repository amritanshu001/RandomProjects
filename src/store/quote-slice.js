import { createSlice } from "@reduxjs/toolkit";

const initialState = { allQuotes: [] };

const quoteSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    addQuote: (state, action) => {
      state.allQuotes.push(action.payload.quote);
    },
    replaceQuotesyFromServer: (state, action) => {
      state.allQuotes = action.payload.quotes;
    },
  },
});

export const quoteActions = quoteSlice.actions;

export default quoteSlice.reducer;
