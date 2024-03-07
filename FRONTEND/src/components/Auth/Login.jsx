import React, { useEffect, useState } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import { FloatingInput, Logo, SecondaryBtn } from "../index";
import GoogleBtn from "./GoogleBtn";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authService from "../../databaseService/auth";
import { login } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);

  const submitForm = async (data) => {
    try {
      // logging in
      const session = await authService.login(data);
      // if login successful
      
      if (session.data.success) {
        // get the current user and save it to store
        const userData = await authService.getCurrentUser();
        // if there's no current user
        if (!userData) return setError("Userdata not found");
        // store the user info to store
        dispatch(login(userData));
        navigate("/");
        
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if(authStatus === true) {
      navigate("/");
    }
  }, []);
  return (
    <div className="w-full h-screen flex items-center justify-center p-3">
      <div className="w-full h-auto p-5 flex flex-col gap-4 justify-center md:w-1/3 border border-black dark:border-white rounded-2xl bg-slate-400/20 dark:bg-transparent">
        {/* <Logo/> */}

        <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-white ">
          Login Form
        </span>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col gap-5"
        >
          <FloatingInput
            type="email"
            text="Email"
            autoComplete="off"
            {...register("email", { required: true })}
          />
          <FloatingInput
            type="password"
            text="Password"
            autoComplete="off"
            value="12345678"
            {...register("password", { required: true })}
          />
          <SecondaryBtn
            className="w-auto mx-auto flex justify-center"
            type="submit"
          >
            Login Now
          </SecondaryBtn>
        </form>
        <span className="dark:text-slate-400 self-center text-lg ">
          --or Login With--
        </span>
        <div className="w-full flex justify-center">
          <GoogleBtn />
        </div>
        <span className="dark:text-slate-400 self-center text- ">
          Don't have an Account?{" "}
          <Link className="text-blue-600 hover:underline" to={"/signup"}>
            Signup
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
