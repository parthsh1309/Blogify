import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSwitch";
import authReducer from "../features/authSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer
});

export default configureStore({
  reducer: rootReducer,
});
