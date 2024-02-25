import React from "react";
import { useForm } from "react-hook-form";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import SecondaryBtn from "../Buttons/SecondaryBtn";

function Filter({ filterVisible,setFilterVisible }) {
  const filterItems = [
    {
      name: "Category",
      item: [
        {
          name: "All",
        },
        {
          name: "Food",
        },
        {
          name: "Travel",
        },
        {
          name: "Lifestyle",
        },
        {
          name: "Business",
        },
        {
          name: "Technology",
        },
      ],
    },
    {
      name: "Language",
      item: [
        {
          name: "English",
        },
        {
          name: "Hindi",
        },
        {
          name: "Other",
        },
      ],
    },
  ];

  const [openDropdown, setOpenDropdown] = React.useState(false);
  const toggleDropdown = (index) => {
    console.log(index);
    setOpenDropdown(index === openDropdown ? null : index);
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <aside
      id="sidebar-multi-level-sidebar"
      class="h-screen sm:w-1/5 bg-gray-700 dark:bg-gray-900 relative overflow-y-scroll"
      aria-label="Sidebar"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`h-full fixed z-10 sm:w-1/5 w-2/3 ${
          filterVisible ? "sm:block animate-fadeInLeft" : `animate-fadeOutLeft hidden sm:block`
        }`}
      >
        <div class="h-full px-3 py-4  bg-gray-200 dark:bg-gray-800 space-y-8 ">
          <div className="flex justify-between items-center text-white">
            <h1 className="text-xl text-white text-center border border-gray-700 w-fit py-2 px-4 rounded-full font-merri bg-gray-900 flex items-center gap-2">
              <span className="text-lg material-symbols-outlined">tune</span>
              Filters
            </h1>

            <span className="material-symbols-outlined p-3 sm:hidden" onClick={() => setFilterVisible(false)}>close</span>
          </div>

          <div className="flex flex-col justify-center items-center">
            <ul className="space-y-2 w-full">
              {filterItems.map((item, index) => (
                <>
                  <li
                    className="text-white flex items-center justify-between border border-gray-700 py-3 px-4 rounded-full cursor-pointer "
                    onClick={() => toggleDropdown(index)}
                  >
                    {item.name}
                    <span className="material-symbols-outlined">
                      expand_more
                    </span>
                  </li>

                  {openDropdown === index && (
                    <div
                      className={`flex flex-wrap gap-4 py-2 px-4 items-center justify-center bg-transparent rounded-2xl border border-slate-700 transition-all animate-fadeIn `}
                    >
                      {item.item &&
                        item.item.map((items) => (
                          <>
                            <input
                              type="checkbox"
                              className="hidden group"
                              name={items.name}
                              id={items.name}
                              value={items.name}
                              {...register(item.name)}
                            />
                            <label
                              htmlFor={items.name}
                              className="text-white p-2 bg-slate-900 checked:bg-white group transition-all duration-200 cursor-pointer rounded-full px-4 border border-slate-700"
                            >
                              {items.name}
                            </label>
                          </>
                        ))}
                    </div>
                  )}
                </>
              ))}

              <li>
                <div className="relative mb-6">
                  <label
                    for="labels-range-input"
                    className="text-white flex items-center justify-between border border-gray-700 py-3 px-4 rounded-full cursor-pointer"
                  >
                    Please Choose Time
                  </label>
                  <input
                    id="labels-range-input"
                    type="range"
                    min="0"
                    max="60"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    {...register("Time")}
                  />
                  <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                    0 Min
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                    20 Min
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-2/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                    40 Min
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                    60 Min
                  </span>
                </div>
              </li>
            </ul>
            <SecondaryBtn
              type="submit"
              children="Submit Filter"
              className="mt-10"
            />
          </div>
        </div>
      </form>
    </aside>
  );
}

export default Filter;
