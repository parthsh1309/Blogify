import { useEffect, useState } from "react";
import "./App.css";
import { Footer, Navbar } from "./components";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/authSlice.js";
import authService from "./databaseService/Auth.js";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
        let {data} = userData;
        console.log(data);
        if (data.length > 0 ) {
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
  }, []);

  return !loading ? (
    <>
      <Navbar />
      <main className="w-full h-full pt-12 pb-16">
        <Outlet />
      </main>
      <Footer />
    </>
  ) : null;
}

export default App;
