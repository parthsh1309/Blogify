import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { FloatingInput, Logo, PrimaryBtn, SecondaryBtn } from "../index";
import GoogleBtn from "./GoogleBtn";
import authService from "../../databaseService/Auth";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";

function Signup() {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerUser = async (data) => {
    setError("");
    try {
      // creating the account
      const session = await authService.createAccount(data);
      // if account created successfully
      if (session.success) {
        // get the current user and save it to store
        const userData = await authService.getCurrentUser();

        // if there's no current user
        if (!userData) return setError("Userdata not found");

        // store the user info to store
        dispatch(login(userData));
        navigate("/");
      }

      setError(session.message);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <div className="h-full flex justify-center items-center p-3">
      <div className="w-full h-auto p-5 flex flex-col gap-4 justify-center md:w-1/3 border border-black dark:border-white rounded-2xl bg-slate-300/20 dark:bg-transparent">
        {/* <Logo/> */}

        <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-white ">
          Signup Form
        </span>
        {error && <p className="text-red-600 text-center">{error}</p>}

        <form
          onSubmit={handleSubmit(registerUser)}
          className="flex flex-col gap-4"
        >
          <FloatingInput
            type="text"
            text="Username"
            autoComplete="off"
            {...register("username", { required: true })}
          />
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
            {...register("password", { required: true })}
          />
          <SecondaryBtn
            type="submit"
            className="w-auto mx-auto flex justify-center"
          >
            Register Now
          </SecondaryBtn>
          {/* <PrimaryBtn type="submit">Register</PrimaryBtn> */}
        </form>
        <span className="dark:text-slate-400 self-center text-sm ">
          --or Login With--
        </span>
        <div className="w-full flex justify-center">
          <GoogleBtn />
        </div>
        <span className="dark:text-slate-400 self-center text- ">
          Already have an Account?{" "}
          <Link className="text-blue-600 hover:underline" to={"/login"}>
            Login
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Signup;
