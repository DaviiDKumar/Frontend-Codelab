import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const getUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user data from LocalStorage", error);
    return null;
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: getUserFromLocalStorage(),

    loading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      const { user } = action.payload;
      state.loading = false;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      Cookies.remove("authToken");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setUser } = userSlice.actions;
export default userSlice.reducer;
