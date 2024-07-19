import { createSlice } from "@reduxjs/toolkit";

const dataFetchSlice = createSlice({
  name: "data fetch slice",
  initialState: {
    isDataFetched: false,
  },
  reducers: {
    setIsDataFetchedToTrue: (state) => {
      state.isDataFetched = true;
    },
  },
});

export const { setIsDataFetchedToTrue } = dataFetchSlice.actions;
export default dataFetchSlice.reducer;
