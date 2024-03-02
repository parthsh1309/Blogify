import React from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink } from "react-router-dom";

function AsideNav() {
  const listItems = [
    {
      name: "Profile",
      url: "/dashboard/profile",
    },
    {
      name: "Liked Blogs",
      url: "/dashboard/likedBlogs",
    },
    {
      name: "User Blogs",
      url: "/dashboard/userBlogs",
    },
    {
        name:"Earnings",
        url:"/dashboard/earnings"
    },{
        name: "Settings",
        url: "/dashboard/settings",
    }
  ];
  return (
    <aside
      class="h-screen sm:w-1/4 bg-gray-700 dark:bg-slate-800 relative space-y-5"
      aria-label="Sidebar"
    >
      <div className="flex flex-col justify-center items-center">
        <div className="p-4">
          <img src="" alt="" className="bg-gray-700 w-20 h-20 rounded-full" />
        </div>
        <span className="text-white text-2xl font-mont ">Username</span>
        <span className="text-gray-500 text-lg font-mont ">
          UserEmail@gmail.com
        </span>
        <span className="text-gray-400 text-sm font-mont pt-2">
          &#9830; 1 Blog Posts
        </span>
      </div>

      <hr className="border-gray-700 my-3 mx-4" />

      <div className="">
        <ul className="flex gap-2 items-center flex-col w-full">
          {listItems.map((item, index) => (
              <NavLink
                to={item.url}
                className={`w-full text-center  px-4 py-2 text-lg  font-roboSlabtext-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/30 dark:text-gray-200 dark:hover:text-white`}
              >
                {item.name}
              </NavLink>
          ))}
        </ul>
      </div>
      <hr className="border-gray-700 my-3 mx-4" />

    </aside>
  );
}

export default AsideNav;
