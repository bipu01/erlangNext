import { product } from "@/app/store/type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  otherInfo: any[];
  settings: any[];
  likedProducts: product[];
  itemsInCart: product[];
}

const initialState: User = {
  name: "",
  email: "",
  otherInfo: [],
  settings: [],
  likedProducts: [],
  itemsInCart: [],
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
  },
});

export const {
  addToCart,
  updateCart,
  addToLiked,
  removeFromCart,
  removeFromLiked,
  setUser,
} = userSlice.actions;

export default userSlice.reducer;
