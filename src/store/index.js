import { configureStore } from "@reduxjs/toolkit";
import showCartReducer from "./cartshow";
import cartContentReducer from "./cartitem";

const store = configureStore({
  reducer: {
    showCart: showCartReducer,
    cartContent: cartContentReducer,
  },
});

export default store;
