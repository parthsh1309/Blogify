import React from "react";
import { NavLink } from "react-router-dom";

function NavItems({ isMenuOpen }) {

    const navItems = [
        {
          name: "Home",
          url: "/",
        },
        {
          name: "About",
          url: "/about",
        },
        {
          name: "All Post",
          url: "/all-post",
        },
        {
          name: "Add Post",
          url: "/add-post",
        },
      ];
  return (
    <div
      className={`items-center justify-between ${
        isMenuOpen ? "flex" : "hidden"
      } w-full md:flex md:w-auto md:order-1`}
    >
      <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 gap-2 w-full">
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.url}
              className={({ isActive }) =>
                `block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                  isActive
                    ? "dark:text-blue-700 text-blue-700"
                    : "dark:text-white text-gray-900"
                } dark:border-gray-700`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavItems;
