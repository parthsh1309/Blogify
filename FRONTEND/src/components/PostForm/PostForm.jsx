import React, { useEffect, useState } from "react";
import RTE from "../RTE";
import { useForm } from "react-hook-form";
import conf from "../../conf/conf";
import {FloatingInput,SelectInput,SecondaryBtn} from "../index"
function PostForm() {
    const [btntext,setBtnText] = useState("Create Blog");
    const { control, handleSubmit, register, getValues ,watch} = useForm();

  const blogCategory = [
    "Technology",
    "Lifestyle",
    "Business",
    "Travel",
    "Food",
  ];
  return (
    <form className="w-full py-4 px-5 flex flex-col gap-4">
      <h1 className="text-2xl text-center pb-4 dark:text-white font-merri underline">
        Please Fill The Following Details To Create A Blog
      </h1>
      <div className="flex flex-wrap items-center justify-evenly space-y-6">
        <div className=" sm:w-2/5 w-full space-y-4">
          <FloatingInput text={"Please Enter Title"} {...register("title")} />
          <SelectInput
            list={blogCategory}
            label={"Select Category Of Blog"}
            {...register("category")}
          />
          <SelectInput
            list={["English", "Hindi", "Other"]}
            label={"Select Language Of Blog"}
            {...register("language")}
          />
        </div>
        <div className="sm:w-2/5 w-full h-full space-y-4">
          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <RTE
          control={control}
          name={"content"}
          label={"Content"}
          defaultValue="<h1>Enter Content Here</h1>"
        />

        <div className="flex w-full items-center pt-2 justify-end px-16">
          <input
            id="link-checkbox"
            type="checkbox"
            value=""
            onChange={(e) => e.target.checked?setBtnText("Save As Draft"):setBtnText("Create Blog")}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="link-checkbox"
            className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Is This Blog Still In Progress...
          </label>
        </div>
      </div>

      <SecondaryBtn children={btntext} type="submit" className="w-2/3 justify-center m-auto py-3 text-xl font-roboSlab"/>
    </form>
  );
}

export default PostForm;
