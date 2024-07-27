import { product } from "@/app/store/type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  otherInfo: any[];
  settings: any[];
  likedProducts: product[];
  itemsInCart: product[];
  isAuthorized: boolean;
}

const initialState: User = {
  name: "",
  email: "",
  otherInfo: [],
  settings: [],
  likedProducts: [],
  itemsInCart: [],
  isAuthorized: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.otherInfo = action.payload.otherInfo;
      state.settings = action.payload.settings;
      state.likedProducts = action.payload.likedProducts;
      state.itemsInCart = action.payload.itemsInCart;
      state.isAuthorized = action.payload.isAuthorized;
    },
    updateCart: (state, action: PayloadAction<product[]>) => {
      state.itemsInCart = action.payload;
    },
    addToCart: (state, action: PayloadAction<product>) => {
      state.itemsInCart.push(action.payload);
    },
    addToLiked: (state, action: PayloadAction<product>) => {
      state.likedProducts.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.itemsInCart = state.itemsInCart.filter(
        (item) => item._id !== action.payload
      );
    },
    removeFromLiked: (state, action: PayloadAction<string>) => {
      state.likedProducts = state.likedProducts.filter(
        (item) => item._id !== action.payload
      );
    },
    setAuthorized: (state) => {
      state.isAuthorized = !state.isAuthorized;
    },
  },
});

export const {
  addToCart,
  updateCart,
  addToLiked,
  removeFromCart,
  removeFromLiked,
  setUser,
  setAuthorized,
} = userSlice.actions;

export default userSlice.reducer;
