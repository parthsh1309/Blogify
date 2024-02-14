import React from "react";

function PrimaryBtn({children="Get Started", type="button",className='',backgroundColor = 'blue'}) {
  return (
    <button
      type={type}
      className={`${className} text-white bg-${backgroundColor}-700 hover:bg-${backgroundColor}-800 focus:ring-4 focus:outline-none focus:ring-${backgroundColor}-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-${backgroundColor}-600 dark:hover:bg-${backgroundColor}-700 dark:focus:ring-${backgroundColor}-800`}
    >
      {children}
    </button>
  );
}

export default PrimaryBtn;