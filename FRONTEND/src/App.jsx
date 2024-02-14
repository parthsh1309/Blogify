import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Footer, Navbar } from "./components";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
      <Navbar/>
      <main className="w-full h-full mt-12">
        <Outlet/>
      </main>
      <Footer/>
    </>
  );
}

export default App;
