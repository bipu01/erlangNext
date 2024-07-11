import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import favourateSlice from "./favourateSlice";
import dressFeaturedSlice from "./dressFeaturedSlice";
import jewelleryFeaturedSlice from "./jewelleryFeaturedSlice";
import footwearFeaturedSlice from "./footwearFeaturedSlice";
import searchedProductSlice from "./searchedProductSlice";

const store = configureStore({
    reducer:{
        cart:cartSlice,
        favourate: favourateSlice,
        searchedProducts:searchedProductSlice,
        allFeaturedDress:dressFeaturedSlice,
        allFeaturedJewellery:jewelleryFeaturedSlice,
        allFeaturedFootwear:footwearFeaturedSlice
    }
})

export default store

// import create from "zustand"

// const store = create((set)=>({
//     allFeaturedDress: [],
//     allFeaturedJewellery:[],
//     allFeaturedShoes:[],

//     addFeaturedDress:(dress)=>set(store)
// }))

// export default store