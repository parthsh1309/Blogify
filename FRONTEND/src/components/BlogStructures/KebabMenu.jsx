import React, { useEffect, useId, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import conf from "../../conf/conf";
import { useDispatch, useSelector } from "react-redux";
import blogService from "../../databaseService/Blog";
import { refresh } from "../../features/authSlice";
function KebabMenu({ blogId, userId }) {
  const [dropdown, setDropdown] = useState(false);
  const id = useId();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdown) {
        const dropdownMenu = document.getElementById(id);
        if (dropdownMenu && !dropdownMenu.contains(event.target)) {
          return setDropdown(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
  }, [dropdown]);

  const dropMenuItems = [
    {
      name: "Edit",
      function: () => {
        navigate(`/edit-blog/${blogId}`);
      },
      authenticated: true,
    },
    {
      name: "Share",
      function: () => {
        navigator.clipboard.writeText(`${conf.copyLinkUrl}${blogId}`);
        setDropdown(false);
      },
      authenticated: false,
    },
    {
      name: "Delete",
      function: () => {
        blogService.deleteBlog(blogId).then((res) => {
          console.log(res);
          dispatch(refresh());
        });
      },
      authenticated: true,
    },
    {
      name: "More Like This",
      function: () => {
        navigate("/all-blogs");
      },
      authenticated: false,
    },
  ];

  return (
    <div className="absolute top-2 right-2 p-1">
      <button
        className="dropdownMenuIconButton inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 dark:text-white  dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
        type="button"
        onClick={toggleDropdown}
      >
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>
      <div
        id={id}
        className={`dropdownMenu ${
          dropdown ? "block" : "hidden"
        } z-50 absolute right-0 top-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownMenuIconButton"
        >
          <li>
            {dropMenuItems.map((item) =>
              item.authenticated ? (
                auth?.userData?.data._id === userId && item.authenticated ? (
                  <button
                    className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left"
                    onClick={item.function}
                  >
                    {item.name}
                  </button>
                ) : null
              ) : (
                <button
                  className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left"
                  onClick={item.function}
                >
                  {item.name}
                </button>
              )
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default KebabMenu;
