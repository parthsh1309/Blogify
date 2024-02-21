import React from "react";
import { useNavigate } from "react-router-dom";

function PrimaryBtn({
  children = "Get Started",
  type = "button",
  className = "",
  backgroundColor = "blue",
  navUrl = "",
}) {
  const navigate = useNavigate();
  return (
    <button
      type={type}
      className={`${className} text-white bg-${backgroundColor}-700 hover:bg-${backgroundColor}-800 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-${backgroundColor}-600 dark:hover:bg-${backgroundColor}-700 `}
      onClick={() => {
        navigate(navUrl);
      }}
    >
      {children}
    </button>
  );
}

export default PrimaryBtn;
