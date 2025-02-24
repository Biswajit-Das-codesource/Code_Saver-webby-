import { createSlice } from "@reduxjs/toolkit"
const CardSlicer = createSlice({
    name:"app",
    initialState:{
        user : null,
    },

    reducers:{
        setuser:(state,action)=>{
            state.user = action.payload
        }
    }

})

export const {setuser} = CardSlicer.actions

export default CardSlicer.reducer