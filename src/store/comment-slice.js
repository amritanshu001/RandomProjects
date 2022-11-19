import { createSlice } from "@reduxjs/toolkit";

const initialState = { allComments: [] };

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.allComments.push(action.payload.comment);
    },
  },
});

export const commentActions = commentSlice.actions;

export default commentSlice.reducer;
