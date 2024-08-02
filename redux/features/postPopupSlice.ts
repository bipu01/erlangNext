import { createSlice } from "@reduxjs/toolkit";

const postPopupSlice = createSlice({
  name: "postPopupSlice",
  initialState: {
    status: 0,
    loading: false,
  },
  reducers: {
    makeSuccessCardVisible: (state) => {
      state.status = 1;
    },
    makeSuccessCardInvisible: (state) => {
      state.status = 0;
    },
    makeFailedCardInvisible: (state) => {
      state.status = 0;
    },
    makeFailedCardVisible: (state) => {
      state.status = 2;
    },
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
  },
});

export const {
  makeSuccessCardVisible,
  makeSuccessCardInvisible,
  makeFailedCardInvisible,
  makeFailedCardVisible,
  toggleLoading,
} = postPopupSlice.actions;
export default postPopupSlice.reducer;
