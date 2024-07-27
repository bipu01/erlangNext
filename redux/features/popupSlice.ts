import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    popup: false,
    notLoggedPopup: false,
    heading: "",
    message: "",
  },
  reducers: {
    togglePopup: (state) => {
      state.popup = !state.popup;
    },
    toggleNotLoggedPopup: (state) => {
      state.notLoggedPopup = !state.notLoggedPopup;
    },
    popupSetHeading: (state, action) => {
      state.heading = action.payload;
    },
    popupSetMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const {
  togglePopup,
  popupSetHeading,
  popupSetMessage,
  toggleNotLoggedPopup,
} = popupSlice.actions;
export default popupSlice.reducer;
