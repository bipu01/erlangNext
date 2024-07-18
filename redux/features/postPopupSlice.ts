import { createSlice } from "@reduxjs/toolkit";

const postPopupSlice = createSlice({
  name: "postPopupSlice",
  initialState: {
    successCard: {
      isVisible: false,
    },
    failedCard: {
      isVisible: false,
    },
    status: 0,
  },
  reducers: {
    makeSuccessCardVisible: (state) => {
      state.successCard.isVisible = true;
      state.status = 1;
    },
    makeSuccessCardInvisible: (state) => {
      state.successCard.isVisible = false;
      state.status = 0;
    },
    makeFailedCardInvisible: (state) => {
      state.failedCard.isVisible = false;
      state.status = 2;
    },
    makeFailedCardVisible: (state) => {
      state.failedCard.isVisible = true;
      state.status = 3;
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
