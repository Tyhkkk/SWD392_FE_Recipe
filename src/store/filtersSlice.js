import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    ingredients: [],
    category: null,
  },
  reducers: {
    updateFilters: (state, action) => {
      state.ingredients =
        action.payload.ingredients !== undefined
          ? action.payload.ingredients
          : state.ingredients;

      state.category =
        action.payload.category !== undefined ? action.payload.category : state.category;
    },
    clearFilters: (state) => {
      state.ingredients = [];
      state.category = null;
    },
  },
});

export const { updateFilters, clearFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
