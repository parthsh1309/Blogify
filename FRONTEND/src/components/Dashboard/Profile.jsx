import React, { useState } from "react";
import AsideNav from "./AsideNav";
import FloatingInput from "../Inputs/FloatingInput";
import SecondaryBtn from "../Buttons/SecondaryBtn";

function Profile() {
  const [isEditable, setIsEditable] = useState(false);
  return (
    <div className="sm:flex space-y-5">
      <AsideNav />
      <div className="sm:w-3/4 py-1 px-4 space-y-4">
        <div className="flex  items-center justify-between sm:px-20">
          <h1 className="sm:text-3xl text-xl text-white font-mont uppercase py-4">
            {isEditable?"Edit Profile":"Profile"}
          </h1>
          
          <button className="text-xl text-white bg-red-900 px-4 py-2 rounded-full transition-all duration-500" onClick={() => setIsEditable(!isEditable)}>
            {isEditable?"Cancel":"Edit Profile ✏️"} 
          </button>
        </div>
        <div className="flex flex-col items-center space-y-5 w-full">
          <FloatingInput
            className="sm:w-2/4 w-full"
            text="Username"
            readOnly={!isEditable}
          />
          <FloatingInput className="sm:w-2/4 w-full" text="Email" readOnly={!isEditable} />
          {isEditable && <SecondaryBtn children="Update Profile" />}
        </div>
      </div>
    </div>
  );
}

export default Profile;
