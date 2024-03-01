import React, { useEffect, useState } from "react";
import RTE from "../RTE";
import { useForm, useWatch } from "react-hook-form";
import conf from "../../conf/conf";
import { FloatingInput, SelectInput, SecondaryBtn } from "../index";
import blogService from "../../databaseService/Blog";
import { useNavigate } from "react-router-dom";
import authService from "../../databaseService/Auth";
function PostForm({ post }) {
  const [btntext, setBtnText] = useState("Create Blog");
  const [imgUploaded, setImgUploaded] = useState({});
  const { control, handleSubmit, register, getValues, setValue, reset } =
    useForm({
      // defaultValues: {
      //   title: post?.title || "",
      //   text: post?.text || "",
      //   category: post?.category || "",
      //   language: post?.language || "English",
      //   coverImage: post?.coverImage || "",
      //   inProduction: post?.inProduction || false,
      //   time: post?.time || "",
      // },
    });

    const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      console.log("Setting default values:", post);
      Object.keys(post).forEach((key) => {
        setValue(key, post[key]);
      });
    }
  }, [post, setValue]);

  const blogCategory = [
    "Technology",
    "Lifestyle",
    "Business",
    "Travel",
    "Food",
  ];

  const submitForm = async (data, e) => {
    //   check if there's existing post if yes then update the form
    if (post) {
      const response = await blogService.editBlog(post.uuid, data);
      console.log(response);
      navigate(`/blog/${post.uuid}`);
      return;
    }

    // else create a new form
    const formData = new FormData();
    formData.append("coverImage", data.coverImage[0]);
    formData.append("title", data.title);
    formData.append("text", data.text);
    formData.append("category", data.category);
    formData.append("language", data.language);
    formData.append("inProduction", data.inProduction);
    formData.append("time", data.time);

    const response = await blogService.addBlog(formData);
    if (response) {
      console.log(response);
      // TODO: navigate to Particular  Blog page
      navigate(`/blog/${post.uuid}`);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="w-full py-4 px-5 flex flex-col gap-4"
      enctype="multipart/form-data"
    >
      <h1 className="text-2xl text-center pb-4 dark:text-white font-merri underline">
        Please Fill The Following Details To Create A Blog
      </h1>

      <div className="flex flex-wrap items-center justify-evenly space-y-7">
        <div className=" sm:w-2/5 w-full space-y-4">
          <FloatingInput
            text={"Please Enter Title"}
            // value={post ? post.title : ""}
            onChange={(e) => setValue("title", e.target.value)}
            {...register("title")}
          />

          <SelectInput
            list={blogCategory}
            label={"Select Category Of Blog"}
            name={"category"}
            register={register}
            // value={post ? getValues("category") : null}
          />

          <SelectInput
            list={["English", "Hindi", "Other"]}
            label={"Select Language Of Blog"}
            name={"language"}
            register={register}
            // value={post ? getValues("language") : null}
          />

          <FloatingInput
            type={"number"}
            text={"Please Enter Reading Time In Minutes"}
            // value={post ? getValues("time") : null}
            {...register("time")}
          />
        </div>

        {!post&&<div className="sm:w-2/5 w-full h-full space-y-4">
          <div className="flex items-center justify-center w-full">
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

                {!imgUploaded.name ? (
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                ) : (
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                    <span className="font-semibold">File uploaded</span> <br />F
                    {imgUploaded.name}
                  </p>
                )}
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                name="coverImage"
                onInput={(e) => {
                  setImgUploaded({
                    name: e.target.files[0].name,
                  });
                }}
                {...register("coverImage")}
              />
            </label>
          </div>
        </div>}
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <RTE
          control={control}
          name={"text"}
          defaultValue={
            post ? post.text : "<h1>Please Enter Blog Content Here</h1>"
          }
        />

        <div className="flex w-full items-center pt-2 justify-end px-16">
          <input
            id="link-checkbox"
            type="checkbox"
            onChange={(e) =>
              e.target.checked
                ? setBtnText("Save As Draft")
                : setBtnText("Create Blog")
            }
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
            {...register("inProduction")}
          />
          <label
            for="link-checkbox"
            className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Is This Blog Still In Progress...
          </label>
        </div>
      </div>

      <SecondaryBtn
        children={post ? "Update Blog" : btntext}
        type="submit"
        className="w-2/3 justify-center m-auto py-3 text-xl font-roboSlab"
      />
    </form>
  );
}

export default PostForm;
