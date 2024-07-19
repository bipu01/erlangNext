import { createSlice } from "@reduxjs/toolkit";

const postPopupSlice = createSlice({
  name: "postPopupSlice",
  initialState: {
    // successCard: {
    //   isVisible: false,
    // },
    // failedCard: {
    //   isVisible: false,
    // },
    status: 0,
  },
  reducers: {
    makeSuccessCardVisible: (state) => {
      // state.successCard.isVisible = !state.successCard.isVisible;
      state.status = 1;
    },
    makeSuccessCardInvisible: (state) => {
      // state.successCard.isVisible = !state.successCard.isVisible;
      state.status = 0;
    },
    makeFailedCardInvisible: (state) => {
      // state.failedCard.isVisible = !state.failedCard.isVisible;
      state.status = 0;
    },
    makeFailedCardVisible: (state) => {
      // state.failedCard.isVisible = !state.failedCard.isVisible;
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
