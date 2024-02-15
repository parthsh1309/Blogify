import React from "react";

function SecondaryBtn({
  children = "Get Started",
  type = "button",
  className = "",
  backgroundColor = 'blue',
}) {
  return (
    <button
      type={type}
      className={`${className} text-white bg-${backgroundColor}-700  hover:bg-${backgroundColor}-800 focus:ring-4 focus:outline-none focus:ring-${backgroundColor}-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-${backgroundColor}-600 dark:hover:bg-${backgroundColor}-700 dark:focus:ring-${backgroundColor}-800`}
    >
      {children}
      <svg
        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </button>
  );
}

export default SecondaryBtn;
