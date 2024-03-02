import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "animate.css";
import { Provider } from "react-redux";
import "./index.css";
import store from "./store/store.js";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  Home,
  About,
  Login,
  Signup,
  AddBlog,
  AllBlogs,
  Blog,
  EditBlog,
  LikedBlogs,
  Profile,
  UserBlogs,
} from "./pages";
import Protected from "./components/AuthLayout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path=""
        element={
          <Protected authentication={false}>
            <Home />
          </Protected>
        }
      />
      <Route
        path="/about"
        element={
          <Protected authentication={false}>
            <About />
          </Protected>
        }
      />
      <Route
        path="/login"
        element={
          <Protected authentication={false}>
            <Login />
          </Protected>
        }
      />
      <Route
        path="/signup"
        element={
          <Protected authentication={false}>
            <Signup />
          </Protected>
        }
      />
      <Route
        path="/all-blogs"
        element={
          <Protected authentication={false}>
            <AllBlogs />
          </Protected>
        }
      />
      <Route
        path="/add-Blog"
        element={
          <Protected authentication={true}>
            <AddBlog />
          </Protected>
        }
      />

      <Route
        path="/edit-blog/:blogId"
        element={
          <Protected authentication={true}>
            <EditBlog />
          </Protected>
        }
      />

      <Route
        path="/blog/:blogId"
        element={
          <Protected authentication={false}>
            <Blog />
          </Protected>
        }
      />

      <Route
        path="/Dashboard/Profile"
        element={
          <Protected authentication={true}>
            <Profile />
          </Protected>
        }
      />

      <Route
        path="/dashboard/likedBlogs"
        element={
          <Protected authentication={true}>
            <LikedBlogs />
          </Protected>
        }
      />
      <Route
        path="/dashboard/userBlogs"
        element={
          <Protected authentication={true}>
            <UserBlogs />
          </Protected>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <RouterProvider router={router} />
    {/* </React.StrictMode> */}
  </Provider>
);
