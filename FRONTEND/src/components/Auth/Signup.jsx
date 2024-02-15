import React from "react";
import { FloatingInput, Logo, SecondaryBtn } from "../index";
import GoogleBtn from "./GoogleBtn";
import TwitterBtn from "./TwitterBtn";
function Signup() {
  return (
    <div className="w-full h-full flex items-center justify-center mt-2">
      <div className="w-full h-auto p-5 flex flex-col gap-4 justify-center md:w-1/3 border border-black dark:border-white rounded-2xl bg-slate-300/20 dark:bg-transparent">
        {/* <Logo/> */}

        <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-white ">
          Signup Form
        </span>
        <form action="" className="flex flex-col gap-4">
          <FloatingInput type="text" text="Username" />
          <FloatingInput type="email" text="Email" />
          <FloatingInput type="password" text="Password" />
          <SecondaryBtn className="w-auto mx-auto flex justify-center">
            Login Now
          </SecondaryBtn>
        </form>
        <span className="dark:text-slate-400 self-center text-lg ">
          --or Login With--
        </span>
        <div className="w-full">
          <GoogleBtn />
          <TwitterBtn />
        </div>
      </div>
    </div>
  );
}

export default Signup;
