import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const footerItems = [
    {
      name: "Login",
      url: "/login",
    },
    {
      name: "Signup",
      url: "/signup",
    },
    {
      name: "All Posts",
      url: "/all-posts",
    },
    {
      name: "About",
      url: "/about",
    },
  ];
  return (
    <footer className="w-full p-4 bg-white border-t border-gray-200 shadow-2xl shadow-black md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600 ">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2023{" "}
        <a href="/" className="hover:underline">
          Blogify™
        </a>
        . All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        {footerItems.map((item) => (
          <li key={item.name}>
            <Link to={item.url} className="hover:underline me-4 md:me-6">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}

export default Footer;
