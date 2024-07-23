import { createSlice } from "@reduxjs/toolkit";

type products = {
  _id: "";
  name: "";
  desc: "";
  priceOriginal: 0;
  priceCurrent: 0;
  description: "";
  img1: "";
  img2: "";
  img3: "";
  ratingRate: 0;
  ratingCount: 0;
  isFeatured: false;
  category: "";
};

const initialState = {
  allFeaturedDress: [],
  allFeaturedJewellery: [],
  allFeaturedFootwear: [],
  isDataFetched: false,
};
const dataFetchSlice = createSlice({
  name: "data fetch slice",
  initialState,
  reducers: {
    setIsDataFetchedToTrue: (state) => {
      state.isDataFetched = true;
    },
    setAllFeaturedDress: (state, action) => {},
    setAllFeaturedFootwear: (state, action) => {},
  },
});

export const { setIsDataFetchedToTrue } = dataFetchSlice.actions;
export default dataFetchSlice.reducer;
