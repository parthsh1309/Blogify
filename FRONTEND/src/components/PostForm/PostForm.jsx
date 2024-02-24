import React, { useEffect, useState } from "react";
import RTE from "../RTE";
import { useForm } from "react-hook-form";
import conf from "../../conf/conf";
import { FloatingInput, SelectInput, SecondaryBtn } from "../index";
import blogService from "../../databaseService/Blog";
import { useNavigate } from "react-router-dom";
function PostForm({ post }) {
  const [btntext, setBtnText] = useState("Create Blog");
  const [imgUploaded, setImgUploaded] = useState({});
  const { control, handleSubmit, register, getValues, watch } = useForm({
    defaultValues: {
      title: post?.title,
      text: post?.text,
      category: post?.category,
      language: post?.language,
      coverImage: post?.coverImage,
      inProduction: post?.inProduction,
      time: post?.time,
    },
  });

  const navigate = useNavigate();

  const blogCategory = [
    "Technology",
    "Lifestyle",
    "Business",
    "Travel",
    "Food",
  ];

  const submitForm = async (data, e) => {
    //   check if there's existing post if yes then update the form
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
      navigate("/")
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
            value={post ? getValues("title") : null}
            {...register("title")}
          />

          <SelectInput
            list={blogCategory}
            label={"Select Category Of Blog"}
            name={"category"}
            register={register}
            value={getValues("category")}
          />

          <SelectInput
            list={["English", "Hindi", "Other"]}
            label={"Select Language Of Blog"}
            name={"language"}
            register={register}
            
            value={getValues("language")}
          />

          <FloatingInput
          type={"number"}
            text={"Please Enter Reading Time In Minutes"}
            value={post ? getValues("title") : null}
            {...register("time")}
          />
        </div>

        <div className="sm:w-2/5 w-full h-full space-y-4">
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
                {/* {imgUploaded?
               ( <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>):(<p>Please Upload Cover Image</p>}) */}

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
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        
        <RTE
          control={control}
          name={"text"}
          defaultValue={
            post ? getValues("text") : "<p>Shahi Paneer is a popular Indian dish known for its rich and creamy texture, combined with aromatic spices and tender paneer (Indian cottage cheese).</p><h2>Ingredients:</h2><ul><li>Paneer (Indian cottage cheese)</li><li>Tomatoes</li><li>Onions</li><li>Cashew nuts</li><li>Yogurt</li><li>Cream</li><li>Green cardamom</li><li>Cinnamon</li><li>Cloves</li><li>Ginger-garlic paste</li><li>Coriander powder</li><li>Red chili powder</li><li>Turmeric powder</li><li>Saffron</li><li>Oil or ghee (clarified butter)</li><li>Fresh coriander leaves (for garnish)</li></ul><h2>Preparation:</h2><ol><li>Start by frying the paneer cubes until they turn golden brown. Set aside.</li><li>In a separate pan, heat oil or ghee and add whole spices like green cardamom, cinnamon, and cloves.</li><li>Add finely chopped onions and sauté until they turn golden brown.</li><li>Next, add ginger-garlic paste and cook until the raw smell disappears.</li><li>Add chopped tomatoes and cook until they become soft and mushy.</li><li>Grind cashew nuts into a fine paste and add it to the pan.</li><li>Now, add yogurt, cream, and powdered spices like coriander, red chili, and turmeric powder.</li><li>Add saffron strands soaked in warm milk for a rich flavor and vibrant color.</li><li>Finally, add the fried paneer cubes and simmer the gravy until it thickens.</li><li>Garnish with fresh coriander leaves and serve hot with naan or rice.</li></ol><h2>Conclusion:</h2><p>Shahi Paneer is a royal delicacy that is enjoyed by people of all ages. Its creamy texture and flavorful spices make it a perfect dish for special occasions or everyday meals.</p><p>Whether you're a fan of Indian cuisine or trying it for the first time, Shahi Paneer is sure to delight your taste buds and leave you craving for more.</p>"
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
            checked={getValues("inProduction")}
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
        children={btntext}
        type="submit"
        className="w-2/3 justify-center m-auto py-3 text-xl font-roboSlab"
      />
    </form>
  );
}

export default PostForm;
