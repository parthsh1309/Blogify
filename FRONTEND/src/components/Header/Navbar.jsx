import React, { useState } from "react";
import { Logo, PrimaryBtn, ThemeSwitch } from "../index";
import { Link, NavLink, Navigate } from "react-router-dom";
import MainMenuBtn from "./MainMenuBtn";
import MenuData from "./MenuData";
import ProfileBtn from "./ProfileBtn";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => {
    setIsProfileOpen(false)
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsMenuOpen(false)
    setIsProfileOpen(!isProfileOpen);
  };

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

  const profileItem = [
    {
      name:'Dashboard',
      url:'#'
    },
    {
      name:'Setting',
      url:'#'
    },
    {
      name:'Earnings',
      url:'#'
    },
    {
      name:'Signout',
      url:'#'
    }
  ]

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Logo />
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-3">
          {/* get started btn */}
          <PrimaryBtn navUrl="/login" className="hidden lg:flex">
            Post A Blog
          </PrimaryBtn>

          {/* profile btn */}

          <ProfileBtn onClick={toggleProfile}/>

          {/* main menu btn */}
          <MainMenuBtn onClick={toggleMenu} />
        </div>
        <div
          className={`z-50 absolute right-5 top-16 ${isProfileOpen?"block":"hidden"} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
        >
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">
              Bonnie Green
            </span>
            <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
              name@flowbite.com
            </span>
          </div>
          <ul className="py-2" aria-labelledby="user-menu-button">
            {profileItem.map((item)=>(
            <li key={item.name}>
              <a
                href={item.url}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                {item.name}
              </a>
            </li>
            ))}
            
            <ThemeSwitch />
          </ul>
        </div>


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
        
      </div>
    </nav>
  );
}

export default Navbar;
