import { createSlice } from "@reduxjs/toolkit";
import { individualProduct } from "../declare";


const initialState:Array<individualProduct>=[]
const dressFeaturedSlice = createSlice({
    name:"dressFeaturedSlice",
    initialState,
    reducers:{
        addDress(state, action){
            state.push(action.payload)
        }
    }

})

export const {addDress}= dressFeaturedSlice.actions
export default dressFeaturedSlice.reducer