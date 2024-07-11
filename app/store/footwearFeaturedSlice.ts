import { createSlice } from "@reduxjs/toolkit";
import { individualProduct } from "../declare";


const initialState:Array<individualProduct>=[]

const footwearFeaturedSlice =createSlice({
    name:"footwearFeaturedSlice",
    initialState,
    reducers:{
        addFootwear(state, action){
            state.push(action.payload)
        }
    }
})


export const {addFootwear}= footwearFeaturedSlice.actions
export default footwearFeaturedSlice.reducer