import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";  // User slice import
import courseReducer from "./courseSlice";  // Course slice import
import cartReducer from "./cartSlice";
import myLearningReducer from "./myLearningSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,  // User-related state
    course : courseReducer,  // Course-related
    cart : cartReducer,
    myLearning: myLearningReducer,

    
  },
});
