import { createSlice } from "@reduxjs/toolkit";

const signUpSlice = createSlice({
  name: "signUpSlice",
  initialState: {
    OTPUIStatus: false,
    email: "",
  },
  reducers: {
    makeOTPUIActive: (state) => {
      state.OTPUIStatus = !state.OTPUIStatus;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { makeOTPUIActive, setEmail } = signUpSlice.actions;
export default signUpSlice.reducer;
