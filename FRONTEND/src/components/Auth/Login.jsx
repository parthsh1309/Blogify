import React from "react";
import { Link } from "react-router-dom";
import { FloatingInput, Logo, SecondaryBtn } from "../index";
import GoogleBtn from "./GoogleBtn";

function Login() {
  return (
    <div className="w-full h-full flex items-center justify-center p-3">
      <div className="w-full h-auto p-5 flex flex-col gap-4 justify-center md:w-1/3 border border-black dark:border-white rounded-2xl bg-slate-400/20 dark:bg-transparent">
        {/* <Logo/> */}

        <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-white ">Login Form</span>
        <form action="" className="flex flex-col gap-5">
          <FloatingInput type="email" text="Email" />
          <FloatingInput type="password" text="Password" />
          <SecondaryBtn
            className="w-auto mx-auto flex justify-center"
          
          >
            Login Now
          </SecondaryBtn>
        </form>
        <span className="dark:text-slate-400 self-center text-lg ">--or Login With--</span>
        <div className="w-full flex justify-center">
          <GoogleBtn />
        </div>
        <span className="dark:text-slate-400 self-center text- ">
          Don't have an Account? <Link className="text-blue-600 hover:underline" to={'/signup'}>Signup</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
