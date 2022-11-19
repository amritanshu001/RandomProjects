import { configureStore } from "@reduxjs/toolkit";

import CounterReducer from "./counter";
import AuthReducer from "./auth";

const store = configureStore({
  reducer: { counter: CounterReducer, auth: AuthReducer },
});

export default store;
