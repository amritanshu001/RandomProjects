import { configureStore } from "@reduxjs/toolkit";
import quoteSliceReducer from "./quote-slice";
import commentsReducer from "./comment-slice";

const store = configureStore({
  reducer: {
    quotes: quoteSliceReducer,
    comments: commentsReducer,
  },
});

export default store;
