import { createSlice } from "@reduxjs/toolkit";

const dataFetchSlice = createSlice({
  name: "data fetch slice",
  initialState: {
    isDataFetched: false,
    allFeaturedDress: {
      _id: "",
      name: "",
      desc: "",
      priceOriginal: 0,
      priceCurrent: 0,
      description: "",
      img1: "",
      img2: "",
      img3: "",
      ratingRate: 0,
      ratingCount: 0,
      isFeatured: false,
      category: "",
    },
  },
  reducers: {
    setIsDataFetchedToTrue: (state) => {
      state.isDataFetched = true;
    },
  },
});

export const { setIsDataFetchedToTrue } = dataFetchSlice.actions;
export default dataFetchSlice.reducer;
