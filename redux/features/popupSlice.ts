import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    popup: false,
    notLoggedPopup: false,
    heading: "",
    message: "",
    time: 1700,
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
    setTime: (state, action) => {
      state.time = action.payload;
    },
    // setColor:(state, action)=>{

    // }
  },
});

export const {
  togglePopup,
  popupSetHeading,
  popupSetMessage,
  toggleNotLoggedPopup,
  setTime,
} = popupSlice.actions;
export default popupSlice.reducer;
