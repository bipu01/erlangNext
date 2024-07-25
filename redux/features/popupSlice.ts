import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    popup: false,
    heading: "",
    message: "",
  },
  reducers: {
    togglePopup: (state) => {
      state.popup = !state.popup;
    },
    popupSetHeading: (state, action) => {
      state.heading = action.payload;
    },
    popupSetMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { togglePopup, popupSetHeading, popupSetMessage } =
  popupSlice.actions;
export default popupSlice.reducer;
