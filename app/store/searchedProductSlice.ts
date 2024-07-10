import { createSlice } from "@reduxjs/toolkit";
import { individualProduct } from "../declare";


const initialState:Array<individualProduct>=[]
const searchedProductSlice =createSlice({
    name:"openedPostSlice",
    initialState,
    reducers:{
        addSearchedProducts(state, action){
            state.push(action.payload)
        },
        removeSearchedProducts(state){
            state.pop()
        }
    }
})

export const {addSearchedProducts,removeSearchedProducts}= searchedProductSlice.actions
export default searchedProductSlice.reducer