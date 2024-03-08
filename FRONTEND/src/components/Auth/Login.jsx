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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);

  const submitForm = async (data) => {
    try {
      // logging in
      const session = await authService.login(data);

      // if login successful

      if (session && session?.data.success) {
        // get the current user and save it to store
        const userData = await authService.getCurrentUser();
        // if there's no current user
        if (!userData) return setError("Userdata not found");
        console.log(userData);
        // store the user info to store
        dispatch(login(userData));
        navigate("/");
      }

      setError(session.message);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  console.log(errors);

  useEffect(() => {
    if (authStatus === true) {
      navigate("/");
    }
  }, []);
  return (
    <div className="w-full h-screen flex items-center justify-center p-3">
      <div className="w-full h-auto p-5 flex flex-col gap-4 justify-center md:w-1/3 border border-black dark:border-white rounded-2xl bg-slate-400/20 dark:bg-transparent">
        <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-white ">
          Login Form
        </span>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col gap-5"
        >
          {error && <p className="text-red-500 text-center w-full">{error}</p>}
          <div>
            <FloatingInput
              type="email"
              text="Email"
              autoComplete="off"
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-base w-full">
                {errors.email ? "Please Enter Valid Email" : null}
              </p>
            )}
          </div>

          <div>
            <FloatingInput
              type="password"
              text="Password"
              autoComplete="off"
              {...register("password", { required: true, minLength: 8})}
            />
            {errors.password && (
              <p className="text-red-500 text-base w-full">
                {errors.password ? "Password Should Be Atleast 8 and Contain atleast 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Character" : null}
              </p>
            )}
          </div>
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
