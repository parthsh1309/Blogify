import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./App.css";
import { Footer, Navbar } from "./components";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./features/authSlice.js";
import authService from "./databaseService/auth.js";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const saveUserData = () => {
      authService
        .getCurrentUser()
        .then((userData) => {
          let data = userData.data.user;
          localStorage.setItem("user", JSON.stringify(data));
          if (userData.success) {
            dispatch(login({ data }));
          } else {
            dispatch(logout());
          }
        })
        .catch((error) => {
          console.log(`dispatch error :: ${error}`);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const refreshToken = () => {
      const refreshToken = Cookies.get("refreshToken");
      const accessToken = Cookies.get("accessToken");
      if (refreshToken && !accessToken) {
        authService.refreshToken();
      }
    };

    refreshToken();
    saveUserData();
  }, []);

  return !loading ? (
    <>
      <Navbar />
      <main className="w-full pt-20">
        <Outlet />
      </main>
      <Footer />
    </>
  ) : null;
}

export default App;
