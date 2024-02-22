import React from "react";

function SelectInput({list=[],label,...props}) {
  return (
    <>
      <label
        htmlFor="category"
        className="block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        id="category"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>Choose Category</option>
        {list.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
    </>
  );
}

export default SelectInput;
