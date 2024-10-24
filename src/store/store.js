import { configureStore } from "@reduxjs/toolkit";
import blogReducer from '../store/slice/blogslice.js'



const store = configureStore({
  reducer : blogReducer,
});

export default store;