import { createSlice } from "@reduxjs/toolkit";

const initialState:Array<object> =[]

const favourateSlice = createSlice({
    name:"favourateSlice",
    initialState,
    reducers:{
        add(state, action){
            state.push(action.payload)
        }
    }
})

export const {add} = favourateSlice.actions
export default favourateSlice.reducer