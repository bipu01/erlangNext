import { createSlice } from "@reduxjs/toolkit";
import { individualProduct } from "../declare";


const initialState:Array<individualProduct>=[]

const jewelleryFeaturedSlice = createSlice({
    name:"jewelleryFeaturedSlice",
    initialState,
    reducers:{
        addJewellery(state,action){
            state.push(action.payload)
        }
    }
})

export const {addJewellery}= jewelleryFeaturedSlice.actions
export default jewelleryFeaturedSlice.reducer