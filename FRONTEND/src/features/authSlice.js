import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  userData: null,
  status: false,
  refreshStatus: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        status: true,
        userData: action.payload,
      };
    },
    editDetails: (state, action) => {
      return {
        ...state,
        userData: action.payload,
      };
    },
    logout: (state) => {
      return {
        ...state,
        status: false,
        userData: null,
      };
    },
    refresh: (state) => {
      return {
        ...state,
        refreshStatus: !state.refreshStatus,
      };
    },
  },
});

export const { login, logout, refresh, editDetails } = authSlice.actions;

export default authSlice.reducer;
