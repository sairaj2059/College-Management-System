import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: !!localStorage.getItem("token"), //!!forces binary
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  username:  "abc",
  
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.username = action.payload.username;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.role = null;
      state.username = null;

      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
