import React, { useEffect, useState } from "react";
import AsideNav from "./AsideNav";
import FloatingInput from "../Inputs/FloatingInput";
import SecondaryBtn from "../Buttons/SecondaryBtn";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../databaseService/auth";
import { editDetails } from "../../features/authSlice";

function Profile() {
  const [isEditable, setIsEditable] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const authData = useSelector((state) => state.auth).userData.data;
  const dispatch = useDispatch();

  useEffect(() => {
    if (authData) {
      setValue("username", authData.username);
      setValue("email", authData.email);
    }
  }, [authData, setValue]);

  const onSubmit = (data) => {
    authService.editProfile(data)
      .then((response) => {
        authService.getCurrentUser().then((userData) => {
          setIsEditable(false);
          dispatch(editDetails({ data: userData.data.user }));
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sm:flex space-y-5">
      <AsideNav />
      <div className="sm:w-3/4 py-1 px-4 space-y-4">
        <div className="flex  items-center justify-between sm:px-20">
          <h1 className="sm:text-3xl text-xl text-white font-mont uppercase py-4">
            {isEditable ? "Edit Profile" : "Profile"}
          </h1>

          <button
            className="text-xl text-white bg-red-900 px-4 py-2 rounded-full transition-all duration-500"
            onClick={() => setIsEditable(!isEditable)}
          >
            {isEditable ? "Cancel" : "Edit Profile ✏️"}
          </button>
        </div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center space-y-5 w-full"
          >
            <FloatingInput
              className="sm:w-2/4 w-full"
              text="Username"
              type="text"
              readOnly={!isEditable}
              {...register("username")}
            />
            <FloatingInput
              className="sm:w-2/4 w-full"
              type="email"
              text="Email"
              readOnly={!isEditable}
              {...register("email")}
            />
            {isEditable && (
              <SecondaryBtn children="Update Profile" type="submit" />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
