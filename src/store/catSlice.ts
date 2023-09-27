import { createSlice } from "@reduxjs/toolkit";

export const catSlice = createSlice({
  name: "cat",
  initialState: {
    search: "",
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = catSlice.actions;

export default catSlice.reducer;