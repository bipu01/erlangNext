import { createSlice } from "@reduxjs/toolkit";

const postPopupSlice = createSlice({
  name: "postPopupSlice",
  initialState: {
    status: 0,
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
  },
});

export const {
  makeSuccessCardVisible,
  makeSuccessCardInvisible,
  makeFailedCardInvisible,
  makeFailedCardVisible,
} = postPopupSlice.actions;
export default postPopupSlice.reducer;
