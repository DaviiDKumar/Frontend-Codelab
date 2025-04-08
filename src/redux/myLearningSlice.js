import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to Save My Learning to Backend
export const savemyLearn = createAsyncThunk(
  "myLearning/saveMyLearning",
  async ({ userId, myLearningItems },) => {
    try {
      console.log("Saving My Learning items to the backend:", userId, myLearningItems);

      const response = await axios.put(
        `http://localhost:3000/api/savemylearning/${userId}`, // API Endpoint
        { myLearningItems }, // Request body containing My Learning items
        { withCredentials: true } // Send cookies with request
      );

      if (response.data.message === "My Learning items updated successfully") {
        console.log("✅ My Learning Items Saved Successfully");
      }
      // dispatch(clearMyLearning());
    } catch (error) {
      console.error("❌ Error saving My Learning items to the backend:", error);
    }
  }
);

// Initial state for My Learning
const initialState = {
  myLearning: JSON.parse(localStorage.getItem("myLearning")) || [], // Fetch from localStorage or set empty array
};

const myLearningSlice = createSlice({
  name: "myLearning",
  initialState,
  reducers: {
    // Add new courses to My Learning (avoids duplicates)
    addToLearning: (state, action) => {
      const newCourses = action.payload.filter(
        (course) => !state.myLearning.some((item) => item._id === course._id)
      );
      state.myLearning = [...state.myLearning, ...newCourses];
      localStorage.setItem("myLearning", JSON.stringify(state.myLearning)); // Save to localStorage
    },

    // Set entire My Learning list (useful during login or API fetch)
    setMyLearning: (state, action) => {
      state.myLearning = action.payload;
      localStorage.setItem("myLearning", JSON.stringify(state.myLearning)); // Save to localStorage
    },

    // Clear My Learning list and remove from localStorage (for logout)
    clearMyLearning: (state) => {
      state.myLearning = []; // Empty array
      localStorage.removeItem("myLearning"); // Remove from localStorage
    },
  },
});

export const { addToLearning, setMyLearning, clearMyLearning } = myLearningSlice.actions;
export default myLearningSlice.reducer;
