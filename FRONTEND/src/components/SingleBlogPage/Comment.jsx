import React from "react";
import FloatingInput from "../Inputs/FloatingInput";
import SecondaryBtn from "../Buttons/SecondaryBtn";

function Comment({}) {
  return (
    <div className="w-full flex flex-wrap justify-around">
      <div className="sm:w-2/4 w-full sm:p-0 p-3 ">
        <div className="bg-gray-950 rounded-xl text-white px-5 py-3">
          <div className="w-fit bg-gray-500/30 py-2 px-3 flex rounded-full">
            <span className="text-4xl  py-1 px-3 material-symbols-outlined">
              account_circle
            </span>
            <div className="">
              <span className="text-sm text-gray-600">Hehehhehe hhah</span>
              <p className=" m-auto">Lorem ipsum dolor sit</p>
            </div>
          </div>
        </div>
        <form action="" className="w-full relative">
          <FloatingInput
            text="Leave a comment"
            className="py-1"
            autocomplete="off"
          />
          <SecondaryBtn
            className="absolute bottom-2 right-3 top-2 m-auto"
            children
          />
        </form>
      </div>
      <div className="sm:w-2/5 bg-white"> hehhe</div>
    </div>
  );
}

export default Comment;
