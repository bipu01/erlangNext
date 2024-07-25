import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import postPopupReducer from "./features/postPopupSlice";
import dataFetchReducer from "./features/dataFetchSlice";
import user from "./features/userSlice";
import popupSlice from "./features/popupSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    postPopupReducer,
    dataFetchReducer,
    user,
    popupSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
