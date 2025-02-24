import { configureStore } from "@reduxjs/toolkit";
import CardSlicer from "./Slice"
const store = configureStore({
    reducer:{
        app:CardSlicer
    }
})


export default store;