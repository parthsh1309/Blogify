import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSwitch";

export const store = configureStore({
  reducer: themeReducer,
});
