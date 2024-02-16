import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  userData: null,
  status: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, actions) => {
      (state.status = true), (state.userData = actions.payload.userData);
    },
    logout: (state, actions) => {
      state.status = true;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;