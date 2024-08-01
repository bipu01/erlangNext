import { product } from "@/app/store/type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface featuredProducts {
  featuredDress: product[];
  featuredFootwear: product[];
  featuredJewellery: product[];
}

const initialState: featuredProducts = {
  featuredDress: [],
  featuredFootwear: [],
  featuredJewellery: [],
};

const featuredProductsSlice = createSlice({
  name: "featuredProducts",
  initialState,
  reducers: {
    setFeaturedDress: (state, action: PayloadAction<product[]>) => {
      state.featuredDress = action.payload;
    },
    setFeaturedJewellery: (state, action: PayloadAction<product[]>) => {
      state.featuredJewellery = action.payload;
    },
    setFeaturedFootwear: (state, action: PayloadAction<product[]>) => {
      state.featuredFootwear = action.payload;
    },
  },
});

export const { setFeaturedDress, setFeaturedJewellery, setFeaturedFootwear } =
  featuredProductsSlice.actions;

export default featuredProductsSlice.reducer;
