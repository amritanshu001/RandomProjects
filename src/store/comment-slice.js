import { createSlice } from "@reduxjs/toolkit";

const initialState = { allComments: [] };

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.allComments.push(action.payload.comment);
    },
    loadComments: (state, action) => {
      state.allComments = action.payload.comments.filter((comment) => {
        return comment.quoteId === action.payload.quoteId;
      });
    },
  },
});

export const commentActions = commentSlice.actions;

export default commentSlice.reducer;
