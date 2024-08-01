import { createSlice } from "@reduxjs/toolkit";

const signUpSlice = createSlice({
  name: "signUpSlice",
  initialState: {
    OTPUIStatus: false,
    SignupWithGoogleUIStatus: false,
    email: "",
  },
  reducers: {
    makeOTPUIActive: (state) => {
      state.OTPUIStatus = !state.OTPUIStatus;
    },
    toggleSignupWithGoogleUIStatus: (state) => {
      state.SignupWithGoogleUIStatus = !state.SignupWithGoogleUIStatus;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { makeOTPUIActive, toggleSignupWithGoogleUIStatus, setEmail } =
  signUpSlice.actions;
export default signUpSlice.reducer;
