import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: JSON.parse(localStorage.getItem("courses")) || [],
  totalCourses: JSON.parse(localStorage.getItem("totalCourses")) || [], // Initialize totalCourses
  filteredCourses: [],
  course: null,
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourse(state, action) {
      state.course = action.payload;
      state.error = null;
    },
    setCourses(state, action) {
      state.courses = action.payload;
      state.filteredCourses = action.payload; // Show all by default
      localStorage.setItem("courses", JSON.stringify(state.courses));
    },
    setTotalCourses(state, action) {
      state.totalCourses = action.payload; // Saving total courses
      localStorage.setItem("totalCourses", JSON.stringify(state.totalCourses));
    },
    searchCourses(state, action) {
      const keywords = action.payload.toLowerCase().split(" "); // Split query into words
      state.filteredCourses = state.courses.filter((course) =>
        keywords.some((keyword) =>
          course.title.toLowerCase().includes(keyword) ||
          course.description.toLowerCase().includes(keyword)
        )
      );
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCourse, setCourses, searchCourses, setTotalCourses, setLoading, setError } =
  courseSlice.actions;
export default courseSlice.reducer;
















