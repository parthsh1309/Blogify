import { createSlice } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";

export const initialState = {
  userData: null,
  status: false,
  // for refreshing the blog when user delete or edit something
  refreshStatus: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, actions) => {
      (state.status = true), (state.userData = actions.payload);
    },
    editDetails: (state, actions) => {
      (state.status = true), (state.userData = actions.payload);
    },
    logout: (state, actions) => {
      state.status = false;
      state.userData = null;
    },
    refresh: (state, actions) => {
      state.refreshStatus = !state.refreshStatus;
    },
  },
});

export const { login, logout, refresh, editDetails } = authSlice.actions;

export default authSlice.reducer;
