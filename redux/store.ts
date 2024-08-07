import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import postPopupReducer from "./features/postPopupSlice";

import user from "./features/userSlice";
import popupSlice from "./features/popupSlice";
import signUpSlice from "./features/signUpSlice";

import { persistStore, persistReducer } from "redux-persist";
import featuredProductsSlice from "./features/featuredProductsSlice";

let storage;

if (typeof window !== "undefined") {
    storage = require("redux-persist/lib/storage").default;
} else {
    storage = require("redux-persist/lib/storage/createWebStorage").default("local");
}

const persistConfig = {
    key: "root",
    storage,
    // Optionally, you can blacklist or whitelist specific reducers
    // blacklist: ['dataFetchReducer'] // won't be persisted
    // whitelist: ['authReducer', 'user'] // only these will be persisted
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedUserReducer = persistReducer(persistConfig, user);
// const persistedFeaturedProductsSlice = persistReducer(
//   persistConfig,
//   featuredProductsSlice
// );

export const store = configureStore({
    reducer: {
        authReducer: persistedAuthReducer,
        featuredProductsSlice,
        postPopupReducer,
        user: persistedUserReducer,
        popupSlice,
        signUpSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST"],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
