import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDark: true,
};

export const themeSlice = createSlice({
  name: "Theme",
  initialState,
  reducers: {
    themeSwitch: (state, actions) => {
      state.isDark = !state.isDark;
    },
  },
});

export const { themeSwitch } = themeSlice.actions;

export default themeSlice.reducer;
