import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import postPopupReducer from "./features/postPopupSlice";
import dataFetchReducer from "./features/dataFetchSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    postPopupReducer,
    dataFetchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
