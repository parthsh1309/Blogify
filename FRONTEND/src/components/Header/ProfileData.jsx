import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import { useSelector } from "react-redux";
import authService from "../../databaseService/Auth";

function ProfileData({ isProfileOpen }) {
  const auth = useSelector((state) => state.auth);

  const logout = () => {
    authService.logout();
  };


  const profileItem = [
    {
      name: "Dashboard",
      url: "#",
      authStatus: auth.status,
    },
    {
      name: "Setting",
      url: "#",
      authStatus: auth.status,
    },
    {
      name: "Earnings",
      url: "#",
      authStatus: auth.status,
    },
    {
      name: "Login",
      url: "/login",
      authStatus: !auth.status,
    },
    {
      name: "Signup",
      url: "/signup",
      authStatus: !auth.status,
    },
  ];
  return (
    <div
      className={`z-50 absolute right-5 top-16 w-36 ${
        isProfileOpen ? "block" : "hidden"
      } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
    >
      {auth.status ? (
        <div className="px-4 py-3">
          <span className="block text-base text-gray-900 dark:text-white">
            {auth.userData.data.username}
          </span>
          <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
            {auth.userData.data.email}
          </span>
        </div>
      ) : (
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white text-center">
            Login Now to see your profile
          </span>
        </div>
      )}

      <ul
        className="py-2 flex flex-col items-center"
        aria-labelledby="user-menu-button"
      >
        {profileItem.map((item) => (
          <li key={item.name} className="w-full text-center">
            <a
              href={item.url}
              className={`${
                item.authStatus ? "block" : "hidden"
              }  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white`}
            >
              {item.name}
            </a>
          </li>
        ))}
        <li key="Logout" className="w-full text-center">
          <button
            className={`${
              auth.status ? "block" : "hidden"
            }  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full`}
            onClick={logout}
          >
            Signout
          </button>
        </li>

        <div className="">
          <ThemeSwitch />
        </div>
      </ul>
    </div>
  );
}

export default ProfileData;
