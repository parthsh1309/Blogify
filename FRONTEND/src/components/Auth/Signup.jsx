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
      const session = await authService.createAccount(data);
      if (session) {
        const session2 = await authService.login(session);
        if (session2) {
          const userData = await authService.getCurrentUser();
          console.log(userData);
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center mt-2">
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
            value="hehedssssdddhdhe"
            {...register("username", { required: true })}
          />
          <FloatingInput
            type="email"
            text="Email"
            value="hehehhssddsde@dgmail"
            {...register("email", { required: true })}
          />
          <FloatingInput
            type="password"
            text="Password"
            value="hhhddhhhdehe"
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
        <div className="w-full">
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
