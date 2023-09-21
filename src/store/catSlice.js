import { createSlice } from "@reduxjs/toolkit";
import { catApi } from "../api/catsApiService";

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
  extraReducers: {
    [catApi.endpoints.getCat.reducerPath]: (builder) => {
      builder.getExtraArguments = (state) => {
        return {
          search: state.search,
        };
      };
    },
  },
});

export const { setSearch } = catSlice.actions;

export default catSlice.reducer;