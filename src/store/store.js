import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filtersSlice";

const store = configureStore({
  reducer: {
    filters: filtersReducer, // Kết hợp reducer filters
  },
});

export default store;
